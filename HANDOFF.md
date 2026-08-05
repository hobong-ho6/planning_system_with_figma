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
  - 작업 위키(주, 2026-08-04~): https://wiki.workers-hub.com/pages/viewpage.action?pageId=4541588845 (**JPYC 럭키볼 시즌 3**) — **현재 v37** · Screen UIT 2 + LV(mini 2 · Promotion Page 6 · Popup 5) + OA MSG 1 = **프레임 16개** · 번역표 **47키** · 엑셀 3종
  - **마스터 페이지 4종**(2026-08-05 Summary 정합 완료 — Release History 행 ↔ Summary 블록 1:1):
    `4368569057` [Master] Lucky Ball Promotion(v8, 6↔6) · `4368568387` [Master] Mission and Reward(v16, 9↔9) · `4386238705` [Master] Unifi mini(v5, 3↔3) · `4386238738` [Master] Wallet Mode(v3, 2↔2)
  - 럭키볼 친구에게 선물하기 캠페인: `4479306980` — v148, 전역 번역표 75키
  - Mission and Reward 정책 + FAQ: `4368569133` — v39, FAQ 10문항 5개 언어(미결정 6건은 '다음 할 일' P2)
  - XLT 시스템 등록값(**값의 정본**): `~/Downloads/Dapp Portal_WEB BROWSER_v2.6.0_20260804143539.xlsx` (1,578키, git 미추적 — 세션마다 사용자에게 최신 export 요청)
  - 기타 위키: `4394814893` Next bay 미션앤리워드(v12) · `4515188069` Kaia Wallet > Unifi Mobile 전환 유도 · `4515188588` 미션 유형 구분 · `4402623039` 7월 JPYC - 예치 골드럭키볼 · `4251435406` [Screen]Wallet Mode · `4244669494` [Plan] EN/UK/CA/SG 분기
  - 부모 페이지(신규 생성 위치): `3910828993` [Hogeun] (space `UNIFI`)
  - Figma 파일: `GOCHAYBS7hIrmWRGNuJOKV` (Web3) · 시즌3 페이지 `65923:2485`
  - 절차 문서: `CLAUDE.md`, `md/translate.md`, `md/wiki.md`, `md/OA.md`, `md/check.md`, `md/landpress.md`, `md/IA.md`
  - 용어집: 라이브 **v4.0**(113 terms) · 이력 `md/glossary-changelog.md` · IA 정본 `md/IA.md`
  - 기획자 가이드: **`dropweb/web3_planning_v11.zip`** — 2026-08-05 발행, **게시 대기**(라이브는 아직 **v9** → v10·v11 두 단계 밀림, v11에 v10 내용 포함). ⚠ 최신본 판별은 파일명이 아니라 **푸터 내부 버전+용어집 임베드 버전+mtime**(`md/landpress.md` §5-1 0단계). `dropweb/`은 `.gitignore` 대상이라 **채팅 전달이 유일한 배포 경로**
  - IA 주간 점검: 스케줄 태스크 `weekly-unifi-ia-check`(매주 월 10:00) — 프로덕션 + Beta + mini Beta. 리포트 `reports/ia/`
- **토큰**: Figma PAT + Confluence PAT — **사용자가 매 세션 채팅으로 제공**(파일/코드에 하드코딩 금지). 착수 전 유효성 검증 필수.

---

## 프로젝트 스킬 / 에이전트

저장소에 커밋돼 **`git pull`만으로 다른 PC에서도 동일하게 동작**한다. 새로 만들면 이 표에 한 줄 등록하고 **스킬 파일과 같은 커밋으로 푸시**한다.

| 종류 | 이름 | 용도 / 호출 시점 |
|---|---|---|
| 스킬 | `handoff` | 세션 인수인계 정본 절차 — 세션 시작(상태 확인·pull·브리핑), 종료(WIP 보존 → HANDOFF 갱신 → 커밋·푸시) |
| 에이전트 | `figma-source-issues` | 게이트 리포트 전체를 스캔해 **Figma 원문 수정 요청 목록**을 화면별로 취합(읽기 전용) |
| 에이전트 | `translation-reviewer` | XLT 번역 **2차 독립 검토**(분리 컨텍스트 재판정, 수정하지 않음) |
| 에이전트 | `wiki-policy-auditor` | 위키 Description ↔ Figma 코멘트 스레드 **1:1 정합성 감사**(읽기 전용) |
| 에이전트 | `glossary-guide-updater` | 용어집 버전 상승 시 **기획자 가이드 zip의 용어집 탭 갱신**(`md/landpress.md` §5-1) |

- 훅: `.claude/settings.json`의 SessionStart가 `HANDOFF.md`를 자동 주입(git 추적).
- `.claude/settings.local.json`(권한 allowlist·MCP)은 **기기별 설정이라 git 제외**.

---

## 환경 / 머신 노트

- **⚠ Python 의존성이 사라질 수 있다** — 세션 #7 시작 시 `pandas`·`openpyxl`·`requests`·`PIL` 전부 없어 모든 스크립트가 `ModuleNotFoundError`로 실패했다(homebrew python 3.14). 복구:
  ```bash
  pip3 install --break-system-packages -r scripts/requirements.txt
  pip3 install --break-system-packages Pillow   # collect_frames.py 어노테이션 렌더용 (requirements.txt에 없음)
  ```
  → **`Pillow`가 `scripts/requirements.txt`에 빠져 있다**(다음 할 일 P2).
- `validate_translation.py`는 **용어집을 두 번째 위치 인자로만** 받는다(`--glossary` 플래그 없음). 빠뜨리면 "용어집이 로드되지 않음. 2단계 건너뜀"으로 조용히 통과하니 주의:
  ```bash
  python3 scripts/validate_translation.py <엑셀> scripts/glossary.json
  ```
- `check_wiki_storage.py post --page`는 `CONFLUENCE_PAT` **환경변수**를 요구한다(`--token` 아님).

---

## 현재 상태

> 마지막 갱신: 2026-08-05 (세션 #7) · 작업 PC `AD03230205ui-iMac.local` · branch `main` · 마지막 커밋 `602ee45`~`0d90f48`(3건, 전부 푸시 완료)

**진행 중 작업(WIP)**: **없음.** 작업 트리 clean, 미푸시 커밋 0건.

**시즌 3 위키(4541588845)가 v16 → v37로 크게 바뀌었다.** 구성: `Screen` → **UIT**(2) + **LV**(`mini` 2 · `Promotion Page` 6 · `Promotion Page - Popup` 5) + **`OA MSG`**(1) = **프레임 16개**, 번역표 **47키**(LV 40 + UIT 7), 엑셀 **3종**(`xlt_output_season3_{ALL,LV,UIT}_20260804.xlsx` — ALL v9·LV v1·UIT v6), OA Flex zip 1종(v2), 어노테이션 이미지 15장.

**⛔ `XLT 확인 필요 목록` 섹션은 삭제됐다** — 26행 전부가 「시스템 등록 필요/값 갱신 필요」였고 XLT 등록으로 해소되는 항목이라 사용자가 삭제 결정. **등록만으로 해소되지 않는 결정 3건은 `reports/gate/gate_report_season3_screen_reconcile.md` 부록 3이 유일한 기록**이다(th 럭키볼 표기 · en 단위 · `jpyc_info_oa_desc` 정본).

**값의 정본 원칙이 실측으로 재확인됐다** — `unifi_promotion_unifi_text8d`를 Figma(60만엔) 기준으로 반영했다가 **시스템 등록값(3만엔)이 정본**이라는 사용자 지적으로 되돌렸다. mini 화면도 3만엔이라 Figma가 구값임이 교차 확인됐다. **화면과 시스템이 다르면 시스템 export 우선.**

**키 조회 교훈** — `unifi_promotion_unifi_text8a`를 "문구 전면 상이"로 오진했으나 실제로는 `jpyc_` 접두 변형 키(`unifi_promotion_jpyc_unifi_text8a`)가 **따로 등록돼 있었고** 위키가 Screen No 12를 잘못된 키에 매핑한 것이었다. **같은 텍스트가 프레임별로 갈리면 `<접두>_<키명>` 변형까지 export에서 확인**할 것.

**마스터 페이지 4종 Summary를 전부 정합화했다**(Release History 행 ↔ Summary 블록 1:1). Unifi mini·Wallet Mode는 Summary가 **아예 비어 있어 신규 작성**했다. 이 과정에서 **진입 분기 3갈래 정본**을 확인했다 — Web/LIFF + approve 완료 + IP가 미·캐·영·싱 아님 = **Unifi** / Web/LIFF + approve 미완료 + IP가 미·캐·영·싱 = **Wallet Mode** / MINI app 주소 = **Unifi mini**.

**가이드 v11 발행** — 「이렇게 요청하세요」에 실제 요청 패턴 7가지 + 예시 4종 + 체크리스트 3항목 보강. **라이브가 v9라 두 단계 밀려 있다.**

**캐리오버 이슈(미해결)**: ⓐ 로그인 `/benefits/daily-mission` 스켈레톤 고착 ⓑ 정책 충돌 2건(mini 이자 배너 / K-Pick KR IP) ⓒ 영문 UI에 한국어 원문 노출 2건 ⓓ Beta 액션 라벨 개편이 프로덕션에 나가면 XLT 파급 큼.

---

## 다음 할 일

### 사용자 액션 대기 (Claude가 할 수 없음)
- [ ] **P0**: **가이드 `dropweb/web3_planning_v11.zip` 드랍웹 게시** — 라이브가 v9라 팀원이 보는 IA 구조도·요청법이 2단계 밀려 있다. v10은 건너뛰고 v11만 게시하면 된다(v11에 v10 내용 포함). 게시 규격 `md/dropweb-guide.md`. **zip은 git 미추적이라 채팅 전달본이 유일한 사본**이다.
- [ ] **P1**: **시즌3 미결 결정 8건** (전부 `reports/gate/gate_report_season3_screen_reconcile.md`에 근거 기록)
  ⓐ **th 럭키볼 표기 통일** — `mini_guidekim_luckyball_banner`·`UF_home_daily_mission_title_MINI`는 등록값 `ลัคกี้บอล`인데 같은 문서 2키는 용어집 정본 `ลูกบอลนำโชค`로 통일했다 → **문서 내 표기가 갈린 상태**
  ⓑ `UF_home_daily_mission_title_MINI` **en 단위** — en만 `up to 150,000 JPYC`(개수), 나머지는 `15만엔 상당의 JPYC`(엔 환산)
  ⓒ `unifi_promotion_jpyc_info_oa_desc` **정본 확정** — ⓐ `이후 연계해…`(7프레임 9곳) vs ⓑ `보너스 미션을 위해…`(Draw Done·Reward Confirm Bottom Sheet 2프레임 4곳). 다수 채택 + Figma 2프레임 수정 vs 키 분리
  ⓓ **mini 키 미부여 4건** — `다양한 미션 참여하고/최대 60만엔 혜택 받아요`·`미션하고 혜택 받기` / `보너스 리워드 받기`·`게임･설치･가입 다양한 미션 혜택` / `기간 한정! 6월 30일까지 진행`(**시즌3 기간은 8/31 — 구값 의심**) / `친구 초대하고 둘 다 럭키볼 받기`(Figma 구값 의심)
  ⓔ mini `최대 60만엔` — 같은 화면 보너스 카드·프로모션 페이지는 3만엔. 전체 미션 합산 상한인지 확인
  ⓕ OA ④ 버튼 **라벨↔목적지** — 라벨은 `친구에게도 JPYC 선물하기`인데 목적지가 `draw-promotion`, utm도 `unifi_luckyballwelcome`
  ⓖ OA ⑤ `확인하기` **추적 파라미터 없음** — ④는 전용 `referral_code=1810_SUOJB`가 있으나 ⑤는 쿼리 없음
  ⓗ OA **altText에 `{{amount}}` 노출 여부** — 현재 금액 없이 `미션 당첨금이 지급되었습니다.`
- [ ] **P1**: **용어집 v4.1 등재 3건** — `종료` zh `結尾`→**`結束`**(현 등재값이 오역: 글의 맺음말) · `포이카츠` en·th → **`Poi-katsu`** · **`캠페인`** 신규. 3건 모두 실측 신규 오탐 0건. ※ **`입금`은 철회** — 등록값이 zh `匯入`/en `Deposit`로 확인돼 매핑이 두 갈래라 `md/landpress.md` §4 기준 3 미충족. 승인 시 전체 JSON + **가이드 zip 동반 갱신 필수**(§5-1).
- [ ] **P1**: **`팔로우` 표기 정리(ⓐ단계)** — XLT 시스템 문구를 `공식 계정 친구 추가`로 통일. 잔존: ko 3키 · ja `フォロー` 2 · ja `友達`→`友だち` 4 · **zh `關注`/`追蹤` 14**(시즌3에서 2키는 정리됨) · th `ติดตาม` 5 · en `follow` 2. 정리 후 재측정해 용어집 등재(ⓒ단계).
- [ ] **P1**: **시즌3 릴리즈 버전 확정 시** Lucky Ball 마스터 Release History 6행 Version 칸 + Summary 제목 `[PL] Unifi (버전 미정)` 두 곳 갱신. **Next bay(Mission and Reward 9행)도 동일**(현재 미확정).
- [ ] **P1**: **`[Plan] EN/UK/CA/SG 분기`(4244669494) 미확정 7건** — #6 서비스명 표기(`Unifi MINI`/`Unifi Mini`, 마케팅 시안 후) · #7 Wallet Mode 약관 별도 제공 · #8 공지사항 별도 운영 · #13 접속 IP 기준만으로 제한 · **#10·11·12는 택일**(SkyFlag·Sentbe 연동: unifi 도메인 하위 path / IAB·외부 브라우저 / 기존 채널 동의 허용). 배경 = 동일 기기에서 **IAB·LIFF·MINI가 세션 쿠키를 공유**해 한쪽 로그인/로그아웃이 전체에 영향. (#3·#4·#5는 완료)
- [ ] **P2**: **FAQ 페이지(4368569133) 미결정 6건** — 5-A 예산 소진 시 뽑기 불가 정책 · 3-A OA 발송 시각 · 6-A User tier 수치 공개 · 1-A 회차 기간 명시 · 정본 `16_Unifi FAQ`(3290350532) 이관 카테고리 · **시행 전 게시 금지**.
- [ ] **P1**: **IA Screen ID 어휘 승인 5건**(`md/IA.md` §4) — ① 보유 NFT `asset_nft_01`→`apps_mypage_nft_01` ② `/reward/…` 부스트·스테이킹 어휘 ③ K-Pick `kpick_` 확정 ④ 외부 지갑 연결 `asset_wallet_connect_01` ⑤ 비로그인 변형 어휘 방식. **확정 전까지 해당 영역 Screen ID 부여 금지.**
- [ ] **P1**: **미점검 축 조합 실측용 접근 수단**(`md/IA.md` §0-0-1) — 실측은 Web·mini × KR IP뿐. ⓐ **프로덕션 로그인**(Chrome에서 `www.unifi.me` 로그인만 해두면 다음 회차 자동 커버, **Claude 직접 로그인 금지**) ⓑ Wallet Mode(US·CA·UK·SG IP) ⓒ LIFF 링크 ⓓ JP IP ⓔ approve 미완료 계정 ⓕ mini 비로그인 ⓖ `draw-promotion`.
- [ ] **P1**: **`Mini - 일본`(65280-8215) NEXT Bay 배너 보상 단위** — 화면 전체가 JPYC인데 배너만 `최대 100 USDT`. Mission and Reward 마스터 버전 9에도 확인 항목으로 기재.
- [ ] **P2**: 정책 충돌 2건(mini 이자 배너 / K-Pick KR IP) · XLT 한국어 원문 노출 2건 FE·디자이너 확인.
- [ ] **P2**: **Figma 원문 수정 요청(디자이너)** — 시즌3 누적 12건이 `gate_report_season3_screen_reconcile.md` (1a)에 전문 보존(`종료된 캠페인 입니다` 3곳 · `가입이 완료 됐어요!` · `[탭]미션 완료하고 100JPYC[공백2]받기` · `UINIFI채널을 팔로우` · `JPYC선물하기` · `공식 계정 채널 친구 추가` 다수 · `놓치지마세요!` · `100JPYC 당첨됐어요!` · nbsp · **`최대 60만엔`** · **OA `0x8442...7c8로`** 조사 결함 · **OA 프레임 코멘트 0건**). `figma-source-issues` 에이전트로 취합 가능.

### Claude 실행 대기 (승인 시 진행)
- [ ] **P2**: **`Pillow`를 `scripts/requirements.txt`에 추가** — `collect_frames.py` 어노테이션 렌더에 필수인데 빠져 있어 세션 #7에서 별도 설치가 필요했다.
- [ ] **P2**: **프레임 지정 방식을 `md/wiki.md`에 규칙화** — 링크 없이 **페이지/섹션 + 프레임 이름**으로 지정하는 방법(세션 #7에서 OA 프레임을 이 방식으로 특정). 동명 프레임 주의(한 파일에 `(OA)Reward Confirm` 2개·`(Unifi mini) - Logged in` 2개 존재)·이름 변경 이력 포함. 가이드 v11에는 이미 반영됨.
- [ ] **P2**: **IA 구조도 화면 미리보기 검토** — 「전체 IA 구조」 표의 메뉴명 마우스 오버 시 화면 캡처. 검토점: 캡처 수집 방법 · **zip 용량**(현재 2.87MB) · 로그인·상태 변경 화면 대체 표기 · **촬영 일자 표기 + 갱신 주기**.
- [ ] **P2**: **위키 전 프레임 정책 감사** — `wiki-policy-auditor` 에이전트로 실행 가능(읽기 전용).
- [ ] **P3**: 용어집 `마켓플레이스`·`게임` 등재 검토 — 단 **등재만으로는 오탐이 안 사라진다**. `validate_translation.py`의 **최장일치 우선·단어 경계** 개선 필요. ※ 세션 #7에서 같은 결함 실측 — `당첨금`(prize)이 `당첨`(win)으로 매칭돼 P1 오탐.
- [ ] **잔여**: 용어집 v3.0 보류건 팀 검토 대기 — `glossary_pending_review_v3.md`.

### 차단 요소
- 없음.

### 사용자 결정으로 종결(재작업 금지)
- **`XLT 확인 필요 목록` 섹션 삭제**(2026-08-05) — 26행 전부가 시스템 등록/갱신 항목이라 삭제 결정. **재생성 금지.** 미결 결정 3건은 게이트 리포트 부록 3 보존.
- **OA `총 2개의 럭키볼`은 고정 문구**(2026-08-05) — 변수화하지 않는다. 화면 키 `bottomsheet_signup_text3`도 `총 2개`로 등록됨.
- **OA `altText`는 bubble JSON에 넣지 않는다**(2026-08-05) — 메시지 봉투 값이고 Flex Simulator가 bubble만 받으므로 봉투로 감싸면 검증이 깨진다.
- **`mini_luckyball_invitee_mission`** 재추가 금지(2026-07-27).
- **`선물` 용어집 등재 보류**(2026-07-30) — `선물하기`(v3.6)로 커버 + zh·th 명사/동사 분기.
- **가이드 용어집 검증 버튼** 현행 유지(2026-07-30) — CORS로 자동 대조 불가, 수동 폴백 동작.
- **에이전트 분업 범위** — 번역·게이트·위키 PUT·엑셀은 **직렬 고정**. 읽기 전용만 팬아웃(손익분기 8~10프레임).

## 주요 결정 사항

| 날짜 | 결정 | 이유 |
|------|------|------|
| 2026-08-05 | **OA MSG 섹션은 UIT·LV와 동급 `h3`** / **mini는 LV 안 첫 `h4`** | OA는 FE 팀이 아니라 LINE OA 콘솔·Messaging API 발송이라 팀 프리픽스·`{0}` 치환자 규칙이 적용되지 않는다(LV 하위에 두면 규칙이 잘못 상속). mini는 LV 담당 surface라 LV 안. 커밋 `c20b332` |
| 2026-08-05 | **`bottomsheet_signup_text2` 변수 1개(금액만)** — 시점은 고정 문구 | 사용자 확정. 시스템은 `{0}`·`{1}` 2개였으나 시즌3는 즉시 지급(최대 5분 내)이라 시점 변수가 불필요 |
| 2026-08-05 | **`UF_floating_jpyc_banner_desc` 날짜 삭제** | 시즌3는 즉시 지급인데 이 배너만 `7월 15일에`(시즌2 잔재)여서 정책이 상충. 사용자가 위키에서 직접 삭제 |
| 2026-08-05 | **Figma와 XLT 시스템이 다르면 시스템 export 우선**(재확인) | `unifi_promotion_unifi_text8d`를 Figma 60만엔으로 반영했다가 시스템 3만엔으로 되돌림. mini 화면도 3만엔이라 Figma가 구값 |
| 2026-08-05 | **접두 변형 키를 먼저 조회한다** | `unifi_promotion_unifi_text8a`를 문구 상이로 오진. 실제로는 `jpyc_unifi_text8a`가 별도 등록돼 있었고 Screen 매핑이 틀렸던 것 |
| 2026-08-04 | **기존 키 값의 정본 = XLT 시스템 export** | FE가 실제 사용하는 값. 기획 문서가 구버전인 항목 7건 확인. 커밋 `b656873` |
| 2026-08-04 | **`채널 팔로우`·`팔로우` → `공식 계정 친구 추가`**(5개 언어 정본) · 용어집 등재는 보류 | 사용자 확정. 실측 일치율 32%로 landpress §4-3 미충족 → 규칙 문서로 강제 후 시스템 정리·재측정. 커밋 `4b186d6` |
| 2026-08-04 | **Policy 섹션은 `구분 \| 설명` 2열 표 1개** | 사용자가 직접 쓴 럭키볼 캠페인 Policy가 정본 포맷 |
| 2026-07-30 | **Screen 표는 4컬럼 고정**(`Screen ID / Screen / Description / XLT`) | Screen ID가 화면 식별자. `check_wiki_storage.py`로 강제 |
| 2026-07-30 | **첨부 참조는 `<ri:attachment ri:filename>` 단독** — `<ri:page>` 금지 | space-key/제목이 한 글자만 어긋나도 "알 수 없는 첨부파일"로 깨진다 |
| 2026-07-30 | **위키 생성 규격 확정** — Related Docs 카테고리별 행 + **Flow에 Figma 임베드 `width=1000`** | 사용자 확정. 동명 페이지 선확인 필수 |
| 2026-07-30 | **가이드 zip 최신본은 파일명·mtime으로 판별하지 않는다** | v4를 최신으로 오판(실제 v6) → 판별 = 푸터 버전+용어집 임베드+mtime 3값 |
| 2026-07-30 | **에이전트는 "넓게 읽고 취합"에만 위임** — 쓰기·번역·게이트는 직렬 | 병목이 병렬성이 아니라 규칙 준수 검증이었음 |
| 2026-07-27 | **용어집 v3.0 대개편** + `거래내역` 붙여쓰기 확정 | 팀 검토·라이브 확인 반영(v3.2 기각→v3.3 번복) |
| 2026-07-27 | **IA 정본 신설(`md/IA.md`) + 주간 정기 점검 리포트** | Screen ID 어휘·제품 3모드 매트릭스 정본화 |
| 2026-07-27 | **화면 정의에 없는 orphan 키는 번역표에서 삭제** | 화면 정의(Screen 상세표)가 키의 소스 |
| 2026-07-24 | **History 같은 날 1행 병합** | 규칙(CLAUDE.md/wiki.md). 이후 반드시 준수 |
| 2026-07-24 | **팝업/모달 겹침 화면은 어노테이션 육안 검증 필수** | 좌표 매칭이 z-order 미인식 → 배경 텍스트 오매칭 |
| 2026-07-24 | **정책 추출 = 순수 `xlt` root만 제외** | 36558에서 root 정책 2건 누락 발견 |
| 2026-07-24 | **XLT 키: 같은 문구=같은 키 재사용, 공유 키는 화면 제거 시에도 삭제 금지** | 화면 삭제 시 그 화면 "전용" 키만 삭제 |
| 2026-07-24 | **OA 메시지는 XLT 키 미부여·번역만** + 변수 `{{이름}}` + 언어별 Flex JSON | `md/OA.md` 규칙. XLT 엑셀·전역 키표에 넣지 않음 |

---

## 최근 세션 기록

### 2026-08-05 — 세션 #7: 시즌3 화면 전수 대조·mini·OA MSG 신설 + 마스터 4종 Summary + 가이드 v11

- **완료 (git 3커밋 `602ee45`·`c20b332`·`0d90f48`, 전부 푸시)**:
  - **시즌3 위키 v16 → v37** (사용자가 세션 중 v17·v19·v21·v23·v25·v30·v34·v36을 직접 편집 → **매 PUT 직전 rebase**로 대응)
    - **화면 기준 전수 대조** — 사용자 확정 3건(`jpyc_info_signup` 이모지 🎉 · `info_end` 「종료된 캠페인입니다.」 · `bottomsheet_signup_text2` 금액 변수화) + 신규 발견 7건 = **10키 49셀** 5개 언어
    - **수동으로 잡은 P0급 기존 결함 2건** — ja 치환자 `{0}}` 깨짐 · th `ในวันที่ !` 매달린 날짜
    - **번역 수정 승인 5건 적용** — th `ลักกี้บอล`→`ลูกบอลนำโชค` 2키 · zh `關注`→`加入…好友` 2키 · `UF_home_jpyc_banner_jackpot` `{{1}}JPYC`→`{{1}} JPYC`
    - **mini 영역 신설**(LV 첫 h4) — 프레임 2개(`66089-117041`·`66089-125866`), 어노테이션 2장(핀 4개, 육안 검증), 등록 키 3종 추가
    - **OA MSG 영역 신설**(h3) — `(OA)Reward Confirm`(`66048-116857`), 키 없는 번역표 5행 + **Alt(altText) 1행**, 변수 `{{amount}}`·`{{wallet_address}}`, Flex JSON 5개 언어 + zip(URL 갱신으로 v2)
    - **`XLT 확인 필요 목록` 섹션 삭제** — 26행 전부 시스템 등록/갱신 항목(사용자 결정)
    - 번역표 43 → **47키**, 엑셀 **3종**(ALL·**LV 신규**·UIT), 분할 정합 `LV ∪ UIT == ALL` 검증
  - **마스터 4종 Summary 정합** — Lucky Ball v8(버전 4·5·6) · Mission and Reward v16(버전 8·9) · **Unifi mini v5**·**Wallet Mode v3**(둘 다 Summary 신규 작성). 원본 7개 문서 Policy를 읽어 요약
  - **가이드 v11** — 「이렇게 요청하세요」에 실제 요청 패턴 **7가지** + 예시 4종 + 체크리스트 3항목. `md/landpress.md` §5-1 0단계로 v10을 베이스 판별
  - 게이트 리포트 1건에 **부록 3~7 누적**(`gate_report_season3_screen_reconcile.md`, 439줄+) — 매 차수 P0=0 · `check_gate_report.py` exit 0 · `check_wiki_storage.py` pre/post exit 0
- **주의/배운 것**:
  - **위키 Description의 URL 표기가 5가지로 섞인다** — 정상 앵커 / `&amp;` 이스케이프 / `<span class="nolink">` / `~:text=` 브라우저 하이라이트(퍼센트 인코딩) / 평문. 파서가 전부 처리해야 하고, `&amp;`를 안 풀면 LINE이 URL을 거부한다
  - **변수화가 조사 결함을 만든다** — OA `{{wallet_address}}로`는 0x 주소 말미에 따라 `로`/`으로`가 갈려 런타임에 절반이 비문. `{{wallet_address}} 주소로`로 명사를 넣어 고정
  - `md/OA.md` 규칙 1(격리) 검증을 매번 했다 — OA 문구·변수가 전역 번역표·XLT 엑셀에 유입 **0건**
- **다음 세션 첫 작업**: 사용자 새 지시 대기. 착수 = ① HANDOFF 확인 ② **Python 의존성 확인**(환경 노트) ③ 토큰 요청·검증 ④ 원본 새로 조회.

### 2026-08-04 — 세션 #6: 시즌 3 위키 신규 구축 + XLT 정본 전환 + 저장소·규칙 정리

- **완료(9커밋)**: 신규 위키 `JPYC 럭키볼 시즌 3` 생성 → v16(프레임 13·번역표 43키·엑셀 2종·확인 목록 9건) · **XLT 시스템 export를 값 정본으로 전환**(대기 12키 중 11키 확보, 문구 차이 7건) · 럭키볼 캠페인 3키 패치 → v143 · **엑셀 포맷 회귀 복구**(`plurals` 시트를 깨뜨려 업로드 실패 → **엑셀은 반드시 `export_to_xlt.create_xlt_excel`로만 생성**) · 규칙 3건(Policy 포맷·팔로우 표기·게이트 리포트 위치) · 핸드오프 스킬 단일화 · `collect_frames` 이미지 누락 버그 수정 · 저장소 정리(루트 73→6, 45M→28M)
- **배운 것**: 위키가 세션 중에도 사용자 편집으로 계속 올라간다 → **PUT 직전 라이브 rebase 필수** / `unifi_promotion_*` 키는 기획 문서에 KR만 있는 경우가 많아 4개 언어는 export에서 확보 / `xlt`만 적힌 코멘트는 역방향 KR 매칭으로 후보 제시 후 사용자가 키 확정

### 2026-08-03 — 세션 #5: IA 주간 정기 점검 #3

- **완료(1커밋 `30a98b1`)**: 프로덕션 비로그인 + Beta 로그인 + mini Beta 점검 · `md/IA.md` **§0-0-1 화면 변형 3축 신설**(환경×사용자 상태×IP) · §2-2 Season 3 정책 블록 · `kpick_myshopping_01` 폐기 · 리포트 `reports/ia/ia_check_report_2026-08-03.md` · **가이드 v10**(IA_DATA 70행 갱신·업데이트 이력 최신순 정렬)
- **교훈**: **비로그인 렌더는 로그인 상태의 근거가 아니다** — 로그인 여부는 `/my` 진입으로 먼저 확정할 것

### 2026-07-30 — 세션 #3: 위키 4개 페이지 + 규칙·도구·에이전트 체계 구축

- **완료(12커밋, `3b28cbe`)**: 럭키볼 위키 v103→v147(어노테이션 전면 재정리·신규 8키·전역표 75키) · 신규 위키 3건 · 용어집 v4.0(113) 산출 · **규칙 4건**(Screen 표 4컬럼·첨부 `ri:page` 금지·위키 생성 규격·zip 최신 판별) · **도구 2종**(`check_wiki_storage.py`·`collect_frames.py`) · **에이전트 4종** · 가이드 v7
- **실수→규칙 전환**: Screen 표 5컬럼(관성 재사용) → 4컬럼 규칙+검사기 / 첨부에 다른 스페이스 key 복사 → `ri:page` 금지 / 가이드 zip 최신본 오판 → §5-1 0단계 신설

## 아카이브 요약

- **2026-07-29**: Mission and Reward 정책 FAQ 신설(`4368569133`) — 사내 정본 `16_Unifi FAQ` 스키마로 Q&A 10건 5개 언어(위키 v38), 게이트 2건 P0=0. 미결정 6건은 '다음 할 일' P2로 이월.
- **2026-07-27 세션 #2**: 용어집 v2.6→v3.5 대개편(라이브 107 terms) · `md/IA.md` 정본 신설 + 주간 IA 점검 도입 · 럭키볼 위키 문구 개편(orphan 18키 삭제) · OA Flex 15건 재생성.
- **2026-07-24 세션 #1**: 럭키볼 친구초대 캠페인 위키 대량 구축(v1→v35, 전역 번역표 73키) · `md/OA.md` 신설 · 어노테이션·팝업 겹침 규칙 · History 같은 날 1행 병합 규칙 확립.

---

## 컨텍스트 노트

- **파이프라인**: [1] `md/translate.md` → [2] `md/prototype.md` → [3] `md/wiki.md`. 최근은 단일 프레임/코멘트 선별 + 위키 Mode B, 위키 신규 생성, **마스터 페이지 Summary 취합** 중심.
- **엑셀 생성은 반드시 `scripts/export_to_xlt.create_xlt_excel`로만** — pandas로 직접 만들면 `plurals` 고정 포맷(A1:G2·`one/other`·`Unnamed: 2`)이 깨져 **XLT System 업로드가 실패**한다(2026-08-04 실측).
- **게이트(필수)**: 한국어 원문 교정 → `validate_translation.py <엑셀> scripts/glossary.json`(P0=0) → `md/check.md` 3단계 **전수** 수동 → `reports/gate/` 리포트 → `check_gate_report.py` **exit 0**. P1/P2는 이 데이터에서 **전건 오탐**(용어집 협소 매핑·부분문자열·조사 결합·마침표 정책) — 판정 유지.
- **위키 편집(필수 절차)**: 라이브 재조회 → 균형 `<tr>` surgical 교체 → **버전 가드**(PUT 직전 재확인) → PUT → `check_wiki_storage.py` **pre/post exit 0**. 첨부 갱신은 `POST .../child/attachment/{id}/data`(**같은 파일명 유지 → 본문 링크 그대로 최신본**). History는 **같은 날 1행 병합**.
- **마스터 페이지 정합 규칙**: `Release History` **데이터 행 수 = Summary `<h3>버전 N` 블록 수**. 검증 시 앵커는 `<h1>Release History</h1>`를 쓸 것(History 행 본문에 "Release History"가 들어가 오집계된 실측 있음). 릴리즈 버전 미확정이면 제목에 `[PL] Unifi (버전 미정)`.
- **핵심 산출물**: 시즌3 위키 번역표 47키 · 럭키볼 캠페인 75키 · `xlt/xlt_output_season3_{ALL,LV,UIT}_20260804.xlsx` · `oa/flex_OA_Reward_Confirm_*`(5+zip) · `reports/gate/*.md`(48) · `reports/ia/`(#1~#3) · `dropweb/web3_planning_v11.zip`(**게시 대기**, 라이브 v9)
- **화면 이미지는 로컬에 보관하지 않는다** — 어노테이션 이미지는 **위키 첨부가 정본**. 재작업은 `scripts/collect_frames.py`(`assets/`는 실행 시 자동 생성, git 미추적).
- **IA 점검 루틴**: 매주 월 10:00 자동 → 직전 리포트 이월 확인 → 프로덕션 비로그인 → Beta·mini Beta → 로그인(가능할 때) → `md/IA.md` 갱신 → 리포트 발행 → **가이드 zip +1** → 커밋·푸시(`dropweb/`은 `git add` 금지). **상태 변경 액션 절대 미실행, 직접 로그인 금지.**
- **스크립트 10종**(`scripts/`): fetch_glossary · fetch_comments(**`build_threads`+`collect_node_boxes` 좌표 정규화 필수**) · validate_translation · check_gate_report · check_wiki_storage · collect_frames(**Pillow 필요**) · export_to_xlt · patch_translation · build_prototype_data · test_validation(**scripts 수정 후 필수 실행**)
- **캐시 금지**: Figma 노드·코멘트, 위키 원문, 용어집 모두 **매 작업 원본 재조회**. 같은 run 안의 파이프라인 핸드오프만 예외.
- **어노테이션**: 이미지 ⓝ = Description 통합 번호 = XLT No 1:1. **정책=빨강 / xlt=파랑**, 매칭 텍스트 좌측 10pt, 겹침 0 검증, **렌더 후 육안 확인**. 코멘트가 없는 프레임은 좌표 기반으로 직접 핀을 렌더해야 한다(OA 프레임 실측).
- **담당 FE 팀**: LV(`unifi_promotion_`·`mini_`·`{0}`) / UIT(`UF_`·`{{0}}`) / **OA는 팀이 아님**(키 미부여·`{{이름}}`). 위키에 UIT/LV 구분이 없으면 사용자에게 질문.
- **프레임 지정**: 링크 없이 **페이지/섹션 주소 + 프레임 이름**으로도 특정 가능(직속 자식 재조회 후 이름 필터). 단 **동명 프레임 주의**(`(OA)Reward Confirm` 2개 등) — 후보가 둘 이상이면 사용자에게 확인.
- **Screen ID**: `md/IA.md` 어휘로 `주기능_부기능_세부기능_01`(소문자), **매핑 표 사용자 승인 후에만** 부여. 기존 프레임명 기반 페이지는 소급 금지.
- **용어집**: API 읽기 전용, 갱신은 전체 JSON → 사용자가 CMS 붙여넣기 + **가이드 zip 동반 갱신 필수**(`md/landpress.md` §5-1, **0단계 최신 zip 판별부터**).
- **드랍웹 제약**: 정적 호스팅이라 서버 역할 불가. 용어집 API가 CORS 헤더를 안 줘 자동 대조는 막히고 수동 폴백 — **사용자가 현행 유지 결정**.
