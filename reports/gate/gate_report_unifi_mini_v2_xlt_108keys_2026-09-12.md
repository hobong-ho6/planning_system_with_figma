# 번역 품질 게이트 리포트 — Unifi mini v2.0 신규 XLT 114키 (2026-09-12)

> **2차 반영 완료** — 아래 1~6장은 1차(108키) 기준이고, 원문 제안 6건 결정과 누락 7키를 반영한 최종 결과는 **7장**이다.

- **대상**: 위키 `Unifi mini v2.0`(pageId 4704515582) Screen 표의 XLT 키 중 **XLT 시스템 미등록 108키**
- **산출물**: `xlt/unifi_mini_v2.0_UIT_20260912.xlsx`(76키) · `xlt/unifi_mini_v2.0_LV_20260912.xlsx`(32키)
- **팀 규칙**: UIT = `UF_` 프리픽스 · 치환자 `{{0}}` / LV = `mini_` 프리픽스 · 치환자 `{0}` (위키 Screen 섹션의 UIT/LV 구분으로 판별)
- **참조**: 용어집 v5.3(117 용어 · 예외 11) · XLT 등록값 Unifi `WEB BROWSER v1.7.6`(2,467키) + Dapp Portal `WEB BROWSER v2.6.1`(1,641키) — 모두 2026-09-12 API 재조회(캐시 미사용)

## 0. 대상 확정 — 중복 키 제거

위키 XLT 키 고유 153건을 두 레지스트리와 대조: **등록됨 31 · 미등록 122**.
미등록 122건 중 한국어 문구가 기존 등록 키와 **100% 동일한 26건**을 사용자 확인에 부쳐 아래와 같이 확정했다.

| 결정 | 건수 | 처리 |
|---|---|---|
| 기존 키 재사용 | 14 | 결제 페이지 `UF_payment_*` → `UF_voucher_pay_*` 계열. **번역 대상에서 제외**(이미 5개 언어 등록) |
| 신규 키 유지 | 12 | 공용 단어 계열(전체·정가·혜택가·클리닉·리뷰 등) — 화면·서비스가 달라 네임스페이스 분리 |

→ **최종 번역 대상 108키**(UIT 76 · LV 32).

재사용 확정 매핑(14건): `UF_payment_page_title`→`UF_voucher_pay_title` · `UF_payment_pay_btn`→`UF_voucher_pay_btn` · `UF_payment_method_title`→`UF_voucher_pay_method` · `UF_payment_method_card_title`→`UF_voucher_pay_method_card` · `UF_payment_method_card_desc`→`UF_voucher_pay_method_card_desc` · `UF_payment_method_unifipay_title`→`UF_history_detail_pay` · `UF_payment_cashback_rate_label`→`UF_voucher_pay_cashback` · `UF_payment_complete_amount_label`→`UF_voucher_pay_done_amount` · `UF_payment_complete_datetime`→`UF_voucher_pay_done_time` · `UF_payment_complete_product_label`→`UF_voucher_pay_done_product` · `UF_payment_complete_voucher_btn`→`UF_voucher_check_purchased` · `UF_payment_complete_more_btn`→`UF_voucher_more_products` · `UF_payment_fail_desc`→`UF_voucher_pay_fail_desc` · `UF_payment_fail_retry_btn`→`UF_voucher_pay_fail_btn`

## 1a. 한국어 원문 교정 (번역 전 필수)

Figma 원문을 **전수** 점검해 아래 8건을 교정했다. 원문과 달라진 건은 `{Figma 원문 → XLT Key KR}` **alias**로 기록한다.

| 키 | Figma 원문 | 교정 후(XLT KR) | 사유 |
|---|---|---|---|
| `UF_jpyc_guide_buy_desc` | JY**P**C EX 공식 구매처에서 | JPYC EX 공식 구매처에서 | **오타**(JYPC→JPYC) |
| `UF_jpyc_guide_exchange_desc` | 1JPYC당 1엔 | 1 JPYC당 1엔 | 숫자+통화 한 칸 띄우기(guide.md 5-2 · 용어집 `{0} JPYC`) |
| `UF_jpyc_guide_usage_hold` | 보관만해도 | 보관만 해도 | 띄어쓰기 |
| `UF_jpyc_guide_benefit_desc` | 엔화 가치는 그대로 보내기는 | 엔화 가치는 그대로, 보내기는 | 쉼표 누락으로 중의적 |
| `UF_jpyc_guide_benefit_title` | JPYC 왜 좋을까요 | JPYC 왜 좋을까요? | 같은 카드군 3건이 모두 물음표 |
| `UF_my_terms_agree_title` | 약관동의가 필요해요 | 약관 동의가 필요해요 | 띄어쓰기 |
| `UF_status_payment_canceling` | 결제 취소중 | 결제 취소 중 | 의존명사 띄어쓰기 |
| `mini_voucher_detail_more_voucher_btn` | 더 많은 상품보기 | 더 많은 상품 보기 | 띄어쓰기 + 등록 키 `UF_voucher_more_products` 표기와 통일 |
| `mini_voucher_detail_review_source_desc` | …실제 이용자 **후기**를… | …실제 이용자 **리뷰**를… | 용어집 등재어 `리뷰` + 등록 키 `UF_clinic_detail_review_source`와 동일 문구로 통일 |

그 밖에 `UF_jpyc_guide_usage_pay`·`UF_jpyc_guide_usage_hold`의 **줄바꿈 앞 불필요한 공백**을 제거했다.

> Figma 원본 수정 요청은 이 리포트에 alias로만 남긴다(디자이너 전달은 별도 취합 흐름).

## 2. 자동 검증 결과 (`scripts/validate_translation.py` 실측 실행)

| 파일 | 항목 | 🔴 P0 | 🟡 P1 | 🟢 P2 |
|---|---|---|---|---|
| `unifi_mini_v2.0_UIT_20260912.xlsx` | 76키 | **0** | 33 | 5 |
| `unifi_mini_v2.0_LV_20260912.xlsx` | 32키 | **0** | 10 | 1 |

**P0 = 0건** → 게이트 통과 기준 충족. (1차 실행에서 P1 UIT 36 · LV 12였고, 아래 6건을 실제 수정해 33/10으로 줄였다.)

## 3. 수동 3단계 검토 (전수 — 108키 전체 행)

검토 범위를 신규·변경 키로 한정하지 않고 **두 엑셀의 전체 행 108건 × 5개 언어 = 540셀**을 한 줄씩 육안 검토했다.

### 1단계 — 한국어 원문 (ko_KR 전수)
| 점검 항목 | 결과 |
|---|---|
| 맞춤법·띄어쓰기 | 위 1a의 8건 교정 · 나머지 100건 이상 없음 |
| 종결어미 톤(~해요체) 일관성 | 문장형 11건 모두 `~해요/~세요/~입니다` 중 화면 성격에 맞게 일관 |
| 한글·영어 혼용 | `mini_gnb_search`의 ko가 `Search`(영문 단독) — **사용자 확인 항목**(아래 P1 판정) |
| 치환자 표기 | UIT 12건 `{{0}}` · LV 5건 `{0}` — 팀 규칙과 100% 일치, 누락·증식 없음 |
| 줄바꿈(`\n`) | 원문 줄바꿈 20건 전부 보존, 앞뒤 잉여 공백 제거 |

### 2단계 — 용어집 대조 (117 용어 · 예외 11)
| 점검 항목 | 결과 |
|---|---|
| 예외 용어 미번역 유지 | `JPYC`·`Unifi mini`·`LINE MINI App`·`Apple`/`Google` 계열 — 전 언어에서 원어 유지 확인 |
| 핵심 용어 반영 | 캐시백→ja `還元`(v5.0 정본) 3건 · 혜택→`特典/benefit/優惠/สิทธิประโยชน์` · 리뷰→`レビュー/Reviews/評論/รีวิว` · 전체→`すべて/All/全部/ทั้งหมด` · 전체보기·인기·가격·유의사항 반영 |
| `deprecated_terms` 잔존 | `OA 팔로우`·`채널 추가`·`Mini App`(소문자)·`キャッシュバック`·`ลูกบอลนำโชค` — **0건** |
| 숫자+단위 띄어쓰기 | `1 JPYC`·`5%`·`15%`·`{0}%` 전 언어 규칙 준수 |
| 브랜드 표기 | OLIVE YOUNG·DAISO·GuideKim·JPYC EX — 원어 유지 |

### 3단계 — 의미 기반 다국어 (ko 대비 4개 언어)
| 언어 | 중점 점검 | 결과 |
|---|---|---|
| ja_JP | です・ます체, 조사, 숫자+단위 붙임 | 76+32건 전수 확인. `決済/入金/出金/送る` 등 화면 내 동작이 서로 충돌하지 않도록 구분(보내기=送る ↔ 출금=出金) |
| en_US | 관사·단복수·명령형 일관 | 버튼은 동사원형(Buy/Send/Deposit/Withdraw), 라벨은 명사구로 통일 |
| zh_TW | 번체 정자, 숫자 앞뒤 공백 | `簡體` 혼입 0건. `優惠券/診所/禮券` 기존 등재 표기와 일치 |
| th_TH | 의미 단위 띄어쓰기, 숫자+단위 분리 | 단어 붙임 오류 0건. `เวาเชอร์/คลินิก/เงินคืน` 등재 표기와 일치 |
| 공통 | 외래어 음차 오염·띄어쓰기 누락·다의어 모호 | 자동 검증기가 못 잡는 4개 패턴 전수 확인 — 발견 0건 |

### 수동 검토로 **실제 수정**한 6건
| 키 | 언어 | 수정 전 → 후 | 사유 |
|---|---|---|---|
| `UF_my_jpyc_charge_title` | ja/en/zh/th | チャージ/Top up/儲值/เติม → `入金`/`Deposit JPYC`/`存入 JPYC`/`ฝาก JPYC` | 등재 실사용 실측 다수(입금 계열 5·5·5·4건) |
| `UF_my_jpyc_charge_wallet_title` | ja/en/zh/th | 동일 사유로 입금 계열 통일 | 상동 |
| `UF_jpyc_guide_benefit_desc` | en | faster transfers → `faster sends` | 등재 실사용 `Send` 7건 다수 |
| `UF_jpyc_guide_benefit_desc` | th | โอนได้… → `ส่งได้…` | 등재 실사용 `ส่ง` 7건 다수 |
| `UF_my_point_reversed` | ja | 付与取消 → `付与キャンセル` | 같은 화면 상태 배지(`決済キャンセル`)와 표기 통일 |
| `mini_home_kbeauty_title`·`mini_home_travel_title` | en | Trending/Must-do → `Popular …` | 용어집 `인기 = popular` 반영 |

## 4. 자동 검증 각 건 처리 판정 (P1 43건 · P2 6건 전건)

### P1 — 전부 `[용어 불일치]` 계열이며 아래로 판정했다
| # | 대상 | 검증기 권장 | 판정 | 사유 |
|---|---|---|---|---|
| 1 | `UF_jpyc_guide_exchange_desc` ×4 | 교환→swap/交換/แลกเปลี่ยน/交換 | **오탐** | 여기 「교환」은 암호자산 스왑이 아니라 법정화폐 환금. 등록 키 `UF_jpyc_guide_q3_desc`도 `換金/exchange/兌換/แลก` |
| 2 | `UF_jpyc_guide_benefit_desc` ja | 보내기→出금(出金) | **오탐** | 같은 화면에 「출금하기」(`出金する`)가 따로 있어 충돌. `送金` 유지 |
| 3 | `UF_jpyc_guide_usage_pay` th·zh | 결제→การชำระเงิน/付款 | **오탐** | th는 `ชำระเงิน` 포함(동사형), zh는 등재 `UF_jpyc_guide_card_5_desc1`의 `實體支付`와 일치 |
| 4 | `UF_my_jpyc_banner_desc`·`mini_home_banner_desc` 최대 ×4 | 최대→Max/最多 | **오탐** | 등재 `Max`는 입력 버튼 문맥. 문장형은 실측 다수가 `up to`/`最高` |
| 5 | `UF_my_jpyc_charge_title`·`_charge_wallet_title` 채우기 ×8 | 채우기→Receive/受け取る/รับ/接收 | **정책 보류 → 용어집 보완 권장** | 등재값 `Receive` 계열은 **실사용 0건**. 실측 다수는 `Deposit/入金/存入/ฝากเงิน`(5·5·5·4건) → 실측 다수로 번역, 용어집 갱신 권장(d-1 ①) |
| 6 | `UF_my_jpyc_send_title`·`_send_wallet_title` ja ×2 | 보내기→出金 | **정책 보류 → 용어집 보완 권장** | 등재 ja `出金`은 실측 2건으로 다수 아님(`送信` 2 · `送る` 2). 출금 키와 충돌 → d-1 ② |
| 7 | `UF_my_jpyc_buy_title` en | 구매하기→Buy now | **오탐** | `Buy now`는 CTA 버튼 문맥(`mini_voucher_detail_buy_now_btn`에서 사용). 여기는 섹션 제목 |
| 8 | `UF_my_point_accrued`·`UF_status_issued`·`UF_status_used` 완료 ×9 | 완료→Complete/完了/เสร็จ/完成 | **오탐** | 상태 배지의 「적립완료·발행 완료·사용 완료」는 복합어. 등재 실사용도 `Issued/Used/使用済み` 계열 |
| 9 | `UF_my_point_reversed` ja 취소 | 취소→キャンセル | **실제 위반 → 수정함** | `付与キャンセル`로 교체 |
| 10 | `UF_my_terms_agree_desc` en·zh 확인 | 확인→check/查看 | **오탐** | 여기 「확인」은 약관 검토(review/確認). 등재 `查看`는 조회 문맥 |
| 11 | `UF_status_payment_cancel_requested` en 결제 | 결제→Payment | **정책 보류 → 사용자 확인** | 배지 길이 때문에 `Cancellation requested`로 축약. `Payment cancellation requested`로 늘릴지 확인 필요 |
| 12 | `mini_category_sort_review` en 리뷰 | 리뷰→Reviews | **오탐** | 정렬 라벨 `Most reviewed`는 형용사형이 자연 |
| 13 | `mini_home_clinic_view_all` th·zh 전체보기 | ดูทั้งหมด/全部查看 | **오탐** | th `ดูคลินิกทั้งหมด`는 어구 분리로 미검출, zh `查看全部診所`가 자연 어순 |
| 14 | `mini_home_kbeauty_title`·`mini_home_travel_title` en 인기 | 인기→popular | **실제 위반 → 수정함** | `Popular …`로 교체 |
| 15 | `mini_home_price_benefit` 혜택 ×3 | 혜택→benefit/特典/สิทธิประโยชน์ | **오탐** | 「혜택가」는 가격 라벨. 등록 키 `UF_voucher_price_benefit`의 `特別価格/Special price/ราคาพิเศษ`와 동일하게 맞춤 |
| 16 | `mini_gnb_search` ko ×2 | 라틴 문자열·번역 누락 의심 | **정책 보류 → 사용자 확인** | 화면 원문이 GNB 라벨 `Search`(영문). `한글·영어 혼용 금지` 원칙상 ko를 `검색`으로 바꿀지 확인 필요(d-2 ③) |

### P2 — 6건 전부 `[마침표 스타일]`
문장형 11건 중 마침표를 쓴 6건이 소수 스타일로 보고됐다. **오탐 · 현행 유지** — 한 문장 완결형 설명문에는 마침표, 카피·라벨·버튼에는 마침표 없음이 이 페이지의 일관 규칙이고 등재값도 같은 방식이다.

## 5. (d) 추가 개선·제안 (권장 — 사용자 결정 전 임의 반영 금지)

### (d-1) 용어집 보완 권장 — 실사용 실측 근거 포함
| # | 용어 | 현재 등재값 | 권장 | 실측 근거(Unifi v1.7.6 + Dapp v2.6.1) |
|---|---|---|---|---|
| ① | 채우기 | Receive / 受け取る / 接收 / รับ | **Deposit / 入金 / 存入 / ฝากเงิน** | 「채우기」 포함 12키 중 `Deposit` 5 · `入金` 5 · `存入` 5 · `ฝากเงิน` 4가 다수. 현재 등재값은 **실사용 0건**이라 정상 번역을 P1로 반복 오탐시킨다 |
| ② | 보내기(ja) | 出金 | **送る 또는 送信**(재검토) | 「보내기」 포함 42키 ja: `送信` 2 · `出金` 2 · `送る` 2로 분산 — `出金`은 다수가 아니고 「출금」과 충돌한다 |
| ③ | 최대 | Max / 最多 | 문맥 분리 등재(입력 UI=Max, 문장=up to/最高) | 「최대」 포함 174키에서 문장형은 `up to`·`最高`가 우세 |

> 용어집은 읽기 전용 API다 — 승인해 주시면 `md/landpress.md` 절차대로 **전체 JSON**을 산출해 드리고, CMS 붙여넣기는 사용자가 수행한다. 버전이 오르면 기획자 가이드 zip도 같은 작업에서 함께 갱신한다.

### (d-2) 원문·정책 개선 제안
| # | 대상 | 제안 |
|---|---|---|
| ① | `UF_my_jpyc_banner_desc`의 `5%`, `mini_home_banner_desc`의 `15%` | 런타임 가변값으로 보인다 — `{{0}}`/`{0}` 변수화를 권장(PM 확인 후에만 적용) |
| ② | `UF_my_benefit_month` = `{{0}}월 혜택` | `{{0}}`에 **숫자만** 들어오면 영어·태국어에서 어색하다(`Benefits for 8`). FE가 지역화된 월 이름을 넘기거나, 키를 언어별 문장으로 분리하는 것을 권장 |
| ③ | `mini_gnb_search` ko = `Search` | 화면 표기 스타일 원칙(한글·영어 혼용 금지)상 ko를 `검색`으로 바꾸는 것을 권장. 디자인 의도가 영문 고정이면 현행 유지 |
| ④ | 상품권 ↔ 바우처 표기 혼용 | 같은 대상(구매한 모바일 금액권)을 화면에 따라 `상품권`(My·상세)과 `바우처`(카테고리·상세보기 버튼)로 부른다. 번역도 `ギフト券/Gift card/禮券/บัตรกำนัล`과 `バウチャー/Voucher/優惠券/เวาเชอร์`로 갈린다 — 한쪽으로 통일 권장 |
| ⑤ | `mini_home_banner_desc` ja 브랜드 표기 | 공식 표기 `オリーブヤング`를 썼다. 기존 등재 `mini_guidekim_all_korea_experience`는 속어 축약 `オリヤン`이라 갈린다 — 통일 권장 |
| ⑥ | `UF_status_payment_cancel_requested` en | 배지 길이 때문에 `Cancellation requested`로 줄였다. 다른 배지(`Payment canceled`)와 맞추려면 `Payment cancellation requested` |

## 6. 통과 판정

- 자동 **P0 = 0건** · 수동 **P0 = 0건** → **통과**. 엑셀 생성·위키 반영으로 진행 가능.
- P1 43건 · P2 6건은 위 4장에서 **전건 처리 판정** 완료(실제 위반 6건 수정 · 오탐 33건 · 정책 보류 4건).
- (d) 권장 9건은 **사용자 결정 전까지 미반영**.


---

## 7. 2차 반영 — 원문 제안 6건 결정 + 누락 7키 (2026-09-12)

### 7-1. 누락 키 7건 추가 (108 → 115), 중복 병합 1건 (→ 114)

Screen 표를 다시 전수 파싱해 1차에서 빠졌던 **상태 배지 계열 7키**를 찾아 번역했다(중첩표 때문에 1차 파서가 놓쳤다).

`UF_category_mobile_giftcard`(모바일 상품권) · `UF_status_booking_requested`(예약 신청) · `UF_status_booking_confirmed`(예약 확정) · `UF_status_booking_visited`(내원 완료) · `UF_status_booking_canceled`(예약 취소) · `UF_status_refund_partial`(부분 환불) · `UF_status_voucher_issuing_wait`(바우처 발행 대기 중)

**병합 1건** — 용어 통일(7-2 ④) 결과 `UF_my_giftcard_detail_btn`(상품권 상세보기)이 `UF_my_voucher_detail_btn`(바우처 상세보기)과 문구가 같아져 **후자로 병합**하고 전자를 폐기했다.

→ 최종 **114키**(UIT 82 · LV 32).

### 7-2. 결정 반영 내역

| # | 결정 | 반영 |
|---|---|---|
| ① | `mini_home_banner_desc`만 변수화 | `최대 {0} 혜택`으로 변수화(5개 언어). `UF_my_jpyc_banner_desc`의 `5%`는 **고정 유지**(결정대로) |
| ② | `UF_my_benefit_month` — FE가 월 **숫자만** 전달 전제로 문장 재구성 | en `Benefits for {{0}}` → **`Benefits for month {{0}}`**. ko `{{0}}월 혜택` · ja `{{0}}月の特典` · zh `{{0}} 月優惠` · th `สิทธิประโยชน์เดือน {{0}}`는 숫자만으로 성립해 그대로 |
| ③ | `mini_gnb_search` ko → `검색` | 적용. 자동 검증기 P1 2건(라틴 문자열·번역 누락 의심) **해소** |
| ④ | 바우처로 통일, **ja는 쿠폰** | ko `상품권`→`바우처` 4키 + ja `バウチャー`→**`クーポン`** 전건. 용어집 등재는 7-4 |
| ⑤ | `オリーブヤング`로 통일 + 기존 키 갱신 | 신규 키 적용 + 기존 등록 키 `mini_guidekim_all_korea_experience` 갱신분을 별도 업로드 엑셀에 포함 |
| ⑥ | `Cancellation requested` 유지 | 변경 없음. 자동 검증 P1은 **오탐**으로 확정 기록 |

### 7-3. 기존 등록 키 갱신 20건 (별도 엑셀)

④ 결정(ja = 쿠폰)은 **이미 등록된 20키**에도 영향을 준다 — ja에 `バウチャー`가 들어간 등록값이 Unifi에 20건 있다. 통일하지 않으면 화면마다 `クーポン`/`バウチャー`가 갈린다.

`xlt/unifi_mini_v2.0_기존키_ja쿠폰통일_20260912.xlsx` (20키) — **ja만** `バウチャー`→`クーポン`으로 바꿨고 나머지 4개 언어는 등록값 그대로다. ⑤의 `オリヤン`→`オリーブヤング`도 이 파일에 포함(같은 키).

> 이 파일의 업로드 여부는 사용자 결정이다. 올리지 않으면 신규 키(クーポン)와 기존 키(バウチャー)가 공존한다.

### 7-4. 용어집 등재 (사용자 승인 — v5.4 산출 대상)

| 구분 | 내용 |
|---|---|
| `terminology` 신설 | `바우처` = en `Voucher` / ja `クーポン` / zh `優惠券` / th `เวาเชอร์` |
| `deprecated_terms` 신설 | ja `バウチャー` → `クーポン` (잔존 구 표기 검출용) |

### 7-5. 재검증 결과 (자동 재실행)

| 파일 | 항목 | 🔴 P0 | 🟡 P1 | 🟢 P2 |
|---|---|---|---|---|
| `unifi_mini_v2.0_UIT_20260912.xlsx` | 82키 | **0** | 37 | 5 |
| `unifi_mini_v2.0_LV_20260912.xlsx` | 32키 | **0** | 8 | 1 |
| `unifi_mini_v2.0_기존키_ja쿠폰통일_20260912.xlsx` | 20키 | **0** | 12 | 9 |

- **P0 = 0건 유지** → 게이트 통과.
- UIT P1 33 → 37: 신규 7키 중 `UF_status_booking_visited`의 「완료」 4건이 추가됐다 — `UF_status_used`·`UF_status_issued`와 **같은 오탐 패턴**(상태 배지 복합어)으로 판정.
- LV P1 10 → 8: ③ 적용으로 `mini_gnb_search` 2건 해소.
- 갱신 엑셀 P1 12 · P2 9는 **기존 등록값이 원래 갖고 있던 것**이다 — 이번에 바꾼 건 ja 한 컬럼뿐이라 신규 위반이 아니다.

### 7-6. 2차 수동 검토 — 전수 재확인

추가·변경된 **21키**(신규 7 + 통일 6 + 변수화 1 + 기타 7)와 갱신 엑셀 **20키**를 1·2·3단계로 다시 전수 검토했다.
- 1단계: `바우처 발행 대기중` → **`바우처 발행 대기 중`** 띄어쓰기 교정(alias 추가)
- 2단계: `クーポン` 치환이 문장 안에서 조사·접속을 깨뜨리지 않는지 20건 전건 확인(`購入したクーポンを確認する。` 등) — 이상 없음
- 3단계: 상태 배지 7건의 4개 언어 길이·어감 확인 — 배지 폭을 넘길 만한 장문 없음

### 7-7. 남은 확인 1건

`UF_category_mobile_giftcard`의 ko는 **`모바일 상품권`을 그대로 뒀다**. 이건 결제 내역 카드의 **카테고리 값**(클리닉 / 모바일 상품권 / 액티비티)이라 ④의 통일 대상(구매물 지칭)과 성격이 다르다. 카테고리 값도 `바우처`로 바꿀지는 확인이 필요하다 — 바꾸면 `UF_my_menu_giftcard`(바우처)와 문구가 같아져 또 병합 대상이 된다.


---

## 8. 3차 — 사용자 최종 결정 반영 · 용어집 CMS 반영 확인 (2026-09-12)

### 8-1. `UF_category_mobile_giftcard` — 통일 대상 제외 확정
7-7의 확인 요청에 **「상품권 그대로 둔다」**로 결정됐다. ko `모바일 상품권`을 유지하고, ko와 4개 언어가 어긋나지 않도록 나머지 언어도 **상품권 계열**로 맞췄다.

| 언어 | 변경 전(쿠폰 계열) | 변경 후(상품권 계열) |
|---|---|---|
| ja_JP | モバイルクーポン | **モバイルギフト券** |
| en_US | Mobile voucher | **Mobile gift card** |
| zh_TW | 行動優惠券 | **行動禮券** |
| th_TH | เวาเชอร์มือถือ | **บัตรกำนัลมือถือ** |

> 등재 실사용은 ja `ギフト券` 0건 · zh `禮券` 0건 · th `บัตรกำนัล` 2건이다. 실측 다수가 아닌 표기지만, **카테고리 값을 구매물 지칭(바우처)과 구분하려는 결정**이라 의도적으로 채택했다.

### 8-2. 용어집 v5.4 CMS 반영 확인 (산출물 대조)
사용자가 CMS에 반영한 뒤 API로 재조회해 전달 산출물과 **필드·언어 단위로 대조**했다.

| 필드 | live | 산출물 | 동일 |
|---|---|---|---|
| metadata | 11 | 11 | ✅ |
| exceptions | 11 | 11 | ✅ |
| terminology | 118 | 118 | ✅ |
| oa_variables | 2 | 2 | ✅ |
| deprecated_terms | 22 | 22 | ✅ |

`version 5.4` · `last_updated 2026-09-12` · `바우처` = Voucher / クーポン / 優惠券 / เวาเชอร์ · `deprecated #22` 존재. **terminology 언어 단위 불일치 0건 · 전체 동일 True**. 로컬 캐시도 v5.4로 갱신했다.

### 8-3. v5.4 기준 재검증

| 파일 | 항목 | 🔴 P0 | 🟡 P1 | 🟢 P2 |
|---|---|---|---|---|
| UIT (신규) | 82키 | **0** | 38 | 5 |
| LV (신규) | 32키 | **0** | 8 | 1 |
| 기존 키 갱신 | 20키 | **0** | 15 | 9 |

**P0 = 0건 유지** → 게이트 통과. 새 용어 `바우처` 등재로 늘어난 P1 4건의 처리 판정:

| 대상 | 검증기 | 판정 |
|---|---|---|
| `UF_status_voucher_issuing_wait` en | 바우처 → Voucher | **오탐** — 배지 문구라 `Awaiting issuance`로 축약. 앞 배지가 이미 바우처 맥락 |
| `mini_guidekim_kpick_jp_banner_desc` th·zh (갱신 엑셀) | 바우처 → เวาเชอร์ / 優惠券 | **기존 등록값의 선재 문제** — 이번에 바꾼 건 ja 한 컬럼뿐이다. 별도 정비 대상으로 보고 |
| `mini_luckyball_travel_desc` th (갱신 엑셀) | 바우처 → เวาเชอร์ | 상동 |

### 8-4. 가이드 v36 게시 확인
사용자 게시 확인에 따라 `git tag guide-v36` 부여·푸시 완료. 임베드 JSON은 zip 내부 파일 기준으로도 정본과 **완전 일치**를 재확인했다.


---

## 9. Voucher Detail 3프레임 갱신 — 신규 6키 (2026-09-12)

### 9-1. 대상
`바우처 상세`(`72528-4404`, 재조회) · `바우처 상세 - 즐겨찾기`(`73553-14042`, 신규) · `바우처 상세 - 가격 펼치기`(`73553-15279`, 신규). 담당 **LV**(`mini_` · `{0}`).

`바우처 상세`는 가격 영역이 `정가 / 혜택가 / {0}% 할인` → **`결제가 / 최대혜택가 {0}%`** 로 개편되고 상세 내역이 펼침 카드로 분리돼, 정책이 34 → **29건**이 됐다.

### 9-2. 신규 6키 (전수 중복 대조 — 기존 등록 키 없음)

| XLT Key | KR | JA | EN | TH | ZH-TW |
|---|---|---|---|---|---|
| `mini_voucher_detail_payment_price_label` | 결제가 | 決済価格 | Payment price | ราคาที่ชำระ | 付款價格 |
| `mini_voucher_detail_max_benefit_rate` | 최대혜택가 {0}% | 最大特典価格 {0}% | Max benefit price {0}% | ราคาพิเศษสูงสุด {0}% | 最高優惠價 {0}% |
| `mini_voucher_detail_max_benefit_label` | 최대혜택가 | 最大特典価格 | Max benefit price | ราคาพิเศษสูงสุด | 最高優惠價 |
| `mini_voucher_detail_instant_discount` | {0}% 즉시할인 적용 | {0}%即時割引適用 | {0}% instant discount applied | ใช้ส่วนลดทันที {0}% | 已套用 {0}% 即時折扣 |
| `mini_voucher_detail_instant_cashback` | {0}% 즉시 환원 | {0}%即時還元適用 | {0}% instant cashback applied | ใช้เงินคืนทันที {0}% | 已套用 {0}% 即時回饋 |
| `mini_voucher_detail_favorite_toast` | 즐겨찾기 완료! 목록에서 확인해보세요 | お気に入りに追加しました！リストで確認してみてください | Added to favorites! Check your list | เพิ่มในรายการโปรดแล้ว! ดูได้ในรายการ | 已加入我的最愛！前往清單查看 |

→ 최종 **120키**(UIT 82 · LV 38).

### 9-3. 검증

| 파일 | 항목 | 🔴 P0 | 🟡 P1 | 🟢 P2 |
|---|---|---|---|---|
| LV (신규) | 38키 | **0** | 18 | 1 |

**P0 = 0건 유지**. 신규 6키에서 늘어난 P1 10건은 전건 **오탐** — `결제가`(가격 라벨 ↔ 등재 `결제`=행위) · `최대혜택가`(복합 가격 라벨. `혜택가`는 등재 `特別価格` 계열을 따름) · `즐겨찾기 완료!`(토스트 복합어 ↔ 등재 `완료`·`확인`).

1·2·3단계 수동 검토 — 신규 6키 × 5개 언어 30셀 전수 확인. 치환자 `{0}` 5건 보존·증식 0, 줄바꿈 없음, `즐겨찾기`는 등재 `UF_send_select_type_list_favorite`의 `お気に入り / Favorite / 我的最愛 / รายการโปรด` 계열과 일치.

### 9-4. 발견한 원문 문제 2건 (보고만 — 임의 수정하지 않음)

1. **Figma 코멘트 필드명 반전** — `가격 펼치기` 프레임에서 `5% 즉시할인 적용`(-¥173 = 정가의 5%)에 `cashbackrate`가, `10% 즉시 환원`(-¥346 = 정가의 10%)에 `discountrate`가 달려 있다. 금액·배지(`5%` 할인 · 합계 `15%`)는 **할인 5% + 캐시백 10%**가 맞으므로 코멘트 표기 정정이 필요하다.
2. **`mini_home_price_benefit`(혜택가) 사용처 소멸** — 가격 영역 개편으로 `바우처 상세`에서 빠졌고, 현재 위키 Screen 표 어디에도 사용처가 없다. 다른 화면에서 계속 쓰는지 확인이 필요하다(안 쓰면 업로드 대상에서 제외 가능).

> 자동 매칭 교정 1건 — `즐겨찾기` 프레임의 핀을 매처가 배경 텍스트 `올리브영 가맹점 (특수점포 제외)`로 잡았으나, 크롭 육안 확인으로 **토스트 문구**가 대상임을 확인해 바로잡았다.
