# 100yen-travel-entry — 100엔딜 페이지 내 여행 일정 등록 이벤트 진입 동선 (바텀시트 · 배너)

> 담당자: `hogeun` · 마지막 갱신: 2026-11-11 · 사이드 세션(Auto-react 메인 · 일감 T275) · 위키 **v1**
> ⛔ 먼저 알 것: Screen ID는 100엔딜 위키(4725963532)의 기존 `promotion_100yen_detail_used_01`·`_02`를 그대로 쓴다(새 디자인이 그 화면을 대체) · XLT는 **미등록**(업로드는 메인이 사용자 승인 후)

## 대상 / 링크

- 위키: [pageId 5035167565](https://wiki.workers-hub.com/pages/viewpage.action?pageId=5035167565) 「100엔딜 페이지 내 여행 일정 등록 이벤트 진입 동선」 — **v1**(2026-11-11 생성 · 상위 `[Hogeun]` 3910828993)
- Figma: `uyUkM7rWWg1vAwpf47um86` SECTION 「방한 일정 프로모션 진입 동선 추가 (100엔딜 페이지 내)」 `80891:1473` — 「페이지 진입시」 바텀시트 `80891:1048` · 「페이지 내 배너」 `80891:674` · 「기존」 2화면은 비교용 · 코멘트 0건
- XLT: Unifi(WEB BROWSER + IPHONE · 변수 없어 공용 1파일) · 프리픽스 `UF_100yen_travel_` + `UF_100yen_coupon_used_notice` · 담당 FE **UIT**
- 엑셀: `~/Downloads/xlt_UIT_Unifi_WEB_IPHONE_공용_t275_100yen_travel_coffee_7keys_20261111.xlsx`(= PS `xlt/xlt_output_20261111170137.xlsx` · 위키 첨부) — 원장(`xlt_batch add`) 미등록
- 게이트 리포트: Auto-react `reports/gate/gate_report_20261111_t275_100yen_travel_coffee.md`(P0 0 · P1 3 오탐 · exit 0)
- 연관: 이동처 = 여행 일정 등록 이벤트(4964266842 · [travel-schedule-event](travel-schedule-event.md)) · 기존 화면 = 100엔딜(4725963532 · [100yen-deal](100yen-deal.md))

## 현재 상태

| 영역 | 상태 |
|---|---|
| 위키 | v1 — Background · Policy(노출 대상 · 바텀시트 · 배너 · 이동처 URL 3종) · Flow 임베드 · Screen 2행 · 다국어 9키 · 확인 필요 5건 |
| XLT | 신규 7키 5개 언어(게이트 통과) · 재사용 2키(`UF_100yen_coupon_used_title` · `UF_main_bottom_usdt_plus_dismiss_btn`) · 미업로드 |
| 브랜드 | ko 「메가커피」 → 등록값 「메가MGC커피」 alias · ja는 등록 선례대로 시트 「MGC アメリカーノ」 / 배너 「MEGA COFFEE」 — 용어집 미수록(대기 목록 등재 후보) |

## 진행 중 작업(WIP)

없음

## 다음 할 일

- [ ] XLT 7키 원장 `add` · 시스템 등록(메인 · 사용자 승인) → WEB · IPHONE 라이브 대조
- [ ] 위키 「확인 필요」 5건 회신 — prod URL · 웹(IAB) 이동처 · 노출 제외 조건(등록 완료자 · 1/27 마감 후) · 타이틀 키 분리 · 기존 키 미사용
- [ ] 100엔딜 위키(4725963532) used_01 · _02 행을 새 디자인으로 갱신할지 사용자 확인
- [ ] (d-1) 「메가MGC커피」 용어집 대기 목록 등재 — `md/**` 레인 대상이라 메인 확인 후

## 세션 기록 (최신 위, 최대 5개)

### 2026-11-11 — 사이드 세션(T275): 위키 생성
- Figma REST(키체인 figma-pat)로 텍스트 · 이미지 · 코멘트 조회 · 레지스트리 3종(Unifi WEB · IPHONE · Dapp Portal) 실조회 · 대기 키 대조 0건
- 유사 키 히트는 전부 Dapp Portal LV `mini_promotion_travel_*` — 서비스 · 팀이 달라 신규 `UF_` 키로 두고 번역 문형만 맞춤
