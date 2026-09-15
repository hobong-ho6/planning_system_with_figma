#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Confluence 페이지 본문(storage)을 로컬 파일로 **버전 가드 PUT**한다 (md/wiki.md 「본문이 크면 REST PUT」 규칙 구현).

MCP `confluence_update_page`는 본문을 대화에 실어 보내야 해서 큰 페이지(수십 KB↑)에서는 전사 오염·본문 유실 위험이 있다
(2026-09-12 실측 사고). 이 스크립트는 파일을 그대로 보내고, PUT 전후로 버전과 본문 길이를 검사한다.

사용:
  CONFLUENCE_PAT=xxx python3 scripts/put_wiki_storage.py --page 4704515582 --file /path/body.xml \
      --expect-version 197 --comment "XLT 4키 신규 + review_more Dapp Portal 등록"
  - 라이브 버전이 --expect-version 과 다르면 PUT 하지 않고 종료(exit 2) — 다른 세션이 먼저 고친 것이므로 재조회·재적용한다.
  - PUT 후 GET 으로 새 버전·본문 길이를 확인해 보낸 길이와 5% 이상 차이면 경고(exit 3).
토큰은 환경변수로만 받는다. 파일·인자에 넣지 않는다.
"""
import argparse, json, os, sys, urllib.request, urllib.error

BASE = os.environ.get("CONFLUENCE_BASE_URL", "https://wiki.workers-hub.com")


def req(method, path, token, body=None):
    data = json.dumps(body).encode() if body is not None else None
    r = urllib.request.Request(f"{BASE}{path}", data=data, method=method,
                               headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"})
    with urllib.request.urlopen(r, timeout=60) as resp:
        return json.loads(resp.read().decode())


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--page", required=True); p.add_argument("--file", required=True)
    p.add_argument("--expect-version", type=int, required=True); p.add_argument("--comment", default="")
    a = p.parse_args()
    token = os.environ.get("CONFLUENCE_PAT")
    if not token:
        print("❌ CONFLUENCE_PAT 환경변수가 필요합니다"); sys.exit(1)
    body = open(a.file, encoding="utf-8").read()
    cur = req("GET", f"/rest/api/content/{a.page}?expand=version,body.storage", token)
    v = cur["version"]["number"]; title = cur["title"]; live_len = len(cur["body"]["storage"]["value"])
    print(f"라이브: v{v} · 본문 {live_len:,}자 · 제목 {title}")
    if v != a.expect_version:
        print(f"⛔ 버전 불일치 — 기대 v{a.expect_version}, 라이브 v{v}. PUT 하지 않음. 최신 본문을 다시 받아 편집을 재적용하세요."); sys.exit(2)
    payload = {"id": a.page, "type": "page", "title": title,
               "version": {"number": v + 1, "message": a.comment, "minorEdit": False},
               "body": {"storage": {"value": body, "representation": "storage"}}}
    try:
        res = req("PUT", f"/rest/api/content/{a.page}", token, payload)
    except urllib.error.HTTPError as e:
        print("❌ PUT 실패", e.code, e.read().decode()[:500]); sys.exit(4)
    after = req("GET", f"/rest/api/content/{a.page}?expand=version,body.storage", token)
    nv = after["version"]["number"]; nlen = len(after["body"]["storage"]["value"])
    print(f"✅ PUT 완료: v{v} → v{nv} · 보낸 {len(body):,}자 / 저장 {nlen:,}자")
    if abs(nlen - len(body)) > len(body) * 0.05:
        print("⚠️ 저장된 본문 길이가 보낸 것과 5% 이상 다릅니다 — 본문 교체 사고 의심. 즉시 확인."); sys.exit(3)


if __name__ == "__main__":
    main()
