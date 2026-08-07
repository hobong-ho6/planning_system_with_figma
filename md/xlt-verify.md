# XLT 시스템 등록값 검증 절차

> **무엇을 하는 문서인가** — XLT 시스템에 **이미 등록된 다국어 문구**를 API로 내려받아 **용어집 위배 여부를 정기 점검**하고, 수정 제안 → 사용자 확인 → 업로드용 엑셀 생성까지 처리한다.
>
> **파이프라인 1~3단계와 다르다.** 1단계(`md/translate.md`)는 Figma의 **새 문구**를 번역해 시스템에 **넣는** 흐름이고, 이 문서는 **이미 들어가 있는 값**을 점검해 **고치는** 흐름이다. 검증 로직(3단계 P0/P1/P2)은 같은 `validate_translation.py`를 재사용한다.
>
> **관련**: 번역 시점의 유사 키 제안은 `md/translate.md` Step 2-1(같은 API를 쓰지만 목적이 다르다) · 용어집 자체의 갱신은 `md/landpress.md` · 검증 패턴 사전은 `md/check.md`.

---

## 0. 시작 전 필수 — 타겟 확정 (서비스 · 디바이스 · 버전)

**⛔ 이 절차는 타겟을 확정하기 전에 시작하지 않는다.** XLT 시스템은 **서비스마다 키스페이스가 다르고, 같은 키가 서비스마다 다른 값으로 등록**돼 있다. 타겟을 잘못 고르면 멀쩡한 값을 위반으로 보고하거나 그 반대가 된다.

### 실측 근거 (2026-08-07) — 같은 키, 다른 값

**서비스 간 공통 키의 45%가 값이 갈린다.** (아래 수치는 **2026-08-07 조회 시점** 기준 — 등록값은 수시로 바뀌므로 절대값이 아니라 **비율과 구조**를 보라. 같은 날 감사 중 키 1개가 삭제돼 336→335로 변했다.) `Unifi`(2,131키) ∩ `Dapp Portal`(1,596키) = **공통 336키**, 그중 **152키(45%)** 가 다르다. 두 서비스가 **서로의 키를 구값 사본으로 보유**하고 있다 — `Dapp Portal`은 `UF_`(UIT) 구값 88키를, `Unifi`는 `unifi_promotion_` 구값 44키를 들고 있다.

| | `Dapp Portal` v2.6.0 | `Unifi` v1.6.6 |
|---|---|---|
| 총 키 | 1,596 | 2,131 |
| `UF_`(UIT) 키 | 244 | **2,000** |
| `UF_` 중 `{{0}}` 표기 | 1 | **279** |
| `UF_` 중 `{0}` 표기 | 32 | **0** |
| `UF_home_jpyc_banner_jackpot` ko | `{0}님이 {1} JPYC 받았어요!` | `{{0}}님이 {{1}} JPYC 받았어요!` |

두 서비스의 키 교집합은 336개이고, **그중 일부는 값이 갈린다**. `UF_`(UIT) 키의 정본은 **`Unifi` 서비스**이며 거기서는 `CLAUDE.md`의 UIT 규칙(`{{0}}`)이 그대로 지켜진다. `Dapp Portal`에 남아 있는 `UF_` 244키는 구·이관 사본으로 보인다(FE 확인 대상).

### 확정 절차 (사용자에게 반드시 묻는다)

1. **유효 타겟을 조회해 제시한다** — 목록 API가 없으므로 후보 프로브로 판별한다(§2-3).
   ```bash
   python3 scripts/fetch_xlt_registry.py --list-targets
   ```
   ```
   ✓ Dapp Portal    / WEB BROWSER  최신 v2.6.0  (버전 32개)
   ✓ Unifi          / WEB BROWSER  최신 v1.6.6  (버전 36개)
   ✓ Kaia Wallet    / WEB BROWSER  최신 v1.4.3  (버전 6개)
   ```
2. **사용자에게 서비스를 선택받는다.** 위 표(같은 키가 서비스마다 다르다는 사실)를 함께 제시한다. 임의로 고르지 않는다.
3. **디바이스** — 현재 실측상 유효한 값은 `WEB BROWSER` 하나뿐이다(`MOBILE`·`IOS`·`AOS` 등은 빈 배열). 후보가 하나면 그 사실을 알리고 확인만 받는다.
4. **버전을 선택받는다** — 목록을 보여주고 고르게 한다. 기본은 최신(`versionSeq` 최댓값)이지만 **최신이 배포 전 draft일 수 있으므로 사람이 확인**한다.
   ```bash
   python3 scripts/fetch_xlt_registry.py --service Unifi --list-versions
   ```
5. 확정된 `{서비스 · 디바이스 · 버전}`을 **리포트 헤더에 기록**한다 — "어느 버전과 대조했는지"가 없으면 리포트를 나중에 재현할 수 없다(스크립트가 자동으로 넣는다).

> **⛔ 캐시 금지 규칙 적용** — 등록값은 매 실행 API로 새로 조회한다. `scripts/xlt_registry.json`은 `glossary.json`과 같은 지위의 **같은 run 안 핸드오프용 산출물**이며, 이전 세션 파일을 원본 대신 재사용하지 않는다.

---

## 1. 전체 흐름

```
[0] 타겟 확정(서비스·디바이스·버전) ── 사용자 선택 필수
        ↓
[1] 등록값 조회      fetch_xlt_registry.py       → scripts/xlt_registry.json
[2] 용어집 조회      fetch_glossary.py           → scripts/glossary.json
        ↓
[3] 검증             verify_xlt_glossary.py      → reports/xlt/xlt_glossary_report_*.md
                                                 + reports/xlt/xlt_fix_proposals_*.json
        ↓
[4] 수정 제안 확인   사용자가 제안 JSON을 확인·편집 (채택/기각)
        ↓
[5] 엑셀 생성        verify_xlt_glossary.py --apply → xlt/registry_fix/xlt_output_*.xlsx
        ↓
[6] 시스템 업로드    ⛔ 사용자가 직접 수행 (쓰기 API 없음)
```

---

## 2. XLT 시스템 API

**읽기 전용이다.** 확인된 것은 GET 두 종류뿐이고 **쓰기(POST) 경로는 없다**. 업로드는 사람이 XLT 시스템 UI에서 수행한다. 쓰기 API를 추측해 시도하지 않는다 — 등록값 전량 덮어쓰기 위험이 있다.

### 2-1. 엔드포인트

```
① 버전 목록
GET https://xlt-api.linecorp.com/xlt/info/versions/{service}/{device}?limit={n}
→ {"code":"0","msg":"success","result":[{"versionSeq":12048,"versionName":"v1.6.6"}, ...]}

② 언어별 전체 등록값
GET https://xlt-api.linecorp.com/downloadXLT/{service}/{device}/{version}/{lang}/json
→ flat {"키": "번역문", ...}
```

| 파라미터 | 값 | 비고 |
|---|---|---|
| `service` | `Dapp Portal` · `Unifi` · `Kaia Wallet` | **공백 포함 — URL 인코딩 필수**. 대소문자 무시(`unifi`도 동작) |
| `device` | `WEB BROWSER` | 〃 |
| `version` | `v1.6.6` 등 | ①의 `versionName`. 최신 = `versionSeq` 최댓값(응답은 이미 내림차순) |
| `lang` | `ko_KR`·`ja_JP`·`en_US`·`th_TH`·`zh_TW` | **5개 외에는 HTTP 500**(`zh_CN` 등) |

### 2-2. 성질 (실측)

- **인증이 없다.** `Authorization`·쿠키·API 키 없이 200을 받는다. 사내망/VPN 전제로 추정한다 — **보장이 아니므로** 실패 시 사용자 export 폴백 경로를 유지한다.
- **언어를 서버가 합쳐주지 않는다.** 언어당 1회, 총 5회 호출 후 클라이언트가 `{키: {ko_KR:…, …}}`로 pivot한다.
- **`limit`은 상한이 아니라 요청 개수**다. 총 버전 수보다 크게 줘도 전체만 돌아온다(`limit=1000` → Unifi 36개).
- 응답의 `count` 필드는 항상 `0`이다 — **키 개수로 쓰지 않는다.**
- `json`은 포맷 지정 path segment다. `/xlsx` 등 형제 엔드포인트는 **코드 근거가 없다(추정)**.

### 2-3. 서비스·디바이스 목록 API는 없다 (프로브로 판별)

`/xlt/info/services`·`/xlt/info/devices`·`/v3/api-docs`·`/swagger-ui/*`는 전부 **404**, `/actuator/*`는 nginx **403**이다. 따라서 유효 조합은 **후보를 프로브해** 판별한다.

**판별 기준**: 유효하든 무효하든 **HTTP 200 + `code:"0"`** 이 온다. 구분은 `result` 배열이다.

| 요청 | 응답 |
|---|---|
| `Unifi` / `WEB BROWSER` | `result: [{versionSeq…}, …]` → **유효** |
| `Dapp Portal` / `MOBILE` | `result: []` → 무효 |
| `NoSuchService` / `WEB BROWSER` | `result: []` → 무효 |

후보 목록은 `scripts/fetch_xlt_registry.py`의 `CANDIDATE_TARGETS`에 있다. **새 서비스를 알게 되면 여기에 한 줄 추가**한다(목록 API가 생기기 전까지 이것이 유일한 조달 경로다).

### 2-4. 실패 처리

| 실패 | 증상 | 스크립트 처리 |
|---|---|---|
| VPN 미연결 | `ConnectionError`/`Timeout` | 안내 + exit 1 |
| 사내 프록시 로그인 페이지 | **200 + HTML** → `.json()`이 `ValueError` | `RuntimeError`로 잡아 안내 + exit 1 |
| API 논리 오류 | 200 + `code != "0"` | `msg` 출력 후 exit 1 |
| 언어별 키셋 불일치 | (실측은 동일하나 보장 없음) | 합집합 + **경고 출력**. 조용히 빈 값으로 채우지 않는다 |

---

## 3. Step 1 — 등록값 조회

```bash
python3 scripts/fetch_xlt_registry.py --service Unifi --device "WEB BROWSER"
# --version 미지정 시 최신을 채택하고 **채택 버전을 stdout에 출력**한다(사람이 확인)
```

산출물 `scripts/xlt_registry.json` (git 미추적):

```jsonc
{
  "metadata": { "service": "Unifi", "device": "WEB BROWSER", "version": "v1.6.6",
                "languages": [...], "total_keys": 2131, "fetched_at": "...", "source": "..." },
  "entries":  { "UF_home_title": { "ko_KR": "...", "ja_JP": "...", ... } }
}
```

`metadata`는 리포트가 인용하므로 **필수**다.

---

## 4. Step 2~3 — 용어집 조회 + 검증

```bash
python3 scripts/fetch_glossary.py scripts/glossary.json
python3 scripts/verify_xlt_glossary.py --registry scripts/xlt_registry.json --glossary scripts/glossary.json
```

**검증 로직은 새로 만들지 않는다.** `validate_translation.TranslationValidator`의 3단계를 그대로 돌린다 — 레지스트리를 엑셀과 같은 규격의 DataFrame으로 바꿔 넣을 뿐이다. 따라서 게이트에서 쓰는 판정 기준과 **완전히 같다**(단일 출처).

산출물 2종:

| 파일 | 내용 |
|---|---|
| `reports/xlt/xlt_glossary_report_{서비스}_{버전}_{날짜}.md` | 헤더(타겟·용어집 버전·조회 시각) + P0/P1/P2 요약 + **자동 치환 제안 표** + **검토 필요**(유형별 집계 + 상세) |
| `reports/xlt/xlt_fix_proposals_{...}.json` | 기계 치환 가능한 제안만 구조화 — Step 4의 편집 대상 |

### 4-1. 두 갈래로 나뉜다

| 갈래 | 무엇 | 처리 |
|---|---|---|
| **자동 치환 제안** | 용어집 `deprecated_terms`의 `pattern → recommend` — 금지 표기가 정확히 무엇으로 바뀌어야 하는지 용어집에 적혀 있다 | 제안 JSON에 `before`/`after`로 생성 |
| **검토 필요** | `용어 불일치`(terminology) · `용어집 위반`(exceptions) · 비표준 공백 · 언어 혼입 · placeholder 불일치 · 맞춤법 | **기계 치환 불가** — 리포트에만 싣고 사람이 판단 |

### 4-2. ⚠️ 전수 스윕은 오탐이 많다 — 등급을 그대로 읽지 않는다

레지스트리 전체(2,131키)를 돌리면 캠페인 단위 게이트와 **건수 규모가 다르다**. 실측(Unifi v1.6.6 × 용어집 v4.5):

```
P0 82건 · P1 2,110건 · P2 457건
  └ P1 중 2,018건이 '용어 불일치' — 대부분 정상 의역에 대한 오탐
  └ P2 457건은 '마침표 스타일' — 전수 모집단에서는 의미가 없다
```

- **P1 `용어 불일치` 대량 발생은 "위반 2천 건"이 아니라 용어집 매핑이 좁다는 신호**다. 반복 오탐 용어는 `md/landpress.md` 절차로 **용어집 보완을 권장**한다(번역 품질 게이트 (d-1)과 같은 취지).
- **P2 `마침표 스타일`은 전수 스윕에서 무시**한다 — "소수 스타일 검출"이라 모집단이 커지면 의미를 잃는다.
- 실제로 조치 가치가 높은 순서: **자동 치환 제안 → P0 비표준 공백(nbsp) → P0 언어 혼입 → P1 placeholder 불일치 → P1 맞춤법·띄어쓰기**.

---

## 5. Step 4 — 수정 제안 확인 (⛔ 사용자 승인 필수)

**제안을 자동 적용하지 않는다.** 제안 JSON을 사용자에게 제시하고, 채택/기각을 받은 뒤 **기각 항목을 JSON에서 삭제**하고 Step 5로 넘어간다.

### 5-1. 기계 치환의 한계 — 반드시 눈으로 본다

`pattern → recommend`는 단순 문자열 치환이라 **문맥에 따라 어색해진다.** 실측 예:

| 키 | before | after (기계) | 문제 |
|---|---|---|---|
| `unifi_promotion_jpyc_caution_contents7` | `…須保持**關注**至最終獎勵發放日，若中途解除，不論後續是否重新**關注**…` | `…須保持**加入好友**至…是否重新**加入好友**…` | 동사 자리에 명사구가 들어가 어색. **원어민 검토 필요** |

- **한 셀에 같은 금지어가 여러 번** 나오면 전부 치환된다 — 자리마다 적절한 표현이 다를 수 있다.
- 치환 후 문장을 `md/check.md` 기준으로 다시 읽고, 어색하면 제안을 **기각하고 사람이 다시 쓴 값으로 `after`를 교체**한다(JSON 직접 편집 허용).
- 용어집에 없는 도메인 용어가 반복되면 → **용어집 보완 권장**(`md/landpress.md`).

### 5-2. 제안 JSON 스키마

```jsonc
{
  "metadata": { "service": "...", "version": "...", "glossary_version": "4.5", ... },
  "proposals": [
    { "key": "ms_popup_oa_btn", "lang": "ja_JP",
      "before": "友達を追加する", "after": "友だちを追加する",
      "rule": "구 표기 '友達' → '友だち'", "note": "..." }
  ]
}
```

- **`before`는 건드리지 않는다** — Step 5의 무결성 가드가 이 값으로 등록값 변경을 감지한다.
- `after`는 사람이 고쳐도 된다. 항목 삭제 = 기각.

---

## 6. Step 5 — 업로드용 엑셀 생성

```bash
python3 scripts/verify_xlt_glossary.py \
  --registry scripts/xlt_registry.json \
  --apply reports/xlt/xlt_fix_proposals_Unifi_v1.6.6_20260807.json
```

- 엑셀 규격(properties + plurals, 첫 컬럼명 공백)은 **`export_to_xlt.create_xlt_excel`이 정본**이다 — 인라인 재구현 금지. 규격 상세는 `md/translate.md` Step 7.
- **변경된 키만** 담는다. 언어 셀은 5개 모두 채우되, 제안이 없는 언어는 **등록값 그대로** 넣는다(부분 업로드로 다른 언어가 비는 것을 막는다).
- 출력 위치는 **`xlt/registry_fix/`** 다. ⛔ `xlt/` 직하에 두지 않는다 — 캠페인 산출물과 섞이면 **잘못된 파일을 XLT에 업로드**할 수 있다.

### 6-1. 무결성 가드 (자동)

`--apply`는 제안의 `before`와 **현재 레지스트리 값을 대조**해 다르면 중단한다.

```
❌ 등록값이 제안 생성 시점과 다릅니다: ms_popup_oa_btn / ja_JP
   → 레지스트리를 다시 조회해 검증부터 재실행하세요(캐시 금지 규칙)
```

검증 후 누군가 시스템을 갱신했는데 낡은 제안으로 덮어쓰는 사고를 막는다. **가드가 걸리면 Step 1부터 다시** 한다.

---

## 7. Step 6 — 시스템 업로드 (⛔ 사용자 수행)

**쓰기 API는 없다.** 생성된 엑셀을 사용자에게 전달하고 XLT 시스템에 직접 업로드하도록 요청한다. Claude가 업로드하지 않는다.

업로드 후 확인:

1. `fetch_xlt_registry.py`로 **새 버전을 다시 조회**해 반영을 확인한다(버전이 올라갔으면 새 `versionName`으로).
2. 반영 확인 후 `verify_xlt_glossary.py`를 재실행해 해당 제안 건이 사라졌는지 본다.
3. 위키·엑셀에 같은 키가 실려 있으면 그쪽도 정합을 맞춘다(`md/translate.md` 키 단위 번역 패치 모드).

---

## 8. 정기 실행

수시 실행 또는 스케줄 태스크로 돌린다. **정기 실행에서도 §0의 타겟 확정은 생략하지 않는다** — 서비스가 늘거나 버전이 올라가면 대상이 달라진다. 스케줄로 고정 실행할 때는 **서비스·디바이스를 태스크에 명시**하고 버전만 최신을 따르게 한다.

```bash
# 1회 전체 실행 예시 (Unifi 최신)
python3 scripts/fetch_glossary.py scripts/glossary.json
python3 scripts/fetch_xlt_registry.py --service Unifi --device "WEB BROWSER"
python3 scripts/verify_xlt_glossary.py --registry scripts/xlt_registry.json
```

리포트는 `reports/xlt/`에 버전·날짜별로 쌓이므로 **회차 간 비교**가 가능하다 — 자동 치환 제안 건수가 줄지 않으면 업로드가 반영되지 않은 것이다.

---

## 9. 위키 페이지 대조 모드

> 특정 위키 페이지에 실린 XLT 키가 **시스템 등록값과 맞는지** 확인하고, **재사용 가능한 유사 키를 추천**한다. §1~7의 전수 스윕과 달리 **페이지 단위**다.

```bash
CONFLUENCE_PAT=... python3 scripts/compare_wiki_xlt.py \
  --page 4540065229 --registry scripts/xlt_registry.json
```

### 9-1. ⛔ 여러 서비스를 병합하지 않는다 (실측 사고)

한 페이지에 UIT(`UF_`)와 LV(`mini_`·`unifi_promotion_`) 키가 섞이면 **정본 서비스가 서로 다르다.** 이때 레지스트리를 `--registry`로 **여러 번 지정**한다. 스크립트는 이를 **합치지 않고 서비스별로 각각 대조**한다.

**왜 합치면 안 되는가** — 2026-08-07 실측:

```
Unifi 2,131키 ∩ Dapp Portal 1,596키 = 공통 336키
   그중 값이 갈리는 키 152개 (45%)   ← UF_ 88 · unifi_ 44 · app_ 7 · ms_ 6 · mini_ 4 …
```

두 서비스가 **서로의 키를 구값 사본으로 들고 있다.** 처음 구현은 "먼저 지정한 레지스트리가 이긴다"로 합쳤는데, 시즌3 페이지에서 **Unifi를 앞에 두자 10키가 「값 상이」로 오보**됐다 — 실제로는 전부 Dapp Portal(정본)과 일치했고, Unifi 쪽 구값 사본이 잡힌 것이었다. **지정 순서에 따라 결론이 뒤집혔다.**

### 9-2. 결과 버킷

| 버킷 | 의미 | 조치 |
|---|---|---|
| **ⓐ 등록값 동일** | 보유한 모든 서비스와 일치 | 없음 |
| **ⓑ 값 상이** | 보유한 **모든** 서비스와 다름 | 위키가 앞서갔거나(시스템 갱신 필요) 위키가 낡음 — 판단 필요 |
| **ⓔ 서비스 간 분기** | **일부 서비스와만** 일치 | 일치하는 쪽이 정본인지, 다른 서비스의 구값 사본도 정리할지 판단 |
| **ⓒ 미등록** | 어느 서비스에도 없음 | 신규 키 — 업로드 대기 상태인지 확인 |
| **ⓓ 유사 키 추천** | 다른 키에 같거나 비슷한 문구가 이미 등록됨 | 재사용·통합 검토 |

리포트는 `reports/xlt/wiki_xlt_compare_{pageId}_{서비스}_{날짜}.md`.

### 9-3. 파싱 주의 (실측 사고 2건)

- **정규식 `<tr>(.*?)</tr>`로 파싱하지 않는다.** Screen 표 XLT 컬럼의 중첩표에서 비탐욕 매칭이 끊겨 **XLT 컬럼 전체가 공란**으로 보인다(2026-08-05 사고). 스크립트는 스택 기반 `HTMLParser`를 쓴다.
- **XLT 컬럼에 표가 여러 개 올 수 있다.** 시즌3는 XLT 표 뒤에 **GA 이벤트 표**(`no | Event Name | Event Parameter | Description`)가 붙는다. 헤더에 `XLT Key`가 있는 표만 받는다 — 안 그러면 GA 이벤트명이 XLT 키로 잡혀 **미등록 17건 오보**가 난다(2026-08-07 실측).
- 표는 **인덱스가 아니라 헤더 시그니처**로 찾는다(`Screen`+`XLT` / `XLT Key`+5개 언어 컬럼) — 페이지마다 표 개수·순서가 다르다.

### 9-4. 번역 흐름과의 관계

`md/translate.md` Step 2-1(유사 키 제안)이 **신규 키를 만들기 전** 개별 문구를 검색한다면, 이 모드는 **이미 위키에 실린 페이지 전체**를 사후 점검한다. 위키 갱신 후 정합성 확인용으로 쓴다.

---

## 10. 하지 않는 것 (과설계 방지)

| 하지 않을 것 | 이유 |
|---|---|
| **쓰기(POST) 시도** | 확인된 것은 읽기 API뿐. 등록값 전량 덮어쓰기 위험 |
| 검증 로직 재구현 | `validate_translation.py`가 단일 출처. 등급 의미가 갈리면 게이트 리포트와 비교 불가능해진다 |
| 제안 자동 적용 | 기계 치환은 문맥에서 어색해진다(§5-1 실측) |
| `xlt_registry.json` 자동 탐색·자동 로드 | 캐시 금지 규칙 위반. `--registry` 명시 필수 |
| 레지스트리를 번역 게이트의 **필수** 입력으로 승격 | VPN 없는 환경에서 게이트 전체가 실패한다. 항상 옵셔널 |
| 전수 스윕 결과로 P1 등급 강등 | 등록값이 원인인 진짜 위반(nbsp 48건 등)을 가린다. 근거는 `reports/research/xlt_api_feasibility_2026-08-07.md` §5-2 |
