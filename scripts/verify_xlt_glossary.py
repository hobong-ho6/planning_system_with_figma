#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
XLT 시스템 등록값 ↔ 용어집 정기 검증
md/xlt-verify.md 구현 — 검증 로직은 validate_translation.TranslationValidator를 그대로 재사용한다.

  검증:  --registry <레지스트리.json> --glossary scripts/glossary.json
  반영:  --apply <제안.json> --registry <레지스트리.json>   → 업로드용 엑셀 생성
"""

import argparse
import json
import sys
import unicodedata
from datetime import datetime
from pathlib import Path

import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from validate_translation import TranslationValidator
from export_to_xlt import create_xlt_excel

LANGS = ['en_US', 'ko_KR', 'ja_JP', 'zh_TW', 'th_TH']


def registry_to_df(entries: dict) -> pd.DataFrame:
    """레지스트리를 검증기가 읽는 엑셀 규격(키가 0번 컬럼)의 DataFrame으로."""
    return pd.DataFrame(
        [{'': key, **{lang: row.get(lang, '') for lang in LANGS}} for key, row in entries.items()]
    )


def run_validation(registry: dict, glossary_path: str) -> dict:
    """3단계 검증 실행 후 issues 반환. 검증 규칙은 단일 출처(validate_translation)를 따른다."""
    v = TranslationValidator(excel_path='(registry)', glossary_path=glossary_path)
    v.df = registry_to_df(registry['entries'])
    with open(glossary_path, encoding='utf-8') as f:
        v.glossary = json.load(f)
    print(f"✓ 레지스트리 {len(v.df)}키 · 용어집 v{v.glossary['metadata']['version']} "
          f"({len(v.glossary.get('terminology', {}))}개 용어)")
    v.validate_step1_korean()
    v.validate_step2_glossary()
    v.validate_step3_other_languages()
    return v.issues


def build_proposals(issues: dict, registry: dict, glossary: dict) -> tuple:
    """구 표기(deprecated) 위반을 기계 치환 제안으로 바꾼다. 나머지는 검토 필요로 넘긴다."""
    deprecated = [d for d in glossary.get('deprecated_terms', []) if d.get('active', True)]
    proposals, review = [], []
    for level in ('P0', 'P1', 'P2'):
        for iss in issues[level]:
            key, cell_row = iss['key'], registry['entries'].get(iss['key'], {})
            if iss['issue'] != '구 표기':
                review.append({'level': level, 'key': key, 'issue': iss['issue'], 'detail': iss['detail']})
                continue
            lang = iss['detail'].split(':', 1)[0].strip()
            before = cell_row.get(lang, '')
            # 이 셀에 실제로 들어있는 금지 표현 중 가장 긴 것 = 검증기가 최장일치로 고른 것과 같다
            cands = [d for d in deprecated if d.get('lang', 'ko_KR') == lang and d['pattern'] in before]
            if not cands:
                review.append({'level': level, 'key': key, 'issue': iss['issue'], 'detail': iss['detail']})
                continue
            term = max(cands, key=lambda d: len(d['pattern']))
            proposals.append({
                'key': key, 'lang': lang,
                'before': before, 'after': before.replace(term['pattern'], term['recommend']),
                'rule': f"구 표기 '{term['pattern']}' → '{term['recommend']}'",
                'note': term.get('note', ''),
            })
    return proposals, review


def check_key_names(entries: dict) -> list:
    """키 **이름** 자체의 이상을 찾는다. [{key(repr), issues[]}]

    ⛔ 문구 검증(1~3단계)은 키 이름을 보지 않는다 — 이름이 깨지면 FE가 정상 키명으로
    값을 못 가져오는데도 번역 검사는 전부 통과한다. 2026-08-07 감사에서 별도 임시
    스캔으로만 3건이 나왔고(`\\xa0UF_home_jpyc_home_banner2` · `payment_history_\\x08…`
    · `payment_history_?…`), 그중 2건은 값까지 ko↔en이 뒤바뀐 중복 키였다.
    """
    out = []
    for k in entries:
        bad = []
        if any(unicodedata.category(c) == 'Cc' for c in k):
            bad.append('제어문자')
        if any(ord(c) > 127 for c in k):
            bad.append('비ASCII')
        if k != k.strip() or ' ' in k:
            bad.append('공백')
        if '?' in k:
            bad.append("'?' 포함")
        if bad:
            out.append({'key': repr(k), 'issues': bad})
    return out


def write_report(path: Path, registry: dict, glossary: dict, issues: dict,
                 proposals: list, review: list, keyname: list = None):
    meta, gmeta = registry['metadata'], glossary['metadata']
    L = [f"# XLT 등록값 ↔ 용어집 검증 리포트\n",
         f"\n| 항목 | 값 |\n|---|---|\n",
         f"| 대상 | `{meta['service']}` / `{meta['device']}` / **{meta['version']}** |\n",
         f"| 등록값 조회 | {meta['fetched_at']} · {meta['total_keys']}키 × {len(meta['languages'])}개 언어 |\n",
         f"| 용어집 | v{gmeta['version']} · {len(glossary.get('terminology', {}))}개 용어 · "
         f"deprecated {len([d for d in glossary.get('deprecated_terms', []) if d.get('active', True)])}종 |\n",
         f"| 검증 일시 | {datetime.now().astimezone().isoformat(timespec='seconds')} |\n",
         f"\n## Executive Summary\n\n| 심각도 | 건수 |\n|---|---|\n"]
    for lv in ('P0', 'P1', 'P2'):
        L.append(f"| {lv} | {len(issues[lv])}건 |\n")
    L.append(f"\n- **자동 치환 제안: {len(proposals)}건** (구 표기 — 사용자 확인 후 엑셀 생성)\n")
    L.append(f"- **검토 필요: {len(review)}건** (기계 치환 불가 — 사람이 판단)\n")
    L.append(f"- **키 이름 이상: {len(keyname or [])}건** "
             f"(⛔ 문구 검증이 원리적으로 못 잡는 부류 — FE가 정상 키명으로 값을 못 가져온다)\n")

    L.append("\n## 0. 키 이름 이상 (최우선)\n\n")
    if keyname:
        L.append("| 키 이름(repr) | 문제 |\n|---|---|\n")
        for k in keyname:
            L.append(f"| `{k['key']}` | {' · '.join(k['issues'])} |\n")
        L.append("\n> ⚠️ 삭제·재등록 전 **FE 참조 여부 확인 필수**(`md/translate.md` 키 거버넌스). "
                 "정상 키가 따로 있으면 파손 키는 삭제 대상이다.\n")
    else:
        L.append("없음.\n")

    L.append("\n## 1. 자동 치환 제안 (구 표기)\n\n")
    if proposals:
        L.append("| # | XLT Key | 언어 | before | after | 규칙 |\n|---|---|---|---|---|---|\n")
        for i, p in enumerate(proposals, 1):
            L.append(f"| {i} | `{p['key']}` | {p['lang']} | {_cell(p['before'])} | "
                     f"{_cell(p['after'])} | {p['rule']} |\n")
    else:
        L.append("없음.\n")

    L.append("\n## 2. 검토 필요 (기계 치환 불가)\n\n")
    if review:
        agg = {}
        for r in review:
            agg.setdefault((r['level'], r['issue']), []).append(r)
        L.append("| 심각도 | 유형 | 건수 |\n|---|---|---|\n")
        for (lv, issue), rows in sorted(agg.items()):
            L.append(f"| {lv} | {issue} | {len(rows)}건 |\n")
        L.append("\n<details><summary>상세 (유형별 최대 20건)</summary>\n\n")
        for (lv, issue), rows in sorted(agg.items()):
            L.append(f"\n**{lv} · {issue}** ({len(rows)}건)\n\n")
            for r in rows[:20]:
                L.append(f"- `{r['key']}`: {r['detail']}\n")
            if len(rows) > 20:
                L.append(f"- … 외 {len(rows) - 20}건\n")
        L.append("\n</details>\n")
    else:
        L.append("없음.\n")

    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(''.join(L), encoding='utf-8')
    print(f"✓ 리포트: {path}")


def _cell(s: str) -> str:
    return '`' + s.replace('\n', '\\n').replace('|', '\\|') + '`'


def apply_proposals(proposals_path: str, registry: dict, output_dir: str):
    """승인된 제안을 등록값에 얹어 업로드용 엑셀을 만든다(변경된 키만)."""
    doc = json.load(open(proposals_path, encoding='utf-8'))
    entries, changed = registry['entries'], {}
    for p in doc['proposals']:
        row = entries.get(p['key'])
        if row is None:
            raise SystemExit(f"❌ 레지스트리에 없는 키: {p['key']} — 레지스트리를 다시 조회하세요")
        current = changed.get(p['key'], dict(row))
        if current[p['lang']] != p['before']:
            raise SystemExit(
                f"❌ 등록값이 제안 생성 시점과 다릅니다: {p['key']} / {p['lang']}\n"
                f"   제안 before: {p['before']!r}\n   현재 등록값 : {current[p['lang']]!r}\n"
                f"   → 레지스트리를 다시 조회해 검증부터 재실행하세요(캐시 금지 규칙)")
        current[p['lang']] = p['after']
        changed[p['key']] = current
    rows = [{'xlt_key': k, **{lang: v.get(lang, '') for lang in LANGS}} for k, v in changed.items()]
    print(f"✓ 변경 키 {len(rows)}개 / 제안 {len(doc['proposals'])}건")
    return create_xlt_excel(rows, output_dir=output_dir)


def main():
    p = argparse.ArgumentParser(description="XLT 등록값 ↔ 용어집 검증")
    p.add_argument('--registry', required=True, help="fetch_xlt_registry.py 산출물")
    p.add_argument('--glossary', default='scripts/glossary.json')
    p.add_argument('--out-dir', default='reports/xlt')
    p.add_argument('--apply', metavar='제안.json', help="승인된 제안으로 업로드용 엑셀 생성")
    p.add_argument('--excel-dir', default='xlt/registry_fix',
                   help="--apply 산출 폴더 (xlt/ 직하 금지 — 캠페인 엑셀과 섞이면 오업로드 위험)")
    args = p.parse_args()

    registry = json.load(open(args.registry, encoding='utf-8'))

    if args.apply:
        apply_proposals(args.apply, registry, args.excel_dir)
        return

    glossary = json.load(open(args.glossary, encoding='utf-8'))
    issues = run_validation(registry, args.glossary)
    proposals, review = build_proposals(issues, registry, glossary)
    keyname = check_key_names(registry['entries'])
    if keyname:
        print(f"⚠️ 키 이름 이상 {len(keyname)}건: " + ', '.join(k['key'] for k in keyname[:3]))

    meta = registry['metadata']
    stamp = f"{meta['service'].replace(' ', '')}_{meta['version']}_{datetime.now().strftime('%Y%m%d')}"
    out = Path(args.out_dir)
    write_report(out / f"xlt_glossary_report_{stamp}.md", registry, glossary, issues, proposals, review, keyname)
    prop_path = out / f"xlt_fix_proposals_{stamp}.json"
    prop_path.write_text(json.dumps(
        {'metadata': {**meta, 'glossary_version': glossary['metadata']['version']},
         'proposals': proposals}, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"✓ 제안: {prop_path} ({len(proposals)}건)")
    print("  → 사용자 확인 후 불필요한 항목을 지우고 --apply로 엑셀을 생성하세요")


if __name__ == '__main__':
    main()
