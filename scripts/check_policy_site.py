#!/usr/bin/env python3
"""Unifi Policy 사이트(policy_site/data.js) 검사 — 읽기 전용.

  python3 scripts/check_policy_site.py            # 형식 검사만
  CONFLUENCE_PAT="$(security find-generic-password -s confluence-pat -w)" \
    python3 scripts/check_policy_site.py --live   # + 정본 위키 라이브 판수 대조

exit 0 = 통과 · 1 = 형식 오류 또는 위키 판수가 기록보다 높음(재확인 필요) · 2 = 실행 오류
규칙 정본: policy_site/rules.html
"""
import argparse
import json
import os
import re
import sys
import urllib.request
from pathlib import Path

DATA = Path(__file__).resolve().parent.parent / 'policy_site' / 'data.js'
STATUSES = {'최신', '변경됨', '폐기', '확인 필요', '예정'}
SERVICES = {'Unifi', 'Unifi mini'}
REQUIRED = ['id', 'area', 'title', 'summary', 'service', 'status', 'source', 'checkedAt']


def load():
    text = DATA.read_text(encoding='utf-8')
    m = re.search(r'window\.POLICY_DATA\s*=\s*(\{.*\})\s*;?\s*$', text, re.S)
    if not m:
        sys.exit('data.js: window.POLICY_DATA = {...}; 형식이 아니다')
    return json.loads(m.group(1))


def check_format(d):
    errors, warns = [], []
    areas = {a['key'] for a in d['areas']}
    releases = {r['v'] for r in d['releases']}
    seen = set()
    for i, p in enumerate(d['policies']):
        tag = p.get('id', f'#{i}')
        for k in REQUIRED:
            if not p.get(k):
                errors.append(f'{tag}: {k} 비어 있음')
        if tag in seen:
            errors.append(f'{tag}: id 중복')
        seen.add(tag)
        if p.get('area') not in areas:
            errors.append(f'{tag}: 영역 {p.get("area")!r} 없음')
        if p.get('status') not in STATUSES:
            errors.append(f'{tag}: 상태 {p.get("status")!r} 허용 밖')
        if p.get('service') not in SERVICES:
            errors.append(f'{tag}: 서비스 {p.get("service")!r} 허용 밖')
        src = p.get('source') or {}
        if not (str(src.get('pageId', '')).isdigit() and isinstance(src.get('version'), int)):
            errors.append(f'{tag}: source.pageId·version 형식 오류')
        if p.get('release') and p['release'] not in releases:
            errors.append(f'{tag}: 적용 버전 {p["release"]!r}가 releases에 없음')
        if p.get('status') == '확인 필요' and not p.get('conflicts'):
            warns.append(f'{tag}: 확인 필요인데 conflicts(근거)가 없다')
        if p.get('status') == '변경됨' and not p.get('changes'):
            errors.append(f'{tag}: 변경됨인데 changes가 없다')
    return errors, warns


def live_versions(page_ids, pat):
    out = {}
    for pid in sorted(page_ids):
        req = urllib.request.Request(
            f'https://wiki.workers-hub.com/rest/api/content/{pid}?expand=version',
            headers={'Authorization': f'Bearer {pat}'})
        with urllib.request.urlopen(req, timeout=30) as r:
            out[pid] = json.load(r)['version']['number']
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--live', action='store_true', help='정본 위키 라이브 판수와 대조')
    args = ap.parse_args()

    d = load()
    errors, warns = check_format(d)
    for w in warns:
        print('⚠️ ', w)
    for e in errors:
        print('❌', e)
    print(f'형식: 정책 {len(d["policies"])}건 · 오류 {len(errors)} · 경고 {len(warns)}')

    drift = []
    if args.live:
        pat = os.environ.get('CONFLUENCE_PAT')
        if not pat:
            print('CONFLUENCE_PAT 환경변수가 없다', file=sys.stderr)
            return 2
        refs = {}
        for p in d['policies']:
            for ref in [p['source']] + (p.get('related') or []):
                refs.setdefault(str(ref['pageId']), []).append((p['id'], ref['version']))
        live = live_versions(refs, pat)
        for pid, uses in refs.items():
            for pol, ver in uses:
                if live[pid] > ver:
                    drift.append(f'{pol}: {pid} 기록 v{ver} → 라이브 v{live[pid]}')
        for x in drift:
            print('🔄', x)
        print(f'라이브 대조: 위키 {len(live)}건 · 재확인 필요 {len(drift)}')

    return 1 if errors or drift else 0


if __name__ == '__main__':
    sys.exit(main())
