# 번역 검증 게이트 리포트 — 유의사항 재번역(7) + signup_prize_2line + 긴 문구 축약(3)

- 대상 위키: pageId 4479306980 / 팀 **LV** / 대상 엑셀: `xlt/xlt_output_20260725002125.xlsx` (78키)
- 트리거: Screen 표 마킹(연노랑+파랑) 키 중 KR 변경분 재번역 + 긴 문구 축약(사용자 요청). Screen 표 KR = 기준.
- 용어집: API v2.6 새로 조회.

## A. 재번역 (Screen KR 기준, 8키)

유의사항(notice) 7키가 새 문안·날짜(2026-08-31 08:59:59 JST)로 재작성됨 + signup_prize_2line. KR 기준 5개 언어 재번역:
- notice_keep_oa / notice_bonus_daily / notice_bonus_limit / notice_expire / notice_both_required / notice_keep_until_payout / notice_info_change
- signup_prize_2line = "Unifi 가입하고\n럭키볼 선물 열어보기"

## B. 긴 문구 축약 (EN/JA만, KR·TH·ZH 유지)

| 키 | EN (전→후) | JA (전→후) |
|----|-----------|-----------|
| invite_banner | Invite a friend and get a Lucky Ball → **Invite a friend,\nget a Lucky Ball** | 友だちを招待してラッキーボールをもらおう → **友だち招待で\nラッキーボール獲得** |
| mission_done_friends | Friends who completed the mission → **Friends who completed** | ミッションを達成した友だち → **達成した友だち** |
| my_holdings | (유지) My Lucky Balls | 保有中のラッキーボール → **保有ラッキーボール** |

## 0. 한국어 원문 교정 (게이트 1단계)

- 재번역 8키의 ko는 Screen 마킹 최신값 그대로(기준). `\xa0`→공백 정규화. 오타·띄어쓰기 이상 없음. 축약 3키는 ko 불변(EN/JA만 축약). alias 갱신.

## Executive Summary (자동 — 78키)

| 심각도 | 건수 | 카테고리 |
|--------|------|----------|
| 🔴 P0 (Critical) | **0건** | 빈칸, 오타, 언어 혼입, 용어집 표기 위반 |
| 🟡 P1 (Medium) | 28건 | 용어 불일치(용어집 협소 매핑) |
| 🟢 P2 (Low) | 31건 | 마침표 스타일 |

→ **P0 = 0**.

## 1단계: 한국어 (수동, 전수 78키)

- notice 7키·signup_prize_2line 재검토: 법적·안내 문안, 오타·띄어쓰기 이상 없음(문장형은 마침표 유지, 배너/버튼은 무마침표). 날짜/시각 표기(2026년 8월 31일 08:59:59 JST) 정확.
- 축약 3키: EN/JA 축약 후에도 의미 보존.

## 2단계: 용어집 (수동, 전수)

- 럭키볼·JPYC·LINE·Unifi 표기 일관, 지갑=ウォレット/wallet/กระเป๋าเงิน/錢包. zh 번체 정자. 자동 P1 28건 전건 협소 매핑 오탐(확인/변경/지급 등).

## 3단계: 다른 언어 (수동, 전수)

- 빈칸 0·언어 혼입 0. notice 각 언어 정중체(です・ます/formal/ครับ-style/書面) 일관. 날짜 현지 표기(August 31, 2026 / 31 สิงหาคม 2026 / 2026 年 8 月 31 日) 정확. signup_prize_2line·축약키 줄바꿈(\n) 보존.

## 각 건 처리 판정

- **P1 28건 — 전건 오탐**(용어집 협소 매핑). 수정 없음.
- **P2 31건 — 전건 오탐**(무마침표 배너/버튼/타이틀). 유지.

## (d) 추가 개선·제안 (권장)

- **(d-1) notice 키명 의미 불일치**: 유의사항 재작성으로 일부 키명 suffix가 실제 내용과 어긋남(예: notice_keep_oa 내용이 '양측 완료 조건'). 키명은 유지(위키·엑셀 정합), 장기적으로 키명 정리 권장.
- **(d-2) 축약 문구 렌더 확인**: EN/JA 축약본이 카드 폭에 맞는지 실기기 확인 권장.
- **(d-3) 용어집 보완**: 다의어 문맥 변형(`md/landpress.md`).

## 통과 판정

- 자동 **P0=0** + 수동 3단계 **P0=0** → **통과**. 8키 재번역 + 3키 축약(78키), 엑셀 재생성. P1/P2 전건 오탐.
