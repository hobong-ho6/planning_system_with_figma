# Unifi IA 주간 점검 리포트 — 2026-08-03 (#3)

| 항목 | 내용 |
|---|---|
| 점검 대상 | **프로덕션** `www.unifi.me` (비로그인, KR IP) + **Beta** `unifi-web.line-apps-beta.com` (로그인) + **Unifi mini Beta** (`?liff_id=2008994547-GfGUdDxy` → `/benefits-mini`) |
| 점검 방법 | ① 인앱 브라우저 프로덕션 탐색(375px) ② 사용자 Chrome으로 Beta·mini Beta 탐색(Beta 로그인 세션) ③ 공지사항 목록·상세로 기능 변경 교차 확인 |
| 정본 파일 | `md/IA.md` |
| 이번 회차 특징 | **미션앤리워드 Season 3(8/1) 개시로 리워드 정책 수치가 전면 교체**됨 — 위키·XLT의 럭키볼 수치 기재가 모두 구값이 됨. #2 이월이던 **MY쇼핑 정체 해소**(외부 GuideKim) |
| 결과 | IA.md 갱신 **O** · 승인 대기 **4건**(③ 유지 + ④ 신규) · 3주 연속 미완 1건을 **서비스측 이슈로 승격 보고** |
| 안전 제약 준수 | 조회·탐색만. 위임(Delegate)·출석하기·뽑기·송금·외부 지갑 연결 등 **상태 변경 액션 일절 미실행**. 직접 로그인 시도 없음 |

---

## 1. 점검 범위 (실제 방문 라우트)

**프로덕션(비로그인)** — `/` · `/reward/kaia` · `/reward/usdt` · `/benefits/daily-mission`(인앱 EN + Chrome KO 이중 확인) · `/benefits/games`(404 확인) · `/apps` · `/apps/market` · `/announcement` · `/announcement/{uuid}`(Season 3 공지 전문) · `/my`→`/auth/sign-in`(로그인 게이트)

**Beta(로그인 세션)** — `/` · `/benefits`(K-Pick) · `/benefits/daily-mission` · `/my`(내 자산 + 헤더 케밥 메뉴) · `/setting`(마이)

**Unifi mini Beta(로그인)** — `/benefits-mini`(liff_id 리다이렉트) · `/benefits-mini/daily-mission` · `/benefits-mini/draw-promotion` · `/benefits-mini/luckyball-invite`

> ⚠️ 점검 후반 Chrome·인앱 모두 Beta 도메인 접근이 차단되어 **mini Assets·My 탭은 미점검**으로 남았습니다(다음 회차 이월).

---

## 2. 변경 발견 — 🔴 최대 변경: 미션앤리워드 Season 3 (2026-08-01 개시)

공지 `2026-08-01` "Check in daily and play games for a chance to win up to 500 USDT! Unifi Mission & Lucky Ball Event Season 3 begins!" 전문을 확인했습니다. **IA.md에 적혀 있던 럭키볼 정책 수치가 전부 구값이 됐습니다.**

| 항목 | 이전 기재 (IA.md §2-2) | **Season 3 (8/1~9/1)** |
|---|---|---|
| 출석 럭키볼 | "USDT 100~1,000+ **최대 9개**" | **100 USDT↑** = 라운드당 3일 1개·5일 1개, **월 최대 12개** / **1,000 USDT↑** = 라운드당 각 2개, **월 최대 24개** |
| 출석 라운드 | 1~5일 단발 | **5일 완료 다음 날(6일차)부터 새 라운드 시작** — 반복 구조 |
| 게임 미션 | 게임 3개 완료 → 럭키볼 · **1회성(시간 제한 없이 수령)** | **6종 중 3종 매일** 완료 → 럭키볼 1개 · **매일 00:00 UTC+0 리셋** · **월 최대 30개** |
| 미수령 처리 | 명시 없음 | **당일 미수령 럭키볼은 리셋 시 소멸** |
| 럭키볼 상금 | "최대 500 USDT" | **5티어 실측** — 1등 500 / 2등 20 / 3등 5 / 4등 1 / 5등 **0.02 USDT** |
| 자격 | 9시 스냅샷 잔고 | 동일(00:00 UTC+0 스냅샷 100 USDT↑) + **Unifi LINE 계정 연동 필수**, 웹은 LINE 로그인만 |

> **⚠️ XLT·위키 영향**: 럭키볼 캠페인 위키(pageId=4479306980)와 미션앤리워드 관련 문구에 구 수치("최대 9개" 등)가 남아 있으면 Season 3 기준으로 재검토가 필요합니다. 이 리포트는 IA 점검 범위라 위키는 건드리지 않았습니다.

### 2-1. ⚠️ → ✅ 실측 승격

| 화면 | 라우트 | 핵심 확인 |
|---|---|---|
| **MY쇼핑** (#2 이월 해소) | K-Pick 헤더 우측 링크 | **Unifi 화면이 아님** — `test.guidekim.me/login?returnTo=%2Fme%2Forders&utm=AFMT_001`로 **새 탭 이탈**(GuideKim 자체 로그인 → 내 주문). **Screen ID 부여 대상 아님** |
| **mini Reward 탭** | `/benefits-mini/daily-mission` | JPYC 이자 배너 / 🆕 **Special Missions**(무제한 미션·최대 ¥30,000·게임/광고/설문) / Daily Mission(최대 50,000 JPYC) / **Game mission "외부 게임 미션" 0/2** / **출석 체크 없음** |
| **mini 럭키볼 친구 초대** | `/benefits-mini/luckyball-invite` | 내 럭키볼 `0 Draw` · 미션 완료 친구 `0/20명` · 초대 단계 ①가입 ②공식계정 추가 · 유의사항 4종 · CTA [로그인]/[홈으로 가기] · LINE 앱 유도 다이얼로그 |
| **Apps 게임 프로모션 캐러셀** | `/apps` 최상단 | 🆕 5종 슬라이드(LEGEND WAR·Endless Frontier2·LORDNINE·Siege Of Titans·Seal M) — 전부 외부 게임 이탈(`referral_code`) |
| **CR 보상 분배 정책 전문** | `/reward/kaia` | 6개월 분할 + **매월 수동 [Claim Rewards]** / 미분배 CR **약 90일(3 Epochs) 후 소각** / 캡 **5,000만 USDT** 초과 시 비례 감소 / 1:10은 **예치 원금만** 산정 |
| **리워드 탭 한국어 문구** | `/benefits/daily-mission` | "리워드/럭키볼 N개" · **"일일 미션" + 카운트다운 "HH:MM:SS 남음"** · "출석하기" · "Apps 둘러보기" |

### 2-2. 신설 — 이번 주 새로 생긴 것

| 구분 | 내용 | 환경 |
|---|---|---|
| 🆕 **외부 지갑 연결** | 내 자산 헤더 **⋮ 케밥 메뉴** → "Connect External Wallet" (메뉴 유일 항목) | **Beta만** (프로덕션 미반영) |
| 🆕 **Apps 게임 프로모션 캐러셀** | `/apps` 최상단 5종 · View All | 프로덕션 |
| 🆕 **mini Special Missions** | "무제한 미션, 최대 ¥30,000 즉시 / 게임·광고·설문" (SkyFlag 계열 추정) | mini Beta |
| 🆕 **mini K-컬처 체험 섹션** | "한국에서 K-뷰티 즐기기 — 퍼스널컬러부터 아이돌 메이크업까지" 6종(헤어샵·퍼스널컬러·Ktown4u MV·홍대 댄스클래스 등, 캐시백 7%) | mini Beta |
| 🆕 **LINE 앱 전용 게이트** | `/benefits-mini/draw-promotion` 진입 시 딤 + "Only available on the LINE app" 다이얼로그 (7/30에는 열람 가능했음) | mini Beta |
| 변경 | `/apps` **27 Apps → 30 Apps** · 수혜자 9,018,705명 | 프로덕션 |
| 변경 | `/reward/kaia` Mission Check Period **1R 종료 → 2R(8.2~8.12) 진행 중** | 프로덕션 |
| 변경 | K-Pick 카테고리 행이 **4개 아이콘**(K-뷰티·K-쇼핑·K-컬처 + **내 예약**) · 스킨부스터 **3계열**(쥬베룩·리쥬란·**포텐자**) | Beta |
| 변경 | Beta 내 자산 JPYC 카드 **연 5% → 연 2%** 표기 | Beta |

### 2-3. ⚠️ 감소·소멸 — 확인이 필요한 변화

| 항목 | 내용 |
|---|---|
| **프로덕션 리워드 탭 게임 미션 섹션 미노출** | 7/30에는 노출(게임 6종)됐으나 **8/3 비로그인에서 섹션 자체가 없음**(인앱 EN·Chrome KO 모두 동일). Season 3 공지에는 게임 미션이 존재하므로 **Season 전환 중 미노출 또는 로그인/예치 조건부 노출**로 추정 → 로그인 확인 필요 |
| **mini 홈 "100% 당첨되는 JPYC 럭키볼" 섹션 소멸** | 7/30 홈에 있던 섹션이 8/3 홈에서 미노출. Reward 탭 Daily Mission으로 이동한 것으로 추정 |
| **mini 이자 배너 등장 (정책 충돌)** | 위키 스펙은 "mini는 예치금·이자 노출 불가"인데 mini Reward 상단에 **"내 JPYC 자산 불리기 — 연 최대 5% 이자"** 배너 실측. 정책 변경인지 Beta 한정인지 확인 필요 |

---

## 3. 🔴 서비스측 이슈 보고 — 로그인 리워드 탭 3주 연속 스켈레톤 고착

#2에서 "다음 점검에도 재현되면 서비스측 이슈로 별도 보고"로 남겼던 항목이 **3주 연속 재현**되어 보고합니다.

- **증상**: 로그인 상태에서 `/benefits/daily-mission` 진입 시 요약 카드·출석 체크·게임 미션 영역이 **로딩 스켈레톤에서 벗어나지 않음**(10초 이상 대기 후에도 동일)
- **재현 이력**: 프로덕션 2026-07-27 / Beta 2026-07-30 / Beta 2026-08-03
- **2026-08-03 네트워크·콘솔 실측 (원인 좁힘)**
  - 정적 자산 정상 200 — `DailyMission`·`AttendanceCheck`·`GameMission`·`GameMissionProgress` 청크 모두 로드됨
  - API 정상 200 — `POST api-reward-unifi.line-apps-beta.com/unifi/v1/mission-users` **200**, `GET /v1/token-info/country` 200, `GET /api/v1/account/me` 200
  - **콘솔 에러 0건**
  - DOM에는 스켈레톤 플레이스홀더가 렌더된 상태로 유지 → **데이터는 오는데 UI가 로딩 상태를 해제하지 못하는 프런트 렌더 이슈**로 추정
- **대조군**: 같은 라우트가 **비로그인에서는 정상 렌더**(프로덕션 8/3, 인앱 EN·Chrome KO 모두) → **로그인 분기에서만 재현**

---

## 4. ⛔ 사용자 승인 대기 — Screen ID 어휘 4건

| # | 대상 | 제안 | 근거·상태 |
|---|---|---|---|
| ① | 보유 NFT 목록 | `asset_nft_01` → `apps_mypage_nft_01` | 라우트 `/apps/my-page/nfts`. #1 제안 → 사용자 "대기" 결정. **확정 전까지 두 어휘 모두 신규 부여 금지** |
| ② | `/reward/...` 부스트·스테이킹 영역 | ⓐ `reward_boost_usdt_01`·`reward_staking_kaia_01`(잠정) / ⓑ 별도 주기능 `staking_` 신설 | `reward_`를 이미 GNB 리워드 탭에 쓰고 있어 **충돌**. 확정 전까지 부여 금지 |
| ③ | K-Pick 주기능 프리픽스 | `kpick_` (잠정 유지) | Beta GNB 정식 탭 + 라우트 `/benefits`가 리워드와 겹침. 기존 XLT는 `UF_`/`mini_guidekim_` |
| ④ 🆕 | 외부 지갑 연결 (Beta 신규) | `asset_wallet_connect_01` (잠정) | 내 자산 헤더 케밥 메뉴 소속이라 `asset_`가 자연스러우나 연결 플로우가 Apps/지갑 영역일 수 있음. **확정 전 부여 금지** |

> **해소**: #2의 `kpick_myshopping_01` 어휘 제안은 **폐기**합니다 — MY쇼핑이 Unifi 화면이 아니라 외부 GuideKim이므로 Screen ID 부여 대상이 아닙니다.

---

## 5. 변경 없음 확인 항목

- 프로덕션 GNB **4탭** 유지(홈 `/` · 리워드 `/benefits/daily-mission` · 내 자산 `/my` · 마이 `/setting`) / Beta·mini Beta **5탭** 유지(K-Pick 포함)
- 로그인 게이트 `/auth/sign-in?returnUrl=…` — 소셜 5종(Google·LINE·Naver·Kakao·Apple)·"Powered by LINE NEXT" 동일
- `/reward/usdt` 부스트 티어 30만/40만/50만 KAIA = 1/2/3%, 최대 100,000 USDT 한도, 일 00:00 UTC+0 기준, 위임 KAIA 합산 조건 — 전부 동일
- Beta 내 자산 액션 4종 **Send / Receive / Swap / Bank Withdraw** 유지(프로덕션은 송금하기/입금하기/교환하기/은행송금)
- Beta 마이(`/setting`) 구성 — 인증/보안 3종·개인 키·언어·통화·알림·FAQ·문의·오픈소스 라이선스·로그아웃·탈퇴 전부 동일
- `/apps/market` 구조(Buy/Sell · Drops: Live & Upcoming/Past/Now) 동일 — 드롭 상품만 교체(Dr.Paws 500 KAIA)
- 푸터 구성(약관 3종·개인정보 2종·마케팅·개발자·공지·FAQ·보안 감사·고객센터·X/Medium) / **mini 푸터에 어그리게이터 약관 없음** 재확인
- Apps 카테고리 8종(AI·CONTENT·DePIN·GAME·Payment·SOCIAL·SocialFi·ETC)

---

## 5-1. 🧭 화면 변형 3축 정리 (IA.md §0-0-1 신설)

이번 회차에 IA 트리를 **환경 × 사용자 상태 × 접속 IP** 3축 기준으로 재정리했습니다. 한 라우트가 곧 한 화면이 아니기 때문입니다.

| 축 | 값 | 화면에 미치는 영향 |
|---|---|---|
| **① 환경** | Web / LIFF / Wallet Mode / mini | GNB 탭 수, 기준 자산(USDT↔JPYC), 이자·교환·Reward 제공 여부, OA 유도 |
| **② 사용자 상태** | 비로그인 / 로그인 | 라우트 접근 가능 여부, 자산 요약·진행도 노출, CTA 문구 |
| **③ 접속 IP** | KR / JP / US·CA·UK·SG / 그 외 | Wallet Mode 강제, K-Pick 노출·차단, 교환 미제공 |

**우선순위**: ③ IP가 US·CA·UK·SG면 ①을 덮어써 **무조건 Wallet Mode** → ① mini면 기준 자산이 JPYC → ②는 그 위의 상태 분기.

**축 ② 실측 매트릭스 요약** (환경 Web·mini / IP KR)

- 🟢 비로그인 가능 — `/reward/kaia`·`/reward/usdt` · `/apps`·`/apps/market` · `/announcement` · `/faq`·`/doc/*`·`/guide`·`/term/*` · `/auth/sign-in`
- 🟡 열람은 되나 **구성이 다름** — `/`(홈: 비로그인은 자산 카드 없음 + "Get Started" CTA) · `/benefits/daily-mission`(진행도 0 고정) · `/benefits`(K-Pick: 예약 툴팁 없음) · `/benefits-mini/luckyball-invite`(CTA가 [로그인])
- 🔴 로그인 필수 — `/my` · `/setting` · `/notification` · `/my/token/transaction`·`/my/token/{주소}` · `/transfer` · `/deposit` · `/apps/trade/swap` · `/apps/my-page/nfts`
- 🔴 별도 게이트 — `/benefits-mini/draw-promotion`(로그인 무관 **LINE 앱 전용**)

---

## 6. ⬜ 미점검 — 사용자 접근 수단이 있으면 다음에 실측 가능

**축 조합 커버리지** — 현재 실측은 **Web·mini × KR IP** 조합에 몰려 있고, Wallet Mode·LIFF·JP는 **전부 위키 스펙 근거**입니다.

| # | 미점검 조합·화면 | 왜 못 했나 | **필요한 접근 수단** |
|---|---|---|---|
| 1 | **프로덕션 로그인 전체** (`/my`·`/setting`·`/notification`·`/my/token/transaction`·`/apps/my-page/nfts`) | Chrome에 **Beta 세션만** 있고 프로덕션은 비로그인 | 사용자가 Chrome에서 `www.unifi.me` 로그인만 해두면 다음 회차 자동 커버 (**Claude는 직접 로그인 금지**) |
| 2 | **로그인 상태 게임 미션 노출 여부** | 1번 미비 + 로그인 리워드 탭 3주 연속 스켈레톤 | 위 1번 + 스켈레톤 이슈 해소 |
| 3 | **Wallet Mode 전체** (US·CA·UK·SG IP 강제 모드) | 해외 IP 없음 | 해당 국가 VPN/프록시, 또는 해외 IP에서 캡처한 화면 |
| 4 | **LIFF 환경** (LINE 인앱 브라우저 진입) | LINE 앱에서만 열림 | LINE 앱으로 여는 LIFF 링크(+ 화면 캡처) |
| 5 | **JP IP** (K-Pick JP Only·교환 미제공 검증) | JP IP 없음 | JP VPN 또는 JP 사용자 캡처 |
| 6 | **approve 미완료 계정** (IP 무관 Wallet Mode 분기) | 기존 계정은 approve 완료 상태 | 신규/미approve 테스트 계정 |
| 7 | **mini 비로그인** | mini는 로그인 세션 상태로만 확인 | 시크릿 창 + mini liff 링크 |
| 8 | **`/benefits-mini/draw-promotion` 내용** | **LINE 앱 전용 게이트**로 웹 차단 | LINE 앱에서 연 화면 캡처 |
| 9 | **외부 지갑 연결 플로우** | 메뉴 항목만 확인 — 연결은 **상태 변경 액션이라 의도적 미진입** | 사용자가 진행한 화면 캡처(또는 진행 허용 지시) |
| 10 | **위임(Delegate) 입력·확인**, Mission Check Period `View all` | 상태 변경 액션 / 미진입 | 캡처 또는 진행 허용 지시 |
| 11 | **입금 브릿지 상세** (`지원 네트워크` 배너) | 배너 클릭이 동작하지 않음(Beta) | 프로덕션 로그인(1번)에서 재시도 |
| 12 | 송금 2단계·QR, 거래 상세, 플러스 모드 상세, `/payout`, 계정 탈퇴 | 상태 변경 직전 단계 / 진입 조건 미충족 | 1번 해소 후 순차 진입 |

## 6-1. 이번 회차에 해소된 이월 항목

| 항목 | 결과 |
|---|---|
| **MY쇼핑 서브탭 상세** (#2 이월) | ✅ 해소 — 외부 GuideKim 이탈, Screen ID 대상 아님 |
| **mini Assets·My 탭** | ✅ 해소 — mini GNB Assets는 `/my`로 이동, **풀 모드 화면을 그대로 공유**(이자 표기·어그리게이터 약관 포함) |
| **알림 목록 상세** | ✅ 필터 6종 라벨·"View N more" 그룹핑·**30일 보관 정책** 실측 |
| **거래내역 필터** | ✅ 4종 실측 라벨(3 months·All Tokens·All·Newest) |
| **황금럭키볼** | 🟡 부분 — 화면은 아니고 **알림 본문에 시즌2 전문**(7/14~7/31, 종료) 확인 |

## 6-2. 그 밖의 이월

| 항목 | 사유 |
|---|---|
| **mini 이자 노출 정책 충돌** | 위키 스펙("mini 이자 노출 불가") vs Beta mini Reward **「연 최대 5% 이자」 배너** 실측 — 기획 확인 필요 |
| **K-Pick KR IP 정책** | Beta에서 **2주 연속** KR IP 전체 열람 — 정책 변경 가능성 높음, 확인 필요 |
| **Beta 액션 라벨(보내기·채우기·은행출금) 프로덕션 반영 시점** | 아직 프로덕션 미반영 — 반영 시 XLT 문구 일괄 영향 |
| **프로덕션 리워드 탭 게임 미션 미노출 원인** | Season 3 전환 영향인지 조건부 노출인지 미확정 |

## 6-3. 🌐 XLT 관점 부수 발견 — 영문 UI에 한국어 원문 노출 2건

번역 누락으로 의심되는 사례를 실측했습니다(IA 범위 밖이지만 XLT 작업에 직접 영향).

| 위치 | 노출 문구 | 환경 |
|---|---|---|
| mini Reward 탭 게임 미션 항목 | **"외부 게임 미션"** (영문 UI에 한국어 그대로) | Beta mini |
| 교환하기(`/apps/trade/swap`) 하단 배너 | **"지금 AlphaSec에서 KAIA 거래하면 즉시 수수료 0원!"** | Beta |

→ 디자이너·FE에 XLT 키 부여 누락 여부 확인 요청을 권장합니다.

---

## 7. IA.md 갱신 위치 요약

| 섹션 | 변경 |
|---|---|
| 분석 이력 | 2026-08-03 주간 점검 #3 행 추가 |
| §0 제품 모드 표 | mini **GNB 5탭 실측** 반영 · mini **예치·이자 셀에 정책 충돌 경고** 추가 |
| §2-2 reward | **Season 3 정책 블록 신설**(자격·출석 라운드·게임 미션·상금 5티어·소멸 규칙) · 구 럭키볼 수치 교체 명시 · 한국어 실측 문구 · 게임 미션 미노출 경고 · `/benefits/games` 404 |
| §2-2-1 스테이킹 | Mission Check Period **2R 진행 중** · **CR 수령 조건·분배 정책 전문** 추가 |
| §2-3 asset | `asset_wallet_connect_01` **신설** · JPYC 연 2% 정정 · History 버튼 위치 |
| §2-4 apps | **게임 프로모션 캐러셀 신설** · 30 Apps · USDT Reward Missions 실측 3건 · Editor's Pick |
| §2-7 mini/K-Pick | K-Pick 카테고리 4아이콘·바우처 12종·시술 3계열 · **`kpick_myshopping_01` 폐기(외부 GuideKim)** · mini 홈/Reward/draw-promotion/luckyball-invite 트리 전면 갱신 |
| §4 미확정 | 8/3 실측 승격 목록 · **3주 연속 미완 서비스측 이슈 승격** · 프로덕션 로그인 필요 항목 · 게임 미션·mini 이자 확인 항목 · **승인 대기 ④ 신설** |

---

## 8. 가이드 사이트 반영

| 버전 | 내용 |
|---|---|
| **`v10`** | IA 점검 리포트 탭에 **#3 회차 패널** 추가 + 「전체 IA 구조」 표(`IA_DATA`)에 **외부 지갑 연결·mini Special Missions·mini K-컬처 체험·Apps 게임 프로모션 캐러셀** 행 반영, **MY쇼핑 행 제거**(외부 서비스) |

---

*작성: Claude Code 스케줄 태스크 `weekly-unifi-ia-check` · 다음 실행: 2026-08-10(월) 10:00*
