# Unifi Policy 사이트 (정책 모음 DropWeb)

> 정본 규칙은 **`policy_site/rules.html`** 이다(사이트에 함께 게시돼 다른 기획자의 Claude도 읽는다). 이 파일은 PS 세션용 포인터다 — 규칙을 바꾸면 rules.html을 고친다.

- 소스: `policy_site/`(git 추적) — 내용은 `data.js` 한 파일 · 화면은 `index.html`·`script.js`·`style.css` · 규칙 `rules.html` · 기획서 `service-spec.md`
- 검사: `python3 scripts/check_policy_site.py`(형식) · `--live`(정본 위키 판수 대조 — `CONFLUENCE_PAT` 키체인에서 주입) → exit 0
- ZIP: `cd policy_site && zip -qr ../dropweb/unifi_policy_vN.zip . -x ".*" "service-spec.md"`
- 사이트: https://dropweb.line-apps-beta.com/sites/d0bfd593mw01zjua/ (`d0bfd593mw01zjua` · 공개 · 2026-11-03 첫 배포)
- 게시: 사용자 승인 후 MCP `update_site`(`change_summary` 필수) → 돌려받은 curl 실행 → `get_site` 확인 — `md/dropweb-guide.md` §8
- 범위: Unifi(웹) + Unifi mini · 2026-09 이후 배포 · Pay·Kaia·Mobile 제외 · 영역 9개(2026-11-03 사용자 확정 · T256)
- 배포 이력 출처: Now Platform `now.linenextcorp.com/unifi/production.html#deploy`(SSO — 사용자 로그인) → 페이지가 쓰는 `/unifi/api/jira/production/deploy` JSON
