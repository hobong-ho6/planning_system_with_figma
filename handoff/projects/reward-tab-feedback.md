# reward-tab-feedback — 리워드탭 개선 후 피드백 반영 (Unifi v1.11.0)

> 담당자: `hogeun` · 마지막 갱신: 2026-10-08 · 세션 #1 · 마지막 커밋 `b941b82`

## 대상 / 링크

- 위키: `4838291699` 「리워드탭 개선 후 피드백 반영」(상위 `[PL] Unifi v1.11.0`) — **현재 v4**
- Figma: Web3 `76360-16841` 「리워드탭 추가 변경」(Rewards 탭 · 출석 체크 · 이자 카드)
- XLT 서비스·키스페이스: **Dapp Portal**(v2.7.0) · 키 `UF_common_apps_btn_get`(UIT 형식) · `mr_interest_boost_card(_ing)`(`{0}`) · 위키 Screen 소제목 **LV**(사용자 확인 2026-10-07)
- 엑셀: 위키 첨부 `xlt_output_20261007103653.xlsx`(3키 통합 · Dapp Portal 업로드용 — 앞서 만든 1키 · 2키 엑셀과 값 동일)
- 게이트 리포트: `gate_report_20261007_common_apps_btn_get_checkin.md` · `_mr_interest_boost_card_ing.md` · `_reward_tab_wiki_4838291699.md`(gitignore → Auto-react `e43615b` 사본)

## 현재 상태

Screen `reward_main_01` 1행(이미지 어노테이션 · 코멘트 2건 · XLT 3키) + 다국어 번역 섹션 + 엑셀 첨부. 같은 페이지에 원본 `4333020754` 「popup luckyball」 행을 **LIFF(USDT) · Unifi mini(JPYC) 2행으로 나눠 복사**(이미지 재첨부 · 원본 형식 그대로 — Screen ID 비구조화 · XLT `#` 빈칸). 게이트 P0 0.

| 키 | 변경 | 값 |
|---|---|---|
| `UF_common_apps_btn_get` | 기존 키 업데이트(받기 → 출석하기) | `UF_dm_dc_btn` 등록값 그대로 — 出席する · Check In · เช็คอิน · 簽到 |
| `mr_interest_boost_card` | en만 변경 | Get {0}% **annual** interest |
| `mr_interest_boost_card_ing` | 신규 | 연 {0}% 이자\n혜택 받는 중 · Earning {0}% annual interest |

## 진행 중 작업(WIP)

없음(위키 · XLT는 git 밖).

## 다음 할 일

- [ ] **P0 — 사용자 Dapp Portal 업로드 확인** — 「올렸다」 하면 레지스트리 재조회로 3키 대조
- [ ] **P0 — FE 확인**: 게임 미션 「받기」 버튼이 `UF_common_apps_btn_get`을 공유하는지(공유면 그 버튼도 「출석하기」로 바뀐다 — 위키 정책 1에 확인 필요로 기재)
- [ ] P2 — 출석 ja · en 표기 통일 여부(`UF_dm_dc_btn` 出席する · Check In ↔ 나머지 출석 키 チェックイン · Check in) · popup luckyball 행을 구조화 Screen ID로 바꿀지

## 주요 결정 사항 (이 프로젝트 한정)

| 날짜 | 결정 | 근거 / 커밋 |
|---|---|---|
| 2026-10-07 | 출석하기 값 = `UF_dm_dc_btn` 등록값 · 이자 카드 두 키 en에 annual · Screen ID `reward_main_01` · 담당 LV · popup luckyball은 USDT/JPYC 별도 행 | 사용자 |

## ⛔ 사용자 결정으로 종결 (재작업·재제안 금지 — 이 프로젝트 한정)

- (없음)

## 세션 기록 (최신 위, 최대 5개)

### 2026-10-07 — 세션 #1: 출석하기 · 이자 카드 XLT · 리워드탭 위키 (위키 v1 → v3)

- 완료: 라이브값 조회 2건 · Dapp Portal 엑셀 3종(1키 · 2키 · 3키 통합) · 위키 Screen 1행 + 다국어 + 첨부 · popup luckyball 2행 복사
- 교훈: 「annual interest」 표기는 실측 19건 최다로 결정 · `common` 키는 화면 밖 사용처가 있을 수 있어 업로드 전 FE 확인을 남긴다
