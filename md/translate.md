# Figma → 다국어 번역 절차

## 개요
Figma 파일에서 화면별 텍스트 노드를 추출하고, 다국어 번역을 수행하여 XLT Key 기반 번역 데이터를 생성하는 절차.

---

## ⚠️ 필수 참조
**번역 수행 시 반드시 `md/guide.md`를 따라야 합니다.**

`md/guide.md`에서 규정하는 사항:
- 톤앤매너 (언어별 말투 규칙)
- 핵심 용어집 (API를 통한 실시간 조회)
- 치환자/HTML 태그 보존 규칙
- 번역 예외 항목 (PIN, USDT, IDRP 등 번역하지 않는 용어)
- 출력 형식 (탭 구분 표)
- 품질 체크리스트

---

## 사전 조건
- Figma 파일 URL (페이지 node-id 포함)
- 대상 언어: KR, JA, EN, TH, ZH-TW (md/guide.md 기준)
- `md/guide.md` 파일 접근 가능

---

## 절차

### ⚠️ 프로덕션 환경 주의사항

**이 절차는 실제 서비스에 사용되는 번역 데이터를 생성합니다:**

- ❌ 샘플링 금지: "처음 10개만", "일부만" 절대 금지
- ❌ 데모 모드 금지: "예시로 몇 개만" 절대 금지
- ✅ 전체 처리 필수: 모든 텍스트, 모든 언어 완전 처리
- ✅ 사용자 확인: 처리할 텍스트 개수를 명시하고 진행 확인

**시작 전 사용자에게 확인받을 내용:**
```
이 Figma 파일에서 총 XXX개의 텍스트를 추출했습니다.
5개 언어(ko_KR, ja_JP, en_US, th_TH, zh_TW)로 완전 번역을 진행합니다.
예상 소요 시간: YY분

전체 번역을 진행하시겠습니까? (Y/N)
```

---

### Step 1: 텍스트 노드 추출

**⚠️ 전체 추출 필수 — 샘플링 금지**

1. `use_figma`로 대상 페이지 설정 (`setCurrentPageAsync`)
2. **추출 대상 프레임 필터링**: 현재 페이지의 직속 자식 프레임 중 이름이 `(New)`로 시작하는 프레임만 추출 대상으로 한다. 단, 이름이 `(x)`로 시작하는 프레임(작업 중단·삭제 예정)은 제외한다
   - 이 필터는 **번역 텍스트 추출에만 적용**된다 — 2단계 프로토타입은 전체 프레임·전체 인터랙션을 수집하고(`(x)` 포함), 3단계 위키는 `Case`/`(x)` 시작 프레임을 제외한다 (CLAUDE.md '단계별 프레임 필터 규칙' 참조)
   - 필터링 결과(대상 프레임 수 / 전체 프레임 수)를 사용자에게 보고한다
3. 대상 프레임에서 `findAll(n => n.type === 'TEXT')` 실행
   - ⚠️ `findAll`은 반드시 **현재 페이지의 자식 프레임**에서만 실행한다. document 루트에서 실행하면 파일 전체(다른 페이지 포함)가 탐색되어 다른 페이지의 텍스트가 섞여 들어온다
   - `setCurrentPageAsync`를 건너뛴 채 추출하지 않는다
4. 추출 데이터:
   - `characters` (텍스트 내용)
   - `x, y, w, h` (화면 내 상대 좌표)
5. 중복 텍스트 제거 및 고유 텍스트 목록 생성

**실무 팁 (MCP 도구 출력 제한):**
- `use_figma` 결과는 **약 20KB에서 잘린다** — 화면이 많으면 한 번에 전체를 반환하지 말고 **프레임당(또는 2~3개씩) 나눠 호출**한다
- 반복 텍스트(자산 목록 등)는 `{text, count, pos[]}` 형태로 **동일 텍스트를 그룹핑**해 반환하면 출력량이 크게 줄어든다 (89개 노드 → 고유 37개 수준)
- 추출 결과는 `translation_extract.json`으로 저장한다 — 2단계(프로토타입)의 textNodes/i18n 생성 입력으로 재사용되므로 재추출이 불필요해진다

**추출 완료 후 사용자에게 보고:**
```
✓ 총 {total_screens}개 화면에서 {total_texts}개 고유 텍스트 추출 완료
- 화면별 평균: {avg_per_screen}개
- 최소/최대: {min}/{max}개
```

### Step 2: XLT Key 생성
네이밍 규칙:
- 프리픽스: 프로젝트 약어 (예: `KW_` = Kaia Wallet)
- 화면/기능 구분: `KW_home_`, `KW_terms_`, `KW_agg_`
- 의미 있는 suffix: `_title`, `_desc`, `_btn`, `_label`
- 예시: `KW_home_deposit`, `KW_terms_agree_all`

**⚠️ 불변 규칙 (위반 시 프로토타입 i18n이 깨진다):**
1. **동일한 한국어 원문 = 반드시 1개의 키.** 같은 텍스트가 여러 화면·여러 맥락에 등장해도 키를 나누지 않는다 — 프로토타입 `I18N`은 한국어 텍스트를 키로 조회하므로 1:N 매핑이 불가능하다 (예: "전송하기"가 목록 버튼과 팝업 버튼에 모두 쓰여도 `KW_transfer_send_btn` 하나)
2. **번역 제외 판별 기준**: 한글이 없는 텍스트 중 숫자·금액·시간·지갑 주소·이메일·토큰 심볼(KLAY, USDT 등)·더미 데이터는 키를 부여하지 않는다. 단, **영문 UI 라벨**(예: `Imported wallet`, `Mnemonic wallet`)은 번역 대상일 수 있으므로 **사용자에게 포함 여부를 확인**한다
3. 브랜드명(Unifi 등) 단독 텍스트는 키를 부여하되 전 언어 동일 값으로 둔다 (guide.md 브랜드명 규칙)

### Step 3: 용어집 조회
**guide.md의 API 엔드포인트를 통해 최신 용어집을 반드시 조회:**
```bash
curl -s "https://landpress-content.line-scdn.net/contents/v2/projects/wdmwbfuv10x39bukv58ocevp/collections/web3_xlt_json/item" | jq '.body.exceptions'
```
- 번역 예외 항목 확인 (번역하지 않고 유지할 용어)
- 핵심 용어 번역 확인 (거래, 지갑, 토큰, 송금 등)

### Step 4: 번역 수행

**⚠️ 5개 언어 모두 완전 번역 필수 — 일부 언어만 번역 금지**

**guide.md 규칙 준수:**
1. 한국어 원문 분석 — 맞춤법/띄어쓰기 검토
2. 용어집 매칭 — 동일 용어는 용어집 번역 사용
3. **5개 언어 번역 생성 (모두 필수):**
   - ✅ ko_KR: 원문 (오타 수정)
   - ✅ ja_JP: 정중한 です・ます体
   - ✅ en_US: 간결하고 명확
   - ✅ th_TH: 정중한 표현
   - ✅ zh_TW: 정식 번체
4. 치환자 `{{0}}`, HTML 태그 `<span />` 보존
5. 번역 예외 항목 (USDT, IDRP 등) 원어 유지

**⚠️ 원문 교정·통합 시 alias 매핑 유지:**
- ko_KR 맞춤법 교정(예: `트랜젝션`→`트랜잭션`)이나 화면 간 표현 불일치 통합(near-duplicate 쌍을 1개 키로)을 했다면, **`{Figma 원문 → XLT Key}` alias 목록을 산출물에 함께 보존**한다
- 프로토타입 단계의 textNodes·i18n은 **교정 전 Figma 원문 텍스트**를 키로 매핑하므로, alias가 없으면 해당 텍스트의 XLT Key/번역 매핑이 누락된다
- 교정·통합 내역은 검증 리포트에 정리해 디자이너에게 원본 수정을 요청한다

**번역 진행 상황 보고:**
```
번역 중: {current}/{total} 텍스트 ({percent}%)
- ko_KR: ✓ 완료
- ja_JP: ✓ 완료
- en_US: ✓ 완료
- th_TH: ✓ 완료
- zh_TW: ✓ 완료
```

**절대 금지:**
- ❌ "ko_KR, en_US만 먼저 진행" 금지
- ❌ "나머지 언어는 나중에" 금지
- ❌ "일부 텍스트만 번역" 금지

### Step 5: 검증 및 품질 체크

**⚠️ 필수 참조: `md/check.md`의 3단계 검증 프로세스를 따라야 합니다.**

#### 5.1 초기 검증
- [ ] 용어집과 일치하는지 확인
- [ ] 치환자/태그 보존 확인
- [ ] 동일 문서 내 같은 용어 같은 번역 확인
- [ ] 톤앤매너 일관성 확인
- [ ] 번역 예외 항목이 원어 유지되는지 확인

#### 5.2 심화 검증 (md/check.md 기반)
**번역 데이터를 임시 엑셀로 저장 후 3단계 검증 수행:**

임시 엑셀은 `translation_data.json`의 rows를 Step 7과 동일 규격(properties/plurals 시트, 첫 컬럼명 공백)으로 변환해 프로젝트 루트에 `xlt_validation_temp.xlsx`로 생성하고, `TranslationValidator(엑셀경로, 'scripts/glossary.json')`로 검증한다. **검증 통과 후 임시 엑셀은 삭제**한다 (최종 엑셀은 Step 7에서 별도 생성).

**1단계: 한국어 맞춤법·띄어쓰기 검토**
- [ ] 오타 확인 (`미선` → `미션` 등)
- [ ] 맞춤법 (`되요` → `돼요`, `됬-` → `됐-`)
- [ ] 띄어쓰기 의존명사 (`유지시` → `유지 시`, `할수있-` → `할 수 있-`)
- [ ] 비표준 공백 (`\xa0` 등) 제거
- [ ] `/n` 오타 → `\n` 수정
- [ ] 표현 어색함 확인 (`미션하고` → `미션 완료하고`)
- [ ] 조사 누락 확인
- [ ] 종결 어미 일관성 (해요체 vs 합쇼체)

**2단계: 용어집 위반 확인**
- [ ] 한국어 키워드 매칭 (용어집 API 조회 결과 기준)
- [ ] 예외 패턴 표기 통일 (USDT, JPYC, PIN, API, URL, Apple, Google, IDRP)
- [ ] zh_TW 한자 변형 통일 (`產` U+7522 표준 번체)
- [ ] th_TH 자산 표기 일관성 (`สินทรัพย์`)
- [ ] 도메인 핵심 용어 일관성

**3단계: 다른 언어 번역 검토**
- [ ] 빈칸 확인 (모든 언어 셀 채워졌는지)
- [ ] 언어 혼입 (en_US 셀에 한글 등)
- [ ] placeholder 일치 (`{{0}}`, `{{1}}` 등)
- [ ] `/n` 오타 확인
- [ ] 컬럼 swap 탐지 (en_US ↔ ko_KR 등)
- [ ] ja_JP 한국어 직역 패턴 (`出席` → `チェックイン`)
- [ ] 한 문장 내 단어 중복
- [ ] 마침표 일관성 (언어별 관습 준수)

#### 5.3 검증 리포트 생성 및 사용자 확인

**검증 결과를 리포트 형식으로 정리:**

```markdown
# 번역 검증 리포트

## Executive Summary
| 심각도 | 건수 | 카테고리 |
|--------|------|----------|
| 🔴 P0 (Critical) | X건 | 빈칸, 오타, 언어 혼입, 용어집 표기 위반 |
| 🟡 P1 (Medium) | X건 | 표현 어색, placeholder 불일치, 일관성 위반 |
| 🟢 P2 (Low) | X건 | 스타일 선호 (마침표, 쉼표) |

## 1단계: 한국어 검토 결과
[발견 사항 상세]

## 2단계: 용어집 위반 결과
[발견 사항 상세]

## 3단계: 다른 언어 검토 결과
[발견 사항 상세]

## 권장 수정 사항
[우선순위별 수정 항목]
```

**사용자 확인 절차:**
1. 검증 리포트를 사용자에게 제시
2. P0 (Critical) 항목은 즉시 수정 제안
3. P1/P2 항목은 사용자 판단 요청
4. 사용자 승인 후 다음 단계 진행

**검증 통과 기준:**
- P0 항목: 0건 (모두 수정 완료)
- P1 항목: 사용자 확인 완료
- P2 항목: 정책 결정 완료

⚠️ **검증 통과 전에는 Step 6 (출력) 및 Step 7 (엑셀 생성)으로 진행하지 않습니다.**

---

### Step 6: 출력
두 가지 형태로 출력:

#### A. 화면별 요약 (Screen 표에 삽입용)
```
| XLT Key | KR |
|---|---|
| KW_home_deposit | 입금하기 |
```

#### B. 전체 번역표
```
| XLT Key | KR | JA | EN | TH | ZH-TW |
|---|---|---|---|---|---|
| KW_home_deposit | 입금하기 | 入金する | Deposit | ฝาก | 存入 |
```

---

### Step 7: 엑셀 파일 생성
번역 데이터를 XLT System 업로드용 엑셀 파일로 변환합니다.

**파일 저장 위치:**
```
프로젝트루트/xlt/xlt_output_{날짜시간}.xlsx
예: xlt/xlt_output_20260610223056.xlsx
```
- xlt 폴더가 없으면 자동 생성
- 파일명 형식: `xlt_output_YYYYMMDDHHmmss.xlsx`
- 프로젝트 폴더 내에서 XLT 파일을 통합 관리

**엑셀 구조:**

#### Sheet 1: properties
| 컬럼 | 설명 | 예시 |
|------|------|------|
| Unnamed: 0 | XLT Key (컬럼명은 공백) | `KW_home_deposit` |
| en_US | 영어 번역 | `Deposit` |
| ko_KR | 한국어 번역 | `입금하기` |
| ja_JP | 일본어 번역 | `入金する` |
| zh_TW | 중국어 번역 (번체) | `存入` |
| th_TH | 태국어 번역 | `ฝาก` |

**중요:**
- 첫 번째 컬럼은 헤더가 없어야 합니다 (`Unnamed: 0`으로 pandas가 인식)
- 줄바꿈이 포함된 텍스트는 셀 내에 그대로 유지 (`\n` 문자 보존)
- 모든 셀은 텍스트로 저장 (빈 값 없음)

#### Sheet 2: plurals
복수형 처리 규칙 (고정값):

| Unnamed: 0 | en_US | Unnamed: 2 | ko_KR | ja_JP | zh_TW | th_TH |
|------------|-------|------------|-------|-------|-------|-------|
| (빈 값) | one | other | other | other | other | other |

**생성 방법:**
Python pandas 사용 (openpyxl 엔진):
```python
import pandas as pd
from datetime import datetime
import os

# xlt 폴더 생성
xlt_dir = 'xlt'
os.makedirs(xlt_dir, exist_ok=True)

# 번역 데이터를 DataFrame으로 변환
df_props = pd.DataFrame(translation_data)

# plurals 시트 데이터
df_plurals = pd.DataFrame([{
    'Unnamed: 0': None,
    'en_US': 'one',
    'Unnamed: 2': 'other',
    'ko_KR': 'other',
    'ja_JP': 'other',
    'zh_TW': 'other',
    'th_TH': 'other'
}])

# 엑셀 파일 생성
filename = f"{xlt_dir}/xlt_output_{datetime.now().strftime('%Y%m%d%H%M%S')}.xlsx"
with pd.ExcelWriter(filename, engine='openpyxl') as writer:
    df_props.to_excel(writer, sheet_name='properties', index=False)
    df_plurals.to_excel(writer, sheet_name='plurals', index=False)

print(f"✓ XLT 엑셀 파일 생성: {filename}")
```

**검증:**
- [ ] xlt 폴더가 생성되었는지 확인
- [ ] properties 시트에 모든 XLT Key와 번역이 포함되었는지 확인
- [ ] 첫 번째 컬럼명이 비어 있는지 확인 (Unnamed: 0)
- [ ] 줄바꿈 문자가 보존되었는지 확인
- [ ] plurals 시트가 고정 포맷대로 생성되었는지 확인
- [ ] Excel에서 파일을 열어 데이터 무결성 확인

---

## 산출물 스키마 (다음 단계 입력 — 파일명·구조 고정)

후속 단계(`scripts/build_prototype_data.py`)가 아래 두 파일을 그대로 읽으므로 **파일명과 구조를 바꾸지 않는다**:

```jsonc
// translation_extract.json — Step 1 산출물
{
  "fileKey": "...", "pageId": "...", "pageName": "...",
  "screens": [
    { "id": "51762:2592", "name": "(New) 자산 전송 팝업", "w": 375, "h": 812,
      "total": 88,            // 이 화면의 전체 텍스트 노드 수 (검증 기준값)
      "items": [ { "t": "텍스트 원문", "n": 14, "pos": [[x,y,w,h], ...] } ] }
  ]
}

// translation_data.json — Step 2~4 산출물
{
  "rows": [ { "xlt_key": "KW_...", "ko_KR": "...", "en_US": "...", "ja_JP": "...", "zh_TW": "...", "th_TH": "..." } ],
  "aliases": { "교정 전 Figma 원문": "XLT Key" }   // ko_KR 교정·표현 통합 시 반드시 채움
}
```

---

## 웹 프로토타입 다국어 적용 (선택)
번역 데이터를 웹 프로토타입에 적용할 경우:
1. `i18n.js` 파일에 언어별 딕셔너리 생성
2. `data.js`에 화면별 텍스트 좌표 추가 (`textNodes`)
3. 언어 선택 UI 추가
4. 한국어 이외 언어 선택 시 해당 좌표에 번역 텍스트 오버레이
