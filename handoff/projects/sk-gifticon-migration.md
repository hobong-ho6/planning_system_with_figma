# sk-gifticon-migration — SK플래닛 기프티콘 서버 이관(2026-10-13) 영향·고지

> 담당자: `hogeun` · 마지막 갱신: 2026-10-13 08:12 · 세션 #8(AD03230205 · 새 계정) · Auto-react `c2c6a22` · 위키 **v74** · 위키 **v69**
>
> 📌 **범위**: SK플래닛 사업양수도에 따른 **기프티콘 서버 이관(2026-10-13 00:00~08:00 KST=JST · 8시간)** 의 Unifi 영향 확정과 **사용자 고지**(공지사항·앱푸시·OA·화면 배너·구매 차단).

## 🔴 진행 중 — 10/12~13 이관 당일 운영 (다른 PC에서 이어받기 · 이 절을 먼저 읽는다)

**확정 계획(사용자 2026-10-12)**: 23:00 배너 공개(LPC 예약) → **23:50 구매 버튼 비활성화 = Claude가 API로 `buy_block_on_off=true`** → 08:00 공개 취소(LPC 예약). 이관 작업 00:00~08:00 KST(=JST).

| 시각(KST) | 동작 | 누가 · 어떻게 | 상태(10/12 11:42 실측) |
|---|---|---|---|
| 10/12 23:00 | prod `maintenance_banner` **공개** — 배너 노출 · 구매 가능 | **LPC 예약 공개**(사용자 설정 · 5개 언어 · `env=main` · `actionAt` 14:00Z) | 5건 `READY` ✅ |
| 10/12 **23:50** | prod 5개 언어 **`buy_block_on_off` false → true** | **Claude가 CMS API로** — 아래 실행 절차 | ⚠️ 원래 PC(`AL02359162`) 세션에 **세션 전용 예약(CronCreate · 23:46 시작)**만 있다 → **다른 PC 세션에는 예약이 없다. 이어받는 세션이 23:46쯤 직접 실행**(또는 사용자가 CMS 화면에서 직접 켠다) · 🔁 **10/12 20:00 변경 — Claude 계정 SSO 전환(22:00 기존 계정 삭제 · 22:00~24:00 Claude 이용 불가 · Auto-react HANDOFF 🚨 절)** 때문에 Claude 세션 예약은 못 돈다 → **`AD03230205` Chrome 탭(landpress CMS · 제목 「[live 대기] 23:50 KST buy_block ON」)에 브라우저 타이머를 걸어 두었다** — Claude와 무관하게 23:50:00 KST에 5개 언어 read-modify-write PUT(`buy_block_on_off:true` · `published:true` · 이미 true면 건너뜀 · 3회 재시도) · 20초 간격 확인 · 5분마다 keepalive · 결과는 그 탭 `localStorage` `bb_live_result` · `bb_live_log` · `bb_live_backup_{locale}`(PUT 직전 값) + 탭 제목 「[live 완료] …」 · DRY 타이머 실발화 테스트 통과(목표 +5초) · iMac 시스템 잠자기 0(안 잔다) · CMS 예약으로는 필드 값 변경 불가(사용자 확인) · ⚠️ 탭 · Chrome을 닫거나 CMS 로그인이 풀리면 실패 → **23:50 직후 사용자가 탭 제목 또는 공개 API로 확인**, 안 됐으면 CMS 화면에서 직접 켠다 · 00:00 이후 새 계정 세션이 결과 확인 · 백업 저장(`landpress/maintenance_banner/20261012_buy_block_on/`) · Auto-react 커밋 |
| 10/13 08:00 | prod **공개 취소** | **LPC 예약**(사용자 설정 · 5개 언어 · `actionAt` 23:00Z) | 5건 `READY` ✅ |

- **지금 값(10/12 11:42)**: prod 5개 언어 `published=false` · `on_off=true` · `buy_block_on_off=false` / beta 5개 언어 `published=true` · 둘 다 `true`(검증용 · 건드리지 않는다) · beta 예약 0건
- **23:50 실행 절차** (⛔ CLAUDE.md 「LPC 쓰기 규칙」 · `md/landpress.md` §10-3-0)
  1. `python3 scripts/check_lpc_nulls.py --env LV_prod` → exit 0(아니면 중단 · 보고)
  2. Claude in Chrome 새 탭 `https://landpress-content-v2.linecorp.com/projects`(⚠️ Chrome에서 이 도메인은 열린다 · 로그인은 **사용자**가 한다 — 401이면 재로그인 요청 후 대기)
  3. 5개 로케일 GET `/api/v1/projects/w5eph4y9qxe05c8fqpi7rlxh/collections/maintenance_banner/items/1?locale={en_US|ko_KR|ja_JP|zh_TW|th_TH}` → 백업 `landpress/maintenance_banner/20261012_buy_block_on/` · 23:00 공개 실행 여부(`published`) 기록 — 안 됐으면 이 PUT의 `published:true`로 함께 공개된다(그대로 진행 · 보고)
  4. **23:50:00 KST까지 브라우저 JS에서 await로 대기** → 로케일별 read-modify-write `PUT …/items/1?locale=…` — 받은 객체의 콘텐츠 필드 전부 + `buy_block_on_off:true` + `published:true`(다건) · 시스템 필드(`id·postId·locale·primaryLocale·published·createdAt·updatedAt·uid·_env·createdBy·updatedBy·_publishReservations`)는 뺀다(`scripts/restore/lpc_safe_put.js` 방식 · ⚠️ `contents` 키 순서는 서버가 재정렬하므로 대조는 키 순서 무관)
  5. 재GET 5/5 + 공개 API `https://landpress-content.line-scdn.net/contents/v2/projects/w5eph4y9qxe05c8fqpi7rlxh/collections/maintenance_banner/items?locale=…`로 노출 확인 → `check_lpc_nulls.py --env LV_prod` exit 0
  6. 백업 → Auto-react `reports/landpress/` 커밋 · 푸시 → 사용자 보고
  - ⚠️ 자동 승인 모드는 prod LPC PUT을 「Production Deploy」로 막는다(세션 #4 · #5 실측) — 사용자 허용이 필요할 수 있다 · 브라우저 JS 45초 초과 시 중간에 멈춘다 → 공개 API로 확인 후 남은 로케일만 재실행
  - **비상 수단**: CMS 화면에서 prod `maintenance_banner` 각 언어의 `buy_block_on_off`를 켜고 저장 · 공개(사용자)
- **08:00 이후 확인할 것**: ① 공개 취소 실행 확인(공개 API 0건) ② **FE가 「비공개 = 배너 숨김 · 구매 가능」으로 처리하는지 화면 확인**(미검증) ③ 비공개여도 저장값은 `buy_block_on_off=true`로 남는다 — 나중에 재공개하면 구매가 바로 막힌다 → **두 스위치를 false로 되돌릴지 사용자 결정**(미정) ④ 지연 시 OA-3(prod `2028`)
- 예약 공개 API · 시간대 정리: `md/landpress.md` **§10-2-1**(커밋 `476de3e`)

## 🆕 새 계정 세션 첫 작업 — Claude SSO 전환(10/12 22:00) 이후 이 PC(`AD03230205`)에서 처음 여는 세션 (2026-10-12 20:10 기록)

> 배경: 22:00에 기존 Claude 계정이 삭제되고 22:00~24:00은 Claude를 쓸 수 없다(Auto-react HANDOFF 「🚨 Claude 계정 SSO 전환」). 이전 계정의 Code 탭 세션은 새 계정에서 보이지 않는다 — **이 절이 인수인계의 전부다.** 23:50 구매 차단은 Claude가 아니라 **Chrome 탭 타이머**가 실행한다(위 「🔴 진행 중」).
> ⛔ **시작 시각이 23:50 전이면 타이머를 다시 걸지 않는다**(중복 실행 방지 — 스크립트가 「이미 true면 건너뜀」이지만 탭 두 개가 동시에 돌 이유가 없다). 확인만 하고 대기한다.

### A. 설정 확인 (시각 무관 · 먼저)

| # | 확인 | 방법 | 기대값 / 실패 시 |
|---|---|---|---|
| A-1 | 계정 | 앱 설정 → 계정 이메일 | `…@teamN.lnxtcorp.com` · 아니면 사용자에게 재로그인 요청(Auto-react HANDOFF B-7·8) |
| A-2 | 저장소 | `git pull --rebase`(PS · `~/Documents/Auto-react` 둘 다) · `git config --get handoff.person` | `hogeun` · Auto-react에는 다른 세션의 미커밋 변경이 있을 수 있다 — 손대지 않는다 |
| A-3 | MCP | `claude mcp list` | `landpress-content`(🆕 10/12 등록 · user scope) · `noahs-mcp-wiki/jira/slack` · `dropweb` 모두 ✔ Connected · **사라졌으면** 백업 `~/claude-backup-2026-10-12/claude.json.bak`의 `mcpServers`로 재등록(`claude mcp add landpress-content --scope user -- npx -y --registry https://npm.linecorp.com @linecorp/landpress-content-mcp`) |
| A-4 | 토큰(키체인) | `security find-generic-password -s confluence-pat -w`로 넘겨 `/rest/api/user/current` · `figma-pat` → `/v1/me` · `jira-pat` → `/rest/api/2/myself` | 계정 전환과 무관해야 한다(키체인) · 값은 출력하지 않는다 |
| A-5 | 스킬 | `/claude-chat-restore` · `handoff` 목록에 있는지 | 사용자가 터미널로 설치 완료(10/12) · 앱 재시작 후 노출 |
| A-6 | Claude in Chrome | `tabs_context_mcp` → 탭 목록 | 23:50 타이머 탭(제목 「[live 대기] …」 또는 「[live 완료] …」)이 보이는지 · ⚠️ 확장이 새 계정으로 다시 연결돼야 한다 — 안 보이면 사용자에게 Chrome 확장 로그인 요청 |

### B. 23:50 구매 차단 확인

- **23:50 전에 시작했으면**: 타이머 탭에서 읽기만 — `localStorage` `bb_live_armed`(fireAt `2026-10-12T14:50:00Z` · DRY false) · `bb_live_log` 마지막 `keepalive 200`이 5분 안쪽인지 · 탭이 없거나 keepalive가 401이면 **사용자에게 즉시 알린다**(CMS 재로그인 필요 — 로그인은 사용자). 23:51 이후 아래로
- **23:50 이후**:
  1. 타이머 탭: `localStorage.bb_live_result` → 5개 언어 `OK`(또는 `SKIP 이미 true`) · 탭 제목 「[live 완료] en:OK ko:OK ja:OK zh:OK th:OK」
  2. 공개 API 5/5: `https://landpress-content.line-scdn.net/contents/v2/projects/w5eph4y9qxe05c8fqpi7rlxh/collections/maintenance_banner/items?locale={en_US|ko_KR|ja_JP|zh_TW|th_TH}` → `buy_block_on_off=true` · `on_off=true` · 문구 3필드 그대로
  3. `python3 scripts/check_lpc_nulls.py --env LV_prod` → exit 0
  4. 백업 저장: 탭의 `bb_live_backup_{locale}`(PUT 직전 값) + 공개 API 결과 → `landpress/maintenance_banner/20261012_buy_block_on/` → Auto-react `reports/landpress/maintenance_banner/` 커밋 · 푸시(경로 지정 커밋 — 남의 미커밋 변경 제외)
  5. **실패했으면**(탭 없음 · `ERR` · 공개 API false): 사용자에게 CMS 화면에서 5개 언어 `buy_block_on_off` 켜고 저장 · 공개 요청(가장 빠름). 또는 사용자 승인 후 `scripts/restore/lpc_safe_put.js` 방식으로 API 실행(위 「🔴 진행 중」 23:50 실행 절차)
  6. 이 절 B에 결과 기록 → 커밋 · 푸시 → 사용자 보고

### C. LPC 값 바꾸는 방법 확인 — LandPress Content MCP (🆕 10/12 이 PC에 설치 · 아직 실사용 0회)

> 패키지 `@linecorp/landpress-content-mcp`(사내 npm · `0.1.0-alpha.17` · README 기준 · 미검증). 첫 실행 시 Chrome 로그인 창 → 쿠키 자체 저장(Claude 계정과 별개).

1. **도구 목록 확인** — 세션의 MCP 도구에 `auth_status` · `item_*` · `schema_*` 등이 보이는지. `auth_status`로 로그인 상태 확인(로그인은 사용자)
2. **읽기 확인(쓰기 없음)** — prod `w5eph4y9qxe05c8fqpi7rlxh` · `maintenance_banner` · postId 1의 5개 언어를 MCP로 읽어 공개 API · CMS 값과 같은지 대조
3. **쓰기 동작 확인은 beta에서만 · 사용자 승인 후** — README상 `item_update`는 공개된 항목을 **수정본(`modified`)에만** 저장하고 `published` · 시스템 필드를 거부한다. 확인할 것: ① 한 필드만 보내도 나머지 필드가 보존되는지(지금 PUT 방식의 null 사고를 막는지) ② 수정본이 공개 API에 나가지 않는지
4. **실제 반영(`item_republish`) · 공개 · 공개 취소 · 삭제는 숨겨져 있다** — 쓰려면 `LANDPRESS_CONTENT_ENABLE_DANGEROUS_TOOLS=true`를 MCP env에 넣고 재시작해야 한다 · ⛔ **사용자 결정 없이 켜지 않는다**
5. **예약 공개 도구는 없다**(README) — 시각 지정 작업은 CMS 예약(공개 · 공개 취소만) 또는 브라우저 타이머
6. 결과를 `md/landpress.md`(§10 쓰기 경로)에 반영 — 전역 규칙이 바뀌면 가이드 대기 목록 등재(`md/guide-backlog.md`)

### D. 10/13 08:00 이후 (위 「🔴 진행 중」과 같음)

- 공개 취소 실행(공개 API 0건) · FE가 「비공개 = 배너 숨김 · 구매 가능」인지 화면 확인 · 저장값 `buy_block_on_off=true`가 남는다 → **두 스위치를 false로 되돌릴지 사용자 결정** · 지연 시 OA-3(prod `2028`) · Auto-react HANDOFF 「다음 세션 첫 작업」(예약 작업 6개 생존 확인 · 🚨 절 삭제)은 Auto-react 세션 소관

## 대상 / 링크

- 위키(정본): [4770508162](https://wiki.workers-hub.com/pages/viewpage.action?pageId=4770508162) 「SK플래닛 기프티콘 서버 이관(2026-10-13) 영향 및 사용자 고지 방안」 — **v52** · 부모 `[Hogeun]` `3910828993` · 공간 `UNIFI` · ⚠️ 10/6 v55~58 **앱푸시 관련 내용 전체 삭제**(사용자 지시 — 다른 세션)
- Figma `GOCHAYBS7hIrmWRGNuJOKV` 섹션 **`76061-19095`**(09-30 노출 위치 변경 정본) — `76061-19216` 상품권 목록(①) · `76061-19102` 상품권 상세(②) · `76061-19385` 홈(③). 종전 `75999-3299`·`75999-3298`은 대체됨
- 첨부 본문 참조 **6건**: `annotated_76061-19216/19102/19385.png` · `oa_sample_1_notice/2_holder/3_delay.png`(OA 근사 렌더 · **10/6 순화 문안·줄 단위 구조**) — 미참조였던 `annotated_75999-3299/3298.png`는 **삭제**(09-30 사용자 지시 · 본문 이미지 참조 0 확인 · 첨부 6건 = 전부 참조)
- **LPC `maintenance_banner`**(LV · beta `a2qaxhygpi95g8l4a48n2vn4` / prod `w5eph4y9qxe05c8fqpi7rlxh` · 다건 · `postId=1` · ⚠️ `primaryLocale=en_US`)
  - 필드: `contents.title`(①② 문구) · **`contents.homeTitle`·`homePeriod`**(③ 홈 2줄 · 09-30 추가) · `contents.targetUrl`(배너 클릭 이동 · 비면 이동 안 함 · **환경별 값** beta `https://miniapp.line.me/2008994547-GfGUdDxy/announcement/019fd56b-525f-7f30-9a3f-095e7504bb91` / prod `https://miniapp.line.me/unifi/announcement/01a0f60f-1b1e-71c3-abae-fc53dc81e8ab` — **10/6 게시 공지사항으로 교체(10-07 · 종전 `01a04617…`)**) · **`on_off`**(①②③ 배너 노출 · `category_promotion_banner` **대체**) · **`buy_block_on_off`**(「바로 구매하기」 비활성)
  - 현재값: beta `on_off=true`·`buy_block=true`(검증용 · 의도) / prod **둘 다 `false`** · 5개 언어 문구 반영·**beta↔prod 동치**
- **OA 3종**(Landpress `oam_message_task_multi` · **5개 로케일 게시** · LIAM **isActive Yes**) — **10/6 순화 문안 · 본문 줄 단위 text 구조 · beta=prod 동치**

  | | Title | beta postId / messageId | prod postId / messageId |
  |---|---|---|---|
  | OA-1 (D-7 10/6) | 상품권 점검 OA-1 사전 공지 (D-7) | `244` / `N6abb47c2e2e22156952d50ed` | `2026` / `N6abb49089af6303f1a2104a1` |
  | OA-2 (D-1 10/12) | 상품권 점검 OA-2 보유자 안내 (D-1) | `245` / `N6abb47e8896fa02756cbd19c` | `2027` / `N6abb495d8b43b853bdb6e3fe` |
  | OA-3 (조건부) | 상품권 점검 OA-3 시간 연장 안내 (조건부) | `246` / `N6abb4806896fa02756cbd19d` | `2028` / `N6abb497c9af6303f1a2104a2` |
  | 🆕 OA-4 (완료 · 10/13) | 상품권 점검 OA-4 완료 안내 | `259` / `N6acd688f1bf0d337ff2ba045` | `2066` / `N6acd69298b43b853bdc76a35` |

  LIAM 채널 beta `Unifi Beta OA (2010418473)` · prod `Dapp Portal (2006670905)` · OA-2 placeholder `product_order_detail_url`
- 게이트 리포트(로컬 · gitignore · **사본 Auto-react `reports/gate/` `df94076`**): `reports/gate/gate_report_20260929_sk_notice_5lang.md`(공지 76셀 · 교정 4 · P0 0) · `…_maintenance_banner_short.md`(단축 4셀 · P0 0 · Auto-react `3744edc`) · `reports/gate/gate_report_20260929_sk_oa3_5lang.md`(OA 132셀 · 교정 9 · P0 0) · `reports/gate/gate_report_20260929_maintenance_banner_5lang.md`(배너 · P0 0) · **`reports/gate/gate_report_20261006_sk_oa_soften_5lang.md`**(OA 순화 5개 언어 · §1~7 · P0 0 · 텍스트 정본 `oa_soft_20261006_5lang.json`)
- LPC 복구원: `landpress/maintenance_banner/`(10) · `landpress/oam_message_task_multi_sk_gifticon/`(15 — CMS 라이브 해시 일치 확인) → **Auto-react `reports/landpress/` 커밋 `df94076`** · **10/6 현행 복구원 `landpress/oam_message_task_multi_sk_gifticon/20261006_soften/`**(beta·prod 30 + `_texts_5lang.json` — 공개 API 깊은 비교 30/30) → Auto-react `21a2906` · ⚠️ 상위 폴더 `oa_sample_*.json` 15개는 **10/6 이전 문안**(구버전)
- 관련: [4727978725](https://wiki.workers-hub.com/pages/viewpage.action?pageId=4727978725)(LPC 관리 영역) · `4155694391`(Apps Market 점검 공지 선례) · 표성만님 수정안 = 위키 코멘트 `4795141082`(2026-09-28)

## 현재 상태

- **등록 완료 · 운영만 남음** — 화면 배너 ①②③ · OA 3종(10/6 순화 문안 · beta=prod · LIAM isActive) · 공지사항 5개 언어(10/6 게시) · FE 분기 기준 전달 완료. 운영 순서는 위 「🔴 진행 중」(10/12 확정안)
- 영향 = 전 상품권 구매·환불 불가(올리브영은 사용도 불가지만 실영향 🟢) · 배너 문구 「10/13 00:00~08:00 상품권 구매·환불 일시 중단」 · My는 고지 제외
- 상세(문안 정본 · 화면 고지 5-5 · OA 개정 경위 · FE·BE 전달)는 [`sk-gifticon-migration/history.md`](sk-gifticon-migration/history.md) 「현재 상태 상세」

## 진행 중 작업(WIP)

✅ **10/12 23:50 구매 차단 완료**(세션 #8 실측) — 타이머 23:50:09 실행 · 5개 언어 OK(14:50:10~13Z) · MCP `item_list`·공개 API 5/5 `buy_block_on_off=true`·`on_off=true`·문구 3필드 그대로 · `check_lpc_nulls --env LV_prod` exit 0 · 백업 `landpress/maintenance_banner/20261012_buy_block_on/`(before·after 5+5 + `_timer_result.json`) → Auto-react `ae90526` · 타이머 탭은 실행 후 사라짐(결과는 같은 도메인 `localStorage`에 남음) · 08:00 공개 취소 예약 5건 `READY` · ⚠️ en_US만 23:05:54 수정 흔적(값 정상 · 원인 미확인)
- LandPress MCP 확인(세션 #8): `auth_status` 정상 · prod/beta 프로젝트 모두 2024-09-19 생성 → 안내서상 `item_update`가 **라이브 즉시 반영**(republish 불필요) · ⚠️ `item_update`에 **locale 인자가 없어** 다국어 행 지정 방법 미검증 · 예약 기능 없음 → 이번엔 타이머 유지(사용자 결정) · 쓰기 시험은 beta에서 후속

## 다음 할 일

- [x] 10/6 OA-1 발송(prod 템플릿 `N6abb49089af6303f1a2104a1`) — 순화 문안 · 줄 단위 구조 · ja 현지인 검토 반영 후 LIAM 재LOAD(사용자)
- [x] 10/12 23:50 prod `buy_block_on_off=true` — 브라우저 타이머로 완료(5/5 · Auto-react `ae90526`)
- [ ] LandPress MCP `item_update` 다국어 행 지정 방법 beta 시험(사용자 승인 후)
- [x] 10/13 08:00 공개 취소 실행 확인(공개 API 0건 · 08:03)
- [x] **OA-4 점검 완료 안내 신설**(10/13 사용자 지시 · 친구추가 사용자 전체) — 5개 언어 게이트 P0 0(`reports/gate/gate_report_20261013_sk_oa4_done_5lang.md`) · 위키 v70~72 · Landpress beta `259`·prod `2066` · LIAM beta·prod 생성(isActive Yes) · 복구원 `landpress/oam_message_task_multi_sk_gifticon/20261013_oa4_done/` → Auto-react `c1fe791` · ✏️ **prod만 문안 수정**(사용자 지시 · 점검 기간·「점검 중 이용에 불편…」 삭제 · LIAM prod LOAD→UPDATE · 위키 v73) · beta 259·LIAM beta도 prod와 동일하게 맞춤(공개 API 5/5 · 위키 v74) · **발송은 운영(사용자)**
- [x] 10/13 스위치 2개(`on_off`·`buy_block_on_off`) **false 원복** — beta·prod 5개 언어(사용자 지시 · prod 비공개 유지 · beta 공개 유지) · 문구 보존 · check_lpc_nulls exit 0 · 백업 `landpress/maintenance_banner/20261013_switches_off/` → Auto-react
- [ ] FE 처리 확인(비공개 = 배너 숨김 · 구매 가능)
- [ ] LandPress MCP 쓰기 시험(beta) — 10/13 읽기는 실사용 OK · 쓰기는 미시험
- [ ] (확인 필요) 10/12 OA-2 발송 여부 — 이 세션에서 확인하지 않았다
- [ ] (선택) OA-2·OA-3 ja 현지인 검토 — 받으면 ja만 키 단위 패치(Landpress beta·prod + LIAM 재LOAD). ⚠️ OA-1 「申し訳ありません」 ↔ OA-2·3 「申し訳ございません」 경어 수준 불일치(게이트 §7 d-2)
- [ ] Auto-react 미푸시 커밋 정리 — 이 세션 5건(`1b1ea04`~`21a2906`) 앞에 **다른 세션 watch 커밋 4건**이 미푸시로 쌓여 있어 푸시 보류

## 주요 결정 사항 (이 프로젝트 한정 · 최신 기준만 — 번복된 안은 뺐다)

| 날짜 | 결정 | 근거 |
|---|---|---|
| 10-12 | **이관 당일 운영 = 23:00 배너 공개(LPC 예약) → 23:50 구매 차단(Claude API) → 08:00 공개 취소(LPC 예약)** — 종전 「D-Day 00:00 차단 · 08:00 둘 다 false」 대체 · 공개 · 공개 취소 예약은 사용자가 설정 | 사용자 |
| 09-30 | **③ 홈 배너는 같은 컬렉션 `maintenance_banner.contents`에 `homeTitle`·`homePeriod` 키 추가** · 스위치·링크는 ①②와 공통 | 사용자 결정 — 별도 컬렉션 대신. 홈은 2줄(제목+기간) 형식이라 키만 분리 |
| 09-30 | **③ 홈 기간 문구는 ①② 날짜 형식으로 통일**(`10/13 00:00~08:00` · 연도 생략) | 사용자 결정 — Figma 원문 `2026.10.13` 대신. 날짜 변경 시 `title`·`homePeriod`를 함께 고친다 |
| 09-30 | **② 「상품권 이미지 비활성화」는 스펙 제외** | 사용자 결정 — Figma 캡션만 있음, 번호 미부여 |
| 09-29 | ⛔ **점검 고지는 신규 컬렉션 `maintenance_banner`(3필드)** — `contents` + `on_off`(배너) + `buy_block_on_off`(구매 차단) | 사용자 결정. 켜지면 `category_promotion_banner`를 **대체 노출** → 프로모션 문구 백업·복구 불필요. 스위치 분리는 D-7 배너 ↔ D-Day 차단 시점 차이 때문. 이름은 `_on_off`로 극성 통일(`true`=동작 켬) · On/Off는 문구 필드 밖 별도 boolean · 예약 필드 없음(게시 예약으로 대체) |
| 09-29 | **prod 스위치는 평상시 `false`** · beta만 검증용 `true` | FE 구현 전 실서비스 노출 방지 |
| 09-29 | **배너는 4개 브랜드 동일 문구 · 브랜드별 사용 가부는 OA 전담** · `[시스템 점검]` 말머리 없음 | 공통 문구로는 올리브영 ❌ / 그 외 ✅를 구분할 수 없다 |
| 10-06 | **OA 3종 문안 정본 = 10/6 순화안**(공지사항은 표성만님안 유지) | Slack 피드백(임시 점검·재개 인상·긍정 톤) + 사용자 지시 · 현지인 검토 전 등록 허용(사용자) |
| 10-06 | **OA 「점검 중에도 이용 가능(이마트24·CU·다이소 · 24시간 편의점 바코드)」 블록 삭제** · OA-2 만료 ※는 올리브영 한정 | 사용자 결정 — Slack 요청 항목이었으나 삭제 |
| 10-06 | **OA 본문 줄바꿈은 `\n` 대신 줄마다 text + 문단 box** | 실발송에서 `\n` 무시 실측 → 전역 규칙화(`md/OA.md` · 커밋 `6762198`) |
| 09-29 | ~~문안 정본 = 표성만님 수정안(OA 3종)~~ → OA는 10/6 순화안으로 대체 · OA-3 버튼 제거는 유지 | 리뷰 반영(아래 ⛔종결) |
| 09-29 | **시각은 JST 기준 · TW/TH 환산 없음** | JST=KST |
| 09-29 | **OA = Flex + 히어로(임시)** · `aspectRatio`는 실측 `28:19` | 관례 `20:13`이면 좌우가 잘린다 |
| 09-29 | **OA 다국어는 현지인 검토 없이 등록** | 사용자 직접 지시(이 건 한정 — 메모리 「검토 후 등록」과 다름) |
| 09-29 | **환불 마감이 10/13인 보유분 = 사후 구제**(점검 후 CS 환불 수용) · OA-2 문안 유지 | 사용자 결정 — 문안을 바꾸면 5개 언어 재번역·재등록이 따라온다. 만료 판정(날짜/시각)과 무관하게 구제된다 |
| 09-23 | **올리브영 사용 불가 영향 🟢 · 안내는 OA로 보충** | 점검 시간대 영업 매장 없음 · 사용처에 온라인몰 없음 |
| 09-29 | **OA-2 발송일 10/12(월) D-1** (종전 10/9 D-4) | 10/9가 한글날(한국 휴무) · 5-1은 사용자가, 5-4·5-7은 Claude가 맞춤(v37) |
| 09-23 | ⛔ **화면 고지에서 My 제외** | 사용자 결정 |
| 09-22 | **OA-1 대상 = 바우처 구매 이력자** · ⛔ **구매 CTA는 OA에만** | CTA가 공지사항·앱푸시에 붙으면 앱푸시 B(서비스 공지)→C(광고성) 재분류 위험 |

## ⛔ 사용자 결정으로 종결 (재작업·재제안 금지 — 이 프로젝트 한정)

- **GuideKim 사후 구제 협의는 종료**(2026-09-30) — 사후 구제 **케이스가 실제로 발생하면 그때 협의**한다. 미리 협의 항목으로 올리지 않는다
- **공지 문안 확인 3건 종료**(2026-09-30) — 공지 문안은 **리스크·일본어 검토 완료**. 제목 `[안내]…안내`·앱푸시 `(JST)`·th 인사말을 다시 제안하지 않는다
- **배너 길이 조정 종료**(2026-09-30) — 배너가 **2줄까지 표시되도록 기능 업데이트**됐다. en·th 길이를 이유로 재단축을 제안하지 않는다
- **잔여 오픈 이슈 8건은 종료 처리**(2026-09-29) — ① 바코드·핀 조회 ② 도메인·IP 선작업 ⑥ 발급 실패 처리 ⑦ CS 스크립트 ⑧ SK플래닛 연락 채널 ⑩ 법무 확인 ⑬ 공지사항 언어 세트 ⑭ 앱푸시 수신거부. 위키 3번 표·4-3·5-7에 종료 표기(v40). **다시 확인 필요로 올리지 않는다**

- **위키에서 사용자가 지운 절·행은 복원하지 않는다** — 「6. 확인 필요」 섹션·5-5 My 행·③ 행·5-6절. 지워진 상태를 전제로 잔여 참조만 정리한다(2026-09-23)
- **OA-3 지연 안내에 버튼을 두지 않는다** — 표성만님 안에는 있었으나 09-29 사용자 지시·재확인. 그 안을 근거로 복원을 재제안하지 않는다

## 세션 기록 (최신 위, 최대 5개)

### 2026-10-12 — 세션 #6: 예약 공개 API 확인 · 이관 당일 운영 예약

- LPC 예약 공개(publish reservation) API 7종을 CMS 번들에서 찾고 조회로 구조 실측 → `md/landpress.md` §10-2-1(`476de3e`) · prod `maintenance_banner` 비공개 · `on_off=true` · `buy_block=false` 확인 → 사용자 예약(23:00 공개 · 08:00 공개 취소 5+5건 `READY`) 검증 · 23:50 구매 차단은 이 PC 세션 전용 예약(CronCreate)
- 교훈 — **세션 전용 예약(CronCreate)은 그 PC · 그 세션이 살아 있을 때만 돈다** → PC를 옮길 수 있으면 핸드오프에 실행 절차를 통째로 남긴다 · 정해진 시각의 공개/내림은 LPC 예약이 Claude 실행보다 안전하다(필드 값 변경만 Claude)

### 2026-09-30 ~ 10-06 — 세션 #3~#5 (요약 · 상세는 [`sk-gifticon-migration/history.md`](sk-gifticon-migration/history.md))

- #5 OA 3종 순화 재작성 · beta·prod 반영 · 실발송 `\n` 미적용 → 줄 단위 구조 규칙 · #4 노출 위치 변경(홈 추가) · OA 히어로 최종본 · #3 일본어 현지인 검토 반영

### 2026-09-23 ~ 29 — 세션 #1 · #2 (요약): 문서 생성 · 5-5 설계 반복 · 화면 고지 확정 · `maintenance_banner` 신설 · OA 3종 5개 언어 등록 · 공지사항 5개 언어 — 교훈: 부분 치환 `<h1>` 중복 · 커밋은 `git commit -- <경로>`
