#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
data.js / i18n.js 표준 생성기 — md/prototype.md Step 5-8 구현

입력 (프로젝트 루트의 JSON 산출물):
  - prototype_input.json    : 화면/인터랙션/variant (md/prototype.md Step 1~3, 7 추출 결과)
  - translation_extract.json: 화면별 텍스트 노드 (md/translate.md Step 1 산출물)
  - translation_data.json   : XLT Key 번역 데이터 + aliases (md/translate.md Step 2~4 산출물)
  - comments_data.json      : 대상 페이지 코멘트 (md/prototype.md Step 8 산출물, 없으면 빈 배열)

출력: 프로젝트 루트에 data.js, i18n.js

사용법: python3 scripts/build_prototype_data.py
"""
import json
import os
import re
import sys

LANGS = ('ko_KR', 'en_US', 'ja_JP', 'zh_TW', 'th_TH')
HAS_KO = re.compile(r'[가-힣]')


def load(path, required=True, default=None):
    if not os.path.exists(path):
        if required:
            sys.exit(f"❌ 입력 파일 없음: {path}")
        return default
    with open(path, encoding='utf-8') as f:
        return json.load(f)


def js(obj):
    return json.dumps(obj, ensure_ascii=False, indent=2)


def main():
    proto = load('prototype_input.json')
    extract = load('translation_extract.json')
    trans = load('translation_data.json')
    comments = load('comments_data.json', required=False, default=[])

    rows = trans['rows']
    aliases = trans.get('aliases', {})
    ko2key = {r['ko_KR']: r['xlt_key'] for r in rows}
    key2row = {r['xlt_key']: r for r in rows}

    # aliases 무결성: alias가 가리키는 키가 rows에 존재해야 함
    for orig, key in aliases.items():
        if key not in key2row:
            sys.exit(f"❌ aliases의 키가 translation_data.rows에 없음: {key} (원문: {orig[:30]})")

    def lookup(text):
        return ko2key.get(text) or aliases.get(text)

    # ── textNodes 생성 + 누락 검증 (md/prototype.md Step 6 필수 규칙) ──
    text_nodes, missing = {}, []
    for s in extract['screens']:
        nodes = []
        for item in s['items']:
            key = lookup(item['t'])
            if key is None and HAS_KO.search(item['t']):
                missing.append((s['id'], item['t'][:40]))
            for pos in item['pos']:
                node = {'text': item['t'], 'x': pos[0], 'y': pos[1], 'w': pos[2], 'h': pos[3]}
                if key:
                    node['xltKey'] = key
                nodes.append(node)
        if len(nodes) != s['total']:
            sys.exit(f"❌ {s['id']}: 추출 {s['total']}개 vs 반영 {len(nodes)}개 — 누락 확인 필요")
        text_nodes[s['id']] = nodes
    if missing:
        print("❌ xltKey 미매핑 한글 텍스트 — translation_data.json의 rows 또는 aliases에 추가 필요:")
        for sid, t in missing:
            print(f"   {sid}: {t}")
        sys.exit(1)

    # ── screens / interactions / variants ──
    screens_obj = {
        s['id']: {'name': s['name'], 'image': f"assets/screens/{s['id'].replace(':', '-')}.png",
                  'width': s['w'], 'height': s['h']}
        for s in proto['screens']
    }
    interactions = []
    for i in proto['interactions']:
        item = {'sourceScreen': i['src'], 'trigger': i['trig'], 'destination': i['dest'],
                'hotspot': {'x': i['x'], 'y': i['y'], 'w': i['w'], 'h': i['h']}, 'label': i.get('label', '')}
        if i['trig'] == 'AFTER_TIMEOUT':
            if 'timeoutSec' not in i:
                sys.exit(f"❌ AFTER_TIMEOUT 인터랙션에 timeoutSec 없음: {i['src']} → {i['dest']}")
            item['timeoutMs'] = int(i['timeoutSec'] * 1000)
        if i['src'] not in screens_obj or (i['trig'] != 'CHANGE_TO' and i['dest'] not in screens_obj):
            sys.exit(f"❌ 인터랙션의 화면 ID가 screens에 없음: {i['src']} → {i['dest']}")
        interactions.append(item)

    variants = []
    for v in proto.get('variants', []):
        w, h = v.get('w', 16), v.get('h', 16)
        variants.append({
            'screenId': v['screenId'], 'trigger': 'ON_CLICK',
            'hotspot': {'x': v['x'], 'y': v['y'], 'w': w, 'h': h},
            'label': v.get('label', 'variant'),
            'states': v.get('states', [
                {'id': 'checked', 'image': 'assets/variants/checked.png', 'w': w, 'h': h},
                {'id': 'unchecked', 'image': 'assets/variants/unchecked.png', 'w': w, 'h': h}]),
            'defaultState': v.get('defaultState', 'checked')})

    for c in comments:
        if c['screenId'] not in screens_obj:
            sys.exit(f"❌ 코멘트의 screenId가 screens에 없음: {c['screenId']} ({c['id']})")

    # ── i18n: 원문 텍스트 키 (교정 후 ko_KR + 교정 전 원문 alias 모두 포함) ──
    i18n = {lang: {} for lang in LANGS}
    for r in rows:
        for lang in LANGS:
            i18n[lang][r['ko_KR']] = r[lang]
    for orig, key in aliases.items():
        for lang in LANGS:
            i18n[lang][orig] = key2row[key][lang]

    # ── 출력 ──
    data_js = (
        "/**\n * Figma Prototype Data — scripts/build_prototype_data.py 자동 생성\n */\n\n"
        "const APP_DATA = {\n"
        f"  startScreen: {js(proto['startScreen'])},\n\n"
        f"  screens: {js(screens_obj)},\n\n"
        f"  interactions: {js(interactions)},\n\n"
        f"  textNodes: {js(text_nodes)},\n\n"
        f"  variantSwaps: {js(variants)},\n\n"
        f"  comments: {js(comments)}\n"
        "};\n")
    with open('data.js', 'w', encoding='utf-8') as f:
        f.write(data_js)

    i18n_js = ("/**\n * Internationalization Data — scripts/build_prototype_data.py 자동 생성\n"
               " * 키: Figma 원문 텍스트 (교정 전 원문 alias 포함)\n */\n\n"
               "const I18N = " + js(i18n) + ";\n")
    with open('i18n.js', 'w', encoding='utf-8') as f:
        f.write(i18n_js)

    total_nodes = sum(len(v) for v in text_nodes.values())
    xlt_nodes = sum(1 for v in text_nodes.values() for n in v if 'xltKey' in n)
    print(f"✓ data.js 생성: 화면 {len(screens_obj)} / 인터랙션 {len(interactions)} / variant {len(variants)} / 코멘트 {len(comments)}")
    print(f"✓ textNodes: 화면 {len(text_nodes)}개, 노드 {total_nodes}개 (xltKey {xlt_nodes}개) — 추출 수 일치 검증 통과")
    print(f"✓ i18n.js 생성: 언어 {len(LANGS)}개 × 항목 {len(i18n['ko_KR'])}개")

    # 이미지 존재 확인 (경고만)
    miss_img = [s['image'] for s in screens_obj.values() if not os.path.exists(s['image'])]
    miss_img += [st['image'] for v in variants for st in v['states'] if not os.path.exists(st['image'])]
    if miss_img:
        print(f"⚠️ 이미지 파일 없음 ({len(miss_img)}건): " + ', '.join(miss_img[:5]))


if __name__ == '__main__':
    main()
