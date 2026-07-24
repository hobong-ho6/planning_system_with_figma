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
- **⛔ Flex 스펙 준수(필수)**: OA Flex JSON은 **`templates/flex_message_spec.json`**(LINE 공식 Flex Message bubble 스펙)의 구조·관례를 따른다 — `hero`(image, `size:full`·`aspectRatio`·`aspectMode:cover`·`action.uri`), `body`(vertical box + text 컴포넌트), `footer`(button `style:"link"`·`height:"sm"`). 산출물은 **bubble JSON**(스펙과 동일 레벨)로 낸다.
- **⛔ 언어별 개별 파일(필수)**: OA Flex는 **언어별로 JSON 파일을 따로** 만든다 — 프레임당 5개 파일 `flex_{프레임}_{lang}.json`(ko_KR·en_US·ja_JP·zh_TW·th_TH). **한 파일에 5개 언어를 묶지 않는다.** 텍스트·버튼 label만 언어별 치환, 구조·`{{변수}}`·`{{IMAGE_URL}}`·`{{ACTION_URL}}`는 동일.
- **⛔ Description 첨부(필수)**: 생성한 언어별 Flex JSON은 Confluence에 첨부하고, **해당 OA 화면의 Screen 표 Description 셀**에 언어별 다운로드 링크로 건다(intro 영역 아님). 5개 언어 링크를 그 화면 Description에 모두 표시한다.

---

## Flex 메시지 JSON 기본 골격 (스펙: `templates/flex_message_spec.json`)

기준 스펙은 **`templates/flex_message_spec.json`**(LINE 공식 Brown Cafe bubble). 이미지는 `hero`(+`action.uri`), 문구는 `body`, CTA는 `footer`(button `style:"link"`·`height:"sm"`)에 둔다. OA 메시지에 맞춘 골격(스펙 준수):

```json
{
  "type": "bubble",
  "hero": {
    "type": "image",
    "url": "{{IMAGE_URL}}",
    "size": "full",
    "aspectRatio": "20:13",
    "aspectMode": "cover",
    "action": { "type": "uri", "uri": "{{ACTION_URL}}" }
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      { "type": "text", "text": "초대친구 미션 완료!", "weight": "bold", "size": "xl", "wrap": true },
      { "type": "text", "text": "럭키볼 1개가 지급되었어요", "wrap": true, "margin": "md" },
      { "type": "text", "text": "* 당첨 보상은 즉시 지급됩니다. 최대 5분까지 소요됩니다.", "size": "sm", "color": "#999999", "wrap": true, "margin": "md" }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "spacing": "sm",
    "contents": [
      { "type": "button", "style": "link", "height": "sm",
        "action": { "type": "uri", "label": "뽑으러 가기", "uri": "{{ACTION_URL}}" } }
    ],
    "flex": 0
  }
}
```

- **언어별 개별 파일(필수)**: `ko_KR·en_US·ja_JP·zh_TW·th_TH` 각각 **별도 파일** `flex_{프레임}_{lang}.json`으로 생성한다(한 파일에 묶지 않음, 규칙 3). `text`·버튼 `label`만 언어별 치환.
- `url`·`uri`는 https 필수. 미입력 시 `{{IMAGE_URL}}`·`{{ACTION_URL}}` 플레이스홀더 유지 후 사용자에게 문의.
- 산출물은 `oa/flex_{프레임}_{lang}.json`으로 저장하고 Confluence에 첨부한다.

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
1. 토큰 확인 → OA 프레임/코멘트 원본 새로 조회(캐시 금지)
2. XLT 코멘트 문구 선별 → 중복 통합(같은 문구=같은 번역)
3. 한국어 원문 교정(게이트 1a) + 5개 언어 번역
4. 변수 후보 제안 → 사용자에게 변수 이름 문의 → {{이름}} 적용(5개 언어)
5. 번역 품질 게이트(P0=0 + 수동 3단계 + 리포트 + check_gate_report.py exit 0)
6. 이미지 URI 사용자 문의 → Flex 메시지 JSON을 **`templates/flex_message_spec.json` 스펙 준수 + 언어별 개별 파일(5개)** 로 생성({{IMAGE_URL}}·{{ACTION_URL}} 플레이스홀더) → Confluence 첨부 후 **각 화면 Description에 언어별 링크**
7. 위키 OA 섹션 반영(키 없는 번역표 + 이미지 + Flex JSON) + History
   (XLT 엑셀·전역 키 표는 건드리지 않는다)
```
