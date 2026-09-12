#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
OA Flex bubble JSON → 카드 이미지(PNG) 렌더러

LINE 공식 Flex Message Simulator는 LINE Business ID 로그인이 필요해 자동화할 수 없다.
이 스크립트는 bubble JSON을 LINE 스타일 HTML/CSS로 그린 뒤 headless Chrome으로 캡처해
위키(Confluence) Screen 칸에 붙일 PNG를 만든다.

⚠️ 근사 렌더다 — 레이아웃·색·버튼 배치는 실제와 거의 같지만 폰트·미세 여백은 다를 수 있다.
   "발송 전 최종 확인"은 사람이 Flex Message Simulator에서 한다(md/OA.md).

사용:
  python3 scripts/render_oa_flex.py --input bubbles.json --out-dir assets/oa_render

  bubbles.json 형식 (둘 다 허용):
    {"클리닉 T0": {bubble…}, "클리닉 D-7": {bubble…}}
    [{"name": "클리닉 T0", "bubble": {…}}, …]

옵션:
  --width       카드 폭 px (기본 300 — LINE mega 버블 기준)
  --keep-html   중간 HTML을 지우지 않고 남긴다(디버깅용)
  --chrome      Chrome 실행 파일 경로 직접 지정

출력: <out-dir>/{slug}.png + <out-dir>/manifest.json
"""

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from html import escape

# LINE Flex 키워드 → px (공식 스펙 근사)
FONT_SIZE = {
    "xxs": 11, "xs": 12, "sm": 13, "md": 14, "lg": 17,
    "xl": 19, "xxl": 22, "3xl": 25, "4xl": 28, "5xl": 32,
}
SPACING = {"none": 0, "xs": 2, "sm": 4, "md": 8, "lg": 12, "xl": 16, "xxl": 20}

CHROME_CANDIDATES = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "google-chrome", "chromium", "chromium-browser",
]


def find_chrome(explicit=None):
    if explicit:
        return explicit
    for c in CHROME_CANDIDATES:
        if os.path.isabs(c):
            if os.path.exists(c):
                return c
        elif shutil.which(c):
            return shutil.which(c)
    sys.exit("❌ headless Chrome을 찾지 못했습니다. --chrome 으로 경로를 지정하세요.")


def px(table, key, default=0):
    if key is None:
        return default
    if isinstance(key, (int, float)):
        return key
    if isinstance(key, str) and key.endswith("px"):
        try:
            return float(key[:-2])
        except ValueError:
            return default
    return table.get(key, default)


# ──────────────────────────────────────────────────────────────
# bubble JSON → HTML
# ──────────────────────────────────────────────────────────────

def render_text(node):
    size = px(FONT_SIZE, node.get("size", "md"), 14)
    style = [f"font-size:{size}px", "line-height:1.5", "margin:0"]
    style.append(f"color:{node.get('color', '#000000')}")
    if node.get("weight") == "bold":
        style.append("font-weight:700")
    if node.get("margin"):
        style.append(f"margin-top:{px(SPACING, node['margin'])}px")
    if node.get("align"):
        style.append(f"text-align:{node['align']}")
    if not node.get("wrap"):
        style.append("white-space:nowrap;overflow:hidden;text-overflow:ellipsis")
    text = escape(node.get("text", ""), quote=False).replace("\n", "<br>")
    return f'<p style="{";".join(style)}">{text}</p>'


def render_separator(node):
    color = node.get("color", "#e5e5e5")
    m = px(SPACING, node.get("margin"), 0)
    return f'<hr style="border:none;border-top:1px solid {color};margin:{m}px 0">'


def render_button(node):
    style_kind = node.get("style", "link")
    color = node.get("color", "#0367d3")
    height = node.get("height", "md")
    label = escape((node.get("action") or {}).get("label", ""), quote=False)
    pad = "8px" if height == "sm" else "12px"
    base = [
        "display:block", "text-align:center", "border-radius:6px",
        "font-size:14px", "font-weight:500", "text-decoration:none",
        f"padding:{pad} 8px",
    ]
    if style_kind == "primary":
        base += [f"background:{color}", "color:#ffffff"]
    elif style_kind == "secondary":
        base += ["background:#dcdfe5", f"color:{color}"]
    else:  # link
        base += ["background:transparent", f"color:{color}"]
    if node.get("margin"):
        base.append(f"margin-top:{px(SPACING, node['margin'])}px")
    return f'<div style="{";".join(base)}">{label}</div>'


def render_image(node, in_hero=False):
    url = escape(node.get("url", ""), quote=True)
    ratio = node.get("aspectRatio", "1:1").replace(":", " / ")
    mode = "cover" if node.get("aspectMode", "fit") == "cover" else "contain"
    style = [f"aspect-ratio:{ratio}", f"object-fit:{mode}", "display:block", "width:100%"]
    if not in_hero and node.get("margin"):
        style.append(f"margin-top:{px(SPACING, node['margin'])}px")
    return f'<img src="{url}" style="{";".join(style)}">'


def render_box(node):
    layout = node.get("layout", "vertical")
    spacing = px(SPACING, node.get("spacing"), 0)
    style = ["display:flex", f"gap:{spacing}px"]
    style.append("flex-direction:column" if layout == "vertical" else "flex-direction:row")
    if layout == "baseline":
        style.append("align-items:baseline")
    if node.get("margin"):
        style.append(f"margin-top:{px(SPACING, node['margin'])}px")
    if node.get("paddingAll"):
        style.append(f"padding:{px(SPACING, node['paddingAll'])}px")
    if node.get("backgroundColor"):
        style.append(f"background:{node['backgroundColor']}")
    inner = "".join(render_node(c) for c in node.get("contents", []))
    return f'<div style="{";".join(style)}">{inner}</div>'


def render_node(node):
    t = node.get("type")
    if t == "box":
        return render_box(node)
    if t == "text":
        return render_text(node)
    if t == "separator":
        return render_separator(node)
    if t == "button":
        return render_button(node)
    if t == "image":
        return render_image(node)
    if t == "spacer":
        return f'<div style="height:{px(SPACING, node.get("size"), 8)}px"></div>'
    # icon·video 등 미지원 노드는 건너뛴다(렌더 목적상 무시해도 구조 파악에 지장 없음)
    return ""


PAGE = """<!doctype html><html><head><meta charset="utf-8"><style>
*{{box-sizing:border-box}}
body{{margin:0;background:#ffffff;display:inline-block;
 font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Helvetica Neue",sans-serif}}
.bubble{{width:{width}px;background:#fff;border-radius:14px;overflow:hidden;
 box-shadow:0 1px 4px rgba(0,0,0,.18)}}
.sec{{padding:16px}}
p{{margin:0}}
</style></head><body><div class="bubble">{parts}</div></body></html>"""


def bubble_to_html(bubble, width=300):
    parts = []
    if bubble.get("header"):
        parts.append(f'<div class="sec">{render_box(bubble["header"])}</div>')
    hero = bubble.get("hero")
    if hero:
        parts.append(render_image(hero, in_hero=True) if hero.get("type") == "image"
                     else f'<div class="sec">{render_node(hero)}</div>')
    if bubble.get("body"):
        parts.append(f'<div class="sec">{render_box(bubble["body"])}</div>')
    if bubble.get("footer"):
        parts.append(f'<div class="sec" style="padding-top:4px">{render_box(bubble["footer"])}</div>')
    return PAGE.format(width=width, parts="".join(parts))


# ──────────────────────────────────────────────────────────────

def slugify(name):
    s = re.sub(r"^\(OA\)\s*", "", name)
    s = s.replace("+", "P").replace("-", "M")
    s = re.sub(r"[^0-9A-Za-z가-힣]+", "_", s).strip("_")
    return s or "bubble"


def autocrop(path, pad=8):
    """흰 배경 여백을 잘라 카드만 남긴다."""
    try:
        from PIL import Image, ImageChops
    except ImportError:
        print("⚠️ Pillow가 없어 크롭을 건너뜁니다 (pip install pillow)")
        return
    im = Image.open(path).convert("RGB")
    diff = ImageChops.difference(im, Image.new("RGB", im.size, (255, 255, 255)))
    bbox = diff.getbbox()
    if bbox:
        l, t, r, b = bbox
        im = im.crop((max(0, l - pad), max(0, t - pad),
                      min(im.width, r + pad), min(im.height, b + pad)))
        im.save(path)
    return im.size if bbox else None


def load_bubbles(path):
    data = json.load(open(path, encoding="utf-8"))
    if isinstance(data, dict):
        return [(k, v) for k, v in data.items()]
    out = []
    for e in data:
        out.append((e.get("name") or e.get("screen_id"), e.get("bubble") or e))
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", required=True, help="bubble JSON 파일")
    ap.add_argument("--out-dir", required=True)
    ap.add_argument("--width", type=int, default=300)
    ap.add_argument("--keep-html", action="store_true")
    ap.add_argument("--chrome", default=None)
    ap.add_argument("--window-height", type=int, default=2400,
                    help="캡처 창 높이 — 카드가 잘리면 키운다")
    args = ap.parse_args()

    chrome = find_chrome(args.chrome)
    bubbles = load_bubbles(args.input)
    os.makedirs(args.out_dir, exist_ok=True)
    html_dir = os.path.join(args.out_dir, "_html") if args.keep_html else tempfile.mkdtemp()
    os.makedirs(html_dir, exist_ok=True)

    manifest = []
    for name, bubble in bubbles:
        if bubble.get("type") == "flex" and "contents" in bubble:
            bubble = bubble["contents"]          # 메시지 봉투로 감싼 경우 bubble만 꺼낸다
        slug = slugify(name)
        html_path = os.path.join(html_dir, f"{slug}.html")
        png_path = os.path.join(args.out_dir, f"{slug}.png")
        open(html_path, "w", encoding="utf-8").write(bubble_to_html(bubble, args.width))

        subprocess.run(
            [chrome, "--headless", "--disable-gpu", "--hide-scrollbars",
             f"--screenshot={png_path}",
             f"--window-size={args.width + 100},{args.window_height}",
             f"file://{html_path}"],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        size = autocrop(png_path)
        manifest.append({"name": name, "slug": slug, "png": png_path, "size": size})
        print(f"✅ {name} → {png_path} {size or ''}")

    json.dump(manifest, open(os.path.join(args.out_dir, "manifest.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=2)
    print(f"\n총 {len(manifest)}건 · manifest.json 저장")
    if not args.keep_html:
        shutil.rmtree(html_dir, ignore_errors=True)


if __name__ == "__main__":
    main()
