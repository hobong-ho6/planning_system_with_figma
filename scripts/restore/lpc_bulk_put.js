/* ============================================================================
 * LPC 대량 안전 쓰기 — Landpress CMS 탭 전용 (md/landpress.md §10-6-1 · lpc_safe_put.js의 대량판)
 *
 * lpc_safe_put.js와 같은 3중 안전장치(현재 문서 읽기 → 콘텐츠 필드 전부 실어 PUT → 건별 재조회 대조)에
 * 아래를 더했다(2026-11-06 T248 OA ④ 80행 × 3회 실측).
 *   - 데이터는 로컬 서버(scripts/restore/lpc_payload_server.py)에서 받는다 — 호출문에 JSON을 싣지 않는다
 *   - 대조는 키 순서와 무관하게 한다(CMS가 객체 키 순서를 바꿔 돌려준다 — 단순 stringify 비교는 오탐)
 *   - 쓰기 전 원본(before)과 쓴 뒤(after)를 서버로 보내 디스크에 남긴다(복구원)
 *
 * payload 형식(서버의 payload.json)
 *   { "<env>_<postId>_<locale>": { "<필드명>": <값>, ... }, ... }   env = beta | prod
 *   예: { "beta_328_ko_KR": { "messages": [ … ] } }
 *   ⛔ fields에는 바꿀 필드만 넣는다 — 나머지는 현재 문서에서 그대로 실어 보낸다.
 *
 * 사용
 *   1. 터미널: python3 scripts/restore/lpc_payload_server.py payload.json 저장폴더  (백그라운드)
 *   2. landpress-content-v2.linecorp.com 탭(로그인 · roles/my 200 확인)에서 아래 CONFIG를 채워 실행
 *   3. 결과 `실패: 0` 확인 → 터미널 python3 scripts/check_lpc_nulls.py exit 0 → 공개 API 재조회 대조 → 서버 종료
 * ========================================================================== */

const CONFIG = {
  server: 'http://127.0.0.1:8777',
  collection: 'oam_message_task_multi',
  project: { beta: 'a2qaxhygpi95g8l4a48n2vn4', prod: 'w5eph4y9qxe05c8fqpi7rlxh' },
  filter: k => true,          // 쓸 키만 고른다(예: k => k.startsWith('beta_'))
  tag: 'run1',                // before/after 파일 이름 접두
  PUBLISH: true,              // 다건 컬렉션은 true · ⛔ 단건(SINGLE) 컬렉션은 false(§10-4)
};

(async () => {
  if (location.origin !== 'https://landpress-content-v2.linecorp.com') return `❌ CMS 탭이 아닙니다: ${location.origin}`;
  const SYS = new Set(['id','postId','locale','primaryLocale','published','createdAt','updatedAt','uid','_env',
                       'createdBy','updatedBy','_publishReservations','lp_env','lp_size']);
  const canon = v => JSON.stringify(v, (k, val) => (val && typeof val === 'object' && !Array.isArray(val))
    ? Object.keys(val).sort().reduce((o, kk) => (o[kk] = val[kk], o), {}) : val);

  const P = await (await fetch(`${CONFIG.server}/payload.json`)).json();
  const keys = Object.keys(P).filter(CONFIG.filter);
  if (!keys.length) return '❌ 쓸 키가 없습니다.';

  const before = {}, after = {}; let ok = 0; const fail = [];
  for (const key of keys) {
    const [env, postId, ...lr] = key.split('_'); const locale = lr.join('_');
    const url = `/api/v1/projects/${CONFIG.project[env]}/collections/${CONFIG.collection}/items/${postId}?locale=${locale}`;
    const res = await fetch(url, { credentials: 'include' });
    if (res.status !== 200) { fail.push(`${key} GET ${res.status}`); continue; }
    const cur = await res.json(); before[key] = cur;

    const fields = P[key];
    const body = {};
    for (const [k, v] of Object.entries(cur)) if (!SYS.has(k)) body[k] = v;   // 기존 콘텐츠 필드 전부 보존
    Object.assign(body, fields);
    if (CONFIG.PUBLISH) body.published = true;
    const preserved = Object.keys(body).filter(k => !(k in fields) && k !== 'published');

    const put = await fetch(url, { method: 'PUT', credentials: 'include',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (put.status !== 200) { fail.push(`${key} PUT ${put.status} ${(await put.text()).slice(0, 200)}`); continue; }

    const af = await (await fetch(url, { credentials: 'include' })).json(); after[key] = af;
    const wrote = Object.keys(fields).every(f => canon(af[f]) === canon(fields[f]));
    const kept = preserved.every(f => canon(af[f]) === canon(body[f]));
    const nulls = Object.entries(af).filter(([k, v]) => !SYS.has(k) && v === null).map(([k]) => k);
    if (wrote && kept && !nulls.length && (!CONFIG.PUBLISH || af.published === true)) ok++;
    else fail.push(`${key} 대조실패 wrote=${wrote} kept=${kept} pub=${af.published}` + (nulls.length ? ` null=${nulls}` : ''));
  }

  await fetch(`${CONFIG.server}/save/before_${CONFIG.tag}.json`, { method: 'POST', body: JSON.stringify(before) });
  await fetch(`${CONFIG.server}/save/after_${CONFIG.tag}.json`, { method: 'POST', body: JSON.stringify(after) });
  return { 대상: keys.length, 성공: ok, 실패: fail.length, 실패목록: fail,
           다음: 'check_lpc_nulls.py exit 0 → 공개 API 재조회(beta = prod 대조) → 서버 종료' };
})();
