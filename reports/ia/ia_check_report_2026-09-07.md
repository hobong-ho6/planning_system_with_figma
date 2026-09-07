# Unifi IA 주간 점검 리포트 — 2026-09-07 (#6)

| 항목 | 내용 |
|---|---|
| 점검 대상 | **프로덕션** `www.unifi.me` (비로그인 + **로그인**, KR IP) + **Beta** `unifi-web.line-apps-beta.com` (비로그인 + **로그인**) + **Unifi mini Beta** (`?liff_id=2008994547-GfGUdDxy` → `/benefits-mini`, **로그인**) |
| 점검 방법 | ① 인앱 브라우저 375px로 프로덕션 비로그인 순회 ② **사용자가 세션 중 Chrome에 프로덕션·Beta 양쪽 로그인** → 로그인 영역 전체 순회(#5 이월 1번 해소) ③ 공지사항 목록으로 정책 변경 교차 확인 |
| 점검 간격 | 직전 #5(2026-09-03)로부터 **4일** — 정상 주기 복귀 |
| 정본 파일 | `md/IA.md` |
| 이번 회차 특징 | 🔴 **마이 설정에 「Preferred Stable」 신설**(화면 변형 축이 하나 늘었다) · 🔴 **로그인 홈 전면 개편**(토큰별 3카드 + 프로모션 모달 + 헤더 3아이콘) · 🔴 **K-Pick 2단 구조 재편** · 🔴 **K-美容에 클리닉 섹션 신설(19곳)** · 🆕 **QR 스캔 화면·구매 체크아웃 라우트 실측** · 🔴 **mini Reward 스켈레톤 재발** |
| 결과 | IA.md 갱신 **O** · 승인 대기 **11건**(⑨·⑩·⑪ 신설) · 이월 **4건 해소**, **1건 재발** |
| 안전 제약 준수 | 조회·탐색만. 출석하기·뽑기·위임(Delegate)·송금·**QR 결제 시작**·**상품 구매([Buy now]·체크아웃)** 등 상태 변경 액션 **일절 미실행**. **카메라 권한 미허용**. 직접 로그인 시도 없음(사용자가 로그인) |

---

## 1. 점검 범위 (실제 방문 라우트)

**프로덕션 비로그인(인앱 브라우저)** — `/` · `/announcement` · `/benefits` · `/benefits/daily-mission` · **`/benefits/k-pick/beauty`(프로덕션 신규 개방)** · `/pay/qr/mpm/guide` · `/reward/usdt` · `/reward/kaia` · `/apps` · `/apps/market` · `/k-pick/shopping/bizcon-S0213607` · `/k-pick/shopping`(→홈 리다이렉트) · `/my`→`/auth/sign-in`

**프로덕션 로그인(Chrome)** — `/`(로그인 홈) · `/my` · **`/my` 케밥 메뉴** · `/setting` · `/notification` · `/my/token/transaction` · `/interest/usdt` · `/transfer` · `/deposit` · `/apps/trade/swap` · `/apps/my-page/nfts` · **`/pay/qr/mpm`(스캔 화면 — 신규 실측)** · `/benefits` · `/benefits/k-pick/beauty`

**Beta 로그인(Chrome)** — `/`(홈) · `/benefits`(K-Pick 허브) · **`/benefits/k-pick/beauty|shopping|pop`** · `/my`

**Unifi mini Beta 로그인(Chrome)** — `/benefits-mini` · `/benefits-mini/k-pick/beauty` · `/benefits-mini/daily-mission` · `/benefits-mini/luckyball-invite` · `/benefits-mini/draw-promotion` · `/my`(mini 자산)

> 🧭 **새 점검 교훈 — 인앱 브라우저로 K-Pick을 판정하지 않는다.** 인앱 브라우저에서 Beta·프로덕션 K-Pick 카테고리 목록이 **빈 화면**으로 보였는데, 원인은 **HTTP 403·429**(자동 접근 차단)였다. 같은 라우트를 사용자 Chrome으로 열자 카탈로그가 정상 렌더됐다. **K-Pick 카탈로그 유무는 반드시 Chrome으로 교차 확인**한다.

---

## 2. 🔴 최대 변경 ① — 마이 설정에 「Preferred Stable」 신설: 화면 변형 축이 하나 늘었다

`/setting`(마이) › **Display** 섹션에 신규 항목이 생겼다.

| Display 섹션 | 값(실측) |
|---|---|
| Language Settings | English |
| 🆕 **Preferred Stable** | **JPYC** |
| Currency Settings | KRW (₩) |

**이것이 단순 설정이 아닌 이유** — 이 값이 화면 구성을 바꾼다.

| 영향 | 실측 |
|---|---|
| 홈 자산 카드 **순서·기본 탭** | Preferred Stable = JPYC인 프로덕션 계정에서 홈 탭이 **JPYC → USDT → IDRP** 순(구 기재는 USDT 우선) |
| 홈 히어로 **이율 수치** | USDT 기준 「최대 연 10%」 vs JPYC 기준 「최대 연 2%」 |
| 가이드 카드 구성 | JPYC 기준일 때 **「Learn about JPYC」** 카드가 노출(프로덕션 로그인 홈에서 실측 — #5까지 Beta 전용으로 기재돼 있었다) |

> ⛔ **IA 판정 정정**: 그동안 「Beta는 JPYC 기준 환경이라 히어로 수치가 다르다」로 **환경(①) 탓**으로 적어 온 기재가 있다. 실제로는 **사용자 설정(①-b)** 이 기준 자산을 바꾼다. `md/IA.md` §0-0-1에 **축 ①-b**를 신설했다.
>
> ⛔ **Screen ID 영향**: 승인 대기 ⑨ 신설(어휘 미확정 — 부여 금지).

---

## 3. 🔴 최대 변경 ② — 로그인 홈 전면 개편 (#5 이월 「Pay 버튼」 해소)

로그인 홈과 비로그인 홈은 **같은 화면의 빈 상태가 아니라 다른 화면**이다.

| | 비로그인 `/` | **로그인 `/`** |
|---|---|---|
| 헤더 | "Log In · Sign Up" | 🆕 **[pay] · [QR] · [알림]** 3아이콘 |
| 최상단 | **QR 결제 히어로 배너** + 「Earn up to 10% interest!」 히어로 | ❌ 둘 다 없음 → 🆕 **토큰별 자산 3카드** |
| 자산 | 없음 | 🆕 「JPYC Balance」·「USDT Balance(3% Annually · **Total Interest**)」·「IDRP Balance」 — 카드마다 **[Deposit]** + 유도 문구 |
| 진입 팝업 | 없음 | 🆕 **플러스 모드 프로모션 모달** |
| 섹션 순서 | Check USDT → Check KAIA | **Check KAIA → Check USDT** |
| 「Get more interest」 섹션 | 있음 | ❌ 없음 |

### 3-1. ✅ 이월 항목 해소 — 「Pay」 버튼은 로그인 전용이다

#5에서 "가이드가 홈 상단 「Pay」 버튼을 진입점으로 지목하나 비로그인 홈 헤더에 없다"로 이월했던 항목이 해소됐다.

- **로그인 홈 헤더 좌→우: `[pay]`(스캐너 프레임 안 pay 글자) · `[QR]` · `[🔔 알림]`**
- **[pay]** → `/pay/qr/mpm` (QR 결제 스캔)
- **[QR]** → `/deposit` (입금하기) — 🆕 입금 진입점이 홈 헤더에 추가된 것도 신규 실측
- 비로그인 홈 헤더에는 **셋 다 없다**

### 3-2. 🆕 신설 요소

| 요소 | 실측 문구 |
|---|---|
| 🆕 **플러스 모드 프로모션 모달** | "Hold USDT in Plus Mode and **Earn 7% annual interest** / Don't miss out!" · **[Start Earning 7%]** · **[Don't show for 7 days]** · [X] |
| 🆕 **IDRP 카드 유도 문구** | "**Buy IDRP and swap for USDT to earn up to 10% annual interest, paid daily**" |
| 🆕 **홈 미션 유도 카드** | 「Receive USDT rewards daily / Complete daily missions from check-ins to games」 — **프로덕션·Beta 공통**, 「Check USDT Benefits」 섹션 소속 |
| 🆕 **누적 이자 진입점 변경** | 구 「누적이자 N USDT를 받았어요」 배너 소멸 → **USDT 카드 안 「Total Interest N USDT」 인라인 표기**가 `/interest/usdt` 진입점 |

> ⛔ **Screen ID 영향**: 승인 대기 ⑤(비로그인 변형 어휘)의 **판단 근거가 결정적으로 강해졌다** — 홈은 "빈 상태 차이"가 아니라 구성이 통째로 다르다.

---

## 4. 🔴 최대 변경 ③ — K-Pick이 「허브 + 카테고리 목록」 2단 구조로 재편

Beta K-Pick 탭(`/benefits`)과 mini 홈(`/benefits-mini`)에서 **카탈로그가 전부 빠지고 카테고리 목록 라우트로 내려갔다.**

| | #5 (2026-09-03) | **#6 (2026-09-07)** |
|---|---|---|
| Beta `/benefits` (K-Pick 탭) | 카테고리 4아이콘 → **바우처 12종** → JPYC 가이드 → **스킨부스터** → **K-컬처** | 🆕 **허브로 축소** — JPYC 배너 → 「최대 15% 환원!」 배너 → 카테고리 4아이콘 → JPYC 구매 가이드 |
| mini 홈 `/benefits-mini` | 위와 사실상 동일(카탈로그 포함) | 🆕 **Beta 허브와 완전히 동일**(카탈로그 없음) + 로그인 시 「進行中のご予約があります」 툴팁 |
| 카테고리 목록 `/benefits/k-pick/*` | 신설 라우트(카탈로그 20건+) | **카탈로그의 정본 화면이 됐다** |

- ⚠️ **소멸이 아니라 이관**이다 — Chrome 로그인으로 카테고리 목록을 열면 K-美容 20건+·K-買い物 바우처 12종·K-カルチャー 전부 정상 렌더된다.
- 🔴 **mini 홈 ↔ K-Pick 탭 중복이 완전해졌다** — 두 화면이 이제 같은 구성이다. 이월 항목의 결정이 시급하다.

### 4-1. 🔴 프로덕션에도 카테고리 라우트가 열렸다 — 단 KR IP에서는 빈 상태

| 환경 | `/benefits/k-pick/beauty` |
|---|---|
| **프로덕션 (KR IP · 로그인)** | 라우트 **개방**(200) — 단 상단 탭 3종만 렌더, **카탈로그 0건** |
| **Beta (KR IP · 로그인)** | 카탈로그 정상(K-美容 20건+ · 클리닉 19곳) |

> ➡️ **KR IP 게이팅이 카테고리 목록에도 적용된다.** `kpick_kr_block_01` 기재 **유지 근거가 강화**됐다(#5 판정 유지).
> 프로덕션 `/benefits`(허브)도 여전히 **배너 3종 축소판**이며, **로그인 상태에서도 동일**하다.

---

## 5. 🔴 최대 변경 ④ — K-美容에 「クリニック」 섹션 신설 (clinic 위키 작업 대상 화면이 라이브에 올라왔다)

`/benefits/k-pick/beauty`(Beta Web·mini 공통) 하단에 클리닉 섹션이 신설됐다.

| 요소 | 실측 |
|---|---|
| 필터 | **すべて / 皮膚・美容外科 / 歯科 / 眼科** (4종) |
| 카드 구성 | 병원명 · **평점(4.6~4.9) + 리뷰 수** · 지역(서울 강남구 등) · **시술 태그**(라미네이트·임플란트·쥬베룩·리쥬란·포텐자·울세라·서마지 등) · **[お問い合わせ](문의하기)** · **결제액 N% 캐시백**(5~15%) · 특징 배지 4종 · 카드별 헤드라인 |
| 실측 클리닉 | **19곳** — 루치과 · 뷰티온의원 명동 · **청담봄온의원** · 청담여신미용외과 · 티아나미용외과 · 더피크의원 · **DA미용외과** · 레디피부과 · 강남헤라미용외과 · 델픽의원 · 힐링안과 · 밀리클리닉 도산 · AB미용외과 · 톡스앤필 강동천호점 · POEN클리닉 · 원데이치과 · VS라인의원 강남점 · 루비미용외과 등 |

> ⚠️ **이 저장소의 clinic 위키 작업(청담봄온·DA미용외과 등)이 바로 이 화면이다.** 위키에서 다뤄 온 클리닉이 실제 라이브 카탈로그에 올라왔다.
> ⛔ **Screen ID 영향**: 승인 대기 ⑩ 신설. `kpick_` 프리픽스(③)·상품 상세(⑧)와 **묶어 결정**해야 한다.

---

## 6. 🆕 K-Pick 상품 상세 — 구매 동선·법정 표기·별도 MINI app이 붙었다

프로덕션 `/k-pick/shopping/bizcon-S0213607`(올리브영 5만원권) 재실측.

| 신설 요소 | 실측 |
|---|---|
| 🆕 **하단 고정 CTA** | **[Save purchase link]** · **[Buy now]** |
| 🆕 **체크아웃 라우트** | [Buy now] → **LINE MINI app intent** → `/k-pick/{카테고리}/{상품ID}/checkout` (fallback `miniapp.line.me/2008994549-CGfrtgSs/k-pick/shopping/{id}/checkout`) |
| 🆕 **커머스용 MINI app ID** | **`2008994549-CGfrtgSs`** — IA에 기재된 mini 점검 창구 `2008994547-GfGUdDxy`와 **다른 앱**이다. 「View more products」도 이 앱의 `/benefits-mini/k-pick/shopping`으로 유도 |
| 🆕 **특정상거래법 표기** | 「特定商取引法に基づく表記」 最終更新 **2026-06-23** · **판매 사업자 = Afformation Inc.**(운영 서비스 **GuideKim** · 대표 HYUNKEUN JI · 서울 강남 · 통신판매업 신고 2024-서울강남-07295) · "제휴 의료기관·매장·체험 사업자·여행 등 파트너가 실제 판매 주체가 되는 경우 해당 제휴처 조건이 적용된다" |
| 🆕 **이용 안내 아코디언** | 사용 불가 매장 전체 목록 · 변경/취소 규정 전문 |

- 가격은 **환율에 따라 매주 바뀐다**: #5 ¥5,851→¥5,266 / #6 **¥5,789→¥5,211**(10% OFF·캐시백 5%). 상수로 인용하지 않는다.
- `/k-pick/shopping`(목록)은 **여전히 프로덕션에서 홈으로 리다이렉트** — 목록은 `/benefits/k-pick/*` 계열이 담당한다.

> ⛔ **Screen ID 영향**: 승인 대기 ⑪ 신설. 그리고 **「Unifi 화면인가」의 판정 기준**을 도메인이 아니라 **판매·운영 주체**로 볼지가 승인 대기 ⑧의 핵심 쟁점이 됐다 — 화면은 `www.unifi.me`인데 판매 사업자는 Afformation(GuideKim)이다.

---

## 7. 🆕 `/pay/qr/mpm` 스캔 화면 실측 (#5 이월 2번 해소)

| 요소 | 실측 |
|---|---|
| 헤드라인 | **"Scan QR for offline payment"** |
| 안내 | "Please scan the payment QR code posted at the store. **Payment proceeds after scanning.**" |
| 🆕 **카메라 권한 다이얼로그** | "Please allow camera access. / Camera access is required to scan QR codes. Please allow camera access in Settings." · **[Grant Access]** · **[Cancel]** |

- **카메라 권한을 허용하지 않았고 결제도 실행하지 않았다.** 스캔 이후 금액 입력·결제 확인 단계는 여전히 미실측.
- 별도 팝업 어휘(`pay_qr_scan_01_01` 상당)가 필요하다 — 승인 대기 ⑦(pay 주기능)에 포함해 결정.

---

## 8. ❌ 입금 「브릿지」 배너 소멸 — 이월 항목 종결

`/deposit`(로그인) 재실측 결과 **멀티 네트워크 브릿지 진입점이 제거**됐다.

| | #4 (2026-08-10) | **#6 (2026-09-07)** |
|---|---|---|
| 브릿지 배너 | 있음(단 **클릭이 동작하지 않음** — FE 확인 대상으로 이월) | ❌ **배너 자체가 제거됨** |
| 네트워크 안내 | 멀티 네트워크(어떤 네트워크로 보내도 전액 도착) | 🆕 **"All KAIA network tokens use the same wallet address."** (KAIA 단일) |
| JPYC 안내 | 거래소 입금 3단계 | 🆕 **2단계로 교체** — ① "**Buy JPYC on jpyc.co.jp**" + **[View JPYC Deposit Guide]** ② "Check your JPYC balance" |
| 진입점 | 내 자산 [채우기] | 내 자산 [채우기] + 🆕 **로그인 홈 헤더 [QR] 아이콘** |

> ➡️ `asset_deposit_network_01`(브릿지)은 **Screen ID 부여 대상 아님**으로 처리했다. 부활하면 새 항목으로 기록한다.
> ⚠️ JPYC 입금이 **외부 구매처(jpyc.co.jp) 유도**로 성격이 바뀐 것은 기획상 눈여겨볼 변화다.

---

## 9. 🔴 mini Reward 스켈레톤 재발 — #5에서 종결한 항목이 4일 만에 재현

#5에서 "5주 묵은 스켈레톤 이슈 완전 종료(재발 시 새 항목으로 기록)"로 닫았던 항목이 재발했다.

| 대상 | #5 (2026-09-03) | **#6 (2026-09-07)** |
|---|---|---|
| 프로덕션 `/benefits/daily-mission` | ✅ 정상 | ✅ 정상(게임 6종·진행도 전부 렌더) |
| Beta 웹 `/benefits/daily-mission` | ✅ 정상 | ✅ 정상 |
| **Beta mini `/benefits-mini/daily-mission`** | ✅ 정상(비로그인) | ❌ **스켈레톤 — 로그인 상태 20초 후에도 고착** |

- 대시 블록 **16개** · `mission-users`·`missions` API **200** · 콘솔 에러 없음 → **#3과 동일한 프런트 렌더 이슈** 추정
- **가려진 영역**: 이자 배너(最大年2%) · Special Missions 카드 · Daily Mission 진행도 · **「매일 출석 체크」** · **NEXT Bay 배너** → 이 회차에 해당 항목들 **재확인 불가**
- 부분 렌더된 것: 섹션 제목 + Special Missions 본문("上限なしのミッションをクリアして 最大3万円相当を即時受け取る / ゲーム/広告/アンケートミッション")

> ⚠️ 이번엔 **Beta mini 로그인 한정**이다(프로덕션·Beta 웹 정상). **FE 확인 권장** · 다음 회차 최우선 재확인.

---

## 10. 🆕 그 밖의 신설·변경

| 구분 | 내용 | 환경 |
|---|---|---|
| 🔴 **mini 자산 액션이 3종** | Beta mini `/my` = **取引履歴 · 出金 · 入金 · 銀行出金** — **Swap 미노출**. ✅ §0 「mini 교환 미제공」 스펙의 **첫 실측 근거**. 🆕 ja 라벨 **出金**은 용어집 v3.9~v4.0 `보내기` 개편 방향과 일치 | mini |
| 🔴 **mini 자산에도 이자 표기** | mini `/my` JPYC 카드에 **「最大年2%の利息を受け取る」** — 이자 노출 충돌이 **리워드 탭 밖으로 확대** | mini |
| ❌ **mini 비상장 토큰 4종 소멸** | #4에서 Beta 전용으로 발견됐던 BO·GRT·SIK·YOO 미노출 | mini |
| 🆕 **프로덕션에 JPYC 「Max 2%」 배지** | 내 자산 JPYC 카드 — #5까지 Beta·mini 전용이던 표기가 프로덕션 반영 | 프로덕션 |
| 🆕 **자산 카드 유도 문구 확정** | USDT "Hold USDT in Plus Mode and **Earn 7% annual interest with no conditions**"(→`/plus/usdt`) · KAIA "**Stake KAIA and Earn up to 4.2% annual interest**"(→`/reward/kaia`) | 프로덕션 |
| ✅ **AlphaSec 한국어 노출 해소** | `/apps/trade/swap` 배너가 영문 UI에서 **"Trade KAIA on AlphaSec with Zero Fees!"** 로 정상 — #3의 XLT 누락 의심 건 **종결** | 프로덕션 |
| 🆕 **액션·화면 영문 라벨 확정** | 자산 액션 **Send / Deposit / Swap / Bank Withdraw** · 케밥 **Connect External Wallet** · 누적이자 **My USDT Total Interest / Total USDT Interest**, 배너 **"Earn Annual 7% in Plus Mode"·"Earn Up to 3% with KAIA Boost"** · 송금 안내 "Only tokens available for transfer are displayed; assets in **Lock-up/Plus Mode** and added external wallet assets are not included." | 프로덕션 |
| 🆕 **알림 유형 어휘** | **Login Notification**("You are logged in.") · **New IP login notification**("You logged in from a new IP.") · 필터 6종·30일 보관·"View N more" 묶기는 동일 | 프로덕션 |
| 🆕 **NFT 빈 상태** | "**No NFTs / You don't have any NFTs in your wallet.**" — 보유 0건에서는 **탭 3종이 노출되지 않는다** | 프로덕션 |
| 🆕 **게임 미션에도 예치 조건 문구** | "**Deposit 100 USDT or more** and complete 3 game missions to get a lucky ball." (출석과 동일 조건) | 프로덕션 |
| ❌ **Apps 카테고리 `SocialFi` 소멸** | 8종 → **7종**(AI·CONTENT·DePIN·GAME·Payment·SOCIAL·ETC) · **26 Apps**(9/3 27) · 수혜자 9,021,821명 · 1 KAIA=**$0.03** · 기준일 2026.09.07 | 프로덕션 |
| 🆕 **캐시백률 카테고리 단위 균일화** | K-美容·K-カルチャー **환원 7% 균일** / K-買い物 **환원 10% 균일**(올리브영 1만원권만 5%) — #5의 상품별 편차(5%·10%)와 다르다. **여전히 상수 인용 금지** | Beta·mini |
| 🆕 **K-컬처 신규 상품** | **DMZ 투어**(전문 가이드) · **난타(Nanta Show) 공연** · **JUMP 공연**(명보아트홀) | Beta·mini |
| 🆕 **Beta 홈 배너 교체** | 🆕 「お支払いで最大15%還元 / K-ビューティー・K-カルチャー・ショッピングの人気特典」(→`/benefits`) · ❌ #5의 「友だちにJPYCをプレゼントする」(mini luckyball-invite) 배너 **소멸** · 「Stablecoin Experience」가 `unifi-micro-promotion.website.line-apps-dev.com`으로 연결 | Beta |
| `/apps/market` 드롭 | **Dr.Paws**(500 KAIA · 1,000개 · 판매율 0.8%) — Buy/Sell·Drops 구조는 동일 | 프로덕션 |
| 공지사항 | **신규 공지 없음** — 최신이 2026-09-01 Season 4. 4일 사이 정책 공지 변동 0건 | 프로덕션 |

---

## 11. ⛔ 사용자 승인 대기 — Screen ID 어휘 11건 (⑨·⑩·⑪ 신설)

| # | 항목 | 잠정 어휘 | 상태 |
|---|---|---|---|
| ② | `/reward/...`(부스트·스테이킹) 주기능 — GNB 리워드 탭과 충돌 | `reward_boost_usdt_01` / `reward_staking_kaia_01` vs 별도 `staking_` | 유지 |
| ③ | K-Pick 주기능 프리픽스 | `kpick_` (기존 XLT는 `UF_`·`mini_guidekim_`) | **⑧·⑩·⑪과 묶어 결정 필요** |
| ④ | 외부 지갑 연결 | `asset_wallet_connect_01` (영문 라벨 **Connect External Wallet** 확정) | 유지 |
| ⑤ | 비로그인 변형 어휘 방식 | `home_main_guest_01` 등 | **근거 강화** — 로그인/비로그인 홈이 구성 자체가 다름(§3) |
| ⑥ | 누적 이자 화면 | `asset_interest_usdt_01` (`/interest/usdt`) | 유지 (진입점이 「Total Interest」 인라인으로 변경) |
| ⑦ | 결제(Unifi Pay) 주기능 어휘 | ⓐ `pay_` 신설 ⓑ `apps_` 하위 ⓒ `asset_` 하위 — 라우트가 `/pay/...` 최상위라 ⓐ가 자연스럽다 | **스캔 화면·권한 팝업 실측으로 하위 구조가 늘었다**(§7) |
| ⑧ | K-Pick 상품 상세 어휘 | ⓐ `kpick_product_detail_01` ⓑ 카테고리별 분화 | **쟁점 추가** — 판매 주체가 Afformation(GuideKim)임이 확인돼 「Unifi 화면 판정 기준」(도메인 vs 판매·운영 주체)을 함께 결정해야 한다 |
| **⑨** | 🔴 **「Preferred Stable」 설정 어휘** | ⓐ `my_setting_preferred_stable_01` ⓑ `my_setting_stable_01` ⓒ 통화 설정과 묶어 `my_setting_display_*` | **신규 — 확정 전 부여 금지.** 단순 설정이 아니라 **화면 변형 축(①-b)** 이다 |
| **⑩** | 🔴 **K-Pick 클리닉 섹션 어휘** | ⓐ `kpick_clinic_01`+`kpick_clinic_detail_01` ⓑ `kpick_beauty_clinic_01` ⓒ 카테고리 목록의 한 섹션(별도 ID 없음) | **신규 — 확정 전 부여 금지.** clinic 위키 작업과 직결 |
| **⑪** | 🆕 **K-Pick 체크아웃 어휘** | ⓐ `kpick_checkout_01` ⓑ `kpick_product_checkout_01` ⓒ MINI app 전용이므로 `_mini` 접미 | **신규 — 확정 전 부여 금지.** 진입이 커머스용 MINI app(`2008994549-CGfrtgSs`) 전용 |

> ⛔ **NFT 어휘 정정**(`asset_nft_01` → `apps_mypage_nft_01`)은 #1부터 "사용자 대기" 상태로 유지된다. 두 어휘 모두 신규 부여 금지.

---

## 12. 변경 없음 확인 항목

| 영역 | 확인 |
|---|---|
| GNB | 프로덕션 **4탭**(Home·Reward·Assets·My) — **로그인 상태에서도 4탭** · Beta·mini **5탭**(+K-Pick). **K-Pick 승격 6주째 미반영** |
| `/reward/usdt` (Boost) | 티어 300,000/400,000/500,000 KAIA = 1/2/3% · **무기한(no expiration date)** · 최대 100,000 USDT · 위임 KAIA 합산 — 동일 |
| `/reward/kaia` (CR) | **STAGE 2** · 1R 8.22–9.1 Ended / **2R 9.1–9.11 In progress** / 3R 9.11–9.21 Scheduled · "Unlock Idle Rewards"·"Wake up special rewards"·[View Total Rewards] · 분배 정책(1:10·최저 잔고·6개월 분할·수동 Claim·90일 소각·5,000만 USDT 캡·KAIA Square) — 동일 |
| Season 4 | 기간 9/1~10/1 · 스냅샷 100 USDT · 출석 3·5일(월 12/24개) · 게임 6종 중 3종(월 30개) · 럭키볼 5티어(500/20/5/1/0.02) — **공지 전문 대조 동일** |
| 게임 미션 6종 | Squishy Cat Jump · MERGE CAT · Tap Tap Jello · Hook & Gold · Rich Match · SODA MERGE 2048 — 동일 |
| `/apps` 구조 | 게임 프로모션 캐러셀 5종(Endless Frontier2·LORDNINE·Seal M·Siege Of Titans·LEGEND WAR) · Editor's Pick 3종(PetPoP·Legend War·Skylands) · USDT Reward Missions 3건 · KAIA Reward Missions 0건 — 동일 |
| 프로덕션 `/benefits` | 배너 3종 축소판(15% 캐시백 · Daily Missions for JPYC · Get more JPYC with friends) — **로그인에서도 동일** |
| `/transfer` | 안내문(락업/플러스 모드·외부 지갑 제외) · 토큰 필터(All/Stablecoin) — 동일 |
| `/my/token/transaction` | 필터 4종(3 months·All Tokens·All·Newest) · 항목 "Received | Base Interest" — 동일 |
| `/setting` 나머지 | Email Verified · Biometric Passkey Registered · Passcode · View Private Key · Notification Settings · FAQ · Contact Us · Open Source Licenses · Logout · 계정 삭제 — 동일 |
| mini `luckyball-invite` | 비실시간 지급 블록(지급 예정/지급 완료) · 「達成した友だち 0/20人」 · 유의사항 6종 · 최대 20개 — 동일 |
| mini `draw-promotion` | LINE 앱 전용 게이트 유지(「LINEアプリで参加できます。今すぐ参加しますか？」/[確認]) |
| mini 푸터 | 어그리게이터 약관 **없음** 유지 (Unifi·Unifi ウォレット·개인정보·마케팅만) |
| 로그인 게이트 | Google/LINE/Naver/Kakao/Apple · "Powered by LINE NEXT" · "Don't miss the up to 10% annual rate!" — 동일 |
| `/pay/qr/mpm/guide` | 3단계 안내·[Start QR payment] ×2 — 동일 |

---

## 13. ⬜ 미점검 — 다음 회차 이월

| # | 항목 | 왜 못 했나 | 필요한 접근 수단 |
|---|---|---|---|
| 1 | 🔴 **mini Reward 탭 전체**(이자 배너·Special Missions·「매일 출석 체크」·NEXT Bay 배너) | **스켈레톤 재발로 렌더 안 됨**(§9) | FE 수정 후 재확인 — **최우선** |
| 2 | 🆕 **QR 결제 스캔 이후 단계**(금액 입력·결제 확인) | **카메라 권한 미허용 + 결제는 상태 변경 액션** | 사용자 캡처 또는 진행 허용 지시 |
| 3 | 🆕 **결제용 「사전 충전(top-up)」 잔액의 정체** | 가이드 문구로만 확인 — 충전 화면을 찾지 못했다 | 기획 확인 |
| 4 | 🆕 **K-Pick 체크아웃 화면**(`/k-pick/{cat}/{id}/checkout`) | **LINE MINI app 전용 진입 + 구매 플로우** | LINE 앱 캡처 |
| 5 | 🆕 **클리닉 카드 [お問い合わせ] 이후 화면** | 문의 전송은 상태 변경 액션 | 캡처 또는 진행 허용 지시 |
| 6 | **「マイ予約」 라우트** | Web·mini 모두 `href="#"` — **로그인 상태에서도 라우트 없음**(재확인 완료) | FE 구현 대기 |
| 7 | 🆕 **프로덕션 K-Pick 카탈로그** | KR IP 게이팅으로 0건 | JP IP 필요 |
| 8 | **Wallet Mode 전체**(US·CA·UK·SG IP) | 해외 IP 없음 | VPN 또는 캡처 |
| 9 | **LIFF 환경**(LINE 인앱 브라우저) | LINE 앱에서만 열림 | LIFF 링크 + 캡처 |
| 10 | **JP IP**(K-Pick JP Only·교환 미제공 검증) | JP IP 없음 | JP VPN 또는 JP 사용자 캡처 |
| 11 | **approve 미완료 계정** | 기존 계정은 approve 완료 | 신규 테스트 계정 |
| 12 | **`/benefits-mini/draw-promotion` 내용** | LINE 앱 전용 게이트 | LINE 앱 캡처 |
| 13 | **위임(Delegate) 입력·확인**, `View all`, `View Total Rewards` | 상태 변경 액션 — 의도적 미진입 | 캡처 또는 진행 허용 지시 |
| 14 | 송금 2단계·QR, 거래 상세, `/payout`, 계정 탈퇴, 외부 지갑 연결 플로우 | 상태 변경 액션 | 진행 허용 지시 |

### 13-1. 이번 회차에 해소·정리된 이월 항목

| 항목 | 결과 |
|---|---|
| **로그인 영역 전체**(#5 이월 1번) | ✅ **해소** — 사용자가 세션 중 Chrome에 프로덕션·Beta 로그인. `/my`·`/setting`·`/notification`·`/my/token/transaction`·`/interest/usdt`·`/transfer`·`/deposit`·`/apps/trade/swap`·`/apps/my-page/nfts`·`/pay/qr/mpm`·Beta `/my`·mini 전체 순회 완료 |
| **홈 상단 「Pay」 버튼**(#5 이월 2번) | ✅ **해소 — 로그인 전용 헤더 아이콘**. 스캔 화면까지 실측(§3-1·§7) |
| **입금 브릿지 상세**(#4~) | ❌ **배너 제거로 종결**(§8) |
| **swap 「AlphaSec」 한국어 노출**(#3~) | ✅ **해소** — 영문 정상 번역 |
| **`/k-pick/{카테고리}` 목록의 프로덕션 개방**(#5 이월 4번) | ⚠️ **부분 해소** — `/benefits/k-pick/*`는 개방됐으나 **KR IP에서 카탈로그 0건**. `/k-pick/shopping`은 여전히 홈 리다이렉트 |
| **mini 로그인 상태**(#5 이월 5번) | ⚠️ **부분 해소** — mini 홈·K-Pick·자산·luckyball-invite는 실측, **Reward 탭은 스켈레톤으로 불가** |
| **「내 예약」 라우트**(#5 이월 6번) | ⚠️ **확인 완료 — 라우트 없음**. 로그인 상태에서도 `href="#"`(툴팁만 노출) |
| **리워드 탭 스켈레톤**(#5 종결) | 🔴 **재발** — Beta mini 로그인 한정(§9). 새 추적 항목으로 등록 |

### 13-2. 그 밖의 계속 이월

| 항목 | 사유 |
|---|---|
| **Beta 홈 「最大0%の報酬」 표기** | **6주 연속 재현** · 🆕 이번엔 **로그인 상태에서도 동일**(비로그인 한정 아님이 확인됐다) — FE 확인 권장 |
| **mini 이자 노출 정책 충돌** | **5주 연속** · 🔴 충돌이 **자산 탭까지 확대**(mini `/my` JPYC 카드 「最大年2%」) — 정책 확인 시급 |
| **mini 출석 체크 자격 조건** | 스켈레톤 재발로 재확인 불가. 참고: 풀 모드는 **게임 미션에도** "Deposit 100 USDT or more" 조건 문구가 있다 |
| **K-Pick 탭 프로덕션 GNB 승격** | **6주째 4탭**. 단 라우트(`/benefits`·`/benefits/k-pick/*`)는 이미 개방 — GNB 노출만 남은 상태로 보인다 |
| **Apps 카테고리 `SocialFi` 소멸** | 카테고리 폐지인지 앱이 빠져 자동 숨김된 것인지 다음 회차 재확인 |
| **부스트 정책 문구 정합성** | 공지(종료일 명시) vs 화면(무기한) · 티어 인정 범위(공지=Unifi 노드 직접 위임만 / 화면=위임 수량 동등 반영) — 기획 확인 |
| **USDT 이율 5%→7% 문서 파급** | 위키·XLT·프로모션의 구 수치(5%·8%) 교체 여부 — IA 점검 범위 밖, 별도 작업 |

---

## 14. IA.md 갱신 위치 요약

| 섹션 | 변경 |
|---|---|
| 분석 이력 | **2026-09-07 주간 점검 #6** 행 추가 |
| §0 제품 모드 표 | 결제 행에 **스캔 화면·[pay] 버튼 실측** · mini 이자 행에 **자산 탭 확대** · **교환(Swap) 행에 mini 미제공 첫 실측 근거** |
| §0-0-1 축 매트릭스 | 🆕 **축 ①-b 「기준 스테이블 설정」 신설** · 홈 행 로그인 변형 상세화 · `/pay/qr/mpm` 실측 승격 · **체크아웃 라우트 행 신설** · 카테고리 목록 **프로덕션 개방(KR IP 0건)** · `/setting` Preferred Stable |
| §0-0-1 커버리지 표 | mini × KR IP × 로그인에 **09-07** 추가 |
| §0-3 라우트 참고 | 🆕 체크아웃 라우트 · 🆕 **커머스용 MINI app ID `2008994549-CGfrtgSs`** · ❌ **브릿지 소멸** |
| §2-1 home | 🔴 **로그인 홈 개편 전문** · 🆕 `home_promo_plus_01_01`(프로모션 모달) · 🆕 `home_benefit_mission_01` · 🆕 섹션 그룹 구조 주석 · 알림 유형 어휘 |
| §2-2 reward | 🆕 **게임 미션 예치 조건 문구** |
| §2-3 asset | 🆕 영문·일본어 액션 라벨 · 🆕 프로덕션 카드 유도 문구·JPYC Max 2% · 🆕 **Total Interest 인라인 진입점** · 🔴 **mini `/my` 액션 3종** · 🆕 `/deposit` 개편 · ❌ **`asset_deposit_network_01` 소멸 처리** · ✅ AlphaSec 해소 · 🆕 `/interest/usdt` 영문 라벨 |
| §2-4 apps | ❌ **카테고리 7종(SocialFi 소멸)·26 Apps** · 위젯 수치 갱신 · 🆕 NFT 빈 상태 |
| §2-5 my | 🔴 **`my_setting_preferred_stable_01` 신설** |
| §2-7 mini/K-Pick | 🔴 **허브 2단 재편** · 🔴 **클리닉 섹션 19곳** · 🆕 **구매 CTA·체크아웃·특정상거래법** · 🆕 K-컬처 신규 상품·캐시백 균일화 · 🔴 **mini 홈 허브 축소** · 🔴 **스켈레톤 재발** · ⚠️ **인앱 403 경고** |
| §2-9 pay | ✅ **스캔 화면·권한 다이얼로그 실측 승격** · 🆕 `pay_qr_entry_01` 진입점 확정 |
| §4 미확정 | 승인 대기 **⑨·⑩·⑪ 신설**(총 11건) · **스켈레톤 재발 항목 신설** · 브릿지·Pay 버튼 **해소 처리** · Beta 0%·mini 이자·K-Pick 승격 **주차 갱신** · 🆕 SocialFi 추적 항목 |

---

*작성: Claude Code 스케줄 태스크 `weekly-unifi-ia-check` · 다음 실행: 2026-09-14(월) 10:00*
