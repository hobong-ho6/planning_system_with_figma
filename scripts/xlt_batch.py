"""XLT 업로드 대기 원장 — 만든 XLT 엑셀을 모아 두었다가 팀·서비스·디바이스별 최종 엑셀로 합친다.

XLT 업로드는 사용자가 모아서 한 번에 한다(2026-10-15 사용자 결정). 게이트를 통과한 엑셀을 만들 때마다
`add`로 원장에 올리고, 사용자가 요청하면 `build`로 최종 엑셀을 만든다.
**한 키 = 대기 1행**: 같은 (팀, 서비스, 키)가 이미 pending이면 그 행을 갱신한다(덧붙이지 않는다).

  python3 scripts/xlt_batch.py add --team UIT --service Unifi --source <AR 게이트리포트> <엑셀.xlsx>
  python3 scripts/xlt_batch.py status            # 팀·서비스별 상태 집계 + 대기 키 목록 (list는 별칭)
  python3 scripts/xlt_batch.py build             # 대기분 → $AR_ROOT/xlt/xlt_{팀}_{서비스}[_IPHONE]_batch_{N}keys_{날짜}.xlsx
  python3 scripts/xlt_batch.py uploaded --team UIT [--service Unifi] [--keys K1 K2]
  python3 scripts/xlt_batch.py verified K1 K2 --text "10/22 live 대조 Unifi WEB v1.13.0 · IPHONE v1.4.0 · 5개 언어 일치"
  python3 scripts/xlt_batch.py mark K1 --not-needed --note "사용자 10/20: Dapp Portal 키"
  python3 scripts/xlt_batch.py migrate [--dry-run]   # 원장을 version 2 형식으로(멱등)

원장: Auto-react(private) `$AR_ROOT/xlt/batch/ledger.json` — PS는 public이라 번역 산출물은 Auto-react에 둔다.
경로는 `roots.AR_ROOT`(env `AR_ROOT` · 기본 ~/Documents/Auto-react) 또는 `--ar-root`. 원장이 없으면 만들지 않고 멈춘다
(워크트리에서 실행해 빈 원장을 새로 만든 사고 · 2026-10-22 감사).

원장 행(version 2)
  xlt_key · team(UIT/LV) · service · ko_KR ja_JP en_US th_TH zh_TW · xlsx · added · updated?
  source            Auto-react 저장소 기준 상대경로(예: reports/gate/x.md)
  source_broken     true면 원본을 찾지 못해 파일명만 남긴 것
  status            pending → uploaded | superseded(같은 키의 새 업로드로 대체) | not_needed(업로드 불필요)
  uploaded          업로드 처리 시각 · uploaded_verified  라이브 대조 기록(자유 문구)
  superseded_by     대체한 행의 added 시각
  targets           디바이스 목록 — 없으면 기본값(UIT·Unifi = WEB BROWSER + IPHONE · 그 외 WEB BROWSER)
  note              사람이 남긴 메모
"""
import argparse
import json
import re
import sys
from datetime import datetime
from pathlib import Path

import pandas as pd

sys.path.insert(0, str(Path(__file__).resolve().parent))
from export_to_xlt import create_xlt_excel  # noqa: E402
import roots  # noqa: E402

LANGS = ["ko_KR", "ja_JP", "en_US", "th_TH", "zh_TW"]
STATUSES = ("pending", "uploaded", "superseded", "not_needed")
VERSION = 2
AR = roots.AR_ROOT  # main()에서 --ar-root로 바뀔 수 있다


def ledger_path():
    return AR / "xlt" / "batch" / "ledger.json"


def load():
    p = ledger_path()
    if not p.exists():
        sys.exit(f"✗ 원장이 없다: {p}\n  AR_ROOT(env) 또는 --ar-root로 Auto-react 저장소를 지정한다 — 새로 만들지 않는다")
    return json.loads(p.read_text(encoding="utf-8"))


def save(d):
    ledger_path().write_text(json.dumps(d, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")  # 원장 기존 형식(1칸)


def now():
    return datetime.now().isoformat(timespec="seconds")


def default_targets(team, service):
    return ["WEB BROWSER", "IPHONE"] if (team, service) == ("UIT", "Unifi") else ["WEB BROWSER"]


def targets_of(e):
    return e.get("targets") or default_targets(e["team"], e["service"])


def rel_source(src):
    """경로 문자열 → (Auto-react 기준 상대경로, 덧붙은 설명). 다른 PC 절대경로·워크트리 경로도 정규화한다."""
    path, _, extra = str(src).partition(" · ")
    path = path.strip()
    m = re.search(r"(?:^|/)Auto-react/(.+)$", path)
    if m:
        path = m.group(1)
    path = re.sub(r"^\.claude/worktrees/[^/]+/", "", path)
    if Path(path).is_absolute():
        try:
            path = str(Path(path).resolve().relative_to(AR.resolve()))
        except ValueError:
            pass
    return path, extra.strip()


def pending(d):
    """대기 중인 키 — 같은 (팀, 서비스, 키)는 마지막 행(구 원장 중복 대비)."""
    out = {}
    for e in d["entries"]:
        if e["status"] == "pending":
            out[(e["team"], e["service"], e["xlt_key"])] = e
    return out


def cmd_add(a):
    src, extra = rel_source(Path(a.source).expanduser().resolve())
    if Path(src).is_absolute():
        sys.exit(f"✗ 게이트 리포트가 Auto-react 밖에 있다: {a.source}\n  정본 폴더는 $AR_ROOT/reports/gate — 거기 두고 다시 add한다")
    df = pd.read_excel(a.xlsx, sheet_name="properties")
    df = df.rename(columns={df.columns[0]: "xlt_key"})
    rows = df.to_dict("records")
    for r in rows:
        missing = [l for l in LANGS if pd.isna(r.get(l)) or not str(r.get(l)).strip()]
        if missing:
            sys.exit(f"✗ {r['xlt_key']} 빈 언어 {missing} — 원장에 올리지 않았다")
    d = load()
    p = pending(d)
    t = now()
    for r in rows:
        vals = {l: str(r[l]) for l in LANGS}
        meta = {"source": src, "xlsx": Path(a.xlsx).name}
        if a.targets:
            meta["targets"] = a.targets
        if a.note:
            meta["note"] = a.note
        e = p.get((a.team, a.service, r["xlt_key"]))
        if e:
            changed = [l for l in LANGS if e[l] != vals[l]]
            e.update(vals, **meta, updated=t)
            print(f"~ [{a.team}/{a.service}] {r['xlt_key']} 대기 행 갱신 ({', '.join(changed) or '값 동일'})")
        else:
            d["entries"].append({"xlt_key": r["xlt_key"], "team": a.team, "service": a.service, **vals,
                                 **meta, "added": t, "status": "pending"})
            print(f"+ [{a.team}/{a.service}] {r['xlt_key']}")
    save(d)


def cmd_status(a):
    d = load()
    print(f"원장: {ledger_path()} (version {d.get('version', 1)} · {len(d['entries'])}행)")
    groups = sorted({(e["team"], e["service"]) for e in d["entries"]})
    for team, svc in groups:
        rows = [e for e in d["entries"] if (e["team"], e["service"]) == (team, svc)]
        cnt = {s: sum(e["status"] == s for e in rows) for s in STATUSES}
        print(f"■ {team} / {svc} — " + " · ".join(f"{s} {n}" for s, n in cnt.items() if n))
    broken = sum(bool(e.get("source_broken")) for e in d["entries"])
    if broken:
        print(f"  (source_broken {broken}행 — 원본 리포트를 찾지 못해 파일명만 남김)")
    p = pending(d)
    if not p:
        print("대기 없음")
        return
    for team, svc in sorted({k[:2] for k in p}):
        print(f"\n대기 {team} / {svc}")
        for k, e in p.items():
            if k[:2] == (team, svc):
                print(f"  {e['xlt_key']}  ({(e.get('updated') or e['added'])[:16]} · {Path(e['source']).name}"
                      f" · {'/'.join(targets_of(e))})")


def to_iphone(v, key):
    """WEB 치환자 {{n}} → IPHONE {n}. 변환 뒤 겹괄호가 남으면 원문 오류라 멈춘다."""
    out = re.sub(r"\{\{(\w+)\}\}", r"{\1}", v)
    if "{{" in out or "}}" in out:
        sys.exit(f"✗ {key} 치환자 형식 오류(IPHONE 변환 불가): {v!r}")
    return out


def cmd_build(a):
    p = pending(load())
    day = datetime.now().strftime("%Y%m%d")
    jobs = {}
    for (team, svc, _), e in p.items():
        if a.team and team != a.team:
            continue
        for dev in targets_of(e):
            jobs.setdefault((team, svc, dev), []).append(e)
    if not jobs:
        print("대기 없음")
    for (team, svc, dev), rows in sorted(jobs.items()):
        conv = to_iphone if dev == "IPHONE" else (lambda v, k: v)
        data = [{"xlt_key": e["xlt_key"], **{l: conv(e[l], e["xlt_key"]) for l in LANGS}} for e in rows]
        f = Path(create_xlt_excel(data, output_dir=str(AR / "xlt")))
        tag = "" if dev == "WEB BROWSER" else f"_{dev.replace(' ', '')}"
        dst = f.with_name(f"xlt_{team}_{svc.replace(' ', '')}{tag}_batch_{len(rows)}keys_{day}.xlsx")
        f.rename(dst)
        print(f"✓ {dst}  ({svc} / {dev} · {len(rows)}키)")


def cmd_uploaded(a):
    d = load()
    t = now()
    done = []
    for e in pending(d).values():
        if e["team"] == a.team and (not a.service or e["service"] == a.service) and (not a.keys or e["xlt_key"] in a.keys):
            e["status"], e["uploaded"] = "uploaded", t
            done.append(e)
    for new in done:  # 같은 키의 이전 업로드 행은 대체됨
        for old in d["entries"]:
            if (old is not new and old["status"] == "uploaded" and old["xlt_key"] == new["xlt_key"]
                    and (old["team"], old["service"]) == (new["team"], new["service"])):
                old["status"], old["superseded_by"] = "superseded", new["added"]
    save(d)
    print(f"{a.team} {len(done)}건 → uploaded")


def latest_rows(d, keys):
    """키별 마지막 행(대기 > 그 밖 최신)."""
    out = {}
    for e in d["entries"]:
        if e["xlt_key"] in keys and e["status"] != "superseded":
            out[e["xlt_key"]] = e
    missing = set(keys) - set(out)
    if missing:
        sys.exit(f"✗ 원장에 없는 키: {sorted(missing)}")
    return out.values()


def cmd_verified(a):
    d = load()
    for e in latest_rows(d, a.keys):
        if e["status"] != "uploaded":
            sys.exit(f"✗ {e['xlt_key']} 상태가 {e['status']} — uploaded 행에만 기록한다")
        e["uploaded_verified"] = a.text
    save(d)
    print(f"{len(a.keys)}건 uploaded_verified 기록")


def cmd_mark(a):
    if not (a.not_needed or a.note):
        sys.exit("✗ --not-needed 또는 --note 중 하나는 필요하다")
    d = load()
    for e in latest_rows(d, a.keys):
        if a.not_needed:
            e["status"] = "not_needed"
        if a.note:
            e["note"] = a.note
        print(f"  {e['xlt_key']} → {e['status']}" + (f" · {a.note}" if a.note else ""))
    save(d)


def migrate_entry(e):
    """구 원장 행 → version 2. 바뀐 필드 이름 목록을 돌려준다."""
    changed = []
    if e.get("source_broken"):
        return changed
    src, extra = rel_source(e["source"])
    if extra:
        e["note"] = f"{e['note']} · {extra}" if e.get("note") else extra
        changed.append("note")
    if not (AR / src).exists():
        src = Path(src).name
        e["source_broken"] = True
        changed.append("source_broken")
    if src != e["source"]:
        e["source"] = src
        changed.append("source")
    if isinstance(e.get("targets"), str):  # "Unifi WEB BROWSER · IPHONE"
        devs = [x.strip().removeprefix(e["service"]).strip() for x in e["targets"].split("·")]
        e["targets"] = [x for x in devs if x]
        changed.append("targets")
    return changed


def cmd_migrate(a):
    d = load()
    stats = {}
    for e in d["entries"]:
        if e["status"] not in STATUSES:
            sys.exit(f"✗ 알 수 없는 status {e['status']!r} — {e['xlt_key']}")
        for c in migrate_entry(e):
            stats[c] = stats.get(c, 0) + 1
    d = {"version": VERSION, **{k: v for k, v in d.items() if k != "version"}}
    print(f"{len(d['entries'])}행 · 변경 " + (" · ".join(f"{k} {v}" for k, v in stats.items()) or "없음"))
    if a.dry_run:
        print("(dry-run — 저장하지 않음)")
        return
    save(d)
    print(f"✓ 저장: {ledger_path()}")


def main(argv=None):
    global AR
    ap = argparse.ArgumentParser(description="XLT 업로드 대기 원장 (Auto-react xlt/batch/ledger.json)")
    ap.add_argument("--ar-root", help="Auto-react 저장소 경로(기본 env AR_ROOT · ~/Documents/Auto-react)")
    sp = ap.add_subparsers(dest="cmd", required=True)
    p = sp.add_parser("add", help="게이트 통과 엑셀을 대기에 올린다(같은 키 대기 행은 갱신)")
    p.add_argument("--team", required=True, choices=["UIT", "LV"])
    p.add_argument("--service", required=True, help="XLT 서비스명(예: Unifi, Dapp Portal)")
    p.add_argument("--source", required=True, help="게이트 리포트 경로($AR_ROOT/reports/gate)")
    p.add_argument("--targets", nargs="+", help="디바이스(기본: UIT·Unifi = WEB BROWSER IPHONE)")
    p.add_argument("--note")
    p.add_argument("xlsx")
    sp.add_parser("status", help="상태 집계 + 대기 목록")
    sp.add_parser("list", help="status 별칭")
    p = sp.add_parser("build", help="대기분 → 팀·서비스·디바이스별 엑셀")
    p.add_argument("--team", choices=["UIT", "LV"])
    p = sp.add_parser("uploaded", help="사용자가 시스템 등록을 마친 뒤")
    p.add_argument("--team", required=True, choices=["UIT", "LV"])
    p.add_argument("--service")
    p.add_argument("--keys", nargs="+")
    p = sp.add_parser("verified", help="라이브 대조 기록(uploaded_verified)")
    p.add_argument("keys", nargs="+")
    p.add_argument("--text", required=True)
    p = sp.add_parser("mark", help="not_needed · note")
    p.add_argument("keys", nargs="+")
    p.add_argument("--not-needed", action="store_true")
    p.add_argument("--note")
    p = sp.add_parser("migrate", help="원장을 version 2로(멱등)")
    p.add_argument("--dry-run", action="store_true")
    a = ap.parse_args(argv)
    if a.ar_root:
        AR = Path(a.ar_root).expanduser()
    {"add": cmd_add, "status": cmd_status, "list": cmd_status, "build": cmd_build, "uploaded": cmd_uploaded,
     "verified": cmd_verified, "mark": cmd_mark, "migrate": cmd_migrate}[a.cmd](a)


if __name__ == "__main__":
    main()
