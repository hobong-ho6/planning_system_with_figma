# hogeun

> 사람키: `hogeun` (`git config --global handoff.person hogeun`) · PC 2대
> 담당 프로젝트: **활성 11종 전부** — `HANDOFF.md` 프로젝트 인덱스 참조

## PC

| hostname | 저장소 경로 | 비고 |
|---|---|---|
| `AL02359162.local` | `/Users/user/Documents/planning_system_with_figma` | 사내망 접속 시 XLT 읽기 API 사용 가능 |
| `AD03230205ui-iMac.local` | `/Users/ad03230205/…` | (미확인) 경로 뒷부분 미기재 |

## 환경 복구

- **⚠ Python 의존성이 사라질 수 있다**(실측 1회) — `ModuleNotFoundError`가 나면:
  ```bash
  pip3 install --break-system-packages -r scripts/requirements.txt
  ```
  (`Pillow` 포함 — `collect_frames.py`가 요구)

## 도구 함정 (이 PC들에서 실측)

- `validate_translation.py`는 **용어집을 두 번째 위치 인자로만** 받는다(`--glossary` 플래그 없음). 빠뜨리면 "용어집이 로드되지 않음. 2단계 건너뜀"으로 **조용히 통과**한다:
  ```bash
  python3 scripts/validate_translation.py <엑셀> scripts/glossary.json
  ```
- `check_wiki_storage.py post --page`는 `CONFLUENCE_PAT` **환경변수**를 요구한다(`--token` 아님). `compare_wiki_xlt.py`도 동일.
- **XLT 읽기 API는 사내망/VPN 전제다**(무인증이지만 IP 화이트리스트 추정). 실패 유형별 처리는 `md/xlt-verify.md` §2-4 — 특히 **사내 프록시 로그인 페이지가 200 + HTML로 오는 경우**를 `RuntimeError`로 잡는다. VPN 미연결 시 사용자 export로 폴백하며 **레지스트리는 항상 옵셔널**이라 게이트 전체가 실패하지는 않는다.
- `.claude/launch.json`은 **git 제외**이고 기존 항목의 경로·실행파일이 이 PC와 어긋나 **`guide-site` 기동이 실패한다**(2026-08-10 실측). 가이드 미리보기는 이게 빠르다:
  ```bash
  python3 -m http.server 8000 --directory guide
  ```
