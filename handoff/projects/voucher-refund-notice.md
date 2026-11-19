# voucher-refund-notice — 상품권 미활성 환불 고지 위치 지도 (T278)

> 담당자: `hogeun` · 마지막 갱신: 2026-11-19 · 사이드 세션(Auto-react 메인 지시 T278)

## 대상 / 링크

- 위키: [pageId 5072864618](https://wiki.workers-hub.com/pages/viewpage.action?pageId=5072864618) 「상품권 미활성 환불 — 사용자 고지 위치 지도 (XLT · LPC · OA)」 — **v1**(부모 `[Hogeun]` 3910828993 · 사용자 선택)
- 정본: Redeem(바코드 활성화) 정책 `4853251770` v51 · 문구 확정 대장 `4869042600` v18
- 산출물: Auto-react `reports/research/T278_voucher_refund_notice_20261119/`(page.xml · build_page.py · xlt_keys.json · lpc_rows.json)

## 현재 상태

11-19 라이브 조회(XLT Dapp Portal WEB · Unifi WEB · IPHONE / LPC LV·UIT × beta·prod / OA LV prod)로 XLT 43키 · LPC 16행 · 지도 23행 · 불일치·누락 9건(M-1~M-9) 정리. `check_wiki_storage.py` pre · post exit 0. 문구는 고치지 않았다(조회 전용).

## 진행 중 작업(WIP)

없음

## 다음 할 일

- [ ] 불일치·누락 M-1~M-7 처리 여부 사용자 결정(각각 별도 승인 — XLT · LPC · OA · 정본 위키 쓰기)
- [ ] OA beta(`oam_message_task_multi`)는 공개 조회 403이라 미대조 — 필요 시 CMS 로그인 조회
