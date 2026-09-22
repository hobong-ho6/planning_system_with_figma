# 전역 실측·사각지대 (핸드오프 컨텍스트)

> **왜 있나**: `HANDOFF.md`는 매 세션 주입되므로 20KB 상한이 있다. 상한에 닿아 **2026-09-22 포인터 압축**으로 「전역 절차 · 컨텍스트」 전문을 이 파일로 옮겼다 — **삭제가 아니라 이관**이며, `HANDOFF.md`에는 한 줄 경고 + 이 문서의 절 번호만 남겼다.
>
> 규칙 정본은 `CLAUDE.md`와 `md/`다. 아래는 **문서에 없는 실측·사각지대**만 남긴다.
>
> 새 실측은 **이 파일에 추가**하고, 세션이 반드시 먼저 알아야 하는 것만 `HANDOFF.md` 목차에 한 줄로 올린다.

---

## §1. LPC 쓰기

- **LPC 쓰기** — `scripts/restore/lpc_safe_put.js`로만 쓰고, 쓰기 **직전·직후** `python3 scripts/check_lpc_nulls.py` **exit 0**을 확인한다(공개 조회 API 기준 · 읽기 전용). 자세한 건 `CLAUDE.md` 「⛔ LPC 쓰기 규칙」. ⚠️ **자동 승인 모드에서는 CMS 쓰기가 `[Production Deploy]`로 차단**된다(2026-09-17 실측) — 사용자 승인 후 진행하고, **beta만 먼저 넣는 우회는 §10-3-00 위반**이라 택하지 않는다


## §2. 파이프라인·엑셀

- **파이프라인**: [1] `md/translate.md` → [2] `md/prototype.md` → [3] `md/wiki.md`. 최근은 **단일 프레임/코멘트 선별 + 위키 Mode B**·신규 생성·마스터 취합 중심. ⛔ **엑셀은 반드시 `export_to_xlt.create_xlt_excel`로만** — pandas로 직접 만들면 `plurals` 고정 포맷이 깨져 **업로드가 실패**한다(2026-08-04 실측)

## §3. 스크립트 계약

- **스크립트 계약**(전체 표는 `CLAUDE.md`): `fetch_comments`는 **`fetch_threads`+`collect_node_boxes` 좌표 정규화 필수**(인라인 재구현 금지) · `collect_frames`는 **`Pillow` 필요** · `validate_translation`이 **모든 검증의 단일 출처** — ⚠️ **인자 함정**: `validate_translation.py <엑셀> <용어집>`은 **위치 인자만** 받아(`--glossary` 없음) 빠뜨리면 2단계를 **조용히 건너뛴다** · `check_wiki_storage.py post`·`compare_wiki_xlt.py`는 `CONFLUENCE_PAT` **환경변수**를 요구한다(`--token` 아님) · `scripts/` 수정 후 **`test_validation.py` 필수 실행**. ⚠️ `collect_frames` **실측 함정 4종**(xlt 마커 판정이 규칙보다 좁다 · 좌표 매칭 더미 · 이름/번호 변동 · 팝업 배경 구버전) → **`md/wiki.md` Step 3 「실측 함정 4종」**

## §4. 검증기 사각지대

- **검증기 사각지대** — 언어 혼입 검사는 문자체계 기반이라 **20조합 중 15개만** 잡는다(❌ ja↔zh 한자 · ❌ 영어가 ko/ja/th/zh 칸에 · ❌ ko 칸의 부분 영어). **`P0=0`은 「이 검사가 볼 수 있는 범위에 문제 없음」**이다 → `md/check.md` · 보완 스캔 `reports/audit/xlt_system_glossary_audit_2026-08-07.md` §8-1

## §5. 위키 편집

- **위키 편집**: 라이브 재조회 → 균형 `<tr>` surgical 교체 → **버전 가드**(PUT 직전 재확인) → PUT → `check_wiki_storage.py` **pre/post exit 0**. 첨부는 `POST .../child/attachment/{id}/data`(**같은 파일명 유지 → 본문 링크 그대로 최신본**) — ⚠️ **`/data` 없이 `child/attachment`에 POST하면 버전이 오르지 않고 조용히 무시된다**(2026-09-15 실측: 4장 전부 구버전 유지). 기존 첨부 id를 먼저 조회한다 · History는 같은 날 1행 병합 · **이미지는 위키 첨부가 정본**(로컬 `assets/`는 재생성물·git 미추적). ⚠️ **storage 정규식은 중첩표·리스트를 고려한다** — `<tr>(.*?)</tr>` 비탐욕이 XLT 셀 중첩표에서 끊겨 **16프레임 XLT 컬럼이 공란**으로 보였고 `<ol><li>` 번호 소실로 "번호 누락" 오탐(**에이전트 3건이 동일 오판** — 에이전트 결과는 실측으로 걷어낸다). ⚠️ **문자열 치환은 구간 한정 + assert** — 전역 치환은 History 과거 이력을 훼손한다

## §6. 프레임·어노테이션

- **프레임·어노테이션**: 이미지 ⓝ = Description 통합 번호 = XLT No 1:1 · **정책=빨강 / xlt=파랑** · 매칭 텍스트 좌측 10pt · 겹침 0 검증 · **렌더 후 육안 확인**(`overlaps=없음`은 TEXT 노드만 회피한 결과다) · 코멘트 없는 프레임은 좌표로 직접 핀 렌더. 프레임은 링크 없이 **페이지/섹션 주소 + 이름**으로도 특정 가능(직속 자식 재조회 후 필터) — **동명 프레임 주의**(`(OA)Reward Confirm` 2개 등), 후보가 둘 이상이면 사용자에게 확인. 도구 함정 4종 → `md/wiki.md` Step 3

## §7. Landpress

- **Landpress**: `landpress/`는 XLT로 관리 못 하는 문구의 제3 경로 — ⚠️ **번역 게이트 그대로 적용** · **정본은 로컬 JSON이 아니라 실등록값**. ⛔ **JSON을 바꾸면 beta·prod를 같은 작업 안에서 함께**(beta 먼저 → 검증 → prod는 beta 등록값을 읽어 PUT · 매핑은 **`uid` 기준**). API 경계 — 새 항목 생성 O / **기존 항목에 로케일 추가 X**(고아 항목이 생긴다) · 로케일 파라미터는 공개·CMS 둘 다 **`?locale=`**(`?_locale=`은 **조용히 무시**). 상세 → **`md/landpress.md` §9-2 · §10-3 · §10-5-1**

## §8. 키·표기 규칙

- **키·표기 규칙**: **담당 FE 팀** LV(`mini_`·`{0}`) / UIT(`UF_`·`{{0}}`) / **OA는 팀이 아님**(키 미부여·`{{이름}}`) — 위키에 UIT/LV 구분이 없으면 사용자에게 질문 · **Screen ID**는 `md/IA.md` 어휘로 `주기능_부기능_세부기능_01`(소문자) · **OA 변수**는 용어집 `oa_variables`가 정본(`md/OA.md` §2-1, `altText`에 변수 불가)

## §9. XLT 키는 등록 전이 유일한 기회

- **⚠️ XLT 키는 등록 전이 유일한 기회다**(FE 전달 후 변경 불가) — ⓐ **프리픽스도 선례를 실측**해 「선례 N건/0건」을 선택지에 담는다 ⓑ **등록된 키의 값을 고치기 전 다른 사용처를 전부 확인**한다(요구가 갈리면 키를 분리 — 한쪽만 반영하면 다른 화면이 조용히 깨진다). ⭐ 구값 복원은 **`reports/gate/*.md`가 사실상 유일한 자산**. 실측·절차 → **`md/translate.md` §2-1-a·b**

## §10. Jira 별도 PAT

- **Jira는 별도 PAT가 필요하다**(Confluence PAT로는 401) — REST `GET /rest/api/2/issue/{KEY}`. ⚠️ **description만 보면 안 된다**(Figma 링크가 코멘트·첨부에 있는 사례) · 절차 정본은 `md/wiki.md` 티켓 확장 규칙

## §11. 용어집 「실사용 0건」 판정

- **용어집 「실사용 0건」 판정은 의미까지 본다** — 문자열이 있어도 **다른 뜻이면 선례가 아니다**(ja `すべて見る`를 0건으로 3세션 기록했으나 실측 6건, 단 뜻이 달랐다). 판정 기준 → **`md/check.md` 함정 2-1 · `md/landpress.md` §4**

## §12. 고유명사 로마자 표기

- **⛔ 고유명사 로마자 표기는 추측하지 않는다** — 브랜드·제품·기관·법령명은 **번역이 아니라 조사** 대상이다(기존 등록값 → 공식 사이트 → 공식 SNS·도메인 → 판매처 순, **대소문자·띄어쓰기 원문 그대로**). 계기: 추정한 `FEELIMEELY`·`Hetras`가 **둘 다 틀려**(`FILLIMILLI`·`hetras`) 5개 언어 재등록. 절차 → **CLAUDE.md 게이트 1-1 · `md/check.md` 함정 2-2**

## §13. 캐시 금지 실측

- **캐시 금지 실측**: 세션 #17 감사 도중 `UF_floating_jpyc_banner_title`이 **실제로 삭제**돼 1시간 만에 키 수가 2,131→2,130으로 바뀌었다. 원본 재조회는 형식이 아니다

## §14. 신규 XLT 키 중복 검사

- **⛔ 신규 XLT 키 중복 검사는 레지스트리만으로 부족하다**(2026-09-21 실측) — 같은 날 다른 세션이 **위키·게이트 리포트에만 올리고 아직 등록 안 한 키**는 레지스트리에 없어 「중복 없음」으로 통과한다. 같은 4문구가 `mini_`(등록됨)·`UF_`(미등록) 두 벌로 갈렸다(`handoff/projects/cu-qr-voucher.md` P0). 신규 키 확정 전 **`scripts/check_pending_keys.py --wiki`**(게이트 리포트 + 위키 CQL 전문 검색)를 돌린다 — ⚠️ 상대 세션 리포트에 ko 원문이 없으면 리포트 스캔은 0건이고 **위키 검색만 잡는다**(실측)

## §15. 산출물 커밋 책임

- **⛔ 산출물은 만든 세션이 그 세션 안에서 커밋한다** — 게이트 리포트 9건·`landpress/` 100파일이 **9일간 로컬에만** 있었다(그 PC 밖에선 없는 것). **세션 종료 시 `git status`의 `??` 확인** · 내 것이면 커밋, 남의 것이면 **보고만**(임의 커밋·삭제 금지). ~~`reports/gate/`·`landpress/`는 `.gitignore` 대상이 아니다~~ → ⚠️ **2026-09-18 결정으로 뒤집혔다**: `reports/gate/`·`landpress/`·`oa/`·`xlt/`·`assets/`는 **전부 gitignore 대상**이고(실측 2026-09-22 `git check-ignore` 전건 무시됨), **사본은 Auto-react(private) `reports/{gate,landpress,oa}`에 둔다**. 따라서 「내 산출물을 커밋한다」는 **Auto-react 쪽으로 복사·커밋한다**는 뜻이다

## §16. 살아 있는 교훈 (HANDOFF.md 「아카이브 요약」에서 이관 · 2026-09-22)

- **살아 있는 교훈**: PUT 직전 라이브 rebase 필수 · **미추적 파일을 같은 경로에 Write해 직전 세션 기록을 잃은 적 있다**(세션 시작 `git status`의 `??` 확인) · **다른 세션의 uncommitted 변경은 커밋하지 않는다**(WIP 보존 규칙을 그대로 적용하면 그 세션 작업을 가로챈다) · **세션은 병렬로 돈다**(`git fetch`만 하고 pull을 미루면 구버전 도구로 산출물을 만든다)

## §17. 도구 함정 (macOS·MCP·스크립트 — `handoff/people/hogeun.md`에서 이관 · 2026-09-22)

> PC 한정이 아니라 **도구 일반의 함정**이라 사람 파일(매 세션 주입)에서 이리로 옮겼다.

- `collect_node_boxes(frame_doc)`는 **`(boxes, frame_bbox)` 튜플을 반환**한다 — `boxes, origin = collect_node_boxes(doc)`로 **언패킹해서** `fetch_threads(node_boxes=boxes, frame_origin=origin)`에 넘긴다. 그대로 넘기면 `AttributeError: 'tuple' object has no attribute 'get'`(2026-08-24 실측).
- `fetch_xlt_registry.py --out`이 만드는 JSON은 `{"metadata":…, "entries": {키: {5개 언어}}}`이고 **`entries`는 dict**다(리스트로 가정하면 `'str' object has no attribute 'get'`). 서브에이전트에 레지스트리를 넘길 때 이 구조를 프롬프트에 명시한다.
- **XLT 읽기 API는 사내망/VPN 전제다**(무인증이나 IP 화이트리스트 추정). 실패 유형별 처리·프록시 로그인 페이지(200 + HTML) 대응은 **`md/xlt-verify.md` §2-4가 정본**. 미연결 시 사용자 export로 폴백하며 레지스트리는 **옵셔널**이라 게이트가 통째로 실패하지는 않는다.
- `.claude/launch.json`은 **git 제외**라 PC마다 직접 만들어야 하고, 이 PC에선 **npx 경로가 `/usr/local/bin/npx`**다(등록된 `~/.nvm/...` 경로는 없다). **가이드 로컬 미리보기 기동법·파이썬 `http.server` 샌드박스 함정은 `md/ia-check.md` §2-0-1이 정본**이다.
- **Jira MCP `jira_add_comment`는 본문을 망가뜨린다**(2026-09-17 실측 · UNIFY-11360) — 마크다운→Jira 변환이 `_`를 `\*`/`\_`로 깨고(`UF_voucher_detail_guide`→`UF\*voucher\*detail\_guide`), `<span>`을 `[span]`으로 바꾸며 **여는 태그를 통째로 삭제**하기도 한다. XLT 키·태그·코드가 든 코멘트는 **Jira wiki markup**(`{{...}}`·`{noformat}`)으로 쓰고 **REST로 직접** 보낸다 — `POST/PUT /rest/api/2/issue/{key}/comment[/{id}]` · `Authorization: Bearer {Jira PAT}`. 이미 게시한 코멘트도 같은 경로로 **수정 가능**(PUT, 중복 코멘트 안 남음).
- **`timeout` 명령이 없다**(macOS 기본 · 2026-09-15 실측) — `timeout 90 python3 ...`은 `command not found`로 죽는다. 필요하면 `gtimeout`(coreutils)을 쓰거나 그냥 실행한다.
- **Slack `get_thread_replies`는 긴 스레드에서 토큰 상한을 넘겨 파일로 떨어진다**(2026-09-15 실측 · 113메시지 152KB). 반환된 경로를 `python3`/`jq`로 **필요한 `ts`만 뽑아 읽는다** — 전문을 컨텍스트에 올리지 않는다.

