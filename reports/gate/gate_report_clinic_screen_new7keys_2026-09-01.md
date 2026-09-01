# 게이트 리포트 — 위키 4667512757 Screen 신규 7키 (등재값 대조 + 번역)

- **작업일**: 2026-09-01
- **대상**: 위키 `4667512757` (v78) Screen 섹션 · `(Unifi mini) 상세페이지` XLT 표 · 셀 하이라이트(`#fff0b3`) 7건
- **조회 타겟(등재값 대조)**: `Dapp Portal` / `WEB BROWSER` / **v2.6.1** (1,600키) · `Unifi` / `WEB BROWSER` / **v1.7.4** (2,420키) — 2026-09-01 18:11 API 신규 조회(캐시 미사용)
- **산출물**: `xlt/xlt_output_20260901193213.xlsx` (**7키 전량** — 엑셀 포함 기준은 「**Unifi 미등재**」로 사용자 확정 2026-09-01)
- **담당 팀 판별**: 위키에 UIT/LV 헤딩 구분 없음. 그러나 **사용자가 키를 직접 기재**해 프리픽스로 팀이 확정됨 — `UF_*` 4키 = **UIT**(`{{0}}`), `mini_guidekim_*` 3키 = **LV**. 치환자 표기 위반 없음(`UF_voucher_recommend_cashback` = `캐시백 {{0}}%` ✅ UIT 규칙)

---

## 0. 등재값 대조 결과 (번역보다 먼저 수행 — 사용자 요청)

| No | 키 | 위키 KR | Dapp Portal v2.6.1 | Unifi v1.7.4 | 판정 |
|---|---|---|---|---|---|
| 3 | `UF_clinic_detail_homepage` | 공식 홈페이지 | ❌ 미등재 | ❌ 미등재 | **신규** — 유사 등록값도 없음 |
| 5 | `mini_guidekim_cat_eye` | 안과 | ✅ `안과` | ❌ | **동일** — 등재값 사용 |
| 5 | `mini_guidekim_cat_dematology` | 피부과 | ✅ `피부·성형외과` | ❌ | **`피부과·성형외과`로 통일**(사용자 확정) |
| 5 | `mini_guidekim_cat_dentist` | 치과 | ✅ `치과` | ❌ | **동일** — 등재값 사용 |
| 56 | `UF_voucher_recommend_price` | 혜택가 | ❌ | ❌ | **미등재** · 동일 문구 키 `UF_voucher_price_benefit` 존재 |
| 56 | `UF_voucher_recommend_cashback` | 캐시백 {{0}}% | ❌ | ❌ | **미등재** · 유사 `mini_guidekim_cashback`(`캐시백 {0}%`) |
| 56 | `UF_voucher_recommend_origin_price` | 정가 `<span />` | ❌ | ❌ | **미등재** · 동일 문구 키 `UF_voucher_price_original` 존재 |

**사용자 예상 확인**: "dappportal 쪽에 값이 있을 것" → `mini_guidekim_*` 3키는 **Dapp Portal에만** 등재(Unifi 미등재). `UF_*` 4키는 양 서비스 모두 미등재.

### 유사 등록값 검색(미등재 4키 · `fetch_xlt_registry.py --similar`)
| 신규 키 | 동일/유사 등록값 | 유사도 |
|---|---|---|
| `UF_voucher_recommend_price` | `UF_voucher_price_benefit` = `혜택가` (Unifi) | **1.0 동일** |
| | `UF_voucher_price_exclusive` = `단독 혜택가` | 0.75 |
| `UF_voucher_recommend_origin_price` | `UF_voucher_price_original` = `정가` (Unifi) | **1.0 동일** |
| `UF_voucher_recommend_cashback` | `mini_guidekim_cashback` = `캐시백 {0}%` (Dapp) | 문구 동일·표기 상이 |
| | `UF_mini_guidekim_cashback` = `캐시백 {{0}}` (Unifi) | 0.941 |
| `UF_clinic_detail_homepage` | 없음 | — |

---

## (1a) 한국어 원문 교정

**교정 없음.** 초안에서 `정가 <span />`의 `<span />`을 붙여넣기 잔여물로 보고 제거했으나, **사용자 확정(2026-09-01): `<span />`은 FE가 효과(취소선 등)를 넣는 슬롯이므로 유지**한다. 위키 원문을 그대로 쓴다.

| 키 | 값 | 비고 |
|---|---|---|
| `UF_voucher_recommend_origin_price` | ko `정가 <span>{{0}}</span>` · ja `通常価格 <span>{{0}}</span>` · en `Regular price <span>{{0}}</span>` · th `ราคาปกติ <span>{{0}}</span>` · zh `原價 <span>{{0}}</span>` | 라벨은 Unifi `UF_voucher_price_original` 등재값 재사용 + **가격 변수 `{{0}}`만 span으로 감쌈** — 첨부 화면 기준 취소선이 가격에만 적용되므로 라벨은 span 밖에 둔다 |

alias 기록 대상 없음 — 위키 원문과 XLT 값이 일치한다.

---

## (a) 자동 검증 요약 — `scripts/validate_translation.py` 실행

| 심각도 | 건수 |
|---|---|
| 🔴 **P0 (Critical)** | **0건** |
| 🟡 P1 (Medium) | 3건 (전부 오탐 — 등재값 준수) |
| 🟢 P2 (Low) | 0건 |

1차 실행에서는 P1 4건이었고, 그중 **1건은 실제 위반으로 판정해 수정**했다(아래 (c) #4).

---

## (b) 수동 3단계 체크표 — **전수 점검** (7키 전체 행 · 5개 언어)

### 1단계 — 기계적 정합
| 점검 | 결과 |
|---|---|
| 빈칸 | ✅ 0건 (7키 × 5개 언어 = 35셀) |
| 치환자 표기(UIT `{{0}}`) | ✅ `UF_voucher_recommend_cashback` 5개 언어 모두 `{{0}}` 1개씩 |
| 치환자 개수 언어 간 일치 | ✅ ko/ja/en/th/zh 모두 1개 |
| HTML 태그 | ✅ `<span>…</span>` 5개 언어 전부 여닫이 1쌍씩 · span 내부에 `{{0}}` 단독 · 그 외 태그 0건 |

### 2단계 — 의미 정합 (ko_KR 기준)
| 키 | ko | ja | en | th | zh | 판정 |
|---|---|---|---|---|---|---|
| `UF_clinic_detail_homepage` | 공식 홈페이지 | 公式サイト | Official website | เว็บไซต์อย่างเป็นทางการ | 官方網站 | ✅ 정확 |
| `mini_guidekim_cat_eye` | 안과 | 眼科 | Ophthalmology | จักษุวิทยา | 眼科 | ✅ 정확 (th 교정) |
| `mini_guidekim_cat_dematology` | 피부과·성형외과 | 皮膚科・美容外科 | Dermatology & Plastic Surgery | คลินิกผิวหนังและศัลยกรรมตกแต่ง | 皮膚科暨整形外科診所 | ✅ 정확 (ko 통일 · en 잘림 교정) |
| `mini_guidekim_cat_dentist` | 치과 | 歯科 | Dentistry | ทันตกรรม | 牙科 | ✅ 정확 |
| `UF_voucher_recommend_price` | 혜택가 | 特別価格 | Special price | ราคาพิเศษ | 優惠價 | ✅ 정확(등재값) |
| `UF_voucher_recommend_cashback` | 캐시백 {{0}}% | {{0}}%キャッシュバック | {{0}}% cashback | เงินคืน {{0}}% | 現金回饋 {{0}}% | ✅ 정확 |
| `UF_voucher_recommend_origin_price` | 정가 `<span>{{0}}</span>` | 通常価格 `<span>{{0}}</span>` | Regular price `<span>{{0}}</span>` | ราคาปกติ `<span>{{0}}</span>` | 原價 `<span>{{0}}</span>` | ✅ 정확 |

### 3단계 — 표기·톤앤매너 (자동 검증기가 못 잡는 항목)
| 점검 항목 | 결과 |
|---|---|
| 외래어 음차 오염 | ✅ 없음 |
| 붙은 띄어쓰기 누락 | ✅ 없음 (`Official website`·`{{0}}% cashback` 어절 경계 정상) |
| 다의어 모호 | ⚠️ `피부과` vs `피부·성형외과` vs Figma `피부과·성형외과` — 3개 값 불일치, (d-2) #1 |
| 표현 어색 | ✅ 없음 |
| ja 「캐시백」 표기 일관성 | ✅ 등재값 실측 — voucher 계열 **3/3 `キャッシュバック`**, Unifi 전체 **13:1**로 `キャッシュバック`. `還元`은 guidekim mini 배지 2키뿐 → `キャッシュバック` 채택 |
| ja 「공식」 표기 일관성 | ✅ 등재값 `公式アカウント`·`公式導入` 등과 동일하게 `公式` 사용 |
| zh 번체 정자 | ✅ `官方網站`·`優惠價`·`原價`·`現金回饋` — 간체 0건 |
| 받침·조사 | ✅ 해당 없음(명사 단독 라벨) |

---

## (c) 자동 검증기 보고 각 건 **처리 판정** (1차 4건 전수)

| # | 키 | 지적 | 판정 | 사유 |
|---|---|---|---|---|
| 1 | `UF_voucher_recommend_price` | en `혜택`→`perks` 권장 | **오탐** | `혜택가`는 가격 라벨. 등재값 `UF_voucher_price_benefit` en = `Special price`가 정본이며 재사용 대상. `perks`(특전) 부적합 |
| 2 | 〃 | ja `혜택`→`特典` 권장 | **오탐** | 위와 동일 — 등재값 `特別価格` 준수 |
| 3 | 〃 | th `혜택`→`สิทธิประโยชน์` 권장 | **오탐** | 위와 동일 — 등재값 `ราคาพิเศษ` 준수 |
| 4 | `UF_voucher_recommend_cashback` | ja `캐시백`→`キャッシュバック` 권장 | **실제 위반 → 수정** | 초안은 Dapp `mini_guidekim_cashback`의 `還元{0}%`를 따랐으나, 등재값 실측 결과 **voucher 계열은 예외 없이 `キャッシュバック`**(`UF_voucher_pay_cashback` = `{{0}}%キャッシュバック`). ja를 `{{0}}%キャッシュバック`로 교체 |

**실제 위반 1건(수정 완료) · 오탐 3건 · 정책 보류 0건.** 재실행 결과 P0 = 0 / P1 = 3(전부 오탐).

---

## (d) 추가 개선·제안 (권장 — 임의 적용하지 않음)

### (d-1) 용어집 보완 권장
**없음.** P1 3건은 「용어집의 `혜택`=perks/特典/สิทธิประโยชน์ 매핑 vs 가격 라벨 `혜택가`」 충돌로, 용어집을 넓히기보다 **검증기의 복합명사 예외**가 맞는 사안이다. 신규 표기 제안이 없으므로 `fetch_xlt_registry.py` 실사용 건수 측정은 수행하지 않았다.
- 검증기 개선 후보: `혜택가`·`정가`처럼 **`혜택`이 가격 라벨의 일부**인 복합명사를 용어 매칭에서 제외.

### (d-2) 추가 개선·제안 — 사용자 결정 필요
1. **`mini_guidekim_cat_dematology` 한국어가 3곳에서 다르다 (결정 필요)**
   | 출처 | 값 |
   |---|---|
   | Figma `(Unifi mini) 상세페이지` y=480 | `피부과·성형외과` |
   | 위키 Screen XLT 표 (신규 기재) | `피부과` |
   | XLT 등재값 (Dapp Portal v2.6.1) | `피부·성형외과` |

   등재값은 **이미 라이브**이고 다른 화면(guidekim mini 카테고리 필터)에서도 쓰이므로, 이 페이지 사정만으로 바꾸면 다른 화면이 깨진다. 정본을 확정해 주면 그에 맞춰 처리한다.
2. **span 범위 — 사용자 제안과 다르게 적용했다 (근거 명시)** — 사용자 제안은 `<span> 정가 {{0} </span>`(라벨까지 감쌈)였으나, 첨부 화면에서 **취소선이 가격 `¥5,654`에만 걸려 있고 라벨 `정가`에는 없다.** 라벨까지 감싸면 라벨에도 취소선이 들어가므로 `정가 <span>{{0}}</span>`로 적용했다. 라벨에도 취소선을 넣을 의도였다면 알려주면 바꾼다.
   - 부수: 제안 문자열의 `{{0}`는 닫는 중괄호 1개 누락으로 보아 UIT 규칙(`{{0}}`)으로 적용했다.
   - `<span />`(빈 슬롯) 대신 `{{0}}`를 넣은 것은 FE가 문자열 밖에서 자식 요소를 주입하는 방식이 아니라 **XLT 변수로 값을 받는 방식**을 전제한다. FE가 빈 슬롯 방식이면 `정가 <span />`로 되돌려야 한다.
   - `<span />` 앞 공백은 5개 언어 모두 1칸이다. FE가 CSS margin으로 간격을 주면 ja·zh는 공백 없이(`通常価格<span>…`) 두는 편이 CJK 조판에 맞다.
3. **등재값 결함 — `mini_guidekim_cat_dematology` en_US 잘림 → 교정 완료** — `Dermatology & Plastic Surge`는 단어가 잘린 **기계적 결함**(P0급)이므로, 이 키가 Unifi 신규 등록 대상이 된 이상 결함을 그대로 올릴 수 없어 `Dermatology & Plastic Surgery`로 교정했다. Dapp Portal 쪽 기존 등재값도 같은 교정이 필요하다(별도 업로드 대상).
   - **ja `皮膚科・美容外科`로 대칭 맞춤 완료** (사용자 확정 2026-09-01) — ko `피부과·성형외과`와 `科` 대칭. ※ `整形外科`는 일본어에서 **정형외과(뼈·관절)** 를 뜻하므로 성형외과 번역으로 쓰면 안 된다 — `美容外科`가 정확하다.
4. **등재값 교정 — `mini_guidekim_cat_eye` th_TH `จักษุ` → `จักษุวิทยา` (사용자 확정 2026-09-01)** — `จักษุ`는 태국어에서 단독으로 쓰기 어려운 결합형이다. 형제 키 실측 대조 결과 이 키만 어형이 어긋났다.

   | 키 | ko | th (Dapp Portal 등재값) |
   |---|---|---|
   | `mini_guidekim_cat_dentist` | 치과 | `ทันตกรรม` (치의학) |
   | `mini_guidekim_cat_dematology` | 피부·성형외과 | `คลินิกผิวหนังและศัลยกรรมตกแต่ง` |
   | `mini_guidekim_cat_cosmetics` | 화장품 | `เครื่องสำอาง` |
   | `mini_guidekim_cat_clinic` | 클리닉 | `คลินิก` |
   | **`mini_guidekim_cat_eye`** | 안과 | **`จักษุ`** ← 유일한 결합형 |

   형제 키가 모두 완전한 명사이므로 `ทันตกรรม`(치과)과 같은 진료과 어형인 **`จักษุวิทยา`** 를 채택했다. Dapp Portal 기존 등재값은 `จักษุ`로 남아 있어 두 서비스 값이 갈린다 — Dapp 쪽도 맞추려면 별도 업로드가 필요하다(현재 사용자 판단으로 보류).
5. **키 이름 오타 — `mini_guidekim_cat_dematology`** — `dermatology`의 `r` 누락. 이미 시스템 등재·FE 사용 중이라 변경 불가로 판단하고 기록만 남긴다.
6. **중복 키 3건 (구조 검토 권장)** — `UF_voucher_recommend_price`/`_origin_price`는 `UF_voucher_price_benefit`/`_original`과 **문구가 완전히 같다**. 새 키를 만들면 같은 문구가 2벌 관리되어 나중에 한쪽만 바뀌는 사고가 난다. 추천 카드에서 라벨이 달라질 계획이 없다면 **기존 키 재사용**을 권한다(사용자 지시 「같은 내용이면 등재값 사용」에 따라 값은 등재값으로 맞췄다).
7. **등재값 구분자 U+FF65(`･`) 4건** — `UF_login`(`로그인 ･ 회원가입`), `mini_guidekim_cat_beauty_exp`(`한국의 뷰티･에스테틱`), `UF_bridge_txhistory_detail_type`, `UF_history_detail_pay_payback`. 앞서 승인된 `·` 통일 방침을 등재값에도 적용하려면 **4키 패치 엑셀**이 필요하다.
8. **th_TH 버튼 길이** — `เว็บไซต์อย่างเป็นทางการ`는 Figma 버튼 폭(63pt)을 넘길 가능성이 크다. 짧은 대안은 `เว็บไซต์`(웹사이트). 화면 확인 후 결정 권장.

---

## (4) 통과 판정

| 기준 | 결과 |
|---|---|
| 자동 P0 = 0 | ✅ 0건 |
| 수동 P0 = 0 (전수 7키 × 5개 언어) | ✅ 0건 |
| P1/P2 각 건 처리 판정 | ✅ 4/4 기재 (실제 위반 1 수정 / 오탐 3) |
| (d) 권장 사항 임의 반영 금지 | ✅ 미반영 — 8건 사용자 결정 대기 |

### 엑셀 포함 판정 (기준: Unifi v1.7.4 미등재 — 사용자 확정)

| 키 | Unifi 등재 | 포함 |
|---|---|---|
| `UF_clinic_detail_homepage` | 미등재 | ✅ |
| `mini_guidekim_cat_eye` | 미등재 | ✅ |
| `mini_guidekim_cat_dematology` | 미등재 | ✅ |
| `mini_guidekim_cat_dentist` | 미등재 | ✅ |
| `UF_voucher_recommend_price` | 미등재 | ✅ |
| `UF_voucher_recommend_cashback` | 미등재 | ✅ |
| `UF_voucher_recommend_origin_price` | 미등재 | ✅ |

7키 모두 Unifi 미등재 → **전량 포함**. `mini_guidekim_cat_*` 3키는 Dapp Portal에는 있으나 Unifi에는 없어 포함 대상이다.

**→ 게이트 통과. 7키 엑셀 생성 완료(`xlt/xlt_output_20260901193213.xlsx`). 이전 판 엑셀은 삭제했다.**

### 사용자 확정으로 종결된 항목 (2026-09-01)
| (d-2) # | 항목 | 결정 |
|---|---|---|
| 1 | `mini_guidekim_cat_dematology` ko 3곳 불일치 | **`피부과·성형외과`로 통일**(Figma 표기) — 위키 셀·엑셀 반영 |
| 2 | span 범위 | **`정가 <span>{{0}}</span>`** — 취소선이 가격에만 걸리므로 라벨은 span 밖. 위키 셀도 반영 |
| 3 | en `Surge` 잘림 | Unifi 신규 등록분은 **`Surgery`로 교정** · Dapp Portal 기존 등재값은 **그대로 유지**(사용자 판단) |
| 4 | th `จักษุ` | **`จักษุวิทยา`로 교정** (권장안 채택) |
| 5 | 키 이름 `dematology` 오타 | 기록만 — 시스템 등재·FE 사용 중이라 변경하지 않음 |
| 6 | 중복 키 3건(`혜택가`·`정가`) | 신규 키 유지 · 값은 등재값 재사용 |
| 7 | 등재값 U+FF65(`･`) 4건 | **그대로 유지**(사용자 판단) |
| 8 | th 버튼 길이 | 화면 확인 후 필요 시 조정 |
| — | ja `皮膚・美容外科` | **`皮膚科・美容外科`로 대칭 맞춤**(사용자 확정) |
