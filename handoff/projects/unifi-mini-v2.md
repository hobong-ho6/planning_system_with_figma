# unifi-mini-v2 — Unifi mini v2.0 화면정의 (Figma 정책 취합 + XLT/GA)

> 담당자: `hogeun` · 마지막 갱신: 2026-09-14 · 세션 #6 · 마지막 커밋 `b135d23`
>
> 📌 **2026-09-14 미결 3건 실측 점검** — GA Screen ID **해소**(위키 History에 「(제안) 10건 전부 확정」·본문 잔존 0) · K-Pick 1만원권 projectId **확보·전건 일치**(UIT prod) · 한정해제 8개 파라미터는 **여전히 미결**(LPC v41 3번 표 그대로).

## 대상 / 링크

- 위키: [pageId 4704515582](https://wiki.workers-hub.com/display/UNIFI/Unifi+mini+v2.0) `Unifi mini v2.0` — **현재 v173**
  - **하위 `4727978725` 「Unifi mini v2.0 - LPC 관리 영역」** — **현재 v41**. LPC 컬렉션 8개의 정의·등록 JSON·환경 현황 정본. 세션 #4의 주 작업 대상
  - 하위 `4725950300` 「Admin 관리 대상」
- Figma: 파일 `GOCHAYBS7hIrmWRGNuJOKV`(`Web3`) — 여러 페이지/섹션에 화면이 흩어져 있다(`Unifi mini v2.0` 페이지 + 개별 섹션)
- XLT: **부분 착수**. 담당 FE 팀 확정 — `JPYC 자산 상세`계열·`결제 페이지` = **UIT**(`UF_`·`{{0}}`) / `Voucher Detail`·`Clinic Detail` = **LV**(`mini_`·`{0}`). Home/Category/Search/My는 세션 #1 이후 다른 세션에서 이미 번역 완료(v60 시점 확인)
- 이미지: **위키 첨부가 정본**. 로컬 `assets/collected_*`는 git 미추적 재생성물(세션마다 새로 생성)
- **K-Pick 1만원권 바우처 4종**(`k_pick_shopping_product`) — 산출물 `landpress/{cu,daiso,emart24,oliveyoung}_10000/` 각 25파일(5필드 × 5언어) · 게이트 리포트 `reports/gate/gate_report_landpress_*_10000_5lang_2026-09-11.md`
  - LPC `uid`: CU `bizcon-S0234613-coupon` · 다이소 `bizcon-S0242269-coupon` · 이마트24 `bizcon-S0246152-coupon` · 올리브영 `bizcon-S0213605-coupon` (GuideKim `productKey: content:bizcon-*`)
  - ✅ **projectId 확보(2026-09-14 실측)** — 이 컬렉션은 LV가 아니라 **UIT 프로젝트**에 있다: beta `n7nuefo6t491uc9cp863lgyq` · prod **`lkyusnekq1vv9759rbnwgamh`**. 09-13에 LV 쌍(`w5eph…`·`a2qax…`)만 찔러 봐서 `NOT_FOUND_COLLECTION`이 났던 것이다 — **컬렉션을 못 찾으면 팀(LV/UIT) 쌍을 바꿔 본다**
  - ✅ **prod 등록·공개 완료 · 전건 일치** — 4종 × 5언어 × 5필드(summary·review·guide·info·checkout) = **100셀 전부 로컬 산출물과 동일**, `published=true` 5개 언어 전부(2026-09-14 공개 조회 API)
  - ⚠️ **beta에는 1만원권 4종이 없다** — UIT beta `k_pick_shopping_product`는 item **2건**(`bizcon-S0213607`·`bizcon-S0121647`)뿐이고 prod는 **8건**이다. 전역 규칙 「JSON을 바꾸면 beta·prod를 함께」 기준으로는 **beta가 6건 뒤처진 상태**(아래 다음 할 일)
  - ⚠️ **LPC 위키 §9-2 UIT 현황 표에 `k_pick_shopping_product` 행이 없다** — `my_common_info`·`payment_common_info` 2행뿐이라 이 컬렉션은 환경 현황에서 누락돼 있다

## 현재 상태

본문 위키 **v173** · 하위 LPC 관리 영역 **v41**. 화면 **24+**(Home/Category/Search/My + 결제 3 · Voucher Detail 3 · Clinic Detail 4 · JPYC 2). 매 PUT `check_wiki_storage.py` pre/post exit 0.

| 영역 | 상태 |
|---|---|
| **XLT·GA 정의** | 신설 12화면 전부 완료(UIT=결제·JPYC / LV=Voucher·Clinic Detail). Home/Category/Search/My는 이전 세션에 완료 |
| **LPC 8개 컬렉션** | **beta·prod 양쪽 5개 언어 등록·공개 완료** — 공개 조회 API로 LV prod **55항목 전건 일치** 확인 |
| **클리닉** | `k_pick_clinic_product` 폐지 → `k_pick_clinic_common_info` 단일 컬렉션 통합 · **일본 의료광고 규제 반영**(효과 단정 제거, 요건 ②④용 `deviceNotice`·`contact`·`duration`·`risk` 필드 신설) |
| **K-Pick 1만원권 4종** | ✅ **UIT prod 등록·공개 완료**(100셀 전건 일치, 09-14 실측) · ⚠️ **UIT beta 미반영**(item 2 vs prod 8) · 위키 §9-2 표에 행 누락 |
| **미결 핵심** | 🔴 클리닉 **한정해제 요건 ②③④ 8개 파라미터 미확보**(병원·법무) → 상세에 **시술명 노출 불가** · `최대혜택가` 3키 정리. ~~GA Screen ID~~는 09-14 해소 |

> ⚠️ **09-12~13에 이 파일에 기록되지 않은 세션이 여러 번 있었다**(v96 → v172). 근거는 `reports/gate/` 3건과 위키 History. 그 세션들의 **다음 할 일·미결은 이 파일에 옮겨지지 않았다** — 아래 「다음 할 일」은 세션 #3 이후 확인된 범위다.

## 진행 중 작업(WIP)

없음. (위키 산출물만 있고 저장소 코드 변경은 `md/GA.md`·`md/wiki.md` 템플릿 갱신뿐 — 이 커밋에 포함)

## 다음 할 일

- [ ] 🔴 **P0 — 클리닉 한정해제 요건 ②③④ · 값 미확보 8개 파라미터**(LPC 위키 6번 3항). 요건 ①(스스로 찾아온 상세 페이지)만 충족이며 **①~④가 모두 충족돼야 성립** → 지금 상태로는 상세에 **시술명을 노출할 수 없다**
  - `price` 48시술 중 **46건이 「상담 후 안내」** · `duration` 48건 공백 → **조치 E 3택 결정 필요**(① 시술별 시작가 확보 / ② 시술명→진료 분야 / ③ 대표 시술 노출 제외) — 기획·병원
  - `risk` 48건 공백(병원·의료) · `deviceNotice`의 `{0}` 4종(기기명·입수 경로·일본 승인 유무·해외 안전성) 미확보(병원·법무) — **값이 없으면 블록 전체를 노출하지 않는다**(부분 고지는 위반)
  - `contact` 하위 **병원별 전화·이메일 필드 자체가 없다**(병원)
  - ⚠️ **`deviceNotice` 대상 범위 법무 확인** — 고지 대상은 쥬베룩·포텐자이나 위키 `4693549881` 본문은 **리쥬란(힐러)**도 미승인으로 기술(해당 시 `clinic_menu`의 리쥬란 **7건** 추가)
- [ ] **P2 — `primaryLocale` beta↔prod 불일치 5개 컬렉션**(LPC 위키 9-3) — LV `voucher_common_info`·`mini_common_info`·`category_promotion_banner` + UIT 2개가 **beta `ko_KR` / prod `en_US`**. `?locale=`을 붙이면 무해하나 **생략하는 호출이 있으면 환경별로 다른 언어가 나온다** → FE 확인 필요
- [ ] **P2 — FAQ 「한국인과 동일한 가격」 단정 표현**(`clinic_detail_common.faq` · `mini_common_info.service_guide.faq`) — 전 제휴 병원에 대한 단정이라 병원별로 다르면 허위 소지(「최대 15% 캐시백」 지적과 같은 구조). 법무 문서에 없는 항목이라 **미수정·판단 대기**
- [ ] **P3 — CU shopping_guide는 이번 Figma 섹션에 없어 미갱신** — 갱신하려면 해당 Figma 노드 필요
- [ ] **P1 — `최대혜택가` 계열 3키 정리 합의(LV)**: `mini_voucher_detail_max_benefit_rate`(라벨만) · `_label`(라벨만, 값 동일) · `_badge`(라벨+`{0}%`)가 공존한다. 특히 `_rate`는 **이름에 rate가 있는데 값에 rate가 없는** 상태 — FE 사용처 확인 후 폐기/개명 여부를 LV와 합의해야 한다(위키 History에 빨강으로 기재)
- [ ] **P2 — `최대혜택가` 띄어쓰기 통일 검토**: 맞춤법은 `최대 혜택가`. 적용 시 3키 + Figma 원문을 **동시에** 바꿔야 한다(부분 적용 시 같은 화면에서 표기 분기)
- [ ] **P2 — ja `特典` vs `特別` 분기 확인**: `UF_voucher_price_benefit`·`mini_home_price_benefit`은 `特別価格`, `max_benefit` 3키는 `最大特典価格`. 용어집 정본은 혜택=`特典`
- [x] ~~**P1 — GA Screen ID 9건 확정**~~ — **2026-09-14 해소 확인**. 위키 History `2026-09-11 GA Screen ID 정리 — (제안) 10건 전부 확정`(공식 룰 pageId=4268282157의 `추가세부기능` 자리에 단어를 쓰는 형식 채택) · 본문 storage에 `(제안)` 잔존 **0건**
- [ ] **P1 — 판단 필요 사항 확인**: `click_payment_method`(코멘트 근거 없이 시각적으로 추가) · 클리닉 상세 `#17 더 많은 상품보기`(형제 `#32`와 달리 Figma에 `xlt` 마커 없음, 번역 대상으로 임의 판단) · "공식 바우처"·"즉시 발급" 배지(Admin 신규 항목)를 `Admin 관리 대상` 표에도 추가할지
- [ ] **P2 — Figma 원문 교정 요청**: 클리닉 상세 `라인 무료 상담` → `LINE 무료 상담`(다른 위키에서도 동일 지적, 이번 세션에 대응 키로 교체는 완료했으나 **Figma 원본은 미수정**)
- [ ] **P2 — `API 확인` 단 삭제 사유 확인**: 다른 세션이 삭제한 것으로 보이나 이유 불명 — 필요시 사용자에게 확인
- [ ] **P3 — Home/Category/Search/My 잔여 이슈**(세션 #1 잔존, 미해결 시): `categroy name` 오타, GNB 라벨 마커 범위(4개 vs 매칭 1개) — `Banners` 삭제로 슬라이드 2·3 비대칭 이슈는 소멸
- [x] ~~**P1 — K-Pick 1만원권 4종의 LPC projectId 확보 후 등록 상태 확인**~~ — **2026-09-14 완료**. UIT prod `lkyusnekq1vv9759rbnwgamh`에 4종이 **5개 언어 전부 등록·공개**돼 있고, 로컬 산출물과 **100셀 전건 일치**했다(재업로드 불필요)
- [ ] **P2 — K-Pick 1만원권 4종 UIT beta 반영 여부 확인**: prod 8건 / beta 2건으로 **beta가 6건 뒤처져 있다**(1만원권 4종 + `bizcon-S0213605`·`bizcon-S0121707`). 전역 규칙은 beta→prod 순인데 **prod만 있는 역전 상태**라, ⓐ 의도된 것인지(beta는 다른 상품셋을 쓰는지) ⓑ 맞추려면 beta에 생성할지 확인 필요
- [ ] **P2 — LPC 위키 §9-2(UIT 환경 현황) 표에 `k_pick_shopping_product` 행 추가**: 현재 `my_common_info`·`payment_common_info` 2행뿐이라 실제 존재하는 컬렉션이 현황에서 빠져 있다
