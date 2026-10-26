# oliveyoung-friend-flow — 올리브영 상품권 LINE 친구추가 동선 (동선 A·B)

> 담당자: `hogeun` · 마지막 갱신: 2026-10-26 · 사이드 세션(메인 local_e86618f9) · 위키 **v1**

## 대상 / 링크

- 위키: [pageId 4949348987](https://wiki.workers-hub.com/pages/viewpage.action?pageId=4949348987) 「올리브영 상품권 LINE 친구추가 동선」 — **v1**(2026-10-26 생성 · 상위 `[Hogeun]` 3910828993)
- Figma: `GOCHAYBS7hIrmWRGNuJOKV` 페이지 「올리브영」 `80767:536` — SECTION 「동선 A」 `80767:633`(진입 시 친구추가) · 「동선 B」 `80767:2129`(결제 후 친구추가)
- XLT: Unifi(WEB BROWSER `{{0}}` + IPHONE `{0}`) · 프리픽스 `UF_voucher_oliveyoung_` · 담당 FE **UIT**
- 엑셀(Auto-react `xlt/`): `xlt_UIT_Unifi_voucher_oliveyoung_8keys_20261026.xlsx` · `xlt_UIT_Unifi_IPHONE_voucher_oliveyoung_8keys_20261026.xlsx` — 위키 첨부
- 게이트 리포트: Auto-react `reports/gate/gate_report_20261026_oliveyoung_friend_flow.md`

## 현재 상태

Flow 2개(섹션 임베드) + Screen 4행(코멘트 달린 프레임만 — `voucher_detail_oliveyoung_01` 80767:1081 · `payment_complete_pay_more_01_01` 80767:638 · `payment_complete_oa_01` 80767:3409 · `voucher_detail_oa_link_01_01` 80767:2488). XLT 신규 8키(게이트 P0 0 · 원장 pending) + 재사용 2키(`UF_voucher_oa_receive_title`·`_btn`). Screen ID 4개 사용자 승인 · IA.md 등재.

## 진행 중 작업(WIP)

없음

## 다음 할 일

- [ ] 신규 8키 시스템 등록(사용자) → 레지스트리 대조 후 원장 `uploaded`/`verified`
- [ ] (d-2) 3409 타이틀 `{{0}}`=상품명이면 「올리브영 상품권 1만원권」처럼 금액이 붙을 수 있음 — FE·디자인 확인 · 매장명 `{{0}}` 다국어 값 제공 여부 확인
- [ ] Figma 「추가구매」 띄어쓰기 원본 수정 요청(디자이너)

## 세션 기록 (최신 위, 최대 5개)

### 2026-10-26 — 사이드 세션: 위키 생성
- 코멘트 10건 전부 `xlt` 마커(1건은 정책 동반) · 팝업 겹침 2건(1081·3409) 좌표 매칭 오류를 육안 교정
- 섹션 밖 page 앵커 코멘트 2건(`{x:0,y:0}` · 「신규 추가 화면」·「선택 시, 지갑 생성 화면으로 이동」)은 노드 미지정이라 제외
