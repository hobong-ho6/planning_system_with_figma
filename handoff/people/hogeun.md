# hogeun

> 사람키: `hogeun` · git identity `Hogeun Kim <hogeun.kim.lnxt@gmail.com>` · `handoff.person=hogeun` — **PC 2대 동일**(규칙: `handoff/README.md` 「사람 식별」)
> 담당 프로젝트: **활성 전부**(`HANDOFF.md` 인덱스 참조 — 수치는 적지 않는다, 늘 어긋난다)

## PC

| hostname | 저장소 경로 | git 세팅 | 비고 |
|---|---|---|---|
| `AL02359162.local` | `/Users/user/Documents/planning_system_with_figma` | ✅ 완료(2026-08-20) | 사내망 접속 시 XLT 읽기 API 사용 가능 |
| `AD03230205ui-iMac.local` | `/Users/ad03230205/Documents/planning_system_with_figma` | ✅ 완료(2026-08-20) | 사내망 OK(2026-09-15 XLT API 실측) · **DropWeb MCP 등록됨**(2026-09-16) |

## 환경 복구

- **토큰(2026-09-22 갱신)** — 키체인에 **5종 등록 완료**: `figma-pat`·`confluence-pat`·`jira-pat`·`github-token`·`dropweb-token`. ⚠️ 종전 `confluence-pat`은 **만료돼 익명으로 떨어지고 있었다**(REST가 401이 아니라 `Anonymous` 200을 준다 — 404를 「페이지 없음」으로 오판하기 쉽다). 사용 직전 `/v1/me`·`/rest/api/user/current`·`/rest/api/2/myself`로 유효성 확인. DropWeb 게시 절차는 `md/dropweb-guide.md` §8
- **Claude in Chrome은 사내 도메인이 차단된다**(09-21 실측) — `unifi-web.line-apps-beta.com`·`dropweb.line-apps-beta.com` 둘 다. **Beta·mini 점검은 인앱 브라우저**(→ `md/ia-check.md` 3단계). 드랍웹 라이브는 Okta SSO라 양쪽 다 못 볼 수 있어 **게시 검증은 REST 메타 + zip 해시 대조**로 한다.
- **⚠ Python 의존성이 사라질 수 있다**(실측 1회) — `ModuleNotFoundError` 시 아래(`Pillow` 포함 — `collect_frames.py`가 요구):
  ```bash
  pip3 install --break-system-packages -r scripts/requirements.txt
  ```

## 도구 함정

- macOS·MCP·스크립트 함정 7건(`collect_node_boxes` 언패킹 · 레지스트리 JSON 구조 · XLT API 사내망 전제 · `launch.json` npx 경로 · **Jira MCP가 코멘트 본문을 깨뜨림** · `timeout` 명령 없음 · Slack 긴 스레드는 파일로 떨어짐) → [`md/handoff-context.md`](../../md/handoff-context.md) §17
