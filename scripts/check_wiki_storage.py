#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Confluence storage 규칙 위반 검사기 (md/wiki.md Screen 표·첨부 참조 규칙)

⛔ 위키 PUT **직전**(pre)과 PUT **직후**(post) 두 번 실행한다. prose 규칙으로만 있던
마크업 규칙을 통과/실패 산출물로 바꿔, 아래 실측 재발 사례를 차단한다:

  ⓐ Screen 표를 5컬럼(Screen ID | 화면명 | Screen | Description | XLT)으로 만든 위반
     — Screen ID가 화면 식별자이므로 화면명 컬럼은 금지 (2026-07-30 pageId=4394814893)
  ⓑ 첨부 참조에 <ri:page>를 넣어 다른 스페이스 키(LINENEXT)를 가리켜
     이미지·엑셀이 "알 수 없는 첨부파일"로 깨진 위반 (2026-07-30 같은 페이지)
  ⓒ Figma URL의 & 미이스케이프로 storage 파싱이 깨지는 위반

pre 검사는 **로컬 storage 문자열/파일** 또는 **라이브 페이지**를 대상으로 할 수 있다.
post 검사는 라이브 렌더(body.view)를 받아 실제로 깨졌는지 확인한다 — storage에 마크업이
들어간 것만으로는 렌더 성공을 보장하지 못하기 때문이다.

사용:
  # PUT 직전 — 보낼 storage를 파일로 저장해 검사
  python3 scripts/check_wiki_storage.py pre --file /tmp/body.xml
  # PUT 직전/직후 — 라이브 페이지의 현재 storage 검사
  CONFLUENCE_PAT=xxx python3 scripts/check_wiki_storage.py pre --page 4394814893
  # PUT 직후 — 렌더 검증 (Unknown Attachment·빈 이미지)
  CONFLUENCE_PAT=xxx python3 scripts/check_wiki_storage.py post --page 4394814893

  → 위반 없음: exit 0
  → 위반: exit 1 (위반 목록 출력)

옵션:
  --allow-ri-page   다른 페이지 첨부를 의도적으로 참조할 때만(md/wiki.md 4-C 예외) ⓑ 검사 완화
"""

import os
import re
import sys
import json
import urllib.request
from pathlib import Path

BASE_URL = os.environ.get("CONFLUENCE_BASE_URL", "https://wiki.workers-hub.com")

# 렌더 실패 신호 (Confluence 로케일별 표기)
RENDER_ERROR_MARKERS = [
    "Unknown Attachment", "알 수 없는 첨부", "알수없는 첨부",
    "unknown-attachment", "Unknown macro", "Error rendering",
]


# ──────────────────────────────────────────────────────────────
# pre: storage XHTML 검사
# ──────────────────────────────────────────────────────────────

def _screen_table_headers(storage: str) -> list:
    """Screen 섹션 이후 첫 표의 헤더 셀 목록들을 반환(표별 리스트)."""
    out = []
    for m in re.finditer(r"<h[12][^>]*>\s*Screen\s*</h[12]>", storage):
        seg = storage[m.end():]
        hdr = re.search(r"<tr>((?:\s*<th[^>]*>.*?</th>\s*)+)</tr>", seg, re.S)
        if hdr:
            cells = [re.sub(r"<[^>]+>", "", c).strip()
                     for c in re.findall(r"<th[^>]*>(.*?)</th>", hdr.group(1), re.S)]
            out.append(cells)
    return out


def check_storage(storage: str, allow_ri_page: bool = False) -> list:
    """storage XHTML의 규칙 위반 목록을 반환(빈 리스트면 통과)."""
    violations = []

    # ⓐ Screen 표 컬럼 — 4컬럼 고정, 화면명 컬럼 금지
    for cells in _screen_table_headers(storage):
        if not cells:
            continue
        joined = " | ".join(cells)
        banned = [c for c in cells if c in ("화면명", "프레임명", "Frame", "화면 이름")]
        if banned:
            violations.append(
                f"[Screen 표] 금지 컬럼 {banned} 존재 — Screen ID가 식별자이므로 화면명 컬럼 금지 "
                f"(현재: {joined}) · md/wiki.md 'Screen 표 컬럼 구성'")
        elif cells[0] == "Screen ID" and len(cells) != 4:
            violations.append(
                f"[Screen 표] 컬럼 수 {len(cells)} — 'Screen ID | Screen | Description | XLT' 4컬럼 고정 "
                f"(현재: {joined})")

    # ⓑ 첨부 참조에 <ri:page> 금지
    if not allow_ri_page:
        for m in re.finditer(r"<ri:attachment\b[^>]*ri:filename=\"([^\"]+)\"[^>]*>(.*?)</ri:attachment>",
                             storage, re.S):
            fn, inner = m.group(1), m.group(2)
            if "<ri:page" in inner:
                sk = re.search(r"ri:space-key=\"([^\"]+)\"", inner)
                violations.append(
                    f"[첨부 참조] '{fn}'에 <ri:page"
                    f"{' space-key=' + sk.group(1) if sk else ''}> 존재 — "
                    f"space-key/제목이 어긋나면 '알 수 없는 첨부파일'로 깨진다. "
                    f"<ri:attachment ri:filename=\"...\" /> 단독 사용 (md/wiki.md 4-C)")

    # ⓒ URL의 & 미이스케이프 (ri:value / href)
    for attr in ("ri:value", "href"):
        for m in re.finditer(attr + r"=\"([^\"]*)\"", storage):
            url = m.group(1)
            if not url.startswith(("http://", "https://")):
                continue
            # &amp; / &lt; 등 엔티티가 아닌 raw & 를 찾는다
            if re.search(r"&(?!amp;|lt;|gt;|quot;|#\d+;|apos;)", url):
                violations.append(
                    f"[URL 이스케이프] {attr}의 URL에 raw '&' 존재 — '&amp;'로 이스케이프 필요: {url[:90]}")

    return violations


# ──────────────────────────────────────────────────────────────
# post: 렌더 검증
# ──────────────────────────────────────────────────────────────

def check_render(view_html: str, page_id: str) -> list:
    """렌더된 body.view에서 실패 신호를 찾는다(빈 리스트면 통과)."""
    violations = []

    hit = [m for m in RENDER_ERROR_MARKERS if m in view_html]
    if hit:
        violations.append(f"[렌더] 실패 표시 발견: {hit} — 첨부 파일명·space-key·매크로 확인")

    # 첨부 이미지가 실제 다운로드 경로로 렌더됐는지
    imgs = re.findall(r"<img[^>]+src=\"([^\"]+)\"", view_html)
    attach_imgs = [s for s in imgs if "/download/attachments/" in s]
    if imgs and not attach_imgs:
        violations.append(
            "[렌더] <img>가 있으나 /download/attachments/ 경로가 없다 — 첨부 참조가 렌더되지 않았을 수 있음")
    wrong_page = [s for s in attach_imgs if f"/download/attachments/{page_id}/" not in s]
    if wrong_page:
        violations.append(
            f"[렌더] 다른 페이지의 첨부를 참조 중({len(wrong_page)}건): {wrong_page[0][:80]} — "
            f"이 페이지({page_id}) 첨부인지 확인")

    return violations


# ──────────────────────────────────────────────────────────────

def fetch(page_id: str, expand: str) -> dict:
    token = os.environ.get("CONFLUENCE_PAT")
    if not token:
        print("❌ CONFLUENCE_PAT 환경변수가 필요합니다 (라이브 페이지 조회 시)")
        sys.exit(2)
    req = urllib.request.Request(
        f"{BASE_URL}/rest/api/content/{page_id}?expand={expand}",
        headers={"Authorization": f"Bearer {token}"})
    return json.load(urllib.request.urlopen(req, timeout=90))


def main(argv):
    if len(argv) < 2 or argv[1] not in ("pre", "post"):
        print(__doc__.strip().split("사용:")[1].strip() if "사용:" in __doc__ else "")
        print("사용: python3 scripts/check_wiki_storage.py {pre|post} (--file PATH | --page PAGEID) [--allow-ri-page]")
        return 2

    mode = argv[1]
    args = argv[2:]
    allow = "--allow-ri-page" in args
    file_path = page_id = None
    if "--file" in args:
        file_path = args[args.index("--file") + 1]
    if "--page" in args:
        page_id = args[args.index("--page") + 1]

    if mode == "pre":
        if file_path:
            storage = Path(file_path).read_text(encoding="utf-8")
            target = f"file {file_path}"
        elif page_id:
            storage = fetch(page_id, "body.storage")["body"]["storage"]["value"]
            target = f"page {page_id} (live storage)"
        else:
            print("❌ pre 모드는 --file 또는 --page 가 필요합니다")
            return 2
        violations = check_storage(storage, allow_ri_page=allow)
        label = "storage 규칙"
    else:
        if not page_id:
            print("❌ post 모드는 --page 가 필요합니다 (렌더 검증)")
            return 2
        d = fetch(page_id, "body.view")
        violations = check_render(d["body"]["view"]["value"], page_id)
        target = f"page {page_id} (rendered view)"
        label = "렌더 결과"

    if violations:
        print(f"❌ {label} 위반 {len(violations)}건 — {target}")
        for v in violations:
            print(f"  - {v}")
        print("\n→ md/wiki.md 'Screen 표 컬럼 구성' / '4-C 첨부 참조' 규칙에 맞게 고친 뒤 재실행하세요.")
        return 1

    print(f"✅ {label} 통과 — {target}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
