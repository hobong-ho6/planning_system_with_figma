# unifi-mini-v2-oa — 클리닉·여행 예약 OA 메시지 (발송 타임라인 16화면)

> 담당자: `hogeun` · 마지막 갱신: 2026-09-13 · 세션 #3 · 마지막 커밋 `34a013c`

## 대상 / 링크

- 위키: [pageId 4725932984](https://wiki.workers-hub.com/pages/viewpage.action?pageId=4725932984) `Unifi mini v2.0 - OA` — **현재 v37**
  - 상위 문서는 `unifi-mini-v2`(`4704515582`)이나 **페이지·작업 범위가 분리**돼 있어 별도 프로젝트로 둔다
- 화면 **16개** — 클리닉 12(T0 · D-14 A/B · D-7 · D-3 · D-1 · D-day 아침 · D-day 방문 후 · D+3 · D+7 · D+1 선택 · D+14 선택) + 여행 4(T0 · D-3 · D-1 · D+1)
- XLT: **키 미부여**(OA 규칙 — `md/OA.md` 규칙 1). 번역 엑셀·전역 키 표에 넣지 않는다
- Landpress `oam_message_task_multi` — beta `a2qaxhygpi95g8l4a48n2vn4` / prod `w5eph4y9qxe05c8fqpi7rlxh`
- LIAM HUB Event Messages — beta [`menuId=23160&roleId=6970`](https://liam-hub.hub-beta.linecorp.com/service-view/313?menuId=23160&roleId=6970) / prod [`menuId=18628&roleId=6969`](https://liam-hub.hub.linecorp.com/service-view/313?menuId=18628&roleId=6969)
- 게이트 리포트 prefix: `reports/gate/gate_report_oa_reservation_*.md` — **아직 없음**(번역 미착수)

## 현재 상태

**beta 파이프라인 전건 완료.** 위키 16화면의 한국어 문구가 확정돼 있고, 화면별 **샘플 Flex JSON(bubble 단일 객체)** 과 **카드 렌더 이미지**가 위키에 실려 있다. beta는 **Landpress 16건(`ko_KR` 단일 로케일) → LIAM Event Message 16건**까지 등록돼 전건 재조회 대조를 통과했다(불일치 0). prod는 **클리닉 T0 1건만**이고 `isActive`는 **No**(테스트라 발송 차단).

**⚠️ 아직 프로덕션 값이 아니다** — hero 이미지와 버튼 URL이 전부 시뮬레이터 확인용 임시값(`https://www.unifi.me/`)이고, **5개 언어 중 `ko_KR`만** 있다(번역 미착수).

**등록 현황** (위키 「등록 현황」 표가 정본 · OA 섹션 맨 끝)

| Landpress(beta) | 화면 | LIAM messageId(beta) |
|---|---|---|
| 216 | 클리닉 T0 예약 확정 | `N6aa509563ae13b187b7d0c7e` |
| 217 / 218 | 클리닉 D-14 A안 / B안 | `N6aa694683ae13b187b7d0c7f` / `N6aa6948e3ae13b187b7d0c80` |
| 219 / 220 / 221 | 클리닉 D-7 / D-3 / D-1 | `N6aa694ad3ae13b187b7d0c81` / `N6aa694c6f3f3e36a2adf4b66` / `N6aa694de3ae13b187b7d0c82` |
| 222 / 223 | 클리닉 D-day 아침 / 방문 후 | `N6aa694f73ae13b187b7d0c83` / `N6aa69510f3f3e36a2adf4b67` |
| 224 / 225 | 클리닉 D+3 / D+7 | `N6aa6952a3ae13b187b7d0c84` / `N6aa69544f3f3e36a2adf4b68` |
| 226 / 227 | 클리닉 D+1 선택 / D+14 선택 | `N6aa6955d3ae13b187b7d0c85` / `N6aa695763ae13b187b7d0c86` |
| 228 / 229 | 여행 T0 / D-3 | `N6aa6958ef3f3e36a2adf4b69` / `N6aa695a7f3f3e36a2adf4b6a` |
| 230 / 231 | 여행 D-1 / D+1 | `N6aa695c03ae13b187b7d0c87` / `N6aa695d53ae13b187b7d0c88` |

prod: 클리닉 T0만 — Landpress `1956` / LIAM `N6aa50c973af74c70a397b9b0` (`isActive` **No**)

## 진행 중 작업(WIP)

없음 (워킹트리 clean · 원격 동기)

## 다음 할 일

- [ ] P1 **5개 언어 번역** — 사용자가 Landpress에 로케일 추가 후 요청 예정. 번역 품질 게이트(P0=0 + 수동 전수 + 리포트 + `check_gate_report.py` exit 0) 필수
- [ ] P1 **hero 이미지·버튼 URL 실값 확정** — 현재 전부 임시값. 확정되면 위키 JSON → 렌더 이미지 → Landpress 16건 → LIAM 16건 순으로 **전부** 갱신(아래 종결 항목의 동기화 규칙)
- [ ] P2 prod 전건 등록 — beta 검증이 끝나고 문구·URL이 확정된 뒤
- [ ] P2 prod 클리닉 T0의 `isActive` 켜기 — 실제 사용 시점에

## 주요 결정 사항 (이 프로젝트 한정)

| 날짜 | 결정 | 근거 / 커밋 |
|---|---|---|
| 2026-09-13 | beta는 **`ko_KR` 단일 로케일로 전건 등록** 후 로케일 추가·번역은 별도 진행 | 사용자 지시. 다국어 번역이 미착수라 파이프라인 검증을 먼저 끝냄 |
| 2026-09-13 | beta LIAM `isActive` **Yes**, prod는 **No** | 사용자 지시(beta) / prod는 테스트값·1개 언어라 발송 차단(세션 #2) |
| 2026-09-12 | 위키 Screen 표에 **「샘플 JSON(KR)」 칼럼 신설**(Description 오른쪽) | 시뮬레이터에 붙여넣을 JSON을 화면별로 바로 꺼내 쓰기 위해. `check_wiki_storage.py`에 예외 허용 추가 — `4841b51` 이전 |
| 2026-09-12 | 카드 렌더 이미지는 **`scripts/render_oa_flex.py`(근사 렌더)** 로 만들어 Screen 칸에 첨부 | LINE 공식 시뮬레이터는 로그인 벽이라 자동화 불가 · 렌더 결과를 파일로 남길 수 없어 첨부로 못 잇는다 |
| 2026-09-12 | prod OA Channel은 **`Dapp Portal (2006670905)`** | prod에는 Unifi 채널이 없다(`Dapp Portal`·`Dapp Portal_Test` 2개뿐). 사용자 확정 |

## ⛔ 사용자 결정으로 종결 (재작업·재제안 금지 — 이 프로젝트 한정)

- **샘플 JSON은 bubble 단일 객체로 둔다** — `{"type":"flex","altText":…,"contents":{…}}` 봉투로 감싸면 Flex Message Simulator가 `invalid json`으로 거부한다(2026-09-12 실측). `altText`는 Description의 메시지 초안 표에 남긴다
- **code 매크로에 `language=json`을 넣지 않는다** — 이 위키에서 `Error rendering macro 'code'`가 난다(2026-09-12 실측)
- **문구를 고치면 동기화 대상이 세트다** — 위키 번역표·샘플 JSON·Flex JSON 파일·zip 첨부·렌더 이미지 + (등록했다면) Landpress·LIAM HUB. 특히 **Landpress만 고치고 LIAM에서 다시 `LOAD MESSAGE` → `UPDATE`를 안 하면 실제 발송은 구 문구**다(`md/OA.md` 규칙 3-1 ⓐ~ⓖ)

## 세션 기록 (최신 위, 최대 5개)

### 2026-09-13 — 세션 #3: beta 전건 등록 (Landpress 16 + LIAM 16)

- 완료: Landpress beta에 **15건 신규 생성**(`217~231`, `POST ?locale=ko_KR`) → 전건 재조회 대조 불일치 0 · LIAM HUB beta에 **Event Message 15건 생성**(`Unifi Beta OA` 채널 · `isActive` Yes) · 위키 등록 현황 표 16건 기재(v36→v37)
- 규칙 정정(`4841b51`): **"로케일 항목 생성 경로가 없다"는 틀렸다** — `POST .../items?locale=ko_KR`로 단일 로케일 항목이 생성된다(201 + 새 postId, 그 로케일이 primary). **기존 항목에 2번째 로케일 추가만 여전히 불가**
- 교훈: LIAM `CREATE` 버튼 위치는 **화면마다 다르다** — 변수가 없는 메시지는 `placeholders` 필드가 없어 버튼이 위로 올라온다. 좌표를 고정하지 말고 **CREATE 직전 화면을 확인**하고 누른다
- 교훈: 위키를 매번 새로 읽은 것이 맞았다 — 지난 세션 이후 `altText`가 바뀐 화면이 있었다(예: 클리닉 D+7 → `방문 만족도 조사`)

### 2026-09-12 — 세션 #2: 렌더 이미지 + Landpress·LIAM 등록 규칙 신설 (`f1fc733`·`538aac3`·`f42819c`)

- 완료: `scripts/render_oa_flex.py` 신설(bubble JSON → HTML/CSS → headless Chrome → 자동 크롭) · 16화면 카드 이미지 위키 첨부 · `md/OA.md`에 렌더/Landpress/LIAM 절차 신설 · beta·prod에 클리닉 T0 시범 등록
- 교훈: **prod 채널이 beta와 다르다**(Unifi 채널 없음) · **primary locale이 환경마다 다르다**(beta ko_KR / prod en_US) · primary가 미게시면 공개 조회 API가 404라 **CMS API로 확인**해야 한다
- 사고: `confluence_update_page`의 `content`에 **파일 경로를 넘겨 페이지 본문이 통째로 날아갔다**(REST PUT으로 복구). `md/wiki.md` Step 5에 차단 규칙 신설

### 2026-09-12 — 세션 #1: 샘플 JSON 칼럼 신설 + 문구 재구성

- 완료: 16화면에 「샘플 JSON(KR)」 칼럼 신설 · 전 화면 문구를 문단 구분(separator)·소제목 구조로 재구성해 가독성 개선 · 클리닉 T0에서 결제 금액·캐시백 제거(정확한 값 미확보) · `{{clinic_aftercare_notes}}` 제거(데이터 소스 확보 불가)
- 교훈: 기획자 가이드 v38 발행 시 **네비 항목 추가로 메뉴가 2줄로 접혀** 같은 버전을 세 번 재발행했다 — 구조 검사만으로는 안 보이니 **헤더를 실제로 캡처해 확인**한다
