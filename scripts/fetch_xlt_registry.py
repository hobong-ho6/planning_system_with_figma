#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
XLT 시스템 등록값(레지스트리) 조회 스크립트
md/xlt-verify.md의 API 절차 구현 — fetch_glossary.py의 XLT판 대칭 스크립트

읽기 전용 API만 사용한다. 쓰기(POST) 경로는 확인된 바 없으며 시도하지 않는다.
"""

import argparse
import json
import sys
import unicodedata
from datetime import datetime
from difflib import SequenceMatcher
from pathlib import Path
from urllib.parse import quote

import requests

BASE = "https://xlt-api.linecorp.com"
LANGS = ['ko_KR', 'ja_JP', 'en_US', 'th_TH', 'zh_TW']

# 서비스/디바이스 목록 API는 존재하지 않는다(404 실측 — md/xlt-verify.md §2-3).
# 유효 조합은 이 후보를 프로브해 판별한다. 새 서비스를 알게 되면 여기에 추가한다.
CANDIDATE_TARGETS = [
    ('Dapp Portal', 'WEB BROWSER'),
    ('Unifi', 'WEB BROWSER'),
    ('Kaia Wallet', 'WEB BROWSER'),
]


def _get_json(url: str, timeout: int = 30):
    """GET 후 JSON 파싱. 사내 프록시 로그인 페이지(200 + HTML)도 실패로 잡는다."""
    res = requests.get(url, timeout=timeout)
    res.raise_for_status()
    try:
        return res.json()
    except ValueError:
        raise RuntimeError(
            f"JSON이 아닌 응답({len(res.content)}B). 사내망/VPN 연결과 프록시 로그인 여부를 확인하세요.\n  URL: {url}"
        )


def list_versions(service: str, device: str, limit: int = 30) -> list:
    """버전 목록 조회. 무효한 service/device도 200 + 빈 result를 반환한다."""
    url = f"{BASE}/xlt/info/versions/{quote(service)}/{quote(device)}?limit={limit}"
    data = _get_json(url)
    if data.get('code') != '0':
        raise RuntimeError(f"API 오류 code={data.get('code')} msg={data.get('msg')}")
    return data.get('result') or []


def probe_targets(candidates=CANDIDATE_TARGETS) -> list:
    """후보 조합을 프로브해 유효한 것만 반환. [{service, device, latest, total_versions}]"""
    found = []
    for service, device in candidates:
        try:
            versions = list_versions(service, device, limit=1000)
        except Exception as e:
            print(f"  ! {service} / {device}: {e}", file=sys.stderr)
            continue
        if versions:
            found.append({
                'service': service, 'device': device,
                'latest': versions[0]['versionName'],
                'latest_seq': versions[0]['versionSeq'],
                'total_versions': len(versions),
            })
    return found


def fetch_registry(service: str, device: str, version: str) -> dict:
    """5개 언어를 조회해 {키: {lang: 값}}으로 pivot한다."""
    per_lang = {}
    for lang in LANGS:
        url = f"{BASE}/downloadXLT/{quote(service)}/{quote(device)}/{quote(version)}/{lang}/json"
        data = _get_json(url)
        if not isinstance(data, dict):
            raise RuntimeError(f"{lang}: 예상과 다른 응답 형태({type(data).__name__})")
        per_lang[lang] = data
        print(f"  {lang}: {len(data)}키")
    return {'metadata': _metadata(service, device, version, per_lang),
            'entries': pivot(per_lang)}


def pivot(per_lang: dict) -> dict:
    """{lang: {키: 값}} → {키: {lang: 값}}. 키셋이 갈리면 합집합 + 경고(조용히 채우지 않는다)."""
    keysets = {lang: set(d) for lang, d in per_lang.items()}
    union = set().union(*keysets.values())
    for lang, ks in keysets.items():
        missing = union - ks
        if missing:
            print(f"  ⚠️ {lang}에 없는 키 {len(missing)}개 (예: {sorted(missing)[:3]})", file=sys.stderr)
    return {k: {lang: per_lang[lang].get(k, '') for lang in per_lang} for k in sorted(union)}


def _metadata(service: str, device: str, version: str, per_lang: dict) -> dict:
    return {
        'service': service, 'device': device, 'version': version,
        'languages': list(per_lang),
        'total_keys': len(set().union(*(set(d) for d in per_lang.values()))),
        'fetched_at': datetime.now().astimezone().isoformat(timespec='seconds'),
        'source': f"{BASE}/downloadXLT",
    }


def _norm(s: str) -> str:
    """유사도 비교용 정규화 — NFKC + 공백/개행 제거."""
    return ''.join(unicodedata.normalize('NFKC', s).split())


def find_similar(entries: dict, text: str, lang: str = 'ko_KR',
                 threshold: float = 0.70, top: int = 5) -> list:
    """등록값에서 같거나 비슷한 문구의 키를 찾는다. [{key, value, ratio, kind}]"""
    target = _norm(text)
    hits = []
    for key, row in entries.items():
        value = row.get(lang, '')
        if not value:
            continue
        norm = _norm(value)
        if norm == target:
            kind, ratio = ('동일' if value == text else '정규화 동일'), 1.0
        else:
            ratio = SequenceMatcher(None, target, norm).ratio()
            if ratio < threshold:
                continue
            kind = '유사'
        hits.append({'key': key, 'value': value, 'ratio': round(ratio, 3), 'kind': kind})
    hits.sort(key=lambda h: -h['ratio'])
    return hits[:top]


def save(registry: dict, output_path: str):
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(registry, f, ensure_ascii=False, indent=2)
    print(f"✓ 레지스트리 저장: {path}")


def main():
    p = argparse.ArgumentParser(description="XLT 시스템 등록값 조회 (읽기 전용)")
    p.add_argument('--service')
    p.add_argument('--device', default='WEB BROWSER')
    p.add_argument('--version', help="미지정 시 최신(versionSeq 최댓값)")
    p.add_argument('--output', default='scripts/xlt_registry.json')
    p.add_argument('--list-targets', action='store_true', help="유효한 service/device 조합 프로브")
    p.add_argument('--list-versions', action='store_true', help="해당 타겟의 버전 목록만 출력")
    p.add_argument('--similar', metavar='문구', help="등록값에서 같거나 비슷한 문구의 키 검색")
    p.add_argument('--registry', help="--similar 시 조회 대신 이 JSON을 사용(같은 run 핸드오프 전용)")
    p.add_argument('--threshold', type=float, default=0.70, help="--similar 유사도 하한 (기본 0.70)")
    args = p.parse_args()

    if args.list_targets:
        print("유효 타겟 프로브 중...")
        for t in probe_targets():
            print(f"  ✓ {t['service']:14} / {t['device']:12} 최신 {t['latest']:12} (버전 {t['total_versions']}개)")
        return

    if args.similar and args.registry:
        registry = json.load(open(args.registry, encoding='utf-8'))
    else:
        if not args.service:
            p.error("--service가 필요합니다 (--list-targets로 확인)")
        if args.list_versions:
            for v in list_versions(args.service, args.device, limit=1000):
                print(f"  {v['versionSeq']:>6}  {v['versionName']}")
            return
        version = args.version
        if not version:
            versions = list_versions(args.service, args.device, limit=1000)
            if not versions:
                print(f"❌ 등록된 버전이 없습니다: {args.service} / {args.device}", file=sys.stderr)
                sys.exit(1)
            version = versions[0]['versionName']
        # 채택 버전은 반드시 출력한다 — '최신'이 배포 전 draft일 수 있어 사람이 확인해야 한다
        print(f"조회: {args.service} / {args.device} / {version}")
        registry = fetch_registry(args.service, args.device, version)

    if args.similar:
        hits = find_similar(registry['entries'], args.similar, threshold=args.threshold)
        if not hits:
            print("  (같거나 비슷한 등록값 없음 — 신규 키 생성 대상)")
        for h in hits:
            print(f"  [{h['kind']}/{h['ratio']}] {h['key']}\n      {h['value']!r}")
        return

    meta = registry['metadata']
    print(f"✓ {meta['total_keys']}키 × {len(meta['languages'])}개 언어")
    save(registry, args.output)


if __name__ == '__main__':
    try:
        main()
    except requests.exceptions.RequestException as e:
        print(f"❌ 조회 실패(사내망/VPN 확인): {e}", file=sys.stderr)
        sys.exit(1)
    except RuntimeError as e:
        print(f"❌ {e}", file=sys.stderr)
        sys.exit(1)
