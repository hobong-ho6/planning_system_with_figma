#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
위키 페이지의 XLT 키 ↔ XLT 시스템 등록값 대조
md/xlt-verify.md '위키 페이지 대조 모드' 구현

  CONFLUENCE_PAT=... python3 scripts/compare_wiki_xlt.py --page 4540065229 \
      --registry scripts/xlt_registry.json

표는 인덱스가 아니라 **헤더 시그니처**로 찾는다 — 페이지마다 표 개수·순서가 다르다.
중첩표(Screen 표 XLT 컬럼)를 인식하는 파서를 쓴다 — 정규식 `<tr>(.*?)</tr>`는
중첩표에서 끊겨 XLT 컬럼이 통째로 비어 보이는 오판을 낸다(2026-08-05 실측 사고).
"""

import argparse
import json
import os
import re
import sys
from datetime import datetime
from html.parser import HTMLParser
from pathlib import Path

import requests

sys.path.insert(0, str(Path(__file__).parent))
from fetch_xlt_registry import find_similar

WIKI_BASE = "https://wiki.workers-hub.com"
LANGS = ['ko_KR', 'ja_JP', 'en_US', 'th_TH', 'zh_TW']
WIKI_LANG_COLS = ['KR', 'JA', 'EN', 'TH', 'ZH-TW']
ROW_SEP, CELL_SEP = ' ⏎ ', ' | '


class TableParser(HTMLParser):
    """table/tr/td를 스택으로 추적한다. 중첩표는 부모 셀 안에 `[[TABLE …]]`로 flatten."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.tables = []
        self._stack = []

    def handle_starttag(self, tag, attrs):
        if tag == 'table':
            self._stack.append({'rows': [], 'row': None, 'cell': None})
        elif not self._stack:
            return
        elif tag == 'tr':
            self._stack[-1]['row'] = []
        elif tag in ('td', 'th'):
            self._stack[-1]['cell'] = []
        elif tag == 'br' and self._stack[-1]['cell'] is not None:
            self._stack[-1]['cell'].append('\n')

    def handle_endtag(self, tag):
        if not self._stack:
            return
        t = self._stack[-1]
        if tag in ('td', 'th'):
            if t['cell'] is not None and t['row'] is not None:
                t['row'].append(''.join(t['cell']))
            t['cell'] = None
        elif tag == 'tr':
            if t['row']:
                t['rows'].append(t['row'])
            t['row'] = None
        elif tag == 'table':
            done = self._stack.pop()
            if self._stack:
                flat = ROW_SEP.join(CELL_SEP.join(r) for r in done['rows'])
                if self._stack[-1]['cell'] is not None:
                    self._stack[-1]['cell'].append(f'[[TABLE {flat}]]')
            else:
                self.tables.append(done['rows'])

    def handle_data(self, data):
        if self._stack and self._stack[-1]['cell'] is not None:
            self._stack[-1]['cell'].append(data)


def fetch_storage(page_id: str, token: str) -> tuple:
    url = f"{WIKI_BASE}/rest/api/content/{page_id}?expand=body.storage,version"
    res = requests.get(url, headers={'Authorization': f'Bearer {token}'}, timeout=30)
    res.raise_for_status()
    d = res.json()
    return d['body']['storage']['value'], d['title'], d['version']['number']


def _hdr(rows):
    return [c.strip() for c in rows[0]] if rows else []


def extract_keys(tables: list) -> tuple:
    """Screen 표(중첩 XLT 표)와 다국어 번역표에서 키를 뽑는다. (screen, multi)"""
    screen, multi = {}, {}
    for rows in tables:
        h = _hdr(rows)
        if 'XLT' in h and 'Screen' in h:                      # Screen 표
            xi, si = h.index('XLT'), h.index('Screen')
            name_i = h.index('Screen ID') if 'Screen ID' in h else si
            for r in rows[1:]:
                if len(r) <= xi:
                    continue
                screen.update(_parse_xlt_cell(r[xi], r[name_i].strip()))
        elif h[:1] == ['XLT Key'] and all(c in h for c in WIKI_LANG_COLS):  # 다국어 번역표
            idx = [h.index(c) for c in WIKI_LANG_COLS]
            for r in rows[1:]:
                if len(r) > max(idx):
                    multi[r[0].strip()] = {lang: r[i].strip() for lang, i in zip(LANGS, idx)}
    return screen, multi


def _parse_xlt_cell(cell: str, frame: str) -> dict:
    """Screen 표 XLT 컬럼의 중첩표(`No | XLT Key | KR`)를 푼다.

    한 셀에 표가 여러 개 올 수 있다 — 시즌3는 XLT 표 뒤에 GA 이벤트 표
    (`no | Event Name | Event Parameter | Description`)가 붙는다. 헤더에
    `XLT Key`가 있는 표만 받는다(없으면 통째로 건너뛴다) — 안 그러면 GA
    이벤트명이 XLT 키로 잡혀 '미등록'으로 무더기 오보된다(2026-08-07 실측 17건).
    """
    out = {}
    for block in re.findall(r'\[\[TABLE (.*?)\]\]', cell, re.S):
        lines = block.split(ROW_SEP)
        header = [c.strip().casefold() for c in lines[0].split(CELL_SEP)]
        if 'xlt key' not in header:
            continue
        ki = header.index('xlt key')
        vi = header.index('kr') if 'kr' in header else ki + 1
        for line in lines[1:]:
            cells = [c.strip() for c in line.split(CELL_SEP)]
            if len(cells) <= max(ki, vi) or not cells[ki]:
                continue
            m = re.match(r'\[([^\]]+)\]\s*(.*)', cells[vi], re.S)
            out[cells[ki]] = {'frame': frame,
                              'tag': m.group(1) if m else '',
                              'kr': (m.group(2) if m else cells[vi]).strip()}
    return out


def _norm(s: str) -> str:
    """비교용 정규화 — nbsp·CRLF·양끝 공백 3종만. 리터럴 \\n ↔ 실제 개행은 건드리지 않는다."""
    return s.replace('\xa0', ' ').replace('\r\n', '\n').strip()


def load_registries(paths: list) -> list:
    """레지스트리를 **합치지 않고** 목록으로 유지한다. [(label, meta, entries)]

    ⛔ 병합 금지 — 같은 키가 여러 서비스에 **다른 값**으로 등록돼 있다(실측: 시즌3
    대조 대상 7키가 전부 Unifi ↔ Dapp Portal 값 상이). '먼저 지정한 쪽 우선'으로
    합치면 어느 서비스를 앞에 뒀느냐에 따라 결론이 뒤집힌다. 서비스별로 각각 대조하고
    갈리면 '서비스 간 분기'로 보고한다.
    """
    out = []
    for path in paths:
        reg = json.load(open(path, encoding='utf-8'))
        m = reg['metadata']
        out.append((f"{m['service']} {m['version']}", m, reg['entries']))
    return out


def compare(screen: dict, multi: dict, regs: list) -> dict:
    """키마다 **모든 레지스트리와 각각** 대조한다."""
    same, diff, split, missing = [], [], [], []
    for key, info in sorted(screen.items()):
        wiki_vals = multi.get(key) or {'ko_KR': info['kr']}
        hits = []          # [(label, diffs)] — 이 키를 보유한 서비스별 차이
        for label, _meta, entries in regs:
            if key not in entries:
                continue
            hits.append((label, [(lang, wv, entries[key].get(lang, ''))
                                 for lang, wv in wiki_vals.items()
                                 if _norm(wv) != _norm(entries[key].get(lang, ''))]))
        if not hits:
            missing.append((key, info))
            continue
        matched = [lb for lb, d in hits if not d]
        info['source'] = ' · '.join(lb for lb, _ in hits)
        if len(matched) == len(hits):
            same.append((key, info, []))
        elif matched:
            info['matched'] = ', '.join(matched)
            split.append((key, info, [(lb, d) for lb, d in hits if d]))
        else:
            diff.append((key, info, hits))
    orphan = sorted(set(multi) - set(screen))   # 다국어표에만 있고 Screen 표에 없는 키
    return {'same': same, 'diff': diff, 'split': split, 'missing': missing, 'orphan': orphan}


def recommend(screen: dict, multi: dict, regs: list, threshold: float) -> list:
    """유사 키 추천은 서비스별로 검색하고 출처를 붙인다(값이 갈려도 키 후보는 유효하다)."""
    out = []
    for key, info in sorted(screen.items()):
        kr = (multi.get(key) or {}).get('ko_KR') or info['kr']
        if not kr:
            continue
        hits, seen = [], set()
        for label, _meta, entries in regs:
            for h in find_similar(entries, kr, threshold=threshold, top=4):
                if h['key'] == key or (h['key'], h['value']) in seen:
                    continue
                seen.add((h['key'], h['value']))
                hits.append({**h, 'source': label})
        if hits:
            out.append({'key': key, 'tag': info['tag'], 'kr': kr,
                        'hits': sorted(hits, key=lambda h: -h['ratio'])[:4]})
    return out


def write_report(path: Path, page, metas, res, recs, screen, multi):
    page_id, title, ver = page
    targets = ' · '.join(f"`{m['service']}` / `{m['device']}` / **{m['version']}** ({m['total_keys']}키)"
                         for m in metas)
    L = [f"# 위키 ↔ XLT 시스템 대조 리포트\n\n| 항목 | 값 |\n|---|---|\n",
         f"| 위키 | [{title}]({WIKI_BASE}/pages/viewpage.action?pageId={page_id}) · v{ver} |\n",
         f"| XLT 타겟 | {targets} |\n",
         f"| 등록값 조회 | {' · '.join(m['fetched_at'] for m in metas)} |\n",
         f"| 대조 일시 | {datetime.now().astimezone().isoformat(timespec='seconds')} |\n",
         f"| 위키 키 | Screen 표 {len(screen)}개 · 다국어 번역표 {len(multi)}개 |\n",
         f"\n## Executive Summary\n\n| 버킷 | 건수 |\n|---|---|\n",
         f"| ⓐ 등록값 동일 | {len(res['same'])} |\n| ⓑ 값 상이 (모든 서비스와 다름) | {len(res['diff'])} |\n",
         f"| ⓔ 서비스 간 분기 (일부 서비스만 일치) | {len(res['split'])} |\n",
         f"| ⓒ 미등록 | {len(res['missing'])} |\n| ⓓ 유사 키 추천 | {len(recs)} |\n"]
    if res['orphan']:
        L.append(f"\n> ⚠️ 다국어 번역표에만 있고 Screen 표에 없는 키 {len(res['orphan'])}개: "
                 + ', '.join(f'`{k}`' for k in res['orphan']) + "\n")

    L.append("\n## ⓑ 값 상이 (보유한 모든 서비스와 다름)\n\n")
    if res['diff']:
        for key, info, hits in res['diff']:
            L.append(f"\n### `{key}` [{info['tag']}] — {info['frame']}\n")
            for label, diffs in hits:
                L.append(f"\n**vs {label}**\n\n| 언어 | 위키 | 시스템 |\n|---|---|---|\n")
                for lang, wv, rv in diffs:
                    L.append(f"| {lang} | `{_esc(wv)}` | `{_esc(rv)}` |\n")
    else:
        L.append("없음.\n")

    L.append("\n## ⓔ 서비스 간 분기 (일부 서비스와만 일치)\n\n")
    if res['split']:
        L.append("> 같은 키가 서비스마다 다른 값으로 등록돼 있다. **위키와 일치하는 쪽이 정본**인지, "
                 "다른 서비스도 갱신해야 하는지 판단이 필요하다.\n")
        for key, info, hits in res['split']:
            L.append(f"\n### `{key}` [{info['tag']}] — {info['frame']}\n\n"
                     f"✅ 위키와 일치: **{info['matched']}**\n")
            for label, diffs in hits:
                L.append(f"\n**≠ {label}**\n\n| 언어 | 위키 | {label} |\n|---|---|---|\n")
                for lang, wv, rv in diffs:
                    L.append(f"| {lang} | `{_esc(wv)}` | `{_esc(rv)}` |\n")
    else:
        L.append("없음.\n")

    L.append("\n## ⓒ 미등록 (시스템에 없는 키)\n\n")
    L.append(''.join(f"- `{k}` [{i['tag']}] — {i['frame']}: {i['kr']}\n" for k, i in res['missing'])
             or "없음.\n")

    L.append("\n## ⓓ 유사 키 추천\n\n")
    if recs:
        for r in recs:
            L.append(f"\n### `{r['key']}` [{r['tag']}]\n\n위키 KR: `{_esc(r['kr'])}`\n\n")
            L.append("| 판정 | 유사도 | 등록 키 | 등록값(ko_KR) | 출처 |\n|---|---|---|---|---|\n")
            for h in r['hits']:
                L.append(f"| {h['kind']} | {h['ratio']} | `{h['key']}` | `{_esc(h['value'])}` "
                         f"| {h['source']} |\n")
    else:
        L.append("없음.\n")

    L.append("\n## ⓐ 등록값 동일\n\n")
    L.append(''.join(f"- `{k}` [{i['tag']}] — {i['frame']} ({i.get('source', '')})\n"
                     for k, i, _ in res['same']) or "없음.\n")

    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(''.join(L), encoding='utf-8')
    print(f"✓ 리포트: {path}")


def _esc(s: str) -> str:
    return s.replace('\n', '\\n').replace('|', '\\|')


def main():
    p = argparse.ArgumentParser(description="위키 XLT 키 ↔ XLT 시스템 등록값 대조")
    p.add_argument('--page', required=True, help="Confluence pageId")
    p.add_argument('--registry', required=True, action='append', metavar='JSON',
                   help="fetch_xlt_registry.py 산출물. UIT·LV 키가 섞인 페이지는 "
                        "서비스별로 여러 번 지정한다(먼저 지정한 쪽 우선)")
    p.add_argument('--out-dir', default='reports/xlt')
    p.add_argument('--threshold', type=float, default=0.70, help="유사 키 추천 하한")
    args = p.parse_args()

    token = os.environ.get('CONFLUENCE_PAT')
    if not token:
        sys.exit("❌ 환경변수 CONFLUENCE_PAT가 필요합니다")

    storage, title, ver = fetch_storage(args.page, token)
    parser = TableParser()
    parser.feed(storage)
    screen, multi = extract_keys(parser.tables)
    if not screen:
        sys.exit("❌ Screen 표에서 XLT 키를 찾지 못했습니다 — 표 구조를 확인하세요"
                 f" (표 {len(parser.tables)}개 파싱됨)")

    regs = load_registries(args.registry)
    metas = [m for _lb, m, _e in regs]
    print(f"위키 v{ver} · Screen 키 {len(screen)}개 · 다국어표 {len(multi)}개 ↔ "
          + ' + '.join(f"{m['service']} {m['version']} {m['total_keys']}키" for m in metas))

    res = compare(screen, multi, regs)
    recs = recommend(screen, multi, regs, args.threshold)
    assert (len(res['same']) + len(res['diff']) + len(res['split'])
            + len(res['missing'])) == len(screen)
    print(f"  ⓐ 동일 {len(res['same'])} · ⓑ 상이 {len(res['diff'])} · "
          f"ⓔ 분기 {len(res['split'])} · ⓒ 미등록 {len(res['missing'])} · ⓓ 추천 {len(recs)}")

    svc = '-'.join(m['service'].replace(' ', '') for m in metas)
    stamp = f"{args.page}_{svc}_{datetime.now().strftime('%Y%m%d')}"
    write_report(Path(args.out_dir) / f"wiki_xlt_compare_{stamp}.md",
                 (args.page, title, ver), metas, res, recs, screen, multi)


if __name__ == '__main__':
    try:
        main()
    except requests.exceptions.RequestException as e:
        sys.exit(f"❌ 위키 조회 실패: {e}")
