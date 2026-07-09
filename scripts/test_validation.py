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
from patch_translation import apply_translation_patch, load_rows_from_excel
from check_gate_report import check_gate_report

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
    # P0 언어 혼입/컬럼 회전 어긋남 (2026-07 cat_eye류) — en칸에 한자, ja칸에 한글, ko칸에 영어
    {"xlt_key": "KW_t_swap", "ko_KR": "Ophthalmology", "en_US": "眼科",
     "ja_JP": "안과", "zh_TW": "眼科", "th_TH": "จักษุ"},
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
check("P0 언어 혼입: 컬럼 회전 어긋남(en 한자·ja 한글) 검출", has_issue(issues, "P0", "KW_t_swap", "언어 혼입"))
check("P1 언어 의심: ko 라틴-only(영어 오배치) 검출", has_issue(issues, "P1", "KW_t_swap", "언어 의심"))
check("P2 마침표 스타일 검출", any(i["issue"] == "마침표 스타일" for i in issues["P2"]))

# --- 3. 번역 패치 (md/translate.md 키 단위 번역 패치 모드) ---
print("\n[3] 번역 패치 검사")
base = [
    {"xlt_key": "KW_p1", "ko_KR": "로그인", "en_US": "Log in", "ja_JP": "ログイン", "zh_TW": "登入", "th_TH": "เข้าสู่ระบบ"},
    {"xlt_key": "KW_p2", "ko_KR": "확인", "en_US": "Confirm", "ja_JP": "確認", "zh_TW": "確認", "th_TH": "ยืนยัน"},
]
# 3-1) 특정 언어만 교체, 나머지 보존
rows = [dict(r) for r in base]
rows, log = apply_translation_patch(rows, [{"xlt_key": "KW_p2", "values": {"th_TH": "ตกลง"}}])
p2 = next(r for r in rows if r["xlt_key"] == "KW_p2")
check("lang-specific: th_TH만 교체", p2["th_TH"] == "ตกลง")
check("lang-specific: 미지정 언어 보존", p2["en_US"] == "Confirm" and p2["ko_KR"] == "확인")
check("lang-specific: 변경로그 1건", len(log) == 1 and log[0][:2] == ("KW_p2", "th_TH"))
# 3-2) ko 변경 + 여러 언어 동시 교체
rows = [dict(r) for r in base]
rows, log = apply_translation_patch(rows, [{"xlt_key": "KW_p1", "values": {"ko_KR": "로그인 하기", "en_US": "Sign in"}}])
p1 = next(r for r in rows if r["xlt_key"] == "KW_p1")
check("ko-source: ko+en 교체", p1["ko_KR"] == "로그인 하기" and p1["en_US"] == "Sign in")
check("ko-source: 나머지 언어 보존", p1["ja_JP"] == "ログイン" and p1["zh_TW"] == "登入")
# 3-3) 무결성 가드
def expect_error(name, fn):
    try:
        fn(); check(name + " (예외 발생해야 함)", False)
    except ValueError:
        check(name, True)
expect_error("없는 키 패치 차단", lambda: apply_translation_patch([dict(r) for r in base], [{"xlt_key": "NOPE", "values": {"en_US": "x"}}]))
expect_error("빈 값 차단", lambda: apply_translation_patch([dict(r) for r in base], [{"xlt_key": "KW_p1", "values": {"en_US": "  "}}]))
expect_error("미지 언어 차단", lambda: apply_translation_patch([dict(r) for r in base], [{"xlt_key": "KW_p1", "values": {"fr_FR": "x"}}]))
# 3-4) 엑셀 왕복 후 패치 (load_rows_from_excel)
rt = load_rows_from_excel(filepath)
check("엑셀 로드 행 수 일치", len(rt) == len(TEST_DATA))

# --- 4. 컬럼 정렬 가드 (1g — md/translate.md 패치 모드 Step 2-1) ---
print("\n[4] 컬럼 정렬 가드 검사")
mis = [{"xlt_key": "KW_c", "ko_KR": "Ophthalmology", "en_US": "眼科",
        "ja_JP": "안과", "zh_TW": "眼科", "th_TH": "จักษุ"}]  # ko=영어·en=한자·ja=한글 회전 어긋남
expect_error("단일 언어(ja)만 패치 → 회전 어긋남 행에서 차단",
             lambda: apply_translation_patch([dict(r) for r in mis],
                     [{"xlt_key": "KW_c", "values": {"ja_JP": "眼科"}}]))
rows_ok, _ = apply_translation_patch([dict(r) for r in mis],
    [{"xlt_key": "KW_c", "values": {"ko_KR": "안과", "en_US": "Ophthalmology", "ja_JP": "眼科"}}])
c = next(r for r in rows_ok if r["xlt_key"] == "KW_c")
check("어긋난 컬럼 전부 realign 시 통과 + 정렬 정상",
      c["ko_KR"] == "안과" and c["en_US"] == "Ophthalmology" and c["ja_JP"] == "眼科")
try:
    apply_translation_patch([dict(r) for r in mis],
        [{"xlt_key": "KW_c", "values": {"ja_JP": "眼科"}}], allow_misaligned=True)
    check("allow_misaligned=True 우회 허용", True)
except ValueError:
    check("allow_misaligned=True 우회 허용", False)

# --- 5. 게이트 리포트 완결성 검사기 (1a·1c·1d) ---
print("\n[5] 게이트 리포트 완결성 검사")
complete = (
    "# 번역 검증 리포트\n"
    "## Executive Summary  P0 0건 P1 3건 P2 1건\n"
    "## 1단계: 한국어 (원문 교정 완료, alias 기록)\n"
    "## 2단계: 용어집\n## 3단계: 다른 언어\n"
    "처리 판정: 오탐 3건, 실제 위반 0건. 전수 검토(전체 행) 완료.\n"
    "## 추가 개선·제안 (권장)\n"
)
check("완결 리포트 → 누락 0건", check_gate_report(complete) == [])
missing = check_gate_report("# 리포트\n자동 검증 P0 0건 P1 0건 P2 0건\n")
check(f"불완전 리포트 → 누락 검출 ({len(missing)}건)", len(missing) >= 3)

# --- 결과 ---
print(f"\n{'='*40}")
if failures:
    print(f"❌ 테스트 실패: {len(failures)}건")
    for f in failures:
        print(f"  - {f}")
    sys.exit(1)
print("✅ 전체 테스트 통과")
sys.exit(0)
