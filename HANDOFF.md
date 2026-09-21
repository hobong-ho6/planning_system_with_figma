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
- **토큰**: Figma·Confluence·Jira PAT — **키체인 우선**(`figma-pat`·`confluence-pat`·`jira-pat` · 2026-09-18 현재 `confluence-pat`만 등록됨)**, 없으면 필요한 단계에서 요청**(2026-09-18 개정 · 파일·코드에 하드코딩 금지). 사용 직전 유효성 검증 · Jira는 **Jira PAT 별도**(Confluence PAT로는 401)

---

## 프로젝트 인덱스

> 활성 프로젝트만 올린다. 종료된 것은 `handoff/projects/_archive/`로 옮기고 이 표에서 지운다.
> 아카이브 **12건**(09-04 5 · 09-13 5 · 09-14 1 · **09-15 1**)은 `_archive/`에 있다 — 재개가 필요하면 되돌린다.
> 담당자는 `git config --global handoff.person` 값과 같은 문자열을 쓴다(`handoff/README.md` 「사람 식별」).

| 프로젝트 | 담당자 | 대상 | 갱신 | 한 줄 상태 |
|---|---|---|---|---|
| [system-meta](handoff/projects/system-meta.md) | `hogeun` | 핸드오프 구조·규칙·도구 자체 | 09-18 | **토큰 규칙 「필요 시 요청」 개정 · 산출물 3종 gitignore(LPC 복구원은 Auto-react로 이전) · Auto-react 유입 계약**(09-18) · **드랍웹 게시 규칙을 「Claude 직접 게시」로 개정**(CLAUDE.md · `md/dropweb-guide.md` **§8 신설** · `landpress.md` §5-1 · `guide-backlog` 절차 ④) · 가이드 대기 **7건 전건 반영 → 0건** · 「모아서 한 번에」 운영 정착(임계 제안 규칙) · 분량 기준은 `wc -c` 바이트 · **미결 0** |
| [masters](handoff/projects/masters.md) | `hogeun` | 마스터 **5종** + K-Pick 노출 정책·FAQ | 09-16 | 5종 정합은 09-13 실측 유지 · **K-Pick 바우처 마스터 갱신**(badges 18/18 · reviewCount 3건 · 상품명 12종 5개 언어 축약 · `emart24`·`CU` 공식 표기) · ⚠️ `syncExcludedFields`에 `badges`·`reviewCount` 없음(동기화 시 덮일 수 있음) |
| [glossary-guide](handoff/projects/glossary-guide.md) | `hogeun` | 용어집 + 기획자 가이드 **(전역 자원 · 락 필요)** | 09-16 | 용어집 **v5.5**(118 terms) · 가이드 **v43 게시 완료**(태그 `guide-v43` · **Claude가 REST로 직접 게시** · 대기 7건 전건 반영 → **0건**) · ⛔ 용어집 보완은 **「모아서 한 번에」**(`md/glossary-backlog.md` **대기 23건** · 발견 시 묻지 않는다) · **미결 1건**(`UF_clinic_detail_review_source` ja 검토) |
| [ia-monitor](handoff/projects/ia-monitor.md) | `hogeun` | Unifi IA 주간 점검(월 10:00) | 09-21 | 점검 **#8**(09-21) 반영 — 🔴 **KAIA 이율 3중 불일치**(ko 4.2% / en 4.1% / Beta 0% — **#7의 「4.1% 하향」 판정 정정** · XLT 확인 대상) · 🔴 리워드 스켈레톤 **「비로그인 해소 / 로그인 고착」**(#7의 「401이 원인」 진단도 정정) · 🔴 **Beta K-Pick 허브 풀 카탈로그 개편**·mini 홈과 재동일(**3주 연속 번복**) · ✅ **이월 4건 해소**(캐시백 조회·**Beta 로그인 창구=인앱**·관심 Apps·리워드 비로그인) · ⛔ **#7 기재 3건 정정** · 어휘 승인 대기 **12건**(⑫ 재검토) · **8주 연속 2건**(Beta 0% · K-Pick GNB) · 가이드 **v44 게시 완료**(`guide-v44`) |
| [unifi-mini-v2](handoff/projects/unifi-mini-v2.md) | `hogeun` | 위키 `4704515582` + LPC `4727978725` + 일본어 검수 `4750149077` · **29화면** | 09-17 | 본문 **v247** · LPC **v64** · Admin **v13** — **캐시백 계산식 개정**(환원액을 먼저 내림 · GuideKim 지급식 일치 · 1엔 오차 해소) · **혜택 배지 Admin 항목별 on/off**(`benefitBadgeVisible`) · `UNIFY-11381` Resolved(LPC 40셀) · **XLT 14키**(신규 `share_card_btn` 포함) · 공유 **URL 복사→LINE**(GA `click_share_line`) · 🔴 미결 — 브랜드 24종 용어집 **v5.7 대기**(오표기 3건 발견) · th 39·zh 47 **구 표기 잔존** · 클리닉 홈 카드 **의료광고 조치 대상** |
| [unifi-mini-v2-oa](handoff/projects/unifi-mini-v2-oa.md) | `hogeun` | 위키 `4725932984` **예약 OA 16화면 전용**(100엔딜 OA는 `100yen-deal`) | 09-16 | 발송 시간 제한 정책 확정(스케줄 22~8시 금지 · 확정 T0 예외) · beta 16건 등록 완료 · ⚠️ hero·버튼 URL **임시값** · `ko_KR`만(번역 미착수) · prod는 T0 1건 `isActive` No |
| [100yen-deal](handoff/projects/100yen-deal.md) | `hogeun` | 위키 `4725963532` **페이지 전체** — Screen 3화면 + **OA 2종** | 09-16 | 위키 **v26** · XLT **26키** — ✅ **미등록 8키 최초 등록 + 신규 3키**(`UNIFY-11369` · Unifi 2,592→**2,603** · 55셀 재조회 일치). FE의 「7키 삭제」는 **오진**(전 버전 미등록 — 위키엔 있고 시스템엔 없던 것) · `UNIFY-11368`도 같은 원인 · ⛔ 배지 치환자 **`<strong />`**(`{{0}}` 아님) · 🔴 Home 「더보기」 landing URL 미확정 · 🔴 공유 툴팁 하드코딩 |

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

- **LPC 쓰기** — `scripts/restore/lpc_safe_put.js`로만 쓰고, 쓰기 **직전·직후** `python3 scripts/check_lpc_nulls.py` **exit 0**을 확인한다(공개 조회 API 기준 · 읽기 전용). 자세한 건 `CLAUDE.md` 「⛔ LPC 쓰기 규칙」. ⚠️ **자동 승인 모드에서는 CMS 쓰기가 `[Production Deploy]`로 차단**된다(2026-09-17 실측) — 사용자 승인 후 진행하고, **beta만 먼저 넣는 우회는 §10-3-00 위반**이라 택하지 않는다

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
| **2026-09-18** | **토큰은 「필요한 단계에서 요청」** — 키체인(`confluence-pat`·`figma-pat`·`jira-pat`) 우선, 없으면 그 시점에 요청. 종전 「토큰 받기 전 착수 금지」 폐기(정본 CLAUDE.md 「⛔ 토큰 규칙」) | 무인·연동 실행(Auto-react 일감 패킷)에서 첫 행동이 토큰 요청이면 착수가 막힌다 |
| **2026-09-18** | **산출물은 커밋하지 않는다** — `reports/gate/`·`landpress/`·`oa/` gitignore(+`xlt/`). ⚠️ **LPC JSON은 복구원이라 커밋 대상이 Auto-react(private) `reports/landpress/`로 이전**(쓰기 세션 끝에 복사 필수) · 기존 이력은 정리하지 않는다(사용자 결정). public 유지, 사본은 Auto-react(private). Auto-react 유입 일감은 **일감 패킷↔결과 패킷**, task_id `[T095]`를 게이트 리포트·커밋에 표기(정본 `handoff/projects/system-meta.md`) | 09-17 커밋에 XLT 값이 public으로 올라갔다. private 전환은 public clone으로 쓰는 팀원을 막는다 |
| **2026-09-16** | **드랍웹 게시는 Claude가 직접 한다** — 종전 「zip 전달 → 사용자 업로드」 폐지(사용자 결정). 업로드는 **REST `PUT /api/sites/{siteId}`**(MCP 토큰 인증 · `file`+`name` multipart)이고 **MCP `update_site`는 못 쓴다**(`file_path`가 DropWeb **서버** 파일시스템 경로 — 로컬 zip 3형태 모두 실패, 실측). MCP는 `get_site`로 **게시 검증**에만 쓴다. ⛔ 게시 전 **사용자 승인** · 토큰은 **`~/.claude.json`에만**(저장소 금지). 정본 `md/dropweb-guide.md` §8 | DropWeb이 MCP를 열면서 사용자가 업로드를 대신할 이유가 사라졌다. 가이드 갱신마다 따라붙던 **전달→업로드→확인 왕복**이 없어진다(`minimize-user-intervention`). ⚠️ REST에는 `change_summary`가 없어 **배포 이력에 변경 요약이 안 남는다** — 커밋·`guide-backlog` 반영 이력이 대체하며, 파일 업로드형 MCP가 나오면 전환한다. `a15b5bc` |
| 2026-09-15 | **기획자 가이드는 「모아서 한 번에」 — 푸시마다 묻지 않고 `md/guide-backlog.md`에 등재만 한다**(정본 CLAUDE.md 📣 규칙). 다만 **대기 10건 이상 · ⛔차단 규칙 2건 이상 · 마지막 `guide-v*` 태그로부터 2주** 중 하나면 **한 줄로 제안**하고, 보류되면 **5건 더 쌓일 때까지 재제안 금지** | 가이드 1건 갱신에 **5곳 수정 + zip 재생성 + 헤더 렌더 확인 + 게시 + 태그**가 따라붙어 건건이 하면 비용이 과하고 버전만 잘게 오른다. 용어집도 이미 모아서 반영하므로(2026-09-14) **같은 흐름**이다 — 용어집 반영 작업에서 가이드를 함께 갱신한다. `1013215`·`edeb5d2` |

## ⛔ 전역 종결 (재작업·재제안 금지)

- **에이전트 분업 범위** — 번역·게이트·위키 PUT·엑셀은 **직렬 고정**. 읽기 전용만 팬아웃(손익분기 8~10프레임)

---

## 아카이브 요약 (전역 연혁)

- **종결 프로젝트 6건 + 기반 구축기 연혁 → [`handoff/projects/_archive/README.md`](handoff/projects/_archive/README.md)**로 이관(2026-09-14 분량 압축). 각 아카이브 `.md`의 「다음 할 일」이 닫을 당시의 정본이다 — **재개가 필요하면 그 파일을 `handoff/projects/`로 되돌리고 인덱스에 한 줄 추가**한다
- **살아 있는 교훈**: PUT 직전 라이브 rebase 필수 · **미추적 파일을 같은 경로에 Write해 직전 세션 기록을 잃은 적 있다**(세션 시작 `git status`의 `??` 확인) · **다른 세션의 uncommitted 변경은 커밋하지 않는다**(WIP 보존 규칙을 그대로 적용하면 그 세션 작업을 가로챈다) · **세션은 병렬로 돈다**(`git fetch`만 하고 pull을 미루면 구버전 도구로 산출물을 만든다)
- 프로젝트별 세션 기록은 각 `handoff/projects/*.md` 「세션 기록」 참조
