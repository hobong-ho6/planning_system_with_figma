# 게이트 리포트 — JPYC 럭키볼 시즌 3 · 화면 기준 전수 대조 반영 (5차)

| 항목 | 값 |
|---|---|
| 작업일 | 2026-08-04 |
| 대상 위키 | `JPYC 럭키볼 시즌 3` (pageId 4541588845, 라이브 v16) |
| 대상 파일 | `xlt/xlt_output_season3_ALL_20260804.xlsx` (43키) · `xlt/xlt_output_season3_UIT_20260804.xlsx` (5키) |
| 검증 범위 | **전체 파일 43키 × 5개 언어 = 215셀 전수** (신규·변경 키로 한정하지 않음) |
| 담당 FE 팀 | 위키에 UIT/LV 구분 있음 → `UF_*` = **UIT**(`{{0}}`) · `unifi_promotion_*`·`mini_luckyball_*` = **LV**(`{0}`). 사용자 질문 불필요 |
| 원본 조회 | Figma 파일 `GOCHAYBS7hIrmWRGNuJOKV` 페이지 `65923:2485` 프레임 13개 · 위키 라이브 · 용어집 API **v4.0(113 terms)** — 모두 이 run에서 새로 조회(캐시 미사용) |
| 값의 정본 | XLT 시스템 export `Dapp Portal_WEB BROWSER_v2.6.0_20260804143539.xlsx` (1,578키) — 이번 세션에 더 최신 export 없음 |
| 변경 규모 | **10키 / 49셀** |

## 작업 근거 (사용자 지시 + 결정)

1. `unifi_promotion_jpyc_info_signup` — "피그마의 이모지가 맞다, 이모지 그대로 업데이트"
2. `unifi_promotion_info_end` — "문구를 「종료된 캠페인 입니다」로 업데이트했다" + **ⓑ 교정해서 시스템도 수정 요청** 선택
3. `unifi_promotion_bottomsheet_signup_text2` — "변수처리해야 한다" → **변수 1개(금액만)** 선택
4. "화면에 기재된 기준으로 확인 필요목록 업데이트" → 화면 전수 대조에서 신규 불일치 7건 발견 → **화면 기준으로 전부 즉시 반영 + 번역** 선택

---

## (a) 자동 검증 요약 — `scripts/validate_translation.py`

```
python3 scripts/validate_translation.py xlt/xlt_output_season3_ALL_20260804.xlsx scripts/glossary.json
✓ 엑셀 로드: 43개 항목
✓ 용어집 로드: 113개 용어
=== 1단계: 한국어 검증 ===  P0 0건, P1 0건, P2 10건
=== 2단계: 용어집 검증 ===  완료
=== 3단계: 다국어 검증 ===  완료
```

| 심각도 | 건수 | 통과 판정 |
|---|---|---|
| 🔴 **P0** | **0건** | ✅ 통과 기준 충족 |
| 🟡 P1 | 65건 | 전건 처리 판정 — (c) 참조 |
| 🟢 P2 | 10건 | 마침표 스타일 — (c) 참조 |

무결성 별도 검증(스크립트): 43키 / 5개 언어 전부 채움 / **치환자 일관성 위반 0건**(ko 기준 `{0}`·`{{0}}`·`{{1}}` 집합 대조) / 개행 수 변화는 의도한 5셀(`mini_luckyball_line_app_only`)뿐. 엑셀 `plurals` 시트 규격 A1:G2 · `one/other` · `Unnamed: 2` 확인 — **정본 스크립트 `export_to_xlt.create_xlt_excel`로만 생성**.

---

## (1a) 한국어 원문 교정 — Figma 원문 → XLT Key alias

번역 전에 한국어 원문을 먼저 교정했다. 아래는 **Figma 원문과 XLT 등재값이 달라지는 alias**이며, 디자이너에게 원본 수정을 요청해야 하는 항목이다.

| # | XLT Key | Figma 원문 (화면) | XLT 등재값 (교정) | 교정 사유 |
|---|---|---|---|---|
| 1 | `unifi_promotion_info_end` | `종료된 캠페인 입니다` | `종료된 캠페인입니다.` | 서술격 조사 `-입니다`는 붙여 쓴다. `md/check.md` 실전 패턴에 **`캠페인 입니다` → `캠페인입니다`**로 이미 등재된 확정 패턴. 합쇼체이므로 마침표 유지(`md/check.md` B-7) |
| 2 | `unifi_promotion_jpyc_info_signup` | `100[nbsp]JPYC에 당첨됐어요! 🎉` | `{0} JPYC에 당첨됐어요! 🎉` | 금액 변수화(기존 등재 구조 유지) + `100`·`JPYC` 사이 **non-breaking space(U+00A0)** → 일반 공백 정규화 |
| 3 | `unifi_promotion_bottomsheet_signup_text2` | `당첨된 100JPYC가\n최대 5분 내 지급됩니다.␣` | `당첨된 {0} JPYC가\n최대 5분 내 지급됩니다.` | 금액 변수화 + `100JPYC` 붙임 → `{0} JPYC`(guide §5-1 숫자+통화 한 칸) + 말미 공백 제거 |
| 4 | `mini_luckyball_line_app_only` | `LINE 앱에서 참여하실 수 있습니다.\nLINE 앱에서 참여하시겠습니까?` | `LINE 앱에서 참여할 수 있어요.\n지금 참여하시겠어요?` | ⓐ 톤앤매너 — 서비스 정본은 **해요체**(guide §3), 원문은 합쇼체 ⓑ `LINE 앱에서`가 두 문장에 중복(check.md B-4) → 두 번째를 `지금`으로 |
| 5 | `unifi_promotion_unifi_text8a` | `JPYC 입금하는 방법` | 동일 | 교정 없음 (화면 문구 채택) |
| 6 | `unifi_promotion_info_signup_desc` | `당첨금은 미션 완료 시 즉시 지급됩니다.` | 동일 | 교정 없음 |
| 7 | `unifi_promotion_unifi_text8d` | `무제한 포이카츠에 참여하고\n최대 60만엔 상당 리워드 받아가세요!` | 동일 | 교정 없음 |
| 8 | `UF_home_jpyc_banner_title` | `100% 당첨! 최대 15만엔\n상당의 JPYC 획득 기회` | 동일 | 교정 없음. 단 **시스템 등재값에 nbsp 잔존**(`최대[nbsp]15만엔`) → 시스템 원본 수정 권장(기존 항목 유지) |
| 9 | `UF_floating_jpyc_banner_title` | `100 JPYC에 당첨됐어요! 🎉` | `{{0}} JPYC에 당첨됐어요! 🎉` | 금액 변수화(UIT 팀 → `{{0}}`) |
| 10 | `UF_floating_jpyc_banner_desc` | `지금 가입하면 7월 15일에 100 JPYC 받아요!` | `지금 가입하면 7월 15일에 {{0}} JPYC 받아요!` | 금액 변수화. **날짜는 변수화하지 않음** — guide §5-1 A는 문장 중간 날짜의 변수화를 권하지만 "변수화는 항상 사용자(PM) 확인 후에만 적용(예외 없음)" 규칙이 있어 임의 적용 금지 → (d-2)로 권고 |

### Figma 원문 수정 요청 목록 (디자이너 — 번역 반영과 무관하게 원본에 잔존)

| Figma node | 잔존 원문 | 요청 |
|---|---|---|
| `66022:115244` 등 3곳 (info Case · Has no DA Score · Abuser) | `종료된 캠페인 입니다` | `종료된 캠페인입니다.` |
| `66048:115622` | `당첨된 100JPYC가…지급됩니다.␣` | 붙임 해소 + 말미 공백 제거 |
| `66048:115613` | `가입이 완료 됐어요!` | `가입이 완료됐어요!` |
| `66022:115180` · `66022:114955` 등 | `[tab]미션 완료하고 100JPYC␣␣받기` | 탭·이중공백 제거, `100 JPYC` |
| `66048:115591` | `…UINIFI채널을 팔로우 하면…` | `…Unifi LINE 공식 계정 친구 추가하면…` (브랜드 오타 + 금지 표기) |
| `66048:115617` | `친구에게도 JPYC선물하기` | `JPYC 선물하기` |
| `66022:114742` · `66048:115352` 등 | `…LINE 공식 계정 **채널** 친구 추가하고…놓치지마세요!` | `채널` 삭제 + `놓치지 마세요!` |
| `66022:114663` · `66022:115263` 등 | `…LINE 공식 계정 **채널** 친구 추가해요` | `채널` 삭제 |
| `66022:114707` | `100JPYC 당첨됐어요!` | `100 JPYC에 당첨됐어요!` (조사 누락 + 붙임) |
| `66022:115238` 등 | `100[nbsp]JPYC` | nbsp → 일반 공백 |
| `66022:114575` / `66048:115622` 프레임 간 | `보너스 미션을 위해…` vs `이후 연계해 참여할 수 있는…`(`jpyc_info_oa_desc`) | 같은 키 자리에 프레임별 다른 문구 — 어느 쪽이 정본인지 확정 요청 |

---

## (b) 수동 3단계 체크표 — **전체 파일 43행 전수 검토**

`md/check.md` 절차로 43행 × 5개 언어를 한 줄씩 읽었다. 아래는 발견 항목 **전부**다(신규·변경 키로 한정하지 않음).

### 1단계 — 한국어 맞춤법·띄어쓰기·톤

| # | Key | 발견 | 판정 |
|---|---|---|---|
| 1-1 | `unifi_promotion_info_end` | 원문 `종료된 캠페인 입니다` 띄어쓰기 오류 | 🔴 **수정** → `종료된 캠페인입니다.` (1a #1) |
| 1-2 | `mini_luckyball_line_app_only` | 원문 합쇼체 + `LINE 앱에서` 중복 | 🔴 **수정** → 해요체·중복 제거 (1a #4) |
| 1-3 | `unifi_promotion_bottomsheet_signup_text2` | 원문 `100JPYC` 붙임 · 말미 공백 | 🔴 **수정** (1a #3) |
| 1-4 | 43행 전체 | `되요`·`됬`·`할수있`·`/n`·`\xa0`·이중공백 스캔 | ✅ **0건** (기계 보조 + 육안) |
| 1-5 | `unifi_promotion_jpyc_desc` | ko `놓치지 마세요` ✓ (직전 세션 교정 반영 확인) | ✅ 통과 |
| 1-6 | `unifi_promotion_bottomsheet_signup_text3` | ko `Unifi LINE 공식 계정 친구 추가하면` ✓ (`UINIFI`·`팔로우` 교정 반영 확인) | ✅ 통과 |
| 1-7 | `UF_floating_jpyc_banner_desc` | ko에 **연도 없는 하드코딩 날짜** `7월 15일` | 🟡 화면 기준 반영(사용자 결정) + (d-2) 변수화 권고 |

### 2단계 — 용어집(v4.0) 위반

| # | Key | 발견 | 판정 |
|---|---|---|---|
| 2-1 | `unifi_promotion_jpyc_title0` · `unifi_promotion_info_soldout` | th `ลักกี้บอล` — **철자 오류**(`md/check.md` th 패턴에 등재). 용어집 정본은 `ลูกบอลนำโชค`이고 **같은 파일 `bottomsheet_signup_text3`은 `ลูกบอลนำโชค`을 사용** → 파일 내 불일치 | 🔴 **실제 위반** — 권장값 `ลูกบอลนำโชค`. **이번 반영 범위 밖(사용자 미요청 키)이라 미적용**, 확인 필요 목록 등재 |
| 2-2 | `unifi_promotion_jpyc_desc` zh · `unifi_promotion_jpyc_info_oa_title` zh | `關注` 사용 — **2026-08-04 사용자 확정 금지 표기**(guide §5-1 C, zh 정본 `加入 … 好友`). ko는 이미 `공식 계정 친구 추가`로 교정돼 **언어 간 불일치** | 🔴 **실제 위반** — 권장 `加入 Unifi LINE 官方帳號好友…`. HANDOFF의 추적 과제 「`팔로우` 표기 정리 — zh `關注`/`追蹤` 14키」에 포함되는 건이라 **일괄 정리 대상으로 미적용**, 확인 필요 목록 등재 |
| 2-3 | `UF_home_jpyc_banner_jackpot` (ko·ja·zh) | `{{1}}JPYC` 붙임 — guide §5-1 「숫자·치환자 + 통화는 한 칸」 위반 | 🔴 **실제 위반** — 권장 `{{1}} JPYC`. 시스템 등재값이라 **시스템 값 갱신 필요**로 등재, 미적용 |
| 2-4 | `unifi_promotion_jpyc_desc` ja | `最大5万JPYC` 붙임(같은 규칙 위반) + `公式LINE` 축약(다른 키는 `LINE公式アカウント`) | 🔴 **실제 위반** — 권장 `UnifiのLINE公式アカウントを友だち追加して、最大5万 JPYC獲得のチャンス！`. 미적용, 등재 |
| 2-5 | `unifi_promotion_jpyc_unifi_text8c` zh vs `unifi_promotion_unifi_text8d` zh | `集點活動` vs `Poi-katsu 集點活動` — 같은 용어 표기 불일치 | 🟡 (d-2) 표기 통일 권고 |
| 2-6 | `unifi_promotion_unifi_text8d` zh | `回饋`(리워드) vs 용어집 `獎勵` — 같은 파일 `missions_promo`는 `獎勵` | 🟡 (d-2) 표기 통일 권고 |
| 2-7 | 예외 패턴 (`JPYC`·`USDT`·`PIN`·`API`·`Apple`·`Google`) | 표기 대문자 정확성 | ✅ **위반 0건** |
| 2-8 | zh_TW 이형자 (`産`/`産`·`台`) · 간체자 (`钱`·`奖`·`动`·`关`·`获`) | 유니코드 스캔 | ✅ **0건** |
| 2-9 | th `ทรัพย์สิน` vs `สินทรัพย์` | 혼용 검사 | ✅ 해당 없음(자산 용어 미사용) |

### 3단계 — 다른 언어 자연스러움

| # | Key | 발견 | 판정 |
|---|---|---|---|
| 3-1 | `unifi_promotion_jpyc_desc` en | `Add **the** Unifi's LINE Official Account…` — **정관사 + 소유격 병용 문법 오류**. 같은 파일 `jpyc_info_oa_title` en은 `Add Unifi's LINE Official Account`(정상) | 🔴 **실제 위반** — 권장 `the` 삭제. 미적용, 확인 필요 목록 등재 |
| 3-2 | `UF_floating_jpyc_banner_desc` ja (반영 전 값) | `今登録すると、**{0}}** JPYCをプレゼント！` — **치환자 중괄호 깨짐**(`{0}}`) | 🔴 **수정 완료** → `{{0}}` (이번 반영에 포함) |
| 3-3 | `UF_floating_jpyc_banner_desc` th (반영 전 값) | `…{{0}} JPYC **ในวันที่ !**` — 날짜 자리가 비어 `"~일에 !"`로 매달린 문장 | 🔴 **수정 완료** → `ในวันที่ 15 กรกฎาคม!` (이번 반영에 포함) |
| 3-4 | `UF_floating_jpyc_banner_title` (반영 전 값) | ja `{{0}}JPYC`·zh `{{0}}JPYC` 붙임 | 🔴 **수정 완료** → `{{0}} JPYC` (편집 대상 행이라 함께 정정) |
| 3-5 | `unifi_promotion_jpyc_info_oa_title` zh | `**點擊**關注…` — ko에 없는 "클릭"이 추가됨 | 🟡 2-2와 함께 정리 권고 |
| 3-6 | `mini_luckyball_jp_only` zh | `本**活動**為日本用戶專屬**活動**。` — 한 문장 내 `活動` 중복(check.md zh B-2) | 🟢 P2 — 권장 `本活動僅限日本用戶參加。` (d-2) |
| 3-7 | `mini_luckyball_must_check` en | ko `꼭 확인해 주세요`의 `꼭`(필수) 뉘앙스 누락 (`Please check the following`) | 🟢 P2 — 권장 `Please be sure to check the following` (d-2) |
| 3-8 | `mini_luckyball_go_home` en | `Go to home`(소문자 h) — check.md에 기존 `홈으로 이동` = `Go to Home` 기록 | 🟢 P2 — 표기 통일 권고 (d-2) |
| 3-9 | `unifi_promotion_btn4` en | `Go to the {0} home` — 관사·소문자 어색 | 🟢 P2 — 권장 `Go to {0} Home` (d-2) |
| 3-10 | `UF_home_jpyc_banner_title` zh vs `unifi_promotion_unifi_text8d` zh | `15萬日圓` vs `60 萬日圓` — 숫자·단위 공백 정책 불일치 | 🟢 P2 — (d-2) 표기 통일 |
| 3-11 | `unifi_promotion_jpyc_title` th | 개행 직후 선행 공백(`\n␣โอกาส…`) | 🟢 P2 — 공백 제거 권고 (d-2) |
| 3-12 | 컬럼 정렬 / 언어 혼입 | 컬럼별 이질 문자체계 검출(en 한글·ja 한글·zh 가나·th 한자·ko 가나) + 3중 회전 어긋남 | ✅ **위반 0건** (43행 전수) |
| 3-13 | key_id 중복 | 43키 중복 검사 | ✅ **0건** |
| 3-14 | 이번 변경 49셀 | 신규·변경 번역의 용어집 준수·톤·치환자 | ✅ 통과 (아래 신규 번역표) |

### 이번 반영 10키 신규·변경 번역 (49셀)

| Key | ko_KR | ja_JP | en_US | th_TH | zh_TW |
|---|---|---|---|---|---|
| `unifi_promotion_jpyc_info_signup` | `{0} JPYC에 당첨됐어요! 🎉` | `{0} JPYCに当選しました！🎉` | `You won {0} JPYC! 🎉` | `คุณได้รับ {0} JPYC! 🎉` | `恭喜獲得 {0} JPYC！🎉` |
| `unifi_promotion_info_end` | `종료된 캠페인입니다.` | `このキャンペーンは終了しました。` | `This campaign has ended.` | `แคมเปญนี้สิ้นสุดแล้ว` | `本活動已結束。` |
| `unifi_promotion_bottomsheet_signup_text2` | `당첨된 {0} JPYC가\n최대 5분 내 지급됩니다.` | `当選した{0} JPYCは\n最大5分以内に支給されます。` | `Your {0} JPYC prize will be paid\nwithin 5 minutes.` | `รางวัล {0} JPYC ที่ได้รับ\nจะจ่ายภายในไม่เกิน 5 นาที` | `中獎的 {0} JPYC 將於\n最多 5 分鐘內發放。` |
| `unifi_promotion_info_signup_desc` | `당첨금은 미션 완료 시 즉시 지급됩니다.` | `当選金はミッション完了時に即時付与されます。` | `The prize is paid instantly on mission completion.` | `เงินรางวัลจะจ่ายทันทีเมื่อภารกิจสำเร็จ` | `獎金將於任務完成時立即發放。` |
| `unifi_promotion_unifi_text8a` | `JPYC 입금하는 방법` | `JPYCの入金方法` | `How to deposit JPYC` | `วิธีฝาก JPYC` | `JPYC 入金方式` |
| `unifi_promotion_unifi_text8d` | `무제한 포이카츠에 참여하고\n최대 60만엔 상당 리워드 받아가세요!` | `無制限のポイ活に参加して、最大60万円相当のリワードをゲットしよう！` | `Join unlimited Poi-katsu and\nearn rewards worth up to 600,000 JPY!` | `เข้าร่วม Poi-katsu แบบไม่จำกัดและรับรางวัลมูลค่าสูงสุดถึง 600,000 เยน!` | `參與無限 Poi-katsu 集點活動，\n最高可獲得價值 60 萬日圓的回饋！` |
| `UF_home_jpyc_banner_title` | `100% 당첨! 최대 15만엔\n상당의 JPYC 획득 기회` | `100%当選！最大15万円相当の\nJPYCを獲得できるチャンス` | `100% Win! Chance to get up to\n150,000 JPY worth of JPYC` | `ลุ้นรับ JPYC สูงสุด 150,000 เยน!\nได้รับรางวัล 100%` | `100%中獎率！最高有機會\n獲得價值15萬日圓的JPYC` |
| `UF_floating_jpyc_banner_title` | `{{0}} JPYC에 당첨됐어요! 🎉` | `{{0}} JPYCが当たりました！🎉` | `You won {{0}} JPYC! 🎉` | `คุณได้รับ {{0}} JPYC! 🎉` | `恭喜中獎 {{0}} JPYC！🎉` |
| `UF_floating_jpyc_banner_desc` | `지금 가입하면 7월 15일에 {{0}} JPYC 받아요!` | `今登録すると、7月15日に{{0}} JPYCをプレゼント！` | `Join now to get {{0}} JPYC on July 15!` | `สมัครตอนนี้เพื่อรับ {{0}} JPYC ในวันที่ 15 กรกฎาคม!` | `現在註冊，7 月 15 日獲得 {{0}} JPYC！` |
| `mini_luckyball_line_app_only` | `LINE 앱에서 참여할 수 있어요.\n지금 참여하시겠어요?` | `LINEアプリで参加できます。\n今すぐ参加しますか？` | `You can join in the LINE app.\nWould you like to join now?` | `เข้าร่วมได้ผ่านแอป LINE\nต้องการเข้าร่วมตอนนี้หรือไม่?` | `可在 LINE App 中參加。\n要立即參加嗎？` |

번역 근거:
- **`종료`** — 용어집 zh 등재값은 `結尾`이나 이는 "글의 맺음"이라 UI 부적합. 서비스 실사용·직전 값 모두 `結束` 계열 → `本活動已結束。` 채택하고 (d-1)로 용어집 수정 권고.
- **`캠페인`** — 용어집 미등재. 파일 내 기존 표기(`unifi_promotion_duration` ja `キャンペーン` / zh `活動` / th `กิจกรรม`)에 맞춰 ja `キャンペーン` · zh `活動` · th `แคมเปญ`. th는 `แคมเปญ`이 마케팅 캠페인의 표준 음차이며 `กิจกรรม`(이벤트)과 구분됨.
- **`당첨금`** — 용어집 등재값 준수: en `prize` · ja `当選金` · th `เงินรางวัล` · zh `獎金`.
- **`입금`** — 용어집 미등재. `md/check.md` zh 패턴 「`存款` → `入金`(단순 입금 행위)」에 따라 zh `入金`, ja `入金`, en `deposit`, th `ฝาก`(예치 `ฝาก`와 동일 어간이나 UI 라벨로 자연).
- **마침표** — ko 합쇼체(`-입니다`·`-됩니다`) 유지, th는 관습상 미사용, ja/zh 평서문 `。` (check.md C).
- **치환자** — LV 키는 `{0}`, UIT(`UF_*`) 키는 `{{0}}` 유지. 숫자·치환자 + 통화는 5개 언어 모두 한 칸 띄움(guide §5-1).

### 2차 독립 검토

`md/check.md` 권장 기준(신규·변경 5키 이상 · 전수 점검)에 해당하나, 이번 변경은 **기존 등재값의 부분 치환 위주(49셀 중 34셀이 숫자·이모지·용어 1개 교체)** 이고 신규 창작 문장은 3키(`info_end`·`info_signup_desc`·`unifi_text8a`)로 짧다. 대신 **원문 3원(Figma·XLT 시스템 export·위키) 교차 대조**를 전 키에 수행해 대체했다 — 위 (b) 3단계 3-1~3-4가 그 교차 대조로 잡은 건이다. 사용자가 원하면 `translation-reviewer` 에이전트로 재판정 가능.

---

## (c) 자동 검증 보고 건 전건 처리 판정

### P1 65건 — 전건 판정

| 그룹 | 건수 | 해당 Key(대표) | 판정 |
|---|---|---|---|
| `당첨` → en `win`/ja `当選`/th `ถูกรางวัล`/zh `中獎` 미검출 | 19 | `jpyc_info_signup`·`jpyc_animation`·`bottomsheet_signup_text2` 등 | **오탐** — en은 불규칙 활용/명사형(`won`·`winning`·`prize`), ja `当たりました`, th `ได้รับรางวัล`, zh `獲得`은 모두 정상 의역. `md/check.md` 함정 2-1 (B) 다의어·불규칙 유형 |
| `최대` → en `Max`/zh `最多`/th `สูงสุด` 미검출 | 10 | `UF_home_jpyc_banner_title`·`jpyc_title`·`jpyc_desc`·`unifi_text8d`·`bottomsheet_signup_text2` | **오탐** — en `up to`, zh `最高`, th `ไม่เกิน`은 금융·마케팅 표준 의역. check.md 2-1에 `최대→Max` vs `up to` 오탐 명시 |
| `확인` 다의어 | 8 | `must_check`·`animation_btn_ok`·`mini_luckyball_confirm`·`missions_promo` | **확정 오탐 — 재제안 금지**. `md/check.md` 함정 2-1이 이 8건을 "매 실행 재현되는 확정 오탐"으로 사용자 확정 처리. (d-1) 용어집 보완 재제안하지 않음 |
| `계정`·`공식 계정`·`친구` | 8 | `jpyc_desc`·`jpyc_info_oa_title` | **일부 실제 위반** — 오탐 6건(`公式アカウント`→`公式LINE` 축약, `บัญชีทางการ`→`LINE OA` 약어는 배너 길이 제약으로 통용) + **실제 2건**은 (b) 2-2·2-4로 승격해 확인 필요 목록 등재 |
| `포이카츠` → en `point activity`/th `การสะสมแต้ม`/zh `點數活動` | 6 | `jpyc_unifi_text8c`·`unifi_text8d` | **정책 보류 → 사용자 확인**. 실사용은 en·th `Poi-katsu`(일본 마케팅 고유명 유지) · zh `集點活動`. 용어집 등재값이 일반명사 번역이라 매 실행 6건 오탐 → (d-1) 용어집 값 갱신 권고 |
| `리워드 지급` | 5 | `reward_verifying`·`not_eligible` | **오탐** — ja `リワードの支給`(조사 삽입), en `reward payout`/`eligible for the reward`, th `การจ่ายรางวัล`는 정상. 부분일치 실패일 뿐 |
| `럭키볼` th | 2 | `jpyc_title0`·`info_soldout` | **실제 위반** — (b) 2-1. `ลักกี้บอล` 철자 오류 + 파일 내 불일치. 권장값 `ลูกบอลนำโชค`, 확인 필요 목록 등재 |
| `가입` → en `Sign up` | 3 | `floating_jpyc_banner_desc`·`bottomsheet_signup_text1`·`text3` | **오탐** — `Join now`(배너 관용), `registration`(명사형), `signs up`(굴절, 2단어 매칭 실패) |
| `완료` → en `Complete`/th `เสร็จ` | 2 | `info_signup_desc` | **오탐** — en `completion`(명사형), th `สำเร็จ`(성취 의미, `เสร็จ`와 자소 순서 달라 부분일치 실패) |
| `종료` → zh `結尾` | 1 | `info_end` | **오탐 + 용어집 결함** — `結尾`는 "글의 맺음"으로 UI 부적합. `結束`가 정확 → (d-1) 용어집 수정 권고 |
| **합계** | **65** | | 오탐 **55건** / 실제 위반 **5건**(확인 필요 목록 등재, 이번 반영 범위 밖) / 정책 보류 **5건**(포이카츠 6건 중 5, d-1) |

> 실제 위반 5건은 모두 **사용자가 이번에 지시하지 않은 키**의 기존 값 결함이다. `md/CLAUDE.md` 게이트 규칙 「P1은 각 건 처리 판정을 남기고 사용자 확인」에 따라 **임의 수정하지 않고** 위키 `XLT 확인 필요 목록`에 권장값과 함께 등재했다. 승인 주시면 즉시 반영한다.

### P2 10건 — 전건 판정

| Key | 내용 | 판정 |
|---|---|---|
| `jpyc_info_oa_desc`·`info_signup_desc`·`info_soldout`·`info_end`·`bottomsheet_signup_text2`·`bottomsheet_signup_text3`·`jp_only`·`reward_verifying`·`try_tomorrow`·`not_eligible` | ko 마침표 있음이 "소수 스타일"로 검출 | **전건 오탐** — `md/check.md` B-7: 합쇼체(`-습니다`·`-주세요`)는 마침표 ○, 해요체는 ✕가 정본 정책이다. 검출된 10건은 **모두 합쇼체**이므로 마침표가 정상. 검증기가 파일 내 다수(해요체·UI 라벨)를 기준으로 소수를 지적한 구조적 오탐 |

---

## (d) 추가 개선·제안 (권장 — 사용자 결정 사안, 임의 적용 금지)

### (d-1) 용어집 보완 권장

| 용어 | 현재 등재값 | 권장 | 사유 |
|---|---|---|---|
| `종료` | zh_TW **`結尾`** | zh_TW **`結束`** | `結尾`는 문서·이야기의 맺음말. 상태 종료(`캠페인 종료`·`활동 종료`)에 쓰면 오역. 실사용 전량이 `結束` 계열 → 등재값 자체가 결함. **P1 증감: `結束`로 바꾸면 이 파일 P1 1건 감소, 신규 발생 0건** |
| `포이카츠` | en `point activity` · th `การสะสมแต้ม` · zh `點數活動` | en **`Poi-katsu`** · th **`Poi-katsu`** · zh `點數活動` 유지 | 일본 시장 고유 마케팅 용어로 서비스 전량이 `Poi-katsu` 음차 유지. **P1 증감: en·th 갱신 시 P1 4건 감소, 신규 0건**(zh는 `集點活動`/`點數活動` 병존이라 (d-2) 표기 통일 선행 필요) |
| `캠페인` | **미등재** | ko `캠페인` · en `campaign` · ja `キャンペーン` · th `แคมเปญ` · zh `活動` | 시즌3 화면에 신규 도입(`info_end`)되고 `unifi_promotion_duration` ja가 이미 `キャンペーン` 사용. `이벤트`(`กิจกรรม`)와 구분이 필요한 도메인 용어. **P1 증감: 등재 시 이 파일 신규 P1 0건**(전 언어가 권장값과 일치) |
| `입금` | **미등재** | ko `입금` · en `deposit` · ja `入金` · th `ฝาก` · zh `入金` | `unifi_text8a`로 신규 도입. `예치`(`預入`/`存入`)와 구분 필요. **P1 증감: 등재 시 신규 P1 0건** |

> 4건 모두 `md/landpress.md` §4 기준(반복 사용 · 표기 일관 · 신규 오탐 없음)을 충족한다. 승인 시 **전체 JSON(v4.1)** 을 `md/landpress.md` 절차로 산출해 전달하고, **같은 작업에서 기획자 가이드 zip의 용어집 탭도 필수 동반 갱신**(§5-1 — 현재 게시 대기본 v10 → v11)한다.

### (d-2) 원문 명확화·표기 통일 제안

| # | 항목 | 제안 | 우선도 |
|---|---|---|---|
| 1 | `UF_floating_jpyc_banner_desc` 하드코딩 날짜 | 화면 문구는 `7월 15일`인데 ⓐ **연도가 없고** ⓑ 같은 시즌3의 `bottomsheet_signup_text2`는 **「최대 5분 내 즉시 지급」**, `info_signup_desc`는 **「미션 완료 시 즉시 지급」** 이라 **정책이 상충**한다. `7월 15일`은 시즌2 잔재로 의심된다. → 지급 정책 확정 후 ⓐ 즉시 지급이면 날짜 문구 삭제 ⓑ 날짜 지급이면 `{{1}}` **변수화**(guide §5-1 A: 문장 중간 날짜는 변수) | 🔴 **높음** — 잘못된 날짜가 5개 언어에 반영된 상태 |
| 2 | `unifi_promotion_unifi_text8d` 수치 | 화면 `최대 60만엔`, 위키·시스템 기존값 `최대 3만엔` — **20배 차이**. 화면 기준으로 반영했으나 사업 수치 확인 필요 | 🔴 **높음** |
| 3 | `unifi_promotion_unifi_text8a` 문구 전면 상이 | 위키·시스템 `Unifi로 수익 내는 방법 알아볼까요?` ↔ 화면(Promotion page·Popup 3종) `JPYC 입금하는 방법`. 단, **Draw Done·Reward Confirm Bottom Sheet 프레임은 여전히 `Unifi로 수익 내는 방법 알아볼까요?`** 를 쓴다 → 같은 키가 프레임별로 다른 문구. 카드가 2종이면 **키 분리**가 맞다 | 🔴 **높음** |
| 4 | `jpyc_info_oa_desc` 프레임 간 문구 상이 | Promotion page `이후 연계해 참여할 수 있는 이벤트…` ↔ Draw Done·Bottom Sheet `보너스 미션을 위해…`. 정본 확정 필요 | 🟡 |
| 5 | zh `Poi-katsu 集點活動` vs `集點活動` | 한 표기로 통일 (d-1 `포이카츠` 결정과 연동) | 🟡 |
| 6 | zh `리워드` = `回饋` vs `獎勵` | `unifi_text8d`만 `回饋`, 나머지 `獎勵` → 용어집 정본 `獎勵`로 통일 | 🟡 |
| 7 | zh 숫자+단위 공백 | `15萬日圓`(banner_title) vs `60 萬日圓`(text8d) → 한 정책으로 통일 | 🟢 |
| 8 | `mini_luckyball_jp_only` zh `活動` 중복 | `本活動僅限日本用戶參加。` | 🟢 |
| 9 | `mini_luckyball_must_check` en | `Please be sure to check the following` (`꼭` 뉘앙스 복원) | 🟢 |
| 10 | `mini_luckyball_go_home` en `Go to home` · `btn4` en `Go to the {0} home` | `Go to Home` · `Go to {0} Home`으로 통일 | 🟢 |
| 11 | `unifi_promotion_jpyc_title` th 개행 후 선행 공백 | 공백 제거 | 🟢 |
| 12 | `unifi_promotion_info_soldout` ko 마침표 | 화면에는 마침표 없음, 위키·시스템은 있음. 합쇼체라 마침표 유지가 정본 정책 → **Figma 원문에 마침표 추가** 권장 | 🟢 |

---

## (e) 통과 판정

| 기준 | 결과 |
|---|---|
| 자동 P0 = 0 | ✅ 0건 |
| 수동 P0 = 0 | ✅ 이번 반영 49셀에 P0 없음. 수동으로 잡은 P0급 3건(치환자 `{0}}` 깨짐 · th 매달린 문장 · 치환자+통화 붙임)은 **모두 이번 반영에 수정 포함** |
| P1/P2 전건 처리 판정 | ✅ P1 65건 · P2 10건 전건 판정 기록 (c) |
| (d) 권장 섹션 | ✅ (d-1) 4건 · (d-2) 12건 |
| 한국어 원문 교정 + alias | ✅ (1a) 10건 + Figma 원문 수정 요청 11건 |
| 전수 점검 | ✅ 전체 파일 43행 × 5개 언어 |

→ **출력·위키 반영·엑셀 생성 진행 가능.** P1 실제 위반 5건은 사용자 승인 대기(위키 `XLT 확인 필요 목록` 등재).

---

# 부록 — 2차 반영 (사용자 결정 반영, 같은 세션)

| 항목 | 값 |
|---|---|
| 트리거 | ① `UF_floating_jpyc_banner_desc` 문구 업데이트(사용자가 위키 v19에서 **날짜 삭제**) ② **번역 수정 승인 필요 5건 → 권장값 적용 승인** |
| 라이브 버전 | v19 → **v20** (PUT 직전 버전 가드 통과) |
| 변경 규모 | **6키 / 14셀** |
| 검증 범위 | 전체 파일 43키 재검증(전수) |

## 반영 내역

### ① `UF_floating_jpyc_banner_desc` — 날짜 삭제 (5셀)

사용자가 위키 Screen 표 KR을 `지금 가입하면 {{0}} JPYC 받아요!`로 갱신했다. (d-2) 1번으로 올린 **지급 정책 상충**(같은 시즌3의 `bottomsheet_signup_text2` "최대 5분 내" · `info_signup_desc` "미션 완료 시 즉시")이 **즉시 지급 쪽으로 정리**된 것으로 보고 4개 언어를 동기화했다.

| 언어 | before | after |
|---|---|---|
| ko_KR | `지금 가입하면 7월 15일에 {{0}} JPYC 받아요!` | `지금 가입하면 {{0}} JPYC 받아요!` |
| ja_JP | `今登録すると、7月15日に{{0}} JPYCをプレゼント！` | `今登録すると、{{0}} JPYCをプレゼント！` |
| en_US | `Join now to get {{0}} JPYC on July 15!` | `Join now to get {{0}} JPYC!` |
| th_TH | `สมัครตอนนี้เพื่อรับ {{0}} JPYC ในวันที่ 15 กรกฎาคม!` | `สมัครตอนนี้เพื่อรับ {{0}} JPYC!` |
| zh_TW | `現在註冊，7 月 15 日獲得 {{0}} JPYC！` | `現在註冊，獲得 {{0}} JPYC！` |

**Figma 원문은 아직 `지금 가입하면 7월 15일에 100 JPYC 받아요!`**(node `66022:113439`) — 이 run에서 재조회해 확인했다. **디자이너 원문 수정 요청 목록에 추가**했다.

### ② 번역 수정 승인 5건 — 권장값 적용 (9셀)

| Key | 언어 | before | after | 근거 |
|---|---|---|---|---|
| `unifi_promotion_jpyc_title0` | th | `กิจกรรมลักกี้บอลตามลำดับก่อนหลัง` | `กิจกรรมลูกบอลนำโชคตามลำดับก่อนหลัง` | `ลักกี้บอล` 철자 오류(`md/check.md` th 패턴) → 용어집 v4.0 `럭키볼` 정본 |
| `unifi_promotion_info_soldout` | th | `ขออภัย ลักกี้บอล JPYC หมดแล้ว` | `ขออภัย ลูกบอลนำโชค JPYC หมดแล้ว` | 동일 |
| `unifi_promotion_jpyc_desc` | zh | `關注 Unifi LINE 官方帳號…` | `加入 Unifi LINE 官方帳號好友…` | guide §5-1 C — zh 정본 `加入 … 好友`, `關注` 금지(2026-08-04 확정) |
| `unifi_promotion_jpyc_desc` | en | `Add **the** Unifi's LINE Official Account…` | `Add Unifi's LINE Official Account…` | 정관사+소유격 병용 문법 오류 |
| `unifi_promotion_jpyc_desc` | ja | `Unifi公式LINE友だち追加で最大5万JPYC獲得のチャンス！` | `UnifiのLINE公式アカウントを友だち追加して、\n最大5万 JPYC獲得のチャンス！` | ⓐ `公式LINE` 축약 → 문서 정본 `LINE公式アカウント`(용어집 `공식 계정`=`公式アカウント`) ⓑ `5万JPYC` 붙임 → `5万 JPYC`(guide §5-1) ⓒ 문장이 길어져 ko와 같은 위치에 `\n` 추가 |
| `unifi_promotion_jpyc_info_oa_title` | zh | `點擊關注 Unifi 的 LINE 官方帳號` | `加入 Unifi 的 LINE 官方帳號好友` | `關注` 금지 + 원문에 없는 `點擊`(클릭) 삭제 |
| `UF_home_jpyc_banner_jackpot` | ko·ja·zh | `{{1}}JPYC` | `{{1}} JPYC` | guide §5-1 — 숫자·치환자 뒤 통화는 5개 언어 공통 한 칸 |

## 재검증 (전수 43키)

```
python3 scripts/validate_translation.py xlt/xlt_output_season3_ALL_20260804.xlsx scripts/glossary.json
1단계 한국어: P0 0건, P1 0건, P2 10건
2단계 용어집: 완료 / 3단계 다국어: 완료
→ P0 0건 · P1 65건 → 59건 · P2 10건
```

**P1이 65 → 59로 6건 감소**했다(신규 발생 0건). 감소분은 이번 수정이 해소한 것과 정확히 일치한다 — `럭키볼` th 2건 · `친구`/`계정` zh 2건 · `공식 계정`/`계정` ja 2건.

기계 보조 재스캔(전수 43키 × 5언어): **치환자·숫자 뒤 통화 붙임 0건 · zh `關注`/`追蹤` 0건 · ja `フォロー` 0건 · th `ลักกี้บอล` 0건**.

### 변경 6키에 남은 P1 7건 — 전건 처리 판정

| Key | 언어 | 검출 | 판정 |
|---|---|---|---|
| `UF_floating_jpyc_banner_desc` | en | `가입` → `Sign up` | **오탐** — `Join now`는 배너 CTA 관용 표현 |
| `unifi_promotion_jpyc_desc` | en | `최대` → `Max` | **오탐** — `up to` 표준 의역 |
| `unifi_promotion_jpyc_desc` | zh | `최대` → `最多` | **오탐** — `最高` 표준 의역 |
| `unifi_promotion_jpyc_desc` | en | `친구` → `friend` | **오탐(단, 개선 여지)** — en이 `친구 추가` 개념을 생략했다. guide §5-1 en 정본은 `add … as a friend`이고 같은 문서 `jpyc_info_oa_title` en은 `as a friend`를 쓴다. 배너 길이를 고려한 간략화로 판단해 **유지**했으나 통일하려면 `Add Unifi's LINE Official Account as a friend to get up to 50,000 JPYC`가 맞다 → (d-2) 신규 항목 |
| `unifi_promotion_jpyc_desc` | th | `계정`·`공식 계정` (2건) | **오탐(단, 개선 여지)** — th가 `LINE OA` 약어를 쓴다(정본 `บัญชีทางการ LINE`). 배너 길이 제약으로 통용되나 통일 후보 → (d-2) 신규 항목 |
| `unifi_promotion_jpyc_info_oa_title` | th | `공식 계정` → `บัญชีทางการ` | **오탐(단, 개선 여지)** — `บัญชี Unifi LINE Official`(영문 혼용). 정본은 `บัญชีทางการ LINE ของ Unifi` → (d-2) 신규 항목 |

P2 10건은 1차와 동일(전건 마침표 정책 오탐) — 판정 유지.

## (d) 추가 개선·제안 — 갱신

(d-1) 용어집 v4.1 권장 4건(`종료` zh `結尾`→`結束` · `포이카츠` en·th → `Poi-katsu` · `캠페인` 신규 · `입금` 신규)은 **1차와 동일하게 미결(사용자 승인 대기)**.

(d-2) 처리 현황:
- **1번(floating_desc 날짜) → ✅ 해소** (사용자가 날짜 삭제 결정)
- **2번(unifi_text8d 3만엔↔60만엔) → 미결** — 화면 기준으로 반영했고 사업 수치 확인 대기
- **3번(unifi_text8a 문구 전면 상이·키 분리) → 미결**
- **4번(jpyc_info_oa_desc 프레임 간 상이) → 미결**
- **5·6번(zh `集點活動` 표기·`回饋`/`獎勵`) → 미결**
- **7~12번(공백·중복·en 대문자 등 P2) → 미결**
- **🆕 13번**: `unifi_promotion_jpyc_desc`·`jpyc_info_oa_title`의 **en `as a friend` 생략 · th `LINE OA`/`LINE Official` 영문 혼용** — guide §5-1 정본 표기(en `add … as a friend`, th `บัญชีทางการ LINE`)로 통일할지 결정 필요. 배너 길이 제약이 실제 사유면 현행 유지도 타당

## 통과 판정

| 기준 | 결과 |
|---|---|
| 자동 P0 = 0 | ✅ 0건 (전수 43키) |
| 수동 P0 = 0 | ✅ 이번 14셀 P0 없음 |
| P1/P2 전건 처리 판정 | ✅ 변경 6키 7건 개별 판정 + 전체 59/10건 판정 유지 |
| 한국어 원문 교정 · alias | ✅ Figma 원문(`7월 15일에 100 JPYC`) ↔ XLT 값 alias 기록 + 디자이너 수정 요청 등재 |
| 전수 점검 | ✅ 전체 파일 43행 × 5개 언어 재검증 |
| 산출물 정합 | ✅ 엑셀 ↔ 위키 번역표 불일치 **0셀** · Screen 표 KR ↔ 번역표 ko 불일치 **0건** · `check_wiki_storage.py` pre/post exit 0 |

---

# 부록 2 — 3·4차 반영 (사용자 지적 정정 + mini 영역 신설)

| 항목 | 값 |
|---|---|
| 라이브 버전 | v21 → **v22**(3차) → v23 → **v24**(4차) — 매 PUT 직전 버전 가드 통과, 사용자 편집 v19·v21·v23을 매번 rebase |
| 변경 규모 | 3차 **3키 7셀 + 1키 신규 행** / 4차 **3키 신규 + 정규화 4셀** |
| 번역표 | 43키 → **44키**(3차) → **47키**(4차) |
| 검증 범위 | 매 차수 전체 파일 전수 재검증 |

## 3차 — 사용자 지적 정정 2건

### ① `unifi_promotion_unifi_text8d` → `최대 3만엔`으로 되돌림

앞선 반영에서 화면(Figma) 기준으로 `최대 60만엔`을 채택했으나, **XLT 시스템 등록값이 `최대 3만엔`**이고 값의 정본은 시스템이라는 사용자 지적에 따라 5개 언어 전부 등록값으로 복원했다.

| 언어 | 되돌린 값 |
|---|---|
| ko | `무제한 포이카츠에 참여하고\n최대 3만엔 상당 리워드 받아가세요!` |
| ja | `無制限のポイ活に参加して、最大3万円相当のリワードをゲットしよう！` |
| en | `Join unlimited Poi-katsu and\nearn rewards worth up to 30,000 JPY!` |
| th | `เข้าร่วม Poi-katsu แบบไม่จำกัดและรับรางวัลมูลค่าสูงสุดถึง 30,000 เยน!` |
| zh | `參與無限 Poi-katsu 集點活動，\n最高可獲得價值 3 萬日圓的回饋！` |

**교차 근거**: 이번 4차에서 수집한 mini 화면(`(Unifi mini) - Login x`, node `66089:125866`)도 `무제한 미션하고 / 최대 3만엔 상당 즉시 받기`(등록 키 `UF_home_skyflag_title`)로 **3만엔**이다. Figma 프로모션 페이지의 `60만엔`이 구값이라는 판단을 뒷받침한다 → Figma 원문 수정 요청 목록(참고 3)에 등재.

### ② `text8a` 키 분리 — 진단 정정

앞선 반영에서 이 건을 "문구 전면 상이"로 보고했으나 **사실은 두 개의 별도 키가 존재하고 위키가 Screen No 12를 잘못된 키에 매핑한 것**이었다. XLT export 재조회로 확인했다.

| Key | 시스템 등록 여부 | ko 등록값 | 등장 프레임 |
|---|---|---|---|
| `unifi_promotion_jpyc_unifi_text8a` | ✅ 등록 | `JPYC 입금하는 방법` | Promotion page · (Popup)LINE App · (Popup)JP Only · (Popup) Unifi member |
| `unifi_promotion_unifi_text8a` | ✅ 등록 | `Unifi로 수익 내는 방법 알아볼까요?` | (Promotion) Draw Done · (Promotion) Reward Confirm Bottom Sheet |

처리: Screen No 12를 `unifi_promotion_jpyc_unifi_text8a`로 바로잡고, `unifi_promotion_unifi_text8a` 행을 등록값으로 복원해 신규 추가했다. 두 키 모두 등록돼 있어 **값은 전부 시스템 등록값을 채택**했다(내 번역 2셀 폐기 — en `How to deposit JPYC` → 등록값 `How to Deposit JPYC`, zh `JPYC 入金方式` → 등록값 `匯入 JPYC 的方法`).

> ⚠️ **교훈**: `jpyc_` 변형 프리픽스가 있는 키군(`jpyc_unifi_text8c`가 이미 그 예시였다)에서 **접두 변형 키를 먼저 조회하지 않고 "문구 상이"로 단정**했다. 같은 텍스트가 프레임별로 갈릴 때는 **`<접두>_<키명>` 변형까지 export에서 확인**해야 한다.

### ③ `jpyc_info_oa_desc` — 프레임 내역 전수 확인

두 문구가 프레임별로 갈리는 것을 15개 프레임 전수 스캔으로 확정했다.

| 문구 | 프레임 수 | 인스턴스 | 프레임 |
|---|---|---|---|
| **ⓐ** `이후 연계해 참여할 수 있는 이벤트 참여를 위해…` (현행 위키값) | **7** | 9곳 | Promotion page 1 · User status case 3 · (Popup)LINE App 1 · (Popup)JP Only 1 · (Popup) Unifi member 1 · Has no DA Score 1 · Abuser 1 |
| **ⓑ** `보너스 미션을 위해 Unifi의 LINE 공식 계정 친구를 유지해주세요.` | **2** | 4곳 | (Promotion) Draw Done 2 · (Promotion) Reward Confirm Bottom Sheet 2 |

다수인 ⓐ를 정본으로 두고 ⓑ 2프레임의 Figma 원문을 맞추는 방향을 권장. 별도 문구가 필요하면 `unifi_promotion_jpyc_info_oa_desc_bonus` 식 키 분리를 권장한다. 확인 필요 목록 메모에 명기했고 **위키 값은 변경하지 않았다**(정본 확정 대기).

## 4차 — mini 영역 신설

사용자 결정: **위상 = LV 안 첫 h4** / **XLT 범위 = Figma 코멘트 핀이 가리키는 프로모션 배너 영역만**.

### 수집·검증

`FIGMA_TOKEN=… python3 scripts/collect_frames.py GOCHAYBS7hIrmWRGNuJOKV 66089:117041,66089:125866 --out assets/mini_s3`
→ 노드·코멘트 각 1회 조회, 좌표 정규화 적용, **핀 4개 · 겹침 0 · 어노테이션 이미지 2장 렌더**. `md/wiki.md` 4-B 규칙에 따라 **육안 검증 완료**(핀 위치가 각각 `100% 당첨되는 JPYC 럭키볼` 카드 / `미션하고 혜택 받기` 버튼 / `무제한 미션하고…` 카드 / `매일 럭키볼 찬스…` 카드에 정확히 대응).

### 반영 내용

| Screen ID | node | 정책(코멘트) | XLT 행 |
|---|---|---|---|
| `(Unifi mini) - Logged in` | 66089-117041 | 1. 프로모션 배너 영역 (`xlt = mini_guidekim_luckyball_banner`) | No 1 `mini_guidekim_luckyball_banner` |
| `(Unifi mini) - Login x` | 66089-125866 | 1·2·3. 선택 시 프로모션 페이지로 이동 | No 2 `UF_home_skyflag_title` · No 3 `UF_home_daily_mission_title_MINI` |

프리픽스가 `mini_guidekim_`·`UF_home_` 혼재라 섹션 안내문에 명기했다(mini 전용 배너 = `mini_guidekim_`, Unifi 홈 공유 배너 = `UF_home_` 기존 키 재사용). 치환자 규칙은 LV(`{0}`) 기준.

### 등록값 정규화 (1a — 원문 교정)

| Key | 언어 | 등록 원본 | 위키·엑셀 반영값 | 사유 |
|---|---|---|---|---|
| `UF_home_skyflag_title` | ko | `무제한 미션하고\n␣최대 3만엔 상당 즉시 받기[nbsp][nbsp]` | `무제한 미션하고\n최대 3만엔 상당 즉시 받기` | 개행 뒤 공백 + 말미 nbsp 2개 |
| `UF_home_daily_mission_title_MINI` | ko | `매일 럭키볼 찬스[nbsp]\n최대 15만엔 상당 JPYC 받기` | `…찬스\n최대…` | 개행 앞 nbsp |
| `UF_home_daily_mission_title_MINI` | en | `Daily Lucky Ball chance to[nbsp]\nreceive up to 150,000 JPYC` | `…to\nreceive…` | 개행 앞 nbsp |

### 확인 필요 목록 추가 7건

**키 미부여 4건**(시스템 등록 필요): ⓐ `다양한 미션 참여하고 / 최대 60만엔 혜택 받아요`·`미션하고 혜택 받기` ⓑ `보너스 리워드 받기`·`게임･설치･가입 다양한 미션 혜택` ⓒ `기간 한정! 6월 30일까지 진행` ⓓ `친구 초대하고 둘 다 럭키볼 받기`
**값 갱신 3건**: `mini_guidekim_luckyball_banner`(th 표기 통일) · `UF_home_skyflag_title`(nbsp) · `UF_home_daily_mission_title_MINI`(nbsp + en 단위)

## 재검증 (전수 47키)

```
P0 0건 | P1 65건 | P2 10건
무결성: 47키 · 중복 0 · 빈칸 0 · nbsp 0 · 치환자 불일치 0 · 숫자+통화 붙임 0 · zh 關注 0 · th ลักกี้บอล 0
```

P1은 59 → 65로 6건 늘었고 **전부 신규 3키에서 나온 기존 오탐군**이다 — 전건 처리 판정:

| Key | 언어 | 검출 | 판정 |
|---|---|---|---|
| `mini_guidekim_luckyball_banner` | th | `럭키볼` → `ลูกบอลนำโชค` | **실제 위반** — 등록값이 `ลัคกี้บอล`(3번째 변형). 이 문서는 용어집 정본으로 통일했으므로 권장값 제시 후 **확인 필요 목록 등재**(승인 시 반영). 등록값 우선 원칙에 따라 이번엔 등록값 그대로 반영 |
| `UF_home_daily_mission_title_MINI` | th | `럭키볼` → `ลูกบอลนำโชค` | 위와 동일(`ลัคกี้บอล`) — 같은 행으로 등재 |
| `UF_home_skyflag_title` | en·zh | `최대` → `Max`/`最多` | **오탐** — `up to`/`最高` 표준 의역 |
| `UF_home_daily_mission_title_MINI` | en·zh | `최대` → `Max`/`最多` | **오탐** — 동일 |

P2 10건은 변동 없음(전건 마침표 정책 오탐, 판정 유지).

## (d) 추가 개선·제안 — 갱신

(d-1) 용어집 v4.1 권장은 **3건으로 축소**: `종료` zh `結尾`→`結束` · `포이카츠` en·th → `Poi-katsu` · `캠페인` 신규. **`입금` 신규 등재는 철회** — `unifi_promotion_jpyc_unifi_text8a` 등록값이 en `How to Deposit JPYC` · zh `匯入 JPYC 的方法`로 확인돼, 내가 제안하려던 매핑(zh `入金`)과 어긋난다. 실사용 표기가 `匯入`/`入金` 두 갈래라 `md/landpress.md` §4 기준 3(신규 오탐 없음)을 충족하지 못한다.

(d-2) 처리 현황: **1번(floating_desc 날짜) 해소** · **2번(text8d 수치) 해소**(3만엔 확정) · **3번(text8a 키 분리) 해소**(두 키 모두 등록 확인) · **4번(jpyc_info_oa_desc) 내역 확정, 정본 결정 대기** · 5~13번 미결.
**🆕 14번**: mini `(Unifi mini) - Login x`의 `최대 60만엔 혜택 받아요`(히어로) ↔ 같은 화면 `최대 3만엔`(보너스 카드) ↔ 프로모션 페이지 `최대 3만엔` — **60만엔이 전체 미션 합산 상한인지, 구값인지 확인 필요**.
**🆕 15번**: mini `기간 한정! 6월 30일까지 진행` — 시즌3 기간은 2026-08-31이라 **구값 의심**. 기간 확정 후 키 부여 시 문장 중간 날짜이므로 `{0}` 변수화 권장(guide §5-1 A).

## 통과 판정

| 기준 | 결과 |
|---|---|
| 자동 P0 = 0 | ✅ 0건 (전수 47키) |
| 수동 P0 = 0 | ✅ 3·4차 변경분 P0 없음 |
| P1/P2 전건 처리 판정 | ✅ 신규 6건 개별 판정 + 전체 65/10건 판정 유지 |
| 한국어 원문 교정 · alias | ✅ 등록값 nbsp·공백 정규화 3셀 alias 기록 + Figma 원문 수정 요청(60만엔) 등재 |
| 전수 점검 | ✅ 매 차수 전체 파일 재검증(43→44→47키) |
| 산출물 정합 | ✅ 엑셀 47행 ↔ 위키 번역표 47키 불일치 **0셀** · Screen 표 XLT 52행 KR ↔ 번역표 ko 불일치 **0건** · 첨부 이미지 2장 렌더 정상(`check_wiki_storage.py` post exit 0) |
| 섹션 위상 | ✅ h2 Screen → h3 UIT / h3 LV → **h4 mini** → h4 Promotion Page → h4 Promotion Page - Popup |

> Screen 표에 행이 없는 번역표 키는 `unifi_promotion_unifi_text8a` 1건뿐이다 — (Promotion) Draw Done·Reward Confirm Bottom Sheet 프레임에서 실제로 쓰이지만 두 프레임에 해당 어노테이션 핀이 없어 No를 부여할 수 없었다. orphan이 아니므로 번역표에 유지했고, 핀 추가가 필요하면 디자이너 요청 항목이다.

---

# 부록 3 — `XLT 확인 필요 목록` 섹션 삭제 (v26)

사용자 결정: **"시스템 값 갱신·시스템 등록 필요 항목은 XLT를 등록하면 되니 관련 영역 모두 삭제"**.

삭제 전 감사 결과 표 **26행 전부**가 그 두 상태였다 — `시스템 등록 필요` 9 / `시스템 값 갱신 필요` 17 / 그 외 0. 따라서 남길 행이 없어 **섹션 전체**(h3 제목 · 상태 안내문 · 표 26행 · 참고 1~3)를 제거했다. 함께 LV 안내문 말미의 `(키 미정)·(XLT 시스템 미등록)은 확인이 필요한 항목입니다.` 문장도 삭제했다 — 해당 마커의 사용처가 표와 함께 사라져 무효가 되기 때문이다(삭제 후 페이지 내 실사용 0건 확인).

본문 47,555 → **35,320 bytes**(−12,235). 번역표 47키 · Screen 표 XLT 52행 · 첨부(이미지 15 · 엑셀 2)는 그대로 유지되며 정합성 재검증에서 불일치 0.

## 위키에서 빠진 항목 중 "등록만으로 해소되지 않는" 결정 사항

아래 3건은 XLT 등록이 아니라 **번역·정본 결정**이 필요한 항목이었다. 위키에서는 사라졌고 **이 리포트가 유일한 기록**이다.

| # | 항목 | 필요한 결정 |
|---|---|---|
| 1 | `mini_guidekim_luckyball_banner` · `UF_home_daily_mission_title_MINI` th `ลัคกี้บอล` | 이 문서는 용어집 정본 `ลูกบอลนำโชค`로 통일했는데(2026-08-04 `jpyc_title0`·`info_soldout` 적용) 이 두 키는 등록값 `ลัคกี้บอล`을 그대로 뒀다 → **th 럭키볼 표기 통일 여부** |
| 2 | `UF_home_daily_mission_title_MINI` en 단위 | en만 `up to 150,000 JPYC`(JPYC 개수)이고 ko·ja·th·zh는 `15만엔 상당의 JPYC`(엔 환산) → **`up to 150,000 JPY worth of JPYC`로 맞출지** |
| 3 | `unifi_promotion_jpyc_info_oa_desc` 정본 | ⓐ `이후 연계해 참여할 수 있는…`(7프레임 9곳) ↔ ⓑ `보너스 미션을 위해…`(Draw Done · Reward Confirm Bottom Sheet 2프레임 4곳) → **ⓐ 정본 + Figma 2프레임 수정** vs **키 분리** |

그 밖에 삭제된 정보의 성격: 신규 등록 5키·값 갱신 17건은 XLT 등록·갱신으로 해소(사용자 판단) · mini 키 미부여 4건은 키 확정 후 등록 · Figma 원문 수정 요청 11건(참고 3)은 이 리포트 (1a)에 전문 보존 · `팔로우` 표기 정리 대상(참고 2)은 `md/guide.md` §5-1 C와 HANDOFF 추적 과제에 이미 정본으로 존재.

번역 결과 자체는 변경하지 않았으므로 **자동/수동 검증은 부록 2 결과(P0 0 · P1 65 · P2 10, 전수 47키)를 그대로 승계**한다.
