#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Figma 코멘트 조회 (reply-aware) — 위키 Description / XLT 코멘트 선별 공용 페처

⚠️ 코멘트 수집은 매번 인라인으로 다시 짜지 말고 이 모듈을 쓴다.
   답글(스레드)은 핀 좌표가 없어 client_meta.node_id가 비어 있으므로
   프레임 노드집합 필터로는 절대 안 잡힌다 — 반드시 parent_id 매칭으로 가져온다.
   (루트만 수집하면 답글이 통째로 누락된다. md/wiki.md Step 3 규칙.)

원본 최신성: 호출 시마다 Figma REST에서 새로 조회한다(캐시 미사용 — CLAUDE.md '캐시 금지 규칙').

사용 예:
    from scripts.fetch_comments import fetch_threads, format_description
    threads = fetch_threads(file_key, token, node_ids=frame_descendant_ids)
    print(format_description(threads))   # 1. ... / ↳ 답글 ...

CLI:
    FIGMA_TOKEN=figd_xxx python3 scripts/fetch_comments.py <fileKey> [nodeId1,nodeId2,...]
"""

import os
import sys
import requests

API = "https://api.figma.com/v1/files/{file_key}/comments"


def fetch_comments_raw(file_key: str, token: str) -> list:
    """Figma REST에서 파일 전체 코멘트를 새로 조회한다(루트+답글 포함).

    ⚠️ 이 함수는 `fetch_threads`의 내부 조회용이다. **코멘트 수집·필터 용도로 직접
    호출하지 말 것.** raw 리스트를 받아 `if c.get('parent_id'): continue` 식으로
    루트만 거르면 답글(스레드)이 통째 누락된다 — 답글에 XLT 키명(`XLT - UF_x`,
    `xlt key = ...`)·정책이 들어있어도 못 본다(2026-07-03 reward 프레임 실측 회귀).
    좌표(x/y/node_id)·message·replies가 모두 필요하면 `fetch_threads`가 루트별로
    그 전부를 반환하고 `log_self_check`로 누락까지 가시화하므로 **항상 fetch_threads를
    쓴다.** (관련 규칙: md/wiki.md Step 3, md/translate.md 코멘트 선별 모드)
    """
    r = requests.get(API.format(file_key=file_key),
                     headers={"X-Figma-Token": token}, timeout=15)
    r.raise_for_status()
    return r.json().get("comments", [])


def collect_node_boxes(frame_node: dict) -> tuple:
    """Figma /nodes 응답의 프레임 document에서 (id→absoluteBoundingBox 맵, 프레임 원점 bbox)를
    수집한다 — build_threads/fetch_threads의 코멘트 **좌표 정규화용** 입력.

    ⚠️ 코멘트 핀의 node_offset은 **앵커 노드 기준 상대좌표**다. 핀이 프레임이 아니라
    하위 프레임/컴포넌트에 앵커되면 y값이 프레임 기준이 아니게 되어, 그대로 정렬하면
    **통합 번호가 화면 순서와 어긋난다** (2026-07-27 실측: 63411-25034에서 하위 프레임
    64314:9929에 앵커된 하단 유의사항 핀 7개가 y=83~339로 보고돼 상단 번호로 끼어들었고,
    y=1423 핀을 '잔존 핀'으로 오판). 반드시 이 맵을 넘겨 프레임-상대좌표로 정규화한다.
    """
    boxes = {}

    def walk(n):
        b = n.get("absoluteBoundingBox")
        if b:
            boxes[n["id"]] = b
        for c in n.get("children", []):
            walk(c)

    walk(frame_node)
    return boxes, frame_node["absoluteBoundingBox"]


def build_threads(comments: list, node_ids=None, include_resolved: bool = False,
                  node_boxes=None, frame_origin=None) -> list:
    """
    루트 코멘트를 수집하고 답글을 parent_id로 매칭한다.

    - 루트: parent_id 없음 + client_meta.node_id 있음 + message 있음 (미해결만, 기본값)
    - node_ids 주어지면 그 집합(프레임+자손 id)에 속한 루트만 남긴다
    - 답글: parent_id == 루트 id, created_at 오름차순 (좌표 없어도 parent_id로만 매칭)
    - node_boxes + frame_origin(collect_node_boxes 반환값)을 주면 x/y를
      **프레임-상대좌표로 정규화**한다 (핀이 하위 노드에 앵커돼도 y 정렬이 화면 순서와 일치).
      안 주면 node_offset 원값을 쓰며, 앵커가 여럿이면 log_self_check가 경고한다.
    - 반환: y 오름차순 정렬된 루트 리스트
      [{id, node_id, x, y, message, created_at, resolved, normalized, replies:[msg,...]}]
    """
    node_set = set(node_ids) if node_ids is not None else None

    # 1차: 루트 수집
    roots = {}
    ordered = []
    for c in comments:
        if c.get("parent_id"):
            continue
        meta = c.get("client_meta") or {}
        nid = meta.get("node_id", "")
        if not nid or not c.get("message"):
            continue
        if node_set is not None and nid not in node_set:
            continue
        if c.get("resolved_at") and not include_resolved:
            continue
        off = meta.get("node_offset") or {}
        x, y = off.get("x", 0), off.get("y", 0)
        normalized = False
        if node_boxes is not None and frame_origin is not None:
            b = node_boxes.get(nid)
            if b:
                x = x + b["x"] - frame_origin["x"]
                y = y + b["y"] - frame_origin["y"]
                normalized = True
        root = {
            "id": c["id"], "node_id": nid,
            "x": x, "y": y,
            "message": c["message"].strip(),
            "created_at": c.get("created_at", ""),
            "resolved": bool(c.get("resolved_at")),
            "normalized": normalized,
            "replies": [],
        }
        roots[c["id"]] = root
        ordered.append(root)

    # 2차: 답글을 parent_id로 루트에 붙인다 (created_at 오름차순)
    for c in sorted(comments, key=lambda x: x.get("created_at", "")):
        pid = c.get("parent_id")
        if pid and pid in roots and c.get("message"):
            roots[pid]["replies"].append(c["message"].strip())

    ordered.sort(key=lambda r: r["y"])
    return ordered


def log_self_check(threads: list, label: str = "") -> None:
    """자기 점검: 루트별 붙은 답글 수를 가시화한다(루트만 있어도 통과한 것처럼 보이는 회귀 방지)."""
    head = f"[fetch_comments] {label}".rstrip()
    total_replies = sum(len(t["replies"]) for t in threads)
    print(f"{head}: roots={len(threads)}, replies attached={total_replies}")
    for i, t in enumerate(threads, 1):
        print(f"  {i}. (y={t['y']:.0f}) {t['message'][:50]!r} -> attached replies: {len(t['replies'])}")
    anchors = {t["node_id"] for t in threads}
    if len(anchors) > 1 and not all(t.get("normalized") for t in threads):
        print("  ⚠️ 루트가 서로 다른 노드에 앵커됨 + 좌표 미정규화 — y 정렬(통합 번호)이 화면 순서와 "
              "어긋날 수 있다. collect_node_boxes()로 node_boxes/frame_origin을 넘겨 정규화할 것 "
              "(md/wiki.md Step 3 좌표 정규화 규칙).")


def format_description(threads: list) -> str:
    """
    위키 Description용 번호 목록을 만든다 (md/wiki.md Step 3 규칙).
    - 루트는 y 순으로 1., 2., … 번호
    - 답글은 루트 아래 줄에 '↳ 본문'만 (번호 없음, created_at 순)
    """
    lines = []
    for i, t in enumerate(threads, 1):
        lines.append(f"{i}. {t['message']}")
        for rep in t["replies"]:
            lines.append(f"   ↳ {rep}")
    return "\n".join(lines)


def fetch_threads(file_key: str, token: str, node_ids=None,
                  include_resolved: bool = False, label: str = "",
                  node_boxes=None, frame_origin=None) -> list:
    """조회 → 스레드 구성 → 자기 점검 로그까지 한 번에 (권장 진입점).

    어노테이션·Description 번호용이면 collect_node_boxes(frame_doc) 결과를
    node_boxes/frame_origin으로 넘겨 좌표를 프레임-상대로 정규화한다 (필수 — 하위 노드
    앵커 핀의 y 정렬 오류 방지).
    """
    comments = fetch_comments_raw(file_key, token)
    threads = build_threads(comments, node_ids=node_ids, include_resolved=include_resolved,
                            node_boxes=node_boxes, frame_origin=frame_origin)
    log_self_check(threads, label=label or file_key)
    return threads


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("usage: FIGMA_TOKEN=figd_xxx python3 scripts/fetch_comments.py <fileKey> [nodeId1,nodeId2,...]")
        sys.exit(2)
    file_key = sys.argv[1]
    node_ids = sys.argv[2].split(",") if len(sys.argv) > 2 and sys.argv[2] else None
    token = os.environ.get("FIGMA_TOKEN")
    if not token:
        print("❌ FIGMA_TOKEN 환경변수가 필요합니다.")
        sys.exit(2)

    threads = fetch_threads(file_key, token, node_ids=node_ids)
    print("\n=== Description preview ===")
    print(format_description(threads))
