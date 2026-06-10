#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
번역 데이터를 XLT System 업로드용 엑셀로 변환
md/translate.md Step 7 구현
"""

import pandas as pd
from datetime import datetime
from pathlib import Path

def create_xlt_excel(translation_data: list, output_dir: str = "xlt"):
    """
    번역 데이터를 XLT 엑셀 형식으로 변환

    Args:
        translation_data: [
            {
                'xlt_key': 'KW_home_deposit',
                'ko_KR': '입금하기',
                'ja_JP': '入金する',
                'en_US': 'Deposit',
                'th_TH': 'ฝาก',
                'zh_TW': '存入'
            },
            ...
        ]
        output_dir: 출력 폴더 경로
    """

    # 출력 폴더 생성
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    # DataFrame 생성 (첫 번째 컬럼은 헤더 없음)
    df_props = pd.DataFrame(translation_data)

    # 컬럼 순서 조정 (Unnamed: 0, en_US, ko_KR, ja_JP, zh_TW, th_TH)
    column_order = ['xlt_key', 'en_US', 'ko_KR', 'ja_JP', 'zh_TW', 'th_TH']
    df_props = df_props[column_order]

    # 첫 번째 컬럼명 제거 (Unnamed: 0으로 표시되도록)
    df_props.columns = ['', 'en_US', 'ko_KR', 'ja_JP', 'zh_TW', 'th_TH']

    # plurals 시트 데이터 (고정값)
    df_plurals = pd.DataFrame([{
        '': None,
        'en_US': 'one',
        'Unnamed: 2': 'other',
        'ko_KR': 'other',
        'ja_JP': 'other',
        'zh_TW': 'other',
        'th_TH': 'other'
    }])

    # 파일명 생성
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    filename = output_path / f"xlt_output_{timestamp}.xlsx"

    # 엑셀 파일 생성
    with pd.ExcelWriter(filename, engine='openpyxl') as writer:
        df_props.to_excel(writer, sheet_name='properties', index=False)
        df_plurals.to_excel(writer, sheet_name='plurals', index=False)

    print(f"✓ XLT 엑셀 파일 생성: {filename}")
    print(f"  - properties: {len(df_props)}개 항목")
    print(f"  - plurals: 고정 포맷")

    return filename

def validate_excel(filepath: Path):
    """생성된 엑셀 파일 검증"""
    print("\n검증 중...")

    df = pd.read_excel(filepath, sheet_name='properties')

    # 첫 번째 컬럼명 확인
    first_col = df.columns[0]
    if first_col != 'Unnamed: 0' and first_col != '':
        print(f"⚠️ 첫 번째 컬럼명이 비어있지 않음: {first_col}")

    # 언어 컬럼 확인
    required_cols = ['en_US', 'ko_KR', 'ja_JP', 'zh_TW', 'th_TH']
    for col in required_cols:
        if col not in df.columns:
            print(f"❌ 필수 컬럼 누락: {col}")
        else:
            empty_count = df[col].isna().sum()
            if empty_count > 0:
                print(f"⚠️ {col}: {empty_count}개 빈 값")

    # plurals 시트 확인
    df_plurals = pd.read_excel(filepath, sheet_name='plurals')
    if len(df_plurals) != 1:
        print(f"⚠️ plurals 시트는 1행이어야 함 (현재: {len(df_plurals)}행)")

    print("✓ 검증 완료")

if __name__ == '__main__':
    # 테스트 데이터
    test_data = [
        {
            'xlt_key': 'KW_home_deposit',
            'ko_KR': '입금하기',
            'ja_JP': '入金する',
            'en_US': 'Deposit',
            'th_TH': 'ฝาก',
            'zh_TW': '存入'
        },
        {
            'xlt_key': 'KW_home_withdraw',
            'ko_KR': '출금하기',
            'ja_JP': '出金する',
            'en_US': 'Withdraw',
            'th_TH': 'ถอน',
            'zh_TW': '提款'
        }
    ]

    filepath = create_xlt_excel(test_data)
    validate_excel(filepath)
