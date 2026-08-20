# {person}

> 사람키: `{person}` · git identity `{이름} <{메일}>` · `handoff.person={person}` — **PC 전부 동일**(규칙: `handoff/README.md` 「사람 식별」)
> 담당 프로젝트: `projects/{a}.md`, `projects/{b}.md`

## PC

| hostname | 저장소 경로 | git 세팅 | 비고 |
|---|---|---|---|
| `{hostname}` | `/Users/{u}/Documents/planning_system_with_figma` | ⬜ 미완료 / ✅ 완료(날짜) | 사내망·VPN 가능 여부 |

> ⚠️ **위 hostname과 헤더의 이메일은 지우지 않는다** — SessionStart 훅이 이 두 값을 스캔해 `handoff.person` 미설정 상태에서도 신원을 판별한다(`handoff/README.md` 판별 순서 ②③).

## 환경 복구

```bash
pip3 install --break-system-packages -r scripts/requirements.txt
```

## 개인 노트

- {이 사람의 PC에서만 발생하는 함정 · 선호하는 작업 방식}
