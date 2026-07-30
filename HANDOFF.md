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
  - 작업 위키(주): https://wiki.workers-hub.com/pages/viewpage.action?pageId=4479306980 (럭키볼 친구에게 선물하기 캠페인) — **현재 v147** (2026-07-30)
  - 신규 위키 3건(2026-07-30): `4394814893` Next bay 미션앤리워드(v11) · `4515188069` Kaia Wallet > Unifi Mobile 전환 유도(v5) · `4515188588` 미션 유형 구분 (1회성·데일리·게임)(v1, 신규 생성)
  - 부모 페이지(신규 생성 위치): `3910828993` [Hogeun] (space `UNIFI`)
  - Figma 파일: GOCHAYBS7hIrmWRGNuJOKV (Web3)
  - 절차 문서: `CLAUDE.md`, `md/translate.md`, `md/wiki.md`, `md/OA.md`, `md/check.md`, `md/landpress.md`, `md/IA.md`
  - 용어집: 라이브 **v3.9**(112 terms) / **v4.0(113) 산출·전달 완료 — 사용자 CMS 반영 대기** · 이력 `md/glossary-changelog.md` · IA 정본 `md/IA.md`
  - 기획자 가이드: **`dropweb/web3_planning_v9.zip`** — **게시 대기**(v7·v8 대체 — IA 점검 #2 + 전체 IA 구조 인터랙티브 표). ⚠️ 최신본 판별은 파일명이 아니라 **푸터 내부 버전+용어집 임베드 버전+mtime**(md/landpress.md §5-1 0단계). `dropweb/`은 `.gitignore` 대상이라 git 미추적 — zip은 채팅 전달이 배포 경로
  - IA 주간 점검: 스케줄 태스크 `weekly-unifi-ia-check`(매주 월 10:00) — 대상 **프로덕션 + Beta(`unifi-web.line-apps-beta.com`, 릴리즈 예정 선반영) + Unifi mini Beta(`?liff_id=2008994547-GfGUdDxy` → `/benefits-mini`)**. 리포트 `reports/ia/`, IA 정본 `md/IA.md`, 매 회차 가이드 zip +1 발행
- **토큰**: Figma PAT + Confluence PAT — **사용자가 매 세션 채팅으로 제공**(파일/코드에 하드코딩 금지). 착수 전 유효성 검증 필수.

---

## 현재 상태

> 마지막 갱신: 2026-07-30 (세션 #3)

럭키볼 캠페인 위키(4479306980)는 **v147**, 전역 번역표 **75키**(LV 엑셀 75키·UIT 2키 첨부). 팀 **LV**(`mini_luckyball_`·`{0}`) 주. 이번 세션에 **신규 위키 3건**이 늘어 작업 대상이 4개 페이지가 됐다. 게이트(자동+수동 3단계+`check_gate_report.py` exit 0)는 여전히 모든 번역의 차단 조건이고, 리포트 누적 **45건**.

**2026-07-30 세션 #3 요약**(git 12커밋, origin 최신 `3b28cbe`): ⓐ **럭키볼 위키 v103→v147** — 25034 어노테이션 전면 재정리(좌표 정규화)+유의사항 신규 8키, 문구 개편 4키·invite_banner·terms_share_noti 재번역(72→75키) ⓑ **신규 위키 3건** 작성(Screen ID 규격 첫 적용) ⓒ **규칙 4건 신설** — Screen 표 4컬럼 고정·첨부 `<ri:page>` 금지·위키 생성 규격(Related Docs/Flow 임베드/동명 확인)·가이드 zip 최신 판별 ⓓ **도구 2종**(`check_wiki_storage.py`·`collect_frames.py`) + **에이전트 4종** 신설 ⓔ **용어집 v4.0**(프로필 추가, 선물은 v3.6 중복으로 보류) ⓕ 가이드 **v7** 산출(동작 원리 섹션 신설).

**이번 세션 실수 3건 → 전부 규칙·검사기로 전환**(같은 방식이 재발 방지의 정본): ① Screen 표를 5컬럼(화면명)으로 만듦 ② 첨부 `ri:space-key`에 다른 스페이스(`LINENEXT`)를 관성 복사해 이미지·엑셀이 "알 수 없는 첨부파일"로 깨짐 ③ **가이드 zip 최신본을 파일명·mtime으로 오판**(v4를 최신으로 착각, 실제는 v6) → "가이드가 4버전 밀렸다"는 오진 보고 + v5·v6 변경 빠진 zip 전달(게시 전 회수). ①②는 `check_wiki_storage.py`로, ③은 `md/landpress.md` §5-1 0단계로 차단.

**2026-07-30 세션 #4 — IA 주간 점검 #2 (커밋 `837e2c6`)**: 스케줄 태스크 `weekly-unifi-ia-check`를 실행해 **프로덕션 + Beta + Unifi mini Beta**를 점검했다. ⓐ **`/reward/kaia` KAIA 스테이킹(위임)·Special Contribution Rewards 출시 실측** — #1에서 "공지 예고·화면 미출시"로 이월했던 Kaia CR 미션이 실제 출시(`/boost/kaia`는 `/reward/usdt`로 이전, 부스트 조건에 위임 KAIA 합산) ⓑ **Beta 환경을 상시 점검 범위로 도입** — Beta에 릴리즈 예정 내용이 먼저 들어오므로 매주 프로덕션과 대조(현재 차이: GNB 4탭→**5탭 K-Pick 승격**, 내 자산 액션 **송금하기·입금하기·은행송금 → 보내기·채우기·은행출금**) ⓒ **Unifi mini 최초 직접 실측**(`/benefits-mini` 계열 5종 — 그전까지 위키 스펙에만 의존) ⓓ IA.md `§0-0 점검 환경`·`§2-2-1 부스트·스테이킹` 신설 ⓔ 리포트 `reports/ia/ia_check_report_2026-07-30.md` + 가이드 **v8 → v9** 발행(v9에 「전체 IA 구조」 인터랙티브 표 신설 — 데이터는 `IA_DATA` 배열 한 곳, **`md/IA.md` 변경 시 함께 갱신하는 규칙**을 IA.md 머리말·스케줄 태스크에 신설).

**⚠️ Beta 액션 라벨 개편은 XLT 파급이 크다** — `보내기`·`채우기`·`은행출금`이 프로덕션에 나가면 관련 키 문구가 일괄 영향받는다(용어집 v3.9~v4.0의 `보내기` ja 出金/出金元 개편과 같은 흐름). XLT 작업 시 **대상 환경(프로덕션/Beta)을 먼저 확정**할 것.

---

## 다음 할 일

### 사용자 액션 대기 (Claude가 할 수 없음)
- [ ] **P1**: 기획자 가이드 **`dropweb/web3_planning_v9.zip` 게시**(v7·v8 대체 — IA 점검 #2 + 전체 IA 구조 표) → 게시 후 용어집 탭에서 **v4.0 전체 JSON 복사 → Landpress CMS 반영**(라이브는 아직 v3.9). 편집 URL은 `md/landpress.md` §1. ⚠️ v7·v8은 게시하지 말 것(v9가 상위본).
- [ ] **P1**: **IA Screen ID 어휘 승인 3건**(`md/IA.md` §4) — ① 보유 NFT `asset_nft_01`→`apps_mypage_nft_01`(대기 결정 유지 중) ② 🆕 `/reward/…` 부스트·스테이킹 어휘(`reward_`가 리워드 탭과 충돌 — `reward_staking_kaia_01` vs 별도 `staking_` 신설) ③ 🆕 K-Pick `kpick_` 확정(GNB 승격+라우트 `/benefits` 겹침). **확정 전까지 해당 영역 Screen ID 부여 금지.**
- [ ] **P1**: **`Mini - 일본`(65280-8215) NEXT Bay 배너 보상 단위 확인** — 화면 전체가 JPYC 기준인데 배너만 `최대 100 USDT`. 원문대로 반영했으나 의도 확인 필요(`gate_report_nextbay_mission_banner.md` d-3).
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

### 2026-07-27 — 세션 #2: 용어집 v3 개편·IA 정본화·위키 문구 개편 + mission 키 정정

- **완료 (git 28커밋, origin 최신 `f125d67`)**:
  - **용어집 v2.6 → v3.5** (라이브 107 terms): v3.0 통합엑셀 69종 일괄 추가 → v3.1(Passcode·채우기) → v3.2(보내기 ja 出金) → v3.3(`거래 내역`→`거래내역` 붙여쓰기 정본) → v3.4(당첨) → v3.5(당첨금). 보류건 `glossary_pending_review_v3.md`.
  - **IA 정본화**: `md/IA.md` 신설(제품 3모드 매트릭스·분기 축·탭 노출), 로그인 상태 실측 라우트, **주간 점검 리포트 도입**(`reports/ia/ia_check_report_2026-07-27.md`).
  - **규칙 신설/강화**: dropweb 가이드 최신화 제안(`d44c875`), 날짜/URL 링크 룰(`d5b613b`), 코멘트 좌표 정규화·어노테이션 번호(`bf70e76`), 패턴 사전 일원화(check.md 정본, `8a78257`).
  - **위키 문구 개편**: invite_banner '둘 다', `invite_banner_desc` 신규(v74), 초대자 화면 전체(25034) 전수 재확인(P0=0·P1=0), Unifi mini 리워드 컨펌(64314-8894) 신규 키, 25034·25423 개편(**미사용 18키 삭제**). 게이트 리포트 총 30건.
  - **OA Flex**: 실값·동작 검증 구조 확정, 15건 재생성, **화면별 5개 언어 zip 통합**(`9aad167`).
  - **mission 키 정정(이번 대화)**: 화면 정의에 없는 orphan 9키 번역표 삭제 + 노란 셀 2키 처리 — `invite_mission`을 "친구 초대 미션"으로 정정(재번역), `invitee_mission` 신규 추가, 하이라이트 제거. 위키 v65/66→v67, 게이트 P0=0·exit 0(`gate_report_luckyball_mission_keys.md`).
- **이후 변화 / 주의**:
  - 위키는 세션 #2 이후에도 계속 편집돼 **현재 v103**. 내 v67 대비: `invite_mission` 정정 **유지**, orphan 8키 삭제 **유지**(`max20_desc` 재등장), **`invitee_mission`은 빠짐** → 사용자 결정으로 재추가 안 함.
  - 라이브 위키 버전이 하루에도 수십 회 오름(동시편집) → **PUT 직전 버전 재확인 필수**.
  - ~~작업트리 미추적 파일 잔존~~ → **2026-07-30 정리 완료**: `scripts/scripts/`(v2.4 오생성 캐시)·`xlt_validation_temp.xlsx`(82키 옛 검증본) 삭제, `Unifi_App_Screenshot.zip`(22MB 로컬 자산)은 유지하고 `.gitignore`에 등록.
- **다음 세션 첫 작업**: 사용자 새 지시 대기. 착수 = 토큰 요청·검증 → 원본 새로 조회.

### 2026-07-24 — 세션 #1: 럭키볼 캠페인 위키 대량 구축·반복 업데이트

- **완료 (위키 pageId 4479306980, v1→v35)**:
  - LV 3개 h4 섹션(Unifi mini·초대자·피초대자) + OA 섹션 + UIT 1건 전면 구축, 전역 번역표 73키, XLT 엑셀 73행 첨부
  - 프레임 추가/갱신 다수(코멘트 선별 모드, 이미지 ⓝ 어노테이션, Description 정책, 5개 언어 번역·게이트)
  - **제거**: `초대자 화면 전체`는 40394 이미지로 교체했다가 사용자 요청으로 이전(정책 6핀) 이미지로 리버트 / `Unifi mini 미션완료(30266)` 화면·전용 키 삭제 / `OA친구 추가시(27094)` 화면·첨부(이미지+flex5) 삭제
  - **교체(기존 행)**: 26224→42345, 25949→41690, 26511 개명(미션완료→가입완료), 26901·26901 타이틀 변경 등
  - **OA**: 5개 프레임 × 5개 언어 Flex JSON(총 25건, `templates/flex_message_spec.json` 스펙 준수) 생성·첨부, 각 화면 Description에 언어별 링크
  - **규칙 문서 커밋·푸시**: `md/OA.md` 신규(1b89c13·64e1f1f·ab133a6), `templates/flex_message_spec.json`, `md/wiki.md`·`md/translate.md` 어노테이션·팝업겹침 규칙(2a81173·a327cda), `md/glossary-changelog.md` v2.6(e453864). **origin/main 최신 = a327cda**
  - **정정**: 36558 voucher_musinsa 오매칭 삭제·prize_won/payout_5min 정정, 36558 Description 정책 누락(선택시 창닫힘·초대자 페이지 이동) 보완
  - History 15행 → 1행 병합
- **진행 중 / 중단 지점**:
  - `63468-39484 OA 추가` 요청은 사용자가 interrupt로 취소(이미 OA에 "피초대자 미션완료시"로 존재). 재요청 없으면 무시.
  - 마지막 작업: 36558 Description 정책 3개로 정정 완료(v35). 열린 작업 없음.
- **발견 / 배운 것**:
  - 위키 편집은 **라이브 재조회 → 균형 `<tr>` 추출로 surgical 교체 → 버전 가드 → PUT**. Confluence가 에디터 저장 시 storage 정규화(div content-wrapper, ri:attachment 내 ri:page). 동시편집으로 버전이 자주 바뀜 → PUT 직전 버전 재확인 필수.
  - 첨부 **갱신은 `POST .../child/attachment/{id}/data`**(같은 파일명 재-POST는 400). 파일명 유지하면 본문 `ri:filename` 참조 그대로 최신본 렌더. 삭제는 `DELETE .../content/{attachmentId}`(204).
  - PUT 응답에 제어문자가 섞여 파이썬 파싱이 깨질 때가 있으나 **HTTP 200이면 성공**(재조회로 확인).
- **다음 세션 첫 작업**:
  - 사용자 새 지시 대기(대개 "Figma 프레임 URL + 정책/문구/화면 업데이트" 형태). 착수 = 토큰 요청·검증 → 해당 프레임 새로 조회.

---

## 아카이브 요약

(없음)

---

## 컨텍스트 노트

- **파이프라인**: [1] `md/translate.md`(추출·XLT키·5개언어) → [2] `md/prototype.md` → [3] `md/wiki.md`. 최근 세션은 단일 프레임/코멘트 선별 + 위키 Mode B, 그리고 **위키 신규 생성**(`md/wiki.md` '위키 생성 모드') 중심.
- **게이트(필수)**: 한국어 원문 교정 → `python3 scripts/validate_translation.py`(P0=0) → `md/check.md` 3단계 **전수** 수동 → 게이트 리포트 → `python3 scripts/check_gate_report.py <리포트.md>` **exit 0**. 리포트 45건 누적. P1/P2는 이 데이터에서 **전건 오탐**(용어집 협소 매핑·부분문자열·조사 결합·마침표 정책) — 판정 유지.
- **위키 편집(필수 절차)**: 라이브 재조회 → 균형 `<tr>` surgical 교체 → **버전 가드**(PUT 직전 재확인) → PUT → **`check_wiki_storage.py` pre/post exit 0**. 첨부 갱신은 `POST .../child/attachment/{id}/data`, 삭제는 `DELETE .../content/{attachmentId}`. History는 **같은 날 1행 병합**.
- **핵심 산출물**: 위키 전역 번역표(75키)가 실질 정본 · `xlt/xlt_output_{LV,UIT}_20260727.xlsx` · `assets/annotated/*.png` · `oa/` · `gate_report_*.md`(45) · `reports/ia/` · `dropweb/web3_planning_v7.zip`(게시 대기)
- **스크립트 10종**(`scripts/`): fetch_glossary · fetch_comments(**`build_threads`+`collect_node_boxes` 좌표 정규화 필수**) · validate_translation · check_gate_report · **check_wiki_storage** · **collect_frames** · export_to_xlt · patch_translation · build_prototype_data · test_validation(**scripts 수정 후 필수 실행**)
- **에이전트 4종**(`.claude/agents/`): `translation-reviewer`(5키 이상·긴 문장·용어집 등재 전) · `glossary-guide-updater`(용어집 버전 상승 시 zip 갱신) · `wiki-policy-auditor`(전 프레임 정책 감사) · `figma-source-issues`(원문 오타 취합). **읽기 전용 3종 / 쓰기는 zip만**. 팬아웃은 8~10프레임 이상 읽기 단계에만.
- **캐시 금지**: Figma 노드·코멘트, 위키 원문, 용어집 모두 **매 작업 원본 재조회**. 같은 run 안의 파이프라인 핸드오프만 예외.
- **어노테이션**: 이미지 ⓝ = Description 통합 번호 = XLT No 1:1. **정책=빨강 / xlt=파랑**, 매칭 텍스트 좌측 10pt, 겹침 0 검증, **렌더 후 육안 확인**(팝업 겹침 오매칭 실측 있음).
- **담당 FE 팀**: LV(`mini_`·`{0}`) 기본 / UIT(`UF_`·`{{0}}`). **위키에 UIT/LV 구분이 없으면 사용자에게 질문**(Next bay는 질문 후 "둘 다 LV" 확정).
- **Screen ID**: `md/IA.md` 어휘로 `주기능_부기능_세부기능_01`(소문자), **매핑 표 사용자 승인 후에만** 부여. 기존 프레임명 기반 페이지는 소급 금지.
- **용어집**: API 읽기 전용(`fetch_glossary.py`), 갱신은 전체 JSON → 사용자가 CMS 붙여넣기 + **가이드 zip 동반 갱신 필수**(`md/landpress.md` §5-1, **0단계 최신 zip 판별부터**).
- **드랍웹 제약**: 정적 호스팅이라 **서버 역할 불가**(API 수신·스케줄). 브라우저 fetch도 용어집 API가 CORS 헤더를 안 주므로 자동 대조는 막히고 수동 폴백으로 동작 — **사용자가 현행 유지 결정**.
