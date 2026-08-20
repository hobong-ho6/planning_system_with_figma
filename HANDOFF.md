# HANDOFF — 공유 정본

<!--
════════════════════════════════════════════════════════════
핸드오프는 3계층이다. 계층 계약·갱신 대상 판별: handoff/README.md
절차 정본(세션 시작·종료): .claude/skills/handoff/SKILL.md

■ 이 파일에 쓰는 것 — 전역만
  · 모든 프로젝트에 적용되는 규칙·도구·결정
  · 프로젝트 인덱스(활성 프로젝트 1줄씩)
■ 이 파일에 쓰지 않는 것
  · 특정 위키·화면·키의 상태 → handoff/projects/{name}.md
  · PC·경로·환경               → handoff/people/{person}.md
  · 지금 점유 중인 전역 자원    → handoff/lanes/{...}.md
■ 분량: 인덱스 표를 제외하고 100줄 이내(매 세션 주입되므로 짧게 유지).
  넘치면 규칙은 md/ 문서로 옮기고 포인터만, 프로젝트 상태는 projects/ 로 내린다.
════════════════════════════════════════════════════════════
-->

- **프로젝트**: planning_system_with_figma — Figma → 다국어 번역(XLT) → Confluence 위키 파이프라인
- **저장소**: GitHub `hobong-ho6/planning_system_with_figma` (branch `main`) · 로컬 경로는 PC마다 다르다 → `handoff/people/{나}.md`
- **토큰**: Figma PAT + Confluence PAT — **사용자가 매 세션 채팅으로 제공**(파일·코드에 하드코딩 금지). 착수 전 유효성 검증 필수

---

## 프로젝트 인덱스

> 활성 프로젝트만 올린다. 종료된 것은 `handoff/projects/_archive/`로 옮기고 이 표에서 지운다.
> 담당자는 `git config --global handoff.person` 값과 같은 문자열을 쓴다(`handoff/README.md` 「사람 식별」).

| 프로젝트 | 담당자 | 대상 | 갱신 | 한 줄 상태 |
|---|---|---|---|---|
| [season3](handoff/projects/season3.md) | `hogeun` | 위키 `4541588845` · 16프레임 · 58키 | 08-10 | 위키 v81 · 미결 0 · IA #4 수치 교체 대상 확인 필요 |
| [masters](handoff/projects/masters.md) | `hogeun` | 마스터 4종 + K-Pick·FAQ | 08-06 | 4종 전부 History↔Summary 정합 |
| [glossary-guide](handoff/projects/glossary-guide.md) | `hogeun` | 용어집 + 기획자 가이드 **(전역 자원)** | 08-20 | 가이드 **v28 라이브**(태그) · 용어집 **v4.7**(v4.8 팀 합의 미도출로 철회) |
| [xlt-registry](handoff/projects/xlt-registry.md) | `hogeun` | XLT 등록값 3서비스 4,092키 | 08-10 | API 정상 · 수정 엑셀 1건 업로드 대기(사용자) |
| [ia-monitor](handoff/projects/ia-monitor.md) | `hogeun` | Unifi IA 주간 점검(월 10:00) | 08-10 | 점검 #4 완료 · 캐리오버 5건 이월 |
| [nonrealtime](handoff/projects/nonrealtime.md) | `hogeun` | 위키 `4541600637`·`4540065229` | 08-06 | 2종 v10 · 마스터와 정합 |
| [luckyball-campaign](handoff/projects/luckyball-campaign.md) | `hogeun` | 위키 `4479306980` · 75키 | 08-07 | v151 · 미결 0 |
| [misc-wikis](handoff/projects/misc-wikis.md) | `hogeun` | 기타 위키 7종 | 08-20 | **미추적 게이트 리포트 3건 소관 확인 필요** |

---

## 프로젝트 스킬 / 에이전트

저장소에 커밋돼 **`git pull`만으로 다른 PC에서도 동일하게 동작**한다. 새로 만들면 이 표에 한 줄 등록하고 **스킬 파일과 같은 커밋으로 푸시**한다.

| 종류 | 이름 | 용도 / 호출 시점 |
|---|---|---|
| 스킬 | `handoff` | 세션 인수인계 정본 절차 — 시작(상태 확인·pull·브리핑), 종료(WIP 보존 → 계층 갱신 → 커밋·푸시) |
| 에이전트 | `figma-source-issues` | 게이트 리포트 전체를 스캔해 **Figma 원문 수정 요청 목록**을 화면별로 취합(읽기 전용) |
| 에이전트 | `translation-reviewer` | XLT 번역 **2차 독립 검토**(분리 컨텍스트 재판정, 수정하지 않음) |
| 에이전트 | `wiki-policy-auditor` | 위키 Description ↔ Figma 코멘트 스레드 **1:1 정합성 감사**(읽기 전용) |
| 에이전트 | `glossary-guide-updater` | 용어집 버전 상승 시 **기획자 가이드 용어집 탭 갱신**(`md/landpress.md` §5-1) |

- 훅: `.claude/settings.json` SessionStart → `.claude/hooks/handoff-start.sh`가 **계층 주입**(공유 정본 + 점유 레인 + 내 people 파일 + 프로젝트 파일 목록). 프로젝트 본문은 대상 확정 후 읽는다
- `.claude/settings.local.json`(권한 allowlist·MCP)·`.claude/launch.json`은 **기기별 설정이라 git 제외**

---

## 전역 절차 · 컨텍스트

규칙 정본은 `CLAUDE.md`와 `md/`다. 아래는 **문서에 없는 실측·사각지대**만 남긴다.

- **파이프라인**: [1] `md/translate.md` → [2] `md/prototype.md` → [3] `md/wiki.md`. 최근 작업은 **단일 프레임/코멘트 선별 + 위키 Mode B**, 위키 신규 생성, 마스터 Summary 취합 중심
- **스크립트 실측 주의**(전체 표는 `CLAUDE.md`): `fetch_comments`는 **`fetch_threads`+`collect_node_boxes` 좌표 정규화 필수**(인라인 재구현 금지) · `collect_frames`는 **`Pillow` 필요** · `validate_translation`이 **모든 검증의 단일 출처** · `scripts/` 수정 후 **`test_validation.py` 필수 실행**
- **엑셀 생성은 반드시 `scripts/export_to_xlt.create_xlt_excel`로만** — pandas로 직접 만들면 `plurals` 고정 포맷(A1:G2·`one/other`·`Unnamed: 2`)이 깨져 **업로드가 실패**한다(2026-08-04 실측)
- **검증기 사각지대**(`md/check.md` v3.4): 언어 혼입 검사는 문자체계 기반이라 **20조합 중 15개만** 잡는다. ❌ ja↔zh 한자 상호 오염 · ❌ 영어가 ko/ja/th/zh 칸에 · ❌ ko 칸의 부분 영어. **`P0=0`은 "이 검사가 볼 수 있는 범위에 문제 없음"이다.** 보완 스캔 코드는 `reports/audit/xlt_system_glossary_audit_2026-08-07.md` §8-1
- **위키 편집**: 라이브 재조회 → 균형 `<tr>` surgical 교체 → **버전 가드**(PUT 직전 재확인) → PUT → `check_wiki_storage.py` **pre/post exit 0**. 첨부는 `POST .../child/attachment/{id}/data`(**같은 파일명 유지 → 본문 링크 그대로 최신본**). History는 같은 날 1행 병합
- **위키 storage 정규식 파싱은 중첩표·리스트 마크업을 고려한다** — `<tr>(.*?)</tr>` 비탐욕 매칭이 XLT 셀 중첩표에서 끊겨 **16프레임 XLT 컬럼이 전부 공란**으로 보였고 `<ol><li>` 자동 번호 소실로 "번호 누락" 오탐. **에이전트 3건이 동일 오판** — 에이전트 결과는 실측으로 걷어낸다
- **어노테이션**: 이미지 ⓝ = Description 통합 번호 = XLT No 1:1 · **정책=빨강 / xlt=파랑** · 매칭 텍스트 좌측 10pt · 겹침 0 검증 · **렌더 후 육안 확인**(`overlaps=없음`은 TEXT 노드만 회피한 결과다). 코멘트가 없는 프레임은 좌표 기반으로 직접 핀을 렌더한다
- **프레임 지정**: 링크 없이 **페이지/섹션 주소 + 프레임 이름**으로도 특정 가능(직속 자식 재조회 후 이름 필터). **동명 프레임 주의**(`(OA)Reward Confirm` 2개 등) — 후보가 둘 이상이면 사용자에게 확인
- **화면 이미지는 로컬에 보관하지 않는다** — 어노테이션 이미지는 **위키 첨부가 정본**. 재작업은 `scripts/collect_frames.py`(`assets/`는 실행 시 자동 생성·git 미추적)
- **문자열 치환은 구간을 한정한다** — 전역 치환은 위키 History의 과거 이력을 훼손한다. 번역표/OA 영역 오프셋으로 한정 + assert
- **OA 변수**: 용어집 `oa_variables`가 정본(`md/OA.md` §2-1) — `{{total_amount}}`·`{{wallet_address}}`. 등재된 변수는 문의 없이 재사용, 새 의미만 이름을 묻는다. **altText에는 변수 사용 불가**
- **담당 FE 팀**: LV(`unifi_promotion_`·`mini_`·`{0}`) / UIT(`UF_`·`{{0}}`) / **OA는 팀이 아님**(키 미부여·`{{이름}}`). 위키에 UIT/LV 구분이 없으면 사용자에게 질문
- **Screen ID**: `md/IA.md` 어휘로 `주기능_부기능_세부기능_01`(소문자), **매핑 표 사용자 승인 후에만** 부여. 기존 프레임명 기반 페이지는 소급 금지
- **캐시 금지 실측**: 세션 #17 감사 도중 `UF_floating_jpyc_banner_title`이 **실제로 삭제**돼 1시간 만에 키 수가 2,131→2,130으로 바뀌었다. 원본 재조회는 형식이 아니다

---

## 전역 결정 사항

| 날짜 | 결정 | 이유 |
|---|---|---|
| 2026-08-10 | **원격 최신성 확인을 CLAUDE.md 규칙으로 승격** — 세션 시작뿐 아니라 **쓰기 직전·30분+ 경과 후**에도 `git fetch` + `rev-list` 대조 | 세션 시작 pull은 시간이 지나면 낡는다. 덮어쓰기 사고의 직접 원인이 「작업 시작 때만 확인」이었다. 캐시 금지 규칙의 git판. 커밋 `d95d9af` |
| 2026-08-07 | **검증 로직은 `validate_translation.py` 단일 출처** — 새 검증기를 만들지 않고 입력을 엑셀 규격으로 변환해 넣는다 | 등급 의미가 갈리면 과거 게이트 리포트와 A/B 비교가 불가능해진다 |
| 2026-08-05 | **판정은 추정이 아니라 A/B 실측으로** | 2차 검토가 추정으로 보류를 권고한 건이 실측 0건이었다. 검증기는 **ko에 그 용어가 든 행만** 검사한다 |
| 2026-07-24~30 | **초기 규칙 10건 확정** — 위키 규격 3건(Screen 표 4컬럼 · 첨부 `ri:page` 금지 · 생성 규격) + History 1행 병합 · 같은 문구=같은 키 재사용 · OA는 XLT 키 미부여 · 용어집 v3.0 대개편 · IA 정본 신설 · 에이전트는 읽기 전용만 위임 | **전부 `md/`·`scripts/`에 규칙·검사기로 반영 완료** — 연혁 참고용 |

## ⛔ 전역 종결 (재작업·재제안 금지)

- **에이전트 분업 범위** — 번역·게이트·위키 PUT·엑셀은 **직렬 고정**. 읽기 전용만 팬아웃(손익분기 8~10프레임)

---

## 아카이브 요약 (전역 연혁)

- **2026-07-24~08-06 세션 #1~#9 (기반 구축)**: 럭키볼 캠페인 위키 v1→v147 · 시즌3 위키 신규 구축 · `md/OA.md`·`md/IA.md` 정본 신설 · 용어집 v2.6→v4.1(`oa_variables` 신설) · 도구 3종(`check_wiki_storage`·`collect_frames`·최장일치 검증기) · 에이전트 4종 · 주간 IA 점검 도입 · 가이드 v1~v13. 규칙·도구는 전부 `md/`·`scripts/`에 반영 완료
- **살아 있는 교훈**: PUT 직전 라이브 rebase 필수 · **미추적 파일을 같은 경로에 Write해 직전 세션 기록을 잃은 적 있다**(세션 시작 `git status`의 `??` 확인) · **다른 세션의 uncommitted 변경은 커밋하지 않는다**(WIP 보존 규칙을 그대로 적용하면 그 세션 작업을 가로챈다) · **세션은 병렬로 돈다**(`git fetch`만 하고 pull을 미루면 구버전 도구로 산출물을 만든다)
- 프로젝트별 세션 기록은 각 `handoff/projects/*.md` 「세션 기록」 참조
