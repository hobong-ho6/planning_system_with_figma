# isaac-toast-order — 이삭토스트 LINE 주문 (비버웍스 PoC)

> 담당자: `hogeun` · 마지막 갱신: 2026-11-02 · 메인 위키 **v7** · 리서치 위키 **v2** · 대사 API 검토 위키 **v1** · 일감 T246(Auto-react) · Jira UNIFY-12832

## 대상 / 링크

- 메인 위키: [pageId 4966458661](https://wiki.workers-hub.com/pages/viewpage.action?pageId=4966458661) `이삭토스트 LINE 주문 (비버웍스 PoC)` — 부모 `[Hogeun]` 3910828993 · space UNIFI
- 리서치 위키: [pageId 4964267756](https://wiki.workers-hub.com/pages/viewpage.action?pageId=4964267756) `[리서치] 관광객 대상 모바일 미리주문 경험` — 메인 하위
- 대사 API 검토 위키: [pageId 4978653259](https://wiki.workers-hub.com/pages/viewpage.action?pageId=4978653259) `이삭토스트 — 비버웍스 대사 API 검토` — 메인 하위 · 11-02 생성
- 초안 정본: Auto-react `reports/plans/T246_isaac_main_wiki_draft.md` · `T246_mobile_order_research_wiki_draft.md` (c48147f)
- Figma: `uyUkM7rWWg1vAwpf47um86` node `75786-2` (주문 플로우 v2 — Flow widget)
- 관련 위키: 회의록 `4961468532` · 개발 설계 `4933797314` · API 스펙 `4935973048` · OA `4833603093`
- XLT: 없음(Screen 비어 있음) · 담당 FE 팀 미정

## 현재 상태

정본 템플릿으로 메인 위키를 생성했다(History · Related Docs 10행 · Background · Policy 7행 · 정리 필요사항 12행(status 매크로 미결 8 · 검토 4) · Flow Figma widget · Screen 비움). 리서치 위키는 초안 1~10절 구조 그대로 옮겼다. Claude 작성 본문은 파랑. pre·post 검사 exit 0 · Unknown macro 0.

## 진행 중 작업(WIP)

없음

## 다음 할 일

- [ ] P1 메인 위키 반영 제안 승인 대기(11-02 대사 API 검토) — Related Docs에 검토 위키 행 추가 · 정리 필요사항 1 · 12 비고에 「대사 API(11-02)는 주문 연동 아님」 · 9(0원 주문은 대사에도 안 잡힘) · 15(부분취소 `trxStCd` 3 존재) 비고 보강
- [ ] P1 비버웍스 확인 질문 9건 전달(검토 위키 「비버웍스 확인 질문」) — 주문 연동 API · 웹훅 · 대기번호 발번 · MID 주체 · Unifi Pay 대사 여부
- [ ] P1 비버웍스 주문 연동 API 명세 수령 → Figma 대조 · 정리 필요사항 1·2·12 반영
- [ ] P1 비버 PG 가이드 v0.1.5 첨부 여부 확인(표지 공유 제한 문구) — 사용자가 이 결정을 하면 첨부 · Related Docs 「첨부 보류」 갱신
- [ ] P2 Policy 7행 확정 여부 사용자 검토(초안이 「확정으로 볼 수 있는 것」만 골랐다)
- [ ] P2 화면 확정 후 Screen 표 · 담당 FE 팀 판별 · OA 메시지(Auto-react `T246_isaac_oa_draft.md`)

## 주요 결정 사항 (이 프로젝트 한정)

| 날짜 | 결정 | 근거 / 커밋 |
|---|---|---|
| 10-29 | 메인 기획 위키 먼저 · `[Hogeun]` 하위 · 리서치는 메인 하위 | 사용자 지시(Auto-react T246) · 구성안 사용자 승인(PS 세션) |
| 10-29 | PG 가이드 docx는 첨부 보류 — Related Docs에 「첨부 보류」로만 | 표지 공유 제한 문구 |

## ⛔ 사용자 결정으로 종결 (재작업·재제안 금지 — 이 프로젝트 한정)

- 없음

## 세션 기록 (최신 위, 최대 5개)

### 2026-11-02 — 비버웍스 가맹점 대사 API V1.2.1 검토 위키 생성

- 완료: 대사 API docx 분석(엔드포인트 `POST /api/v1/reconcile` 1개 · 다음 날 06시 일 단위 · 콜백 없음 · `trxStCd` 결제 상태만) → PoC 정의 22항목 판정(가능 4 · 부분 가능 4 · 불가능 12 · 비버 확인 필요 2) → 하위 위키 `4978653259` v1 생성 · pre/post 검사 exit 0. 메인 위키는 고치지 않았다(반영은 제안만).
- 결론: **대사(정산 대조) API라 주문 연동 API(정리 필요사항 12)를 대체하지 않는다.** docx는 표지 공유 제한 문구 · 샘플 가맹점 Key가 있어 첨부 · 인용하지 않았다.
- 교훈: Confluence REST가 연속 429를 냈다(Retry-After 0~3초로 와도 계속 거절) — 20초 이상 간격으로 재시도해야 통과했다.

### 2026-10-29 — T246 위키 2종 신규 생성

- 완료: 메인 `4966458661` v1→v3(리서치 링크 · 본문 파랑) · 리서치 `4964267756` v1→v2(본문 파랑) · post 검사 exit 0 · Figma iframe 1
- 교훈: 생성 직후 파랑 표시를 빠뜨려 재PUT했다 — 신규 생성도 처음부터 본문 파랑으로 쓴다. 메인 PUT 저장 길이 +714자(7%)는 Confluence 정규화(macro-id)라 `put_wiki_storage.py` 5% 경고가 오탐이었다
