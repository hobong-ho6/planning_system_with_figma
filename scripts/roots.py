"""PS ↔ Auto-react 저장소 경로 — 한 곳에서만 정한다.

  PS_ROOT  기본: 이 파일 기준 상위 폴더(PS 저장소 · 워크트리에서 실행해도 그 워크트리)
  AR_ROOT  기본: ~/Documents/Auto-react

Auto-react 경로는 `Path(__file__).parents[2]` 같은 추정으로 구하지 않는다 — PS를 워크트리에서
실행하면 엉뚱한 폴더를 가리켜 빈 원장을 새로 만든다(2026-10-22 감사).
"""
import os
from pathlib import Path

PS_ROOT = Path(os.environ.get("PS_ROOT") or Path(__file__).resolve().parent.parent).expanduser()
AR_ROOT = Path(os.environ.get("AR_ROOT") or Path.home() / "Documents" / "Auto-react").expanduser()
