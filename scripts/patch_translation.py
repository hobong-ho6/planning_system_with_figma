#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
키 단위 번역 패치 (md/translate.md '키 단위 번역 패치 모드')

특정 XLT Key의 일부 언어 셀만 최종 확정값으로 교체한다.
- 지정한 언어만 교체, 미지정 언어는 그대로 보존(전체 재번역로 인한 의도치 않은 변경 방지).
- 값은 '최종 확정값'을 받는다 (ko 변경 시의 재번역은 LLM이 수행해 values로 넘김 / 부서 제공 최종본은 그대로 넘김).
- 무결성 가드: 키 존재·언어명·빈 값. (의미 검증은 validate_translation.py + md/check.md가 담당)

사용:
  from scripts.patch_translation import apply_translation_patch, load_rows_from_excel
  rows = load_rows_from_excel('xlt/xlt_output_xxx.xlsx')
  rows, changelog = apply_translation_patch(rows, [
      {'xlt_key': 'mini_guidekim_xxx', 'values': {'th_TH': '...', 'ja_JP': '...'}},
  ])
  # 이후 export_to_xlt.create_xlt_excel(rows) 로 재생성
"""

import pandas as pd
from pathlib import Path

LANGS = ['ko_KR', 'en_US', 'ja_JP', 'zh_TW', 'th_TH']


def load_rows_from_excel(path: str) -> list:
    """properties 시트를 [{'xlt_key', ko_KR, en_US, ja_JP, zh_TW, th_TH}, ...]로 로드."""
    df = pd.read_excel(path, sheet_name='properties').fillna('')
    keycol = df.columns[0]  # 첫 컬럼 = XLT Key (헤더 공백)
    rows = []
    for _, r in df.iterrows():
        row = {'xlt_key': str(r[keycol])}
        for L in LANGS:
            row[L] = str(r[L]) if L in df.columns else ''
        rows.append(row)
    return rows


def apply_translation_patch(rows: list, patches: list, *, allow_new: bool = False):
    """
    rows: 현재 번역 행 목록
    patches: [{'xlt_key': str, 'values': {lang: newtext, ...}}, ...]  (values=최종 확정값, 포함 언어만 교체)
    allow_new: True면 없는 키를 신규 행으로 추가(전 언어 values 필수)
    반환: (updated_rows, changelog)  changelog=[(key, lang, before, after), ...]
    예외: 키 없음(allow_new=False)·미지 언어·빈 값
    """
    index = {r['xlt_key']: r for r in rows}
    changelog = []
    for p in patches:
        key = p['xlt_key']
        values = p.get('values', {})
        if not values:
            raise ValueError(f"[{key}] values가 비어 있음")
        for lang, val in values.items():
            if lang not in LANGS:
                raise ValueError(f"[{key}] 미지 언어: {lang} (허용: {LANGS})")
            if val is None or str(val).strip() == '':
                raise ValueError(f"[{key}] {lang} 값이 빈 값 (P0 — 패치 중단)")
        if key not in index:
            if not allow_new:
                raise ValueError(f"키 없음: {key} (패치 모드는 기존 키 대상. 신규면 allow_new=True)")
            missing = [L for L in LANGS if L not in values]
            if missing:
                raise ValueError(f"[{key}] 신규 추가인데 누락 언어: {missing}")
            new_row = {'xlt_key': key, **{L: str(values[L]) for L in LANGS}}
            rows.append(new_row)
            index[key] = new_row
            changelog += [(key, L, '(신규)', str(values[L])) for L in LANGS]
            continue
        row = index[key]
        for lang, val in values.items():
            before = row.get(lang, '')
            if str(before) != str(val):
                row[lang] = str(val)
                changelog.append((key, lang, before, str(val)))
    return rows, changelog


if __name__ == '__main__':
    import sys, json
    if len(sys.argv) < 3:
        print("사용: python3 scripts/patch_translation.py <현재.xlsx> <patches.json> [출력디렉토리]")
        sys.exit(1)
    from export_to_xlt import create_xlt_excel
    rows = load_rows_from_excel(sys.argv[1])
    patches = json.load(open(sys.argv[2], encoding='utf-8'))
    rows, changelog = apply_translation_patch(rows, patches)
    print(f"변경 {len(changelog)}건:")
    for key, lang, b, a in changelog:
        print(f"  [{key}/{lang}] {b!r} → {a!r}")
    out = create_xlt_excel(rows, output_dir=(sys.argv[3] if len(sys.argv) > 3 else 'xlt'))
    print(f"엑셀 재생성: {out}")
