/* XLT 감사 리포트 — 렌더링. 모든 수치는 data.js(AUDIT)에서 온다. */
'use strict';

const $ = (s) => document.querySelector(s);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const nl = (s) => esc(s).replace(/\n/g, '<span class="dim">\\n</span>');
const num = (n) => n.toLocaleString('ko-KR');
const SVC_SHORT = { 'Dapp Portal': 'DP', 'Unifi': 'UF', 'Kaia Wallet': 'KW' };
const LANGS = ['ko_KR', 'ja_JP', 'en_US', 'th_TH', 'zh_TW'];

/* ── 메타 ── */
const g = AUDIT.glossary;
$('#m-gloss').innerHTML = `v${g.version} · ${g.terms} terms · exceptions ${g.exceptions} · deprecated ${g.deprecated}`;

const totalKeys = AUDIT.services.reduce((a, s) => a + s.keys, 0);
const totalFP = Object.values(AUDIT.falsePositives).reduce((a, b) => a + b, 0);
const confirmed = AUDIT.keyNames.length + 1 /* 1-B */ + AUDIT.nbsp.length + 1 /* 조사 */ + 1 /* 빈값 */;

/* ── 요약 카드 ── */
[
  { n: num(totalKeys), l: '대조한 키', s: `서비스 3종 · 5개 언어`, c: 'c-ac' },
  { n: num(confirmed), l: '확정 위반', s: `키 이름 ${AUDIT.keyNames.length} · 컬럼 1 · nbsp ${AUDIT.nbsp.length} · 조사 1 · 빈 값 1`, c: 'c-p0' },
  { n: num(AUDIT.proposals.length), l: '구 표기 치환 제안', s: '치환문 생성 완료 · zh 8건 원어민 검토 필요', c: 'c-p1' },
  { n: '1', l: '교차 오염 신규 P0', s: 'ja 칸에 중국어 — 자동 검사를 통과했다', c: 'c-p0' },
  { n: num(AUDIT.untranslated.length), l: '번역 누락 후보', s: '사각지대 ② 보완 스캔 · 건별 판단 필요', c: 'c-p1' },
  { n: '9', l: '확인 필요', s: '정책·의도 판단 사안', c: 'c-p1' },
  { n: num(totalFP), l: '오탐', s: '판정 근거를 전건 명시했다', c: 'c-ok' },
].forEach((d) => {
  $('#summary-cards').append(el('div', `card ${d.c}`,
    `<div class="n">${d.n}</div><div class="l">${d.l}</div><div class="s">${d.s}</div>`));
});

/* ── 서비스 카드 ── */
AUDIT.services.forEach((s) => {
  const tot = s.p0 + s.p1 + s.p2 || 1;
  const pct = (v) => (v / tot * 100).toFixed(1) + '%';
  $('#svcgrid').append(el('div', 'svc', `
    <h4>${esc(s.name)} <span class="v">${esc(s.version)}</span></h4>
    <div class="keys">${num(s.keys)} <span>키</span></div>
    <div class="sevbar">
      <i class="b0" style="width:${pct(s.p0)}"></i>
      <i class="b1" style="width:${pct(s.p1)}"></i>
      <i class="b2" style="width:${pct(s.p2)}"></i>
    </div>
    <div class="sevlegend">
      <span><i class="d" style="background:var(--p0)"></i>P0 <b>${num(s.p0)}</b></span>
      <span><i class="d" style="background:var(--p1)"></i>P1 <b>${num(s.p1)}</b></span>
      <span><i class="d" style="background:var(--p2)"></i>P2 <b>${num(s.p2)}</b></span>
    </div>
    <div class="prop">구 표기 치환 제안 <b>${s.proposals}</b>건</div>`));
});

/* ── 키 이름 손상 ── */
const KEYNAME_NOTE = {
  '제어문자': '키 이름에 제어문자 U+0008(BACKSPACE)',
  '비ASCII': '앞에 nbsp(U+00A0)가 붙어 있다 — Unifi에는 정상 키가 같은 값으로 존재',
  "'?' 포함": "키 이름에 <code>?</code>",
};
const tk = $('#t-keyname');
tk.innerHTML = '<thead><tr><th>#</th><th>서비스</th><th>키 이름 (실제)</th><th>문제</th></tr></thead>';
const tkb = el('tbody');
AUDIT.keyNames.forEach((k, i) => {
  const primary = k.issues.find((x) => x !== '공백') || k.issues[0];
  tkb.append(el('tr', 'bad', `<td>${i + 1}</td><td>${esc(k.service)}</td>
    <td><code>${esc(k.key)}</code></td>
    <td>${KEYNAME_NOTE[primary] || k.issues.join(' · ')}</td>`));
});
tk.append(tkb);

/* ── nbsp 칩 + 서비스 필터 ── */
function renderChips(filter) {
  const box = $('#nbsp-list');
  box.innerHTML = '';
  AUDIT.nbsp.filter((n) => !filter || n.service === filter).forEach((n) => {
    box.append(el('span', 'chip',
      `${esc(n.key)}<span class="lg">${n.langs.map((l) => l.slice(0, 2)).join(',')}</span>`));
  });
}
function svcFilter(mountSel, onPick, counts) {
  const mount = $(mountSel);
  const opts = [null, ...AUDIT.services.map((s) => s.name)];
  opts.forEach((name, i) => {
    const c = counts ? (name ? counts[name] || 0 : Object.values(counts).reduce((a, b) => a + b, 0)) : null;
    const b = el('button', 'chipbtn' + (i === 0 ? ' on' : ''),
      (name || '전체') + (c != null ? ` ${c}` : ''));
    b.onclick = () => {
      mount.querySelectorAll('.chipbtn').forEach((x) => x.classList.remove('on'));
      b.classList.add('on');
      onPick(name);
    };
    mount.append(b);
  });
}
const nbspCounts = {};
AUDIT.nbsp.forEach((n) => { nbspCounts[n.service] = (nbspCounts[n.service] || 0) + 1; });
svcFilter('#nbsp-filter', renderChips, nbspCounts);
renderChips(null);

/* ── 구 표기: 규칙별 집계 카드 ── */
$('#dep-count').textContent = `${AUDIT.proposals.length}건`;
const byRule = new Map();
AUDIT.proposals.forEach((p) => {
  const m = p.rule.match(/'([^']+)'\s*→\s*'([^']+)'/);
  const key = p.lang + '|' + p.rule;
  if (!byRule.has(key)) {
    byRule.set(key, { lang: p.lang, from: m ? m[1] : '', to: m ? m[2] : '', n: 0, svcs: new Set() });
  }
  const r = byRule.get(key);
  r.n++; r.svcs.add(SVC_SHORT[p.service] || p.service);
});
[...byRule.values()].sort((a, b) => b.n - a.n).forEach((r) => {
  $('#rulegrid').append(el('div', 'rule', `
    <div class="rl"><span class="tag tag-lang">${r.lang}</span><span class="cnt">${r.n}</span></div>
    <div class="body"><span class="a">${esc(r.from)}</span> → <span class="b">${esc(r.to)}</span></div>
    <div class="svcs">${[...r.svcs].join(' · ')}</div>`));
});

/* ── 구 표기: 전체 표 (before/after 하이라이트) ── */
function highlight(text, from, to, cls) {
  if (!from) return nl(text);
  return nl(text).split(esc(from)).join(`<b class="${cls}">${esc(from === to ? from : (cls === 'del' ? from : to))}</b>`);
}
function renderDep(filter) {
  const tb = $('#t-dep tbody');
  tb.innerHTML = '';
  AUDIT.proposals.filter((p) => !filter || p.service === filter).forEach((p) => {
    const m = p.rule.match(/'([^']+)'\s*→\s*'([^']+)'/);
    const from = m ? m[1] : '', to = m ? m[2] : '';
    tb.append(el('tr', null, `
      <td>${SVC_SHORT[p.service]}</td>
      <td><span class="k">${esc(p.key)}</span></td>
      <td><span class="tag tag-lang">${p.lang}</span></td>
      <td><div>${highlight(p.before, from, from, 'del')}</div>
          <div>${highlight(p.after, to, to, 'ins')}</div></td>`));
  });
}
const depCounts = {};
AUDIT.proposals.forEach((p) => { depCounts[p.service] = (depCounts[p.service] || 0) + 1; });
svcFilter('#dep-filter', renderDep, depCounts);
renderDep(null);

/* ── 탐지 매트릭스 ── */
const M = {
  ko_KR: { ja: 'ok', en: 'partial', th: 'ok', zh: 'ok' },
  ja_JP: { ko: 'ok', en: 'miss', th: 'ok', zh: 'miss' },
  en_US: { ko: 'ok', ja: 'ok', th: 'ok', zh: 'ok' },
  th_TH: { ko: 'ok', ja: 'ok', en: 'miss', zh: 'ok' },
  zh_TW: { ko: 'ok', ja: 'ok', en: 'miss', th: 'ok' },
};
const MARK = { ok: '✅', partial: 'P1', miss: '❌', self: '—' };
const COLS = ['ko', 'ja', 'en', 'th', 'zh'];
const tm = $('#t-matrix');
tm.innerHTML = `<thead><tr><th></th>${COLS.map((c) => `<th>${c}</th>`).join('')}</tr></thead>`;
const tmb = el('tbody');
LANGS.forEach((row) => {
  const tr = el('tr');
  tr.append(el('th', null, row));
  COLS.forEach((c) => {
    const state = row.slice(0, 2) === c ? 'self' : M[row][c];
    const td = el('td');
    td.append(el('div', `cell ${state}`, MARK[state]));
    tr.append(td);
  });
  tmb.append(tr);
});
tm.append(tmb);

/* ── 사각지대 ── */
[
  {
    n: '①', t: 'ja ↔ zh 한자 상호 오염',
    cause: '두 언어가 한자를 공유해 <code>cjk</code>를 서로 정상으로 본다 — 필연적 한계',
    result: '<b>가나가 없는 일본어</b>가 zh 칸에, <b>중국어</b>가 ja 칸에 들어가도 미탐지',
    fix: '<code>ja_JP == zh_TW</code> 동일 셀 + CJK 5자 이상. 중국어 어휘 <code>獎勵</code>·<code>發放</code>·<code>您</code>가 ja 칸에 있으면 오염',
  },
  {
    n: '②', t: '영어가 ko/ja/th/zh 칸에',
    cause: '라틴·숫자·기호는 브랜드(<code>Unifi</code>)·심볼(<code>USDT</code>)·치환자(<code>{{0}}</code>) 때문에 <b>모든 칸에서 허용</b>',
    result: '미번역 영어가 그대로 남아도 미탐지',
    fix: '<b>일부 언어만</b> 고유 문자가 없는 행을 찾는다. 4개 언어 전부 라틴이면 의도된 UI 라벨이므로 제외',
  },
  {
    n: '③', t: 'ko 칸의 부분 영어',
    cause: '②의 특례가 "한글 없이 라틴만"일 때만 발동',
    result: '한글과 영어가 섞이면 미탐지',
    fix: '<code>나 (Me)</code>처럼 정상인 경우와 구분 불가 — 수동 판단',
  },
].forEach((b) => {
  $('#blindspots').append(el('div', 'bs', `
    <div class="num">사각지대 ${b.n}</div><h4>${b.t}</h4>
    <dl><dt>원인</dt><dd>${b.cause}</dd>
        <dt>결과</dt><dd>${b.result}</dd>
        <dt>보완 방법</dt><dd>${b.fix}</dd></dl>`));
});

/* ── ja==zh 표 ── */
const JAZH_VERDICT = {
  'UF_promotion3_detail_caution_desc3': ['bad', '🔴 <b>실제 오염</b> — ja 칸에 번체 중국어'],
  'UF_simulation_select_price_interest_present': ['', '우연 일치 — 두 언어에서 같은 표기'],
  'payment_bridge_jp_tos_subtitle': ['', 'JP 전용 법정 고지 (확인 필요 #1)'],
  'payment_bridge_jp_tos_title': ['', 'JP 전용 법정 고지 (확인 필요 #1)'],
};
const jz = $('#t-jazh tbody');
AUDIT.jazh.forEach((x) => {
  const v = JAZH_VERDICT[x.key] || ['', '검토'];
  jz.append(el('tr', v[0], `<td>${SVC_SHORT[x.service]}</td><td><span class="k">${esc(x.key)}</span></td>
    <td>${x.cjk}</td><td>${nl(x.value)}</td><td>${v[1]}</td>`));
});

/* ── 번역 누락: 언어별 막대 ── */
$('#unt-count').textContent = `${AUDIT.untranslated.length}건`;
const SEG = { ko_KR: 'seg-ko', ja_JP: 'seg-ja', th_TH: 'seg-th', zh_TW: 'seg-zh' };
const perSvc = {};
AUDIT.untranslated.forEach((u) => {
  const s = (perSvc[u.service] ||= { keys: 0, langs: {} });
  s.keys++;
  u.missing.forEach((l) => { s.langs[l] = (s.langs[l] || 0) + 1; });
});
const maxTot = Math.max(...Object.values(perSvc).map((s) => Object.values(s.langs).reduce((a, b) => a + b, 0)));
Object.entries(perSvc).forEach(([name, s]) => {
  const segs = Object.keys(SEG).filter((l) => s.langs[l]).map((l) => {
    const w = s.langs[l] / maxTot * 100;
    return `<span class="bseg ${SEG[l]}" style="width:${w}%" title="${l} ${s.langs[l]}">${s.langs[l]}</span>`;
  }).join('');
  $('#unt-bars').append(el('div', 'bar',
    `<span class="bl">${esc(name)}</span><span class="btrack">${segs}</span><span class="bn">${s.keys}키</span>`));
});
$('#unt-bars').append(el('div', 'barlegend', Object.keys(SEG).map((l) => {
  const t = Object.values(perSvc).reduce((a, s) => a + (s.langs[l] || 0), 0);
  return `<span><i class="sw ${SEG[l]}"></i>${l} ${t}</span>`;
}).join('')));

/* ── 번역 누락: 전체 표 ── */
function renderUnt(filter) {
  const tb = $('#t-unt tbody');
  tb.innerHTML = '';
  AUDIT.untranslated.filter((u) => !filter || u.service === filter).forEach((u) => {
    const vals = u.missing.map((l) => `<div><span class="tag tag-lang">${l}</span> ${nl(u.vals[l])}</div>`).join('');
    tb.append(el('tr', null, `<td>${SVC_SHORT[u.service]}</td><td><span class="k">${esc(u.key)}</span></td>
      <td>${u.missing.map((l) => l.slice(0, 2)).join(', ')}</td><td>${vals}</td>`));
  });
}
const untCounts = {};
AUDIT.untranslated.forEach((u) => { untCounts[u.service] = (untCounts[u.service] || 0) + 1; });
svcFilter('#unt-filter', renderUnt, untCounts);
renderUnt(null);

/* ── 한국어 원문 오류 ── */
$('#ko-count').textContent = `${AUDIT.korean.length}건`;
const kb = $('#t-ko tbody');
AUDIT.korean.forEach((k) => {
  kb.append(el('tr', null, `<td>${SVC_SHORT[k.service]}</td><td>${esc(k.type)}</td>
    <td><span class="k">${esc(k.key)}</span></td><td>${nl(k.detail)}</td>`));
});

/* ── 오탐 카드 ── */
const FP_ORDER = ['용어 불일치', '마침표 스타일', '언어 의심', '언어혼입(언어 선택 라벨)', '언어혼입(・ 구분자)'];
FP_ORDER.filter((k) => AUDIT.falsePositives[k]).forEach((k) => {
  $('#fpgrid').append(el('div', 'fp', `<div class="n">${num(AUDIT.falsePositives[k])}</div><div class="l">${esc(k)}</div>`));
});

/* ── 벤 다이어그램 ── */
const D = AUDIT.divergence;
$('#venn').innerHTML = `<svg viewBox="0 0 340 190" role="img" aria-label="서비스 간 키 교집합">
  <circle cx="128" cy="95" r="82" fill="var(--accent)" opacity=".14" stroke="var(--accent)" stroke-opacity=".45"/>
  <circle cx="212" cy="95" r="72" fill="var(--p1)" opacity=".14" stroke="var(--p1)" stroke-opacity=".45"/>
  <text x="62" y="42" font-size="11" font-weight="700" fill="var(--ink-2)">Unifi</text>
  <text x="62" y="58" font-size="15" font-weight="700" fill="var(--ink)">${num(D.unifi)}</text>
  <text x="258" y="42" font-size="11" font-weight="700" fill="var(--ink-2)">Dapp Portal</text>
  <text x="258" y="58" font-size="15" font-weight="700" fill="var(--ink)">${num(D.dapp)}</text>
  <text x="170" y="88" font-size="10" font-weight="700" text-anchor="middle" fill="var(--ink-2)">공통</text>
  <text x="170" y="107" font-size="19" font-weight="700" text-anchor="middle" fill="var(--ink)">${D.common}</text>
  <text x="170" y="124" font-size="10.5" font-weight="700" text-anchor="middle" fill="var(--p0)">값 상이 ${D.diff}</text>
</svg>`;
$('.venntext p').insertAdjacentHTML('beforeend',
  ` 공통 <strong>${D.common}키</strong> 중 <strong>${D.diff}키(${Math.round(D.diff / D.common * 100)}%)</strong>가 값이 다릅니다.`);
const maxPre = D.prefixes[0][1];
D.prefixes.forEach(([p, n]) => {
  $('#prefixbars').append(el('div', 'pb',
    `<span class="pbl">${esc(p)}_</span><span class="pbt"><span class="pbf" style="width:${n / maxPre * 100}%"></span></span><span class="pbn">${n}</span>`));
});
const dv = $('#t-div tbody');
D.samples.forEach((s) => {
  dv.append(el('tr', null, `<td><span class="k">${esc(s.key)}</span></td><td>${nl(s.unifi)}</td><td>${nl(s.dapp)}</td>`));
});

/* ── 스크롤 스파이 ── */
const links = [...document.querySelectorAll('.navinner a')];
const secs = links.map((a) => document.querySelector(a.hash)).filter(Boolean);
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    links.forEach((a) => a.classList.toggle('active', a.hash === '#' + e.target.id));
  });
}, { rootMargin: '-56px 0px -70% 0px' });
secs.forEach((s) => spy.observe(s));
