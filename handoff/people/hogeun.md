# hogeun

> 사람키: `hogeun` · git identity `Hogeun Kim <hogeun.kim.lnxt@gmail.com>` · `handoff.person=hogeun` — **PC 2대 동일**(규칙: `handoff/README.md` 「사람 식별」)
> 담당 프로젝트: **활성 전부**(`HANDOFF.md` 인덱스 참조 — 수치는 적지 않는다, 늘 어긋난다)

## PC

| hostname | 저장소 경로 | git 세팅 | 비고 |
|---|---|---|---|
| `AL02359162.local` | `/Users/user/Documents/planning_system_with_figma` | ✅ 완료(2026-08-20) | 사내망 접속 시 XLT 읽기 API 사용 가능 |
| `AD03230205ui-iMac.local` | `/Users/ad03230205/Documents/planning_system_with_figma` | ✅ 완료(2026-08-20) | 사내망 OK(2026-09-15 XLT API 실측) · **DropWeb MCP 등록됨**(2026-09-16) |

## 환경 복구

- **DropWeb MCP**(09-16) — `~/.claude.json`의 `mcpServers.dropweb`. ⛔ **PC마다 등록**(토큰=비밀값, 저장소에 없음) · DropWeb **MCP Token** 메뉴에서 발급 · `md/dropweb-guide.md` §8

- **⚠ Python 의존성이 사라질 수 있다**(실측 1회) — `ModuleNotFoundError` 시 아래(`Pillow` 포함 — `collect_frames.py`가 요구):
  ```bash
  pip3 install --break-system-packages -r scripts/requirements.txt
  ```

## 도구 함정 (이 PC들에서 실측 — 전역 스크립트 계약은 `HANDOFF.md`)

- `collect_node_boxes(frame_doc)`는 **`(boxes, frame_bbox)` 튜플을 반환**한다 — `boxes, origin = collect_node_boxes(doc)`로 **언패킹해서** `fetch_threads(node_boxes=boxes, frame_origin=origin)`에 넘긴다. 그대로 넘기면 `AttributeError: 'tuple' object has no attribute 'get'`(2026-08-24 실측).
- `fetch_xlt_registry.py --out`이 만드는 JSON은 `{"metadata":…, "entries": {키: {5개 언어}}}`이고 **`entries`는 dict**다(리스트로 가정하면 `'str' object has no attribute 'get'`). 서브에이전트에 레지스트리를 넘길 때 이 구조를 프롬프트에 명시한다.
- **XLT 읽기 API는 사내망/VPN 전제다**(무인증이나 IP 화이트리스트 추정). 실패 유형별 처리·프록시 로그인 페이지(200 + HTML) 대응은 **`md/xlt-verify.md` §2-4가 정본**. 미연결 시 사용자 export로 폴백하며 레지스트리는 **옵셔널**이라 게이트가 통째로 실패하지는 않는다.
- `.claude/launch.json`은 **git 제외**라 PC마다 직접 만들어야 하고, 이 PC에선 **npx 경로가 `/usr/local/bin/npx`**다(등록된 `~/.nvm/...` 경로는 없다). **가이드 로컬 미리보기 기동법·파이썬 `http.server` 샌드박스 함정은 `md/ia-check.md` §2-0-1이 정본**이다.
- **Jira MCP `jira_add_comment`는 본문을 망가뜨린다**(2026-09-17 실측 · UNIFY-11360) — 마크다운→Jira 변환이 `_`를 `\*`/`\_`로 깨고(`UF_voucher_detail_guide`→`UF\*voucher\*detail\_guide`), `<span>`을 `[span]`으로 바꾸며 **여는 태그를 통째로 삭제**하기도 한다. XLT 키·태그·코드가 든 코멘트는 **Jira wiki markup**(`{{...}}`·`{noformat}`)으로 쓰고 **REST로 직접** 보낸다 — `POST/PUT /rest/api/2/issue/{key}/comment[/{id}]` · `Authorization: Bearer {Jira PAT}`. 이미 게시한 코멘트도 같은 경로로 **수정 가능**(PUT, 중복 코멘트 안 남음).
- **`timeout` 명령이 없다**(macOS 기본 · 2026-09-15 실측) — `timeout 90 python3 ...`은 `command not found`로 죽는다. 필요하면 `gtimeout`(coreutils)을 쓰거나 그냥 실행한다.
- **Slack `get_thread_replies`는 긴 스레드에서 토큰 상한을 넘겨 파일로 떨어진다**(2026-09-15 실측 · 113메시지 152KB). 반환된 경로를 `python3`/`jq`로 **필요한 `ts`만 뽑아 읽는다** — 전문을 컨텍스트에 올리지 않는다.
