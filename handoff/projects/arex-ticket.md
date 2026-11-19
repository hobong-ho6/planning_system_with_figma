# arex-ticket

> 담당자: hogeun · 마지막 갱신: 2026-11-19 · Auto-react 지휘 세션의 사이드 세션 · 마지막 커밋: 이 파일을 추가한 커밋

## 대상 / 링크

- 기획 정본(정준영 · 남의 페이지 — 본문 수정 안 함): [AREX 공항철도 동선 제공](https://wiki.workers-hub.com/pages/viewpage.action?pageId=5043902344) `5043902344` — 11-19 확인 v75
- 하위 신규 1: [AREX 조사 리포트 (11-19)](https://wiki.workers-hub.com/pages/viewpage.action?pageId=5071419749) `5071419749` — **v1**
- 하위 신규 2: [AREX 예약발매 API 가이드 v2.1 분석 — Unifi 정책 대조](https://wiki.workers-hub.com/pages/viewpage.action?pageId=5072857358) `5072857358` — **v1**
- 하위 신규 3: [AREX 화면별 Admin 콘텐츠 설정](https://wiki.workers-hub.com/pages/viewpage.action?pageId=5072857588) `5072857588` — **v6** · Screen 표 1개(4열: `Screen ID | Screen | Description | Admin`)(AREX - Detail · AREX - Guide · Figma `GOCHAYBS7hIrmWRGNuJOKV` node `84407-136`) · 4열 `Admin`(No · collection `AREX` · beta key · prod key — key는 사용자가 채움) · 항목별 JSON(ko_KR 초안 · 기존 LPC 포맷)은 Description 펼치기
- 하위 신규 4: [AREX LINE OA 메시지 ID 정리](https://wiki.workers-hub.com/pages/viewpage.action?pageId=5072858062) `5072858062` — **v3** · OA 5건(Figma `78988-3814`) · Screen 표(번역 칸 KR/JA/ZH-TW) + 「OA 등록 현황」 표 · LPC `oam_message_task_multi` ko_KR beta `398~402` / prod `2293~2297` · LIAM msg ID는 사용자가 채움 · 복구원 Auto-react `reports/landpress/arex_oa_20261119/`
- 원본: Auto-react `reports/research/arex_timeline_20261119.md` · API 가이드 PDF v2.1(36쪽, 위키 `5035185824`에 첨부)
- 관련: [UNIFY-13718](https://jira.workers-hub.com/browse/UNIFY-13718) · 기존 API 정리 `5035185824` · FE API 정리 `5059914396` · 정책 비교 `5049820028`
- 출시: Unifi AREX 11/25(수)

## 현재 상태

하위 위키 2개 v1 생성(11-19 · 사용자 승인 후). 두 페이지 모두 렌더 확인 결과 Unknown macro 0건, 부모 하위 목록에 노출됨. 본문은 기본색(검정)이고, History PIC는 「Claude 자동 생성 (요청: 김호근)」. 분석 페이지 9절 대조 결과: 가능 10 · 우회 4 · AREX 확인 4 · API 무관 2 · 불가 0.

## 진행 중 작업(WIP)

없음

## 다음 할 일

- [ ] P1 `5072857588` v10 5개 언어 JSON을 Admin(beta)에 반영(사용자) — 위키 펼치기에서 언어별로 복사 · 반영 뒤 30건 API 재조회로 대조 · (d-2) 사용자 결정 2건: 「사용처」 라벨 의역(`Route` 등) 유지 여부 · ja FAQ 제목 `FAQ` vs `よくある質問`

- [ ] P1 `5072857588` v9 FAQ 추가분(짐 답변 · `city_airport_terminal`) — ① Unifi 발급 승차권 QR로 서울역 도심공항터미널 게이트를 통과할 수 있는지 확인 ② ~~번역~~ v10 완료 ③ Admin 반영(사용자 · beta는 id 통일과 함께)

- [ ] P1 AREX contents beta FAQ `id`를 ko id로 통일(사용자 결정 11-19) — 붙여넣기용 JSON은 `landpress/arex_contents/beta_arex_detail_faq_{locale}_after.json`(로컬 · gitignore)에 있다. Admin `https://480-unifi-apps-cms-fe.hub-beta.linecorp.com/contents`(LIAM HUB 480 · menu 28955)는 앱 브라우저에서 스크립트가 `ERR_BLOCKED_BY_CLIENT`로 차단돼 Claude가 반영하지 못함 → 사용자가 반영한 뒤 API로 재조회
- [ ] P2 AREX contents 쓰기 경로 미확인 — 공개 API `/v3/api-docs`는 경로 0건 · CORS는 게이트웨이 전체에 PUT 등을 허용해 근거가 안 됨 · Admin URL · 인증을 알아야 확인 가능(이 세션은 Admin 쓰기 금지)

- [ ] P1 `5072857588` v4 JSON 확인(사용자) — FAQ 「짐」 답변 사실 확인 · 키오스크 가이드 단계 이미지 URL(LPC 미디어 업로드) · ko_KR 확정 후 5개 언어 번역(게이트 적용)
- [ ] P1 `5072857588` v4 환불 문구(FAQ · 상품 요약 · 변경 및 취소 JSON)는 부모 v75 기준(발급 전 결제 취소 가능 · 기한 다음 날 자동 환불)이다. Slack 11-18 18:23 정준영 정리(결제 시점부터 환불 불가 검토 · 자동 환불 없음)와 다르므로, 환불 정책 확정 뒤 JSON을 갱신한다

- [ ] P1 OA JA · ZH-TW 번역 수령 → 위키 번역 칸 + LPC ja_JP · zh_TW 로케일 추가(beta · prod · `POST /items/all`) · CTA 실 URL 수령 → LPC beta · prod 수정(현재 임시 `https://unifi.me`) → LIAM 등록·재동기화
- [ ] P1 `5072858062` OA 5건 확인 필요 — 버튼 이동처(Figma 연결 없음 · 「탑승 위치 확인하기」 대상 화면 없음) · 만료 예고 14일·3일 전을 LPC 아이템 1개/2개 · 교환 번호 OA 정의 누락(`arex_kiosk_guide_01_01` 시트가 「LINE으로 보내드려요」 안내) · Figma 라벨 3건(7005·7174·7678)이 부모 발송 시점과 다름 · 디자인 미반영(교환번호 줄 · 탑승 1시간 전 타이틀 · 귀국편 본문)

- [ ] P1 `5072857588` key · beta/prod JSON 작성(사용자) · prod 호스트 확인(`api-reward-unifi.line-apps.com` 추정 — 11-19 무응답) · OA 메시지가 contents API 대상인지 확인

- [ ] P1 분석 페이지 10절 「AREX에 확인할 것」 13건 — 정준영 기획 정리 필요사항 #13(확인 대상 전종화)과 합쳐 묻는지 사용자 판단
- [ ] P3 「AREX 공항철도 정책 비교」 `5049820028`(11-14)이 Auto-react 원본 리포트 5절 관련 위키 목록에 없음 — 위키 `5071419749`에는 5-1 표와 Related Docs에 이미 넣었다. 원본 리포트 보완은 Auto-react 쪽 일(11-19 메인 지적)
- [ ] P2 환불 정책 확정(법무 · 리스크) 뒤 두 페이지의 환불 행 갱신 — 기획 v75(발급 전 환불 · 75% 자동 환불) ↔ Slack 11-18(결제 시점부터 환불 불가)

## 주요 결정 사항 (이 프로젝트 한정)

| 날짜 | 결정 | 근거 / 커밋 |
|---|---|---|
| 2026-11-19 | `5072857588` 「변경 및 취소」 JSON은 부모 v75 기준을 유지한다(Figma 이미지 문구 「출발 30분 전 · 수수료」를 따르지 않음) · 디자인 열은 제거 | 사용자 결정 |
| 2026-11-19 | 리포트 「6. 나와 관련된 지점」은 위키에서 빼고 「담당 · 참여자」(자료에서 확인된 역할만 기재)로 바꿈 | 지휘 세션 일감 패킷 |
| 2026-11-19 | 분석 페이지는 필드 상세를 다시 쓰지 않고 `5035185824`(API 정리) · `5059914396`(FE API)으로 링크만 검 | 중복 방지 |

## 세션 기록 (최신 위, 최대 5개)

### 2026-11-19 — Admin 콘텐츠 5개 언어 번역 v10

- 완료(사용자 지시): `5072857588` v9→v10. 항목 6개의 펼치기를 「JSON (5개 언어)」로 바꿔 ko · ja · en · th · zh 코드 블록 30개를 넣었다(43행 × 5개 언어 · FAQ id는 ko id로 통일). 게이트: 자동 P0 1→0(zh `・`) · P1 38 전건 오탐 판정 · 수동 수정 2건(zh) · `check_gate_report` exit 0 → Auto-react `reports/gate/gate_report_20261119_arex_contents.md`(PS `reports/gate`는 gitignore). 용어집 대기 #51 「교환 번호」 등재.
- beta 사용자 등록본에서 발견: en FAQ에 `서울역` 한글이 남아 있음 · `boarding pass`/`ticket` 혼용 · FAQ id 번역됨 → 이번 번역으로 대체할 것.
- 로컬 사본: `landpress/arex_contents/arex_contents_5lang_20261119.json`(gitignore).

### 2026-11-19 — FAQ 보강 v9

- 완료(사용자 지시): `5072857588` v8→v9. FAQ ko_KR JSON에서 짐 답변을 「객차 끝 큰 짐 공간」으로 바꾸고, 10번째 문항 `city_airport_terminal`(서울역 도심공항터미널 — 탑승수속 · 수하물 위탁 · 출국심사 · 05:20~19:00 · 마감 T1 3시간 / T2 3시간 20분 전 · 출처 arex.or.kr)을 추가했다. Description에 「Unifi QR 통과 여부 확인 필요 · 다른 언어 번역 전」을 적었다. Admin은 미반영이다.

### 2026-11-19 — contents 쓰기 시험 · FAQ 웹 보충 조사

- 쓰기 시험(사용자 승인): 공개 API `arex_detail_banner` ko-KR에 지금 값과 같은 JSON으로 PUT · PATCH를 보냈다. 둘 다 **401 `ACCESS_DENIED`**였고 값 · `updatedAt`은 바뀌지 않았다. 쓰기 경로는 있지만 인증이 필요하다(어떤 토큰인지는 미확인). Admin 앱은 앱 브라우저에서 그 호스트 요청이 전부 `ERR_BLOCKED_BY_CLIENT`로 막힌다.
- FAQ 웹 조사(제안만 · 위키 미반영): 공식 arex.or.kr 기준 서울역 도심공항터미널(지하 2층 · 직통열차 승차권 QR 필요 · 05:20~19:00 · 탑승수속 · 수하물 위탁 · 출국심사)이 보충 후보다. Unifi 발급 승차권으로 이용 가능한지는 확인이 필요하다. 짐은 블로그 다수가 「객차 끝 대형 짐 공간」으로 일치한다. 지연 · 운행 중단 시 운임 반환(약관)은 Unifi 환불 정책 확정 후 판단한다.

### 2026-11-19 — AREX contents beta 조회 확인

- 위키 v8에서 사용자가 beta key 6개를 등록했다. 6개 key × 5개 언어 = 30건 모두 `GET /v1/contents/arex/{key}?locale=` 200 · onOff true다. ko_KR `data`는 위키 JSON과 완전히 같고, 다른 언어도 구조가 같다. 컬렉션 경로는 `info_banner`가 아니라 `arex`다.

### 2026-11-19 — AREX OA 5건 LPC 등록 · 위키 v3

- 사용자 지시: 번역 칸은 JP/TW를 받으므로 구분해서 표로 · CTA는 `https://unifi.me` 임시 · LPC beta/prod 생성 · 위키 갱신.
- 사용자 결정: 변수 `{{issue_deadline}}` · `{{departure_datetime}}` · `{{departure_station}}` · `{{arrival_station}}` · `{{car_number}}` · `{{seat_number}}`(상품명은 고정 문구) · 시안↔정책은 **정책 우선**(교환번호 줄 삭제 · 탑승 1시간 전 타이틀 임시 「곧 AREX 직통열차 출발 시간이에요. …」 · 환불 문구는 Figma 유지) · 귀국편 본문 제외.
- LPC: `POST ?locale=ko_KR`(앱 브라우저 CMS 세션) — beta 398~402 · prod 2293~2297 · 1건 선검증 후 진행 · 10/10 재조회 깊은 비교 일치 · beta = prod · `check_lpc_nulls` 전후 exit 0. 구조는 ① 개인별 진행 상태 안내(prod 2071 선례). LIAM 미등록.
- 위키 v2 → v3(버전 가드) · 렌더 확인(이미지 5 · Unknown macro 0). 이미지는 Figma 시안 그대로라 등록 문구와 다른 곳은 비고에 기록.
- 실측: 앱 브라우저 CMS 탭에서 `127.0.0.1` 로컬 payload 서버 fetch가 막혔다(`Failed to fetch`) → payload를 javascript_tool에 직접 실었다(8KB). `render_oa_flex.py`는 이 PC headless Chrome 실패로 생략. Python 3.9는 한글이 든 매우 긴 줄에서 「Non-UTF-8 code」 SyntaxError를 낸다 → 줄을 나누면 해결.

### 2026-11-19 — Admin 콘텐츠 설정 v6(디자인 열 제거)

- 완료(사용자 지시): `5072857588` v5→v6. 디자인 열을 제거하고 `*_design.png` 2장을 삭제해 4열로 되돌렸다. pre 검사 통과 · 렌더 확인 결과 이미지 2 · 오류 0. 변경 및 취소는 부모 v75 기준 유지(문구 변경 없음).

### 2026-11-19 — Admin 콘텐츠 설정 v5(디자인 열)

- 완료(사용자 지시 · 승인): `5072857588` v4→v5. Screen 열 옆에 「디자인」 열을 추가했다. 동선 Figma `uyUkM7rWWg1vAwpf47um86`의 원본 렌더 `78991-3817` · `78991-4963`(빨간 box 없음)을 `*_design.png`로 첨부했다. 렌더 확인 결과 이미지 4 · 오류 0.
- ⚠️ `check_wiki_storage.py pre`는 Screen 표 4열 고정 규칙 때문에 5열을 위반으로 본다(OA 예외만 허용). 사용자 지시로 5열을 유지했다. 다음에 이 페이지를 고칠 때 pre 검사의 이 1건은 의도된 예외다.

### 2026-11-19 — Admin 콘텐츠 설정 v4(항목별 JSON)

- 완료(사용자 지시): `5072857588` v3→v4. key 열을 beta · prod로 나눴다. 항목 6개의 JSON(ko_KR)을 펼치기에 넣었다. 포맷은 LV beta LPC에서 실측했다: 띠 배너=reward `info_banner` `body.data` · 상품 요약=`voucher_product.voucher_detail.summary`(+`linkLabel`·`targetUrl`) · FAQ=`mini_common_info.service_guide.faq`(9건, 이미지 5건 + 부모 초안) · 변경 및 취소/유의사항=`productInfo.sections[]` 항목 · 키오스크 가이드=`shopping_guide.guide_page`.
- 문구 근거: 부모 v75 정책 초안이 기준이다. Figma 이미지 문구(출발 30분 전 변경 · 수수료 · 「교환코드」 · 「탑승권」)는 부모 v75와 달라 따르지 않았다. FAQ 「짐이 많아도」 답변은 새로 쓴 초안이라 사실 확인이 필요하다.

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
