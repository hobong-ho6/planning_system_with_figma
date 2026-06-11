# Confluence 위키 업데이트 절차

## 개요
Figma에서 추출한 화면 정보와 다국어 번역 데이터를 Confluence 위키 페이지에 정해진 형식으로 업데이트하는 절차.

---

## 사전 조건
- Confluence 위키 페이지 URL 또는 Page ID
- 업데이트할 콘텐츠 (화면 이미지, 텍스트, 번역)
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
#### Screen 표 (Screen ID 컬럼)
- **Screen ID에는 Figma의 프레임 이름을 그대로 사용**한다 (예: `(New) 자산 전송 팝업`)
- ❌ `SC-01` 같은 임의 번호를 만들지 않는다 — Figma·프로토타입과 위키 간 화면 식별이 어긋난다
- node-id는 프레임 이름 아래 괄호로 병기 가능 (예: `(51762:2592)`)

#### Screen 표 (XLT 컬럼)
- `XLT Key | KR` 만 표시 (간결하게 한국어만)
- 이미지와 함께 빠르게 텍스트 확인 용도

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
