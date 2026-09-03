# 게이트 리포트 — 클리닉 상세페이지 개선판 (`(Unifi mini) 상세페이지 - 개선`)

- **작업**: Figma 프레임 `71241:9438` 전체 재검증 → 위키 `4667512757` Screen 신규 행 + 다국어 번역표 반영
- **대상 파일**: `xlt/xlt_output_20260903171314.xlsx` (8키 · 40셀)
- **담당 FE 팀**: **UIT** — 프리픽스 `UF_` · 치환자 `{{0}}` (사용자 확정 2026-09-03). 위키에 UIT/LV 헤딩 구분이 없어 **기존 44행 전수 실측**으로 선례 확인(`UF_clinic_detail_*`·`UF_voucher_*` 일색, 치환자 `{{0}}`)
- **사용자 결정 3건 (2026-09-03)**: ⓐ Screen 표 **새 행 추가**(기존 `(Unifi mini) 상세페이지` 행 보존) ⓑ 캐시백 **8%는 이 프레임만** 적용(위키 Policy·Landpress JSON 미변경) ⓒ 문구 변경 2건은 **기존 키 값 변경** ⓓ `cancel_1~3`·`notice_1~3` **병존 유지**
- **검증 범위**: **전수 점검** — 신규·변경 8키 **40셀 전체 행** 수동 검토 + **기존 번역표 44행 × 5개 언어(220셀) 등재값 재대조**. 신규 키로 한정하지 않았다.

---

## (1a) 한국어 원문 교정

| # | Figma 원문 | 교정 후 (XLT Key 값) | 사유 |
|---|---|---|---|
| 1 | `라인 무료 상담` | **`LINE 무료 상담`** | 브랜드 표기. 등재값 선례 전부 라틴 `LINE`(`UF_clinic_bridge_banner_title` = `LINE 무료 상담 & 캐시백 혜택`). 한글 음차 `라인`은 등재값 0건 |

**alias 기록**: `{Figma: 라인 무료 상담 → XLT: UF_clinic_detail_btn_consult_line = LINE 무료 상담}` — 디자이너에게 원본 수정 요청 대상(아래 (d-2) 1번).

원문 이상문자 점검: 신규·변경 8키 ko_KR 전체에서 nbsp(U+00A0)·제로폭·전각공백 **0건**. 개행(`\n`)은 화면 2행 구조와 일치.

---

## (a) 자동 검증 요약 — `scripts/validate_translation.py`

실행: `TranslationValidator('xlt/xlt_output_20260903171314.xlsx', 'scripts/glossary.json')`

| 심각도 | 건수 |
|---|---|
| 🔴 **P0** | **0건** ✅ |
| 🟡 P1 | 6건 |
| 🟢 P2 | 1건 |

리포트: `xlt/xlt_output_20260903171314_validation_report.md`

---

## (b) 수동 3단계 체크표 — 신규·변경 8키 40셀 전수

### 1단계 (한국어 원문)

| 키 | ko_KR | 판정 |
|---|---|---|
| `UF_clinic_detail_benefit_prefix` | `결제금액의` | ⚠️ 표기 혼재 — 등재값 선례는 `결제금의`(`UF_clinic_bridge_card_cashback`·`_process_step4_desc`). 위키에 이미 P1으로 기재된 기존 인지 사안이라 Figma 표기 유지 |
| `UF_clinic_detail_review_verified` | `영수증 인증` | 정확 |
| `UF_clinic_detail_review_source` | `GuideKim에 등록된 실제 이용자 후기를 바탕으로 제공됩니다.` | 정확 |
| `UF_clinic_detail_tab_faq` | `FAQ` | 정확 (약어) |
| `UF_clinic_detail_location_copy_toast` | `복사되었습니다.` | 정확 — 등재값의 nbsp(`복사되었습니다.\xa0`) 제거 반영 |
| `UF_clinic_detail_btn_consult_line` | `LINE 무료 상담` | 정확 (1a 교정 반영) |
| `UF_voucher_mini_certified` | `LINE 공식 인증 MINI App, Unifi mini` | 정확 (값 변경) |
| `UF_clinic_detail_benefit_sub` | `Unifi mini 즐겨찾기하고 무료 상담과\n캐시백 혜택을 가장 빠르게 만나보세요` | 정확 (값 변경) |

### 2단계 (용어집·등재값 정합)

| 키 | 승계한 등재값 선례 | 판정 |
|---|---|---|
| `_benefit_prefix` | `UF_clinic_bridge_card_cashback` ja `決済金額の…` · zh `消費金額…` · th `…ของยอดชำระ` | 정확 |
| `_review_verified` | 선례 없음(신규 개념) | 정확 |
| `_review_source` | `landpress/cautions_*.json` 「리뷰 관련 내용은 GuideKim에…」 5개 언어 문형 승계 + `실제/実際の/actual/จริง/實際` 반영 | 정확 |
| `_tab_faq` | `UF_settings_main_submenu_helpcenter_faq` 5개 언어 전부 `FAQ` | 정확 |
| `_location_copy_toast` | `UF_asset_token_detail_info_contract_toast` ja `コピーしました。` en `Copied.` th `คัดลอกแล้ว` zh `複製成功` | 정확 |
| `_btn_consult_line` | `UF_clinic_bridge_banner_title` ja `LINE無料相談…` en `Free LINE consultation…` th `ปรึกษาฟรีผ่าน LINE` zh `LINE 免費諮詢…` | 정확 |
| `_mini_certified` | 기존 값의 th 표현 승계 | 정확 |
| `_benefit_sub` | 즐겨찾기 = `UF_send_select_type_list_favorite` ja `お気に入り` en `Favorite` th `รายการโปรด` zh `我的最愛` | 정확 |

### 3단계 (다국어 40셀)

| 키 | ja_JP | en_US | th_TH | zh_TW | 판정 |
|---|---|---|---|---|---|
| `_benefit_prefix` | `決済金額の` | `of your payment` | `ของยอดชำระ` | `消費金額` | ⚠️ **P1(M-1)** — 2행 분리 구조가 en·th 어순을 깨뜨린다(아래) |
| `_review_verified` | `レシート認証済み` | `Receipt verified` | `ยืนยันใบเสร็จแล้ว` | `收據已驗證` | 정확 — ko는 명사 `인증`, 4개 언어는 상태 표현. 배지 관용에 부합 |
| `_review_source` | `GuideKimに登録された実際のユーザーの口コミをもとに提供されます。` | `Provided based on actual user reviews registered on GuideKim.` | `จัดทำขึ้นโดยอ้างอิงจากรีวิวจริงของผู้ใช้ที่ลงทะเบียนไว้บน GuideKim` | `係參考 GuideKim 上登錄的實際使用者評論提供。` | 정확 — zh 번체 정자 확인 |
| `_tab_faq` | `FAQ` | `FAQ` | `FAQ` | `FAQ` | 정확 (등재 선례 일치) |
| `_location_copy_toast` | `コピーしました。` | `Copied.` | `คัดลอกแล้ว` | `複製成功` | 정확 — th 마침표 미사용은 타이어 관용 |
| `_btn_consult_line` | `LINE無料相談` | `Free LINE consultation` | `ปรึกษาฟรีผ่าน LINE` | `LINE 免費諮詢` | 정확 |
| `_mini_certified` | `LINE公式認証のMINI App、Unifi mini` | `Unifi mini, an officially certified LINE MINI App` | `Unifi mini, MINI App ที่ได้รับการรับรองจาก LINE` | `LINE 官方認證的 MINI App，Unifi mini` | 정확 — **en·th는 어순 조정**(한국어는 수식어 선행이나 영어·타이어에서 그 어순은 비문에 가까워 동격 어순 채택). ja `、`·zh `，` 전각 구두점 확인 |
| `_benefit_sub` | `Unifi miniをお気に入りに追加して、無料相談と\nキャッシュバック特典をいち早くご利用ください` | `Add Unifi mini to your favorites for the fastest access\nto free consultations and cashback benefits` | `เพิ่ม Unifi mini ในรายการโปรด เพื่อเข้าถึงการปรึกษาฟรี\nและสิทธิเงินคืนได้เร็วที่สุด` | `將 Unifi mini 加入我的最愛，最快享受免費諮詢\n與現金回饋優惠` | 정확 — 5개 언어 모두 2행 유지, 개행 위치 균형 확인 |

### 기존 번역표 44행 재검증 (전체 파일 대상 — 220셀)

| 결과 | 행수 |
|---|---|
| 등재값과 5개 언어 **완전 일치** | **43행** ✅ |
| 값 상이 | **1행** → `UF_main_faq_title` ja: 위키 `FAQ` ↔ 등재값 `よくある質問` |
| 미등재 | 0행 |

`UF_main_faq_title` ja는 2026-09-01 세션에서 수정 엑셀(`xlt/registry_fix/xlt_fix_main_faq_title_ja_1key_20260901.xlsx`)을 만들어 **업로드 대기** 상태였다. 같은 세션의 7키는 이번 조회에서 **등재 확인**됐으나(`UF_voucher_recommend_price`·`_cashback`·`_origin_price` 모두 v1.7.4에 존재) **이 1키만 미반영**이다 → 아래 (c) M-2.

---

## (c) 자동 검증 각 건 처리 판정

| # | 키 | 검증기 지적 | 처리 판정 | 사유 |
|---|---|---|---|---|
| P1-1 | `_benefit_prefix` | th `결제`→`การชำระเงิน` 권장 | **오탐** | `ของยอดชำระ`는 등재 선례 `เงินคืน {{0}}% ของยอดชำระ`의 어구 승계. `การชำระเงิน`(결제 행위)은 이 명사구 자리에 부적합 |
| P1-2 | `_benefit_prefix` | zh `결제`→`結帳` 권장 | **오탐** | 등재 선례 `消費金額 {{0}}% 現金回饋` 승계. `結帳`은 계산·체크아웃 행위로 문맥 불일치 |
| P1-3 | `_location_copy_toast` | en `복사`→`copy` 권장 | **오탐** | `Copied.`가 `copy`의 과거분사형. 등재값 그대로 |
| P1-4 | `_benefit_sub` | en `혜택`→`perks` 권장 | **오탐** | 동일 오탐이 선례에서 이미 판정됨(guidekim-funnel 게이트). `cashback benefits`가 정본 표현 |
| P1-5 | `_benefit_sub` | th `혜택`→`สิทธิประโยชน์` 권장 | **오탐** | `สิทธิเงินคืน`로 캐시백과 결합. 등재 `UF_clinic_detail_benefit_cashback` th `เงินคืน {{0}}%` 계열 유지 |
| P1-6 | `_tab_faq` | ko 칸에 한글 없이 라틴 문자열 | **오탐** | `FAQ`는 국제 약어. 등재 선례 `UF_settings_main_submenu_helpcenter_faq` 5개 언어 전부 `FAQ` |
| P2-1 | `_review_source` | 마침표 있음(소수 스타일) | **정책 유지** | 문장형이라 마침표가 정상. 같은 성격의 `UF_clinic_detail_notice_*`도 마침표 사용 |
| **M-1** | `_benefit_prefix` | *(수동 발견)* 2행 분리 구조 | **P1 — FE·디자인 결정 필요** | 화면이 `결제금액의` / `8% 캐시백 혜택` 2개 텍스트로 분리돼 있다. **en·th는 후치 수식이라 조합 시 어순이 뒤집힌다**(`of your payment` / `8% cashback`). 등재값은 이미 **단일 키** 방식(`UF_clinic_bridge_card_cashback` = `결제금의 캐시백 {{0}}%`)이므로 **단일 키 병합을 권장**. 결정 전까지 조각 번역으로 둔다 |
| **M-2** | `UF_main_faq_title` | *(수동 발견)* ja 등재값 ↔ 위키 상이 | **P1 — 사용자 업로드 필요** | 위키는 `FAQ`, 등재값은 `よくある質問`. 2026-09-01 수정 엑셀이 업로드되지 않았다. 같은 배치의 7키는 반영됨 |
| **M-3** | `_btn_consult_line` | *(수동 발견)* Figma 원문 `라인` | **실제 위반 → 수정** | (1a) 참조. `LINE`으로 교정 후 alias 기록 |

**통과 판정: P0 = 0건 (자동 + 수동 모두)** → 산출물 진행 가능.

---

## (d) 추가 개선·제안 (권장 — 임의 적용 안 함)

> ⚠️ **종결 목록 대조 완료**. 이 프로젝트에서 **사용자 결정으로 종결된 항목은 재제안하지 않았다** — Figma 원문 수정 요청 8건(구분자 `･`→`·` 5건 · `무료 LINE상담` 띄어쓰기 · `change_cancel` 문체·마침표 2건), 등재값 U+FF65 4건, 리뷰 본문 UGC, 상품·더미 데이터, 어노테이션 핀 색상, 법무 체크 섹션 서식. 이번 프레임에도 `성형･피부`·`포텐자･리쥬란`·`쥬베룩 스킨･볼륨`·`피부결･탄력`·`모공･피부결`·`무료 LINE상담`이 그대로 있으나 **종결 사안이므로 목록에서 제외**했다.

### (d-1) 용어집 보완 권장

검증기가 `혜택`→`perks`(en) · `결제`→`結帳`(zh)/`การชำระเงิน`(th)를 **반복 오탐**했다 — 용어집 매핑이 좁다는 신호다. 다만 **권장 표기 값은 추측하지 않는다**: 실사용 건수를 `fetch_xlt_registry.py`로 실측한 뒤 제안해야 하며, 이번 작업에서는 8키 범위가 좁아 실측 표본이 부족하다. **별도 용어집 검증 작업으로 이월**을 권장한다(`md/xlt-verify.md`).

### (d-2) 디자이너·기획 확인 요청 (신규 항목만)

| # | 항목 | 내용 |
|---|---|---|
| 1 | **`라인 무료 상담` 표기** | `LINE 무료 상담`으로 원본 수정 요청. 같은 프레임에 `무료 LINE상담`(y511)도 있어 브랜드 위치가 갈린다 |
| 2 | **`FAQ` 탭 앵커링 대상 확인** | 코멘트가 FAQ 탭(x305)에 「선택 시 **리뷰 영역**으로 앵커링」, 이용안내 탭(x189)에 「**상담 및 시술과정** 영역으로 앵커링」이라고 달려 있다. FAQ 탭이 리뷰로 이동하는 것이 의도인지 확인 필요 |
| 3 | **캐시백률 8% ↔ 20% 공존** | 같은 프레임에 `8% 캐시백 혜택`·`캐시백 8% 받기`·`결제금의 8%`와 `캐시백 20%` 배지(y2649 FAQ 영역 · y4115 비슷한 병원 영역)가 함께 있다. 배지가 병원별 변수값이면 문제없으나 y2649 위치는 확인 필요 |
| 4 | **`다이소 5만원권` 상품 부재** | 프레임 바우처 카드가 `다이소 5만원권`인데 상품 API에 미등록(다이소는 3만·1만·3천원권만). 실제는 **3만원권**으로 확정됨(2026-09-03) → 프레임 제목·이미지 교체 필요 |
| 5 | **올리브영 카드 이미지 ↔ 제목 불일치** | 좌상단 제목 `올리브영 5만원권`에 1만원권 아트, 우상단 제목이 `올리브영 3만원권`으로 교정 필요(구 `1만원권`) |
| 6 | **`UF_clinic_detail_tab_faq` vs 기존 키 재사용** | 등재 `UF_settings_main_submenu_helpcenter_faq`가 5개 언어 전부 `FAQ`로 값이 같다. 신규 키를 만든 이유는 **탭 3형제 네임스페이스 일관성**(`_tab_info`·`_tab_guide`·`_tab_faq`)이다. 중복 관리를 피하려면 기존 키 재사용도 가능 — 사용자 결정 사안 |
| 7 | **`benefit_prefix` 단일 키 병합** | (c) M-1 참조. 다국어 어순 문제의 근본 해결책 |

### (d-3) 구조 관찰 (참고)

- 이 프레임은 **LPC(Landpress) 이관이 더 진행됐다** — 코멘트 `LPC 관리`가 6영역(공식홈페이지 URL · 대표시술 · 상담·시술과정 · FAQ · 변경및취소 · 함께구매바우처)에 달려 있다. `landpress/` 24파일이 그 정본이다.
- 사용자 결정에 따라 `UF_clinic_detail_cancel_1~3`·`notice_1~3` 6키는 **위키에 병존 유지**한다. **FE에 어느 쪽을 읽는지 명시**해야 한다 — 안 그러면 한쪽만 바뀌었을 때 화면이 갈린다.
- `landpress/process_*.json`·`faq_*.json`이 여전히 **캐시백 15%** 리터럴이다. 사용자 결정(「8%는 이 프레임만」)에 따라 이번에는 손대지 않았다 — 8%가 정식 확정되면 **2종 × 5개 언어** 갱신이 필요하다.
