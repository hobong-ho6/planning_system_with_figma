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
  - 작업 위키(주, 2026-08-04~): https://wiki.workers-hub.com/pages/viewpage.action?pageId=4541588845 (**JPYC 럭키볼 시즌 3**) — **현재 v47** · Screen UIT 2 + LV(mini 2 · Promotion Page 6 · Popup 5) + OA MSG 1 = **프레임 16개** · 번역표 **47키** · 엑셀 3종(ALL v12·LV v4·UIT v9) · OA Flex zip v4
  - **마스터 페이지 4종**(2026-08-05 Summary 정합 완료 — Release History 행 ↔ Summary 블록 1:1):
    `4368569057` [Master] Lucky Ball Promotion(v8, 6↔6) · `4368568387` [Master] Mission and Reward(v16, 9↔9) · `4386238705` [Master] Unifi mini(v5, 3↔3) · `4386238738` [Master] Wallet Mode(v3, 2↔2)
  - 럭키볼 친구에게 선물하기 캠페인: `4479306980` — v148, 전역 번역표 75키
  - Mission and Reward 정책 + FAQ: `4368569133` — v39, FAQ 10문항 5개 언어(미결정 6건은 '다음 할 일' P2)
  - XLT 시스템 등록값(**값의 정본**): `~/Downloads/Dapp Portal_WEB BROWSER_v2.6.0_20260804143539.xlsx` (1,578키, git 미추적 — 세션마다 사용자에게 최신 export 요청)
  - 기타 위키: `4394814893` Next bay 미션앤리워드(v12) · `4515188069` Kaia Wallet > Unifi Mobile 전환 유도 · `4515188588` 미션 유형 구분 · `4402623039` 7월 JPYC - 예치 골드럭키볼 · `4251435406` [Screen]Wallet Mode · `4244669494` [Plan] EN/UK/CA/SG 분기
  - 부모 페이지(신규 생성 위치): `3910828993` [Hogeun] (space `UNIFI`)
  - Figma 파일: `GOCHAYBS7hIrmWRGNuJOKV` (Web3) · 시즌3 페이지 `65923:2485`
  - 절차 문서: `CLAUDE.md`, `md/translate.md`, `md/wiki.md`, `md/OA.md`, `md/check.md`, `md/landpress.md`, `md/IA.md`
  - 용어집: 라이브 **v4.0**(113 terms) / **v4.1(114 terms + `oa_variables` 2종) 산출 완료·CMS 반영 대기** — 붙여넣기용 전체 JSON은 git 추적본 `reports/glossary_v4.1_for_cms.json`. 이력 `md/glossary-changelog.md` · IA 정본 `md/IA.md`
  - 기획자 가이드: **`dropweb/web3_planning_v13.zip`** — 2026-08-05 발행, **게시 대기**(라이브는 아직 **v9** → 네 단계 밀림, v13에 v10~v12 내용 포함). **⛔ v11·v12는 폐기 — 게시 금지**(v12는 구 v4.1(113 terms) 임베드). ⚠ 최신본 판별은 파일명이 아니라 **푸터 내부 버전+용어집 임베드 버전+mtime**(`md/landpress.md` §5-1 0단계). `dropweb/`은 `.gitignore` 대상이라 **채팅 전달이 유일한 배포 경로**
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
  ```
  → **`Pillow`는 세션 #8에서 `requirements.txt`에 추가됨**(`143134d`) — 이제 별도 설치 불필요. 세션 #8 시작 시점에는 4종 모두 정상이었다.
- `validate_translation.py`는 **용어집을 두 번째 위치 인자로만** 받는다(`--glossary` 플래그 없음). 빠뜨리면 "용어집이 로드되지 않음. 2단계 건너뜀"으로 조용히 통과하니 주의:
  ```bash
  python3 scripts/validate_translation.py <엑셀> scripts/glossary.json
  ```
- `check_wiki_storage.py post --page`는 `CONFLUENCE_PAT` **환경변수**를 요구한다(`--token` 아님).

---

## 현재 상태

> 마지막 갱신: 2026-08-05 (세션 #8) · 작업 PC `AD03230205ui-iMac.local` · branch `main` · **마지막 커밋 `8d9d231`**(핸드오프) · 세션 작업분 `143134d`·`3d6b708`·`21fc1fa`·`fe67b80`

**진행 중 작업(WIP)**: **없음.** 작업 트리 clean, 미푸시 커밋 0건.

**시즌3 미결 8건이 전부 결정·반영됐다.** 위키 v41 → **v47**(사용자 편집 v46 포함). 결정 내역:
- **ⓐ th 럭키볼** → 용어집 정본 `ลูกบอลนำโชค`로 통일(2키) — 문서 내 th 럭키볼 **5키 완전 통일**
- **ⓑ `..._MINI` en 단위** → `up to 150,000 JPY worth of JPYC`(토큰 개수 → 엔 환산)
- **ⓒ `jpyc_info_oa_desc`** → ⓐ안(`이후 연계해…`)이 정본, **Figma는 수정하지 않고 XLT 키 문구로 확정**
- **ⓓ mini 키 미부여 4건 · ⓔ 최대 60만엔** → **무시**(기존 키가 있고 **XLT 키의 문구가 정답**)
- **ⓕ OA ④ URL** → 사용자가 `draw-promotion` → `luckyball-invite`로 교체 + 빈 파라미터 `?&` 제거
- **ⓖ OA ⑤** → 유입 추적 안 함(쿼리 없는 순수 경로 유지)
- **ⓗ altText** → **변수를 쓸 수 없어** 금액 미포함 확정

**추가 반영 3건**: ⓘ `info_soldout` ja `終了いたしました` → **`なくなりました`**(옆 키 `info_end`도 `終了`라 ja만 「소진」과 「종료」를 구분 못 하던 결함) · ⓙ **OA 변수 `{{amount}}` → `{{total_amount}}`** · ⓛ `UF_home_skyflag_title` **en·ja에 목적어 보충**(ko는 시스템 등록값이라 유보).

**용어집 v4.1을 산출했다(114 terms + `oa_variables` 2종) — CMS 반영 대기.** 최상위에 **네 번째 영역 `oa_variables` 신설**(스키마 확장): `{{total_amount}}`·`{{wallet_address}}`. terminology 3건 병합(`종료` zh `結尾`→`結束` · `포이카츠` en·th → `Poi-katsu` · `캠페인` 신규). **A/B 실측 P1 63 → 58(-5), 신규 0건.**

**추정이 아니라 A/B 실측으로 판정해야 한다** — 2차 검토 에이전트가 `캠페인` 등재를 "+3 신규 P1"로 추정해 보류를 권고했으나 **실측 0건**이었다. 검증기는 **ko에 그 용어가 든 행만** 검사하는데 해당 키가 1개뿐이고 4개 언어가 이미 일치했다.

**위키 전 16프레임 정책 감사를 완료했다**(`reports/audit/`). 위키 결함 1 · 확인 필요 5 · **Figma 원문 수정 요청 7** · 번호 어긋남 0 · 답글 누락 0. **감사 도구 결함 2건도 함께 잡았다** — ⓐ 중첩표에서 `<tr>` 비탐욕 매칭이 끊겨 XLT 컬럼이 전부 공란으로 보였고 ⓑ `<ol><li>` 자동 번호가 텍스트 추출에서 소실돼 "번호 누락" 오탐. **에이전트 3건이 동일하게 오판**했다.

**캐리오버 이슈(미해결)**: ⓐ 로그인 `/benefits/daily-mission` 스켈레톤 고착 ⓑ 정책 충돌 2건(mini 이자 배너 / K-Pick KR IP) ⓒ 영문 UI에 한국어 원문 노출 2건 ⓓ Beta 액션 라벨 개편이 프로덕션에 나가면 XLT 파급 큼.

---

## 다음 할 일

### 사용자 액션 대기 (Claude가 할 수 없음)
- [ ] **P0**: **용어집 v4.1을 Landpress CMS에 붙여넣기** — 전체 JSON은 **git 추적본 `reports/glossary_v4.1_for_cms.json`**(114 terms · 9 exceptions · `oa_variables` 2종). 가이드 v13의 용어집 탭에서 복사해도 동일하다. 반영 후 `fetch_glossary`로 v4.1 확인. **반영 전까지 라이브는 v4.0(113)이라 검증 P1이 5건 더 나온다**(정상).
- [ ] **P0**: **가이드 `dropweb/web3_planning_v13.zip` 드랍웹 게시** — 라이브가 v9라 **네 단계** 밀려 있다. **v13만 게시**하면 된다(v10~v12 내용 포함). **⛔ v11·v12는 폐기 — 게시 금지**(v12는 구 v4.1(113 terms) 임베드). 게시 규격 `md/dropweb-guide.md`. **zip은 git 미추적이라 채팅 전달본이 유일한 사본**이다.
- [ ] **P1**: **시즌3 감사 후속 — 위키 결함 1 + 확인 필요 5** (`reports/audit/wiki_policy_audit_season3_2026-08-05.md`)
  ⓐ `Reward Confirm Bottom Sheet` **요약문이 `회원가입 완료 후`인데 Figma·1번 정책은 `회원가입을 시작하고`** — 같은 셀에서 시점이 갈림(수정 승인 필요)
  ⓑ `User status case` **No 4 키가 No 3과 완전 중복** — Figma는 `unifi_promotion_jpyc_info_btn1`, 위키는 `info_btn1`. **신규 등록 vs 재사용 결정이 미결**(`gate_report_season3_uit_5keys.md:245`)
  ⓒ Bottom Sheet 노출 조건이 **Figma 코멘트끼리 정반대**(`User status case`=친구추가 **안 된** 경우 / `Reward Confirm`=**되어 있는** 상태)
  ⓓ Promotion page 말미 **「시즌 2 유의사항」+이미지** — 참고 자료인지 잔재인지
  ⓔ **OA ④ `referral_code=1810_SUOJB` 고정값** — 프로덕션 발송 시 전 수신자가 이 코드로 집계된다(빈 파라미터는 제거 완료)
- [ ] **P1**: **시즌3 잔여 번역 개선 7건** (`gate_report_season3_decisions_8.md` §4-3 M-1·M-4~M-10) — ko `미션하고`(ⓑ 결정으로 **유보**) · ja/zh 당첨 어형 2종 분기 · th `100% 당첨` 3종 · th `공식 계정` 3종 · **개행 정책**(형제 키가 상반 처리) · zh `中獎率` 의미 변형 · zh 청유형에 `？`. **ko 변경은 XLT 시스템 등록값 갱신이 선행**되어야 한다.
- [ ] **P1**: **`포이카츠` zh 결정** — 등재값 `點數活動` vs 실제 번역 `集點活動`(text8c)·`Poi-katsu 集點活動`(text8d)로 **zh 내부에서도 분기**. ⓐ 번역을 등재값에 맞추기 ⓑ 등재값을 `集點活動`으로 ⓒ en·th처럼 `Poi-katsu` 음차 통일 중 택일. (en·th는 v4.1에서 `Poi-katsu`로 확정됨)
- [ ] **P1**: **`팔로우` 표기 정리(ⓐ단계)** — XLT 시스템 문구를 `공식 계정 친구 추가`로 통일. 잔존: ko 3키 · ja `フォロー` 2 · ja `友達`→`友だち` 4 · **zh `關注`/`追蹤` 14**(시즌3에서 2키는 정리됨) · th `ติดตาม` 5 · en `follow` 2. 정리 후 재측정해 용어집 등재(ⓒ단계).
- [ ] **P1**: **시즌3 릴리즈 버전 확정 시** Lucky Ball 마스터 Release History 6행 Version 칸 + Summary 제목 `[PL] Unifi (버전 미정)` 두 곳 갱신. **Next bay(Mission and Reward 9행)도 동일**(현재 미확정).
- [ ] **P1**: **`[Plan] EN/UK/CA/SG 분기`(4244669494) 미확정 7건** — #6 서비스명 표기(`Unifi MINI`/`Unifi Mini`, 마케팅 시안 후) · #7 Wallet Mode 약관 별도 제공 · #8 공지사항 별도 운영 · #13 접속 IP 기준만으로 제한 · **#10·11·12는 택일**(SkyFlag·Sentbe 연동: unifi 도메인 하위 path / IAB·외부 브라우저 / 기존 채널 동의 허용). 배경 = 동일 기기에서 **IAB·LIFF·MINI가 세션 쿠키를 공유**해 한쪽 로그인/로그아웃이 전체에 영향. (#3·#4·#5는 완료)
- [ ] **P2**: **FAQ 페이지(4368569133) 미결정 6건** — 5-A 예산 소진 시 뽑기 불가 정책 · 3-A OA 발송 시각 · 6-A User tier 수치 공개 · 1-A 회차 기간 명시 · 정본 `16_Unifi FAQ`(3290350532) 이관 카테고리 · **시행 전 게시 금지**.
- [ ] **P1**: **IA Screen ID 어휘 승인 5건**(`md/IA.md` §4) — ① 보유 NFT `asset_nft_01`→`apps_mypage_nft_01` ② `/reward/…` 부스트·스테이킹 어휘 ③ K-Pick `kpick_` 확정 ④ 외부 지갑 연결 `asset_wallet_connect_01` ⑤ 비로그인 변형 어휘 방식. **확정 전까지 해당 영역 Screen ID 부여 금지.**
- [ ] **P1**: **미점검 축 조합 실측용 접근 수단**(`md/IA.md` §0-0-1) — 실측은 Web·mini × KR IP뿐. ⓐ **프로덕션 로그인**(Chrome에서 `www.unifi.me` 로그인만 해두면 다음 회차 자동 커버, **Claude 직접 로그인 금지**) ⓑ Wallet Mode(US·CA·UK·SG IP) ⓒ LIFF 링크 ⓓ JP IP ⓔ approve 미완료 계정 ⓕ mini 비로그인 ⓖ `draw-promotion`.
- [ ] **P1**: **`Mini - 일본`(65280-8215) NEXT Bay 배너 보상 단위** — 화면 전체가 JPYC인데 배너만 `최대 100 USDT`. Mission and Reward 마스터 버전 9에도 확인 항목으로 기재.
- [ ] **P2**: 정책 충돌 2건(mini 이자 배너 / K-Pick KR IP) · XLT 한국어 원문 노출 2건 FE·디자이너 확인.
- [ ] **P2**: **Figma 원문 수정 요청(디자이너)** — 누적 **19건**. ⓐ 시즌3 12건은 `gate_report_season3_screen_reconcile.md` (1a)에 전문 보존(`종료된 캠페인 입니다` 3곳 · `가입이 완료 됐어요!` · `UINIFI채널을 팔로우` · `JPYC선물하기` · nbsp · `최대 60만엔` · OA `0x8442...7c8로` 조사 결함 · OA 프레임 코멘트 0건 등) ⓑ **감사 신규 7건**은 `reports/audit/wiki_policy_audit_season3_2026-08-05.md` §3 — 키 구버전 2(`jpyc_btn1`→`jpyc_btn_signup` · `unifi_text8a`→`jpyc_unifi_text8a`) · **`팃`(한글 IME 켠 채 `xlt` 입력)** · mini Login x에 xlt 마커 추가 2 · **프레임명 `(Promotion)`→`(Popup)` 2**(`Has no DA Score`·`Abuser`) · `Has no DA Score` 정책 코멘트 보완. `figma-source-issues` 에이전트로 취합 가능.

### Claude 실행 대기 (승인 시 진행)
- [ ] **P2**: **IA 구조도 화면 미리보기 검토** — 「전체 IA 구조」 표의 메뉴명 마우스 오버 시 화면 캡처. 검토점: 캡처 수집 방법 · **zip 용량**(현재 2.87MB) · 로그인·상태 변경 화면 대체 표기 · **촬영 일자 표기 + 갱신 주기**.
- [ ] **P2**: **`md/wiki.md:260` 규칙 vs 관행 정리** — 규칙은 순수 `xlt` 마커 루트도 Description에 `N. xlt`로 남기라고 하지만 시즌3 **16프레임 전부**가 생략하고 XLT 컬럼에만 번호를 둔다(번호 체계는 3자 정합). **ⓐ 관행을 정본화(규칙 수정, 권장)** vs ⓑ 규칙대로 30여 행 일괄 추가 — 택일 필요.
- [ ] **P3**: 용어집 `마켓플레이스`·`게임` 등재 검토 — 단 **등재만으로는 오탐이 안 사라진다**. `validate_translation.py`의 **최장일치 우선·단어 경계** 개선 필요. ※ `당첨금`(prize)이 `당첨`(win)으로 매칭돼 P1 오탐이 반복 실측됨.
- [ ] **P3**: **`oa/` 기존 19파일의 `{{amount}}`** — v4.1에서 `{{total_amount}}`를 표준으로 확정했으나 과거 캠페인 산출물은 **소급하지 않기로 결정**(`md/OA.md` §2-1). 해당 캠페인을 재사용·수정할 때 함께 정리할지 결정 필요.
- [ ] **잔여**: 용어집 v3.0 보류건 팀 검토 대기 — `glossary_pending_review_v3.md`.

### 차단 요소
- 없음.

### 사용자 결정으로 종결(재작업 금지)
- **OA `altText`에 변수를 쓸 수 없다**(2026-08-05) — 금액 삽입안은 **종결**. 이후 OA 작업에서 altText 변수화를 **재제안하지 않는다**. (부록 7의 "봉투 텍스트에서도 치환 가능" 서술은 무효)
- **OA ⑤ `확인하기`는 유입 추적하지 않는다**(2026-08-05) — utm·referral_code 추가 제안 금지.
- **`unifi_promotion_jpyc_info_oa_desc`는 ⓐ안이 정본**(2026-08-05) — `이후 연계해 참여할 수 있는…`. **Figma 디자인은 수정하지 않고** 최종 XLT 키 문구로 확정. 키 분리 재제안 금지.
- **mini 키 미부여 4건 · `최대 60만엔`은 조치하지 않는다**(2026-08-05) — 기존 키가 있고 **XLT 키의 문구가 정답**. 확인 목록 재생성 금지.
- **`UF_home_skyflag_title` ko는 유보**(2026-08-05) — en·ja만 목적어를 보충하고 **ko 원문(`미션하고`·목적어 누락)은 시스템 등록값이라 건드리지 않는다**. 시스템 갱신 시 함께 처리.
- **`{{amount}}` 소급 치환 금지**(2026-08-05) — `oa/` 기존 캠페인 파일과 위키 History 이력 문장은 **그대로 둔다**. 신규·수정 작업부터 `{{total_amount}}`.
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
| 2026-08-05 | **용어집에 `oa_variables` 영역 신설**(스키마 확장 — 4번째 최상위 키) · `{{amount}}`→**`{{total_amount}}`** | OA는 XLT 키가 없어 **변수명이 정본으로 남지 않았고** 캠페인마다 이름을 다시 정하는 왕복이 반복됐다. 등재하면 문의 없이 재사용. `validate_translation.py`가 `terminology`/`exceptions`만 읽어 신규 키는 무해(실측). 커밋 `21fc1fa` |
| 2026-08-05 | **용어집 등재 판정은 추정이 아니라 A/B 실측으로** | 2차 검토가 `캠페인` 등재를 "+3 신규 P1"로 추정해 보류를 권고했으나 **실측 0건**. 검증기는 **ko에 그 용어가 든 행만** 검사한다. 커밋 `fe67b80` |
| 2026-08-05 | **위키 storage 정규식 파싱은 중첩표·리스트 마크업을 고려한다** | `<tr>(.*?)</tr>` 비탐욕 매칭이 XLT 셀의 중첩표에서 끊겨 **16프레임 XLT 컬럼이 전부 공란**으로 보였고, `<ol><li>` 자동 번호 소실로 "번호 누락" 오탐. **에이전트 3건이 동일 오판** |
| 2026-08-05 | **문자열 치환은 구간을 한정한다 — History 이력은 보존** | th 음차·`{{amount}}`를 전역 치환했으면 **History의 과거 변경 기록을 훼손**할 뻔했다. 번역표/OA 영역 오프셋으로 한정하고 assert로 강제 |
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

### 2026-08-05 — 세션 #8: 시즌3 미결 8건 종결 + 전 프레임 정책 감사 + 용어집 v4.1(`oa_variables` 신설)

- **완료 (git 4커밋 `143134d`·`3d6b708`·`21fc1fa`·`fe67b80`, 전부 푸시)**:
  - **P2 3건 처리** — `Pillow`를 `requirements.txt`에 추가(문서는 이미 "포함"이라 적혀 있던 **문서-실제 불일치**) · **`md/wiki.md`에 「대상 프레임 지정 방식」 신설**(URL 없이 페이지/섹션+이름으로 특정, 동명 프레임 2개↑면 사용자 확인) · **전 16프레임 정책 감사**
  - **시즌3 위키 v41 → v47** (사용자 편집 v46을 rebase로 보존) — 미결 8건 전부 결정 반영 + 추가 3건
    - th 럭키볼 **5키 완전 통일** · en 단위 엔 환산 정정 · ja **소진/종료 어휘 분리**(`なくなりました`) · `skyflag_title` **en·ja 목적어 보충**
    - **OA 변수 `{{amount}}` → `{{total_amount}}`**(위키 11곳 + Flex 5파일, zip v4) · ACTION_URL 빈 파라미터 제거
    - 엑셀 3종 3회 재첨부(ALL v10→v12 · LV v2→v4 · UIT v7→v9)
  - **용어집 v4.1 산출** — `oa_variables` 신설 + terminology 3건 병합(113→**114**). **A/B 실측 P1 63→58(-5), 신규 0건.** `md/OA.md` §2-1·`md/glossary-changelog.md` 동반 갱신. **가이드 v13**(v11·v12 폐기)
  - 게이트 리포트 1건 + 부록 2개(`gate_report_season3_decisions_8.md`) · 감사 리포트 1건(`reports/audit/`) — 매 차수 P0=0 · `check_gate_report.py` exit 0 · `check_wiki_storage.py` pre/post exit 0
- **주의/배운 것**:
  - **에이전트 결과를 그대로 믿으면 안 된다** — ⓐ 감사 에이전트 3건이 **동일하게** "XLT 컬럼 전부 공란"으로 오판(원인은 내 파서의 중첩표 처리) ⓑ 번역 검토 에이전트가 `캠페인` 등재를 "+3 P1"로 추정했으나 **실측 0건** ⓒ `Poi-katsu`를 용어집 위반으로 올렸으나 **이미 등재 대기 항목**. **전부 실측·교차 확인으로 걷어냈다.**
  - **전역 치환의 위험** — th 음차·`{{amount}}`를 전역 치환했으면 **History의 과거 변경 기록**을 훼손할 뻔했다. 구간 한정 + assert가 막았다.
  - **셸 heredoc에 보이지 않는 문자를 리터럴로 넣지 말 것** — `\xa0`가 일반 공백으로 정규화돼 **nbsp 151건 오탐**. `'\xa0'` 이스케이프 + quoted heredoc으로 정정.
  - 위키 URL 표기 **6번째 변형** — 한 URL이 **평문 + `<span>` 2조각으로 분할**. `<li>` 단위로 태그 제거 후 결합해 추출.
- **다음 세션 첫 작업**: **P0 2건 확인**(용어집 CMS 반영 여부 · 가이드 v13 게시 여부). 착수 = ① HANDOFF ② Python 의존성 ③ 토큰 요청·검증 ④ 원본 새로 조회.

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

## 아카이브 요약

- **2026-07-30 세션 #3**: 위키 4개 페이지 + 규칙·도구·에이전트 체계 구축(12커밋 `3b28cbe`) — 럭키볼 위키 v103→v147 · 신규 위키 3건 · 용어집 v4.0(113) · **규칙 4건**(Screen 표 4컬럼·첨부 `ri:page` 금지·위키 생성 규격·zip 최신 판별) · **도구 2종**(`check_wiki_storage.py`·`collect_frames.py`) · **에이전트 4종** · 가이드 v7. 실수→규칙 전환: 5컬럼 관성 재사용 → 검사기로 강제.

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
- **핵심 산출물**: 시즌3 위키 번역표 47키 · 럭키볼 캠페인 75키 · `xlt/xlt_output_season3_{ALL,LV,UIT}_20260804.xlsx` · `oa/flex_OA_Reward_Confirm_*`(5+zip v4) · `reports/gate/*.md`(49) · **`reports/audit/`(전 프레임 정책 감사)** · **`reports/glossary_v4.1_for_cms.json`(CMS 반영 대기)** · `reports/ia/`(#1~#3) · `dropweb/web3_planning_v13.zip`(**게시 대기**, 라이브 v9 · v11·v12 폐기)
- **OA 변수**: 용어집 `oa_variables`가 정본(`md/OA.md` §2-1) — **`{{total_amount}}`**(당첨금 총액) · `{{wallet_address}}`. 등재된 변수는 **사용자 문의 없이 재사용**하고, 새 의미만 이름을 묻는다. **altText에는 변수 사용 불가.**
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
