# Landpress 용어집 관리·업데이트 가이드

> XLT 번역 검증·작업에서 사용하는 용어집(glossary)의 **출처·갱신 방법**을 정의한다.
> 용어집 보완이 필요할 때 `md/check.md`·`md/guide.md`·CLAUDE.md 게이트 (d-1)에서 이 문서를 참조한다.

---

## 1. 용어집 출처

- 용어집 원본은 **LINE Landpress CMS 콘텐츠** `web3_xlt_json` 이다.
- 조회 엔드포인트(GET, `scripts/fetch_glossary.py`):
  ```
  https://landpress-content.line-scdn.net/contents/v2/projects/wdmwbfuv10x39bukv58ocevp/collections/web3_xlt_json/item
  ```
  응답의 `body.exceptions` 객체(= `{ metadata, exceptions, terminology }`)가 용어집이다.
- **편집(붙여넣기) URL — 사용자가 직접 여는 Landpress CMS 편집 화면**:
  ```
  https://landpress-content-v2.linecorp.com/projects/wdmwbfuv10x39bukv58ocevp/content/collections/web3_xlt_json/items?env=main
  ```
  ⛔ **용어집 갱신 JSON을 산출·전달할 때마다 이 편집 URL을 반드시 함께 제공**한다 — 사용자가 바로 CMS로 이동해 붙여넣을 수 있도록.
- **공개 조회 API(`landpress-content.line-scdn.net`)는 읽기 전용이다** — 쓰기 경로가 없다.
- **⚠️ 단, CMS 백오피스 API(`landpress-content-v2.linecorp.com`)에는 쓰기 경로가 있다**(2026-09-12 실측) — 브라우저 로그인 세션이 있으면 Claude가 직접 저장·공개까지 할 수 있다. 절차·제약은 **§10**을 따른다.
- `scripts/glossary.json`은 조회 결과를 저장하는 **로컬 캐시**일 뿐이다(`.gitignore` 대상, 매 조회 시 덮어써짐). **원본이 아니며, 원본 대신 임의 수정하지 않는다**(CLAUDE.md '캐시 금지 규칙').

---

## 2. 업데이트 주체와 Claude의 역할

- **반영 결정권 = 사용자**: 용어집은 **전 서비스 공용 라이브 데이터**라 누가 쓸지는 사용자가 정한다.
- **Claude의 역할 = 산출물 준비 + 반영 방식 확인 + (지시 시) 직접 반영**: 검증 중 추가/수정이 필요한 용어를 발견하면 **갱신된 전체 JSON 산출물**을 만들고, ⛔ **사용자에게 반영 방식을 묻는다**(§10-5 1번). 답변에 따라 —
  - **"직접 해줘"** → Claude가 CMS API로 PUT·공개까지 수행(§10)
  - **"내가 할게"** → 전체 JSON + 편집 URL을 전달하고 사용자가 붙여넣기
  어느 쪽이든 반영 후 `fetch_glossary` 재조회로 **전건 대조**해 확인한다.
- ⛔ **묻지 않고 직접 쓰지 않는다.** 동시에, **묻지 않고 산출물만 던지고 끝내지도 않는다** — 반영 방식을 확인하는 것이 기본 동작이다.
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
    "updated_by": "hogeun (hogeun.kim.lnxt@gmail.com)",  // 이번 갱신을 요청/승인한 사람 (v5.3 신설, 자기신고 값)
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

### 3-1. `updated_by` (편집자 자기신고 — v5.3 신설)

- **무엇인지**: Landpress API에는 실제 CMS 편집자 로그가 없다(누가 붙여넣었는지 시스템이 기록하지 않음). `updated_by`는 그 자리를 메우는 **자기신고 필드**로, "이번 갱신을 요청/승인한 사람"을 매 갱신 때마다 기록한다.
- **값 결정 순서**: ① 세션에 사용자 식별 정보(userEmail 등 harness 컨텍스트)가 있으면 그 값을 쓴다(예: `hogeun (hogeun.kim.lnxt@gmail.com)`). ② 없으면 사용자에게 직접 물어 받는다. ③ 임의로 "Claude"·"AI" 등으로 채우지 않는다 — 실제 반영을 요청/승인한 사람을 남기는 것이 목적이다.
- **한계**: Landpress 실제 편집자와 다를 수 있다(다른 팀원이 대신 붙여넣을 수 있음). 이 필드는 "누가 이 변경을 요청했는지"를 추적하는 것이지 "누가 CMS 버튼을 눌렀는지"를 추적하는 것이 아니다.
- **갱신 시 필수**: 이후 모든 갱신(§5 체크리스트 4단계)에서 `updated_by`를 함께 채운다.

---

## 4. 용어 추가/수정 기준

**terminology 추가 기준 (모두 충족):**
1. 도메인에서 **반복 사용**되는데 용어집에 **없는** 용어(예: 미션·리워드·캐시백).
2. **5개 언어 일관 표기**가 정해질 것 — 가능하면 **기존 파일의 실제 번역에서 도출**(임의 신조 금지). 번체 정자(`產`/`臺`) 등 표기 규칙은 `md/check.md` 준수.
3. **추가 전 파일 내 일관성 검증(필수)**: 추가하려는 용어가 들어간 **모든 행**의 다른 언어 셀이 제안 표기와 일치하는지 확인한다. **불일치하면 그 용어 추가가 오히려 새 P1(용어 불일치)을 만든다** — 먼저 원문/번역을 일관되게 정리하거나, 추가를 보류한다.
4. **권장 표기는 XLT 등록값으로 실측한다(2026-08-24 신설)**: 5개 언어 표기 후보를 정할 때 `scripts/fetch_xlt_registry.py`로 **각 표기의 실사용 건수**를 세고, **실사용 0건 표기는 권장하지 않는다**. 기준 2·3이 「대상 파일 안」을 보는 것과 달리 이 기준은 **서비스 전체 등록값**을 본다 — 파일에 없어도 다른 화면에서 이미 굳어진 표기가 정본이다. 등재값과 등록값이 충돌하면 **같은 키스페이스 형제 키 우선**(HANDOFF 전역 결정). 상세·실측 사례는 `md/check.md` 함정 2-1 「일반 규칙 ②」.

**exceptions 추가 기준:** 고유명사·브랜드명·기술용어·암호화폐 심볼 등 **전 언어 원어 유지** 대상. `pattern`은 `*TERM*`, 단어 경계 주의(도메인·식별자 내 부분 문자열 제외 — `md/check.md` 2단계-B).

**수정·제외:** 사용자 확정으로 "정상"이 된 표현은 오류 목록/blocklist에서 제외한다(예: `피부결과 윤곽` = 피부결+윤곽 확정).

---

## 5. 절차 (체크리스트)

> ⛔ **스킵 금지 게이트 — 8단계를 순서대로 모두 수행한다(하나도 건너뛰지 않는다).** 특히 다음은 누락 시 용어집이 오염되거나 이력이 끊기므로 **차단 단계**다:
> - **3단계(추가 전 파일 내 5개 언어 일관성 검증)** — 미검증 추가는 새 P1(용어 불일치)을 만든다. 불일치면 추가를 **보류**한다.
> - **6단계(반영 방식 확인 → CMS 반영)** — 산출물만 만들고 끝내지 않는다. **반영을 누가 할지 먼저 묻고**(§10-5 1번) 답변대로 처리한다. 어느 쪽이든 **7단계 재조회 대조**로 반영을 확인한다. 로컬 `glossary.json`을 고쳐 "반영한 척" 금지.
> - **5b단계(기획자 가이드 zip 갱신·전달)** — **사용자가 용어집을 반영하는 창구가 가이드 페이지**다(§5-1). 가이드를 갱신하지 않으면 사용자가 붙여넣을 최신 JSON이 어디에도 노출되지 않고, 가이드의 용어집 이력이 끊긴다.
> - **8단계(`glossary-changelog.md` 기재 + 커밋)** — 원본이 git 추적 안 되므로 이력 기록을 생략하면 변경 추적이 끊긴다.

```
□ 1. 현재 전체 용어집을 API로 조회 (fetch_glossary — 원본 최신본)
□ 2. 추가/수정 후보 용어 도출 (검증 리포트의 'd-1 용어집 보완 권장'에서)
□ 3. 후보의 5개 언어 표기를 기존 파일 번역과 대조해 일관성 확인 (불일치 시 보류/선정리)
□ 3b. ⛔ 후보 표기의 XLT 등록값 실사용 건수 실측 (fetch_xlt_registry — 0건 표기는 권장 금지 · §4 기준 4)
□ 4. 전체 JSON에 반영 — terminology/exceptions 추가, metadata 갱신
     (version↑, total_terms/total_exceptions=실제 수, last_updated=오늘, updated_by=요청/승인자(§3-1), created_at 유지, description에 사유)
□ 5. 갱신된 전체 JSON + 변경 요약(added/changed 목록)을 사용자에게 전달
□ 5b. ⛔ 기획자 가이드(dropweb) zip을 같은 작업에서 갱신해 전달 (§5-1 — 필수, 제안 아님)
□ 6. ⛔ 반영 방식을 사용자에게 묻는다 → 답변대로 반영 (§10-5 1번)
       ① Claude가 CMS API로 직접 반영  ② 사용자가 전달 JSON을 CMS에 붙여넣기
□ 7. ⛔ fetch_glossary 재조회 → 전달한 산출물과 **전건 대조**해 반영 확인(누락·이전 값 잔존 실제 발생)
□ 8. md/glossary-changelog.md에 버전·날짜·변경요약 기재 후 git 커밋
```

---

### 5-1. ⛔ 용어집 갱신 시 기획자 가이드 동반 갱신 (필수 — 2026-07-28 신설)

**용어집 버전이 올라가면(terms/exceptions 추가·수정·삭제 무관) 같은 작업에서 기획자 가이드 사이트 zip(`dropweb/web3_planning_v*.zip`)을 반드시 함께 갱신해 사용자에게 전달한다.** CLAUDE.md '📣 기획자 가이드(dropweb) 최신화 제안 규칙'의 **제안(승인 후 진행) 대상이 아니라 무조건 수행하는 필수 단계**다 — 용어집만 이 규칙의 예외다.

**이유**: 사용자는 **가이드 페이지의 용어집 탭에서 최신 전체 JSON을 복사해 Landpress CMS에 붙여넣는다**(반영 창구). 가이드가 구버전이면 ⓐ 붙여넣을 최신 JSON이 사용자에게 노출되지 않고, ⓑ 가이드에 있는 **용어집 업데이트 이력**이 실제 버전과 어긋난다.

**⛔ 0단계 — 베이스 확정 = `git pull` 후 `guide/` HEAD (2026-08-10 개정, 차단 단계)**

**가이드 소스의 정본은 git 추적 디렉토리 `guide/`다**(index.html·style.css·script.js·img/). `dropweb/web3_planning_v*.zip`은 **게시용 빌드 산출물**일 뿐이며(.gitignore 유지) zip을 베이스로 편집하지 않는다.

1. **`git pull --rebase` 후 `guide/`를 베이스로 편집한다.** 최신 판별은 `git log --oneline -3 -- guide/` — zip 포렌식(푸터 버전+임베드 버전+mtime 3값 대조)은 폐지한다.
2. **버전 번호 = `guide/index.html` 내부 버전 + 1.** 파일명 최댓값이 아니다. zip 파일명은 내부 버전과 일치시킨다.
3. **zip은 커밋 직전에 `guide/`에서 생성한다**: `cd guide && zip -qr ../dropweb/web3_planning_vN.zip . -x ".*"`. **zip을 쓰기 직전 `git fetch` + `dropweb/` 재확인** — 편집 시작 후 다른 세션이 새 버전을 만들었을 수 있다(아래 2026-08-10 사고).
4. **`guide/` 편집과 같은 커밋으로 푸시한다.** 병렬 세션이 같은 구간을 고치면 push가 충돌로 막힌다 — 이것이 이 설계의 목적이다(무음 덮어쓰기 → 감지 가능한 충돌).
5. **게시 확인 후 태그**: 사용자가 드랍웹 게시를 확인해 주면 `git tag guide-vN && git push --tags`. **라이브에 무엇이 있는지는 태그가 정본**이다(repo HEAD가 라이브보다 앞설 수 있다).

- ⚠️ **실측 사고(2026-08-10) — 이 개정의 계기**: 두 세션이 병렬로 같은 파일명 `v23.zip`을 만들어 **나중에 쓴 쪽이 앞의 것을 무음으로 덮어썼다**(용어집 v4.7 반영본 유실 → 원본 JSON이 커밋돼 있어 v25로 재적용). zip은 git 미추적이라 로컬 복구가 불가능했다. 0단계 판별을 **작업 시작 때만 하고 쓰기 직전에 재확인하지 않은 것**이 직접 원인이다.
- ⚠️ **실측 사고(2026-07-30)**: `v4.zip`의 mtime이 최신이라 베이스로 오판(실제 최신은 `v6.zip`). — zip 포렌식 시절의 사고로, git 관리 전환의 배경이다.
- `dropweb/`의 과거 zip은 참고용으로만 남긴다. 파일명과 내용이 어긋난 zip을 발견하면 즉시 사용자에게 보고한다.

**갱신 대상 (용어집 탭 — 4곳 모두, 하나라도 빠지면 미완료)**

| # | 위치 | 갱신 내용 |
|---|---|---|
| 1 | 용어집 이력 표 | 새 버전 행 추가 (`버전 / 날짜 / terms 수 / 변경 요약`) — `md/glossary-changelog.md`와 동일 내용 |
| 2 | 전체 용어 표 | 가나다순 전체 재생성 (신규 용어 포함) |
| 3 | 용어 수 표시·헤더 | `N개 용어 표시 중`, `전체 용어집 — vX.Y · N용어`, `최신 전체 JSON 보기 — vX.Y · N terms · M exceptions (날짜)` |
| 4 | 임베드 전체 JSON (`#glossaryJsonData`) | 갱신된 **전체 JSON**으로 교체 (HTML 이스케이프 — 사용자가 「📋 JSON 복사」로 그대로 복사) |

- 가이드 본문(가이드 탭)에 **용어 수·버전이 하드코딩된 곳**(헤더 chip, 용어집 섹션 note 등)도 함께 최신화한다.
- **버전 결정**: 용어집 갱신만이면 가이드 현행 버전 갱신, 규칙·기능 변경이 함께 있으면 `vN+1`로 올리고 업데이트 이력 탭에 항목·카드를 추가한다(`<title>`·헤더 배지·푸터 버전 표기도 함께).
- **검증(필수)**: 갱신 후 임베드 JSON이 **파싱되는지**(`json.loads(html.unescape(...))`)와 **전체 용어 표 행 수 = terms 수 + 헤더 1**을 확인한 뒤 zip을 만든다. 브라우저로 열어 용어집 탭·검색 필터 동작까지 확인하면 더 좋다.
- **게시는 사용자가 수행**한다 — Claude는 zip을 전달하고 드랍웹 게시를 요청한다(게시 규격 `md/dropweb-guide.md`).

**⛔ 이 단계는 `glossary-guide-updater` 에이전트에 위임한다 (2026-07-30 신설, 권장)**

`.claude/agents/glossary-guide-updater.md` — 갱신 4곳 + 검증 5종을 체크리스트로 처리하는 전담 에이전트다. §5-1이 "필수 동반"인데도 **가이드가 v3.5, 라이브가 v3.9로 4개 버전 밀려 있던 실측**(2026-07-30)이 위임 근거다.

- **호출 시점**: 등재값 확정·일관성 검증(§5-3)·사용자 컨펌이 **끝난 뒤**. 확정 전체 JSON 경로와 대상 zip 경로를 넘긴다.
- **역할 분담**: 에이전트는 **zip 갱신·검증만** 한다. **일관성 검증·등재값 판단·changelog 기재·git 커밋·사용자 전달·게시는 메인/사용자**가 담당한다(에이전트는 `md/**`·`scripts/glossary.json` 수정 금지, git 명령 금지 — 동시 커밋 충돌 방지).
- **병렬 이득이 실제로 나는 경우**: 등재 승인 후에도 번역·위키 작업이 남아 있을 때. 메인이 그 작업을 계속하는 동안 zip이 준비된다. 반대로 승인·CMS 반영 대기가 지배적인 흐름에서는 시간 단축 효과가 거의 없다 — **누락 방지가 주된 이득**임을 이해하고 쓴다.
- 반환된 검증 수치(임베드 JSON 동치·표 행 수·태그 균형·구표기 잔존·zip 파일 수)를 **메인이 사용자 보고에 그대로 포함**한다.

---

## 8. 변경 이력 관리

용어집 원본은 Landpress CMS에 있어 git으로 직접 버전 관리가 안 된다. 변경의 **무엇을·언제·왜**는 **[`md/glossary-changelog.md`](glossary-changelog.md)** 에 기록해 git에서 추적한다. **용어집을 갱신할 때마다 그 파일에 항목을 추가**하고 커밋한다(§5 체크리스트 8단계).

---

## 6. 산출물

| 산출물 | 내용 |
|---|---|
| **갱신된 전체 JSON** | Landpress CMS에 그대로 붙여넣을 수 있는 완전한 `{metadata, exceptions, terminology}` |
| **변경 요약** | 추가/수정된 용어 목록 + 각 용어의 5개 언어 표기 + 근거(어느 파일/행에서 도출) |
| **Landpress 편집 URL** | §1의 편집(붙여넣기) URL — JSON과 **항상 함께** 제공(사용자가 바로 CMS로 이동) |
| **갱신된 기획자 가이드 zip** | `dropweb/web3_planning_v*.zip` — 용어집 탭 4곳(이력 표·전체 용어 표·수치·임베드 JSON) 최신화 (§5-1 **필수**). 게시는 사용자가 수행 |

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

---

## 9. 용어집 외 Landpress 콘텐츠 — API 조회·대조 규칙

Landpress의 콘텐츠는 용어집뿐 아니라 **다른 컬렉션도 동일한 `landpress-content.line-scdn.net` API로 조회할 수 있다.** 따라서 용어집 외의 Landpress 콘텐츠를 다룰 때도 다음을 따른다.

1. **API 정보를 사용자에게 확인한다** — 프로젝트 ID·컬렉션명·아이템 ID 등 조회에 필요한 정보를 먼저 받는다. 임의로 추측하지 않는다.
2. **원본을 직접 조회한다** — 받은 정보로 API를 호출해 **현재 등록값을 원본에서 새로 가져온다**(로컬 캐시·이전 조회 결과 신뢰 금지 — CLAUDE.md '캐시 금지 규칙').
3. **산출물과 대조한다** — 사용자가 CMS에 반영한 뒤에는 **반드시 다시 조회해 전달한 산출물과 필드·언어 단위로 대조**하고 그 결과를 보고한다. 붙여넣기 누락·이전 값 잔존은 실제로 발생한다.
4. **쓰기** — 공개 조회 API에는 쓰기 경로가 없지만 **CMS 백오피스 API로는 저장·공개까지 가능하다**(§10). 기본은 산출물 전달이고, 사용자가 지시하면 Claude가 직접 PUT한다. 어느 쪽이든 **반영 후 재조회 대조**(위 3번)는 생략하지 않는다.

### 9-1. ⛔ 응답 구조 — 두 API가 다르다 (2026-09-12 실측)

**파싱 실패의 원인은 대부분 "환경이 달라서"가 아니라 "다른 API를 보고 있어서"다.** 같은 콘텐츠라도 **공개 조회 API**와 **CMS 백오피스 API**의 응답 봉투(envelope)가 서로 다르다.

| | 공개 조회 `landpress-content.line-scdn.net` | CMS 백오피스 `landpress-content-v2.linecorp.com` |
|---|---|---|
| 봉투 | **있다** — `{ "header": {...}, "body": {...} }` | **없다** — 아이템 객체가 곧 응답 최상위 |
| 진짜 상태 | **`header.statusCode`** (HTTP는 항상 200) | **HTTP status** (400/401/404가 그대로 온다) |
| 다건(LIST) | `body.total` + `body.items[]` | 목록 경로는 파라미터 요건이 달라 `/items`만으로는 400 — **`/items/{id}`로 단건 조회**가 확실하다 |
| 단건(SINGLE) | `body.{필드명}` (`/item` 엔드포인트) | 최상위 `.{필드명}` |
| 필드 위치 | **아이템 직속** — `body.items[0].{필드명}` | **아이템 직속** — 응답 최상위 `.{필드명}` |
| 부가 키 | `id·locale·primaryLocale·postId·published·_env` | 위 + **`_publishReservations`** |

```
공개:  GET  /contents/v2/projects/{pid}/collections/{col}/items?locale=ko_KR
       → {"header":{"statusCode":200},"body":{"total":1,"items":[{"id":1,"published":true,"benefit_more":{...}}]}}
CMS :  GET  /api/v1/projects/{pid}/collections/{col}/items/{id}?locale=ko_KR
       → {"id":1,"published":true,"benefit_more":{...},"_publishReservations":[]}
```

- ⛔ **`data.items[].values.{필드}` 형태는 어느 API에도 없다** — `data`·`values` 래핑은 존재하지 않는다. (계기: 2026-09-12 UIT prod 검증에서 `data`/`values` 가정으로 파서를 짰다가 `items=0`으로 나와 "등록 실패"로 오판할 뻔했다. 실제 데이터는 정상이었다.)
- ⛔ **로케일 파라미터는 공개·CMS 둘 다 `?locale=`이다** (2026-09-13 실측으로 정정 — 이전 기술 「CMS는 `?_locale=`, 바꿔 쓰면 400」은 **틀렸다**). **`?_locale=`은 CMS 웹 UI 전용**이며 API는 **400을 주지 않고 조용히 무시**한다.
  - 실측(prod `oam_message_task_multi` postId `1956` · primary `en_US`, `ko_KR` 보유): `?locale=ko_KR` → **200 `ko_KR`** · `?_locale=ko_KR` → **200 `en_US`**(primary) · 파라미터 없음 → **200 `en_US`**.
  - **가장 위험한 실패 방식이다** — 에러 없이 200이 오고 **다른 언어를 보면서 맞다고 착각**한다. 로케일 대조는 응답의 `locale` 필드를 반드시 확인한다.
- **환경·프로젝트에 따라 달라지지 않는다** — 같은 공개 API를 UIT beta·UIT prod·LV beta·용어집 4개 프로젝트에 호출해 **응답 구조가 전부 동일함을 실측**했다. beta에서 되던 파서가 prod에서 안 되면 스키마 차이를 의심하기 전에 **엔드포인트·파라미터를 먼저 확인**한다.
- **`items` 배열이 비면 데이터가 없는 게 아닐 수 있다** — ⓐ 봉투를 잘못 파싱했거나, ⓑ `?locale=`을 생략해 `primaryLocale` 항목만 돌아온 경우다(§9 3번 대조 시 자주 걸린다). **원시 응답을 한 번 그대로 찍어 확인**한 뒤 판단한다.

### 9-2. `landpress/` 산출물 작성 규칙 — XLT가 아닌 제3의 경로 (2026-09-01 신설 · HANDOFF.md에서 이관)

가변 목록·병원별 데이터처럼 **XLT로 관리할 수 없는 문구**는 Landpress에 등록해 FE가 읽는다. 저장소 산출물은 `landpress/` 아래에 둔다.

| 항목 | 규칙 |
|---|---|
| 파일명 | `{필드}_{locale}.json` (예: `landpress/cu_10000/checkout_ko_KR.json`) |
| 리스트형 필드 | `{"items":[…]}` |
| 오브젝트형 필드 | 필드를 직접 노출 |
| 식별자 | **JSON에 넣지 않는다** — API의 `uid`로 처리 |
| 섹션 제목 | **XLT에 있으면 JSON에서 뺀다.** 없거나 병존 승인 시에만 `title` 포함 |

- ⚠️ **번역 게이트는 그대로 적용된다** — 엑셀이 아니어도 **화면에 출력되는 문구**이므로 CLAUDE.md 게이트를 건너뛰지 않는다. 검증용 **임시 엑셀**을 만들어 `validate_translation.py`를 돌린다.
- ⭐ **정본은 로컬 JSON이 아니라 실등록값이다**(2026-09-03) — `landpress/*.json`과 실제 등록값은 **구조·값이 갈릴 수 있다**(실측: `menu.price`가 로컬은 오브젝트, 실등록은 문자열). 대조는 항상 §9-1의 공개 조회 API 응답 기준.
- 🔴 **조회 시 `?locale=`를 빠뜨리지 않는다**(2026-09-04 실측) — 생략하면 `primaryLocale` 항목만 돌아온다. 클리닉 `k_pick_clinic_product`는 primary가 **`en_US`인데 값이 한국어 구버전**이라, ko 항목을 보지 않고 「미반영」으로 **두 번 오판**했다(파라미터 이름은 §9-1 ⛔ 항목 참조).
- ⭐ **로케일별로 item id가 다르고 `postId`로 묶인다**(2026-09-04 · `clinic_info` 5개 언어 등록 후 실측) — 공통 `postId 1` = ko 1·ja 8·en 7·th 10·zh 9 / tiana `postId 11` = 12·14·11·15·13 / healing `postId 21` = 22·24·21·25·23. **매핑 표 정본은 LPC 위키 `4686692164` §1.**
  - `clinic_info`는 파일로 관리하던 B/E 병원 상세를 `k_pick_clinic_product`의 네 번째 필드로 이관한 것이다(로케일 객체 → 언어별 단일 문자열 · 최상위 19~20키).

---

## 10. CMS API로 직접 쓰기 (2026-09-12 실측 · 2026-09-13 생성 계열 보강 · Claude 직접 반영)

공개 조회 API(`landpress-content.line-scdn.net`)와 **별개로**, CMS 백오피스(`landpress-content-v2.linecorp.com`)에는 쓰기 경로가 있다. 브라우저 로그인 세션이 있으면 Claude가 **저장·공개까지** 직접 할 수 있다.

### 10-1. 전제 — 브라우저 로그인 (사용자 몫은 이것 하나다)

- **`landpress-content-v2.linecorp.com` 도메인의 탭이 열려 있어야 한다.** `fetch`가 그 페이지 컨텍스트에서 실행돼야 로그인 쿠키가 붙는다.
- **터미널 `curl`로는 불가** — 세션이 없어 **401**이다(2026-09-12 실측: `GET /item` 401 · `PUT /items/1` 401). 공개 조회 API(`landpress-content.line-scdn.net`)만 인증 없이 200이다.
- **어느 페이지든 도메인만 같으면 된다** — 특정 프로젝트·컬렉션 화면일 필요가 없다. 실측상 dev 프로젝트 탭에서 prod 프로젝트 API를, 다른 프로젝트 탭에서 용어집 프로젝트 API를 정상 호출했다.
- 탭은 Claude가 직접 연다. **사용자가 미리 띄워둘 필요는 없다.**
- 작업이 끝나면 연 탭은 닫는다.

**⛔ 로그인 확인 → 미로그인이면 사용자에게 요청하고 대기 (차단 단계)**

쓰기 작업(§10-2의 PUT/DELETE)을 시작하기 전에 **로그인 상태를 먼저 확인한다.**

```
GET /api/v1/projects/{pid}/roles/my   → 200이면 로그인·권한 OK (type: ADMIN 등)
                                       → 401이면 미로그인
```

**401이면 그 자리에서 멈추고 사용자에게 로그인을 요청한다.** 추측으로 재시도하거나 다른 경로를 찾지 않는다.

> Landpress CMS 로그인이 필요합니다. Chrome에서 아래 주소로 로그인해 주시고 알려주세요 — 그 다음 제가 이어서 반영하겠습니다.
> `https://landpress-content-v2.linecorp.com/projects/{pid}/content/collections/{name}/items?env=main`

- ⛔ **자격증명은 Claude가 다루지 않는다** — 아이디·비밀번호·OTP를 입력하거나 대신 로그인하지 않는다. 사용자가 직접 로그인한다.
- 로그인 확인 후에도 **권한이 모자라면**(role이 읽기 전용 등) 쓰기는 거부된다. 그 경우도 사용자에게 알리고 멈춘다.
- 세션은 만료된다. **작업 도중 401이 나면 같은 방식으로 재로그인을 요청**하고, 이미 보낸 요청이 반영됐는지 재조회로 확인한 뒤 이어서 진행한다.

### 10-2. 엔드포인트

| 동작 | 호출 | 가능 |
|---|---|---|
| 스키마 조회 | `GET /api/v1/projects/{pid}/collections/{name}` | ✅ |
| 항목 조회 | `GET .../collections/{name}/items/{postId}?locale={loc}` | ✅ |
| **저장** | `PUT .../items/{postId}?locale={loc}` · body `{필드명: 값}` | ✅ |
| **공개** | 같은 PUT body에 `"published": true` 추가 | ✅ |
| 삭제 | `DELETE .../items/{postId}` | ✅ |
| **항목 생성** | `POST .../items` → **201** + postId 반환 | ⚠️ **primary 로케일 1개만 생긴다** — 아래 10-3 6번 |
| **기존 항목에 로케일 행 추가** | `PUT ?locale=` · `POST .../items/{id}/locales` · `/translations` · `POST .../items/{id}?locale=` · `PATCH ?locale=` | ❌ **전 경로 실패** — 아래 10-3 7번 |
| 전용 publish 엔드포인트 | `/publish` 계열 전부 `Cannot POST` | ❌ — 위 플래그로 대체 |

### 10-3. 주의 (실측에서 걸린 것)

1. ⛔ **`POST .../items`는 새 항목을 즉시 생성한다.** 라우트 존재 확인 목적으로 호출하지 않는다 — 실제로 빈 항목이 생성돼 삭제해야 했다(2026-09-12). 라우트 확인은 **존재하지 않는 id로 `PUT`/`PATCH`** 를 보내 `NOT_FOUND_ITEM`(라우트 있음) / `Cannot PUT`(없음)으로 구분한다. 검증이 꼭 필요하면 **beta에서만**, `uid`에 `__probe_delete_me__` 같은 표식을 넣어 만들고 **같은 스크립트의 `finally`에서 `DELETE`** 해 원상복구까지 한 번에 끝낸다.
2. **`{postId}`는 CMS URL의 item 번호**이고 **내부 레코드 id는 로케일마다 다르다**(예: `shopping_guide` 다이소 postId 5 · ko_KR 내부 id 6).
3. **로케일 선택은 `?locale=`** 이다. CMS 화면 URL의 `?_locale=`은 API에서 **무시된다**.
4. **언어별 항목이 없으면 PUT은 `404 NOT_FOUND_ITEM`** 이다. 단, **항목 자체는 API로 만들 수 있다** — 아래 4-1 참조.

4-1. ⛔ **정정 (2026-09-13 실측)**: "생성 경로가 없다"는 **틀렸다.** **`POST .../items?locale={loc}`로 단일 로케일 항목을 새로 만들 수 있다**(`201` + 새 `postId` 반환, 그 로케일이 `primaryLocale: true`가 된다). 실측: beta `oam_message_task_multi`에 **15건을 `?locale=ko_KR`로 연속 생성**(postId 217~231), 전건 재조회 대조 통과.
   - **여전히 불가능한 것**: **이미 있는 항목에 다른 로케일을 추가**하는 것(`/locales/*`·`/translations/*`는 `Cannot POST`). 즉 **한 항목의 2번째 언어부터는 사용자가 CMS UI에서** 추가해야 하고, 추가된 뒤에는 Claude가 PUT으로 채운다.
   - ⚠️ **같은 호출을 「로케일 추가」 용도로 쓰면 「고아 항목」이 생긴다**(2026-09-13 다른 세션 실측) — 기존 항목에 붙이려고 body에 `postId`를 넣어 `POST /items?locale=ko_KR`을 보내면 **`postId`는 무시되고 별개 항목이 새로 만들어진다**(201). 두 실측은 같은 동작의 다른 쓰임이다: **새 항목을 원할 때는 정상 동작, 로케일 추가를 원할 때는 쓰레기 항목 생성.** 의도를 먼저 분명히 하고 호출한다.
   - **작업 순서 권장**: ① Claude가 `POST ?locale=ko_KR`로 항목 생성 → ② 사용자가 CMS에서 나머지 로케일 추가 → ③ Claude가 로케일별 PUT.
   - ⛔ **생성은 되돌리기 번거로우니 사용자 지시가 있을 때만** 한다(라우트 확인 목적의 POST는 여전히 금지 — 위 1번). 대량 생성 전 **1건만 만들어 재조회로 검증**한 뒤 나머지를 진행한다.
5. **미게시 항목은 공개 조회 API에 안 나온다.** 반영 확인은 `published: true` 여부까지 본다.
6. **`POST .../items`로 만든 항목은 primary 로케일 1개뿐이다**(2026-09-13 실측: 201 · `en_US(primary)` 1행만 생성). 나머지 4개 로케일 행은 생기지 않아 그대로는 쓸 수 없다.
7. ⛔ **`POST .../items?locale=ko_KR`은 201을 주지만 「고아 항목」이 생긴다.** 기존 항목에 ko_KR 행이 붙는 게 아니라 **ko_KR 로케일만 가진 별개 항목**이 새로 만들어진다(실측: base=post24, 호출 결과=post25). body에 `postId`를 넣어도 무시된다. **201을 성공으로 오해하지 않는다.** `PUT ?locale=`(404 `NOT_FOUND_ITEM`) · `POST .../items/{id}/locales` · `/translations` · `POST .../items/{id}?locale=` · `PATCH ?locale=`도 전부 실패한다 — **기존 항목에 로케일 행을 추가하는 API 경로는 없다.**
8. **postId는 로케일 블록의 첫 내부 id다.** 5개 로케일 컬렉션에서 항목이 여럿이면 postId가 `1 · 6 · 11 · 16`처럼 **5칸씩 건너뛴다**(내부 id 1~5가 post1, 6~10이 post6). 정상 항목은 이 블록이 한 번에 만들어지며, API로 하나씩 만들면 블록이 생기지 않는다. **beta와 prod의 postId 배치는 다를 수 있으므로 복제할 때 postId가 아니라 `uid`(단건이면 컬렉션)를 기준으로 매핑**한다(실측: `voucher_product` beta 1=oliveyoung·6=cu·11=daiso·16=emart ↔ prod 1=emart·6=cu·11=oliveyoung·16=daiso).
9. **beta → prod 복제는 beta 등록값을 읽어 그대로 PUT**한다. 산출물 파일에서 다시 만들지 않으면 그 사이 beta에 반영된 수정이 자동으로 따라온다. 복제 후에는 **공개 조회 API로 beta ↔ prod를 필드 단위 대조**하고 `published`까지 확인한다(2026-09-13: LV prod 6개 컬렉션 55항목 전건 일치).

### 10-4. 용어집(`web3_xlt_json`)에 적용할 때

| 항목 | 값 (2026-09-12 실측) |
|---|---|
| projectId | `wdmwbfuv10x39bukv58ocevp` |
| 컬렉션 | `web3_xlt_json` · 타입 **SINGLE** |
| locale | **`en_US` 하나뿐**(primary) — 다국어 항목이 따로 없다 |
| postId | `1` · `published: true` |
| 필드 | **`exceptions` 하나**뿐이며, 그 안에 용어집 전체 JSON 5키(`metadata`·`exceptions`·`terminology`·`oa_variables`·`deprecated_terms`)가 들어간다 |
| 권한 | 계정 role **ADMIN** 확인 |

```
PUT /api/v1/projects/wdmwbfuv10x39bukv58ocevp/collections/web3_xlt_json/items/1?locale=en_US
body: { "exceptions": { …용어집 전체 JSON… }, "published": true }
```

> ⚠️ **필드 이름이 `exceptions`지만 값은 용어집 전체**다. `terminology`만 따로 넣는 필드가 아니다 — 통째로 교체한다.

**⛔ 단건 컬렉션에서는 `published`를 body에 넣지 않는다** (2026-09-12 실측) — 용어집에 `{"exceptions": {…}, "published": true}`로 PUT하면 **`400 SYSTEM_CODE_UNDEFINED`** 로 거부된다(데이터는 바뀌지 않는다). `published`를 빼고 `{"exceptions": {…}}`만 보내면 **200**이고, 기존 게시 상태(`published: true`)는 그대로 유지된다. 다건 컬렉션(`shopping_guide` 등)에서는 반대로 `published: true`가 정상 동작한다 — **컬렉션 타입에 따라 다르다.**

**권장 — 전체를 재전송하지 말고 변경분만 적용한다.** 라이브 값을 GET해 그 객체에서 바꿀 필드만 고쳐 PUT하면 전송 중 손실·구버전 덮어쓰기 위험이 없다(용어집 전체는 27KB다). 실측 절차:

```
① GET /item → metadata.version 확인 (기대 버전과 다르면 중단)
② 받은 exceptions 객체를 복제 → terminology 해당 항목 + metadata(version·last_updated·total_terms·updated_by·description) 수정
③ PUT /items/1?locale=en_US  body: {"exceptions": 수정본}   ← published 넣지 않음
④ fetch_glossary 재조회 → 확정 산출물과 전건 대조(metadata·terminology·exceptions·oa_variables·deprecated_terms)
```

### 10-5. 용어집 직접 쓰기 규칙 (⛔ 차단 게이트)

용어집은 **전 서비스 공용 라이브 데이터**다. 기술적으로 쓸 수 있다는 것과 써도 된다는 것은 다르다.

1. ⛔ **반영 직전 사용자에게 방식을 묻는다.** 묻지 않고 PUT하지 않는다. 질문은 **산출물(전체 JSON + 변경 요약 + 가이드 zip)을 다 준비한 뒤** 한 번에 한다.

   > 용어집 v5.5 갱신본이 준비됐습니다. 반영 방식을 골라주세요.
   > ① **Claude가 직접 반영** — CMS API로 PUT·공개까지 수행하고 재조회로 대조해 보고
   > ② **직접 붙여넣기** — 전체 JSON과 편집 URL을 전달 (기존 방식)

   - 사용자가 **①을 고르면** 그 답변이 그 건에 대한 승인이다 — 2~5번을 수행한다. 이때 **§10-1의 로그인 확인을 먼저 하고, 미로그인이면 로그인을 요청한 뒤 대기**한다.
   - **②를 고르거나 답이 없으면** 산출물 전달로 끝낸다. **무응답을 승인으로 해석하지 않는다.**
   - 승인은 **그 갱신 건에 한정**된다. 다음 갱신 때 다시 묻는다.
2. **PUT 직전 원본을 다시 조회**해 현재 `version`을 확인한다(다른 세션·사용자가 그 사이 바꿨을 수 있다 — CLAUDE.md 캐시 금지 규칙).
3. **§5 체크리스트 1~5b를 먼저 끝낸다.** 특히 3b(실사용 실측)·5b(기획자 가이드 zip 동반 갱신)를 건너뛰고 쓰기만 하지 않는다.
4. **PUT 후 `fetch_glossary` 재조회 → 전달 산출물과 전건 대조**하고 결과를 보고한다.
5. **8단계(`glossary-changelog.md` 기재 + 커밋)** 는 직접 쓰든 사용자가 붙여넣든 동일하게 수행한다.

### 10-5-1. ⛔ beta + prod 동시 갱신 (2026-09-13 사용자 확정 — 차단 규칙)

**위키 `4727978725`에 정의된 LPC 컬렉션은 beta·prod 양쪽 모두 등록이 끝났다. 그러므로 JSON을 바꿀 때는 항상 두 환경을 함께 갱신한다.**

- **값이든 스키마든 한쪽만 바꾸지 않는다.** 한쪽만 반영하면 FE가 환경별로 다른 응답을 받는다.
- **순서는 beta 먼저 → 검증 → prod 복제**이고, **같은 작업 안에서 끝낸다**. prod를 「나중에」로 미루지 않는다.
- **prod 복제는 beta 등록값을 읽어 그대로 PUT**한다 — 저장소 산출물에서 다시 만들지 않는다. 그래야 그 사이 beta에 들어간 수정이 빠짐없이 따라온다.
- **매핑은 `postId`가 아니라 `uid` 기준**이다(단건 컬렉션은 컬렉션 단위). beta와 prod는 postId 배치가 다를 수 있다 — §10-3 8번.
- 반영 후 **공개 조회 API로 beta ↔ prod를 필드 단위 대조**하고 `published`까지 확인한다.
- prod에 컬렉션·항목(로케일 포함)이 없으면 **사용자에게 생성을 요청**한다(§10-3 4·6·7번 — API로는 만들 수 없다).

| 프로젝트 | projectId |
|---|---|
| LV beta | `a2qaxhygpi95g8l4a48n2vn4` |
| LV prod | `w5eph4y9qxe05c8fqpi7rlxh` |
| UIT beta | `n7nuefo6t491uc9cp863lgyq` |
| UIT prod | `lkyusnekq1vv9759rbnwgamh` |

### 10-6. API 호출 vs UI 조작 — 어느 쪽을 쓰나

둘 다 **같은 브라우저 세션**에서 동작한다. 기본은 API이고, API로 안 되는 것만 UI로 한다.

| | API 호출(`fetch`) | UI 조작(클릭·입력) |
|---|---|---|
| 속도·정확도 | 한 번에 여러 로케일 일괄 처리 · 값이 그대로 들어간다 | 느리고, 큰 JSON은 에디터 입력 중 깨질 수 있다 |
| 화면 변경에 취약 | 없음 | 버튼·레이아웃이 바뀌면 깨진다 |
| **로케일 항목 생성** | **불가**(§10-2) | **가능** — UI에서 언어 탭을 추가한다 |
| 저장·공개 | `published: true` 플래그 | 저장/게시 버튼 |

**권장** — 값 입력은 **API**, API로 막히는 **로케일 항목 생성만 UI**로 한다. 용어집처럼 한 덩어리 JSON(24KB 규모)은 에디터에 타이핑하면 실패하기 쉬우므로 **반드시 API**로 넣는다.
