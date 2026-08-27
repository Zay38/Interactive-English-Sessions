/* ============================================================
   Tap feedback — every tappable thing on the site reacts.

   Kids click a LOT during a lesson, often on a shared Zoom screen
   where the cursor is hard to follow. Giving each press a squash and
   a ripple at the exact touch point answers two questions at once:
   "did that register?" and "where did I just tap?".

   Attached once at the document level rather than per element, so
   anything rendered later (quiz choices, chat replies, map pins) is
   covered without re-wiring. The ripple is appended to a fixed
   overlay instead of inside the target, so it never needs
   overflow:hidden and can't disturb any layout.
   ============================================================ */

(function () {
  const TAPPABLE = [
    '.btn', '.choice-btn', '.reply-btn', '.pose-btn', '.jp-cell',
    '.unit-card', '.checkin-btn', '.word-tile', '.swatch', '.flashcard',
    '.mystery-box', '.intro-chip', '.icon-btn', '.speaker-btn',
    '.view-toggle button', '.jp-mini-link', '.wm-pin', '.dot',
  ].join(',');

  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let layer = null;
  function getLayer() {
    if (!layer) {
      layer = document.createElement('div');
      layer.className = 'tap-layer';
      document.body.appendChild(layer);
    }
    return layer;
  }

  function ripple(x, y, target) {
    if (reduce) return;
    const r = document.createElement('span');
    r.className = 'tap-ripple';
    // Scale the ripple to the thing being tapped so a small chip gets a
    // small burst and a whole unit card gets a big one.
    const box = target.getBoundingClientRect();
    const size = Math.max(38, Math.min(160, Math.max(box.width, box.height) * 0.9));
    r.style.width = r.style.height = `${size}px`;
    r.style.left = `${x}px`;
    r.style.top = `${y}px`;
    getLayer().appendChild(r);
    r.addEventListener('animationend', () => r.remove(), { once: true });
    // belt and braces: if the animation never fires, don't leak nodes
    setTimeout(() => r.remove(), 900);
  }

  function press(el, on) {
    if (!el) return;
    el.classList.toggle('is-pressed', on);
  }

  let pressed = null;

  document.addEventListener('pointerdown', (e) => {
    const t = e.target.closest ? e.target.closest(TAPPABLE) : null;
    if (!t) return;
    if (t.disabled || t.classList.contains('used')) return;
    pressed = t;
    press(t, true);
    ripple(e.clientX, e.clientY, t);
  }, { passive: true });

  ['pointerup', 'pointercancel', 'pointerleave'].forEach(evt => {
    document.addEventListener(evt, () => {
      if (pressed) { press(pressed, false); pressed = null; }
    }, { passive: true });
  });

  // A keyboard activation should feel like a tap too.
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const t = document.activeElement;
    if (!t || !t.closest || !t.closest(TAPPABLE)) return;
    const el = t.closest(TAPPABLE);
    press(el, true);
    const box = el.getBoundingClientRect();
    ripple(box.left + box.width / 2, box.top + box.height / 2, el);
    setTimeout(() => press(el, false), 160);
  });
})();
