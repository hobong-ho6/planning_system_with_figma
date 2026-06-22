# Confluence 위키 업데이트 절차

## 개요
Figma에서 추출한 화면 정보와 다국어 번역 데이터를 Confluence 위키 페이지에 정해진 형식으로 업데이트하는 절차.

---

## ⛔ 시작 전 필수 확인 (없으면 진행 불가)

| 항목 | 확인 방법 | 없을 경우 |
|------|-----------|-----------|
| Figma Personal Access Token | `echo $FIGMA_TOKEN` 또는 사용자에게 요청 | **작업 중단 — 토큰 없이는 이미지 URL·코멘트 발급 불가** |
| Confluence 위키 페이지 URL | 사용자 제공 | 작업 중단 |
| Figma 파일 URL | 사용자 제공 | 작업 중단 |

> ⚠️ FIGMA_TOKEN이 없는 상태에서 "일단 구조만 올리기" 금지 — 이미지와 코멘트가 누락된 불완전한 문서가 생성된다.

## 사전 조건
- Confluence 위키 페이지 URL 또는 Page ID
- Figma Personal Access Token (`figd_xxx...`)
- MCP Confluence 도구 접근 가능

---

## 사용자로부터 받아야 할 정보

| 항목 | 필수 | 설명 | 예시 |
|------|:---:|------|------|
| 위키 페이지 URL | ✅ | 업데이트 대상 페이지 | `https://wiki.workers-hub.com/pages/viewpage.action?pageId=4288438279` |
| 참조 페이지 URL | - | 형식을 참조할 기존 페이지 | `[Screen]Unifi MINI - LV` |
| 페이지 제목 유지 여부 | - | 기존 제목 유지 or 변경 | 기존 유지 |
| Figma 토큰 | ✅ | 이미지 export용 (이미 있으면 재사용) | `figd_xxx...` |

---

## 절차

### Step 0: Figma 토큰 수집 (작업 시작 전 최우선)

**모든 작업보다 먼저 수행한다. 토큰 확보 전까지 Step 1로 진행하지 않는다.**

1. 사용자에게 Figma Personal Access Token을 요청한다:
   > "위키 업데이트를 위해 Figma Personal Access Token이 필요합니다. Figma → 프로필 → Settings → Security → Personal access tokens에서 발급 후 공유해 주세요."
2. 토큰을 받으면 유효성 검증:
   ```bash
   curl -s -H "X-Figma-Token: {TOKEN}" "https://api.figma.com/v1/me" | python3 -c "import json,sys; d=json.load(sys.stdin); print('✅ 유효:', d.get('email')) if d.get('email') else print('❌ 무효:', d)"
   ```
3. 유효하면 Step 1 진행. 무효하면 사용자에게 재발급 요청.

> ❌ 토큰 없이 "일단 구조만 올리기" 금지 — 이미지(S3 URL)와 코멘트가 누락된 불완전한 문서가 생성된다.

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

#### Screen 표 (화면 선정 — `Case` 프레임 제외)
- **이름이 `Case`로 시작하는 프레임은 Screen 표에 포함하지 않는다** (예: `Case 선택 - 니모닉, SNS`, `Case1. SNS 계정 1개 보유`) — 프로토타입 분기 테스트용 화면이므로 화면 정의서 대상이 아니다
- 판별 기준은 **프레임 이름의 시작 문자열**이다. `(New) Case2. ...`처럼 `(New)`로 시작하는 프레임은 **포함 대상**이다
- 이 제외 규칙은 **3단계 위키의 Screen 표에만** 적용된다 — 1단계 번역의 `(New)` 필터, 2단계 프로토타입의 전체 화면 수집과 혼동하지 않는다 (CLAUDE.md '단계별 프레임 필터 규칙' 참조)
- 제외한 프레임 목록(이름·node-id)을 사용자에게 보고한다

#### Screen 표 (Screen ID 컬럼)
- **Screen ID에는 Figma의 프레임 이름을 그대로 사용**한다 (예: `(New) 자산 전송 팝업`)
- ❌ `SC-01` 같은 임의 번호를 만들지 않는다 — Figma·프로토타입과 위키 간 화면 식별이 어긋난다
- ❌ node-id를 Screen ID 셀에 포함하지 않는다 (예: `(51762:2592)` 같은 괄호 병기 금지) — 프레임 이름만 표시한다

#### Screen 표 (Description 컬럼 — Figma 코멘트 필수 반영)

> ⚠️ **코멘트 수집은 선택이 아니라 필수다.** 코멘트를 빠뜨린 채 위키를 올리면 화면 정책이 누락된다. 토큰이 없으면 Step 1 이전에 중단한다.

- 화면 설명 1~2문장과 함께 **해당 화면의 Figma 코멘트를 Description에 포함**한다 — 코멘트는 화면 정책이다
- **번호 규칙**: 화면 내 위치 **y좌표가 가장 위에 있는 코멘트부터** `1.`, `2.`, … 순차 번호를 붙인다
  - 예: 가장 상단 코멘트가 "일주일간 보지 않기"라면 → `1. 일주일간 보지 않기`
- **미해결(resolved_at이 null) 코멘트만 포함**한다 — 해결된 코멘트는 이미 반영된 정책이다
- 코멘트가 없는 화면은 화면 설명만 기재한다

**코멘트 조회 방법 (우선순위 순):**

1. **`comments_data.json`이 있는 경우** (2단계 완료 후): 재사용 (`screenId`별 그룹핑 후 `offset.y` 오름차순 정렬)
2. **없는 경우 (필수 대안 — 건너뛰기 금지)**: Figma REST API로 직접 조회
   ```bash
   curl -s -H "X-Figma-Token: $FIGMA_TOKEN" \
     "https://api.figma.com/v1/files/{fileKey}/comments" \
     | python3 -c "
   import json, sys
   from collections import defaultdict
   d = json.loads(sys.stdin.buffer.read().decode('utf-8'))
   grouped = defaultdict(list)
   for c in d.get('comments', []):
       meta = c.get('client_meta') or {}
       node_id = meta.get('node_id', '')
       y = (meta.get('node_offset') or {}).get('y', 0)
       if node_id and c.get('message') and not c.get('resolved_at'):
           grouped[node_id].append({'y': y, 'msg': c['message'].strip()})
   for nid, cs in grouped.items():
       for c in sorted(cs, key=lambda x: x['y']):
           print(nid, c['y'], c['msg'])
   "
   ```
   - 응답에서 `client_meta.node_id`로 프레임별 코멘트 그룹핑
   - `node_offset.y` 오름차순 정렬
   - `resolved_at`이 있으면(truthy) 제외

#### Screen 표 (XLT 컬럼)
- `XLT Key | KR` 만 표시 (간결하게 한국어만)
- 이미지와 함께 빠르게 텍스트 확인 용도
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

### Step 4: 이미지 처리

**핵심: Confluence에 파일을 업로드하는 것이 아니라, Figma REST API가 반환하는 공개 S3 URL을 외부 이미지로 삽입한다.**

1. Figma REST API로 이미지 URL 발급 (Personal Access Token 필수):
   ```bash
   curl -H "X-Figma-Token: $FIGMA_TOKEN" \
     "https://api.figma.com/v1/images/{fileKey}?ids={nodeId1},{nodeId2}&scale=2&format=png"
   ```
   - 응답의 `images` 객체에 노드별 공개 S3 URL이 담김 (`https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/...`)
   - 여러 노드는 `ids`에 쉼표로 묶어 한 번에 발급
   - 일시적 `400`/`5xx` 응답이 올 수 있다 — 오류 본문을 출력하며 재시도하고, 반복 실패 시 `ids`를 절반씩 나눠 분할 발급한다
2. `ac:image` 태그로 삽입, 너비 **300px 고정**:
   ```xml
   <ac:image ac:width="300">
     <ri:url ri:value="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/..."/>
   </ac:image>
   ```

**⚠️ 실패 사례 — 아래 방법은 동작하지 않는다:**
- ❌ **Figma MCP `get_screenshot`의 URL**(`https://www.figma.com/api/mcp/asset/...`)을 위키에 삽입 — 단기 만료 + 인증 필요 URL이라 위키에서 이미지가 깨진다. 이 URL은 로컬 PNG 다운로드 전용이다
- ❌ **로컬 PNG를 Confluence 첨부파일로 업로드** — wiki MCP 도구에 첨부 업로드 기능이 없다 (페이지 조회/생성/수정, 코멘트, 라벨, 검색만 지원). `<ri:attachment>` 참조도 첨부가 없으므로 실패한다
- ❌ **markdown 포맷으로 이미지 포함 업데이트** — `ac:image` 너비 지정과 중첩표가 동작하지 않는다. 반드시 storage 포맷을 사용한다

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
<tr><th>날짜</th><th>버전</th><th>변경 내용</th><th>작성자</th></tr>
<tr><td>YYYY-MM-DD</td><td>v1.0</td><td>최초 작성 — ...</td><td>작성자 (Claude 자동 생성)</td></tr>
</tbody></table>
<h1>Related Docs</h1>
<ul>
<li>Figma 디자인: <a href="https://www.figma.com/design/...">...</a></li>
<li>Figma 프로토타입: <a href="https://www.figma.com/proto/...?node-id=...&amp;page-id=...">...</a></li>
</ul>
<hr/>
<h1>Screen</h1>
<p>Screen ID는 Figma 프레임 이름을 그대로 사용합니다. (화면 선정·코멘트 규칙 안내문)</p>
<table><tbody>
<tr><th>Screen ID</th><th>Screen</th><th>Description</th><th>XLT</th></tr>
<tr>
  <td>(New) 자산 전송 팝업<br/>(51762:2592)</td>
  <td><ac:image ac:width="300"><ri:url ri:value="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/..."/></ac:image></td>
  <td><p>화면 설명 1~2문장.</p><p><strong>Figma 코멘트</strong><br/>1. 상단 코멘트<br/>2. 다음 코멘트</p></td>
  <td><table><tbody><tr><th>XLT Key</th><th>KR</th></tr><tr><td>KW_...</td><td>한국어 (셀 내 줄바꿈은 &lt;br/&gt;)</td></tr></tbody></table></td>
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
- 코멘트가 없는 화면의 Description은 설명 `<p>` 하나만, XLT가 없는 화면(비 `(New)` 프레임)의 XLT 셀은 `-`
- 코멘트 없는 페이지/문단도 골격의 섹션 순서(History → Related Docs → Screen → 다국어 번역)는 유지한다

### Step 6: 검증
- [ ] 페이지 URL 접속하여 렌더링 확인
- [ ] 이미지가 300px로 표시되는지 확인
- [ ] Nested table (XLT 컬럼) 정상 렌더링 확인
- [ ] 다국어 번역 섹션 표가 정상 표시되는지 확인

---

## 주의사항

### Storage 포맷 관련
- Confluence에서 nested table은 **storage 포맷(XHTML)**으로만 정상 동작
- markdown 포맷은 표 안의 표를 지원하지 않음
- 이미지 크기 지정도 storage 포맷의 `ac:width` 속성 사용

### 이미지 URL 유효기간
- Figma API에서 반환하는 이미지 URL은 **만료될 수 있음**
- 영구 보존이 필요하면 이미지를 다운로드하여 Confluence attachment로 업로드 권장

### 페이지 형식 통일
- 같은 space 내 유사 문서와 형식을 통일
- `[Screen]` 접두사 문서 참조하여 Screen ID 네이밍, 표 구조 맞춤
