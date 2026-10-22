"""Auto-react 밀림 큐 — Auto-react 세션이 PS 경로를 혼자 처리해 PS `handoff/projects/` 기록이 밀린 건.

큐: `$AR_ROOT/reports/tasks/ps_backlog.jsonl` (Auto-react가 한 줄씩 덧붙인다)
  {"at":"ISO","task":"T231","project":"unifi-mini-v2","artifacts":["reports/gate/…md"],"summary":"한 줄","done":false}

PS SessionStart 훅이 `done:false` 행을 「Auto-react 밀림 N건」으로 주입한다. PS 세션은
`handoff/projects/<project>.md` 세션 기록에 한 줄씩 반영하고(구조 규칙 유지) 아래로 `done:true`를 찍는다.

  python3 scripts/ps_backlog.py list                 # 미반영 행(번호 = 파일 줄 번호)
  python3 scripts/ps_backlog.py done 3 5             # 줄 번호로
  python3 scripts/ps_backlog.py done --task T231     # 일감 번호로(그 일감의 미반영 행 전부)

PS가 Auto-react에 쓰는 것은 이 파일의 `done`·`done_at` 두 필드뿐이다.
"""
import argparse
import json
import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from roots import AR_ROOT, PS_ROOT  # noqa: E402

QUEUE = AR_ROOT / "reports" / "tasks" / "ps_backlog.jsonl"


def read():
    if not QUEUE.exists():
        return []
    rows = []
    for n, line in enumerate(QUEUE.read_text(encoding="utf-8").splitlines(), 1):
        try:
            rows.append((n, line, json.loads(line) if line.strip() else None))
        except json.JSONDecodeError:
            rows.append((n, line, None))
            print(f"⚠️ {QUEUE.name}:{n} JSON 아님 — 건너뜀", file=sys.stderr)
    return rows


def cmd_list(a):
    open_rows = [(n, r) for n, _, r in read() if r and not r.get("done")]
    if not open_rows:
        print(f"밀림 없음 ({QUEUE})")
        return
    for n, r in open_rows:
        proj = r.get("project", "?")
        mark = "" if (PS_ROOT / "handoff" / "projects" / f"{proj}.md").exists() else " ⚠️프로젝트 파일 없음"
        print(f"{n:>4}  {r.get('at', '')[:10]} {r.get('task', '')} [{proj}]{mark} {r.get('summary', '')}")
        for art in r.get("artifacts", []):
            print(f"        - {art}")


def cmd_done(a):
    rows = read()
    if not rows:
        sys.exit(f"✗ 큐가 없다: {QUEUE}")
    lines = set(a.lines or [])
    t = datetime.now().isoformat(timespec="seconds")
    out, n_done = [], 0
    for n, line, r in rows:
        if r and not r.get("done") and (n in lines or (a.task and r.get("task") == a.task)):
            r["done"], r["done_at"] = True, t
            line = json.dumps(r, ensure_ascii=False)
            n_done += 1
        out.append(line)
    if not n_done:
        sys.exit("✗ 해당하는 미반영 행이 없다")
    QUEUE.write_text("\n".join(out) + "\n", encoding="utf-8")
    print(f"✓ {n_done}건 done:true")


def main():
    ap = argparse.ArgumentParser(description="Auto-react 밀림 큐(ps_backlog.jsonl)")
    sp = ap.add_subparsers(dest="cmd", required=True)
    sp.add_parser("list")
    p = sp.add_parser("done")
    p.add_argument("lines", nargs="*", type=int, help="줄 번호(list 출력의 앞 번호)")
    p.add_argument("--task", help="일감 번호(예: T231)")
    a = ap.parse_args()
    if a.cmd == "done" and not (a.lines or a.task):
        ap.error("줄 번호 또는 --task가 필요하다")
    {"list": cmd_list, "done": cmd_done}[a.cmd](a)


if __name__ == "__main__":
    main()
