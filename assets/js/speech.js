/* ============================================================
   Text-to-speech helper (Web Speech API).
   No audio files needed — works fully client-side in the browser.
   ============================================================ */

const EnglishVoice = (() => {
  let cachedVoice = null;

  function pickVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;
    cachedVoice =
      voices.find(v => /en-US/i.test(v.lang) && /female|samantha|zira/i.test(v.name)) ||
      voices.find(v => /en-US/i.test(v.lang)) ||
      voices.find(v => /^en/i.test(v.lang)) ||
      voices[0];
    return cachedVoice;
  }

  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = pickVoice;
    pickVoice();
  }

  function speak(text, { rate = 0.92, onEnd } = {}) {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = rate;
    utter.pitch = 1.05;
    const voice = cachedVoice || pickVoice();
    if (voice) utter.voice = voice;
    if (onEnd) utter.onend = onEnd;
    window.speechSynthesis.speak(utter);
  }

  return { speak };
})();
