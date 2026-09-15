/* ============================================================================
 * LPC 안전 쓰기 템플릿 — Landpress CMS 콘솔 전용  (md/landpress.md §10-3-0 정본)
 *
 * ⛔ LPC에 쓸 때는 반드시 이 템플릿을 쓴다. 직접 PUT하지 않는다.
 *
 * 왜 — Landpress PUT은 부분 갱신이 아니라 **문서 전체 교체**다. body에 넣지 않은
 * 콘텐츠 필드는 그 자리에서 null이 된다. 2026-09-14 `uid`만 담은 PUT과 단일 필드
 * PUT이 4필드를 beta·prod 양쪽에서 지웠고, CMS에 리비전 이력이 없어 저장소
 * landpress/ 산출물이 유일한 복구원이었다.
 *
 * 안전장치 3중
 *   ① read-modify-write — 현재 문서를 읽어 **콘텐츠 필드를 전부 실어** 보낸다
 *   ② 덮어쓰기 가드     — 값이 이미 있는 필드는 OVERWRITE=false면 건너뛴다
 *   ③ 건별 재조회 대조   — 쓴 필드가 실제로 저장됐는지, 건드리지 않은 필드가
 *                        보존됐는지 각각 확인한다(둘 중 하나라도 틀리면 실패로 센다)
 *
 * 사용법
 *   1. https://landpress-content-v2.linecorp.com 탭을 열고 로그인한다(어느 페이지든 됨)
 *   2. DevTools 콘솔 → 붙여넣기 차단 경고가 뜨면 `붙여넣기 허용` 타이핑 후 Enter
 *   3. 아래 CONFIG를 채우고 전체를 붙여넣어 실행한다
 *   4. 결과 JSON의 `실패: 0` 을 확인한다
 *   5. 터미널에서 `python3 scripts/check_lpc_nulls.py` → exit 0 확인 (필수)
 *
 * ⚠️ uid는 시스템 필드라 body에 넣지 않아도 보존된다. 그러나 uid를 **바꾸려는**
 *    경우에도 콘텐츠 필드를 전부 함께 실어야 한다 — 이번 사고의 직접 원인이다.
 * ========================================================================== */

const CONFIG = {
  // 쓸 대상. postId는 환경마다 배치가 다르므로 uid로 확인하고 넣는다(§10-3 8번).
  // fields 에는 **바꿀 필드만** 넣는다 — 나머지 콘텐츠 필드는 스크립트가 보존한다.
  writes: [
    // 예시 ─ 지우고 실제 값으로 바꿀 것
    // { pid: 'w5eph4y9qxe05c8fqpi7rlxh', col: 'shopping_guide', postId: 1,
    //   locale: 'ko_KR', label: 'LV prod / CU',
    //   fields: { guide_page: { /* … */ } } },
  ],
  OVERWRITE: true,   // false면 이미 값이 있는 필드는 건너뛴다(복구 작업용)
  PUBLISH: true,     // 다건 컬렉션은 true. ⛔ 단건(SINGLE) 컬렉션은 false — §10-4
};

(async () => {
  if (location.origin !== 'https://landpress-content-v2.linecorp.com')
    return `❌ 이 탭에서 실행하면 안 됩니다. 현재: ${location.origin}`;
  if (!CONFIG.writes.length) return '❌ CONFIG.writes 가 비어 있습니다.';

  const SYS = new Set(['id','postId','locale','primaryLocale','published','createdAt','updatedAt',
                       'uid','_env','createdBy','updatedBy','_publishReservations','lp_env','lp_size']);
  let ok = 0, skip = 0;
  const fail = [];

  for (const w of CONFIG.writes) {
    const tag = `${w.label || w.col}/${w.locale}`;
    const url = `/api/v1/projects/${w.pid}/collections/${w.col}/items/${w.postId}?locale=${w.locale}`;

    // ① 현재 문서를 읽는다
    const res = await fetch(url, { credentials: 'include' });
    if (res.status !== 200) { fail.push(`${tag} GET ${res.status}`); continue; }
    const cur = await res.json();

    // ② 덮어쓰기 가드
    const target = Object.keys(w.fields);
    if (!CONFIG.OVERWRITE && target.every(f => cur[f] !== null && cur[f] !== undefined)) { skip++; continue; }

    // ③ 콘텐츠 필드를 전부 실어 보낸다 (핵심 — 빠뜨리면 null 이 된다)
    const body = {};
    for (const [k, v] of Object.entries(cur)) if (!SYS.has(k)) body[k] = v;   // 기존 전부 보존
    Object.assign(body, w.fields);                                            // 바꿀 것만 덮어씀
    if (CONFIG.PUBLISH) body.published = true;
    const preserved = Object.keys(body).filter(k => !target.includes(k) && k !== 'published');

    const put = await fetch(url, {
      method: 'PUT', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (put.status !== 200) { fail.push(`${tag} PUT ${put.status}`); continue; }

    // ④ 재조회 대조 — 쓴 필드 + 보존 필드를 각각 확인
    const after = await (await fetch(url, { credentials: 'include' })).json();
    const wrote = target.every(f => JSON.stringify(after[f]) === JSON.stringify(w.fields[f]));
    const kept  = preserved.every(f => JSON.stringify(after[f]) === JSON.stringify(body[f]));
    const nulls = Object.entries(after).filter(([k, v]) => !SYS.has(k) && v === null).map(([k]) => k);

    if (wrote && kept && !nulls.length) ok++;
    else fail.push(`${tag} 대조실패 wrote=${wrote} kept=${kept}` + (nulls.length ? ` null=${nulls}` : ''));
  }

  return {
    대상: CONFIG.writes.length, 성공: ok, 건너뜀: skip, 실패: fail.length, 실패목록: fail,
    다음: '터미널에서 python3 scripts/check_lpc_nulls.py 실행 → exit 0 확인(필수)',
  };
})();
