# Unifi IA 주간 점검 리포트 — 2026-09-14 (#7)

| 항목 | 내용 |
|---|---|
| 점검 대상 | **프로덕션** `www.unifi.me` (비로그인 + **로그인**, KR IP) + **Beta** `unifi-web.line-apps-beta.com` (비로그인) + **Unifi mini Beta** (`?liff_id=2008994547-GfGUdDxy` → `/benefits-mini`, 비로그인) |
| 점검 방법 | ① 인앱 브라우저 375px로 프로덕션 비로그인 순회 ② **Chrome에 프로덕션 로그인 세션이 유지돼 있어** 로그인 영역 전체 순회 ③ 인앱 브라우저로 Beta·mini 순회(Chrome은 Beta 도메인 접근 불가) ④ 공지사항 목록·전문으로 정책 교차 확인 |
| 점검 간격 | 직전 #6(2026-09-07)로부터 **7일** — 정상 주기 |
| 정본 파일 | `md/IA.md` |
| 이번 회차 특징 | 🔴 **오프라인 결제 캐시백 캠페인 화면 신설**(`/pay/campaigns/offline` · ICB 파트너 가맹점) · 🔴 **프로덕션 리워드 탭 스켈레톤 고착**(환경이 #6과 정반대로 역전) · 🔴 **KAIA 스테이킹 4.2%→4.1% 하향** · 🆕 **Apps에 「나의 관심 Apps」 신설·시세 출처 교체** · 🔴 **mini 홈 카탈로그 복귀(#6 판정 번복)** · ✅ **mini Reward 스켈레톤 해소** |
| 결과 | IA.md 갱신 **O** · 승인 대기 **12건**(⑫ 신설) · 이월 **3건 해소·1건 신규 재발** |
| 안전 제약 준수 | 조회·탐색만. 출석하기·뽑기·위임(Delegate)·송금·**QR 결제 시작**·**상품 구매**·**클리닉 문의** 등 상태 변경 액션 **일절 미실행**. **카메라 권한 미허용**. 직접 로그인 시도 없음(mini `/my`가 LINE 로그인으로 리다이렉트되자 즉시 중단) |

---

## 1. 점검 범위 (실제 방문 라우트)

**프로덕션 비로그인(인앱 브라우저)** — `/` · **`/pay/campaigns/offline`(신규)** · `/auth/sign-in`(캐시백 조회 리다이렉트 확인) · `/announcement` · **`/announcement/{9-10 캐시백 공지}`** · `/benefits` · `/benefits/daily-mission`

**프로덕션 로그인(Chrome)** — `/`(로그인 홈) · `/my` · `/setting` · `/notification` · `/interest/usdt` · `/deposit` · `/transfer` · `/apps` · `/apps/market` · `/apps/trade/swap` · `/apps/my-page/nfts` · `/reward/usdt` · `/reward/kaia` · `/benefits` · `/benefits/k-pick/beauty` · `/benefits/daily-mission` · `/pay/qr/mpm` · `/pay/campaigns/offline`(+`?campaignStatus=view`) · `/k-pick/shopping/bizcon-S0213607` · `/k-pick/shopping`(→홈 리다이렉트 재확인)

**Beta 비로그인(인앱)** — `/`(홈) · `/benefits`(K-Pick 허브) · **`/benefits/k-pick/beauty|shopping|pop`** · `/benefits/daily-mission`

**Unifi mini Beta 비로그인(인앱)** — `/benefits-mini` · `/benefits-mini/daily-mission` · `/benefits-mini/k-pick/beauty` · `/benefits-mini/luckyball-invite`

> 🧭 **점검 교훈 재확인 — 인앱 브라우저의 429/403은 이번에도 나왔다.** Beta K-Pick 카테고리 목록이 처음 조회에서 **빈 화면**이었고 콘솔에 **429·403**이 찍혔다. 30초 이상 쉰 뒤 재조회하자 카탈로그 20건이 정상 렌더됐다. **빈 화면을 곧바로 "소멸"로 판정하지 않는다**(#6 교훈 유효).
>
> ⛔ **이번 회차 제약 — Beta·mini 로그인 영역 점검 불가.** Chrome은 프로덕션 로그인 세션이 살아 있었으나 **Beta 도메인(`unifi-web.line-apps-beta.com`) 접근이 브라우저 권한 정책으로 차단**됐고, 인앱 브라우저에는 세션이 없다. mini `/my` 진입 시 `access.line.me` 로그인으로 리다이렉트돼 **즉시 중단**했다(직접 로그인 금지).

---

## 2. 🔴 최대 변경 ① — 오프라인 결제 캐시백 캠페인 화면 신설 (`/pay/campaigns/offline`)

**Unifi Pay가 「기능」에서 「캠페인이 붙은 커머스 동선」으로 확장됐다.** 비로그인 홈 최상단 배너군에 신규 배너가 생기고, 전용 캠페인 화면이 열렸다.

| 요소 | 실측 |
|---|---|
| 진입 배너 | 🆕 **"Pay with QR, get 10% back / Instant USDT cashback in Korea"** — `utm_source=unifi_home_strip`·`referral_code` 파라미터 부착 |
| ⚠️ 노출 조건 | **비로그인 홈에만 있다** — 로그인 홈 배너 목록에는 없다(별도 변형 근거 추가, §11 승인 대기 ⑤) |
| 헤드라인 | "10% cashback on your Korea trip with USDT / Pay by QR with USDT at offline stores and get 10% back automatically. **First come, first served through October 31, 2026.**" |
| 구성 | **[View my cashback]** → 🔒 `?campaignStatus=view` / 혜택 2블록 / **가맹점 지역 탭 4종** / How to use 5단계 / Compared to overseas cards 3블록 / FAQ 5종 / 유의사항 9종 / 하단 CTA **[Pay with QR]** |
| 🆕 가맹점 목록 | 지역 탭 **Gangnam-gu · Seongdong-gu · Yongsan-gu · Mapo-gu** · 카테고리 5종 **F&B · Clothing/Fashion Accessories · Pharmacy/Medicine · Clinic · Services/Other** · 카드 클릭 시 **Google Maps 외부 이탈**(Unifi 화면 아님) |
| 🆕 제휴 주체 | **ICB 파트너 가맹점**(9/10 공지) · **ZeroPay 가맹점 연동 예정**("will be added soon") |

### 2-1. 정책 (2026-09-10 공지 전문 대조)

- 기간 **2026-09-10 ~ 10-31 23:59 (UTC+9)** · **방한 외국인 대상 — 한국 거주 한국인 제외**
- 캐시백 **결제액의 10%**, 결제 후 자동 지급(10~15분 소요 가능), **1인 누적 상한 50 USDT**
- 누적 결제 **500 USDT 이상 시 500 USDT 추첨**(10명 · 총 5,000 USDT) · 지급 **2026년 11월 중순 예정**
- 둘 다 받으면 **최대 550 USDT** · 환불 시 이미 지급된 캐시백은 회수하지 않고 결제액에서 차감 · 소진 시 조기 종료

### 2-2. ⚠️ 「View my cashback」가 로그인 상태에서 무반응

| 상태 | 결과 |
|---|---|
| 비로그인 | ✅ `/auth/sign-in?returnUrl=…%2Fpay%2Fcampaigns%2Foffline%3FcampaignStatus%3Dview` 로 정상 리다이렉트 — **조회 화면의 라우트가 확인됐다** |
| **로그인** | ❌ **버튼 클릭·쿼리 직접 진입 모두 화면 변화 없음**(URL·DOM 동일) |

참여 이력이 없어 빈 상태가 렌더되지 않는 것인지, #4의 입금 브릿지 배너처럼 **동작하지 않는 진입점**인지 구분되지 않는다. **FE 확인 권장 · 캐시백 조회 화면은 미실측 이월.**

> ⛔ **Screen ID 영향**: 승인 대기 **⑫ 신설**. `pay_`(기능) vs `promo_`(캠페인) 중 어디에 둘지가 쟁점이다.

---

## 3. 🔴 최대 변경 ② — 프로덕션 리워드 탭 스켈레톤 고착 (환경이 역전됐다)

#6에서 "**Beta mini 로그인 한정**, 프로덕션·Beta 웹 정상"으로 좁혔던 스켈레톤 이슈가 **정확히 반대로 뒤집혔다.**

| 대상 | #6 (2026-09-07) | **#7 (2026-09-14)** |
|---|---|---|
| **프로덕션 `/benefits/daily-mission`** | ✅ 정상 | ❌ **스켈레톤 — 비로그인·로그인 모두 15초 후에도 고착(3회 재현)** |
| Beta 웹 `/benefits/daily-mission` | ✅ 정상 | ✅ **정상**(카운트다운·출석·게임 미션 전부 렌더) |
| Beta mini `/benefits-mini/daily-mission` | ❌ 스켈레톤 | ✅ **정상 — 해소** |

- 렌더되는 것: 헤더 「Rewards」 · 「미션 / 일일 미션하고 럭키볼로 최대 500 USDT 뽑기」 · 「Apps 둘러보기」 · 푸터
- 대시 블록 **33개** · 콘솔 **`ACCESS_DENIED`(401)** · `api-reward.unifi.me/v1/mission-users` **401**(같은 도메인 `/v1/token-info/country`는 **200**)
- **가려진 영역**: 출석 체크 진행도 · 게임 미션 6종 · 럭키볼 요약 · 카운트다운 → **이 회차 재확인 불가**

> ⚠️ 로그인 세션은 정상이다(`/my`·`/setting`·`/interest/usdt` 전부 렌더). **리워드 API 계열만** 401이므로 인증 실패가 아니라 리워드 서비스 측 문제로 보인다. **FE 확인 권장 · 다음 회차 최우선.**

---

## 4. 🔴 최대 변경 ③ — KAIA 스테이킹 이율 4.2% → 4.1% 하향

**세 화면이 모두 4.1%로 일치**해 수치 바인딩 오류가 아니라 정책 변경이다.

| 위치 | #6 | **#7** |
|---|---|---|
| 홈 「함께하면 더 큰 혜택, KAIA & USDT」 부제 | 최대 4.2% 보상 | **최대 4.1% 보상에 특별 혜택까지!** |
| 내 자산 KAIA 카드 유도 문구 | Stake KAIA and Earn up to 4.2% | **KAIA 스테이킹하고 최대 연 4.1% 이자 받으세요** |
| `/reward/kaia` 본문 | 연 최대 4.2% | **KAIA 자산을 위임하고 최대 연 4.1%의 보상을 받아보세요!** |

> ➡️ 위키·XLT·프로모션에 **구 수치(4.2%)** 가 남아 있으면 교체 대상이다(USDT 5%→7% 건과 동일 성격 — IA 점검 범위 밖, 별도 작업).
> ⚠️ Beta 홈은 여전히 **"Up to 0% rewards"** 로 나온다(§10 · 7주 연속).

---

## 5. 🔴 최대 변경 ④ — mini 홈에 카탈로그 복귀 (#6 「완전 중복」 판정 번복)

| | #6 (2026-09-07) | **#7 (2026-09-14)** |
|---|---|---|
| Beta Web `/benefits` (허브) | 허브로 축소 | **동일 유지** — JPYC 배너 → 「Up to 15% cashback!」 → 카테고리 4아이콘 → JPYC 구매 가이드. **카탈로그 없음** |
| mini 홈 `/benefits-mini` | Beta 허브와 **완전히 동일** | 🔴 **허브 + 카탈로그** — 「The most affordable way to plan your Korea trip」 › **「Must-have vouchers for your Korea trip」 바우처 12종** + **큐레이션 3건**(클리닉·리쥬란·포텐자) + K-뷰티 상품 |

- 🆕 mini 신규 상품 **TOM N TOMS Iced Americano**(환원 5% · `test.guidekim.me`)
- ➡️ 2주 만에 구성이 뒤집혔다. 어휘를 **구성 스냅샷이 아니라 「허브 + (환경별) 카탈로그」 구조**로 정하는 편이 안전하다(§11 이월 결정 항목).
- ⚠️ mini 홈의 **「You have a reservation in progress」 툴팁이 비로그인에서도 노출**됐다 — #6의 "로그인 한정" 기재와 상충하므로 조건 재확인 필요.

---

## 6. 🆕 Apps 영역 구조 변경 3건

| 구분 | 내용 |
|---|---|
| 🆕 **「나의 관심 Apps」 섹션 신설** | 게임 프로모션 캐러셀 바로 아래 · [전체보기] 동반. IA에 없던 영역이며 **정체(즐겨찾기/추천)·전용 라우트 미확인** |
| 🆕 **게임 프로모션 캐러셀 5종 → 3종** | 🆕 **「오늘도 환생2」** 신규 · 잔류 Siege Of Titans·LEGEND WAR · ❌ Endless Frontier2·LORDNINE·Seal M 미노출 |
| 🆕 **USDT 시세 출처 교체** | **CoinMarketCap → Bithumb**(1 USDT = ₩1,360) · KAIA는 CoinMarketCap 유지(₩39) · 기준일 2026.09.14 |
| ✅ **`SocialFi` 소멸 = 카테고리 폐지 확정** | 2주 연속 **7종**(AI·CONTENT·DePIN·GAME·Payment·SOCIAL·ETC) · **26 Apps** 유지 → #6 추적 항목 **종결** |
| ❌ **swap AlphaSec 프로모션 배너 소멸** | `/apps/trade/swap`이 From/To·잔고·[최대]·방향 전환·[교환]만 남았다. #3~#6에 걸쳐 추적하던 배너가 화면에서 사라졌다 |
| ⛔ **NFT 빈 상태 기재 정정** | #6의 "보유 0건에서는 탭 3종 미노출"은 **오기**다. 이번 실측에서 **「전체 0 · 판매중 0 · 거래내역」 탭이 그대로 노출**되고 그 아래 「NFT 없음 / 지갑에 보유하고 있는 NFT가 없어요」가 붙는다 |

---

## 7. 🆕 그 밖의 신설·변경

| 구분 | 내용 | 환경 |
|---|---|---|
| 🆕 **홈 「부스트 참여하고 USDT 받기」 배너 신설** | 「최대 3% 추가 이자 받기」 → `/reward/usdt`. 로그인·비로그인 공통 | 프로덕션·Beta |
| 🆕 **홈 헤더 아이콘 GA 어휘 실측** | 좌→우 **`click_home_pay_qr`**(→`/pay/qr/mpm`) · **`click_address`**(→`/deposit`) · **`click_gnb_noticenter`**(→`/notification`). ⛔ #6에 「[QR]=입금」으로 적은 두 번째 아이콘의 정본 어휘는 **「주소(address)」** 다 | 프로덕션 |
| 🆕 **로그인 홈 토큰 3카드가 토큰 상세 링크** | 카드 전체가 `/my/token/{컨트랙트주소}`로 이동(카드 내 [채우기]는 별도 동선) | 프로덕션 |
| 🆕 **`/setting` 한국어 라벨 확정** | 화면 표시 › **「선호 스테이블 코인」**(값 JPYC) — #6은 영문 "Preferred Stable"만 확인 | 프로덕션 |
| 🔴 **`/deposit` JPYC 안내가 되돌아갔다** | ① 「**JPYC를 Unifi 지갑으로 전송하세요** / 지갑 주소를 복사한 후 보유 중인 JPYC를 해당 주소로 입금」 + **[JPYC 입금 가이드 보기]** ② 「지갑에 입금된 JPYC를 확인하세요」. **#6의 외부 구매처(jpyc.co.jp) 유도 문구가 사라졌다** | 프로덕션 |
| 🆕 **`/interest/usdt` 빈 상태 실측** | 「받은 이자 내역이 없습니다 / USDT를 입금하고 이자를 받아보세요.」 + **[USDT 입금하기]**. 누적 이자가 0에 가까우면 내 자산 카드의 「Total Interest」 인라인도 보이지 않는다 | 프로덕션 |
| 🆕 **`/reward/usdt` 부스트 정책 한국어 전문** | 「부스트 혜택은 상시로 자동 적용됩니다 / 별도의 만기나 유지 기간 종료 없이 상시 운영돼요」 · 「Tier는 잔고에 따라 매일 갱신 — 00:00 UTC+0 잔고로 다음 날 즉시 상/하향」 · 「Tier 1 미만이면 당일 미지급, 채우면 당일부터 재지급」 | 프로덕션 |
| 🆕 **`/pay/qr/mpm` 한국어 라벨** | 「오프라인 결제 QR 스캔하기 / 매장에 부착된 결제 QR을 스캔해 주세요. 스캔 후 결제가 진행돼요.」 · 권한 팝업 **[권한 허용하기]·[취소]** (권한 미허용) | 프로덕션 |
| 🆕 **상품 상세 한국어 라벨** | **[구매 링크 저장]·[바로 구매하기]** · 「상품 판매처 **GuideKim (Afformation)**」 · 「*특정상거래법에 따른 표기」. `/k-pick/shopping`은 **여전히 홈 리다이렉트** | 프로덕션 |
| 🆕 **K-Pick 카테고리 영문 탭 라벨** | **K-Beauty / K-Shopping / K-Culture** · 허브 4아이콘 **+ My Reservation**. 프로덕션은 KR IP에서 **카탈로그 0건** 유지(`kpick_kr_block_01` 근거 유지) | 프로덕션·Beta·mini |
| 🔴 **클리닉 19곳 → 18곳** | 필터 영문 **All / Dermatology & Plastic Surge(ry) / Dentistry / Ophthalmology** · **캐시백이 카드별로 다르다**(티아나 15%·원데이치과 10%·레디피부과 8%·강남헤라 5%·힐링안과 15%) — 카테고리 균일 7%와 **별개 축** | Beta·mini |
| 🆕 **K-Culture 상품 카드에 태그 배지 신설** | 「ソウル」·「仁川」(ja)과 「Show Ticket」·「Martial Arts」·「KPOP」·「Aquarium」(en)이 **한 카드에 혼재** · 🆕 신규 **코엑스 아쿠아리움 입장권** · 22건·환원 7% 균일 | Beta·mini |
| ✅ **K-Shopping 바우처 12종 유지** | 올리브영 3·다이소 3·CU 2·이마트 4 · 환원 10% 균일(올리브영 1만원권만 5%) — #6과 동일 | Beta·mini |
| 🔴 **mini Game mission 섹션 부활 + 한국어 노출 재발** | "Game mission / Complete game missions to earn JPYC" 아래 항목이 **「외부 게임 미션」 한국어 그대로** + "Before proceeding with mission 0/2". #5에서 **섹션 소멸과 함께 종결**했던 XLT 누락 의심 건이 되살아났다 | mini |
| ⚠️ **mini Reward에서 JPYC 이자 배너 미노출** | 5주 연속 충돌 항목이던 「最大年2%」 이자 배너가 이번 회차에 보이지 않았다(자리에 JPYC 구매 가이드 배너). **비로그인 기준**이므로 정책 반영인지 조건부인지 로그인 재확인 필요 | mini |
| 🆕 **mini 카테고리 목록 헤더에 「K-Pick」** | Beta Web 목록 헤더는 [back]·「My Shopping」뿐이다 — 같은 화면의 환경 차이 | mini |
| 공지사항 | 🆕 **1건 추가** — 2026-09-10 「Pay with USDT in Korea and Get 10% Cashback! Earn Up to 550 USDT in Rewards」. 그 외 변동 없음 | 프로덕션 |

---

## 8. ⛔ 사용자 승인 대기 — Screen ID 어휘 12건 (⑫ 신설)

| # | 항목 | 잠정 어휘 | 상태 |
|---|---|---|---|
| ② | `/reward/...`(부스트·스테이킹) 주기능 — GNB 리워드 탭과 충돌 | `reward_boost_usdt_01` / `reward_staking_kaia_01` vs 별도 `staking_` | 유지 |
| ③ | K-Pick 주기능 프리픽스 | `kpick_` (기존 XLT는 `UF_`·`mini_guidekim_`) | ⑧·⑩·⑪과 묶어 결정 필요 |
| ④ | 외부 지갑 연결 | `asset_wallet_connect_01` | 유지 |
| ⑤ | 비로그인 변형 어휘 방식 | `home_main_guest_01` 등 | **근거 재강화** — 🆕 결제 캐시백 배너가 **비로그인 홈에만** 있다(§2) |
| ⑥ | 누적 이자 화면 | `asset_interest_usdt_01` | 유지 (빈 상태 실측 추가) |
| ⑦ | 결제(Unifi Pay) 주기능 어휘 | ⓐ `pay_` 신설 ⓑ `apps_` 하위 ⓒ `asset_` 하위 | **⑫와 함께 결정** — `/pay/` 하위가 기능(스캔)과 캠페인 둘로 갈렸다 |
| ⑧ | K-Pick 상품 상세 어휘 | ⓐ `kpick_product_detail_01` ⓑ 카테고리별 분화 | 유지(판매 주체 = Afformation/GuideKim 한국어 표기 재확인) |
| ⑨ | 「선호 스테이블 코인」 설정 어휘 | ⓐ `my_setting_preferred_stable_01` ⓑ `my_setting_stable_01` ⓒ `my_setting_display_*` | **한국어 라벨 확정으로 ⓐ가 유리해졌다** |
| ⑩ | K-Pick 클리닉 섹션 어휘 | ⓐ `kpick_clinic_01`+`_detail_01` ⓑ `kpick_beauty_clinic_01` ⓒ 별도 ID 없음 | 유지 (클리닉 18곳·필터 영문 확정) |
| ⑪ | K-Pick 체크아웃 어휘 | ⓐ `kpick_checkout_01` ⓑ `kpick_product_checkout_01` ⓒ `_mini` 접미 | 유지 (미진입) |
| **⑫** | 🔴 **오프라인 결제 캐시백 캠페인 화면 어휘** | ⓐ `pay_campaign_offline_01`(+조회 `_01_01`) ⓑ `promo_pay_offline_01` ⓒ `pay_cashback_01` | **신규 — 확정 전 부여 금지.** 쟁점은 **캠페인성 화면을 `pay_`(기능)로 볼지 `promo_`(캠페인)로 볼지**다. ⑦·프로모션 프리픽스 확정과 묶어 결정 |

> ⛔ **NFT 어휘 정정**(`asset_nft_01` → `apps_mypage_nft_01`)은 #1부터 "사용자 대기" 상태다. 두 어휘 모두 신규 부여 금지.

---

## 9. 변경 없음 확인 항목

| 영역 | 확인 |
|---|---|
| GNB | 프로덕션 **4탭**(홈·리워드·내 자산·마이) — 로그인에서도 4탭 · Beta·mini **5탭**(+K-Pick). **K-Pick 승격 7주째 미반영** |
| 내 자산 액션 | **보내기 · 채우기 · 교환하기 · 은행출금** 4종 + 총자산 우측 **거래내역** — 동일 |
| `/reward/usdt` (Boost) | 티어 300,000/400,000/500,000 KAIA = 1/2/3% · 최대 100,000 USDT · 위임 KAIA 합산 · 무기한 — 동일 |
| `/reward/kaia` (CR) | **STAGE 2** · 1R·2R 종료 / **3R 9.11–9.21 진행 중** · 10 USDT당 최대 0.449999 KAIA · 7일 쿨다운·자동 재위임 — 정책 동일(회차만 진행) |
| `/transfer` | 안내문(락업/플러스 모드·외부 지갑 제외) · 토큰 필터(전체/스테이블 코인) — 동일 |
| `/deposit` 네트워크 | 「KAIA 네트워크의 모든 토큰은 동일한 지갑주소를 사용합니다」 · 카테고리 탭(스테이블 코인/다른 토큰) · 토큰 탭 JPYC·USDT·IDRP — 동일 |
| `/setting` 나머지 | 이메일 인증 완료 · 생체 인증 패스키 · 간편 비밀번호 · 개인 키 확인 · 언어/통화 설정 · 알림 설정 · FAQ · 문의하기 · 오픈소스 라이선스 · 로그아웃 · 계정 탈퇴 — 동일 |
| `/notification` | 필터 6종(전체·안읽음·공지사항·계정/보안·예치·입출금) — 동일 |
| `/apps/market` | Buy/Sell · Drops(라이브 & 준비중/지난 목록/진행중) · **Dr.Paws 500 KAIA · 1,000개 · 0.8%** — 동일 |
| 프로덕션 `/benefits` | 배너 3종(Up to 15% cashback! · Daily Missions for JPYC · Get more JPYC with friends) — 로그인에서도 동일 |
| 프로덕션 `/benefits/k-pick/*` | 라우트 개방 · **KR IP 카탈로그 0건**(탭 3종만) — 동일 |
| Beta 홈 | 히어로 「Earn up to 2% interest!」(JPYC 기준) · 섹션 3그룹(JPYC→KAIA→USDT) · 가이드 카드 5종 — 동일 |
| mini `luckyball-invite` | 비실시간 지급 블록(Pending/Paid rewards) · 「0/20 people」 · 유의사항 6종 · 최대 20개 — 동일 |
| mini 푸터 | 어그리게이터 약관 **없음** 유지 |
| 로그인 게이트 | Google/LINE/Naver/Kakao/Apple · "Powered by LINE NEXT" · "Don't miss the up to 10% annual rate!" — 동일 |
| Season 4 | 9/1~10/1 · 스냅샷 100 USDT · 출석 3·5일 · 게임 6종 중 3종 · 럭키볼 5티어 — 신규 공지 없음(정책 변동 0건) |

---

## 10. ⬜ 미점검 — 다음 회차 이월

| # | 항목 | 왜 못 했나 | 필요한 접근 수단 |
|---|---|---|---|
| 1 | 🔴 **프로덕션 리워드 탭 전체**(출석 진행도·게임 미션 6종·럭키볼 요약·카운트다운) | **스켈레톤 고착**(§3) | FE 수정 후 재확인 — **최우선** |
| 2 | 🆕 **캐시백 조회 화면**(`/pay/campaigns/offline?campaignStatus=view`) | **로그인 상태에서 무반응**(§2-2) | FE 확인 또는 참여 이력 있는 계정 |
| 3 | 🔴 **Beta·mini 로그인 영역 전체**(mini `/my`·Beta `/my`·mini Reward 로그인 상태) | **Chrome의 Beta 도메인 접근 차단 + 인앱 세션 없음** · mini `/my`는 LINE 로그인 리다이렉트로 중단 | 사용자가 Beta 세션 제공 또는 도메인 허용 |
| 4 | ⚠️ **mini JPYC 이자 배너 노출 조건** | 비로그인에서 미노출 — 정책 반영인지 조건부인지 미확정 | mini 로그인 |
| 5 | **`/benefits-mini/draw-promotion`** | LINE 앱 전용 게이트(이번엔 LINE 로그인 리다이렉트로 진입 자체 불가) | LINE 앱 캡처 |
| 6 | 🆕 **Apps 「나의 관심 Apps」의 정체·전용 라우트** | 빈 상태로만 관측 | 관심 등록된 계정 또는 기획 확인 |
| 7 | **QR 결제 스캔 이후 단계**(금액 입력·결제 확인) | 카메라 권한 미허용 + 결제는 상태 변경 액션 | 사용자 캡처 또는 진행 허용 지시 |
| 8 | **결제용 「사전 충전(top-up)」 잔액의 정체** | 가이드 문구로만 확인 — 충전 화면 미발견 | 기획 확인 |
| 9 | **K-Pick 체크아웃 화면** | LINE MINI app 전용 진입 + 구매 플로우 | LINE 앱 캡처 |
| 10 | **클리닉 [Inquire] 이후 화면** | 문의 전송은 상태 변경 액션 | 캡처 또는 진행 허용 지시 |
| 11 | **「내 예약」 라우트** | Web·mini 모두 `href="#"` | FE 구현 대기 |
| 12 | **프로덕션 K-Pick 카탈로그** | KR IP 게이팅으로 0건 | JP IP |
| 13 | **Wallet Mode 전체**(US·CA·UK·SG IP) · **JP IP** · **LIFF 환경** · **approve 미완료 계정** | 접근 환경 없음 | VPN·LIFF 링크·신규 계정·캡처 |
| 14 | 위임(Delegate) 입력·확인, 송금 2단계·QR, 거래 상세, `/payout`, 계정 탈퇴, 외부 지갑 연결 플로우 | 상태 변경 액션 — 의도적 미진입 | 진행 허용 지시 |

### 10-1. 이번 회차에 해소·정리된 이월 항목

| 항목 | 결과 |
|---|---|
| **mini Reward 스켈레톤**(#6 이월 1번) | ✅ **해소** — 비로그인에서 대시 0, Special Missions·Mission·Daily check-in·Game mission 전부 렌더 |
| **Apps `SocialFi` 소멸 원인**(#6) | ✅ **종결** — 2주 연속 7종 확인으로 **카테고리 폐지** 확정 |
| **프로덕션 로그인 영역**(#6 방식 유지) | ✅ **가능** — Chrome에 프로덕션 세션이 유지돼 있어 사용자 개입 없이 전 영역 순회 |
| **swap AlphaSec 배너**(#3~#6) | ❌ **배너 소멸로 종결** — 부활 시 새 항목으로 기록 |
| **NFT 빈 상태 탭 노출**(#6 기재) | ⛔ **기재 오류 정정** — 탭 3종은 빈 상태에서도 노출된다 |
| **mini 홈 ↔ K-Pick 탭 중복**(#6 「완전 중복」) | 🔄 **판정 번복** — 카탈로그 복귀로 두 화면이 다시 갈렸다(§5) |

### 10-2. 그 밖의 계속 이월

| 항목 | 사유 |
|---|---|
| **Beta 홈 「Up to 0% rewards」 표기** | **7주 연속 재현**(영문 UI에서도 동일) — 프로덕션은 4.1%. FE 확인 권장 |
| **mini 이자 노출 정책 충돌** | 이번 회차 mini Reward에서 이자 배너 미노출 — **해소인지 비로그인 한정인지 미확정**(§10 이월 4번) |
| **mini 출석 체크 자격 조건** | mini는 예치 조건 문구 없음 유지 · 프로덕션 대조가 스켈레톤으로 불가 |
| **K-Pick 탭 프로덕션 GNB 승격** | **7주째 4탭**. 라우트는 이미 개방 — GNB 노출만 남은 상태 |
| **부스트 정책 문구 정합성** | 공지(종료일 명시) vs 화면(상시 운영) · 티어 인정 범위 차이 — 기획 확인 |
| **USDT 이율 5%→7% · 🆕 KAIA 4.2%→4.1% 문서 파급** | 위키·XLT·프로모션의 구 수치 교체 여부 — IA 점검 범위 밖, 별도 작업 |
| 🆕 **mini 「외부 게임 미션」 한국어 노출** | XLT 키 누락 의심 — #5에서 종결한 건의 재발 |
| 🆕 **K-Culture 태그 언어 혼재** | ja(지역) + en(장르) 혼재 — 태그 다국어화 대상인지 기획 확인 |
| 🆕 **mini 「내 예약」 툴팁 노출 조건** | 비로그인에서도 노출 — #6 기재와 상충 |

---

## 11. IA.md 갱신 위치 요약

| 섹션 | 변경 |
|---|---|
| 분석 이력 | **2026-09-14 주간 점검 #7** 행 추가 |
| §0 제품 모드 표 | 결제 행에 **캐시백 캠페인 화면** · mini 이자 행에 **이번 회차 미노출** 기록 |
| §0-0-1 축 매트릭스 | 🆕 **`/pay/campaigns/offline`·`?campaignStatus=view` 행 2건 신설** · Web×KR×로그인 커버리지에 09-14 추가 |
| §0-3 라우트 참고 | 🆕 **신설 라우트 2건** · 🆕 **홈 헤더 아이콘 GA 어휘 3종**(「QR」→「주소」 정정) |
| §2-1 home | 🆕 `home_pay_campaign_01`·`home_benefit_boost_01` 신설 · 헤더 아이콘 어휘 정정 · **토큰 카드 → 토큰 상세 링크** · 🔴 **Better Together 4.1% 하향** |
| §2-2 reward | 🔴 **프로덕션 스켈레톤 고착 전문** |
| §2-2-1 reward(부스트·스테이킹) | 🔴 **스테이킹 4.1%** · 🆕 **부스트 한국어 전문** · STAGE 2 **3R 진행 중** |
| §2-3 asset | 🔴 KAIA 카드 4.1% · 🔴 **`/deposit` JPYC 안내 복귀** · 🆕 `/interest/usdt` 빈 상태 |
| §2-4 apps | 🆕 **「나의 관심 Apps」·캐러셀 3종·Bithumb** · ✅ 카테고리 7종 확정 · ❌ **AlphaSec 배너 소멸** · ⛔ **NFT 탭 기재 정정** |
| §2-5 my | 🆕 **「선호 스테이블 코인」 한국어 라벨** |
| §2-7 mini/K-Pick | 🆕 영문 탭 라벨 · 🔴 **클리닉 18곳·개별 캐시백** · 🆕 **K-Culture 태그 배지·언어 혼재** · 🔴 **mini 홈 카탈로그 복귀** · ✅ **mini 스켈레톤 해소** · 🔴 **「외부 게임 미션」 재발** · ⚠️ 예약 툴팁 조건 |
| §2-9 pay | 🔴 **`pay_campaign_offline_01` 신설 전문** · 🆕 스캔 화면 한국어 라벨 |
| §4 미확정 | 🔴 **프로덕션 스켈레톤 신설** · ✅ mini 스켈레톤·SocialFi **종결** · **승인 대기 ⑫ 신설**(총 12건) · 신규 추적 6건(관심 Apps·캐시백 무반응·외부 게임 미션·태그 혼재·예약 툴팁·KAIA 4.1% 파급) · K-Pick 승격 **7주째** 갱신 |

---

*작성: Claude Code 스케줄 태스크 `weekly-unifi-ia-check` · 절차 정본 `md/ia-check.md` · 다음 실행: 2026-09-21(월) 10:00*
