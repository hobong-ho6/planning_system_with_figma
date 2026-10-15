"""XLT 업로드 대기 원장 — 만든 XLT 엑셀을 모아 두었다가 팀별 최종 엑셀 1개씩으로 합친다.

XLT 업로드는 사용자가 모아서 한 번에 한다(2026-10-15 사용자 결정). 게이트를 통과한 엑셀을 만들 때마다
`add`로 원장에 올리고, 사용자가 요청하면 `build`로 팀(UIT/LV)·서비스별 최종 엑셀을 만든다.
같은 키가 여러 번 올라오면 **마지막 것**이 최종값이다(패치·재번역 반영).

  python3 scripts/xlt_batch.py add --team UIT --service Unifi --source <게이트리포트> <엑셀.xlsx>
  python3 scripts/xlt_batch.py list
  python3 scripts/xlt_batch.py build              # 대기분 → Auto-react/xlt/xlt_{팀}_{서비스}_batch_{N}keys_{날짜}.xlsx
  python3 scripts/xlt_batch.py uploaded --team UIT  # 사용자가 시스템 등록을 마친 뒤

원장: Auto-react(private) `xlt/batch/ledger.json` — PS는 public이라 번역 산출물은 Auto-react에 둔다.
"""
import argparse
import json
import sys
from datetime import datetime
from pathlib import Path

import pandas as pd

sys.path.insert(0, str(Path(__file__).resolve().parent))
from export_to_xlt import create_xlt_excel  # noqa: E402

AR = Path(__file__).resolve().parents[2] / "Auto-react"
LEDGER = AR / "xlt" / "batch" / "ledger.json"
LANGS = ["ko_KR", "ja_JP", "en_US", "th_TH", "zh_TW"]


def load():
    return json.loads(LEDGER.read_text()) if LEDGER.exists() else {"entries": []}


def save(d):
    LEDGER.parent.mkdir(parents=True, exist_ok=True)
    LEDGER.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n")


def pending(d):
    """대기 중인 키 — 같은 (팀, 서비스, 키)는 마지막 항목만."""
    out = {}
    for e in d["entries"]:
        if e["status"] == "pending":
            out[(e["team"], e["service"], e["xlt_key"])] = e
    return out


def cmd_add(a):
    df = pd.read_excel(a.xlsx, sheet_name="properties")
    df = df.rename(columns={df.columns[0]: "xlt_key"})
    d = load()
    now = datetime.now().isoformat(timespec="seconds")
    for r in df.to_dict("records"):
        missing = [l for l in LANGS if pd.isna(r.get(l)) or not str(r.get(l)).strip()]
        if missing:
            sys.exit(f"✗ {r['xlt_key']} 빈 언어 {missing} — 원장에 올리지 않았다")
        d["entries"].append({"xlt_key": r["xlt_key"], "team": a.team, "service": a.service,
                             **{l: str(r[l]) for l in LANGS},
                             "source": a.source, "xlsx": Path(a.xlsx).name, "added": now, "status": "pending"})
        print(f"+ [{a.team}/{a.service}] {r['xlt_key']}")
    save(d)


def cmd_list(a):
    p = pending(load())
    if not p:
        print("대기 없음")
    for (team, svc) in sorted({k[:2] for k in p}):
        rows = [e for k, e in p.items() if k[:2] == (team, svc)]
        print(f"■ {team} / {svc} — {len(rows)}키")
        for e in rows:
            print(f"  {e['xlt_key']}  ({e['added'][:16]} · {Path(e['source']).name})")


def cmd_build(a):
    p = pending(load())
    day = datetime.now().strftime("%Y%m%d")
    for (team, svc) in sorted({k[:2] for k in p}):
        rows = [e for k, e in p.items() if k[:2] == (team, svc)]
        f = Path(create_xlt_excel([{"xlt_key": e["xlt_key"], **{l: e[l] for l in LANGS}} for e in rows], output_dir=str(AR / "xlt")))
        dst = f.with_name(f"xlt_{team}_{svc.replace(' ', '')}_batch_{len(rows)}keys_{day}.xlsx")
        f.rename(dst)
        print(f"✓ {dst}  ({len(rows)}키)")


def cmd_uploaded(a):
    d = load()
    n = 0
    for e in d["entries"]:
        if e["status"] == "pending" and e["team"] == a.team and (not a.service or e["service"] == a.service):
            e["status"] = "uploaded"
            e["uploaded"] = datetime.now().isoformat(timespec="seconds")
            n += 1
    save(d)
    print(f"{a.team} {n}건 → uploaded")


ap = argparse.ArgumentParser()
sp = ap.add_subparsers(dest="cmd", required=True)
p_add = sp.add_parser("add")
p_add.add_argument("--team", required=True, choices=["UIT", "LV"])
p_add.add_argument("--service", required=True, help="XLT 서비스명(예: Unifi, Dapp Portal)")
p_add.add_argument("--source", required=True, help="게이트 리포트 경로")
p_add.add_argument("xlsx")
sp.add_parser("list")
sp.add_parser("build")
p_up = sp.add_parser("uploaded")
p_up.add_argument("--team", required=True, choices=["UIT", "LV"])
p_up.add_argument("--service")
a = ap.parse_args()
{"add": cmd_add, "list": cmd_list, "build": cmd_build, "uploaded": cmd_uploaded}[a.cmd](a)
