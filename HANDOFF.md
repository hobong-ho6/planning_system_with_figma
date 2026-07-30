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
  - 작업 위키: https://wiki.workers-hub.com/pages/viewpage.action?pageId=4479306980 (럭키볼 친구에게 선물하기 캠페인) — **현재 version 103** (2026-07-27 20:06, 김호근)
  - Figma 파일: GOCHAYBS7hIrmWRGNuJOKV (Web3)
  - 절차 문서: `CLAUDE.md`, `md/translate.md`, `md/wiki.md`, `md/OA.md`, `md/check.md`, `md/landpress.md`, `md/IA.md`
  - 용어집: 라이브 **v3.5**(107 terms) · 이력 `md/glossary-changelog.md` · IA 정본 `md/IA.md` · 주간 IA 점검 `reports/ia/`
- **토큰**: Figma PAT + Confluence PAT — **사용자가 매 세션 채팅으로 제공**(파일/코드에 하드코딩 금지). 착수 전 유효성 검증 필수.

---

## 현재 상태

> 마지막 갱신: 2026-07-27 (세션 #2)

럭키볼 친구초대 캠페인 위키(pageId 4479306980)를 반복 업데이트 중 — **현재 v103**(김호근 20:06). 팀 **LV**(키 프리픽스 `mini_luckyball_`, 치환자 `{0}`)가 주. Screen 섹션 구조: `UIT`(Unifi LIFF 1건) / `LV`(하위 h4: **Unifi mini**·**초대자 프로모션 페이지**·**피초대자 프로모션 페이지**·**OA**) + 전역 `다국어 번역(XLT Full Translation)` 표(**73키**) + XLT 엑셀 첨부. 게이트(validate_translation.py + check.md 3단계 + check_gate_report.py exit 0)는 신규/변경 번역마다 통과 후 반영, 리포트 누적 **30건**(`gate_report_*.md`).

**2026-07-27 하루 동안 대량 작업**(git 28커밋, origin 최신 `f125d67`): ⓐ **용어집 v2.6→v3.5** 대개편(v3.0 통합엑셀 69종 일괄 추가→v3.1~v3.5 순차, 라이브 반영 완료 107 terms) ⓑ **IA 정본화** — `md/IA.md` 신설·로그인 실측·**주간 정기 점검 리포트 도입**(`reports/ia/ia_check_report_YYYY-MM-DD.md`) ⓒ **규칙 신설** — dropweb 가이드 최신화 제안·날짜/URL 링크 룰·코멘트 좌표 정규화(하위 노드 앵커) ⓓ **위키 문구 개편** — invite_banner '둘 다', invite_banner_desc 신규, 25034·25423 개편(미사용 18키 삭제), Unifi mini 리워드 컨펌 신규 키 ⓔ **OA Flex** 실값·동작 검증 구조 확정·15건 재생성·**화면별 5개 언어 zip 통합**.

---

## 다음 할 일

- [ ] **P2**: (제안했으나 미응답) **전체 화면 정책 누락 일괄 점검** — "스레드 root=정책 + 답글=xlt" 케이스에서 root 정책이 Description에 빠졌는지 전 프레임 점검(36558에서 실제 누락 발견·수정). 사용자 승인 시 진행.
- [ ] **P3**: Figma 원문 잔존 오타 디자이너에게 정리 요청(예: `생성 포`→`포함`, `정보가변경`→`정보가 변경`). 번역은 이미 교정본 반영, 원본은 미수정(미확인).
- [ ] **잔여**: 용어집 v3.0 보류건 팀 검토 대기 — `glossary_pending_review_v3.md`(뽑기 계열 zh·th 오역 의심 등). 검토 결과 수령 시 다음 버전 반영.

### 차단 요소 / 대기 중

- 없음 (OA 실값·zip 통합은 2026-07-27 완료).

### 사용자 결정으로 종결(재작업 금지)

- **`mini_luckyball_invitee_mission`(🎁 친구가 보낸 럭키볼 선물)** — 세션 #2에서 신규 추가했으나 이후 편집으로 번역표에서 빠짐. **사용자가 "그대로 놔둬"로 결정(2026-07-27)** → 재추가하지 않음.
- **OA 메시지 실값 반영** — 2026-07-27 실값·동작 검증 구조 확정 및 15건 재생성으로 완료(구 P1 종료).

---

## 주요 결정 사항

| 날짜 | 결정 | 이유 |
|------|------|------|
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

- **파이프라인 요약(CLAUDE.md)**: [1] `md/translate.md`(추출·XLT키·5개언어) → [2] `md/prototype.md` → [3] `md/wiki.md`. 이번 세션은 단일 프레임/코멘트 선별 + 위키 Mode B 중심.
- **게이트(필수)**: 번역 출력/위키/엑셀 반영 전 — 한국어 원문 교정 → `python3 scripts/validate_translation.py`(P0=0) → `md/check.md` 3단계 수동 → 게이트 리포트 작성 → `python3 scripts/check_gate_report.py <리포트.md>` **exit 0**. 리포트는 프로젝트 루트 `gate_report_luckyball_*.md`로 다수 존재. P1/P2는 이 데이터에서 **전건 오탐**(용어집 협소 매핑·타이틀 마침표) — 처리 판정 유지.
- **핵심 산출물**: 위키 번역표(XLT Full Translation, 현재 73키)가 실질 소스 · `xlt/xlt_output_*.xlsx`(항상 최신 1개, 재생성 시 이전 삭제) · `assets/annotated/*.png`(어노테이션 이미지) · `oa/`(OA 언어별 flex + 화면별 zip) · `gate_report_*.md`(30건) · `reports/ia/`(주간 IA 점검).
- **자주 쓰는 조회**: 프레임/코멘트는 Figma REST(`/v1/files/{key}/nodes`, `/comments`), 코멘트는 반드시 `scripts/fetch_comments.py`의 `build_threads`(답글 `parent_id` 매칭). **캐시 금지 — 매 실행 원본 재조회.**
- **어노테이션 규칙**: 이미지 ⓝ ↔ XLT 표 No(문구 위치, 대부분 화면) 또는 Description 정책 번호(정책 핀 화면: 초대자 화면 전체 등). 경계 clamp 필수. 팝업 겹침 화면은 렌더 후 육안 확인.
- **담당 FE 팀**: LV(`mini_` 프리픽스·`{0}`) 기본. UIT(`UF_`·`{{0}}`)는 위키 UIT 소제목 영역. 위키에 UIT/LV h3 구분 존재.
- **용어집**: API 읽기전용(`scripts/fetch_glossary.py`), 갱신은 전체 JSON 산출→사용자가 Landpress CMS 붙여넣기(`md/landpress.md`). **현재 라이브 v3.5(107 terms)**, 이력 `md/glossary-changelog.md`, 보류 `glossary_pending_review_v3.md`.
