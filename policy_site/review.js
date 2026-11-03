(function () {
  var D = window.POLICY_DATA;
  var WIKI = 'https://wiki.workers-hub.com/pages/viewpage.action?pageId=';
  var KINDS = [
    ['상충', '근거 문서끼리 내용이 다르다'],
    ['미정', '아직 정해지지 않았다'],
    ['정본 없음', '근거가 될 정책 문서가 없거나 열리지 않는다'],
    ['문서 불일치', '결정은 났지만 다른 문서에 낡은 서술이 남아 있다'],
    ['세부 미결', '카드는 확정이지만 세부 사항 하나가 남아 있다']
  ];
  var kind = '';

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
    return '<a href="' + WIKI + esc(p.pageId) + '" target="_blank" rel="noopener">' + esc(p.title || p.pageId) +
      '</a> <span class="tag">v' + esc(p.version) + '</span>' + (p.section ? ' · ' + esc(p.section) : '');
  }

  var items = D.policies.filter(function (p) { return p.review; });

  function renderChips() {
    var html = '<button class="chip' + (kind ? '' : ' is-on') + '" data-kind="">전체<span class="n">' + items.length + '</span></button>';
    KINDS.forEach(function (k) {
      var n = items.filter(function (p) { return p.review.kind === k[0]; }).length;
      if (n) html += '<button class="chip' + (kind === k[0] ? ' is-on' : '') + '" data-kind="' + k[0] + '" title="' + esc(k[1]) + '">' + k[0] + '<span class="n">' + n + '</span></button>';
    });
    $('kindChips').innerHTML = html;
  }

  function card(p) {
    var src = [p.source].concat(p.conflicts || []);
    return '<article class="card">' +
      '<div class="card-h"><span class="badge b-' + p.status.replace(/\s/g, '') + '">' + esc(p.status) + '</span>' +
      '<h3>' + esc(p.review.question) + '</h3></div>' +
      '<dl class="facts">' +
      '<dt>정책</dt><dd><a href="./#p-' + esc(p.id) + '">' + esc(p.title) + '</a> · ' + esc(areaLabel(p.area)) + ' · ' + esc(p.service) + (p.fe ? ' · ' + esc(p.fe) : '') + '</dd>' +
      '<dt>현재 요약</dt><dd>' + esc(p.summary) + '</dd>' +
      (p.release ? '<dt>적용 버전</dt><dd>' + esc(p.release) + '</dd>' : '') +
      '</dl>' +
      '<div class="conf"><b>근거</b><ul>' + src.map(function (c) {
        return '<li>' + wikiLink(c) + (c.says ? ': ' + esc(c.says) : '') + '</li>';
      }).join('') + '</ul></div>' +
      '</article>';
  }

  function renderList() {
    var html = '';
    KINDS.forEach(function (k) {
      if (kind && kind !== k[0]) return;
      var inKind = items.filter(function (p) { return p.review.kind === k[0]; });
      if (!inKind.length) return;
      html += '<h2 class="area-h">' + k[0] + ' <small>' + k[1] + '</small></h2>' + inKind.map(card).join('');
    });
    $('list').innerHTML = html || '<p class="empty">리뷰할 항목이 없습니다.</p>';
  }

  $('meta').innerHTML = '<span>리뷰 항목 ' + items.length + '건</span><span>최종 확인: ' + esc(D.meta.checkedAt) + '</span>';
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.chip');
    if (!b) return;
    kind = b.getAttribute('data-kind');
    renderChips();
    renderList();
  });
  renderChips();
  renderList();
})();
