"""LPC 대량 쓰기용 로컬 데이터 서버 (md/landpress.md §10-6-1)

왜 — CMS 쓰기는 브라우저 탭(로그인 세션)에서 해야 하는데, 수십 행의 JSON을 javascript_tool 호출문에
직접 넣으면 대화가 커지고 오타 위험이 생긴다. 이 서버가 payload 파일을 CMS 탭에 넘기고,
탭이 보낸 쓰기 전후 원본(before/after)을 디스크에 저장한다(2026-11-06 T248 80행 × 3회 실측).

사용
    python3 scripts/restore/lpc_payload_server.py <payload.json> <저장 폴더> [--port 8777]
    # 백그라운드로 띄우고, CMS 탭에서 scripts/restore/lpc_bulk_put.js 실행 → 끝나면 프로세스 종료

- 127.0.0.1에만 열고, CORS는 CMS 출처(landpress-content-v2.linecorp.com)만 허용한다.
- GET /payload.json → payload 파일 · POST /save/<이름>.json → 저장 폴더에 기록
- 작업이 끝나면 반드시 종료한다(kill). 상시 띄워 두지 않는다.
"""
import argparse
import http.server
import os

ORIGIN = 'https://landpress-content-v2.linecorp.com'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('payload')
    ap.add_argument('outdir')
    ap.add_argument('--port', type=int, default=8777)
    a = ap.parse_args()
    os.makedirs(a.outdir, exist_ok=True)

    class H(http.server.BaseHTTPRequestHandler):
        def _h(self, code=200):
            self.send_response(code)
            self.send_header('Access-Control-Allow-Origin', ORIGIN)
            self.send_header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.send_header('Access-Control-Allow-Private-Network', 'true')
            self.send_header('Content-Type', 'application/json')
            self.end_headers()

        def do_OPTIONS(self):
            self._h()

        def do_GET(self):
            if self.path == '/payload.json':
                self._h()
                with open(a.payload, 'rb') as f:
                    self.wfile.write(f.read())
            else:
                self._h(404)

        def do_POST(self):
            name = os.path.basename(self.path)
            if not name.endswith('.json'):
                self._h(400)
                return
            body = self.rfile.read(int(self.headers.get('Content-Length', 0)))
            with open(os.path.join(a.outdir, name), 'wb') as f:
                f.write(body)
            self._h()
            self.wfile.write(b'{"ok":true}')

        def log_message(self, *args):
            pass

    print(f'serving {a.payload} on http://127.0.0.1:{a.port} → save to {a.outdir}', flush=True)
    http.server.HTTPServer(('127.0.0.1', a.port), H).serve_forever()


if __name__ == '__main__':
    main()
