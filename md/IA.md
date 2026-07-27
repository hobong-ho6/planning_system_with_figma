# Unifi (unifi.me) IA 분석 — Screen ID 네이밍 참조 정본

> **목적**: Screen ID(`주기능_부기능_세부기능_순번[_순번]`, 전부 소문자 — 공식 룰 `[Rule] 기획서 Screen ID & XLT Key 작성 가이드` pageId=4268282157) 부여 시 참조하는 **IA 단일 정본**.
> **갱신 규칙**: 서비스 IA가 바뀌면 **이 파일만 갱신**한다 — Screen ID 어휘·트리를 다른 md에 중복 기재하지 않는다. `md/wiki.md`의 Screen ID 규칙은 이 파일을 참조만 한다.
> **⛔ 적용 게이트**: 이 IA로 Screen ID를 부여할 때는 **반드시 제안 매핑 표(프레임명 → Screen ID)를 사용자에게 제시하고 검토·승인받은 뒤 진행**한다. 임의 확정 금지.
> **소급 금지**: 기존 위키(예: 럭키볼 친구초대 캠페인 pageId=4479306980)의 프레임명 기반 Screen ID는 **그대로 유지**한다 — 새 규칙은 신규 부여분부터.

---

## 분석 이력

| 날짜 | 범위 | 방법 | 비고 |
|---|---|---|---|
| 2026-07-27 | 비로그인 공개 화면 | unifi.me 직접 탐색 (모바일 뷰) | home·reward 공개 영역, login 게이트 확인 |
| 2026-07-27 | **로그인 상태 전체 4탭** | 사용자 로그인 Chrome으로 직접 탐색 | **asset(내 자산)·my(마이) 실측 확정**, 실제 라우트 채집 |

> ⚠️ 표시 = 아직 직접 진입 못 한 추정 영역(팝업·조건부 화면 등). 확인되는 대로 이 파일을 갱신한다.

---

## 0. 핵심 구조 요약 (실측)

- **하단 GNB 4탭 (한국어 라벨 / 실제 라우트)**: 홈 `/` · 리워드 `/benefits/daily-mission` · 내 자산 `/my` · 마이 `/setting`
- ⚠️ **라우트-화면명 엇갈림 주의**: 라우트 `/my` = **내 자산** 화면, `/setting` = **마이** 화면이다. **Screen ID 주기능 어휘는 라우트가 아니라 화면(공식 룰 예시 `asset_send_01`) 기준**으로 쓴다 — 내 자산 = `asset_`, 마이 = `my_`. 라우트는 참고 정보.
- **교환(Swap)은 Apps 영역**: 라우트 `/apps/trade/swap` — 공식 룰상 Apps 메뉴 문구는 XLT Key에 `apps_` 프리픽스(UF_ 아님). Screen ID 주기능도 `apps_` 사용을 기본으로 하되 부여 시 사용자 확인.
- 홈 상단에 자산 종류 탭(USDT/JPYC/IDRP) 존재. 지원 토큰: USDT·KAIA·JPYC·IDRP + NFT.

## 1. 주기능 (1레벨)

| 주기능 | Screen ID 프리픽스 | 근거 (실측) |
|---|---|---|
| 홈 | `home_` | GNB 탭 1 (`/`) |
| 리워드 | `reward_` | GNB 탭 2 (`/benefits/daily-mission`) |
| 자산(내 자산) | `asset_` | GNB 탭 3 (`/my`) — 공식 룰 예시와 동일 |
| 마이(설정) | `my_` | GNB 탭 4 (`/setting`) |
| Apps | `apps_` | 교환 등 Apps 영역 (`/apps/...`) — 공식 룰 `apps_` 프리픽스 영역 |
| 로그인/온보딩 | `login_` | 진입 게이트 (Google/LINE/Naver/Kakao/Apple) |
| 프로모션/캠페인 | `promo_` | 캠페인 랜딩 (럭키볼 초대자/피초대자 — 위키 작업 실측) |

## 2. 기능 트리 (부기능·세부기능)

### home — 홈 (실측 · 라우트 `/`)

```
home_main_01                      홈 메인 — 자산 요약 카드(USDT/JPYC/IDRP 탭·입금하기·플러스 모드 배너·누적 이자)
home_boost_kaia_01                KAIA 부스트 상세 (/boost/kaia — 보유량 티어 1~3%)
home_benefit_rate_01              역대급 이율 혜택 (Best Rate Benefits)
home_benefit_referral_01          특별 레퍼럴 랭킹 혜택 (친구 초대하고 USDT 리워드 받기)
home_guide_usdt_01                가이드 — USDT 알아보기
home_guide_stable_01              가이드 — 스테이블 코인 경험 (Unifi 혜택 한눈에 보기)
home_guide_wallet_01              가이드 — 비수탁 지갑 알아보기
home_guide_interest_01            가이드 — 이자 운용 방법
home_guide_summary_01             가이드 — 핵심만 쏙쏙 (Unifi로 수익 내는 방법)
home_guide_transfer_01            가이드 — 자산 옮기기 (거래소별 입금 가이드)
home_faq_01                       자주 묻는 질문
home_notice_01                    공지사항 목록 (announcement)
home_notice_detail_01             공지사항 상세
home_notification_01              ⚠️ 알림 목록 (상단 벨)
```

### reward — 리워드 (실측 · 라우트 `/benefits/daily-mission`)

```
reward_main_01                    Rewards 메인 (리워드 USDT·럭키볼 개수 요약)
reward_checkin_01                 출석 체크 (1~5일 연속 — 3·5일 럭키볼, 출석하기 버튼)
reward_checkin_01_01              ⚠️ 출석 완료/럭키볼 획득 팝업
reward_mission_game_01            게임 미션 (게임 3개 완료 → 럭키볼)
reward_mission_game_detail_01     ⚠️ 개별 게임 미션 상세 (Squishy Cat Jump·MERGE CAT·Tap Tap Jello·Hook & Gold·Rich Match·SODA MERGE 2048)
reward_luckyball_draw_01          ⚠️ 럭키볼 뽑기 (최대 500 USDT)
reward_luckyball_result_01_01     ⚠️ 뽑기 결과 팝업
reward_history_01                 리워드 내역 ("리워드 0 USDT >" 진입점)
reward_apps_01                    Apps 둘러보기
```

### asset — 내 자산 (실측 · 라우트 `/my`)

```
asset_main_01                     내 자산 메인 — 나의 총 자산·액션 4종(송금하기/입금하기/교환하기/은행송금)·토큰 목록(USDT/KAIA/JPYC/IDRP)·보유 NFT
asset_history_01                  거래내역 (/my/token/transaction — 필터: 기간·토큰·유형·정렬)
asset_history_detail_01           ⚠️ 거래 상세 (거래 ID·네트워크)
asset_token_detail_01             토큰 상세 (/my/token/{컨트랙트주소} — 플러스 모드·Unifi 지갑·보내기/교환하기/은행송금·거래내역)
asset_send_01                     송금하기 — 토큰 선택 (/transfer — "어떤 토큰을 보내시겠어요?" 전체/스테이블 코인)
asset_send_02                     ⚠️ 송금 — 받는 사람/수량 입력 (공식 룰 예시 단계)
asset_send_qr_01 / _01_01         ⚠️ QR 송금 / 그 위 다이얼로그 (공식 룰 예시)
asset_deposit_01                  입금하기 (/deposit — QR·네트워크 선택(KAIA)·내 지갑주소 복사·토큰별(USDT/JPYC/IDRP) 거래소 입금 3단계 안내)
asset_bank_01                     ⚠️ 은행송금 (버튼 실측 — 모달/조건부로 화면 미진입)
asset_plus_mode_01                ⚠️ 플러스 모드 상세 (토큰 상세 내 진입점 실측)
asset_nft_01                      ⚠️ 보유 NFT 목록
```

### apps — Apps 영역 (실측 · 라우트 `/apps/...`)

```
apps_trade_swap_01                교환하기 (/apps/trade/swap — From/To 토큰 선택·교환)
apps_trade_swap_confirm_01_01     ⚠️ 교환 확인 팝업 (예상 수수료)
apps_main_01                      ⚠️ Apps 메인 (리워드 탭 'Apps 둘러보기' 진입)
```

### my — 마이/설정 (실측 · 라우트 `/setting`)

```
my_main_01                        마이 메인 — 프로필 닉네임(편집)
my_security_email_01              인증/보안 — 이메일 (인증 완료 상태)
my_security_passkey_01            인증/보안 — 생체 인증 패스키 (등록 완료 상태)
my_security_passcode_01           인증/보안 — 간편 비밀번호
my_wallet_privatekey_01           지갑 — 개인 키 확인하기
my_setting_language_01            화면 표시 — 언어 설정 (한국어 등)
my_setting_currency_01            화면 표시 — 통화 설정 (JPY ¥ 등)
my_notification_setting_01        알림 — 알림 설정
my_help_faq_01                    고객 센터 — FAQ
my_help_contact_01                고객 센터 — 문의하기
my_info_license_01                Unifi 정보 — 오픈소스 라이선스
my_logout_01_01                   로그아웃 (확인 팝업 ⚠️)
my_withdraw_01                    ⚠️ 계정 탈퇴 ("계정을 닫히시려면 여기를 클릭하세요")
```

### login / promo (실측)

```
login_main_01                     소셜 로그인 선택 (Google/LINE/Naver/Kakao/Apple)
login_terms_01                    ⚠️ 약관 동의 (가입 플로우)
promo_luckyball_inviter_01        럭키볼 초대자 프로모션 페이지 (위키 작업 실측)
promo_luckyball_invitee_01        럭키볼 피초대자 프로모션 페이지 (위키 작업 실측)
```

---

## 3. Screen ID 부여 방법 (공식 룰 요약 + 이 IA 사용법)

1. **구조**: `주기능_부기능_세부기능_01` 또는 `주기능_부기능_세부기능_추가세부기능_01`.
   - 마지막 `_01` 추가 = 그 화면 위에 뜨는 다이얼로그/팝업 (해당 없으면 생략).
   - 예 (공식 룰): `asset` → `asset_send_01` → `asset_send_02` → `asset_send_qr_01` → `asset_send_qr_01_01`.
2. **전부 소문자** — GA에서 page_name 파라미터로 쓰이므로 대문자 금지.
3. **어휘 선택**: 주기능은 §1 표, 부기능·세부기능은 §2 트리에서 고른다. 트리에 없는 새 기능이면 **이 파일에 먼저 추가**(사용자 확인)하고 부여한다.
4. **Apps 영역 판별**: 라우트가 `/apps/...`이거나 Apps 메뉴(구 Dapp Portal) 소속 화면이면 주기능 `apps_` (XLT Key도 `apps_` 프리픽스·UF_ 미사용 — 공식 룰).
5. **⛔ 검토 게이트(필수)**: 부여 전 `{Figma 프레임명 → Screen ID}` 매핑 표를 사용자에게 제시 → 승인 후 위키 반영. 승인 없이 확정하지 않는다.

## 4. 미확정/후속 확인 사항

- [ ] ⚠️ 항목 실측 (팝업·조건부 화면: 뽑기 결과, 송금 2단계, 은행송금, 플러스 모드 상세, NFT 목록, Apps 메인, 알림 목록, 계정 탈퇴)
- [ ] `login_terms_01` 등 가입 플로우 존재 여부 확인
- [ ] 프로모션 프리픽스 `promo_` vs `event_` 확정 (현재 `promo_` 잠정)
- [ ] 은행송금 기능의 진입 조건(JPYC 관련 여부) 확인
