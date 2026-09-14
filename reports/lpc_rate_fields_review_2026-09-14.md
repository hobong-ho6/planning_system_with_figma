# LPC 비율 표기 필드 — 값 더블체크용

- 조회: 2026-09-14 · Landpress 공개 읽기 API 신규 조회(캐시 미사용)
- 범위: LV/UIT × beta/prod 4개 프로젝트 · 9개 컬렉션 · 5개 언어 = 90개 조합 전수
- 기준: **할인 5% · 캐시백 10% · 합산 소구 15%** (2026-09-14 사용자 확정)
- 반영 완료: B그룹(캐시백 5%)은 **beta·prod 모두 10%로 정정**됨 — 아래 값은 정정 **이전** 조회 시점 기록
- 리뷰 본문(`review[*].body`)은 **변경 금지 영역**이라 갱신 대상에서 제외(종결)
- 연동 필드 규칙 정본: LPC 위키 `4727978725` **§9-7**
- 모든 항목은 **beta ↔ prod 값이 일치**하며, 5개 언어 값도 서로 정합합니다.
  (beta에는 K-Pick 상품 8종 중 2종만 존재 — `bizcon-S0213607`·`bizcon-S0121647`. 그 2종은 prod와 완전 일치)


## A. 캐시백 10% — 정본 (이미 등록됨, 변경 없음)


### 바우처 상세 › 이용 방법 step3
`LV · voucher_common_info`  
`voucher_usage.items[2].description`

| 언어 | 값 |
|---|---|
| ko_KR | 구매 완료 후 결제 금액의 10%를 포인트로 돌려받아요. |
| ja_JP | 購入完了後、決済金額の10%がポイントで戻ります。 |
| en_US | After your purchase, 10% of the payment amount is returned as points. |
| th_TH | หลังซื้อสำเร็จ จะได้รับ 10% ของยอดชำระคืนเป็นคะแนน |
| zh_TW | 購買完成後，將以點數回饋消費金額的 10%。 |

### 결제페이지 › 결제 순서 step4
`UIT · payment_common_info`  
`payment_guide.sections[0].items[3].description`

| 언어 | 값 |
|---|---|
| ko_KR | 결제가 확인되면 결제 금액의 10% 캐시백도 포인트로 지급됩니다. |
| ja_JP | 決済が確認されると、決済金額の10%が還元ポイントとして付与されます。 |
| en_US | Once your payment is confirmed, you also receive 10% cashback as points. |
| th_TH | เมื่อยืนยันการชำระเงินแล้ว จะได้รับเงินคืน 10% ของยอดชำระเป็นพอยต์ |
| zh_TW | 付款確認後，將以點數發放付款金額 10% 的現金回饋。 |

### 서비스 안내 › FAQ
`LV · mini_common_info`  
`service_guide.faq.items[1].description`

| 언어 | 값 |
|---|---|
| ko_KR | 바우처는 결제가 확인되면 결제 금액의 10%를 포인트로 돌려받아요. / 클리닉은 시술 후 현장에서 결제하면 결제금의 일정 비율을 포인트로 받으며, 비율은 병원마다 달라 각 병원 화면에서 확인할 수 있어요. |
| ja_JP | クーポンは決済が確認されると、決済金額の10%がポイントで戻ります。 / クリニックは施術後に現地で決済すると決済金額の一定割合がポイントで戻り、その割合は病院ごとに異なるため各病院の画面で確認できます。 |
| en_US | For vouchers, 10% of the payment amount is returned as points once your payment is confirmed. / For clinics, a set percentage of the payment is returned as points when you pay on site after the treatment. The rate differs by clinic and can be checked on each clinic page. |
| th_TH | สำหรับเวาเชอร์ จะได้รับ 10% ของยอดชำระคืนเป็นคะแนนเมื่อยืนยันการชำระเงินแล้ว / สำหรับคลินิก เมื่อชำระเงินที่คลินิกหลังทำหัตถการ จะได้รับเงินคืนเป็นคะแนนตามสัดส่วนที่กำหนด ซึ่งแตกต่างกันไปตามคลินิก และตรวจสอบได้ที่หน้าของแต่ละคลินิก |
| zh_TW | 優惠券在付款確認後，將以點數回饋付款金額的 10%。 / 診所則是在療程後於現場付款時，以點數回饋一定比例的金額，比例因診所而異，可在各診所頁面確認。 |

## B. 캐시백 5% — ⚠️ 변경 대기 (→10%)


### K-Pick 상품 › 가이드 step3 (8상품 공통)
`UIT · k_pick_shopping_product · uid=bizcon-S0234613-coupon`  
`guide.steps[2].description`

| 언어 | 값 |
|---|---|
| ko_KR | 구매 완료 후 결제 금액의 5%를 포인트로 돌려받아요. |
| ja_JP | 購入完了後、決済金額の5%がポイントで戻ります。 |
| en_US | After your purchase, 5% of the payment amount is returned as points. |
| th_TH | หลังซื้อสำเร็จ จะได้รับ 5% ของยอดชำระคืนเป็นคะแนน |
| zh_TW | 購買完成後，將以點數回饋消費金額的 5%。 |

### K-Pick 상품 › 결제 step4 (8상품 공통)
`UIT · k_pick_shopping_product · uid=bizcon-S0234613-coupon`  
`checkout.steps[3]`

| 언어 | 값 |
|---|---|
| ko_KR | 결제가 확인되면 결제 금액의 5% 캐시백도 포인트로 지급됩니다. |
| ja_JP | 決済が確認されると、決済金額の5%のキャッシュバックもポイントで付与されます。 |
| en_US | Once the payment is confirmed, 5% cashback on the payment amount is also given as points. |
| th_TH | เมื่อยืนยันการชำระเงินแล้ว จะได้รับเงินคืน 5% ของยอดชำระเป็นคะแนนด้วย |
| zh_TW | 確認付款後，也會以點數發放消費金額 5% 的現金回饋。 |

## C. 합산 15% (할인5+캐시백10) — 연동 대상


### 카테고리1 › 상단 프로모션 배너
`LV · category_promotion_banner`  
`contents.title`

| 언어 | 값 |
|---|---|
| ko_KR | 바우처 전 상품 최대 15% 할인 진행중! |
| ja_JP | 全クーポン商品が最大15%割引中！ |
| en_US | Up to 15% off on all vouchers! |
| th_TH | ลดสูงสุด 15% สำหรับเวาเชอร์ทุกรายการ! |
| zh_TW | 全商品優惠券最高 15% 折扣中！ |

### CU 가이드 › CTA 배지
`LV · shopping_guide · uid=CU`  
`guide_page.cta.badge`

| 언어 | 값 |
|---|---|
| ko_KR | 최대 15% 할인 |
| ja_JP | 最大15%割引 |
| en_US | Up to 15% off |
| th_TH | ลดสูงสุด 15% |
| zh_TW | 最高 15% 折扣 |

### 올리브영 가이드 › CTA 배지
`LV · shopping_guide · uid=oliveyoung`  
`guide_page.cta.badge`

| 언어 | 값 |
|---|---|
| ko_KR | 최대 15% 할인 |
| ja_JP | 最大15%割引 |
| en_US | Up to 15% off |
| th_TH | ลดสูงสุด 15% |
| zh_TW | 最高 15% 折扣 |

### 다이소 가이드 › CTA 배지
`LV · shopping_guide · uid=daiso`  
`guide_page.cta.badge`

| 언어 | 값 |
|---|---|
| ko_KR | 최대 15% 할인 |
| ja_JP | 最大15%割引 |
| en_US | Up to 15% off |
| th_TH | ลดสูงสุด 15% |
| zh_TW | 最高 15% 折扣 |

### 서비스 안내 › 미리 준비
`LV · mini_common_info`  
`service_guide.prepare.items[0].description`

| 언어 | 값 |
|---|---|
| ko_KR | 한국 도착 즉시 사용 가능한 상품권 / 최대 15% 혜택으로 미리 준비해요 |
| ja_JP | 韓国到着後すぐ使える商品券 / 最大15%お得に準備しましょう |
| en_US | Vouchers you can use as soon as you arrive / Prepare ahead with up to 15% off |
| th_TH | บัตรกำนัลที่ใช้ได้ทันทีเมื่อถึงเกาหลี / เตรียมไว้ล่วงหน้ารับสิทธิ์สูงสุด 15% |
| zh_TW | 抵達韓國即可使用的商品券 / 以最高 15% 優惠提前準備 |