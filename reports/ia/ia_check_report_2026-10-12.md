# Unifi IA 주간 점검 리포트 — 2026-10-12 (#9)

| 항목 | 내용 |
|---|---|
| 점검 대상 | **프로덕션** `www.unifi.me` (**로그인**, KR IP, 한국어·KRW) + **Beta** `unifi-web.line-apps-beta.com` (**로그인**, 영문) + **Unifi mini Beta** (`?liff_id=2008994547-GfGUdDxy` → `/benefits-mini`, 로그인) |
| 점검 방법 | ① 인앱 브라우저 375px — **인앱 세션이 이미 로그인 상태**여서 프로덕션·Beta·mini 로그인 영역을 순회 ② 공지사항 목록(신규 4건 전문) 교차 확인 ③ `location.href`(리다이렉트)·대시 줄 수(스켈레톤)·`performance` 리소스(API 상태)를 **스크립트로 측정** ④ 비로그인 확인을 위해 Chrome을 시도했으나 **Chrome도 로그인 상태** |
| 점검 간격 | 직전 #8(2026-09-21)로부터 **21일** — 9/28·10/5 회차 미실행분 합산 |
| 정본 파일 | `md/IA.md` |
| 이번 회차 특징 | 🔴 **프로덕션 K-Pick 카탈로그가 KR IP에서 개방** · 🔴 **K-Pick 라우트가 `/benefits/category/*`로 개편**(아이콘↔라우트 1:1) · 🔴 **K-Pick 약관 개정 공지(시행 10/20 예정)** · ✅ **mini My(`/my-mini`) 첫 실측** · ✅ **KAIA 이율 ko/en 4.1% 정렬** · 🔴 **로그인 스켈레톤 Beta 웹 확대** |
| 결과 | IA.md 갱신 **O** · 승인 대기 **12건**(신설 0 · ③ 쟁점 해소 방향) · 이월 **4건 해소 · 7건 신규** · 실측 승격 **1건** |
| 안전 제약 준수 | 조회·탐색만. 출석·뽑기·위임·송금·QR 결제·바우처 구매·클리닉 문의 등 상태 변경 액션 **일절 미실행**. 카메라 권한 미요청. **직접 로그인·로그아웃 없음**(기존 세션 사용). Beta 디버그 패널 **미사용**(mini My 화면에 톱니가 보였으나 누르지 않음). 드랍웹 업로드 **안 함** |

> ⚠️ **판단 기록 — 비로그인 점검을 하지 못했다.** 인앱 브라우저와 Chrome 모두 사용자 로그인 세션이 살아 있었다. 비로그인 화면을 보려면 로그아웃이 필요한데, 세션은 사용자의 것이므로 로그아웃하지 않았다. 「비로그인 전용」 요소(QR 결제 히어로·캐시백 배너·출석 CTA 「Check In」 등)는 이번 회차에 재확인하지 못했다 → §9 이월 3번.

---

## 1. 점검 범위 (실제 방문 라우트)

**프로덕션 로그인(인앱)** — `/` · `/benefits/daily-mission` · `/my` · `/reward/kaia` · `/reward/usdt` · `/apps` · `/apps/market` · `/apps/trade/swap` · `/setting` · `/deposit` · `/announcement` + 신규 공지 4건 · `/benefits`(→ 홈) · `/benefits/k-pick/beauty`(→ `/benefits/category/clinic`) · `/benefits/k-pick/shopping`(→ `category/voucher`) · `/benefits/k-pick/pop`(→ `category/tour-ticket`) · `/benefits/category/activity` · `/benefits/category/esthetic` · `/benefits/category/beauty`(빈 화면) · `/benefits/voucher/{uuid}`(「Loading...」 고착) · `/pay/campaigns/offline`

**Chrome(프로덕션)** — `/` (로그인 상태 확인용 1회 — 비로그인 시도 실패)

**Beta 로그인(인앱)** — `/` · `/benefits` · `/benefits/daily-mission` · `/my`

**Unifi mini Beta 로그인(인앱)** — `/benefits-mini` · 🆕 `/my-mini` · `/benefits-mini/daily-mission`

미방문(이번 회차 생략): `/notification` · `/my/token/transaction` · `/interest/usdt` · `/transfer` · `/apps/my-page/nfts` · `/pay/qr/mpm(/guide)` · mini `luckyball-invite`

---

## 2. 🔴 최대 변경 ① — 프로덕션 K-Pick 카탈로그가 KR IP에서 열렸다 · 라우트 개편

| 대상 | #8 (2026-09-21) | **#9 (2026-10-12)** |
|---|---|---|
| 프로덕션 `/benefits/k-pick/beauty` | 라우트 개방 · **KR IP 0건**(탭 3종만) | **`/benefits/category/clinic`으로 리다이렉트** · 클리닉 **18곳** 렌더 |
| 프로덕션 `/benefits/k-pick/shopping` | 0건 | **`/benefits/category/voucher`** · 바우처 **12종** · 브랜드 탭 전체·올리브영·다이소·CU·이마트24 |
| 프로덕션 `/benefits/k-pick/pop` | 0건 | **`/benefits/category/tour-ticket`** · **9건** |
| 프로덕션 `activity` · `esthetic` | — | **7건 · 7건** |
| 프로덕션 `/benefits`(허브) | 홈 리다이렉트 | **홈 리다이렉트 유지** |
| 프로덕션 GNB | 4탭 | **4탭 유지** |

- 프로덕션 카테고리 화면은 헤더 로고가 **「unifi mini」**이고 하단 GNB가 없다 — 풀 모드 안에서 mini 커머스 화면을 그대로 띄우는 형태다.
- 클리닉 신규 관측: 우아 성형외과·피부과 · 원진성형외과 · 더 힐 피부과 · 퍼스널 뷰티·지유의원 · 에이비성형외과. 일부 카드에 **「JPYC N% 페이백」·「무료 LINE 상담」·「사전결제 없음」** 배지.
- 클리닉·투어·액티비티 카드는 **브릿지 경유 외부 이탈**(`/channel/bridge/AFFORMATION?redirectUrl=guidekim.me/hospital/…|/travel-ticket/…`), 바우처만 **내부 상세 `/benefits/voucher/{uuid}`**.
- `kpick_kr_block_01`(KR IP 제한)의 근거가 카테고리 목록에서 사라졌다. 허브·GNB는 닫혀 있으므로 **폐기 판단은 약관 시행(10/20) 이후로 미룬다.**

### 2-1. 라우트 체계 (프로덕션·Beta·mini 공통)

| 카테고리 | Web | mini |
|---|---|---|
| Clinics | `/benefits/category/clinic` | `/benefits-mini/category/clinic` |
| K-Beauty | `/benefits/category/k-beauty` | `/benefits-mini/category/k-beauty` |
| Esthetic | `/benefits/category/esthetic` | `…/esthetic` |
| Tours & Tickets | `/benefits/category/tour-ticket` | `…/tour-ticket` |
| Activities | `/benefits/category/activity` | `…/activity` |
| 바우처 | `/benefits/category/voucher?tab=VOUCHER_{OLIVE_YOUNG\|DAISO\|CU\|EMART24}` | `…/voucher?tab=…` |
| 바우처 상세 | `/benefits/voucher/{uuid}` | — |
| 큐레이션 | `/benefits/curation/{uuid}`(🆕 Web에도) | `/benefits-mini/curation/{uuid}` |

➡️ **#8의 「허브 아이콘 5종 ↔ 라우트 3종 불일치」가 해소**됐다(Beta·mini 허브 링크 실측). 구 `/benefits/k-pick/*`는 리다이렉트로만 남는다.

### 2-2. 배경 공지

| 날짜 | 공지 | 요지 |
|---|---|---|
| 10-01 | **Unifi ToS 이용약관 개정 안내** | 「'K-Pick' 서비스 상세 변경에 따른 이용약관 개정 · *서비스명 변경 가능」 · **시행 2026-10-20(예정)** |
| 10-06 | **바우처 공급사 시스템 점검** | **10/13(화) 00:00–08:00 JST** 바우처 구매·환불 중단 · 올리브영만 매장 사용 불가 — Unifi가 바우처를 **직접 판매**하고 있음을 확인 |

Beta·mini 허브 최상단에 같은 점검 안내 띠(「Voucher purchases and refunds paused / Oct 13, 12–8 AM」)가 붙어 있다. 프로덕션·Beta 전 화면 푸터에 🆕 「상품, 거래 및 환불에 관한 책임은 LINE NEXT Inc.가 아닌 판매자에게 있습니다.」가 추가됐다.

---

## 3. 🔴 최대 변경 ② — 리워드 탭 로그인 스켈레톤이 Beta 웹으로 번졌다

| 대상 | #8 | **#9** |
|---|---|---|
| 프로덕션 로그인 | ❌ 대시 31개 | ❌ **20초 후 대시 33개** · `mission-users` **200** · 콘솔 400 1건 |
| Beta 웹 로그인 | (비로그인만 확인 — 정상) | ❌ **15초 후 대시 33개** · 신설 칩 「Get 7% interest」·「Join Boost & Earn USDT」만 렌더 |
| mini 로그인 | (비로그인만 확인 — 정상) | ✅ **정상(대시 0)** |
| 비로그인 전 환경 | 정상 | ⬜ 이번 회차 미점검 |

➡️ 조건이 **「로그인 + 풀 모드(프로덕션·Beta)」**로 정리된다. `mission-users`가 200인데도 고착하므로 API 실패가 아니라 **렌더 경로** 문제로 보인다. **FE 확인 권장 · 최우선 이월 유지.** 프로덕션 리워드 탭에는 🆕 「JPYC 사용법 보기」 링크가 스켈레톤 아래 렌더된다.

---

## 4. ✅ 실측 승격 — mini My (`/my-mini`)

| 화면 | 라우트 | 핵심 확인 |
|---|---|---|
| mini 마이 메인(빈 상태) | `/my-mini` | 헤더 「My」 + 설정 톱니 · 닉네임 · 메뉴 **Reservations · Vouchers · Favorite · My reviews** · **Points balance ¥0 + [Points history]** · 「There are benefits you can claim right…」 · **JPYC Balance 0 JPYC ›** · 🆕 **Recently viewed ›** · **Payment history** 빈 상태 「No payment or reservation history found.」 |

- 2026-09-29 승인된 GuideKim My 내재화 화면(`md/IA.md` §2-5 mini 마이 — `my_main_01`·`my_main_empty_01`)이 Beta에 라이브다.
- 🆕 **「Recently viewed」** 행은 승인 목록에 없다 — 기획 위키(`4802744889`)와 대조 필요(IA 점검 범위 밖 · 보고만).
- mini GNB 「My」 = `https://unifi-web.line-apps-beta.com/my-mini` · Beta 허브 헤더 「My」 = `miniapp.line.me/2008994547-GfGUdDxy/my-mini`.
- 하위 화면(예약·상품권·포인트 내역)은 이번 회차 미진입.

---

## 5. ✅ 해소된 이월 항목 4건

| 이월 | 결과 |
|---|---|
| **2. KAIA 이율 정본(ko 4.2% / en 4.1% / Beta 0%)** | ✅ **ko/en 불일치 해소** — 한국어 로그인 홈 배너 「최대 4.1% 보상에 특별 혜택까지!」· 내 자산 「최대 연 4.1% 이자」· `/reward/kaia` 「최대 연 4.1%의 보상」 **3곳 모두 4.1%**. 🔴 **Beta 「Up to 0%」는 지속**(홈 배너·내 자산 KAIA 카드) |
| **3. mini GNB 3탭 확정** | ✅ **2회 연속 Home·Reward·My 3탭** → `md/IA.md` §0 표 정정. Assets 탭 없음 · My는 `/my-mini` |
| **신규(#8) 허브 아이콘 ↔ 라우트 불일치** | ✅ 라우트가 `category/*` 6종으로 1:1 정렬(§2-1) |
| **5. `/apps/market` Ranking 정렬 기준** | 🔶 **부분 해소** — 로그인에서 1위 **Slime Miner Gold Gears 「4,800 KAIA」** 값 노출(KAIA 단위 → 거래액 기준으로 보임 · 나머지 6건은 `-`). 정렬 기준 단정은 보류 |

---

## 6. 🆕 그 밖의 신설·변경

| 구분 | 내용 | 환경 |
|---|---|---|
| 🔴 **캐시백 캠페인 ZeroPay 연동 반영** | 헤드라인 **"Scan a ZeroPay QR and get 10% cashback with Unifi Pay! / Look for the ZeroPay mark at stores in Korea."** · 지역 탭 **4→5개(+Jung-gu)** · 🆕 업종 필터 **All·Restaurant·Cafe·Fashion·Pharmacy·Clinic·Services & Other** · 가맹점 카드 **NAVER Map + Google Maps**. 기간·10%·상한 50 USDT·추첨은 동일. ⚠️ **한국어 로그인 세션인데 본문이 영문**(XLT 미적용 의심) | 프로덕션 |
| 🆕 Beta 로그인 홈 「Zero Pay X Unifi Pay」 배너 | 「Scan a ZeroPay QR and get 10% cashback!」 — 프로덕션 기재(캠페인 배너 = 비로그인 전용)와 다르다. 프로덕션 비로그인 미점검이라 프로덕션 쪽 변화는 미확인 | Beta |
| 🆕 **Season 5** | 공지 10/1 · **2026-10-01 ~ 11-01 00:00 UTC+0** · 출석·게임·럭키볼 5티어 **Season 4와 수치 동일** | 전 환경 |
| ⚠️ **부스트 연장 공지** | 9/30 공지 「**~11월 3일 23:59:59(UTC+0)**」 ↔ `/reward/usdt` 화면 「만기 없이 **상시 운영**」 — 공지·화면 불일치 지속 | 프로덕션 |
| 🔴 **KAIA CR STAGE 3** | 1R(9.21~10.1)·2R(10.1~10.11) **종료** / **3R 10.11~10.21 진행 중**. 한국어 유의사항 전문이 #8 영문 전문과 1:1 대응 | 프로덕션 |
| 🔴 **mini Reward 구성 재편(로그인)** | My Lucky Ball · [Draw Lucky Ball] · JPYC Reward 0 · Check in [Get] 1~5 days · Game mission(🆕 「The games below don't give Lucky Balls」) · NEXT Bay · 「See how to use JPYC」. ❌ **Special Missions(SkyFlag) 블록 미노출** · ❌ JPYC 이자 배너 **3회 연속** 미노출 | mini |
| 🔴 **mini 「외부 게임 미션」 한국어 3회 연속** | 진행도 표기만 「Before proceeding with mission 0/2」 → **「First0/2」**로 바뀜. XLT 키 확인 대상 | mini |
| 🆕 mini 페이지 타이틀 교체 | 「Unifi \| 渡韓のおトクサービス」 → **「Unifi \| LINE-Based Payment Service」** | mini |
| 🆕 Beta 허브 헤더 「My」 · 「Sold out」 | 허브 헤더 **K-Pick · My · noti** · 바우처 블록에 **「Sold out」**(올리브영 1만원권) · 이벤트 링크 `miniapp…/event/voucher-event-1` | Beta·mini |
| 🆕 Apps **25 → 26개** | 카테고리 7종 유지 · 상단 서브탭 한국어 「리워드 · 마켓」 | 프로덕션 |
| ⚠️ **「나의 관심 Apps」 로그인 미노출** | #8에서 「로그인 전용 섹션」으로 확정했는데 이번 로그인에서 보이지 않았다 — 빈 상태면 숨기는지 재확인 필요 | 프로덕션 |
| 🔴 **swap AlphaSec 배너 복귀** | 「지금 AlphaSec에서 KAIA 거래하면 즉시 수수료 0원!」 — #7·#8 「소멸」 판정 번복 | 프로덕션 |
| ⚠️ **K-Pick 가격 이상 지속** | Beta 허브: 마리엠 헤어&헤드스파 **¥26,147,647** · 걸그룹 스타일링 촬영 **¥268,622** | Beta·mini |
| ⚠️ 바우처 상세 「Loading...」 | 프로덕션 `/benefits/voucher/{uuid}`가 인앱에서 20초 넘게 「Loading...」 — K-Pick 연속 조회 시 403·429 전례(`md/ia-check.md` 2단계 경고)가 있어 **화면 결함으로 판정하지 않는다** | 프로덕션 |
| 공지사항 | **신규 4건** — 바우처 공급사 점검(10/6) · 약관 개정(10/1) · Season 5(10/1) · 부스트 연장(9/30) | 프로덕션 |

---

## 7. 변경 없음 확인 항목

| 영역 | 확인 |
|---|---|
| GNB | 프로덕션 **4탭**(홈·리워드·내 자산·마이) · Beta 웹 **5탭** — K-Pick 프로덕션 승격 **미반영** |
| 프로덕션 `/benefits` | 홈 리다이렉트 유지(`location.href` 실측) |
| 로그인 홈 | 헤더 [pay]·[주소]·[알림] · 토큰 3카드(JPYC→USDT→IDRP) · KAIA/USDT 혜택 섹션 · 가이드 6종 · FAQ 6종 — 동일(프로모션 모달은 이번에 미노출 — 「7일간 보지 않기」 상태로 추정, 판정 대상 아님) |
| `/my` | 액션 4종 · 카드 순서 USDT→KAIA→JPYC→IDRP · JPYC 「최대 연 2%」 · 보유 NFT 0 |
| `/setting` | 이메일·패스키·간편 비밀번호·개인 키·언어 한국어·선호 스테이블 코인 JPYC·통화 KRW·알림·FAQ·문의·오픈소스·로그아웃·탈퇴 |
| `/deposit` | KAIA 단일 네트워크 · JPYC 2단계 「JPYC를 Unifi 지갑으로 전송하세요」+[JPYC 입금 가이드 보기] |
| `/reward/usdt` | 티어 30만·40만·50만 KAIA = 1·2·3% · 최대 100,000 USDT · 위임 합산 |
| `/apps/market` Drops | Dr.Paws 500 KAIA · 1,000개 · 0.8% |
| Beta `/my` | Send·Deposit·Swap·Bank Withdraw · USDT Max 7% · KAIA Max additional 3% + up to 0% · JPYC Max 2% · 비상장 BO·GRT·SIK·YOO |
| Beta 허브 | 클리닉 10곳 + 리뷰 랭킹 18곳 · 큐레이션 3건 · Trending K-Beauty Care · Itinerary · 1,000 JPY OFF 블록 |
| mini 홈 | Beta 허브와 **동일 구성**(4회 비교 중 3회 동일) |

---

## 8. ⛔ 사용자 승인 대기 — Screen ID 어휘 12건 (신설 0)

| # | 항목 | 잠정 어휘 | 상태 |
|---|---|---|---|
| ② | `/reward/...` 주기능 | `reward_boost_usdt_01` / `reward_staking_kaia_01` vs `staking_` | 유지 |
| ③ | K-Pick 주기능 프리픽스 | `kpick_` | **쟁점 일부 해소** — 아이콘↔라우트 1:1 정렬. 단 10/20 약관 개정에 「서비스명 변경 가능」이 있어 **명칭 확정 후 결정 권장** |
| ④ | 외부 지갑 연결 | `asset_wallet_connect_01` | 유지 |
| ⑤ | 비로그인 변형 어휘 | `home_main_guest_01` 등 | 유지(이번 회차 비로그인 미점검) |
| ⑥ | 누적 이자 화면 | `asset_interest_usdt_01` | 유지 |
| ⑦ | 결제 주기능 | ⓐ `pay_` ⓑ `apps_` ⓒ `asset_` | 유지 |
| ⑧ | K-Pick 상품 상세 | ⓐ `kpick_product_detail_01` ⓑ 카테고리별 | **근거 변경** — 바우처 상세 라우트가 `/benefits/voucher/{uuid}`로 바뀌었다(카테고리 키 `voucher`) |
| ⑨ | 선호 스테이블 코인 | ⓐ `my_setting_preferred_stable_01` … | 유지 |
| ⑩ | 클리닉 | ⓐ `kpick_clinic_01`+`_detail_01` … | **근거 강화** — 클리닉이 독립 라우트 `category/clinic`을 가진다 → ⓒ(별도 ID 없음) 안은 사실상 탈락 |
| ⑪ | K-Pick 체크아웃 | ⓐ `kpick_checkout_01` … | 유지(미진입) |
| ⑫ | 캐시백 캠페인 | ⓐ `pay_campaign_offline_01` … | 유지 |

> ⛔ NFT 어휘 정정(`asset_nft_01` → `apps_mypage_nft_01`)은 여전히 사용자 대기 — 두 어휘 모두 신규 부여 금지.
> 🔴 #8의 「K-Pick 화면 정의 방식(허브 + 환경별 카탈로그)」 결정 요청은 **10/20 약관 시행 후 명칭과 함께 결정**하도록 보류를 권한다(판단: 명칭이 바뀌면 어휘를 두 번 정하게 된다).

---

## 9. ⬜ 미점검 — 다음 회차 이월

| # | 항목 | 왜 못 했나 | 필요한 접근 수단 |
|---|---|---|---|
| 1 | 🔴 **K-Pick 약관 시행(10/20) 이후 프로덕션 GNB 승격·서비스명 변경**(최우선) | 시행 전 | 다음 회차 재확인 |
| 2 | 🔴 **리워드 탭 로그인 스켈레톤**(프로덕션·Beta 웹) | 렌더 고착 | FE 확인 |
| 3 | 🔴 **비로그인 전 범위**(프로덕션·Beta·mini) | 인앱·Chrome 모두 로그인 세션 — 로그아웃 금지 | 로그아웃된 브라우저 또는 사용자 확인 |
| 4 | **바우처 상세 `/benefits/voucher/{uuid}`** | 인앱 「Loading...」 고착 | Chrome 교차 확인 |
| 5 | **mini My 하위 화면**(예약·상품권·즐겨찾기·리뷰·포인트) · 「Recently viewed」 | 시간 관계상 미진입 | 다음 회차 |
| 6 | **캠페인 페이지 영문 렌더**(한국어 세션) | 관측만 | XLT·FE 확인 |
| 7 | **「나의 관심 Apps」 노출 조건** | 로그인에서도 미노출 | 관심 등록 계정 또는 기획 확인 |
| 8 | **mini Special Missions(SkyFlag) 소멸 여부** | 1회 관측 | 다음 회차 재확인 |
| 9 | **K-Pick 가격 이상** | 관측만 | FE·상품 데이터 확인 |
| 10 | QR 결제 스캔 이후 · K-Pick 체크아웃 · 클리닉 문의 이후 · 위임·송금 2단계 | 상태 변경 액션 | 캡처 또는 진행 허용 지시 |
| 11 | `/notification` · `/my/token/transaction` · `/interest/usdt` · `/transfer` · NFT · mini `luckyball-invite`·`draw-promotion` | 이번 회차 생략 | 다음 회차 |
| 12 | Wallet Mode · JP IP · LIFF · approve 미완료 | 접근 환경 없음 | VPN·LIFF·신규 계정 |

### 9-1. 계속 이월(추적 중)

| 항목 | 사유 |
|---|---|
| **Beta 「Up to 0%」** | 홈 배너 + 내 자산 KAIA 카드 — 재현 지속(9/21 이후 3주 공백 포함 9회차째) |
| **JPYC 이율 2%의 정본 여부** | §0 표 「최대 연 5%」 기재 미갱신 — 정책 확인 필요 |
| **mini 「외부 게임 미션」 한국어** | **3회 연속** — XLT 키 누락 확인 대상 |
| **부스트 공지↔화면** | 공지 ~11/3 · 화면 상시 |
| **K-Culture 태그 언어 혼재** | 이번 회차 미확인(영문 Beta 허브만 봄) |
| **USDT 5%→7% 문서 파급** | IA 점검 범위 밖 |

---

## 10. IA.md 갱신 위치 요약

| 섹션 | 변경 |
|---|---|
| 분석 이력 | **2026-10-12 주간 점검 #9** 행 추가 |
| §0 제품 모드 표 | 🔴 **mini GNB 3탭(Home·Reward·My → `/my-mini`)으로 정정** |
| §0-3 라우트 참고 | 🔴 **K-Pick 라우트 체계 개편** 전문(`category/*` 6종 · 바우처 상세 · 큐레이션 · `/my-mini`) |
| §2-1 home | ✅ KAIA 한국어 4.1% 정렬 |
| §2-2 reward | 🔴 로그인 스켈레톤 Beta 웹 확대 · 「JPYC 사용법 보기」 |
| §2-2-1 reward(부스트·스테이킹) | STAGE 3 3R 진행 · 한국어 4.1% · ⚠️ 부스트 공지(~11/3)↔화면(상시) |
| §2-3 asset | KAIA 카드 4.1% |
| §2-4 apps | Apps 26 · 관심 Apps 미노출 · Ranking 값 · 🔴 AlphaSec 배너 복귀 |
| §2-5 mini 마이 | ✅ **`/my-mini` 실측 승격** |
| §2-7 K-Pick | 🔴 **프로덕션 KR IP 카탈로그 개방** · Beta 허브 헤더·점검 띠 · 약관 개정·점검 공지 · `kpick_kr_block_01` 근거 소멸 메모 · mini Reward 재편 |
| §2-9 pay | 🔴 캠페인 ZeroPay 연동 |
| §4 미확정 | **#9 반영 요약 블록**(해소 4 · 신규 7 · 지속 · Season 5 · 비로그인 미점검) |

---

*작성: Claude Code 스케줄 태스크 `weekly-unifi-ia-check` · 절차 정본 `md/ia-check.md` · 다음 실행: 2026-10-19(월) 10:00 — 약관 시행(10/20) 직후인 **10/26 회차**에서 K-Pick 변경을 집중 확인 권장*
