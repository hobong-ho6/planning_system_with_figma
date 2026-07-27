// ===== 기획자 워크플로우 가이드 · interactions =====
(function () {
  var toggle = document.getElementById('navToggle');
  var mobile = document.getElementById('navLinksMobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () { mobile.classList.toggle('hidden'); });
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mobile.classList.add('hidden'); });
    });
  }

  var toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) toTop.classList.add('show');
      else toTop.classList.remove('show');
    });
    toTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll('#navLinks a'));
  function onScroll() {
    var pos = window.scrollY + 120, current = '';
    sections.forEach(function (s) { if (s.offsetTop <= pos) current = s.id; });
    navAnchors.forEach(function (a) {
      var active = a.getAttribute('href') === '#' + current;
      a.style.color = active ? '#4f46e5' : '';
      a.style.fontWeight = active ? '700' : '';
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
})();
