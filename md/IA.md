# Unifi (unifi.me) IA 분석 — Screen ID 네이밍 참조 정본

> **목적**: Screen ID(`주기능_부기능_세부기능_순번[_순번]`, 전부 소문자 — 공식 룰 `[Rule] 기획서 Screen ID & XLT Key 작성 가이드` pageId=4268282157) 부여 시 참조하는 **IA 단일 정본**.
> **갱신 규칙**: 서비스 IA가 바뀌면 **이 파일만 갱신**한다 — Screen ID 어휘·트리를 다른 md에 중복 기재하지 않는다. `md/wiki.md`의 Screen ID 규칙은 이 파일을 참조만 한다.
> **⛔ 적용 게이트**: 이 IA로 Screen ID를 부여할 때는 **반드시 제안 매핑 표(프레임명 → Screen ID)를 사용자에게 제시하고 검토·승인받은 뒤 진행**한다. 임의 확정 금지.
> **소급 금지**: 기존 위키의 기존 표기 Screen ID는 **그대로 유지**한다 — 프레임명 기반(럭키볼 캠페인 pageId=4479306980)뿐 아니라 dot 표기(`Wallet.home` 등, [Screen]Wallet Mode)도 소급 전환하지 않는다. 새 규칙은 신규 부여분부터.
> **🔄 정기 점검**: **매주 월요일 10:00** unifi.me를 직접 탐색(비로그인 + 로그인)해 메뉴·기능 변경을 확인하고 이 파일을 갱신한다(스케줄 등록됨). 로그인 영역은 브라우저에 로그인 세션이 있을 때만 실측 — 없으면 비로그인 범위만 점검하고 로그인 필요 항목을 리포트한다.
> **📄 점검 리포트**: 매 점검마다 `reports/ia/ia_check_report_YYYY-MM-DD.md`를 생성한다(**변경 없어도 생성** — 점검 범위·미완 항목이 다음 주 기준이 된다). 구성: 점검 범위(방문 라우트 전량)·실측 승격·신설/변경·승인 대기 어휘·변경 없음 확인·미완 이월·IA.md 갱신 위치.
>
> **⛔ 가이드 IA 구조도 동기화 규칙 (2026-07-30 신설 — 이 파일을 고치면 반드시 함께 수행)**
> 팀원은 드랍웹 가이드의 **「IA 점검 리포트」 탭 → 「전체 IA 구조」** 표로 IA를 확인한다. 그 표의 데이터는 가이드 `index.html` 안의 **`IA_DATA` 배열**이고, 이 파일(`md/IA.md`)이 정본이다. **두 곳이 어긋나면 팀원이 보는 IA가 틀린다.**
> - **트리거**: `md/IA.md`의 §2 화면 트리 또는 §0 제공/미제공 매트릭스가 바뀌면 — 주간 점검이든 수시 수정이든 **예외 없이** — 같은 작업에서 가이드 zip을 다음 버전으로 발행한다.
> - **갱신 대상은 `IA_DATA` 배열 한 곳**: 각 행 `[뎁스(1~3), 화면명, 라우트/부가표기, Web, LIFF, Wallet, mini]` · 제공도 `1`=제공 `2`=조건부·축소 `0`=미제공. 표·필터·접기 UI는 배열에서 자동 렌더되므로 **마크업은 손대지 않는다**.
> - **절차**: `md/landpress.md` §5-1 0단계로 최신 zip 판별 → `IA_DATA` 갱신 → 버전 표기 3곳(title·히어로 배지·푸터) +1 → 업데이트 이력 탭 행 추가 → 재압축 → **브라우저에서 렌더·필터·접기 동작 확인**(정적 스냅샷이 아닌 실제 스크립트 실행 환경) → 사용자에게 zip 전달. 게시는 사용자가 한다.
> - 상세는 **`md/ia-check.md` §2 「가이드 사이트 갱신 절차」**(절차 정본 — 2026-09-07 스케줄 태스크 파일에서 저장소로 이전).

---

## 분석 이력

| 날짜 | 범위 | 방법 | 비고 |
|---|---|---|---|
| 2026-07-27 | 비로그인 공개 화면 | unifi.me 직접 탐색 (모바일 뷰) | home·reward 공개 영역, login 게이트 확인 |
| 2026-07-27 | 로그인 상태 전체 4탭 | 사용자 로그인 Chrome으로 직접 탐색 | asset(내 자산)·my(마이) 실측 확정, 실제 라우트 채집 |
| 2026-07-27 | **제품 모드·분기 정책** | 위키 `[Master]` 3종( Unifi mini · Wallet Mode · Mission and Reward ) + 링크 스펙 페이지 분석 | **Unifi/Wallet Mode/Unifi mini 3모드, IP·로그인·approve 분기 축, 탭 노출 매트릭스 확정** |
| 2026-07-27 | **주간 정기 점검 #1** (비로그인 + 로그인, KR IP) | unifi.me 직접 탐색(인앱 375px) + 사용자 Chrome 로그인 세션 + 공지사항 목록 | **Apps 메인/마켓·알림 목록·게임 미션 상세·은행송금(Sentbe)·NFT 목록 실측 승격**, 입금 **브릿지** 신설 확인, `/auth/sign-in`·`/payout`·푸터 라우트 채집, JPYC 이자·KAIA 부스트 티어 실측 |
| 2026-07-30 | **주간 정기 점검 #2** — 프로덕션 + **Beta** + **Unifi mini Beta** | 인앱 브라우저(프로덕션 비로그인) + 사용자 Chrome(Beta 로그인 세션) | **`/reward/kaia` KAIA 스테이킹(위임)·Special Contribution Rewards 출시 실측**(#1 이월 항목 해소), `/boost/kaia`→`/reward/usdt` 이전, **Beta 5탭·K-Pick 탭(`/benefits`)·액션 라벨 개편(보내기·채우기·은행출금) 실측**, **Unifi mini 실측 최초 성공**(`/benefits-mini` 계열) |
| 2026-08-03 | **주간 정기 점검 #3** — 프로덕션 + Beta + Unifi mini Beta | 인앱 브라우저(프로덕션 비로그인) + 사용자 Chrome(Beta 로그인 세션) | **미션앤리워드 Season 3 개시(8/1~9/1) 정책 수치 전면 변경**, **`/apps` 게임 프로모션 캐러셀 신설·27→30 Apps**, **MY쇼핑 = 외부 GuideKim 이탈 확정**(#2 이월 해소), **Beta 「외부 지갑 연결」 신설**, **mini Reward에 JPYC 이자 배너·Special Missions·게임 미션 신설**, `draw-promotion` **LINE 앱 전용 게이트** |
| 2026-08-10 | **주간 정기 점검 #4** — 프로덕션 + Beta + Unifi mini Beta | 인앱 브라우저(프로덕션 비로그인) + 사용자 Chrome(**Beta 로그인 세션 만료 — 비로그인**) | **USDT PLUS 이율 5%→7%(8/6 발효)로 홈 히어로 「최대 연 10%」 교체**, **Unifi Pay Direct(B2B 결제) 출시 공지**, **프로덕션 게임 미션 섹션 복귀**(#3 이월 해소), **mini Reward에 「매일 출석 체크」 신설**, **mini 럭키볼 친구 초대에 비실시간 지급(2주 이내·지급될/지급 완료 리워드) 반영**, 리워드 스켈레톤 이슈가 **Beta 비로그인에서도 재현**(Beta 환경 이슈로 범위 축소) |
| 2026-08-10 | **#4 로그인 보강 점검** — 프로덕션·Beta·mini **로그인 상태** | 사용자 Chrome(프로덕션·Beta 양쪽 로그인 세션 제공받음) | **액션 라벨 개편(보내기·채우기·은행출금)·「외부 지갑 연결」이 프로덕션에 반영 확정**, 🆕 **`/interest/usdt` 누적 이자 화면 실측**, **스켈레톤 재현 조건 정정**(프로덕션 전건 정상 / Beta 웹 비로그인 / **mini Reward는 로그인에서도 고착**), 🆕 Beta **비상장 토큰 4종**·디버그 패널(**국가 모킹·결제 가맹점 진입**) 발견, 알림·거래내역 **한국어 필터 라벨** 확정 |
| 2026-09-07 | **주간 정기 점검 #6** — 프로덕션(비로그인 + **로그인**) + Beta(**로그인**) + Unifi mini Beta(**로그인**) | 인앱 브라우저(프로덕션 비로그인) + 사용자 Chrome(프로덕션·Beta 양쪽 로그인 세션 제공) | 🔴 **마이 설정에 「Preferred Stable」 신설**(기준 스테이블코인을 사용자가 선택 — 화면 변형 축이 하나 늘었다), 🔴 **로그인 홈 전면 개편**(토큰별 3카드 + 프로모션 모달 + 헤더 **[pay]·[QR]·[알림]** 3아이콘 — #5 이월 「홈 상단 Pay 버튼」 해소), 🔴 **K-Pick 2단 구조 재편**(허브 + 카테고리 목록), 🔴 **K-美容에 「クリニック」 섹션 신설**(클리닉 19곳·필터 4종), 🆕 **`/pay/qr/mpm` 스캔 화면 실측**(카메라 권한 다이얼로그), 🆕 **상품 상세에 체크아웃 라우트·특정상거래법 표기·새 MINI app ID**, ❌ **입금 브릿지 배너 소멸**(이월 종결), ✅ **AlphaSec 한국어 노출 해소**, 🔴 **mini Reward 스켈레톤 재발** |
| 2026-09-03 | **주간 정기 점검 #5** — 프로덕션 + Beta + Unifi mini Beta (직전 회차로부터 **24일** — 8/17·8/24·8/31 미실행분 합산) | 인앱 브라우저(프로덕션·Beta·mini 비로그인) · Chrome 로그인 세션 **만료** | 🔴 **Unifi Pay 오프라인 QR 결제 사용자 화면 출시**(`/pay/qr/mpm/guide`·`/pay/qr/mpm` — #4 추적 항목 해소), 🔴 **K-Pick 상품 상세가 Unifi 내부 화면으로 편입 시작**(`/k-pick/shopping/{id}` — #3 「외부 이탈 확정」 부분 번복), 🔴 **mini 홈 전면 개편**(K-Pick형 커머스 화면으로 교체), **Season 4 개시**(9/1~10/1 · 수치 동일), **K-Pick 카테고리 라우트 3종 신설**, ✅ **스켈레톤 이슈 전 조합 해소**, ⚠️ **KR IP 정책은 프로덕션에서 유효**(판정 정정) |

> ⚠️ 표시 = 아직 직접 진입 못 한 추정 영역(팝업·조건부 화면 등). 확인되는 대로 이 파일을 갱신한다.

---

## 0. 제품 모드 — Unifi는 하나가 아니다 (위키 스펙 실측)

같은 unifi.me 서비스가 **접근 경로·approve(어그리게이터 약관)·접속 IP**에 따라 3개 모드로 분기된다. **Screen ID를 부여하기 전에 어느 모드의 화면인지 먼저 확정**한다.

| 구분 | **Unifi (풀 모드)** | **Wallet Mode** | **Unifi mini (LINE MINI app)** |
|---|---|---|---|
| 진입 | Web/LIFF 주소 | Web/LIFF 주소 | **MINI app 주소** (miniapp.line.xxx) |
| 조건 | approve 완료 + IP가 US/CA/UK/SG **아님** | approve **미완료** 또는 **IP = 미국·캐나다·영국·싱가포르** | LINE MINI 채널 (LINE 인증, 채널 동의 간소화) |
| 기준 자산 | USDT (예치풀) | USDT (EOA 지갑) | **JPYC** 리워드 (소수점 2자리) |
| GNB | **Home·Apps·Assets·My 4탭** | Home·Assets·My 3탭 | ~~Home·Assets·My 3탭~~ → **Beta 실측 5탭**(Home·K-Pick·Reward·Assets·My · 2026-07-30·08-03 연속 확인) |
| 어그리게이터 약관/approve | 필수 (가입 시) | 미제공 (체크 안 함) | 미제공 (체크 안 함) |
| 예치·이자 | 제공 — **BASIC 연 3% / PLUS 연 7%**(2026-08-06 발효, 구 5%) + Boost 최대 3% = **최대 연 10%** | **이율 정보 전부 제거** (자산·자산상세) | ⚠️ 위키 스펙은 "미제공(예치금·이자 노출 불가)" — 그러나 **Beta mini Reward 상단에 JPYC 이자 배너가 4주 연속 실측**(2026-08-03·08-10·09-03). 🆕 **수치가 「최대 연 5%」 → 「最大年2%」로 하향**(2026-09-03). 🔴 **2026-09-07 mini 자산 탭(`/my`)의 JPYC 카드에도 「最大年2%の利息を受け取る」가 노출**돼 충돌이 리워드 탭 밖으로 확대됐다 → 확인 필요(§4) |
| 교환(Swap) | **JP 미제공**, 그 외 제공 | 제공 | 미제공 — ✅ **2026-09-07 첫 실측 근거**: Beta mini `/my` 액션이 **取引履歴·出金·入金·銀行出金**으로 **Swap 미노출**(풀 모드는 4종). 위키 스펙과 일치 |
| 은행송금 | 제공 | 제공 | 검토 중 (Sentbe 연동 방식) |
| 거래내역/알림 | 제공 | 이자 내역 제외 | 이자 내역 제외 |
| SkyFlag | 미제공 | 미제공 | **제공** |
| OA 친구추가 유도 | LIFF 접근 시 유도 | LIFF 접근 시 유도 | 없음 (통합 OA 검토) |
| 결제 | 지갑 연결 + 🆕 **오프라인 QR 결제(Unifi Pay)** — 2026-09-03 실측 · 사전 충전 잔액에서 차감 · 🆕 **2026-09-07 스캔 화면(`/pay/qr/mpm`)·로그인 홈 헤더 [pay] 버튼 실측**(§2-9) | 지갑 연결 | **LINE IAP** (지갑 연결 없음) + **JPYC 결제**(2026-07-10 공지 도입) |
| JPYC 이자 | **제공 (최대 연 5%)** — 2026-06-29 출시 | 미제공(이율 제거) | 미제공 |

### 0-0. 점검 환경 — 프로덕션 / Beta / mini Beta (2026-07-30 신설)

**Beta에는 앞으로 릴리즈할 내용이 먼저 반영된다.** 화면 정책·XLT 작업은 Beta가 곧 프로덕션이 되므로 **Beta 실측을 정본으로 삼되, 프로덕션과 다른 부분은 "릴리즈 예정"으로 구분 표기**한다.

| 환경 | 주소 | 비고 |
|---|---|---|
| 프로덕션 | `https://www.unifi.me/` | 현재 라이브 |
| **Beta** | `https://unifi-web.line-apps-beta.com/` | **릴리즈 예정 반영** — 2026-07-30 실측 기준 GNB **5탭**(K-Pick 승격), 액션 라벨 개편 |
| **Unifi mini Beta** | `https://unifi-web.line-apps-beta.com/?liff_id=2008994547-GfGUdDxy&liff.source=lp_link` | 진입 시 **`/benefits-mini`로 리다이렉트**. mini 실측 창구(그전까지 MINI app 진입 불가로 위키 스펙에만 의존) |

Beta 부속 도메인(실측): 프로모션 `unifi-promotion.line-apps-beta.com` · 개발자 `minidapp-developers.line-apps-beta.com` · 보안 감사 `unifi-contract-audit.line-apps-beta.com` · 마이크로 프로모션 `unifi-micro-promotion.website.line-apps-dev.com`

> ⚠️ **점검 팁 — mini 모드 세션 고착 (2026-08-10 실측)**: Beta에 `?liff_id=…`로 한 번 진입하면 이후 같은 탭에서 **루트 `/`로 가도 계속 `/benefits-mini`로 리다이렉트**된다(쿼리를 바꿔도 동일). **Beta 웹(풀 모드) 화면은 mini 진입 *전에* 먼저 점검**하고, 이미 고착됐으면 새 탭/시크릿 창을 쓴다.

> 🆕 **Unifi Pay Direct (2026-08-05 공지 · B2B 결제 연동)**: 파트너가 **콘솔에 정산 지갑을 등록**하고 연동을 마치면 결제를 수령하는 가맹점 결제 프로덕트. **프로토콜 수수료 1%**. 런칭 이벤트 2026-08-04~08-16(결제액 랭킹 1,000/500/300 USDT + 랜덤 5팀 50 USDT · 누적 2만 USDT↑ 시 최대 1,000 USDT 수수료 페이백 · 일본 등 일부 국가 참여 제한). **콘솔은 파트너용이라 unifi.me 사용자 IA 밖**이었으나 — 🆕 **2026-09-03 사용자측 결제 화면이 실제로 출시돼 IA에 편입됐다**(§2-9 `/pay/*`). 추적 항목은 해소되고, 남은 것은 **주기능 어휘 확정**이다(§4 승인 대기 ⑦).

### 0-0-1. 🧭 화면 변형 3축 — 환경 × 사용자 상태 × 접속 IP (2026-08-03 신설 · Screen ID 부여 시 필수 판단)

**한 라우트가 하나의 화면이 아니다.** 아래 **3개 변수의 조합**이 화면 구성·문구·노출 여부를 바꾼다. Screen ID를 부여하기 전 **세 축의 값을 먼저 확정**하고, 그 조합이 "같은 화면의 상태 차이"인지 "별도 화면"인지 판단한다.

| 축 | 값 | 화면에 미치는 영향 | 판별 방법 |
|---|---|---|---|
| **① 환경** | **Web** / **LIFF**(LINE 인앱) / **Wallet Mode** / **mini**(MINI app·`/benefits-mini`) | GNB 탭 수, 기준 자산(USDT vs JPYC), 이자·교환·Reward 탭 제공 여부, OA 친구추가 유도 | 진입 주소(`liff_id` 쿼리 유무·`/benefits-mini` 리다이렉트)·approve 완료 여부 |
| 🆕 **①-b 기준 스테이블 설정** (2026-09-07 신설) | **JPYC / USDT / IDRP** — 마이 › Display › **Preferred Stable** | 홈 자산 카드의 **순서·기본 탭**, 홈 히어로 이율 수치(USDT 기준 10% vs JPYC 기준 2%), 가이드 카드 구성(「Learn about JPYC」 노출) | 마이(`/setting`) › Display › Preferred Stable 값. ⚠️ **환경(mini/Beta)이 아니라 사용자 설정이 기준 자산을 바꾼다** — 그전까지 「Beta는 JPYC 기준」으로 환경 탓으로 적어 온 기재를 이 축으로 재해석해야 한다 |
| **② 사용자 상태** | **비로그인** / **로그인** | 라우트 접근 자체(리다이렉트), 자산 요약 노출, 진행도·수령 상태, CTA 문구("출석 체크" vs "매일 출석 체크") | `/my` 진입 시 `/auth/sign-in?returnUrl=…` 리다이렉트 여부 |
| **③ 접속 IP** | **KR** / **JP** / **US·CA·UK·SG** / 그 외 | Wallet Mode 강제(US·CA·UK·SG), K-Pick 노출·버튼 차단(KR), 교환 미제공(JP) | 화면의 "해당 국가에서 서비스 불가" 안내·버튼 비노출로 역판별 |

**축 사이의 우선순위 (실측·스펙 종합)**

1. **③ IP가 US/CA/UK/SG면 → 무조건 Wallet Mode**(① 환경을 덮어씀). 이 경우 Reward 탭 자체가 없어 ②의 로그인 분기도 무의미해진다.
2. **① 환경이 mini면 → 기준 자산이 JPYC**, 어그리게이터 약관·approve가 사라진다. 단 **Beta mini의 Assets·My 탭은 풀 모드 화면을 그대로 공유**한다(§2-7 하단).
3. **② 로그인**은 ①·③이 정해진 다음의 상태 분기다 — 대부분 "같은 화면의 빈 상태 vs 채워진 상태"지만, **홈(`/`)은 섹션 구성 자체가 달라** 별도 변형으로 볼 여지가 있다.

> **⛔ 미검증 조합 주의**: 아래 매트릭스는 **① Web/mini · ② 양쪽 · ③ KR IP** 조합만 실측이다. **JP IP·해외 IP(Wallet Mode)·LIFF 환경은 미실측**이라 위키 스펙 근거로만 기재돼 있다(§4).

#### 축 ② — 로그인 / 비로그인 접근 매트릭스 (환경 = Web·mini / IP = KR 기준 실측)

범례 — 🟢 비로그인 열람 가능 / 🟡 비로그인 열람 가능하나 **구성·문구가 다름**(로그인 변형 별도 존재) / 🔴 로그인 필수(미로그인 시 `/auth/sign-in?returnUrl=…` 리다이렉트) / ⬜ 미점검

| 라우트 | 화면 | 비로그인 | 로그인 상태와의 차이 (실측) |
|---|---|---|---|
| `/` | 홈 | 🟡 | 비로그인: 헤더 "Log In · Sign Up" + QR 결제 히어로 배너 + "Get Started with Unifi" CTA, 자산 요약 카드 **없음** / 🔴 **로그인(2026-09-07 재실측): 완전히 다른 화면이다** — 헤더가 **[pay]·[QR(입금)]·[알림]** 3아이콘, 본문 최상단이 **토큰별 3카드(JPYC·USDT·IDRP) + 각 [Deposit] + 유도 문구**, 진입 시 **프로모션 모달** 노출. **비로그인 전용인 QR 결제 히어로·「Earn up to 10% interest!」 히어로·「Get more interest」 섹션은 로그인 홈에 없다** → 별도 변형으로 볼 근거가 강해졌다(§4 승인 대기 ⑤) |
| `/benefits/daily-mission` | 리워드 | 🟡 | 비로그인: 리워드 0 USDT·럭키볼 0개 고정, 출석 체크 진행도 없음 / 로그인: 실제 진행도·수령 상태. ⚠️ **로그인 시 스켈레톤 고착 3주 연속**(§4) |
| `/benefits` (Beta) | K-Pick | 🟡 | 비로그인: 내 예약 레드닷·툴팁 없음 / 로그인: "예약이 진행 중이에요" 툴팁 + 예약 건수 |
| `/benefits` (**프로덕션**) | K-Pick 축소판 | 🟡 | 🆕 **KR IP에서는 배너 3종만**(15% 캐시백·Daily Missions for JPYC·Get more JPYC with friends). 카테고리·바우처·시술·K-컬처 **전부 미노출** — Beta와 결정적으로 다르다(2026-09-03) |
| `/benefits/k-pick/{beauty\|shopping\|pop}` (Beta·**프로덕션**) · `/benefits-mini/k-pick/…` | K-Pick 카테고리 목록 | 🟢 | 🆕 2026-09-03 신설. 🔴 **2026-09-07 프로덕션에도 라우트 개방**됐으나 **KR IP에서는 카탈로그 0건**(탭 3종만) — Beta는 정상 렌더 → KR IP 게이팅이 카테고리 목록에도 적용된다. 「내 예약」은 여전히 `href="#"` — 라우트 없음 |
| `/k-pick/{카테고리}/{상품ID}` (**프로덕션**) | 🆕 K-Pick 상품 상세 | 🟢 | 🆕 Unifi 내부 커머스 화면(정가·특가·캐시백·판매자 GuideKim·유효기간·환불·리뷰). 🆕 **2026-09-07 하단 고정 CTA [Save purchase link]·[Buy now]** + **특정상거래법 표기 섹션** 실측. **카테고리 목록 `/k-pick/shopping`는 홈으로 리다이렉트**(변동 없음) |
| `/k-pick/{카테고리}/{상품ID}/checkout` | 🆕 K-Pick 체크아웃 | ⬜ | 🆕 2026-09-07 라우트 확인 — [Buy now]가 **LINE MINI app intent**로 유도(`miniapp.line.me/2008994549-CGfrtgSs/...`). **구매 플로우라 미진입** |
| `/pay/qr/mpm/guide` | 🆕 오프라인 QR 결제 가이드 | 🟢 | 🆕 홈 최상단 히어로 배너로 진입. 프로덕션·Beta 공통 |
| `/pay/qr/mpm` | 🆕 QR 스캔·결제 | 🔴 | ✅ **2026-09-07 실측**: "Scan QR for offline payment" + **카메라 권한 다이얼로그**([Grant Access]·[Cancel]). **권한 미허용·결제 미실행** |
| `/plus/usdt` | 플러스 모드 상세 | 🔴 | 🆕 홈 「Earn up to 7% interest」 배너 진입점 (2026-09-03 라우트 확정) |
| `/reward/kaia` · `/reward/usdt` | 스테이킹·부스트 | 🟢 | 정책·티어 전문은 동일 노출. 로그인 시 Accrued Reward·Delegatable KAIA·티어 충족 여부에 실제 값 |
| `/apps` · `/apps/market` | Apps 메인·마켓 | 🟢 | 비로그인 배너 **"로그인하고 $1.2 리워드 받기"** 노출 |
| `/announcement`, `/announcement/{uuid}` | 공지 목록·상세 | 🟢 | 동일 |
| `/faq`, `/doc/*`, `/guide`, `/term/*` | FAQ·가이드·약관 | 🟢 | 동일 |
| `/auth/sign-in` | 로그인 게이트 | 🟢 | 로그인 상태에서는 도달하지 않음. 재방문 시 **"최근 로그인 했어요"** 배지가 직전 수단에 표시 |
| `/my` | 내 자산 | 🔴 | — |
| `/setting` | 마이 | 🔴 | 🆕 **2026-09-07 「Preferred Stable」 설정 신설**(Display 섹션) — 기준 스테이블코인을 사용자가 고른다(§2-5) |
| `/notification` | 알림 목록 | 🔴 | — |
| `/my/token/transaction` · `/my/token/{주소}` | 거래내역·토큰 상세 | 🔴 | — |
| `/transfer` · `/deposit` | 송금·입금 | 🔴 | — |
| `/apps/trade/swap` | 교환 | 🔴 | — |
| `/apps/my-page/nfts` | 나의 NFTs | 🔴 | — |
| `/payout` | 은행송금 복귀 | ⬜ | 미점검 |
| `/benefits-mini` 계열 | mini 홈·리워드 | 🟡 | mini는 LINE 인증 기반. `luckyball-invite`는 **비로그인 시 CTA가 [로그인]** 으로 표시되고 미션 진행도가 0 고정 |
| `/benefits-mini/draw-promotion` | mini 럭키볼 뽑기 | 🔴 | 로그인과 무관하게 **LINE 앱 전용 게이트**(웹 접근 시 다이얼로그 차단) |

> **Screen ID 관점 권고**: 비로그인 변형이 "같은 화면의 빈 상태"면 별도 ID를 만들지 않는다(🟢·일부 🟡). 반면 **홈(`/`)처럼 섹션 구성 자체가 다른 경우**는 `home_main_01` / `home_main_guest_01` 같은 변형 어휘가 필요할 수 있다 — **어휘 확정 전까지 부여하지 않는다**(§4 승인 대기 ⑤).

#### 축 ①·③ — 환경 × IP 조합별 실측 커버리지

| 조합 | 상태 | 근거 |
|---|---|---|
| **Web × KR IP × 비로그인** | ✅ 실측 (프로덕션 2026-07-27·07-30·08-03·08-10) | 인앱 브라우저 |
| **Web × KR IP × 로그인** | ✅ **실측 완료 (2026-08-10 프로덕션 로그인 전체 순회)** — `/my`·`/setting`·`/notification`·`/my/token/transaction`·`/interest/usdt`·`/transfer`·`/deposit`·`/apps/trade/swap`·`/apps/my-page/nfts` | Chrome (프로덕션+Beta 양쪽 세션) |
| **mini × KR IP × 로그인** | ✅ 실측 (Beta mini 2026-07-30·08-03·08-10·**09-07**) | Chrome (Beta mini) |
| **mini × KR IP × 비로그인** | ✅ 실측 (2026-08-10) — 홈에 JPYC 잔액 배너·내 예약 타일 미노출, `luckyball-invite` CTA가 [로그인 하기] | Chrome |
| **LIFF × 모든 IP** | ⬜ 미점검 — LINE 인앱 브라우저 진입 필요 | 위키 스펙만 |
| **Wallet Mode (US·CA·UK·SG IP)** | ⬜ 미점검 — 해외 IP 필요 | 위키 스펙만 |
| **Web·mini × JP IP** | ⬜ 미점검 — K-Pick JP Only·교환 미제공 검증 불가 | 위키 스펙만 |
| **approve 미완료 계정 (IP 무관 Wallet Mode)** | ⬜ 미점검 — 신규 계정 필요 | 위키 스펙만 |

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
- 🆕 **2026-09-07 신설·확정 라우트**: K-Pick **체크아웃 `/k-pick/{카테고리}/{상품ID}/checkout`**(구매 CTA [Buy now] — **LINE MINI app 전용 진입**) · 프로덕션 **`/benefits/k-pick/{beauty|shopping|pop}` 개방**(KR IP에서 카탈로그 0건).
- 🆕 **커머스용 MINI app ID가 별개다 (2026-09-07 실측)**: 상품 상세·카테고리 목록의 CTA가 **`2008994549-CGfrtgSs`** 로 유도된다(`miniapp.line.me/2008994549-CGfrtgSs/...`). §0-0의 mini 점검 창구 `2008994547-GfGUdDxy`와 **다른 앱**이므로 혼용하지 않는다.
- ❌ **입금 「브릿지」 배너 소멸 (2026-09-07 로그인 실측)**: `/deposit`에서 멀티 네트워크 브릿지 진입점이 제거되고 안내가 **"All KAIA network tokens use the same wallet address."** 단일 네트워크(KAIA) 표기로 정리됐다. `asset_deposit_network_01`은 **부여 대상 아님**으로 처리(§2-3).
- 🆕 **2026-09-03 신설 라우트군**: 결제 `/pay/qr/mpm/guide`·`/pay/qr/mpm` · 플러스 모드 `/plus/usdt` · K-Pick 카테고리 `/benefits/k-pick/{beauty|shopping|pop}`·`/benefits-mini/k-pick/{…}` · **K-Pick 상품 상세 `/k-pick/{카테고리}/{상품ID}`(프로덕션 내부 화면)**.
- ⚠️ **K-Pick 상품은 내부·외부가 혼재한다**: 브릿지 `redirectUrl`이 상품에 따라 `www.unifi.me/k-pick/...`(내부 화면) 또는 `guidekim.me/bizcon/...`(외부 이탈)로 갈린다 — **Screen ID 부여 전 목적지를 개별 확인**한다.

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
| 결제(Unifi Pay) | `pay_` ⚠️잠정 | Unifi (프로덕션·Beta) | 🆕 `/pay/qr/mpm/...` 실측 (2026-09-03) — **어휘 미확정, 부여 금지**(§4 승인 대기 ⑦) |
| 프로모션/캠페인 | `promo_` ⚠️잠정 | 캠페인별 | 럭키볼 초대자/피초대자·황금럭키볼 등 |
| Wallet Mode 전용 변형 | 부기능/세부기능에 `wallet` 어휘 | Wallet Mode | 기존 위키 표기 `Wallet.home` 등 — 신규 부여 시 예: `home_main_wallet_01` (사용자 확인) |

## 2. 기능 트리 (부기능·세부기능)

> §2의 실측 트리는 **Unifi 풀 모드 · KR IP · 로그인 상태** 기준이다. Wallet Mode·mini는 §0 표의 제외 항목(이자·교환·Reward 탭 등)을 반영해 화면이 줄거나 문구가 달라진다(§2-6, §2-7).

### 2-1. home — 홈 (실측 · 라우트 `/`)

```
home_pay_qr_01                    🆕 **오프라인 QR 결제 히어로 배너 (2026-09-03 신설 · 홈 최상단)** — "USDT Payments, All in One QR! / Offline Payment Guide" → `/pay/qr/mpm/guide`(§2-9)
home_main_01                      홈 메인 — 자산 요약 카드(USDT/JPYC/IDRP 탭·입금하기·플러스 모드 배너·누적 이자)
                                  └ 🔴 **로그인 홈 전면 개편 (2026-09-07 프로덕션 로그인 실측)** — 비로그인 홈과 구성이 통째로 다르다
                                     · **헤더 아이콘 3종**: **[pay]**(→ `/pay/qr/mpm` QR 결제 · **로그인 전용** — #5 이월 항목 해소) · **[QR]**(→ `/deposit` 입금) · **[알림]**(레드닷)
                                     · **토큰별 3카드**: 「JPYC Balance」·「USDT Balance(3% Annually · **Total Interest** N USDT)」·「IDRP Balance」 —
                                       카드마다 **[Deposit]** 버튼 + 유도 문구(JPYC "Deposit JPYC now and Manage easily with Unifi" ·
                                       USDT "Earn Annual 7% in Plus Mode" · 🆕 IDRP "**Buy IDRP and swap for USDT to earn up to 10% annual interest, paid daily**")
                                     · **카드 순서·기본 탭은 「Preferred Stable」 설정을 따른다**(§0-0-1 축 ①-b · 실측 계정은 JPYC 우선)
                                     · ❌ 비로그인 전용 요소(QR 결제 히어로·「Earn up to 10% interest!」 히어로·「Get more interest」 섹션)는 **로그인 홈에 없다**
home_promo_plus_01_01             🆕 **플러스 모드 프로모션 모달 (2026-09-07 신설 · 로그인 홈 진입 시)**
                                  └ "Hold USDT in Plus Mode and **Earn 7% annual interest** / Don't miss out!" · CTA **[Start Earning 7%]** · **[Don't show for 7 days]** · [X]
home_benefit_mission_01           🆕 **「Receive USDT rewards daily / Complete daily missions from check-ins to games」 카드 (2026-09-07 신설 · 프로덕션·Beta 공통)**
                                  └ 「Check USDT Benefits」 섹션 소속 · 리워드 탭 유도
※ 🆕 **홈이 「Check {자산} Benefits」 섹션 그룹 구조로 정리됐다 (2026-09-07)** — 비로그인은 **USDT → KAIA**, 로그인은 **KAIA → USDT**(Beta는 USDT → KAIA → JPYC).
   섹션 순서가 로그인 여부·Preferred Stable에 따라 갈리므로 **순서를 화면 식별 근거로 쓰지 않는다**.
                                  └ 🆕 **히어로 이율 표기 교체 (2026-08-10 프로덕션 실측)**: "Earn up to 10% interest! / Up to 10% annual rate"
                                     (= PLUS 7% + Boost 3%) · 하위 셀링 포인트 "Withdraw anytime, no fees"·"Low minimum deposit"·"Easy bank transfer"
                                     ※ Beta(JPYC 기준 환경)는 "최대 2% 이자 받아요!"로 다르게 표기 — 기준 자산에 따라 히어로 수치가 갈린다
home_benefit_rate_01              역대급 이율 혜택 (Best Rate Benefits)
home_benefit_plus_01              🆕 플러스 모드 배너 (2026-09-03 프로덕션 반영 — "Earn up to 7% interest / Get a 2% higher rate than before" → `/plus/usdt`)
home_benefit_swap_01              🆕 "Get more interest — Deposit other tokens and Swap to USDT" (2026-09-03 신설)
home_benefit_referral_01          ❌ **소멸 (2026-09-03)** — ~~특별 레퍼럴 랭킹 혜택~~. 3rd Special USDT Referral Campaign 종료(8/21 보상 지급 완료 공지)로 프로덕션 홈에서 제거
                                  ※ Beta에는 대체 배너 **「友だちと一緒にJPYCをもっとゲット — 預けてリワードUP！ランキング報酬も」**(→ `promotion.unifi.me/referral-campaign-jpyc-2`)가 있다
home_benefit_together_01          🆕 함께하면 더 큰 혜택, KAIA & USDT (Better Together — 최대 4.2% 보상 + 특별 혜택 · /reward/kaia 진입 배너 · 2026-07-30 신설)
                                  ※ Beta 전용 홈 배너(2026-09-03 실측 갱신): 🆕 **「友だちにJPYCをプレゼントする / ラッキーボール1個で最大50,000JPYC」**(→ mini `luckyball-invite`) ·
                                    🆕 **「友だちと一緒にJPYCをもっとゲット / 預けてリワードUP！ランキング報酬も」**(→ `promotion.unifi.me/referral-campaign-jpyc-2`) ·
                                    「연 7% 더 높아진 이자 혜택 받기」(→ `/plus/usdt`) · 결제 시 최대 15% 캐시백(→ `/benefits`) · 부스트로 최대 3% 추가 이자 ·
                                    「史上最高の金利特典」(→ `promotion.unifi.me/unifi-interest-renewal` — 구 announcement 링크에서 교체) ·
                                    ❌ 8/10의 **「100% 당첨 JPYC 롤링 배너」는 소멸**. Beta 히어로는 JPYC 기준이라 **「最大2%の利息！」**
                                    ⚠️ 「함께하면 더 큰 혜택, KAIA & USDT」 부제가 Beta 비로그인에서 **"최대 0% 보상에 특별 혜택까지!"** 로 노출(프로덕션은 4.2%) — 수치 바인딩 오류 의심(§4)
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
home_notification_01              알림 목록 (/notification — 상단 벨 · 필터 6종 **한국어 실측 라벨(2026-08-10): 전체·안읽음·공지사항·계정/보안·예치·입출금** / 영문 UI는 All·Unread·Notices·Account/Security·Deposit·Transfer) ※ 리워드 탭 헤더에도 동일 진입점
                                  └ 🆕 **알림 유형 어휘 실측 (2026-09-07)**: **Login Notification**("You are logged in.") · **New IP login notification**("You logged in from a new IP.") · 공지(전문 게재)
                                  └ 동일 유형 알림은 **"View N more"로 묶여 접힘** · 하단 안내 **"최근 30일 알림까지 열람 가능"**(보관 정책) · 알림 본문에 캠페인 전문이 그대로 실림(예: JPYC 황금럭키볼 시즌2 ja 전문)
home_term_01                      약관 (/term/TERMS_OF_SERVICE/{UNIFI|WALLET|AGGREGATOR})
home_privacy_01                   개인정보 처리방침 (/term/PRIVACY_POLICY/{UNIFI|WALLET}) · 마케팅 (/term/MARKETING_POLICY/UNIFI)
```

푸터 공통(전 탭): 약관 3종·개인정보 2종·마케팅 동의 · For Developers(developers.unifi.me) · 공지사항 · FAQ · **보안 감사 보고서**(contract-audit.unifi.me) · 고객센터(빠른 답변 받기·문의하기 contact.unifi.me) · SNS(X·Medium).

### 2-2. reward — 리워드 (실측 · 라우트 `/benefits/daily-mission` · Wallet Mode 미제공)

```
reward_main_01                    Rewards 메인 (리워드 USDT·럭키볼 개수 요약)
                                  └ 한국어 실측 문구(2026-08-03): "리워드 0 USDT" / "럭키볼 0개" / **"일일 미션"**(Daily Mission) + 카운트다운 "HH:MM:SS 남음" /
                                    "일일 미션하고 럭키볼로 최대 500 USDT 뽑기" / "Apps 둘러보기"
reward_checkin_01                 출석 체크 (1~5일 연속 — 3·5일 럭키볼, **"출석하기"** 버튼)
                                  └ 실측 문구: "100 USDT 이상 예치하고 3일, 5일 연속 출석체크하면 럭키볼 받아요"
                                  └ ⚠️ **CTA 라벨은 상태에 따라 바뀐다 (2026-08-10 로그인 실측)** — 미출석 상태 **"출석하기"**(프로덕션) / 수령 대기 상태 **"럭키볼 받기"**(Beta).
                                     같은 버튼의 상태 변형이므로 XLT 키도 상태별로 분리돼 있는지 확인 필요
reward_checkin_01_01              ⚠️ 출석 완료/럭키볼 획득 팝업
reward_mission_game_01            게임 미션 (미니게임 6종 중 **3종** 완료 → [럭키볼 받기])
                                  └ 🆕 **예치 조건 문구가 게임 미션에도 붙어 있다 (2026-09-07 실측)**: "**Deposit 100 USDT or more** and complete 3 game missions to get a lucky ball."
                                     (출석 체크와 동일 조건 — Season 4 공지의 「일일 스냅샷 100 USDT」와 일치) ※ **Season 3부터 데일리 리셋**(00:00 UTC+0) — 구 "1회성 미션(시간 제한 없이 수령)" 정책 폐기
                                  └ ✅ **2026-08-10 프로덕션 비로그인에서 정상 노출 복귀**(8/3 미노출은 Season 3 전환 중 일시 현상으로 정리 — #3 이월 해소)
                                     실측 구성: 진행도 "1 game / 2 games(Lucky Ball 1) / 3 games" + 게임 6종 카드에 **"Before proceeding with mission 0/N"**(게임별 N=5~7)
reward_mission_game_detail_01     개별 게임 미션 상세 (/benefits/games/{uuid} — 게임 6종: Squishy Cat Jump·MERGE CAT·Tap Tap Jello·Hook & Gold·Rich Match·SODA MERGE 2048)
                                  ※ `/benefits/games`(uuid 없는 목록 라우트)는 404 — 진입점은 리워드 탭의 게임 미션 섹션뿐
                                  └ 구성(실측): 참여자 수·일일 미션 카운트다운 / 보상 수령(예: 30분 자유 이용권) / 세부 미션 진행도 3종 / 게임 소개·미리보기 / 공식 계정(Discord·Medium·X·Instagram) / FAQ / 플레이 버튼
reward_luckyball_draw_01          ⚠️ 럭키볼 뽑기 (최대 500 USDT / mini는 JPYC)
reward_luckyball_result_01_01     ⚠️ 뽑기 결과 팝업
reward_history_01                 리워드 내역 ("리워드 0 USDT >" 진입점 · mini는 SkyFlag 리워드 미표시 안내)
reward_mission_market_01          🆕 **NEXT Bay 게임 마켓플레이스 미션 (2026-09-03 Beta 실측 · 프로덕션 미노출)**
                                  └ 리워드 탭 상단 배너 「ゲームマーケットプレイス NEXT Bay特別ミッション完了で 最大100 USDTを獲得しましょう」 → `/benefits/games/{uuid}`
                                  └ ⚠️ **미션이 게임 플레이가 아니라 「구매」다**: ⓐ 10 USDT 이상 구매 2회 ⓑ 100 USDT 이상 1회 구매 ⓒ ⓐ·ⓑ 중 하나 클리어(자동 응모)
                                  └ 라우트는 기존 게임 미션 상세와 동일 계열이나 **성격이 커머스 미션**이라 어휘 분리 필요 여부 확인(§4)
reward_apps_01                    Apps 둘러보기 (mini 미제공 — §0-2)
```

### 2-2-1. reward — 부스트·스테이킹 보상 (🆕 실측 2026-07-30 · 라우트 `/reward/...` · 상단 탭 2종)

> **#1 이월 항목 해소** — 2026-07-20 공지로 예고됐던 **Kaia CR(Contribution Reward) 미션**이 실제 화면으로 출시됐다. 구 `/boost/kaia`는 `/reward/usdt`로 리다이렉트되고, 그 위에 **KAIA Reward / USDT Reward 2개 탭**이 얹혔다. ⚠️ 주기능 어휘 미확정 — §4 승인 대기.

```
reward_boost_usdt_01 ⚠️잠정        USDT Reward 탭 (/reward/usdt — 구 /boost/kaia)
                                  └ USDT 특별 이자 "최대 3% 추가 Boost" · 티어 300,000/400,000/500,000 KAIA = 1/2/3%
                                  └ **부스트 조건에 위임(delegate) KAIA 합산** — Unifi 지갑 보유 + Kaia Square의 Unifi 노드 위임 수량을 동등 반영 (2026-07-30 신설 문구)
                                  └ 플러스 모드 USDT에 적용 · 일 00:00 UTC+0 기준 · 최대 100,000 USDT까지
                                  └ 🆕 **운영 기간이 「무기한」으로 바뀌었다 (2026-09-03 실측)** — 화면 문구 "Your Boost remains active automatically with **no expiration date**."
                                     ※ 구 기재(공지 기준 "~2026-10-04 23:59:59 UTC+0 연장")를 대체한다. 단 하단 각주에 "내부 사정에 따라 변경·조기 종료 가능" 유지
reward_staking_kaia_01 ⚠️잠정      KAIA Reward 탭 (/reward/kaia — **KAIA Dual Rewards: Base + Special**)
                                  └ **Staking Rewards / KAIA Staking**: 위임으로 연 최대 4.2% · Accrued Reward · **Delegate 버튼** · Delegatable KAIA
                                  └ **Special Contribution Rewards**(= CR): KAIA 위임 + USDT 보유 시 10 USDT당 최대 0.449999 KAIA · Claimable reward · USDT principal
                                  └ **Mission Check Period**: 🆕 **STAGE 2** — 1R 8.22~9.1 **Ended** / **2R 9.1~9.11 진행 중** / 3R 9.11~9.21 Scheduled (2026-09-03 실측) · View all
                                     ※ STAGE 1은 1R 7.23~8.2 / 2R 8.2~8.12 / 3R 8.12~8.22였다 — **약 10일 회차가 STAGE 단위로 이어진다**
                                  └ 🆕 **섹션 문구 신설 (2026-09-03)**: **"Unlock Idle Rewards — Delegate to unlock your wallet's idle rewards!"**(Staking) ·
                                     **"Wake up special rewards — Deposit 10,000 USDT to earn up to 450 KAIA in rewards."**(CR) · **[View Total Rewards]** 진입점
                                  └ 정책: 위임 시 자동 적립·개별 출금 불가 / 언디렐리게이트 후 **7일 쿨다운** 뒤 원금+보상 일괄 수령 / 쿨다운 후 7일 미수령 시 **자동 재위임** / Kaia 네트워크 상황에 따라 보상 변동
                                  └ **CR 수령 조건·분배 정책 (2026-08-03 채집)**: KAIA 위임 즉시 자동 참여 / USDT:KAIA **1:10** 비율은 **예치 원금만** 산정(일일 적립 보상 제외) /
                                    미션 기간(약 10일) 중 부분 출금·언스테이킹 시 그 회차는 **잔여 유지 자산(최저 잔고)** 기준 / 기간 중 추가 예치·위임분은 **다음 회차부터** 반영 /
                                    보상은 **6개월 분할 지급 + 매월 [Claim Rewards] 수동 수령**(자동 입금 아님) / 조건 미충족 미분배 CR은 **약 90일(3 Epochs) 후 영구 소각** /
                                    전체 참여가 캡(**5,000만 USDT**) 초과 시 보상 비율 비례 감소(표시 비율은 추정치) /
                                    실제 위임·보상 분배 주체는 **Kaia Network(밸리데이터 노드)**, 자산 연동은 파트너 **KAIA Square** 경유 — Unifi는 중개 플랫폼
reward_staking_delegate_01_01     ⚠️ 위임(Delegate) 입력·확인 (상태 변경 액션 — 의도적 미진입)
reward_staking_stage_01           ⚠️ Mission Check Period 전체 보기 (View all)
```

정책 참고(위키 Mission and Reward 마스터): 출석·럭키볼 자격 = **9시 스냅샷 잔고**(USDT 00:00 UTC+0 / JPYC 09:00 UTC+9), TWA 용어 전면 제외(→평균잔고), FDS(DA) 검증, Web 보상은 LINE ID 로그인만.

> **🆕 Season 4 정책 (공지 2026-09-01 · 기간 2026-09-01 ~ 10-01 00:00 UTC+0)** — **Season 3에서 수치는 전부 그대로이고 기간만 갱신됐다**(2026-09-03 공지 전문 대조 확인)
> - **자격**: Unifi LINE 계정 연동 + **일일 잔고 스냅샷(00:00 UTC+0) USDT 100 이상**
> - **출석 미션**: 3일·5일 연속 시 자동 지급, **5일 완료 다음 날(6일차)부터 새 라운드 시작**(라운드 반복 구조)
>   · 100 USDT↑ = 라운드당 3일 1개·5일 1개, **월 최대 12개** / 1,000 USDT↑ = 라운드당 각 2개, **월 최대 24개**
>   · 하루라도 빠지면 1일차로 리셋 + 그 라운드 잔여 럭키볼 소멸 / 스냅샷 100 USDT 미만이면 그날 출석 무효
> - **게임 미션**: 미니게임 **6종 중 3종** 매일 완료 → [럭키볼 받기] 1개, **월 최대 30개**. 미션·미수령 럭키볼은 **매일 00:00 UTC+0 리셋**(당일 미수령분 소멸)
> - **럭키볼 상금 5티어**: 1등 500 / 2등 20 / 3등 5 / 4등 1 / 5등 **0.02 USDT** — Unifi 지갑에 직접 지급(통상 1~2분, 최대 30분)
> - 이벤트 종료 시까지 미사용 럭키볼 자동 소멸 · 가입 시 생성된 지갑 주소로만 지급(주소 변경 불가) · 어뷰징 시 기록 삭제·보상 제한 · 예산 소진 시 조기 종료 가능
> - ⚠️ 이전 기재였던 "럭키볼 차등 USDT 100~1,000+ 최대 9개 / JPYC 5,000~50,000 1~3개"는 **Season 3에서 위 수치로 교체**됐고 Season 4도 동일하다
>
> **🆕 럭키볼 유효기간·소멸 정책 (2026-09-03 화면 FAQ로 명문화 — `/benefits/games/{uuid}` 실측)**
> - 데일리 미션 보상·럭키볼은 **획득 후 24시간 내 미수령 시 소멸**(복구 불가)
> - 럭키볼은 **획득한 회차가 끝나기 전에 추첨**해야 하며, 회차 종료 시 미추첨분 전량 소멸 — **다음 회차로 이월되지 않는다**
> - 여러 개 보유 시 **유효기간이 가까운 것부터 자동 사용**(사용자가 고를 수 없다)
> - 미추첨 럭키볼이 있으면 **만료 3일 전부터 전일까지 1일 1회 LINE 공식계정 메시지로 알림**
> - 회차별 준비 수량 소진 시 **그 회차의 출석·게임 미션 조기 종료**
> - 미션 달성 정보가 Unifi에 동기화되기까지 **최대 30분** 소요될 수 있다
> - Web 환경에서는 **LINE 계정 로그인만** 미션 참여·리워드 수령 가능(Google·Naver 등 불가)

### 2-3. asset — 내 자산 (실측 · 라우트 `/my`)

```
asset_main_01                     내 자산 메인 — 나의 총 자산·액션 4종·토큰 목록(USDT/KAIA/JPYC/IDRP)·보유 NFT
                                  └ ✅ **액션 라벨 개편이 프로덕션에 반영 완료 (2026-08-10 로그인 실측 — 이월 항목 해소)**
                                     프로덕션·Beta 공통: **보내기 / 채우기 / 교환하기 / 은행출금** (구 표기 송금하기·입금하기·은행송금은 소멸)
                                     🆕 **언어별 라벨 실측 (2026-09-07)**: 영문 **Send / Deposit / Swap / Bank Withdraw** · 일본어 **出金 / 入金 / 銀行出金**(mini)
                                     — ja `出金`은 용어집 v3.9~v4.0의 `보내기` 개편 방향과 일치한다
                                     ※ 용어집 v3.9~v4.0의 `보내기` ja 出金 계열 개편과 같은 흐름 — **구 라벨이 남은 XLT·위키 문구는 교체 대상**
                                  └ ⚠️ **액션 버튼 노출 개수는 조건부**: 프로덕션(자산 보유)은 4종 전부, **Beta(잔고 0) 계정은 「보내기·채우기」 2종만 화면 노출**(DOM에는 4종 존재)
                                  └ 🆕 **Beta 전용 — 비상장 토큰 4종 표시**(BO·GRT·SIK·YOO 각 10,000 · **「비상장」 배지**). 프로덕션 미노출
                                  └ 🆕 **프로덕션 카드 유도 문구 확정 (2026-09-07 로그인 실측)**: USDT "**Hold USDT in Plus Mode and Earn 7% annual interest with no conditions**"(→ `/plus/usdt`) ·
                                     KAIA "**Stake KAIA and Earn up to 4.2% annual interest**"(→ `/reward/kaia`) · **JPYC 카드에 「Max 2%」 배지**(#5까지 Beta·mini 전용이던 표기가 프로덕션 반영) · IDRP는 문구 없음
                                  └ 🆕 **누적 이자 진입점이 바뀌었다 (2026-09-07)**: 구 「누적이자 N USDT를 받았어요」 배너가 사라지고 **USDT 카드 안 「Total Interest N USDT」 인라인 표기**가 `/interest/usdt` 진입점이다
                                  └ 🔴 **Beta mini `/my`는 액션이 3종이다 (2026-09-07)**: **取引履歴 · 出金 · 入金 · 銀行出金** — **Swap 미노출**(§0 "mini 교환 미제공"의 첫 실측 근거).
                                     🆕 JPYC 카드에 **「最大年2%の利息を受け取る」** 노출(이자 미제공 스펙과 충돌 — §4) · ❌ #4의 **비상장 토큰 4종(BO·GRT·SIK·YOO)은 미노출**
                                  └ Beta 추가 표기: KAIA 카드 "최대 추가 연 3%" · JPYC 카드 **"연 2%"**·누적이자 표시 (2026-08-03 실측 — 7/30 기재 "연 5%"에서 변동) · USDT 카드 "연 3%"
                                  └ 액션 4종 옆 **History(거래내역)** 버튼은 총자산 우측 별도 배치 (액션 행에 포함되지 않음 — 2026-08-03 실측)
asset_wallet_connect_01 ⚠️잠정     **외부 지갑 연결** — 내 자산 헤더 **⋮(케밥) 메뉴** 유일 항목
                                  └ ✅ **2026-08-10 프로덕션에도 반영 확인**(한국어 「외부 지갑 연결」 · Beta와 동일). 연결 플로우는 상태 변경이라 미진입
                                  └ 🆕 **2026-09-07 재확인**: 케밥 메뉴는 여전히 **「Connect External Wallet」 유일 항목**(영문 라벨 확정)
asset_interest_usdt_01 ⚠️잠정      🆕 **나의 USDT 누적 이자 (`/interest/usdt`)** — 2026-08-10 신규 실측 · IA에 없던 라우트
                                  └ 진입점: 내 자산 USDT 카드의 **"누적이자 N USDT를 받았어요"** 배너
                                  └ 구성: 누적 이자 총액 · 보유 USDT 누적 이자 · 현재 **연 3%**(BASIC) ·
                                    배너 2종 **「플러스 모드로 연 7% 이자 받기」**·**「KAIA 부스트로 최대 연 3% 추가이자 받기」** ·
                                    **나의 이자 내역**(필터 3종: 3개월 · 최신순 · 전체 · 항목 표기 "연 4% 기본 이자" = 과거 이율 표기 그대로 보존)
                                  └ 🆕 **영문 라벨 확정 (2026-09-07)**: 헤더 **"My USDT Total Interest"** · 합계 **"Total USDT Interest"** · 배너 2종 **"Earn Annual 7% in Plus Mode"**·**"Earn Up to 3% with KAIA Boost"** · 내역 항목 **"4% Base Interest"**
asset_history_01                  거래내역 (/my/token/transaction — 필터 4종 **한국어 실측 라벨(2026-08-10): 3개월(기간)·모든 토큰(토큰)·전체(유형)·최신순(정렬)** ·
                                  항목 표기 **"입금 | 기본 이자 +N USDT"**(영문 UI는 "Received | Base Interest") · Wallet/mini는 이자 내역 제외)
asset_history_detail_01           ⚠️ 거래 상세 (거래 ID·네트워크)
asset_token_detail_01             토큰 상세 (/my/token/{컨트랙트주소} — 플러스 모드·Unifi 지갑·보내기/교환하기/은행송금·거래내역)
asset_send_01                     송금하기 — 토큰 선택 (/transfer — "어떤 토큰을 보내시겠어요?" 전체/스테이블 코인)
                                  └ 안내문 **프로덕션 확정 문구(2026-08-10 실측)**: "보내기 가능한 토큰만 표시되며, **락업/플러스 모드에 보관한 자산 및 추가한 외부 지갑 자산은 포함되지 않습니다**"
                                     ※ 8/3 Beta 문구("**송금** 가능한 토큰만…**잠금**/플러스 모드 자산과…")와 어휘가 다르다 — **라이브 문구가 정본**(`송금`→`보내기`, `잠금`→`락업`)
                                     → `asset_wallet_connect_01`(외부 지갑 연결)과 연동된 문구
asset_send_02                     ⚠️ 송금 — 받는 사람/수량 입력 (공식 룰 예시 단계)
asset_send_qr_01 / _01_01         ⚠️ QR 송금 / 그 위 다이얼로그 (공식 룰 예시)
asset_deposit_01                  입금하기 (/deposit — 네트워크(KAIA)·내 지갑주소 복사·카테고리 탭(스테이블 코인/다른 토큰)·토큰별(USDT/JPYC/IDRP) 안내)
                                  └ 🆕 **진입점 2곳 (2026-09-07)**: 내 자산 [채우기] · **로그인 홈 헤더 [QR] 아이콘**
                                  └ 🆕 **안내 개편 (2026-09-07 로그인 실측)**: 상단 "**All KAIA network tokens use the same wallet address.**" ·
                                     카테고리 탭 **Stablecoins / Other Tokens** · 토큰 탭 **JPYC · USDT · IDRP**(Preferred Stable 순) ·
                                     JPYC 안내가 **2단계**로 교체 — ① "**Buy JPYC on jpyc.co.jp**" + **[View JPYC Deposit Guide]** ② "Check your JPYC balance"
                                     (구 "거래소 입금 3단계 안내"에서 **외부 구매처 유도**로 성격이 바뀌었다) · 하단 "The new Stablecoin Wallet"
asset_deposit_network_01 ❌소멸     ~~지원 네트워크 안내 — **브릿지**(어떤 네트워크로 보내도 전액 도착)~~
                                  └ ❌ **2026-09-07 배너 자체가 제거됐다** — #4에서 "클릭이 동작하지 않음 → FE 확인 대상"으로 이월했던 항목이 **화면 제거로 종결**.
                                     현재 입금은 **KAIA 단일 네트워크 안내**뿐이다. **Screen ID 부여 대상 아님**(부활 시 새 항목으로 기록)
asset_bank_01                     은행송금 — **외부 이탈**(unifi.sentbe.com/calculator?session_id=…&redirect_uri=https://www.unifi.me/payout&language=ko_kr)
                                  └ Sentbe 화면(USDT→KRW 계산기·TripleA 라이선스·"인증하러 가기") = Unifi 화면 아님 → **Screen ID 부여 대상 아님**
asset_payout_01                   ⚠️ 은행송금 복귀 화면 (/payout — Sentbe redirect_uri 대상, 미진입)
asset_plus_mode_01                플러스 모드 상세 — 🆕 **라우트 확정 `/plus/usdt`(로그인 필수 · 2026-09-03)**
                                  └ 진입점 2곳: 토큰 상세 내 배너 · 🆕 **홈 배너 「Earn up to 7% interest / Get a 2% higher rate than before」**
                                  └ 화면 내부는 로그인 세션이 없어 미진입(§4)
```

> **NFT 목록은 asset이 아니라 Apps 영역** — 내 자산의 "보유 NFT"는 `/apps/my-page/nfts`로 이동한다(§2-4). 기존 `asset_nft_01` 어휘는 **`apps_mypage_nft_01`로 정정 제안**(사용자 확인 필요 — 아직 부여된 위키 없음).

### 2-4. apps — Apps 영역 (실측 · 라우트 `/apps/...` · Unifi 4탭 전용)

```
apps_main_01                      Apps 메인 — Reward 서브탭 (/apps · **비로그인 열람 가능**)
                                  └ 구성(실측): **🆕 상단 게임 프로모션 캐러셀(1/5 · View All)** — 각 슬라이드는 외부 게임으로 이탈(`referral_code` 부착).
                                    2026-08-03 실측 5종: LEGEND WAR / Endless Frontier2 / LORDNINE(월드보스 클리어 최대 5 USDT) / Siege Of Titans / Seal M(미션 완료 100+ USDT)
                                  └ 앱 검색 / 수혜자 수(**9,018,705명**)·"최대 $1.2 리워드"·"로그인하고 $1.2 리워드 받기" / 시세 위젯(Binance KAIA·CoinMarketCap USDT·기준일) /
                                    USDT Reward Missions(실측 3건: Lucky Dice Lv3 도달 0.1 USDT / Pinky Auctions 빙고 1줄 1 USDT / Pinky Auctions 친구 10명 초대 0.1 USDT) ·
                                    KAIA Reward Missions(2026-08-03 기준 항목 없음) / Editor's Pick(PetPoP·Legend War·Skylands) / Explore Apps
                                    (🆕 **카테고리 7종: AI·CONTENT·DePIN·GAME·Payment·SOCIAL·ETC** — **2026-09-07 `SocialFi` 소멸**(8종→7종) · **26 Apps**(7/27·7/30 27 → 8/3 30 → 8/10 29 → 9/3 27 → **9/7 26**) · Popular 정렬 · 각 앱은 외부 dapp URL로 이탈)
                                  └ 수혜자 수·시세 위젯은 **매 점검 변동**(2026-09-07: 9,021,821명 · 1 KAIA=$0.03 · 1 USDT=$0.99 · 기준일 2026.09.07) — 변경 판단 대상 아님
apps_market_01                    Apps 마켓 서브탭 (/apps/market — Buy/Sell · Drops: Live & Upcoming / Past / Now · NFT 드롭 카드(가격 KAIA·수량·판매율))
apps_mypage_nft_01                나의 NFTs (/apps/my-page/nfts — 탭 3종: 전체·판매중·거래내역 / 빈 상태 "지갑에 보유하고 있는 NFT가 없어요")
                                  └ 🆕 **2026-09-07 영문 빈 상태 실측**: "**No NFTs / You don't have any NFTs in your wallet.**" — 보유 0건에서는 **탭 3종이 노출되지 않는다**(빈 상태 전용 구성)
                                  ※ 진입점은 내 자산의 "보유 NFT" · `/apps/my-page` 단독 진입은 `/my`로 리다이렉트
apps_trade_swap_01                교환하기 (/apps/trade/swap — From/To 토큰 선택·Max·스왑 방향 전환 버튼·교환 · JP 미제공·mini 미제공)
                                  └ 하단 프로모션 배너 — ✅ **2026-09-07 번역 누락 해소**: 영문 UI에서 **"Trade KAIA on AlphaSec with Zero Fees!"** 로 정상 노출
                                     (#3에 "지금 AlphaSec에서 KAIA 거래하면 즉시 수수료 0원!" 한국어 그대로 노출로 기록됐던 XLT 누락 의심 건 **종결**)
apps_trade_swap_confirm_01_01     ⚠️ 교환 확인 팝업 (예상 수수료)
```

### 2-5. my — 마이/설정 (실측 · 라우트 `/setting`)

```
my_main_01                        마이 메인 — 프로필 닉네임(편집)
my_security_email_01              인증/보안 — 이메일 (인증 완료 상태)
my_security_passkey_01            인증/보안 — 생체 인증 패스키 (등록 완료 상태)
my_security_passcode_01           인증/보안 — 간편 비밀번호
my_wallet_privatekey_01           지갑 — 개인 키 확인하기
my_setting_language_01            화면 표시 — 언어 설정 (한국어 등 · 영문 UI "Language Settings")
my_setting_preferred_stable_01 ⚠️잠정  🔴 **화면 표시 — 「Preferred Stable」 신설 (2026-09-07 실측 · 값 JPYC/USDT/IDRP)**
                                  └ **기준 스테이블코인을 사용자가 고른다** — 홈 자산 카드 순서·기본 탭, 홈 히어로 이율 수치, 가이드 카드 구성이 이 값에 따라 갈린다(§0-0-1 축 ①-b)
                                  └ ⛔ **어휘 미확정 — 부여 금지**(§4 승인 대기 ⑨)
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
kpick_main_01                     K-Pick 탭 메인 (**Beta 라우트 `/benefits`** · 헤더 좌 "K-Pick" / 헤더 우 **MY쇼핑 링크 + noti 벨**)
                                  └ 🔴 **2단 구조로 재편됐다 (2026-09-07 Beta 로그인 실측)** — K-Pick 탭이 **허브 화면으로 축소**되고 카탈로그는 카테고리 목록 라우트로 내려갔다
                                     현재 허브 구성: JPYC 안내 배너 → 「최대 15% 환원!」 배너 → **카테고리 4아이콘** → JPYC 구매 가이드 배너
                                     ❌ **바우처 12종·스킨부스터·K-컬처 카탈로그가 허브에서 전부 사라졌다**(소멸이 아니라 `kpick_category_01`로 이동 — Chrome 로그인에서 카탈로그 정상 확인)
                                  └ ⚠️ **인앱 브라우저로 점검하면 403·429가 떠 카탈로그가 빈 것처럼 보인다** — K-Pick 판정은 **사용자 Chrome으로 교차 확인**한다(2026-09-07 실측 교훈)
                                  └ 🔴 **프로덕션 `/benefits`는 KR IP에서 축소판이다 (2026-09-03 신규 실측)** — 배너 3종만 노출
                                     (「Up to 15% cashback!」·「Daily Missions for JPYC」→`/benefits/daily-mission`·「Get more JPYC with friends」→`promotion.unifi.me/referral-campaign-jpyc-2`).
                                     **카테고리 4아이콘·바우처 12종·스킨부스터·K-컬처 전부 미노출** → `kpick_kr_block_01`(KR IP 제한)은 **프로덕션에서 유효**하며 폐기 대상이 아니다
kpick_category_01                 🆕 **K-Pick 카테고리 목록 (2026-09-03 라우트 신설 · 2026-09-07 카탈로그 이관으로 정본 화면이 됐다)**
                                  └ 🔴 **2026-09-07 프로덕션에도 라우트 개방** — 단 **KR IP에서는 카탈로그 0건**(탭 3종만 렌더). Beta는 정상 → `kpick_kr_block_01` 유지 근거 강화
                                  └ 🆕 헤더에 **MY쇼핑** 링크(허브와 동일) · 상단 탭 **K-美容 / K-買い物 / K-カルチャー**
                                  └ Beta Web `/benefits/k-pick/beauty` · `/benefits/k-pick/shopping` · `/benefits/k-pick/pop`
                                  └ Beta mini `/benefits-mini/k-pick/beauty` · `/shopping` · `/pop` (동일 구성)
                                  └ 라벨 K-美容 / K-買い物 / K-カルチャー · ⚠️ **「내 예약」은 여전히 `href="#"`** — 라우트 없음
                                  └ 🔴 **K-美容에 「クリニック」 섹션 신설 (2026-09-07 · Beta Web·mini 공통)** — 이 저장소 clinic 위키 작업 대상 화면이 라이브에 올라왔다
                                     · 필터 4종 **すべて / 皮膚・美容外科 / 歯科 / 眼科**
                                     · 클리닉 카드 구성: 병원명 · **평점(4.6~4.9)+리뷰 수** · 지역(서울 강남구 등) · **시술 태그**(라미네이트·임플란트·쥬베룩·리쥬란·포텐자·울세라·서마지 등) ·
                                       **[お問い合わせ](문의하기)** · **결제액 N% 캐시백**(5~15%) · 특징 배지 4종(일본어 상담 가능·통역 지원·3D 진단 장비 등) · 카드별 헤드라인
                                     · 실측 **19곳**: 루치과 · 뷰티온의원 명동 · **청담봄온의원** · 청담여신미용외과 · 티아나미용외과 · 더피크의원 · **DA미용외과** ·
                                       레디피부과 · 강남헤라미용외과 · 델픽의원 · 힐링안과 · 밀리클리닉 도산 · AB미용외과 · 톡스앤필 강동천호점 · POEN클리닉 ·
                                       원데이치과 · VS라인의원 강남점 · 루비미용외과 등
                                     · ⛔ **어휘 미확정 — 부여 금지**(§4 승인 대기 ⑩)
                                  └ 카탈로그 대폭 확대: K-뷰티에 헤어·두피·마사지·에스테·퍼스널컬러 등 **20건 이상**(마리엠헤어&헤드스파·명동 컨디션·JUNO HAIR 홍대·말지아 힐링스파·동대문 풋샵 등),
                                    K-컬처에 한복 대여(경복궁 아리한복)·찜질방(스파렉스 동묘점 **GuideKim 한정**)·인사동 전각 체험·개화기 의상(인천 차이나타운)·달리포토 스냅 신규
                                  └ 🆕 **K-컬처 신규 상품 (2026-09-07)**: **DMZ 투어**(전문 가이드 동행) · **난타(Nanta Show) 공연** · **JUMP 공연**(명보아트홀) · K-Pop 걸그룹 스타일링 포토
                                  └ 🆕 **캐시백률이 카테고리 단위로 균일해졌다 (2026-09-07)**: K-美容·K-カルチャー **환원 7% 균일** / K-買い物 **환원 10% 균일**(올리브영 1만원권만 5%)
                                     ※ #5의 상품별 편차(5%·10%)와 다르다 — **여전히 상수로 인용하지 않는다**
kpick_product_detail_01 ⚠️잠정     🔴 **K-Pick 상품 상세 — Unifi 내부 화면으로 편입 시작 (2026-09-03 프로덕션 실측)**
                                  └ 라우트 **`https://www.unifi.me/k-pick/{카테고리}/{상품ID}`** (실측 `/k-pick/shopping/bizcon-S0213607` = 올리브영 5만원권)
                                  └ 🆕 **구매 동선이 붙었다 (2026-09-07 프로덕션 실측)** — 하단 고정 CTA **[Save purchase link]** · **[Buy now]**
                                     · [Buy now] → **LINE MINI app intent** → `/k-pick/{카테고리}/{상품ID}/checkout` (fallback `miniapp.line.me/2008994549-CGfrtgSs/...`)
                                     · 즉 **상세는 웹에서 열리지만 구매는 MINI app으로 넘긴다** — 체크아웃 화면은 미진입(구매 플로우)
                                  └ 🆕 **특정상거래법 표기 섹션 (2026-09-07)** — 「特定商取引法に基づく表記」 最終更新 2026-06-23
                                     · **판매 사업자 = Afformation Inc.**(운영 서비스 **GuideKim** · 대표 HYUNKEUN JI · 서울 강남 · 통신판매업 신고 2024-서울강남-07295)
                                     · "제휴 의료기관·매장·체험 사업자·여행 등 파트너가 실제 상품·역무 제공자 또는 판매 주체가 되는 경우 해당 제휴처 조건이 적용된다"
                                     ⚠️ **화면은 Unifi 도메인이지만 판매 주체는 외부 파트너**다 — 승인 대기 ⑧의 "내부/외부 혼재 표기" 판단에 직접 걸리는 근거
                                  └ 🆕 이용 안내 아코디언(사용 불가 매장 목록·변경/취소 규정 전문)
                                  └ 구성: 상품명 · 정가/특가(2026-09-07 재실측 ¥5,789→¥5,211 **10% OFF** · 환율에 따라 매주 변동) · **공식 바우처·즉시 발급** 배지 · **즉시 캐시백 5%** ·
                                    **판매자 GuideKim** · 유효기간(구매일 60일·연장 불가) · 사용처 · 취소·환불(미사용 시 전액) · e쿠폰 수령 방법 ·
                                    「Unifi mini는 공식 인증 LINE MINI App」 안내 · 함께 볼 바우처 3종 · **리뷰(평점 4.8 · 12건 · 작성자·날짜·본문)**
                                  └ ⚠️ **`/k-pick/shopping`(상품 상세와 같은 프리픽스의 목록)은 여전히 프로덕션에서 홈으로 리다이렉트** — 목록은 `/benefits/k-pick/*` 계열이 담당한다(2026-09-07 재확인)
                                  └ ⛔ **어휘 미확정 — 부여 금지**(§4 승인 대기 ⑧). `kpick_` 프리픽스 확정(승인 대기 ③)과 묶어 결정한다
                                  └ **카테고리 아이콘 4종**(2026-08-03 실측): **K-뷰티 · K-쇼핑 · K-컬처 · 내 예약**
                                    ※ 7/30 기재 "카테고리 3종"에 **내 예약**이 같은 행 4번째 아이콘으로 포함됨(진행 중 예약 시 레드닷 + "예약이 진행 중이에요" 툴팁)
                                  └ 구성: JPYC 이용 안내("일본 정부 최초 승인 디지털 엔화")·**JPYC 구매 가이드** 배너 /
                                    한국 여행 필수 **바우처**(올리브영 ₩1만·3만·5만 / 다이소 ₩3천·1만·3만 / CU ₩5천·1만 / 이마트 ₩5천·1만·3만·5만 = **12종** · 캐시백 8%·22% · ¥ 가격) /
                                    **K-뷰티 스킨부스터** — 시술 **3계열** 실측: **쥬베룩**(클리닉 6) · **리쥬란**(4) · **포텐자**(6) ·
                                    "시술 예약 시 최대 2만원 할인 — 레디영약국" / 정품 인증
                                  └ ⚠️ **캐시백률은 고정값이 아니다 (2026-08-10 실측)** — 같은 시각 **Web K-Pick(`/benefits`) = 쥬베룩 5%·리쥬란 8%·포텐자 10%** /
                                     **mini(`/benefits-mini`) = 쥬베룩 10%·리쥬란 10%·포텐자 5%** 로 **환경별로 다르게** 노출됐다(8/3 기재 10%·10%·8%과도 다름).
                                     2026-09-03 재실측: Web 쥬베룩 5%·리쥬란 10%·포텐자 10% / mini 쥬베룩 5%·리쥬란 10%·포텐자 5% — **주·환경마다 계속 흔들린다**.
                                     🆕 바우처 카드에 캐시백률과 별개로 **「N% OFF」 정가 대비 할인율**이 함께 표시되기 시작했다(예: 올리브영 5만원권 「還元10%」 + 「10% OFF ¥5,704」)
                                     → 캐시백 수치를 IA·기획 문서에 상수로 인용하지 않는다
                                  └ ⚠️ **K-컬처 체험 상품 목록은 조회마다 로테이션된다** — 같은 세션 내 재조회에서 구성·순서가 바뀐다
                                     (관측 풀: 고센뷰티 · A by BOM 헤어샵 · 웜앤쿨 퍼스널컬러 · Ktown4u MV 패키지 · 호수 도산 청담점 · 홍대 K-POP 댄스클래스 ·
                                      🆕 **BTS 팬클럽 '아미' 팬 투어** · 🆕 **걸그룹 스타일링 포토 체험**). **개별 상품의 등장·소멸을 IA 변경으로 판정하지 않는다**
kpick_myshopping_01 ❌폐기         ~~MY쇼핑 서브탭~~ → **Unifi 화면이 아님. Screen ID 부여 대상 아님** (2026-08-03 이월 항목 해소)
                                  └ ⚠️ **2026-09-03 부분 번복**: MY쇼핑(내 주문) 자체는 여전히 외부 GuideKim이지만, **바우처 상품 상세는 일부가 Unifi 내부 화면(`/k-pick/...`)으로 옮겨졌다**.
                                     브릿지 `redirectUrl`이 상품별로 **`www.unifi.me/k-pick/...`(내부)** 와 **`guidekim.me/bizcon/...`(외부)** 로 갈리므로 **개별 확인 후 부여**한다
                                  └ K-Pick 헤더 우측 "MY쇼핑"은 **외부 GuideKim으로 새 탭 이탈** — Beta 실측 `test.guidekim.me/login?returnTo=%2Fme%2Forders&utm=AFMT_001`
                                    (= GuideKim 자체 로그인 → 내 주문 `/me/orders`. 일본어 UI. 프로덕션은 `guidekim.me` 추정)
kpick_bridge_01                   Guide Kim 브릿지 화면 (LINE 앱 환경=IAB·Web=새 탭 · '내 예약' 경유 시 미노출) · Beta 실측 `/channel/bridge/AFFORMATION`
kpick_reservation_01              내 예약 (진행 중 예약 툴팁·레드닷 · mini 홈에서 "내 예약 3건 확인하기" 실측)
kpick_kr_block_01                 KR IP — 버튼 비노출 + 국가 서비스 불가 안내 ※ **Beta에서는 KR IP로도 K-Pick 전체 열람됨**(정책 변경 가능성 — 다음 점검 재확인)
```

**Unifi mini Beta 라우트 실측 (2026-07-30 — mini 최초 직접 실측)**

```
/benefits-mini                    mini 홈 — 🔴 **2026-09-03 전면 개편: K-Pick형 커머스 화면으로 통째로 교체됐다**
                                  └ 페이지 타이틀 🆕 **「Unifi | 渡韓のおトクサービス」**(방한 특가 서비스) · 헤더는 「会員登録」만(구 unifi mini 로고·QR·noti 소멸)
                                  └ 🔴 **2026-09-07 mini 홈도 허브로 축소됐다** — 현재 구성: 헤더(マイショッピング·noti) → JPYC 안내 배너 → 「최대 15% 환원!」 배너 →
                                     **카테고리 4아이콘**(K-美容·K-買い物·K-カルチャー·マイ予約) → JPYC 구매 가이드. **바우처·스킨부스터·K-컬처 카탈로그는 카테고리 목록으로 이관**
                                     = **Beta Web `/benefits` 허브와 완전히 동일해졌다**. 중복 판단이 더 급해졌다(§4)
                                  └ 🆕 **로그인 상태 실측(2026-09-07)**: 카테고리 행 옆에 **「進行中のご予約があります」 툴팁 + マイ予約** 노출(비로그인에는 없음)
                                  └ 푸터 약관은 **Unifi·Unifi ウォレット·개인정보·마케팅만** — 어그리게이터 약관 없음 유지 ✅
                                  └ ❌ **소멸한 구 구성**: JPYC balance 배너 · 2칸 타일(내 예약 N건 / JPYC 데일리 미션 레드닷) · "From K-beauty to K-culture" 배너
                                  └ mini GNB 링크 실측: ホーム `/benefits-mini` · **K-Pick `/benefits-mini/k-pick/beauty`(신설)** · リワード `/benefits-mini/daily-mission` · 資産 `/my` · マイ `/setting`
                                  └ 푸터에 어그리게이터 약관 **없음** — §0의 "mini는 approve 미제공"과 일치(유지)

(2026-08-03 시점의 구 구성 — 이력 보존)
                                  └ 구성(2026-08-03 실측): **JPYC balance 배너**(잔액 + `>` 진입) / JPYC 이용 안내 / "From K-beauty to K-culture" 배너 /
                                    2칸 타일 — **내 예약 N건 · 보기** | **JPYC 데일리 미션**(레드닷) /
                                    바우처 캐러셀 / JPYC 구매 가이드 / K-뷰티 스킨부스터(쥬베룩·리쥬란·포텐자) /
                                    🆕 **"한국에서 K-뷰티 즐기기 — 퍼스널컬러부터 아이돌 메이크업까지"**(K-컬처 체험 상품 6종 실측:
                                    A by BOM 헤어샵 / 강남 퍼스널컬러 진단 / 청담 고센뷰티 K-Pop 스킨케어·메이크업·헤어 / Ktown4u MV 레코딩 패키지 /
                                    홍대 K-POP 댄스클래스 / 강남 호소 도산·청담점 · 캐시백 7% · ¥ 가격)
                                  └ ⚠️ 7/30 있던 **"100% 당첨되는 JPYC 럭키볼" 섹션이 홈에서 미노출**(→ Reward 탭 데일리 미션으로 이동 추정)
                                  └ ✅ **2026-09-03 스켈레톤 고착 해소** — Beta 웹·Beta mini 리워드 탭 모두 비로그인에서 정상 렌더(§4)
                                  └ 🔴 **2026-09-07 mini Reward 스켈레톤 재발** — **로그인 상태에서 20초 후에도 고착**. 이자 배너·Special Missions 카드·Daily Mission 진행도·
                                     「매일 출석 체크」·NEXT Bay 배너 영역이 대시 블록으로 남아 **재확인 불가**. `mission-users`·`missions` API는 **200**, 콘솔 에러 없음 →
                                     #3과 동일한 **프런트 렌더 이슈** 추정. 새 추적 항목으로 등록(§4)
/benefits-mini/daily-mission      mini Reward 탭 — "Rewards" 헤더 (2026-08-03 상세 실측)
                                  └ JPYC 안내 배너 / **"내 JPYC 자산 불리기" 이자 배너** — 🆕 **2026-09-03 수치 하향: 「최대 연 5%」 → 「最大年2%」**(⚠️ mini 이자 미제공 스펙과 충돌 — §0·§4)
                                  └ **Special Missions** — "무제한 미션, 최대 ¥30,000 즉시 지급 / 게임·광고·설문 미션"(SkyFlag 계열 추정 · 2026-09-07 제목·본문만 렌더)
                                  └ 🆕 **NEXT Bay 게임 마켓플레이스 배너**(Beta Web 리워드 탭과 동일 — §2-2 `reward_mission_market_01`)
                                  └ **Daily Mission** — "럭키볼로 최대 50,000 JPYC 뽑기" / 리워드 0 JPYC / 럭키볼 0
                                  └ ~~**Game mission** — "게임 미션 완료하고 JPYC 받기" / 항목 **"외부 게임 미션"**(0/2)~~
                                     → ✅ **2026-09-03 섹션 자체가 사라졌다**(NEXT Bay 배너로 대체). 한국어 노출 XLT 누락 의심 건도 함께 소멸
                                  └ 🆕 **「매일 출석 체크」 섹션 신설 (2026-08-10 실측 — 8/3 "출석 체크 없음" 기재 정정)**
                                     "3일 연속, 5일 연속 출석체크하고 럭키볼 받아요" / 1일~5일 진행도 / CTA **"00:00:00 안에 출석하기"**(카운트다운 내장)
                                     ※ 풀 모드 문구("100 USDT 이상 예치하고 3일, 5일 연속 출석체크하면 럭키볼 받아요")와 달리 **예치 조건 문구가 없다** — mini는 JPYC 기준이라 조건 별도 확인 필요(§4)
/benefits-mini/draw-promotion     mini 럭키볼 뽑기 프로모션 — 🆕 **LINE 앱 전용 게이트**: 진입 시 딤 + 다이얼로그
                                  "Only available on the LINE app. Join the event now!" / [Confirm] (2026-08-03 신설 — 7/30에는 열람 가능했음)
/benefits-mini/luckyball-invite   mini 럭키볼 친구 초대 — **현재 위키 작업 중인 럭키볼 캠페인의 실제 라우트** (miniapp.line.me/2008994547-GfGUdDxy/... 형태로도 노출)
                                  └ 구성(2026-08-03 실측): "Invite a Friend Mission / 친구 초대하고 최대 50,000 JPYC 럭키볼 받기" /
                                    **내 럭키볼 0 Draw** | **미션 완료한 친구 0 / 20명** / 초대한 친구 단계 ①Unifi 가입 ②Unifi LINE 공식계정 추가 /
                                    유의사항 4종(친구 완료 시 나도 1개 / 공식계정 친구 유지 필요 / LINE 계정 가입 필수 / **최대 20개**) / CTA **[로그인]** · [홈으로 가기]
                                  └ 🆕 **비실시간 지급 반영 (2026-08-10 실측 — 위키 「비실시간 지급 2부작」 스펙이 Beta 화면에 등장)**
                                    상단 문구 **"당첨금은 뽑기 시점으로부터 2주 이내에 지급됩니다"** /
                                    🆕 지급 현황 블록 **「지급될 리워드 0 JPYC」 + 「지급 완료된 리워드: 0 JPYC」** (구 화면에는 없던 영역) /
                                    내 보유 럭키볼 **"0개 뽑기 ›"**(뽑기 진입 링크) /
                                    🆕 **「꼭 확인해 주세요」 유의사항 6종** — 초대자·피초대자 모두 OA 친구추가+가입+지갑 생성 완료 필요 / 가입정보 확인 불가·변경 시 지급 제한 /
                                    **일본에서 가입한 사용자에게 가입 시 생성된 지갑 주소로만 지급**(주소 변경 불가·비일본 사용자는 당첨돼도 미지급) / 어뷰징·Bot·다중계정 시 내역 삭제 /
                                    예산 소진 시 조기 종료 / **초대 시 친구에게 내 LINE 프로필 이름 일부가 표시**
                                  └ 다이얼로그 "You can join this event in the LINE app. Would you like to join now?" / [OK] → LINE 앱 유도
/benefits-mini/curation/{uuid}    mini 큐레이션 상세 (실측 3건)
```

> **🆕 mini GNB의 Assets·My는 풀 모드 화면을 그대로 공유한다 (2026-08-03 실측)**
> mini Beta에서 하단 GNB **Assets → `/my`**로 이동하며, 화면이 **Unifi 풀 모드 내 자산과 완전히 동일**하다 — 액션 4종(Send·Receive·Swap·Bank Withdraw)·USDT/KAIA/JPYC/IDRP·**이율/누적이자 표기**·보유 NFT, 그리고 **푸터에 어그리게이터 약관이 다시 등장**(mini 홈 푸터에는 없음).
> 즉 Beta의 mini는 **mini 전용 홈·리워드 + 풀 모드 자산·마이**를 조합한 구조다. 위키 스펙의 "mini는 이자 노출 불가·교환 미제공"과 어긋나므로 §4에서 확인 대상으로 둔다.

> mini 푸터에는 **어그리게이터 약관이 없다**(Unifi·Unifi 지갑·개인정보·마케팅만) — §0 표의 "mini는 어그리게이터 약관/approve 미제공"과 일치하는 실측 근거.

### 2-8. login / promo (실측)

```
login_main_01                     소셜 로그인 선택 (/auth/sign-in?returnUrl=… — Google/LINE/Naver/Kakao/Apple · "Powered by LINE NEXT" · mini는 LINE 단일)
login_terms_01                    ⚠️ 약관 동의 (가입 플로우 — Unifi는 어그리게이터 약관+approve 포함, Wallet/mini는 미제공)
promo_luckyball_inviter_01        럭키볼 초대자 프로모션 페이지 (위키 작업 실측)
promo_luckyball_invitee_01        럭키볼 피초대자 프로모션 페이지 (위키 작업 실측)
promo_goldenball_01               ⚠️ 황금럭키볼 프로모션 (mini 홈 배너 — 위키 근거)
```

### 2-9. pay — 오프라인 QR 결제 (🆕 신설 실측 2026-09-03 · 라우트 `/pay/...` · ⚠️ 주기능 어휘 미확정)

> **#4에서 "파트너 콘솔 기반 B2B라 사용자 IA 밖"으로 추적만 하던 Unifi Pay가 사용자 화면으로 출시됐다.** 프로덕션 홈 **최상단 히어로 배너**가 결제 가이드로 신설됐고, 프로덕션·Beta 양쪽에 이미 라이브다(릴리즈 예정 아님).
> ⛔ **주기능 어휘 미확정 — Screen ID 부여 금지**(§4 승인 대기 ⑦). 아래 `pay_*`는 서술 편의용 잠정 표기다.

```
pay_qr_guide_01 ⚠️잠정             오프라인 QR 결제 가이드 (/pay/qr/mpm/guide · **비로그인 열람 가능**)
                                  └ 헤드라인: "Unifi offline payment is now available / USDT payment, done with one QR code!"
                                     (Beta ja: 「Unifiオフライン決済がオープン / USDT決済、QRコードひとつで完了！」)
                                  └ 이용 방법 3단계 (실측)
                                     ① **결제 금액을 사전 충전** — "Payments are made from your topped-up balance. Please top up before paying."
                                        ⚠️ **예치(Plus/Basic)·지갑 잔액과 별개인 「결제용 충전 잔액」 개념이 새로 등장** — 정체 확인 필요(§4)
                                     ② Unifi에서 **[QR Pay] 버튼** 탭 — "홈 상단의 **「Pay」 버튼**, 또는 이 페이지 하단 「QR Pay」"로 스캔 화면 진입
                                        ⚠️ 홈 상단 「Pay」 버튼은 **로그인 상태에서만 노출**로 추정(비로그인 홈 헤더 미노출)
                                     ③ 매장 QR 스캔 → 금액 입력 → **Unifi Pay로 결제 완료**
                                  └ CTA **[Start QR payment]** ×2 (본문 중간·하단)
pay_qr_scan_01 ⚠️잠정              ✅ **QR 스캔 화면 실측 (2026-09-07 프로덕션 로그인 · /pay/qr/mpm)**
                                  └ 헤드라인 **"Scan QR for offline payment"** · 안내 **"Please scan the payment QR code posted at the store. Payment proceeds after scanning."**
                                  └ 🆕 진입 즉시 **카메라 권한 다이얼로그**: "Please allow camera access. / Camera access is required to scan QR codes. Please allow camera access in Settings."
                                     · CTA **[Grant Access]** · **[Cancel]** → 별도 팝업 어휘 필요(`pay_qr_scan_01_01` 상당)
                                  └ **카메라 권한 미허용·결제 미실행** — 스캔 이후 금액 입력·결제 단계는 여전히 미실측
pay_qr_entry_01                   ✅ **진입점 확정 (2026-09-07)** — **로그인 홈 헤더 [pay] 아이콘**(비로그인 홈에는 없다 · #5 이월 항목 해소) + 가이드 페이지 하단 [Start QR payment]
pay_qr_amount_01_01 ⚠️잠정         ⚠️ 금액 입력·결제 확인 (가이드 문구 근거 — 미실측)
```

**참고 — 파트너측(사용자 IA 밖)**: Unifi Pay Direct 콘솔(정산 지갑 등록·프로토콜 수수료 1%)은 여전히 파트너 전용이다(§0-0).

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

- [ ] ⚠️ 잔여 항목 실측 (팝업·조건부: 뽑기 결과, 송금 2단계·QR, 거래 상세, 플러스 모드 상세, 지원 네트워크(브릿지) 상세, `/payout`, 계정 탈퇴, 황금럭키볼, **위임(Delegate) 입력·확인**, **외부 지갑 연결 플로우**, **mini Assets·My 탭**)
  - 2026-07-27 실측 승격: Apps 메인·마켓, 알림 목록, 게임 미션 상세, 은행송금(외부 Sentbe), NFT 목록
  - 2026-07-30 실측 승격: **`/reward/kaia` KAIA 스테이킹·CR 보상**, **K-Pick 탭 전체(Beta)**, **Unifi mini 라우트 계열(Beta)**, 내 예약 진입점
  - 2026-08-03 실측 승격: **MY쇼핑(→외부 GuideKim 확정·부여 대상 아님)**, **mini Reward 탭 전체 구성**, **mini 럭키볼 친구 초대 화면**, **Apps 게임 프로모션 캐러셀**, **CR 분배 정책 전문**
  - 2026-09-03 실측 승격: **오프라인 QR 결제 가이드**(`/pay/qr/mpm/guide`), **K-Pick 상품 상세**(`/k-pick/{카테고리}/{상품ID}`), **K-Pick 카테고리 라우트 3종**(Web·mini), **플러스 모드 라우트**(`/plus/usdt`), **NEXT Bay 마켓플레이스 미션**, **럭키볼 유효기간 정책 6종**
  - 2026-09-07 실측 승격: **QR 스캔 화면**(`/pay/qr/mpm` + 카메라 권한 다이얼로그) · **로그인 홈 헤더 [pay]·[QR] 아이콘** · **로그인 홈 토큰별 3카드·프로모션 모달** ·
    **마이 「Preferred Stable」 설정** · **K-美容 클리닉 섹션(19곳)** · **상품 상세 구매 CTA·체크아웃 라우트·특정상거래법 표기** · **커머스용 MINI app ID** ·
    **`/deposit` 개편(브릿지 소멸·jpyc.co.jp 유도)** · **Beta mini `/my` 액션 3종(Swap 미노출)** · **NFT 빈 상태 영문 문구**
  - 2026-08-10 실측 승격: **mini 「매일 출석 체크」 섹션**, **mini 럭키볼 친구 초대 비실시간 지급 블록·유의사항 6종**, **프로덕션 게임 미션 진행도 구성**, **홈 히어로 최대 연 10% 표기**
  - [x] ~~🔴 **스켈레톤 이슈**~~ → ✅ **2026-09-03 전 조합 해소·종결**. 프로덕션·Beta 웹·Beta mini 리워드 탭이 **비로그인에서 모두 정상 렌더**됐다(5주간 추적 종료). 재발 시 새 항목으로 기록한다. 아래는 8/10 시점의 재현 매트릭스(이력 보존).

    | 대상 | 비로그인 | 로그인 |
    |---|---|---|
    | 프로덕션 `/benefits/daily-mission` | ✅ 정상 | ✅ **정상**(요약·출석 1일차·게임 6종 전부 렌더) |
    | Beta 웹 `/benefits/daily-mission` | ❌ **스켈레톤** | ✅ 정상 |
    | **Beta mini `/benefits-mini/daily-mission`** | ❌ 스켈레톤 | ❌ **스켈레톤(8초 후에도 고착)** |

    → **프로덕션은 완전 해소**(7/27 프로덕션 로그인 재현은 더 이상 관측되지 않음). 남은 문제는 **Beta 한정**이고, 그중 **mini Reward 탭은 로그인 상태에서도 뜨지 않는다** — 럭키볼 캠페인 작업의 핵심 화면이라 **우선 확인 대상**이다.
    참고(8/3 Beta 네트워크 실측): 정적 자산·API 모두 200(`POST /unifi/v1/mission-users` 포함), 콘솔 에러 0건인데 UI만 스켈레톤 → 프런트 렌더 이슈 추정
- [ ] 🔴 **신규 (2026-09-07) — mini Reward 스켈레톤 재발**: #5에서 "전 조합 해소·종결"한 직후 **4일 만에 Beta mini `/benefits-mini/daily-mission`에서 재현**됐다.
  **로그인 상태 · 20초 대기 후에도 고착** · 대시 블록 16개 · `mission-users`·`missions` API **200** · 콘솔 에러 없음(8/3 진단과 동일).
  가려진 영역: **이자 배너(最大年2%) · Special Missions 카드 · Daily Mission 진행도 · 「매일 출석 체크」 · NEXT Bay 배너** — 이 회차에 해당 항목 재확인 불가.
  ⚠️ 이번엔 **Beta mini 로그인 한정**이고 프로덕션·Beta 웹은 정상이다. **FE 확인 권장** · 다음 회차 최우선 재확인
- [x] ~~**로그인 세션 전무 — 사용자 로그인 필요**~~ → **2026-08-10 사용자가 프로덕션·Beta 양쪽 로그인 제공, 로그인 영역 순회 완료**(`/my`·`/setting`·`/notification`·`/my/token/transaction`·`/interest/usdt`·`/transfer`·`/deposit`·`/apps/trade/swap`·`/apps/my-page/nfts`·Beta `/my`·mini 홈·mini Reward)
- [x] ~~**Beta 디버그 패널 활용 여부 결정**~~ → **⛔ 사용하지 않는다 (2026-08-10 사용자 결정 · 이후 회차에도 재론하지 않음)**
  Beta 화면 좌측 톱니의 **「국가 모킹」·「알림 테스트」·「결제 가맹점 진입」은 개발자 도구**이므로 점검에 쓰지 않는다. 국가 모킹으로 JP IP·Wallet Mode를 실측 승격하는 방안도 **폐기** — 해당 축은 실제 접속 환경(VPN·해외 IP·실기기 캡처)으로만 승격한다.
  단, **「결제 가맹점 진입」 버튼의 존재 자체는 Unifi Pay의 사용자측 결제 화면이 Beta에 준비 중이라는 신호**로 기록해 둔다(진입하지 않고 관찰만 — `pay_` 어휘 검토의 참고 근거).
- [ ] 🆕 **부스트 정책 변경 반영 확인 (공지 실측)** — ⓐ 명칭이 **「KAIA 부스트」 → 「부스트」로 변경**(2026-07-27 공지) ⓑ ~~운영 기간 ~2026-10-04 연장~~ → **2026-09-03 화면 문구가 「무기한(no expiration date)」으로 바뀌었다** — 공지(종료일 명시)와 화면(무기한)이 어긋나므로 어느 쪽이 정본인지 확인 필요 ⓒ 공지 기준 부스트 티어는 **Unifi 지갑으로 Unifi 노드에 직접 위임한 KAIA만 인정**(타 지갑 위임 후 월렛 그룹 연동분 제외)인데, **화면 문구는 "Unifi 지갑 자산과 위임 수량을 동등 반영"으로 더 느슨하다** → 문구 정합성 확인 필요
- [x] ~~**프로덕션 리워드 탭 게임 미션 섹션 미노출 원인 확인**~~ → **2026-08-10 정상 노출 복귀 확인**(비로그인). 8/3 미노출은 Season 3 전환 중 일시 현상으로 정리
- [x] ~~**🆕 Unifi Pay Direct의 사용자 화면 편입 여부 추적**~~ → ✅ **2026-09-03 편입 확인**. 오프라인 QR 결제 화면이 프로덕션·Beta 양쪽에 출시됐다(§2-9). 남은 것은 어휘 확정 → **승인 대기 ⑦**
- [ ] 🆕 **결제용 「사전 충전(top-up)」 잔액의 정체 확인** — 가이드가 "충전된 잔액에서 결제된다"고 하는데, 예치(Plus/Basic)·지갑 잔액과 어떤 관계인지 화면·기획 확인 필요. `pay_` 하위에 충전 화면이 별도로 있는지도 미확인
- [x] ~~🆕 **홈 상단 「Pay」 버튼 실측**~~ → ✅ **2026-09-07 해소**. **로그인 홈 헤더의 [pay] 아이콘**이며 **비로그인 홈에는 없다**(옆에 [QR]=입금·[알림] 아이콘 동반). 스캔 화면(`/pay/qr/mpm`)까지 실측 완료(§2-9)
- [ ] **🆕 Beta 홈 「함께하면 더 큰 혜택, KAIA & USDT」 부제 수치 이상** — **"最大0%の報酬"** 노출(프로덕션 4.2%). **2026-09-07까지 6주 연속 재현**, 이번엔 **로그인 상태에서도 동일** — 데이터 미로딩 시 0 폴백으로 보이며 **FE 확인 권장**(비로그인 한정이 아님이 확인됐다)
- [ ] **🆕 mini 출석 체크의 자격 조건 확인** — 풀 모드는 "100 USDT 이상 예치" 문구가 있는데 mini에는 예치 조건 문구가 없다. JPYC 기준 조건이 별도인지, 문구 누락인지 기획 확인 필요.
  🆕 **2026-09-07 참고**: 풀 모드는 **게임 미션에도** "Deposit 100 USDT or more" 조건 문구가 붙어 있다(§2-2). **mini는 스켈레톤 재발로 재확인 불가** → 다음 회차 이월
- [ ] **mini 이자 노출 정책 충돌 확인** — 위키 스펙은 "mini 예치금·이자 노출 불가"인데 Beta mini에 이자 표기가 **5주 연속 실측**됐다. 2026-09-03 수치가 「최대 연 5%」 → 「最大年2%」로 하향.
  🔴 **2026-09-07 충돌 범위 확대**: mini **자산 탭(`/my`) JPYC 카드에도 「最大年2%の利息を受け取る」**가 노출된다(리워드 탭 밖). 정책 변경인지 Beta 한정인지, 2%의 근거가 무엇인지 **확인 시급**
- [ ] **NFT 어휘 정정 — 사용자 결정 대기(2026-07-27 보류)**: `asset_nft_01` → `apps_mypage_nft_01` 제안(라우트 `/apps/my-page/nfts` 근거)에 대해 사용자가 "대기" 결정. **확정 전까지 두 어휘 모두 신규 부여에 사용 금지** — 이 화면에 Screen ID가 필요해지면 먼저 이 건을 재확인받는다.
- [x] ~~**Kaia CR(Contribution Reward) 미션 출시 추적**~~ → **2026-07-30 출시 실측 완료** (`/reward/kaia` — §2-2-1). 어휘는 아래 승인 대기 ②
- [ ] **⛔ 승인 대기 ② (신규 2026-07-30)**: `/reward/...` 영역 주기능 어휘 — 현재 `reward_`는 GNB 리워드 탭(`/benefits/daily-mission`)에 쓰고 있어 **충돌**. 후보 ⓐ `reward_boost_usdt_01`·`reward_staking_kaia_01`(현재 잠정 표기) ⓑ 별도 주기능 `staking_` 신설. **확정 전까지 이 영역에 Screen ID 부여 금지**
- [x] ~~입금 **브릿지**(멀티 네트워크 입금) 상세 화면 확인~~ → ❌ **2026-09-07 배너 자체가 제거돼 종결**. `/deposit`이 **KAIA 단일 네트워크 안내**로 정리되고 JPYC은 **jpyc.co.jp 외부 구매 유도 2단계**로 교체됐다(§2-3). 부활 시 새 항목으로 기록
- [x] ~~**Beta 액션 라벨 개편의 프로덕션 반영 시점 추적**~~ → **2026-08-10 프로덕션 반영 확인**(보내기·채우기·교환하기·은행출금). **구 라벨이 남은 XLT·위키 문구는 교체 대상**(용어집 v3.9~v4.0 `보내기` 개편과 연동)
- [x] ~~**K-Pick KR IP 정책 재확인 — 구 정책 기재 폐기 검토**~~ → ⚠️ **2026-09-03 판정 정정: 폐기하지 않는다.** 프로덕션 `/benefits`를 함께 본 결과 **KR IP에서는 배너 3종만 노출되고 카테고리·바우처·시술·K-컬처가 전부 미노출**이었다. Beta의 전체 열람은 정책 폐기가 아니라 **Beta 환경이 IP 게이팅을 적용하지 않은 것**으로 판단한다. `kpick_kr_block_01` 기재 **유지**
- [ ] **K-Pick 탭의 프로덕션 GNB 승격 추적** — Beta·mini는 5탭(K-Pick 포함)인데 프로덕션은 **6주째 4탭**이다(2026-09-07 로그인에서도 4탭). 승격 시점 확인.
  ⚠️ 단 프로덕션에 **`/benefits`·`/benefits/k-pick/*` 라우트는 이미 열려 있다** — GNB 노출만 남은 상태로 보인다
- [ ] **🆕 USDT 이율 변경의 문서 파급 확인** — PLUS **5% → 7%**(2026-08-06 발효, BASIC 3% 유지, Boost 포함 최대 10%). 위키·XLT·프로모션 문구에 **구 수치(5%·8%)** 가 남아 있으면 일괄 교체 대상
- [ ] **⛔ 승인 대기 ④ (2026-08-03 신설 · 08-10 갱신)**: 「외부 지갑 연결」 어휘 — 잠정 `asset_wallet_connect_01`. **프로덕션 반영이 확인돼 어휘 확정 필요성이 올라갔다**. 내 자산 헤더 케밥 메뉴 소속이라 `asset_` 유지가 자연스러우나, 연결 플로우가 Apps/지갑 영역으로 갈 수 있어 **확정 전 부여 금지**
- [ ] **⛔ 승인 대기 ⑥ (신규 2026-08-10)**: 🆕 **누적 이자 화면 어휘** — 잠정 `asset_interest_usdt_01`(라우트 `/interest/usdt`). 라우트가 `/my` 밖 최상위라 `asset_`가 맞는지, 토큰별 화면이 늘어날 것을 감안해 `asset_interest_{token}_01` 패턴으로 갈지 확정 필요. **확정 전 부여 금지**
- [ ] **⛔ 승인 대기 ⑦ (신규 2026-09-03)**: 🆕 **결제(Unifi Pay) 주기능 어휘** — 오프라인 QR 결제가 사용자 화면으로 출시됐다(§2-9). 후보 ⓐ **`pay_` 주기능 신설**(`pay_qr_guide_01`·`pay_qr_scan_01` — 라우트가 `/pay/...` 최상위라 가장 자연스럽다) ⓑ `apps_` 하위 편입 ⓒ `asset_` 하위 편입. **확정 전 부여 금지**
- [ ] **⛔ 승인 대기 ⑧ (신규 2026-09-03)**: 🆕 **K-Pick 상품 상세 어휘** — `/k-pick/{카테고리}/{상품ID}`가 Unifi 내부 화면으로 편입됐다(§2-7). 후보 ⓐ `kpick_product_detail_01` ⓑ 카테고리별 분화(`kpick_shopping_detail_01`·`kpick_beauty_detail_01`·`kpick_pop_detail_01`). **일부 상품은 여전히 외부 `guidekim.me`라 "내부/외부 혼재"의 표기 방식도 함께 결정**해야 한다. `kpick_` 프리픽스 확정(승인 대기 ③)과 묶어서 결정. **확정 전 부여 금지**
- [ ] **⛔ 승인 대기 ⑨ (신규 2026-09-07)**: 🔴 **「Preferred Stable」 설정 어휘** — 마이 › Display에 기준 스테이블코인 선택 항목이 신설됐다(§2-5).
  후보 ⓐ `my_setting_preferred_stable_01` ⓑ `my_setting_stable_01` ⓒ 기존 통화 설정과 묶어 `my_setting_display_*` 계열로 정리.
  ⚠️ **단순 설정 항목이 아니다** — 이 값이 홈 자산 카드 순서·히어로 이율·가이드 카드 구성을 바꾸므로 **§0-0-1의 변형 축(①-b)으로 승격**됐다. **확정 전 부여 금지**
- [ ] **⛔ 승인 대기 ⑩ (신규 2026-09-07)**: 🔴 **K-Pick 클리닉 섹션 어휘** — K-美容 목록 안에 「クリニック」 섹션(필터 4종·클리닉 19곳·[お問い合わせ])이 신설됐다(§2-7).
  후보 ⓐ `kpick_clinic_01`(목록) + `kpick_clinic_detail_01`(상세) ⓑ K-美容 하위로 `kpick_beauty_clinic_01` ⓒ 카테고리 목록의 한 섹션으로 보고 별도 ID 없음.
  ※ 이 저장소 **clinic 위키 작업의 대상 화면**이므로 어휘 확정이 위키 Screen ID 부여와 직결된다. 승인 대기 ③·⑧과 **묶어 결정**. **확정 전 부여 금지**
- [ ] **⛔ 승인 대기 ⑪ (신규 2026-09-07)**: 🆕 **K-Pick 체크아웃 어휘** — `/k-pick/{카테고리}/{상품ID}/checkout`이 확인됐고 진입이 **LINE MINI app 전용**(커머스용 MINI app `2008994549-CGfrtgSs`)이다.
  후보 ⓐ `kpick_checkout_01` ⓑ `kpick_product_checkout_01` ⓒ MINI app 전용이므로 `_mini` 접미.
  ⚠️ **판매 주체가 Afformation Inc.(GuideKim)** 임이 특정상거래법 표기로 확인됐다 — 「Unifi 화면인가」 판정 기준을 도메인이 아니라 **판매 주체·운영 주체**로 볼지 함께 결정. **확정 전 부여 금지**
- [ ] 🆕 **mini 홈 ↔ K-Pick 탭 중복 판단** — mini 홈(`/benefits-mini`)이 K-Pick 화면과 사실상 같아졌다(§2-7).
  🔴 **2026-09-07 중복이 완전해졌다** — 양쪽 모두 **같은 허브 구성**(배너 + 카테고리 4아이콘 + JPYC 가이드)으로 축소됐다. 별도 화면으로 볼지, 같은 화면의 진입 경로 차이로 볼지 **결정 시급**
- [ ] 🆕 **NEXT Bay 미션의 어휘 분리 여부** — 라우트는 게임 미션 상세(`/benefits/games/{uuid}`)와 같은 계열인데 **성격이 커머스 구매 미션**이다. `reward_mission_game_detail_01`에 포함할지 분리할지 확인
- [ ] **⛔ 승인 대기 ⑤ (신규 2026-08-03)**: **비로그인 변형 어휘 방식** — 홈처럼 섹션 구성이 통째로 다른 화면에 별도 ID를 줄지(`home_main_guest_01` 등), 같은 ID의 상태로 볼지 결정 필요(§0-0-1). 환경 변형(`_wallet`/`_mini`) 접미 방식과 표기를 통일할지도 함께 확정
- [ ] **미실측 축 조합 해소 (§0-0-1 커버리지 표)** — ~~ⓐ 프로덕션 로그인~~(2026-08-10 해소) ⓑ **LIFF 진입**(LINE 인앱 브라우저) ⓒ **JP IP** ⓓ **해외 IP = Wallet Mode**(US·CA·UK·SG) ⓔ **approve 미완료 계정** ~~ⓕ mini 비로그인~~(2026-08-10 해소).
  ⚠️ 현재 IA의 Wallet Mode·LIFF·JP 기재는 **전부 위키 스펙 근거**이고 실측이 아니다 — **실제 접속 환경(VPN·해외 IP·LIFF 링크·실기기 캡처)으로만 승격**한다. **Beta 디버그 패널의 국가 모킹은 쓰지 않는다**(위 결정)
- [ ] **mini `draw-promotion` LINE 앱 전용 게이트 어휘** — 잠정 없음. 웹에서는 딤+다이얼로그로만 접근되므로 `promo_luckyball_lineonly_01_01` 류 팝업 어휘 필요 여부 확인
- [ ] Wallet Mode 실기기/실IP 실측 (US/UK/CA/SG IP 필요 — 여전히 위키 스펙 근거) ※ **Unifi mini는 2026-07-30 Beta로 실측 착수**(`/benefits-mini` 계열)
- [ ] `kpick_` 프리픽스 확정 (K-Pick 탭 주기능 어휘 — 기존 XLT는 UF_/mini_guidekim_) · **2026-07-30 Beta에서 GNB 정식 탭 승격·카테고리 3종 개편 실측** → 승인 대기 ③
- [ ] 🆕 **Apps 카테고리 `SocialFi` 소멸 확인 (2026-09-07)** — 카테고리가 **8종 → 7종**(AI·CONTENT·DePIN·GAME·Payment·SOCIAL·ETC)으로 줄고 앱 수도 27 → 26이 됐다.
  카테고리 폐지인지 해당 앱이 빠져 카테고리가 자동 숨김된 것인지 확인 필요(다음 회차 재확인 — 앱 수는 매주 변동하므로 **카테고리 구성만** 판정 대상)
- [ ] 프로모션 프리픽스 `promo_` vs `event_` 확정 (현재 `promo_` 잠정)
- [ ] Wallet Mode/mini 전용 변형 어휘(`_wallet`/`_mini` 접미 방식) 사용자 확정
- [ ] 은행송금(Sentbe)·SkyFlag의 mini 연동 방식 확정 시 트리 갱신
- [ ] 매주 월 10:00 정기 점검 시 위 항목 재확인 + 신규 메뉴/기능 탐지
