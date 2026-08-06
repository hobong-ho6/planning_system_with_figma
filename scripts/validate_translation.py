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
    # 각 언어 칸에서 '이질'로 취급하는 문자체계 (라틴/숫자/기호는 공용 허용)
    # ja_JP·zh_TW는 한자(cjk)를 공유하므로 서로의 cjk는 이질로 보지 않는다.
    FOREIGN_SCRIPTS = {
        'en_US': ['hangul', 'kana', 'thai', 'cjk'],
        'ja_JP': ['hangul', 'thai'],
        'zh_TW': ['hangul', 'kana', 'thai'],
        'th_TH': ['hangul', 'kana', 'cjk'],
        'ko_KR': ['kana', 'thai'],   # cjk/latin-only는 아래 특례로 별도 처리
    }

    @staticmethod
    def _scripts(s: str) -> dict:
        """문자열에 포함된 문자체계 존재 여부."""
        return {
            'hangul': bool(re.search(r'[가-힣ᄀ-ᇿ㄰-㆏]', s)),
            'kana':   bool(re.search(r'[぀-ヿㇰ-ㇿ]', s)),
            'thai':   bool(re.search(r'[฀-๿]', s)),
            'cjk':    bool(re.search(r'[㐀-䶿一-鿿豈-﫿]', s)),
        }

    @classmethod
    def foreign_script_issues(cls, row: dict) -> list:
        """행에서 컬럼별 이질 문자체계(P0 언어 혼입/컬럼 어긋남)를 찾아 반환.

        반환: [{'lang', 'foreign': [문자체계...], 'cell'}, ...]
        patch_translation.py의 컬럼 정렬 가드와 검증 3단계가 공유한다(단일 출처).
        """
        out = []
        for lang in ['ko_KR', 'en_US', 'ja_JP', 'zh_TW', 'th_TH']:
            cell = str(row.get(lang, '') or '')
            if cell in ('', 'nan'):
                continue
            sc = cls._scripts(cell)
            foreign = [name for name in cls.FOREIGN_SCRIPTS.get(lang, []) if sc[name]]
            if foreign:
                out.append({'lang': lang, 'foreign': foreign, 'cell': cell})
            # ko_KR 특례: 한글 없이 한자만이면 다른 언어 값 오배치(P0)
            if lang == 'ko_KR' and sc['cjk'] and not sc['hangul']:
                out.append({'lang': 'ko_KR', 'foreign': ['cjk-no-hangul'], 'cell': cell})
        return out

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
            # 주의: 사용자 확정으로 '정상'이 된 표현은 여기서 제외한다.
            #   예) '피부결과 윤곽' = '피부결(texture)+윤곽' 의도로 확정(2026-06-26) → blocklist 제외.
            KO_BLOCKLIST = {
                '포이가츠': "표기 오류 → '포이카츠' (ポイ活 확정 표기, 2026-06-26)",
                '누리고다양한': "띄어쓰기 누락 → '누리고 다양한'",
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

    # en_US 용어 매칭에서 허용할 규칙 어미 (2026-07-28)
    _EN_SUFFIXES = ('s', 'es', 'd', 'ed', 'ing')

    @classmethod
    def _term_in_text(cls, expected: str, text: str, lang: str) -> bool:
        """용어집 등재값이 해당 언어 칸에 들어있는지 판정.

        en_US만 **casefold(대소문자 무시) + 규칙 어미 허용**으로 느슨하게 본다 —
        `초대→invite`가 문두 대문자 `Invite`나 활용형 `invited`/`friends`로 쓰였을 뿐인
        정상 번역이 P1(용어 불일치)로 무더기 오탐되던 것을 없애기 위함이다
        (2026-07-28 실측: 용어집 v3.6 4종 추가만으로 오탐 14건 증가).
        다른 언어는 대소문자·굴절이 없어 기존 완전일치 부분문자열 비교를 유지한다.
        판정을 **느슨하게만** 하므로 기존에 통과하던 건은 그대로 통과한다.
        """
        if lang != 'en_US':
            return expected in text
        e, t = expected.casefold().strip(), text.casefold()
        if not e or e in t:
            return True
        head, sep, last = e.rpartition(' ')          # 다중 단어는 마지막 단어만 굴절 허용
        variants = {last + s for s in cls._EN_SUFFIXES}
        if last.endswith('y'):
            variants.add(last[:-1] + 'ies')          # copy → copies
        if last.endswith('e'):
            variants.add(last[:-1] + 'ing')          # invite → inviting
        for v in variants:
            cand = head + sep + v if sep else v
            if re.search(r'(?<![a-z])' + re.escape(cand) + r'(?![a-z])', t):
                return True
        return False

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

            # 핵심 용어 번역 일관성 검사 — 최장일치 우선 (2026-08-06)
            # 짧은 용어가 긴 용어 안에 통째로 들어있으면 짧은 쪽은 검사하지 않는다.
            # 예: ko `지급 완료된 리워드`에는 `완료`·`지급 완료`가 모두 걸려 정상 의역
            # (`支給済み`)이 `완료→完了` 불일치로 오탐되던 문제(실측 P1 232→198, P0 불변).
            # 같은 원인으로 `당첨금`(prize)이 `당첨`(win)으로 매칭되던 오탐도 해소된다.
            matched = [t for t in terminology if t in ko_text]
            effective = {t for t in matched
                         if not any(t != other and t in other for other in matched)}
            for ko_term, translations in terminology.items():
                if ko_term in effective:
                    for lang, correct_trans in translations.items():
                        if lang == 'ko_KR':
                            continue
                        lang_text = str(row.get(lang, ''))
                        if lang_text and not self._term_in_text(correct_trans, lang_text, lang):
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

            # 언어 혼입 / 컬럼 정렬 검사 (컬럼별 이질 문자체계 검출)
            # 각 언어 칸에 올 수 없는 문자체계가 있으면 P0(언어 혼입/컬럼 어긋남).
            # 라틴·숫자·기호는 모든 칸에서 허용(브랜드·수치·placeholder). ja/zh는 한자(CJK) 공유.
            # (2026-07 cat_eye류 회전 어긋남: ja칸 한글·en칸 한자·ko칸 영어가 안 잡히던 것 보강)
            for iss in self.foreign_script_issues(row):
                if iss['foreign'] == ['cjk-no-hangul']:
                    detail = f"ko_KR 칸에 한글 없이 한자만(다른 언어 오배치 의심): {iss['cell']}"
                else:
                    detail = f"{iss['lang']} 칸에 {'/'.join(iss['foreign'])} 문자 포함(컬럼 어긋남 의심): {iss['cell']}"
                self.issues['P0'].append({'key': key, 'issue': '언어 혼입', 'detail': detail})
            # ko_KR 특례: 한글 없이 라틴 문자열만이면 영어/브랜드 오배치 의심(P1 — 브랜드 가능성)
            ko_cell = str(row.get('ko_KR', '') or '')
            if ko_cell not in ('', 'nan'):
                ko_sc = self._scripts(ko_cell)
                if not ko_sc['hangul'] and not ko_sc['cjk'] and re.search(r'[A-Za-z]', ko_cell):
                    self.issues['P1'].append({
                        'key': key,
                        'issue': '언어 의심',
                        'detail': f"ko_KR 칸에 한글 없이 라틴 문자열(영어 오배치 또는 브랜드 확인 필요): {ko_cell}"
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
