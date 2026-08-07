# XLT 시스템 API 직접 조달 — 타당성 검토

| 항목 | 값 |
|---|---|
| 일자 | 2026-08-07 |
| 조사 대상 | 크롬 확장 `~/Documents/dec/` (사내 XLT 미리보기 툴, 배포 빌드) |
| 목적 | XLT 등록값을 **API로 직접 조달**해 용어집·번역 검증에 쓸 수 있는지 판단 |
| 범위 | **검토만** — 코드 미작성(사용자 결정). 읽기 GET 호출로 실증만 수행 |
| 결론 | **가능하다.** 무인증 읽기 API로 1,596키 × 5개 언어를 즉시 조달했고, 기존 수작업 실측치를 **전건 재현**했다 |

---

## 1. 결론 요약

**할 수 있다.** XLT 시스템에는 무인증 읽기 REST API가 있고, 이 검토에서 **직접 호출해 검증을 마쳤다**. 지금 세션마다 사용자에게 요청하는 export 엑셀과 **같은 데이터(1,596키)** 를 GET 두 종류로 받아온다.

해소되는 것과 해소되지 않는 것을 먼저 분리한다.

| | 내용 |
|---|---|
| ✅ **해소** | export 수동 요청·PC 이동 시 소실 · 반복 오탐 74건 재판정 · 3원 교차 대조 수기 · 미등록 키/삭제 안전성 TODO · 용어집 A/B 최대 모집단(1,596키) 조달 |
| ❌ **해소 안 됨** | **구 표기 17키 등 「시스템에 반영」은 여전히 사람 몫** — 확인된 것은 **읽기 API뿐**이고 쓰기 경로는 없다 |

읽기 API는 **검출**을 자동화할 뿐 **반영**을 자동화하지 않는다. `HANDOFF.md:110`의 P1 항목이 P1으로 남는 이유는 이 검토로도 바뀌지 않는다.

> **부수 발견 — 즉시 확인이 필요한 건이 하나 나왔다.** UIT 치환자 표기 규칙이 시스템 실측과 어긋난다(§6). 이 검토가 아니었으면 계속 모르고 있었을 항목이다.

---

## 2. 검증된 사실

### 2-1. API 명세

크롬 확장 `assets/index.ts-BQAPCsIT.js`(minify된 service worker)에서 추출하고, **실호출로 확인**했다.

```
① 버전 목록
GET https://xlt-api.linecorp.com/xlt/info/versions/{service}/{device}?limit=30
→ {"code":"0","msg":"success","result":[{"versionSeq":12019,"versionName":"v2.6.0"}, ...]}

② 언어별 전체 데이터
GET https://xlt-api.linecorp.com/downloadXLT/{service}/{device}/{version}/{lang}/json
→ flat {키: "번역문"}
```

| 파라미터 | 값 | 근거 |
|---|---|---|
| `service` | `Dapp Portal` | export 파일명 `Dapp Portal_WEB BROWSER_v2.6.0_*.xlsx`가 **그대로 경로 파라미터**(`HANDOFF.md:28`) |
| `device` | `WEB BROWSER` | 〃 (공백 포함 — URL 인코딩 필수) |
| `version` | `v2.6.0` | ①의 `versionName`. 최신은 `versionSeq` 최댓값 |
| `lang` | `ko_KR`·`ja_JP`·`en_US`·`th_TH`·`zh_TW` | 확장의 i18n↔XLT 매핑표 |

**중요한 성질 2가지**

- **언어를 서버가 합쳐주지 않는다.** 언어당 요청 1건 → 5회 호출 후 클라이언트가 `{키: {ko_KR:…, ja_JP:…}}`로 pivot해야 한다.
- **`json`은 포맷 지정 path segment**다. `/xlsx` 같은 형제 엔드포인트가 있을 개연성은 있으나 **코드 근거가 없다(추정)**.

### 2-2. 인증 — 없다

확장은 `fetch(url)`을 **2번째 인자 없이** 호출한다. `Authorization` 헤더·API 키·`credentials:"include"` 전부 없고, `manifest.json`의 `permissions`에도 `cookies`·`identity`가 없다. `host_permissions`의 `https://xlt-api.linecorp.com/*`은 **CORS 우회 권한일 뿐 자격증명이 아니다**.

→ **사내망/VPN 전제의 무인증(또는 IP 화이트리스트) 읽기 API로 추정.** 이 검토의 호출도 별도 인증 없이 200을 받았다.

### 2-3. 실측 결과

```
버전 목록      HTTP 200 · 0.14s · 최신 v2.6.0 (versionSeq 12019)
5개 언어 조회  전부 HTTP 200 · 각 1,596키 · 키셋 5개 언어 동일 · 빈 값 0건
```

| 대조 항목 | 기존 기록 | API 실측 | 판정 |
|---|---|---|---|
| 전체 키 수 | `HANDOFF.md:110` "2026-08-06 export **1,596키**" | **1,596** | ✅ 일치 |
| `unifi_promotion_unifi_text8d` ko | 시스템 등록값 `최대 3만엔`(`HANDOFF.md:175`) | `무제한 포이카츠에 참여하고\n최대 3만엔 상당 리워드 받아가세요!` | ✅ |
| `mini_luckyball_payout_5min` ko | `당첨금은 최대 5분 내 지급됩니다.` | 동일 | ✅ |
| `UF_home_skyflag_title` ko | `무제한 미션하고\n최대 3만엔 상당 즉시 받기` | 동일 | ✅ |

**결정적 근거 — 수작업 실측치 전건 재현**

`HANDOFF.md:110`의 P1 「XLT 시스템 구 표기 17키 정리」는 사용자가 export 엑셀을 제공하고 사람이 검증기로 센 숫자다. API 데이터로 같은 집계를 돌린 결과:

| 구 표기 | HANDOFF 기록 | API 실측 | |
|---|---|---|---|
| zh `關注` | 8 | **8** | ✅ |
| zh `追蹤` | 3 | **3** | ✅ |
| ja `友達` | 4 | **4** | ✅ |
| ko `월렛` | 13 | **13** | ✅ |

**사람이 손으로 센 숫자를 API가 그대로 재현했다.** "API가 export를 대체할 수 있다"는 주장의 실증은 이것이다.

### 2-4. 이 검토 자체가 문제 상황의 실연이 됐다

이 검토를 수행한 PC(`AD03230205ui-iMac.local`)의 `~/Downloads`에 **export 파일이 없다.** `HANDOFF.md:28`이 가리키는 `Dapp Portal_WEB BROWSER_v2.6.0_20260806154000.xlsx`는 다른 PC에 있다.

이는 `reports/gate/gate_report_nonrealtime_improve_2keys.md:10`에 이미 기록된 사고다:

> **값의 정본**: XLT 시스템 export가 이 PC에 없어 **사용자 결정에 따라 위키 등록값 기준으로 진행**

그런데 **같은 PC에서 API로는 1,596키를 0.5초 만에 받았다.** 정본 없이 진행할 이유가 없어진다.

---

## 3. 현재 구조의 비대칭

| 방향 | 현재 | 비고 |
|---|---|---|
| **용어집 읽기** | `scripts/fetch_glossary.py` → Landpress API GET | ✅ 자동 |
| **용어집 쓰기** | 사용자가 CMS에 전체 JSON 붙여넣기 | 수동(API 읽기 전용) |
| **XLT 쓰기** | `scripts/export_to_xlt.py` → 엑셀 → 사용자가 업로드 | 수동 |
| **XLT 읽기** | **없음** — 사용자가 수동 다운로드 후 채팅 전달 | ❌ **이 한 칸이 비어 있다** |

`fetch_glossary.py`가 있는데 그 대칭인 XLT 등록값 읽기만 없다. §1의 수작업 5종은 전부 여기서 파생된다.

---

## 4. 기대 효과 — 현재 마찰과 1:1 대응

| # | 현재 마찰 | API 조달 후 | 근거 |
|---|---|---|---|
| 1 | 세션마다 export 수동 요청, PC 이동 시 소실 | GET 1회 | `HANDOFF.md:28`, `gate_report_nonrealtime_improve_2keys.md:10` |
| 2 | **74건 오탐을 차수마다 재판정** | `[등록값]` 태그로 즉시 구분 | `gate_report_season3_uit_5keys.md:225`·`:315` |
| 3 | 3원 대조 수기 · 접두 변형 키 오판정 | 딕셔너리 정확 조회 | `gate_report_season3_screen_reconcile.md:348-357` |
| 4 | 미등록 키·삭제 안전성이 TODO | 리포트 상시 항목 | `gate_report_nonrealtime_payout.md:39` |
| 5 | A/B 최대 모집단이 수동 조달 | 1,596키 상시 재현 | `md/glossary-changelog.md:57`·`:90` |
| 6 | **구 표기 17키 반영** | **해소 안 됨 — 쓰기 API 없음** | `HANDOFF.md:110` |

### 효과 실증 — 보유 엑셀 2종 실제 대조

레지스트리와 기존 산출물을 대조하면 즉시 아래 버킷이 나온다. 지금 이 검토에서 실행한 결과다.

```
[xlt_output_season3_ALL_20260804.xlsx]  총 57키
   등록값 동일 54 · 표기차만 0 · 값 상이 3 · 미등록 0
   값 상이: UF_home_jpyc_banner_jackpot, UF_floating_jpyc_banner_title, UF_floating_jpyc_banner_desc

[xlt_output_nonrealtime_LV_20260805.xlsx]  총 4키
   등록값 동일 4 · 표기차만 0 · 값 상이 0 · 미등록 0
```

**「값 상이 3키」가 바로 §6의 발견으로 이어졌다.** 사람이 57키를 눈으로 훑어서는 나오지 않았을 항목이다.

---

## 5. 권장 설계 (구현 시 참고 — 이번엔 만들지 않음)

### 5-1. `scripts/fetch_xlt_registry.py` — `fetch_glossary.py`와 대칭 (~90줄)

- 버전 목록 조회(기본 `versionSeq` 최댓값, `--version`으로 고정) → 5개 언어 조회 → pivot
- 출력 `scripts/xlt_registry.json` (**`.gitignore`**, `glossary.json`과 동일 지위)
  - `metadata`(service·device·version·version_seq·fetched_at·total_keys·languages) + `entries`
  - **`metadata`는 필수** — 게이트 리포트가 "어느 버전과 대조했는지" 인용해야 한다
- **pivot 로직을 순수 함수로 분리** — `test_validation.py`는 "네트워크 불필요"가 규약이라 픽스처 테스트가 가능해야 한다
- **채택 버전을 stdout에 출력** — "최신"이 배포 전 draft일 수 있어 사람이 확인해야 한다

**실패 처리** — `fetch_glossary.py`는 `RequestException`만 잡는데 그것만으로 부족하다:

| 실패 | 증상 | 처리 |
|---|---|---|
| VPN 미연결 | `ConnectionError`/`Timeout` | 안내 + exit 1 |
| **사내 프록시 로그인 페이지** | **200 + HTML** → `.json()`이 `ValueError` | **반드시 함께 catch** |
| API 논리 오류 | 200 + `code != "0"` | `msg` 출력 후 exit 1 |
| 언어별 키셋 불일치 | (실측은 동일하나 보장 없음) | 합집합 + **경고**. 조용히 빈 값 넣지 말 것 |

### 5-2. `validate_translation.py` 통합 — ⚠️ 「등록값 유래 P1 강등」은 **기각 권고**

가장 자연스러워 보이는 안이지만 **하면 안 된다.** 근거 4가지:

1. **실제 위반을 가린다.** `gate_report_season3_uit_5keys.md:212` — `UF_home_jpyc_banner_title`의 **nbsp(U+00A0)는 등록값이 원인인 P0**였고 "시스템 원본 수정 권장"으로 보고됐다. 구 표기 17키도 **등록값이면서 진짜 보고 대상**이다. `md/guide.md:228`은 "임의 변경 금지 — **보고만**"인데, 강등은 변경 금지는 지키되 **보고를 없앤다.**
2. **CLAUDE.md 게이트 2번과 정면 충돌.** "검토 범위를 신규·변경 키로 한정하지 않는다"의 근거 사례 `포이가츠`·`누리고다양한`·`perksand`가 **전부 기존 등록값의 실제 오류**였다.
3. **A/B 실측 기준선 파괴.** 이 저장소는 용어집·검증기 변경을 P1 증감으로 채택/기각한다(`230→266` 기각, `63→58` 채택). 등급 의미가 바뀌면 과거 게이트 리포트와 비교 불가능해진다.
4. **패치 모드 오분류.** `patch_translation.py`로 ko만 바꾼 직후엔 키가 등록값에 있으므로, **키 존재** 기준 강등은 방금 넣은 문구의 위반을 지운다.

**→ 권고: `--registry` 옵셔널 주석(annotation) 전용**

- 등급·건수·종료코드 **불변**. 각 이슈에 `등록값` / `변경` / `미등록` 태그만 부착
- 리포트에 대조 요약 섹션 추가(4개 버킷 카운트 + 조회 버전)
- **미지정 시 리포트 바이트 동일** — 기존 동작 100% 보존
- 값 비교 정규화는 **nbsp·CRLF·꼬리 공백 3종만**. 리터럴 `\n` ↔ 실제 개행은 엑셀/위키 규칙이 갈리는 지점이라 정규화 대상이 아니다
- CLI는 **위치 인자 3개 금지**(`HANDOFF.md:64`에 "용어집을 두 번째 위치 인자로만 받는다 — 빠뜨리면 조용히 통과" 사고 기록). `--registry` 플래그만 떼어내는 6줄로 처리하고, 지정했는데 파일이 없으면 **조용히 넘기지 말고 exit**

### 5-3. 만들지 말 것 (과설계 방지)

| 만들지 말 것 | 이유 |
|---|---|
| P3/INFO 새 등급 | 리포트 규격 분기 · A/B 기준선 파괴 · 등급별 20건 절단에 걸림 |
| `check_gate_report.py`에 요구항목 추가 | **기존 게이트 리포트 전부 소급 미완결**. `test_validation.py` 픽스처도 깨진다 |
| `xlt_registry.json` 자동 탐색·자동 로드 | **캐시 금지 규칙 위반**. 반드시 `--registry` 명시 |
| 레지스트리를 게이트 **필수** 입력으로 승격 | VPN 없는 환경에서 게이트 전체 실패. 항상 옵셔널 |
| 3원 대조 전용 스크립트 | 소스 3종(Figma·위키 storage·JSON) 형태가 매번 달라 파서 3종이 붙는다. **접두 변형 키 사고는 도구가 아니라 딕셔너리 정확 조회로 이미 해결**된다 |
| 캐시 TTL·ETag | 매 run 새로 조회가 규칙이라 캐시 계층 자체가 불필요 |
| **쓰기(POST) 시도** | 확인된 것은 **읽기 API뿐**. 시도 시 **등록값 전량 덮어쓰기 위험** |
| `md/xlt-registry.md` 신규 문서 | `md/landpress.md`가 큰 이유는 CMS **쓰기** 절차 때문. 읽기 전용은 기존 문서 절로 충분 |

전량 스냅샷 엑셀을 만든다면 `xlt/` 직하가 아니라 **별도 하위 폴더**에 둘 것 — `create_xlt_excel` 산출물과 섞이면 **잘못된 파일을 XLT에 업로드**할 수 있다.

---

## 6. ⚠️ 부수 발견 — UIT 치환자 표기가 시스템 실측과 어긋난다

§4의 「값 상이 3키」를 열어 보니 **문구는 같고 치환자 표기만** 달랐다.

| 키 | 위키·엑셀(우리) | XLT 시스템(실측) |
|---|---|---|
| `UF_home_jpyc_banner_jackpot` | `{{0}}님이 {{1}} JPYC 받았어요!` | `{0}님이 {1} JPYC 받았어요!` |
| `UF_floating_jpyc_banner_title` | `{{0}} JPYC에 당첨됐어요! 🎉` | `{0} JPYC에 당첨됐어요! 🎉` |
| `UF_floating_jpyc_banner_desc` | `지금 가입하면 {{0}} JPYC 받아요!` | `지금 가입하면 {0} JPYC 받아요!` |

5개 언어 전부 동일 패턴이다(3키 × 5언어 = **15셀**).

`CLAUDE.md`의 담당 FE 팀 규칙은 **UIT = `{{0}}` 이중 중괄호**다. 세 키 모두 `UF_` = UIT다.

### API가 `{{`를 언이스케이프한 것 아닌가? → 아니다

레지스트리 1,596키 전수 스캔:

```
'{{' 이중 중괄호 포함 키 : 1        ← UF_max_cashback
'{n}' 단일 중괄호 포함 키 : 174     ← 그중 UF_(UIT) 32키
```

**두 표기가 응답에 공존한다.** API가 정규화했다면 `{{`가 하나도 남지 않았을 것이다. 유일한 `{{0}}` 키는:

```
UF_max_cashback  ko: 결제 시 최대 {{0}} 캐시백
```

즉 **시스템에는 `UF_` 키 32개가 `{0}`로, 1개가 `{{0}}`로 등록**돼 있다. 다수가 `{0}`이다.

### 판단하지 않고 보고만 한다

세 가지 해석이 가능하고 **코드·문서만으로는 결정할 수 없다**:

- ⓐ 문서 규칙(`{{0}}`)이 맞고 **시스템 등록값 32키가 잘못**됐다
- ⓑ 시스템이 맞고 **우리 문서 규칙이 틀렸다** — `{{0}}`는 FE 코드가 참조하는 표기이지 저장 표기가 아닐 수 있다
- ⓒ XLT 업로드 시 시스템이 `{{`→`{`로 정규화한다 (그렇다면 `UF_max_cashback`은 어떻게 남았는지 설명 필요)

**FE(UIT) 확인이 필요한 항목**이다. `md/guide.md:228`("기존 키는 임의 변경 금지 — 보고만")에 따라 이 검토에서는 아무것도 바꾸지 않았다.

> 이 건은 **API 대조가 아니었으면 계속 발견되지 않았을** 항목이다. §4의 효과 #3(3원 대조 자동화)의 구체적 사례로 볼 수 있다.

---

## 7. 위험과 제약

| 위험 | 내용 | 완화 |
|---|---|---|
| **무인증 사내 API 의존** | 인증이 도입되면 즉시 깨진다. 확장이 인증을 안 붙인다는 사실은 **근거이지 보장이 아니다** | 실패 시 export 폴백 경로 유지 |
| **VPN 전제** | 사외·오프라인에서 실패 | 레지스트리는 **항상 옵셔널**, 게이트 필수 입력으로 만들지 않는다 |
| **「등록값 유래」의 오독** | 다음 세션이 "등록값 유래 67건"을 **전수 수동 검토 면제**로 읽을 위험. CLAUDE.md 게이트 2번이 막으려던 바로 그 사고 | 리포트에 **코드가 항상 고정 경고 문구를 출력**하게 한다(사람이 쓰게 두면 빠진다) |
| **버전 선택** | "최신"이 배포 전 draft일 수 있다 | 채택 버전 stdout 출력 + `--version` 고정 지원 |
| **`json` 외 포맷·`limit` 상한** | 코드 근거 없음(추정) | 필요 시 실호출로 확인 |

---

## 8. 정본 조달 정책 권고 (사용자 결정: **API 1차 · export 백업**)

- **매 run API로 조달**한다. `xlt_registry.json`은 `glossary.json`과 동일하게 **원본 대신 재사용 금지**(캐시 금지 규칙). 같은 run 안의 파이프라인 핸드오프만 허용.
- **VPN 미연결·API 장애 시에만** 사용자 export로 폴백한다.
- 구현 시 갱신할 문서:
  - `HANDOFF.md:28` — "세션마다 사용자에게 최신 export 요청" → **"API 1차, export는 대조·백업용"**
  - `CLAUDE.md` — 스크립트 표 행 추가 · 복사 제외 항목에 `scripts/xlt_registry.json` · **캐시 금지 규칙 열거에 "XLT 등록값(API)" 추가** · 스크립트 개수 체크리스트
  - `.gitignore` — `scripts/glossary.json` 옆에 `scripts/xlt_registry.json`
  - `md/check.md` — 필요 파일 표 + CLI 예시(아래 §9)
  - `md/guide.md:228` — "보고만" 행에 대조 근거를 명시

---

## 9. 별건 — `md/check.md`의 CLI 문서가 스탤이다

이 검토 중 발견했다. `md/check.md:64-69`는 이렇게 적혀 있다:

```
python validate_translation.py {파일.xlsx} \
  --sheet properties --key-column "Key ID" \
  --glossary glossary.json --output report.md --json result.json
```

**이 5개 플래그는 실제로 존재하지 않는다.** `scripts/validate_translation.py:420-432`의 실제 CLI는 위치 인자 2개뿐이다:

```
python validate_translation.py <엑셀파일경로> [용어집경로]
```

문서대로 실행하면 `--sheet`가 엑셀 경로로 해석돼 실패한다. `HANDOFF.md:64`에도 "용어집을 두 번째 위치 인자로만 받는다 — 빠뜨리면 조용히 통과"라는 관련 사고가 이미 기록돼 있다. **API 연동과 무관하게 정정이 필요하다.**

---

## 10. 재현 명령

```bash
# ① 버전 목록
curl -s "https://xlt-api.linecorp.com/xlt/info/versions/Dapp%20Portal/WEB%20BROWSER?limit=30" | head -c 300

# ② 5개 언어 조회 + 키 수·키셋·구 표기 집계
for L in ko_KR ja_JP en_US th_TH zh_TW; do
  curl -s -o /tmp/x_$L.json "https://xlt-api.linecorp.com/downloadXLT/Dapp%20Portal/WEB%20BROWSER/v2.6.0/$L/json"
done
python3 -c "
import json; L=['ko_KR','ja_JP','en_US','th_TH','zh_TW']
d={x:json.load(open(f'/tmp/x_{x}.json')) for x in L}
print({x:len(v) for x,v in d.items()})
print('키셋 동일:', len({frozenset(v) for v in d.values()})==1)
print('구 표기:', {t:sum(t in str(v) for v in d[l].values())
  for t,l in [('關注','zh_TW'),('追蹤','zh_TW'),('友達','ja_JP'),('월렛','ko_KR')]})"
# 기대: 전부 1596 / True / {'關注':8,'追蹤':3,'友達':4,'월렛':13}
```

---

## 11. 구현하기로 할 경우의 순서

1. `scripts/fetch_xlt_registry.py` + `.gitignore` 1줄
2. **사용자 export와 전량 대조해 차이 0 확인** — ⚠️ 이 검토에서는 **export가 이 PC에 없어 수행하지 못했다.** API가 export를 대체한다는 최종 증거이므로 **여기서 실패하면 3단계로 넘어가지 않는다**
3. `validate_translation.py` — `registry_path=None` + `annotate_registry()` + 리포트 섹션 + `--registry` 파싱
4. `test_validation.py`에 체크 추가 — 특히 **「registry 지정 전/후 P0·P1·P2 건수 완전 동일」** 단언(강등 없음의 증명)
5. 전량 스냅샷으로 A/B 무영향 확인 → 동시에 용어집 A/B 모집단 1,596키 확보
6. 문서 갱신(§8) — 같은 커밋

---

## 12. 사용자 확인이 필요한 것

| # | 항목 | 왜 |
|---|---|---|
| 1 | **UIT 치환자 표기**(§6) — `{{0}}` vs `{0}`, `UF_` 32키가 시스템에 `{0}` | FE(UIT) 확인 사안. 우리 문서 규칙과 시스템 실측이 반대 |
| 2 | **구현 진행 여부** | 이번은 검토만 수행 |
| 3 | `md/check.md` CLI 문서 정정(§9) | API와 무관한 별건 |
