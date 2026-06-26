# Landpress 용어집 관리·업데이트 가이드

> XLT 번역 검증·작업에서 사용하는 용어집(glossary)의 **출처·갱신 방법**을 정의한다.
> 용어집 보완이 필요할 때 `md/check.md`·`md/guide.md`·CLAUDE.md 게이트 (d-1)에서 이 문서를 참조한다.

---

## 1. 용어집 출처 (읽기 전용)

- 용어집 원본은 **LINE Landpress CMS 콘텐츠** `web3_xlt_json` 이다.
- 조회 엔드포인트(GET, `scripts/fetch_glossary.py`):
  ```
  https://landpress-content.line-scdn.net/contents/v2/projects/wdmwbfuv10x39bukv58ocevp/collections/web3_xlt_json/item
  ```
  응답의 `body.exceptions` 객체(= `{ metadata, exceptions, terminology }`)가 용어집이다.
- **⚠️ Claude(툴체인)에서는 읽기만 가능하다.** API에 쓰기(PUT/POST) 경로가 없다.
- `scripts/glossary.json`은 조회 결과를 저장하는 **로컬 캐시**일 뿐이다(`.gitignore` 대상, 매 조회 시 덮어써짐). **원본이 아니며, 원본 대신 임의 수정하지 않는다**(CLAUDE.md '캐시 금지 규칙').

---

## 2. 업데이트 주체와 Claude의 역할

- **업데이트 주체 = 사용자**: 각 사용자가 **Landpress CMS를 직접 편집**한다(전체 JSON을 붙여넣는 방식).
- **Claude의 역할 = 산출물 전달(핸드오프)**: 직접 쓸 수 없으므로, 검증 중 추가/수정이 필요한 용어를 발견하면 **갱신된 전체 JSON 산출물**을 만들어 사용자에게 전달한다. 사용자가 그 JSON을 Landpress CMS에 붙여넣어 반영한다. 반영 후 다음 `fetch_glossary` 조회 때 자동으로 최신본이 적용된다.
- **금지**: 로컬 `scripts/glossary.json` 캐시를 고쳐 "반영한 척" 하지 않는다(다음 조회 때 덮어써지고 원본과 어긋남).

---

## 3. JSON 구조

```jsonc
{
  "metadata": {
    "source": "guide.md",
    "version": "2.2",                 // 갱신 시 올림 (semver-like)
    "languages": ["ko_KR","en_US","ja_JP","zh_TW","th_TH"],
    "created_at": "2026-05-13T15:30:00+09:00",  // 최초 생성 — 유지
    "description": "...변경 사유 요약...",
    "total_terms": 29,                // terminology 실제 개수와 일치
    "last_updated": "2026-06-26",     // 갱신일(YYYY-MM-DD)
    "total_exceptions": 8             // exceptions 실제 개수와 일치
  },
  "exceptions": [                     // 번역하지 않고 그대로 둘 표기 (고유명사·브랜드·기술·암호화폐)
    { "id":"1","note":"...","active":true,"pattern":"*PIN*",
      "translations":{ "en_US":"PIN","ja_JP":"PIN","ko_KR":"PIN","th_TH":"PIN","zh_TW":"PIN" },
      "exception_type":"context" }    // context | technical | brand | crypto
  ],
  "terminology": {                    // ko_KR → 5개 언어 표준 번역
    "거래": { "en_US":"transaction","ja_JP":"取引","ko_KR":"거래","th_TH":"ธุรกรรม","zh_TW":"交易" }
  }
}
```

---

## 4. 용어 추가/수정 기준

**terminology 추가 기준 (모두 충족):**
1. 도메인에서 **반복 사용**되는데 용어집에 **없는** 용어(예: 미션·리워드·캐시백).
2. **5개 언어 일관 표기**가 정해질 것 — 가능하면 **기존 파일의 실제 번역에서 도출**(임의 신조 금지). 번체 정자(`產`/`臺`) 등 표기 규칙은 `md/check.md` 준수.
3. **추가 전 파일 내 일관성 검증(필수)**: 추가하려는 용어가 들어간 **모든 행**의 다른 언어 셀이 제안 표기와 일치하는지 확인한다. **불일치하면 그 용어 추가가 오히려 새 P1(용어 불일치)을 만든다** — 먼저 원문/번역을 일관되게 정리하거나, 추가를 보류한다.

**exceptions 추가 기준:** 고유명사·브랜드명·기술용어·암호화폐 심볼 등 **전 언어 원어 유지** 대상. `pattern`은 `*TERM*`, 단어 경계 주의(도메인·식별자 내 부분 문자열 제외 — `md/check.md` 2단계-B).

**수정·제외:** 사용자 확정으로 "정상"이 된 표현은 오류 목록/blocklist에서 제외한다(예: `피부결과 윤곽` = 피부결+윤곽 확정).

---

## 5. 절차 (체크리스트)

```
□ 1. 현재 전체 용어집을 API로 조회 (fetch_glossary — 원본 최신본)
□ 2. 추가/수정 후보 용어 도출 (검증 리포트의 'd-1 용어집 보완 권장'에서)
□ 3. 후보의 5개 언어 표기를 기존 파일 번역과 대조해 일관성 확인 (불일치 시 보류/선정리)
□ 4. 전체 JSON에 반영 — terminology/exceptions 추가, metadata 갱신
     (version↑, total_terms/total_exceptions=실제 수, last_updated=오늘, created_at 유지, description에 사유)
□ 5. 갱신된 전체 JSON + 변경 요약(added/changed 목록)을 사용자에게 전달
□ 6. 사용자가 Landpress CMS(web3_xlt_json)에 붙여넣어 반영
□ 7. (이후) fetch_glossary 재조회 시 최신본 자동 적용 확인
□ 8. md/glossary-changelog.md에 버전·날짜·변경요약 기재 후 git 커밋
```

---

## 8. 변경 이력 관리

용어집 원본은 Landpress(API 읽기 전용)라 git으로 직접 버전 관리가 안 된다. 변경의 **무엇을·언제·왜**는 **[`md/glossary-changelog.md`](glossary-changelog.md)** 에 기록해 git에서 추적한다. **용어집을 갱신할 때마다 그 파일에 항목을 추가**하고 커밋한다(§5 체크리스트 8단계).

---

## 6. 산출물

| 산출물 | 내용 |
|---|---|
| **갱신된 전체 JSON** | Landpress CMS에 그대로 붙여넣을 수 있는 완전한 `{metadata, exceptions, terminology}` |
| **변경 요약** | 추가/수정된 용어 목록 + 각 용어의 5개 언어 표기 + 근거(어느 파일/행에서 도출) |

> 부분 조각(추가 용어만)이 아니라 **항상 전체 JSON**을 산출한다 — 사용자가 통째로 붙여넣기 때문.
>
> ⛔ **순수 JSON만 제공한다**: 붙여넣기용 JSON은 ` ```json ` 코드블록 하나로만 낸다. **bash 명령·`cat` 출력·설명 텍스트 등 비-JSON을 섞지 않는다** — 사용자가 함께 복사하면 CMS에서 **invalid json** 오류가 난다.

---

## 7. 용어집 조회·표시 규칙 (사용자 요청 시)

사용자가 **"용어집 확인 / 보여줘 / 조회 / 어떤 용어 있어?"** 등 용어집 열람을 요청하면, **원문 JSON 덤프가 아니라 사람이 보기 쉬운 표**로 정리해 제시한다.

1. **최신 조회 필수**: `scripts/fetch_glossary.py`로 **원본(Landpress)을 새로 조회**한다(로컬 캐시 신뢰 금지 — 캐시 금지 규칙).
2. **요약 한 줄**: `version · terminology 수 · exceptions 수 · last_updated`.
3. **용어(terminology) 표** — ko_KR 기준, 5개 언어 컬럼:

   | 한국어 | en_US | ja_JP | zh_TW | th_TH |
   |---|---|---|---|---|
   | 거래 | transaction | 取引 | 交易 | ธุรกรรม |

4. **예외(exceptions) 표** — 전 언어 동일 표기는 한 칸으로:

   | pattern | 유형 | 표기(전 언어 동일) | 비고 |
   |---|---|---|---|
   | *PIN* | context | PIN | 고유명사 - 그대로 유지 |

5. 항목이 많으면 가나다/알파벳 순 정렬하거나 카테고리(금융·UI·인증 등)로 묶어 가독성을 높인다. 특정 용어만 물으면 해당 행만 표로 보여준다.
