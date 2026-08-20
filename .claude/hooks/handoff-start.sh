#!/usr/bin/env bash
# SessionStart 훅 — 핸드오프 계층 주입 + 온보딩 상태 판별 (계약: handoff/README.md)
# 주입: ① 공유 정본 ② 점유 레인 ③ 내 people 파일 ④ 프로젝트 목록 ⑤ 온보딩 상태
# 프로젝트 본문은 주입하지 않는다(대상이 정해지면 그때 읽는다).
# 어떤 실패도 세션 시작을 막지 않는다.
set -uo pipefail

DIR="${CLAUDE_PROJECT_DIR:-$PWD}"
[ -f "$DIR/HANDOFF.md" ] || exit 0

person="$(git -C "$DIR" config --get handoff.person 2>/dev/null || true)"
src="handoff.person"
if [ -z "$person" ]; then
  email="$(git -C "$DIR" config --get user.email 2>/dev/null || true)"
  person="${email%@*}"; src="user.email"
fi
[ -z "$person" ] && src="none"
host="$(hostname 2>/dev/null || echo '')"
authors="$(git -C "$DIR" log --format='%an <%ae>' 2>/dev/null | sort | uniq -c | sort -rn | head -6 || true)"

python3 - "$DIR" "$person" "$src" "$host" "$authors" <<'PY' || exit 0
import glob, json, os, re, sys

root, person, src, host, authors = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5]


def read(path):
    try:
        with open(path, encoding="utf-8") as f:
            return f.read().rstrip()
    except OSError:
        return None


# ── people 파일과 hostname 역인덱스
people, host2person = {}, {}
for p in glob.glob(os.path.join(root, "handoff/people/*.md")):
    name = os.path.basename(p)[:-3]
    if name.startswith("_"):
        continue
    body = read(p) or ""
    people[name] = body
    for h in re.findall(r"`([A-Za-z0-9._-]+\.local|[A-Za-z0-9._-]*[Ii]Mac[A-Za-z0-9._-]*)`", body):
        host2person.setdefault(h.lower(), name)

projects = sorted(
    os.path.basename(p)[:-3] for p in glob.glob(os.path.join(root, "handoff/projects/*.md"))
    if not os.path.basename(p).startswith("_")
)
index = read(os.path.join(root, "HANDOFF.md")) or ""
owned = {}
for m in re.finditer(r"^\| \[([\w-]+)\][^|]*\|\s*`?([\w.-]+)`?\s*\|", index, re.M):
    owned.setdefault(m.group(2), []).append(m.group(1))

known = host2person.get(host.lower())
mine = people.get(person) if person else None
host_in_mine = bool(mine and host and host.lower() in mine.lower())

# ── 상태 판정
if person and mine and host_in_mine:
    state, todo = "A · 기존 사용자 · 등록된 PC", "추가 설정 없음. 사용자에게 설정을 묻지 말 것."
elif person and mine:
    state, todo = ("B · 기존 사용자 · 새 PC", (
        f"`handoff/people/{person}.md` PC 표에 이 PC(`{host}`)가 없다. "
        "**저장소 경로 한 줄만 확인해 표에 추가**하고 세팅 열을 ✅로 바꾼다. 그 외는 묻지 않는다."))
elif not person and known:
    state, todo = (f"C · 설정 누락 · 이력 추정 «{known}»", (
        f"이 PC(`{host}`)는 `handoff/people/{known}.md`에 등록돼 있다. "
        f"→ **「{known} 님이신가요?」 한 번만 확인**하고, 맞으면 그 파일의 identity 값으로 "
        "`git config --global user.name/user.email/handoff.person`을 안내한다(값을 임의로 넣지 말고 사용자 확인)."))
elif person and not mine:
    state, todo = (f"E · 사람키 «{person}» 있으나 파일 없음", (
        f"`handoff/people/{person}.md`를 `_TEMPLATE.md`로 만든다. "
        f"물어볼 것은 **이 PC 경로**와 **담당 프로젝트**뿐이다."))
else:
    state, todo = "D · 신규 사용자(이력 없음)", (
        "온보딩이 필요하다. 물어볼 것 **3개만**: ① 사람키(짧은 영문 소문자) "
        "② 커밋에 쓸 이름·메일 ③ 담당할 프로젝트. "
        "그다음 `handoff/people/{키}.md` 생성 + 인덱스 담당자 갱신 + git config 안내. "
        "⚠️ 예시 값을 실행 가능한 명령에 넣지 말 것(2026-08-20 전례).")

out = [
    "[핸드오프 계층 주입] 착수 전 아래를 확인하고 한 줄 브리핑할 것.",
    "계층 계약·세션 정리 시 갱신 대상 판별: handoff/README.md · 절차 정본: .claude/skills/handoff/SKILL.md",
    "",
    "==== ① 공유 정본 (HANDOFF.md) ====",
    index,
]

lanes = sorted(p for p in glob.glob(os.path.join(root, "handoff/lanes/*.md"))
               if os.path.basename(p) != "README.md")
out += ["", "==== ② 전역 자원 점유 (handoff/lanes/) ===="]
if lanes:
    out.append("⚠ 아래 자원은 다른 세션이 점유 중이다. 같은 자원을 만지기 전에 사용자에게 보고할 것.")
    for p in lanes:
        out += ["", f"--- {os.path.basename(p)} ---", read(p) or ""]
else:
    out.append("점유 없음.")

out += ["", f"==== ③ 내 환경 (handoff/people/{person}.md) ====" if person else "==== ③ 내 환경 ===="]
out.append(mine if mine else "(아직 없음 — ⑤ 온보딩 상태 참조)")

out += ["", "==== ④ 프로젝트 파일 (본문 미주입 — 대상 확정 후 읽을 것) ===="]
out.append(", ".join(projects) if projects else "없음.")
if person and owned.get(person):
    out.append(f"내 담당: {', '.join(owned[person])}")

out += ["", "==== ⑤ 온보딩 상태 (자동 판별) ====",
        f"상태: {state}",
        f"사람키: {person or '(없음)'} (출처: {src}) · 이 PC: {host or '(불명)'}",
        f"조치: {todo}"]
if state.startswith(("C", "D")):
    out.append(f"등록된 사람: {', '.join(sorted(people)) or '없음'}")
    unowned = [p for p in projects if p not in sum(owned.values(), [])]
    if unowned:
        out.append(f"담당자 없는 프로젝트: {', '.join(unowned)}")
    if authors.strip():
        out += ["이 저장소 커밋 author 이력(사람 후보):", authors.strip()]
out.append("⛔ 위 조치에 없는 설정을 사용자에게 묻지 말 것 — 판별로 알 수 있는 것은 묻지 않는다.")

print(json.dumps({
    "hookSpecificOutput": {
        "hookEventName": "SessionStart",
        "additionalContext": "\n".join(out),
    }
}, ensure_ascii=False))
PY
