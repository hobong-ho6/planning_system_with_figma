(function () {
  var D = window.POLICY_DATA;
  var WIKI = 'https://wiki.workers-hub.com/pages/viewpage.action?pageId=';
  var STATUSES = ['최신', '변경됨', '확인 필요', '예정', '폐기'];
  var state = { q: '', area: '', status: '', svc: '' };

  var params = new URLSearchParams(location.search);
  state.area = params.get('area') || '';
  state.q = params.get('q') || '';

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function areaLabel(key) {
    for (var i = 0; i < D.areas.length; i++) if (D.areas[i].key === key) return D.areas[i].label;
    return key;
  }
  function wikiLink(p) {
    if (!p || !p.pageId) return '';
    return '<a href="' + WIKI + esc(p.pageId) + '" target="_blank" rel="noopener">' + esc(p.title || p.pageId) +
      '</a> <span class="tag">v' + esc(p.version) + '</span>' + (p.section ? ' · ' + esc(p.section) : '');
  }
  function haystack(p) {
    return [p.title, p.summary, (p.details || []).join(' '), (p.keywords || []).join(' '), p.release,
      p.source && p.source.title, p.source && p.source.pageId, areaLabel(p.area), p.status].join(' ').toLowerCase();
  }
  function matches(p, skip) {
    if (skip !== 'area' && state.area && p.area !== state.area) return false;
    if (skip !== 'status' && state.status && p.status !== state.status) return false;
    if (state.svc && p.service !== state.svc) return false;
    if (state.q) {
      var h = haystack(p), words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
      for (var i = 0; i < words.length; i++) if (h.indexOf(words[i]) < 0) return false;
    }
    return true;
  }

  function renderMeta() {
    var m = D.meta;
    $('meta').innerHTML =
      '<span>기준 배포: ' + esc(m.baseline) + '</span>' +
      '<span>최종 확인: ' + esc(m.checkedAt) + '</span>' +
      '<span>정책 ' + D.policies.length + '건 · 영역 ' + D.areas.length + '개</span>';
  }

  function renderChips() {
    var html = '<button class="chip' + (state.area ? '' : ' is-on') + '" data-area="">전체<span class="n">' +
      D.policies.filter(function (p) { return matches(p, 'area'); }).length + '</span></button>';
    D.areas.forEach(function (a) {
      var n = D.policies.filter(function (p) { return p.area === a.key && matches(p, 'area'); }).length;
      html += '<button class="chip' + (state.area === a.key ? ' is-on' : '') + '" data-area="' + a.key + '" title="' + esc(a.desc) + '">' +
        esc(a.label) + '<span class="n">' + n + '</span></button>';
    });
    $('areaChips').innerHTML = html;

    var sh = '<button class="chip' + (state.status ? '' : ' is-on') + '" data-status="">상태 전체</button>';
    STATUSES.forEach(function (s) {
      var n = D.policies.filter(function (p) { return p.status === s && matches(p, 'status'); }).length;
      sh += '<button class="chip' + (state.status === s ? ' is-on' : '') + '" data-status="' + s + '">' + s + '<span class="n">' + n + '</span></button>';
    });
    $('statusChips').innerHTML = sh;
  }

  function card(p) {
    var facts = '<dt>정본</dt><dd>' + wikiLink(p.source) + '</dd>';
    if (p.release) facts += '<dt>적용 버전</dt><dd>' + esc(p.release) + releaseDate(p.release) + '</dd>';
    facts += '<dt>확인</dt><dd>' + esc(p.checkedAt || D.meta.checkedAt) + ' · 위키 v' + esc(p.source && p.source.version) + ' 기준</dd>';

    var more = '';
    if (p.details && p.details.length) more += '<ul>' + p.details.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>';
    if (p.changes && p.changes.length) more += '<p><b>변경 이력</b></p><ul>' + p.changes.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>';
    if (p.related && p.related.length) more += '<p><b>관련 위키</b></p><ul>' + p.related.map(function (r) { return '<li>' + wikiLink(r) + '</li>'; }).join('') + '</ul>';

    var conf = '';
    if (p.conflicts && p.conflicts.length) {
      conf = '<div class="conf"><b>확인 필요 — 근거가 다르거나 아직 정해지지 않았습니다</b><ul>' + p.conflicts.map(function (c) {
        return '<li>' + wikiLink(c) + (c.says ? ': ' + esc(c.says) : '') + '</li>';
      }).join('') + '</ul></div>';
    }

    return '<article class="card' + (p.status === '폐기' ? ' is-dead' : '') + '" id="p-' + esc(p.id) + '">' +
      '<div class="card-h"><span class="badge b-' + p.status.replace(/\s/g, '') + '">' + esc(p.status) + '</span>' +
      '<h3>' + esc(p.title) + '</h3>' +
      '<span class="tag">' + esc(p.service) + '</span>' + (p.fe ? '<span class="tag">' + esc(p.fe) + '</span>' : '') + '</div>' +
      '<p class="summary">' + esc(p.summary) + '</p>' + conf +
      '<dl class="facts">' + facts + '</dl>' +
      (more ? '<details><summary>자세히</summary>' + more + '</details>' : '') +
      '</article>';
  }

  var relDates = {};
  D.releases.forEach(function (r) { relDates[r.v] = r.date; });
  function releaseDate(v) { return relDates[v] ? ' (' + relDates[v] + ' 배포)' : ''; }

  function renderList() {
    var items = D.policies.filter(function (p) { return matches(p); });
    $('count').textContent = items.length + '건' + (state.q ? ' · 「' + state.q + '」 검색' : '');
    if (!items.length) { $('list').innerHTML = '<p class="empty">조건에 맞는 정책이 없습니다.</p>'; return; }
    var html = '';
    D.areas.forEach(function (a) {
      var inArea = items.filter(function (p) { return p.area === a.key; });
      if (!inArea.length) return;
      inArea.sort(function (x, y) { return STATUSES.indexOf(x.status) - STATUSES.indexOf(y.status); });
      html += '<h2 class="area-h">' + esc(a.label) + ' <small>' + esc(a.desc) + '</small></h2>' + inArea.map(card).join('');
    });
    $('list').innerHTML = html;
  }

  function renderReleases() {
    $('relList').innerHTML = D.releases.map(function (r) {
      return '<div class="rel"><div class="rel-h"><b>' + esc(r.v) + '</b><span>' + esc(r.date) + (r.time ? ' ' + esc(r.time) : '') + '</span>' +
        '<span class="badge ' + (r.status === 'RELEASED' ? 'b-최신' : 'b-예정') + '">' + (r.status === 'RELEASED' ? '배포 완료' : '배포 전') + '</span>' +
        (r.note ? '<a href="' + WIKI + esc(r.note) + '" target="_blank" rel="noopener">릴리즈 노트</a>' : '') + '</div><ul>' +
        r.tasks.map(function (t) {
          return '<li>' + esc(t[1]) + (t[2] ? ' — <a href="' + WIKI + esc(t[2]) + '" target="_blank" rel="noopener">기획서</a>' : '') + '</li>';
        }).join('') + '</ul></div>';
    }).join('');
  }

  function render() { renderChips(); renderList(); }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('.chip');
    if (!b) return;
    if (b.hasAttribute('data-area')) state.area = b.getAttribute('data-area');
    if (b.hasAttribute('data-status')) state.status = b.getAttribute('data-status');
    render();
  });
  $('q').value = state.q;
  $('q').addEventListener('input', function () { state.q = this.value.trim(); render(); });
  $('svc').addEventListener('change', function () { state.svc = this.value; render(); });

  renderMeta();
  render();
  renderReleases();
  if (location.hash && document.querySelector(location.hash)) document.querySelector(location.hash).scrollIntoView();
})();
