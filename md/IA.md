# Unifi (unifi.me) IA 분석 — Screen ID 네이밍 참조 정본

> **목적**: Screen ID(`주기능_부기능_세부기능_순번[_순번]`, 전부 소문자 — 공식 룰 `[Rule] 기획서 Screen ID & XLT Key 작성 가이드` pageId=4268282157) 부여 시 참조하는 **IA 단일 정본**.
> **갱신 규칙**: 서비스 IA가 바뀌면 **이 파일만 갱신**한다 — Screen ID 어휘·트리를 다른 md에 중복 기재하지 않는다. `md/wiki.md`의 Screen ID 규칙은 이 파일을 참조만 한다.
> **⛔ 적용 게이트**: 이 IA로 Screen ID를 부여할 때는 **반드시 제안 매핑 표(프레임명 → Screen ID)를 사용자에게 제시하고 검토·승인받은 뒤 진행**한다. 임의 확정 금지.
> **소급 금지**: 기존 위키의 기존 표기 Screen ID는 **그대로 유지**한다 — 프레임명 기반(럭키볼 캠페인 pageId=4479306980)뿐 아니라 dot 표기(`Wallet.home` 등, [Screen]Wallet Mode)도 소급 전환하지 않는다. 새 규칙은 신규 부여분부터.
> **🔄 정기 점검**: **매주 월요일 10:00** unifi.me를 직접 탐색(비로그인 + 로그인)해 메뉴·기능 변경을 확인하고 이 파일을 갱신한다(스케줄 등록됨). 로그인 영역은 브라우저에 로그인 세션이 있을 때만 실측 — 없으면 비로그인 범위만 점검하고 로그인 필요 항목을 리포트한다.
> **📄 점검 리포트**: 매 점검마다 `reports/ia/ia_check_report_YYYY-MM-DD.md`를 생성한다(**변경 없어도 생성** — 점검 범위·미완 항목이 다음 주 기준이 된다). 구성: 점검 범위(방문 라우트 전량)·실측 승격·신설/변경·승인 대기 어휘·변경 없음 확인·미완 이월·IA.md 갱신 위치.

---

## 분석 이력

| 날짜 | 범위 | 방법 | 비고 |
|---|---|---|---|
| 2026-07-27 | 비로그인 공개 화면 | unifi.me 직접 탐색 (모바일 뷰) | home·reward 공개 영역, login 게이트 확인 |
| 2026-07-27 | 로그인 상태 전체 4탭 | 사용자 로그인 Chrome으로 직접 탐색 | asset(내 자산)·my(마이) 실측 확정, 실제 라우트 채집 |
| 2026-07-27 | **제품 모드·분기 정책** | 위키 `[Master]` 3종( Unifi mini · Wallet Mode · Mission and Reward ) + 링크 스펙 페이지 분석 | **Unifi/Wallet Mode/Unifi mini 3모드, IP·로그인·approve 분기 축, 탭 노출 매트릭스 확정** |
| 2026-07-27 | **주간 정기 점검 #1** (비로그인 + 로그인, KR IP) | unifi.me 직접 탐색(인앱 375px) + 사용자 Chrome 로그인 세션 + 공지사항 목록 | **Apps 메인/마켓·알림 목록·게임 미션 상세·은행송금(Sentbe)·NFT 목록 실측 승격**, 입금 **브릿지** 신설 확인, `/auth/sign-in`·`/payout`·푸터 라우트 채집, JPYC 이자·KAIA 부스트 티어 실측 |
| 2026-07-30 | **주간 정기 점검 #2** — 프로덕션 + **Beta** + **Unifi mini Beta** | 인앱 브라우저(프로덕션 비로그인) + 사용자 Chrome(Beta 로그인 세션) | **`/reward/kaia` KAIA 스테이킹(위임)·Special Contribution Rewards 출시 실측**(#1 이월 항목 해소), `/boost/kaia`→`/reward/usdt` 이전, **Beta 5탭·K-Pick 탭(`/benefits`)·액션 라벨 개편(보내기·채우기·은행출금) 실측**, **Unifi mini 실측 최초 성공**(`/benefits-mini` 계열) |

> ⚠️ 표시 = 아직 직접 진입 못 한 추정 영역(팝업·조건부 화면 등). 확인되는 대로 이 파일을 갱신한다.

---

## 0. 제품 모드 — Unifi는 하나가 아니다 (위키 스펙 실측)

같은 unifi.me 서비스가 **접근 경로·approve(어그리게이터 약관)·접속 IP**에 따라 3개 모드로 분기된다. **Screen ID를 부여하기 전에 어느 모드의 화면인지 먼저 확정**한다.

| 구분 | **Unifi (풀 모드)** | **Wallet Mode** | **Unifi mini (LINE MINI app)** |
|---|---|---|---|
| 진입 | Web/LIFF 주소 | Web/LIFF 주소 | **MINI app 주소** (miniapp.line.xxx) |
| 조건 | approve 완료 + IP가 US/CA/UK/SG **아님** | approve **미완료** 또는 **IP = 미국·캐나다·영국·싱가포르** | LINE MINI 채널 (LINE 인증, 채널 동의 간소화) |
| 기준 자산 | USDT (예치풀) | USDT (EOA 지갑) | **JPYC** 리워드 (소수점 2자리) |
| GNB | **Home·Apps·Assets·My 4탭** | Home·Assets·My 3탭 | Home·Assets·My 3탭 |
| 어그리게이터 약관/approve | 필수 (가입 시) | 미제공 (체크 안 함) | 미제공 (체크 안 함) |
| 예치·이자 | 제공 | **이율 정보 전부 제거** (자산·자산상세) | 미제공 (예치금·이자 노출 불가, 이자 제거 ToS 별도) |
| 교환(Swap) | **JP 미제공**, 그 외 제공 | 제공 | 미제공 |
| 은행송금 | 제공 | 제공 | 검토 중 (Sentbe 연동 방식) |
| 거래내역/알림 | 제공 | 이자 내역 제외 | 이자 내역 제외 |
| SkyFlag | 미제공 | 미제공 | **제공** |
| OA 친구추가 유도 | LIFF 접근 시 유도 | LIFF 접근 시 유도 | 없음 (통합 OA 검토) |
| 결제 | 지갑 연결 | 지갑 연결 | **LINE IAP** (지갑 연결 없음) + **JPYC 결제**(2026-07-10 공지 도입) |
| JPYC 이자 | **제공 (최대 연 5%)** — 2026-06-29 출시 | 미제공(이율 제거) | 미제공 |

### 0-0. 점검 환경 — 프로덕션 / Beta / mini Beta (2026-07-30 신설)

**Beta에는 앞으로 릴리즈할 내용이 먼저 반영된다.** 화면 정책·XLT 작업은 Beta가 곧 프로덕션이 되므로 **Beta 실측을 정본으로 삼되, 프로덕션과 다른 부분은 "릴리즈 예정"으로 구분 표기**한다.

| 환경 | 주소 | 비고 |
|---|---|---|
| 프로덕션 | `https://www.unifi.me/` | 현재 라이브 |
| **Beta** | `https://unifi-web.line-apps-beta.com/` | **릴리즈 예정 반영** — 2026-07-30 실측 기준 GNB **5탭**(K-Pick 승격), 액션 라벨 개편 |
| **Unifi mini Beta** | `https://unifi-web.line-apps-beta.com/?liff_id=2008994547-GfGUdDxy&liff.source=lp_link` | 진입 시 **`/benefits-mini`로 리다이렉트**. mini 실측 창구(그전까지 MINI app 진입 불가로 위키 스펙에만 의존) |

Beta 부속 도메인(실측): 프로모션 `unifi-promotion.line-apps-beta.com` · 개발자 `minidapp-developers.line-apps-beta.com` · 보안 감사 `unifi-contract-audit.line-apps-beta.com` · 마이크로 프로모션 `unifi-micro-promotion.website.line-apps-dev.com`

### 0-1. 분기 축 (화면 분기를 만드는 조건 — Screen ID 세부 변형 판단용)

1. **접근 경로**: Web / LIFF / MINI app 주소
2. **approve 여부**: 완료 → Unifi, 미완료 → Wallet Mode
3. **접속 IP**:
   - US/CA/UK/SG → Wallet Mode 강제
   - **KR IP** → Guide Kim(K-Pick) 일부 버튼 비노출 + "국가에서 서비스 불가" 안내 (실측: KR IP 화면)
   - **JP** → K-Pick 탭 노출(JP Only), 교환 미제공
4. **로그인 여부**: 비로그인 = 랜딩/로그인 게이트·"출석 체크" / 로그인 = 자산 요약·"매일 출석 체크"+카운트다운 등 문구·구성 분기
5. **JPYC 보유 여부**(mini 홈 큐레이션 등 콘텐츠 조건)

### 0-2. 탭 노출 매트릭스 (Guide Kim v1.1.0 스펙)

| 탭/동선 | Unifi (LIFF/Web) | Wallet Mode | Unifi mini |
|---|---|---|---|
| K-Pick 탭 | **JP Only** 노출 → **Beta에서 GNB 정식 탭으로 승격**(2026-07-30 실측, KR IP에서도 노출) | 미제공 | 노출 |
| Reward 탭 | 노출 | **미제공** | 노출 |
| Reward 내 Apps 이동 동선 | 노출 | (Apps 이동 동선만 제공) | **미제공** |

**GNB 실측 (2026-07-30)**: 프로덕션 = **4탭**(홈·리워드·내 자산·마이) / **Beta·mini Beta = 5탭**(홈·**K-Pick**·리워드·내 자산·마이). K-Pick 승격이 다음 릴리즈 범위다.

### 0-3. 라우트 참고 (실측 · Unifi 풀 모드 기준)

- 하단 GNB 4탭: 홈 `/` · 리워드 `/benefits/daily-mission` · 내 자산 `/my` · 마이 `/setting`
- ⚠️ **라우트-화면명 엇갈림 주의**: `/my` = **내 자산** 화면, `/setting` = **마이** 화면. **Screen ID 주기능 어휘는 라우트가 아니라 화면 기준** — 내 자산 = `asset_`, 마이 = `my_`.
- 교환(Swap) = `/apps/trade/swap` — **Apps 영역** (공식 룰 `apps_` 프리픽스, UF_ 미사용)
- 홈 상단 자산 종류 탭(USDT/JPYC/IDRP). 지원 토큰: USDT·KAIA·JPYC·IDRP + NFT.
- **로그인 게이트** = `/auth/sign-in?returnUrl={원래주소}` (실측 2026-07-27) — 미로그인 상태로 `/my`·`/setting` 진입 시 자동 리다이렉트. `/`·`/benefits/daily-mission`·`/apps`는 비로그인 열람 가능.
- **⚠️ NFT는 asset이 아니라 Apps 영역** — 내 자산의 "보유 NFT" 진입 라우트가 `/apps/my-page/nfts`다(실측). 라우트 기준 `apps_` 프리픽스 대상(§2-4).
- 외부 이탈 도메인: 은행송금 `unifi.sentbe.com` · 개발자 `developers.unifi.me` · 보안 감사 `contract-audit.unifi.me` · 고객센터 `contact.unifi.me` · 스테이블 코인 소개 `welcome.unifi.me` · 프로모션 `promotion.unifi.me`.
- **⚠️ 리워드 라우트 이원화 (2026-07-30 실측)**: `/reward/...` = **부스트·스테이킹 보상** 영역(§2-2-1)이고, GNB 리워드 탭(출석·게임·럭키볼)은 `/benefits/daily-mission`이다. 그리고 **Beta에서 `/benefits`는 K-Pick 탭**이다 — `/reward`·`/benefits`·`/benefits/daily-mission` 셋이 서로 다른 화면이므로 라우트만 보고 주기능을 정하지 않는다.
- **구 라우트 리다이렉트**: `/boost/kaia` → `/reward/usdt` (2026-07-30 확인 — 구 링크는 살아 있으나 신규 표기는 `/reward/usdt`).

## 1. 주기능 (1레벨)

| 주기능 | Screen ID 프리픽스 | 적용 모드 | 근거 |
|---|---|---|---|
| 홈 | `home_` | 전 모드 | GNB 탭 1 (`/`) 실측 |
| 리워드 | `reward_` | Unifi·mini (Wallet Mode 미제공) | GNB 탭 2 (`/benefits/daily-mission`) 실측 |
| 자산(내 자산) | `asset_` | 전 모드 | GNB 탭 3 (`/my`) 실측 — 공식 룰 예시와 동일 |
| 마이(설정) | `my_` | 전 모드 | GNB 탭 4 (`/setting`) 실측 |
| Apps | `apps_` | Unifi 전용 (4탭) | `/apps/...` 실측 — 공식 룰 `apps_` 프리픽스 영역 |
| K-Pick (Guide Kim) | `kpick_` ⚠️잠정 | mini + LIFF/Web(JP Only) | Guide Kim v1.1.0 위키 — 프리픽스 확정 필요 (기존 XLT는 `UF_`/`mini_guidekim_`) |
| 로그인/온보딩 | `login_` | 전 모드 | 진입 게이트 실측 (Google/LINE/Naver/Kakao/Apple — mini는 LINE 단일) |
| 프로모션/캠페인 | `promo_` ⚠️잠정 | 캠페인별 | 럭키볼 초대자/피초대자·황금럭키볼 등 |
| Wallet Mode 전용 변형 | 부기능/세부기능에 `wallet` 어휘 | Wallet Mode | 기존 위키 표기 `Wallet.home` 등 — 신규 부여 시 예: `home_main_wallet_01` (사용자 확인) |

## 2. 기능 트리 (부기능·세부기능)

> §2의 실측 트리는 **Unifi 풀 모드 · KR IP · 로그인 상태** 기준이다. Wallet Mode·mini는 §0 표의 제외 항목(이자·교환·Reward 탭 등)을 반영해 화면이 줄거나 문구가 달라진다(§2-6, §2-7).

### 2-1. home — 홈 (실측 · 라우트 `/`)

```
home_main_01                      홈 메인 — 자산 요약 카드(USDT/JPYC/IDRP 탭·입금하기·플러스 모드 배너·누적 이자)
home_benefit_rate_01              역대급 이율 혜택 (Best Rate Benefits)
home_benefit_referral_01          특별 레퍼럴 랭킹 혜택 (친구 초대하고 USDT 리워드 받기)
home_benefit_together_01          🆕 함께하면 더 큰 혜택, KAIA & USDT (Better Together — 최대 4.2% 보상 + 특별 혜택 · /reward/kaia 진입 배너 · 2026-07-30 신설)
                                  ※ Beta 전용 홈 배너: 친구에게 JPYC 선물하기(럭키볼 최대 50,000 JPYC) · 결제 시 최대 15% 캐시백(K-뷰티·K-컬처·쇼핑) · JPYC 연 최대 5%(기본 2%+3% 기간한정)
home_guide_usdt_01                가이드 — USDT 알아보기 (/doc/usdt)
home_guide_jpyc_01                🆕 가이드 — JPYC 알아보기 (/doc/jpyc — "엔화와 같은 가치를 가진 JPYC" · Beta 실측, JPYC 기준 환경에서 USDT 카드 대체)
home_guide_stable_01              가이드 — 스테이블 코인 경험 (외부 welcome.unifi.me)
home_guide_wallet_01              가이드 — 비수탁 지갑 알아보기 (/doc/wallet)
home_guide_interest_01            가이드 — 이자 운용 방법 (/doc/trust)
home_guide_summary_01             가이드 — 핵심만 쏙쏙 (/guide — Unifi로 수익 내는 방법)
home_guide_transfer_01            가이드 — 자산 옮기기 (거래소별 입금 가이드)
home_faq_01                       자주 묻는 질문 (/faq · 카테고리 쿼리 /faq?category=deposit)
home_notice_01                    공지사항 목록 (/announcement)
home_notice_detail_01             공지사항 상세 (/announcement/{uuid} · LIFF 진입 시 liff_id 쿼리)
home_notification_01              알림 목록 (/notification — 상단 벨 · 필터 6종: 전체·안읽음·공지사항·계정/보안·예치·입출금) ※ 리워드 탭 헤더에도 동일 진입점
home_term_01                      약관 (/term/TERMS_OF_SERVICE/{UNIFI|WALLET|AGGREGATOR})
home_privacy_01                   개인정보 처리방침 (/term/PRIVACY_POLICY/{UNIFI|WALLET}) · 마케팅 (/term/MARKETING_POLICY/UNIFI)
```

푸터 공통(전 탭): 약관 3종·개인정보 2종·마케팅 동의 · For Developers(developers.unifi.me) · 공지사항 · FAQ · **보안 감사 보고서**(contract-audit.unifi.me) · 고객센터(빠른 답변 받기·문의하기 contact.unifi.me) · SNS(X·Medium).

### 2-2. reward — 리워드 (실측 · 라우트 `/benefits/daily-mission` · Wallet Mode 미제공)

```
reward_main_01                    Rewards 메인 (리워드 USDT·럭키볼 개수 요약)
reward_checkin_01                 출석 체크 (1~5일 연속 — 3·5일 럭키볼, 출석하기 버튼)
reward_checkin_01_01              ⚠️ 출석 완료/럭키볼 획득 팝업
reward_mission_game_01            게임 미션 (게임 3개 완료 → 럭키볼) ※ 1회성 미션 정책(시간 제한 없이 수령 — v5 정책)
reward_mission_game_detail_01     개별 게임 미션 상세 (/benefits/games/{uuid} — 게임 6종: Squishy Cat Jump·MERGE CAT·Tap Tap Jello·Hook & Gold·Rich Match·SODA MERGE 2048)
                                  └ 구성(실측): 참여자 수·일일 미션 카운트다운 / 보상 수령(예: 30분 자유 이용권) / 세부 미션 진행도 3종 / 게임 소개·미리보기 / 공식 계정(Discord·Medium·X·Instagram) / FAQ / 플레이 버튼
reward_luckyball_draw_01          ⚠️ 럭키볼 뽑기 (최대 500 USDT / mini는 JPYC)
reward_luckyball_result_01_01     ⚠️ 뽑기 결과 팝업
reward_history_01                 리워드 내역 ("리워드 0 USDT >" 진입점 · mini는 SkyFlag 리워드 미표시 안내)
reward_apps_01                    Apps 둘러보기 (mini 미제공 — §0-2)
```

### 2-2-1. reward — 부스트·스테이킹 보상 (🆕 실측 2026-07-30 · 라우트 `/reward/...` · 상단 탭 2종)

> **#1 이월 항목 해소** — 2026-07-20 공지로 예고됐던 **Kaia CR(Contribution Reward) 미션**이 실제 화면으로 출시됐다. 구 `/boost/kaia`는 `/reward/usdt`로 리다이렉트되고, 그 위에 **KAIA Reward / USDT Reward 2개 탭**이 얹혔다. ⚠️ 주기능 어휘 미확정 — §4 승인 대기.

```
reward_boost_usdt_01 ⚠️잠정        USDT Reward 탭 (/reward/usdt — 구 /boost/kaia)
                                  └ USDT 특별 이자 "최대 3% 추가 Boost" · 티어 300,000/400,000/500,000 KAIA = 1/2/3%
                                  └ **부스트 조건에 위임(delegate) KAIA 합산** — Unifi 지갑 보유 + Kaia Square의 Unifi 노드 위임 수량을 동등 반영 (2026-07-30 신설 문구)
                                  └ 플러스 모드 USDT에 적용 · 일 00:00 UTC+0 기준 · 최대 100,000 USDT까지
reward_staking_kaia_01 ⚠️잠정      KAIA Reward 탭 (/reward/kaia — **KAIA Dual Rewards: Base + Special**)
                                  └ **Staking Rewards / KAIA Staking**: 위임으로 연 최대 4.2% · Accrued Reward · **Delegate 버튼** · Delegatable KAIA
                                  └ **Special Contribution Rewards**(= CR): KAIA 위임 + USDT 보유 시 10 USDT당 최대 0.449999 KAIA · Claimable reward · USDT principal
                                  └ **Mission Check Period**: STAGE 1 — 1R 7.23~8.2(진행 중) / 2R 8.2~8.12 / 3R 8.12~8.22 · View all
                                  └ 정책: 위임 시 자동 적립·개별 출금 불가 / 언디렐리게이트 후 **7일 쿨다운** 뒤 원금+보상 일괄 수령 / 쿨다운 후 7일 미수령 시 **자동 재위임** / Kaia 네트워크 상황에 따라 보상 변동
reward_staking_delegate_01_01     ⚠️ 위임(Delegate) 입력·확인 (상태 변경 액션 — 의도적 미진입)
reward_staking_stage_01           ⚠️ Mission Check Period 전체 보기 (View all)
```

정책 참고(위키 Mission and Reward 마스터): 출석·럭키볼 자격 = **9시 스냅샷 잔고**(USDT 00:00 UTC+0 / JPYC 09:00 UTC+9), TWA 용어 전면 제외(→평균잔고), 럭키볼 차등(USDT 100~1,000+ 최대 9개 / JPYC 5,000~50,000 1~3개), FDS(DA) 검증, Web 보상은 LINE ID 로그인만.

### 2-3. asset — 내 자산 (실측 · 라우트 `/my`)

```
asset_main_01                     내 자산 메인 — 나의 총 자산·액션 4종·토큰 목록(USDT/KAIA/JPYC/IDRP)·보유 NFT
                                  └ ⚠️ **액션 라벨 개편 (Beta = 릴리즈 예정, 2026-07-30 실측)**
                                     프로덕션: 송금하기 / 입금하기 / 교환하기 / **은행송금**
                                     Beta:    **보내기** / **채우기** / 교환하기 / **은행출금**
                                     ※ 용어집 v3.9~v4.0의 `보내기` ja 出金 계열 개편과 같은 흐름 — XLT 작업 시 대상 환경을 먼저 확정한다
                                  └ Beta 추가 표기: KAIA 카드 "최대 추가 연 3%" · JPYC 카드 "연 5%"·누적이자 표시
asset_history_01                  거래내역 (/my/token/transaction — 필터: 기간·토큰·유형·정렬 · Wallet/mini는 이자 내역 제외)
asset_history_detail_01           ⚠️ 거래 상세 (거래 ID·네트워크)
asset_token_detail_01             토큰 상세 (/my/token/{컨트랙트주소} — 플러스 모드·Unifi 지갑·보내기/교환하기/은행송금·거래내역)
asset_send_01                     송금하기 — 토큰 선택 (/transfer — "어떤 토큰을 보내시겠어요?" 전체/스테이블 코인)
asset_send_02                     ⚠️ 송금 — 받는 사람/수량 입력 (공식 룰 예시 단계)
asset_send_qr_01 / _01_01         ⚠️ QR 송금 / 그 위 다이얼로그 (공식 룰 예시)
asset_deposit_01                  입금하기 (/deposit — 네트워크(KAIA)·내 지갑주소 복사·카테고리 탭(스테이블 코인/다른 토큰)·토큰별(USDT/JPYC/IDRP) 거래소 입금 3단계 안내)
asset_deposit_network_01          ⚠️ 지원 네트워크 안내 — **브릿지**(어떤 네트워크로 보내도 전액 도착 · "브릿지 출시 기념 수수료 무료 이벤트") · 입금 화면 상단 진입점 실측, 상세 화면 미진입
asset_bank_01                     은행송금 — **외부 이탈**(unifi.sentbe.com/calculator?session_id=…&redirect_uri=https://www.unifi.me/payout&language=ko_kr)
                                  └ Sentbe 화면(USDT→KRW 계산기·TripleA 라이선스·"인증하러 가기") = Unifi 화면 아님 → **Screen ID 부여 대상 아님**
asset_payout_01                   ⚠️ 은행송금 복귀 화면 (/payout — Sentbe redirect_uri 대상, 미진입)
asset_plus_mode_01                ⚠️ 플러스 모드 상세 (토큰 상세 내 진입점 실측)
```

> **NFT 목록은 asset이 아니라 Apps 영역** — 내 자산의 "보유 NFT"는 `/apps/my-page/nfts`로 이동한다(§2-4). 기존 `asset_nft_01` 어휘는 **`apps_mypage_nft_01`로 정정 제안**(사용자 확인 필요 — 아직 부여된 위키 없음).

### 2-4. apps — Apps 영역 (실측 · 라우트 `/apps/...` · Unifi 4탭 전용)

```
apps_main_01                      Apps 메인 — Reward 서브탭 (/apps · **비로그인 열람 가능**)
                                  └ 구성(실측): 앱 검색 / 수혜자 수·"최대 $1.2 리워드" / 시세 위젯(Binance KAIA·CoinMarketCap USDT·기준일) /
                                    USDT Reward Missions · KAIA Reward Missions(외부 dapp 미션형 보상) / Editor's Pick / Explore Apps
                                    (카테고리 8종: AI·CONTENT·DePIN·GAME·Payment·SOCIAL·SocialFi·ETC · 27 Apps · Popular 정렬 · 각 앱은 외부 dapp URL로 이탈)
apps_market_01                    Apps 마켓 서브탭 (/apps/market — Buy/Sell · Drops: Live & Upcoming / Past / Now · NFT 드롭 카드(가격 KAIA·수량·판매율))
apps_mypage_nft_01                나의 NFTs (/apps/my-page/nfts — 탭 3종: 전체·판매중·거래내역 / 빈 상태 "지갑에 보유하고 있는 NFT가 없어요")
                                  ※ 진입점은 내 자산의 "보유 NFT" · `/apps/my-page` 단독 진입은 `/my`로 리다이렉트
apps_trade_swap_01                교환하기 (/apps/trade/swap — From/To 토큰 선택·교환 · JP 미제공·mini 미제공)
apps_trade_swap_confirm_01_01     ⚠️ 교환 확인 팝업 (예상 수수료)
```

### 2-5. my — 마이/설정 (실측 · 라우트 `/setting`)

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
my_withdraw_01                    ⚠️ 계정 탈퇴
```

### 2-6. Wallet Mode 전용 화면 (위키 [Screen]Wallet Mode 근거 — 기존 표기는 dot 형식, 소급 금지)

```
(기존 위키 표기)                   (신규 부여 시 제안 어휘 — 사용자 확인 필요)
Wallet.login                      login_main_wallet_01 — Wallet Mode 로그인 인트로 (UF_signin_intro_*_wallet_mode)
Wallet.home                       home_main_wallet_01 — US/UK/CA/SG IP 홈 (USDT 리워드 롤링 배너·회원가입 유도·미션앤리워드 배너)
Wallet.Signup.bottom              login_signup_bottom_wallet_01_01 — 회원가입 완료 바텀시트 (자산 채우기/미션 둘러보기)
Walelt.Assets (위키 오타)          asset_main_wallet_01 — 이율 정보 전부 제거
Walelt.Assets.Detail              asset_token_detail_wallet_01 — 이율 정보 전부 제거
Wallet.Reward.Home                home_reward_wallet_01 — Wallet Mode 로그인 홈(미션앤리워드 구성 · LV)
```

### 2-7. Unifi mini / K-Pick (위키 Guide Kim·Unifi Mini 요구사항 근거)

```
(mini 변형 — 별도 화면이 있는 것만)
login_signup_bottom_mini_01_01    MINI용 회원가입 바텀시트
login_intro_custom_01             회원가입 전 커스텀 인트로 페이지 (UIT · Guide Kim v1.1.0)
home_main_mini_01                 mini 홈 — 미션앤리워드 + SkyFlag + 프로모션 배너 구성 (JPYC 기준 · 로그인+JPYC 보유 시 클리닉/K-Pop 큐레이션)
reward_checkin_daily_01           데일리 출석체크 (UF_dm_dc_* — 비로그인 '출석 체크'/로그인 '매일 출석 체크'+카운트다운)

(K-Pick 탭 — Beta에서 GNB 정식 탭 승격 · ⚠️ 프리픽스 잠정 kpick_ · **실측 2026-07-30 Beta**)
kpick_main_01                     K-Pick 탭 메인 (**Beta 라우트 `/benefits`** · 서브탭 **K-Pick | MY쇼핑** · 상단 noti)
                                  └ **카테고리 3종으로 개편**: **K-뷰티 · K-쇼핑 · K-컬처** (구 5종 클리닉·뷰티체험·바우처·화장품·K-Pop → 3종)
                                  └ 구성: JPYC 안내 배너("일본 정부 최초 승인 디지털 엔화")·JPYC 구매 가이드 / 진행 중 예약 + **내 예약** /
                                    한국 여행 필수 **바우처**(올리브영·다이소·CU편의점·이마트 모바일 금액권 · 캐시백 8%·22% · ¥ 가격) /
                                    **K-뷰티 스킨부스터**(쥬베룩·리쥬란 시술 · 클리닉 다수 · 캐시백 10% · 시술 예약 최대 2만원 할인) / 정품 인증
kpick_myshopping_01               🆕 MY쇼핑 서브탭 (K-Pick 상단 탭 — 클릭으로 라우트 변화 없음, 상세 미확인 ⚠️)
kpick_bridge_01                   Guide Kim 브릿지 화면 (LINE 앱 환경=IAB·Web=새 탭 · '내 예약' 경유 시 미노출) · Beta 실측 `/channel/bridge/AFFORMATION`
kpick_reservation_01              내 예약 (진행 중 예약 툴팁·레드닷 · mini 홈에서 "내 예약 3건 확인하기" 실측)
kpick_kr_block_01                 KR IP — 버튼 비노출 + 국가 서비스 불가 안내 ※ **Beta에서는 KR IP로도 K-Pick 전체 열람됨**(정책 변경 가능성 — 다음 점검 재확인)
```

**Unifi mini Beta 라우트 실측 (2026-07-30 — mini 최초 직접 실측)**

```
/benefits-mini                    mini 홈 (liff_id 진입 시 자동 리다이렉트 · 상단 **qr**·noti)
                                  └ 구성: JPYC 안내 / **내 예약 N건 확인하기** / **데일리 미션하고 JPYC 받기** /
                                    **100% 당첨되는 JPYC 럭키볼** / 바우처·K-뷰티 시술 목록(K-Pick과 동일 구성)
/benefits-mini/daily-mission      mini 데일리 미션
/benefits-mini/draw-promotion     mini 럭키볼 뽑기 프로모션
/benefits-mini/luckyball-invite   mini 럭키볼 친구 초대 (miniapp.line.me/2008994547-GfGUdDxy/... 형태로도 노출 — **현재 위키 작업 중인 럭키볼 캠페인의 실제 라우트**)
/benefits-mini/curation/{uuid}    mini 큐레이션 상세 (실측 3건)
```

> mini 푸터에는 **어그리게이터 약관이 없다**(Unifi·Unifi 지갑·개인정보·마케팅만) — §0 표의 "mini는 어그리게이터 약관/approve 미제공"과 일치하는 실측 근거.

### 2-8. login / promo (실측)

```
login_main_01                     소셜 로그인 선택 (/auth/sign-in?returnUrl=… — Google/LINE/Naver/Kakao/Apple · "Powered by LINE NEXT" · mini는 LINE 단일)
login_terms_01                    ⚠️ 약관 동의 (가입 플로우 — Unifi는 어그리게이터 약관+approve 포함, Wallet/mini는 미제공)
promo_luckyball_inviter_01        럭키볼 초대자 프로모션 페이지 (위키 작업 실측)
promo_luckyball_invitee_01        럭키볼 피초대자 프로모션 페이지 (위키 작업 실측)
promo_goldenball_01               ⚠️ 황금럭키볼 프로모션 (mini 홈 배너 — 위키 근거)
```

---

## 3. Screen ID 부여 방법 (공식 룰 요약 + 이 IA 사용법)

1. **모드 먼저 확정**: 부여 대상 화면이 Unifi/Wallet Mode/Unifi mini 중 어디 것인지 §0 표로 판별한다. 모드 전용 변형 화면은 부기능/세부기능에 `wallet`/`mini` 어휘를 넣는 방식을 기본으로 하되 **사용자 확인**을 받는다.
2. **구조**: `주기능_부기능_세부기능_01` 또는 `주기능_부기능_세부기능_추가세부기능_01`. 마지막 `_01` 추가 = 다이얼로그/팝업.
   - 예 (공식 룰): `asset` → `asset_send_01` → `asset_send_02` → `asset_send_qr_01` → `asset_send_qr_01_01`.
3. **전부 소문자** — GA page_name 파라미터로 쓰이므로 대문자 금지 (기존 위키의 `Wallet.login` 식 dot 표기는 레거시 — 신규에 사용 금지).
4. **어휘 선택**: 주기능은 §1 표, 부기능·세부기능은 §2 트리에서 고른다. 트리에 없는 새 기능이면 **이 파일에 먼저 추가**(사용자 확인)하고 부여한다.
5. **Apps 영역 판별**: 라우트가 `/apps/...`이거나 Apps 메뉴(구 Dapp Portal) 소속 화면이면 주기능 `apps_` (XLT Key도 `apps_` 프리픽스·UF_ 미사용 — 공식 룰).
6. **⛔ 검토 게이트(필수)**: 부여 전 `{Figma 프레임명 → Screen ID}` 매핑 표를 사용자에게 제시 → 승인 후 위키 반영. 승인 없이 확정하지 않는다.

## 4. 미확정/후속 확인 사항

- [ ] ⚠️ 잔여 항목 실측 (팝업·조건부: 뽑기 결과, 송금 2단계·QR, 거래 상세, 플러스 모드 상세, 지원 네트워크(브릿지) 상세, `/payout`, 계정 탈퇴, 황금럭키볼, **위임(Delegate) 입력·확인**, **MY쇼핑 서브탭**)
  - 2026-07-27 실측 승격: Apps 메인·마켓, 알림 목록, 게임 미션 상세, 은행송금(외부 Sentbe), NFT 목록
  - 2026-07-30 실측 승격: **`/reward/kaia` KAIA 스테이킹·CR 보상**, **K-Pick 탭 전체(Beta)**, **Unifi mini 라우트 계열(Beta)**, 내 예약 진입점
  - ⚠️ **2주 연속 미완**: **로그인 상태 리워드 탭(`/benefits/daily-mission`)이 스켈레톤에서 진행되지 않음** — 프로덕션(7/27)·Beta(7/30) 모두 재현. 로그인 분기 문구 미확인. 다음 점검에도 재현되면 서비스측 이슈로 사용자에게 별도 보고
- [ ] **NFT 어휘 정정 — 사용자 결정 대기(2026-07-27 보류)**: `asset_nft_01` → `apps_mypage_nft_01` 제안(라우트 `/apps/my-page/nfts` 근거)에 대해 사용자가 "대기" 결정. **확정 전까지 두 어휘 모두 신규 부여에 사용 금지** — 이 화면에 Screen ID가 필요해지면 먼저 이 건을 재확인받는다.
- [x] ~~**Kaia CR(Contribution Reward) 미션 출시 추적**~~ → **2026-07-30 출시 실측 완료** (`/reward/kaia` — §2-2-1). 어휘는 아래 승인 대기 ②
- [ ] **⛔ 승인 대기 ② (신규 2026-07-30)**: `/reward/...` 영역 주기능 어휘 — 현재 `reward_`는 GNB 리워드 탭(`/benefits/daily-mission`)에 쓰고 있어 **충돌**. 후보 ⓐ `reward_boost_usdt_01`·`reward_staking_kaia_01`(현재 잠정 표기) ⓑ 별도 주기능 `staking_` 신설. **확정 전까지 이 영역에 Screen ID 부여 금지**
- [ ] 입금 **브릿지**(멀티 네트워크 입금) 상세 화면 확인 — 2026-06-30 "브릿지 수수료 100% 지원" 공지·입금 화면 배너 근거
- [ ] **Beta 액션 라벨 개편의 프로덕션 반영 시점 추적** — 보내기·채우기·은행출금이 프로덕션에 나가면 XLT 문구가 일괄 영향(용어집 v3.9~v4.0 `보내기` 개편과 연동)
- [ ] **K-Pick KR IP 정책 재확인** — Beta에서는 KR IP로도 K-Pick 전체가 열람됐다(구 정책: KR IP 버튼 비노출 + 국가 서비스 불가 안내). 정책 변경인지 Beta 한정인지 확인
- [ ] Wallet Mode 실기기/실IP 실측 (US/UK/CA/SG IP 필요 — 여전히 위키 스펙 근거) ※ **Unifi mini는 2026-07-30 Beta로 실측 착수**(`/benefits-mini` 계열)
- [ ] `kpick_` 프리픽스 확정 (K-Pick 탭 주기능 어휘 — 기존 XLT는 UF_/mini_guidekim_) · **2026-07-30 Beta에서 GNB 정식 탭 승격·카테고리 3종 개편 실측** → 승인 대기 ③
- [ ] 프로모션 프리픽스 `promo_` vs `event_` 확정 (현재 `promo_` 잠정)
- [ ] Wallet Mode/mini 전용 변형 어휘(`_wallet`/`_mini` 접미 방식) 사용자 확정
- [ ] 은행송금(Sentbe)·SkyFlag의 mini 연동 방식 확정 시 트리 갱신
- [ ] 매주 월 10:00 정기 점검 시 위 항목 재확인 + 신규 메뉴/기능 탐지
