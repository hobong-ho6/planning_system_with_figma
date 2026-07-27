# Unifi (unifi.me) IA 분석 — Screen ID 네이밍 참조 정본

> **목적**: Screen ID(`주기능_부기능_세부기능_순번[_순번]`, 전부 소문자 — 공식 룰 `[Rule] 기획서 Screen ID & XLT Key 작성 가이드` pageId=4268282157) 부여 시 참조하는 **IA 단일 정본**.
> **갱신 규칙**: 서비스 IA가 바뀌면 **이 파일만 갱신**한다 — Screen ID 어휘·트리를 다른 md에 중복 기재하지 않는다. `md/wiki.md`의 Screen ID 규칙은 이 파일을 참조만 한다.
> **⛔ 적용 게이트**: 이 IA로 Screen ID를 부여할 때는 **반드시 제안 매핑 표(프레임명 → Screen ID)를 사용자에게 제시하고 검토·승인받은 뒤 진행**한다. 임의 확정 금지.
> **소급 금지**: 기존 위키(예: 럭키볼 친구초대 캠페인 pageId=4479306980)의 프레임명 기반 Screen ID는 **그대로 유지**한다 — 새 규칙은 신규 부여분부터.

---

## 분석 이력

| 날짜 | 범위 | 방법 | 비고 |
|---|---|---|---|
| 2026-07-27 | 비로그인 공개 화면 전체 | unifi.me 직접 탐색 (모바일 뷰) | asset·my 내부는 로그인 게이트로 추정(⚠️) — 근거: 홈 카피·FAQ·용어집 v3 UI 라벨·공식 룰 예시 키 |

> ⚠️ 표시 = 로그인 게이트로 직접 확인 못 한 추정 영역. 로그인 상태 검토(사용자가 브라우저에서 로그인 후 명령) 또는 Figma 화면 제공 시 실측으로 확정하고 이 파일을 갱신한다.

---

## 1. 주기능 (1레벨) — 하단 GNB 4탭 + 보조 영역

| 주기능 | Screen ID 프리픽스 | 근거 |
|---|---|---|
| 홈 | `home_` | 하단 탭 1 (실측) |
| 리워드 | `reward_` | 하단 탭 2 (실측) |
| 자산 | `asset_` | 하단 탭 3 (실측 — 공식 룰 예시도 `asset` 단수) |
| 마이 | `my_` | 하단 탭 4 (실측) |
| 로그인/온보딩 | `login_` | 진입 게이트 (실측 — Google/LINE/Naver/Kakao/Apple) |
| 프로모션/캠페인 | `promo_` | 캠페인 랜딩 (럭키볼 초대자/피초대자 — 위키 작업 실측) |

## 2. 기능 트리 (부기능·세부기능)

### home — 랜딩·혜택 안내 (실측)

```
home_main_01                      홈 메인 (Hero "Earn daily interest"·Get Started)
home_boost_kaia_01                KAIA Boost 상세 (/boost/kaia — 보유량 티어 1~3%)
home_benefit_rate_01              Best Rate Benefits
home_benefit_referral_01          친구 초대 랭킹 혜택 (Invite Friends & Earn USDT)
home_guide_usdt_01                Unifi Essentials — USDT 소개
home_guide_wallet_01              Unifi Essentials — 비수탁 지갑
home_guide_interest_01            Unifi Essentials — 이자 관리
home_guide_transfer_01            Unifi Essentials — 거래소별 입금 가이드
home_faq_01                       FAQ 목록
home_notice_01                    공지사항 목록 (announcement 라우트 실측)
home_notice_detail_01             공지사항 상세
```

### reward — 미션·럭키볼 (실측, 일부 팝업 ⚠️)

```
reward_main_01                    Rewards 메인 (Reward USDT·Lucky ball 요약)
reward_checkin_01                 Check in (연속 출석 1~5일 — 3·5일 럭키볼)
reward_checkin_01_01              ⚠️ 출석 완료/럭키볼 획득 팝업
reward_mission_game_01            Game mission (3게임 완료 → 럭키볼)
reward_mission_game_detail_01     ⚠️ 개별 게임 미션 상세 (Squishy Cat Jump 등)
reward_luckyball_draw_01          ⚠️ 럭키볼 뽑기 (up to 500 USDT)
reward_luckyball_result_01_01     ⚠️ 뽑기 결과 팝업
reward_history_01                 ⚠️ 리워드 지급 내역 ("Reward 0 USDT >" 진입점 실측)
reward_apps_01                    Explore Apps (게임 목록)
```

### asset — 자산 관리 (⚠️ 전체 추정 — 홈 카피·FAQ·용어집 v3 라벨·공식 룰 예시 근거)

```
asset_main_01                     내 자산/총 자산/락업 자산
asset_token_detail_01             토큰 상세 (공식 룰 예시 UF_asset_token_detail_btn_send)
asset_deposit_01                  넣기(Deposit) — 네트워크/주소
asset_deposit_qr_01               입금 QR/주소 복사
asset_withdraw_01                 꺼내기(Withdraw)
asset_send_01 / asset_send_02     보내기(Send) — 받는 사람/수량 (공식 룰 예시)
asset_send_qr_01 / _01_01         QR 송금 / 그 위 다이얼로그 (공식 룰 예시)
asset_swap_01                     교환(Swap to USDT — 홈 카피 실측)
asset_swap_confirm_01_01          ⚠️ 교환 확인 팝업 (예상 수수료)
asset_history_01                  거래 내역 (입금/출금 유형 필터)
asset_history_detail_01           거래 상세 (거래 ID·네트워크)
asset_interest_01                 이자 내역/관리 (기본·부스트·플러스·예치 이자 — FAQ 실측)
```

### my — 계정·설정 (⚠️ 전체 추정 — 용어집 v3 라벨 근거)

```
my_main_01                        마이 메인
my_account_01                     연결 계정 (Linked account)
my_setting_language_01            언어 설정
my_setting_currency_01            통화 설정
my_notification_01                알림
my_security_passcode_01           간편 비밀번호(Passcode)
my_security_recovery_01           복구 비밀번호
my_help_01                        문의하기(Help)
my_logout_01_01                   로그아웃 안내 팝업
```

### login / promo (실측)

```
login_main_01                     소셜 로그인 선택 (Google/LINE/Naver/Kakao/Apple)
login_terms_01                    ⚠️ 약관 동의 (가입 플로우)
promo_luckyball_inviter_01        럭키볼 초대자 프로모션 페이지
promo_luckyball_invitee_01        럭키볼 피초대자 프로모션 페이지
```

---

## 3. Screen ID 부여 방법 (공식 룰 요약 + 이 IA 사용법)

1. **구조**: `주기능_부기능_세부기능_01` 또는 `주기능_부기능_세부기능_추가세부기능_01`.
   - 마지막 `_01` 추가 = 그 화면 위에 뜨는 다이얼로그/팝업 (해당 없으면 생략).
   - 예 (공식 룰): `asset` → `asset_send_01` → `asset_send_02` → `asset_send_qr_01` → `asset_send_qr_01_01`.
2. **전부 소문자** — GA에서 page_name 파라미터로 쓰이므로 대문자 금지.
3. **어휘 선택**: 주기능은 §1 표, 부기능·세부기능은 §2 트리에서 고른다. 트리에 없는 새 기능이면 **이 파일에 먼저 추가**(사용자 확인)하고 부여한다.
4. **⛔ 검토 게이트(필수)**: 부여 전 `{Figma 프레임명 → Screen ID}` 매핑 표를 사용자에게 제시 → 승인 후 위키 반영. 승인 없이 확정하지 않는다.

## 4. 미확정/후속 확인 사항

- [ ] asset·my 내부 화면 실측 (사용자 로그인 상태 검토 또는 Figma 화면 수령 시)
- [ ] `login_terms_01` 등 가입 플로우 존재 여부 확인
- [ ] 프로모션 프리픽스 `promo_` vs `event_` 확정 (현재 `promo_` 잠정)
