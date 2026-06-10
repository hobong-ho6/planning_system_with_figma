# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 대화원칙
항상 한국어로 대화하고 결과는 한글로 제공한다.

---

## 작업 파이프라인

이 프로젝트는 Figma 디자인을 기반으로 웹 프로토타입 생성, 다국어 번역, 위키 문서화를 수행합니다.
각 단계는 독립적으로 실행하거나 순차적으로 파이프라인으로 연결할 수 있습니다.

### 파이프라인 순서

```
[1] 다국어 번역 + XLT Key 정의 → [2] 프로토타입 생성 → [3] 위키 업데이트
         translate.md                   prototype.md           wiki.md
```

번역과 XLT Key를 먼저 확정한 뒤, 프로토타입에 XLT Key 확인 기능을 포함하여 생성한다.

### 모듈별 가이드

| 단계 | 파일 | 설명 | 트리거 |
|:---:|------|------|--------|
| 1 | `md/translate.md` | Figma 텍스트 추출 → XLT Key 정의 → 다국어 번역 | 사용자가 Figma URL 제공 시 가장 먼저 수행 |
| 2 | `md/prototype.md` | Figma → 웹 프로토타입 생성 (XLT Key 토글 포함) | 번역 완료 후 수행 |
| 3 | `md/wiki.md` | 화면/번역 데이터 → Confluence 위키 업데이트 | 사용자가 위키 URL 제공 + 업데이트 요청 시 |

### 참조 가이드

모든 가이드 문서는 `md/` 폴더에서 관리합니다. 새 가이드 추가 시 반드시 이 폴더에 생성하세요.

| 파일 | 용도 |
|------|------|
| `md/guide.md` | XLT 번역 규칙 (톤앤매너, 용어집, 품질 체크리스트) — `md/translate.md` 수행 시 필수 참조 |
| `md/check.md` | 3단계 번역 검증 체크리스트 (P0/P1/P2) — `md/translate.md` Step 5 수행 시 필수 참조 |
| `md/dropweb-guide.md` | 정적 웹사이트 배포 규격 — `md/prototype.md` 수행 시 필수 참조 |
| `md/PRODUCTION_RULES.md` | ⚠️ 프로덕션 환경 필수 규칙 — **모든 단계에서 필수 준수** |

### 실행 규칙
1. 각 단계 시작 전 `md/` 폴더의 해당 파일을 읽고 절차를 따른다
2. `md/translate.md` 실행 시 반드시 `md/guide.md`의 번역 규칙을 적용한다
3. `md/prototype.md` 실행 시 반드시 `md/dropweb-guide.md`의 배포 규격을 따른다
4. `md/prototype.md` 실행 시 `md/translate.md`의 산출물(XLT Key + 번역 데이터)을 입력으로 받아 XLT Key 토글 기능을 포함한다
5. 사용자에게 확인이 필요한 사항은 각 `.md`에 명시된 대로 질문한다
6. 파이프라인 전체 실행 시 이전 단계의 산출물을 다음 단계의 입력으로 사용한다

### ⚠️ 프로덕션 환경 필수 규칙

**이 시스템은 실제 프로덕션 환경에서 사용됩니다. 데모/테스트 모드 금지.**

핵심 5원칙 (상세 기준과 예시는 `md/PRODUCTION_RULES.md` 참조 — 모든 단계에서 필수 준수):

1. **전체 데이터 처리** — 샘플링·데모 모드 금지, 모든 텍스트/화면/언어 완전 처리
2. **모든 언어 완전 번역** — 5개 언어 필수: ko_KR, ja_JP, en_US, th_TH, zh_TW
3. **모든 화면 완전 처리** — 대표 화면만 처리 금지
4. **검증 단계 생략 금지** — `md/check.md`의 3단계 검증 필수 수행
5. **사용자 확인 시 명확히 고지** — 처리량·예상 소요 시간 명시 후 진행 확인

### md 폴더 관리 규칙
- 모든 가이드/절차 문서는 `md/` 폴더에만 생성·수정한다
- 프로젝트 루트에 가이드성 `.md` 파일을 생성하지 않는다 (CLAUDE.md, README.md, service-spec.md 제외)
- 새로운 절차가 필요하면 `md/` 폴더에 추가하고 CLAUDE.md의 모듈별 가이드 표를 업데이트한다

### 🚀 사전 준비된 리소스

**실행 시간 단축을 위해 다음 리소스가 미리 준비되어 있습니다:**

#### 📁 필수 폴더 구조
```
프로젝트루트/
├── md/                  # 절차 가이드 (필수)
├── scripts/             # 자동화 스크립트 (필수)
├── templates/           # 프로토타입 템플릿 (필수)
├── xlt/                 # 번역 엑셀 출력 (자동 생성)
└── assets/              # 이미지 출력 (자동 생성)
    ├── screens/
    └── variants/
```

#### 🔧 자동화 스크립트 (`scripts/`)
| 파일 | 용도 | 사용 시점 |
|------|------|----------|
| `fetch_glossary.py` | 용어집 API 조회 → glossary.json | 1단계 Step 3 |
| `validate_translation.py` | 3단계 검증 수행 (P0/P1/P2) | 1단계 Step 5 |
| `export_to_xlt.py` | XLT 엑셀 생성 (properties + plurals) | 1단계 Step 7 |
| `setup_new_project.sh` | 새 프로젝트 초기화 (복사 + 폴더 생성 + 검증) | 새 프로젝트 시작 시 |
| `requirements.txt` | Python 의존성 목록 | 최초 설치 시 |

**사용 예시**:
```python
# 1단계 Step 3: 용어집 조회
from scripts.fetch_glossary import fetch_glossary
glossary = fetch_glossary()

# 1단계 Step 5: 검증
from scripts.validate_translation import TranslationValidator
validator = TranslationValidator(excel_path, glossary_path)
issues = validator.run()

# 1단계 Step 7: 엑셀 생성
from scripts.export_to_xlt import create_xlt_excel
filepath = create_xlt_excel(translation_data, output_dir='xlt')
```

#### 🎨 프로토타입 템플릿 (`templates/`)
| 파일 | 설명 | 사용 시점 |
|------|------|----------|
| `index.html` | 프로토타입 뷰어 HTML | 2단계 Step 5 |
| `style.css` | 반응형 스타일 | 2단계 Step 5 |
| `script.js` | 인터랙션 로직 (data.js 인터페이스 준수) | 2단계 Step 5 |
| `data.js` | 데이터 구조 템플릿 | 2단계 Step 5 |
| `i18n.js` | 번역 데이터 템플릿 | 2단계 Step 5 |

**사용 방법**:
2단계 Step 5에서 템플릿을 프로젝트 루트로 복사 후 데이터 채우기:
```bash
cp templates/* .
# data.js, i18n.js에 실제 데이터 채우기
```

#### ⚡ 시간 단축 효과
- **이전**: 60-85분 (모든 코드를 처음부터 작성)
- **이후**: 15-30분 (스크립트 호출 + 템플릿 복사)
- **단축률**: 50-70%

---

## 🔄 다른 프로젝트에서 재사용

### 필수 복사 항목

**새 프로젝트에서 이 워크플로우를 사용하려면 다음 3가지만 복사하세요:**

```
원본 프로젝트/
├── CLAUDE.md           ✅ 복사 (워크플로우 가이드)
├── md/                 ✅ 복사 (절차 가이드 전체)
├── scripts/            ✅ 복사 (자동화 스크립트 전체)
├── templates/          ✅ 복사 (프로토타입 템플릿 전체)
└── .gitignore          ⚪ 복사 권장

새 프로젝트/
├── CLAUDE.md           ← 복사됨
├── md/                 ← 복사됨
├── scripts/            ← 복사됨
├── templates/          ← 복사됨
├── .gitignore          ← 복사됨
├── xlt/                ← 자동 생성됨
└── assets/             ← 자동 생성됨
```

### 복사 제외 항목

**다음은 프로젝트별 산출물이므로 복사하지 않습니다:**

- ❌ `xlt/*.xlsx` — 프로젝트별 번역 엑셀
- ❌ `assets/screens/*.png` — 프로젝트별 화면 이미지
- ❌ `assets/variants/*.png` — 프로젝트별 variant 이미지
- ❌ `index.html`, `style.css`, `script.js`, `data.js`, `i18n.js` — 프로젝트별 프로토타입 코드 (templates/에서 생성)
- ❌ `scripts/glossary.json` — 용어집 캐시 (자동 생성)
- ❌ `translation_*.json`, `translation_*.md` — 임시 파일

### 새 프로젝트 시작 순서

1. **복사 + 폴더 생성** (한 번에 수행, 복사·폴더 생성·검증 자동화)
   ```bash
   bash 원본/scripts/setup_new_project.sh 새프로젝트경로
   ```

2. **의존성 설치**
   ```bash
   cd 새프로젝트경로
   pip install -r scripts/requirements.txt
   ```

3. **실행**
   ```
   Claude에게: "이 프로젝트로 Figma 프로토타입 생성해줘"
   Figma URL: https://...
   프로젝트 약어: XX_
   ```

### 검증

새 프로젝트에서 다음을 확인:
- [ ] `CLAUDE.md` 파일 존재
- [ ] `md/` 폴더에 7개 가이드 파일 존재
- [ ] `scripts/` 폴더에 3개 Python 스크립트 + setup_new_project.sh + requirements.txt 존재
- [ ] `templates/` 폴더에 5개 템플릿 존재
- [ ] Python 의존성 설치 완료 (`pip list | grep pandas`)

---

## 🎯 개발 원칙

이 원칙들은 XLT System의 모든 개발을 안내하며, 코드 변경 시 반드시 참고해야 합니다.

### 🧠 1. 코딩하기 전에 생각하기 (Think Before Coding)
**섣불리 가정하지 마세요. 헷갈리는 것을 숨기지 마세요. 트레이드오프를 명확히 밝히세요.**

**구현 전 반드시 확인:**
- [ ] 가정을 명시적으로 밝히고, 불확실하면 질문하세요
- [ ] 여러 해석이 가능하다면 이를 모두 제시하세요 - 임의로 조용히 선택하지 마세요
- [ ] 더 간단한 방법이 있다면 그렇다고 말하세요. 필요하다면 이의를 제기하세요
- [ ] 무언가 명확하지 않다면 멈추세요. 무엇이 헷갈리는지 명시하고 질문하세요

### ⚡ 2. 단순함 우선 (Simplicity First)
**문제를 해결하는 최소한의 코드만 작성하세요. 추측성 코드는 작성하지 마세요.**

**개발 시 준수사항:**
- [ ] 요청받은 것 이상의 기능을 추가하지 마세요
- [ ] 일회용 코드를 위해 추상화를 하지 마세요
- [ ] 요청받지 않은 "유연성"이나 "구성 가능성"을 추가하지 마세요
- [ ] 일어날 수 없는 시나리오에 대한 에러 처리를 하지 마세요
- [ ] 50줄로 끝낼 수 있는 코드를 200줄로 작성했다면 다시 작성하세요

> ❕ **스스로에게 물어보세요:** "시니어 엔지니어가 이 코드를 보고 너무 복잡하다고 할까?"  
> 만약 그렇다면 단순화하세요.

### 🎯 3. 외과 수술처럼 정교한 변경 (Surgical Changes)
**반드시 필요한 부분만 건드리세요. 본인이 어질러놓은 것만 정리하세요.**

**기존 코드 수정 시:**
- [ ] 인접한 코드, 주석, 포맷팅을 굳이 "개선"하려 하지 마세요
- [ ] 망가지지 않은 것을 리팩토링하지 마세요
- [ ] 본인의 방식과 다르더라도 기존 코드 스타일을 따르세요
- [ ] 무관한 데드 코드를 발견하면 언급만 하고 삭제하지 마세요

**본인의 변경으로 인해 고립된 코드(orphans)가 발생한 경우:**
- [ ] 당신의 변경으로 인해 사용되지 않게 된 import/변수/함수를 제거하세요
- [ ] 요청받지 않는 한 기존에 있던 데드 코드를 지우지 마세요

> 🎯 **검증 기준:** 변경된 모든 줄은 사용자의 요청과 직접적으로 연결되어야 합니다.

### 🚀 4. 목표 중심 실행 (Goal-Driven Execution)
**성공 기준을 정의하세요. 검증될 때까지 반복하세요.**

**작업을 검증 가능한 목표로 변환하세요:**
- "유효성 검사 추가" → "잘못된 입력에 대한 테스트를 작성하고, 이를 통과하게 만들기"
- "버그 수정" → "버그를 재현하는 테스트를 작성하고, 이를 통과하게 만들기"  
- "X 리팩토링" → "수정 전과 후 모두 테스트를 통과하는지 확인하기"

**여러 단계로 이루어진 작업의 경우 간략한 계획을 명시하세요:**
```text
1. [단계] → 검증: [확인 사항]
2. [단계] → 검증: [확인 사항]  
3. [단계] → 검증: [확인 사항]
```

