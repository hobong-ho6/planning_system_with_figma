# home-voucher-banner — 1,000엔 바우처 배너 (Unifi mini 홈 · v1.7.9.1 핫픽스)

> 담당자: `hogeun` · 마지막 갱신: 2026-09-15 · 세션 #1 · 마지막 커밋 `45c454d`

## 대상 / 링크

- 위키: https://wiki.workers-hub.com/pages/viewpage.action?pageId=4725962816 — **현재 v2** (신규 생성 · 부모 `[PL] Unifi v1.7.9.1` `4744893034`의 첫 자식)
- Figma: `Web3` 파일 `GOCHAYBS7hIrmWRGNuJOKV` / `Home` 섹션 `74343:3254` — AS-IS `74343:4097` · TO-BE ko `74343:3255` · TO-BE ja `74343:3664`
- 근거 Slack: https://group-all-workers-hub.slack.com/archives/C08HYMJ7Z8V/p1789435945748639 (1,000엔 바우처 이벤트 Home UI 조정 · 핫픽스 합의 · 버전 확정)
- XLT 서비스·키스페이스: **Dapp Portal / WEB BROWSER** · 프리픽스 `mini_` · 담당 FE **LV**
- 엑셀: `xlt/xlt_output_20260915112118.xlsx` (git 미추적 — `xlt/`는 `.gitignore`) · 위키 첨부가 정본
- 게이트 리포트 prefix: `reports/gate/gate_report_home_voucher_banner_*.md`

## 현재 상태

**작업 완료 · 시스템 등록까지 실측 확인.** 위키 신규 생성(v2 — 제목을 「100엔샵 배너」→「1,000엔 바우처 배너」로 사용자 요청 변경, pageId 유지)하고 Policy 4행·Screen 2행(AS-IS/TO-BE)·GA Event·다국어 표를 채웠다. `check_wiki_storage.py` **pre·post 모두 exit 0**, 렌더 검증에서 이미지 3장·Figma 위젯 iframe 정상·`Unknown macro`/`Unknown Attachment` 0건.
XLT 신규 2키는 **사용자가 업로드 완료**했고, 업로드 후 레지스트리 재조회로 **Dapp Portal v2.6.1 1,692→1,694키 · 5개 언어 전건 일치**를 실측했다. 게이트는 P0 0건 통과(`check_gate_report.py` exit 0).

## 진행 중 작업(WIP)

없음. 작업 트리 clean.

## 다음 할 일

- [ ] P2 **배너 랜딩 URL 확정** — Slack 스레드에서 `miniapp.line.me/unifi/event/voucher-event-1?utm_*&referral_code=2050_SUTGA&attribution_code=2050_SUTGA`가 제안됐으나 **확정 답변이 없다**. 위키 Policy에는 사용자 지시로 **명시 + 「변경될 수 있다」 병기**로 넣어 뒀다. 확정되면 Policy 「배너 진입 동작」 행만 외과적 갱신.

## 주요 결정 사항 (이 프로젝트 한정)

| 날짜 | 결정 | 근거 / 커밋 |
|---|---|---|
| 2026-09-15 | **기존 `UF_jpyc_buy_guide_banner1/2_*` 4키는 값·키 모두 변경하지 않고 홈 전용 신규 키를 만든다** | 그 키들은 위키 「JPYC 구매가이드 진입배너」(`4478866687` v10)에서 **MINI Home Tab · MINI Reward Tab · Web&Liff KPick Tab 3곳 공통**으로 정의돼 있다. 요청은 Home만 조정이라 값을 고치면 나머지 두 탭 배너까지 바뀐다. `e699113` |
| 2026-09-15 | **ja는 Figma 기재를 유지한다** — `バウチャー`(용어집 정본 `クーポン`·deprecated #22) · `今すぐ購入`(선례 `今すぐ購入する`) | 사용자 지시(「피그마에 일어까지 기재해뒀으니 일어와 한국어는 해당 내용 사용」). 실측(`バウチャー` 0건/`クーポン` 31건 · `今すぐ購入` 0건/`今すぐ購入する` 2건)을 제시한 뒤 확정받았다. ⚠️ **이 2키가 시스템에서 해당 표기의 유일 사례**가 된다 — 향후 표기 통일 시 대상 |
| 2026-09-15 | Screen ID는 IA 등재 어휘 **`home_main_mini_01`** 그대로 쓰고 AS-IS/TO-BE 2행에 같은 ID를 반복 표기 | 사용자 승인. 배너 전용 ID 신설(→ IA.md 추가 필요)은 선택하지 않았다 |
| 2026-09-15 | GA는 `view_home_main_mini_01` 1건 + `click_home_voucher_banner`(`#`=1~2, **배너 영역 전체**) | 클릭 영역은 기존 JPYC 배너 위키의 「1,2 영역 선택 시 이동」 정의를 준용. 이름은 IA 실측 어휘 `click_home_pay_qr` 패턴 |

## ⛔ 사용자 결정으로 종결 (재작업·재제안 금지 — 이 프로젝트 한정)

- **페이지 제목** — 「1,000엔 바우처 배너」로 확정(2026-09-15). 최초 지시는 「100엔샵 배너」였고 Figma 내용과 어긋남을 보고해 사용자가 변경했다. 다시 제안하지 않는다.
- **ja 표기 2건**(`バウチャー`·`今すぐ購入`) — 위 결정 표대로 Figma 기재 유지로 종결. 용어집 정본과 어긋나지만 **재제안하지 않는다**(표기 통일 작업이 별도로 열릴 때만 다룬다).
- **Figma 원문 교정 요청** — ko 원문 `¥1,000엔`(통화 중복)은 XLT 값에서 `1,000엔`으로 교정하고 alias만 기록했다. 디자이너 수정 요청은 올리지 않는다.

## 세션 기록 (최신 위, 최대 5개)

### 2026-09-15 — 세션 #1: 위키 신규 생성 + XLT 2키 + GA 정의 (`e699113`·`ac548a1`)

- 완료: 위키 `4725962816` 생성(v1) → 제목 변경(v2) · XLT 신규 2키 정의·엑셀 생성·**사용자 업로드 후 등록 실측 확인** · GA Event 정의(view 1·click 1) · 게이트 리포트(P0 0 · `check_gate_report.py` exit 0)
- 교훈: **「같은 자리의 배너」라도 기존 키를 재사용하기 전에 그 키의 위키 정의를 먼저 읽는다.** `UF_jpyc_buy_guide_banner2_*`는 키 이름만 보면 JPYC 가이드 배너 전용 같지만 실제로는 **3개 탭 공용**이었다 — 위키 `siteSearch` 1회로 드러났고, 값 교체를 택했다면 Reward·K-Pick 탭이 조용히 깨졌다.
- 교훈: **자동 검증기 P0=0은 en 금액 표기를 봐주지 않는다.** 초안 `¥1,000 OFF`를 수동 검토에서 잡아 등록값 실측(금액 문맥 en `JPY` 5건 : `¥` 0건)으로 `1,000 JPY OFF`로 교정했다. ko/th/zh 금액 표기도 같은 방식으로 선례 대조했다.
- 교훈: 프레임 이름이 **전부 빈 문자열**이라 이름 기반 식별이 불가능했다 — AS-IS/TO-BE는 캔버스 x좌표와 라벨 TEXT(`AS-IS`/`TO-BE`)로 판별했다.
