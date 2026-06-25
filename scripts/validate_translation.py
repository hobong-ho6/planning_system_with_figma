#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
XLT 번역 데이터 검증 스크립트
md/check.md의 3단계 검증 프로세스를 자동화
"""

import pandas as pd
import re
import json
from pathlib import Path
from typing import Dict, List, Tuple

class TranslationValidator:
    def __init__(self, excel_path: str, glossary_path: str = None):
        self.excel_path = Path(excel_path)
        self.glossary_path = Path(glossary_path) if glossary_path else None
        self.df = None
        self.glossary = None
        self.issues = {'P0': [], 'P1': [], 'P2': []}

    def load_data(self):
        """엑셀 및 용어집 로드"""
        self.df = pd.read_excel(self.excel_path, sheet_name='properties')

        if self.glossary_path and self.glossary_path.exists():
            with open(self.glossary_path, 'r', encoding='utf-8') as f:
                self.glossary = json.load(f)

        print(f"✓ 엑셀 로드: {len(self.df)}개 항목")
        if self.glossary:
            print(f"✓ 용어집 로드: {len(self.glossary.get('terminology', {}))}개 용어")

    def validate_step1_korean(self):
        """1단계: 한국어 맞춤법·띄어쓰기 검증"""
        print("\n=== 1단계: 한국어 검증 ===")

        p0_before = len(self.issues['P0'])
        p1_before = len(self.issues['P1'])

        ko_col = 'ko_KR'
        if ko_col not in self.df.columns:
            print("⚠️ ko_KR 컬럼을 찾을 수 없습니다")
            return

        for idx, row in self.df.iterrows():
            key = row.iloc[0]  # XLT Key
            text = row[ko_col]

            if pd.isna(text):
                self.issues['P0'].append({
                    'key': key,
                    'issue': '빈칸',
                    'detail': 'ko_KR 값이 비어있음'
                })
                continue

            text = str(text)

            # 외래어 음차 오염 / 알려진 표기 오류 (수동 검토 누적 패턴 — 정확 일치만, 자동 검출 보강용)
            # 자동 검증은 "시작점"일 뿐 — 신규 패턴은 전체 행 수동 검토로 잡는다(md/check.md).
            KO_BLOCKLIST = {
                '포이가츠': "일본어 'ポイ活' 음차 오염 → '포인트(미션)' 권장",
                '누리고다양한': "띄어쓰기 누락 → '누리고 다양한'",
                '피부결과 윤곽': "다의어 모호('피부 결과' vs '피부결, 윤곽') → 원문 명확화 권장",
            }
            for bad, fix in KO_BLOCKLIST.items():
                if bad in text:
                    self.issues['P1'].append({
                        'key': key,
                        'issue': '표기 오류',
                        'detail': f"{fix} ({text})"
                    })

            # 맞춤법 검사
            if '되요' in text:
                self.issues['P1'].append({
                    'key': key,
                    'issue': '맞춤법',
                    'detail': f"'되요' → '돼요' ({text})"
                })

            if re.search(r'됬[어음았]', text):
                self.issues['P1'].append({
                    'key': key,
                    'issue': '맞춤법',
                    'detail': f"'됬-' → '됐-' ({text})"
                })

            # 띄어쓰기 검사 (의존명사 '시' — 행위 명사에 붙여 쓴 경우만 검출)
            if re.search(r'(신청|출금|입금|확인|유지|취소|변경|등록|삭제|사용|미사용|결제|이용|전송|로그인|가입|실패|오류|완료|선택|입력)시(?![간감각야])', text):
                self.issues['P1'].append({
                    'key': key,
                    'issue': '띄어쓰기',
                    'detail': f"의존명사 '시' 띄어쓰기 필요 ({text})"
                })

            if '할수있' in text or '할수 있' in text:
                self.issues['P1'].append({
                    'key': key,
                    'issue': '띄어쓰기',
                    'detail': f"'할 수 있-'로 수정 ({text})"
                })

            # 비표준 공백 검사
            if '\xa0' in text:
                self.issues['P0'].append({
                    'key': key,
                    'issue': '비표준 공백',
                    'detail': 'non-breaking space(\\xa0) 발견'
                })

            # 개행 오타
            if '/n' in text:
                self.issues['P0'].append({
                    'key': key,
                    'issue': '개행 오타',
                    'detail': "'/n' → '\\n' 수정 필요"
                })

        # P2: 마침표 스타일 일관성 (문장형 텍스트 중 소수 스타일 검출)
        sentence_rows = []
        for idx, row in self.df.iterrows():
            text = row[ko_col]
            if pd.isna(text):
                continue
            text = str(text).strip()
            if ' ' in text and len(text) >= 10:
                sentence_rows.append((row.iloc[0], text, text.endswith(('.', '。'))))
        with_period = [r for r in sentence_rows if r[2]]
        without_period = [r for r in sentence_rows if not r[2]]
        if with_period and without_period:
            minority = with_period if len(with_period) < len(without_period) else without_period
            style = "마침표 있음" if minority is with_period else "마침표 없음"
            for key, text, _ in minority:
                self.issues['P2'].append({
                    'key': key,
                    'issue': '마침표 스타일',
                    'detail': f"문장형 텍스트 중 소수 스타일({style}): {text}"
                })

        print(f"✓ 한국어 검증 완료: P0 {len(self.issues['P0']) - p0_before}건, "
              f"P1 {len(self.issues['P1']) - p1_before}건, P2 {len(self.issues['P2'])}건")

    def validate_step2_glossary(self):
        """2단계: 용어집 위반 검증"""
        print("\n=== 2단계: 용어집 검증 ===")

        if not self.glossary:
            print("⚠️ 용어집이 로드되지 않음. 2단계 건너뜀")
            return

        exceptions = self.glossary.get('exceptions', [])
        terminology = self.glossary.get('terminology', {})

        for idx, row in self.df.iterrows():
            key = row.iloc[0]
            ko_text = str(row.get('ko_KR', ''))

            # 예외 패턴 검사 (번역하지 말아야 할 용어)
            for exc in exceptions:
                if not exc.get('active', True):
                    continue
                term = exc['pattern'].strip('*')
                if term in ko_text:
                    # 다른 언어에서 변형되었는지 확인
                    for lang in ['en_US', 'ja_JP', 'zh_TW', 'th_TH']:
                        lang_text = str(row.get(lang, ''))
                        expected = exc.get('translations', {}).get(lang, term)
                        if expected not in lang_text and lang_text:
                            self.issues['P0'].append({
                                'key': key,
                                'issue': '용어집 위반',
                                'detail': f"{lang}: '{expected}' 원어 유지 필요"
                            })

            # 핵심 용어 번역 일관성 검사
            for ko_term, translations in terminology.items():
                if ko_term in ko_text:
                    for lang, correct_trans in translations.items():
                        if lang == 'ko_KR':
                            continue
                        lang_text = str(row.get(lang, ''))
                        if lang_text and correct_trans not in lang_text:
                            self.issues['P1'].append({
                                'key': key,
                                'issue': '용어 불일치',
                                'detail': f"{lang}: '{ko_term}' → '{correct_trans}' 권장"
                            })

        print(f"✓ 용어집 검증 완료")

    def validate_step3_other_languages(self):
        """3단계: 다른 언어 번역 검증"""
        print("\n=== 3단계: 다국어 검증 ===")

        languages = ['en_US', 'ja_JP', 'zh_TW', 'th_TH']

        for idx, row in self.df.iterrows():
            key = row.iloc[0]
            ko_text = str(row.get('ko_KR', ''))

            # 빈칸 검사
            for lang in languages:
                if pd.isna(row.get(lang)):
                    self.issues['P0'].append({
                        'key': key,
                        'issue': '빈칸',
                        'detail': f"{lang} 값이 비어있음"
                    })

            # placeholder 일치 검사
            ko_placeholders = re.findall(r'\{\{\d+\}\}', ko_text)
            for lang in languages:
                lang_text = str(row.get(lang, ''))
                lang_placeholders = re.findall(r'\{\{\d+\}\}', lang_text)
                if set(ko_placeholders) != set(lang_placeholders):
                    self.issues['P1'].append({
                        'key': key,
                        'issue': 'placeholder 불일치',
                        'detail': f"{lang}: {ko_placeholders} vs {lang_placeholders}"
                    })

            # 개행 오타
            for lang in languages:
                lang_text = str(row.get(lang, ''))
                if '/n' in lang_text:
                    self.issues['P0'].append({
                        'key': key,
                        'issue': '개행 오타',
                        'detail': f"{lang}: '/n' → '\\n' 수정 필요"
                    })

            # 언어 혼입 검사 (간단 버전)
            en_text = str(row.get('en_US', ''))
            if re.search(r'[가-힣]', en_text):
                self.issues['P0'].append({
                    'key': key,
                    'issue': '언어 혼입',
                    'detail': f"en_US에 한글 포함: {en_text}"
                })

        print(f"✓ 다국어 검증 완료")

    def generate_report(self) -> str:
        """검증 리포트 생성"""
        report = []
        report.append("# 번역 검증 리포트\n")
        report.append(f"파일: {self.excel_path.name}\n")
        report.append(f"총 항목: {len(self.df)}개\n\n")

        report.append("## Executive Summary\n")
        report.append("| 심각도 | 건수 | 카테고리 |\n")
        report.append("|--------|------|----------|\n")
        report.append(f"| 🔴 P0 (Critical) | {len(self.issues['P0'])}건 | 빈칸, 오타, 언어 혼입, 용어집 표기 위반 |\n")
        report.append(f"| 🟡 P1 (Medium) | {len(self.issues['P1'])}건 | 표현 어색, placeholder 불일치, 일관성 위반 |\n")
        report.append(f"| 🟢 P2 (Low) | {len(self.issues['P2'])}건 | 스타일 선호 (마침표, 쉼표) |\n\n")

        for priority in ['P0', 'P1', 'P2']:
            if self.issues[priority]:
                report.append(f"## {priority} 이슈\n\n")
                for issue in self.issues[priority][:20]:  # 최대 20개만 표시
                    report.append(f"- **{issue['key']}**: [{issue['issue']}] {issue['detail']}\n")
                if len(self.issues[priority]) > 20:
                    report.append(f"\n... 외 {len(self.issues[priority]) - 20}건\n")
                report.append("\n")

        return "".join(report)

    def run(self):
        """전체 검증 실행"""
        self.load_data()
        self.validate_step1_korean()
        self.validate_step2_glossary()
        self.validate_step3_other_languages()

        report = self.generate_report()

        # 리포트 저장
        report_path = self.excel_path.parent / f"{self.excel_path.stem}_validation_report.md"
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report)

        print(f"\n✓ 검증 리포트 생성: {report_path}")
        print(report)

        return self.issues

if __name__ == '__main__':
    import sys

    if len(sys.argv) < 2:
        print("사용법: python validate_translation.py <엑셀파일경로> [용어집경로]")
        sys.exit(1)

    excel_path = sys.argv[1]
    glossary_path = sys.argv[2] if len(sys.argv) > 2 else None

    validator = TranslationValidator(excel_path, glossary_path)
    issues = validator.run()
    sys.exit(1 if issues['P0'] else 0)
