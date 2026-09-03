# GA Event 정의 규칙 (위키 Screen 표 `XLT & GA` 열)

> 위키 업데이트 시 **사용자가 GA Event 추가를 요청한 경우에만** 적용한다. 요청이 없으면 Event 표를 만들지 않는다.
> 화면별 GA(Google Analytics) 이벤트를 Screen 표의 `XLT & GA` 열에 **XLT 중첩표 아래 Event 표**로 정의한다.
> 참고 실측: 클리닉 예약 동선 개선(pageId=4667512757) · GuideKim 특정상거래법 표기(pageId=4639718809).

---

## 1. 열 이름 — `XLT` → `XLT & GA`

- Screen 표 4번째 열의 헤더는 **`XLT & GA`**다. storage XHTML에서는 `&`를 이스케이프해 **`<th>XLT &amp; GA</th>`**로 쓴다(raw `&`는 storage 파싱을 깨뜨린다).
- **신규 페이지**는 항상 `XLT & GA`로 만든다.
- **기존 페이지**는 GA Event를 추가하는 그 작업에서 헤더를 `XLT` → `XLT & GA`로 정정한다. GA 작업이 아닌 편집에서는 헤더를 건드리지 않는다(소급 금지).
- 컬럼 수는 그대로 **4개**다(`Screen ID | Screen | Description | XLT & GA`) — `scripts/check_wiki_storage.py pre`의 4컬럼 검사는 그대로 통과해야 한다. GA를 위한 5번째 열을 만들지 않는다.

---

## 2. 셀 구조 — XLT 중첩표 아래 `Event` 표

`XLT & GA` 셀은 위에서 아래로 다음 순서다.

1. XLT 중첩표 `No | XLT Key | KR` (`md/wiki.md` 'Screen 표 (XLT 컬럼)' 규칙 그대로)
2. `<h5>Event</h5>`
3. Event 표 `# | Event Name | Parameter`

```html
<td>
<table class="wrapped" data-mce-resize="false"><tbody>
<tr><th>No</th><th>XLT Key</th><th>KR</th></tr>
<tr><td>3</td><td><code>UF_clinic_bridge_consult_btn</code></td><td>LINE으로 상담하기</td></tr>
</tbody></table>
<h5>Event</h5>
<table class="wrapped" data-mce-resize="false"><tbody>
<tr><th>#</th><th>Event Name</th><th>Parameter</th></tr>
<tr><td>-</td><td>view_clinic_bridge_01</td><td>-</td></tr>
<tr><td>3</td><td>click_line_consult</td><td><br /></td></tr>
<tr><td>7</td><td>click_clinic_card</td><td>clinic_name, list_position</td></tr>
</tbody></table>
</td>
```

- 화면에 **XLT 키가 없으면** 중첩표를 생략하고 셀에 `<h5>Event</h5>` + Event 표만 넣는다(`-`를 쓰지 않는다).
- 한 화면에 Event 표는 **1개**다. `view` 행이 항상 첫 행, 그 아래 `click` 행을 `#` 오름차순으로 나열한다.
- 색상 강조(빨강 등)는 필수가 아니다 — 그 페이지의 기존 관행(신규 항목 강조 등)이 있으면 따른다.

---

## 3. view 이벤트 — 화면마다 1개 (필수)

| 항목 | 규칙 |
|---|---|
| 개수 | **화면(Screen 행)마다 정확히 1개**. 빠뜨리지 않는다 |
| `#` | `-` (특정 요소가 아니라 화면 진입 자체) |
| Event Name | **`view_` + Screen ID**. 예: Screen ID `kpick_clinic_bridge_01` → `view_kpick_clinic_bridge_01` |
| Parameter | `-` — 화면 식별은 GA `page_name`(= Screen ID)으로 이미 전달되므로 별도 파라미터를 지정하지 않는다. 사용자가 명시적으로 요청한 경우에만 추가 |

- **Screen ID가 한글·프레임명인 경우**(공식 룰 이전의 기존 페이지 등): `view_` 접두만 지키고 뒤에는 화면 의미를 나타내는 **영문 snake_case 이름을 제안**한다. 예: `결제화면` → `view_voucher_payment`, `Review` → `view_review_detail`. 제안 이름은 아래 §6 확인 흐름에서 사용자 확인을 받는다.
- 같은 화면이 **상태에 따라 다른 UI**로 노출되고 사용자가 구분을 원하면 접미사로 나눈다(예: 약관 미동의 = `view_..._agree`). 기본은 화면당 1개다.

---

## 4. click 이벤트 — 클릭·선택 가능 영역에 자동 부여

### 4-1. 대상 판별 (자동)
아래 중 하나에 해당하는 요소마다 `click_` 이벤트를 부여한다.
- **Description 정책 문장에 클릭·선택 동작이 있는 항목**: `선택 시`, `클릭 시`, `탭 시`, `누르면`, `이동`, `노출된다(바텀시트·팝업·모달을 여는 동작)` 등 사용자 조작을 전제로 한 문장
- **화면의 버튼·CTA·링크·카드·탭·토글**: Description에 문장이 없어도 화면(Figma 프레임)에서 버튼 형태로 식별되는 요소
- 제외: 단순 정보 표시(텍스트·이미지·유의사항), 시스템 자동 동작(자동 이동·타이머), 스크롤

### 4-2. 컬럼 규칙

| 항목 | 규칙 |
|---|---|
| `#` | **그 요소를 가리키는 스크린 어노테이션 번호**(= Description 통합 번호 = 이미지 ⓝ). 어디를 눌렀을 때 발생하는 이벤트인지 이 번호로 찾는다 |
| `#` 복수 | 같은 이벤트가 여러 요소에서 발생하면 번호를 묶는다 — 연속이면 `10~12`, 비연속이면 `3, 7` |
| `#` 없음 | 어노테이션(코멘트)이 없는 버튼이면 `#`을 `-`로 두고, **사용자에게 해당 요소의 Figma 코멘트 추가를 권장**한다(번호가 생기면 정정) |
| Event Name | **`click_` + 동작 대상**(영문 snake_case). 버튼 라벨·기능을 그대로 옮긴다. 예: `click_line_consult`, `click_copy_address`, `click_save`, `click_tab`, `click_clinic_card` |
| Parameter | **같은 이벤트가 여러 대상에서 발생해 구분이 필요할 때만** 파라미터를 쓴다. 쉼표 구분 snake_case. 예: 목록 카드 → `clinic_name, list_position` · 탭 → `tab_name` · 엔티티 상세 → `clinic_name`, `voucher_name`, `display_name`. 구분이 필요 없으면 빈칸 |

### 4-3. 이름 규칙 (view·click 공통)
- **소문자 영문 snake_case**, ASCII만. 한글·공백·하이픈 금지
- **40자 이내**(GA4 이벤트명·파라미터명 길이 제한)
- 동사 접두는 `view_`·`click_` 두 종류만 쓴다(`tap_`·`select_`·`open_` 금지 — 선택·탭도 `click_`)
- **같은 동작은 같은 이름을 재사용**한다(XLT의 "같은 문구=같은 키"와 같은 취지): 다른 화면의 동일 CTA(예: `click_consult`)는 새 이름을 만들지 않고 기존 이름을 쓴다. 페이지 안의 기존 Event 표를 먼저 훑어 재사용 후보를 찾는다
- 한 요소에 이벤트는 1개다. 같은 요소를 이름만 바꿔 중복 정의하지 않는다

---

## 5. 기존 Event 표가 있는 페이지 편집 시

- 이미 정의된 이벤트 이름은 **변경하지 않는다**(FE에 전달된 이름은 XLT Key와 같이 변경 불가로 본다). 규칙과 어긋나도 소급 정정하지 않고 사용자에게 보고만 한다.
- 새 화면·새 요소만 추가하고 기존 행은 보존한다. Description 번호가 재산출돼 `#`이 밀리면 `#`만 함께 갱신한다.

---

## 6. 절차 (위키 업데이트 흐름 안에서)

1. **트리거 확인**: 사용자 요청에 "GA event 추가"가 있는지 확인한다. 없으면 이 문서를 적용하지 않는다.
2. **입력 확보**: Screen ID(승인된 매핑 표), Description 통합 번호(`md/wiki.md` Step 3), 화면 이미지·어노테이션. 통합 번호가 확정되기 전에는 `#`을 매기지 않는다.
3. **초안 산출**: 화면마다 `view` 1행 + §4-1 대상마다 `click` 행을 만들어 **화면별 Event 표 초안을 사용자에게 제시**한다(한글 Screen ID의 제안 이름, `#`이 `-`인 항목, 파라미터 근거를 함께). 사용자 확인 후 반영한다.
4. **위키 반영**: `XLT & GA` 셀에 §2 구조로 삽입. 헤더가 `XLT`면 `XLT &amp; GA`로 정정. History 행에 "GA Event 정의 추가(view N·click M)"를 기록한다.
5. **검사**: `scripts/check_wiki_storage.py pre/post` exit 0(4컬럼 유지·`&amp;` 이스케이프).

---

## 7. 자주 하는 실수 (금지)

- ❌ `view` 이벤트를 일부 화면에만 정의 — **모든 Screen 행**에 1개씩
- ❌ `view`에 파라미터를 채움 — 기본 `-`(사용자 요청 시만)
- ❌ `#`에 임의 순번(1, 2, 3…)을 매김 — `#`은 **어노테이션 번호**이지 표의 행 번호가 아니다
- ❌ Event 표를 Description 열이나 별도 5번째 열에 넣음 — `XLT & GA` 셀 안, XLT 중첩표 아래
- ❌ `<th>XLT & GA</th>`처럼 raw `&`를 storage에 넣음 — `&amp;`
- ❌ 정보 표시용 텍스트(유의사항·병원명)에 `click_` 부여
