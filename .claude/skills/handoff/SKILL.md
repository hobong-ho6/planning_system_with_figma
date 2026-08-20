---
name: handoff
description: 이 저장소의 3계층 핸드오프(HANDOFF.md 공유 정본 · handoff/projects · handoff/people · handoff/lanes 락)를 읽고 갱신하며 Git으로 동기화하는 세션 인수인계 절차. 사용자가 "핸드오프", "핸드오프 갱신", "세션 정리", "handoff", "이어서 작업", "지난 세션 뭐 했지", "다른 PC에서 이어가게" 라고 말할 때 반드시 사용한다. 세션 시작 시 프로젝트 상태를 파악해야 할 때, 세션을 마무리하고 다음 세션·다른 PC·다른 담당자로 넘길 때, WIP 변경을 원격에 남겨야 할 때도 사용한다.
---

# Handoff

이 저장소는 **Git + 3계층 핸드오프**를 세션 간·PC 간·담당자 간 유일한 인수인계 채널로 쓴다.
로컬에만 있는 것(uncommitted 변경, `git stash`, 대화 기록)은 다른 PC에서 **존재하지 않는 것**으로 취급한다.

| 계층 | 파일 | 담는 것 |
|---|---|---|
| 공유 정본 | `HANDOFF.md` | 전역 규칙·도구·결정 + **프로젝트 인덱스** |
| 프로젝트 | `handoff/projects/{name}.md` | 그 대상의 상태·다음 할 일·결정·⛔종결·세션 기록 |
| 사람 | `handoff/people/{person}.md` | hostname별 경로·환경 복구·PC 간 차이 |
| 레인(락) | `handoff/lanes/{...}.md` | **전역 자원 점유** — 파일 존재 = 점유 중 |

계층 계약·분량 상한은 `handoff/README.md`, 락 규칙은 `handoff/lanes/README.md`가 정본이다.

---

## 세션 시작

1. 상태 확인
   ```bash
   git status --short && git log --oneline -5 && git branch -a --sort=-committerdate | head -10
   ```
   `??`(미추적)이 보이면 **다른 세션 산출물일 수 있다** — 덮어쓰기 전에 확인한다.
2. 원격 최신성 → `git pull --rebase`
   - uncommitted 변경이 있으면 pull 하지 말고 먼저 사용자에게 알린다.
   - rebase 충돌 시 임의로 해결하지 말고 충돌 파일을 보여주고 물어본다.
3. **담당자 식별** (아래 「담당자 식별」)
4. **레인 확인** — `ls handoff/lanes/`. 내가 만질 전역 자원이 잡혀 있으면 **작업하지 말고 사용자에게 보고**한다.
5. 계층 읽기 — SessionStart 훅이 ①공유 정본 ②점유 레인 ③내 people 파일 ④프로젝트 목록을 주입한다. 주입이 없으면 직접 읽는다. **프로젝트 본문은 대상이 정해진 뒤** 그 파일만 읽는다.
6. 인덱스의 `갱신` 날짜·프로젝트 파일의 `마지막 커밋` 해시가 실제 HEAD와 어긋나면 **먼저 그 불일치를 보고**한다(`git log`가 근거).
7. 한 줄 브리핑 후 착수 확인:
   > {프로젝트}: {마지막 상태}. 담당 {person}. 점유 레인 {없음/…}. 다음 첫 작업: {항목}. 시작할까요?

---

## 세션 종료 (핸드오프 갱신)

순서를 지킨다. **문서 갱신보다 코드 보존이 먼저다.**

### 0. 담당자 확인 — 사용자에게 안내한다 (필수)

기록을 어느 사람 파일에 남길지, 프로젝트 담당자를 누구로 적을지가 여기서 정해진다. **아래 「담당자 식별」의 안내를 사용자에게 제시하고 확답을 받은 뒤** 갱신에 들어간다. 미설정 상태로 `(미지정)`을 남기지 않는다.

### 1. 원격 반영
```bash
git pull --rebase
```

### 2. 미완성 작업 보존
uncommitted 변경이 있으면:
```bash
git checkout -b wip/{주제}-$(date +%Y%m%d)
git add {내가 만든 경로만}
git commit -m "wip: {중단 지점 한 줄 요약}"
git push -u origin HEAD
```
- `git stash`는 쓰지 않는다(로컬 전용이라 다른 PC에서 사라진다).
- ⛔ **`git add -A`를 쓰지 않는다** — 같은 PC에서 세션이 병렬로 돌면 다른 세션의 변경을 가로챈다. 경로를 지정해 담고, 남의 변경은 **발견 사실만 보고**한다.
- 비밀파일(`.env`·키·인증서)이 섞이지 않았는지 `git status`로 확인한다. 위험하면 커밋하지 말고 `.gitignore` 추가를 먼저 제안한다.

### 3. 갱신 대상 판별 — diff로 결정한다
```bash
git diff --name-only origin/main...HEAD
```

| 건드린 경로 | 갱신 대상 |
|---|---|
| `guide/` · `dropweb/` · `md/` · `scripts/` · `templates/` · 용어집 | `HANDOFF.md`(전역 규칙·결정) |
| `xlt/` · `reports/gate/{prefix}_*` · 특정 위키 페이지 | `handoff/projects/{prefix}.md` |
| 의존성 · 경로 · VPN · PC 고유 이슈 | `handoff/people/{나}.md` |
| 프로젝트 파일을 갱신했으면 | `HANDOFF.md` 인덱스의 **그 1줄**(담당자·갱신 날짜·한 줄 상태) |

해당하는 곳을 **모두** 갱신한다. 위키·용어집처럼 git에 남지 않는 작업은 diff에 안 잡히므로 **이번 세션에 만진 대상**을 직접 떠올려 프로젝트 파일에 반영한다.

### 4. 레인 해제
전역 자원 작업을 마쳤거나 중단했으면 `handoff/lanes/{...}.md`를 **삭제**한다. 중단이면 삭제 전에 재개 지점을 프로젝트 파일의 WIP에 남긴다.

### 5. 커밋 & 푸시
```bash
git add {갱신한 경로} && git commit -m "chore(handoff): {프로젝트} 세션 #N — {제목}" && git push && git log --oneline -1
```
마지막 커밋 해시를 해당 프로젝트 파일 헤더에 기록한다(`--amend` 또는 짧은 후속 커밋 → 다시 push).

### 6. 완료 보고
푸시 성공을 확인한 뒤에만 완료를 보고한다. 실패하면 원인과 사용자가 할 일을 알린다.

---

## 담당자 식별

`hostname`은 담당자가 아니다 — **한 사람이 PC를 2대 이상 쓰고, 한 PC를 여러 사람이 쓸 수도 있다.** 담당자는 git identity로만 판별한다.

```bash
git config --get handoff.person; git config --get user.email
```

- **둘 다 값이 있으면** — `handoff.person`을 사람 키로 쓴다. `handoff/people/{person}.md`와 프로젝트 `담당자` 필드가 그 값과 같은지 확인한다.
- **`user.email`만 있으면** — `@` 앞부분을 사람 키로 쓴다. 파일명으로 쓰기 지저분하면 `handoff.person` 설정을 권한다.
- **둘 다 비어 있으면** — 커밋 author가 `OS계정@hostname`으로 유추돼 **사람을 특정할 수 없고 GitHub 기여에도 집계되지 않는다.** 세션 정리 시 사용자에게 다음을 그대로 안내하고, 이번 세션의 담당자를 확인받는다:

  > 담당자 식별값이 설정되지 않았습니다. PC **2대 모두**에서 아래를 한 번 실행해 주세요(값은 본인 것으로):
  > ```bash
  > git config --global user.name "이름" && git config --global user.email "본인@example.com" && git config --global handoff.person 사람키
  > ```
  > 이번 세션 기록은 담당자를 무엇으로 적을까요? (`handoff/people/{사람키}.md` 생성 대상)

확인받은 값으로 ① 프로젝트 파일 `담당자` ② `HANDOFF.md` 인덱스의 담당자 열 ③ `handoff/people/{person}.md`를 채운다. **사용자가 답하기 전에 임의로 정하지 않는다.**

---

## 갱신 규칙 (계층별)

- **`HANDOFF.md`**: 전역만. 인덱스는 **활성 프로젝트 1줄씩**. 인덱스 제외 100줄 이내.
- **`projects/{name}.md`**: 「현재 상태」는 덮어쓰기. 세션 기록은 최신을 맨 위에 **최대 5개**, 넘치면 가장 오래된 것을 1~2줄로 압축 병합. 120줄 이내.
- **`people/{person}.md`**: 본인 PC 정보만. 40줄 이내.
- **⛔종결·주요 결정**: **전역이면 `HANDOFF.md`, 특정 대상에만 적용되면 프로젝트 파일.** 애매하면 전역에 둔다 — 프로젝트 파일에 묻히면 다른 프로젝트 세션이 못 보고 재제안한다.
- 추측은 `(미확인)`으로 표기하고, 관련 커밋 해시·경로·명령어를 함께 남긴다. "왜"를 먼저 쓴다.

---

## 확장 (프로젝트·사람 추가)

- **새 프로젝트**: `handoff/projects/{name}.md`를 `_TEMPLATE.md`에서 만들고 `HANDOFF.md` 인덱스에 **1줄** 추가. 이름은 게이트 리포트 prefix(`reports/gate/gate_report_{prefix}_*`)와 맞춘다.
- **프로젝트 종료**: `handoff/projects/_archive/`로 옮기고 인덱스에서 그 줄을 지운다. 인덱스는 **활성만** 유지한다.
- **새 사람**: `handoff/people/{person}.md`를 `_TEMPLATE.md`에서 만들고 본인 PC 2대에 `handoff.person`을 설정한다. 담당 프로젝트의 `담당자` 필드와 인덱스 담당자 열을 갱신한다.
- **새 스킬·에이전트**: `.claude/skills/`·`.claude/agents/`에 두고 `HANDOFF.md` 스킬 표에 한 줄 등록, **파일과 같은 커밋으로 푸시**한다.

---

## 충돌 처리

계층 분리로 대부분 사라지지만, 남는 경우:

- **프로젝트 파일** — 담당자가 단일이라 거의 없다. 나면 「세션 기록」은 양쪽 다 살리고(세션 번호 순), 「현재 상태」는 더 최신 날짜·커밋 쪽을 채택한 뒤 사용자에게 확인받는다.
- **`HANDOFF.md` 인덱스** — 서로 다른 줄을 고쳤으면 양쪽 다 살린다.
- **레인** — 파일 단위라 머지 충돌이 발생하지 않는다. 대신 **같은 자원에 두 레인 파일이 동시에 있으면** 작업을 멈추고 사용자에게 보고한다.
- **전역 자원 덮어쓰기** — `dropweb/*.zip`처럼 git 밖의 산출물은 덮어써도 무음이다(2026-08-10 실측·복구 불가). 락과 「쓰기 직전 최신성 재확인」(CLAUDE.md)을 함께 지킨다.

## 새 프로젝트(저장소)에 이식

`HANDOFF.md`·`CLAUDE.md`·`handoff/`(README·템플릿)·`.claude/`(`skills/handoff/`·`hooks/handoff-start.sh`·`settings.json`)를 복사하고, 인덱스를 비운 뒤 첫 커밋을 만든다.
