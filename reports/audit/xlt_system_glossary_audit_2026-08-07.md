# XLT 시스템 전체 ↔ 용어집 대조 감사 리포트

| 항목 | 값 |
|---|---|
| 일자 | 2026-08-07 |
| 대상 | XLT 시스템 **전 서비스 3종** (읽기 API 조달) |
| 용어집 | **v4.5** (115 terms · exceptions 9 · deprecated_terms 13) |
| 방법 | `fetch_xlt_registry.py` → `verify_xlt_glossary.py`(= `validate_translation.py` 3단계) + 키 이름 전수 점검 |
| 절차 정본 | `md/xlt-verify.md` |
| 성격 | **읽기 전용 감사.** 시스템을 변경하지 않았다. 조치는 사용자 판단 후 업로드 |

| 서비스 | 버전 | 키 | P0 | P1 | P2 |
|---|---|---|---|---|---|
| `Dapp Portal` | v2.6.0 | 1,596 | 22 | 1,655 | 313 |
| `Unifi` | v1.6.6 | 2,130 | 82 | 2,107 | 457 |
| `Kaia Wallet` | v1.4.3 | 366 | 17 | 411 | 70 |

> ⚠️ **자동 등급을 그대로 읽지 말 것.** 전수 스윕은 캠페인 게이트와 모집단이 달라 오탐 비중이 크다. 아래는 **전건을 사람이 판정한 결과**다. P1 `용어 불일치` 3,954건과 P2 `마침표` 840건은 §5에서 오탐으로 판정했다.

---

## Executive Summary

| 구분 | 건수 | 성격 |
|---|---|---|
| **§1 확정 위반 — 즉시 조치** | **키 5 + 문자 오염 64 + 빈 값 1** | 이견 없이 잘못된 값 |
| **§2 구 표기 자동 치환 제안** | **49** | 용어집 `deprecated_terms` 기반, 치환문 생성 완료 |
| **§3 확인 필요** | **9** | 정책·의도 판단이 필요 |
| **§4 한국어 원문 오류** | **13** | 맞춤법 2 · 띄어쓰기 11 |
| **§4-2 언어 컬럼 교차 오염** | **확정 1 + 후보 110** | 검증기 **사각지대 보완 스캔**으로 신규 발견 |
| **§5 오탐** | **4,970** | 판정 근거 명시 |

**가장 시급한 3건**은 §1-A의 **키 이름 손상**이다. 키 이름 자체가 깨져 있어 FE가 정상 키명으로는 값을 가져올 수 없다. 번역 품질 문제가 아니라 **동작 문제**다.

**§4-2는 이번 감사에서 추가된 절**이다. 자동 검증기의 언어 혼입 검사는 **문자체계 기반**이라 20개 교차 조합 중 15개만 잡는다. 못 잡는 3종(ja↔zh 한자 공유 · 라틴 전면 허용 · ko 부분 영어)을 **내용 기반 교차 검사**로 보완했고, 그 결과 **ja 칸에 중국어가 들어간 P0 1건**과 **번역 누락 후보 110건**이 새로 나왔다.

---

## §1. 확정 위반 — 즉시 조치

### 1-A. 키 이름 손상 3건 🔴 최우선

키 이름에 보이지 않는 문자가 섞여 있거나 오타가 있다. **문구 검증으로는 절대 발견되지 않는 부류**이며, 이번에 키 이름 전수 점검을 돌려 나왔다.

| # | 서비스 | 키 이름(실제) | 문제 |
|---|---|---|---|
| 1 | `Dapp Portal` | `"\xa0UF_home_jpyc_home_banner2"` | **앞에 nbsp(U+00A0)가 붙어 있다.** `Unifi`에는 정상 `UF_home_jpyc_home_banner2`가 같은 값(`매일 최대 10개의 JPYC 럭키볼 받기`)으로 있다 → **Dapp Portal 쪽 키명이 깨진 것** |
| 2 | `Kaia Wallet` | `"payment_history_\x08paymentstatus_title"` | **키 이름에 제어문자 U+0008(BACKSPACE)** |
| 3 | `Kaia Wallet` | `"payment_history_?paymentstatus_title"` | 키 이름에 `?` |

**2·3은 추가로 값까지 깨져 있다.** 정상 키가 별도로 존재하며 두 파손 키는 **ko_KR ↔ en_US가 서로 뒤바뀌어 있다**:

| 키 | ko_KR | en_US |
|---|---|---|
| `payment_history_paymentstatus_title` (정상) | `결제 상태` | `Payment Status` |
| `payment_history_\x08paymentstatus_title` | **`Payment Status`** | **`결제 상태`** |
| `payment_history_?paymentstatus_title` | **`Payment Status`** | **`결제 상태`** |

→ **권고**: 2·3은 정상 키가 있으므로 **삭제 대상**. 1은 nbsp를 제거해 재등록(값은 그대로).
→ ⚠️ 삭제 전 FE에 **참조 여부 확인 필수**(`md/translate.md` 키 거버넌스 — 키는 FE 전달 후 임의 삭제 금지).

### 1-B. 컬럼 어긋남 / 언어 오배치 2건 🔴

| 서비스 | 키 | 문제 |
|---|---|---|
| `Dapp Portal` | `Minidapp_connect_signing_title` | **zh_TW 칸에 태국어가 그대로 복사**됨 — th_TH와 완전히 동일한 문자열. zh 번역이 아예 없다 |

```
ko_KR  지금 Unifi 시작하고 \n매일 이자 받으세요
th_TH  ริ่มต้นกับ Unifi วันนี้\nและรับดอกเบี้ยได้ทุกวัน
zh_TW  ริ่มต้นกับ Unifi วันนี้\nและรับดอกเบี้ยได้ทุกวัน   ← 태국어
```

> **덤으로 th_TH 자체도 오타다** — `เริ่มต้น`(시작하다)의 첫 글자 `เ`가 빠진 `ริ่มต้น`. 두 언어를 함께 고쳐야 한다.

`payment_history_*` 2건은 1-A에 포함(같은 원인).

### 1-C. 문자 오염 64건 🔴

**① 비표준 공백 nbsp(U+00A0) 63키** — 사람 눈에 일반 공백과 구분되지 않아 줄바꿈·검색·비교가 깨진다. 전건 실제 위반이다.

| 서비스 | 건수 | 키 |
|---|---|---|
| `Dapp Portal` | 15 | `Minidapp_connect_unifi_transition_title`, `UF_dm_dc_desc_MINI`, `drops_complete_desc`, `drops_failed_desc`, `my_mynfts_inactive_guide_desc`, `oa_promotion2_cautions_contents3`, `oa_promotion3_cautions_contents11`, `oa_promotion_popup_country`, `oa_promotion_result_oa_btn`, `oa_promotion_wallet_hook`, `unifi_promotion_caution_contents2`, `unifi_promotion_caution_contents5`, `unifi_promotion_caution_contents8`, `unifi_promotion_caution_contents9`, `wallet_password_notice_popup_desc` |
| `Unifi` | 48 | `UF_asset_external_change_error1·2`, `UF_asset_external_connect_error1·2`, `UF_asset_external_disconnect_error1`, `UF_asset_token_detail_info_contract_toast`, `UF_asset_token_info_desc2`, `UF_boost_notice_payout_schedule`, `UF_boost_return_complete_desc`, `UF_boost_staking_withdraw_confirm_desc`, `UF_common_sanction_desc`, `UF_guide_deposit_desc`, `UF_guide_jpyc_with_banks_title`, `UF_guide_title`, `UF_interest_guide_desc`, `UF_interest_guide_title`, `UF_interest_main_accumulated_reward_guide`, `UF_interest_reward_history_empty_title2`, `UF_interest_reward_history_external_wallet`, `UF_jpyc_promotion_interest_banner_btn1`, `UF_main_idrp_guide_title`, `UF_main_kaia_boost_active_vip`, `UF_promotion_banner_title_wallet`, `UF_send_guide_other_step1~4_desc`(5), `UF_send_guide_usdt_step1·2_desc`, `UF_settings_account_email_desc`, `UF_settings_account_email_error7`, `UF_settings_account_email_result`, `UF_settings_account_passcode_check_desc·title`, `UF_settings_account_passcode_fail·success_toast`, `UF_settings_top_nickname_desc`, `UF_settings_top_nickname_error4`, `UF_settings_wallet_privatekey_bottom_desc`, `UF_settings_wallet_privatekey_toast`, `UF_simulation_guide_btn`, `UF_simulation_interest_after2y`, `UF_simulation_select_price_before_btn`, `UF_simulation_title_total`, `UF_swap_guide_empty`, `UF_swap_guide_list_desc`, `UF_usdt_boost_condition_applied` |
| `Kaia Wallet` | 0 | — |

**② 한국어 조사가 중국어에 박힘 1건**

| 서비스 | 키 | 값 |
|---|---|---|
| `Dapp Portal` | `unifi_promotion_jpyc_caution_contents9` | zh_TW: `本活動於準備**의**獎勵發放完畢時…` ← 한글 `의` |

### 1-D. 빈 값 1건 🔴

| 서비스 | 키 | 문제 |
|---|---|---|
| `Unifi` | `app_detail_receive_done` | **en_US가 빈 문자열** |

---

## §2. 구 표기 자동 치환 제안 49건

용어집 `deprecated_terms`의 `pattern → recommend`로 **치환문이 생성돼 있다**(`reports/xlt/xlt_fix_proposals_*.json`).

| 서비스 | 언어 | 규칙 | 건수 |
|---|---|---|---|
| `Dapp Portal` | ko_KR | `월렛` → `지갑` | **13** |
| `Dapp Portal` | zh_TW | `關注` → `加入好友` | 6 |
| `Dapp Portal` | ko_KR | `공식계정` → `공식 계정` | 5 |
| `Dapp Portal` | ja_JP | `友達` → `友だち` | 4 |
| `Dapp Portal` | zh_TW | `追蹤` → `加入好友` | 3 |
| `Dapp Portal` | th_TH | `ติดตาม` → `เพิ่มเพื่อน` | 3 |
| `Dapp Portal` | ko_KR | `팔로우` → `Unifi LINE 공식 계정 친구 추가` | 2 |
| `Dapp Portal` | ja_JP | `フォロー` → `友だち追加` | 2 |
| `Dapp Portal` | en_US | `follow` → `add as a friend` | 1 |
| `Unifi` | ja_JP | `友達` → `友だち` | 2 |
| `Unifi` | zh_TW | `關注` → `加入好友` | 8 |
| `Kaia Wallet` | — | — | 0 |
| | | **합계** | **49** |

> **HANDOFF P1 「구 표기 17키 정리」의 실제 규모는 49건**이다. 기존 집계는 `Dapp Portal` 일부만 본 것이고, `Unifi` 10건이 누락돼 있었다.

### ⚠️ 기계 치환은 그대로 쓰면 안 된다

`pattern → recommend`는 단순 문자열 치환이라 **문맥에서 어색해진다.** 실측:

| 키 | before | after (기계) |
|---|---|---|
| `unifi_promotion_jpyc_caution_contents7` | `…須保持**關注**至最終獎勵發放日，若中途解除，不論後續是否重新**關注**…` | `…須保持**加入好友**至…是否重新**加入好友**…` |

`保持關注`(관심을 유지하다)의 자리에 명사구 `加入好友`(친구 추가)가 들어가 문법이 깨진다. **zh_TW 8건은 원어민 검토 후 `after`를 손으로 고쳐야 한다.**

---

## §3. 확인 필요 9건 (정책·의도 판단)

| # | 서비스 | 키 | 사안 |
|---|---|---|---|
| 1 | `Kaia Wallet` | `payment_bridge_jp_tos_title`·`_subtitle`·`_submit` | **5개 언어 전부 일본어.** `特定商取引法に基づく表示`(일본 특정상거래법 표시)로 **JP 전용 법정 고지**라 의도된 것일 수 있다. 다만 `続き`(다음) 버튼까지 전 언어 일본어인 건 과해 보인다 → **법무·기획 확인** |
| 2 | `Dapp Portal` | `UF_reward_history_user` | th가 USDT를 **`ดอลลาร์สหรัฐฯ`(미국 달러)** 로 번역. 스테이블코인 ≠ USD이고 용어집 예외(원어 유지) 위반 → **수정 권장** |
| 3 | `Unifi` | `UF_reward_history_user` | 위와 동일(같은 키가 두 서비스에 존재) |
| 4 | `Unifi` | `UF_common_error_404_desc` | zh_TW가 `URL` → **`網址`**. 중국어로는 자연스럽지만 용어집 예외는 `URL` 원어 유지 → **정책 판단** |
| 5 | `Unifi` | `UF_exchange_guide_subtitle` | ko `USDT 토큰 거래 가능 거래소` ↔ en **`Transfer to Exchange`**. USDT 누락이 아니라 **의미가 다른 문장** |
| 6 | `Unifi` | `UF_main_jpyc_guide_banner_title` | ko `JPYC 알아보기` ↔ en `Learn More`(JPYC 누락). 버튼 의역으로 볼 수 있음 |
| 7 | `Dapp Portal` | `oa_promotion_motion_title` | ja에 USDT 누락 |
| 8 | `Dapp Portal` | `oa_promotion_popup_budget` | th에 USDT 누락 |
| 9 | `Dapp Portal`·`Unifi` | `unifi_promotion_jpyc_bonus_desc` | ja가 `ラッキーボール`로 **JPYC 누락**(ko·en·th·zh는 유지). §4에도 별건으로 걸림 |

### 부수 — placeholder 불일치 2건 (`Unifi`, P1이지만 런타임 영향)

| 키 | 문제 |
|---|---|
| `UF_boost_round_join_scheduled` | ko `{{0}} - {{1}}` ↔ zh_TW **`{{0}} - {{3}}`**. `{{3}}`은 존재하지 않는 인덱스 → **zh에서 변수가 안 채워진다** |
| `app_detail_dm_count` | 다른 언어엔 `{{1}}`·`{{2}}`가 있는데 **zh_TW엔 placeholder가 없다** → 수치 누락 |

---

## §4. 한국어 원문 오류 13건

### 맞춤법 2건 — `되요` → `돼요`

| 서비스 | 키 | 값 |
|---|---|---|
| `Dapp Portal` | `unifi_promotion_jpyc_bonus_desc` | `보유금 유지시 매일 {0}개씩 JPYC 럭키볼이 지급**되요**.` |
| `Unifi` | `UF_simulation_guide_interest_title` | `이율은 이렇게 적용**되요**!` |

> **형제 키와 어긋난다** — `unifi_promotion_jpyc_gold_desc`는 같은 문형에서 `지급**돼요**`로 정상이다. 같은 화면에서 두 표기가 공존한다.

### 띄어쓰기 11건 — 의존명사 `시`·`할 수`

| 서비스 | 키 | 값 |
|---|---|---|
| `Dapp Portal` | `unifi_promotion_jpyc_bonus_desc` | `보유금 유지**시**` |
| `Dapp Portal` | `unifi_promotion_jpyc_gold_desc` | `보유금 유지**시**` |
| `Dapp Portal` | `usdt_send_guide_title` | `전송**시** 주의사항` |
| `Dapp Portal` | `my_mynfts_inactive_guide_popup_desc7` | `• 취소**시**에는 가스 요금이 필요합니다.` |
| `Dapp Portal` | `itemdetail_onsale_caution_desc` | `구매하시는 …` (본문 내 `시` 붙임) |
| `Dapp Portal` | `market_drops_caution_desc` | 〃 |
| `Unifi` | `UF_send_usdt_send_guide_title` | `전송**시** 주의사항` |
| `Unifi` | `UF_bridge_network_detail_info3` | `다른 자산 전송**시** 복구가 어려울 수…` |
| `Unifi` | `UF_guide_wallet_card3_desc` | `가입**시** 내가 설정한 복구 비밀번호…` |
| `Unifi` | `UF_signin_password_reset_alert_desc` | `모두 **새지갑**으로 이전되며, … **더이상** 사용이…` |
| `Kaia Wallet` | `usdt_send_guide_title` · `web_send_passcode_secret_logout` | `전송**시**` · `입력 실패**시**` |

---

## §4-2. 언어 컬럼 교차 오염 — 탐지 범위와 사각지대

> **질문**: "TW 칸에 TH가 들어간 경우도 탐지하는가?" → **탐지한다.** §1-B의 `Minidapp_connect_signing_title`이 정확히 그 케이스로 잡혔다. 다만 **모든 조합을 잡는 것은 아니다.** 아래는 실측 매트릭스다.

### 4-2-1. 탐지 매트릭스 (실측)

검증기의 `TranslationValidator.foreign_script_issues()`는 **문자체계(script) 기반**이다. 각 언어 칸에 올 수 없는 문자체계가 있으면 P0 `언어 혼입`으로 잡는다.

**행 = 오염된 컬럼 / 열 = 그 칸에 잘못 들어간 언어**

| ↓칸 \ 들어간→ | ko | ja | en | th | zh |
|---|---|---|---|---|---|
| **ko_KR** | — | ✅ | ⚠️ P1 | ✅ | ✅ |
| **ja_JP** | ✅ | — | ❌ | ✅ | **❌** |
| **en_US** | ✅ | ✅ | — | ✅ | ✅ |
| **th_TH** | ✅ | ✅ | ❌ | — | ✅ |
| **zh_TW** | ✅ | ✅ | ❌ | ✅ | — |

✅ 탐지(P0) · ⚠️ 부분 탐지(P1 `언어 의심` — 칸 전체가 한글 없는 라틴일 때만) · ❌ 미탐지

**20개 조합 중 15개 탐지.** 사용자가 물은 **th → zh_TW는 ✅**이고, 한글·가나·태국 문자가 낀 조합은 모두 잡는다.

### 4-2-2. 사각지대 3종 (구조적 한계)

| # | 사각지대 | 원인 | 결과 |
|---|---|---|---|
| **①** | **ja ↔ zh 한자 상호 오염** | `ja_JP`은 `cjk`를, `zh_TW`은 `cjk`를 각각 정상으로 본다(두 언어가 한자를 공유하므로 필연) | **가나가 없는 일본어**가 zh 칸에, **중국어**가 ja 칸에 들어가도 미탐지 |
| **②** | **영어가 ko/ja/th/zh 칸에** | 라틴·숫자·기호는 **모든 칸에서 허용**(브랜드 `Unifi`·심볼 `USDT`·치환자 `{{0}}` 때문) | 미번역 영어가 그대로 남아도 미탐지 |
| **③** | ko 칸의 부분 영어 | ②의 특례로 "한글 없이 라틴만"이면 P1로 잡지만, **한글과 영어가 섞이면** 미탐지 | `나 (Me)` 같은 정상 케이스와 구분 불가 |

실측 확인:
```
zh_TW 칸에 '確認'(한자만 일본어)        → ❌ 미탐지
ja_JP 칸에 '無法找到您請求的頁面。'(중국어) → ❌ 미탐지
```

### 4-2-3. 사각지대 보완 스캔 — 이번 감사에서 추가 실행

스크립트 검사로는 안 잡히므로 **내용 기반 교차 검사** 2종을 별도로 돌렸다.

#### (A) 서로 다른 언어 컬럼이 완전히 동일한 셀 — 72건

| 서비스 | 건수 | 판정 |
|---|---|---|
| `Dapp Portal` | 3 | `Minidapp_connect_signing_title`(§1-B 확정) + `NFT {0}個` 2건(우연 일치) |
| `Unifi` | 49 | 아래 판정 |
| `Kaia Wallet` | 20 | `payment_bridge_jp_tos_*` 3키의 조합(§3-1과 동일 건) |

**ja_JP == zh_TW 동일 셀은 대부분 정당한 우연 일치다.** `約 {{0}}` · `{{0}}個` · `利率 {{0}}` · `通知` · `進行中` · `通知設定`처럼 짧은 한자 표기는 일본어와 번체 중국어에서 실제로 같다. CJK 4자 이하는 우연 일치로 판정했다(`Dapp Portal` 44건 · `Unifi` 67건).

**🔴 그중 1건이 진짜 오염이었다 — 사각지대 ①의 실제 사례:**

| 서비스 | 키 | 문제 |
|---|---|---|
| `Unifi` | `UF_promotion3_detail_caution_desc3` | **ja_JP 칸에 번체 중국어**가 들어가 있다 |

```
ko_KR  리워드는 KAIA로 일괄 지급
ja_JP  獎勵將以 KAIA 統一發放     ← 중국어 (일본어라면 「リワードはKAIAで一括支給」)
en_US  Rewards paid in KAIA
th_TH  จ่ายรางวัลเป็น KAIA ทั้งหมด
zh_TW  獎勵將以 KAIA 統一發放
```

`獎勵`·`發放`은 번체 중국어 어휘로 일본어에서는 쓰지 않는다. **형제 키 `UF_promotion3_detail_caution_desc1`은 ja가 정상 일본어**(`イベント参加後30日間…支給されます。`)여서 대비가 분명하다. → **§1-B에 준하는 P0**이며, 기존 P0 목록에 없던 **신규 발견**이다.

#### (B) 일부 언어만 고유 문자가 없는 셀 = 번역 누락 의심 — 110건

사각지대 ②를 보완한다. **5개 언어 전부 영어인 키는 의도된 미번역 UI 라벨**(`Contract`·`Token Name`·`Balance`·`Powered by Kaia Wallet` 등 151키)이므로 제외하고, **일부 언어만 영어인 것**만 남겼다.

| 서비스 | 키 | 미번역 언어 분포 |
|---|---|---|
| `Dapp Portal` | 59 | ja 36 · th 23 · zh 14 · ko 5 |
| `Unifi` | 17 | ko 10 · ja 10 · zh 9 · th 6 |
| `Kaia Wallet` | 34 | th 30 · ja 29 · zh 29 · ko 7 |
| **합계** | **110** | ja 75 · th 59 · zh 52 · ko 22 |

**대표 사례:**

| 서비스 | 키 | 내용 |
|---|---|---|
| `Dapp Portal` | `UF_home_banner_issue` | ko·ja·zh는 번역, **th만 `You didn't finish the lucky draw.`** |
| `Dapp Portal` | `UF_home_banner_jackpot` | **th만 `{0} received {1} USDT!`** |
| `Dapp Portal` | `UF_floating_banner_desc` | **th만 `Sign up now and claim {0}USDT`** |
| `Dapp Portal`·`Unifi` | `UF_common_footer_tos_aggregator` | ko `어그리게이터`, **ja·th·zh 전부 `Aggregator`** |
| `Kaia Wallet` | `wallet_message_sign_desc`·`_cofirm_btn`·`_reject_btn`·`_subtitle_domain`·`_subtitle_msg` | **ko만 번역되고 ja·th·zh는 영어**(`Approve`·`Reject`·`Domain`·`Message`) — 서명 승인 화면 전체 |
| `Unifi` | `UF_send_wallet_list_kaia`·`_okx`·`_bitget` | ja `ウォレット`·zh `錢包`로 번역했는데 **ko만 `Kaia Wallet`** — 브랜드 취급 여부 판단 필요 |
| `Unifi` | `UF_btn_ok` | ja만 `OK` — 일본 UI 관행상 의도일 수 있음 |

> ⚠️ **이 스캔은 방향을 판정하지 않는다.** `UF_reward_history_user`·`UF_dm_reward_amount`는 "ko·ja·zh 미번역"으로 걸리지만 실제로는 **th가 USDT를 `ดอลลาร์สหรัฐฯ`로 과잉 번역한 것**(§3-2·3-3)이다. 110건은 **후보 목록**이고 건별 판단이 필요하다.

### 4-2-4. 권고 — 검증기 보완

| 보완 | 방법 | 효과 |
|---|---|---|
| 사각지대 ① | **ja_JP == zh_TW 동일 셀 검사** 추가 + CJK 길이 임계값(5자 이상)으로 우연 일치 배제 | `UF_promotion3_detail_caution_desc3` 부류를 잡는다. 실측 오탐 0 |
| 사각지대 ② | **"일부 언어만 고유 문자 없음"** 검사 추가(5/5 라틴은 제외) | 번역 누락 110건을 상시 검출 |
| 공통 | 두 검사는 **P1(검토 필요)로 두는 것이 안전**하다 | 방향 판정이 필요해 P0으로 올리면 오탐이 게이트를 막는다 |

두 검사 모두 `validate_translation.py`의 행 단위 검사로 구현 가능하며, **엑셀 기반 캠페인 게이트에도 그대로 적용**된다(등록값 전수 스윕 전용이 아니다). 단, 기존 게이트 리포트의 P1 기준선이 바뀌므로 **A/B 실측 후 채택**해야 한다(이 저장소의 용어집·검증기 변경 관행).

---

## §5. 오탐 판정 (조치 불필요)

| 유형 | 건수 | 판정 근거 |
|---|---|---|
| **P1 `용어 불일치`** | **3,954** | 검증기가 ko에 등재 용어가 있으면 다른 언어에도 등재 번역이 **문자열로** 있어야 한다고 본다. 전수 모집단에서는 정상 의역이 대량으로 걸린다. **등급이 아니라 용어집 매핑이 좁다는 신호** → §6 |
| **P2 `마침표 스타일`** | **840** | "문장형 중 소수 스타일"을 찾는 방식이라 모집단이 커지면 의미를 잃는다. 캠페인 단위에서만 유효 |
| **P1 `언어 의심`** | **153** | ko 칸에 한글 없이 라틴 문자열 — 대부분 브랜드·토큰 심볼(`USDT`, `Unifi`) |
| **P0 `언어 혼입` — 언어 선택 라벨** | 13 | `UF_settings_display_language_ko/ja/th/cn`·`_currency_thb`는 **5개 언어 전부 자기 언어 표기**(`한국어`·`日本語`·`ภาษาไทย`·`中文(繁體)`·`THB (฿)`)로 **의도된 값**이다. 언어 선택기는 어느 로케일에서든 각 언어를 그 언어로 보여준다 |
| **P0 `언어 혼입` — zh_TW `・`** | 10 | 구분자 `・`(U+30FB)가 검증기의 가나 범위에 걸린다. 중국어에서 정상 사용 → **검증기 한계**, §6-2 |
| | **합계 4,970** | 그중 §3으로 승격한 건 제외 |

---

## §6. 용어집·검증기 보완 권장 (사용자 결정 사안)

### 6-1. 용어집 `확인` 다의어 분리

`확인` → th `ตรวจสอบ`(inspect/verify) 단일 매핑이라, **"둘러보다" 문맥**의 정상 번역 `ดู`(view)가 오탐된다. en `check`·zh `查看`(view)는 이미 문맥을 커버한다.

> 실측: `mini_luckyball_missions_promo` — ko `미션을 확인하고`, th `ดูภารกิจ`(정상) → P1 오탐

### 6-2. 구분자 `・`(U+30FB) 처리

zh_TW 정상 사용인데 검증기가 가나로 잡는다. **둘 중 하나**:
- ⓐ `validate_translation.FOREIGN_SCRIPTS`의 kana 판정에서 U+30FB 제외 (검증기 수정)
- ⓑ 용어집 `exceptions`에 등재

HANDOFF의 **「구분자 `･`/`・` 표기 통일」 미결 정책**과 함께 결정하는 것이 좋다.

### 6-3. 언어 컬럼 교차 오염 검사 보완

§4-2-4 참조 — ⓐ `ja_JP == zh_TW` 동일 셀 검사(CJK 5자 이상), ⓑ "일부 언어만 고유 문자 없음" 검사. 둘 다 P1로 추가하고 A/B 실측 후 채택.

### 6-4. 키 이름 검사를 상시화

이번에 §1-A 3건은 **키 이름 전수 점검을 따로 돌려서** 나왔다. 문구 검증은 키 이름을 보지 않는다. `verify_xlt_glossary.py`에 키 이름 검사(제어문자·비ASCII·앞뒤 공백)를 넣을지 결정 필요.

---

## §7. 부수 발견 (조치 아님 — 기록용)

### 7-1. 서비스 간 값 분기 — 공통 336키 중 152키(45%)

`Unifi`(2,130키) ∩ `Dapp Portal`(1,596키) = 336키, 그중 **152키가 값이 다르다**. 두 서비스가 **서로의 키를 구값 사본으로 보유**한다.

```
갈리는 키 프리픽스:  UF_ 88 · unifi_ 44 · app_ 7 · ms_ 6 · mini_ 4 · 기타 3
```

`UF_`(UIT)의 정본은 `Unifi`이며 거기서는 `{{0}}`(279키)로 `CLAUDE.md` 규칙과 일치한다. `Dapp Portal`의 `UF_` 사본이 `{0}`이고, **이것이 세션 #16 「UIT 치환자 불일치」의 원인**이었다 — 문서 규칙이 아니라 조회 대상이 틀렸다.

### 7-2. 언어별 키셋 불일치 — `Kaia Wallet`

| 언어 | 키 수 | 없는 키 |
|---|---|---|
| en_US | 366 | — |
| ko_KR · th_TH · zh_TW | 365 | `main_removetoken_toast_title.one` |
| ja_JP | 364 | 위 + `Minidapp_connect_unifi_transition_benefit1_desc` |

`.one`은 plural 형태라 en 전용이 정상일 수 있으나, **ja의 `Minidapp_connect_unifi_transition_benefit1_desc` 누락은 번역 미등록**으로 보인다.

### 7-3. 등록값은 세션 중에도 바뀐다

이 감사 도중 **`UF_floating_jpyc_banner_title`이 `Unifi`에서 삭제**됐다(2,131 → 2,130키, 약 1시간 간격 두 조회의 차이). **캐시 금지 규칙**이 왜 필요한지의 실증이며, 제안 적용 시 `--apply`의 무결성 가드(`before` 대조)가 이 상황을 막는다.

---

## §8. 재현

```bash
python3 scripts/fetch_glossary.py scripts/glossary.json
for S in "Dapp Portal" "Unifi" "Kaia Wallet"; do
  F="/tmp/reg_$(echo $S | tr -d ' ').json"
  python3 scripts/fetch_xlt_registry.py --service "$S" --output "$F"
  python3 scripts/verify_xlt_glossary.py --registry "$F"
done
```

산출물은 `reports/xlt/`에 서비스·버전·날짜별로 생성된다(git 미추적). 승인된 제안은 다음으로 업로드용 엑셀이 된다:

```bash
python3 scripts/verify_xlt_glossary.py --registry <레지스트리> --apply <제안.json>
```

**업로드는 사용자가 수행한다 — 쓰기 API는 없다.**

### 8-1. §4-2 사각지대 보완 스캔 재현

검증기에 없는 검사이므로 별도 스크립트로 돌렸다. 채택 시 `validate_translation.py`로 옮긴다(§6-3).

```python
import json, re, itertools
L = ['ko_KR','ja_JP','en_US','th_TH','zh_TW']
CJK = re.compile(r'[㐀-䶿一-鿿]')
NATIVE = {'ko_KR': r'[가-힣]', 'ja_JP': r'[぀-ヿ㐀-䶿一-鿿]',
          'th_TH': r'[฀-๿]',  'zh_TW': r'[㐀-䶿一-鿿]'}
E = json.load(open('scripts/xlt_registry.json'))['entries']

# (A) ja==zh 동일 셀 — CJK 5자 이상만 (짧은 한자 표기는 정당한 우연 일치)
for k, r in E.items():
    if r['ja_JP'] and r['ja_JP'] == r['zh_TW'] and len(CJK.findall(r['ja_JP'])) >= 5:
        print('ja==zh', k, repr(r['ja_JP']))

# (B) 일부 언어만 고유 문자 없음 = 번역 누락 후보 (4개 전부면 의도된 영어 라벨)
for k, r in E.items():
    miss = [l for l, p in NATIVE.items() if (r.get(l) or '').strip() and not re.search(p, r[l])]
    if 0 < len(miss) < 4:
        print('미번역 후보', k, miss)

# (C) 키 이름 이상 (§1-A) — 제어문자·비ASCII·공백
import unicodedata
for k in E:
    if any(unicodedata.category(c) == 'Cc' or ord(c) > 127 for c in k) or k != k.strip():
        print('키 이름 이상', repr(k))
```
