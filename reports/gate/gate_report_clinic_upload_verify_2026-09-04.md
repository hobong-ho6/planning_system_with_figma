# 게이트 리포트 — XLT 업로드·Landpress 반영 검증 + 상품명 확정

- **작업일**: 2026-09-04 (clinic 세션 #4)
- **목적**: 사용자가 수행한 ⓐ XLT 엑셀 업로드 ⓑ Landpress `faq` 반영을 **API 재조회로 검증**하고, ⓒ 시술 상품명 확정 ⓓ Figma 원본 수정 종결을 기록
- **조회 시각**: 2026-09-04 09:22 (KST) · **캐시 미사용 — 두 API 모두 신규 조회**
- **레지스트리**: Unifi / WEB BROWSER — **v1.7.4 → v1.7.5** · 2,431 → **2,461키**(+30)
- **산출물**: `xlt/registry_fix/xlt_output_20260904092250.xlsx`(**7키** 재업로드용) · 위키 첨부 `xlt_clinic_unify_fix_7keys_20260904.xlsx`

---

## (0) 검증 결과 요약

| 항목 | 결과 |
|---|---|
| XLT 86키 **등재 여부** | ✅ **미등재 0건** — 전건 등재 확인(레지스트리 +30키) |
| XLT 86키 **값 일치** | ⚠️ **7키 상이** — 전부 **표기 통일(첨부 v3) 이전 값**이다. 업로드된 것은 **첨부 v2(띄어쓰기 교정본)** 로 판정 |
| Landpress `faq` | ✅ **9항목 반영 완료**(`updatedAt` 14:36) · `id` 9건 전건 일치 |
| Landpress 나머지 | ❌ **5필드 미반영** — 아래 표 |

### XLT 상이 7키 (재업로드 대상)

| 키 | 등재값 | 위키(정본) | 통일 유형 |
|---|---|---|---|
| `UF_clinic_bridge_cat_vision` | `시력교정 경험을…` | `시력 교정 경험을…` | 시력 교정 |
| `UF_clinic_bridge_title` | `좋은 후기로 주목받는…` | `좋은 리뷰로 주목받는…` | 후기→리뷰 |
| `UF_clinic_detail_review_source` | `…이용자 후기를 바탕으로…` | `…이용자 리뷰를 바탕으로…` | 후기→리뷰 |
| `UF_clinic_mini_bridge_review_more` | `후기 더보기` | `리뷰 더보기` | 후기→리뷰 |
| `UF_clinic_mini_bridge_section_review` | `후기로 미리 보는 클리닉` | `리뷰로 미리 보는 클리닉` | 후기→리뷰 |
| `UF_clinic_mini_bridge_section_review_note` | `…등록된 후기를 바탕으로…` | `…등록된 리뷰를 바탕으로…` | 후기→리뷰 |
| `UF_clinic_mini_bridge_badge_certified_desc` | `Mini App` **(5개 언어 전부)** | `MINI App` | Mini App→MINI App |

**ko 6키 + 5개 언어 1키 = 총 10셀**이 어긋난다. 나머지 79키는 **5개 언어 전건 일치**했다.
`UF_clinic_mini_bridge_review_verified`가 `시술 인증`으로 등재된 것을 확인했다 — 띄어쓰기 교정(첨부 v2)까지는 반영됐다는 근거다.

### Landpress 미반영 5필드

| 컬렉션 | uid | 필드 | 등재값(현재) | 정본 |
|---|---|---|---|---|
| `common_info` | — | `cautions` | `…이용자 **후기**를 참고해…` | `…이용자 **리뷰**를 참고해…` |
| `product` | `da-ps` | `menu` | tag `리쥬란힐러`·`리프팅패키지` · items `프리미엄 리프트 PKG` | `리쥬란 힐러`·`리프팅 패키지` · `프리미엄 리프트 패키지` |
| `product` | `healing-eye` | `detail_info` | `http://www.healingeye.co.kr/` | `https://www.healingeye.co.kr/` |
| `product` | `healing-eye` | `menu` | tag `라식,렌즈삽입술,**라식**` · title `찾고있다면` · items `프리미엄 LASIK` | `…정밀검사` · `찾고 있다면` · `프리미엄 라식` |
| `product` | `healing-eye` | `bridge_info` | `…외국인 **시력교정** 경험을…` | `…외국인 **시력 교정** 경험을…` |

`tiana-ps`는 **변경 대상이 없어 정합**하다(통일 5종 중 해당 항목 없음).

---

## (1a) 한국어 원문 교정

이번 작업은 **검증**이며 신규 교정은 없다. 재업로드 대상 7키의 값은 2026-09-03 표기 통일 리포트(`gate_report_clinic_unify_notation_2026-09-03.md`) (1a)의 alias를 그대로 승계한다.

**사용자 결정 2건 기록**:
- ✅ **`프리미엄 라식`·`프리미엄 리프트 패키지`를 공식 상품명으로 확정**(2026-09-04) — 위키 「병원 데이터」 표 원문 `프리미엄 LASIK`·`프리미엄 리프트 PKG`는 **폐기**하고 한글 표기가 정본이다. 병원 확인 미결 항목 종결.
- ⛔ **Figma 원본 수정 요청 15건은 무시**(2026-09-04) — Figma는 참고용이므로 원본을 고치지 않는다. 2026-09-01의 「Figma 원문 수정 요청 8건 종결」과 같은 방침이며, 이후 누적된 요청도 **재제안하지 않는다**.

---

## (a) 자동 검증 요약 — `scripts/validate_translation.py`

재업로드용 7키 엑셀(`xlt/registry_fix/xlt_output_20260904092250.xlsx`) 기준.

| 심각도 | 건수 |
|---|---|
| 🔴 **P0 (Critical)** | **0건** |
| 🟡 P1 (Medium) | 4건 (전건 오탐 — (c)) |
| 🟢 P2 (Low) | 2건 (전건 오탐 — (c)) |

---

## (b) 수동 3단계 체크표 — **전수 점검**

검토 범위: **위키 다국어 표 86키 × 5개 언어 = 430셀을 레지스트리 2,461키와 전건 대조**했다. 재업로드 7키에 한정하지 않았다. Landpress는 **두 컬렉션 전 필드**(공통 5 + 병원별 3×3 = 14필드)를 정본 파일과 대조했다.

### 1단계 — 기계적 정합

| 항목 | 결과 |
|---|---|
| XLT 등재 누락 | ✅ 0건 (86/86) |
| XLT 값 대조 | ⚠️ 7키 10셀 상이 — **전부 표기 통일 미반영**(신규 오류 아님) |
| 나머지 79키 | ✅ 5개 언어 **전건 일치** |
| 치환자 | ✅ 재업로드 7키에 치환자 없음 · 전체 7키의 `{{N}}` 집합 5개 언어 일치 유지 |
| 빈 셀 | ✅ 0건 (7키 × 5 = 35셀) |
| 문자체계·nbsp·U+2028 | ✅ 0건 |
| Landpress 14필드 대조 | ✅ 9필드 일치 · **5필드 미반영**(위 표) · 구조 손상 0 |
| `faq.items[].id` | ✅ 9건 전건 일치(순서 포함) |

### 2단계 — 의미 정합

재업로드 7키는 **ko 표기만 통일**된 값이고 ja·en·th·zh는 무변경이다. 등재값과 대조한 결과 **4개 언어가 이미 위키와 동일**했다(`Mini App`→`MINI App` 1키만 5개 언어 동시 변경 — 브랜드 표기라 전 언어 동일 값). 의미 변화는 없다.

### 3단계 — 언어별 중점 점검

| 언어 | 결과 |
|---|---|
| ko | ✅ 통일 표기(`시력 교정`·`리뷰`·`MINI App`) 반영 확인 |
| ja·en·th·zh | ✅ **무변경** — 등재값과 위키가 이미 일치(대조로 확인) |

---

## (c) 자동 검증 보고 건별 처리 판정 (P1 4 + P2 2 = 6건)

| # | 지적 | 판정 | 근거 |
|---|---|---|---|
| 1~3 | `_review_more` 「더보기」 → en `View More` · ja `すべて見る` · th `ดูเพิ่มเติม` | **오탐** | 실측 en `See more` 4 vs `View more` 3 · ja `すべて見る` 6건은 전부 ko 「전체보기」 번역이고 「더보기」는 `もっと見る` 5건 · th는 채택값 `ดูรีวิวเพิ่มเติม`에 권장 어형이 **분절 포함**돼 검증기가 못 본다 |
| 4 | `_badge_certified_desc` ko 라틴 문자열 `MINI App` | **오탐** | LINE 공식 브랜드 표기(`LINE MINI App`). 5개 언어 동일이 정상 |
| 5~6 | `_review_source`·`_section_review_note` 마침표 | **오탐** | 문장형이라 마침표가 정상. 등재 선례 `UF_clinic_detail_notice_1~3` 동형 |

**실제 위반 0건 · 오탐 6건.**

---

## (d) 추가 개선·제안 (권장 — 임의 반영하지 않음)

### (d-1) 용어집 보완 권장

기존 권장 7건(혜택 en `benefit` · 더보기 ja `もっと見る`/zh `更多` 병기 · 결제 zh `付款` 병기 · 교환 문맥 분기 · **「리뷰」 신규 등재** · **`deprecated_terms`에 ko 「후기」→「리뷰」**)이 그대로 유효하다. 이번 검증에서 **「더보기」 오탐이 다시 3건** 나왔다 — 누적 6세션 반복이다.

⛔ 용어집은 **API 읽기 전용** — 승인 시 `md/landpress.md` 절차로 전체 JSON 산출 + **기획자 가이드 zip 동반 갱신**(§5-1).

### (d-2) 추가 개선·제안 안내

1. 🔴 **7키 재업로드 필요** — 첨부 `xlt_clinic_unify_fix_7keys_20260904.xlsx`(7키 전용) 또는 `xlt_clinic_all_86keys_20260903.xlsx`(**첨부 v3** = 통일 반영 전량) 중 하나를 올리면 된다. **7키 전용이 더 안전**하다(다른 키를 건드리지 않는다).
2. 🔴 **Landpress 5필드 미반영** — 위 표 참조. 값은 `landpress/*_ko_KR.json`이 정본이다.
3. **`UF_clinic_bridge_title`·`_cat_vision`·`UF_clinic_detail_review_source`는 공유 키일 수 있다** — 재업로드 시 이 키를 쓰는 다른 화면에도 문구가 반영된다. `bridge_title`·`cat_vision`은 `(Web) 브릿지 페이지` 전용이라 영향이 제한적이나, `review_source`는 상세·리뷰 전 화면에 걸린다.
4. **레지스트리 +30키** — 이번 업로드로 2,431 → 2,461키가 됐다. 86키 중 **신규 등록은 30키**이고 나머지 56키는 기존 값 갱신이었다는 계산과 맞는다(직전 리포트의 「신규 등록 29키 + `review_verified` 1키」).

---

## (4) 통과 판정

| 기준 | 결과 |
|---|---|
| 자동 P0 = 0 | ✅ 0건 |
| 수동 P0 = 0 | ✅ 전수 대조(XLT 430셀 + Landpress 14필드) — **신규 오류 0건**. 상이 7키는 「미반영」이지 오류가 아니다 |
| (a)~(d) 리포트 | ✅ 본 문서 |
| 한국어 원문 교정 | ✅ (1a) — 신규 교정 없음 · 사용자 결정 2건(상품명 확정 · Figma 무시) 기록 |
| 전수 점검 | ✅ 86키 전건 + Landpress 전 필드 |

→ **검증 완료.** 🔴 **사용자 액션 2건 남음** — XLT 7키 재업로드 · Landpress 5필드 반영.

---

## (5) 후속 — `MINI App` 표기 LINE 공식 문서 확인 (2026-09-04)

### 확인 결과: **`LINE MINI App`이 공식 표기** (`MINI` 전부 대문자)

LINE Developers 공식 문서를 직접 조회해 확인했다.

| 출처 | 확인 내용 |
|---|---|
| [LINE MINI App \| LINE Developers](https://developers.line.biz/en/docs/line-mini-app/) | 문서 제목 `LINE MINI App | LINE Developers` · 메인 헤딩 `LINE MINI App` · 내비게이션 `LINE MINI App API reference`·`LINE MINI App development guidelines` · 본문 `LINE MINI App icon specifications`·`LINE MINI App authorization flow` — **제목·헤딩·링크·본문 전건 동일** |
| [Introducing LINE MINI App](https://developers.line.biz/en/docs/line-mini-app/discover/introduction/) | 제품 정의 `LINE MINI App is a web application that runs on LINE.` · **`Mini App`(소문자 `ini`) 표기는 단 한 번도 사용되지 않는다** |
| 검색 교차 확인 (developers.line.biz 한정) | `LINE MINI App Policy` · `LINE MINI App icon specifications and guidelines` · `LINE Developers Console Guide for LINE MINI App` 등 **전 문서가 동일 표기** |

※ 한국어 문서(`/ko/`)와 인증 가이드라인 페이지는 **HTTP 403**으로 직접 조회하지 못했다 — 영문 문서와 검색 결과로 교차 확인했다.

**결론**: 2026-09-03 표기 통일에서 `Mini App` → `MINI App`으로 고른 방향이 **공식 근거로 확정**됐다. 당시 근거는 등재값 `UF_voucher_mini_certified`(5개 언어 `MINI App`)뿐이었는데, 이제 1차 출처가 확보됐다.

### 전수 재점검 (표기 현황)

| 위치 | `MINI App` | 잔존 `Mini App` | 판정 |
|---|---|---|---|
| 위키 `4667512757` | 24건 | 6건 | ✅ **전부 서술문 인용**(History·「확인 필요」의 「`Mini App`은 쓰지 않는다」·「`Mini App`→`MINI App`」) — 실제 값은 0건 |
| 위키 `4686692164`(LPC) | 5건 | 3건 | ✅ 동일 — 전부 서술문 |
| `landpress/*.json` | 0건 | **0건** | ✅ 이 문자열이 없다(전수 스캔) |
| **XLT 등재값** | `UF_voucher_mini_certified` 1키 | 🔴 **`UF_clinic_mini_bridge_badge_certified_desc` 5개 언어** | **7키 재업로드로 해소** |

### 교정 1건 (표기 통일의 누락분)

2026-09-03 표기 통일에서 `<td>Mini App</td>`(표 셀) 패턴만 치환해 **Screen Description 서술 1건을 놓쳤다** — `xlt · 배지3 설명 — Mini App`. 이번에 `MINI App`으로 교정했다.

**교훈**: 같은 문구가 **표 셀·Description 서술·다국어 표** 세 곳에 나타나므로, 값 치환은 **태그를 포함한 좁은 패턴**이 아니라 **문자열 자체**로 하되 구간(History·법무 제외)으로 한정해야 한다.

### 반영

위키 `4667512757` **v114 → v115**(Description 값 교정 + 「확인 필요」 항목을 **해소·출처 기록**으로 교체 + History 병합) · LPC `4686692164` **v11 → v12**(확인 필요 항목 추가). `check_wiki_storage.py post` 양쪽 exit 0.

**XLT 재업로드 대상은 변동 없다** — 기존 7키 엑셀(`xlt_clinic_unify_fix_7keys_20260904.xlsx`)에 `_badge_certified_desc` 5개 언어가 이미 `MINI App`으로 들어 있다.
