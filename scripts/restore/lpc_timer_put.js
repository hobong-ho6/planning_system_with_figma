/* ============================================================================
 * LPC 예약 필드 변경 타이머 — Landpress CMS 탭 안에서 정해진 시각에 필드 값을 바꾼다
 * (md/landpress.md §10-2-2 정본 · 2026-10-12 SK 기프티콘 이관 23:50 구매 차단에 처음 사용)
 *
 * 왜 — CMS 예약(§10-2-1)은 「공개 / 공개 취소」만 된다. 「○시에 스위치 필드를 켠다」 같은
 * 필드 값 변경은 예약할 수 없다. 이 코드는 브라우저 탭 안에서 그 시각을 기다렸다가
 * lpc_safe_put.js와 같은 방식(read-modify-write + 재조회 대조)으로 PUT한다.
 * Claude 세션 · 계정과 무관하게 돈다(탭 · Chrome · Mac · LPC 로그인만 살아 있으면 된다).
 *
 * 사용법 (상세는 md/landpress.md §10-2-2)
 *   1. CONFIG를 채운다 — FIRE_AT은 시간대를 반드시 붙인다(예: '2026-10-12T23:50:00+09:00')
 *   2. 먼저 DRY: true + 1~2분 뒤 FIRE_AT으로 걸어 본다(PUT 없음 · 바꿀 내용만 점검)
 *   3. https://landpress-content-v2.linecorp.com 탭(로그인 상태 · 어느 페이지든 됨)의
 *      DevTools 콘솔에 전체를 붙여넣는다(Claude는 Claude in Chrome javascript_tool로 같은 일을 한다)
 *   4. 탭 제목이 「[TAG 대기] …」로 바뀐다 → ⛔ 그 탭은 이동 · 새로고침 · 닫기 금지
 *   5. 실행되면 제목이 「[TAG 완료] en:OK ko:OK …」 · 결과는 그 탭 localStorage에 남는다
 *        lpct_{TAG}_result · lpct_{TAG}_log · lpct_{TAG}_backup_{locale}(PUT 직전 값) · lpct_{TAG}_armed
 *   6. 실행 직후 공개 API로 확인 → python3 scripts/check_lpc_nulls.py → exit 0
 *
 * 취소: 같은 탭 콘솔에서 clearInterval(window.__lpct_{TAG}) — 또는 탭을 닫는다
 * 다시 걸기: 같은 TAG로 다시 붙여넣으면 이전 타이머를 지우고 새로 건다(같은 탭 안에서만)
 * ========================================================================== */

(() => {
  const CONFIG = {
    TAG: 'example',                        // 탭 제목 · localStorage 키에 쓰는 짧은 이름(영문)
    FIRE_AT: '2026-01-01T00:00:00+09:00',  // 실행 시각 — 시간대 필수(+09:00 = KST/JST)
    DRY: true,                             // true = PUT 없이 점검만. 실전은 false
    PID: 'w5eph4y9qxe05c8fqpi7rlxh',       // 프로젝트 uid (LV prod 예시 — md/landpress.md 프로젝트 표)
    COL: 'maintenance_banner',             // 컬렉션 이름 — ⚠️ 다건(postId) 컬렉션 전용. 단건은 §10-4
    POST_ID: 1,
    LOCALES: ['en_US', 'ko_KR', 'ja_JP', 'zh_TW', 'th_TH'],
    // 바꿀 필드 — 최상위 필드 단위로 통째로 넣는다. 객체 필드의 한 키만 바꾸려면 함수로 쓴다:
    //   FIELDS: cur => ({ contents: { ...cur.contents, targetUrl: 'https://…' } })
    FIELDS: { buy_block_on_off: true },
    PUBLISH: true,                         // 다건 컬렉션은 true(저장과 함께 공개 유지)
  };

  const C = CONFIG;
  const K = 'lpct_' + C.TAG;
  const SYS = new Set(['id','postId','locale','primaryLocale','published','createdAt','updatedAt','uid','_env',
                       'createdBy','updatedBy','_publishReservations','lp_env','lp_size']);
  const at = Date.parse(C.FIRE_AT);
  if (location.origin !== 'https://landpress-content-v2.linecorp.com') return '❌ landpress-content-v2 탭에서 실행하세요';
  if (!/[zZ]|[+-]\d\d:\d\d$/.test(C.FIRE_AT) || isNaN(at)) return '❌ FIRE_AT에 시간대를 붙이세요(예: +09:00)';
  if (at < Date.now() - 60000) return '❌ FIRE_AT이 이미 지났습니다';

  const log = m => { try { const a = JSON.parse(localStorage.getItem(K + '_log') || '[]');
    a.push(new Date().toISOString() + ' ' + m); localStorage.setItem(K + '_log', JSON.stringify(a.slice(-300))); } catch (e) {} };
  const url = l => `/api/v1/projects/${C.PID}/collections/${C.COL}/items/${C.POST_ID}?locale=${l}`;
  const sj = o => JSON.stringify(o, (k, v) => (v && typeof v === 'object' && !Array.isArray(v))
    ? Object.keys(v).sort().reduce((a, x) => (a[x] = v[x], a), {}) : v);   // 키 순서 무관 비교(서버가 재정렬한다)
  const get = async l => { const r = await fetch(url(l), { credentials: 'include', cache: 'no-store' });
    if (r.status !== 200) throw new Error(`GET ${r.status}`); return r.json(); };
  const want = cur => (typeof C.FIELDS === 'function' ? C.FIELDS(cur) : C.FIELDS);

  const run = async () => {
    log('RUN start DRY=' + C.DRY);
    const res = [];
    for (const l of C.LOCALES) {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const cur = await get(l);
          const fields = want(cur);
          if (Object.keys(fields).every(f => sj(cur[f]) === sj(fields[f]))) { res.push([l, 'SKIP 이미 목표값']); break; }
          const body = {};
          for (const [k, v] of Object.entries(cur)) if (!SYS.has(k)) body[k] = v;   // 콘텐츠 필드 전부(빠뜨리면 null)
          Object.assign(body, fields);
          if (C.PUBLISH) body.published = true;
          const keep = Object.keys(body).filter(k => !(k in fields) && k !== 'published');
          if (C.DRY) { res.push([l, 'DRY ok', 'keep=' + keep.join('|')]); break; }
          localStorage.setItem(K + '_backup_' + l, JSON.stringify(cur));
          const put = await fetch(url(l), { method: 'PUT', credentials: 'include',
            headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
          if (put.status !== 200) throw new Error('PUT ' + put.status);
          const a = await get(l);
          const wrote = Object.keys(fields).every(f => sj(a[f]) === sj(fields[f]));
          const kept = keep.every(k => sj(a[k]) === sj(cur[k]));
          const nulls = Object.entries(a).filter(([k, v]) => !SYS.has(k) && v === null).map(([k]) => k);
          res.push([l, wrote && kept && !nulls.length ? 'OK' : 'FAIL', `wrote=${wrote} kept=${kept}` + (nulls.length ? ' null=' + nulls : '')]);
          break;
        } catch (e) {
          log(`${l} 시도 ${attempt} 실패: ${e.message}`);
          if (attempt === 3) res.push([l, 'ERR ' + e.message]);
          else await new Promise(r => setTimeout(r, 5000));
        }
      }
    }
    localStorage.setItem(K + '_result', JSON.stringify({ at: new Date().toISOString(), res }));
    log('RUN end ' + JSON.stringify(res));
    document.title = `[${C.TAG} 완료] ` + res.map(r => r[0].slice(0, 2) + ':' + r[1].split(' ')[0]).join(' ');
  };

  // 긴 setTimeout 하나 대신 20초 간격으로 확인한다 — 백그라운드 탭 지연 · 누락에 강하다
  if (window['__' + K]) clearInterval(window['__' + K]);
  let fired = false;
  window['__' + K] = setInterval(async () => {
    const now = Date.now();
    if (!fired && now >= at) { fired = true; clearInterval(window['__' + K]); await run(); return; }
    if (Math.floor(now / 60000) % 5 === 0) {        // 5분마다 로그인 유지 겸 상태 기록
      try { const r = await fetch(url(C.LOCALES[0]), { credentials: 'include', cache: 'no-store' }); log('keepalive ' + r.status);
        if (r.status === 401) document.title = `[${C.TAG} ⚠️ 로그인 만료] ` + C.FIRE_AT; }
      catch (e) { log('keepalive ERR ' + e.message); }
    }
  }, 20000);
  localStorage.removeItem(K + '_result');
  localStorage.setItem(K + '_armed', JSON.stringify({ armedAt: new Date().toISOString(), ...C, FIELDS: typeof C.FIELDS === 'function' ? String(C.FIELDS) : C.FIELDS }));
  document.title = `[${C.TAG} 대기] ${C.FIRE_AT}`;
  log('ARMED fireAt=' + C.FIRE_AT + ' DRY=' + C.DRY);
  return `ARMED ${C.TAG} · ${C.FIRE_AT} (${Math.round((at - Date.now()) / 60000)}분 뒤) · DRY=${C.DRY}`;
})();
