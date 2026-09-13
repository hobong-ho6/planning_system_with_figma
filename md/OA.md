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

#### 2-1. ⛔ 표준 변수명 — 용어집 `oa_variables`가 정본 (2026-08-05 신설)

한 번 사용자가 확정한 변수명은 **용어집(`web3_xlt_json`)의 `oa_variables` 영역에 등재**되고, 그 뒤로는 **같은 의미에 같은 이름을 재사용**한다. 등재된 변수는 규칙 2의 "사용자에게 이름을 문의" 대상이 아니다 — 이미 확정된 것이므로 **문의 없이 그대로 쓴다**. 새 의미의 변수만 사용자에게 이름을 묻는다.

| 변수 | 의미 | 예시 | 비고 |
|---|---|---|---|
| **`{{total_amount}}`** | 지급된 당첨금 **총액**(JPYC 단위 숫자) | `25` | **`{{amount}}`를 대체**(2026-08-05 사용자 확정). 신규 작업에 `{{amount}}`를 쓰지 않는다 |
| `{{wallet_address}}` | 당첨금이 지급된 지갑 주소(마스킹) | `0x8442...7c8` | ko는 조사가 갈리므로 **`{{wallet_address}} 주소로`** 처럼 명사를 넣어 조사를 고정 |

- 숫자와 통화 코드는 **한 칸 띄운다** — `{{total_amount}} JPYC` (`md/guide.md` §5-1).
- **기존 산출물의 소급 치환은 하지 않는다.** `{{amount}}`를 쓴 과거 캠페인 OA 파일은 그대로 두고, **신규·수정 작업부터** `{{total_amount}}`를 적용한다(소급이 필요하면 사용자가 지시).
- **`altText`에는 변수를 쓸 수 없다**(2026-08-05 사용자 확정). 봉투 텍스트는 고정 문구로만 작성하며, 금액 등 가변 값을 넣자는 제안을 하지 않는다.

### 3. 첨부 이미지 → LINE Flex 메시지 JSON, 이미지 URI는 사용자 입력
- OA 메시지의 첨부 이미지는 **LINE Flex Message JSON(flex image)** 형태로 생성한다.
- 이미지 **URI(https)는 Claude가 임의로 넣지 않고 사용자에게 문의**해 입력받는다(입력 전에는 `{{IMAGE_URL}}` 플레이스홀더로 둔다).
- Flex 메시지의 텍스트 컴포넌트에는 규칙 2의 `{{변수이름}}`을 그대로 사용한다.
- **⛔ 최종 첨부본은 URL 실값 필수 (2026-07-27 확정)**: `hero.url`·`action.uri` 등 **URL 계열 필드는 LINE이 형식 검증**하므로 `{{IMAGE_URL}}`·`{{ACTION_URL}}` 플레이스홀더가 남아 있으면 **Flex Message Simulator·실발송 모두 렌더 거부**된다. 플레이스홀더는 값 미확정 단계의 중간 산출물로만 허용하며, **위키에 첨부하는 최종본은 반드시 실값 URL을 반영**한다. 반면 `text` 필드 안의 `{{변수}}`는 단순 문자열이라 그대로 두어도 동작한다.
  - **실값 출처**: 해당 OA 화면의 위키 Screen 표 **Description에 기입된 `IMAGE_URL`·`ACTION_URL`**(사용자 기입)을 매 실행 위키에서 새로 조회해 사용한다. 미기입이면 사용자에게 문의(그때까지만 플레이스홀더 유지).
- **⛔ Flex 스펙 준수(필수)**: OA Flex JSON은 **`templates/flex_message_spec.json`**(LINE 공식 Flex Message bubble 스펙)의 구조·관례를 기반으로 하되, 아래 **동작 검증 구조(캠페인 확정형)** 를 따른다. 산출물은 **bubble JSON**(스펙과 동일 레벨)로 낸다.
- **⛔ 언어별 개별 파일(필수)**: OA Flex는 **언어별로 JSON 파일을 따로** 만든다 — 프레임당 5개 파일 `flex_{프레임}_{lang}.json`(ko_KR·en_US·ja_JP·zh_TW·th_TH). **한 파일에 5개 언어를 묶지 않는다.** 텍스트·버튼 label만 언어별 치환, 구조·`{{변수}}`·URL 실값은 동일.
- **⛔ Description 첨부(필수) — zip 통합(2026-07-27 변경)**: 생성한 언어별 Flex JSON 5개는 **화면별로 하나의 zip(`flex_{프레임}_5lang.zip`)으로 묶어** Confluence에 첨부하고, **해당 OA 화면의 Screen 표 Description 셀**에 zip 다운로드 링크 1개로 건다(intro 영역 아님. 라벨 예: `전체 언어 다운로드 (ko·ja·en·th·zh)`). 언어별 JSON을 개별 링크로 나열하지 않는다 — 사용자가 하나씩 내려받는 불편을 없애기 위한 결정. 개별 JSON 파일 산출물(`oa/flex_{프레임}_{lang}.json`)은 그대로 생성·보관하고 zip으로만 묶는다. **기존 첨부 갱신은 같은 파일명 유지 + `POST .../child/attachment/{attachmentId}/data`**(파일명이 같으면 Description 링크가 최신본을 그대로 렌더).

#### 3-0. ⛔ 히어로 이미지 규격 — 받은 이미지는 매번 실측 검증 (2026-09-11 신설, 다음 작업부터 적용)

**디자이너·사용자가 전달한 hero 이미지는 URL을 JSON에 넣기 전 항상 실측한다.** 시뮬레이터는 이미지의 픽셀 크기·용량을 **검사하지 않아** 규격 위반을 통과시키므로, "시뮬레이터에서 보였다"는 검증이 아니다.

| 항목 | 규격 (LINE 공식 Flex Image `url`) |
|---|---|
| 프로토콜 | HTTPS (TLS 1.2 이상) |
| 포맷 | JPEG / PNG (투명 PNG 가능 — 버블 흰 배경에 합성됨) |
| **최대 픽셀** | **1024 × 1024 px** — 초과 시 실발송 표시 보장 안 됨 |
| 용량 | 최대 10MB (**1MB 이하 권장** — 표시 지연 방지) |
| URL | 2,000자 이내 |
| `aspectRatio` | **이미지 실제 비율과 일치**시킨다(`gcd`로 약분한 정수비). 불일치 시 `cover`에서 잘리거나 여백이 생긴다 |

**검증 절차(필수)** — 5장을 한 번에 실측하고 결과를 사용자에게 보고한다:

```python
import json,urllib.request,io,math
from PIL import Image
for l,u in URLS.items():                      # {lang: url}
    r=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'}))
    b=r.read(); im=Image.open(io.BytesIO(b)); W,H=im.size; g=math.gcd(W,H)
    print(l, r.status, f'{W}x{H}', f'aspect {W//g}:{H//g}', f'{len(b)//1024}KB',
          'OK' if W<=1024 and H<=1024 and len(b)//1024<=1024 else 'NG')
```

점검 항목: ⓐ 5장 **200 OK** ⓑ 픽셀·용량 한도 ⓒ **5장 크기·비율 동일** ⓓ `aspectRatio`를 실측 비율로 설정 ⓔ **언어별 이미지 내 문구 육안 확인**(교차 오배치·문구 변경 탐지 — 디자이너가 문구를 바꿔 보낼 수 있다. 바뀌었으면 위키 번역표의 히어로 문구 행을 **적용값으로** 갱신하고 게이트 리포트에 기록) ⓕ 여백 과다(카드가 캔버스의 절반 수준) 시 재추출 요청.

**export 함정(실측)**: Figma 프레임 480×300을 **2x**로 내보내면 960×600이어야 하지만, **드롭 섀도 영역이 export 범위에 포함**돼 1120×760이 되어 한도를 넘었다. 프레임 크기 × 배율로 계산하지 말고 **받은 파일을 실측**한다. 한도 초과 시 1x 또는 1.5x 재추출을 요청한다(다운스케일 대응보다 재추출이 정석).

#### 3-1. ⛔ OA 문구를 바꾸면 아래가 항상 세트다 (2026-08-05 신설 · 2026-09-12 확장)

**OA 문구를 한 글자라도 수정하면 아래를 같은 작업에서 모두 갱신하고, 라운드트립으로 검증한다.** 하나라도 빠지면 **문서상 문구와 실제 발송 문구가 어긋난다.**

| # | 대상 | 확인 방법 |
|---|---|---|
| ⓐ | **위키 Screen 표의 다국어 번역 셀** | 라이브 재조회로 5개 언어 반영 확인 |
| ⓑ | **위키 「샘플 JSON(KR)」 칸**(2026-09-12 추가) | 라이브 재조회 후 JSON 파싱 + 구 문구 잔존 0건 |
| ⓒ | **언어별 Flex JSON**(`oa/flex_{프레임}_{lang}.json` 5개) | JSON 파싱 + 구 문구 잔존 0건 |
| ⓓ | **zip 첨부**(`flex_{프레임}_5lang.zip`) | **첨부를 다시 내려받아** 압축 해제 후 5파일 전수 재검증 |
| ⓔ | **렌더 이미지**(`oa_flex_{슬러그}.png`, 2026-09-12 추가) | `render_oa_flex.py` 재실행 → 같은 파일명으로 첨부 갱신 → 렌더 확인 |
| ⓕ | **Landpress 항목**(등록했다면) | 언어별 PUT 후 공개 조회 API 재조회 대조 |
| ⓖ | **LIAM HUB Event Message**(등록했다면) | Landpress를 다시 `LOAD MESSAGE` → 확인 → `UPDATE` (Landpress만 고치면 발송 메시지는 구 문구다) |

**왜 차단 체크인가**: `Flex JSON·zip`은 **OA 콘솔·Messaging API에 그대로 넣는 발송 원본**이다. 위키 표만 고치면 문서는 최신인데 **실제 발송은 구 문구**가 나간다.

> **실측 사례(2026-08-05)**: 「럭키볼 친구소개 비실시간 지급 변경」에서 위키 표 12곳(4개 언어)만 고치고 **Flex zip 3종·JSON 15개를 구 문구(`즉시 지급`·`최대 5분`)로 방치**했다. 사용자가 "json도 업데이트한거지?"라고 묻기 전까지 발견되지 않았다. 그 상태로 발송했다면 **지급 시점을 즉시로 잘못 안내**하게 된다.

**첨부 갱신 시 파일명 주의(같은 실측 세션에서 재발)**: `curl -F "file=@/tmp/newzip_xxx.zip"` 처럼 **임시 파일명으로 올리면 curl이 basename을 파일명으로 보내 첨부 제목이 바뀌고 Description 링크가 깨진다.** 반드시 **`-F "file=@경로;filename=원래이름"`** 으로 원래 파일명을 명시하거나, 업로드 직전 원래 이름으로 복사한다. 갱신 후 첨부 목록을 조회해 **파일명이 그대로인지 확인**한다.

**다른 문서에서 OA 영역을 복사해 올 때**: `<ri:attachment ri:filename>`은 **같은 페이지의 첨부만** 가리킨다. 섹션만 복사하면 참조가 전부 깨지므로 **원본 첨부 파일을 내려받아 같은 파일명으로 새 페이지에 업로드**한다(`<ri:page>`로 다른 페이지 첨부를 가리키는 방식은 금지). 복사 후 사용하지 않게 된 첨부는 **본문 참조 0건을 확인하고 사용자 승인을 받은 뒤** 삭제한다.

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

## Flex 렌더링 이미지 — Claude가 직접 그려 위키에 첨부 (2026-09-12 신설)

**LINE 공식 [Flex Message Simulator](https://developers.line.biz/flex-simulator/)는 LINE Business ID 로그인이 필요해 Claude가 자동화할 수 없다**(실측 2026-09-12 — 로그인 벽에서 막힌다. 사용자가 로그인해 둔 세션으로는 붙여넣기·Apply까지 동작하지만, **렌더 결과를 파일로 저장할 수 없어** 위키 첨부로 이어지지 않는다).

대신 **bubble JSON을 LINE 스타일 HTML/CSS로 그린 뒤 headless Chrome으로 캡처**한다. 이 경로는 로그인이 필요 없고 파일로 떨어지므로 그대로 Confluence에 첨부할 수 있다.

### 도구 — `scripts/render_oa_flex.py`

```bash
# bubbles.json = {"화면 이름": {bubble JSON}, …}  또는  [{"name": …, "bubble": …}, …]
python3 scripts/render_oa_flex.py --input bubbles.json --out-dir assets/oa_render
```

- bubble JSON을 **파싱해서 그린다** — 문구를 스크립트에 하드코딩하지 않으므로, 위키에 실린 샘플 JSON을 그대로 입력하면 **같은 이미지가 재현**된다.
- 지원 노드: `box`(vertical/horizontal/baseline·margin·spacing·paddingAll·backgroundColor) · `text`(size·weight·color·wrap·align·margin) · `separator` · `button`(primary/secondary/link·height·color) · `image`(aspectRatio·aspectMode) · `spacer`. `icon`·`video`는 무시한다.
- 크기 키워드는 LINE 스펙 근사로 매핑한다(`sm`=13px, `lg`=17px, spacing `md`=8px …).
- 캡처 후 **Pillow로 여백을 자동 크롭**해 카드만 남긴다(`{slug}.png` + `manifest.json`).
- 메시지 봉투(`{"type":"flex","altText":…,"contents":{…}}`)로 감싼 JSON을 넣어도 bubble만 꺼내 그린다.

### ⚠️ 한계 — 이것은 "근사 렌더"다

| 같다 | 다를 수 있다 |
|---|---|
| 레이아웃·요소 순서·문단 구분선 | **폰트**(LINE 자체 폰트 ↔ 시스템 폰트) |
| 색상·버튼 스타일·배치 | **미세 여백**(1~2px 수준), 줄바꿈 위치 |
| hero 이미지 비율·크롭 | LINE 앱의 말풍선 바깥 UI |

- 위키 첨부·리뷰용으로는 충분하지만, **발송 전 최종 확인은 사람이 Flex Message Simulator에서** 한다(규칙 3의 확인 흐름은 그대로 유지).
- ⛔ **렌더 이미지를 "실제 발송 화면"이라고 단정해 보고하지 않는다.** 근사 렌더임을 함께 밝힌다.

### 위키 첨부

- 파일명 **`oa_flex_{슬러그}.png`** (슬러그: 화면 이름에서 `(OA)` 제거 → `+`→`P`·`-`→`M` 치환 → 나머지 특수문자 `_`).
- 해당 화면의 **Screen 칸**에 `<ac:image ac:width="280"><ri:attachment ri:filename="oa_flex_….png" /></ac:image>` 로 건다(`<ri:page>` 금지 — `md/wiki.md` 4-C).
- **기존 첨부 갱신은 같은 파일명 유지 + `POST .../child/attachment/{attachmentId}/data`** — 파일명이 바뀌면 본문 참조가 깨진다(규칙 3-1의 curl `filename=` 주의 동일 적용).
- 문구·JSON을 고쳤으면 **렌더 이미지도 같은 작업에서 다시 만들어 갱신**한다(규칙 3-1의 "3곳 세트"에 **ⓓ 렌더 이미지**가 추가된 셈이다).

---

## Landpress 등록 (`oam_message_task_multi`) — 2026-09-12 신설

OA 메시지 본문은 **Landpress의 `oam_message_task_multi` 컬렉션**에 언어별 항목으로 등록하고, 사내 CMS(LIAM HUB)가 그 항목을 불러가 발송 메시지를 만든다.

### 프로젝트

| 환경 | projectId | CMS 편집 URL |
|---|---|---|
| **beta** | `a2qaxhygpi95g8l4a48n2vn4` | `https://landpress-content-v2.linecorp.com/projects/a2qaxhygpi95g8l4a48n2vn4/content/collections/oam_message_task_multi/items?_locale=all` |
| **prod** | `w5eph4y9qxe05c8fqpi7rlxh` | `https://landpress-content-v2.linecorp.com/projects/w5eph4y9qxe05c8fqpi7rlxh/content/collections/oam_message_task_multi/items?_locale=all` |

- 조회(읽기 전용, 인증 불필요): `https://landpress-content.line-scdn.net/contents/v2/projects/{projectId}/collections/oam_message_task_multi/items/{postId}`
- 쓰기는 **CMS 백오피스 API**(`landpress-content-v2.linecorp.com`) — 절차·제약은 `md/landpress.md` §10 그대로 따른다(브라우저 탭 세션 필요, `?locale=`, 다건 컬렉션이므로 `published: true` 허용).

### 항목 스키마 (실측 — prod postId `1951`)

```jsonc
{
  "title": "친구추가 1000엔 쿠폰",       // 사람이 읽는 이름. LIAM HUB의 Title에 그대로 넣는다
  "published": true,
  "messages": [                          // 한 항목에 메시지 여러 개 가능(순차 발송)
    {
      "type": "FLEX",                    // FLEX | TEXT
      "_type": "oam_message",
      "alt_text": "1,000円OFFクーポンが届きました！",   // 봉투 텍스트(언어별)
      "content_flex": { …bubble JSON… }, // ⚠️ bubble 단일 객체 (봉투로 감싸지 않는다)
      "content_text": ""                 // TEXT 타입일 때 본문
    }
  ]
}
```

- **`content_flex`에는 bubble만 넣는다** — 위키 「샘플 JSON(KR)」 칸의 값과 같은 형태다.
- **언어**: `ko_KR` · `en_US` · `ja_JP` · `zh_TW` · `th_TH` (LIAM HUB 탭 표기는 `EN_US`·`JA_JP`·`TH_TH`·`KO_KR`·`ZH_TW`).
- `postId`는 환경마다 다르다 — beta에서 받은 id를 prod에 쓰지 않는다.

### ⛔ 등록 절차 (순서 준수)

1. **OA 작성이 끝나면 사용자에게 "Landpress에 등록할까요?"를 묻는다.** 묻지 않고 등록하지 않는다. 등록 대상 환경(beta/prod)도 함께 확인한다.
2. 등록한다고 하면 — **한국어(`ko_KR`) 항목은 Claude가 직접 만든다**(2026-09-13 정정. 이전 규칙의 "생성 불가"는 틀렸다):
   ```
   POST /api/v1/projects/{projectId}/collections/oam_message_task_multi/items?locale=ko_KR
   body: { "title": …, "messages": [ … ], "published": true }     → 201 + 새 postId
   ```
   - ⛔ **대량 생성 전 1건만 만들어 재조회로 검증**한 뒤 나머지를 진행한다(생성은 되돌리기 번거롭다).
   - **2번째 언어부터는 Claude가 추가할 수 없다** — 사용자가 CMS UI에서 로케일을 추가해 주면 그 뒤 Claude가 PUT으로 채운다(`md/landpress.md` §10-3 4-1).
   - 사용자가 **이미 만들어 둔 항목이 있으면** 그 postId를 받아 3번으로 간다.
3. **기존 항목에 쓸 때는** ⛔ **먼저 그 항목의 현재 내용을 GET해 확인한다** — 사용자가 이미 채워 둔 내용이 있으면 덮어쓰기 전에 알린다. 빈 껍데기(`type: TEXT`·`content_flex: null`·`content_text: ""`)면 그대로 교체해도 안전하다(실측: beta 216·prod 1956 모두 빈 껍데기였다). 확인 후 언어별 PUT:
   ```
   PUT /api/v1/projects/{projectId}/collections/oam_message_task_multi/items/{postId}?locale={ko_KR|en_US|ja_JP|zh_TW|th_TH}
   body: { "title": …, "messages": [ … ], "published": true }
   ```
4. **반영 후 공개 조회 API로 재조회해 전건 대조**한다(언어·`alt_text`·`content_flex` 문구까지). `md/landpress.md` §9 3번 — 생략 금지.
5. 위키에 **postId를 beta/prod로 나눠 기록**한다(아래 「등록 현황」 표).

---

## LIAM HUB 등록 (Event Messages) — 2026-09-12 신설

Landpress 등록이 끝나면 사내 CMS **LIAM HUB**에서 그 항목을 불러 **발송용 Event Message**를 만든다. 여기서 발급되는 **`messageId`가 실제 발송 식별자**다.

| 환경 | 주소 | OA Channel |
|---|---|---|
| **beta** | `https://liam-hub.hub-beta.linecorp.com/service-view/313?menuId=23160&roleId=6970` | 2개 중 ⛔ **`Unifi Beta OA (2010418473)`** 를 고른다 (`Dapp Portal Beta (2008939708)` 아님) |
| **prod** | `https://liam-hub.hub.linecorp.com/service-view/313?menuId=18628&roleId=6969` | ⛔ **`Dapp Portal (2006670905)`**(기본 선택값) — `Dapp Portal_Test (2007058493)` 아님 |

> ⛔ **beta와 prod의 올바른 채널이 다르다 (2026-09-12 실측 · 사용자 확정).** beta는 `Dapp Portal Beta`가 아니라 **`Unifi Beta OA`** 를 골라야 하는데, **prod에는 Unifi 채널 자체가 없고** `Dapp Portal`·`Dapp Portal_Test` 2개뿐이며 **`Dapp Portal (2006670905)`이 정답**이다. "prod는 채널이 1개"는 사실과 다르므로 **기본 선택값을 그대로 믿지 말고 위 표의 채널 ID로 확인**한다.

> ⛔ **URL의 `roleId`가 중요하다.** `service-view/313`은 같아도 `roleId`(beta `6970` / prod `6969`)·`menuId`(beta `23160` / prod `18628`)가 환경을 가른다. **주소를 손으로 고쳐 쓰지 말고 위 표의 URL을 그대로 쓴다** — 잘못된 roleId로 들어가면 다른 권한·다른 환경 화면이 열린다.

### 절차

1. 해당 환경의 Event Messages 화면에서 **OA Channel을 고른다**(beta 한정 — 위 표).
2. **`NEW EVENT MESSAGE`** 클릭.
3. **Title** = Landpress 항목의 `title` 을 그대로 입력.
4. **Landpress Post Id** = 3단계에서 받은 postId 입력 → **`LOAD MESSAGE`** 클릭.
5. 언어 탭(`EN_US`·`JA_JP`·`TH_TH`·`KO_KR`·`ZH_TW`)을 열어 **불러온 데이터가 Landpress에 넣은 값과 같은지 확인**한다(문구·`alt_text`·버튼 URL·미리보기 카드).
6. **`UPDATE`** 버튼으로 생성한다(신규 화면에서는 `CREATE`로 보일 수 있다).
7. 생성되면 **`messageId`** 가 발급된다(예: `N6aa3b1eb401c795e1244ceef`). 이 값을 위키에 기록한다.

- ⚠️ **브라우저 접근 경로**: 이 사내 CMS는 **Claude in Chrome(사용자의 실제 로그인 세션)** 으로 접근한다. 샌드박스 브라우저 패널에서는 리소스가 차단돼(`ERR_BLOCKED_BY_CLIENT`) 화면이 비어 보인다(실측 2026-09-12).
- ⚠️ **화면 본문은 교차 출처 iframe**이라 JS로 조작할 수 없다 — **좌표 클릭·타이핑으로만** 다룬다. 폼이 길어 `CREATE`가 화면 밖이면 **`Message 1 (FLEX)` 패널 헤더를 눌러 접으면** 버튼이 올라온다(마우스 휠·`End` 키로는 iframe이 스크롤되지 않는다, 실측 2026-09-12).
- ✅ **`{{이름}}` 변수는 시스템이 인식한다** — `LOAD MESSAGE` 후 **`placeholders`** 필드에 변수명이 자동 추출된다(실측: `product_name, reservation_date`). 규칙 2의 표기가 실제 치환 키와 일치한다는 확인 지점이므로, **불러온 뒤 placeholders 목록이 기대한 변수와 같은지 본다.**
- ⛔ **`isActive`는 기본 체크(Yes)다.** 테스트·미완성 문구로 등록할 때는 **체크를 풀고 생성**해 발송되지 않게 한다. 실제 사용 시 켠다.
- **실측(2026-09-12 · 파이프라인 검증)**

  | 환경 | Landpress postId | primary locale | LIAM messageId | isActive |
  |---|---|---|---|---|
  | beta | `216` (ko_KR) | **ko_KR** | `N6aa509563ae13b187b7d0c7e` | Yes |
  | prod | `1956` (ko_KR) | **en_US**(빈 항목) | `N6aa50c973af74c70a397b9b0` | **No**(테스트라 해제) |

  - **primary locale은 환경마다 다를 수 있다**(beta ko_KR / prod en_US). primary가 비어 있어도 **게시된 언어 항목만 LIAM 탭에 나오므로** `ko_KR` 하나만 채워도 `LOAD MESSAGE`는 정상 동작한다.
  - **`POST ?locale=ko_KR`로 만든 항목은 `ko_KR`이 primary**가 된다(실측 217~231).

- **실측(2026-09-13 · beta 전건 등록)**: 위키 16화면을 beta Landpress에 **`ko_KR` 단일 로케일로 전건 생성** — `216`(기존) + `217~231`(신규 15건). 전건 재조회 대조(문구 수·버튼 수·구분선 수·`alt_text`·`published`·`primaryLocale`·hero URL·버튼 URL) **불일치 0건**. LIAM Event Message는 클리닉 T0만 생성된 상태.
  - **primary가 미게시면 공개 조회 API는 그 항목을 404로 준다** — `ko_KR`을 `published: true`로 올려도 마찬가지다. 이때 **반영 확인은 CMS API(`/items/{postId}?locale=`)로** 한다(§10-3 5번의 확장).
- ⛔ **생성·`UPDATE`·`DELETE`는 사용자 확인을 받은 뒤에만 누른다.** 조회·`LOAD MESSAGE`까지는 자유롭게 해도 되지만, 등록은 발송 대상이 되는 쓰기 동작이다.
- **참조 실측**: prod Landpress `postId 1951` ↔ LIAM `messageId N6aa3b1eb401c795e1244ceef`.

---

## 위키 반영 (OA 섹션)

- 위치: Screen 섹션의 `<h4>OA</h4>` 서브섹션 아래 표.
- 컬럼: `Screen ID | Screen(이미지) | Description | 샘플 JSON(KR) | 다국어 번역(XLT 키 미부여) 또는 XLT & GA`
  - **「샘플 JSON(KR)」은 Description 바로 오른쪽**에 둔다(2026-09-12 신설). 화면 표의 마지막 칼럼 이름은 페이지 템플릿에 따라 `다국어 번역` 또는 `XLT & GA`이며, 그대로 둔다.
  - ⚠️ `scripts/check_wiki_storage.py`는 Screen 표를 4컬럼으로 검사하지만 **「샘플 JSON(KR)」은 예외로 허용**한다(다른 칼럼 추가는 여전히 위반).
- 번역 칸: 키 없는 `No | KR | JA | EN | TH | ZH-TW` 중첩표(규칙 1). 변수는 `{{이름}}`으로 표기(규칙 2).
- **Screen 칸 = 렌더 이미지**: `scripts/render_oa_flex.py` 산출물 `oa_flex_{슬러그}.png`를 첨부해 `<ac:image>`로 건다(위 「Flex 렌더링 이미지」). Figma 렌더·실기기 캡처가 있으면 그것을 우선한다.
- **샘플 JSON(KR) 칸**: bubble **단일 객체**를 `code` 매크로로 넣는다.
  - ⛔ `{"type":"flex","altText":…,"contents":{…}}` 봉투로 감싸지 않는다 — Flex Message Simulator가 `invalid json`으로 거부한다(실측 2026-09-12). `altText`는 Description의 메시지 초안 표에 남긴다.
  - ⛔ code 매크로에 **`<ac:parameter ac:name="language">json</ac:parameter>`를 넣지 않는다** — 이 위키에서 `Error rendering macro 'code'`가 난다(실측 2026-09-12).
  - 확인용으로 URL 실값을 임시로 넣었다면(시뮬레이터 렌더 테스트 등) **그 사실을 Description 비고에 남긴다.**
- **Flex JSON(언어별 5개)은 해당 화면 Description 셀에 첨부·링크**한다 — `Flex: [ko_KR] [en_US] [ja_JP] [zh_TW] [th_TH]` 형태 다운로드 링크(규칙 3). intro 영역이 아니라 화면별 Description에 둔다.
- **등록 현황 표(필수 — Landpress·LIAM HUB 등록 후)**: 환경별 id를 기록한다.

  | 화면 | Landpress postId (beta) | LIAM messageId (beta) | Landpress postId (prod) | LIAM messageId (prod) |
  |---|---|---|---|---|
  | (OA) … | 216 | N6aa509563ae13b187b7d0c7e | 1951 | N6aa3b1eb401c795e1244ceef |

  미등록 환경은 `-`로 둔다. **beta id를 prod 칸에 쓰지 않는다.**
  - ⛔ **위치는 OA 섹션 맨 끝**(다음 `<h1>` 직전)이고, **첫 칼럼 헤더는 `화면`** 이다. `Screen` 제목 뒤 **첫 표**이거나 첫 칼럼이 `Screen ID`면 `check_wiki_storage.py`가 이 표를 Screen 표로 오인해 컬럼 수 위반으로 막는다(2026-09-12 실측).
  - 부분 등록(일부 언어만·테스트)이면 **그 사실과 이유를 표 아래 비고로** 남긴다.
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
7. Confluence 첨부 — 화면별 5개 언어를 `flex_{프레임}_5lang.zip`으로 묶어 첨부
   (기존 첨부는 같은 파일명으로 POST .../child/attachment/{id}/data 갱신)
   → 각 화면 Description에 zip 링크 1개 확인
8. **렌더 이미지 생성·첨부** — `scripts/render_oa_flex.py`로 화면별 PNG 생성
   → `oa_flex_{슬러그}.png`로 첨부하고 Screen 칸에 `<ac:image>` 연결
9. 위키 OA 섹션 반영(키 없는 번역표 + 렌더 이미지 + 샘플 JSON(KR) 칼럼 + Flex JSON zip) + History
   (XLT 엑셀·전역 키 표는 건드리지 않는다)
   → PUT 직전/직후 `check_wiki_storage.py pre|post` exit 0 확인
10. **사용자에게 "Landpress에 등록할까요?" 확인** → 등록 시 언어별 항목 생성 요청
    → postId 수령 → 언어별 PUT → 공개 조회 API 재조회 대조
11. **LIAM HUB Event Message 생성**(beta는 `Unifi Beta OA` 채널 선택)
    → Title=Landpress title · Landpress Post Id 입력 → LOAD MESSAGE → 확인 → UPDATE
    → 발급된 messageId 수령
12. 위키 「등록 현황」 표에 **beta/prod로 나눠 postId·messageId 기록**
```
