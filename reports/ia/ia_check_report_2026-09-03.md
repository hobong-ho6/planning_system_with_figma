# Unifi IA 주간 점검 리포트 — 2026-09-03 (#5)

| 항목 | 내용 |
|---|---|
| 점검 대상 | **프로덕션** `www.unifi.me` (비로그인, KR IP) + **Beta** `unifi-web.line-apps-beta.com` (비로그인) + **Unifi mini Beta** (`?liff_id=2008994547-GfGUdDxy` → `/benefits-mini`) |
| 점검 방법 | ① 인앱 브라우저 375px로 프로덕션·Beta·mini 순회 ② 공지사항 목록·상세로 정책 변경 교차 확인 ③ Claude in Chrome으로 로그인 세션 확인(만료 — 로그인 점검 불가) |
| 점검 간격 | **직전 #4(2026-08-10)로부터 24일** — 8/17·8/24·8/31 회차가 실행되지 않아 이번 회차가 **3주치 변경을 한 번에 반영**한다 |
| 정본 파일 | `md/IA.md` |
| 이번 회차 특징 | 🔴 **Unifi Pay 오프라인 QR 결제 사용자 화면 출시**(`/pay/*` 신설 — 주기능 어휘 필요) · 🔴 **K-Pick 상품 상세가 Unifi 내부 화면으로 편입 시작**(`/k-pick/shopping/{id}` — 구 "외부 이탈 확정" 판정 부분 번복) · 🔴 **mini 홈 전면 개편** · **Season 4 개시** · ✅ **5주 묵은 스켈레톤 이슈 완전 해소** |
| 결과 | IA.md 갱신 **O** · 승인 대기 **7건**(⑦·⑧ 신설) · 이월 **3건 해소**, **1건 판정 정정** |
| 안전 제약 준수 | 조회·탐색만. 출석하기·뽑기·위임(Delegate)·송금·**QR 결제 시작** 등 상태 변경 액션 **일절 미실행**. 직접 로그인 시도 없음 |

---

## 1. 점검 범위 (실제 방문 라우트)

**프로덕션(비로그인)** — `/` · **`/pay/qr/mpm/guide`(신규)** · **`/pay/qr/mpm`(신규·로그인 게이트)** · **`/plus/usdt`(신규·로그인 게이트)** · `/benefits` · **`/k-pick/shopping/bizcon-S0213607`(신규)** · `/k-pick/shopping`(→홈 리다이렉트) · `/benefits/daily-mission` · `/reward/usdt` · `/reward/kaia` · `/apps` · `/apps/market` · `/announcement` · `/announcement/{uuid}`(Season 4) · `/my`→`/auth/sign-in`

**Beta(비로그인)** — `/`(홈) · `/benefits`(K-Pick) · **`/benefits/k-pick/beauty|shopping|pop`(신규)** · `/benefits/daily-mission` · **`/benefits/games/019fb0d1…`(NEXT Bay·신규)** · `/pay/qr/mpm/guide`

**Unifi mini Beta(비로그인)** — `/benefits-mini` · **`/benefits-mini/k-pick/beauty|shopping|pop`(신규)** · `/benefits-mini/daily-mission` · `/benefits-mini/luckyball-invite` · `/benefits-mini/draw-promotion`

> 🧭 점검 팁 재확인: Beta에 `?liff_id=…`로 진입하면 같은 탭에서 루트 `/`가 계속 `/benefits-mini`로 리다이렉트된다. **Beta 웹 화면을 mini보다 먼저** 봤고, mini 진입 후에는 하위 라우트를 직접 지정해 접근했다.

---

## 2. 🔴 최대 변경 ① — Unifi Pay 오프라인 QR 결제, 사용자 화면으로 출시

**#4에서 "파트너 콘솔 기반 B2B라 사용자 IA 밖"으로 추적만 하던 Unifi Pay가 사용자 앱 화면으로 들어왔다.** 프로덕션 홈 **최상단 히어로 배너**가 결제 가이드로 신설됐다.

| 라우트 | 화면 | 접근 | 실측 내용 |
|---|---|---|---|
| **`/pay/qr/mpm/guide`** | 오프라인 결제 가이드 | 🟢 비로그인 | "Unifi offline payment is now available / USDT payment, done with one QR code!" · 3단계 안내(① 결제 금액 **사전 충전** — 충전 잔액에서 결제 ② 홈 상단 **「Pay」 버튼** 또는 이 페이지 하단 「QR Pay」로 스캔 화면 진입 ③ 매장 QR 스캔 → 금액 입력 → **Unifi Pay로 결제 완료**) · CTA **[Start QR payment]** ×2 |
| **`/pay/qr/mpm`** | QR 스캔·결제 | 🔴 로그인 필수 | `/auth/sign-in?returnUrl=…%2Fpay%2Fqr%2Fmpm` 리다이렉트로 라우트 존재 확인. **결제 플로우라 진입하지 않음** |

- **프로덕션·Beta 양쪽 모두 존재**(Beta는 일본어 「Unifiオフライン決済がオープン」). 즉 **릴리즈 예정이 아니라 이미 라이브**다.
- 가이드가 언급하는 **홈 상단 「Pay」 버튼은 로그인 상태에서만 노출**되는 것으로 보인다(비로그인 홈 헤더에 미노출).
- **선불 충전(top-up) 개념이 새로 등장**한다 — 기존 예치(Plus/Basic)·지갑 잔액과 별개의 "결제용 충전 잔액"인지 확인 필요.

> ⛔ **Screen ID 영향**: `pay_` 주기능 신설 여부를 확정해야 한다(승인 대기 ⑦). 현재 §1 주기능 표에 결제 어휘가 없다.

---

## 3. 🔴 최대 변경 ② — K-Pick 상품 상세가 Unifi 내부 화면으로 편입되기 시작

**#3(2026-08-03)에서 "MY쇼핑 = 외부 GuideKim 이탈 확정 · Screen ID 부여 대상 아님"으로 종결했던 판정이 부분적으로 번복된다.**

Beta K-Pick 바우처 카드의 브릿지 `redirectUrl`을 실측한 결과, 목적지가 두 갈래로 갈린다.

| 목적지 | 예시 | 성격 |
|---|---|---|
| 🆕 **Unifi 내부** | `https://www.unifi.me/k-pick/shopping/bizcon-S0213607` (올리브영 5만원권) | **Unifi 도메인의 자체 상품 상세 화면** — 부여 대상 |
| 기존 외부 | `https://guidekim.me/bizcon/daiso-mobile-gift-card-30000won` (다이소·CU·이마트) | 외부 GuideKim 이탈 — 부여 대상 아님 |

**프로덕션 `/k-pick/shopping/bizcon-S0213607` 실측 구성**: 상품명 · 정가/특가(¥5,851 → ¥5,266, **10% OFF**) · **공식 바우처·즉시 발급** 배지 · **5% 즉시 캐시백 ¥263** · **판매자 GuideKim** · 유효기간(구매일로부터 60일·연장 불가) · 사용처(올리브영 매장, 특수매장 제외) · 취소·환불(미사용 시 유효기간 내 전액 환불) · e쿠폰 수령 방법 · **「Unifi mini는 공식 인증 LINE MINI App」 안내** · 함께 볼 바우처 3종 · **리뷰(평점 4.8 · 12건 · 작성자·날짜·본문)**

- ⚠️ **카테고리 목록 라우트 `/k-pick/shopping`는 프로덕션에서 홈으로 리다이렉트**된다 — 현재 프로덕션은 **상품 상세만** 열려 있고 목록은 Beta 전용이다.
- 상품 상세는 **리뷰·판매자·환불 정책까지 갖춘 커머스 화면**이라 Unifi IA에서 가장 큰 신규 영역이 될 수 있다.

> ⛔ **Screen ID 영향**: 승인 대기 ⑧ 신설. `kpick_` 프리픽스 확정(승인 대기 ③)과 묶어서 결정해야 한다.

### 3-1. 🆕 K-Pick 카테고리 라우트 신설 (Web·mini 양쪽)

| 환경 | 라우트 | 라벨 |
|---|---|---|
| Beta Web | `/benefits/k-pick/beauty` · `/shopping` · `/pop` | K-美容 · K-買い物 · K-カルチャー |
| Beta mini | `/benefits-mini/k-pick/beauty` · `/shopping` · `/pop` | 동일 |

- 기존 IA에는 "카테고리 아이콘 4종"만 있었고 **라우트가 없었다**. 이번에 3종이 실제 라우트로 확인됐다(**「내 예약」은 여전히 `href="#"`** — 라우트 없음).
- **K-뷰티 카탈로그가 대폭 확대**됐다: 기존 스킨부스터 3계열(쥬베룩·리쥬란·포텐자) 외에 **헤어·두피·마사지·에스테·퍼스널컬러 등 20건 이상**(마리엠헤어, 명동 컨디션, JUNO HAIR 홍대, 말지아 힐링스파, 동대문 풋샵 등).
- **K-컬처도 확대**: 한복 대여(경복궁 아리한복), 찜질방(스파렉스 동묘점 — **GuideKim 한정**), 인사동 전각 체험, 개화기 의상(인천 차이나타운), 달리포토 스냅 등.

---

## 4. 🔴 최대 변경 ③ — Unifi mini 홈 전면 개편

`/benefits-mini`(mini 홈)의 구성이 **K-Pick형 커머스 화면으로 통째로 교체**됐다.

| | #4 (2026-08-10) | **#5 (2026-09-03)** |
|---|---|---|
| 페이지 타이틀 | `Unifi` | 🆕 **`Unifi | 渡韓のおトクサービス`**(방한 특가 서비스) |
| 상단 | **JPYC balance 배너**(잔액 + `>`) | ❌ 소멸 |
| 2칸 타일 | **내 예약 N건 · 보기** \| **JPYC 데일리 미션**(레드닷) | ❌ 소멸 |
| 헤더 | unifi mini 로고 + QR · noti(레드닷) | 「会員登録」만 |
| 본문 | JPYC 안내 → 바우처 캐러셀 → 구매 가이드 → 스킨부스터 → K-컬처 | **K-Pick(`/benefits`)과 사실상 동일한 화면** — 카테고리 4아이콘 → 바우처 12종 → JPYC 구매 가이드 → 스킨부스터 → K-컬처 |
| GNB | 5탭 | 5탭 유지(ホーム·K-Pick·リワード·資産·マイ) — 단 **ホーム과 K-Pick 콘텐츠가 거의 겹친다** |

- mini 푸터에 **어그리게이터 약관이 없는 것은 유지**(§0 "mini는 approve 미제공"과 일치).
- ⚠️ **홈과 K-Pick 탭의 중복**은 IA 관점에서 별도 화면으로 볼지 판단이 필요하다 — 현재는 홈이 "K-Pick 전체", K-Pick 탭이 "카테고리별 목록"으로 분화된 형태.

---

## 5. 🆕 Season 4 개시 (공지 2026-09-01)

| 항목 | Season 3 | **Season 4** |
|---|---|---|
| 기간 | 2026-08-01 ~ 09-01 00:00 (UTC+0) | **2026-09-01 ~ 10-01 00:00 (UTC+0)** |
| 자격 | LINE 계정 연동 + 일일 스냅샷 USDT 100↑ | **동일** |
| 출석 미션 | 3일·5일 · 100↑ 월 12개 / 1,000↑ 월 24개 | **동일** |
| 게임 미션 | 6종 중 3종 · 일 1개 · 월 30개 · 00:00 UTC+0 리셋 | **동일** |
| 럭키볼 5티어 | 500 / 20 / 5 / 1 / 0.02 USDT | **동일** |

> **정책 수치는 그대로, 기간만 갱신**됐다. IA.md의 Season 3 블록은 **Season 4로 헤더·기간만 교체**하면 된다.

### 5-1. 🆕 럭키볼 유효기간 정책이 화면 FAQ로 명문화 (NEXT Bay 미션 상세 실측)

- 데일리 미션 보상·럭키볼은 **획득 후 24시간 내 미수령 시 소멸**(복구 불가)
- 럭키볼은 **획득한 회차가 끝나기 전에 추첨**해야 하며, 회차 종료 시 미추첨분 전량 소멸(다음 회차 이월 없음)
- 여러 개 보유 시 **유효기간이 가까운 것부터 자동 사용**(사용자 선택 불가)
- 미추첨 럭키볼이 있으면 **만료 3일 전부터 전일까지 1일 1회 LINE 공식계정 메시지로 알림**
- 회차별 준비 수량 소진 시 **그 회차의 출석·게임 미션 조기 종료**
- 미션 달성 정보가 Unifi에 동기화되기까지 **최대 30분**
- Web 환경에서는 **LINE 계정 로그인만** 미션 참여·리워드 수령 가능

---

## 6. 🆕 신설·변경 — 그 밖의 항목

| 구분 | 내용 | 환경 |
|---|---|---|
| 🆕 **NEXT Bay 게임 마켓플레이스 미션** | 리워드 탭 상단 배너 「ゲームマーケットプレイス NEXT Bay特別ミッション完了で 最大100 USDTを獲得しましょう」 → `/benefits/games/{uuid}`. **미션이 게임 플레이가 아니라 구매**다: ⓐ 10 USDT 이상 구매 2회 ⓑ 100 USDT 이상 1회 구매 ⓒ ⓐ·ⓑ 중 하나 클리어(자동 응모) | **Beta 전용**(프로덕션 미노출) |
| 🆕 **`/plus/usdt` 라우트 확정** | 홈 배너 「Earn up to 7% interest / Get a 2% higher rate than before」 → `/plus/usdt`(**로그인 필수**). IA의 `asset_plus_mode_01 ⚠️`(플러스 모드 상세)에 라우트가 붙었다 | 프로덕션·Beta |
| 🆕 **홈 배너 「Earn up to 7% interest」 프로덕션 반영** | #4에서 Beta 전용이던 7% 배너가 프로덕션 홈에 올라왔다 | 프로덕션 |
| 🆕 **홈 「Get more interest — Deposit other tokens and Swap to USDT」** | 다른 토큰 입금 → USDT 스왑 유도 섹션 신설 | 프로덕션 |
| ❌ **레퍼럴 랭킹 배너 소멸** | `home_benefit_referral_01`(특별 레퍼럴 랭킹 혜택)이 프로덕션 홈에서 사라졌다 — **3rd Special USDT Referral Campaign 종료**(8/21 보상 지급 완료 공지) | 프로덕션 |
| 🆕 **Boost 운영 기간 「무기한」으로 변경** | `/reward/usdt` 문구 **"Your Boost remains active automatically with no expiration date."** — #4의 "~2026-10-04 연장" 기재를 대체 | 프로덕션 |
| 🆕 **CR STAGE 2 진행** | Mission Check Period가 **STAGE 2**로 진급: 1R 8.22–9.1 Ended / **2R 9.1–9.11 In progress** / 3R 9.11–9.21 Scheduled. 🆕 섹션 문구 **"Unlock Idle Rewards"**(유휴 보상 깨우기) · **"Wake up special rewards — Deposit 10,000 USDT to earn up to 450 KAIA"** · **[View Total Rewards]** | 프로덕션 |
| 🆕 **mini 이자 배너 5% → 2%** | mini Reward 상단 「自分のJPYC資産を増やす **最大年2%の利息**」 — #3·#4의 "최대 연 5%" 표기가 **2%로 하향**. Beta 홈 히어로도 「最大2%の利息！」 | mini·Beta |
| 🆕 **Beta 홈 배너 3종 교체** | 🆕 「友だちにJPYCをプレゼントする — ラッキーボール1個で最大50,000JPYC」(→ mini `luckyball-invite`) · 🆕 「友だちと一緒にJPYCをもっとゲット — 預けてリワードUP！ランキング報酬も」(→ `promotion.unifi.me/referral-campaign-jpyc-2`) · #4의 "100% 당첨 롤링 배너" 소멸 | Beta |
| 🆕 **프로모션 도메인 경로 3종** | `promotion.unifi.me/referral-campaign-jpyc-2` · `/unifi-interest-renewal`(구 announcement 링크 대체) · `/jpyc-deposit-guide` | Beta |
| 🆕 **페이지 타이틀 분화** | 홈 `Unifi` / 하위 화면 **`Unifi | A stablecoin wallet designed for earning`** / mini **`Unifi | 渡韓のおトクサービス`** | 전 환경 |
| 🆕 **바우처에 「N% OFF」 할인 표기 추가** | 캐시백률과 별개로 **정가 대비 할인율**이 카드에 함께 표시된다(예: 올리브영 5만원권 「還元10%」 + 「10% OFF ¥5,704」) | Beta·mini |
| Apps 개수 | 30(8/3) → 29(8/10) → **27**(9/3) · 수혜자 9,021,526명 · 1 KAIA=$0.02 · 1 USDT=$0.99 · 기준일 2026.09.03 | 프로덕션 |

---

## 7. ✅ 해소 — 5주 묵은 스켈레톤 이슈 완전 종료

| 대상 | #4 (2026-08-10) | **#5 (2026-09-03)** |
|---|---|---|
| 프로덕션 `/benefits/daily-mission` 비로그인 | ✅ 정상 | ✅ 정상 (게임 6종·진행도 전부 렌더) |
| **Beta 웹 `/benefits/daily-mission` 비로그인** | ❌ 스켈레톤 | ✅ **정상** |
| **Beta mini `/benefits-mini/daily-mission` 비로그인** | ❌ 스켈레톤 | ✅ **정상** |

> #1~#4에 걸쳐 4주 연속 추적하던 항목이 **전 조합 정상**으로 확인됐다. 로그인 상태 재현 여부는 세션이 없어 미확인이나, 비로그인에서 원인 불명 고착이 사라진 이상 **이 항목은 종결**한다(재발 시 새 항목으로 기록).

---

## 8. ⚠️ 판정 정정 — K-Pick KR IP 정책은 **폐기 대상이 아니다**

#2~#4에서 "Beta에서는 KR IP로도 K-Pick 전체가 열람된다 — 3주 연속이라 구 정책 기재(`kpick_kr_block_01`) 폐기 여부 확인 필요"로 이월해 왔다. **이번 회차에 프로덕션을 함께 봤더니 판정이 갈린다.**

| 환경 | KR IP 비로그인 `/benefits` |
|---|---|
| **프로덕션** | ⚠️ **축소판** — 배너 3종만(「Up to 15% cashback!」·「Daily Missions for JPYC」·「Get more JPYC with friends」). **카테고리 4아이콘·바우처 12종·스킨부스터·K-컬처 전부 미노출** |
| **Beta** | 전체 열람(카테고리·바우처·시술·K-컬처 모두) |

> ➡️ **KR IP 제한은 프로덕션에서 살아 있다.** Beta 전체 열람은 "정책 폐기"가 아니라 **Beta 환경이 IP 게이팅을 걸지 않은 것**으로 보는 편이 타당하다. `kpick_kr_block_01` 기재를 **유지**하고, 이월 항목의 문구를 "폐기 검토"에서 "**Beta는 IP 게이팅 미적용 — 프로덕션 기준으로 판단**"으로 바꾼다.

---

## 9. ⛔ 사용자 승인 대기 — Screen ID 어휘 7건 (⑦·⑧ 신설)

| # | 항목 | 잠정 어휘 | 상태 |
|---|---|---|---|
| ② | `/reward/...`(부스트·스테이킹) 주기능 — GNB 리워드 탭과 충돌 | `reward_boost_usdt_01` / `reward_staking_kaia_01` vs 별도 `staking_` | 유지 |
| ③ | K-Pick 주기능 프리픽스 | `kpick_` (기존 XLT는 `UF_`·`mini_guidekim_`) | **⑧과 묶어 결정 필요** |
| ④ | 외부 지갑 연결 | `asset_wallet_connect_01` | 유지 |
| ⑤ | 비로그인 변형 어휘 방식 | `home_main_guest_01` 등 | 유지 |
| ⑥ | 누적 이자 화면 | `asset_interest_usdt_01` (`/interest/usdt`) | 유지 |
| **⑦** | 🆕 **결제(Unifi Pay) 주기능 어휘** — 오프라인 QR 결제가 사용자 화면으로 출시됨 | 후보 ⓐ `pay_` 신설(`pay_qr_guide_01`·`pay_qr_scan_01`) ⓑ `apps_` 하위 편입 ⓒ `asset_` 하위 편입. **라우트가 `/pay/...` 최상위**라 ⓐ가 자연스럽다 | **신규 — 확정 전 부여 금지** |
| **⑧** | 🆕 **K-Pick 상품 상세 어휘** — `/k-pick/{카테고리}/{상품ID}`가 Unifi 내부 화면으로 편입 | 후보 ⓐ `kpick_product_detail_01` ⓑ 카테고리별 분화(`kpick_shopping_detail_01`·`kpick_beauty_detail_01`·`kpick_pop_detail_01`). **일부 상품은 여전히 외부 `guidekim.me`라 "내부/외부 혼재"를 어떻게 표기할지도 함께 결정** | **신규 — 확정 전 부여 금지** |

> ⛔ **NFT 어휘 정정**(`asset_nft_01` → `apps_mypage_nft_01`)은 #1부터 "사용자 대기" 상태로 유지된다. 두 어휘 모두 신규 부여 금지.

---

## 10. 변경 없음 확인 항목

| 영역 | 확인 |
|---|---|
| GNB | 프로덕션 **4탭**(Home·Reward·Assets·My) · Beta·mini **5탭**(+K-Pick) — **K-Pick 탭 승격이 5주째 프로덕션 미반영** |
| `/apps` 구조 | 게임 프로모션 캐러셀 5종(Seal M·Endless Frontier2·LORDNINE·LEGEND WAR·Siege Of Titans) · 카테고리 8종 · Editor's Pick 3종 · USDT Reward Missions 3건 · KAIA Reward Missions 0건 — 구조 동일 |
| `/apps/market` | Buy/Sell · Drops(Live & Upcoming / Past / Now) · NFT 드롭 카드 — 동일 |
| 게임 미션 6종 | Squishy Cat Jump · MERGE CAT · Tap Tap Jello · Hook & Gold · Rich Match · SODA MERGE 2048 — 동일 |
| 부스트 티어 | 300,000 / 400,000 / 500,000 KAIA = 1 / 2 / 3% — 동일 |
| CR 분배 정책 | 1:10 비율·원금 기준·최저 잔고·6개월 분할·수동 Claim·90일 소각 — 동일 |
| mini `luckyball-invite` | 비실시간 지급 블록·유의사항 6종·최대 20개 — #4와 동일 |
| mini `draw-promotion` | LINE 앱 전용 게이트 유지 |
| 스킨부스터 클리닉 | 쥬베룩 6 · 리쥬란 4 · 포텐자 6 — 개수 동일 |
| 푸터 | 약관 3종·개인정보 2종·마케팅·Developers·공지·FAQ·보안감사·고객센터·SNS — 동일 (mini는 어그리게이터 약관 없음) |
| 로그인 게이트 | Google/LINE/Naver/Kakao/Apple · "Powered by LINE NEXT" · 카피가 **"Don't miss the up to 10% annual rate!"** 로 10% 반영 |

---

## 11. ⬜ 미점검 — 다음 회차 이월

| # | 항목 | 왜 못 했나 | 필요한 접근 수단 |
|---|---|---|---|
| 1 | **로그인 영역 전체** — `/my`·`/setting`·`/notification`·`/my/token/transaction`·`/interest/usdt`·`/transfer`·`/deposit`·`/apps/trade/swap`·`/apps/my-page/nfts` | Chrome 세션 **만료**("You logged in recently" 배지만 남음) | 사용자가 Chrome에서 `www.unifi.me` 로그인 유지 (**Claude 직접 로그인 금지**) |
| 2 | 🆕 **홈 상단 「Pay」 버튼 · `/pay/qr/mpm` 스캔 화면** | 로그인 필수 + **결제는 상태 변경 액션** | 1번 + 사용자 캡처(스캔 화면까지만) |
| 3 | 🆕 **결제용 「사전 충전(top-up)」 잔액의 정체** | 가이드 문구로만 확인 | 1번 · 기획 확인 |
| 4 | 🆕 **`/k-pick/{카테고리}` 목록의 프로덕션 개방 시점** | 현재 홈으로 리다이렉트 | 다음 회차 재확인 |
| 5 | **mini 로그인 상태**(개편된 홈에서 JPYC 잔액·내 예약이 어떻게 노출되는지) | mini 비로그인 | 1번 |
| 6 | **「내 예약」 라우트** | Web·mini 모두 `href="#"` — 라우트 없음 | 로그인 후 재확인 |
| 7 | **Wallet Mode 전체**(US·CA·UK·SG IP) | 해외 IP 없음 | VPN 또는 캡처 |
| 8 | **LIFF 환경**(LINE 인앱 브라우저) | LINE 앱에서만 열림 | LIFF 링크 + 캡처 |
| 9 | **JP IP**(K-Pick JP Only·교환 미제공 검증) | JP IP 없음 | JP VPN 또는 JP 사용자 캡처 |
| 10 | **approve 미완료 계정** | 기존 계정은 approve 완료 | 신규 테스트 계정 |
| 11 | **`/benefits-mini/draw-promotion` 내용** | LINE 앱 전용 게이트 | LINE 앱 캡처 |
| 12 | **위임(Delegate) 입력·확인**, `View all`, `View Total Rewards` | 상태 변경 액션 — 의도적 미진입 | 캡처 또는 진행 허용 지시 |
| 13 | 송금 2단계·QR, 거래 상세, 입금 브릿지 상세, `/payout`, 계정 탈퇴 | 1번 미비 | 1번 해소 후 순차 진입 |

### 11-1. 이번 회차에 해소·정리된 이월 항목

| 항목 | 결과 |
|---|---|
| **Unifi Pay Direct 사용자 화면 편입 추적**(#4) | ✅ **해소 — 편입됨**. `/pay/qr/mpm/guide`·`/pay/qr/mpm` 실측 → 승인 대기 ⑦ 신설 |
| **리워드 탭 스켈레톤 고착**(#1~#4) | ✅ **해소 — 전 조합 정상**(§7). 항목 종결 |
| **mini "외부 게임 미션" 한국어 노출**(XLT 누락 의심) | ✅ **소멸** — mini Reward에서 Game mission 섹션 자체가 사라졌다(NEXT Bay 배너로 대체) |
| **K-Pick KR IP 정책 폐기 검토**(#2~#4) | ⚠️ **정정 — 폐기하지 않는다**(§8). 프로덕션은 KR IP 제한 유지, Beta만 게이팅 미적용 |
| **부스트 운영 기간 ~2026-10-04 연장** | ⚠️ **갱신 — 화면 문구가 「무기한(no expiration date)」** 으로 바뀌었다 |
| **MY쇼핑 = 외부 GuideKim 이탈 확정**(#3 종결) | ⚠️ **부분 번복**(§3) — 상품 상세 일부가 Unifi 내부 화면으로 편입 |

### 11-2. 그 밖의 계속 이월

| 항목 | 사유 |
|---|---|
| **Beta 홈 「最大0%の報酬」 표기** | **5주 연속 재현**(프로덕션은 4.2%) — FE 확인 권장 |
| **mini 이자 노출 정책 충돌** | 위키 스펙 "mini 이자 노출 불가" vs 화면 「最大年2%」 — **4주 연속**. 수치까지 5%→2%로 바뀌어 정책 확인 시급 |
| **mini 출석 체크 자격 조건** | 풀 모드의 "100 USDT 이상 예치" 문구가 mini에는 없다 — 기획 확인 |
| **swap 화면 「AlphaSec」 한국어 노출** | Beta 로그인 필요 — 이번 회차 미확인 |
| **K-Pick 탭 프로덕션 승격** | 5주째 Beta 전용 |
| **USDT 이율 5%→7% 문서 파급** | 위키·XLT·프로모션의 구 수치(5%·8%) 교체 여부 — IA 점검 범위 밖, 별도 작업 |

---

## 12. IA.md 갱신 위치 요약

| 섹션 | 변경 |
|---|---|
| 분석 이력 | **2026-09-03 주간 점검 #5** 행 추가(24일 공백 명시) |
| §0 제품 모드 표 | mini JPYC 이자 **최대 5% → 2%** · **결제 행에 「오프라인 QR 결제(Unifi Pay) 출시」** 반영 |
| §0-0 환경 | Unifi Pay Direct 블록에 **사용자 화면 출시 사실 추가**(IA 밖 → IA 안) |
| §0-0-1 축 매트릭스 | `/pay/qr/mpm/guide` 🟢 · `/pay/qr/mpm` 🔴 · `/plus/usdt` 🔴 · `/k-pick/shopping/{id}` 🟢 · **프로덕션 `/benefits`는 KR IP 축소판** 행 추가 |
| §0-3 라우트 참고 | `/pay/*` · `/plus/usdt` · `/k-pick/*` · `/benefits/k-pick/*` · `/benefits-mini/k-pick/*` 신설 라우트 기재 |
| §1 주기능 | **`pay_` ⚠️잠정 행 신설**(승인 대기 ⑦) |
| §2-1 home | 🆕 **QR 결제 히어로 배너**(`home_pay_qr_01`) · 🆕 `/plus/usdt` 7% 배너 · 🆕 「Get more interest」 · ❌ **레퍼럴 배너 소멸** · Beta 홈 배너 3종 교체 |
| §2-2 reward | **Season 3 블록 → Season 4**(기간만 변경) · 🆕 **럭키볼 유효기간 정책 6종** · 🆕 **NEXT Bay 미션**(Beta) |
| §2-2-1 reward 부스트·스테이킹 | Boost **무기한** · CR **STAGE 2** · 🆕 "Unlock Idle Rewards"·"Wake up special rewards" |
| §2-3 asset | `asset_plus_mode_01`에 **라우트 `/plus/usdt`** 확정 |
| §2-9 pay (신설) | 🆕 **오프라인 QR 결제 트리 신설** |
| §2-7 mini/K-Pick | **mini 홈 전면 개편** · **K-Pick 카테고리 라우트 3종** · **상품 상세 내부 편입** · `kpick_kr_block_01` **유지 판정** · mini 이자 2% · Game mission 섹션 소멸 |
| §4 미확정 | 승인 대기 **⑦·⑧ 신설** · 스켈레톤·Unifi Pay 추적 **해소 처리** · KR IP·부스트 기간·MY쇼핑 **판정 정정** |

---

*작성: Claude Code 스케줄 태스크 `weekly-unifi-ia-check` · 다음 실행: 2026-09-07(월) 10:00*
