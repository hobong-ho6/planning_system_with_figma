# Confluence 위키 업데이트 절차

## 개요
Figma에서 추출한 화면 정보와 다국어 번역 데이터를 Confluence 위키 페이지에 정해진 형식으로 업데이트하는 절차.

---

## ⛔ 시작 전 필수 확인 (없으면 진행 불가)

> 🚨 **착수 전 최우선 — 토큰 먼저 요청.** 사용자 요청을 받으면 **맨 처음 행동**으로 Figma + Confluence(위키) 토큰을 요청하고, **두 토큰을 모두 받아 유효성을 검증한 뒤에만** 작업을 시작한다. 토큰을 받기 전에는 **토큰 없이 가능한 작업(위키 페이지 조회, Figma 구조·메타데이터 파싱, 범위·분량 파악 등)도 절대 진행하지 않는다** (CLAUDE.md '⛔ 토큰 우선 규칙' 참조).

| 항목 | 확인 방법 | 없을 경우 |
|------|-----------|-----------|
| Figma Personal Access Token | **사용자에게 요청** (env 추정·재사용 금지 — 작업마다 명시 요청) | **작업 중단 — 토큰 없이는 이미지 URL·코멘트 발급 불가** |
| Confluence Personal Access Token | **사용자에게 요청** (Confluence → 프로필 → 개인 액세스 토큰) | **작업 중단 — 먼저 요청·수신 후 착수** (부재가 확정된 경우에만 Step 4-B GitHub 스테이징으로 대체) |
| Confluence 위키 페이지 URL | 사용자 제공 | 작업 중단 |
| Figma 파일 URL | 사용자 제공 | 작업 중단 |

> ⚠️ 토큰이 없는 상태에서 "일단 구조만 올리기" 또는 "토큰 없이 가능한 부분만 먼저" 금지 — 이미지와 코멘트가 누락된 불완전한 문서가 생성되고, 토큰 우선 규칙에도 위배된다.

## 사전 조건
- Confluence 위키 페이지 URL 또는 Page ID
- Figma Personal Access Token (`figd_xxx...`)
- MCP Confluence 도구 접근 가능

---

## 사용자로부터 받아야 할 정보

| 항목 | 필수 | 설명 | 예시 |
|------|:---:|------|------|
| 위키 페이지 URL | ✅ | 업데이트 대상 Confluence 페이지 | `https://wiki.workers-hub.com/display/UNIFI/Guide+Kim` |
| Figma URL | ✅ | **페이지** URL → 전체 화면 / **프레임** URL → 그 프레임만 (모드 분기) | `.../Web3?node-id=55762-1104` |
| 참조 페이지 URL | - | 형식을 참조할 기존 페이지 | `[Screen]Unifi MINI - LV` |
| 페이지 제목 유지 여부 | - | 기존 제목 유지 or 변경 | 기존 유지 |
| Figma 토큰 | ✅ | 이미지·코멘트 발급용 — **작업마다 사용자에게 요청 (재사용 금지)** | `figd_xxx...` |

---

## 업데이트 모드 (입력 Figma URL에 따라 분기)

위키 업데이트는 입력한 Figma URL이 가리키는 대상에 따라 두 모드로 동작한다. **토큰 수집(Step 0) 이후 모드를 판별**한다.

| 모드 | 트리거(입력) | 동작 | 표 처리 |
|------|------|------|------|
| **A. 전체 페이지** | Figma **페이지** URL (또는 "페이지 전체" 요청) | 페이지의 모든 화면 수집 (`Case`·`(x)` 제외) | Screen 표 전체 생성/재작성 |
| **B. 단일 프레임 행 추가** | Figma **프레임** URL + "이 프레임만/해당 프레임" 요청 | 지정한 **그 프레임 하나만** 처리 | 기존 Screen 표에 **그 프레임 행 1개만** 추가(없으면)·갱신(있으면), 나머지 내용 보존 |

**모드 판별 (토큰 확보 후):** 입력 URL의 `node-id` 타입을 `GET /v1/files/{fileKey}/nodes?ids={id}`로 확인 — `CANVAS`(페이지)면 **Mode A**, `FRAME`/`COMPONENT`/`INSTANCE` 등 화면 프레임이면 **Mode B**. 모호하면 "이 프레임만 추가할까요, 페이지 전체를 갱신할까요?"라고 사용자에게 확인한다.

Mode B의 상세 절차는 아래 **"단일 프레임 행 추가/갱신 (Mode B 상세)"** 참조. Step 1~6은 기본적으로 Mode A(전체) 기준이다.

---

## 담당 FE 팀 판별 (UIT / LV — 화면 정책·XLT 반영 전 결정)

라인넥스트 FE는 **UIT**·**LV** 2팀이고 팀마다 XLT Key 프리픽스·변수 치환자 규칙이 다르다(상세는 CLAUDE.md '⛔ 담당 FE 팀 규칙'). **피그마 화면을 위키에 업데이트할 때** 아래로 팀을 확정한 뒤 그 팀 규칙으로 XLT를 반영한다.

1. **대상 위키에 UIT/LV 구분이 있으면** — Screen 섹션에 `<h4>UIT</h4>`/`<h4>LV</h4>` 하위 표가 있거나 명시적 팀 표기가 있으면 — 처리 화면/키가 **속한 영역의 팀 규칙을 그대로 적용**한다(묻지 않음). 예: `LIFF/Web - JP → UIT` 하위 화면은 UIT 규칙(`UF_`·`{{0}}`), `Unifi mini → LV` 하위는 LV 규칙(`{0}`).
2. **구분이 없으면** — 사용자에게 **담당 팀이 UIT인지 LV인지 묻고**, 선택 시 **그 팀 규칙(프리픽스·치환자)을 설명**한 뒤 **적용 여부를 확인**받아 진행한다.

| 팀 | XLT Key 프리픽스 | 변수 치환자 |
|----|----------------|-----------|
| UIT | `UF_` 고정 | `{{0}}` (이중) |
| LV | 프로젝트 약어(`mini_guidekim_` 등) | `{0}` (단일) |

---

## 절차

### Step 0: 토큰 수집 (작업 시작 전 최우선 — Figma + Confluence 둘 다)

**모든 작업보다 먼저 수행한다. 두 토큰을 모두 확보·검증하기 전까지 Step 1은 물론, 위키 페이지 조회·Figma 구조 파싱·범위 파악 등 어떤 사전 작업도 진행하지 않는다.**

1. 사용자에게 **Figma + Confluence 토큰을 함께** 요청한다 (맨 처음 행동):
   > "위키 업데이트를 시작하기 전에 토큰 두 개가 필요합니다.
   > ① Figma Personal Access Token — Figma → 프로필 → Settings → Security → Personal access tokens
   > ② Confluence Personal Access Token — Confluence → 프로필 → 개인 액세스 토큰
   > 두 토큰을 공유해 주시면 작업을 시작하겠습니다."
2. 토큰을 받으면 각각 유효성 검증:
   ```bash
   # Figma
   curl -s -H "X-Figma-Token: {FIGMA_TOKEN}" "https://api.figma.com/v1/me" | python3 -c "import json,sys; d=json.load(sys.stdin); print('✅ Figma 유효:', d.get('email')) if d.get('email') else print('❌ 무효:', d)"
   # Confluence (BASE_URL = 위키 URL의 호스트, 예: https://wiki.workers-hub.com)
   curl -s -H "Authorization: Bearer {CONFLUENCE_PAT}" "{BASE_URL}/rest/api/user/current" | python3 -c "import json,sys; d=json.load(sys.stdin); print('✅ Confluence 유효:', d.get('username') or d.get('displayName')) if d else print('❌ 무효')"
   ```
3. 두 토큰이 모두 유효하면 Step 1 진행. 하나라도 무효하면 재발급 요청.

> ❌ 토큰을 받기 전 "토큰 없이 가능한 작업부터" 진행 금지 — 범위 파악·페이지 조회·구조 파싱 포함 일체 금지 (CLAUDE.md '⛔ 토큰 우선 규칙').

### Step 1: 대상 페이지 확인
1. URL에서 Page ID 추출 (예: `pageId=4288438279`)
2. `confluence_get_page`로 현재 페이지 상태 조회
3. 페이지 제목, space key, 현재 version 확인
4. 참조 페이지가 있으면 해당 페이지 형식 조회

### Step 2: 형식 결정
참조 페이지 형식에 맞춰 구조 결정. 기본 형식:

```
# History (변경 이력)
# Related Docs (관련 문서 링크)
---
# Screen (화면별 정보)
  - Screen ID | Screen(이미지) | Description | XLT(번역표)
---
# 다국어 번역 (XLT Full Translation)
  - 전체 번역표 (XLT Key | KR | JA | EN | TH | ZH-TW)
```

### Step 3: 콘텐츠 작성

#### History 표 (변경 이력 — 추가/갱신한 프레임 기록)

> ⚠️ **위키를 업데이트할 때마다 적용.** 위키 페이지에 **History(변경 이력) 표가 있으면**, 이번 업데이트로 **추가/갱신한 프레임을 행으로 남긴다** — 어떤 화면이 언제 들어왔는지 추적 가능해야 한다. 표가 없으면(신규 페이지) 캐노니컬 골격(Step 5)으로 새로 만든 뒤 첫 행을 채운다.

- 컬럼: `날짜 | 버전 | 변경 내용 | PIC` (PIC = 담당자/작성자 컬럼)
- **변경 내용에는 추가/갱신한 프레임 이름을 반드시 명시**한다
  - 예(추가): `(New) 자산 전송 팝업 행 추가`
  - 예(다건): `(New) 자산 전송 팝업, (New) 송금 완료 — 2개 화면 추가`
  - 예(갱신): `(New) 자산 전송 팝업 행 갱신 (코멘트·번역 반영)`
- 날짜는 업데이트 당일(`YYYY-MM-DD`), 버전은 직전 버전에서 증가
- **PIC 규칙 (필수)**: Claude가 수행한 위키 업데이트 행의 **PIC(담당자/작성자) 컬럼은 반드시 `Claude 자동 생성`으로 기록**한다 — Claude가 한 업데이트와 사용자가 직접 한 업데이트를 구분하기 위함이다. 기존 표의 담당자 컬럼명이 다르면(`작성자` 등) 그 컬럼에 동일하게 적용한다. **사용자 본인이 작성한 기존 행의 PIC는 덮어쓰지 않는다.**
- **기존 History 행은 보존**하고 새 행만 추가한다 — Mode A로 전체 표를 재작성할 때도 이력 행은 누적한다 (삭제 금지)
- **같은 날짜 병합(필수)**: History 행을 추가할 때 **같은 날짜(Date)의 행이 이미 있으면 새 행을 만들지 않고, 그 행의 변경 내용 `<ul>`에 새 `<li>` 항목만 추가**한다(날짜가 다르면 새 행). 어떤 항목도 삭제하지 않고 목록에 누적만 하므로 위 '삭제 금지' 원칙과 충돌하지 않는다 — 표가 계속 길어지는 것을 막기 위한 행 단위 병합이다.

#### Screen 표 (화면 선정 — `Case`·`(x)` 프레임 제외)
- **이름이 `Case` 또는 `(x)`로 시작하는 프레임은 Screen 표에 포함하지 않는다** — `Case`는 프로토타입 분기 테스트용 화면, `(x)`는 작업 중단·삭제 예정 화면이므로 화면 정의서 대상이 아니다 (예: `Case 선택 - 니모닉, SNS`, `Case1. SNS 계정 1개 보유`, `(x) 구버전 입금 화면`)
- 판별 기준은 **프레임 이름의 시작 문자열**이다. `(New) Case2. ...`처럼 `(New)`로 시작하는 프레임은 **포함 대상**이다
- `Case` 제외는 **3단계 위키 Screen 표에만** 적용되고, `(x)` 제외는 **1단계 번역과 3단계 위키에 공통** 적용된다 — 2단계 프로토타입은 전체 화면을 수집한다(`(x)` 포함). 혼동하지 않는다 (CLAUDE.md '단계별 프레임 필터 규칙' 참조)
- 제외한 프레임 목록(이름·node-id)을 사용자에게 보고한다
- **화면(행) 정렬 순서 — Figma 캔버스 읽기 순서(왼쪽→오른쪽, 위→아래)**: Screen 표의 행은 프레임의 캔버스 좌표(`absoluteBoundingBox`의 x·y)를 기준으로 정렬한다. **같은 행**(세로 범위 `y ~ y+height`가 서로 겹치는 프레임들)은 **왼쪽→오른쪽**(x 오름차순), **행과 행 사이**는 **위→아래**(행의 상단 y 오름차순)로 배치한다. node-id를 조회한 순서나 임의 순서로 넣지 않는다.
  - 즉 정렬 키 = (행 그룹의 상단 y, 행 내부 x). 윗행을 왼쪽부터 끝까지 나열한 뒤 다음 행으로 내려간다.
  - 이 정렬은 **화면(표의 행) 순서에만** 적용된다. 화면 내부 코멘트 정책 번호(`1.`, `2.`, …)는 화면 내부 y좌표 기준이며 이 행 정렬과 별개다.

#### Screen 표 (Screen ID 컬럼)
- **Screen ID에는 Figma의 프레임 이름을 그대로 사용**한다 (예: `(New) 자산 전송 팝업`)
- ❌ `SC-01` 같은 임의 번호를 만들지 않는다 — Figma·프로토타입과 위키 간 화면 식별이 어긋난다
- ❌ node-id를 Screen ID 셀에 포함하지 않는다 (예: `(51762:2592)` 같은 괄호 병기 금지) — 프레임 이름만 표시한다

#### Screen 표 (Description 컬럼 — Figma 코멘트 필수 반영)

> ⚠️ **코멘트 수집은 선택이 아니라 필수다.** 코멘트를 빠뜨린 채 위키를 올리면 화면 정책이 누락된다. 토큰이 없으면 Step 1 이전에 중단한다.

- 화면 설명 1~2문장과 함께 **해당 화면의 Figma 코멘트를 Description에 포함**한다 — 코멘트는 화면 정책이다
- **번호 규칙**: 화면 내 위치 **y좌표가 가장 위에 있는 코멘트부터** `1.`, `2.`, … 순차 번호를 붙인다
  - 예: 가장 상단 코멘트가 "일주일간 보지 않기"라면 → `1. 일주일간 보지 않기`
- **답글(스레드) 반영 필수**: 한 핀(코멘트)에 답글이 여러 개 달린 스레드는 **루트 코멘트 번호 아래 줄에 답글 본문만** `created_at` 시간순으로 이어 표시한다(작성자·날짜 없이 본문만, 들여쓰기 마커 `↳` 사용). 번호(`1.`, `2.`, …)는 **루트 코멘트에만** 부여하고 답글에는 부여하지 않는다 — 핀은 루트에만 존재하기 때문이다
- **미해결(resolved_at이 null) 코멘트만 포함**한다 — 해결된 코멘트는 이미 반영된 정책이다 (루트가 해결됨이면 그 스레드의 답글도 함께 제외)
- **`XLT` 마커 코멘트도 동일 대상**: 본문이 `XLT`인 마커 코멘트도 정책 코멘트와 **함께 y좌표 순으로 번호를 부여**하고 Description에 포함한다(Description 번호·이미지 어노테이션 모두 같은 번호 체계). **코멘트 선별 모드로 XLT만 번역한 경우에도**(`md/translate.md` 코멘트 선별 모드) 위키 업데이트 시 XLT 컬럼·다국어 섹션만 채우지 말고 **Description을 이 규칙대로 함께 갱신**한다.
- 코멘트가 없는 화면은 화면 설명만 기재한다

**코멘트 조회 방법 (원본 최신성 — CLAUDE.md '캐시 금지 규칙' 준수):**

> ⛔ **공용 페처 `scripts/fetch_comments.py`를 사용한다 — 코멘트 수집기를 인라인으로 재구현하지 않는다.** 답글(스레드)은 핀 좌표가 없어 `client_meta.node_id`가 비어 있으므로 **프레임 노드집합 필터(`nid in ids`)로는 절대 안 잡히고 `parent_id` 매칭으로만** 가져올 수 있다. 루트만 수집하는 인라인 구현은 답글을 통째로 누락시킨다(2026-06-30 실측 회귀: LIFF/Web JP LV 4개 프레임 답글 전건 누락). 권장 진입점 `fetch_threads(file_key, token, node_ids=프레임자손id집합)`는 루트를 `node_offset.y` 순으로 모으고 답글을 `parent_id`로 created_at 순 매칭하며, `log_self_check`로 **루트별 `attached replies: N`을 출력**해 누락을 가시화한다. `format_description(threads)`는 `1.`/`↳` 규칙대로 Description 문자열을 만든다. 아래 1·2는 그 동작의 명세(레퍼런스)다.

1. **`comments_data.json`이 있는 경우** — **같은 작업 실행에서 2단계가 방금 생성한 파일일 때만** 재사용한다 (`screenId`별 그룹핑 후 `offset.y` 오름차순 정렬). 이전 세션의 캐시이거나 Figma 코멘트가 변경됐을 수 있으면 재사용하지 말고 2번으로 새로 조회한다.
2. **그 외(파일 없음·이전 run·원본 변경 가능) — 필수 (건너뛰기 금지)**: Figma REST API로 직접 새로 조회
   ```bash
   curl -s -H "X-Figma-Token: $FIGMA_TOKEN" \
     "https://api.figma.com/v1/files/{fileKey}/comments" \
     | python3 -c "
   import json, sys
   from collections import defaultdict
   d = json.loads(sys.stdin.buffer.read().decode('utf-8'))
   comments = d.get('comments', [])

   # 1차: 루트(좌표 있음 + 미해결) 수집
   roots = {}                    # id -> 루트 정보
   grouped = defaultdict(list)   # node_id -> [루트, ...]
   for c in comments:
       if c.get('parent_id'):    # 답글은 2차에서 처리
           continue
       meta = c.get('client_meta') or {}
       node_id = meta.get('node_id', '')
       y = (meta.get('node_offset') or {}).get('y', 0)
       if node_id and c.get('message') and not c.get('resolved_at'):
           root = {'id': c['id'], 'y': y, 'msg': c['message'].strip(), 'replies': []}
           roots[c['id']] = root
           grouped[node_id].append(root)

   # 2차: 답글을 parent_id로 루트에 매칭 (created_at 오름차순)
   for c in sorted(comments, key=lambda x: x.get('created_at', '')):
       pid = c.get('parent_id')
       if pid and pid in roots and c.get('message'):
           roots[pid]['replies'].append(c['message'].strip())

   # 출력: 루트(y 오름차순) → 그 아래 답글 본문
   for nid, cs in grouped.items():
       for root in sorted(cs, key=lambda x: x['y']):
           print(nid, root['y'], root['msg'])
           for r in root['replies']:
               print(nid, '  ↳', r)
   "
   ```
   - 응답에서 `client_meta.node_id`로 프레임별 코멘트 그룹핑 (루트만)
   - `node_offset.y` 오름차순 정렬
   - `resolved_at`이 있으면(truthy) 제외 — 루트가 제외되면 스레드 통째 제외
   - **답글(`parent_id` 보유, 좌표 없음)은 `parent_id`로 루트에 매칭**해 `created_at` 시간순으로 루트 아래에 본문만 출력

#### Screen 표 (XLT 컬럼 — `No | XLT Key | KR` 3컬럼)
- **`No | XLT Key | KR`** 3컬럼으로 표시한다 (이미지와 함께 빠르게 텍스트 확인 용도).
- **`No` = 그 XLT 텍스트를 가리키는 Description 정책 코멘트 번호**(이미지의 빨강 원 ⓝ 번호)다 — 표의 텍스트가 이미지 어디에 있는지 바로 찾도록 연결한다.
  - **도출**: 화면의 미해결 루트 코멘트를 y좌표 순으로 번호화(= Description 정책 번호)한 뒤, 각 코멘트가 가리키는 텍스트를 매칭(좌표 포함/최근접 — `md/translate.md` '코멘트→텍스트 매칭 알고리즘')하고, **그 텍스트의 XLT 행에 해당 코멘트 번호**를 부여한다.
  - 한 텍스트에 여러 코멘트가 대응하면 **최솟값(가장 위/먼저)** 을 쓴다. 코멘트가 가리키지 않는 텍스트는 `No`를 빈칸으로 둔다.
  - **사용자가 수동 입력한 `No`는 보존**한다(자동 계산값으로 덮어쓰지 않음). 자동값과 다르면 사용자에게 보고한다.
  - **⚠️ 증분 추가(기존 프레임 XLT 표에 키 1건 추가, "추가된것만" 모드) 시 — `No`를 빈칸으로 두지 않는다**: 전수 y순 재번호는 기존 No를 흔들고 전체 재처리가 되므로 하지 않고, 대신 **신규 키의 `No` = (그 프레임 XLT 표의 기존 `No` 최댓값) + 1** 로 **append**한다. 예: 기존 최대 `17` → 신규 `18`. (과거 `mini_guidekim_cat_all`을 No 빈칸으로 둬 사용자 기대(18)와 어긋난 사례 재발 방지.) 이 append No는 표 내 안정적 식별자이며, 이미지 원 ⓝ·Description 정책번호와의 엄밀한 1:1 정합이 필요하면 그때만 전수 재처리(전 코멘트 y순 재도출)한다. **새 프레임 최초 작성**은 위 y순 도출을 그대로 쓴다.
  - 원문(Figma) 텍스트와 XLT 교정값이 다르면(치환자 `{0}`·맞춤법 교정 등) 정규화(공백·치환자·숫자 제거) 매칭 후, 실패·다중매칭 건을 **사용자에게 보고**한다.
  - 전역 「다국어 번역(XLT Full Translation)」 6컬럼 표에는 `No`를 넣지 않는다 — 한 키가 여러 화면에 쓰여 화면별 번호가 1:N이기 때문이다.
- **화면별 키 목록 도출 절차 (필수 — 전체 키를 모든 화면에 붙이지 않는다):** `translation_extract.json`의 해당 화면 `items`를 순회하며 `rows`의 ko_KR 매핑과 `aliases`로 키를 찾고, **등장 순서를 유지한 채 중복 제거**한다. lookup이 없는 텍스트(숫자·주소·심볼 등 번역 제외 항목)는 건너뛴다:

```python
ko2key = {r['ko_KR']: r['xlt_key'] for r in trans['rows']}
keys = []
for item in screen['items']:
    k = ko2key.get(item['t']) or trans['aliases'].get(item['t'])
    if k and k not in keys:
        keys.append(k)
```

#### 다국어 번역 (별도 섹션)
- `XLT Key | KR | JA | EN | TH | ZH-TW` 전체 표시
- 번역 검토/확인 용도
- **검증 게이트 필수**: 번역을 위키에 반영하기 전 `md/translate.md` '번역 품질 게이트'(한국어 교정 → `scripts/validate_translation.py` + check.md 3단계 → **검증 리포트 사용자 제시**)를 통과한다 — 위키 통합 작업에서도 생략 금지 (CLAUDE.md '⛔ 번역 품질 게이트').
- **XLT 엑셀 첨부 (필수)**: 번역을 위키에 반영할 때 `md/translate.md` Step 7로 XLT 업로드용 엑셀(`xlt_output_YYYYMMDDHHmmss.xlsx`)을 **생성해 같은 Confluence 페이지에 첨부**하고, 다국어 번역 섹션 머리에 **다운로드 링크**를 넣는다 — 위키 문서와 업로드 엑셀이 한곳에서 함께 관리되도록 한다.
  - 첨부 업로드: 이미지와 동일하게 `POST {BASE}/rest/api/content/{pageId}/child/attachment` (`-F "file=@....xlsx;type=application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"`)
  - 본문 링크(storage): `<ac:link><ri:attachment ri:filename="xlt_output_....xlsx" /><ac:plain-text-link-body><![CDATA[XLT 업로드 엑셀 다운로드]]></ac:plain-text-link-body></ac:link>`
  - 번역이 갱신될 때마다 **최신 엑셀로 재첨부**하고 본문 링크의 파일명을 갱신한다 (이전 첨부는 정리 권장).

### Step 4: 이미지 처리 — 모든 화면: 로컬 다운로드 → Confluence 직접 첨부

**기본 원칙: 모든 화면 이미지는 ① Figma에서 로컬로 다운로드 → ② 코멘트 있으면 번호 어노테이션 → ③ 로컬 파일을 Confluence에 직접 첨부(`ri:attachment`)한다.** 위키 토큰(Confluence PAT)이 있으므로 첨부 업로드가 가능하며, **Figma S3 URL을 위키 본문에 직접 넣지 않는다** — S3 URL은 로컬 다운로드 출처로만 쓰고, 본문은 항상 첨부 참조를 사용한다 (S3 URL은 수 시간~수일 내 만료되어 깨진다).

코멘트 유무는 **어노테이션(4-B) 단계만** 가른다 — 다운로드(4-A)·첨부(4-C)·본문 참조는 모든 화면이 동일하다.

---

#### 4-A. 이미지 S3 URL 발급 → 로컬 다운로드 (모든 화면 공통)

**① Figma REST로 S3 URL 일괄 발급**

```bash
# node ID는 URL 인코딩 필수 (: → %3A)
IDS="nodeId1%3A0,nodeId2%3A0,..."
curl -s -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/images/{fileKey}?ids=${IDS}&scale=2&format=png" \
  | python3 -c "import json,sys; [print(k,'→',v) for k,v in json.load(sys.stdin).get('images',{}).items()]"
```

- 응답 `images` 객체에서 노드별 S3 URL 추출 (`https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/...`)
- 일시적 오류 시 재시도, 반복 실패 시 `ids`를 절반씩 나눠 분할 발급

**② S3 URL에서 로컬로 다운로드**

```python
import urllib.request
req = urllib.request.Request(s3_url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req) as r, open(out_path, "wb") as f:
    f.write(r.read())
```

- 저장 경로: `assets/screens/{프레임명_공백→언더스코어}.png`
- 파일명은 위키 첨부 파일명 = 본문 `ri:attachment ri:filename`과 **정확히 일치**시킨다
- 코멘트 **없는** 화면: 이 원본을 그대로 4-C(첨부)로 보낸다
- 코멘트 **있는** 화면: 4-B(번호 어노테이션)를 거친 뒤 4-C로 보낸다

---

#### 4-B. 코멘트 있는 화면 — 번호 어노테이션 (로컬 이미지에 적용)

코멘트 없는 화면은 이 단계를 건너뛴다. 코멘트 있는 화면만 4-A에서 다운로드한 **로컬 이미지**에 번호 원을 오버레이한 뒤, 같은 로컬 파일을 4-C로 보내 첨부한다.

**처리 순서:**

**① 코멘트 x·y 좌표 수집** (Step 3 코멘트 조회 결과 재사용)

```python
# comments 구조: [(x, y, "정책 내용"), ...]  — y 오름차순 정렬된 상태
```

**② Python Pillow로 번호 원 오버레이 (입력: 4-A에서 받은 로컬 파일)**

```python
# pip install Pillow (scripts/requirements.txt에 포함)
from PIL import Image, ImageDraw, ImageFont

SCALE = 2        # Figma export scale
CIRCLE_R = 18    # 반지름(픽셀, scale=2 기준)
RED   = (220, 53, 69, 255)
WHITE = (255, 255, 255, 255)

def annotate(in_path, comments, out_path):
    img = Image.open(in_path)

    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc",
                                  size=int(CIRCLE_R * 1.3))
    except:
        font = ImageFont.load_default()

    for i, (x, y, _) in enumerate(comments, 1):
        px, py = int(x * SCALE), int(y * SCALE)
        draw.ellipse([px-CIRCLE_R, py-CIRCLE_R, px+CIRCLE_R, py+CIRCLE_R],
                     fill=RED, outline=WHITE, width=2)
        label = str(i)
        bbox = draw.textbbox((0, 0), label, font=font)
        tw, th = bbox[2]-bbox[0], bbox[3]-bbox[1]
        draw.text((px - tw//2, py - th//2 - 1), label, fill=WHITE, font=font)

    Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB").save(out_path)
```

- `comments`는 y좌표 오름차순 정렬 후 전달 — 이미지 번호 = Description 정책 번호
- 출력 파일명: `{프레임명_공백→언더스코어}.png` (원본을 덮어쓰지 말고 별도 파일로 저장 권장)
- 이미지가 너무 크면(413 에러) 50% 리사이즈 후 재시도: `img.resize((w//2, h//2), Image.LANCZOS)`

---

#### 4-C. 로컬 이미지를 Confluence에 직접 첨부 (모든 화면 공통 — 위키 토큰 필요)

**① 첨부 업로드** — 4-A(원본) 또는 4-B(어노테이션)에서 만든 로컬 PNG를 그대로 올린다

```bash
# CONFLUENCE_PAT(위키 토큰): Confluence 프로필 → 개인 액세스 토큰
curl -H "Authorization: Bearer {CONFLUENCE_PAT}" \
  -X POST \
  "{BASE_URL}/rest/api/content/{pageId}/child/attachment" \
  -H "X-Atlassian-Token: no-check" \
  -F "file=@{image}.png;type=image/png"
```

- 성공 시 HTTP 200. 같은 파일명이 이미 있으면 동일 엔드포인트가 **새 버전으로 갱신**된다
- 413 에러 시 이미지를 50% 리사이즈 후 재시도
- **이 단계는 위키 토큰(Confluence PAT)이 있어야 가능하다** — 토큰 우선 규칙상 토큰은 사전 확보가 원칙이며, 토큰이 정말 없을 때만 아래 fallback으로 우회한다

**② 위키 본문에 첨부 참조 삽입** (모든 화면 동일, 너비 300px 고정)

```xml
<ac:image ac:width="300">
  <ri:attachment ri:filename="{frame_name}.png"/>
</ac:image>
```

- `<ri:attachment>`는 **같은 페이지에 첨부된 파일**을 참조 — 외부 URL·만료 없음, Confluence 서버에 영구 저장
- `ri:filename`은 4-A/4-B에서 업로드한 로컬 파일명과 **정확히 일치**해야 한다

---

**fallback. 위키 토큰(Confluence PAT)이 정말 없는 경우에만 — GitHub 임시 스테이징**

```bash
# 레포 클론 (또는 기존 클론 재사용)
git clone https://github.com/{owner}/{repo}.git /tmp/repo_clone
cp {annotated}.png /tmp/repo_clone/wiki/images/
git -C /tmp/repo_clone add wiki/images/
git -C /tmp/repo_clone commit -m "wiki/images: {화면명} 번호 어노테이션 이미지 추가 (임시)"
git -C /tmp/repo_clone push origin main
```

> ℹ️ `assets/` 폴더는 `.gitignore` 대상이므로 반드시 `wiki/images/` 폴더를 사용한다.

GitHub raw URL 위키 삽입:

```xml
<ac:image ac:width="300">
  <ri:url ri:value="https://raw.githubusercontent.com/{owner}/{repo}/main/wiki/images/{frame_name}.png"/>
</ac:image>
```

위키 업데이트 완료 후 GitHub 이미지 삭제:

```bash
git -C /tmp/repo_clone rm wiki/images/{frame_name}.png
git -C /tmp/repo_clone commit -m "wiki/images: 위키 업로드 완료 — 임시 이미지 정리"
git -C /tmp/repo_clone push origin main
```

> ⚠️ GitHub 방식은 Confluence의 외부 이미지 캐싱에 의존한다. 캐시가 갱신되면 이미지가 깨질 수 있으므로, Confluence PAT 취득 후 첨부파일 방식으로 전환하는 것을 권장한다.

---

**⚠️ 동작하지 않는 방법 (절대 사용 금지):**

| 방법 | 이유 |
|------|------|
| Figma MCP URL (`figma.com/api/mcp/asset/...`) | MCP 세션 종료 시 무효화, Confluence 서버에서 인증 없이 불러올 수 없어 이미지 깨짐 |
| markdown 포맷으로 업데이트 | `ac:image` 너비 지정·중첩표 미지원, 반드시 storage 포맷 사용 |

### Step 5: 위키 업데이트
1. **storage 포맷** 사용 (nested table 지원을 위해)
2. `confluence_update_page` 호출:
   - `page_id`: 대상 페이지 ID
   - `title`: 페이지 제목
   - `content_format`: `storage`
   - `content`: XHTML 콘텐츠
   - `version_comment`: 변경 내용 요약
3. 업데이트 후 반환된 version 확인

#### storage XHTML 캐노니컬 골격 (이 구조를 그대로 채운다 — 임의 변형 금지)

```xml
<h1>History</h1>
<table><tbody>
<tr><th>날짜</th><th>버전</th><th>변경 내용</th><th>PIC</th></tr>
<tr><td>YYYY-MM-DD</td><td>v1.0</td><td>최초 작성 — ...</td><td>Claude 자동 생성</td></tr>
</tbody></table>
<h1>Related Docs</h1>
<ul>
<li>Figma 디자인: <a href="https://www.figma.com/design/...">...</a></li>
<li>Figma 프로토타입: <a href="https://www.figma.com/proto/...?node-id=...&amp;page-id=...">...</a></li>
</ul>
<hr/>
<h1>Screen</h1>
<p>Screen ID는 Figma 프레임 이름을 그대로 사용합니다. 이미지의 번호 ⓝ는 아래 정책 번호와 1:1 대응합니다.</p>
<table><tbody>
<tr><th>Screen ID</th><th>Screen</th><th>Description</th><th>XLT</th></tr>

<!-- 코멘트(정책)가 있는 화면: 번호 어노테이션 이미지(Confluence 첨부) + 번호별 정책 -->
<tr>
  <td>(New) 자산 전송 팝업</td>
  <td><ac:image ac:width="300"><ri:attachment ri:filename="{frame_name}.png"/></ac:image></td>
  <td><p>화면 설명 1~2문장.</p><p><strong>정책</strong><br/>1. 상단 정책 내용<br/>&nbsp;&nbsp;↳ 첫 번째 답글 본문<br/>&nbsp;&nbsp;↳ 두 번째 답글 본문<br/>2. 다음 정책 내용</p></td>
  <td><table><tbody><tr><th>No</th><th>XLT Key</th><th>KR</th></tr><tr><td>9</td><td>KW_...</td><td>한국어</td></tr></tbody></table></td>
</tr>

<!-- 코멘트(정책)가 있는 화면 (Confluence PAT 없을 때 fallback): GitHub 임시 URL -->
<!-- <tr>
  <td>(New) 자산 전송 팝업</td>
  <td><ac:image ac:width="300"><ri:url ri:value="https://raw.githubusercontent.com/{owner}/{repo}/main/wiki/images/{frame_name}.png"/></ac:image></td>
  ...
</tr> -->

<!-- 코멘트 없는 화면: Confluence 첨부 (로컬 다운로드 원본을 첨부) -->
<tr>
  <td>화면 이름</td>
  <td><ac:image ac:width="300"><ri:attachment ri:filename="{frame_name}.png"/></ac:image></td>
  <td><p>화면 설명 1~2문장.</p></td>
  <td>-</td>
</tr>

</tbody></table>
<hr/>
<h1>다국어 번역 (XLT Full Translation)</h1>
<table><tbody>
<tr><th>XLT Key</th><th>KR</th><th>JA</th><th>EN</th><th>TH</th><th>ZH-TW</th></tr>
<tr><td>KW_...</td><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr>
</tbody></table>
```

**작성 규칙:**
- 셀 안 줄바꿈은 `<br/>` (마크다운 `\n` 사용 금지)
- `<a href>` URL의 `&`는 반드시 `&amp;`로 이스케이프 (XML 파싱 오류 방지)
- 코멘트 없는 화면의 Description은 설명 `<p>` 하나만, XLT 없는 화면의 XLT 셀은 `-`
- Screen 안내 문구에 "이미지의 번호 ⓝ는 아래 정책 번호와 1:1 대응합니다." 문구 포함
- 섹션 순서(History → Related Docs → Screen → 다국어 번역)는 항상 유지한다
- History 표에는 이번에 추가/갱신한 프레임 이름을 변경 내용에 명시한 행을 남긴다 (Step 3 'History 표' 규칙)

### Step 6: 검증
- [ ] 페이지 URL 접속하여 렌더링 확인
- [ ] 이미지가 300px로 표시되는지 확인
- [ ] Nested table (XLT 컬럼) 정상 렌더링 확인
- [ ] 다국어 번역 섹션 표가 정상 표시되는지 확인

---

## 단일 프레임 행 추가/갱신 (Mode B 상세)

특정 프레임 URL + 위키 주소만 입력된 경우, **기존 페이지를 보존한 채 그 프레임의 행 1개만** Screen 표에 추가(또는 갱신)한다. 전체 표를 다시 만들지 않는다.

**번역 포함 여부:** 사용자가 "해당 프레임만 다국어 번역 후 위키 업데이트"를 요청하면, 먼저 `md/translate.md`의 **단일 프레임 모드**로 그 프레임만 번역(5개 언어 + XLT Key)한 뒤, 그 결과를 이 절차의 **XLT 컬럼**과 **다국어 번역 섹션**에 반영한다. 번역 요청이 없으면 XLT는 `-`로 둔다.

**전제:** Step 0(토큰) 완료. 입력 URL에서 `fileKey`와 프레임 `node-id` 추출. (번역만이면 Figma 토큰으로 충분하지만 위키 업데이트까지 하므로 Figma + Confluence 토큰을 함께 확보한다.)

1. **대상 프레임 확정**
   - `GET /v1/files/{fileKey}/nodes?ids={frameId}`로 프레임 이름·크기·소속 페이지 확인
   - 이름이 `Case`/`(x)`로 시작하면 "이 프레임은 보통 Screen 표 제외 대상입니다. 그래도 추가할까요?"라고 확인 후 진행 — **명시적 단일 지정은 사용자 의사를 우선**한다 (자동 제외 규칙보다 우선)

2. **기존 위키 페이지 원문 확보 (필수: storage 원문)**
   - `confluence_get_page(page_id, convert_to_markdown=false)` — **반드시 raw storage XHTML**로 받는다 (markdown으로 받아 되쓰면 매크로·중첩표 등 다른 내용이 손상된다)
   - 현재 version 기록. Screen 표(`<table>`의 `<tbody>`)가 이미 있으면 그것을 대상으로 하고, 없으면(신규 페이지) 캐노니컬 골격으로 Screen 표를 먼저 만든 뒤 행을 넣는다

3. **그 프레임의 이미지·코멘트 생성** (Step 3 코멘트 규칙 + Step 4 이미지 규칙을 **그 프레임 하나에만** 적용)
   - 코멘트(스레드 답글 포함, y좌표 상단부터 번호) → Description
   - 코멘트 있으면 번호 어노테이션 이미지 생성 후 Confluence 첨부(4-B), 없으면 S3 URL(4-A)

4. **행(`<tr>`) 구성 + 번역 반영 — 기존 표의 컬럼 구조와 동일하게 맞춘다**

   단일 프레임 번역 후 위키 업데이트 시, 아래 **두 표를 모두** 갱신한다.

   **(A) 화면 설명 표(Screen 표) — 그 프레임 행 1개 추가/갱신**
   - 컬럼: `Screen ID`(프레임 이름) | `Screen`(이미지) | `Description` | `XLT`
   - **Description**: 그 프레임의 코멘트(스레드 답글 포함)를 화면 내 y좌표 상단부터 번호 매긴 목록(댓글 기준 정책)으로 삽입 (Step 3 규칙)
   - **XLT 열**: 그 프레임을 번역한 경우 해당 화면의 `XLT Key | KR` 중첩표를 채운다 (화면별 키 도출은 Step 3 'XLT 컬럼' 절차 참조). 번역하지 않았으면 `-`

   **(B) 페이지의 다국어 번역(XLT Full Translation) 모음 표 — 그 프레임 문구 행 추가/병합**
   - 그 프레임에서 도출한 문구(키)들을 `XLT Key | KR | JA | EN | TH | ZH-TW` 행으로 모음 표에 **추가/병합**한다
   - 이미 있는 키는 갱신, 없는 키는 추가, 모음 표(섹션)가 없으면 새로 만든다
   - **다른 프레임의 기존 번역 행은 그대로 보존**한다 (전체 번역표 재작성 금지)

5. **표에 surgical 삽입/치환**
   - Screen 표 `<tbody>` 안에서 `Screen ID` 셀이 같은 프레임 이름인 `<tr>`을 탐색
     - **있으면**: 그 `<tr>` 전체를 새 행으로 **치환**(갱신)
     - **없으면**: 화면 정렬 순서(캔버스 읽기 순서)상 올바른 위치의 `<tr>` 사이에 **삽입**. 위치 판단이 어려우면 `</tbody>` 직전에 추가 후 정렬 규칙에 맞는지 확인
   - 다국어 번역 모음 표도 같은 방식으로 4-(B)의 행을 surgical 삽입/치환한다 (섹션·다른 행 보존)
   - **History 표에 변경 행 1줄 추가 (필수)**: `날짜 | 버전 | "{프레임명} 행 추가/갱신" | Claude 자동 생성` — PIC는 `Claude 자동 생성`(Step 3 'PIC 규칙'), 변경 내용에 추가/갱신한 프레임 이름을 명시한다. **오늘 날짜 행이 이미 있으면 새 행 대신 그 행에 항목만 추가**(Step 3 '같은 날짜 병합' 규칙)
   - 그 외 모든 기존 내용(History 기존 행, Related Docs, 다른 Screen 행, 기존 번역 행)은 **그대로 보존**

6. **업데이트 적용**
   - 수정한 **전체 storage 콘텐츠**를 `confluence_update_page(page_id, content_format='storage', content=수정본, version_comment="{프레임명} 행 추가/갱신")`로 전송
   - 코멘트 어노테이션 이미지가 있으면 **먼저 페이지에 첨부 업로드**(Step 4-B ③) 후 본문에서 `ri:attachment`로 참조
   - 반환 version 확인, 추가/갱신된 행을 사용자에게 보고

> ⚠️ Mode B는 부분 갱신이다. **전체 표 재작성·다른 행 삭제 금지** — 반드시 원문(storage)을 받아 해당 행만 수정한 **전체 콘텐츠**를 전송한다. markdown으로 받아 되쓰면 기존 행·매크로가 손상되므로 금지.

---

## 주의사항

### Storage 포맷 관련
- Confluence에서 nested table은 **storage 포맷(XHTML)**으로만 정상 동작
- markdown 포맷은 표 안의 표를 지원하지 않음
- 이미지 크기 지정도 storage 포맷의 `ac:width` 속성 사용

### 이미지 URL 전략

위키에 이미지를 삽입할 수 있는 방법과 각각의 한계:

| URL 유형 | 설명 | 적합 여부 |
|----------|------|----------|
| Figma MCP URL (`figma.com/api/mcp/asset/...`) | MCP 도구가 반환하는 URL | ❌ MCP 세션 종료 시 무효화, Confluence 서버가 인증 없이 로드 불가 → 이미지 깨짐 |
| Figma S3 URL (`figma-alpha-api.s3.amazonaws.com/...`) | REST API 발급 공개 URL | ⚠️ 수 시간~수일 내 만료. **본문에 직접 넣지 않는다** — 로컬 다운로드 출처로만 사용 |
| **Confluence 첨부파일** | 로컬 이미지를 페이지에 직접 업로드 (`ri:attachment`) | ✅ **유일 기본 방식** — 모든 화면이 로컬 다운로드 후 이 방식으로 첨부. 영구 저장, 외부 의존성 없음. 위키 토큰(Confluence PAT) 필요 |
| GitHub raw URL (`raw.githubusercontent.com/...`) | 레포에 push한 파일의 공개 URL | ⚠️ 임시 스테이징 용도. 위키 토큰이 정말 없을 때만 fallback. Confluence 캐싱에 의존하므로 불안정 |

**결론 및 정책:**
- **모든 화면 이미지는 로컬로 다운로드한 뒤 Confluence 첨부파일(`ri:attachment`)로 삽입한다** — 코멘트 유무와 무관 (Step 4 참조)
- Figma S3 URL은 **로컬 다운로드 출처로만** 쓰고 위키 본문에 직접 넣지 않는다 (만료되어 깨짐)
- 위키 토큰(Confluence PAT)이 정말 없는 경우에만 GitHub 임시 스테이징 → 위키 업로드 완료 후 레포에서 삭제

### 페이지 형식 통일
- 같은 space 내 유사 문서와 형식을 통일
- `[Screen]` 접두사 문서 참조하여 Screen ID 네이밍, 표 구조 맞춤
