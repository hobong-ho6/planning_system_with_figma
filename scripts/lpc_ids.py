"""Landpress Content(LPC) 프로젝트 ID 정본 — 팀 × 환경 4개.

PS·Auto-react 스크립트는 여기서 import한다(사본 금지):
  sys.path.insert(0, str(PS_ROOT / "scripts")); from lpc_ids import LPC_PROJECTS
JS(`restore/*.js`)는 import할 수 없어 값을 직접 갖는다 — 바뀌면 같이 고친다.
"""
LPC_PROJECTS = {
    "LV": {"beta": "a2qaxhygpi95g8l4a48n2vn4", "prod": "w5eph4y9qxe05c8fqpi7rlxh"},
    "UIT": {"beta": "n7nuefo6t491uc9cp863lgyq", "prod": "lkyusnekq1vv9759rbnwgamh"},
}
