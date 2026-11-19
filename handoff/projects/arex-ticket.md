# arex-ticket

> 담당자: hogeun · 마지막 갱신: 2026-11-19 · Auto-react 지휘 세션의 사이드 세션 · 마지막 커밋: 이 파일을 추가한 커밋

## 대상 / 링크

- 기획 정본(정준영 · 남의 페이지 — 본문 수정 안 함): [AREX 공항철도 동선 제공](https://wiki.workers-hub.com/pages/viewpage.action?pageId=5043902344) `5043902344` — 11-19 확인 v75
- 하위 신규 1: [AREX 조사 리포트 (11-19)](https://wiki.workers-hub.com/pages/viewpage.action?pageId=5071419749) `5071419749` — **v1**
- 하위 신규 2: [AREX 예약발매 API 가이드 v2.1 분석 — Unifi 정책 대조](https://wiki.workers-hub.com/pages/viewpage.action?pageId=5072857358) `5072857358` — **v1**
- 하위 신규 3: [AREX 화면별 Admin 콘텐츠 설정](https://wiki.workers-hub.com/pages/viewpage.action?pageId=5072857588) `5072857588` — **v3** · Screen 표 1개(AREX - Detail · AREX - Guide · Figma `GOCHAYBS7hIrmWRGNuJOKV` node `84407-136`) · 4열 `Admin`(No · collection `AREX` · key) · 항목별 JSON은 Description 펼치기 · key·JSON은 사용자가 채움
- 하위 신규 4: [AREX LINE OA 메시지 ID 정리](https://wiki.workers-hub.com/pages/viewpage.action?pageId=5072858062) `5072858062` — **v2** · OA 5건(Figma `78988-3814`) · Screen 표 1개 + 「OA 등록 현황」 표 1개(LPC postId · LIAM msg ID × beta/prod — 사용자가 채움)
- 원본: Auto-react `reports/research/arex_timeline_20261119.md` · API 가이드 PDF v2.1(36쪽, 위키 `5035185824`에 첨부)
- 관련: [UNIFY-13718](https://jira.workers-hub.com/browse/UNIFY-13718) · 기존 API 정리 `5035185824` · FE API 정리 `5059914396` · 정책 비교 `5049820028`
- 출시: Unifi AREX 11/25(수)

## 현재 상태

하위 위키 2개 v1 생성(11-19 · 사용자 승인 후). 두 페이지 모두 렌더 확인 결과 Unknown macro 0건, 부모 하위 목록에 노출됨. 본문은 기본색(검정)이고, History PIC는 「Claude 자동 생성 (요청: 김호근)」. 분석 페이지 9절 대조 결과: 가능 10 · 우회 4 · AREX 확인 4 · API 무관 2 · 불가 0.

## 진행 중 작업(WIP)

없음

## 다음 할 일

- [ ] P1 `5072858062` OA 5건 확인 필요 — 버튼 이동처(Figma 연결 없음 · 「탑승 위치 확인하기」 대상 화면 없음) · 만료 예고 14일·3일 전을 LPC 아이템 1개/2개 · 교환 번호 OA 정의 누락(`arex_kiosk_guide_01_01` 시트가 「LINE으로 보내드려요」 안내) · Figma 라벨 3건(7005·7174·7678)이 부모 발송 시점과 다름 · 디자인 미반영(교환번호 줄 · 탑승 1시간 전 타이틀 · 귀국편 본문)

- [ ] P1 `5072857588` key · beta/prod JSON 작성(사용자) · prod 호스트 확인(`api-reward-unifi.line-apps.com` 추정 — 11-19 무응답) · OA 메시지가 contents API 대상인지 확인

- [ ] P1 분석 페이지 10절 「AREX에 확인할 것」 13건 — 정준영 기획 정리 필요사항 #13(확인 대상 전종화)과 합쳐 묻는지 사용자 판단
- [ ] P3 「AREX 공항철도 정책 비교」 `5049820028`(11-14)이 Auto-react 원본 리포트 5절 관련 위키 목록에 없음 — 위키 `5071419749`에는 5-1 표와 Related Docs에 이미 넣었다. 원본 리포트 보완은 Auto-react 쪽 일(11-19 메인 지적)
- [ ] P2 환불 정책 확정(법무 · 리스크) 뒤 두 페이지의 환불 행 갱신 — 기획 v75(발급 전 환불 · 75% 자동 환불) ↔ Slack 11-18(결제 시점부터 환불 불가)

## 주요 결정 사항 (이 프로젝트 한정)

| 날짜 | 결정 | 근거 / 커밋 |
|---|---|---|
| 2026-11-19 | 리포트 「6. 나와 관련된 지점」은 위키에서 빼고 「담당 · 참여자」(자료에서 확인된 역할만 기재)로 바꿈 | 지휘 세션 일감 패킷 |
| 2026-11-19 | 분석 페이지는 필드 상세를 다시 쓰지 않고 `5035185824`(API 정리) · `5059914396`(FE API)으로 링크만 검 | 중복 방지 |

## 세션 기록 (최신 위, 최대 5개)

### 2026-11-19 — OA 정리 페이지 v2 재구성

- 사용자 지시: 메시지별 「ID 정리」 표 5개를 없애고, Screen 정의(`Screen ID | Screen | Description | 다국어 번역` — 4열 규칙, 번역 칸 「-」)에 메시지 정보를 합침. LPC · msg ID는 OA 목록 한 표(「OA 등록 현황」: 화면 · 트리거 · LPC postId / LIAM msg ID × beta · prod · 비고)로 정리. 맨 위 요약 표는 이 표로 대체.
- PUT v1 → v2(버전 가드) · 렌더 확인(이미지 5 · Unknown macro 0).

### 2026-11-19 — Admin 콘텐츠 설정 v3

- 완료(사용자 지시): `5072857588` v2→v3. 4열 제목을 `LPC`에서 `Admin`으로 바꿨고, 표는 `No · collection · key`만 남겼다(collection은 전부 `AREX` · beta/prod JSON 열 삭제). Description은 「Admin 관리 영역」으로 바꾸고 항목마다 펼치기(expand) + 빈 JSON 코드 블록(`{}` · language js)을 넣었다. 렌더 확인 결과 Unknown macro 0 · 이미지 2.

### 2026-11-19 — LINE OA 메시지 ID 정리 페이지 생성

- 완료: `5072858062` v1 생성(사용자 승인 후) · Figma 프레임 이미지 5장 첨부 · 렌더 확인(이미지 5 · Unknown macro 0 · Unknown Attachment 0) · 부모 하위 목록 노출. 부모·형제 본문은 수정하지 않음.
- 구성: Policy(LPC `oam_message_task_multi` · beta `a2qaxhygpi95g8l4a48n2vn4` / prod `w5eph4y9qxe05c8fqpi7rlxh` · LIAM 채널 beta Unifi Beta OA 2010418473 / prod Dapp Portal 2006670905) · OA 요약 표 · Figma 라벨↔부모 Screen ID 대조 · 메시지별 [이미지 | 정보] + 「ID 정리」 표(빈칸) · 확인 필요 5건.
- 발견: Figma OA 프레임은 `78991:7005·7174·7343·7678·7512` 5개뿐이고 코멘트와 프로토타입 연결이 없다. 7174 라벨 「남은 발급기한 7일 이하」 ↔ 부모 14일·3일 전. 형제 페이지가 v2에서 Web3 파일로 옮겨 갔는데, 거기에 OA 새 버전이 있는지는 확인하지 않았다.

### 2026-11-19 — Admin 콘텐츠 설정 v2 재구성

- 완료(사용자 지시 · 승인): `5072857588` v1→v2. 작성 예시와 화면별 섹션 17개를 삭제했다. 기획 위키 형식의 Screen 표 1개(`Screen ID | Screen | Description | LPC`)로 교체했다. 행은 `arex_detail_01`(AREX - Detail `84407-138` · 빨간 box 5개)과 `arex_kiosk_guide_02`(AREX - Guide `84407-369` · box 1개)다. 이미지 ⓝ = Description 번호 = LPC 표 No.
- 첨부: 같은 이름 2장은 새 이미지로 교체했고(`/data`), 구 화면 이미지 15장은 사용자 승인 후 삭제했다. 렌더 확인 결과 이미지 2 · Unknown macro 0.
- 참고: 같은 Figma 페이지에 `AREX - Payment`(`84407-504`) · `AREX - Ticket`(`84407-614`)도 있다. 사용자가 지정하지 않아 넣지 않았다.

### 2026-11-19 — Admin 콘텐츠 설정 틀 페이지 생성

- 완료: `5072857588` v1 생성(사용자 승인 후) · 이미지 17장 첨부 · 렌더 확인(이미지 17 · Unknown macro 0 · Unknown Attachment 0) · 부모 하위 목록 노출. 부모 v75는 그대로.
- 구성: Policy(API 형식 `/v1/contents/{type}/{key}?locale=` · beta 호스트) · 작성 예시(`info_banner`/`arex-detail_page` 실응답 — 상세 상단 분홍 띠, `backgroundColor #FD184F`) · 화면별 [이미지 | `콘텐츠 영역 · type · key · beta JSON · prod JSON · 비고`] 표. 후보 29행은 파란색 「(후보)」, 근거는 부모 Description 번호(「Admin에서 관리한다」).
- 발견: Figma 프레임(`78991:*`)은 이름이 없어 프레임 위 라벨로 부모 Screen ID와 대응시켰다. OA 7005(라벨 「공항 가이드 화면에서 LINE 친구추가 시」)↔`arex_oa_purchased_01`, 7678(「한국 도착 시점」)↔`arex_oa_arrival_01`은 라벨과 부모 정의가 다르다. 요청 locale `en-US` → 응답 `en_US`.

### 2026-11-19 — AREX 하위 위키 2종 생성

- 완료: `5071419749` · `5072857358` v1 생성. 부모 v75는 그대로.
- 발견: 서버의 변경 · 키오스크 전환 기한(출발 30분 전)이 기획(탑승일 전날)과 다름. 「변경하기」 화면이 임시예약 없이 014를 부르는데, 가이드에 「목적 외 사용 제한」 문구가 있음.
- 교훈: PDF 추출 도구(poppler · pypdf)가 없는 PC에서는 macOS PDFKit을 `swift`로 불러 텍스트를 뽑을 수 있다.
