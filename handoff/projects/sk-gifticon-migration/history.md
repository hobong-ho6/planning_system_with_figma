# sk-gifticon-migration — 세션 기록 · 상세 보관(본문에서 이관)

> 2026-10-12 이관 — 프로젝트 파일이 25KB 경고선을 넘어 세션 #3~#5 상세를 옮겼다. 본문에는 한 줄 요약만 남는다.

### 2026-10-06 — 세션 #5: OA 3종 순화 재작성 · 5개 언어 · beta·prod 반영 · 줄바꿈 규칙 (위키 v58→**v68**)

- Slack 스레드(`C0B5WNBJPB5` · D-7 OA 발송 작업) 피드백 + 사용자 지시로 OA 3종 ko·ja 순화 → AI 2차 검토(ja · en/th/zh 각 1회) → 5개 언어 · 게이트 `gate_report_20261006_sk_oa_soften_5lang.md` §1~7(P0 0)
- Landpress beta·prod 30행(공개 API 깊은 비교 30/30) · LIAM 6건 LOAD→UPDATE · 렌더·Flex JSON(ko)·위키 5-4 5개 언어 표 갱신
- ⚠️ **prod LPC 쓰기는 자동 승인 모드가 「Production Deploy」로 차단** → 사용자 허용 후 진행(handoff-context §1 재확인)
- 사용자 지시: OA-2 만료 ※ 올리브영 한정 · 「이용 가능」 블록 삭제(20행) · History 같은 날짜 병합(27행→7행 · `check_wiki_storage` pre 통과)
- 🔴 **실발송 OA-1에서 `\n` 줄바꿈 미적용**(사용자 캡처) → 본문을 줄마다 text + 문단 box로 분리(prod 먼저, LIAM prod는 사용자 · beta 이후) · `render_oa_flex.py`는 `\n`을 그려서 못 잡음 · **LIAM 미리보기는 실발송과 같아 확인 가능** → `md/OA.md` ⛔ 규칙 + 가이드 대기 #5(커밋 `6762198`)
- OA-1 ja 현지인 검토(위키 v67 빨간 글씨 3칸) → prod LPC → (LIAM prod 사용자) → beta LPC·LIAM
- 실측: LPC 브라우저 JS 45초 초과 시 **중간에 멈춘다**(15행 중 11행만 반영) — 공개 API로 상태 확인 후 남은 행만 재실행(사전 값 대조 가드로 중복 방지). 탭이 응답 없으면 새 탭

### 2026-09-30 — 세션 #4: 노출 위치 변경(홈 추가) · OA 히어로 최종본 (위키 v48→**v52**)

- Figma 섹션 `76061-19095` 재조회 — ① 목록 · ② 상세(배너가 **상품권 이미지 아래**로 이동) · ③ **홈 신규**. 코멘트 3건(「LPC에서 설정한 Text 노출 / 선택 시 Target URL로 이동」) + 상세 캡션 2건(이미지 비활성화 → **스펙 제외** · 구매 버튼 비활성화)
- 어노테이션 3장 신규 첨부(`annotated_76061-*`) · 5-5 ①② 행 교체 + ③ 행 추가 · 필드 표·등록 문구·운영 순서 ①②③ 반영
- 홈 문구 게이트 `reports/gate/gate_report_20260930_maintenance_banner_home.md`(10셀 · P0 0 · 교정 1 `･`→`·`) → LPC 10행 `homeTitle`·`homePeriod`
- **OA 히어로 최종본** — ⚠️ 사용자가 CMS에 넣었다고 했지만 **저장 안 된 상태**였다(공개·CMS main 모두 구값) → 채팅 URL로 진행. 새 이미지 840×504라 **`aspectRatio 28:19→5:3`** 동반 변경. Landpress 30행(히어로 외 diff 0 확인) · LIAM 6건 LOAD→UPDATE · Flex JSON 3종·렌더 v5 · 위키 5-4
- ⚠️ **실측 — 자동 승인 모드가 LPC PUT을 차단** → 사용자 허용 후 진행. ⚠️ `lpc_safe_put` 대조가 **`contents` 객체 키 순서 재배열로 오탐 실패**(서버가 JSON 키를 재정렬해 저장) — 공개 API로 키 순서 무관 재대조해 40/40 확인. ⚠️ **LIAM 내부 앱은 상세→상세 `pushState`로 화면이 다시 그려지지 않는다**(URL과 표시 ID 불일치) · 45초 초과 스크립트는 끊겨도 **뒤에서 계속 돈다** → 건마다 루트 재진입 + 표시 ID 대조로 재검증
- `check_lpc_nulls` 전후 exit 0 · 복구원 25파일 → Auto-react `3c56ed5`
- 홈 기간 문구 ①② 형식 통일 — 게이트 `…_home_period.md`(5셀 · P0 0) · LPC 10행(키 순서 무관 대조 10/10) · 위키 v52
- 미참조 첨부 2건(`annotated_75999-*`) 삭제 — History 텍스트 언급 1건은 이미지 참조가 아니라 유지 · 렌더 검사 exit 0

### 2026-09-30 — 세션 #3: 일본어 현지인 검토(塚原 香音 · 검토 페이지 `4791580600`) 반영 — ja 12셀 · Landpress 6항목·LIAM 6건 · 종료 처리 3건 위키 반영 (위키 v46→v48 · 게이트 `gate_report_20260930_sk_ja_native_review.md`)


---

## 이관 당일 운영 · 새 계정 첫 작업 (전문 · 2026-10-14 프로젝트 파일에서 이관)

### 🔴 진행 중 — 10/12~13 이관 당일 운영 (다른 PC에서 이어받기 · 이 절을 먼저 읽는다)

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

### 🆕 새 계정 세션 첫 작업 — Claude SSO 전환(10/12 22:00) 이후 이 PC(`AD03230205`)에서 처음 여는 세션 (2026-10-12 20:10 기록)

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

## 10/12까지의 「현재 상태」 상세 (2026-10-12 이관 — 본문은 요약만)


**화면 배너(①②③)·OA는 등록까지 끝났다. OA 히어로 최종본도 Landpress 30행·LIAM 6건까지 반영했다(09-30). ③ 홈 배너 FE 전달도 끝났다(09-30 사용자). 오픈 이슈는 전부 정리됐다 — 남은 작업 없음(운영 순서대로 스위치만 켜면 된다).**

- **영향(실측 확정)** — 판매 중인 상품권 **전 상품**(`bizcon-*`)이 영향권. 구매·환불은 4브랜드 전부 불가, 올리브영은 사용까지 불가지만 **점검 시간대 영업 매장이 없고 온라인몰은 사용처가 아니라 실영향 🟢**
- **문안** — 5-3 공지사항은 **표성만님 수정안**이 정본. **5-4 OA 3종은 10/6 순화 문안이 정본**(5-4 각 셀 상단 5개 언어 표 · 종전 표성만님안은 아래에 참고용). 배너 문구 「**10/13 00:00~08:00 상품권 구매·환불 일시 중단**」(09-29 단축 · 이전 「10월 13일 … 일시 중단됩니다.」)(`[시스템 점검]` 말머리 없음 · 4개 브랜드 동일)
- **화면 고지(5-5)** — ① 카테고리(탭 아래) · ② 바우처 상세(**상품권 이미지 아래**로 이동 · 구매 버튼 비활성 포함 · 「상품권 이미지 비활성화」는 **스펙 제외**) · **③ 홈(09-30 추가 · `home_main_01` · 2줄 `homeTitle`/`homePeriod`)**. 각 행에 Figma 어노테이션·코멘트 정책·**확인 필드** 명시. 구현 메모는 rowspan=3으로 병합(3필드·등록 표·읽기 API·5개 언어 문구·운영 4단계). My는 제외
- **OA(10/6 전면 개정)** — Slack 피드백(「중단」→임시 점검·08:00 재개 인상 · 긍정 톤 · 일본어 위화감 없게) + 사용자 지시로 3종 재작성 → 「원활한 서비스 제공을 위해」 · 「불편을 드려 죄송하지만 대부분 평소처럼」 · 구매·환불 08:00 재개 · 올리브영 08:00 이후 · OA-2 만료 ※는 **올리브영 한정** · 「점검 중에도 이용 가능(24시간 편의점 바코드)」 블록은 **사용자 지시로 삭제**. 5개 언어(AI 2차 검토 2회) · **OA-1 ja는 현지인(塚原 香音) 검토 3칸 반영**(OA-2·3 ja는 미검토). Landpress 30행·LIAM 6건(beta·prod) 반영 · ⛔ 본문은 **줄마다 text + 문단 box** 구조(`\n` 미사용 — 실발송에서 줄바꿈 무시 실측). 히어로 최종본 유지(`30245f7c…png` · `5:3`)
- **공지사항(5-3)** — **5개 언어 완료**(09-29 · 게이트 P0 0 · 교정 4) · 📅 **게시 2026-10-06(화) 10:00**(앱푸시는 10/6 전체 삭제됨) · 일본어는 검토 페이지 5·6절에 추가
- **FE·BE** — FE에 분기 기준 전달 완료(사용자 · 배너 `on_off` / 구매 버튼 `buy_block_on_off` / `?locale=` 필수) · **배너 클릭 동작 전달 완료**(09-30 사용자 · `contents.targetUrl`로 이동 · 빈 값이면 이동 안 함) · OA-2 `{{product_order_detail_url}}`은 BE가 발송 시 채운다
- **운영 순서** — ~~평상시(둘 다 false) → D-7 10/6 `on_off=true` + OA-1 → D-1 10/12 OA-2 → D-Day 00:00 `buy_block_on_off=true` → 08:00 둘 다 false~~ → **10/12 확정: prod는 비공개로 대기 → 23:00 예약 공개(배너) → 23:50 Claude API 구매 차단 → 08:00 예약 공개 취소**(위 「🔴 진행 중」) · 미복구 시 OA-3

