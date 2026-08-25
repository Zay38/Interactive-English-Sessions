/* ============================================================
   SpeechCheck — lets a student verify their own spoken answer
   with no teacher listening, using the browser's built-in Web
   Speech API (SpeechRecognition). This only works in Chrome/Edge
   (no Firefox/Safari support as of writing) and needs mic
   permission + network access, so every call site MUST handle
   the "unsupported" / "error" paths and fall back to a manual
   self-report button — never assume it's available.

   Matching is intentionally lenient: elementary students' speech
   and the recognizer both introduce noise, so we score by how
   many of the expected words appear anywhere in the transcript
   (word-set overlap) rather than requiring an exact phrase match.
   ============================================================ */

const SpeechCheck = (() => {
  const SR = (typeof window !== 'undefined') && (window.SpeechRecognition || window.webkitSpeechRecognition);

  function isSupported() {
    return !!SR;
  }

  const CONTRACTIONS = [
    [/\bi'm\b/g, 'i am'], [/\bit's\b/g, 'it is'], [/\bthat's\b/g, 'that is'],
    [/\bhe's\b/g, 'he is'], [/\bshe's\b/g, 'she is'], [/\bwhat's\b/g, 'what is'],
    [/\bthere's\b/g, 'there is'], [/\bhere's\b/g, 'here is'],
    [/\bdon't\b/g, 'do not'], [/\bdoesn't\b/g, 'does not'], [/\bdidn't\b/g, 'did not'],
    [/\bcan't\b/g, 'cannot'], [/\bisn't\b/g, 'is not'], [/\baren't\b/g, 'are not'],
    [/\bwon't\b/g, 'will not'], [/\byou're\b/g, 'you are'], [/\bthey're\b/g, 'they are'],
  ];

  function normalize(text) {
    let s = (text || '').toLowerCase();
    CONTRACTIONS.forEach(([pattern, expansion]) => { s = s.replace(pattern, expansion); });
    return s.replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
  }

  // Word-set overlap: what fraction of the expected words show up
  // anywhere in what was heard. Order-independent, tolerant of a
  // dropped or extra word here and there.
  function score(transcript, expected) {
    const heard = normalize(transcript);
    const target = normalize(expected);
    if (!target.length) return 0;
    let matched = 0;
    target.forEach(word => {
      const idx = heard.indexOf(word);
      if (idx !== -1) { matched++; heard.splice(idx, 1); }
    });
    return matched / target.length;
  }

  function listen({ onStart, onResult, onError, timeoutMs = 6000 } = {}) {
    if (!isSupported()) { if (onError) onError('unsupported'); return null; }
    const rec = new SR();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    let settled = false;
    const timer = setTimeout(() => { if (!settled) { settled = true; try { rec.stop(); } catch (e) {} } }, timeoutMs);

    rec.onstart = () => { if (onStart) onStart(); };
    rec.onresult = (e) => {
      settled = true;
      clearTimeout(timer);
      const transcript = e.results[0][0].transcript;
      if (onResult) onResult(transcript);
    };
    rec.onerror = (e) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (onError) onError(e.error || 'error');
    };
    rec.onend = () => {
      if (!settled) { settled = true; clearTimeout(timer); if (onError) onError('no-speech'); }
    };
    try {
      rec.start();
    } catch (e) {
      settled = true;
      clearTimeout(timer);
      if (onError) onError('start-failed');
      return null;
    }
    return rec;
  }

  function checkAgainst(expected, { onListening, onPass, onFail, onUnsupported, onError, passThreshold = 0.7 } = {}) {
    if (!isSupported()) { if (onUnsupported) onUnsupported(); return; }
    listen({
      onStart: onListening,
      onResult: (transcript) => {
        const s = score(transcript, expected);
        if (s >= passThreshold) { if (onPass) onPass(transcript, s); }
        else if (onFail) onFail(transcript, s);
      },
      onError: (err) => { if (onError) onError(err); },
    });
  }

  return { isSupported, normalize, score, listen, checkAgainst };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = SpeechCheck;
