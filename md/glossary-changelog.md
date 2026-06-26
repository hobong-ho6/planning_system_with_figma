# 용어집(web3_xlt_json) 변경 이력

> Landpress CMS `web3_xlt_json` 용어집의 버전별 변경 이력.
> 용어집 **원본은 Landpress(API 읽기 전용)** 에 있어 git으로 직접 버전 관리가 안 된다. 그래서 변경의 **무엇을·언제·왜**를 이 파일로 git에서 추적한다 (관리 방법은 [`md/landpress.md`](landpress.md) 참조).
>
> ⛔ **용어집을 갱신할 때마다(전체 JSON 산출 → 사용자가 CMS에 붙여넣기) 이 파일에 항목을 추가한다.** (landpress.md 절차의 필수 단계)

| 버전 | 날짜 | terms | exceptions | 변경 요약 |
|---|---|---|---|---|
| 2.1 | 2026-05-13 | 25 | 8 | 초기 (guide.md 기반, 암호화폐 예외 USDT/IDRP/JPYC 포함) |
| 2.2 | 2026-06-26 | 29 | 8 | 도메인 용어 4종 추가: 미션·리워드·캐시백·회원가입 |
| 2.3 | 2026-06-26 | 30 | 9 | 포이카츠(term) 추가 + Unifi mini 브랜드 예외 추가 |

---

## 상세

### v2.3 (2026-06-26)
- **term 추가** `포이카츠`: ko `포이카츠` / ja `ポイ活` / en `point activity` / zh `點數活動` / th `การสะสมแต้ม`
  - ⚠️ en/zh/th는 **잠정** — `ポイ活`은 일본 고유 개념이라 타 언어 표준이 모호. 검토 후 확정 권장.
- **exception 추가** `*Unifi mini*` (id 9, brand): 전 언어 `Unifi mini` 유지
- 배경: `포이가츠→포이카츠` 표기 표준화 + `Unifi Mini→Unifi mini` 브랜드 표기 통일에 맞춘 용어집 반영. (XLT: `point_mission` ko, `bridge_notice` 전 언어 동시 갱신)

### v2.2 (2026-06-26)
- **term 추가** (4): `미션`(mission/ミッション/任務/ภารกิจ), `리워드`(reward/リワード/獎勵/รางวัล), `캐시백`(cashback/キャッシュバック/現金回饋/เงินคืน), `회원가입`(sign up/会員登録/註冊/สมัครสมาชิก)
- 배경: GuideKim 파일 검증 중 도메인 용어가 반복 사용되고 정상 의역이 P1로 반복 오탐 → 용어집 보완(게이트 d-1).

### v2.1 (2026-05-13)
- 초기 버전 (guide.md 기반 JSON). terms 25, exceptions 8 (PIN/API/URL/Apple/Google/USDT/IDRP/JPYC).

---

## 기재 규칙
- 각 항목: **버전·날짜·terms 수·exceptions 수·변경 요약** + 상세(추가/수정/삭제된 term·exception의 ko + 5개 언어, 배경).
- 버전은 의미 변경마다 올린다(term/exception 추가·수정·삭제). 표기만 미세 수정해도 기록.
- 잠정·검토 필요 값은 ⚠️로 표시한다.
