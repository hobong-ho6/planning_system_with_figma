#!/usr/bin/env bash
# SessionStart 훅 — 핸드오프 계층 주입 + 온보딩 상태 판별 (계약: handoff/README.md)
# 주입: ① 공유 정본 ② 점유 레인 ③ 내 people 파일 ④ 프로젝트 목록 ⑤ 온보딩 상태
# 프로젝트 본문은 주입하지 않는다(대상이 정해지면 그때 읽는다).
# 어떤 실패도 세션 시작을 막지 않는다.
set -uo pipefail

DIR="${CLAUDE_PROJECT_DIR:-$PWD}"
[ -f "$DIR/HANDOFF.md" ] || exit 0

# 사람키는 `handoff.person`이 **확정값**이고, user.email에서 딴 것은 **추정값**이다.
# 추정값을 확정값처럼 쓰면 실제 파일명과 어긋날 때 신원 판별이 깨진다(2026-08-20 실측).
person="$(git -C "$DIR" config --get handoff.person 2>/dev/null || true)"
email="$(git -C "$DIR" config --get user.email 2>/dev/null || true)"
if [ -n "$person" ]; then
  src="handoff.person"
else
  person="${email%@*}"
  src="user.email"
  [ -z "$person" ] && src="none"
fi
host="$(hostname 2>/dev/null || echo '')"
authors="$(git -C "$DIR" log --format='%an <%ae>' 2>/dev/null | sort | uniq -c | sort -rn | head -6 || true)"

python3 - "$DIR" "$person" "$src" "$host" "$authors" "$email" <<'PY' || exit 0
import glob, json, os, re, sys

root, person, src, host, authors, email = (sys.argv[1], sys.argv[2], sys.argv[3],
                                           sys.argv[4], sys.argv[5], sys.argv[6])


def read(path):
    try:
        with open(path, encoding="utf-8") as f:
            return f.read().rstrip()
    except OSError:
        return None


# ── people 파일 + 역인덱스 2종(hostname·이메일)
HOSTPAT = r"`([A-Za-z0-9._-]+\.local|[A-Za-z0-9._-]*[Ii]Mac[A-Za-z0-9._-]*)`"
MAILPAT = r"[\w.+-]+@[\w-]+\.[\w.]+"
people, host2person, email2person = {}, {}, {}
for p in glob.glob(os.path.join(root, "handoff/people/*.md")):
    name = os.path.basename(p)[:-3]
    if name.startswith("_"):
        continue
    body = read(p) or ""
    people[name] = body
    for h in re.findall(HOSTPAT, body):
        host2person.setdefault(h.lower(), name)
    for e in re.findall(MAILPAT, body):
        email2person.setdefault(e.lower(), name)

projects = sorted(
    os.path.basename(p)[:-3] for p in glob.glob(os.path.join(root, "handoff/projects/*.md"))
    if not os.path.basename(p).startswith("_")
)
index = read(os.path.join(root, "HANDOFF.md")) or ""
owned = {}
for m in re.finditer(r"^\| \[([\w-]+)\][^|]*\|\s*`?([\w.-]+)`?\s*\|", index, re.M):
    owned.setdefault(m.group(2), []).append(m.group(1))

# ── 신원 해석: 확정값 우선, 없으면 증거로 역추적한다
configured = bool(person) and src == "handoff.person"
guess = "" if configured else person          # user.email에서 딴 추정 키
by_host = host2person.get(host.lower()) if host else None
by_mail = email2person.get(email.lower()) if email else None

if configured:
    resolved, evidence = person, "handoff.person(확정)"
elif by_host:
    resolved, evidence = by_host, f"이 PC가 `people/{by_host}.md`에 등록됨"
elif by_mail:
    resolved, evidence = by_mail, f"`{email}`이 `people/{by_mail}.md`에 있음"
elif guess and guess in people:
    resolved, evidence = guess, "user.email 앞부분이 파일명과 일치"
else:
    resolved, evidence = None, None

mine = people.get(resolved) if resolved else None
host_in_mine = bool(mine and host and host.lower() in mine.lower())

# ── 상태 판정
if configured and mine and host_in_mine:
    state, todo = "A · 기존 사용자 · 등록된 PC", "추가 설정 없음. 사용자에게 설정을 묻지 말 것."
elif configured and mine:
    state, todo = ("B · 기존 사용자 · 새 PC", (
        f"`handoff/people/{resolved}.md` PC 표에 이 PC(`{host}`)가 없다. "
        "**저장소 경로 한 줄만 확인해 표에 추가**하고 세팅 열을 ✅로 바꾼다. 그 외는 묻지 않는다."))
elif configured and not mine:
    state, todo = (f"E · 사람키 «{resolved}» 있으나 파일 없음", (
        f"`handoff/people/{resolved}.md`를 `_TEMPLATE.md`로 만든다. "
        "물어볼 것은 **이 PC 경로**와 **담당 프로젝트**뿐이다."))
elif resolved:
    # handoff.person 미설정이지만 신원이 증거로 확인된 경우 — 새 파일을 만들면 안 된다
    act = [f"이 PC의 신원은 **`{resolved}`**로 확인된다({evidence}).",
           f"⛔ **`handoff/people/{resolved}.md`가 이미 있으므로 새 people 파일을 만들지 말 것.**"]
    if guess and guess != resolved:
        act.append(f"⚠️ user.email에서 딴 추정 키 «{guess}»는 실제 파일명과 다르다 — "
                   f"«{guess}»로 파일을 만들면 사람 파일이 갈라진다.")
    act.append("빠진 것은 `handoff.person` 한 줄뿐이다. 사용자에게 이 명령을 그대로 안내한다"
               "(값은 파일에서 확인된 것이므로 플레이스홀더가 아니다):")
    act.append(f"    git config --global handoff.person {resolved}")
    if not host_in_mine:
        act.append(f"이 PC(`{host}`)는 PC 표에 없다 — **저장소 경로 한 줄만** 함께 받아 표에 추가한다.")
    state, todo = f"C · 설정 누락 · 신원 확인 «{resolved}»", " ".join(act)
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

out += ["", f"==== ③ 내 환경 (handoff/people/{resolved}.md) ====" if resolved else "==== ③ 내 환경 ===="]
out.append(mine if mine else "(아직 없음 — ⑤ 온보딩 상태 참조)")

out += ["", "==== ④ 프로젝트 파일 (본문 미주입 — 대상 확정 후 읽을 것) ===="]
out.append(", ".join(projects) if projects else "없음.")
if resolved and owned.get(resolved):
    out.append(f"내 담당: {', '.join(owned[resolved])}")

out += ["", "==== ⑤ 온보딩 상태 (자동 판별) ====",
        f"상태: {state}",
        f"사람키: {resolved or '(미확인)'} (근거: {evidence or '없음'})"
        + (f" · user.email 추정값: {guess}" if guess and guess != resolved else "")
        + f" · 이 PC: {host or '(불명)'}",
        f"조치: {todo}"]
if state.startswith("D"):
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
