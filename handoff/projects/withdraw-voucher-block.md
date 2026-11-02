# withdraw-voucher-block — Unifi 탈퇴: 활성화 전 상품권 보유 시 환불 후 탈퇴 (T254)

> 담당자: `hogeun` · 마지막 갱신: 2026-11-02 · 사이드 세션(Auto-react 메인 지시) · 위키 **v1**

## 대상 / 링크

- 위키: [pageId 4978660847](https://wiki.workers-hub.com/pages/viewpage.action?pageId=4978660847) 「Unifi 탈퇴 — 활성화 전 상품권 보유 시 환불 후 탈퇴」 — **v1**(2026-11-02 생성 · 공간 UNIFI · 사용자가 상위를 `[Hogeun]` 3910828993 → **「Unifi mini - 2뎁스 홈 버튼 헤더 · 100엔딜 노출 · 상품가 표시 변경」 4949365748**로 이동 — 하위 페이지를 모으는 상위 페이지)
- 근거: web3_planning 스레드 `C06S33UGGP9/p1793601577513989`(11-02) — 사용자 결정 A안(신규 페이지) · 활성화 전 상품권 보유 시 탈퇴 차단 + 환불 유도
- 본문 원본: Auto-react `context/wiki/put/T254_withdraw_voucher_check_draft.xml`(정본 템플릿 골격으로 감싸 생성 · 내용 무변경 · Related Docs `ri:page`에 `ri:space-key="UNIFI"`만 추가)
- 첨부 4장: Auto-react `reports/plans/assets/T254/my_withdraw_01_01_voucher_block{,_only}_{ko,ja}.png` — Figma 시안 전 기획 이미지
- XLT: Unifi · 프리픽스 `UF_` · 담당 FE **UIT** — 신규 후보 `UF_settings_delete_voucher_block_desc` · 값 변경 후보 `UF_settings_delete_notice_voucher`

## 현재 상태

위키 v1 생성 · 첨부 4장 렌더 확인 · `check_wiki_storage.py` pre/post exit 0. XLT는 후보 표기만(업로드 안 함).

## 진행 중 작업(WIP)

없음

## 다음 할 일

- [ ] 기존 위키 연계 반영(별도 승인 후): Unifi mini - My `4802744889` · Unifi mini v2.1 `4802741598` · 복구 비밀번호 없는 계정 생성 시나리오 `4743946291`
- [ ] XLT 신규 1키·값 변경 1키 확정 → 게이트 → 업로드(별도)
- [ ] Figma 시안이 나오면 기획 이미지 교체

## 세션 기록 (최신 위, 최대 5개)

### 2026-11-02 — 사이드 세션: 상위 4949365748 하위 페이지 구성
- 4949365748 본문에 T254를 직접 병합하려다 사용자 지시로 중단(PUT 안 함) — 4949365748은 하위 페이지를 모으는 페이지로 바뀐다
- 4949365748 v18 본문을 주제별로 나눠 하위 2페이지 생성(내용 변경 없음 · 첨부 복사): 「Unifi mini - 2뎁스 홈 버튼 헤더」 4980098464 v1(이미지 11) · 「Unifi mini - 100엔딜 노출」 4978661053 v1(이미지 4) · 상위 본문 정리는 아직 안 함

### 2026-11-02 — 사이드 세션: 위키 생성
- 초안 맨 위 주석 제외 · TOC 사이드바 + History 체크박스(템플릿) · 제목 레벨은 템플릿(h1 History/Related Docs/Background/Specification · h2 Policy/Flow/Screen)
