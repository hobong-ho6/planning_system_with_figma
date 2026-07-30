#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
프레임 읽기 전용 배치 수집기 (대량 작업용 — md/wiki.md Step 3~4 입력 생성)

여러 프레임의 **조회·좌표 정규화·코멘트 스레드·텍스트 매칭·이미지 다운로드**를 한 번에 처리해
구조화 JSON으로 낸다. 쓰기 작업(번역·게이트·위키 PUT·엑셀)은 **하지 않는다** — 그 단계는
단일 컨텍스트에서 직렬로 해야 하기 때문이다(위키 버전 가드·번역 일관성·게이트 누적 판정).

왜 이 스크립트인가:
  - Figma `/comments`는 **파일 전체**를 반환하므로 프레임마다 다시 호출하면 낭비다 → 1회 조회 후 재사용
  - `/nodes`도 ids를 콤마로 묶어 1회 호출
  - 좌표 정규화(하위 노드 앵커 보정)를 프레임마다 빠뜨리지 않게 고정
  - 서브에이전트로 팬아웃할 때도 **이 스크립트를 계약(contract)으로 삼아** 산출물 형태를 통일

⚠️ 팬아웃 손익분기: **프레임 8~10개 이상**일 때만 병렬화 가치가 있다. 그 아래는 이 스크립트를
단일 프로세스로 한 번 돌리는 것이 더 빠르다(에이전트 기동·프롬프트 주입·취합 비용 > 이득).

사용:
  FIGMA_TOKEN=figd_xxx python3 scripts/collect_frames.py <fileKey> <nodeId,nodeId,...> \
      [--out DIR] [--no-image] [--scale 2]

산출 (기본 DIR = assets/collected):
  {DIR}/frames.json          — 프레임별 {name,size,texts[],threads[],points[],xlt_targets[]}
  {DIR}/raw_{nodeId}.png     — 원본 이미지 (--no-image면 생략)
  {DIR}/annotated_{nodeId}.png — 통합 번호 어노테이션 (--no-image면 생략)

산출 JSON의 points[]는 md/wiki.md 4-B 배치 규칙(매칭 텍스트 좌측 10pt·정책은 핀 위치·
정책=빨강/xlt=파랑·겹침 해소)을 적용한 결과이며, 이미지는 그 좌표로 렌더된다.
어노테이션 **육안 검증은 사람이 해야 한다** — 이 스크립트는 검증을 대신하지 않는다.
"""

import os
import sys
import json
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from scripts.fetch_comments import (  # noqa: E402
    fetch_comments_raw, build_threads, collect_node_boxes, log_self_check,
)

API = "https://api.figma.com/v1"
SCALE_DEFAULT = 2
CIRCLE_R = 18
RED = (220, 53, 69, 255)
BLUE = (13, 110, 253, 255)
WHITE = (255, 255, 255, 255)


def _get(url: str, token: str) -> dict:
    req = urllib.request.Request(url, headers={"X-Figma-Token": token})
    return json.load(urllib.request.urlopen(req, timeout=120))


def extract_texts(node: dict) -> list:
    """프레임-상대 좌표의 표시 TEXT 노드 목록 (y,x 오름차순)."""
    fb = node["absoluteBoundingBox"]
    out = []

    def walk(n, hidden=False):
        if n.get("visible") is False:
            hidden = True
        if n["type"] == "TEXT" and not hidden:
            b = n["absoluteBoundingBox"]
            out.append({"id": n["id"], "t": n["characters"],
                        "x": b["x"] - fb["x"], "y": b["y"] - fb["y"],
                        "w": b["width"], "h": b["height"]})
        for c in n.get("children", []):
            walk(c, hidden)

    walk(node)
    out.sort(key=lambda t: (t["y"], t["x"]))
    return out


def match_text(texts: list, cx: float, cy: float):
    """코멘트 좌표 → 텍스트 (포함 우선 최소 bbox, 없으면 최근접). md/translate.md 매칭 알고리즘."""
    cand = [t for t in texts
            if t["x"] <= cx <= t["x"] + t["w"] and t["y"] <= cy <= t["y"] + t["h"]]
    if cand:
        cand.sort(key=lambda t: t["w"] * t["h"])
        return cand[0]
    best, bd = None, float("inf")
    for t in texts:
        dx = max(t["x"] - cx, 0, cx - (t["x"] + t["w"]))
        dy = max(t["y"] - cy, 0, cy - (t["y"] + t["h"]))
        d = dx * dx + dy * dy
        if d < bd:
            bd, best = d, t
    return best


def build_points(threads: list, texts: list, scale: int) -> tuple:
    """통합 번호 points[(no,x,y,color)] + xlt_targets[] 생성 (md/wiki.md 4-B 배치 규칙)."""
    points, targets = [], []
    for no, th in enumerate(threads, 1):
        is_xlt = th["message"].strip().lower() == "xlt"
        has_xlt_reply = any(r.strip().lower() == "xlt" for r in th["replies"])
        if is_xlt or has_xlt_reply:
            t = match_text(texts, th["x"], th["y"])
            if t is None:
                points.append([no, th["x"], th["y"], "red"])
                continue
            py = th["y"] if t["h"] > 40 else t["y"] + t["h"] / 2
            points.append([no, t["x"] - 10, py, "blue" if is_xlt else "red"])
            targets.append({"no": no, "text": t["t"], "text_id": t["id"],
                            "kind": "xlt" if is_xlt else "policy+xlt_reply"})
        else:
            points.append([no, th["x"], th["y"], "red"])
    # 겹침 해소 — 뒤 번호를 우측으로 최소 이동
    need = 2 * CIRCLE_R / scale + 1
    for i in range(len(points)):
        for j in range(i + 1, len(points)):
            dx, dy = points[j][1] - points[i][1], points[j][2] - points[i][2]
            if (dx * dx + dy * dy) ** 0.5 < need:
                points[j][1] = points[i][1] + need + 2
    return points, targets


def annotate(in_path: Path, points: list, out_path: Path, scale: int) -> list:
    """번호 원 렌더. 반환: 남은 겹침 쌍(빈 리스트면 정상)."""
    from PIL import Image, ImageDraw, ImageFont
    img = Image.open(in_path).convert("RGBA")
    W, H = img.size
    ov = Image.new("RGBA", img.size, (0, 0, 0, 0))
    dr = ImageDraw.Draw(ov)
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", size=int(CIRCLE_R * 1.3))
    except Exception:
        font = ImageFont.load_default()
    for no, rx, ry, color in points:
        px = min(max(int(rx * scale), CIRCLE_R + 2), W - CIRCLE_R - 2)
        py = min(max(int(ry * scale), CIRCLE_R + 2), H - CIRCLE_R - 2)
        dr.ellipse([px - CIRCLE_R, py - CIRCLE_R, px + CIRCLE_R, py + CIRCLE_R],
                   fill=RED if color == "red" else BLUE, outline=WHITE, width=2)
        lb = str(no)
        bb = dr.textbbox((0, 0), lb, font=font)
        dr.text((px - (bb[2] - bb[0]) // 2 - bb[0], py - (bb[3] - bb[1]) // 2 - bb[1]),
                lb, fill=WHITE, font=font)
    Image.alpha_composite(img, ov).convert("RGB").save(out_path)
    need = 2 * CIRCLE_R / scale + 1
    return [(a[0], b[0]) for i, a in enumerate(points) for b in points[i + 1:]
            if ((a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2) ** 0.5 < need]


def collect(file_key: str, node_ids: list, out_dir: str = "assets/collected",
            with_image: bool = True, scale: int = SCALE_DEFAULT) -> dict:
    token = os.environ.get("FIGMA_TOKEN")
    if not token:
        print("❌ FIGMA_TOKEN 환경변수가 필요합니다")
        sys.exit(2)
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)

    # 1) 노드 1회 조회 + 코멘트 1회 조회 (프레임 수와 무관하게 각 1회)
    ids_q = ",".join(node_ids)
    nodes = _get(f"{API}/files/{file_key}/nodes?ids={urllib.parse.quote(ids_q)}", token)["nodes"]
    comments = fetch_comments_raw(file_key, token)
    print(f"[collect] nodes={len(nodes)} / comments(file 전체)={len(comments)} — 각 1회 조회")

    # 2) 이미지 URL 1회 일괄 발급
    urls = {}
    if with_image:
        ids_enc = ",".join(i.replace(":", "%3A") for i in node_ids)
        urls = _get(f"{API}/images/{file_key}?ids={ids_enc}&scale={scale}&format=png",
                    token).get("images", {})

    result = {}
    for nid in node_ids:
        wrap = nodes.get(nid) or nodes.get(nid.replace("-", ":"))
        if not wrap:
            print(f"  ⚠️ {nid}: 노드 응답 없음 — 건너뜀")
            continue
        node = wrap["document"]
        boxes, origin = collect_node_boxes(node)
        threads = build_threads(comments, node_ids=set(boxes),
                                node_boxes=boxes, frame_origin=origin)
        log_self_check(threads, label=f"{nid} {node['name']}")
        texts = extract_texts(node)
        points, targets = build_points(threads, texts, scale)

        entry = {"node_id": nid, "name": node["name"],
                 "size": [origin["width"], origin["height"]],
                 "texts": texts, "threads": threads,
                 "points": points, "xlt_targets": targets}

        if with_image and nid in urls and urls[nid]:
            safe = nid.replace(":", "-")
            raw_p = out / f"raw_{safe}.png"
            req = urllib.request.Request(urls[nid], headers={"User-Agent": "Mozilla/5.0"})
            raw_p.write_bytes(urllib.request.urlopen(req, timeout=180).read())
            ann_p = out / f"annotated_{safe}.png"
            overlaps = annotate(raw_p, points, ann_p, scale)
            entry["raw_image"] = str(raw_p)
            entry["annotated_image"] = str(ann_p)
            entry["overlaps"] = overlaps
            print(f"  {nid} {node['name']!r}: pins={len(points)} xlt={len(targets)} "
                  f"overlaps={overlaps if overlaps else '없음'} → {ann_p.name}")
        else:
            print(f"  {nid} {node['name']!r}: pins={len(points)} xlt={len(targets)} (이미지 생략)")

        result[nid] = entry

    (out / "frames.json").write_text(
        json.dumps(result, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"[collect] 완료 — {out/'frames.json'} ({len(result)} 프레임)")
    print("⚠️ 어노테이션 이미지는 사람이 육안 검증해야 한다 (md/wiki.md 4-B).")
    return result


def main(argv):
    if len(argv) < 3:
        print("사용: FIGMA_TOKEN=figd_xxx python3 scripts/collect_frames.py "
              "<fileKey> <nodeId,nodeId,...> [--out DIR] [--no-image] [--scale 2]")
        return 2
    file_key, ids = argv[1], [s.strip() for s in argv[2].split(",") if s.strip()]
    args = argv[3:]
    out_dir = args[args.index("--out") + 1] if "--out" in args else "assets/collected"
    scale = int(args[args.index("--scale") + 1]) if "--scale" in args else SCALE_DEFAULT
    collect(file_key, ids, out_dir=out_dir,
            with_image="--no-image" not in args, scale=scale)
    return 0


if __name__ == "__main__":
    import urllib.parse  # noqa: E402  (main에서만 필요)
    sys.exit(main(sys.argv))
