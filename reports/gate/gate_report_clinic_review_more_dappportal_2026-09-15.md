# 번역 품질 게이트 리포트 — `UF_clinic_detail_review_more` Dapp Portal 키스페이스 등록 (unifi-mini-v2)

- **작업일**: 2026-09-15 · **요청**: Slack web3_dev An Vo(LV) 14:47 "please help me register the xlt `UF_clinic_detail_review_more`"
- **대상**: 위키 `Unifi mini v2.0` v197 › `클리닉 상세 - 리뷰 더보기` XLT 표 No 1 (`더보기`, 노출 조건 「리뷰 3개 이상」 2026-09-15 확정)
- **담당 FE 팀**: **LV** — LV가 읽는 키스페이스는 **Dapp Portal / WEB BROWSER** (`UF_` 키 256건이 Dapp Portal에 존재 · 09-13 `UF_clinic_detail_point_*` 6키도 Unifi 값을 Dapp Portal로 복사한 선례)
- **조달**: XLT 레지스트리 **신규 조회 2026-09-15 15:15** — `Unifi v1.7.9`(2,569키) · `Dapp Portal v2.6.1`(1,696키) · 용어집 API v5.5 (캐시 미사용)
- **산출물**: `xlt/xlt_clinic_review_more_dappportal_20260915.xlsx` (1키 → **Dapp Portal 업로드**)
- **검증 범위**: **전체 행 전수 점검** — 전체 파일 1키 × 5개 언어 = **5셀 전건** 수동 검토

---

## 0. 판정 근거 — 왜 신규 번역이 아니라 복사인가

| 키스페이스 | `UF_clinic_detail_review_more` | 값 |
|---|---|---|
| Unifi v1.7.9 | **등록됨** | 더보기 / もっと見る / See more / ดูเพิ่มเติม / 更多 |
| Dapp Portal v2.6.1 | **없음** | — |

An Vo가 "등록해달라"고 한 이유는 LV 앱이 Dapp Portal을 읽기 때문이다. Unifi 등록값 5개 언어를 **그대로 복사**한다(시스템이 값의 정본 · 임의 재번역 금지 · 서비스 간 값 분기 방지). 변수 없는 문구라 `{{0}}`/`{0}` 규칙 영향 없음.

## 1a. 한국어 원문 교정 — 0건

원문 `더보기`는 등록값·위키·Figma 마커가 동일. **alias 없음.**

## (a) 자동 검증 요약 — `validate_translation.py xlt/xlt_clinic_review_more_dappportal_20260915.xlsx scripts/glossary.json`

| 심각도 | 건수 |
|---|---|
| 🔴 **P0** | **0건** |
| 🟡 P1 | 1건 |
| 🟢 P2 | 0건 |

## (b) 수동 3단계 체크표 — 전체 행 전수 (1키 × 5언어)

### 1단계 — 한국어 원문
| 항목 | 판정 |
|---|---|
| 맞춤법·띄어쓰기 | `더보기` 단일어 — 정상 ✅ |
| 표기 일관성 | Unifi 등록값 `UF_send_select_type_list_more`와 동일 ✅ |

### 2단계 — 용어집 대조
용어집 v5.5 「더보기」 = ja `もっと見る` · th `ดูเพิ่มเติม` · zh `更多` **일치**. en은 용어집 `View More` vs 값 `See more` — **아래 (c) 참조**.

### 3단계 — 다국어 의미·표현 (전 5셀)
| 언어 | 값 | 판정 |
|---|---|---|
| ko_KR | 더보기 | ✅ |
| ja_JP | もっと見る | 용어집 일치 ✅ |
| en_US | See more | Unifi 등록값 그대로 · UI 버튼 관례 ✅ |
| th_TH | ดูเพิ่มเติม | 용어집 일치 ✅ |
| zh_TW | 更多 | 용어집 일치 · 번체 ✅ |

언어 혼입·빈칸·placeholder 이상 없음.

## (c) P1/P2 각 건 처리 판정

| 건 | 판정 | 사유 |
|---|---|---|
| P1 `UF_clinic_detail_review_more` en `더보기 → View More 권장` | **오탐 · 현행 유지** | Unifi 키스페이스의 **같은 키 등록값이 `See more`**다. 같은 키가 서비스마다 다른 값을 갖는 분기를 만들지 않는 것이 우선(`md/translate.md` Step 2-1 ⓑ 「번역도 등록값을 그대로」). 용어집 en `View More`는 Dapp Portal 구 키(`Apps_USDT_Reward_More`) 계열 표기 |

## (d) 추가 개선·제안 (권장 — 임의 적용하지 않음)

### (d-1) 용어집 보완 권장
없음. 「더보기」는 이미 등재(v5.5). en 정본이 `View More`인데 Unifi 실사용은 `See more` 2키(`UF_clinic_detail_review_more`·`UF_send_select_type_list_more`) — 등재값 ≠ 실사용의 알려진 유형이라 **backlog 등재 대상 아님**(형제 키 실사용 우선 규칙).

### (d-2) 추가 개선·제안 안내
1. **같은 유형의 누락이 2키 더 있다** — `UF_clinic_detail_review_title`·`UF_clinic_detail_header_review`도 **Unifi에만 등록, Dapp Portal 없음**(2026-09-15 실측). 클리닉 상세(LV) 화면 키이므로 An Vo가 다음에 같은 요청을 할 가능성이 높다. **이번 업로드에 함께 담을지 사용자 결정** 필요(담으려면 엑셀 재생성 3키).
2. **위키 다국어 표에 이 키의 6컬럼 행이 없다**(Screen XLT 표에만 있음) — 이번 위키 반영에서 행을 추가한다.

## 통과 판정

| 기준 | 결과 |
|---|---|
| 자동 P0 | **0건** ✅ |
| 수동 P0 | **0건** ✅ |
| P1 처리 판정 | 1건 오탐 판정 완료 ✅ |
| (d) 임의 적용 | 없음 ✅ |

→ **게이트 통과.** Dapp Portal 업로드(사용자) + 위키 다국어 표 행 추가로 진행한다.
