# OA(LINE 공식계정) 메시지 처리 규칙

> LINE 공식계정(OA, Official Account)으로 발송하는 푸시/알림 메시지의 다국어화·변수화·Flex 메시지 구현 규칙을 정의한다.
> OA 메시지는 화면(UI) XLT와 **관리 주체·시스템이 다르다**(LINE OA 콘솔/Messaging API에서 발송) — 그래서 XLT 시스템 키를 부여하지 않고 **번역·변수·Flex JSON만** 산출해 위키에 문서화한다.

---

## 적용 대상 판별

- 위키 **Screen 섹션의 `OA` 서브섹션**(`<h4>OA</h4>`)에 들어가는 프레임, 또는 프레임 이름/맥락이 LINE 공식계정 메시지(채팅 버블·푸시)인 경우.
- 일반 앱 화면(UIT/LV UI)은 이 문서가 아니라 `md/translate.md`·`md/wiki.md`의 XLT 키 규칙을 따른다.

---

## 핵심 3규칙 (예외 없음)

### 1. XLT 키 미부여 — 다국어 번역만
- OA 메시지의 XLT 코멘트 문구는 **XLT Key를 부여하지 않는다.**
- **XLT 업로드 엑셀(`xlt/`)·전역 「다국어 번역(XLT Full Translation)」 키 표에 넣지 않는다.**
- 대신 위키 **OA Screen 행의 번역 칸**에 **키 없는 번역표** `No | KR | JA | EN | TH | ZH-TW` 로 기재한다.
- 번역은 **output**이므로 `md/translate.md`의 **번역 품질 게이트(P0=0 + 수동 3단계 + 리포트 + `check_gate_report.py` exit 0)를 동일하게 수행**한다. (키만 없을 뿐 번역 검증은 생략하지 않는다.)
- 같은 문구는 같은 번역을 재사용한다(문구 자체가 식별자).

### 2. 변수 선언 — `{{ }}` 이중 중괄호, 이름은 사용자 정의
- OA 메시지의 가변 값(런타임 치환)은 **`{{변수이름}}` 이중 중괄호**로 선언한다. (UIT 화면의 `{{0}}`와 같은 이중 괄호 표기지만, OA는 **의미 있는 이름**을 쓴다 — 숫자 인덱스가 아님.)
- **변수화 대상 후보는 Claude가 제안**하고, **변수 이름은 반드시 사용자가 정의**한다(임의로 이름을 확정하지 않는다).
- 흔한 변수 후보: 당첨/지급 **금액**(예: `25JPYC`), **지갑 주소**(`0x8442...7c8`), **개수/횟수**(`1개`, `4번`), **기간/시간**(`최대 5분`, 날짜), **닉네임/마스킹 ID**(`hee12***`).
- 변수는 **5개 언어 모두 동일한 `{{이름}}`** 으로 넣고, 어순만 각 언어에 맞춘다.
- 마스킹 지갑 주소·샘플 금액 등은 디자인상 예시값이므로, 실제 발송 시 치환되는 값이면 변수화한다(고정 카피면 리터럴 유지 — 사용자 확인).

### 3. 첨부 이미지 → LINE Flex 메시지 JSON, 이미지 URI는 사용자 입력
- OA 메시지의 첨부 이미지는 **LINE Flex Message JSON(flex image)** 형태로 생성한다.
- 이미지 **URI(https)는 Claude가 임의로 넣지 않고 사용자에게 문의**해 입력받는다(입력 전에는 `{{IMAGE_URL}}` 플레이스홀더로 둔다).
- Flex 메시지의 텍스트 컴포넌트에는 규칙 2의 `{{변수이름}}`을 그대로 사용한다.
- **⛔ 최종 첨부본은 URL 실값 필수 (2026-07-27 확정)**: `hero.url`·`action.uri` 등 **URL 계열 필드는 LINE이 형식 검증**하므로 `{{IMAGE_URL}}`·`{{ACTION_URL}}` 플레이스홀더가 남아 있으면 **Flex Message Simulator·실발송 모두 렌더 거부**된다. 플레이스홀더는 값 미확정 단계의 중간 산출물로만 허용하며, **위키에 첨부하는 최종본은 반드시 실값 URL을 반영**한다. 반면 `text` 필드 안의 `{{변수}}`는 단순 문자열이라 그대로 두어도 동작한다.
  - **실값 출처**: 해당 OA 화면의 위키 Screen 표 **Description에 기입된 `IMAGE_URL`·`ACTION_URL`**(사용자 기입)을 매 실행 위키에서 새로 조회해 사용한다. 미기입이면 사용자에게 문의(그때까지만 플레이스홀더 유지).
- **⛔ Flex 스펙 준수(필수)**: OA Flex JSON은 **`templates/flex_message_spec.json`**(LINE 공식 Flex Message bubble 스펙)의 구조·관례를 기반으로 하되, 아래 **동작 검증 구조(캠페인 확정형)** 를 따른다. 산출물은 **bubble JSON**(스펙과 동일 레벨)로 낸다.
- **⛔ 언어별 개별 파일(필수)**: OA Flex는 **언어별로 JSON 파일을 따로** 만든다 — 프레임당 5개 파일 `flex_{프레임}_{lang}.json`(ko_KR·en_US·ja_JP·zh_TW·th_TH). **한 파일에 5개 언어를 묶지 않는다.** 텍스트·버튼 label만 언어별 치환, 구조·`{{변수}}`·URL 실값은 동일.
- **⛔ Description 첨부(필수)**: 생성한 언어별 Flex JSON은 Confluence에 첨부하고, **해당 OA 화면의 Screen 표 Description 셀**에 언어별 다운로드 링크로 건다(intro 영역 아님). 5개 언어 링크를 그 화면 Description에 모두 표시한다. **기존 첨부 갱신은 같은 파일명 유지 + `POST .../child/attachment/{attachmentId}/data`**(파일명이 같으면 Description 링크가 최신본을 그대로 렌더).

---

## Flex 메시지 JSON 동작 검증 구조 (캠페인 확정형 — 2026-07-27, 럭키볼 캠페인에서 시뮬레이터 동작 확인)

기준 스펙은 **`templates/flex_message_spec.json`**(LINE 공식 Brown Cafe bubble)이되, 실운영에서 동작 확인된 아래 구조를 따른다:

- **hero**: image, `size:"full"`·`aspectRatio:"20:13"`·`aspectMode:"cover"`. **`action`은 넣지 않는다**(동작 검증본 기준 — 버튼으로만 이동).
- **body**: vertical box — ① 타이틀 text(`weight:"bold"`·`size:"lg"`·`wrap:true`), ② 하위 box(vertical, `margin:"md"`·`spacing:"sm"`)에 본문·각주 text 컴포넌트(`size:"sm"`·`color:"#666666"`·`wrap:true`). 위키 번역표의 문단·각주는 **줄 단위로 별도 text 컴포넌트**로 나눈다(KR 셀의 문단 구조 그대로).
- **footer**: vertical box(`spacing:"sm"`) — **첫 번째(주) 버튼 `style:"primary"`·`color:"#000000"`**, 두 번째 이후 버튼 `style:"link"`·`color:"#000000"`, 공통 `height:"sm"`, `action:{type:"uri", label, uri}`. **빈 `contents:[]` box를 넣지 않는다**(검증 실패 요인).

```json
{
  "type": "bubble",
  "hero": {
    "type": "image",
    "url": "https://…(위키 Description 기입 IMAGE_URL 실값)",
    "size": "full",
    "aspectRatio": "20:13",
    "aspectMode": "cover"
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      { "type": "text", "text": "가입 완료! 친구가 보낸 🎁\n럭키볼 선물 1개가 도착했어요.", "weight": "bold", "size": "lg", "wrap": true },
      { "type": "box", "layout": "vertical", "margin": "md", "spacing": "sm", "contents": [
        { "type": "text", "text": "이제 친구를 직접 초대해서\n럭키볼 선물을 더 받을 수 있어요!", "size": "sm", "color": "#666666", "wrap": true },
        { "type": "text", "text": "* 당첨 보상은 즉시 지급됩니다. 최대 5분까지 소요됩니다.", "size": "sm", "color": "#666666", "wrap": true }
      ] }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "spacing": "sm",
    "contents": [
      { "type": "button", "style": "primary", "color": "#000000", "height": "sm",
        "action": { "type": "uri", "label": "럭키볼 선물 오픈하기✨", "uri": "https://…(위키 Description 기입 ACTION_URL 실값)" } },
      { "type": "button", "style": "link", "color": "#000000", "height": "sm",
        "action": { "type": "uri", "label": "확인하기", "uri": "https://…(버튼별 ACTION_URL 실값)" } }
    ]
  }
}
```

- **언어별 개별 파일(필수)**: `ko_KR·en_US·ja_JP·zh_TW·th_TH` 각각 **별도 파일** `flex_{프레임}_{lang}.json`으로 생성한다(한 파일에 묶지 않음, 규칙 3). `text`·버튼 `label`만 언어별 치환.
- `url`·`uri`는 **https 실값 필수**(규칙 3 — 플레이스홀더 잔존 시 시뮬레이터·실발송 렌더 거부). 값 미확정 단계에서만 `{{IMAGE_URL}}`·`{{ACTION_URL}}` 유지 후 사용자에게 문의.
- 산출물은 `oa/flex_{프레임}_{lang}.json`으로 저장하고 Confluence에 첨부한다.
- **확인 흐름 권장**: ko_KR 1건을 먼저 생성해 사용자가 [Flex Message Simulator](https://developers.line.biz/flex-simulator/)로 렌더 확인 → 통과 후 나머지 언어 일괄 생성·첨부.

---

## 위키 반영 (OA 섹션)

- 위치: Screen 섹션의 `<h4>OA</h4>` 서브섹션 아래 표.
- 컬럼: `Screen ID | Screen(이미지) | Description | 다국어 번역 (XLT 키 미부여)`
- 번역 칸: 키 없는 `No | KR | JA | EN | TH | ZH-TW` 중첩표(규칙 1). 변수는 `{{이름}}`으로 표기(규칙 2).
- 이미지: 번호 어노테이션(ⓝ↔No, 경계 clamp — `md/wiki.md` Step 4-B 규칙) 후 Confluence 첨부.
- **Flex JSON(언어별 5개)은 해당 화면 Description 셀에 첨부·링크**한다 — `Flex: [ko_KR] [en_US] [ja_JP] [zh_TW] [th_TH]` 형태 다운로드 링크(규칙 3). intro 영역이 아니라 화면별 Description에 둔다.
- History에 변경 행 추가(PIC=`Claude 자동 생성`).

---

## 절차 요약

```
1. 토큰 확인 → OA 프레임/코멘트·위키 OA 섹션 원본 새로 조회(캐시 금지)
   — 위키 각 화면 Description의 IMAGE_URL·ACTION_URL 기입값도 이때 함께 수집
2. XLT 코멘트 문구 선별 → 중복 통합(같은 문구=같은 번역)
3. 한국어 원문 교정(게이트 1a) + 5개 언어 번역
4. 변수 후보 제안 → 사용자에게 변수 이름 문의 → {{이름}} 적용(5개 언어)
5. 번역 품질 게이트(P0=0 + 수동 3단계 + 리포트 + check_gate_report.py exit 0)
6. Flex JSON 생성 — **"동작 검증 구조(캠페인 확정형)" + URL 실값(위키 Description 기입값)** 적용,
   언어별 개별 파일 5개. URL 미기입 화면만 플레이스홀더 유지 후 사용자 문의.
   ko_KR 먼저 생성 → 사용자 시뮬레이터 렌더 확인 → 나머지 언어 일괄 생성(권장)
7. Confluence 첨부(기존 첨부는 같은 파일명으로 POST .../child/attachment/{id}/data 갱신)
   → 각 화면 Description에 언어별 링크 확인
8. 위키 OA 섹션 반영(키 없는 번역표 + 이미지 + Flex JSON) + History
   (XLT 엑셀·전역 키 표는 건드리지 않는다)
```
