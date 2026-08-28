/* ============================================================
   WorldMap — the home page.

   The course is 16 units long, which is a lot of cards to scroll
   past. Laying them out as a journey across a world map turns that
   list into a route: you can see where you have been, where you are,
   and how far there is to go, at a glance.

   Pins are positioned from UNITS (units-manifest.js) and their state
   comes from Scoreboard.getProgress(), so the map has no progress
   data of its own to fall out of sync.
   ============================================================ */

const WorldMap = (() => {

  /* Deliberately loose, cartoon-shaped continents. This is a friendly
     backdrop for 8-12 year olds, not an atlas — recognisable silhouettes
     matter more than accurate coastlines. */
  const CONTINENTS = [
    { name: 'North America', d: 'M96,104 L128,78 L172,64 L214,62 L252,70 L288,86 L296,108 L276,122 L288,140 L268,152 L256,140 L244,156 L254,172 L240,188 L226,182 L216,200 L224,222 L210,240 L196,232 L194,208 L178,192 L164,172 L146,164 L130,144 L110,128 Z' },
    { name: 'South America', d: 'M236,272 L268,262 L292,272 L300,294 L292,316 L300,338 L288,362 L278,392 L268,420 L256,448 L244,468 L232,458 L230,432 L238,404 L232,378 L222,352 L216,326 L222,300 Z' },
    { name: 'Greenland', d: 'M330,52 L368,44 L392,60 L388,84 L366,100 L342,96 L326,78 Z' },
    { name: 'Eurasia', d: 'M438,104 L470,86 L512,80 L556,74 L610,70 L668,74 L726,82 L780,94 L828,106 L862,122 L856,142 L826,150 L792,150 L764,160 L736,174 L704,182 L672,178 L650,192 L626,200 L600,194 L578,182 L552,180 L526,186 L500,182 L474,176 L452,158 L438,132 Z' },
    { name: 'Africa', d: 'M470,212 L506,200 L548,202 L578,214 L590,236 L584,262 L570,282 L562,306 L556,332 L546,360 L532,386 L516,402 L502,394 L496,372 L490,346 L478,320 L466,296 L458,270 L458,238 Z' },
    { name: 'Australia', d: 'M790,392 L826,378 L866,380 L894,396 L900,418 L886,436 L856,446 L822,442 L798,428 L786,410 Z' },
    { name: 'Antarctica', d: 'M120,520 C300,498 700,498 900,520 C920,524 920,546 900,548 L120,548 C100,546 100,524 120,520 Z' },
  ];

  const VB = { w: 1000, h: 560 };
  const NS = 'http://www.w3.org/2000/svg';
  const el = (t, a = {}) => {
    const n = document.createElementNS(NS, t);
    Object.entries(a).forEach(([k, v]) => n.setAttribute(k, v));
    return n;
  };
  const px = u => (u.mapX / 100) * VB.w;
  const py = u => (u.mapY / 100) * VB.h;

  const reduceMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- camera ----------------
     Tapping a pin flies the map toward it rather than just popping a
     card up, so choosing a unit feels like travelling to the place.
     The SVG viewBox IS the camera: animating its four numbers pans and
     zooms in one go, and because it is vector the whole thing stays
     sharp at any zoom. */

  const FULL = [0, 0, VB.w, VB.h];
  const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  /* bias: where the target sits vertically in frame. The detail card
     occupies the bottom of the map, so parking the pin at ~1/3 height
     keeps it visible above the card instead of hidden behind it. */
  function frameFor(cx, cy, zoom, bias = 0.20) {
    const w = VB.w / zoom;
    const h = VB.h / zoom;
    // keep the camera inside the map so we never fly off into blank space
    const x = Math.max(0, Math.min(VB.w - w, cx - w / 2));
    const y = Math.max(0, Math.min(VB.h - h, cy - h * bias));
    return [x, y, w, h];
  }

  function flyTo(svg, to, ms, onDone) {
    const from = (svg.getAttribute('viewBox') || FULL.join(' ')).split(/[\s,]+/).map(Number);
    if (reduceMotion() || ms === 0) {
      svg.setAttribute('viewBox', to.join(' '));
      if (onDone) onDone();
      return;
    }
    // Cancel any flight already in progress, otherwise two tweens fight
    // over the same attribute and the camera jitters.
    if (svg._flight) cancelAnimationFrame(svg._flight);
    const t0 = performance.now();
    (function step(now) {
      const t = Math.min(1, (now - t0) / ms);
      const e = easeInOut(t);
      svg.setAttribute('viewBox', from.map((f, i) => f + (to[i] - f) * e).join(' '));
      if (t < 1) svg._flight = requestAnimationFrame(step);
      else { svg._flight = null; if (onDone) onDone(); }
    })(t0);
  }

  function render(mount) {
    const progress = Scoreboard.getProgress();
    const done = u => !!progress[u.id];
    // "Current" is the first unit not yet finished — where the student is now.
    const current = UNITS.find(u => !done(u)) || null;

    const svg = el('svg', {
      class: 'wm-svg', viewBox: `0 0 ${VB.w} ${VB.h}`,
      role: 'img', 'aria-label': 'World map of English units',
    });

    // ocean
    svg.appendChild(el('rect', { x: 0, y: 0, width: VB.w, height: VB.h, class: 'wm-ocean' }));

    const defs = el('defs');
    defs.innerHTML = `
      <filter id="wmShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#0b2a45" flood-opacity="0.22"/>
      </filter>`;
    svg.appendChild(defs);

    CONTINENTS.forEach(c => {
      svg.appendChild(el('path', { d: c.d, class: 'wm-land', filter: 'url(#wmShadow)' }));
    });

    // journey route, drawn under the pins
    const pts = UNITS.map(u => `${px(u)},${py(u)}`).join(' ');
    svg.appendChild(el('polyline', { points: pts, class: 'wm-route' }));
    // the travelled part of the route
    const travelled = UNITS.filter(done);
    if (travelled.length > 1) {
      svg.appendChild(el('polyline', {
        points: travelled.map(u => `${px(u)},${py(u)}`).join(' '),
        class: 'wm-route-done',
      }));
    }

    UNITS.forEach(u => {
      const g = el('g', {
        class: 'wm-pin'
          + (done(u) ? ' is-done' : '')
          + (current && current.n === u.n ? ' is-current' : ''),
        tabindex: '0', role: 'button',
        'aria-label': `Unit ${u.n}: ${u.titleEn}`,
        transform: `translate(${px(u)}, ${py(u)})`,
      });
      g.dataset.unit = u.id;

      if (current && current.n === u.n) g.appendChild(el('circle', { r: 30, class: 'wm-halo' }));
      g.appendChild(el('circle', { r: 19, class: `wm-dot wm-${u.tier}` }));

      const label = el('text', { class: 'wm-num', y: 6, 'text-anchor': 'middle' });
      label.textContent = done(u) ? '✓' : u.n;
      g.appendChild(label);

      const open = (e) => { e.stopPropagation(); zoomToUnit(u, done(u)); };
      g.addEventListener('click', open);
      g.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(e); }
      });
      svg.appendChild(g);
    });

    mount.innerHTML = '';
    mount.appendChild(svg);
    svg.setAttribute('viewBox', FULL.join(' '));

    /* ---- detail card ---- */
    const card = document.createElement('div');
    card.className = 'wm-card';
    card.id = 'wmCard';
    mount.appendChild(card);

    let zoomed = null;   // the unit we are currently flown in on

    /* Step 1 of the journey: fly the camera to the pin, then show its card. */
    function zoomToUnit(u, isDone) {
      zoomed = u;
      mount.classList.add('is-zoomed');
      card.classList.remove('show');
      /* Pull the map into view first. The card slides up from the map's
         bottom edge, and on a laptop that edge can sit below the fold —
         a student would then tap a pin and never see the Start button. */
      try {
        mount.scrollIntoView({
          behavior: reduceMotion() ? 'auto' : 'smooth',
          block: 'center',
        });
      } catch (e) { mount.scrollIntoView(); }
      flyTo(svg, frameFor(px(u), py(u), 3.2), 620, () => showCard(u, isDone));
    }

    function zoomOut() {
      zoomed = null;
      mount.classList.remove('is-zoomed');
      card.classList.remove('show');
      flyTo(svg, FULL, 520);
    }

    /* Step 2: leaving for the unit. Push the camera the rest of the way in
       and fade the map out, so the map hands off to the lesson instead of
       cutting to it. Navigation is on a timer rather than the tween's
       callback so a slow frame can never strand the student here. */
    function zoomThroughTo(href, u) {
      if (reduceMotion()) { window.location.href = href; return; }
      mount.classList.add('is-launching');
      card.classList.remove('show');
      flyTo(svg, frameFor(px(u), py(u), 9), 520);
      setTimeout(() => { window.location.href = href; }, 470);
    }

    function showCard(u, isDone) {
      const tier = TIERS[u.tier];
      card.innerHTML = `
        <button class="wm-card-close" type="button" aria-label="Close">✕</button>
        <div class="wm-card-emoji">${u.emoji}</div>
        <div class="wm-card-head">
          <div class="wm-card-tier wm-tier-${u.tier}">${tier.labelEn} · ${tier.labelKr}</div>
          <h3>Unit ${u.n}: ${u.titleEn}</h3>
          <p class="kr muted">${u.titleKr}</p>
          ${isDone ? '<p class="wm-card-done">✅ Finished! 완료했어요</p>' : ''}
        </div>
        <div class="wm-card-actions">
          <a class="btn small" href="${u.href}" data-launch>${isDone ? '↺ Play Again 다시 하기' : '▶ Start 시작하기'}</a>
          ${u.game ? `<a class="btn secondary small" href="${u.game}" data-launch>🎯 Review Game 복습 게임</a>` : ''}
        </div>`;
      card.classList.add('show');
      card.querySelector('.wm-card-close').addEventListener('click', zoomOut);
      card.querySelectorAll('[data-launch]').forEach(a => {
        a.addEventListener('click', e => {
          e.preventDefault();
          zoomThroughTo(a.getAttribute('href'), u);
        });
      });
    }

    // tapping the ocean flies back out
    svg.addEventListener('click', () => { if (zoomed) zoomOut(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && zoomed) zoomOut(); });

    return { done: UNITS.filter(done).length, total: UNITS.length, current };
  }

  /* ---- list view, kept for teachers scanning the whole course ---- */
  function renderList(mount) {
    const progress = Scoreboard.getProgress();
    mount.innerHTML = '';
    ['beg', 'int', 'adv'].forEach(tier => {
      const units = UNITS.filter(u => u.tier === tier);
      if (!units.length) return;
      const t = TIERS[tier];
      const sec = document.createElement('section');
      sec.className = 'level-section';
      sec.innerHTML = `
        <div class="level-heading">
          <span class="level-pill ${tier}">${t.labelKr}</span>
          <h2>${t.labelEn}</h2>
          <span class="level-sub kr">${t.sub}</span>
        </div>`;
      const grid = document.createElement('div');
      grid.className = 'unit-grid';
      units.forEach(u => {
        const isDone = !!progress[u.id];
        const wrap = document.createElement('div');
        wrap.className = 'unit-card-wrap';
        wrap.innerHTML = `
          <a class="unit-card${isDone ? ' is-done' : ''}" href="${u.href}">
            ${isDone ? '<span class="done-badge">✅</span>' : ''}
            <span class="unit-emoji">${u.emoji}</span>
            <h3>Unit ${u.n}: ${u.titleEn}</h3>
            <p class="kr muted">${u.titleKr}</p>
          </a>
          ${u.game ? `<a class="jp-mini-link" href="${u.game}" title="Review Game 복습 게임">🎯</a>` : ''}`;
        grid.appendChild(wrap);
      });
      sec.appendChild(grid);
      mount.appendChild(sec);
    });
  }

  return { render, renderList };
})();
