# isaac-toast-order — 이삭토스트 LINE 주문 (비버웍스 PoC)

> 담당자: `hogeun` · 마지막 갱신: 2026-10-29 · 메인 위키 **v3** · 리서치 위키 **v2** · 일감 T246(Auto-react) · Jira UNIFY-12832

## 대상 / 링크

- 메인 위키: [pageId 4966458661](https://wiki.workers-hub.com/pages/viewpage.action?pageId=4966458661) `이삭토스트 LINE 주문 (비버웍스 PoC)` — 부모 `[Hogeun]` 3910828993 · space UNIFI
- 리서치 위키: [pageId 4964267756](https://wiki.workers-hub.com/pages/viewpage.action?pageId=4964267756) `[리서치] 관광객 대상 모바일 미리주문 경험` — 메인 하위
- 초안 정본: Auto-react `reports/plans/T246_isaac_main_wiki_draft.md` · `T246_mobile_order_research_wiki_draft.md` (c48147f)
- Figma: `uyUkM7rWWg1vAwpf47um86` node `75786-2` (주문 플로우 v2 — Flow widget)
- 관련 위키: 회의록 `4961468532` · 개발 설계 `4933797314` · API 스펙 `4935973048` · OA `4833603093`
- XLT: 없음(Screen 비어 있음) · 담당 FE 팀 미정

## 현재 상태

정본 템플릿으로 메인 위키를 생성했다(History · Related Docs 10행 · Background · Policy 7행 · 정리 필요사항 12행(status 매크로 미결 8 · 검토 4) · Flow Figma widget · Screen 비움). 리서치 위키는 초안 1~10절 구조 그대로 옮겼다. Claude 작성 본문은 파랑. pre·post 검사 exit 0 · Unknown macro 0.

## 진행 중 작업(WIP)

없음

## 다음 할 일

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

### 2026-10-29 — T246 위키 2종 신규 생성

- 완료: 메인 `4966458661` v1→v3(리서치 링크 · 본문 파랑) · 리서치 `4964267756` v1→v2(본문 파랑) · post 검사 exit 0 · Figma iframe 1
- 교훈: 생성 직후 파랑 표시를 빠뜨려 재PUT했다 — 신규 생성도 처음부터 본문 파랑으로 쓴다. 메인 PUT 저장 길이 +714자(7%)는 Confluence 정규화(macro-id)라 `put_wiki_storage.py` 5% 경고가 오탐이었다
