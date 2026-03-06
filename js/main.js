/* ── MOBILE DRAWER ── */
function toggleDrawer() {
  document.getElementById('navDrawer').classList.toggle('open');
}

/* ── SCROLL REVEAL ── */
const revObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('up'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.r').forEach(el => revObs.observe(el));

/* ── COUNTERS ── */
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
function countUp(el, target, suffix, dur) {
  dur = dur || 1600;
  var start = null;
  function tick(ts) {
    if (!start) start = ts;
    var p = Math.min((ts - start) / dur, 1);
    el.textContent = Math.floor(easeOut(p) * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
var cntObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      countUp(e.target, +e.target.dataset.target, e.target.dataset.suffix);
      cntObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(function(el) { cntObs.observe(el); });