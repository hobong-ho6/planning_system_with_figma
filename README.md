# Planning System with Figma

Figma 디자인을 입력으로 받아 **다국어 번역(XLT) → 웹 프로토타입 → Confluence 위키 문서화**까지 자동으로 수행하는 Claude Code 기반 기획 워크플로우입니다.

Claude Code가 이 저장소의 `CLAUDE.md`와 `md/` 가이드를 읽고 전 과정을 진행하며, 반복 작업은 `scripts/`의 Python 스크립트와 `templates/`의 프로토타입 템플릿으로 자동화되어 있습니다.

```
Figma URL 입력
     │
     ▼
[1단계] 다국어 번역 + XLT Key 정의   (md/translate.md)
     │   산출물: XLT Key, 5개 언어 번역, 검증 리포트, XLT 업로드용 엑셀
     ▼
[2단계] 웹 프로토타입 생성           (md/prototype.md)
     │   산출물: 클릭 가능한 정적 웹 프로토타입 (XLT Key·번역 토글 포함)
     ▼
[3단계] Confluence 위키 업데이트     (md/wiki.md)
         산출물: 화면 정의서 + 다국어 번역표가 반영된 위키 페이지
```

각 단계는 독립 실행도 가능하고, 순차 파이프라인으로 연결할 수도 있습니다.

---

## 워크플로우 상세

### 1단계: 다국어 번역 + XLT Key 정의 (`md/translate.md`)

Figma 화면의 모든 텍스트를 추출해 XLT Key를 부여하고 5개 언어로 번역합니다.

| Step | 작업 | 사용 도구 |
|------|------|----------|
| 1 | Figma에서 모든 TEXT 노드 추출 (화면별, 좌표 포함) | Figma MCP |
| 2 | 텍스트마다 시맨틱 XLT Key 생성 (예: `KW_home_deposit`) | Claude |
| 3 | 용어집 API 조회 → `scripts/glossary.json` 캐시 | `scripts/fetch_glossary.py` |
| 4 | 5개 언어 번역 수행 — **ko_KR, ja_JP, en_US, th_TH, zh_TW 전체 필수** | Claude + `md/guide.md` 번역 규칙 |
| 5 | 3단계 검증 (한국어 맞춤법 → 용어집 위반 → 다국어 품질) 및 리포트 생성 | `scripts/validate_translation.py` + `md/check.md` |
| 6 | 화면별 요약표 + 전체 번역표 출력 | Claude |
| 7 | XLT System 업로드용 엑셀 생성 (`xlt/xlt_output_*.xlsx`) | `scripts/export_to_xlt.py` |

**검증 심각도 기준** (`md/check.md`):

| 심각도 | 대상 | 처리 |
|--------|------|------|
| 🔴 P0 | 빈칸, 오타, 언어 혼입, `/n` 오타, 용어집 표기 위반 | 즉시 수정 (검증 스크립트가 exit 1 반환) |
| 🟡 P1 | 표현 어색, placeholder 불일치, 용어 일관성 위반 | 검토 후 일괄 수정 |
| 🟢 P2 | 마침표/쉼표 등 스타일 선호 | 정책 결정 후 적용 |

⚠️ 검증 통과 전에는 Step 6(출력)·Step 7(엑셀 생성)으로 진행하지 않습니다.

### 2단계: 웹 프로토타입 생성 (`md/prototype.md`)

Figma 프로토타입 인터랙션을 분석해 브라우저에서 클릭 가능한 정적 웹 프로토타입을 만듭니다.

| Step | 작업 |
|------|------|
| 1 | Figma 메타데이터 조회 (화면 목록·크기) |
| 2 | 프로토타입 인터랙션(NAVIGATE, BACK 등) 추출 |
| 3 | 핫스팟(클릭 영역) 좌표 계산 |
| 4 | 화면 이미지 Export → `assets/screens/` |
| 5 | `templates/` 5개 파일을 복사하고 `data.js`에 화면·인터랙션 데이터 채우기 |
| 6 | **XLT Key 토글 기능** — 1단계 산출물(XLT Key + 번역)을 `i18n.js`에 주입, 화면 위에 Key/번역 오버레이 표시 |
| 7 | Variant Swap (CHANGE_TO 인터랙션 — 체크박스 등 상태 변화) 처리 → `assets/variants/` |
| 8 | Figma 코멘트 통합 (선택) |
| 9 | 검증 (모든 화면 이동·토글·핫스팟 동작 확인) |

프로토타입은 `md/dropweb-guide.md`의 정적 웹사이트 배포 규격(상대 경로 등)을 따르므로 그대로 배포할 수 있습니다.

**프로토타입 뷰어 기능**: 화면 간 클릭 내비게이션, 뒤로 가기, 5개 언어 전환(번역 오버레이), XLT Key 표시 토글, 코멘트 표시.

### 3단계: Confluence 위키 업데이트 (`md/wiki.md`)

1·2단계 산출물(화면 이미지, XLT Key, 번역표)을 Confluence 화면 정의서에 반영합니다.

| Step | 작업 |
|------|------|
| 1 | 대상 페이지 확인 (사용자가 위키 URL 제공) |
| 2 | 페이지 형식 결정 (History / Related Docs / Screen 표 / 다국어 번역 섹션) |
| 3 | Screen 표에 XLT 컬럼, 별도 섹션에 전체 번역표 작성 |
| 4 | 화면 이미지 첨부 처리 |
| 5 | Confluence MCP로 페이지 업데이트 |
| 6 | 결과 검증 |

---

## 폴더 구조

```
프로젝트루트/
├── CLAUDE.md            # Claude Code 워크플로우 가이드 (자동 로드)
├── md/                  # 절차 가이드 (7개)
│   ├── translate.md     #   1단계: 번역 절차
│   ├── prototype.md     #   2단계: 프로토타입 절차
│   ├── wiki.md          #   3단계: 위키 절차
│   ├── guide.md         #   XLT 번역 규칙 (톤앤매너·용어집·체크리스트)
│   ├── check.md         #   3단계 검증 체크리스트 (P0/P1/P2)
│   ├── dropweb-guide.md #   정적 웹사이트 배포 규격
│   └── PRODUCTION_RULES.md  # 프로덕션 필수 규칙
├── scripts/             # 자동화 스크립트
│   ├── fetch_glossary.py        # 용어집 API 조회 → glossary.json
│   ├── validate_translation.py  # 3단계 검증 (P0 발견 시 exit 1)
│   ├── export_to_xlt.py         # XLT 업로드용 엑셀 생성
│   ├── setup_new_project.sh     # 새 프로젝트 초기화
│   └── requirements.txt         # pandas, openpyxl, requests
├── templates/           # 프로토타입 템플릿 (index.html, style.css, script.js, data.js, i18n.js)
├── xlt/                 # (자동 생성) 번역 엑셀 출력
└── assets/              # (자동 생성) 화면·variant 이미지
```

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

## 프로덕션 규칙

이 시스템은 실제 프로덕션 환경 기준으로 동작합니다 (상세: `md/PRODUCTION_RULES.md`):

1. **전체 데이터 처리** — 샘플링·데모 모드 금지, 모든 텍스트/화면/언어 완전 처리
2. **5개 언어 완전 번역** — ko_KR, ja_JP, en_US, th_TH, zh_TW
3. **모든 화면 완전 처리** — 대표 화면만 처리 금지
4. **검증 단계 생략 금지** — `md/check.md` 3단계 검증 필수
5. **사용자 확인 시 명확히 고지** — 처리량·예상 시간 명시 후 진행

---

## 산출물 요약

| 단계 | 산출물 | 위치 |
|------|--------|------|
| 1 | XLT 업로드용 엑셀 (properties + plurals 시트) | `xlt/xlt_output_YYYYMMDDHHmmss.xlsx` |
| 1 | 번역 검증 리포트 | `xlt/*_validation_report.md` |
| 2 | 웹 프로토타입 (배포 가능한 정적 사이트) | 프로젝트 루트 `index.html` 외 4개 파일 |
| 2 | 화면·variant 이미지 | `assets/screens/`, `assets/variants/` |
| 3 | 갱신된 화면 정의서 | Confluence 페이지 |
