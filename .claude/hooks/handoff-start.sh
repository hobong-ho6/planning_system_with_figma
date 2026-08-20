#!/usr/bin/env bash
# SessionStart 훅 — 핸드오프 계층 주입 (계약: handoff/README.md)
# 주입: ① HANDOFF.md 공유 정본 ② 점유 중 레인 ③ 내 people 파일 ④ 프로젝트 파일 "목록"
# 프로젝트 본문은 주입하지 않는다(대상이 정해지면 그때 읽는다).
# 어떤 실패도 세션 시작을 막지 않는다.
set -uo pipefail

DIR="${CLAUDE_PROJECT_DIR:-$PWD}"
[ -f "$DIR/HANDOFF.md" ] || exit 0

person="$(git -C "$DIR" config --get handoff.person 2>/dev/null || true)"
if [ -z "$person" ]; then
  email="$(git -C "$DIR" config --get user.email 2>/dev/null || true)"
  person="${email%@*}"
fi

python3 - "$DIR" "$person" <<'PY' || exit 0
import glob, json, os, sys

root, person = sys.argv[1], sys.argv[2]


def read(path):
    try:
        with open(path, encoding="utf-8") as f:
            return f.read().rstrip()
    except OSError:
        return None


out = [
    "[핸드오프 계층 주입] 착수 전 아래를 확인하고 한 줄 브리핑할 것.",
    "계층 계약·세션 정리 시 갱신 대상 판별: handoff/README.md · 절차 정본: .claude/skills/handoff/SKILL.md",
    "",
    "==== ① 공유 정본 (HANDOFF.md) ====",
    read(os.path.join(root, "HANDOFF.md")) or "",
]

lanes = sorted(
    p for p in glob.glob(os.path.join(root, "handoff/lanes/*.md"))
    if os.path.basename(p) != "README.md"
)
out += ["", "==== ② 전역 자원 점유 (handoff/lanes/) ===="]
if lanes:
    out.append("⚠ 아래 자원은 다른 세션이 점유 중이다. 같은 자원을 만지기 전에 사용자에게 보고할 것.")
    for p in lanes:
        out += ["", f"--- {os.path.basename(p)} ---", read(p) or ""]
else:
    out.append("점유 없음.")

if person:
    me = read(os.path.join(root, "handoff", "people", person + ".md"))
    out += ["", f"==== ③ 내 환경 (handoff/people/{person}.md) ===="]
    out.append(me if me else f"파일 없음. 환경 노트를 남기려면 handoff/people/{person}.md 를 만든다(템플릿: _TEMPLATE.md).")
else:
    out += ["", "==== ③ 내 환경 ====",
            "사람 식별 불가 — git user.email 또는 handoff.person 미설정. handoff/README.md '사람 식별' 참조."]

projects = sorted(
    os.path.basename(p)[:-3] for p in glob.glob(os.path.join(root, "handoff/projects/*.md"))
    if os.path.basename(p) != "_TEMPLATE.md"
)
out += ["", "==== ④ 프로젝트 파일 (본문 미주입 — 대상 확정 후 읽을 것) ===="]
out.append(", ".join(projects) if projects else "없음(아직 분해 전 — 상태는 ① HANDOFF.md 참조).")

print(json.dumps({
    "hookSpecificOutput": {
        "hookEventName": "SessionStart",
        "additionalContext": "\n".join(out),
    }
}, ensure_ascii=False))
PY
