# HANDOFF — 공유 정본

<!-- 핸드오프는 3계층이다. 이 파일에 쓰는 것/쓰지 않는 것·분량 상한·재팽창 방지 기준은 `handoff/README.md`가 정본이다.
     절차 정본(세션 시작·종료): `.claude/skills/handoff/SKILL.md` -->

- **프로젝트**: planning_system_with_figma — Figma → 다국어 번역(XLT) → Confluence 위키 파이프라인
- **저장소**: GitHub `hobong-ho6/planning_system_with_figma` (branch `main`) · 로컬 경로는 PC마다 다르다 → `handoff/people/{나}.md`
- **토큰**: Figma·Confluence·Jira PAT — **키체인 우선**(`figma-pat`·`confluence-pat`·`jira-pat` · 2026-09-18 현재 `confluence-pat`만 등록됨)**, 없으면 필요한 단계에서 요청**(2026-09-18 개정 · 파일·코드에 하드코딩 금지). 사용 직전 유효성 검증 · Jira는 **Jira PAT 별도**(Confluence PAT로는 401)

---

## 프로젝트 인덱스

> 활성만 올린다(종료 → `_archive/`). **한 줄 상태는 말 그대로 한 줄** — 상세·근거는 프로젝트 파일에 있다(재팽창 방지 기준: `handoff/README.md`).
> 아카이브 12건은 `_archive/`에 있고, 담당자 문자열은 `git config handoff.person`과 같아야 한다.

| 프로젝트 | 담당자 | 대상 | 갱신 | 한 줄 상태 |
|---|---|---|---|---|
| [system-meta](handoff/projects/system-meta.md) | `hogeun` | 핸드오프 구조·규칙·도구 | 09-22 | 미결 2 · HANDOFF 9.3KB로 압축(주입 13.5KB) · 재팽창 방지 기준·대기 키 대조기 신설 |
| [masters](handoff/projects/masters.md) | `hogeun` | 마스터 5종 + K-Pick 노출 정책·FAQ | 09-16 | 정합 유지 · ⚠️ `syncExcludedFields`에 `badges`·`reviewCount` 없음(동기화 시 덮일 수 있음) |
| [glossary-guide](handoff/projects/glossary-guide.md) | `hogeun` | 용어집 + 기획자 가이드 **(전역 자원 · 락 필요)** | 09-16 | 용어집 v5.5 · 가이드 v43 · ⛔ 보완은 모아서 한 번에(대기 23건) · 미결 1 |
| [ia-monitor](handoff/projects/ia-monitor.md) | `hogeun` | Unifi IA 주간 점검(월 10:00) | 09-21 | 점검 #8 반영 · 🔴 KAIA 이율 3중 불일치·리워드 스켈레톤·Beta K-Pick 개편 · 어휘 승인 대기 12 |
| [unifi-mini-v2](handoff/projects/unifi-mini-v2.md) | `hogeun` | 위키 `4704515582` + LPC `4727978725` · 29화면 | 09-17 | 본문 v247 · LPC v64 · 🔴 브랜드 24종 용어집 v5.7 대기 · th/zh 구 표기 잔존 · 의료광고 조치 |
| [unifi-mini-v2-oa](handoff/projects/unifi-mini-v2-oa.md) | `hogeun` | 위키 `4725932984` 예약 OA 16화면 | 09-16 | beta 16건 등록 · ⚠️ hero·버튼 URL 임시값 · ko만(번역 미착수) |
| [100yen-deal](handoff/projects/100yen-deal.md) | `hogeun` | 위키 `4725963532` — Screen 3화면 + OA 2종 | 09-16 | 위키 v26 · XLT 26키 전건 등록 · 🔴 「더보기」 landing URL 미확정 · 공유 툴팁 하드코딩 |
| [cashback-disclaimer](handoff/projects/cashback-disclaimer.md) | `hogeun` | 위키 `4770505327`(+`4774237088`) — 전 바우처 | 09-23 | Ⅰ **리스크팀 검토 완료**(`LNS-1622` · 확정문 2건 ⛔수정금지 · **결제페이지 단독**) · 위키 **v21** — 5개 언어 확정(P0 0) · **XLT 전건 등록 완료** · ⛔ **결제페이지는 XLT 단독**(LPC 미사용) → 남은 건 **FE 구현** · Ⅱ·Ⅲ LPC 반영 완료(남은 건 XLT 업로드 1키) · 🔴 구매 수량 한도 부재 |
| [cu-qr-voucher](handoff/projects/cu-qr-voucher.md) | `hogeun` | 위키 `4774235795` CU 상품권 전용 동선 · 3화면 | 09-22 | 위키 v6 · XLT 7키 전건 등록 · LPC 관리 영역(`shopping_guide`/`guide_page`) 반영 · ⛔ 결제 바텀시트 두 벌 키는 「유지」로 종결(09-21) |

---

## 프로젝트 스킬 / 에이전트

저장소에 커밋돼 `git pull`만으로 다른 PC에서도 동작한다. 새로 만들면 여기 한 줄 등록 + **파일과 같은 커밋으로 푸시**.

- 스킬 `handoff` — 세션 인수인계 정본 절차(시작 브리핑 / 종료 갱신·푸시)
- 에이전트 `figma-source-issues` / `translation-reviewer` / `wiki-policy-auditor` / `glossary-guide-updater` — 각각 Figma 원문 수정 취합 · 번역 2차 독립 검토 · 위키↔코멘트 정합 감사 · 용어집 가이드 탭 갱신 (**전부 읽기 전용 또는 산출물 한정**, 상세는 `.claude/agents/*.md`)
- 훅: `.claude/settings.json` SessionStart → `.claude/hooks/handoff-start.sh`가 계층 주입 · `.claude/settings.local.json`·`launch.json`은 **기기별이라 git 제외**

---

## 전역 절차 · 컨텍스트

> 규칙 정본은 `CLAUDE.md`와 `md/`다. **문서에 없는 실측·사각지대 전문은 [`md/handoff-context.md`](md/handoff-context.md)로 이관**했다(2026-09-22 포인터 압축 — 주입량만 줄인 것이고 내용은 그대로다). 아래는 목차 + 한 줄 경고이며, **그 작업에 들어가기 전 해당 절을 연다.** 새 실측은 그 파일에 쓰고, 여기엔 한 줄만 올린다.

| § | 주제 | 한 줄 경고 |
|:--:|---|---|
| 1 | LPC 쓰기 | `lpc_safe_put.js`로만 · 쓰기 전후 `check_lpc_nulls.py` **exit 0** · ⚠️ 자동 승인 모드에선 CMS 쓰기가 차단된다 |
| 2 | 파이프라인·엑셀 | ⛔ 엑셀은 **`export_to_xlt.create_xlt_excel`로만** — pandas 직접 생성은 `plurals`가 깨져 업로드 실패 |
| 3 | 스크립트 계약 | `validate_translation.py <엑셀> <용어집>`은 **위치 인자만**(빠뜨리면 2단계를 조용히 건너뜀) · `CONFLUENCE_PAT`은 **환경변수** · `scripts/` 수정 후 **`test_validation.py` 필수** |
| 4 | 검증기 사각지대 | **`P0=0`은 「이 검사가 볼 수 있는 범위에 문제 없음」** — 언어 혼입은 20조합 중 15개만 잡는다 |
| 5 | 위키 편집 | 라이브 재조회 → surgical 교체 → **버전 가드** → PUT → `check_wiki_storage.py` **pre/post exit 0** · 첨부는 **`/data`** 로 PUT(없으면 조용히 무시) |
| 6 | 프레임·어노테이션 | 이미지 ⓝ = Description 번호 = XLT No **1:1** · 정책=빨강/xlt=파랑 · **렌더 후 육안 확인 필수** · 동명 프레임 주의 |
| 7 | Landpress | **정본은 로컬 JSON이 아니라 실등록값** · ⛔ beta·prod를 **같은 작업 안에서 함께**(`uid` 기준) · 기존 항목에 로케일 추가 X |
| 8 | 키·표기 규칙 | LV(`mini_`·`{0}`) / UIT(`UF_`·`{{0}}`) / OA는 팀이 아님 — 위키에 구분이 없으면 **사용자에게 질문** |
| 9 | XLT 키는 등록 전이 유일한 기회 | FE 전달 후 변경 불가 · 프리픽스도 **선례 N건/0건 실측** · 구값 복원은 `reports/gate/*.md`가 사실상 유일한 자산 |
| 10 | Jira | **별도 PAT 필요**(Confluence PAT는 401) · description만 보면 안 된다(Figma가 코멘트·첨부에 있다) |
| 11 | 용어집 「실사용 0건」 판정 | 문자열이 있어도 **뜻이 다르면 선례가 아니다** |
| 12 | 고유명사 로마자 표기 | ⛔ 추측 금지 — **번역이 아니라 조사**(공식 출처 확인 후 대소문자까지 그대로) |
| 13 | 캐시 금지 실측 | 감사 도중 키가 실제로 삭제돼 1시간 만에 수가 바뀌었다 — 원본 재조회는 형식이 아니다 |
| 14 | 신규 XLT 키 중복 검사 | ⛔ 레지스트리만으론 부족 — **`check_pending_keys.py --wiki`**(다른 세션이 위키에만 올린 미등록 키는 위키 검색만 잡는다) |
| 15 | 산출물 커밋 책임 | 만든 세션이 그 세션 안에 커밋 · 세션 종료 시 `git status`의 `??` 확인 · **남의 변경은 보고만** · 산출물 5종은 gitignore라 **사본은 Auto-react(private)** · ⛔ `git commit`은 **인덱스 전체**를 커밋한다 — 남의 staged 잔재를 먼저 확인 |

---

## 전역 결정 사항

> **전문·근거는 [`md/decisions.md`](md/decisions.md)가 정본**이다(2026-09-22부터 최근 4건도 전문을 거기 둔다 — 주입량 축소). 아래는 최근 4건의 결정문 한 줄이며, **재작업·재제안이 의심되면 그 파일을 먼저 연다.**

- **2026-09-18** 토큰은 **「필요한 단계에서 요청」** — 키체인 우선, 없으면 그 시점에 요청(정본 `CLAUDE.md` 「⛔ 토큰 규칙」)
- **2026-09-18** **산출물은 커밋하지 않는다** — `reports/gate`·`landpress`·`oa`·`xlt`·`assets` gitignore · **사본은 Auto-react(private)** · Auto-react 일감은 task_id 표기
- **2026-09-16** **드랍웹 게시는 Claude가 직접** — REST `PUT /api/sites/{siteId}`(MCP `update_site`는 못 쓴다) · ⛔ 게시 전 사용자 승인(정본 `md/dropweb-guide.md` §8)
- **2026-09-15** **기획자 가이드는 「모아서 한 번에」** — 푸시마다 묻지 않고 `md/guide-backlog.md`에 등재 · 임계(10건·차단규칙 2건·2주) 도달 시에만 한 줄 제안

## ⛔ 전역 종결 (재작업·재제안 금지)

- **에이전트 분업 범위** — 번역·게이트·위키 PUT·엑셀은 **직렬 고정**. 읽기 전용만 팬아웃(손익분기 8~10프레임)

---

## 아카이브 요약 (전역 연혁)

- **종결 프로젝트 6건 + 기반 구축기 연혁 → [`handoff/projects/_archive/README.md`](handoff/projects/_archive/README.md)**로 이관(2026-09-14 분량 압축). 각 아카이브 `.md`의 「다음 할 일」이 닫을 당시의 정본이다 — **재개가 필요하면 그 파일을 `handoff/projects/`로 되돌리고 인덱스에 한 줄 추가**한다
- **살아 있는 교훈 4건**(PUT 전 라이브 rebase · 미추적 파일 덮어쓰기 · 남의 WIP 커밋 금지 · 세션은 병렬로 돈다) → [`md/handoff-context.md`](md/handoff-context.md) §16
- 프로젝트별 세션 기록은 각 `handoff/projects/*.md` 「세션 기록」 참조
