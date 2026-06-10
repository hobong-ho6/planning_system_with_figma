#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
용어집 API 조회 및 저장 스크립트
md/guide.md의 API 엔드포인트에서 최신 용어집 다운로드
"""

import requests
import json
from pathlib import Path

API_ENDPOINT = "https://landpress-content.line-scdn.net/contents/v2/projects/wdmwbfuv10x39bukv58ocevp/collections/web3_xlt_json/item"

def fetch_glossary():
    """용어집 API 조회"""
    print("용어집 API 조회 중...")

    try:
        response = requests.get(API_ENDPOINT, timeout=10)
        response.raise_for_status()

        data = response.json()
        glossary = data['body']['exceptions']

        print(f"✓ API 조회 성공")
        print(f"  - 버전: {glossary['metadata']['version']}")
        print(f"  - 용어 수: {glossary['metadata']['total_terms']}")
        print(f"  - 예외 패턴 수: {glossary['metadata']['total_exceptions']}")

        return glossary

    except requests.exceptions.RequestException as e:
        print(f"❌ API 조회 실패: {e}")
        return None

def save_glossary(glossary: dict, output_path: str = "scripts/glossary.json"):
    """용어집을 JSON 파일로 저장"""
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(glossary, f, ensure_ascii=False, indent=2)

    print(f"✓ 용어집 저장: {output_path}")

def print_summary(glossary: dict):
    """용어집 요약 출력"""
    print("\n=== 번역 예외 패턴 ===")
    for exc in glossary.get('exceptions', [])[:5]:
        print(f"  - {exc}")
    print(f"  ... 외 {len(glossary.get('exceptions', [])) - 5}개\n")

    print("=== 핵심 용어 (샘플) ===")
    terms = glossary.get('terminology', {})
    for i, (ko, translations) in enumerate(list(terms.items())[:5]):
        print(f"  - {ko}:")
        for lang, trans in translations.items():
            if lang != 'ko_KR':
                print(f"    {lang}: {trans}")
    print(f"  ... 외 {len(terms) - 5}개 용어\n")

if __name__ == '__main__':
    import sys

    output_path = sys.argv[1] if len(sys.argv) > 1 else "scripts/glossary.json"

    glossary = fetch_glossary()

    if glossary:
        save_glossary(glossary, output_path)
        print_summary(glossary)
    else:
        print("용어집 조회 실패")
        sys.exit(1)
