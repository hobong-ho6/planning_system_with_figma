# Unifi IA 주간 정기 점검 리포트 — 2026-07-27 (#1)

| 항목 | 내용 |
|---|---|
| 점검 대상 | unifi.me (Unifi 풀 모드 · KR IP) |
| 점검 방법 | ① 인앱 브라우저 비로그인 탐색(모바일 375px) ② 사용자 Chrome 로그인 세션 실측 ③ 공지사항 목록 교차 확인 |
| 정본 파일 | `md/IA.md` |
| 커밋 | `144002a` — origin/main 반영 완료 (44줄 추가 / 19줄 수정) |
| 안전 제약 준수 | 조회·탐색만 수행. 송금·교환·출석하기·뽑기 등 **상태 변경 액션 일절 미실행**. 직접 로그인 시도 없음 |

---

## 1. 점검 범위 (실제 방문 라우트)

**비로그인** — `/` · `/benefits/daily-mission` · `/benefits/games/{uuid}` · `/apps` · `/apps/market` · `/boost/kaia` · `/my`(→ 로그인 게이트 리다이렉트 확인)

**로그인** — `/` · `/my` · `/my/token/transaction` · `/my/token/{컨트랙트주소}` · `/transfer` · `/deposit` · `/apps/trade/swap` · `/apps/my-page/nfts` · `/setting` · `/notification` · `/announcement` · 은행송금(외부 Sentbe 이탈)

---

## 2. 변경 발견 — ⚠️ 추정 → 실측 승격 5건

| 화면 | 실측 라우트 | 확인한 구성 |
|---|---|---|
| **Apps 메인** | `/apps` | **비로그인 열람 가능**. Reward/Market 2개 서브탭 · 앱 검색 · 시세 위젯(Binance KAIA·CoinMarketCap USDT·기준일) · USDT/KAIA Reward Missions(외부 dapp 미션형 보상) · Editor's Pick · Explore Apps(카테고리 8종 AI·CONTENT·DePIN·GAME·Payment·SOCIAL·SocialFi·ETC / 27 Apps / Popular 정렬) |
| **Apps 마켓** (신규 기록) | `/apps/market` | Buy/Sell · Drops(Live & Upcoming / Past / Now) · NFT 드롭 카드(가격 KAIA·수량·판매율) |
| **알림 목록** | `/notification` | 필터 6종: 전체·안읽음·공지사항·계정/보안·예치·입출금. 홈·리워드 헤더 벨에서 진입 |
| **게임 미션 상세** | `/benefits/games/{uuid}` | 참여자 수·일일 미션 카운트다운 / 보상 수령(예: 30분 자유 이용권) / 세부 미션 진행도 3종 / 게임 소개·미리보기 / 공식 계정(Discord·Medium·X·Instagram) / FAQ / 플레이 |
| **은행송금** | → **외부** `unifi.sentbe.com/calculator` | `?session_id=…&redirect_uri=https://www.unifi.me/payout&language=ko_kr`. Sentbe 화면(USDT→KRW 계산기·TripleA 라이선스·"인증하러 가기")은 **Unifi 화면이 아님 → Screen ID 부여 대상 아님**. 복귀 라우트 `/payout`만 Unifi 화면 |

## 3. 신설·변경 사항

- **입금 화면에 브릿지 신설** — "지원하는 네트워크 확인하기 / 어떤 네트워크에서 보내도 수수료 없이 전액 도착 / 브릿지 출시 기념 수수료 무료 이벤트" 배너 + 진입점. 토큰 카테고리 탭(스테이블 코인 / 다른 토큰) 확인. 상세 화면은 미진입 → `asset_deposit_network_01 ⚠️`로 신설. 근거: 공지 2026-06-30 "Unifi 브릿지 수수료 100% 지원 이벤트 기간 연장"
- **JPYC 이자 서비스 (최대 연 5%)** — 홈 실측 + 공지 2026-06-29 출시. §0 모드 표에 `JPYC 이자` 행 신설(풀 모드 제공 / Wallet Mode·mini 미제공)
- **KAIA 부스트 티어 실측** — 300,000 / 400,000 / 500,000 KAIA = 1 / 2 / 3%, 플러스 모드 USDT 적용, 일 00:00 UTC+0 기준, 최대 100,000 USDT까지. 근거: 공지 2026-07-02 "참여 조건 일부 완화"
- **mini K-Pick 탭 정식 출시 + JPYC 결제 도입** — 공지 2026-07-10. §0 결제 행에 JPYC 결제 병기
- **로그인 게이트 라우트 확정** — `/auth/sign-in?returnUrl={원래주소}`. `/my`·`/setting`은 리다이렉트, `/`·`/benefits/daily-mission`·`/apps`는 비로그인 열람 가능
- **라우트 채집 보강** — 가이드 `/doc/usdt`·`/doc/wallet`·`/doc/trust`·`/guide`·welcome.unifi.me / 약관 `/term/TERMS_OF_SERVICE/{UNIFI|WALLET|AGGREGATOR}` / 개인정보 `/term/PRIVACY_POLICY/{UNIFI|WALLET}` / 마케팅 `/term/MARKETING_POLICY/UNIFI` / 공지 상세 `/announcement/{uuid}`
- **푸터 공통 블록 신규 기록** — 약관 3종·개인정보 2종·마케팅 동의·For Developers(developers.unifi.me)·공지사항·FAQ·**보안 감사 보고서**(contract-audit.unifi.me)·고객센터(contact.unifi.me)·SNS(X·Medium)
- 홈 레퍼럴 배너가 **3차 캠페인**(promotion.unifi.me/referral-campaign-3)으로 교체됨 (공지 2026-07-17)

## 4. ⛔ 사용자 승인 대기 — Screen ID 어휘 정정 1건

| 현행(IA.md) | 정정 제안 | 근거 |
|---|---|---|
| `asset_nft_01` (보유 NFT 목록) | **`apps_mypage_nft_01`** | 진입 라우트가 `/apps/my-page/nfts` — 공식 룰상 `/apps/...`는 `apps_` 프리픽스 영역. `/apps/my-page` 단독 진입은 `/my`로 리다이렉트 |

> IA.md에는 **정정 제안으로만 기록**했고 Screen ID를 부여하지 않았습니다(§3-6 검토 게이트 준수). 승인 시 트리에서 `asset_` → `apps_`로 확정합니다.

## 5. 변경 없음 확인 항목

- 하단 GNB 4탭 구성·라우트: 홈 `/` · 리워드 `/benefits/daily-mission` · 내 자산 `/my` · 마이 `/setting`
- 마이/설정 항목 전체(인증·보안 3종 / 개인 키 / 언어·통화 / 알림 설정 / FAQ·문의 / 오픈소스 라이선스 / 로그아웃 / 계정 탈퇴 링크)
- 내 자산 구성: 총 자산 · 액션 4종(송금·입금·교환·은행송금) · 토큰 4종(USDT/KAIA/JPYC/IDRP) · 보유 NFT
- 거래내역 필터 4종(기간·토큰·유형·정렬), 토큰 상세(플러스 모드·Unifi 지갑·누적 이자)
- 교환하기 `/apps/trade/swap` 구조(From/To·최대·교환)
- 리워드 구조(리워드 USDT·럭키볼 요약 / 출석 체크 1~5일 / 게임 미션 6종 / Apps 둘러보기)
- 소셜 로그인 5종(Google·LINE·Naver·Kakao·Apple)

## 6. 미완 / 다음 점검 이월

| 항목 | 사유 |
|---|---|
| **로그인 상태 리워드 탭 문구** | 3회 재시도했으나 스켈레톤에서 로딩이 완료되지 않음. 비로그인 구조로 갈음 — 다음 점검 재시도 |
| 송금 2단계·QR, 거래 상세 | 목록 항목 클릭이 동작하지 않아 미진입 (⚠️ 유지) |
| 뽑기 결과 팝업, 플러스 모드 상세, 계정 탈퇴 | 상태를 바꾸는 액션이라 **의도적으로 진입하지 않음** |
| `/payout`(은행송금 복귀), 지원 네트워크(브릿지) 상세 | 조건부 화면 — 미진입 (⚠️ 신설 기록만) |
| **Kaia CR 미션 추적** | 공지 2026-07-20 "Unifi에 USDT 예치 + Unifi 노드에 KAIA 위임" 사전 안내. 화면 미출시 → §4 추적 항목 등록(어휘 후보 `asset_delegate_*` / `home_boost_*`) |
| Wallet Mode·Unifi mini 실측 | US/UK/CA/SG IP·MINI app 진입 불가 환경 — 위키 스펙 근거 유지 |

## 7. IA.md 갱신 위치 요약

| 섹션 | 변경 |
|---|---|
| 분석 이력 | 2026-07-27 주간 정기 점검 #1 행 추가 |
| §0 제품 모드 표 | `결제` 행에 JPYC 결제 병기, **`JPYC 이자` 행 신설** |
| §0-3 라우트 참고 | 로그인 게이트 / NFT는 Apps 영역 경고 / 외부 이탈 도메인 6종 추가 |
| §2-1 home | KAIA 부스트 티어 실측, 가이드·FAQ·공지·약관 라우트 명기, 알림 목록 ⚠️ 해제, 푸터 공통 블록 신설 |
| §2-2 reward | 게임 미션 상세 ⚠️ 해제 + 라우트·구성 명기 |
| §2-3 asset | 입금 설명 갱신, `asset_deposit_network_01` 신설, 은행송금 ⚠️ 해제(외부 위임), `asset_payout_01` 신설, NFT 항목을 §2-4로 이관(정정 제안 주석) |
| §2-4 apps | `apps_main_01` ⚠️ 해제·구성 상세, **`apps_market_01`·`apps_mypage_nft_01` 신설** |
| §2-8 login | 로그인 라우트 `/auth/sign-in?returnUrl=…` 명기 |
| §4 미확정 | 승격 항목 정리, NFT 어휘 정정·Kaia CR·브릿지 상세 추적 항목 신설, K-Pick 출시 확인 주석 |

---

*작성: Claude Code 스케줄 태스크 `weekly-unifi-ia-check` · 다음 실행: 매주 월요일 10:00*
