#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
export_to_xlt.py / validate_translation.py 회귀 테스트

스크립트 수정 후 실행하여 XLT 엑셀 규격과 검증 로직이 깨지지 않았는지 확인한다.
네트워크 불필요 (용어집은 내장 픽스처 사용).

사용법: python3 scripts/test_validation.py
종료 코드: 통과 0, 실패 1
"""

import json
import sys
import tempfile
from pathlib import Path

import pandas as pd

sys.path.insert(0, str(Path(__file__).parent))
from export_to_xlt import create_xlt_excel
from validate_translation import TranslationValidator

# 용어집 픽스처 (실제 API 응답과 동일한 구조)
GLOSSARY = {
    "metadata": {"source": "test_fixture", "version": "0"},
    "exceptions": [
        {
            "id": "1", "note": "고유명사 - 그대로 유지", "active": True,
            "pattern": "*PIN*",
            "translations": {"en_US": "PIN", "ja_JP": "PIN", "ko_KR": "PIN", "th_TH": "PIN", "zh_TW": "PIN"},
            "exception_type": "context",
        }
    ],
    "terminology": {
        "출금": {"en_US": "withdrawal", "ja_JP": "出金", "ko_KR": "출금", "th_TH": "ถอน", "zh_TW": "提領"}
    },
}

# 테스트 데이터: 정상 2건 + 의도된 이슈 3건
TEST_DATA = [
    # 정상 — '다시', '메시지', '표시'가 띄어쓰기 검사에 오탐되면 안 됨
    {"xlt_key": "KW_t_ok1", "ko_KR": "다시 시도해 주세요.", "en_US": "Please try again.",
     "ja_JP": "もう一度お試しください。", "zh_TW": "請再試一次。", "th_TH": "โปรดลองอีกครั้ง"},
    {"xlt_key": "KW_t_ok2", "ko_KR": "메시지가 표시됩니다.", "en_US": "A message is displayed.",
     "ja_JP": "メッセージが表示されます。", "zh_TW": "將顯示訊息。", "th_TH": "ข้อความจะแสดงขึ้น"},
    # P1 띄어쓰기 ('출금시') + P1 용어 불일치 (zh_TW '출금' ≠ 提領)
    {"xlt_key": "KW_t_p1", "ko_KR": "출금시 수수료가 발생합니다", "en_US": "A fee applies when withdrawing",
     "ja_JP": "出金時に手数料が発生します", "zh_TW": "提款時將產生手續費", "th_TH": "มีค่าธรรมเนียมเมื่อถอน"},
    # P0 빈칸 (zh_TW) + P0 용어집 위반 (PIN을 ja_JP에서 번역)
    {"xlt_key": "KW_t_p0", "ko_KR": "PIN 입력", "en_US": "Enter PIN",
     "ja_JP": "暗証番号を入力", "zh_TW": "", "th_TH": "ใส่ PIN"},
    # P1 맞춤법 ('되요') + P1 placeholder 불일치
    {"xlt_key": "KW_t_mix", "ko_KR": "{{0}}원이 입금 되요", "en_US": "{{1}} deposited",
     "ja_JP": "{{0}}ウォンが入金されました", "zh_TW": "{{0}}元已存入", "th_TH": "ฝาก {{0}} วอนแล้ว"},
    # P1 외래어 음차 blocklist ('포이가츠') — 자동 검증이 구조적으로 못 잡던 패턴
    {"xlt_key": "KW_t_loan", "ko_KR": "포이가츠 미션으로 받기", "en_US": "Get with point missions",
     "ja_JP": "ポイ活ミッションで受け取る", "zh_TW": "透過點數任務領取", "th_TH": "รับผ่านภารกิจสะสมแต้ม"},
]

failures = []

def check(name, cond):
    print(f"  {'✓' if cond else '✗ FAIL:'} {name}")
    if not cond:
        failures.append(name)

def has_issue(issues, priority, key, issue_name):
    return any(i["key"] == key and i["issue"] == issue_name for i in issues[priority])


tmpdir = tempfile.mkdtemp(prefix="xlt_test_")

# --- 1. 엑셀 규격 (md/translate.md Step 7) ---
print("\n[1] 엑셀 규격 검사")
filepath = create_xlt_excel(TEST_DATA, output_dir=tmpdir)

df = pd.read_excel(filepath, sheet_name="properties")
check("properties 첫 컬럼은 빈 헤더 (Unnamed: 0)", df.columns[0] == "Unnamed: 0")
check("properties 언어 컬럼 5개 존재",
      all(c in df.columns for c in ["en_US", "ko_KR", "ja_JP", "zh_TW", "th_TH"]))
check("properties 행 수 = 입력 데이터 수", len(df) == len(TEST_DATA))

df_plurals = pd.read_excel(filepath, sheet_name="plurals")
check("plurals 시트 1행", len(df_plurals) == 1)
check("plurals 컬럼 구조 (Unnamed: 0 | en_US | Unnamed: 2 | ko_KR | ja_JP | zh_TW | th_TH)",
      list(df_plurals.columns) == ["Unnamed: 0", "en_US", "Unnamed: 2", "ko_KR", "ja_JP", "zh_TW", "th_TH"])
check("plurals 값: en_US=one, 나머지=other",
      df_plurals.iloc[0]["en_US"] == "one" and df_plurals.iloc[0]["ko_KR"] == "other")

# --- 2. 검증 로직 (md/check.md 3단계 검증) ---
print("\n[2] 검증 로직 검사")
glossary_path = Path(tmpdir) / "glossary.json"
glossary_path.write_text(json.dumps(GLOSSARY, ensure_ascii=False), encoding="utf-8")

validator = TranslationValidator(filepath, glossary_path)
issues = validator.run()

print("\n[2-1] 오탐 검사 (정상 데이터가 P0/P1에 잡히면 안 됨)")
ok_keys = {"KW_t_ok1", "KW_t_ok2"}
false_positives = [i for p in ("P0", "P1") for i in issues[p] if i["key"] in ok_keys]
check(f"정상 항목 오탐 0건 (발견: {false_positives})", not false_positives)

print("\n[2-2] 의도된 이슈 검출 검사")
check("P1 띄어쓰기: '출금시' 검출", has_issue(issues, "P1", "KW_t_p1", "띄어쓰기"))
check("P1 용어 불일치: zh_TW '출금'→'提領' 검출", has_issue(issues, "P1", "KW_t_p1", "용어 불일치"))
check("P0 용어집 위반: ja_JP PIN 번역 검출", has_issue(issues, "P0", "KW_t_p0", "용어집 위반"))
check("P0 빈칸: zh_TW 검출", has_issue(issues, "P0", "KW_t_p0", "빈칸"))
check("P1 맞춤법: '되요' 검출", has_issue(issues, "P1", "KW_t_mix", "맞춤법"))
check("P1 placeholder 불일치 검출", has_issue(issues, "P1", "KW_t_mix", "placeholder 불일치"))
check("P1 외래어 음차 blocklist: '포이가츠' 검출", has_issue(issues, "P1", "KW_t_loan", "표기 오류"))
check("P2 마침표 스타일 검출", any(i["issue"] == "마침표 스타일" for i in issues["P2"]))

# --- 결과 ---
print(f"\n{'='*40}")
if failures:
    print(f"❌ 테스트 실패: {len(failures)}건")
    for f in failures:
        print(f"  - {f}")
    sys.exit(1)
print("✅ 전체 테스트 통과")
sys.exit(0)
