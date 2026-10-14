# sk-gifticon-migration — SK플래닛 기프티콘 서버 이관(2026-10-13) 영향·고지

> 담당자: `hogeun` · 마지막 갱신: 2026-10-13 08:12 · 세션 #8(AD03230205 · 새 계정) · Auto-react `c2c6a22` · 위키 **v74** · 위키 **v69** · 크기 15.9KB(10/14 · 목표 15~25KB)
>
> 📌 **범위**: SK플래닛 사업양수도에 따른 **기프티콘 서버 이관(2026-10-13 00:00~08:00 KST=JST · 8시간)** 의 Unifi 영향 확정과 **사용자 고지**(공지사항·앱푸시·OA·화면 배너·구매 차단).

## 🗂 이관 당일 운영 기록 (종료 · 2026-10-14 포인터 압축)

- 10/12~13 운영(23:00 배너 공개 · 23:50 `buy_block_on_off` 브라우저 타이머 · 08:00 공개 취소 · 스위치 원복)과 「Claude SSO 전환 후 새 계정 세션 첫 작업」 절은 **끝난 절차**라 [`sk-gifticon-migration/history.md`](sk-gifticon-migration/history.md) 「이관 당일 운영 · 새 계정 첫 작업 (전문)」으로 옮겼다 — 남은 일은 아래 「다음 할 일」만 본다

## 대상 / 링크

- 위키(정본): [4770508162](https://wiki.workers-hub.com/pages/viewpage.action?pageId=4770508162) 「SK플래닛 기프티콘 서버 이관(2026-10-13) 영향 및 사용자 고지 방안」 — **v52** · 부모 `[Hogeun]` `3910828993` · 공간 `UNIFI` · ⚠️ 10/6 v55~58 **앱푸시 관련 내용 전체 삭제**(사용자 지시 — 다른 세션)
- Figma `GOCHAYBS7hIrmWRGNuJOKV` 섹션 **`76061-19095`**(09-30 노출 위치 변경 정본) — `76061-19216` 상품권 목록(①) · `76061-19102` 상품권 상세(②) · `76061-19385` 홈(③). 종전 `75999-3299`·`75999-3298`은 대체됨
- 첨부 본문 참조 **6건**: `annotated_76061-19216/19102/19385.png` · `oa_sample_1_notice/2_holder/3_delay.png`(OA 근사 렌더 · **10/6 순화 문안·줄 단위 구조**) — 미참조였던 `annotated_75999-3299/3298.png`는 **삭제**(09-30 사용자 지시 · 본문 이미지 참조 0 확인 · 첨부 6건 = 전부 참조)
- **LPC `maintenance_banner`**(LV · beta `a2qaxhygpi95g8l4a48n2vn4` / prod `w5eph4y9qxe05c8fqpi7rlxh` · 다건 · `postId=1` · ⚠️ `primaryLocale=en_US`)
  - 필드: `contents.title`(①② 문구) · **`contents.homeTitle`·`homePeriod`**(③ 홈 2줄 · 09-30 추가) · `contents.targetUrl`(배너 클릭 이동 · 비면 이동 안 함 · **환경별 값** beta `https://miniapp.line.me/2008994547-GfGUdDxy/announcement/019fd56b-525f-7f30-9a3f-095e7504bb91` / prod `https://miniapp.line.me/unifi/announcement/01a0f60f-1b1e-71c3-abae-fc53dc81e8ab` — **10/6 게시 공지사항으로 교체(10-07 · 종전 `01a04617…`)**) · **`on_off`**(①②③ 배너 노출 · `category_promotion_banner` **대체**) · **`buy_block_on_off`**(「바로 구매하기」 비활성)
  - 현재값: beta `on_off=true`·`buy_block=true`(검증용 · 의도) / prod **둘 다 `false`** · 5개 언어 문구 반영·**beta↔prod 동치**
- **OA 3종**(Landpress `oam_message_task_multi` · **5개 로케일 게시** · LIAM **isActive Yes**) — **10/6 순화 문안 · 본문 줄 단위 text 구조 · beta=prod 동치**

  | | Title | beta postId / messageId | prod postId / messageId |
  |---|---|---|---|
  | OA-1 (D-7 10/6) | 상품권 점검 OA-1 사전 공지 (D-7) | `244` / `N6abb47c2e2e22156952d50ed` | `2026` / `N6abb49089af6303f1a2104a1` |
  | OA-2 (D-1 10/12) | 상품권 점검 OA-2 보유자 안내 (D-1) | `245` / `N6abb47e8896fa02756cbd19c` | `2027` / `N6abb495d8b43b853bdb6e3fe` |
  | OA-3 (조건부) | 상품권 점검 OA-3 시간 연장 안내 (조건부) | `246` / `N6abb4806896fa02756cbd19d` | `2028` / `N6abb497c9af6303f1a2104a2` |
  | 🆕 OA-4 (완료 · 10/13) | 상품권 점검 OA-4 완료 안내 | `259` / `N6acd688f1bf0d337ff2ba045` | `2066` / `N6acd69298b43b853bdc76a35` |

  LIAM 채널 beta `Unifi Beta OA (2010418473)` · prod `Dapp Portal (2006670905)` · OA-2 placeholder `product_order_detail_url`
- 게이트 리포트(로컬 · gitignore · **사본 Auto-react `reports/gate/` `df94076`**): `reports/gate/gate_report_20260929_sk_notice_5lang.md`(공지 76셀 · 교정 4 · P0 0) · `…_maintenance_banner_short.md`(단축 4셀 · P0 0 · Auto-react `3744edc`) · `reports/gate/gate_report_20260929_sk_oa3_5lang.md`(OA 132셀 · 교정 9 · P0 0) · `reports/gate/gate_report_20260929_maintenance_banner_5lang.md`(배너 · P0 0) · **`reports/gate/gate_report_20261006_sk_oa_soften_5lang.md`**(OA 순화 5개 언어 · §1~7 · P0 0 · 텍스트 정본 `oa_soft_20261006_5lang.json`)
- LPC 복구원: `landpress/maintenance_banner/`(10) · `landpress/oam_message_task_multi_sk_gifticon/`(15 — CMS 라이브 해시 일치 확인) → **Auto-react `reports/landpress/` 커밋 `df94076`** · **10/6 현행 복구원 `landpress/oam_message_task_multi_sk_gifticon/20261006_soften/`**(beta·prod 30 + `_texts_5lang.json` — 공개 API 깊은 비교 30/30) → Auto-react `21a2906` · ⚠️ 상위 폴더 `oa_sample_*.json` 15개는 **10/6 이전 문안**(구버전)
- 관련: [4727978725](https://wiki.workers-hub.com/pages/viewpage.action?pageId=4727978725)(LPC 관리 영역) · `4155694391`(Apps Market 점검 공지 선례) · 표성만님 수정안 = 위키 코멘트 `4795141082`(2026-09-28)

## 현재 상태

- **등록 완료 · 운영만 남음** — 화면 배너 ①②③ · OA 3종(10/6 순화 문안 · beta=prod · LIAM isActive) · 공지사항 5개 언어(10/6 게시) · FE 분기 기준 전달 완료. 운영 순서는 위 「🔴 진행 중」(10/12 확정안)
- 영향 = 전 상품권 구매·환불 불가(올리브영은 사용도 불가지만 실영향 🟢) · 배너 문구 「10/13 00:00~08:00 상품권 구매·환불 일시 중단」 · My는 고지 제외
- 상세(문안 정본 · 화면 고지 5-5 · OA 개정 경위 · FE·BE 전달)는 [`sk-gifticon-migration/history.md`](sk-gifticon-migration/history.md) 「현재 상태 상세」

## 진행 중 작업(WIP)

✅ **10/12 23:50 구매 차단 완료**(세션 #8 실측) — 타이머 23:50:09 실행 · 5개 언어 OK(14:50:10~13Z) · MCP `item_list`·공개 API 5/5 `buy_block_on_off=true`·`on_off=true`·문구 3필드 그대로 · `check_lpc_nulls --env LV_prod` exit 0 · 백업 `landpress/maintenance_banner/20261012_buy_block_on/`(before·after 5+5 + `_timer_result.json`) → Auto-react `ae90526` · 타이머 탭은 실행 후 사라짐(결과는 같은 도메인 `localStorage`에 남음) · 08:00 공개 취소 예약 5건 `READY` · ⚠️ en_US만 23:05:54 수정 흔적(값 정상 · 원인 미확인)
- LandPress MCP 확인(세션 #8): `auth_status` 정상 · prod/beta 프로젝트 모두 2024-09-19 생성 → 안내서상 `item_update`가 **라이브 즉시 반영**(republish 불필요) · ⚠️ `item_update`에 **locale 인자가 없어** 다국어 행 지정 방법 미검증 · 예약 기능 없음 → 이번엔 타이머 유지(사용자 결정) · 쓰기 시험은 beta에서 후속

## 다음 할 일

- [x] 10/6 OA-1 발송(prod 템플릿 `N6abb49089af6303f1a2104a1`) — 순화 문안 · 줄 단위 구조 · ja 현지인 검토 반영 후 LIAM 재LOAD(사용자)
- [x] 10/12 23:50 prod `buy_block_on_off=true` — 브라우저 타이머로 완료(5/5 · Auto-react `ae90526`)
- [ ] LandPress MCP `item_update` 다국어 행 지정 방법 beta 시험(사용자 승인 후)
- [x] 10/13 08:00 공개 취소 실행 확인(공개 API 0건 · 08:03)
- [x] **OA-4 점검 완료 안내 신설**(10/13 사용자 지시 · 친구추가 사용자 전체) — 5개 언어 게이트 P0 0(`reports/gate/gate_report_20261013_sk_oa4_done_5lang.md`) · 위키 v70~72 · Landpress beta `259`·prod `2066` · LIAM beta·prod 생성(isActive Yes) · 복구원 `landpress/oam_message_task_multi_sk_gifticon/20261013_oa4_done/` → Auto-react `c1fe791` · ✏️ **prod만 문안 수정**(사용자 지시 · 점검 기간·「점검 중 이용에 불편…」 삭제 · LIAM prod LOAD→UPDATE · 위키 v73) · beta 259·LIAM beta도 prod와 동일하게 맞춤(공개 API 5/5 · 위키 v74) · **발송은 운영(사용자)**
- [x] 10/13 스위치 2개(`on_off`·`buy_block_on_off`) **false 원복** — beta·prod 5개 언어(사용자 지시 · prod 비공개 유지 · beta 공개 유지) · 문구 보존 · check_lpc_nulls exit 0 · 백업 `landpress/maintenance_banner/20261013_switches_off/` → Auto-react
- [ ] FE 처리 확인(비공개 = 배너 숨김 · 구매 가능)
- [x] LandPress MCP 쓰기 시험(beta · 10/13) — ⛔ `item_update`는 `locale` 무시 · primary(en_US)에 즉시 라이브 반영(원복 완료) · 일부 필드만 보내면 400 거부 → **읽기 전용으로 사용** · `md/landpress.md` §10-2-3
- [ ] (확인 필요) 10/12 OA-2 발송 여부 — 이 세션에서 확인하지 않았다
- [ ] (선택) OA-2·OA-3 ja 현지인 검토 — 받으면 ja만 키 단위 패치(Landpress beta·prod + LIAM 재LOAD). ⚠️ OA-1 「申し訳ありません」 ↔ OA-2·3 「申し訳ございません」 경어 수준 불일치(게이트 §7 d-2)
- [ ] Auto-react 미푸시 커밋 정리 — 이 세션 5건(`1b1ea04`~`21a2906`) 앞에 **다른 세션 watch 커밋 4건**이 미푸시로 쌓여 있어 푸시 보류

## 주요 결정 사항 (이 프로젝트 한정 · 최신 기준만 — 번복된 안은 뺐다)

| 날짜 | 결정 | 근거 |
|---|---|---|
| 10-12 | **이관 당일 운영 = 23:00 배너 공개(LPC 예약) → 23:50 구매 차단(Claude API) → 08:00 공개 취소(LPC 예약)** — 종전 「D-Day 00:00 차단 · 08:00 둘 다 false」 대체 · 공개 · 공개 취소 예약은 사용자가 설정 | 사용자 |
| 09-30 | **③ 홈 배너는 같은 컬렉션 `maintenance_banner.contents`에 `homeTitle`·`homePeriod` 키 추가** · 스위치·링크는 ①②와 공통 | 사용자 결정 — 별도 컬렉션 대신. 홈은 2줄(제목+기간) 형식이라 키만 분리 |
| 09-30 | **③ 홈 기간 문구는 ①② 날짜 형식으로 통일**(`10/13 00:00~08:00` · 연도 생략) | 사용자 결정 — Figma 원문 `2026.10.13` 대신. 날짜 변경 시 `title`·`homePeriod`를 함께 고친다 |
| 09-30 | **② 「상품권 이미지 비활성화」는 스펙 제외** | 사용자 결정 — Figma 캡션만 있음, 번호 미부여 |
| 09-29 | ⛔ **점검 고지는 신규 컬렉션 `maintenance_banner`(3필드)** — `contents` + `on_off`(배너) + `buy_block_on_off`(구매 차단) | 사용자 결정. 켜지면 `category_promotion_banner`를 **대체 노출** → 프로모션 문구 백업·복구 불필요. 스위치 분리는 D-7 배너 ↔ D-Day 차단 시점 차이 때문. 이름은 `_on_off`로 극성 통일(`true`=동작 켬) · On/Off는 문구 필드 밖 별도 boolean · 예약 필드 없음(게시 예약으로 대체) |
| 09-29 | **prod 스위치는 평상시 `false`** · beta만 검증용 `true` | FE 구현 전 실서비스 노출 방지 |
| 09-29 | **배너는 4개 브랜드 동일 문구 · 브랜드별 사용 가부는 OA 전담** · `[시스템 점검]` 말머리 없음 | 공통 문구로는 올리브영 ❌ / 그 외 ✅를 구분할 수 없다 |
| 10-06 | **OA 3종 문안 정본 = 10/6 순화안**(공지사항은 표성만님안 유지) | Slack 피드백(임시 점검·재개 인상·긍정 톤) + 사용자 지시 · 현지인 검토 전 등록 허용(사용자) |
| 10-06 | **OA 「점검 중에도 이용 가능(이마트24·CU·다이소 · 24시간 편의점 바코드)」 블록 삭제** · OA-2 만료 ※는 올리브영 한정 | 사용자 결정 — Slack 요청 항목이었으나 삭제 |
| 10-06 | **OA 본문 줄바꿈은 `\n` 대신 줄마다 text + 문단 box** | 실발송에서 `\n` 무시 실측 → 전역 규칙화(`md/OA.md` · 커밋 `6762198`) |
| 09-29 | ~~문안 정본 = 표성만님 수정안(OA 3종)~~ → OA는 10/6 순화안으로 대체 · OA-3 버튼 제거는 유지 | 리뷰 반영(아래 ⛔종결) |
| 09-29 | **시각은 JST 기준 · TW/TH 환산 없음** | JST=KST |
| 09-29 | **OA = Flex + 히어로(임시)** · `aspectRatio`는 실측 `28:19` | 관례 `20:13`이면 좌우가 잘린다 |
| 09-29 | **OA 다국어는 현지인 검토 없이 등록** | 사용자 직접 지시(이 건 한정 — 메모리 「검토 후 등록」과 다름) |
| 09-29 | **환불 마감이 10/13인 보유분 = 사후 구제**(점검 후 CS 환불 수용) · OA-2 문안 유지 | 사용자 결정 — 문안을 바꾸면 5개 언어 재번역·재등록이 따라온다. 만료 판정(날짜/시각)과 무관하게 구제된다 |
| 09-23 | **올리브영 사용 불가 영향 🟢 · 안내는 OA로 보충** | 점검 시간대 영업 매장 없음 · 사용처에 온라인몰 없음 |
| 09-29 | **OA-2 발송일 10/12(월) D-1** (종전 10/9 D-4) | 10/9가 한글날(한국 휴무) · 5-1은 사용자가, 5-4·5-7은 Claude가 맞춤(v37) |
| 09-23 | ⛔ **화면 고지에서 My 제외** | 사용자 결정 |
| 09-22 | **OA-1 대상 = 바우처 구매 이력자** · ⛔ **구매 CTA는 OA에만** | CTA가 공지사항·앱푸시에 붙으면 앱푸시 B(서비스 공지)→C(광고성) 재분류 위험 |

## ⛔ 사용자 결정으로 종결 (재작업·재제안 금지 — 이 프로젝트 한정)

- **GuideKim 사후 구제 협의는 종료**(2026-09-30) — 사후 구제 **케이스가 실제로 발생하면 그때 협의**한다. 미리 협의 항목으로 올리지 않는다
- **공지 문안 확인 3건 종료**(2026-09-30) — 공지 문안은 **리스크·일본어 검토 완료**. 제목 `[안내]…안내`·앱푸시 `(JST)`·th 인사말을 다시 제안하지 않는다
- **배너 길이 조정 종료**(2026-09-30) — 배너가 **2줄까지 표시되도록 기능 업데이트**됐다. en·th 길이를 이유로 재단축을 제안하지 않는다
- **잔여 오픈 이슈 8건은 종료 처리**(2026-09-29) — ① 바코드·핀 조회 ② 도메인·IP 선작업 ⑥ 발급 실패 처리 ⑦ CS 스크립트 ⑧ SK플래닛 연락 채널 ⑩ 법무 확인 ⑬ 공지사항 언어 세트 ⑭ 앱푸시 수신거부. 위키 3번 표·4-3·5-7에 종료 표기(v40). **다시 확인 필요로 올리지 않는다**

- **위키에서 사용자가 지운 절·행은 복원하지 않는다** — 「6. 확인 필요」 섹션·5-5 My 행·③ 행·5-6절. 지워진 상태를 전제로 잔여 참조만 정리한다(2026-09-23)
- **OA-3 지연 안내에 버튼을 두지 않는다** — 표성만님 안에는 있었으나 09-29 사용자 지시·재확인. 그 안을 근거로 복원을 재제안하지 않는다

## 세션 기록 (최신 위, 최대 5개)

### 2026-10-12 — 세션 #6: 예약 공개 API 확인 · 이관 당일 운영 예약

- LPC 예약 공개(publish reservation) API 7종을 CMS 번들에서 찾고 조회로 구조 실측 → `md/landpress.md` §10-2-1(`476de3e`) · prod `maintenance_banner` 비공개 · `on_off=true` · `buy_block=false` 확인 → 사용자 예약(23:00 공개 · 08:00 공개 취소 5+5건 `READY`) 검증 · 23:50 구매 차단은 이 PC 세션 전용 예약(CronCreate)
- 교훈 — **세션 전용 예약(CronCreate)은 그 PC · 그 세션이 살아 있을 때만 돈다** → PC를 옮길 수 있으면 핸드오프에 실행 절차를 통째로 남긴다 · 정해진 시각의 공개/내림은 LPC 예약이 Claude 실행보다 안전하다(필드 값 변경만 Claude)

### 2026-09-30 ~ 10-06 — 세션 #3~#5 (요약 · 상세는 [`sk-gifticon-migration/history.md`](sk-gifticon-migration/history.md))

- #5 OA 3종 순화 재작성 · beta·prod 반영 · 실발송 `\n` 미적용 → 줄 단위 구조 규칙 · #4 노출 위치 변경(홈 추가) · OA 히어로 최종본 · #3 일본어 현지인 검토 반영

### 2026-09-23 ~ 29 — 세션 #1 · #2 (요약): 문서 생성 · 5-5 설계 반복 · 화면 고지 확정 · `maintenance_banner` 신설 · OA 3종 5개 언어 등록 · 공지사항 5개 언어 — 교훈: 부분 치환 `<h1>` 중복 · 커밋은 `git commit -- <경로>`
