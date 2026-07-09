#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
번역 품질 게이트 리포트 완결성 검사기 (CLAUDE.md '⛔ 번역 품질 게이트', md/translate.md Step 5.3)

⛔ 번역 결과를 출력·위키 반영·XLT 엑셀 생성으로 넘기기 전, "완료"를 선언하기 직전에
반드시 실행한다. 게이트 리포트가 아래 필수 요소를 모두 담고 있지 않으면 그 번역은 미완료다.
(과거 ⓐ 자동 리포트만 남기고 수동 검토를 문서화하지 않음, ⓑ 한국어 원문 교정 누락,
 ⓒ (d) 권장 섹션 누락 사례를 산출물 검사로 강제하기 위함.)

이 검사기는 "리포트에 필수 항목이 서술되어 있는지"만 본다 — 사람이 실제로 전수 검토했는지는
검사하지 못한다. 그러나 필수 산출물의 존재를 강제해 "prose 규칙"을 "통과/실패 산출물"로 바꾼다.

사용:
  python3 scripts/check_gate_report.py <리포트.md>
  → 모든 필수 요소 존재: exit 0 ("✅ 게이트 리포트 완결")
  → 누락: exit 1 (누락 항목 목록 출력)
"""

import sys
from pathlib import Path

# (라벨, 모드, 키워드) — 모드 'all'=모두 포함, 'any'=하나 이상 포함
REQUIREMENTS = [
    ("자동 검증 P0/P1/P2 요약",          "all", ["P0", "P1", "P2"]),
    ("수동 3단계 체크표(1·2·3단계)",     "all", ["1단계", "2단계", "3단계"]),
    ("각 건 처리 판정(실제/오탐/정책)",   "any", ["오탐", "처리 판정", "실제 위반"]),
    ("(d) 추가 개선·제안(권장)",          "any", ["추가 개선", "제안"]),
    ("한국어 원문 교정(1a)",              "any", ["원문 교정", "교정", "alias"]),
    ("전수 점검 명시(신규 키 한정 금지)", "any", ["전수", "전체 행", "전체 파일"]),
]


def check_gate_report(text: str) -> list:
    """리포트 본문에서 누락된 필수 요소 라벨 목록을 반환(빈 리스트면 완결)."""
    missing = []
    for label, mode, keywords in REQUIREMENTS:
        hit = [k for k in keywords if k in text]
        ok = (len(hit) == len(keywords)) if mode == "all" else bool(hit)
        if not ok:
            missing.append(label)
    return missing


def main(argv):
    if len(argv) < 2:
        print("사용: python3 scripts/check_gate_report.py <게이트리포트.md>")
        return 2
    path = Path(argv[1])
    if not path.exists():
        print(f"❌ 리포트 파일 없음: {path}")
        return 2
    text = path.read_text(encoding="utf-8")
    missing = check_gate_report(text)
    if missing:
        print(f"❌ 게이트 리포트 미완결 — 누락 {len(missing)}건 (이 번역은 '완료' 아님):")
        for m in missing:
            print(f"  - {m}")
        print("\n→ md/translate.md Step 5.3 / md/check.md 게이트 규칙에 따라 누락 요소를 채운 뒤 재실행하세요.")
        return 1
    print("✅ 게이트 리포트 완결 — 필수 요소 6종 모두 존재")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
