# withdraw-voucher-block — Unifi 탈퇴: 활성화 전 상품권 보유 시 환불 후 탈퇴 (T254)

> 담당자: `hogeun` · 마지막 갱신: 2026-11-04 · 사이드 세션(Auto-react 메인 지시 T259) · 위키 **v3**

## 대상 / 링크

- 위키: [pageId 4978660847](https://wiki.workers-hub.com/pages/viewpage.action?pageId=4978660847) 「Unifi 탈퇴 — 활성화 전 상품권 보유 시 환불 후 탈퇴」 — **v1**(2026-11-02 생성 · 공간 UNIFI · 사용자가 상위를 `[Hogeun]` 3910828993 → **「Unifi mini - 2뎁스 홈 버튼 헤더 · 100엔딜 노출 · 상품가 표시 변경」 4949365748**로 이동 — 하위 페이지를 모으는 상위 페이지)
- 근거: web3_planning 스레드 `C06S33UGGP9/p1793601577513989`(11-02) — 사용자 결정 A안(신규 페이지) · 활성화 전 상품권 보유 시 탈퇴 차단 + 환불 유도
- 본문 원본: Auto-react `context/wiki/put/T254_withdraw_voucher_check_draft.xml`(정본 템플릿 골격으로 감싸 생성 · 내용 무변경 · Related Docs `ri:page`에 `ri:space-key="UNIFI"`만 추가)
- 첨부: Screen = Figma 시안 `my_withdraw_01_01_voucher_block{,_only}_figma_ko.png`(11-04 · 어노테이션 빨강 정책/파랑 XLT No) · 일본어 참고 = 시안 전 기획 이미지 `…_{,only_}ja.png`(Auto-react `reports/plans/assets/T254/`) · 구 KO 기획 이미지 2장은 첨부에만 남음(본문 미참조)
- Figma: [`uyUkM7rWWg1vAwpf47um86` 78889:7788](https://www.figma.com/design/uyUkM7rWWg1vAwpf47um86/-Share--Unifi-Design?node-id=78889-7788) 페이지 「1104 - 탈퇴시 비활성화 상품권 보유한경우」 — 화면 78947:8101(전 항목) · 78947:8187(상품권만) · 코멘트 0건(11-04) · 디자인 공유 Slack `C097X2T31FE/p1793777415179199`
- XLT: Unifi · 프리픽스 `UF_` · 담당 FE **UIT** — 신규 후보 `UF_settings_delete_voucher_block_desc` · 값 변경 후보 `UF_settings_delete_notice_voucher`

## 현재 상태

위키 v3 — Figma 시안 반영(Related Docs Design · Flow 임베드 · Screen 이미지 교체 · 차단 상태 Policy 1항목 시안 기준 변경) · `check_wiki_storage.py` pre/post exit 0. XLT는 후보 표기만(업로드 안 함).

## 진행 중 작업(WIP)

없음

## 다음 할 일

- [ ] 기존 위키 연계 반영(별도 승인 후): Unifi mini - My `4802744889` · Unifi mini v2.1 `4802741598` · 복구 비밀번호 없는 계정 생성 시나리오 `4743946291`
- [ ] XLT 신규 1키·값 변경 1키 확정 → 게이트 → 업로드(별도)
- [ ] XLT 신규 후보 `UF_settings_delete_voucher_block_desc` KR이 시안 문구 「활성화 전 상품권 환불 후 탈퇴가 가능해요」로 바뀜(마침표 없음 — 확정 시 결정) · 5개 언어 번역 · 게이트는 키 확정 시

## 세션 기록 (최신 위, 최대 5개)

### 2026-11-04 — 사이드 세션 T259: Figma 시안 반영 (위키 v2 → v3)
- Figma 78889:7788(CANVAS) 직속 화면 2개 수집 · 코멘트 0건 · 시안 이미지 어노테이션 후 Screen 교체(기획 이미지 → 시안)
- 시안 ↔ 기획 차이: ① 「활성화 전 상품권」 행 강조 색 → 일반 색(차단 안내만 강조) — Policy 차단 상태 1항목 `11-04 변경` ② 차단 안내 문구 변경(신규 후보 키 KR) ③ [환불하러 가기] 위치 — 안내 옆 → 행 아래 우측 · Figma 「환불하러 하기」 ④ Figma 「환불 처리중 주문」 ⑤ 유의사항 1 마침표 없음 · 「유의사항」 붙여씀 — ③④⑤는 등록값 유지(alias)
- 정책 충돌 없음(차단 · 비활성 · 동의 불가 · 유의사항 문구는 기획과 같음)

### 2026-11-02 — 사이드 세션: 상위 4949365748 하위 페이지 구성
- 4949365748 본문에 T254를 직접 병합하려다 사용자 지시로 중단(PUT 안 함) — 4949365748은 하위 페이지를 모으는 페이지로 바뀐다
- 4949365748 v18 본문을 주제별로 나눠 하위 2페이지 생성(내용 변경 없음 · 첨부 복사): 「Unifi mini - 2뎁스 홈 버튼 헤더」 4980098464 v1(이미지 11) · 「Unifi mini - 100엔딜 노출」 4978661053 v1(이미지 4) 
- 상위 4949365748을 하위 페이지 목록 페이지로 전환(v18 → v19 · History 보존 + `children` 매크로 · 전환 전 본문은 v18)

### 2026-11-02 — 사이드 세션: 위키 생성
- 초안 맨 위 주석 제외 · TOC 사이드바 + History 체크박스(템플릿) · 제목 레벨은 템플릿(h1 History/Related Docs/Background/Specification · h2 Policy/Flow/Screen)
