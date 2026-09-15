# LPC 콘텐츠 소실 — 원인 규명 및 복구 기록 (2026-09-15)

## 1. 사고 요약

2026-09-14 작업 중 **LPC 콘텐츠 4개 필드가 beta·prod 양쪽에서 `null`** 이 됐다. FE가 읽는 공개 조회 API 기준이라 화면 영향 가능성이 있었다.

| 컬렉션 · 필드 | 범위 |
|---|---|
| `shopping_guide.guide_page` | 3브랜드 × 5개 언어 × 2환경 |
| `voucher_product.voucher_detail` (LV) | 4브랜드 × 5개 언어 × 2환경 |
| `voucher_product.my_voucher_detail` (LV·UIT) | 4브랜드 × 5개 언어 × 4프로젝트 |
| `k_pick_clinic_common_info.clinic_detail_common` | 5개 언어 × 2환경 |

## 2. 원인 — PUT은 문서를 통째로 교체한다

**`PUT .../items/{postId}?locale={loc}`은 부분 갱신이 아니라 전체 교체이고, body에 없는 콘텐츠 필드는 `null`이 된다.**

| 증거 | 내용 |
|---|---|
| ⓐ | `uid`를 `VOUCHER_*`로 전환한 컬렉션 **2개가 정확히** 소실(`shopping_guide`·`voucher_product`) — uid만 담은 PUT |
| ⓑ | 클리닉은 **같은 항목의 형제 필드**가 갈렸다 — `clinic_menu` 정상(6,017B) / `clinic_detail_common` null. `clinic_menu`만 담은 PUT |
| ⓒ | 콘텐츠 필드가 **1개뿐인 컬렉션 6개는 전부 무사** — 어떤 PUT이든 그 필드를 포함하므로 |

⚠️ **리비전 이력이 없다** — `/revisions`·`/histories`·`/versions` 404, `/audit-logs`는 **GET 이벤트만** 기록(2,500건 전수 확인). CMS만으로는 복구 불가였고, **저장소 `landpress/` 산출물(5개 언어)** 이 유일한 복구원이었다.

→ 재발 방지 규칙은 `md/landpress.md` **§10-3-0** 에 신설(read-modify-write 강제 · 커밋 `e06866f`).

## 3. 복구 수행

- 대상 **120건**(항목·로케일 단위 PUT) = 필드 쓰기 **160건**
- 안전장치 3중: ① 값이 있는 필드는 skip ② 살아 있는 형제 필드는 읽어서 함께 전송 ③ 건마다 재조회 대조
- 실행: Claude 직접 복구 6건 + 사용자 콘솔 스크립트 실행(복구 61 · skip 9 · 형제 필드 보존 `kept=true` 전건)
- 스크립트의 `실패 50건`은 **`JSON.stringify` 키 순서 비교로 인한 오탐**이었다(값은 정상) — 순서 무관 비교로 재검증해 확인

### 추가 발견 — LV beta `en_US` 3건에 한국어 잔존 초안

`shopping_guide` LV beta의 `en_US` 3건(CU·올리브영·다이소)이 **한국어 내용 + `targetUrl: https://example.com/cu` placeholder** 상태였다. 값이 비어 있지 않아 스크립트가 건너뛰었고(`이미채워짐` 9건 중 3건), 영어 원본으로 덮어썼다. prod의 `en_US`는 정상이었다.

## 4. 검증 결과 (공개 조회 API — FE가 실제로 읽는 경로)

```text
검증 160건 — ✅ 일치 160 · 🔴 null 0 · ⚠️ 불일치 0 · ❓ 항목없음 0
전 컬렉션 콘텐츠 필드 280개 점검 — null 0건
LV beta  clinic_menu=6,017B · clinic_detail_common=2,829B
LV prod  clinic_menu=6,017B · clinic_detail_common=2,829B
```

- 4프로젝트 × 8컬렉션 × 5개 언어 전수에서 **`null` 0건**
- 형제 필드 `clinic_menu` **보존 확인**(6,017B, 사고 전과 동일)
- 전 항목 `published: true`

검증 재현: `python3 scripts/restore/verify_landpress_restore.py`

## 5. 관리 범위 — 위키 정의가 정본 (2026-09-15 사용자 확정)

**LPC 관리 대상은 위키 [pageId 4727978725](https://wiki.workers-hub.com/pages/viewpage.action?pageId=4727978725)에 정의된 컬렉션·필드뿐이다.** 실측에서 더 발견돼도 관리 대상이 아니며 위키에 추가하지도 않는다.

### 실측 매트릭스 (2026-09-15 · 공개 조회 API)

| 컬렉션 | LV beta | LV prod | UIT beta | UIT prod |
|---|---|---|---|---|
| `category_promotion_banner` | 1건×5 | 1건×5 | — | — |
| `k_pick_clinic_common_info` | 1건×5 | 1건×5 | (범위 밖) | (범위 밖) |
| `mini_common_info` | 1건×5 | 1건×5 | — | — |
| `my_common_info` | — | — | 1건×5 | 1건×5 |
| `payment_common_info` | — | — | 1건×5 | 1건×5 |
| `shopping_guide` | 3건×5 | 3건×5 | — | — |
| `voucher_common_info` | 1건×5 | 1건×5 | — | — |
| `voucher_product` | 4건×5 | 4건×5 | 4건×5 | 4건×5 |

존재하는 모든 조합이 **전건 × 5개 언어 · `null` 0 · `published: true`** 다.

### 범위 밖으로 확정한 것

**UIT `k_pick_clinic_common_info`** — 필드 `cautions`·`change_cancel`·`faq`·`process`·`voucher`. LV 동명 컬렉션(`clinic_menu`·`clinic_detail_common`)과 **스키마가 다른 별개**이고 위키에 정의가 없다. **이번 복구는 이 컬렉션을 건드리지 않았다**(복구 대상 10건은 전부 LV beta·prod의 `clinic_detail_common`). 읽기 검증에만 포함됐다.
