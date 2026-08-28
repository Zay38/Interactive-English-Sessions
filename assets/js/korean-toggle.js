/* ============================================================
   Korean on demand

   Every Korean translation of the English being taught starts
   HIDDEN. A student reads the English first, and only when they
   have actually tried does a tap on "이게 무슨말이에요?" reveal
   the Korean.

   Why hidden by default: if the Korean is on screen, the eye goes
   there first every single time — that isn't a choice a nine year
   old can resist, and the English never gets read. Making the
   reveal a deliberate tap turns it into a decision.

   Why it resets on every screen: the effort should be per screen,
   not once per lesson. A student who wants Korean permanently can
   pin it with the 📌 button and it stays on everywhere.

   What is NOT hidden (on purpose):
     - instructions ("눌러서 들어보세요"), headings, button labels.
       A child who can't read the instruction is stuck and can't
       even attempt the task. Hiding the meaning teaches; hiding
       the controls just blocks.
     - the Mystery Box sentences, which ARE Korean by design —
       the exercise is to say them in English.
   ============================================================ */

(function () {
  const PIN_KEY = 'ies-kr-always';
  const root = document.documentElement;

  function pinned() {
    try { return localStorage.getItem(PIN_KEY) === '1'; } catch (e) { return false; }
  }
  function setPinned(on) {
    try { on ? localStorage.setItem(PIN_KEY, '1') : localStorage.removeItem(PIN_KEY); } catch (e) {}
  }

  function setMode(on) {
    root.dataset.kr = on ? 'on' : 'off';
    if (btn) {
      btn.innerHTML = on
        ? '🇰🇷 <span class="kr-reveal-label">한국어 숨기기</span> <span class="kr-reveal-en">Hide Korean</span>'
        : '🇰🇷 <span class="kr-reveal-label">이게 무슨말이에요?</span> <span class="kr-reveal-en">What does this mean?</span>';
      btn.setAttribute('aria-pressed', String(on));
    }
  }

  /* Start hidden unless the student has pinned Korean on. */
  root.dataset.kr = pinned() ? 'on' : 'off';

  let btn = null;
  let pin = null;
  let wrap = null;

  function build() {
    wrap = document.createElement('div');
    wrap.className = 'kr-reveal';
    /* The bottom of a lesson page is already occupied by the fixed
       nav bar, so sit above it there. */
    if (document.querySelector('.lesson-nav')) wrap.classList.add('above-nav');

    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'kr-reveal-btn';

    pin = document.createElement('button');
    pin.type = 'button';
    pin.className = 'kr-pin';
    pin.textContent = '📌';

    btn.addEventListener('click', () => {
      const next = root.dataset.kr !== 'on';
      setMode(next);
      /* Turning it off by hand also un-pins it — otherwise the pin
         would switch Korean straight back on at the next screen. */
      if (!next && pinned()) { setPinned(false); syncPin(); }
    });

    pin.addEventListener('click', () => {
      const next = !pinned();
      setPinned(next);
      syncPin();
      if (next) setMode(true);
    });

    wrap.appendChild(btn);
    wrap.appendChild(pin);
    document.body.appendChild(wrap);

    setMode(root.dataset.kr === 'on');
    syncPin();
  }

  function syncPin() {
    const on = pinned();
    pin.classList.toggle('active', on);
    pin.title = on ? '한국어 항상 보기 켬 · Always showing Korean' : '한국어 항상 보기 · Always show Korean';
    pin.setAttribute('aria-pressed', String(on));
  }

  /* Only offer the button when the screen in front of the student
     actually has something to reveal. */
  const GLOSS = [
    '.word-kr', '.example-kr', '.pattern-kr', '.example-row .kr',
    '.qa-kr', '.prompt-kr', '.intro-sentence-kr', '.checkin-btn .label',
    '.chat-kr', '.reply-kr', '.said-line-kr', '.scene-wrapup-kr',
    '.jp-clue-kr', '.jp-answer-kr', '.kr-gloss',
  ].join(',');

  /* Shown on any lesson-shaped page, not gated on Korean being present
     right now. A roleplay screen starts with an empty chat log and grows
     Korean as the conversation goes, so a presence check would blink the
     button in and out mid-conversation. The home page and the character
     page have no glosses at all and get no button. */
  function refresh() {
    if (!wrap) return;
    wrap.hidden = !document.querySelector('.lesson-main, .jp-grid, .screen, ' + GLOSS);
  }

  /* A new screen means a fresh chance to read the English first. */
  function onScreenChange() {
    if (!pinned()) setMode(false);
    refresh();
  }

  function watch() {
    const obs = new MutationObserver((records) => {
      let screenChanged = false;
      let contentChanged = false;
      for (const r of records) {
        if (r.type === 'attributes') {
          const t = r.target;
          if (t.classList && t.classList.contains('screen')) screenChanged = true;
        } else {
          contentChanged = true;
        }
      }
      if (screenChanged) onScreenChange();
      else if (contentChanged) refresh();
    });
    obs.observe(document.body, {
      subtree: true, childList: true,
      attributes: true, attributeFilter: ['class', 'hidden'],
    });
  }

  function init() {
    build();
    refresh();
    watch();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.KoreanToggle = { setMode, refresh };
})();
