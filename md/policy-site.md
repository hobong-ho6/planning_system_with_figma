# Unifi Policy 사이트 (정책 모음 DropWeb) — 포인터

> ⛔ **소스는 이 저장소에 없다.** 2026-11-04 사용자 결정으로 private 저장소 **Auto-react `policy_site/`** 로 이전했다(이 저장소는 public이라 정책 요약 노출 · 릴리즈 자동 갱신이 커밋한다). 정본 규칙은 그쪽 `policy_site/rules.html`이며 사이트에 함께 게시된다(다른 기획자의 Claude도 읽는다).

- 사이트: https://dropweb.line-apps-beta.com/sites/d0bfd593mw01zjua/ (`d0bfd593mw01zjua` · 공개 · 2026-11-03 첫 배포)
- 소스 · 스크립트(모두 Auto-react): `policy_site/`(내용은 `data.js` 한 파일) · 검사 `scripts/check_policy_site.py`(`--live` = 정본 위키 판수 대조) · 적용 `scripts/policy_site_apply.py`
- **릴리즈 연동 자동 갱신**(2026-11-04 · 사람 승인 없음 — 이 사이트 한정): Jira UNIFY 버전 released(Unifi · Unifi mini · Pay·Kaia·Mobile 제외) 감지 → 판단 → 적용 → `check --live` exit 0이면 배포 · `data.js` 자동 커밋. 기존 카드 갱신만 자동, 신규 정책은 Auto-react 원장 일감. 규칙 `rules.html` 11절 · 장치 Auto-react `scripts/release_watch.py` · `scripts/policy_autoupdate.py`(watchd `type: release`)
- 사람이 고칠 때: 승인 후 MCP `update_site`(`change_summary` 필수) → 돌려받은 curl 실행 → `get_site` 확인 — `md/dropweb-guide.md` §8
- 범위: Unifi(웹) + Unifi mini · 2026-09 이후 배포 · Pay·Kaia·Mobile 제외 · 영역 9개(2026-11-03 사용자 확정 · T256)
