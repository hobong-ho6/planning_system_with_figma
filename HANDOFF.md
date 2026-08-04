# HANDOFF

<!--
════════════════════════════════════════════════════════════
이 파일은 세션 간 핸드오프 문서입니다. (사람 + Claude 공용)

■ Claude 사용 규칙
1. [세션 시작] 이 파일을 가장 먼저 읽고 "현재 상태"·"다음 할 일" 확인 후 한 줄 브리핑.
2. [세션 종료] "핸드오프 갱신"/"세션 정리"/"handoff" 시 아래 규칙으로 갱신.
   - "현재 상태" 덮어쓰기 / 완료 항목 이동 / 새 할 일 추가 / 세션 기록 맨 위 추가(최대 5개)
3. [작성 원칙] 경로·커밋·명령어 포함, "왜"를 우선, 추측/사실 구분, 300줄 이내.
════════════════════════════════════════════════════════════
-->

## 프로젝트 정보

- **프로젝트명**: planning_system_with_figma — Figma → 다국어 번역(XLT) → Confluence 위키 파이프라인
- **한 줄 설명**: Figma 화면의 XLT 코멘트 문구를 5개 언어로 번역·검증하고 Confluence 위키에 화면/번역/이미지로 반영
- **주요 경로/저장소**: `/Users/ad03230205/Documents/planning_system_with_figma` · GitHub `hobong-ho6/planning_system_with_figma` (branch main)
- **관련 링크**:
  - 작업 위키(주, 2026-08-04~): https://wiki.workers-hub.com/pages/viewpage.action?pageId=4541588845 (**JPYC 럭키볼 시즌 3**) — **현재 v16** · Screen UIT 2 + LV 11 프레임 · 번역표 43키 · `XLT 확인 필요 목록` 9건
  - 럭키볼 친구에게 선물하기 캠페인: pageId 4479306980 — **v148**, 전역 번역표 75키(LV/UIT 엑셀 첨부)
  - Mission and Reward 정책 + FAQ: pageId 4368569133 — FAQ 10문항 5개 언어(2026-07-29 신설, 미결정 6건은 '다음 할 일' P2)
  - XLT 시스템 등록값(**값의 정본**): `~/Downloads/Dapp Portal_WEB BROWSER_v2.6.0_20260804143539.xlsx` (1,578키, git 미추적 — 세션마다 사용자에게 최신 export 요청)
  - 신규 위키 3건(2026-07-30): `4394814893` Next bay 미션앤리워드(v11) · `4515188069` Kaia Wallet > Unifi Mobile 전환 유도(v5) · `4515188588` 미션 유형 구분 (1회성·데일리·게임)(v1, 신규 생성)
  - 부모 페이지(신규 생성 위치): `3910828993` [Hogeun] (space `UNIFI`)
  - Figma 파일: GOCHAYBS7hIrmWRGNuJOKV (Web3)
  - 절차 문서: `CLAUDE.md`, `md/translate.md`, `md/wiki.md`, `md/OA.md`, `md/check.md`, `md/landpress.md`, `md/IA.md`
  - 용어집: 라이브 **v4.0**(113 terms) — **2026-07-30 사용자 CMS 반영 완료**(API 실측 확인: version 4.0 · terminology 113개 · 신규 `프로필` 등재) · 이력 `md/glossary-changelog.md` · IA 정본 `md/IA.md`
  - 기획자 가이드: **`dropweb/web3_planning_v10.zip`** — 2026-08-03 발행, **게시 대기**(라이브는 아직 v9). 용어집 임베드 4.0 = 라이브 일치. 다음 발행은 v11. ⚠️ 최신본 판별은 파일명이 아니라 **푸터 내부 버전+용어집 임베드 버전+mtime**(md/landpress.md §5-1 0단계). `dropweb/`은 `.gitignore` 대상이라 git 미추적 — zip은 채팅 전달이 배포 경로
  - IA 주간 점검: 스케줄 태스크 `weekly-unifi-ia-check`(매주 월 10:00) — 대상 **프로덕션 + Beta(`unifi-web.line-apps-beta.com`, 릴리즈 예정 선반영) + Unifi mini Beta(`?liff_id=2008994547-GfGUdDxy` → `/benefits-mini`)**. 리포트 `reports/ia/`, IA 정본 `md/IA.md`, 매 회차 가이드 zip +1 발행
- **토큰**: Figma PAT + Confluence PAT — **사용자가 매 세션 채팅으로 제공**(파일/코드에 하드코딩 금지). 착수 전 유효성 검증 필수.

---

## 프로젝트 스킬 / 에이전트

저장소에 커밋돼 **`git pull`만으로 다른 PC에서도 동일하게 동작**한다(개인 프로필 `~/.claude/`에만 있는 것에 의존 금지). 새로 만들면 이 표에 한 줄 등록하고 **스킬 파일과 같은 커밋으로 푸시**한다.

| 종류 | 이름 | 용도 / 호출 시점 |
|---|---|---|
| 스킬 | `handoff` | 세션 인수인계 정본 절차 — 세션 시작(상태 확인·pull·브리핑), 세션 종료(WIP 브랜치 보존 → HANDOFF 갱신 → 커밋·푸시), PC 간 충돌 완화. "핸드오프 갱신"·"세션 정리"·"handoff" |
| 에이전트 | `figma-source-issues` | 게이트 리포트 전체를 스캔해 **Figma 원문 수정 요청 목록**을 화면별로 취합(읽기 전용) — '다음 할 일' P2 처리 시 |
| 에이전트 | `translation-reviewer` | XLT 번역 **2차 독립 검토**(분리된 컨텍스트에서 재판정, 수정하지 않음) — 게이트 리포트 작성 전 교차 확인 |
| 에이전트 | `wiki-policy-auditor` | 위키 Description ↔ Figma 코멘트 스레드 **1:1 정합성 감사**(누락 정책·답글·번호 불일치, 읽기 전용) — 다프레임 페이지 점검 |
| 에이전트 | `glossary-guide-updater` | 용어집 버전 상승 시 **기획자 가이드 zip의 용어집 탭 갱신**(`md/landpress.md` §5-1) — 등재값 검증·사용자 컨펌 후 확정 JSON을 넘겨 호출. 커밋·CMS 반영·게시는 하지 않음 |

- 훅: `.claude/settings.json`의 SessionStart가 `HANDOFF.md`를 자동 주입(git 추적).
- `.claude/settings.local.json`(권한 allowlist·MCP 활성화)은 **기기별 설정이라 git 제외** — 다른 PC에서는 각자 쌓인다.

---

## 현재 상태

> 마지막 갱신: 2026-08-04 (세션 #6) · 작업 PC `AD03230205ui-iMac.local` · branch `main` · 마지막 커밋 `be9e2b9`

**이번 세션의 주 작업 대상은 신규 위키 `JPYC 럭키볼 시즌 3`(pageId **4541588845**, 현재 **v16**)** 이다. 럭키볼 친구초대 캠페인(4479306980, v148·75키)은 이번 세션에 3키 패치만 하고 그대로 뒀다.

**시즌 3 페이지 구성**: `Screen` → **UIT**(프레임 2) + **LV**(`Promotion Page` 6 · `Promotion Page - Popup` 5) = **프레임 11개**, 어노테이션 이미지 13장, **다국어 번역표 43키**, 엑셀 2종(`xlt_output_season3_ALL_20260804.xlsx` 43키 · `..._UIT_...` 5키) + **`XLT 확인 필요 목록`**(남은 9건, 결정 열 비움).

**⛔ 값의 정본이 바뀌었다 — XLT 시스템 export**: 사용자가 준 `Dapp Portal_WEB BROWSER_v2.6.0_20260804143539.xlsx`(1,578키)를 정본으로 채택했다. 기획 위키·Figma가 구버전인 항목이 다수 확인됨(문구 차이 7건, `md` 게이트 리포트 3차에 기록). **앞으로 기존 키 값을 참조할 때는 기획 문서보다 이 export를 우선**한다(파일은 `~/Downloads`, git 미추적).

**규칙 3건 신설**(모두 커밋·푸시): ⓐ **Policy 섹션 = `구분 | 설명` 2열 표 1개**(`md/wiki.md`) ⓑ **`채널 팔로우`·`팔로우` → `공식 계정 친구 추가`** 5개 언어 정본 표기(`md/guide.md` §5-1 C + `md/check.md` 패턴 사전) — **용어집 등재는 보류**(실측 일치율 32%) ⓒ 게이트 리포트 저장 위치 `reports/gate/`.

**저장소 정리**: 루트 파일 **73 → 6개**, 크기 **45M → 28M**(구버전 가이드 zip 7개·용어집 과거 전달본 12건·임시 산출물 삭제, `assets/` 103장·23MB 스크린샷 zip 삭제 — 어노테이션 이미지는 **위키 첨부가 정본**, 재생성은 `scripts/collect_frames.py`). 게이트 리포트 46건을 `reports/gate/`로 이동(현재 **47건**).

**스킬·도구**: 핸드오프 스킬을 **`.claude/skills/handoff/`(git 추적) 하나로 단일화**(중복 `handoff-update` 삭제), `.gitignore`에 `.claude/skills/` 예외 추가 → PC 간 `git pull`로 공유. `collect_frames.py` **버그 수정** — Figma `/images`가 콜론 형식 키로 응답하는데 하이픈 형식으로 조회해 **어노테이션 이미지를 매번 조용히 건너뛰던 문제**(`e070ea4`).

**캐리오버 이슈(이전 세션 발견, 미해결)**: ⓐ 로그인 `/benefits/daily-mission` **3주 연속 스켈레톤 고착**(API·자산 200, 콘솔 에러 0 → 프런트 렌더 이슈 추정) ⓑ 정책 충돌 2건 — mini 「연 최대 5% 이자」 배너 노출 / K-Pick KR IP 전체 열람 ⓒ 영문 UI에 한국어 원문 노출 2건(mini "외부 게임 미션", 교환 배너) ⓓ **Beta 액션 라벨 개편**(보내기·채우기·은행출금)이 프로덕션에 나가면 XLT 파급 큼 → 작업 시 대상 환경 먼저 확정.

---

## 다음 할 일

### 사용자 액션 대기 (Claude가 할 수 없음)
- [ ] **P1**: **시즌 3 XLT 시스템 처리 9건**(위키 4541588845 `XLT 확인 필요 목록` = 정본 목록) — ⓐ **신규 등록 5키**(`unifi_promotion_jpyc_btn_oa`·`jpyc_btn_signup`·`jpyc_btn_invite`·`bottomsheet_signup_text3`·`bottomsheet_signup_btn`, 번역은 완료) ⓑ **값 갱신 2키**(`jpyc_info_oa_desc` 문구 변경 · `bottomsheet_signup_text2` — 시스템은 `{0}`·`{1}` 변수, 위키는 금액 하드코딩 → 변수화 검토) ⓒ **값 확인 2건**(`jpyc_info_signup` 이모지 export `??` · `UF_home_jpyc_banner_title` nbsp).
- [ ] **P1**: **`팔로우` 표기 정리(ⓐ단계)** — XLT 시스템 문구를 `공식 계정 친구 추가`로 통일. 잔존: ko 3키 · ja `フォロー` 2 · ja `友達`→`友だち` 4 · **zh `關注`/`追蹤` 14** · th `ติดตาม` 5 · en `follow` 2. 규칙은 `md/guide.md` §5-1 C·`md/check.md`에 이미 반영. **정리 후 재측정해 용어집 v4.1 등재(ⓒ단계)** — Claude가 before/after 전달표를 만들어 줄 수 있음(미착수).
- [ ] **P2**: **FAQ 페이지(pageId 4368569133) 미결정 6건** — 2026-07-29 작업분(그간 핸드오프 미기록). 5-A(예산 소진 시 보유 럭키볼 뽑기 불가) 정책 확정 · 3-A OA 발송 시각 표기 · 6-A User tier 기준 수치 공개 · 1-A 회차 기간 명시 · 정본 `16_Unifi FAQ`(3290350532) 이관 카테고리 · **시행 전 게시 금지**.
- [ ] **P0**: **가이드 `dropweb/web3_planning_v10.zip` 드랍웹 게시** — 라이브가 아직 v9라 팀원이 보는 IA 구조도·리포트가 #2 시점에 머물러 있다. 게시 규격 `md/dropweb-guide.md`(게시는 사용자 몫).
- [ ] **P1**: **IA Screen ID 어휘 승인 5건**(`md/IA.md` §4) — ① 보유 NFT `asset_nft_01`→`apps_mypage_nft_01`(대기 결정 유지 중) ② `/reward/…` 부스트·스테이킹 어휘(`reward_`가 리워드 탭과 충돌 — `reward_staking_kaia_01` vs 별도 `staking_` 신설) ③ K-Pick `kpick_` 확정(GNB 승격+라우트 `/benefits` 겹침) ④ 🆕 외부 지갑 연결 `asset_wallet_connect_01` ⑤ 🆕 **비로그인 변형 어휘 방식**(홈처럼 구성이 다른 화면에 `home_main_guest_01` 식 별도 ID를 줄지 / 환경 접미 `_wallet`·`_mini`와 표기 통일 여부). **확정 전까지 해당 영역 Screen ID 부여 금지.** ※ `kpick_myshopping_01` 제안은 외부 서비스로 확인돼 **폐기됨**.
- [ ] **P1**: **미점검 축 조합 실측용 접근 수단 제공**(`md/IA.md` §0-0-1 커버리지 표) — 현재 실측은 **Web·mini × KR IP**뿐이고 **Wallet Mode·LIFF·JP는 전부 위키 스펙 근거**다.
  ⓐ **프로덕션 로그인** — Chrome에서 `www.unifi.me` 로그인만 해두면 다음 회차 자동 커버(**Claude 직접 로그인 금지**). 이게 풀리면 `/my`·`/setting`·`/notification`·거래내역·NFT·**로그인 게임 미션 노출 여부**·브릿지 상세가 한꺼번에 해소된다
  ⓑ Wallet Mode(US·CA·UK·SG IP) ⓒ LIFF 링크(LINE 앱) ⓓ JP IP ⓔ approve 미완료 계정 ⓕ mini 비로그인 ⓖ `draw-promotion` 내용(LINE 앱 전용 게이트)
- [ ] **P1**: **Season 3 수치 반영 검토** — 럭키볼 캠페인 위키(4479306980)·미션앤리워드 관련 페이지에 구 럭키볼 수치가 남아 있는지 확인. IA 점검 범위 밖이라 이번에 위키는 건드리지 않았다.
- [ ] **P2**: **정책 충돌 2건 기획 확인** — mini 이자 배너 노출 / K-Pick KR IP 정책. **P2**: XLT 한국어 원문 노출 2건 FE·디자이너 확인.
- [ ] **P1**: **`Mini - 일본`(65280-8215) NEXT Bay 배너 보상 단위 확인** — 화면 전체가 JPYC 기준인데 배너만 `최대 100 USDT`. 원문대로 반영했으나 의도 확인 필요(`reports/gate/gate_report_nextbay_mission_banner.md` d-3).
- [ ] **P2**: Figma 원문 수정 요청(디자이너) — 위키와 어긋난 2곳(`친구 초대하고 둘 다 럭키볼 받기`·`친구 초대하고 럭키볼 받기` → `친구에게 JPYC 선물하기`), `terms_share_noti` 문구는 Figma에 아예 없음, 그 외 누적 오타. **`figma-source-issues` 에이전트로 전달 목록 생성 가능**.
- [ ] **P3**: 새 위키 `미션 유형 구분`(4515188588)의 **Figma 링크 전달 시** Related Docs `Design` 행 + Flow 임베드(width 1000) 추가.

### Claude 실행 대기 (승인 시 진행)
- [ ] **P2**: **IA 구조도 화면 미리보기 기능 검토** — 가이드 v9의 「전체 IA 구조」 표에서 **각 메뉴명에 마우스 오버하면 해당 화면 캡처가 보이도록** 한다. 검토할 점: ⓐ 캡처 수집 방법(주간 점검 시 라우트별 스크린샷 자동 촬영 vs 수동) ⓑ **zip 용량** — 현재 2.86MB에 이미지 5개, 화면 65행 전량이면 크게 늘어 드랍웹 업로드 한계 확인 필요(썸네일 압축·주요 화면만 등 범위 축소안) ⓒ 로그인·상태 변경 화면(위임·뽑기 등)은 캡처 불가·부적절 → 대체 표기 ⓓ 캡처가 낡으면 오히려 오해를 유발하므로 **촬영 일자 표기 + 갱신 주기** 규칙 필요. 사용자 요청(2026-07-30).
- [ ] **P2**: **위키 전 프레임 정책 감사** — root 정책·답글 누락·번호 불일치 점검. 세션 #1부터 미처리였으나 이제 **`wiki-policy-auditor` 에이전트로 실행 가능**(읽기 전용, 발견 목록만 반환).
- [ ] **P3**: 용어집 `마켓플레이스`·`게임` 등재 검토 — 단, **등재만으로는 오탐이 안 사라진다**(`마켓플레이스`에서 `마켓`·`플레이`를 부분일치로 잡음). `validate_translation.py`의 **최장일치 우선·단어 경계** 개선이 함께 필요(`md/glossary-changelog.md` v3.9·v4.0에 제안 기재).
- [ ] **잔여**: 용어집 v3.0 보류건 팀 검토 대기 — `glossary_pending_review_v3.md`(뽑기 계열 zh·th 오역 의심).

### 차단 요소
- 없음. (위키 서버가 세션 중 한때 타임아웃됐으나 복구됨 — 외부 요인)

### 사용자 결정으로 종결(재작업 금지)
- **`mini_luckyball_invitee_mission`** — 세션 #2 추가분이 이후 편집에서 빠짐. 사용자가 "그대로 놔둬"로 결정(2026-07-27) → 재추가 금지.
- **`선물` 용어집 등재** — v3.6 `선물하기`로 이미 커버되고, 별도 등재 시 zh·th 명사/동사 분기로 새 오탐 발생(실측 5/2/2건) → **보류 결정**(2026-07-30).
- **가이드 용어집 검증 버튼** — 드랍웹 게시 시 CORS로 자동 대조가 막히고 수동 붙여넣기 폴백으로 동작. 사용자가 **"지금 그대로 두자"** 결정(2026-07-30) → 문구 변경·제거 금지.
- **에이전트 분업 범위** — 번역·게이트·위키 PUT·엑셀은 **직렬 고정**(위키 버전 가드·번역 일관성·누적 판정). 읽기 전용만 팬아웃, 손익분기 8~10프레임(`md/wiki.md` '대량 프레임 작업').
- **OA 메시지 실값** — 2026-07-27 완료.

## 주요 결정 사항

| 날짜 | 결정 | 이유 |
|------|------|------|
| 2026-08-04 | **기존 키 값의 정본 = XLT 시스템 export**(`Dapp Portal_WEB BROWSER v2.6.0`) — 기획 위키·Figma와 다르면 시스템 값 채택 | FE가 실제 사용하는 값. 실측에서 기획 문서가 구버전인 항목 7건 확인(`jpyc_btn1` 문구 전면 변경 등). 커밋 `b656873` |
| 2026-08-04 | **`채널 팔로우`·`팔로우` → `공식 계정 친구 추가`** (5개 언어 정본 표기 규칙) · **용어집 등재는 보류** | 사용자 확정. 용어집 등재는 실측 일치율 32%(28키 중 19 불일치)로 landpress §4-3 미충족 → 규칙 문서로 강제 후 시스템 정리·재측정. 커밋 `4b186d6` |
| 2026-08-04 | **핸드오프 스킬 단일화**(`.claude/skills/handoff/`, git 추적) + 게이트 리포트는 `reports/gate/` | 스킬이 계정 스코프·프로젝트에 중복 존재해 트리거 충돌. 스킬·에이전트는 저장소 커밋이 원칙(다른 PC 공유). 커밋 `e94cb50`·`05e8f12` |
| 2026-08-04 | **Policy 섹션은 `구분 \| 설명` 2열 표 1개로 작성**(소제목·출처 링크·TBD 금지, 설명은 square 불릿 평서체, 행은 사용자 여정 순) | 사용자가 직접 쓴 럭키볼 캠페인(4479306980) Policy가 정본 포맷. Claude가 소제목+출처 병기 형태로 쓰자 사용자가 자기 포맷으로 통일 요청 → `md/wiki.md` 'Policy 섹션 작성 포맷'에 규칙화 |
| 2026-07-30 | **Screen 표는 4컬럼 고정**(`Screen ID / Screen / Description / XLT`) — 화면명 컬럼 신설 금지 | Screen ID가 화면 식별자. 5컬럼으로 만든 실수를 사용자가 지적 → 규칙+`check_wiki_storage.py`로 강제. 기존 페이지는 현행 구조 유지 |
| 2026-07-30 | **첨부 참조는 `<ri:attachment ri:filename>` 단독** — `<ri:page>` 금지 | space-key/제목이 한 글자만 어긋나도 "알 수 없는 첨부파일"로 깨진다(다른 스페이스 `LINENEXT` 관성 복사로 실제 발생). 타 페이지 참조 시에만 사용+space key 실조회 |
| 2026-07-30 | **위키 생성 규격 확정** — Related Docs 카테고리별 행(Ticket/Design/PIA Review/Discussion) + **Flow에 Figma 위젯 임베드 `width=1000`** | 사용자가 "너무 좋았다"고 확정. Jira 티켓을 주면 설명 속 부수 링크까지 확장. 동명 페이지 선확인 필수, "재생성"도 삭제가 아니라 본문 교체 |
| 2026-07-30 | **가이드 zip 최신본은 파일명·mtime으로 판별하지 않는다** | v4를 최신으로 오판(실제 v6) → 오진 보고 + v5·v6 변경 빠진 zip 전달. 판별 = 푸터 내부 버전+용어집 임베드 버전+mtime 3값(`md/landpress.md` §5-1 0단계) |
| 2026-07-30 | **에이전트는 "넓게 읽고 취합"에만 위임** — 쓰기·번역·게이트는 직렬 | 효율의 실제 병목이 병렬성이 아니라 규칙 준수 검증이었음. 읽기 전용 4종 중 3종이 쓰기 권한 0, 유일한 쓰기(가이드 zip)도 git 미추적 폴더만 |
| 2026-07-30 | **용어집 v4.0** — `프로필` 추가 / `선물`은 보류 | `선물하기`(v3.6)로 이미 커버 + zh·th 명사/동사 분기로 단일 매핑 부적합(실측) |
| 2026-07-27 | **용어집 v3.0 대개편** — 통합 엑셀 v3(69종) 일괄 추가, 이후 v3.1~v3.5 순차(Passcode·거래내역 붙여쓰기·당첨·당첨금) | 팀 검토·라이브 확인 반영. `거래내역`은 문법상 띄어쓰기가 표준이나 **서비스 표기 정본을 붙여쓰기로 사용자 확정**(v3.2 기각→v3.3 번복) |
| 2026-07-27 | **IA 정본 신설(`md/IA.md`) + 주간 정기 점검 리포트 도입** | Screen ID 어휘·제품 3모드 매트릭스 정본화. 점검은 `reports/ia/ia_check_report_YYYY-MM-DD.md` 매주 산출 |
| 2026-07-27 | **dropweb 기획자 가이드 최신화 제안 규칙 신설** | 큰 변경 푸시 시 가이드 갱신 제안→승인 시 갱신+게시 요청(게시는 사용자) |
| 2026-07-27 | **화면 정의에 없는 orphan 키는 번역표에서 삭제** | 이번 세션 9키 중 8키 삭제 유지(`max20_desc`는 이후 편집으로 재등장). 화면 정의(Screen 상세표)가 키의 소스 |
| 2026-07-27 | **`invitee_mission` 재추가 안 함** | 세션 #2 추가분이 이후 편집에서 빠졌고, 사용자가 그대로 두기로 결정 |
| 2026-07-24 | **History 같은 날 1행 병합** — 같은 날짜 행이 있으면 새 행 대신 그 행의 `<ul>`에 `<li>`만 추가 | 규칙(CLAUDE.md/wiki.md). 2026-07-24 행 15개를 1개로 병합함. 이후 반드시 준수 |
| 2026-07-24 | **팝업/모달 겹침 화면은 어노테이션 육안 검증 필수** | 좌표 매칭이 z-order 미인식 → 배경 텍스트 오매칭(voucher_musinsa 사례). `md/translate.md`·`md/wiki.md`에 규칙 추가·푸시 |
| 2026-07-24 | **정책 추출 = 순수 `xlt` root만 제외, 나머지 root는 전부 Description 포함**(xlt 답글 있어도) | 36558에서 root 정책 2건 누락 발견. build_threads 결과에서 `msg.lower()=='xlt'`만 건너뛰고 나머지는 정책 |
| 2026-07-24 | **XLT 키: 같은 문구=같은 키 재사용, 공유 키는 화면 제거 시에도 삭제 금지** | 화면 삭제 시 그 화면 "전용" 키만 삭제(위키 등장 ≤2회=전용). 예: 확인(공유) 유지, jpyc_paid·invitee_more(전용) 삭제 |
| 2026-07-24 | **OA(LINE 공식계정) 메시지는 XLT 키 미부여·번역만** + 변수 `{{ }}` + 언어별 개별 Flex JSON을 각 화면 Description에 첨부 | `md/OA.md` 규칙. XLT 엑셀·전역 키표에 넣지 않음 |
| 2026-07-24 | UIT 프레임(Unifi LIFF)의 동일 문구는 사용자 지시로 **LV 키 재사용**(UF_ 신규 대신) | 사용자 결정 |
| 2026-07-24 | 용어집 v2.6 — `럭키볼`(Lucky Ball/ラッキーボール/幸運球/ลูกบอลนำโชค) 추가 | 게이트 d-1. 사용자가 Landpress CMS에 반영 완료 |

---

## 최근 세션 기록

### 2026-08-04 — 세션 #6: 시즌 3 위키 신규 구축(프레임 13개·43키) + XLT 정본 전환 + 저장소·규칙 정리

- **완료 (git 커밋 9건, origin 최신 위 '현재 상태'의 해시)**:
  - **신규 위키 `JPYC 럭키볼 시즌 3`(4541588845)** 생성 → v16. Related Docs(UNIFY-9579·9577·Slack 2·기획 위키) · Policy(사용자 포맷으로 변환) · Screen **UIT 2 + LV 11 프레임** · 번역표 43키 · 엑셀 2종 · `XLT 확인 필요 목록`(9건)
  - **XLT 시스템 export를 값 정본으로 전환** — 대기 12키 중 11키 확보, 문구 차이 7건 리스팅, nbsp 1키 정규화. 신규·변경 7키는 이 문서에서 번역(P0=0) + 한국어 원문 교정 3건(UINIFI→Unifi · 채널 팔로우→공식 계정 친구 추가 · JPYC 공백)
  - **럭키볼 캠페인(4479306980)** 3키 패치(`event_period`·`terms_wallet_fixed`·`terms_jp_excluded`) 5개 언어 + 의도 정정 재번역 → v143, LV 엑셀 v17
  - **엑셀 포맷 회귀 복구** — `plurals` 시트(A1:G2·`one/other`)를 깨서 XLT 업로드가 실패했다. 원인은 `export_to_xlt.create_xlt_excel`를 우회해 pandas로 직접 생성한 것 → **엑셀은 반드시 정본 스크립트로만 생성**
  - **규칙 3건**(Policy 포맷 · 팔로우 표기 · 게이트 리포트 위치) · **스킬 단일화** · **`collect_frames` 이미지 누락 버그 수정** · **저장소 정리**(루트 73→6, 45M→28M)
- **주의/배운 것**:
  - 위키가 세션 중에도 사용자 편집으로 계속 올라간다(v4→v7→v10→v15) → **PUT 직전 라이브 rebase 필수**(이번에 매번 적용)
  - `unifi_promotion_*` 키는 기획 문서에 **KR만** 있는 경우가 많다 → 4개 언어는 XLT export에서 확보해야 한다
  - Figma 코멘트가 `xlt`만 적혀 키명이 없는 핀이 6개 있었다 → 역방향 KR 매칭으로 후보를 제시하고 사용자가 키를 확정하는 흐름이 잘 작동했다
- **다음 세션 첫 작업**: 위키 `XLT 확인 필요 목록`의 결정 열 확인 → 시스템 등록·값 갱신 반영. 그 다음 `팔로우` 표기 정리 전달표(요청 시).

### 2026-08-03 — 세션 #5: IA 주간 정기 점검 #3 (스케줄 태스크 `weekly-unifi-ia-check`)

- **완료 (git 1커밋 `30a98b1`, origin 반영)**:
  - **점검 범위**: 프로덕션 비로그인(인앱 375px) `/`·`/reward/kaia`·`/reward/usdt`·`/benefits/daily-mission`·`/benefits/games`(404)·`/apps`·`/apps/market`·`/announcement`+상세·`/my`→로그인 게이트 / Beta 로그인(Chrome) `/`·`/benefits`·`/benefits/daily-mission`·`/my`+⋮메뉴·`/setting`·`/transfer`·`/deposit`·`/notification`·`/apps/trade/swap`·`/my/token/transaction`·`/apps/my-page/nfts` / mini Beta `/benefits-mini`·`/daily-mission`·`/draw-promotion`·`/luckyball-invite`
  - **`md/IA.md`**: 분석 이력 #3 행 · **§0-0-1 화면 변형 3축 신설**(환경×사용자 상태×IP + 로그인 매트릭스 + 커버리지 표) · §2-2 **Season 3 정책 블록** · §2-2-1 CR 분배 정책 전문·2R 진행 중 · §2-3 `asset_wallet_connect_01` 신설 · §2-4 캐러셀·30 Apps · §2-7 K-Pick/mini 전면 갱신(**`kpick_myshopping_01` 폐기**) · §4 승인 대기 ④⑤ 신설
  - **리포트** `reports/ia/ia_check_report_2026-08-03.md`(신규 섹션: 5-1 3축 정리 / 6 미점검+필요 접근 수단 12항 / 6-1 해소된 이월 / 6-3 XLT 부수 발견)
  - **가이드 v10**(v9 베이스, 0단계 판별로 최신본 확인 후) — `IA_DATA` 70행 갱신(로그인 필수/비로그인 차이를 부가표기에 반영) · #3 패널 추가 · 버전 3곳 · **업데이트 이력 표를 최신순으로 정렬**(기존엔 v1~v6 오름차순 + v9·v8·v7 뒤섞임) · 브라우저 실동작 검증(표 70행·필터 70→52·1뎁스 접기 70→57→70·태그 균형·용어집 임베드 파싱 OK)
- **주의·교훈**:
  - **비로그인 렌더는 로그인 상태의 근거가 되지 않는다** — 프로덕션 리워드 탭이 Chrome(ko)에서 정상 렌더돼 "로그인 해소"로 착각했으나, `/my`가 로그인 게이트로 튕겨 **프로덕션은 비로그인**임이 드러났다. 로그인 여부는 **`/my` 진입으로 먼저 확정**할 것.
  - **점검 중 Beta 도메인 접근이 Chrome·인앱 모두 일시 차단**됐다가 새 탭 그룹 생성으로 복구. mini 하위 탐색 중 LINE 앱 유도 다이얼로그의 [OK]가 차단 대상 URL이라 클릭 실패 — 정상 동작.
  - `.guide_preview/`는 검증용 임시 폴더로 만들고 **검증 후 즉시 삭제**했다(인앱 브라우저가 프로젝트 밖 파일은 정적 스냅샷으로만 열어 스크립트가 안 돌기 때문).
- **다음 세션 첫 작업**: 사용자 새 지시 대기. IA 점검 #4는 **2026-08-10(월) 10:00** 자동 실행 → 가이드 **v11** 발행.

### 2026-07-30 — 세션 #3: 위키 4개 페이지 작업 + 규칙·도구·에이전트 체계 구축

- **완료 (git 12커밋, origin 최신 `3b28cbe`)**:
  - **럭키볼 위키(4479306980) v103→v147**: ⓐ 25034 어노테이션 전면 재정리 — **코멘트 좌표 정규화**(하위 프레임 앵커 보정)로 통합 번호 1~35 재도출, 하단 유의사항 **신규 8키**(`must_check`·`terms_*` 7종) ⓑ 문구 개편 **4키** 재번역(`more_arrived`·`oa_followed`·`oa_follow_open`·`oa_bonus`) ⓒ `invite_banner` → "친구에게 JPYC 선물하기" 재번역 + **하이라이트·굵기 원복** ⓓ `terms_share_noti` 신규 1키(75키, Screen No 35 append). 전역표 72→75키, LV/UIT 엑셀 재첨부
  - **신규 위키 3건**: `4394814893` Next bay 미션앤리워드 — Screen 섹션 신규 작성(2화면, **Screen ID 규격 첫 적용** `reward_main_mini_01`·`reward_main_01`, 매핑 표 승인), NEXT Bay 배너 **신규 2키** / `4515188069` Kaia Wallet > Unifi Mobile — 동명 페이지가 이미 있어 **본문만 표준 템플릿으로 재구성**, Related Docs 4행(티켓·디자인·PIA·Slack)+하위 티켓 병기 / `4515188588` 미션 유형 구분 — **신규 생성**(UNIFY-9446 건, 상위 8838 병기)
  - **Jira**: `W3P-5594` 제목 오타 수정(`Moilbe`→`Mobile`)
  - **용어집 v4.0**(113) 산출 — `프로필` 추가, `선물` 보류. `md/glossary-changelog.md` 기재. **라이브는 아직 v3.9(CMS 반영 대기)**
  - **규칙 4건**: Screen 표 4컬럼(`a909906`) · 첨부 `ri:page` 금지+렌더 검증(`a909906`) · 위키 생성 규격(`ec1296a`) · zip 최신 판별(`3b28cbe`)
  - **도구 2종**: `scripts/check_wiki_storage.py`(pre/post, exit 0 강제) · `scripts/collect_frames.py`(노드·코멘트·이미지 각 1회 조회, **수동 산출물과 픽셀 동일 검증**) — `test_validation.py` [6] 8케이스 추가
  - **에이전트 4종**(`.claude/agents/`, .gitignore 예외 추가): `translation-reviewer`(번역 2차 독립 검토) · `glossary-guide-updater`(가이드 zip 4곳 갱신) · `wiki-policy-auditor`(Description↔코멘트 감사) · `figma-source-issues`(원문 오타 취합)
  - **가이드 v7**(v6 기반) — **「동작 원리」 섹션 신설**(원본 3곳/게이트/번호 체계/사용자 결정 지점/실수→규칙 사이클), v7 카드 4장, 용어집 탭 v4.0. **게시 대기**
  - 파일 정리: `scripts/scripts/`(v2.4 오생성 캐시)·`xlt_validation_temp.xlsx` 삭제, `.gitignore` 등록. 이전 세션 잔여 산출물 14파일 커밋
- **실수·교훈 (전부 규칙/검사기로 전환됨)**:
  - Screen 표 5컬럼 → 사용자 지적 → 4컬럼 규칙 + 검사기. **원인: 직전 작업 마크업을 관성 재사용**
  - 첨부 `ri:space-key`에 `LINENEXT`(다른 스페이스) 복사 → 이미지·엑셀 렌더 깨짐 → `ri:page` 금지 규칙 + 렌더 검증
  - **가이드 zip 최신본 오판**(파일명·mtime만 봄) → "4버전 밀림" 오진 + v5·v6 빠진 zip 전달(게시 전 회수) → §5-1 0단계 신설. `glossary-guide-updater`의 잘못된 근거 서술도 정정
- **다음 세션 첫 작업**: 사용자 새 지시 대기. 착수 = ① HANDOFF 확인 ② 토큰 요청·검증 ③ 원본 새로 조회. **위키 편집 시 `check_wiki_storage.py` pre/post 실행 필수.**

### 2026-07-29 — (누락 보완 기록) Mission and Reward 정책 FAQ 신설 + 럭키볼 3키 패치

- 위키 **4368569133**(`Mission and Reward — 예산 관리·1회성 미션·럭키볼 팝업 정책`)에 **FAQ 섹션 신설** — 사내 정본 `16_Unifi FAQ`(3290350532)와 동일 스키마, Q&A **10건** ko 초안 → **5개 언어 번역**(위키 v38). 게이트 2건(`gate_report_luckyball_faq_ko.md`·`_5lang.md`) P0=0.
- 럭키볼 캠페인 3키 패치·엑셀 포맷 복구는 세션 #6 항목과 이어짐(같은 대화에서 진행).
- **미결정 6건은 위 '다음 할 일' P2로 이월**(정책 확정·게시 시점 등).

## 아카이브 요약

- **2026-07-27 세션 #2**: 용어집 v2.6→v3.5 대개편(라이브 107 terms) · `md/IA.md` 정본 신설 + 주간 IA 점검 리포트 도입 · 럭키볼 위키 문구 개편(orphan 18키 삭제) · OA Flex 15건 재생성·화면별 zip 통합.
- **2026-07-24 세션 #1**: 럭키볼 친구초대 캠페인 위키 대량 구축(v1→v35, 3개 LV 섹션+OA+UIT, 전역 번역표 73키) · `md/OA.md` 신설 · 어노테이션·팝업 겹침 규칙 신설 · History 같은 날 1행 병합 규칙 확립.

---

## 컨텍스트 노트

- **파이프라인**: [1] `md/translate.md`(추출·XLT키·5개언어) → [2] `md/prototype.md` → [3] `md/wiki.md`. 최근 세션은 단일 프레임/코멘트 선별 + 위키 Mode B, 그리고 **위키 신규 생성**(`md/wiki.md` '위키 생성 모드') 중심.
- **엑셀 생성은 반드시 `scripts/export_to_xlt.create_xlt_excel`로만** — pandas로 직접 시트를 만들면 `plurals` 고정 포맷(A1:G2·`one/other`·`Unnamed: 2`)이 깨져 **XLT System 업로드가 실패**한다(2026-08-04 실측·복구).
- **게이트(필수)**: 한국어 원문 교정 → `python3 scripts/validate_translation.py`(P0=0) → `md/check.md` 3단계 **전수** 수동 → 게이트 리포트 → `python3 scripts/check_gate_report.py <리포트.md>` **exit 0**. 리포트 47건 누적(`reports/gate/`). P1/P2는 이 데이터에서 **전건 오탐**(용어집 협소 매핑·부분문자열·조사 결합·마침표 정책) — 판정 유지.
- **위키 편집(필수 절차)**: 라이브 재조회 → 균형 `<tr>` surgical 교체 → **버전 가드**(PUT 직전 재확인) → PUT → **`check_wiki_storage.py` pre/post exit 0**. 첨부 갱신은 `POST .../child/attachment/{id}/data`, 삭제는 `DELETE .../content/{attachmentId}`. History는 **같은 날 1행 병합**.
- **핵심 산출물**: 위키 전역 번역표(75키)가 실질 정본 · `xlt/xlt_output_{LV,UIT}_20260727.xlsx` · `oa/` · `reports/gate/*.md`(46) · `reports/ia/`(#1~#3) · `dropweb/web3_planning_v10.zip`(**게시 대기**, 라이브 v9)
- **화면 이미지는 로컬에 보관하지 않는다**(2026-08-03 정리) — 어노테이션 이미지는 **위키 첨부가 정본**이고, `assets/`는 삭제했다. 재작업이 필요하면 `scripts/collect_frames.py`로 Figma에서 다시 수집·렌더한다(`assets/`는 실행 시 자동 생성).
- **IA 점검 루틴**: 매주 월 10:00 자동 실행 → ① 직전 리포트 이월 확인 ② 프로덕션 비로그인 ③ **Beta·mini Beta**(릴리즈 예정 정본) ④ 로그인(가능할 때) ⑤ `md/IA.md` 갱신 ⑥ 리포트 발행(변경 없어도) ⑦ **가이드 zip +1**(`IA_DATA` 동기화 필수) ⑧ 커밋·푸시(`dropweb/`은 `git add` 금지) ⑨ zip·리포트 전달. **상태 변경 액션(위임·출석·뽑기·송금·지갑 연결) 절대 미실행, 직접 로그인 금지.**
- **스크립트 10종**(`scripts/`): fetch_glossary · fetch_comments(**`build_threads`+`collect_node_boxes` 좌표 정규화 필수**) · validate_translation · check_gate_report · **check_wiki_storage** · **collect_frames** · export_to_xlt · patch_translation · build_prototype_data · test_validation(**scripts 수정 후 필수 실행**)
- **에이전트 4종**(`.claude/agents/`): `translation-reviewer`(5키 이상·긴 문장·용어집 등재 전) · `glossary-guide-updater`(용어집 버전 상승 시 zip 갱신) · `wiki-policy-auditor`(전 프레임 정책 감사) · `figma-source-issues`(원문 오타 취합). **읽기 전용 3종 / 쓰기는 zip만**. 팬아웃은 8~10프레임 이상 읽기 단계에만.
- **캐시 금지**: Figma 노드·코멘트, 위키 원문, 용어집 모두 **매 작업 원본 재조회**. 같은 run 안의 파이프라인 핸드오프만 예외.
- **어노테이션**: 이미지 ⓝ = Description 통합 번호 = XLT No 1:1. **정책=빨강 / xlt=파랑**, 매칭 텍스트 좌측 10pt, 겹침 0 검증, **렌더 후 육안 확인**(팝업 겹침 오매칭 실측 있음).
- **담당 FE 팀**: LV(`mini_`·`{0}`) 기본 / UIT(`UF_`·`{{0}}`). **위키에 UIT/LV 구분이 없으면 사용자에게 질문**(Next bay는 질문 후 "둘 다 LV" 확정).
- **Screen ID**: `md/IA.md` 어휘로 `주기능_부기능_세부기능_01`(소문자), **매핑 표 사용자 승인 후에만** 부여. 기존 프레임명 기반 페이지는 소급 금지.
- **용어집**: API 읽기 전용(`fetch_glossary.py`), 갱신은 전체 JSON → 사용자가 CMS 붙여넣기 + **가이드 zip 동반 갱신 필수**(`md/landpress.md` §5-1, **0단계 최신 zip 판별부터**).
- **드랍웹 제약**: 정적 호스팅이라 **서버 역할 불가**(API 수신·스케줄). 브라우저 fetch도 용어집 API가 CORS 헤더를 안 주므로 자동 대조는 막히고 수동 폴백으로 동작 — **사용자가 현행 유지 결정**.
