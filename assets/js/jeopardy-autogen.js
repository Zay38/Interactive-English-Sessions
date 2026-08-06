/* ============================================================
   Auto-derives a JEOPARDY_CONFIG from an existing UNIT_CONFIG
   (see unit-builder.js), so Units 3-10 don't need hand-authored
   review-game content — the vocab/grammar/practice/quiz data they
   already have is reshaped into a 4-category x 4-clue board.
   ============================================================ */

function buildJeopardyFromUnitConfig(cfg) {
  const sections = cfg.sections;
  const vocabSec = sections.find(s => s.type === 'vocab');
  const grammarSec = sections.find(s => s.type === 'grammar');
  const practiceSec = sections.find(s => s.type === 'practice');
  const quizSec = sections.find(s => s.type === 'quiz');

  const ROWS = 4;

  function joinWords(words) {
    return words.reduce((s, w) => (/^[.!?]$/.test(w) ? s + w : (s ? s + ' ' + w : w)), '');
  }
  function pickSpread(arr, n) {
    if (arr.length <= n) return arr.slice();
    const out = [];
    for (let i = 0; i < n; i++) out.push(arr[Math.floor((i * arr.length) / n)]);
    return out;
  }
  function vocabClue(it) {
    return { emoji: it.emoji, clueEn: 'What is this in English?', clueKr: '이건 영어로 무엇일까요?', answerEn: it.en, answerKr: it.kr };
  }

  const vocabAll = (vocabSec && vocabSec.items) ? vocabSec.items.slice() : [];
  const vocabPicked = pickSpread(vocabAll, ROWS);
  const vocabLeftover = vocabAll.filter(it => !vocabPicked.includes(it)).map(vocabClue);

  const qaPool = [];
  if (grammarSec && grammarSec.qaPairs) {
    grammarSec.qaPairs.forEach(p => qaPool.push({ clueEn: p.qEn, clueKr: p.qKr, answerEn: p.aEn, answerKr: p.aKr }));
  }
  if (quizSec && quizSec.questions) {
    quizSec.questions.forEach(q => {
      if (/^Question:/.test(q.stemEn)) {
        const correct = q.options.find(o => o.correct);
        qaPool.push({
          emoji: q.emoji,
          clueEn: q.stemEn.replace(/^Question:\s*/, '').replace(/["“”]/g, ''),
          clueKr: q.stemKr,
          answerEn: correct.label,
          answerKr: '',
        });
      }
    });
  }

  const patternPool = [];
  if (grammarSec && grammarSec.patterns) {
    grammarSec.patterns.forEach(p => patternPool.push({ clueEn: 'How do you say this?', clueKr: p.kr, answerEn: p.en, answerKr: '' }));
  }
  if (practiceSec && practiceSec.sentenceItems) {
    practiceSec.sentenceItems.forEach(s => patternPool.push({ emoji: s.emoji, clueEn: 'How do you say this?', clueKr: s.kr, answerEn: joinWords(s.words), answerKr: '' }));
  }

  const reviewPool = [];
  if (quizSec && quizSec.questions) {
    quizSec.questions.forEach(q => {
      if (!/^Question:/.test(q.stemEn)) {
        const correct = q.options.find(o => o.correct);
        reviewPool.push({ emoji: q.emoji, clueEn: q.stemEn, clueKr: q.stemKr, answerEn: correct.label, answerKr: '' });
      }
    });
  }

  // Pad any short pool up to ROWS using leftover vocab items.
  [qaPool, patternPool, reviewPool].forEach(pool => {
    while (pool.length < ROWS && vocabLeftover.length) pool.push(vocabLeftover.shift());
  });

  const categories = [];
  function addCategory(titleEn, titleKr, pool) {
    const picked = pickSpread(pool, ROWS);
    if (picked.length < ROWS) return; // not enough content — skip rather than show gaps
    categories.push({
      titleEn, titleKr,
      clues: picked.map((c, i) => ({ points: (i + 1) * 100, ...c })),
    });
  }

  addCategory('Vocabulary', '단어', vocabPicked.map(vocabClue));
  addCategory('Ask & Answer', '질문과 대답', qaPool);
  addCategory('Say It Right', '문장 말하기', patternPool);
  addCategory('Quick Review', '빠른 복습', reviewPool);

  return {
    unitId: cfg.unitId,
    unitNameEn: cfg.headingEn,
    unitNameKr: cfg.subtitleKr || '',
    backHref: 'index.html',
    categories,
  };
}
