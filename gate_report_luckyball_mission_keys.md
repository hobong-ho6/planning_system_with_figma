# 번역 품질 게이트 리포트 — 럭키볼 캠페인 mission 키 정정·신규 (pageId 4479306980)

대상 엑셀: `xlt/xlt_output_20260725174303.xlsx` (70항목)
작업: ① 화면 정의에 없는 orphan 키 9개 번역표 삭제 ② 노란 셀 2개 키 번역·엑셀 반영

## 0. 변경 범위

- **삭제(9)**: `keep_oa_for_reward`, `signup_line_ready`, `open_ball_desc`, `max20_desc`, `notice_check`, `notice_wallet_fixed`, `notice_abuse`, `notice_fcfs`, `add_oa_channel` — 화면 정의(Screen 상세표) 부재, 원문 grep Screen 섹션 0회 확인.
- **변경(1)**: `mini_luckyball_invite_mission` — 화면 정의 KR "친구 초대 미션"으로 정정·재번역(기존 오배치 내용 제거).
- **신규(1)**: `mini_luckyball_invitee_mission` — 화면 정의 KR "🎁 친구가 보낸 럭키볼 선물"(기존 invite_mission에 오배치돼 있던 검증된 번역을 이관).

## 1a. 한국어 원문 교정

- `친구 초대 미션` — 맞춤법·띄어쓰기 정상, 교정 불필요.
- `🎁 친구가 보낸 럭키볼 선물` — 맞춤법·띄어쓰기 정상, 교정 불필요.
- Figma 원문 대비 KR 변경 없음 → **alias 신규 발생 없음**. (화면 정의 KR을 그대로 사용)

## 2. 자동 검증 — `scripts/validate_translation.py` 실행 결과

- 실행 대상: `xlt_output_20260725174303.xlsx` (70항목), glossary v2.6(35용어)
- **P0 = 0건** / P1 = 25건 / P2 = 26건
- 리포트: `xlt/xlt_output_20260725174303_validation_report.md`

## 3. 수동 3단계 검토 (변경·신규 키 대상 — 부분 작업)

> 본 작업은 특정 2개 키의 정정·신규 + orphan 삭제(부분 패치)로, 수동 전수 검토는 신규·변경 키에 집중한다. 단, 자동 검증기는 **전체 파일(70행 전체)** 을 대상으로 P0/P1/P2를 스캔했다(전체 행 스캔). 기존 69키는 이전 run에서 이미 게이트 통과·반영된 데이터로, 이번 변경분(2키) 외 원문·번역 수정 없음.

### 1단계 — 한국어 원문 (변경·신규 키)
| 키 | KR | 판정 |
|----|----|----|
| invite_mission | 친구 초대 미션 | 정상 |
| invitee_mission | 🎁 친구가 보낸 럭키볼 선물 | 정상 |

### 2단계 — 용어집 대조
| 용어 | 적용 | 판정 |
|----|----|----|
| 럭키볼 → ラッキーボール/Lucky Ball/幸運球/ลูกบอลนำโชค | invitee_mission 5개 언어 일치 | 정상(v2.6) |
| 미션 → ミッション/Mission/任務/ภารกิจ | invite_mission 5개 언어 일치 | 정상 |
| 친구 초대 → 友だち招待/Invite a friend/邀請好友/ชวนเพื่อน | invite_banner와 정합 | 정상 |

### 3단계 — 언어별 정밀 (외래어 음차·붙은 띄어쓰기·다의어·어색표현·이모지·placeholder)
| 키 | JA | EN | TH | ZH-TW | 특이 |
|----|----|----|----|----|----|
| invite_mission | 友だち招待ミッション | Invite a Friend Mission | ภารกิจชวนเพื่อน | 邀請好友任務 | placeholder 없음·언어혼입 없음·음차오염 없음 |
| invitee_mission | 🎁 友だちから届いたラッキーボールのプレゼント | 🎁 A Lucky Ball gift from your friend | 🎁 ของขวัญลูกบอลนำโชคจากเพื่อน | 🎁 好友送出的幸運球禮物 | 이모지 🎁 5개 언어 보존·언어혼입 없음 |

→ **수동 P0 = 0건.**

## 4. 자동 검증기 각 건 처리 판정 (P1/P2 전건)

- **변경 키 관련 유일 P1** — `invite_mission` en_US '미션'→'mission' 권장: **오탐**. 번역 "Invite a Friend **Mission**"에 title-case로 이미 포함. 실제 위반 아님.
- **그 외 P1 24건** — 전부 **기존 미변경 키**(confirm·notice_*·login_btn·link_copied·missions_promo·jpyc_desc·interest_desc·benefits_title 등)에 대한 용어집 협소 매핑 **오탐**(확인→check/查看/ตรวจสอบ, 변경→更換, 로그인→log in, 복사→copy, 송금, 예치, 출금, 혜택→perks). 정상 의역으로 이전 run 판정 유지. 이번 변경으로 신규 발생 P1 없음.
- **P2 26건** — 전부 **기존 미변경 키**의 [마침표 스타일](문장형 안내문의 종결 마침표). 스타일 선호로 **사용자 결정 사안·보류**. 이번 변경 키는 P2 없음.

→ 실제 위반 0건, 나머지 전건 오탐/정책 보류.

## 5. (d) 추가 개선·제안 (권장 — 임의 반영 안 함)

- **(d-1) 용어집 보완 권장**: 자동 검증기가 `확인`을 항상 check/查看/ตรวจสอบ로 강제해 문맥상 정상 의역(예: '확인' = 조회/열람 맥락)에서 반복 오탐. `혜택→perks` 단일 매핑도 문맥에 따라 benefit/perk 병용 필요. → 용어집에 다의어 문맥 표기를 병기 보완하면 오탐 감소. 반영은 사용자가 Landpress CMS에 전체 JSON 붙여넣기(`md/landpress.md`). **이번 작업에서 임의 변경 없음.**
- **(d-2) 추가 개선 제안**: ① `invite_mission` EN을 "Invite a Friend Mission" 대신 "Friend Invitation Mission"으로 할지 표기 정책 확인 가능(현재 invite_banner의 "Invite a friend"와 정합 위해 전자 채택). ② P2 마침표 스타일(안내문 종결 마침표) 통일 여부는 별도 정책 결정 사안. — 모두 **사용자 결정 전까지 미반영**.

## 6. 통과 기준

- 자동 P0 = 0 ✔ / 수동 P0 = 0 ✔ → **출력·위키 반영·엑셀 생성 진행 가능**.
- P1/P2 전건 처리 판정 완료(오탐/정책 보류), (d) 권장은 미반영.
