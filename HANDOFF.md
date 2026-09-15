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
■ 분량: 20KB 이내(`wc -c HANDOFF.md` — 줄 수가 아니라 바이트로 잰다. 한글 1자=3바이트).
  이 파일 + 담당자 people/ 1개가 매 세션 주입된다 → 합계 24KB 이내 유지(2026-09-13 실측 22.3KB).
  넘치면 규칙은 md/ 문서로 옮기고 경고+포인터만, 프로젝트 상태는 projects/ 로 내린다.
════════════════════════════════════════════════════════════
-->

- **프로젝트**: planning_system_with_figma — Figma → 다국어 번역(XLT) → Confluence 위키 파이프라인
- **저장소**: GitHub `hobong-ho6/planning_system_with_figma` (branch `main`) · 로컬 경로는 PC마다 다르다 → `handoff/people/{나}.md`
- **토큰**: Figma PAT + Confluence PAT — **사용자가 매 세션 채팅으로 제공**(파일·코드에 하드코딩 금지). 착수 전 유효성 검증 필수 · Jira 티켓 기반 작업이면 **Jira PAT도 별도로 필요**(Confluence PAT로는 401)

---

## 프로젝트 인덱스

> 활성 프로젝트만 올린다. 종료된 것은 `handoff/projects/_archive/`로 옮기고 이 표에서 지운다.
> 아카이브 **12건**(09-04 5 · 09-13 5 · 09-14 1 · **09-15 1**)은 `_archive/`에 있다 — 재개가 필요하면 되돌린다.
> 담당자는 `git config --global handoff.person` 값과 같은 문자열을 쓴다(`handoff/README.md` 「사람 식별」).

| 프로젝트 | 담당자 | 대상 | 갱신 | 한 줄 상태 |
|---|---|---|---|---|
| [system-meta](handoff/projects/system-meta.md) | `hogeun` | 핸드오프 구조·규칙·도구 자체 | 09-15 | **전역 결정 연혁을 `md/decisions.md`로 이관**(HANDOFF 20.4KB → **17.0KB** · 여유 3.4KB · 삭제 아닌 이관) · 분량 기준은 `wc -c` 바이트(HANDOFF 20KB·프로젝트 18KB·주입 총합 24KB · 현재 **20.9KB**) · ⚠️ 아카이브 판단은 「다음 할 일」을 **눈으로 읽는다**(체크박스 grep은 오판) · **미결 0** |
| [masters](handoff/projects/masters.md) | `hogeun` | 마스터 **5종** + K-Pick 노출 정책·FAQ | 09-13 | ✅ **5종 전부 정합 · 전건 실측**(Lucky Ball 8↔8 · Mission **10↔10** · mini **4↔4** · Wallet 2↔2 · K-Pick 8↔8) — 깨져 있던 2종 Summary 블록 신설 + K-Pick 제목 v1.7.5 확정(위키 3건 PUT) · **미결 0** |
| [glossary-guide](handoff/projects/glossary-guide.md) | `hogeun` | 용어집 + 기획자 가이드 **(전역 자원 · 락 필요)** | 09-15 | 용어집 **v5.5**(118 terms) · 가이드 **v42 게시 완료**(태그 `guide-v42`) — **2026-09-15 API·태그 실측 재확인** · ⛔ 용어집 보완은 **「모아서 한 번에」**(`md/glossary-backlog.md` **대기 18건** · 발견 시 묻지 않는다) · **미결 1건**(`UF_clinic_detail_review_source` ja 검토) |
| [ia-monitor](handoff/projects/ia-monitor.md) | `hogeun` | Unifi IA 주간 점검(월 10:00) | 09-15 | 점검 **#7**(09-14) 반영 — **주기 정상 복귀**(#5→#6 4일 → #7 7일) · 🔴 **프로덕션 리워드 탭 스켈레톤 고착**(#6과 환경 역전 · `mission-users` 401) · 🔴 오프라인 결제 캐시백 캠페인 신설 · KAIA **4.2→4.1%** · **Preferred Stable** 축 신설 · ⛔ Screen ID 어휘 승인 대기 **12건** · **7주 연속 2건**(Beta 0% 표기 · K-Pick GNB) · ⚠️ **#6·#7이 12일간 미기록이던 것을 09-15에 소급 반영**(리포트 근거) |
| [unifi-mini-v2](handoff/projects/unifi-mini-v2.md) | `hogeun` | 위키 `4704515582` + LPC `4727978725` + **일본어 검수 `4750149077`** · **29화면** | 09-15 | 본문 **v206** · LPC **v55** · 검수 **v4** — 세션 #14: `UF_voucher_pay_more_discount` **`모든 바우처 최대 {{0}}% 혜택!`** 로 교체(5개 언어 · 업로드 완료) + **17일 버전 `모든 바우처 {{0}} 혜택!` 사전 준비**(위키 첨부 · ⛔ **09-17 전 업로드 금지 · FE·XLT 동시 적용**) · `74665-14721` **바텀시트 Hotfix 행 신설**(현재 적용) · `74620-13737`은 **17일 버전**으로 표기·이미지 갱신 · 신규 키 0건 · ⛔ 혜택 비율 **5%·10%·합산 15%**(`benefitrate`는 FE 합산) · ⛔ 형제 키 `_more_desc`는 **「할인」 유지** · ⛔ 헤더 타이틀은 카테고리 1·2에만 · 🔴 **미결**: 클리닉 한정해제 8개 파라미터 · XLT 엑셀 업로드 **5파일** |
| [unifi-mini-v2-oa](handoff/projects/unifi-mini-v2-oa.md) | `hogeun` | 위키 `4725932984` 예약 OA 16화면 + `4725963532` 100엔딜 OA 2종 | 09-15 | 예약 OA 발송 시간 제한 정책 확정 · **100엔딜 리텐션 OA 전건 완료**(100엔딜 **미구매/구매 사용자** · Landpress 20건 확정문·공개 · **LIAM 4건 재동기화 완료**) · 구 첨부 정리 · JA `還元` 유지 확정(⛔재제안 금지) · **미결 0** |
| [100yen-deal](handoff/projects/100yen-deal.md) | `hogeun` | 위키 `4725963532` · Figma `74343:1703` · **3화면** | 09-15 | 위키 **v1** · XLT **13키 전건 등록 확인**(Unifi 12 · Dapp Portal 1 · 실측) · 게이트 **P0 0** · ⛔ 주의사항은 JPYC 프로모션과 **전용 키 분리**(값만 복사) · ⛔ 「백엔딜」 음차 금지 → 4언어 **서술형** · 🔴 **미결 1건**(Home 더보기 landing url `TBU`) · ⚠️ **원 세션이 아닌 세션이 대신 등재** |

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

- **LPC 쓰기** — `scripts/restore/lpc_safe_put.js`로만 쓰고, 쓰기 **직전·직후** `python3 scripts/check_lpc_nulls.py` **exit 0**을 확인한다(공개 조회 API 기준 · 읽기 전용). 자세한 건 `CLAUDE.md` 「⛔ LPC 쓰기 규칙」

규칙 정본은 `CLAUDE.md`와 `md/`다. 아래는 **문서에 없는 실측·사각지대**만 남긴다.

- **파이프라인**: [1] `md/translate.md` → [2] `md/prototype.md` → [3] `md/wiki.md`. 최근은 **단일 프레임/코멘트 선별 + 위키 Mode B**·신규 생성·마스터 취합 중심. ⛔ **엑셀은 반드시 `export_to_xlt.create_xlt_excel`로만** — pandas로 직접 만들면 `plurals` 고정 포맷이 깨져 **업로드가 실패**한다(2026-08-04 실측)
- **스크립트 계약**(전체 표는 `CLAUDE.md`): `fetch_comments`는 **`fetch_threads`+`collect_node_boxes` 좌표 정규화 필수**(인라인 재구현 금지) · `collect_frames`는 **`Pillow` 필요** · `validate_translation`이 **모든 검증의 단일 출처** — ⚠️ **인자 함정**: `validate_translation.py <엑셀> <용어집>`은 **위치 인자만** 받아(`--glossary` 없음) 빠뜨리면 2단계를 **조용히 건너뛴다** · `check_wiki_storage.py post`·`compare_wiki_xlt.py`는 `CONFLUENCE_PAT` **환경변수**를 요구한다(`--token` 아님) · `scripts/` 수정 후 **`test_validation.py` 필수 실행**. ⚠️ `collect_frames` **실측 함정 4종**(xlt 마커 판정이 규칙보다 좁다 · 좌표 매칭 더미 · 이름/번호 변동 · 팝업 배경 구버전) → **`md/wiki.md` Step 3 「실측 함정 4종」**
- **검증기 사각지대** — 언어 혼입 검사는 문자체계 기반이라 **20조합 중 15개만** 잡는다(❌ ja↔zh 한자 · ❌ 영어가 ko/ja/th/zh 칸에 · ❌ ko 칸의 부분 영어). **`P0=0`은 「이 검사가 볼 수 있는 범위에 문제 없음」**이다 → `md/check.md` · 보완 스캔 `reports/audit/xlt_system_glossary_audit_2026-08-07.md` §8-1
- **위키 편집**: 라이브 재조회 → 균형 `<tr>` surgical 교체 → **버전 가드**(PUT 직전 재확인) → PUT → `check_wiki_storage.py` **pre/post exit 0**. 첨부는 `POST .../child/attachment/{id}/data`(**같은 파일명 유지 → 본문 링크 그대로 최신본**) — ⚠️ **`/data` 없이 `child/attachment`에 POST하면 버전이 오르지 않고 조용히 무시된다**(2026-09-15 실측: 4장 전부 구버전 유지). 기존 첨부 id를 먼저 조회한다 · History는 같은 날 1행 병합 · **이미지는 위키 첨부가 정본**(로컬 `assets/`는 재생성물·git 미추적). ⚠️ **storage 정규식은 중첩표·리스트를 고려한다** — `<tr>(.*?)</tr>` 비탐욕이 XLT 셀 중첩표에서 끊겨 **16프레임 XLT 컬럼이 공란**으로 보였고 `<ol><li>` 번호 소실로 "번호 누락" 오탐(**에이전트 3건이 동일 오판** — 에이전트 결과는 실측으로 걷어낸다). ⚠️ **문자열 치환은 구간 한정 + assert** — 전역 치환은 History 과거 이력을 훼손한다
- **프레임·어노테이션**: 이미지 ⓝ = Description 통합 번호 = XLT No 1:1 · **정책=빨강 / xlt=파랑** · 매칭 텍스트 좌측 10pt · 겹침 0 검증 · **렌더 후 육안 확인**(`overlaps=없음`은 TEXT 노드만 회피한 결과다) · 코멘트 없는 프레임은 좌표로 직접 핀 렌더. 프레임은 링크 없이 **페이지/섹션 주소 + 이름**으로도 특정 가능(직속 자식 재조회 후 필터) — **동명 프레임 주의**(`(OA)Reward Confirm` 2개 등), 후보가 둘 이상이면 사용자에게 확인. 도구 함정 4종 → `md/wiki.md` Step 3
- **Landpress**: `landpress/`는 XLT로 관리 못 하는 문구의 제3 경로 — ⚠️ **번역 게이트 그대로 적용** · **정본은 로컬 JSON이 아니라 실등록값**. ⛔ **JSON을 바꾸면 beta·prod를 같은 작업 안에서 함께**(beta 먼저 → 검증 → prod는 beta 등록값을 읽어 PUT · 매핑은 **`uid` 기준**). API 경계 — 새 항목 생성 O / **기존 항목에 로케일 추가 X**(고아 항목이 생긴다) · 로케일 파라미터는 공개·CMS 둘 다 **`?locale=`**(`?_locale=`은 **조용히 무시**). 상세 → **`md/landpress.md` §9-2 · §10-3 · §10-5-1**
- **키·표기 규칙**: **담당 FE 팀** LV(`mini_`·`{0}`) / UIT(`UF_`·`{{0}}`) / **OA는 팀이 아님**(키 미부여·`{{이름}}`) — 위키에 UIT/LV 구분이 없으면 사용자에게 질문 · **Screen ID**는 `md/IA.md` 어휘로 `주기능_부기능_세부기능_01`(소문자) · **OA 변수**는 용어집 `oa_variables`가 정본(`md/OA.md` §2-1, `altText`에 변수 불가)
- **⚠️ XLT 키는 등록 전이 유일한 기회다**(FE 전달 후 변경 불가) — ⓐ **프리픽스도 선례를 실측**해 「선례 N건/0건」을 선택지에 담는다 ⓑ **등록된 키의 값을 고치기 전 다른 사용처를 전부 확인**한다(요구가 갈리면 키를 분리 — 한쪽만 반영하면 다른 화면이 조용히 깨진다). ⭐ 구값 복원은 **`reports/gate/*.md`가 사실상 유일한 자산**. 실측·절차 → **`md/translate.md` §2-1-a·b**
- **Jira는 별도 PAT가 필요하다**(Confluence PAT로는 401) — REST `GET /rest/api/2/issue/{KEY}`. ⚠️ **description만 보면 안 된다**(Figma 링크가 코멘트·첨부에 있는 사례) · 절차 정본은 `md/wiki.md` 티켓 확장 규칙
- **용어집 「실사용 0건」 판정은 의미까지 본다** — 문자열이 있어도 **다른 뜻이면 선례가 아니다**(ja `すべて見る`를 0건으로 3세션 기록했으나 실측 6건, 단 뜻이 달랐다). 판정 기준 → **`md/check.md` 함정 2-1 · `md/landpress.md` §4**
- **⛔ 고유명사 로마자 표기는 추측하지 않는다** — 브랜드·제품·기관·법령명은 **번역이 아니라 조사** 대상이다(기존 등록값 → 공식 사이트 → 공식 SNS·도메인 → 판매처 순, **대소문자·띄어쓰기 원문 그대로**). 계기: 추정한 `FEELIMEELY`·`Hetras`가 **둘 다 틀려**(`FILLIMILLI`·`hetras`) 5개 언어 재등록. 절차 → **CLAUDE.md 게이트 1-1 · `md/check.md` 함정 2-2**
- **캐시 금지 실측**: 세션 #17 감사 도중 `UF_floating_jpyc_banner_title`이 **실제로 삭제**돼 1시간 만에 키 수가 2,131→2,130으로 바뀌었다. 원본 재조회는 형식이 아니다
- **⛔ 산출물은 만든 세션이 그 세션 안에서 커밋한다** — 게이트 리포트 9건·`landpress/` 100파일이 **9일간 로컬에만** 있었다(그 PC 밖에선 없는 것). **세션 종료 시 `git status`의 `??` 확인** · 내 것이면 커밋, 남의 것이면 **보고만**(임의 커밋·삭제 금지). `reports/gate/`·`landpress/`는 `.gitignore` 대상이 아니다

---

## 전역 결정 사항

> **최근 4건만 둔다.** 전체 연혁(12건 전문)은 **[`md/decisions.md`](md/decisions.md)** 가 정본이다 — 삭제가 아니라 이관이며, 재제안이 의심되면 그 파일을 먼저 연다. 새 결정은 이 표 맨 위에 넣고 밀려난 것을 그 파일로 내린다.

| 날짜 | 결정 | 이유 |
|---|---|---|
| 2026-09-15 | **Landpress PUT은 전체 교체다 — 콘텐츠 필드를 전부 담아 read-modify-write 한다**(정본 `md/landpress.md` §10-3-0). **강제 산출물 2종** — 쓸 때 `scripts/restore/lpc_safe_put.js`(직접 PUT 금지) · 쓰기 **직전·직후** `check_lpc_nulls.py` **exit 0** | `uid`만·한 필드만 보낸 PUT이 **형제 필드를 `null`로 지웠다** — 2026-09-14 4필드 소실(beta·prod). **리비전 이력이 없어**(`/revisions` 404 · `/audit-logs`는 GET만) CMS만으로는 복구 불가였고 저장소 `landpress/` 산출물이 유일한 복구원이었다. `e06866f`·`faa088a` |
| 2026-09-14 | **위키 상태값은 GuideKim ↔ Unifi B/E 기준을 병기하고 구현은 B/E 기준** | FE가 받는 값은 B/E를 거쳐 달라진다 — 상품권 `ISSUE_PENDING`→`PAID` · 클리닉 `NO_SHOW`/`REJECTED`→`CANCELED` · `point.status` 대문자 · 여행 `use_state` 미제공. B/E 스펙 `4725939674` |
| 2026-09-14 | **ZH-TW는 한자↔숫자·변수 경계에 공백 1칸**(`共 {{0}} 件` · JP는 반대로 붙임) — **신규·변경 키부터**, 기존은 소급 안 함. 정본 `md/guide.md` §5-1 B | 등록값 283건이 공백 247(87%)·무공백 36으로 갈려 있다(`{{0}}個`↔`{{0}} 個`). 전역 통일은 재등록·QA 비용이 커 **불일치 증가만 막는다**. `e7f26bf` |
| 2026-09-10 | **`XLT & GA` 셀 제목은 화면당 1개**(`{Screen ID} - XLT & GA`) — 이전엔 `- XLT`·`- Event` 2개로 나눴다. `md/GA.md` §2 정정, 새 페이지는 이 방식이 기본. 기존 페이지는 GA 작업 시 정정 권장(소급 강제 아님) | unifi-mini-v2에서 화면마다 목차(TOC) 항목이 2개씩 생겨 목차가 길어진다는 사용자 지적. XLT 키가 없는 화면도 제목은 동일하게 1개 유지 |

## ⛔ 전역 종결 (재작업·재제안 금지)

- **에이전트 분업 범위** — 번역·게이트·위키 PUT·엑셀은 **직렬 고정**. 읽기 전용만 팬아웃(손익분기 8~10프레임)

---

## 아카이브 요약 (전역 연혁)

- **종결 프로젝트 6건 + 기반 구축기 연혁 → [`handoff/projects/_archive/README.md`](handoff/projects/_archive/README.md)**로 이관(2026-09-14 분량 압축). 각 아카이브 `.md`의 「다음 할 일」이 닫을 당시의 정본이다 — **재개가 필요하면 그 파일을 `handoff/projects/`로 되돌리고 인덱스에 한 줄 추가**한다
- **살아 있는 교훈**: PUT 직전 라이브 rebase 필수 · **미추적 파일을 같은 경로에 Write해 직전 세션 기록을 잃은 적 있다**(세션 시작 `git status`의 `??` 확인) · **다른 세션의 uncommitted 변경은 커밋하지 않는다**(WIP 보존 규칙을 그대로 적용하면 그 세션 작업을 가로챈다) · **세션은 병렬로 돈다**(`git fetch`만 하고 pull을 미루면 구버전 도구로 산출물을 만든다)
- 프로젝트별 세션 기록은 각 `handoff/projects/*.md` 「세션 기록」 참조
