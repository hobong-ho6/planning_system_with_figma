# Unifi IA 주간 점검 리포트 — 2026-07-30 (#2)

| 항목 | 내용 |
|---|---|
| 점검 대상 | **프로덕션** `www.unifi.me` (비로그인, KR IP) + **Beta** `unifi-web.line-apps-beta.com` (로그인) + **Unifi mini Beta** (`?liff_id=2008994547-GfGUdDxy` → `/benefits-mini`) |
| 점검 방법 | ① 인앱 브라우저 프로덕션 탐색(375px) ② 사용자 Chrome으로 Beta·mini Beta 탐색(인앱은 Beta 도메인 300s 타임아웃) |
| 정본 파일 | `md/IA.md` |
| 이번 회차 특징 | **Beta 환경 점검 첫 도입** — Beta에 릴리즈 예정 내용이 먼저 들어오므로 이번 회차부터 상시 점검 대상. **Unifi mini 최초 직접 실측 성공** |
| 안전 제약 준수 | 조회·탐색만. 위임(Delegate)·송금·뽑기 등 **상태 변경 액션 일절 미실행**. 직접 로그인 시도 없음 |

---

## 1. 점검 범위 (실제 방문 라우트)

**프로덕션(비로그인)** — `/` · `/reward/usdt` · `/reward/kaia` · `/boost/kaia`(리다이렉트 확인) · `/benefits/daily-mission` · `/apps`

**Beta(로그인 세션)** — `/` · `/benefits`(K-Pick) · `/benefits/daily-mission` · `/my` · `/my/token/{3종}` · 푸터 도메인 세트

**Unifi mini Beta(로그인)** — `/benefits-mini`(liff_id 리다이렉트 확인) · `/benefits-mini/daily-mission` · `/draw-promotion` · `/luckyball-invite` · `/curation/{uuid}×3` · `/channel/bridge/AFFORMATION`(링크 채집)

---

## 2. 변경 발견 — ⚠️ → 실측 승격

### 2-1. 🔴 최대 변경 — KAIA 스테이킹(위임) 출시 (#1 이월 항목 해소)

| 화면 | 라우트 | 확인한 구성 |
|---|---|---|
| **KAIA Reward 탭** 🆕 | `/reward/kaia` | **KAIA Dual Rewards: Base + Special** · **KAIA Staking** 위임으로 연 최대 4.2% / Accrued Reward / **Delegate** / Delegatable KAIA · **Special Contribution Rewards**(CR): KAIA 위임 + USDT 보유 시 **10 USDT당 최대 0.449999 KAIA** / Claimable reward / USDT principal · **Mission Check Period** STAGE 1 — 1R 7.23~8.2(진행 중) / 2R 8.2~8.12 / 3R 8.12~8.22 |
| **USDT Reward 탭** | `/reward/usdt` (구 `/boost/kaia` → 리다이렉트) | 부스트 티어 30만/40만/50만 KAIA = 1/2/3% 유지. **조건에 위임 KAIA 합산 신설** — "Unifi 지갑 보유 + Kaia Square의 Unifi 노드 위임 수량을 동등 반영" |

> #1에서 "공지 7/20 사전 안내 · 화면 미출시 · 추적 등록"으로 이월했던 **Kaia CR 미션이 실제 출시**됐습니다. 위임 정책도 함께 확인: 위임 시 자동 적립·개별 출금 불가 / 언디렐리게이트 후 **7일 쿨다운** 뒤 원금+보상 일괄 수령 / 쿨다운 종료 후 7일 미수령 시 **자동 재위임** / Kaia 네트워크 상황에 따라 보상 변동.

### 2-2. Beta 전용 — 릴리즈 예정 변경 (프로덕션 미반영)

| 구분 | 프로덕션(현재) | **Beta(릴리즈 예정)** |
|---|---|---|
| **GNB** | 4탭 — 홈·리워드·내 자산·마이 | **5탭 — 홈·K-Pick·리워드·내 자산·마이** (K-Pick 정식 승격) |
| **내 자산 액션** | 송금하기 / 입금하기 / 교환하기 / 은행송금 | **보내기 / 채우기 / 교환하기 / 은행출금** |
| 홈 배너 | Better Together(KAIA & USDT) | + 친구에게 JPYC 선물하기(럭키볼 최대 50,000 JPYC) / **결제 시 최대 15% 캐시백**(K-뷰티·K-컬처·쇼핑) / JPYC 연 최대 5%(기본 2%+3% 기간한정) |
| 가이드 카드 | USDT 알아보기 | + **JPYC 알아보기** (`/doc/jpyc`) |

> ⚠️ **액션 라벨 개편은 XLT 영향이 큽니다** — 용어집 v3.9~v4.0의 `보내기` ja 出金/出金元 개편과 같은 흐름입니다. XLT 작업 시 대상 환경(프로덕션/Beta)을 먼저 확정해야 합니다.

### 2-3. K-Pick 탭 실측 (Beta)

- **라우트 `/benefits`** — 리워드(`/benefits/daily-mission`)와 접두가 겹침. 서브탭 **K-Pick | MY쇼핑**, 상단 noti
- **카테고리 5종 → 3종 개편**: 구 클리닉·뷰티체험·바우처·화장품·K-Pop → **K-뷰티 · K-쇼핑 · K-컬처**
- 구성: JPYC 안내·구매 가이드 / 진행 중 예약 + **내 예약** / **바우처**(올리브영·다이소·CU편의점·이마트 모바일 금액권, 캐시백 8%·22%, ¥ 가격) / **K-뷰티 스킨부스터**(쥬베룩·리쥬란, 클리닉 다수, 캐시백 10%, 시술 예약 최대 2만원 할인) / 정품 인증
- ⚠️ **KR IP로도 전체 열람됨** — 기존 정책은 "KR IP 버튼 비노출 + 국가 서비스 불가 안내". 정책 변경인지 Beta 한정인지 확인 필요

### 2-4. Unifi mini 최초 직접 실측 (Beta)

그전까지 MINI app 진입 불가로 **위키 스펙에만 의존**했던 영역을 처음 라우트 단위로 확인했습니다.

| 라우트 | 화면 |
|---|---|
| `/benefits-mini` | mini 홈(liff_id 진입 시 자동 리다이렉트) — 상단 **qr**·noti / JPYC 안내 / **내 예약 N건 확인하기** / **데일리 미션하고 JPYC 받기** / **100% 당첨되는 JPYC 럭키볼** / 바우처·시술 목록 |
| `/benefits-mini/daily-mission` | mini 데일리 미션 |
| `/benefits-mini/draw-promotion` | mini 럭키볼 뽑기 프로모션 |
| `/benefits-mini/luckyball-invite` | mini 럭키볼 친구 초대 — **현재 위키 작업 중인 럭키볼 캠페인의 실제 라우트** |
| `/benefits-mini/curation/{uuid}` | mini 큐레이션 상세 (3건) |

> mini 푸터에 **어그리게이터 약관이 없음**을 확인 — IA.md §0 표의 "mini는 어그리게이터 약관/approve 미제공"에 대한 실측 근거가 생겼습니다.

---

## 3. ⛔ 사용자 승인 대기 — Screen ID 어휘 3건

| # | 대상 | 제안 | 근거·상태 |
|---|---|---|---|
| ① | 보유 NFT 목록 | `asset_nft_01` → `apps_mypage_nft_01` | 라우트 `/apps/my-page/nfts`. **#1에서 제안 → 사용자 "대기" 결정**. 확정 전까지 두 어휘 모두 신규 부여 금지 |
| ② 🆕 | `/reward/...` 부스트·스테이킹 영역 | ⓐ `reward_boost_usdt_01`·`reward_staking_kaia_01`(현재 잠정) / ⓑ 별도 주기능 `staking_` 신설 | `reward_`를 이미 GNB 리워드 탭(`/benefits/daily-mission`)에 쓰고 있어 **충돌**. 확정 전까지 이 영역 부여 금지 |
| ③ 🆕 | K-Pick 주기능 프리픽스 | `kpick_` (잠정 유지) | Beta에서 GNB 정식 탭 승격 + 라우트가 `/benefits`라 리워드와 겹침. 기존 XLT는 `UF_`/`mini_guidekim_` |

---

## 4. 변경 없음 확인 항목

- 프로덕션 리워드 탭: 출석 체크(1~5일) · 게임 미션 **6종 동일**(Squishy Cat Jump·MERGE CAT·Tap Tap Jello·Hook & Gold·Rich Match·SODA MERGE 2048) · Apps 둘러보기
- 프로덕션 `/apps`: Reward/Market 서브탭 · 카테고리 8종 · **27 Apps 동일** · 시세 위젯(기준일만 07.30으로 갱신)
- 부스트 티어 수치(30만/40만/50만 = 1/2/3%), 최대 100,000 USDT 한도, 일 00:00 UTC+0 기준
- 푸터 구성(약관 3종·개인정보 2종·마케팅·개발자·공지·FAQ·보안 감사·고객센터·X/Medium) — Beta는 동일 구성에 도메인만 beta 세트
- 프로덕션 GNB 4탭 라우트(`/`·`/benefits/daily-mission`·`/my`·`/setting`)

---

## 5. 미완 / 다음 점검 이월

| 항목 | 사유 |
|---|---|
| ⚠️ **로그인 리워드 탭 문구 (2주 연속 미완)** | `/benefits/daily-mission`이 스켈레톤에서 로딩 완료되지 않음. **프로덕션(7/27)·Beta(7/30) 모두 재현**. 다음 점검에도 재현되면 서비스측 이슈로 별도 보고 |
| **MY쇼핑 서브탭 상세** | K-Pick 상단 탭 클릭 시 라우트가 바뀌지 않아 내용 미확인 |
| **위임(Delegate) 입력·확인 화면** | 상태 변경 액션 — 의도적 미진입 |
| Mission Check Period 전체 보기(View all) | 미진입 |
| 송금 2단계·QR, 거래 상세, 플러스 모드 상세, `/payout`, 브릿지 상세, 계정 탈퇴, 황금럭키볼 | #1에서 이월 — 이번 회차 우선순위(신규 기능)에 밀림 |
| **Beta 액션 라벨의 프로덕션 반영 시점** | 추적 항목 신설 — 반영되면 XLT 문구 일괄 영향 |
| **K-Pick KR IP 정책** | Beta에서 KR IP 전체 열람 확인 → 정책 변경 여부 확인 필요 |
| Wallet Mode 실측 | US/UK/CA/SG IP 필요 — 여전히 위키 스펙 근거 (mini는 이번에 Beta로 해소 착수) |

---

## 6. IA.md 갱신 위치 요약

| 섹션 | 변경 |
|---|---|
| 분석 이력 | 2026-07-30 주간 점검 #2 행 추가 |
| **§0-0 신설** | **점검 환경 표(프로덕션/Beta/mini Beta)** + Beta 부속 도메인 4종 |
| §0-2 탭 노출 매트릭스 | K-Pick 행에 "Beta에서 GNB 정식 탭 승격" 반영 + GNB 실측 비교(프로덕션 4탭 / Beta·mini 5탭) |
| §0-3 라우트 참고 | **리워드 라우트 이원화 경고**(`/reward` ≠ `/benefits` ≠ `/benefits/daily-mission`) + `/boost/kaia` 리다이렉트 |
| §2-1 home | `home_benefit_together_01` 신설(Better Together), `home_guide_jpyc_01` 신설, 구 `home_boost_kaia_01` 제거(→ §2-2-1로 이전) |
| **§2-2-1 신설** | **부스트·스테이킹 보상 영역** — `/reward/usdt`·`/reward/kaia` 트리 + 위임 정책 |
| §2-3 asset | **액션 라벨 프로덕션/Beta 대조표** + Beta 토큰 카드 표기 |
| §2-7 mini/K-Pick | K-Pick 트리 전면 갱신(라우트·서브탭·카테고리 3종·바우처·시술), `kpick_myshopping_01` 신설, **mini Beta 라우트 5종 블록 신설** |
| §4 미확정 | Kaia CR 항목 **완료 처리**, 승인 대기 ②③ 신설, 2주 연속 미완 항목 명시, Beta 라벨·K-Pick IP 추적 신설 |

---

*작성: Claude Code 스케줄 태스크 `weekly-unifi-ia-check` · 다음 실행: 2026-08-03(월) 10:00*
