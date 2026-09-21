# Unifi IA 주간 점검 리포트 — 2026-09-21 (#8)

| 항목 | 내용 |
|---|---|
| 점검 대상 | **프로덕션** `www.unifi.me` (비로그인 + **로그인**, KR IP) + **Beta** `unifi-web.line-apps-beta.com` (비로그인 + **로그인**) + **Unifi mini Beta** (`?liff_id=2008994547-GfGUdDxy` → `/benefits-mini`) |
| 점검 방법 | ① 인앱 브라우저 375px로 프로덕션·Beta·mini **비로그인 전 범위** 순회 ② 점검 도중 **사용자가 로그인을 제공** → Chrome(프로덕션 로그인)·**인앱 브라우저(Beta 로그인)** 로 로그인 영역 순회 ③ 공지사항 목록으로 정책 교차 확인 ④ `location.href`·콘솔·대시 블록 수를 **스크립트로 직접 측정**해 리다이렉트·스켈레톤을 판정 |
| 점검 간격 | 직전 #7(2026-09-14)로부터 **7일** — 정상 주기 |
| 정본 파일 | `md/IA.md` |
| 이번 회차 특징 | 🔴 **스켈레톤이 「비로그인 해소 / 로그인 고착」으로 갈렸다** · 🔴 **KAIA 이율 표기 3중 불일치(ko 4.2% / en 4.1% / Beta 0%)** · 🔴 **Beta K-Pick 허브 전면 개편** · ✅ **이월 4건 해소**(캐시백 조회·Beta 로그인·관심 Apps·리워드 비로그인) · ⛔ **#7 기재 3건 정정** |
| 결과 | IA.md 갱신 **O** · 승인 대기 **12건**(신설 0 · ⑫는 **근거 약화로 재검토**) · 이월 **4건 해소 · 4건 신규** |
| 안전 제약 준수 | 조회·탐색만. 출석하기·뽑기·위임(Delegate)·송금·QR 결제·상품 구매·클리닉 문의 등 상태 변경 액션 **일절 미실행**. **카메라 권한 미허용**. **직접 로그인 시도 없음**(세션 만료 확인 후 대기 → 사용자가 직접 로그인). Beta 디버그 패널 **미사용** |

---

## 1. 점검 범위 (실제 방문 라우트)

**프로덕션 비로그인(인앱)** — `/` · `/benefits/daily-mission` · `/announcement` · `/apps` · `/apps/market` · `/benefits`(→ **홈 리다이렉트 확인**) · `/benefits/k-pick/beauty` · `/pay/campaigns/offline` · `/pay/qr/mpm/guide` · `/reward/usdt` · `/reward/kaia` · `/my`(→ 로그인 게이트)

**프로덕션 로그인(Chrome + 인앱)** — `/`(로그인 홈) · `/my` · `/setting` · `/reward/kaia` · `/apps` · `/apps/trade/swap` · `/apps/my-page/nfts` · `/deposit` · `/benefits/daily-mission` · **`/pay/campaigns/offline?campaignStatus=view`**

**Beta 비로그인(인앱)** — `/`(홈) · `/benefits`(K-Pick 허브) · `/benefits/k-pick/beauty|shopping|pop` · `/benefits/daily-mission`

**Beta 로그인(인앱 — 이번 회차 첫 성공)** — `/my`

**Unifi mini Beta(인앱)** — `/benefits-mini` · `/benefits-mini/daily-mission` · `/benefits-mini/luckyball-invite`

> 🧭 **점검 창구 교훈 — Beta 로그인은 인앱 브라우저로 한다.**
> **Chrome은 Beta 도메인 접근이 차단**되지만(`Navigation to this domain is not allowed` — #7과 동일), **인앱 브라우저는 Beta에 접속되고 사용자 세션이 그대로 살아 있다.**
> #7에서 "Chrome 차단 + 인앱 세션 없음"으로 포기했던 **이월 3번이 이 조합으로 해소**됐다. 다음 회차부터 **프로덕션 로그인=Chrome·인앱 / Beta·mini 로그인=인앱**으로 고정한다.
>
> 🧭 **판정은 눈이 아니라 측정으로.** `/benefits` 리다이렉트는 `location.href`로, 스켈레톤은 **대시 블록 수 카운트**로 확정했다. #6·#7에서 "빈 화면 = 소멸"로 오판할 뻔한 전례를 피하는 방법이다.

---

## 2. 🔴 최대 변경 ① — 리워드 탭 스켈레톤이 「비로그인 해소 / 로그인 고착」으로 갈렸다

#7의 최우선 이월(프로덕션 리워드 탭 전면 고착)은 **절반만 풀렸다.**

| 대상 | #7 (2026-09-14) | **#8 (2026-09-21)** |
|---|---|---|
| 프로덕션 `/benefits/daily-mission` **비로그인** | ❌ 스켈레톤 | ✅ **정상 — 전부 렌더** |
| 프로덕션 `/benefits/daily-mission` **로그인** | ❌ 스켈레톤 | ❌ **여전히 고착(20초 후 대시 31개 · 2회 재현)** |
| Beta 웹 `/benefits/daily-mission` | ✅ 정상 | ✅ 정상 |
| Beta mini `/benefits-mini/daily-mission` | ✅ 정상 | ✅ 정상 |

**비로그인에서 렌더된 것(= #7에 가려져 못 본 영역이 전부 회복됐다)**: 카운트다운 `22:37:39 remaining` · Reward 0 USDT · Lucky ball 0 · 출석 체크 5일 진행도 + CTA `Check In` · 게임 미션 6종(Squishy Cat Jump 0/6 · MERGE CAT 0/6 · Tap Tap Jello 0/5 · Hook & Gold 0/7 · Rich Match 0/6 · SODA MERGE 2048 0/5) · Explore Apps

### 2-1. ⛔ #7의 진단 근거를 정정한다 — `401`은 원인이 아니다

#7은 콘솔 `ACCESS_DENIED`(401)를 고착의 근거로 들었다. 그러나 이번 회차 **비로그인에서도 같은 401이 찍히는데 화면은 완전히 정상**이었다.
→ **401은 비로그인에서 사용자별 미션 API를 호출한 정상 결과**이고, 고착의 원인은 별개다. 로그인 상태에서만 재현되므로 **사용자 데이터 의존 렌더 경로**를 봐야 한다.

> ⛔ **최우선 이월 유지.** 스켈레톤은 7/27 이후 환경을 옮겨 다니며 **여섯 번** 나타났다 뒤집혔다(프로덕션↔Beta↔mini, 로그인↔비로그인). **종결하지 않고 매 회차 로그인·비로그인 양쪽을 확인**한다. **FE 확인 권장.**

---

## 3. 🔴 최대 변경 ② — KAIA 스테이킹 이율 표기가 환경·언어마다 다르다 (XLT 확인 대상)

**같은 날 같은 계정으로 측정했는데 세 값이 다르다.**

| 화면 | 값 |
|---|---|
| 프로덕션 **한국어**(로그인) — 홈 배너 「최대 4.2% 보상에 특별 혜택까지!」 · 내 자산 KAIA 카드 「최대 연 4.2% 이자 받으세요」 · `/reward/kaia` 「최대 연 4.2%의 보상」 **3곳 모두** | **4.2%** |
| 프로덕션 **영문**(비로그인) — 홈 「Up to 4.1% rewards + special perks!」 · `/reward/kaia` 「up to 4.1% annual rewards」 | **4.1%** |
| **Beta 영문**(로그인) — 내 자산 KAIA 카드 「Stake KAIA and Earn up to **0%** annual interest」 | **0%** |

### ⛔ #7 판정 정정

#7은 「4.2% → 4.1% 하향 · 홈·자산·`/reward/kaia` 3곳 일치」로 기록했고, 인용 문구가 **한국어**였다(「최대 4.1% 보상에 특별 혜택까지!」).
그런데 이번 회차 **한국어 3곳은 전부 4.2%** 다. 한국어 XLT가 되돌아갔는지 #7 기록이 부정확했는지는 이 점검만으로 가릴 수 없다.

**확정할 수 있는 것은 하나다 — 현재 ko 4.2% / en 4.1%로 갈려 있다.** 이 저장소의 XLT 파이프라인과 직결되는 건이므로 **어느 값이 정본인지부터 확정**해야 위키·XLT·프로모션 교체 방향을 정할 수 있다.

또한 **Beta의 「0%」가 홈 배너뿐 아니라 내 자산 KAIA 카드에도 나타난다** — 8주 연속 추적 중인 0% 이슈와 같은 뿌리로 보이며 **노출 범위가 확대**됐다.

---

## 4. 🔴 최대 변경 ③ — Beta K-Pick 허브가 풀 카탈로그로 전면 개편

#7이 「허브로 축소」로 판정했던 Beta `/benefits`가 **다시 풀 카탈로그**가 됐고, 구성 자체가 바뀌었다.

| 요소 | #7 (2026-09-14) | **#8 (2026-09-21)** |
|---|---|---|
| 성격 | 허브만(카탈로그 없음) | **허브 + 풀 카탈로그** |
| 히어로 | JPYC 배너 → 「Up to 15% cashback!」 | **"Korea Trip, Where to Start? / OLIVE YOUNG, DAISO & more — Buy early, get up to 15%"** + 브랜드 칩 4종 |
| 카테고리 아이콘 | **4종** K-Beauty·K-Shopping·K-Culture·My Reservation | 🆕 **5종 Clinics · K-Beauty · Esthetic · Tours & Tickets · Activities** |
| 클리닉 | 카테고리 목록 안에만 | 🆕 **허브로 승격** — 「10% 이상 캐시백 클리닉」 10곳 + **리뷰 수 TOP 18 랭킹**(평점·리뷰 수·캐시백 %) |
| 큐레이션 | mini 홈에만 | 🆕 **Beta 웹 허브에도** — 쥬베룩(밀리클리닉 도산)·리쥬란(청담봄온)·포텐자(델픽) |
| 신설 섹션 | — | 🆕 **Trending K-Beauty Care**(K-Beauty/Esthetic 탭) · **Popular Must-Visit Itinerary**(Activities/Tours & Tickets 탭) · **K-POP Idol Tour** · **「1,000 JPY OFF」 쿠폰 블록** |

- ⚠️ **허브 아이콘(5종) ↔ 카테고리 라우트(3종)가 1:1이 아니다** — 라우트는 `k-pick/{beauty|shopping|pop}` 그대로다. **Screen ID 어휘를 아이콘 기준으로 잡을지 라우트 기준으로 잡을지** 승인 대기 ③·⑩과 묶어 결정해야 한다.
- ✅ **「15%」는 환원율 상향이 아니다** — 허브가 **할인 5% + 캐시백 10%를 합산 표기**하는 것이다(카테고리 목록은 「5% OFF」+「10% cashback」으로 분리). 환원 10% 균일은 유지된다.
- 🆕 **K-Beauty가 「Korean Beauty & Aesthetic Care」로 확장** — 에스테틱 서비스 20종(헤어·마사지·스파·퍼스널컬러 · 15~25% OFF)이 앞에 오고 클리닉 섹션이 아래 붙는다. 클리닉 카드에 **시술명 태그**(Juvelook·Rejuran·Potenza·Laminate Veneers·Dental Implant)와 **강점 불릿 4종**이 추가됐다.

### 4-1. 🔴 mini 홈과 다시 완전히 같아졌다 — 3주 연속 판정 번복

| 회차 | 판정 |
|---|---|
| #6 (09-07) | mini 홈 = Beta 웹 허브 **완전 중복** |
| #7 (09-14) | **번복** — mini 홈에만 카탈로그, Beta 웹은 허브만 |
| **#8 (09-21)** | **재번복** — Beta 웹이 풀 카탈로그가 되면서 **다시 완전 동일**(문구·상품·클리닉 랭킹까지 일치) |

➡️ **구성 스냅샷으로 Screen ID 어휘를 정하면 매주 무너진다.** #7이 제안한 **「허브 + (환경별) 카탈로그」 구조 정의**를 채택하자는 안을 **사용자 결정 대상으로 올린다**(§8).

---

## 5. ✅ 해소된 이월 항목 4건

| 이월 | 결과 |
|---|---|
| **1. 프로덕션 리워드 탭 전체**(최우선) | 🔶 **부분 해소** — 비로그인은 정상 렌더되어 가려졌던 영역을 전부 확인했다. **로그인 고착은 유지**(§2) |
| **2. 캐시백 조회 「View my cashback」 무반응** | ✅ **해소 — 정상 동작한다.** 동작하지 않는 진입점이 아니었다. **별도 화면이 아니라 같은 페이지에 「My Cashback Status」 블록이 인라인 삽입**되는 방식이라 #7이 변화를 놓친 것이다.<br>구성: **Cashback you've received 0 USDT** · **Amount paid offline 0 USDT** · **History** 링크 · 추첨 상태 **「Not entered」**. 진입 후 URL에서 쿼리가 제거된다 |
| **3. Beta·mini 로그인 영역** | ✅ **해소 — 인앱 브라우저로 가능**(§1 교훈). Beta `/my` 첫 실측: 액션 **Send·Deposit·Swap·Bank Withdraw** · USDT 「Max 7%」 · KAIA 「Max additional 3%」+**「up to 0%」** · JPYC 「Max 2%」 · **비상장 토큰 4종 BO·GRT·SIK·YOO**(각 10,000 · 「Unlisted」) · Owned NFTs 0 · GNB 5탭 |
| **6. Apps 「나의 관심 Apps」의 정체** | ✅ **해소 — 로그인 전용 섹션**이다. 같은 날 비로그인/로그인 대조로 확정했다. Editor's Pick을 **대체하지 않고 추가**된다. (남은 확인: 즐겨찾기인지 추천인지 — 등록된 계정 필요) |

### 5-1. ⛔ #7 기재 정정 3건 — Apps 「구조 변경 3건」은 변경이 아니었다

같은 날 비로그인·로그인을 **대조 측정**한 결과, #7이 「구조 변경」으로 기록한 3건 중 **2건은 축 변형**이었다.

| 요소 | **비로그인**(영문·USD) | **로그인**(한국어·KRW) | 판정 |
|---|---|---|---|
| 게임 프로모션 캐러셀 | **5종**(LEGEND WAR·Endless Frontier2·LORDNINE·Siege Of Titans·Seal M) | **3종**(LEGEND WAR·오늘도 환생2·Siege Of Titans) | **로그인 축 변형** |
| 「나의 관심 Apps」 | ❌ 없음 | ✅ 있음 | **로그인 전용** |
| 시세 출처 | CoinMarketCap USDT $0.99 · Binance KAIA $0.03 | Bithumb USDT ₩1,366 · CoinMarketCap KAIA ₩42 | **통화 설정 연동** |
| Apps 수 | **25개** | **25개** | 🔴 **실제 변경(26 → 25)** |

- ⛔ **「오늘도 환생2 신규 / Endless Frontier2 미노출」은 오기다** — 같은 게임의 언어별 표기다. 문구가 1:1 대응한다:
  en "Endless Frontier2 / **Rebirth** today for Epic Rewards!" ↔ ko "오늘도 **환생**2 / 오늘 바로 환생하고 epic 보상을 받으세요!"
- ⛔ **「USDT 시세 출처가 Bithumb으로 교체」도 변경이 아니다** — 출처는 통화 설정을 따른다(KRW→Bithumb / USD→CoinMarketCap).
- 🔴 **실제 변경은 Apps 수뿐** — 26개 → **25개**(비로그인·로그인 양쪽에서 동일하게 25개).

---

## 6. 🆕 그 밖의 신설·변경

| 구분 | 내용 | 환경 |
|---|---|---|
| 🆕 **NEXT Bay 특별 미션이 프로덕션으로 승격** | 리워드 탭 **최상단 배너** "Complete the special mission on NEXT Bay game marketplace / and get up to 100 USDT". #5부터 **「프로덕션 미노출」**로 기재해 온 항목의 **기재 정정** | 프로덕션·Beta·mini |
| 🔴 **프로덕션 `/benefits`가 홈으로 리다이렉트된다** | `location.href` 실측으로 `https://www.unifi.me/`로 치환됨을 확인. #7까지 **K-Pick 허브(배너 3종)** 화면이었다. **하위 `k-pick/*`·`daily-mission`은 그대로 열려 있어 허브 진입점만 닫혔다**. Beta는 유지 → **프로덕션 한정** | 프로덕션 |
| 🆕 **`/apps/market`에 「Ranking」 탭 신설** | 상단 탭이 **Buy · Sell · Ranking** 3종으로 확장. 기간 필터 **「Daily」** + 기준일(2026.09.21) + 툴팁 + 랭킹 7건(BlueSL · BlueSL2nd · Dr.Paws · Slime Miner Gold Gears · "Nani-kiru" Membership Card · Chiwat's Golden Pack · Bubbleheroes DingDing). ⚠️ 비로그인이라 **순위 값이 전부 `-`** | 프로덕션 |
| 🔴 **KAIA CR STAGE 2 → STAGE 3 전환** | **1R 9.21~10.1 진행 중** / 2R 10.1~10.11 예정 / 3R 10.11~10.21 예정. 이율 4.1%(영문)·0.449999 KAIA/10 USDT·7일 쿨다운은 동일 | 프로덕션 |
| 🆕 **CR 유의사항 영문 전문 실측** | **6개월 분할 지급 + 매월 [Claim Rewards] 수동 수령**(자동 입금 아님) · 미분배 CR은 **약 90일(3 Epochs) 후 영구 소각** · 참여 총액이 **상한 5,000만 USDT** 초과 시 보상 비율 비례 축소(표시 이율은 확정값 아님) | 프로덕션 |
| 🔴 **mini GNB가 3탭이다** | mini 하단 탭이 **Home · Reward · My** 3종(**K-Pick·Assets 없음**). IA의 **「mini Beta = 5탭」 기재와 어긋난다**. 같은 시점 **Beta 웹은 5탭**이므로 **mini 한정 축소** — 다음 회차 재확인 후 §0 표 수정 | mini |
| 🔴 **프로덕션 JPYC 카드에 「최대 연 2%」** | 종전 2% 충돌 기록은 **mini 한정**이었는데, 프로덕션 로그인 `/my`의 JPYC 카드(한국어)·Beta `/my`(「Max 2%」)에 모두 붙는다. **§0 표의 「JPYC 이자 제공 (최대 연 5%)」 기재가 낡았을 가능성** | 프로덕션·Beta·mini |
| 🆕 **로그인 홈 누적 이자 인라인 노출** | USDT 카드에 「누적 이자 0.000109 USDT」. #7의 "0에 가까우면 인라인이 안 보인다"와 달리 **소수점 6자리까지 노출**된다 | 프로덕션 |
| ✅ **캐시백 캠페인 배너 = 비로그인 전용 재확인** | 로그인 홈 배너 목록에 「Pay with QR, get 10% back」이 **없다** — #7 기재(승인 대기 ⑤ 근거) 유지 | 프로덕션 |
| 🆕 **K-Shopping 바우처 12종 → 13종** | 🆕 **TOM N TOMS Iced Americano** 추가. #7에서 **mini 전용 신규**로 기록한 상품이 **Beta 웹에도 올라왔다**. ※ 「이마트」의 정본 표기는 **emart24**(영문 UI 실측) | Beta·mini |
| 🆕 **캠페인 가맹점 목록 실측** | 강남구 탭 **43건**(F&B 31 · Clothing/Fashion Accessories 5 · Pharmacy/Medicine 5 · Clinic 2 · Services/Other 1). 정책(10%·상한 50 USDT·500 USDT 추첨 10명·10/31·한국 거주자 제외·11월 중순 지급)은 **#7과 완전히 동일** | 프로덕션 |
| 🆕 **출석 CTA 라벨의 환경 변형** | 프로덕션 **「Check In」** / Beta 웹·mini **「Get Lucky Ball」**(비로그인 기준). 같은 버튼의 상태·환경 변형 | 전 환경 |
| 🆕 **mini Special Missions 구성 확정** | ⓐ NEXT Bay 배너 ⓑ **"Unlimited missions and Up to ¥30,000 instantly / Game / Ad / Survey missions"**(SkyFlag 계열) 2블록. #6에서 제목·본문만 렌더됐던 영역의 정상 구성 | mini |
| 🔴 **mini 「외부 게임 미션」 한국어 노출 2주 연속 재현** | "Game mission / Complete game missions to earn JPYC" 아래 항목이 **「외부 게임 미션」 한국어 그대로** + "Before proceeding with mission 0/2". **일시 현상이 아니다 — XLT 키 확인 대상** | mini |
| ⚠️ **mini JPYC 이자 배너 2주 연속 미노출** | 자리에 「JPYC: Japan's 1st Approved Digital Yen! / How to Buy & Use JPYC」 구매 가이드 배너. **배너는 사라지고 카드 배지(「Max 2%」)로 옮겨간 것**으로 보이나 단정하지 않는다 | mini |
| 공지사항 | **신규 0건** — 최신은 2026-09-10 캐시백 공지 그대로. Season 4(9/1~10/1) 정책 변동 없음 | 프로덕션 |

### 6-1. ⚠️ K-Pick 가격 표기 이상 (FE·데이터 확인 권장)

**같은 상품·같은 할인율인데 허브와 카테고리 목록의 가격이 다르다.**

| 상품 | 허브(`/benefits`) | 카테고리(`/benefits/k-pick/*`) |
|---|---|---|
| Juno Hair 홍대 1호점 | ¥26,086 | ¥18,941 |
| Hoso 도산청담점 | ¥3,030 | ¥1,265 |
| Marzia 힐링스파 | ¥35,435 | ¥16,106 |
| **마리엠 헤어&헤드스파** | 🔴 **¥25,294,160** | ¥21,821 |
| K-Pop 걸그룹 스타일링 촬영 | ¥259,854 | ¥255,503 |

- **마리엠 ¥25,294,160(2천5백만 엔)** 은 명백한 이상치다 — 카테고리 값의 **1,000배 이상**.
- **Beta 웹·mini 양쪽에서 동일하게 재현**되므로 환경 문제가 아니라 **데이터·바인딩 문제**로 보인다.

---

## 7. 변경 없음 확인 항목

| 영역 | 확인 |
|---|---|
| GNB | 프로덕션 **4탭**(홈·리워드·내 자산·마이) — 로그인에서도 4탭 · Beta 웹 **5탭**(+K-Pick). **K-Pick 승격 8주째 미반영** |
| 내 자산 액션 | **보내기 · 채우기 · 교환하기 · 은행출금** 4종 + 총자산 우측 **거래내역** — 동일(Beta는 Send·Deposit·Swap·Bank Withdraw) |
| 홈 구성(비로그인) | QR 결제 히어로 · 「Earn up to 10% interest! / Up to 10% annual rate」 · 플러스 모드 7% · 캐시백 캠페인 · 부스트 3% · 데일리 미션 · Best Rate Benefits · Better Together · Get more interest · 가이드 6종 · FAQ 6종 — 동일 |
| `/reward/usdt` (Boost) | 티어 **300,000 / 400,000 / 500,000 KAIA = 1 / 2 / 3%** · 최대 100,000 USDT · 지갑 잔액 + 위임 KAIA 합산 · **무기한** · 00:00 UTC+0 일일 갱신 — 동일 |
| `/setting` | 이메일 인증 완료 · 생체 인증 패스키 · 간편 비밀번호 · 개인 키 · **언어 한국어 / 선호 스테이블 코인 JPYC / 통화 KRW** · 알림 설정 · FAQ · 문의하기 · 오픈소스 라이선스 · 로그아웃 · 계정 탈퇴 — 동일 |
| `/deposit` | KAIA 단일 네트워크 · 「KAIA 네트워크의 모든 토큰은 동일한 지갑주소를 사용합니다」 · 스테이블 코인/다른 토큰 탭 · JPYC·USDT·IDRP · **JPYC 2단계 안내 + [JPYC 입금 가이드 보기]** — #7과 동일 |
| `/apps/trade/swap` | From/To·잔고·[최대]·방향 전환·[교환]만 — **AlphaSec 배너 소멸 상태 유지**(#7 종결 판정 유효) |
| `/apps/my-page/nfts` | 「NFT 없음 / 지갑에 보유하고 있는 NFT가 없어요」 — 동일 |
| `/apps` 카테고리 | **7종**(AI·CONTENT·DePIN·GAME·Payment·SOCIAL·ETC) — **3주 연속** 확인, `SocialFi` 폐지 판정 유지 |
| `/apps/market` Drops | Live & Upcoming / Past / Now · **Dr.Paws 500 KAIA · 1,000개 · 0.8%** — 동일 |
| `/pay/qr/mpm/guide` | 사전 충전(top-up) 안내 · QR Pay 2단계 · [Start QR payment] — 동일 |
| 프로덕션 `/benefits/k-pick/*` | 라우트 개방 · **KR IP 카탈로그 0건**(탭 3종 K-Beauty/K-Shopping/K-Culture만) — `kpick_kr_block_01` 유지 |
| Beta K-Culture | **22건 · 환원 7% 균일** · 태그 **ja(ソウル·京畿道·仁川) + en(KPOP·Show Ticket) 혼재 재현** — 동일 |
| Beta 클리닉 | **18곳** · 필터 4종(All / Dermatology & Plastic Surge / Dentistry / Ophthalmology) · **캐시백 5~15% 카드별 차등** — 동일 |
| mini `luckyball-invite` | 비실시간 지급(2주 이내) · Pending / Paid rewards · 「0 / 20 people」 · 유의사항 · 최대 20개 — 동일 |
| 로그인 게이트 | Google / LINE / Naver / Kakao / Apple · "Powered by LINE NEXT" · "Don't miss the up to 10% annual rate!" · `/auth/sign-in?returnUrl=` — 동일 |
| Season 4 | 9/1~10/1 · 스냅샷 100 USDT · 출석 3·5일 · 게임 6종 중 3종 · 럭키볼 — 신규 공지 없음 |

---

## 8. ⛔ 사용자 승인 대기 — Screen ID 어휘 12건 (신설 0 · ⑫ 재검토)

| # | 항목 | 잠정 어휘 | 상태 |
|---|---|---|---|
| ② | `/reward/...`(부스트·스테이킹) 주기능 — GNB 리워드 탭과 충돌 | `reward_boost_usdt_01` / `reward_staking_kaia_01` vs 별도 `staking_` | 유지 |
| ③ | K-Pick 주기능 프리픽스 | `kpick_` | **쟁점 추가** — 허브 아이콘 5종 ↔ 라우트 3종 불일치(§4). ⑧·⑩·⑪과 묶어 결정 |
| ④ | 외부 지갑 연결 | `asset_wallet_connect_01` | 유지 |
| ⑤ | 비로그인 변형 어휘 방식 | `home_main_guest_01` 등 | **근거 대폭 강화** — 이번 회차에 **Apps·홈·리워드 3개 화면이 로그인 여부로 구성이 갈린다**는 것이 대조 측정으로 확정됐다(§5-1) |
| ⑥ | 누적 이자 화면 | `asset_interest_usdt_01` | 유지 |
| ⑦ | 결제(Unifi Pay) 주기능 어휘 | ⓐ `pay_` 신설 ⓑ `apps_` 하위 ⓒ `asset_` 하위 | **⑫와 함께 결정** |
| ⑧ | K-Pick 상품 상세 어휘 | ⓐ `kpick_product_detail_01` ⓑ 카테고리별 분화 | 유지 |
| ⑨ | 「선호 스테이블 코인」 설정 어휘 | ⓐ `my_setting_preferred_stable_01` ⓑ `my_setting_stable_01` ⓒ `my_setting_display_*` | **ⓐ 유리 유지**(한국어 라벨 재확인) |
| ⑩ | K-Pick 클리닉 섹션 어휘 | ⓐ `kpick_clinic_01`+`_detail_01` ⓑ `kpick_beauty_clinic_01` ⓒ 별도 ID 없음 | **쟁점 추가** — 클리닉이 **허브로도 승격**돼 「카테고리 안의 섹션」이라는 ⓒ 근거가 약해졌다(§4) |
| ⑪ | K-Pick 체크아웃 어휘 | ⓐ `kpick_checkout_01` ⓑ `kpick_product_checkout_01` ⓒ `_mini` 접미 | 유지(미진입) |
| ⑫ | 오프라인 결제 캐시백 캠페인 화면 어휘 | ⓐ `pay_campaign_offline_01`(+조회 `_01_01`) ⓑ `promo_pay_offline_01` ⓒ `pay_cashback_01` | 🔴 **재검토 필요** — 캐시백 조회가 **별도 화면이 아니라 같은 화면의 로그인 상태 변형**임이 확인돼(§5) **별도 ID `_01_01` 안의 근거가 약해졌다** |

> ⛔ **NFT 어휘 정정**(`asset_nft_01` → `apps_mypage_nft_01`)은 #1부터 "사용자 대기" 상태다. 두 어휘 모두 신규 부여 금지.

### 8-1. 🔴 어휘 밖 결정 요청 — K-Pick 화면 정의 방식

**3주 연속 판정이 뒤집혔다**(§4-1). 구성 스냅샷 기준으로는 어휘가 유지되지 않는다.
➡️ **「허브 + (환경별) 카탈로그」 구조로 정의**하자는 안에 대한 결정을 요청한다. 승인 시 ③·⑩의 쟁점도 함께 정리된다.

---

## 9. ⬜ 미점검 — 다음 회차 이월

| # | 항목 | 왜 못 했나 | 필요한 접근 수단 |
|---|---|---|---|
| 1 | 🔴 **프로덕션 리워드 탭 로그인 상태**(최우선) | **로그인 한정 스켈레톤 고착**(§2) | FE 수정 후 재확인 |
| 2 | 🔴 **KAIA 이율 정본 확정**(ko 4.2% / en 4.1% / Beta 0%) | 화면 측정만으로는 어느 값이 정본인지 가릴 수 없다 | 기획·FE 확인 + XLT 등록값 대조 |
| 3 | 🔴 **mini GNB 3탭의 확정**(기재는 5탭) | 1회 실측 — 변경인지 로그인 상태 차이인지 미확정 | 다음 회차 재확인(비로그인·로그인 대조) |
| 4 | 🔴 **K-Pick 가격 표기 이상**(¥25,294,160 등) | 화면 관측만 가능 | FE·상품 데이터 확인 |
| 5 | 🆕 **`/apps/market` Ranking 탭의 정렬 기준·기간 옵션** | 비로그인에서 순위 값이 전부 `-` | 로그인 상태 재진입 |
| 6 | 🆕 **「나의 관심 Apps」가 즐겨찾기인지 추천인지** | 실측 계정에서 **빈 상태** | 관심 등록된 계정 또는 기획 확인 |
| 7 | **mini 로그인 영역**(mini `/my` · mini Reward 로그인 상태) | mini `/my`는 **LINE 로그인 리다이렉트** — 직접 로그인 금지로 중단 | LINE 세션 제공 또는 LINE 앱 캡처 |
| 8 | **`/benefits-mini/draw-promotion`** | LINE 앱 전용 게이트 | LINE 앱 캡처 |
| 9 | **QR 결제 스캔 이후 단계**(금액 입력·결제 확인) | 카메라 권한 미허용 + 상태 변경 액션 | 사용자 캡처 또는 진행 허용 지시 |
| 10 | **결제용 「사전 충전(top-up)」 잔액의 정체** | 가이드 문구로만 확인 — 충전 화면 미발견 | 기획 확인 |
| 11 | **K-Pick 체크아웃 화면** | LINE MINI app 전용 진입 + 구매 플로우 | LINE 앱 캡처 |
| 12 | **클리닉 [Inquire] 이후 화면** | 문의 전송은 상태 변경 액션 | 캡처 또는 진행 허용 지시 |
| 13 | **「내 예약」 라우트** | Web·mini 모두 `href="#"` | FE 구현 대기 |
| 14 | **프로덕션 K-Pick 카탈로그** | KR IP 게이팅으로 0건 | JP IP |
| 15 | **Wallet Mode 전체**(US·CA·UK·SG IP) · **JP IP** · **LIFF 환경** · **approve 미완료 계정** | 접근 환경 없음 | VPN·LIFF 링크·신규 계정·캡처 |
| 16 | 위임(Delegate) 입력·확인, 송금 2단계·QR, 거래 상세, `/payout`, 계정 탈퇴, 외부 지갑 연결 플로우 | 상태 변경 액션 — 의도적 미진입 | 진행 허용 지시 |

### 9-1. 계속 이월(추적 중)

| 항목 | 사유 |
|---|---|
| **Beta 「Up to 0% rewards」** | **8주 연속 재현** · 🔴 **이번 회차 범위 확대** — 홈 배너뿐 아니라 **내 자산 KAIA 카드**에도 나타난다. FE 확인 권장 |
| **K-Pick 탭 프로덕션 GNB 승격** | **8주째 4탭**. 🔴 **이번 회차는 오히려 뒤로 갔다** — `/benefits` 허브가 홈으로 리다이렉트되기 시작해 「GNB 노출만 남았다」는 기존 판단을 **보류**한다 |
| **프로덕션 `/benefits` 리다이렉트의 의도** | 의도된 정리인지 사고인지 미확인 |
| **JPYC 이율 2%의 정본 여부** | 프로덕션·Beta·mini 카드 배지가 모두 2%인데 §0 표는 「최대 연 5%」 — 기재 갱신 전 정책 확인 필요 |
| **mini 「외부 게임 미션」 한국어 노출** | **2주 연속** — XLT 키 누락 확인 대상 |
| **K-Culture 태그 언어 혼재** | ja(지역) + en(장르) 혼재 지속 — 태그 다국어화 대상인지 기획 확인 |
| **부스트 정책 문구 정합성** | 공지(종료일 명시) vs 화면(상시 운영) · 티어 인정 범위 차이 — 기획 확인 |
| **USDT 5%→7% 문서 파급** | 위키·XLT·프로모션 구 수치 교체 — IA 점검 범위 밖, 별도 작업 |

---

## 10. IA.md 갱신 위치 요약

| 섹션 | 변경 |
|---|---|
| 분석 이력 | **2026-09-21 주간 점검 #8** 행 추가 |
| §0-3 라우트 참고 | 🔴 **프로덕션 `/benefits` → 홈 리다이렉트** 전문 |
| §2-1 home | 🔴 **KAIA 배너 수치 「3곳 일치」 판정 정정**(ko 4.2% / en 4.1% / Beta 0%) |
| §2-2 reward | 🔴 **스켈레톤 「비로그인 해소 / 로그인 고착」 분기** · ⛔ **401=원인 아님 진단 정정** · 🆕 **NEXT Bay 프로덕션 승격**(「미노출」 기재 정정) |
| §2-2-1 reward(부스트·스테이킹) | 🔴 **STAGE 3 전환**(1R 9.21~10.1) · 🆕 **CR 유의사항 영문 전문**(6개월 분할·수동 수령·90일 소각·5,000만 USDT 상한) |
| §2-3 asset | 🔴 **KAIA 카드 한국어 4.2%** · **JPYC 「최대 연 2%」** · 🆕 **로그인 실측 전문**(카드 순서가 홈과 다름 — Preferred Stable을 따르는 것은 홈) |
| §2-4 apps | ✅ **「구조 변경 3건」 = 로그인×통화 축 변형** 대조표 · ⛔ **#7 기재 2건 정정** · 🔴 **26→25 Apps** · 🆕 **`/apps/market` Ranking 탭** |
| §2-7 mini/K-Pick | 🔴 **Beta 허브 전면 개편 전문** · 🔴 **mini 홈 재번복** · 🔴 **카테고리 목록 개편**(K-Beauty 확장·바우처 13종·emart24) · ⚠️ **가격 표기 이상** · 🔴 **외부 게임 미션 2주 연속** · 🆕 **Special Missions 구성·출석 CTA 변형** |
| §4 미확정 | 스켈레톤 **로그인 한정으로 범위 축소** · ✅ **이월 3건 종결**(캐시백 조회·Beta 로그인 창구·관심 Apps) · 🔴 **신규 4건**(이율 3중 불일치·mini GNB 3탭·JPYC 2%·가격 이상) · **승인 대기 ⑫ 재검토** · K-Pick 승격 **8주째**·Beta 0% **8주째** 갱신 |

---

*작성: Claude Code 스케줄 태스크 `weekly-unifi-ia-check` · 절차 정본 `md/ia-check.md` · 다음 실행: 2026-09-28(월) 10:00*
