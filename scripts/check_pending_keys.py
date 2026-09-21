#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""미등록 대기 키 대조 — 신규 XLT 키 확정 전 필수 (md/translate.md Step 2-1-c)

⛔ `fetch_xlt_registry.py --similar`(레지스트리 대조)만으로는 중복을 막지 못한다.
   **같은 날 다른 세션이 위키·게이트 리포트에만 올리고 아직 시스템에 등록하지 않은 키**는
   레지스트리에 없어서 「중복 없음」으로 통과한다.

   2026-09-21 실측: 같은 프레임(`75648:8250`)의 같은 4문구가 18:26 세션에서 UIT
   `UF_voucher_pay_more_cu_*`로, 22:2x 세션에서 LV `mini_voucher_cu_payment_done_benefit_*`로
   **두 벌 정의**됐다. 앞 세션 키는 위키에만 있어 레지스트리 대조를 통과했다.

대조원은 둘이다. 읽기 전용이며 아무것도 바꾸지 않는다.

  ① 로컬 `reports/gate/*.md` — 당일 다른 세션의 작업 흔적
  ② **위키 전문 검색(CQL `text ~`)** — ⛔ **이쪽이 정본이다.** ①은 리포트가 ko 원문을 싣지
     않으면 못 잡는다(2026-09-21 실측: 상대 세션 리포트에 ko 표가 없어 ①은 0건, ②는 상대
     페이지 `4704515582`를 정확히 찾아냈다). 키를 확정하기 전 반드시 ②까지 돌린다.

사용:
  python3 scripts/check_pending_keys.py "CU 혜택은 계속돼요!" "언제나 최대 15% 혜택!"
  python3 scripts/check_pending_keys.py --from-json translation_data.json   # ko_KR 전건
  CONFLUENCE_PAT=xxx python3 scripts/check_pending_keys.py --wiki --exclude 4774235795 --from-json t.json
  python3 scripts/check_pending_keys.py --days 14 --threshold 0.8 "문구"

  → 히트 없음: exit 0 ("✅ 대기 키 충돌 없음")
  → 히트 있음: exit 1 (문구별 후보 키 목록 — 사용자에게 제시해 ⓐ/ⓑ/ⓒ 결정을 받는다)

⚠️ 히트가 곧 위반은 아니다. 「같은 문구를 다른 세션이 이미 정의했을 수 있다」는 경고이며,
   판정은 사람이 한다(다른 화면·다른 서비스면 신규가 맞을 수 있다).
"""

import argparse
import difflib
import json
import re
import sys
import time
from pathlib import Path

GATE_DIR = Path(__file__).resolve().parent.parent / "reports" / "gate"
KEY_RE = re.compile(r"\b(?:[A-Za-z][A-Za-z0-9]*_)+[A-Za-z0-9_]+\b")
# 키가 아닌 파일명·경로 토큰을 걸러낸다
NOT_KEY = re.compile(r"\.(md|py|json|xlsx|png|js)$|^gate_report|^xlt_output|^check_|^fetch_|^validate_")


def norm(s: str) -> str:
    """공백·개행·구두점 차이를 지운 비교용 문자열."""
    return re.sub(r"[\s  ]+", "", s).strip()


def keys_in(line: str) -> list:
    return [k for k in KEY_RE.findall(line) if not NOT_KEY.search(k)]


def scan(texts, days=None, threshold=0.85, gate_dir=GATE_DIR):
    """각 문구에 대해 (파일, 유사도, 키후보, 발췌) 목록을 돌려준다."""
    if not gate_dir.exists():
        print(f"⚠️ 게이트 리포트 폴더가 없다: {gate_dir} — 대조를 건너뛴다(「확인 못 함」)")
        return None
    cutoff = time.time() - days * 86400 if days else None
    reports = [p for p in sorted(gate_dir.glob("*.md"))
               if cutoff is None or p.stat().st_mtime >= cutoff]
    hits = {t: [] for t in texts}
    targets = {t: norm(t) for t in texts}
    for path in reports:
        try:
            lines = path.read_text(encoding="utf-8").splitlines()
        except OSError:
            continue
        for line in lines:
            nl = norm(line)
            if not nl:
                continue
            for t, nt in targets.items():
                if nt in nl:
                    ratio = 1.0
                else:
                    ratio = difflib.SequenceMatcher(None, nt, nl).ratio()
                    if ratio < threshold:
                        continue
                cands = keys_in(line)
                if cands:
                    hits[t].append((path.name, round(ratio, 2), cands, line.strip()[:160]))
    return hits, len(reports)


def wiki_scan(texts, exclude=(), base="https://wiki.workers-hub.com", token=None, limit=10):
    """위키 전문 검색(CQL)으로 같은 ko 문구를 쓰는 **다른 페이지**와 그 행의 키를 찾는다.

    ⚠️ CQL은 색인 기반이라 **방금 만든·방금 고친 페이지는 안 잡힐 수 있다**(md/wiki.md 실측).
       "히트 0건"은 "없음"이 아니라 "색인에 없음"일 수 있다 — 그 한계를 리포트에 적는다.
    """
    import urllib.parse, urllib.request, urllib.error
    if not token:
        print("⚠️ CONFLUENCE_PAT 없음 — 위키 대조를 건너뛴다(「확인 못 함」)")
        return None
    h = {"Authorization": f"Bearer {token}"}

    def get(url):
        return json.loads(urllib.request.urlopen(urllib.request.Request(url, headers=h), timeout=30).read())

    out = {t: [] for t in texts}
    body_cache = {}
    for t in texts:
        phrase = t.replace('"', " ").strip()
        cql = f'type = page AND text ~ "\\"{phrase}\\""'
        url = f"{base}/rest/api/content/search?limit={limit}&cql=" + urllib.parse.quote(cql)
        try:
            res = get(url)
        except urllib.error.HTTPError as e:
            print(f"⚠️ 위키 검색 실패({e.code}) — {t[:20]}…")
            continue
        for r in res.get("results", []):
            pid = r["id"]
            if pid in set(map(str, exclude)):
                continue
            if pid not in body_cache:
                try:
                    body_cache[pid] = get(f"{base}/rest/api/content/{pid}?expand=body.storage")["body"]["storage"]["value"]
                except Exception:
                    body_cache[pid] = ""
            nt = norm(t)
            cands = []
            for row in body_cache[pid].split("<tr>"):
                if nt in norm(row):
                    cands += keys_in(re.sub(r"<[^>]+>", " ", row))
            out[t].append((pid, r["title"], sorted(set(cands))[:6]))
    return out


def main(argv=None):
    ap = argparse.ArgumentParser(description="미등록 대기 키 대조 (reports/gate 스캔 · 읽기 전용)")
    ap.add_argument("texts", nargs="*", help="신규 키 후보 한국어 문구")
    ap.add_argument("--from-json", help="translation_data.json 등 [{'ko_KR': ...}] 파일에서 문구를 읽는다")
    ap.add_argument("--days", type=int, default=None, help="최근 N일 리포트만 스캔(기본 전체)")
    ap.add_argument("--threshold", type=float, default=0.85, help="유사도 하한(기본 0.85)")
    ap.add_argument("--wiki", action="store_true", help="위키 전문 검색(CQL)까지 대조 — CONFLUENCE_PAT 필요")
    ap.add_argument("--exclude", default="", help="제외할 pageId(작업 대상 페이지 자신) — 쉼표 구분")
    a = ap.parse_args(argv)

    texts = list(a.texts)
    if a.from_json:
        rows = json.load(open(a.from_json, encoding="utf-8"))
        texts += [r["ko_KR"] for r in rows if r.get("ko_KR")]
    texts = [t for t in dict.fromkeys(texts) if t.strip()]
    if not texts:
        ap.error("대조할 문구가 없다 (인자 또는 --from-json)")

    result = scan(texts, days=a.days, threshold=a.threshold)
    if result is None:
        return 0
    hits, n_reports = result
    print(f"게이트 리포트 {n_reports}건 스캔 · 문구 {len(texts)}건 · 임계 {a.threshold}")

    found = 0
    for t in texts:
        rows = hits[t]
        if not rows:
            continue
        found += 1
        print(f"\n■ {t}")
        for name, ratio, cands, excerpt in rows[:8]:
            print(f"   [{ratio}] {name}")
            print(f"        키 후보: {', '.join(sorted(set(cands))[:6])}")
            print(f"        발췌: {excerpt}")

    if a.wiki:
        import os as _os
        w = wiki_scan(texts, exclude=[x for x in a.exclude.split(",") if x], token=_os.environ.get("CONFLUENCE_PAT"))
        if w is not None:
            print("\n--- 위키 전문 검색(CQL · 색인 지연 있음) ---")
            for t in texts:
                for pid, title, cands in w.get(t, []):
                    found += 1
                    print(f"\n■ {t}\n   [{pid}] {title}")
                    print(f"        같은 행의 키: {', '.join(cands) if cands else '(행에서 키를 못 찾음 — 페이지를 직접 확인)'}")

    if found:
        print(f"\n❌ 충돌 후보 {found}건 — **다른 세션이 이미 같은 문구에 키를 정의했을 수 있다**.")
        print("   → 해당 리포트·페이지를 열어 확인하고, md/translate.md Step 2-1의 ⓐ/ⓑ/ⓒ 표로 사용자 결정을 받는다.")
        return 1
    print("\n✅ 대기 키 충돌 없음 — 신규 키로 진행 가능(레지스트리 대조는 별도로 수행한다)")
    if not a.wiki:
        print("   ⚠️ 위키 대조(--wiki)는 수행하지 않았다 — 리포트에 ko 원문이 없는 세션은 이 스캔으로 못 잡는다")
    return 0


if __name__ == "__main__":
    sys.exit(main())
