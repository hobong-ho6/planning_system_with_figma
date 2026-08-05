# 위키 전 프레임 정책 감사 — JPYC 럭키볼 시즌 3

- **대상**: Confluence `4541588845` (JPYC 럭키볼 시즌 3) **라이브 v41**
- **일자**: 2026-08-05 (세션 #8)
- **범위**: Screen 표 **전 16프레임** (UIT 2 · LV mini 2 · Promotion Page 6 · Popup 5 · OA MSG 1)
- **방식**: Figma 코멘트 스레드(파일 `GOCHAYBS7hIrmWRGNuJOKV`, 페이지 `65923:2485`, **작업 시점 재조회** — 파일 전체 892건 중 프레임별 필터) ↔ 위키 Description(B)·XLT 컬럼(C) 1:1 대조. `wiki-policy-auditor` 에이전트 4회(읽기 전용) + 메인 검증.
- **결과**: **위키 결함 확정 1건 · 확인 필요 5건 · Figma 원문 수정 요청 7건**. 번호 체계 어긋남 **0건**, 답글 누락 **0건**.

---

## 0. 감사 도구 결함 2건 (이번 회차에서 발견·보정)

향후 같은 감사를 돌릴 때 재발하므로 먼저 기록한다.

| # | 결함 | 증상 | 보정 |
|---|---|---|---|
| 0-1 | **중첩표에서 행 분리가 끊김** — `<tr>(.*?)</tr>` 비탐욕 매칭이 XLT 셀의 중첩표 안쪽 `</tr>`에서 종료 | XLT 컬럼(C)이 **16프레임 전부 공란**으로 추출됨 → 에이전트 3건이 모두 "XLT 상충 판정 불가"로 보고 | 태그 깊이 추적으로 **최상위 `<tr>`/`<td>`만** 분리하도록 교체. 재추출 후 16행 전부 정상(`xlt_rows` 2~14) |
| 0-2 | **`<ol><li>` 자동 번호가 텍스트 추출에서 소실** | Description 1번 항목이 `<ol><li>`로 작성돼 있으면 번호가 사라져 **"번호 누락" 오탐** 발생 (`(LIFF)Unifi - Login x`에서 실제 발생) | 렌더 기준 번호로 재확인 → **번호 결함 0건**으로 정정. 리스트 마크업 항목은 `N.` 라벨이 없어도 정상 |

> **교훈**: 위키 storage를 정규식으로 파싱할 때 **중첩표·리스트 마크업**을 고려하지 않으면 "위키에 없다"는 **거짓 결함**이 대량 생성된다. 이번엔 에이전트 3건이 동일하게 오판했다 — 다수 일치가 정답의 근거가 되지 않는다.

---

## 1. 위키 결함 — 확정 1건

### 1-1. `(Promotion) Reward Confirm Bottom Sheet` (66048-115343) — 요약문의 노출 시점이 Figma와 상충

| 구분 | 내용 |
|---|---|
| **Figma(A) 1번** | `프로모션 페이지 또는 플로팅 버튼을 통해 Unifi 회원가입을 **시작하고** Unifi 공식계정 친구추가가 되어 있는 상태에서 노출` |
| **위키(B) 요약문** | `회원가입 **완료 후** 당첨금 지급을 안내하는 Bottom Sheet다.` |
| **위키(B) 1번 정책** | (Figma 원문대로) `회원가입을 시작하고 … 노출된다.` |

같은 셀 안에서 **요약문과 1번 정책이 서로 다른 시점**을 말한다. 요약문을 `회원가입 시작 후 …`로 맞추면 해소된다. **사용자 확인 후 반영** (요약문은 위키 작성자 문장이라 기획 의도가 "완료 후"일 가능성도 있다).

---

## 2. 확인 필요 — 5건 (임의 수정 금지)

### 2-1. `(Promotion) User status case` (66022-115246) No 4 — XLT 키가 No 3과 완전 중복

| 구분 | 내용 |
|---|---|
| **Figma(A) 4번** | `Unifi 회원가입 된 경우, 버튼은 비활성화 상태이고 xlt key= unifi_promotion_**jpyc_**info_btn1` |
| **위키(C) No 4** | `unifi_promotion_info_btn1 \| 완료` — **No 3과 키·KR이 완전히 동일** |

`gate_report_season3_uit_5keys.md:245`에 **"신규 등록 vs 기존 키 재사용" 결정이 미결**로 기록돼 있고, 현재 v41은 그 표시 없이 재사용 상태다. **재사용 확정 → Figma 코멘트 수정 / 별도 키 확정 → 위키 No 4 수정.** 어느 쪽이든 한쪽은 고쳐야 한다.

### 2-2. Bottom Sheet 노출 조건이 **Figma 코멘트끼리** 정반대

- `User status case` A1: 공식계정 친구추가 **안 된** 경우 → 친구추가 페이지가 Bottom Sheet로 노출
- `Reward Confirm Bottom Sheet` A1: 공식계정 친구추가가 **되어 있는** 상태에서 노출

위키는 두 프레임의 Figma 원문을 각각 충실히 옮겼으므로 **위키 결함이 아니다.** 같은 Bottom Sheet를 두 용도로 재사용하는지 기획 확인 필요.

### 2-3. `(Promotion) Promotion page` 하단 「시즌 2 유의사항」 + 첨부 이미지

시즌3 문서 Description 말미에 `<p>시즌 2 유의사항</p>` + `image-2026-8-5_9-53-29.png`가 번호 없이 붙어 있다. Figma 코멘트에 근거가 없다(사용자가 참고용으로 붙인 것으로 추정). **의도된 참고 자료면 유지, 잔재면 삭제.**

### 2-4. `100% 당첨! 최대 15만엔` ↔ `최대 5만엔` 병기

`UF_home_jpyc_banner_title`(홈 배너) = `최대 15만엔 상당` / Promotion page No 2 = `최대 5만엔 상당`. 산술적으로는 정합(1회 최대 5만 × 최대 3개 = 15만)이나 **같은 문형의 숫자가 갈려 사용자 혼동 소지**. 병기 의도 확인 권장.

### 2-5. OA `ACTION_URL_1`에 **개인 추천 코드 고정값**

```
…/luckyball-invite?&utm_source=unifi_oa_alarm&…&utm_term=event22&referral_code=1810_SUOJB
```

- `referral_code=1810_SUOJB` — 특정 사용자 추천 코드가 **고정값으로 박혀 있다.** 프로덕션 발송 시 **전 수신자가 이 사람의 추천 코드로 유입**된다.
- 쿼리가 `?&`로 시작해 **빈 파라미터**가 하나 붙어 있다.
- ※ HANDOFF P1 ⓕ(라벨↔목적지 불일치)·ⓖ(⑤ 추적 파라미터 없음)와 같은 URL 건이지만, **고정 referral_code는 이번 감사에서 새로 확인**됐다.

---

## 3. Figma 원문 수정 요청 (디자이너) — 7건

| # | 프레임 | 현재 (Figma) | 요청 |
|---|---|---|---|
| 3-1 | `(Promotion) Button Case` 3번 답글 | `xlt = unifi_promotion_jpyc_btn1` | → `unifi_promotion_jpyc_btn_signup` (구버전 키. 등록값 `약관 동의하고 보상 받기`로 화면 문구와 상이 — `gate_report_season3_uit_5keys.md:188·273·338`) |
| 3-2 | `(Promotion) Promotion page` 12번 | `xlt = unifi_promotion_unifi_text8a` | → `unifi_promotion_**jpyc_**unifi_text8a` (두 키 모두 등록돼 있고 값이 다름. 이 프레임 문구는 `JPYC 입금하는 방법` = `jpyc_` 접두 키 — `gate_report_season3_screen_reconcile.md:352-355`) |
| 3-3 | `(Promotion) Reward Confirm Bottom Sheet` 3번 | `팃` | → `xlt` (**한글 IME 켠 채 `xlt` 입력**: x→ㅌ, l→ㅣ, t→ㅅ). 자동 파이프라인이 정책 루트로 오분류한다 |
| 3-4 | `(Unifi mini) - Login x` 2번 | 코멘트에 xlt 마커 없음 | → `xlt = UF_home_skyflag_title` 추가 (위키에는 이미 매핑돼 있으나 Figma로 검증 불가) |
| 3-5 | `(Unifi mini) - Login x` 3번 | 코멘트에 xlt 마커 없음 | → `xlt = UF_home_daily_mission_title_MINI` 추가 |
| 3-6 | 프레임명 2건 | `(Promotion) Has no DA Score` · `(Promotion) Abuser` | → `(Popup) …` (실제로는 팝업. 근거: `Abuser`는 코멘트가 스스로 `Abuser popup 화면`이라 명시 / xlt 구성이 본문+단일 `confirm` 버튼 = 팝업 패턴 / node-id가 팝업 대역 `66048-*`) |
| 3-7 | `(Promotion) Has no DA Score` | 정책 코멘트가 `DA Score x 화면.` 한 줄 | 화면 실제 문구는 `리워드 지급 검증 중`·`내일 다시 시도`인데 정책 근거가 없다 → **정책 코멘트 보완 요청** (위키를 추측으로 채우지 않음) |

> ※ 기존 P2 이월 건: **`(OA)Reward Confirm` 프레임 코멘트 0건** — 이번에도 동일. `md/OA.md` 규칙상 OA는 URI·발행 결과가 출처라 결함은 아니나, 정책 근거가 Figma에 없다.

---

## 4. 정합 확인 (결함 0건)

- **번호 체계 A→B→C 3자 일관**: 13프레임 완전 일관 · 2프레임 부분(`(LIFF)Unifi - Login x`는 B측 마크업 차이 / `(Unifi mini) - Login x`는 A측 마커 부재) · 1프레임 해당 없음(OA). **번호 어긋남 0건.**
  - 확인된 관행: A의 y순 통합번호가 **정책 루트 → Description(B)**, **순수 `xlt` 마커 루트 → XLT 컬럼(C)** 로 분할 배정된다. `md/wiki.md:260`은 `N. xlt`를 Description에도 남기라고 하나, 이 페이지는 16프레임 전부 일관되게 생략하고 **C에 번호를 보존**한다 → **규칙 문서와 관행이 갈린 상태**(§5 참조).
- **답글 누락 0건** — 답글이 있는 스레드 4건(Promotion page 11번, User status case 1번, info Case 1~3번, Button Case 3번) 모두 반영. **URL 4개 문자 단위 일치.**
- **완전 정합 프레임**: `(Promotion) Draw Done` · `(Promotion) info Case` · `(Promotion) User status case`(번호·정책) · Popup 5종 전부 · `(Unifi mini) - Login x`(정책) · `(Unifi mini) - Logged in`(키).
- **키 대조**: 누락 1(2-1) · 오기 3(3-1·3-2 + 2-1) · 잉여 0. 공유 키(`mini_luckyball_confirm`·`missions_promo`·`go_home`·`unifi_promotion_animation_btn_ok`)는 규칙상 정상 재사용.

### 위키 전용 정책(Figma 근거 없음) — 결함 아님, 단일 출처가 아님을 기록

- `(LIFF)Unifi - Login x`: 배너 노출/조기종료/JP 한정 4문장 · 당첨자 목록 상세 규칙 전체(닉네임 마스킹 자릿수 · 5초 · 상위 10명 · 등수별 금액 4등 100 / 3등 1,000 / 2등 10,000 / 1등 50,000 JPYC)
- `(Unifi mini) - Logged in`: `프로모션이 종료되면 배너가 노출되지 않는다`

→ **Figma가 바뀌어도 감지되지 않는 영역**이다. 다음 회차 감사에서 같은 항목이 반복 보고되지 않도록 여기에 기록해 둔다.

---

## 5. 규칙 문서와 관행의 불일치 — 사용자 결정 요청

`md/wiki.md:260`: *"순수 `xlt` 마커 루트도 통합 번호를 부여해 Description에 `N. xlt`로 함께 포함"*

시즌3 페이지 **16프레임 전부**가 이를 생략하고 XLT 컬럼(C)에만 번호를 남긴다. 번호 체계는 3자 간 정합하므로 **실질 문제는 없다.** 둘 중 하나로 정리 필요:

- **ⓐ 관행을 정본화** → `md/wiki.md:260` 수정 (`xlt` 마커는 XLT 컬럼에만 번호를 남긴다)
- **ⓑ 규칙을 정본화** → 시즌3 16프레임 Description에 `N. xlt` 행 일괄 추가 (약 30건)

**권장은 ⓐ** — Description은 정책을 읽는 곳이고 키는 XLT 컬럼이 담당하므로, 현재 관행이 더 읽기 좋다.
