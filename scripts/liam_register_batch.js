/* ============================================================================
 * LIAM Event Message 일괄 등록 — 관리자 앱 콘솔 전용 (md/OA.md 「LIAM HUB 등록」 정본)
 *
 * 왜 — LIAM 관리자 앱(313-dapp-portal-admin)은 앱 브라우저에서 「사이트 수준 권한」이 막혀
 *      동작 하나마다 사용자 허용을 받아야 한다. 건별로 클릭하면 허용 창이 수십 번 뜬다.
 *      이 스크립트를 javascript_tool 한 번으로 실행하면 허용 1회로 N건을 등록한다(2026-11-06 실측 16건).
 *
 * 전제
 *   - 탭이 관리자 앱의 Event Messages 목록(/oam/messages) 또는 New 화면에 있어야 한다.
 *     prod: https://313-dapp-portal-admin.hub.linecorp.com/ 루트 → 「Event Messages」 클릭
 *     beta: 먼저 https://liam-hub.hub-beta.linecorp.com/service-view/313?menuId=23160&roleId=6970 을 열어
 *           세션을 만든 뒤 https://313-dapp-portal-admin.hub-beta.linecorp.com/ 루트 → 클릭
 *           (바로 루트를 열면 403 Access Denied · 딥링크 /oam/messages/create 는 Policy Error)
 *   - 목록 화면의 OA Channel이 CONFIG.channel 과 같아야 한다(beta 2010418473 · prod 2006670905).
 *   - ⛔ 등록(CREATE)은 사용자 확인을 받은 뒤에만 실행한다(md/OA.md).
 *
 * 안전장치 — 건마다 아래가 모두 맞을 때만 CREATE 하고, 하나라도 어긋나면 그 자리에서 멈춘다
 *   ① 채널 ID = CONFIG.channel  ② 제목 · postId 입력값 일치  ③ 언어 탭 = CONFIG.tabs 개
 *   ④ FLEX JSON에 CONFIG.envMarker(환경별 LIFF ID 등) 포함 — beta/prod postId 혼동 방지
 *   입력 직후 1초 대기 + LOAD 미응답 시 1회 재시도(React 상태 반영 지연 · beta 실측)
 * ========================================================================== */

const CONFIG = {
  channel: '2006670905',            // prod Dapp Portal / beta Unifi Beta OA = '2010418473'
  envMarker: '2008994549-CGfrtgSs', // prod LIFF / beta = '2008994547-GfGUdDxy' (FLEX에 들어 있어야 할 문자열)
  tabs: 5,                          // 언어 탭 수(EN · JA · TH · KO · ZH)
  items: [
    // [Title(= Landpress title 그대로), Landpress postId]
    // ['[여행 일정 등록 이벤트] ④-1 추천 상품권 캐러셀 (성형·피부시술)', '2160'],
  ],
};

(async () => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const btn = t => [...document.querySelectorAll('button')].find(b => b.innerText.trim().toUpperCase() === t.toUpperCase());
  const setVal = (el, v) => {  // React 제어 입력 — 네이티브 setter + input 이벤트
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  };
  const waitFor = async (fn, ms = 8000) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { const r = fn(); if (r) return r; await sleep(200); } return null; };
  const tabCount = () => document.querySelectorAll('[role=tab]').length;

  if (!/313-dapp-portal-admin\.hub(-beta)?\.linecorp\.com/.test(location.host)) return `❌ 관리자 앱 탭이 아닙니다: ${location.host}`;
  if (!CONFIG.items.length) return '❌ CONFIG.items 가 비어 있습니다.';

  const log = [];
  for (const [title, pid] of CONFIG.items) {
    if (!location.pathname.endsWith('/create')) {
      const nb = await waitFor(() => btn('New Event Message'));
      if (!nb) { log.push(`${pid} ❌ New 버튼 없음`); break; }
      nb.click();
      await waitFor(() => location.pathname.endsWith('/create') && document.querySelectorAll('input').length >= 4);
      await sleep(500);
    }
    const ins = document.querySelectorAll('input');   // [0] Title · [1] Channel · [2] Type · [3] Landpress Post Id
    if (ins[1].value !== CONFIG.channel) { log.push(`${pid} ❌ 채널 ${ins[1].value} ≠ ${CONFIG.channel}`); break; }
    setVal(ins[0], title); setVal(ins[3], pid);
    await sleep(1000);
    btn('Load Message').click();
    if (!await waitFor(() => tabCount() === CONFIG.tabs, 5000)) {
      btn('Load Message').click();
      await waitFor(() => tabCount() === CONFIG.tabs, 8000);
    }
    const vals = [...document.querySelectorAll('input')].map(i => i.value);
    const flexOk = [...document.querySelectorAll('input,textarea')].some(i => i.value.startsWith('{') && i.value.includes(CONFIG.envMarker));
    if (tabCount() !== CONFIG.tabs || vals[0] !== title || vals[3] !== pid || !flexOk) {
      log.push(`${pid} ❌ 검증 실패 tabs=${tabCount()} title=${vals[0] === title} pid=${vals[3]} env=${flexOk} — CREATE 하지 않음`);
      break;
    }
    btn('CREATE').click();
    if (!await waitFor(() => !location.pathname.endsWith('/create'), 10000)) { log.push(`${pid} ❌ CREATE 후 목록 복귀 안 됨`); break; }
    log.push(`${pid} OK`);
    await sleep(800);
  }

  await sleep(1500);
  const titles = new Set(CONFIG.items.map(i => i[0]));
  const rows = [...document.querySelectorAll('tr')]
    .map(r => [...r.querySelectorAll('td')].map(td => td.innerText.replace(/\s+/g, ' ').trim()))
    .filter(c => c.length && titles.has(c[1]))
    .map(c => ({ messageId: c[0], title: c[1], langs: c[3], active: c[4], created: c[5] }));
  return { 대상: CONFIG.items.length, 로그: log, 등록확인: rows };
})();
