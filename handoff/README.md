# handoff/ — 계층 구조 계약

핸드오프는 **3계층**이다. 계층을 섞으면 4명·8머신 환경에서 충돌하거나 남의 결정을 모르고 재작업한다.

| 계층 | 파일 | 담는 것 | 쓰는 사람 | 줄 상한 |
|---|---|---|---|---|
| 공유 정본 | `../HANDOFF.md` | 전역 규칙·스킬 표·전역 컨텍스트 노트·**프로젝트 인덱스** | 규칙 변경 시에만 | 100 (인덱스 제외) |
| 프로젝트 | `projects/{name}.md` | 위키·엑셀·현재 상태·다음 할 일·그 프로젝트의 결정/⛔종결/세션 기록 | 담당자 | 120 |
| 사람 | `people/{person}.md` | hostname별 경로·환경 복구·PC 간 차이·개인 선호 | 본인만 | 40 |
| 레인(락) | `lanes/{...}.md` | **전역 자원 점유** — 파일 존재 = 점유 중 | 전역 자원 만질 때만 | 20 |

## 세션 정리 시 어디에 쓰는가 — diff로 판별한다

```bash
git diff --name-only origin/main...HEAD
```

| 건드린 경로 | 갱신 대상 |
|---|---|
| `guide/` · `dropweb/` · `md/` · `scripts/` · `templates/` · 용어집 | `HANDOFF.md` + **레인 파일 삭제** |
| `xlt/` · `reports/gate/{prefix}_*` · 특정 위키 페이지 | `projects/{prefix}.md` |
| 의존성 · 경로 · VPN · PC 고유 이슈 | `people/{나}.md` |
| 프로젝트 파일을 갱신했으면 | `HANDOFF.md` 인덱스의 **그 1줄만** 동기화 |

세 곳 다 해당하면 세 곳 다 쓴다. 절차 정본은 `.claude/skills/handoff/SKILL.md`.

## 온보딩 (자동 판별)

훅이 `handoff.person` · `user.email` · **이 PC의 hostname이 어느 `people/*.md`에 등록됐는지** · 저장소 커밋 author 이력을 보고 상태를 **A~E**로 판별해 주입한다. Claude는 그 상태의 조치만 수행하고, **판별로 알 수 있는 것은 묻지 않는다**(A는 질문 0개 / C는 1개 / D는 3개). 상태별 절차는 `.claude/skills/handoff/SKILL.md` 「온보딩」.

새 사람이 합류하면 `people/{키}.md`(템플릿 복사) + `HANDOFF.md` 인덱스 담당자만 채우면 되고, 그 PC의 hostname을 PC 표에 적어두면 **다음부터 그 PC는 상태 A로 자동 인식**된다.

## 사람 식별 (필수 설정 — PC 2대 모두 동일하게)

`people/{person}.md` 자동 선택과 커밋 author 식별에 쓴다. hostname은 식별자가 아니다(1인 2PC).

```bash
# ⚠️ 아래 세 줄은 예시 값이다. 그대로 실행하지 말고 본인 값으로 바꿔 실행할 것
# (2026-08-20에 예시 값이 그대로 실행돼 5커밋이 잘못된 author로 푸시된 전례)
git config --global user.name "<내 이름>"
git config --global user.email "<내 메일>"
git config --global handoff.person <사람키>
```

훅 판별 순서: `handoff.person` → `user.email`의 `@` 앞부분 → (없으면 사람 파일 주입 생략).

## 분할 금지

**전역** 결정·⛔종결은 프로젝트 파일에 두지 않는다 — 다른 프로젝트 세션이 못 보고 재제안한다. 애매하면 `HANDOFF.md`에 둔다.
