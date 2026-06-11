# Figma → 웹 프로토타입 생성 절차

## 개요
Figma 파일의 프로토타입 인터랙션을 추출하여, 브라우저에서 동작하는 정적 웹 프로토타입을 생성하는 절차.

---

## 사전 조건
- Figma 파일 URL (node-id 포함)
- Figma Personal Access Token
- 출력 형식: `dropweb-guide.md` 규격 준수

---

## 절차

### ⚠️ 프로덕션 환경 주의사항

**이 절차는 실제 서비스의 프로토타입을 생성합니다:**

- ❌ 샘플 화면만 처리 금지: "대표 화면 몇 개만" 절대 금지
- ❌ 데모 모드 금지: "예시로 일부만" 절대 금지
- ✅ 전체 화면 필수: 프로토타입 플로우의 모든 화면 완전 처리
- ✅ 모든 인터랙션 포함: 모든 핫스팟, variant, 코멘트 포함

**시작 전 사용자에게 확인받을 내용:**
```
이 Figma 파일에서 프로토타입 플로우를 분석한 결과:
- 총 XX개 화면
- 총 YY개 인터랙션
- 총 ZZ개 텍스트 노드 (XLT Key 매핑)
- 총 WW개 variant

모든 화면과 인터랙션을 포함하여 프로토타입을 생성합니다.
예상 소요 시간: VV분

전체 프로토타입 생성을 진행하시겠습니까? (Y/N)
```

---

### Step 1: Figma 메타데이터 조회

**⚠️ 전체 화면 조회 필수**

1. URL에서 `fileKey`와 `nodeId` 추출
2. `get_metadata` 도구로 페이지 구조 확인
3. 직속 자식 프레임(화면) 목록 파악
   - ⚠️ 화면 크기를 기준으로 필터링하지 않는다 — 화면 크기는 프로젝트마다 다를 수 있으므로, 크기와 무관하게 페이지의 직속 자식 프레임을 모두 화면으로 취급한다

**조회 완료 후 보고:**
```
✓ 총 {total_frames}개 프레임 발견
- 화면 크기별 분포: {width}x{height} ({count}개), ...
```

### Step 2: 프로토타입 인터랙션 추출

**⚠️ 모든 인터랙션 추출 필수 — 일부만 추출 금지**

1. `use_figma`로 해당 페이지의 **모든** `reactions` 보유 노드 탐색
2. 추출 데이터:
   - 트리거 노드 ID, name, type
   - trigger type (ON_CLICK, ON_DRAG 등)
   - destination ID
   - transition (SMART_ANIMATE, duration, easing)
3. 결과에서 프로토타입 플로우에 연결된 **모든 화면 ID** 목록 도출
4. **페이지 소속 검증**: 도출된 각 화면 ID의 상위 페이지가 URL의 node-id(대상 페이지)와 일치하는지 확인
   - 인터랙션 destination은 페이지 경계를 넘을 수 있으므로, 검증 없이 수집하면 다른 페이지의 화면이 export 대상에 포함된다
   - 다른 페이지 소속 화면은 목록에서 **제외**하고, 제외된 화면 ID와 출처 페이지를 사용자에게 보고한다

**추출 완료 후 보고:**
```
✓ 총 {total_interactions}개 인터랙션 추출 완료
- ON_CLICK: {click_count}개
- ON_DRAG: {drag_count}개
- CHANGE_TO (variant): {variant_count}개
- 연결된 화면: {screen_count}개
```

**절대 금지:**
- ❌ "주요 플로우만" 추출 금지
- ❌ "첫 N개 화면만" 추출 금지

### Step 3: 핫스팟 좌표 계산
1. 인터랙션 트리거 노드의 `absoluteBoundingBox` 조회
2. 부모 화면 프레임의 `absoluteBoundingBox` 기준으로 상대 좌표 변환
3. 결과: `{ x, y, width, height }` — 화면 내 핫스팟 영역

### Step 4: 화면 이미지 Export
1. Figma REST API 사용:
   ```
   GET https://api.figma.com/v1/images/{fileKey}?ids={nodeIds}&scale=2&format=png
   ```
2. 반환된 URL에서 PNG 다운로드 → `assets/screens/` 저장
3. 파일명 규칙: `{nodeId에서 : → -}.png` (예: `51762-8511.png`)

### Step 5: 웹 프로토타입 생성
파일 구조:
```
project/
├── index.html          ← 프로토타입 뷰어
├── style.css           ← 스타일
├── script.js           ← 인터랙션 로직
├── data.js             ← 화면/핫스팟/코멘트 데이터
├── assets/screens/     ← 화면 PNG
└── service-spec.md     ← 서비스 기획서
```

#### data.js 구조
```javascript
const APP_DATA = {
  startScreen: "시작화면ID",
  screens: { "ID": { name, image, width, height } },
  interactions: [{ sourceScreen, trigger, destination, hotspot: {x,y,w,h}, label }],
  comments: [{ id, screenId, author, date, message, offset, resolved }]
};
```

#### script.js 핵심 기능
- 화면 전환: 핫스팟 클릭 → `navigateTo(screenId)`
- 뒤로가기: history 스택 기반
- 코멘트 토글: ON/OFF 버튼으로 핀 표시/숨김
- 핫스팟 디버그 모드: 영역 시각화

#### script.js ↔ data.js 인터페이스 계약 (필수)
script.js는 반드시 아래 전역 변수와 구조에 의존해야 한다. 독자적 데이터 구조를 만들지 않는다.

```javascript
// script.js가 참조하는 전역 변수:
APP_DATA.startScreen       // string — 시작 화면 ID (예: "51762:8511")
APP_DATA.screens[id]       // { name, image, width, height }
APP_DATA.interactions[]    // { sourceScreen, trigger, destination, hotspot:{x,y,w,h}, label }
APP_DATA.textNodes[id][]   // { text, xltKey?, x, y, w, h }
APP_DATA.comments[]        // { id, screenId, author, date, message, offset:{x,y}, resolved }

// i18n.js가 참조하는 전역 변수:
I18N[langCode][koreanText]  // 번역된 텍스트 반환
```

**위반 시 발생하는 문제:**
- `window.SCREENS`, `SCREENS['home']` 등 다른 변수명 사용 → TypeError
- `currentScreen: 'home'` 등 ID가 아닌 임의 값 사용 → 화면 못 찾음
- script.js를 병렬/위임 생성할 때 data.js를 참조하지 못하면 불일치 발생

**방지 규칙:**
1. script.js는 항상 data.js 생성 **이후**에 작성한다
2. script.js 첫 줄에서 `APP_DATA.startScreen`으로 초기화한다
3. 병렬 생성 또는 에이전트 위임 시, data.js의 인터페이스 구조를 프롬프트에 명시한다

### Step 6: XLT Key 토글 기능
`translate.md` 단계에서 생성된 XLT Key + 번역 데이터를 프로토타입에 통합한다.

#### 기능 동작
- 네비게이션 바에 "XLT Key" 토글 버튼 추가
- 토글 ON 시: 각 텍스트 위치에 XLT Key를 표시하는 오버레이 노출
- 토글 OFF 시: 오버레이 숨김, 원본 이미지만 표시
- 기존 언어 선택과 독립 동작 (언어 선택은 번역 텍스트 표시, XLT 토글은 Key 표시)

#### 텍스트 추출 시 주의사항
Figma의 `findAll(n => n.type === 'TEXT')`는 재귀적으로 모든 중첩 프레임/그룹 내부까지 탐색하므로, 프레임이 여러 겹으로 중첩되어 있어도 텍스트는 모두 추출된다. 추출 누락은 API 문제가 아니라 **data.js에 반영할 때 선별 과정에서 발생**한다.

**누락 원인 분석:**
- Figma API의 `findAll(n => n.type === 'TEXT')`는 재귀 탐색이므로 중첩 프레임/그룹 내부까지 모두 추출함
- 누락은 API 문제가 아니라, 추출 결과를 data.js에 수동 반영할 때 발생:
  - 반복되는 텍스트(Klaytn, KLAY 등)를 제외하면서 고유 텍스트도 함께 누락
  - Step별 제목(title)만 넣고 설명(desc)을 빠뜨림
  - 긴 화면에서 하단부 텍스트를 놓침
  - **위키에 XLT Key를 정의했지만 data.js에 xltKey를 매핑하지 않은 경우** — 위키 업데이트와 프로토타입 코드가 별도 단계에서 처리되면서 동기화 누락 발생

**필수 규칙:**
1. `findAll`로 추출한 **모든** TEXT 노드를 data.js에 포함한다
2. 번역 불필요 텍스트(숫자, 시간, 주소, 고유명사)는 `xltKey`를 부여하지 않되, 좌표는 포함한다
3. 추출 후 화면별 텍스트 개수를 Figma 원본과 대조하여 누락 여부를 검증한다
4. 중첩 구조 예시: `Frame > Group > Frame > Group > TEXT` — `findAll`이 모두 커버함

**검증 절차 (누락 방지):**
```javascript
// Figma에서 추출한 텍스트 수
const figmaCount = extractedTexts.length;
// data.js에 반영된 텍스트 수
const dataCount = APP_DATA.textNodes[screenId].length;
// 불일치 시 경고
if (figmaCount !== dataCount) {
  console.warn(`Screen ${screenId}: Figma ${figmaCount}개 vs data.js ${dataCount}개 — 누락 확인 필요`);
}
```
화면별 추출 완료 후 반드시 개수를 비교하고, 차이가 있으면 누락 항목을 식별하여 보완한다.

**위키 ↔ 프로토타입 동기화 검증:**
위키에 XLT Key가 정의된 텍스트는 반드시 data.js의 해당 textNode에 `xltKey` 필드가 매핑되어야 한다.
```
위키 XLT Key 수 ≤ data.js에서 xltKey가 있는 노드 수
```
위키에는 있는데 data.js에 없으면 → 프로토타입 오버레이 누락
data.js에는 있는데 위키에 없으면 → 위키 업데이트 누락

#### 데이터 구조 (data.js)
```javascript
textNodes: {
  "screenId": [
    { text: "한국어 원문", xltKey: "KW_home_deposit", x: 278, y: 199, w: 50, h: 16 },
    { text: "0x3f4E...8Fe4", x: 44, y: 630, w: 91, h: 17 },  // xltKey 없음 = 번역 불필요
    ...
  ]
}
```

#### 렌더링 로직 (script.js)
```javascript
function renderXltOverlays(screenId, container) {
  const nodes = APP_DATA.textNodes[screenId];
  nodes.forEach(node => {
    const el = document.createElement('div');
    el.className = 'xlt-overlay';
    el.textContent = node.xltKey;
    el.style.left = node.x + 'px';
    el.style.top = node.y + 'px';
    el.style.width = node.w + 'px';
    el.style.minHeight = node.h + 'px';
    container.appendChild(el);
  });
}
```

#### 스타일
```css
.xlt-overlay {
  position: absolute;
  background: rgba(59, 130, 246, 0.9);
  color: #fff;
  font-size: 10px;
  font-family: monospace;
  padding: 1px 4px;
  border-radius: 2px;
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 5;
}
```

#### 토글 상태 조합
| 언어 선택 | XLT 토글 | 표시 내용 |
|:---------:|:--------:|-----------|
| KO | OFF | 원본 이미지만 |
| KO | ON | 원본 이미지 + XLT Key 오버레이 |
| 기타 언어 | OFF | 원본 이미지 + 번역 텍스트 오버레이 |
| 기타 언어 | ON | 원본 이미지 + XLT Key 오버레이 (번역 대신 Key 표시) |

### Step 7: Variant Swap (CHANGE_TO 인터랙션)
Figma에서 "Change to" 액션으로 설정된 컴포넌트 상태 전환을 처리한다.

#### 대상
- 체크박스 ON/OFF
- 토글 스위치
- 라디오 버튼
- 탭 전환 등 variant set으로 구성된 인터랙션

#### 추출 방법
```javascript
// reactions에서 CHANGE_TO 액션 필터링
node.reactions.forEach(r => {
  r.actions.forEach(action => {
    if (action.navigation === 'CHANGE_TO' && action.destinationId) {
      // 해당 노드 위치(hotspot)와 destination variant ID 수집
    }
  });
});
```

#### 이미지 Export
- 각 variant 상태를 개별 PNG로 export (scale 4x, 작은 컴포넌트이므로)
- 저장 위치: `assets/variants/{nodeId}.png`
- source 상태 + destination 상태 모두 export

#### data.js 구조
```javascript
variantSwaps: [
  {
    screenId: "51762:5069",
    trigger: "ON_CLICK",
    hotspot: { x: 24, y: 1145, w: 16, h: 16 },
    label: "체크박스",
    states: [
      { id: "checked", image: "assets/variants/source.png", w: 16, h: 16 },
      { id: "unchecked", image: "assets/variants/dest.png", w: 16, h: 16 },
    ],
    defaultState: "checked"  // 화면 초기 진입 시 상태
  }
]
```

#### 렌더링 로직
- 해당 hotspot 위치에 현재 variant 상태의 이미지를 absolute로 배치
- 클릭 시 states 배열의 다음 항목으로 순환 전환
- `state.variantStates[stateKey]`로 각 컴포넌트의 현재 상태를 추적
- 화면 전환 시 상태는 유지됨 (뒤로가기 시에도 상태 보존)

#### 주의사항
- variant 이미지는 컴포넌트 크기에 맞게 hotspot 영역을 정확히 덮어야 함
- z-index를 hotspot(10)보다 낮게(8) 설정하여 네비게이션 핫스팟과 충돌 방지
- 같은 위치에 NAVIGATE와 CHANGE_TO가 모두 있으면 CHANGE_TO 우선 (상위 z-index)

### Step 8: 코멘트 통합 (선택)
1. Figma REST API로 코멘트 조회:
   ```
   GET https://api.figma.com/v1/files/{fileKey}/comments
   ```
   - ⚠️ 이 API는 **파일 전체의 코멘트**를 반환한다 (페이지 필터 파라미터 없음). 필터링 없이 사용하면 다른 페이지의 코멘트가 섞여 들어온다
2. 해당 페이지에 속하는 코멘트만 필터링 — **소속 페이지를 반드시 역추적**:
   - `client_meta.node_id`는 코멘트가 달린 개별 노드(화면 내부의 중첩 노드일 수 있음)를 가리키므로, 현재 페이지의 화면 프레임 ID 목록과 단순 대조하면 안 된다
   - 각 코멘트의 `client_meta.node_id`를 nodes API로 조회해 소속 페이지를 확인:
     ```
     GET https://api.figma.com/v1/files/{fileKey}/nodes?ids={node_ids}
     ```
     (응답의 각 노드 문서를 따라 최상위 페이지 ID 확인)
   - 소속 페이지 ID가 URL의 node-id(대상 페이지)와 일치하는 코멘트만 포함한다
3. `node_offset` 좌표를 화면 내 위치로 매핑
4. 팝오버는 `position: fixed`로 device-frame 밖에 렌더링 (잘림 방지)

### Step 9: 검증
- [ ] 브라우저에서 index.html 열어 클릭 네비게이션 확인
- [ ] 모든 핫스팟이 올바른 화면으로 이동하는지 확인
- [ ] 코멘트 토글 ON/OFF 정상 동작
- [ ] XLT Key 토글 ON 시 각 텍스트 위치에 Key가 정확히 표시되는지 확인
- [ ] 언어 선택과 XLT 토글 조합 동작 확인
- [ ] Variant Swap 클릭 시 컴포넌트 이미지가 전환되는지 확인
- [ ] 긴 화면(812px 초과) 스크롤 및 핫스팟/오버레이 위치 확인
- [ ] 모든 경로가 상대 경로인지 확인 (dropweb 규격)

---

## 사용자 확인 사항
프로토타입 생성 전 사용자에게 확인:
1. **범위**: 전체 화면 vs 인터랙션 연결 화면만 vs 핵심 플로우만
2. **시작 화면**: 어떤 화면을 첫 화면으로 설정할지
3. **코멘트 포함 여부**: 코멘트 오버레이 필요 여부

---

## 산출물과 재사용 범위

### 다른 프로젝트에 필요한 것
**`md/` 폴더만 있으면 된다.** 프로토타입 코드 파일(data.js, i18n.js, script.js 등)은 절차를 따라 매 프로젝트마다 새로 생성되는 산출물이다.

| 구분 | 파일 | 재사용 | 설명 |
|------|------|:------:|------|
| 가이드 | `md/prototype.md` | ✅ | 절차 가이드 — 모든 프로젝트에서 동일하게 참조 |
| 가이드 | `md/translate.md` | ✅ | 번역 절차 |
| 가이드 | `md/wiki.md` | ✅ | 위키 업데이트 절차 |
| 가이드 | `md/guide.md` | ✅ | 번역 규칙 (톤앤매너, 용어집) |
| 가이드 | `md/dropweb-guide.md` | ✅ | 정적 웹 배포 규격 |
| 산출물 | `data.js` | ❌ | 프로젝트별 화면/핫스팟/텍스트 데이터 — 새로 생성 |
| 산출물 | `i18n.js` | ❌ | 프로젝트별 번역 딕셔너리 — 새로 생성 |
| 산출물 | `script.js` | ❌ | 프로토타입 뷰어 로직 — 이 가이드 기반으로 생성 |
| 산출물 | `style.css` | ❌ | 프로토타입 스타일 — 이 가이드 기반으로 생성 |
| 산출물 | `index.html` | ❌ | 프로토타입 진입점 — 새로 생성 |
| 산출물 | `assets/screens/` | ❌ | 피그마에서 export한 PNG — 프로젝트별 |

### 새 프로젝트 시작 시
1. `md/` 폴더를 복사하거나 동일 위치에서 참조
2. CLAUDE.md의 파이프라인 순서에 따라 실행
3. 모든 코드 파일은 절차에 따라 자동 생성됨
