# Planning System with Figma

Figma 디자인을 입력으로 받아 **다국어 번역(XLT) → 웹 프로토타입 → Confluence 위키 문서화**까지 자동으로 수행하는 Claude Code 기반 기획 워크플로우입니다.

Claude Code가 이 저장소의 `CLAUDE.md`와 `md/` 가이드를 읽고 전 과정을 진행하며, 반복 작업은 `scripts/`의 Python 스크립트와 `templates/`의 프로토타입 템플릿으로 자동화되어 있습니다.

## 🔄 전체 워크플로우 흐름

```
Figma URL 입력
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ [1단계] 다국어 번역 + XLT Key 정의 (md/translate.md)       │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│ • 화면: (New) 프레임만 추출 (또는 단일 프레임/코멘트 선별) │
│ • 제외: (x) 시작 프레임                                     │
│ • 처리: 텍스트 추출 → XLT Key 부여 → 5개 언어 번역         │
│ • 검증: 3단계 품질 체크 (P0/P1/P2) - md/check.md           │
│ • 산출물:                                                   │
│   - XLT 업로드용 엑셀 (properties + plurals)               │
│   - 검증 리포트 (P0/P1/P2 분류)                            │
│   - translation_extract.json (2단계 입력)                  │
│   - translation_data.json (2단계 입력)                     │
└─────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ [2단계] 웹 프로토타입 생성 (md/prototype.md)               │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│ • 화면: 페이지 직속 자식 프레임 **전부** (필터 금지!)      │
│ • 포함: (New), Case, (x) 전부 — 네비게이션 무결성 유지     │
│ • 처리:                                                     │
│   - 전체 화면·인터랙션 수집 (NAVIGATE, CHANGE_TO 등)       │
│   - 화면 이미지 export → assets/screens/                   │
│   - templates/ 복사 + data.js/i18n.js 자동 생성            │
│   - XLT Key 토글 + 5개 언어 전환 + 코멘트 표시             │
│   - Variant Swap (체크박스 등 상태 전환) 처리              │
│ • 산출물:                                                   │
│   - index.html + style.css + script.js + data.js + i18n.js │
│   - assets/screens/ (전체 화면 PNG)                        │
│   - assets/variants/ (variant 상태별 PNG)                  │
│   - DropWeb 배포 가능한 정적 사이트                        │
└─────────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ [3단계] Confluence 위키 업데이트 (md/wiki.md)              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━│
│ • 화면: (New) 포함, Case·(x) 시작 제외 (위키 정의서 대상) │
│ • 처리:                                                     │
│   - History 표: 변경 프레임 이력 행 추가                   │
│   - Screen 표: 화면별 이미지·정책·XLT                      │
│   - 코멘트 → Description (y좌표 상단부터 번호 부여)        │
│   - 이미지: 로컬 다운로드 → 번호 어노테이션 → Confluence 첨부 │
│   - 다국어 번역 표: 전체 XLT Key + 5개 언어                │
│ • 산출물:                                                   │
│   - Confluence 페이지 업데이트 (storage XHTML)             │
│   - 화면 정의서 + 다국어 번역표                            │
└─────────────────────────────────────────────────────────────┘
```

**각 단계는 독립 실행 가능**하며, 순차 파이프라인으로 연결할 수도 있습니다.

---

## 📋 프레임 필터 규칙 (핵심 — 혼동 금지!)

**각 단계는 서로 다른 프레임 범위를 처리합니다.** 다른 단계의 필터를 적용하면 화면·인터랙션·번역이 누락됩니다.

| 단계 | 화면(프레임) 범위 | `(New)` 필터 | `(x)` 필터 | `Case` 필터 |
|:---:|---|:---:|:---:|:---:|
| **1단계<br/>번역** | `(New)` 시작 프레임만<br/>(또는 단일 프레임/코멘트 선별 모드) | ✅ `(New)` 포함만 | ❌ 제외 | - |
| **2단계<br/>프로토타입** | **페이지 직속 자식 프레임 전부**<br/>(이름·크기 필터 **절대 금지**) | 🚫 필터 금지<br/>(전부 포함) | 🚫 필터 금지<br/>(전부 포함) | 🚫 필터 금지<br/>(전부 포함) |
| **3단계<br/>위키** | `Case`·`(x)` 시작 제외<br/>나머지 전체 | - | ❌ 제외 | ❌ 제외 |

### 판별 기준
- **페이지 직속 자식 프레임 이름**의 시작 문자열로 판별
- 예: `(New) Case2...` → `(New)`로 시작 = 1단계 포함, 3단계 포함
- 예: `Case 선택 - 니모닉` → `Case`로 시작 = 3단계 제외 (1·2단계는 자기 규칙 따름)
- 예: `(x) 구버전 화면` → `(x)`로 시작 = 1·3단계 제외, **2단계 포함** (네비게이션 유지)

### 흔한 위반 (절대 금지!)

```
❌ (New) 필터를 2단계에 적용 → 일부 화면·인터랙션 누락
❌ Case 시작 프레임을 1단계 번역 대상에 포함 → 불필요한 번역
❌ Case 제외를 2단계에 적용 → 프로토타입 분기 동선 누락
❌ (New) Case2를 Case로 오판해 위키 제외 → 실제 화면 누락
❌ (x) 시작 프레임을 2단계에서 제외 → 네비게이션 끊김
```

**코멘트 선별 모드 예외 (1단계 전용):**
- 사용자가 "Figma 코멘트(`xlt:`)로 표시한 문구만 번역" 요청 시
- `(New)` 필터 대신 `xlt:` 코멘트가 가리키는 텍스트만 추출
- 이 모드는 **1단계에만** 적용되며 2·3단계 필터에는 영향 없음

---

## 📚 단계별 상세 가이드

### 1단계: 다국어 번역 + XLT Key 정의 (`md/translate.md`)

#### 📖 개요
Figma 화면의 텍스트를 추출해 XLT Key를 부여하고 5개 언어로 번역합니다.

#### 🎯 추출 모드 (3가지)

| 모드 | 트리거 | 대상 프레임 |
|------|------|------------|
| **① (New) 전수** | Figma 페이지 URL | `(New)` 시작 프레임만 (`(x)` 제외) |
| **② 단일 프레임** | Figma 프레임 URL + "이 프레임만 번역" | 지정한 **그 프레임 하나만** |
| **③ 코멘트 선별** | "Figma 코멘트(`xlt:`)로 표시한 문구만" | `xlt:` 코멘트가 가리키는 텍스트만 |

**모드 무관 공통 절차**: Step 2~7 (XLT Key·번역·검증·엑셀) 동일 수행

#### 📋 Step별 작업

| Step | 작업 | 상세 |
|:---:|------|------|
| **1** | 텍스트 추출 | • 모드에 따라 대상 프레임 선정<br/>• `use_figma` + `findAll(n => n.type === 'TEXT')`<br/>• 좌표·중복 제거 후 고유 텍스트 목록 생성<br/>• **출력량 제한 대응**: 프레임당 나눠 호출, 동일 텍스트 그룹핑<br/>• 산출물: `translation_extract.json` |
| **2** | XLT Key 생성 | • 프로젝트 약어 + 화면/기능 + 의미 suffix (예: `KW_home_deposit`)<br/>• **불변 규칙**: 동일 한국어 = 1개 키 (프로토타입 i18n 필수)<br/>• 번역 제외 판별: 숫자·주소·심볼 등 키 미부여<br/>• 영문 UI 라벨은 사용자 확인 |
| **3** | 용어집 조회 | • API 엔드포인트에서 최신 용어집 조회<br/>• 도구: `scripts/fetch_glossary.py` → `scripts/glossary.json`<br/>• 예외 항목 확인 (USDT, PIN 등) |
| **4** | 5개 언어 번역 | • **ko_KR, ja_JP, en_US, th_TH, zh_TW 전부 필수**<br/>• 참조: `md/guide.md` (톤앤매너, 용어집, 치환자·HTML 보존)<br/>• 원문 교정·통합 시 **alias 매핑 유지** (프로토타입 i18n용)<br/>• 산출물: `translation_data.json` (rows + aliases) |
| **5** | 검증 | • **3단계 검증**: 한국어 맞춤법 → 용어집 위반 → 다국어 품질<br/>• 도구: `scripts/validate_translation.py` + `md/check.md`<br/>• 심각도 분류: 🔴 P0 (즉시 수정) / 🟡 P1 (검토 후) / 🟢 P2 (정책 결정)<br/>• **검증 통과 전 Step 6·7 진행 금지** |
| **6** | 출력 | • 화면별 요약표 (`XLT Key | KR`)<br/>• 전체 번역표 (`XLT Key | KR | JA | EN | TH | ZH-TW`) |
| **7** | 엑셀 생성 | • XLT System 업로드용 엑셀 생성<br/>• 도구: `scripts/export_to_xlt.py`<br/>• 시트: properties (전체 번역) + plurals (고정 규칙)<br/>• 산출물: `xlt/xlt_output_YYYYMMDDHHmmss.xlsx` |

#### 💎 참조 가이드

| 파일 | 내용 | 참조 시점 |
|------|------|----------|
| `md/guide.md` | 톤앤매너, 용어집 API, 치환자·HTML 보존, 번역 예외 | Step 4 (번역) |
| `md/check.md` | 3단계 검증 체크리스트 (P0/P1/P2 기준) | Step 5 (검증) |

#### 📦 산출물

```
translation_extract.json    → 2단계 입력 (화면별 텍스트 좌표)
translation_data.json       → 2단계 입력 (XLT Key + 5개 언어 + aliases)
xlt/xlt_output_*.xlsx       → XLT System 업로드용
xlt/*_validation_report.md  → 검증 리포트 (P0/P1/P2 분류)
```

### 2단계: 웹 프로토타입 생성 (`md/prototype.md`)

#### 📖 개요
Figma 프로토타입 인터랙션을 분석해 브라우저에서 클릭 가능한 정적 웹 프로토타입을 생성합니다.

#### 🚨 필수 규칙: 전체 프레임 수집 (필터 금지!)

**프로토타입은 페이지 직속 자식 프레임을 전부 수집합니다.**
- ⚠️ `(New)` 필터 **금지** — 1단계 전용
- ⚠️ `Case` 제외 **금지** — 3단계 전용
- ⚠️ `(x)` 제외 **금지** — 네비게이션 무결성 유지 (다른 화면이 이 프레임으로 연결될 수 있음)
- ⚠️ 화면 크기 필터 **금지** — 크기는 프로젝트마다 다름

**정확한 범위**: 페이지 직속 자식 프레임 **전부** + 모든 reactions 인터랙션

#### 📋 Step별 작업

| Step | 작업 | 상세 |
|:---:|------|------|
| **1** | 메타데이터 조회 | • URL에서 fileKey·nodeId 추출<br/>• `get_metadata`로 페이지 구조 확인<br/>• **직속 자식 프레임 전체** 목록 파악 (필터 없음) |
| **2** | 인터랙션 추출 | • `use_figma`로 **모든** reactions 보유 노드 탐색<br/>• NAVIGATE, BACK, CHANGE_TO, AFTER_TIMEOUT 등<br/>• 페이지 소속 검증 (다른 페이지 화면 제외·보고)<br/>• destination 비어있는 reactions 제외·보고<br/>• **표준 추출 스크립트 사용** (md에 정의, 재작성 금지) |
| **3** | 핫스팟 좌표 계산 | • 트리거 노드의 absoluteBoundingBox 조회<br/>• 부모 화면 프레임 기준 상대 좌표 변환<br/>• 결과: `{ x, y, width, height }` |
| **4** | 화면 이미지 Export | • Figma REST API: `GET /v1/images/{fileKey}?ids=...&scale=2`<br/>• 반환 URL에서 PNG 다운로드 → `assets/screens/`<br/>• 파일명: `{nodeId에서 : → -}.png`<br/>• 일시 오류 시 분할 재시도, MCP fallback |
| **5** | 웹 프로토타입 생성 | • **데이터 준비**: `prototype_input.json` 저장 (화면·인터랙션·variants)<br/>• **템플릿 복사**: `cp templates/* .`<br/>• **자동 생성**: `python3 scripts/build_prototype_data.py`<br/>  - 입력: prototype_input, translation_extract, translation_data, comments_data<br/>  - 출력: data.js, i18n.js (+ 무결성 검증)<br/>• **data.js 구조**: startScreen, screens, interactions, comments, textNodes, variantSwaps<br/>• **script.js ↔ data.js 인터페이스 계약 준수 필수** |
| **6** | XLT Key 토글 | • 1단계 산출물 (XLT Key + 5개 언어) → `i18n.js` 주입<br/>• 네비게이션 바에 "XLT Key" 토글 버튼 추가<br/>• 토글 ON: 각 텍스트 위치에 XLT Key 오버레이 표시<br/>• 기존 언어 선택과 독립 동작 (언어=번역, XLT=Key)<br/>• **누락 방지**: textNodes 개수 vs Figma 개수 비교 검증 |
| **7** | Variant Swap | • CHANGE_TO 인터랙션 필터링 (체크박스·토글 등)<br/>• 각 variant 상태를 PNG로 export (scale 4x) → `assets/variants/`<br/>• defaultState 판별: instance.variantProperties 확인<br/>• **표준 코드 사용** (md에 정의)<br/>• data.js에 variantSwaps[] 추가 |
| **8** | 코멘트 통합<br/>(필수!) | • **생략 조건**: ① 조회 결과 0건, ② 사용자 "미포함" 선택<br/>• Figma REST API: `GET /v1/files/{fileKey}/comments`<br/>• **페이지 소속 필터링 필수** (파일 전체 반환되므로)<br/>• **루트 + 답글 스레드 수집** (parent_id로 묶기)<br/>• data.js에 comments[] 추가 (replies 포함)<br/>• **UI 구현**: 우측 리스트 패널 + 리스트→핀 연동 + 외부 클릭 닫기 |
| **9** | 검증 | • 브라우저에서 클릭 네비게이션 확인<br/>• 코멘트 리스트·팝오버 동작 확인<br/>• XLT Key 토글 ON 시 오버레이 위치 확인<br/>• Variant 클릭 전환 확인<br/>• **자동 무결성 체크**: `cat data.js i18n.js > /tmp/check.js && node /tmp/check.js`<br/>• DropWeb 규격 확인 (상대 경로, 허용 파일 형식) |

#### 💎 참조 가이드

| 파일 | 내용 | 참조 시점 |
|------|------|----------|
| `md/dropweb-guide.md` | 정적 웹사이트 배포 규격 (상대 경로, 파일 형식) | Step 5, 9 |
| `md/prototype.md` | 표준 추출 스크립트, 인터페이스 계약 | Step 2, 5, 7 |

#### 🎯 뷰어 기능

```
• 화면 간 클릭 네비게이션 (NAVIGATE, BACK, AFTER_TIMEOUT)
• 5개 언어 전환 (번역 텍스트 오버레이)
• XLT Key 표시 토글 (Key 오버레이)
• Variant Swap (체크박스 등 상태 전환)
• 코멘트 표시 (우측 리스트 + 화면 내 핀 + 팝오버)
• 긴 화면 스크롤 지원
```

#### 📦 산출물

```
index.html              → 프로토타입 뷰어
style.css               → 스타일
script.js               → 인터랙션 로직
data.js                 → 화면/핫스팟/코멘트 데이터
i18n.js                 → 번역 딕셔너리 (5개 언어)
assets/screens/         → 전체 화면 PNG
assets/variants/        → variant 상태별 PNG
dropweb/dropweb_prototype.zip  → DropWeb 배포용 ZIP
```

**배포**: DropWeb에 ZIP 업로드 가능 (정적 사이트 규격 준수)

### 3단계: Confluence 위키 업데이트 (`md/wiki.md`)

#### 📖 개요
1·2단계 산출물(화면 이미지, XLT Key, 번역표)을 Confluence 화면 정의서에 반영합니다.

#### ⛔ 시작 전 필수: 토큰 우선 규칙

**작업 시작 전 최우선으로 Figma + Confluence 토큰을 모두 요청·수신·검증한 뒤에만 착수합니다.**
- ❌ 토큰 받기 전: 위키 페이지 조회, Figma 구조 파싱, 범위 파악 등 **일체 금지**
- ✅ ① 토큰 요청 → ② 수신 → ③ 유효성 검증 → ④ 그 후 작업 시작

#### 🔀 업데이트 모드 (입력 URL에 따라 분기)

| 모드 | 트리거 (입력) | 동작 | 표 처리 |
|------|--------------|------|---------|
| **A. 전체 페이지** | Figma **페이지** URL | 페이지의 모든 화면 수집 (`Case`·`(x)` 제외) | Screen 표 전체 재작성 |
| **B. 단일 프레임 행 추가** | Figma **프레임** URL + "이 프레임만" | 그 프레임 하나만 처리 | 기존 표에 **1개 행만** 추가/갱신 |

**모드 판별 (토큰 확보 후)**: `GET /v1/files/{fileKey}/nodes?ids={id}`로 타입 확인
- `CANVAS` → Mode A (전체)
- `FRAME`/`COMPONENT` 등 → Mode B (단일)

#### 📋 Step별 작업 (Mode A 기준)

| Step | 작업 | 상세 |
|:---:|------|------|
| **0** | 토큰 수집<br/>(최우선!) | • Figma + Confluence 토큰 **동시** 요청·수신·검증<br/>• 이 전까지 **어떤 작업도 금지** (페이지 조회·범위 파악 포함) |
| **1** | 페이지 확인 | • URL에서 Page ID 추출<br/>• `confluence_get_page`로 현재 상태 조회 (**storage 원문 필수**)<br/>• 제목, space key, 현재 version 확인 |
| **2** | 형식 결정 | • 참조 페이지 형식 확인 (사용자 제공 시)<br/>• 기본 형식: History → Related Docs → Screen → 다국어 번역 |
| **3** | 콘텐츠 작성 | • **History 표**: 변경 프레임 이력 행 추가 (날짜/버전/변경 내용/작성자)<br/>• **Screen 표**: 화면별 이미지·정책·XLT<br/>  - **프레임 선정**: `Case`·`(x)` 시작 **제외**, 나머지 전체<br/>  - **Screen ID**: Figma 프레임 이름 그대로 (node-id 병기 금지)<br/>  - **Description**: 화면 설명 + 코멘트 (y좌표 상단부터 `1.`, `2.`, … 번호)<br/>    - 답글 스레드는 루트 아래 `↳` 들여쓰기로 본문만 표시<br/>    - 미해결 코멘트만 포함<br/>  - **XLT**: `XLT Key | KR` 중첩표 (화면별 키 도출 절차 따름)<br/>  - **정렬**: 캔버스 읽기 순서 (왼→오른, 위→아래)<br/>• **다국어 번역 표**: `XLT Key | KR | JA | EN | TH | ZH-TW` 전체 |
| **4** | 이미지 처리 | • **4-A**: Figma REST로 S3 URL 발급 → 로컬 다운로드<br/>• **4-B**: 코멘트 있는 화면 → Python Pillow로 번호 원 오버레이<br/>• **4-C**: 로컬 이미지를 Confluence에 직접 첨부 (위키 토큰 필요)<br/>  - `POST {BASE_URL}/rest/api/content/{pageId}/child/attachment`<br/>  - 본문에서 `<ri:attachment ri:filename="{name}.png"/>` 참조<br/>• **fallback**: 위키 토큰 없으면 GitHub 임시 스테이징 → 완료 후 삭제 |
| **5** | 위키 업데이트 | • **storage 포맷 XHTML** 사용 (nested table 지원)<br/>• `confluence_update_page`로 전체 콘텐츠 전송<br/>• version_comment에 변경 프레임 명시 |
| **6** | 검증 | • 페이지 렌더링 확인<br/>• 이미지 300px 표시 확인<br/>• Nested table (XLT 컬럼) 정상 확인 |

#### 🎯 Mode B: 단일 프레임 행 추가/갱신

**입력**: 프레임 URL + "이 프레임만 다국어 번역 후 위키 업데이트"
**동작**: 기존 페이지를 보존한 채 **그 프레임 행 1개만** surgical 삽입/치환

```
1. 프레임 확정 (Case/(x) 시작이면 사용자 확인)
2. 기존 위키 페이지 원문 확보 (storage 원문 필수)
3. 그 프레임의 이미지·코멘트 생성 (Step 3·4 규칙 적용)
4. 행 구성 + 번역 반영 (2개 표 갱신):
   (A) Screen 표: 그 프레임 행 1개 추가/갱신
   (B) 다국어 번역 표: 그 프레임 문구 행 추가/병합
5. 표에 surgical 삽입/치환 (기존 행 보존)
   + History 표에 변경 행 1줄 추가 (프레임명 명시)
6. 업데이트 적용 (수정한 전체 storage 전송)
```

**주의**: 전체 표 재작성·다른 행 삭제 금지. markdown으로 받아 되쓰면 기존 행·매크로 손상.

#### 💎 참조 가이드

| 파일 | 내용 | 참조 시점 |
|------|------|----------|
| `md/wiki.md` | 코멘트 조회 REST 절차, storage XHTML 골격, Mode B 상세 | Step 3, 4, 5 |

#### 📦 산출물

```
Confluence 페이지 (갱신):
├── History 표: 변경 이력 (프레임별 추가/갱신 행)
├── Related Docs: Figma 디자인·프로토타입 링크
├── Screen 표: 화면별 이미지·정책(코멘트)·XLT
└── 다국어 번역 표: 전체 XLT Key + 5개 언어

첨부 이미지 (Confluence 서버 저장):
├── {프레임명}.png (코멘트 있으면 번호 어노테이션)
```

---

## 🔀 케이스별 md 호출 순서

### Case 1: 전체 파이프라인 (Figma → 번역 → 프로토타입 → 위키)

**입력**: Figma 페이지 URL + Confluence 위키 URL

```
① md/translate.md (모드: (New) 전수)
   - 프레임 필터: (New) 시작만 ((x) 제외)
   - 참조: md/guide.md (Step 4), md/check.md (Step 5)
   - 산출물: translation_extract.json, translation_data.json, xlt/*.xlsx

② md/prototype.md (전체 프레임)
   - 프레임 필터: 없음 (전부 수집)
   - 참조: md/dropweb-guide.md (Step 5, 9)
   - 입력: ①의 translation_extract.json, translation_data.json
   - 산출물: index.html, data.js, i18n.js, assets/screens/

③ md/wiki.md (모드 A: 전체 페이지)
   - 프레임 필터: Case·(x) 시작 제외
   - 입력: ①의 translation_data.json, ②의 이미지
   - 산출물: Confluence 페이지 업데이트
```

**호출 순서 이유**:
- ① 먼저: XLT Key + 번역 데이터가 ②의 i18n.js 생성에 필요
- ②→③: 프로토타입 이미지를 위키에 재사용 가능 (선택)

---

### Case 2: 번역 + 프로토타입만 (위키 없음)

**입력**: Figma 페이지 URL

```
① md/translate.md (모드: (New) 전수)
② md/prototype.md (전체 프레임)
```

**산출물**:
- XLT 업로드용 엑셀: `xlt/xlt_output_*.xlsx`
- 프로토타입: `index.html` + 배포 파일

---

### Case 3: 단일 프레임 번역 → 위키 업데이트

**입력**: Figma 프레임 URL + Confluence 위키 URL + "이 프레임만 번역 후 위키"

```
① md/translate.md (모드: 단일 프레임)
   - 대상: 지정한 그 프레임 하나
   - 산출물: translation_extract.json, translation_data.json (해당 프레임분만)

② md/wiki.md (모드 B: 단일 프레임 행 추가)
   - 입력: ①의 번역 데이터
   - 동작: 기존 Screen 표에 그 프레임 행 1개 추가/갱신
   - 산출물: Confluence 페이지 업데이트 (기존 행 보존)
```

**프로토타입 생략 이유**: 단일 프레임은 전체 동선에 포함되지 않으므로 별도 프로토타입 불필요

---

### Case 4: 코멘트 선별 번역 → 위키 업데이트

**입력**: Figma URL + "Figma 코멘트(`xlt:`)로 표시한 문구만 번역"

```
① md/translate.md (모드: 코멘트 선별)
   - 대상: xlt: 코멘트가 가리키는 텍스트만
   - 매칭 확인 단계 포함 (좌표 휴리스틱 → 사용자 승인)
   - 산출물: translation_extract.json, translation_data.json (선별분만)

② md/wiki.md (모드 B: 단일 프레임 행 추가)
   - 입력: ①의 선별 번역 데이터
   - 동작: 해당 프레임 행 갱신 (XLT 컬럼 + 다국어 번역 표)
```

**프로토타입 생략 이유**: 선별 번역은 부분 갱신이므로 전체 프로토타입 재생성 불필요

---

### Case 5: 프로토타입만 (번역 없음 / 기존 번역 재사용)

**입력**: Figma 페이지 URL

```
① md/prototype.md (전체 프레임)
   - 입력: 기존 translation_extract.json, translation_data.json (있으면)
   - 없으면 XLT Key 토글 기능 제외
   - 산출물: index.html + 배포 파일
```

**번역 생략 조건**:
- 기존 번역 데이터가 이미 있음
- 또는 번역 기능 불필요 (화면 네비게이션만)

---

### Case 6: 위키만 (번역·프로토타입 이미 완료)

**입력**: Figma 페이지 URL + Confluence 위키 URL

```
① md/wiki.md (모드 A: 전체 페이지)
   - 입력: 기존 translation_data.json, assets/screens/ (재사용)
   - 동작: 위키 페이지 재생성 (History 행 추가)
```

**번역·프로토타입 생략 이유**: 이미 완료된 산출물 재사용

---

### 참조 가이드 호출 규칙

| md 파일 | 필수 참조 가이드 | 참조 시점 |
|---------|-----------------|----------|
| `translate.md` | `guide.md` | Step 4 (번역 수행 시)<br/>— 톤앤매너, 용어집 API, 치환자 보존 |
| | `check.md` | Step 5 (검증 수행 시)<br/>— 3단계 검증 기준, P0/P1/P2 분류 |
| `prototype.md` | `dropweb-guide.md` | Step 5 (코드 생성 시), Step 9 (검증 시)<br/>— 상대 경로, 파일 형식, ZIP 생성 규칙 |
| `wiki.md` | - | (자체 완결, 외부 참조 없음) |

### 전 단계 공통 참조

| 가이드 | 내용 | 적용 시점 |
|--------|------|----------|
| `PRODUCTION_RULES.md` | 프로덕션 필수 규칙<br/>(샘플링 금지, 5개 언어 필수, 검증 생략 금지, 간소화 금지) | **모든 단계에서 필수 준수** |

---

## 📁 폴더 구조

```
프로젝트루트/
├── CLAUDE.md                    # 📘 Claude Code 워크플로우 가이드 (자동 로드)
│
├── md/                          # 📚 절차 가이드 (7개)
│   ├── translate.md             #   🌐 1단계: 번역 절차
│   ├── prototype.md             #   🖥️  2단계: 프로토타입 절차
│   ├── wiki.md                  #   📄 3단계: 위키 절차
│   ├── guide.md                 #   📖 XLT 번역 규칙 (톤앤매너·용어집·치환자)
│   ├── check.md                 #   ✅ 3단계 검증 체크리스트 (P0/P1/P2)
│   ├── dropweb-guide.md         #   🚀 정적 웹사이트 배포 규격
│   └── PRODUCTION_RULES.md      #   ⚠️  프로덕션 필수 규칙 (모든 단계 준수)
│
├── scripts/                     # 🔧 자동화 스크립트
│   ├── fetch_glossary.py        #   용어집 API 조회 → glossary.json
│   ├── validate_translation.py  #   3단계 검증 (P0 발견 시 exit 1)
│   ├── export_to_xlt.py         #   XLT 업로드용 엑셀 생성
│   ├── build_prototype_data.py  #   data.js/i18n.js 생성 + 무결성 검증
│   ├── test_validation.py       #   회귀 테스트 (스크립트 수정 후 실행)
│   ├── setup_new_project.sh     #   새 프로젝트 초기화
│   └── requirements.txt         #   Python 의존성 (pandas, Pillow, openpyxl, requests)
│
├── templates/                   # 🎨 프로토타입 템플릿
│   ├── index.html               #   뷰어 HTML
│   ├── style.css                #   스타일
│   ├── script.js                #   인터랙션 로직
│   ├── data.js                  #   데이터 구조 템플릿
│   └── i18n.js                  #   번역 데이터 템플릿
│
├── xlt/                         # 📦 (자동 생성) 번역 엑셀 출력
│   └── xlt_output_*.xlsx
│
├── assets/                      # 🖼️  (자동 생성) 이미지
│   ├── screens/                 #   화면 PNG
│   └── variants/                #   variant 상태별 PNG
│
├── dropweb/                     # 📦 (자동 생성) 배포용 ZIP
│   └── dropweb_prototype.zip
│
└── (산출물)                     # 프로젝트 루트에 생성
    ├── index.html               # 프로토타입 뷰어
    ├── style.css
    ├── script.js
    ├── data.js
    ├── i18n.js
    ├── service-spec.md          # 서비스 기획서
    ├── translation_extract.json # 1단계 → 2단계 입력
    ├── translation_data.json    # 1단계 → 2단계 입력
    └── comments_data.json       # 2단계 코멘트 데이터
```

---

## 🎯 개발 원칙

이 시스템의 모든 개발을 안내하는 핵심 원칙입니다. 코드 변경 시 반드시 참고하세요.

### 1. 🧠 Think Before Coding (코딩하기 전에 생각하기)
**섣불리 가정하지 마세요. 헷갈리는 것을 숨기지 마세요. 트레이드오프를 명확히 밝히세요.**

- 가정을 명시적으로 밝히고, 불확실하면 질문하세요
- 여러 해석이 가능하다면 이를 모두 제시하세요
- 더 간단한 방법이 있다면 그렇다고 말하세요
- 무언가 명확하지 않다면 멈추고 질문하세요

### 2. ⚡ Simplicity First (단순함 우선)
**문제를 해결하는 최소한의 코드만 작성하세요. 추측성 코드는 작성하지 마세요.**

- 요청받은 것 이상의 기능을 추가하지 마세요
- 일회용 코드를 위해 추상화를 하지 마세요
- 요청받지 않은 "유연성"이나 "구성 가능성"을 추가하지 마세요
- 일어날 수 없는 시나리오에 대한 에러 처리를 하지 마세요
- 50줄로 끝낼 수 있는 코드를 200줄로 작성했다면 다시 작성하세요

> ❕ **스스로에게 물어보세요:** "시니어 엔지니어가 이 코드를 보고 너무 복잡하다고 할까?"

### 3. 🎯 Surgical Changes (외과 수술처럼 정교한 변경)
**반드시 필요한 부분만 건드리세요. 본인이 어질러놓은 것만 정리하세요.**

- 인접한 코드, 주석, 포맷팅을 굳이 "개선"하려 하지 마세요
- 망가지지 않은 것을 리팩토링하지 마세요
- 본인의 방식과 다르더라도 기존 코드 스타일을 따르세요
- 무관한 데드 코드를 발견하면 언급만 하고 삭제하지 마세요

> 🎯 **검증 기준:** 변경된 모든 줄은 사용자의 요청과 직접적으로 연결되어야 합니다.

### 4. 🚀 Goal-Driven Execution (목표 중심 실행)
**성공 기준을 정의하세요. 검증될 때까지 반복하세요.**

작업을 검증 가능한 목표로 변환하세요:
- "유효성 검사 추가" → "잘못된 입력에 대한 테스트를 작성하고, 이를 통과하게 만들기"
- "버그 수정" → "버그를 재현하는 테스트를 작성하고, 이를 통과하게 만들기"  
- "X 리팩토링" → "수정 전과 후 모두 테스트를 통과하는지 확인하기"

---

## 시작하기

### 사전 조건

- [Claude Code](https://claude.com/claude-code) — **Figma MCP 연결 필수** (3단계까지 쓰려면 Confluence MCP도 필요)
- Python 3.x

### 설치

```bash
# 1. 프로젝트 이름으로 clone
git clone https://github.com/hobong-ho6/planning_system_with_figma.git MyNewProject
cd MyNewProject

# 2. (선택) 원본 저장소 이력을 끊고 프로젝트 독립 저장소로 시작
rm -rf .git && git init

# 3. Python 의존성 설치
pip3 install -r scripts/requirements.txt
```

git 없이 쓰려면 GitHub의 **Code → Download ZIP**으로 받아 압축 해제 후 3번만 수행하면 됩니다.

### 실행

프로젝트 폴더에서 Claude Code를 실행하고(폴더의 `CLAUDE.md`가 자동 로드됨) 다음과 같이 요청합니다:

```
이 프로젝트로 Figma 프로토타입 생성해줘
Figma URL: https://www.figma.com/design/...
프로젝트 약어: XX_
```

Claude가 처리할 데이터 양(텍스트·화면 수)과 예상 소요 시간을 고지하고 확인을 받은 뒤, 1단계부터 순서대로 진행합니다. 위키 업데이트는 Confluence 페이지 URL을 주면서 별도로 요청합니다.

---

## ⚠️ 프로덕션 규칙

**이 시스템은 실제 프로덕션 환경에서 사용됩니다.** 데모/테스트/샘플링 모드는 절대 금지됩니다.

### 🚫 절대 금지

| 금지 사항 | 이유 |
|----------|------|
| ❌ "처음 N개만 처리" | 샘플링 금지 — 모든 데이터 완전 처리 필수 |
| ❌ "한국어, 영어만 먼저" | 일부 언어만 금지 — 5개 언어 동시 완전 번역 필수 |
| ❌ "대표 화면 몇 개만" | 일부 화면만 금지 — 모든 화면 완전 처리 |
| ❌ "검증은 나중에" | 검증 생략 금지 — `md/check.md` 3단계 검증 필수 |
| ❌ "절차를 간소화해서" | 간소화 금지 — 가이드 Step을 임의 축약·생략 금지 |

### ✅ 필수 수행

1. **전체 데이터 처리** — 모든 텍스트/화면/언어 완전 처리
2. **5개 언어 완전 번역** — ko_KR, ja_JP, en_US, th_TH, zh_TW 전부
3. **모든 화면 완전 처리** — 필터 규칙에 따른 대상 화면 전부
4. **검증 단계 필수** — P0 0건 확인 후 진행
5. **가이드 Step 완전 준수** — 임의 축약·통합·생략 금지
6. **사용자 확인 시 명확히 고지** — 처리량·예상 시간 명시 후 진행

**상세**: `md/PRODUCTION_RULES.md` 참조

---

## 📦 산출물 요약

| 단계 | 산출물 | 위치 | 용도 |
|:---:|--------|------|------|
| **1** | XLT 업로드용 엑셀 | `xlt/xlt_output_YYYYMMDDHHmmss.xlsx` | XLT System 업로드 (properties + plurals) |
| | 검증 리포트 | `xlt/*_validation_report.md` | P0/P1/P2 분류 및 수정 사항 |
| | JSON 산출물 | `translation_extract.json`<br/>`translation_data.json` | 2단계 입력 데이터 |
| **2** | 웹 프로토타입 | 프로젝트 루트<br/>`index.html + 4개 파일` | DropWeb 배포 가능한 정적 사이트 |
| | 화면 이미지 | `assets/screens/` | 전체 화면 PNG (scale 2x) |
| | Variant 이미지 | `assets/variants/` | 상태 전환 컴포넌트 PNG |
| | 배포 ZIP | `dropweb/dropweb_prototype.zip` | DropWeb 업로드용 (150MB 이하) |
| | 코멘트 데이터 | `comments_data.json` | 프로토타입 코멘트 표시용 |
| **3** | 위키 페이지 | Confluence | 화면 정의서 + 다국어 번역표 |
| | 첨부 이미지 | Confluence 서버 저장 | 코멘트 번호 어노테이션 포함 |

---

## 🚀 사전 준비된 리소스

**실행 시간을 50~70% 단축하기 위해 자동화 스크립트와 템플릿이 준비되어 있습니다.**

### 📁 필수 폴더 구조

```
프로젝트루트/
├── md/                  # 📚 절차 가이드 (필수)
├── scripts/             # 🔧 자동화 스크립트 (필수)
├── templates/           # 🎨 프로토타입 템플릿 (필수)
├── xlt/                 # 📦 번역 엑셀 출력 (자동 생성)
└── assets/              # 🖼️  이미지 출력 (자동 생성)
    ├── screens/
    └── variants/
```

### 🔧 자동화 스크립트 (`scripts/`)

| 파일 | 용도 | 사용 시점 |
|------|------|----------|
| `fetch_glossary.py` | 용어집 API 조회 → `glossary.json` | 1단계 Step 3 |
| `validate_translation.py` | 3단계 검증 (P0/P1/P2 분류) | 1단계 Step 5 |
| `export_to_xlt.py` | XLT 엑셀 생성 (properties + plurals) | 1단계 Step 7 |
| `build_prototype_data.py` | `data.js`/`i18n.js` 생성 + 무결성 검증 | 2단계 Step 5 |
| `setup_new_project.sh` | 새 프로젝트 초기화 (복사 + 폴더 + 검증) | 새 프로젝트 시작 |
| `test_validation.py` | 엑셀 규격·검증 로직 회귀 테스트 | `scripts/` 수정 후 |
| `requirements.txt` | Python 의존성 (`pandas`, `Pillow`, `openpyxl`, `requests`) | 최초 설치 |

**사용 예시**:
```bash
# 1단계 Step 3: 용어집 조회
python3 scripts/fetch_glossary.py

# 1단계 Step 5: 검증
python3 scripts/validate_translation.py xlt_validation_temp.xlsx scripts/glossary.json

# 1단계 Step 7: 엑셀 생성
python3 scripts/export_to_xlt.py

# 2단계 Step 5: data.js/i18n.js 생성 (입력 JSON 준비 후)
python3 scripts/build_prototype_data.py
```

### 🎨 프로토타입 템플릿 (`templates/`)

| 파일 | 설명 |
|------|------|
| `index.html` | 프로토타입 뷰어 HTML |
| `style.css` | 반응형 스타일 |
| `script.js` | 인터랙션 로직 (data.js 인터페이스 준수) |
| `data.js` | 데이터 구조 템플릿 (`APP_DATA` 전역 변수) |
| `i18n.js` | 번역 데이터 템플릿 (`I18N` 전역 변수) |

**사용 방법** (2단계 Step 5):
```bash
# 템플릿 복사
cp templates/* .

# 자동 생성 스크립트로 data.js/i18n.js 채우기
python3 scripts/build_prototype_data.py
```

### ⚡ 시간 단축 효과

| 방식 | 소요 시간 | 비고 |
|------|----------|------|
| **이전** (모든 코드 처음부터 작성) | 60~85분 | 수동 코딩 |
| **이후** (스크립트 + 템플릿) | 15~30분 | 자동화 |
| **단축률** | **50~70%** | - |

---

## 🔄 다른 프로젝트에서 재사용

### 필수 복사 항목 (4개)

새 프로젝트에서 이 워크플로우를 사용하려면 다음만 복사하세요:

```
원본 프로젝트/
├── CLAUDE.md           ✅ 복사 (워크플로우 가이드)
├── md/                 ✅ 복사 (절차 가이드 7개)
├── scripts/            ✅ 복사 (자동화 스크립트 전체)
├── templates/          ✅ 복사 (프로토타입 템플릿 5개)
└── .gitignore          ⚪ 복사 권장
```

### 복사 제외 항목 (산출물)

다음은 프로젝트별 산출물이므로 복사하지 않습니다:

```
❌ xlt/*.xlsx                    — 프로젝트별 번역 엑셀
❌ assets/screens/*.png          — 프로젝트별 화면 이미지
❌ assets/variants/*.png         — 프로젝트별 variant 이미지
❌ index.html, style.css, ...    — 프로토타입 코드 (templates/에서 생성)
❌ scripts/glossary.json         — 용어집 캐시 (자동 생성)
❌ translation_*.json/md         — 임시 파일
❌ dropweb/*.zip                 — 배포용 ZIP
```

### 새 프로젝트 시작 순서

#### 1️⃣ 자동 초기화 (권장)

```bash
# 복사 + 폴더 생성 + 검증 자동화
bash 원본/scripts/setup_new_project.sh 새프로젝트경로
```

#### 2️⃣ 의존성 설치

```bash
cd 새프로젝트경로
pip3 install -r scripts/requirements.txt
```

#### 3️⃣ 실행

```
Claude Code에서:
> 이 프로젝트로 Figma 프로토타입 생성해줘
> Figma URL: https://www.figma.com/design/...
> 프로젝트 약어: XX_
```

### 검증

새 프로젝트에서 다음을 확인:

```
✅ CLAUDE.md 파일 존재
✅ md/ 폴더에 7개 가이드 파일 존재
   (translate, prototype, wiki, guide, check, dropweb-guide, PRODUCTION_RULES)
✅ scripts/ 폴더에 7개 파일 존재
   (fetch_glossary, validate_translation, export_to_xlt, build_prototype_data,
    test_validation, setup_new_project.sh, requirements.txt)
✅ templates/ 폴더에 5개 템플릿 존재
   (index.html, style.css, script.js, data.js, i18n.js)
✅ Python 의존성 설치 완료
   pip list | grep -E "pandas|Pillow|openpyxl|requests"
```
