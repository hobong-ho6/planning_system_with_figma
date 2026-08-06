# 게이트 리포트 — 시즌3 `Updated Fram` 섹션 5프레임 위키 반영

- **일자**: 2026-08-06
- **대상 위키**: `4541588845` JPYC 럭키볼 시즌 3 (착수 시 v47)
- **대상 Figma**: `GOCHAYBS7hIrmWRGNuJOKV` / 섹션 `66482-9678` = `Updated Fram` (프레임 5개) **+ 세션 중 사용자 추가 지시 `66022-115184` `(Promotion) info Case` 1개 = 총 6개**
- **담당 FE 팀**: **LV**(위키 Screen 섹션에 `LV` 구분 존재 → 자동 적용) — 프리픽스 `unifi_promotion_`·치환자 `{0}`
- **용어집**: 라이브 **v4.1**(114 terms · 9 exceptions · `oa_variables` 2종) — 세션 착수 시 API 재조회
- **검증기**: `validate_translation.py` **최장일치 개선본**(`4bd7fa4`, 2026-08-06) 기준 — 세션 중 원격에서 들어온 개선을 반영해 최종 수치를 재집계했다
- **엑셀**: `xlt_output_season3_{ALL,LV,UIT}_20260806.xlsx` (ALL 48 = LV 41 + UIT 7)

---

## 0. 대상 프레임과 변경 성격

| # | 프레임 (node-id) | 성격 |
|---|---|---|
| 1 | `(Promotion) Button Case` (66022:114981) | 기존 행 — Figma 코멘트 4번 변경(「이미 Unifi 회원인 경우」 추가) |
| 2 | `(Promotion) Unifi Member` (66482:9505) | **신규 화면**(코멘트 0건) — 신규 키 1건 |
| 3 | `(Promotion) Promotion page` (66022:114734) | 기존 행 — `info_signup_desc` 문구 변경 |
| 4 | `(Promotion) Reward Confirm Bottom Sheet` (66048:115343) | 기존 행 — `bottomsheet_signup_text2` 문구 변경 |
| 5 | `(OA)mission complete` (66482:9139) | **신규 OA 화면**(코멘트 0건) — XLT 키 미부여·번역만 (사용자 결정: 위키 행만 추가, Flex JSON 미생성) |
| 6 | `(Promotion) info Case` (66022:115184) | 기존 행 — **4번째 케이스 신설**(「이미 Unifi 회원이시네요.」 + 코멘트 4번 「이미 Unifi 회원인 경우 노출」). 신규 키 `unifi_promotion_info_already_member`가 귀속되는 화면 |

**핵심 정책 변경**: 당첨금 지급 시점이 **「즉시(최대 5분 내)」→「2주 이내」** 로 변경됨. 2026-08-05 사용자 확정(`bottomsheet_signup_text2` = 즉시 지급)을 **뒤집는 변경**이므로 명시적으로 기록한다.

---

## 1. (1a) 한국어 원문 교정 — 번역 전 수행

| XLT Key / 대상 | Figma 원문 | 교정본(정본) | 교정 사유 |
|---|---|---|---|
| `unifi_promotion_info_signup_desc` | `당첨 보상금은 뽑기 시점으로 부터 2주␣␣이내로 지급됩니다.` | `당첨 보상금은 뽑기 시점으로부터 2주 이내로 지급됩니다.` | 조사 붙여쓰기(`으로 부터`→`으로부터`) · 이중 공백 |
| `unifi_promotion_bottomsheet_signup_text2` | `당첨된 100JPYC는 2주이내로 지급됩니다.␣` | `당첨된 {0} JPYC는\n2주 이내로 지급됩니다.` | 금액 변수화(기존 키 규격 `{0}`) · `2주이내로`→`2주 이내로` · 후행 공백 · 원문 2행 구조 유지 |
| `unifi_promotion_info_already_member` (신규) | `이미 Unifi 회원이시네요.` | 동일 | 교정 없음 (출처: `(Promotion) info Case` 4번째 케이스 · `(Promotion) Unifi Member` 안내 영역 — 두 화면 공용) |
| (info Case 기존) `unifi_promotion_info_soldout` | `죄송합니다. JPYC 럭키볼이 모두 소진되었습니다` | `죄송합니다. JPYC 럭키볼이 모두 소진되었습니다.` | 문말 마침표 누락 — **기존 확정본 유지**(값 변경 없음, Figma 원문만 상이) |
| (info Case 기존) `unifi_promotion_info_end` | `종료된 캠페인 입니다` | `종료된 캠페인입니다.` | 띄어쓰기(`캠페인 입니다`) + 마침표 — **기존 확정본 유지**(값 변경 없음, Figma 원문만 상이 · 누적 원문 수정 요청 기존 항목) |
| OA ① | `당첨된 100JPYC는 2주이내로 지급됩니다.` | `당첨된 {{total_amount}} JPYC는 2주 이내로 지급됩니다.` | OA 표준 변수(`md/OA.md` §2-1) · 띄어쓰기 |
| OA ② | `친구가 가입하고, UINIFI채널을 팔로우 하면` | `친구가 가입하고, Unifi LINE 공식 계정 친구 추가하면` | `md/guide.md` §5-1 C 정본 표기(팔로우 금지) · 오타 `UINIFI` |
| OA ③ | `␣* 다른 이벤트 참여를 위해…` | `* 다른 이벤트 참여를 위해…` | 선행 공백 |
| OA ④ | `친구에게도 JPYC선물하기` | `친구에게도 JPYC 선물하기` | 띄어쓰기 · 기존 OA 문구와 통일 |

**alias 기록(Figma 원문 → XLT Key 값)**: 위 7건 전부. Figma 디자인은 수정하지 않았으므로 **디자이너 원문 수정 요청 대상**(§5 참조).

---

## 2. (a) 자동 검증 요약 — `validate_translation.py`

```
python3 scripts/validate_translation.py xlt/xlt_output_season3_ALL_20260806.xlsx scripts/glossary.json
✓ 엑셀 로드: 48개 항목 / ✓ 용어집 로드: 114개 용어
1단계 한국어 검증: P0 0건, P1 0건, P2 11건
2단계 용어집 검증: 완료
3단계 다국어 검증: 완료
```

| 심각도 | 건수 | 판정 |
|---|---|---|
| 🔴 **P0** | **0건** | ✅ 통과 기준 충족 |
| 🟡 P1 | **53건** | **전건 오탐** (§4 판정) |
| 🟢 P2 | 11건 | **전건 정책상 정상** (§4 판정) |

- 직전 차수(세션 #8, 47키) 대비 P1 **58 → 53**(-5). 감소분은 `bottomsheet_signup_text2`의 ko에서 `분`(시간) 문구가 빠진 데 따른 것이며 **신규 P1 0건**.
- 신규 키 `unifi_promotion_info_already_member`는 **P1·P2 0건**.

---

## 3. (b) 수동 3단계 체크표 — **전수(전체 48행) 점검**

검토 범위를 신규·변경 키로 한정하지 않고 **엑셀 전체 파일 48행의 `ko_KR`을 한 줄씩** 확인했다(영어 원문 오타 의심 행은 `en_US`도 확인). 자동 검증기가 구조적으로 못 잡는 항목(외래어 음차 오염 · 단어가 붙은 띄어쓰기 누락 · 다의어 모호 · 표현 어색)을 중심으로 본다.

### 1단계 — 한국어 원문 정합 (48행 전수)

| 결과 | 건수 | 내용 |
|---|---|---|
| 정상 | 45행 | 맞춤법·띄어쓰기·표기 일관성 이상 없음 |
| 이번 교정 | 3행 | `info_signup_desc` · `bottomsheet_signup_text2` · (신규)`info_already_member` — §1 |
| 기결정 유보 | 2행 | `UF_home_skyflag_title`(ko `무제한 미션하고` 목적어 누락 — **시스템 등록값이라 유보**, 2026-08-05 결정) · `unifi_promotion_unifi_text8d`(`최대 3만엔` — 시스템 export가 정본, Figma `60만엔`은 구값, 2026-08-05 결정) |
| 사용자 확정 유지 | 1행 | `jpyc_info_oa_desc` `이후 연계해 참여할 수 있는 이벤트 참여를…`(「참여」 중복이나 ⓐ안이 정본 — 2026-08-05 종결, 재제안 금지) |

받침·조사 판정 재확인: `{0} JPYC는`(종성 `ㄱ`→`는` 정상) · `시점으로부터`(정상) · `2주 이내로`(정상). 오탐 없음.

### 2단계 — 용어집 대조 (변경·신규 3키 × 5개 언어 = 15셀 + OA 5문구 × 5개 언어)

| 용어(ko) | 정본(용어집 v4.1) | 적용 결과 |
|---|---|---|
| 당첨금 | ja `当選金` · en `prize` · th `เงินรางวัล` · zh `獎金` | `info_signup_desc`·`text2`·OA① 전부 준수 |
| 뽑기 | ja `抽選` · en `Draw` · th `จับรางวัล` · zh `抽獎` | `info_signup_desc` 전 언어 준수 |
| 회원가입 | ja `会員登録` · en `sign up` · th `สมัครสมาชิก` · zh `註冊` | `info_already_member`는 「회원」 단독이라 ja `会員`·en `member`·th `สมาชิก`·zh `會員` — 기존 `mini_luckyball_already_member`와 동일 표기 |
| 공식 계정 | ja `公式アカウント` · en `Official account` · th `บัญชีทางการ` · zh `官方帳號` | OA③ 전 언어 준수 |
| 친구(추가) | ja `友だち`(히라가나 고정) · en `stay friends with` · th `เพิ่ม…เป็นเพื่อน` · zh `加入…好友` | OA②·③ 준수, `フォロー`·`關注`·`ติดตาม` 사용 0건 |
| 럭키볼 | ja `ラッキーボール` · th `ลูกบอลนำโชค` · zh `幸運球` | OA② 준수(th 음차 `ลักกี้บอล` 0건) |

**중간 교정 1건**: `unifi_promotion_info_signup_desc`의 ja를 초안 `当選報酬は…`에서 **`当選金は…`으로 교정**했다 — 「当選報酬」는 일본어에서 부자연스럽고 용어집 정본(`당첨금`=`当選金`)·형제 키(`text2` ja `当選した…`)와도 어긋난다.

### 3단계 — 언어별 정밀 검토 (변경·신규 3키 + OA 5문구)

| 키/문구 | ja_JP | en_US | th_TH | zh_TW | 판정 |
|---|---|---|---|---|---|
| `info_signup_desc` | `当選金は抽選時点から2週間以内に支給されます。` | `The prize is paid within 2 weeks of the draw.` | `เงินรางวัลจะจ่ายภายใน 2 สัปดาห์นับจากการจับรางวัล` | `獎金將於抽獎後 2 週內發放。` | ✅ 정확 |
| `bottomsheet_signup_text2` | `当選した{0} JPYCは\n2週間以内に支給されます。` | `Your {0} JPYC prize will be paid\nwithin 2 weeks.` | `รางวัล {0} JPYC ที่ได้รับ\nจะจ่ายภายใน 2 สัปดาห์` | `中獎的 {0} JPYC 將於\n2 週內發放。` | ✅ 정확 (기존 2행 구조·문형 보존, 「5분」→「2주」만 치환) |
| `info_already_member` (신규) | `すでにUnifi会員でいらっしゃいますね。` | `You're already a Unifi member.` | `คุณเป็นสมาชิก Unifi อยู่แล้ว` | `您已經是 Unifi 會員了。` | ✅ 정확 (기존 팝업 키와 문말 부호만 상이 — 원문 그대로) |
| OA① | `当選した{{total_amount}} JPYCは2週間以内に支給されます。` | `Your {{total_amount}} JPYC prize will be paid within 2 weeks.` | `รางวัล {{total_amount}} JPYC ที่ได้รับจะจ่ายภายใน 2 สัปดาห์` | `中獎的 {{total_amount}} JPYC 將於 2 週內發放。` | ✅ 정확 |
| OA② | 기존 `(OA)Reward Confirm` ③ 번역 **재사용**(동일 문구=동일 번역) | 〃 | 〃 | 〃 | ✅ 재사용 |
| OA③ | `* 他のイベントに参加するため、UnifiのLINE公式アカウントの友だちを維持してください。` | `* Stay friends with Unifi's LINE Official Account to join other events.` | `* กรุณาคงสถานะเพื่อนกับบัญชีทางการ LINE ของ Unifi เพื่อเข้าร่วมกิจกรรมอื่น` | `* 為參與其他活動，請持續保持 Unifi 的 LINE 官方帳號好友。` | ✅ 정확 (기호는 원문 `*` 유지 — §5 (d-2) 제안 참조) |
| OA④ | 기존 `(OA)Reward Confirm` ④ 번역 **재사용** | 〃 | 〃 | 〃 | ✅ 재사용 |
| OA Alt | `当選金は2週間以内に支給されます。` | `Your prize will be paid within 2 weeks.` | `เงินรางวัลจะจ่ายภายใน 2 สัปดาห์` | `獎金將於 2 週內發放。` | ✅ 변수 미사용(altText 변수 금지 준수) — §5 (d-2) 확인 요청 |

- 치환자 정합: 변경 2키의 `{0}` 개수가 5개 언어 전부 **1개로 일치**(ja `{0}}` 류 깨짐 0건). OA는 `{{total_amount}}`가 5개 언어 전부 1개.
- 이질 문자체계 혼입 0건(각 컬럼에 타 언어 문자 없음).
- 개행: `text2`는 원문 2행 구조를 5개 언어 모두 보존. `info_signup_desc`·OA는 단행.

---

## 4. (c) 검증기 보고 건별 처리 판정 — P1 53건 · P2 11건 전건

### P1 53건 — **전건 오탐**(실제 위반 0건)

> ⚠️ **수치 정정**: 초안에 기재한 54건은 `unifi_promotion_info_signup_desc`의 ja 교정(`当選報酬`→`当選金`) **직전** 실행값이었다. 교정 반영 후 실측 **53건**이며, 아래 표는 최종 엑셀(47키) 기준 재집계다. 3차 차수의 orphan 키 삭제(`mini_luckyball_already_member`)로는 P1이 변하지 않았다(그 키는 P1 0건).

| 유형(용어집 매칭 대상) | 건수 | 대표 사례 | 처리 판정 |
|---|---|---|---|
| `당첨`(win) ↔ `당첨금`(prize) **부분문자열 오매칭** | 19 | `info_signup_desc` en `The prize…`를 「'당첨'→'win' 권장」으로 보고 | **오탐** — ko `당첨 보상금`/`당첨된 …`은 상금(prize)이라 `prize`·`เงินรางวัล`·`獎金`·`当選金`이 정본. 검증기가 최장일치·단어 경계를 안 봐서 반복 보고(HANDOFF 기록된 기존 패턴) |
| `최대`→`Max`/`最多` 강제 | 12 | `unifi_promotion_jpyc_title` en `up to 50,000 JPY worth…` | **오탐** — 문장 안에서는 `up to`·`最高`가 자연스럽다. 용어집 매핑이 UI 라벨 기준으로 좁음 |
| `확인`→`check`/`ตรวจสอบ`/`查看` 강제 | 8 | `animation_btn_ok` en `Confirm` | **오탐** — 버튼 「확인(OK)」과 「확인하다(check)」는 다른 의미. 다의어 |
| `리워드 지급`→`Reward Payment` 등 | 5 | `mini_luckyball_not_eligible` en `You are not eligible for the reward.` | **오탐** — 정상 의역, 명사구 강제 시 비문 |
| `가입`→`Sign up` 강제 | 3 | `bottomsheet_signup_text1` en | **오탐** — 문장 내 동사형 활용 |
| `공식 계정`→`บัญชีทางการ` (th) | 2 | `jpyc_desc` th `บัญชีทางการ LINE ของ Unifi` | **오탐** — 이미 정본 표기를 쓰고 있는데 부분문자열로 재보고 |
| `포이카츠` zh `點數活動` 미적용 | 2 | `unifi_text8c` zh `Poi-katsu 集點活動` | **정책 보류(사용자 결정 대기)** — HANDOFF '다음 할 일' P1 기존 항목. 이번 변경 대상 아님 |
| `친구`→`friend` (en) | 1 | `jpyc_desc` en | **오탐** |
| `리워드`→`獎勵` (zh) | 1 | `unifi_text8d` zh | **오탐** — 문맥상 허용 범위, 기존 확정본 |

→ **실제 위반 0건 · 오탐 51건 · 정책 보류 2건**(보류 2건은 기존 미결 항목으로 이번 작업 범위 밖).

### P2 11건 — **전건 정상**

11건 전부 「문장형 텍스트 중 소수 스타일(마침표 있음)」이다. 이 문서의 정책은 **완결 서술문에는 마침표를 쓰고 UI 라벨·제목에는 쓰지 않는 것**이며, 보고된 11건은 모두 완결 서술문(`…지급됩니다.` · `…회원이시네요.` · `…아닙니다.`)이라 **정상**이다. 이번 신규분 3건(`info_signup_desc`·`info_already_member`·`text2`)도 같은 판정. **조치 없음.**

---

## 5. (d) 추가 개선·제안 (권장 — 사용자 결정 전 임의 적용 금지)

### (d-1) 용어집 보완 권장

- **없음.** 이번 차수에서 반복 사용된 도메인 용어(`당첨금`·`뽑기`·`공식 계정`·`럭키볼`)는 v4.1에 이미 등재돼 있고, 신규 P1도 0건이라 **등재로 해결될 오탐이 새로 생기지 않았다**.
- 참고: `당첨` vs `당첨금` 부분문자열 오탐(20건)은 **용어집 등재가 아니라 `validate_translation.py`의 최장일치·단어 경계 개선**으로만 해소된다(HANDOFF P3 기존 항목).

### (d-2) 개선·확인 제안

1. **⛔ 화면 내 정책 자기모순(최우선 확인)** — `(Promotion) Promotion page`의 「꼭 확인해 주세요」 5번째 항목이 여전히 **「당첨금은 미션 완료 시 즉시 지급되나, 네트워크 상황 및 시스템 점검에 따라 일부 지연될 수 있습니다.」** 다. 같은 화면 위쪽 `info_signup_desc`는 **「2주 이내」** 로 바뀌었으므로 **한 화면에서 지급 시점이 상충**한다. XLT 키가 부여되지 않은 텍스트라 자동으로 따라가지 않는다 → **Figma 원문 수정 필요**.
2. **기존 OA와의 관계** — `(OA)Reward Confirm`은 「당첨금 {{total_amount}} JPYC가 {{wallet_address}} 주소로 **지급되었습니다**」(즉시 지급 전제)인데, 신규 `(OA)mission complete`는 「**2주 이내로 지급됩니다**」(예정 안내)다. **두 OA가 병행 발송인지, 신규가 기존을 대체하는지** 확인 필요. 대체라면 기존 OA 행·Flex zip(v4) 처리 방침을 정해야 한다.
3. **OA Alt 문구 확인** — 신규 OA의 altText 안 `당첨금은 2주 이내에 지급됩니다.`(변수 미사용)는 Claude가 제안한 값이다. 확정·수정 여부 확인 요청.
4. **OA③ 각주 기호** — 원문 `*`를 5개 언어 그대로 유지했다. 일본어는 각주에 **`※`** 가 관례이므로 ja만 `※`로 바꾸는 안을 제안한다(표기 통일 정책 사안이라 임의 적용하지 않음).
5. **Promotion page 유의사항 8개 항목 XLT 키 미부여** — 화면에 노출되는 문장 8개에 키가 없어 번역 대상에서 빠져 있다(기존부터의 상태로 이번 변경분 아님). 다국어 서비스라면 키 부여가 필요한지 검토 권장.
6. **`unifi_promotion_info_already_member` vs `mini_luckyball_already_member`** — 문구가 마침표/느낌표만 다른 사실상 동일 문장이 두 키로 존재하게 된다(사용자가 신규 키 부여를 선택). 용도는 갈린다: 신규 키 = **프로모션 페이지 안내 영역**(info Case 4번째 케이스 · Unifi Member 화면), 기존 키 = **`(Popup) Unifi member` 팝업**. 향후 문구 변경 시 **두 키를 함께 갱신**해야 한다.
7. **`(Promotion) info Case` 4번 코멘트에 `xlt` 키 답글이 없다** — 1~3번 케이스는 답글로 키가 명시돼 있는데 4번(`이미 Unifi 회원인 경우 노출`)만 없어 키를 사용자 결정으로 부여했다. Figma 코멘트에 `xlt key = unifi_promotion_info_already_member` 답글을 달아 3자(코멘트·위키·엑셀) 정합을 맞추기를 권장한다.

---

## 5-1. (d-2) 제안에 대한 사용자 결정 (2026-08-06 — 재제안 금지)

| # | 제안 | 사용자 결정 | 이번 작업 조치 |
|---|---|---|---|
| 1 | 「꼭 확인해 주세요」 유의사항이 여전히 「즉시 지급」이라 화면 내 정책 충돌 | **주요 콘텐츠가 아직 미정.** 정리되면 콘텐츠에 XLT 키를 할당해 별도 작업 요청 예정 | **조치 없음**(현 상태 유지). 정책 충돌 재보고·Figma 수정 요청 하지 않는다 |
| 2 | 기존 `(OA)Reward Confirm`과 신규 `(OA)mission complete`의 관계 | **병행 운영 확정** — `(OA)Reward Confirm` = **당첨금이 실제 지급될 때** 발송(지급 완료 통보) / `(OA)mission complete` = **미션 완료 시** 발송(지급 예정 안내). 대체 아님 | **위키 반영 완료(v49)** — 두 OA 행 Description에 발송 시점·병행 운영 명시 |
| 3 | 신규 OA의 `IMAGE_URL`·`ACTION_URL_1` 미정 | **URL 업데이트 후 OA(Flex JSON) 생성을 별도 요청** 예정 | **미정 표기 유지**, Flex JSON 미생성 |
| 4 | OA `Alt` 문구가 Claude 제안값 | **문구 정의 후 별도 업데이트 요청** 예정 | **위키 반영(v49)** — Alt 행에 `(잠정 — 문구 정의 대기)` 표기 추가 |

## 5-2. 2차 차수 — OA 후속(Alt 번역 + Flex JSON) · 2026-08-06

사용자가 위키(v50)에 **URL 실값**과 **Alt KR 문구**를 기입해, 앞서 대기 상태였던 (d-2) 3·4번을 처리했다.

### (1a) 한국어 원문 — 교정 없음
사용자가 확정한 `미션을 모두 완료했어요.`를 그대로 사용(맞춤법·띄어쓰기 이상 없음, 변수 미사용 → `altText` 변수 금지 규칙 준수).

### 수동 3단계 — Alt 4개 언어 (OA는 XLT 키 미부여라 엑셀 검증 대상 밖 → **전건 수동**)

| 언어 | 번역 | 용어집 대조 | 판정 |
|---|---|---|---|
| ja_JP | `ミッションをすべて完了しました。` | 미션=`ミッション` · 완료=`完了` ✅ | 정확 (です・ます체) |
| en_US | `You've completed all missions.` | 미션=`mission` · 완료=`Complete` ✅ | 정확 |
| th_TH | `คุณทำภารกิจทั้งหมดเสร็จแล้ว` | 미션=`ภารกิจ` · 완료=`เสร็จ` ✅ | 정확 |
| zh_TW | `您已完成所有任務。` | 미션=`任務` · 완료=`完成` ✅ | 정확 (번체 정자) |

이질 문자체계 혼입 0건 · 변수 0개(전 언어) · 문말 부호는 ko(`.`)와 동일 정책.

### Flex JSON 5개 언어 — `md/OA.md` 규칙 3·3-1 검증

- 구조: hero(`20:13`·`cover`, action 없음) / body(타이틀 `bold`·`lg` + 하위 box `margin:md`·`spacing:sm`에 본문·각주 2 text) / footer(**버튼 1개**, `primary`·`#000000`·`height:sm`) — 화면에 「확인하기」 버튼이 없어 기존 `(OA)Reward Confirm`(버튼 2개)과 다르다.
- **URL 실값 반영**: `hero.url` = `…2fa7ce8141044e2dbff77a86136307b6.png?updatedAt=1779241283000` · `action.uri` = `…/luckyball-invite?utm_source=…&referral_code=1810_SUOJB`. **플레이스홀더 잔존 0건**.
- **3곳 세트 갱신(규칙 3-1)**: ⓐ 위키 번역 셀(Alt 4개 언어) ⓑ 언어별 JSON 5개(`oa/flex_OA_mission_complete_*.json`) ⓒ zip 첨부 — **셋 다 갱신 완료**.
- **라운드트립 검증**: 위키 첨부 zip을 **재다운로드해 압축 해제 후 5파일 전수 재검증** — hero/uri 실값 · 플레이스홀더 0 · 구 문구(`즉시`·`5 minutes`) 0 · `{{total_amount}}` 각 1개 · footer 버튼 1개. **5/5 통과**.

### 화면 삭제에 따른 정합성 — **사용자 확인 필요**

사용자가 `(Promotion) Unifi Member`(Figma 66482-9505 + 위키 행)와 **`(Popup) Unifi member` 위키 행**을 삭제했다. 그 결과:

| 항목 | 상태 | 필요한 결정 |
|---|---|---|
| `unifi_promotion_info_already_member` | **유지** — `(Promotion) info Case` 4번 케이스가 남아 있어 orphan 아님 | 조치 없음 |
| `mini_luckyball_already_member`(`이미 Unifi 회원이시네요!`) | **orphan** — Screen 표 참조 0건, 전역 번역표에만 존재 | 「화면 정의에 없는 orphan 키는 번역표에서 삭제」(2026-07-27 결정) 적용 여부 |
| 미참조 첨부 2건 `s3_LV_Promotion_Unifi_Member_66482-9505.png` · `s3_LV_Popup_Unifi_member_66048-116190.png` | 본문 참조 0건 | 삭제 승인 여부(`md/OA.md` — 사용자 승인 후 삭제) |

**임의 조치하지 않고 사용자 결정을 기다린다.**

## 5-3. 3차 차수 — orphan 키·미참조 첨부 삭제 (사용자 승인) · 2026-08-06

사용자가 `(Promotion) Unifi Member`(Figma 66482-9505 + 위키 행)와 **`(Popup) Unifi member` 위키 행**을 삭제한 결과 발생한 정합성 문제를, 사용자 승인(「1 삭제해, 2도 삭제해」)에 따라 처리했다.

| # | 조치 | 결과 |
|---|---|---|
| 1 | 전역 번역표에서 orphan 키 **`mini_luckyball_already_member` 행 삭제** | 번역표 48 → **47키 = LV 40 + UIT 7**(`unifi_promotion_` 30 · `mini_luckyball_` 9 · `mini_guidekim_` 1). 「이미 회원」 안내는 `unifi_promotion_info_already_member`로 **일원화** |
| 2 | 미참조 첨부 2건 삭제 — `s3_LV_Promotion_Unifi_Member_66482-9505.png` · `s3_LV_Popup_Unifi_member_66048-116190.png` | 둘 다 HTTP 204. 삭제 후 **첨부 22 = 본문 참조 22 · 미참조 0 · 끊긴 참조 0** |
| 3 | 엑셀 3종 재생성·재첨부(47키) | ALL v14 · LV v6 · UIT v11(파일명 유지) |
| 4 | 번역표 머리말 키 수 정정 | `48키 = LV 41` → `47키 = LV 40` |

**재검증(47키 엑셀)**: `P0 0건` · P1 53건 · P2 11건 — **48키 때와 P1/P2 목록이 완전히 동일**(삭제된 키는 P1·P2 0건이었다). 통과 기준 유지.

**History 이력 보존**: 삭제한 키 이름은 History 서술문에 2회 남아 있다(과거 변경 기록) — 이는 의도적 보존이며 값이 아니다.

## 5-4. 4차 차수 — 어노테이션 재렌더 + OA URL 갱신 · 2026-08-06

| # | 조치 | 결과 |
|---|---|---|
| 1 | **어노테이션 4건 재렌더** — `collect_frames.py` 개선본(`4bd7fa4`, 핀-글자 회피)으로 Button Case·Promotion page·Reward Confirm·info Case 재생성 → 같은 파일명 재첨부(각 **v3**) | **육안 검증**: ⓝ가 텍스트 좌측 밖으로 이동해 글자 가림 해소. Promotion page 18핀 전부 위→아래 증가·가림 0. 도구 `overlaps` 경고 2건(`text:TBD`·`text:확인`)은 육안 확인 결과 **비가시 텍스트/여백 배치라 무해** |
| 2 | **OA `ACTION_URL_1` 갱신** — `referral_code` `1810_SUOJB` → **`1813_SUOJG`** | Flex JSON 5파일 URI 교체 → 같은 파일명 zip 재첨부(**v2**). **재다운로드 라운드트립 5/5** — 신규 코드 반영·구 코드 잔존 0 |

**`md/OA.md` §3-1 3곳 세트 확인**: ⓐ 위키 Description URL(사용자 기입) ⓑ JSON 5개 ⓒ zip — 모두 동일 URL.

### 미해결 2건 (보고만, 조치 없음)

1. **Button Case ⓝ⑤가 `unifi` 로고를 가린다** — 로고가 TEXT 노드가 아니라 벡터/이미지라 `collect_frames.py`의 텍스트-회피 로직이 감지하지 못한다. 도구는 `overlaps=없음`으로 통과시켰다. **도구 개선 후보**(회피 대상에 비텍스트 노드 bbox 포함).
2. **갱신된 `ACTION_URL_1`에 빈 파라미터 `?&`가 다시 들어왔다** — `…luckyball-invite?&utm_source=…`. 2026-08-05에 사용자가 제거했던 패턴이다(HANDOFF 기록). 동작에는 영향이 없어 **위키 기입값 그대로 JSON에 반영**했다. 제거를 원하면 위키 Description 수정 후 재요청 필요.

## 6. 통과 판정

- **P0 = 0건**(자동 + 수동 전수) → ✅ 출력·위키 반영·엑셀 생성 진행 가능
- P1 53건: 오탐 51 · 정책 보류 2(기존 미결) — 조치 없음
- **최종 상태(3차 차수 반영)**: 위키 **v52** · 번역표 **47키** · 엑셀 3종(ALL v14 · LV v6 · UIT v11) · OA Flex zip `flex_OA_mission_complete_5lang.zip` 신규 첨부
- P2 11건: 전건 정상 — 조치 없음
- (d) 제안 6건: **사용자 결정 전 임의 반영하지 않음**
