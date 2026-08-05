/* ============================================================
   UnitBuilder — renders a full 13+ screen lesson from a plain
   data config, so new units only need a data.js content file
   instead of a hand-written HTML+JS pair. Built on top of the
   shared Activities engine, LessonEngine, and Scoreboard.

   See units/my-body/data.js for a fully worked example, and
   docs at the bottom of this file for the config shape.
   ============================================================ */

const UnitBuilder = (() => {
  const { el, speakBtn } = Activities;

  function sectionHeader(container, { kickerEn, kickerKr, timeMin, headingNodes, instrEn, instrKr }) {
    container.appendChild(el('span', { class: 'screen-kicker' }, `${kickerEn} · ${kickerKr}`));
    container.appendChild(el('span', { class: 'time-badge' }, `⏱ ${timeMin}min`));
    container.appendChild(el('h2', {}, headingNodes));
    if (instrEn) {
      container.appendChild(el('p', { class: 'instruction' }, [
        el('span', { class: 'instr-en' }, instrEn),
        el('span', { class: 'instr-kr kr' }, instrKr),
      ]));
    }
  }

  function exampleRow(en, kr) {
    return el('div', { class: 'example-row' }, [
      speakBtn(en),
      el('div', { class: 'example-text' }, [
        el('div', { class: 'en' }, en),
        el('div', { class: 'kr' }, kr),
      ]),
    ]);
  }

  function headingWithKr(en, kr) {
    return [en, ' ', el('span', { class: 'kr' }, kr)];
  }

  /* ---------------- welcome / checkin / finish (fixed shell) ---------------- */

  function buildWelcome(config) {
    const section = el('section', { id: 'screen-welcome', class: 'screen active' });
    const hero = el('div', { class: 'welcome-hero' });
    const bubbles = el('div', { class: 'bubble-field' });
    [[6, 26, 0], [18, 16, 1.2], [30, 34, 2.4], [45, 20, 0.6], [58, 28, 3.2], [70, 18, 1.8], [82, 24, 2.9], [92, 14, 0.3]].forEach(([left, size, delay]) => {
      bubbles.appendChild(el('span', { class: 'bubble', style: `left:${left}%;width:${size}px;height:${size}px;animation-delay:${delay}s;` }));
    });
    hero.appendChild(bubbles);

    const content = el('div', { class: 'hero-content' }, [
      el('div', { class: 'emoji-row' }, config.emojiRow),
      el('h1', {}, config.headingEn),
      el('p', {}, [
        el('span', { class: 'subtitle-en' }, config.subtitleEn),
        el('span', { class: 'subtitle-kr kr' }, config.subtitleKr),
      ]),
      el('div', { class: 'name-field-wrap' }, [
        el('label', { for: 'studentNameInput' }, ["What's your name?", el('span', { class: 'kr' }, '이름이 뭐예요?')]),
        el('div', { class: 'name-field' }, el('input', { type: 'text', id: 'studentNameInput', placeholder: 'e.g. Minjun', maxlength: '20' })),
      ]),
      el('div', { class: 'spacer' }),
      el('button', { class: 'btn', id: 'startBtn', type: 'button' }, ["Let's Start! 🚀 ", el('span', { class: 'kr', style: 'font-size:0.8em;font-weight:600;' }, '시작하기')]),
    ]);
    hero.appendChild(content);
    section.appendChild(hero);

    section.appendChild(el('div', { class: 'card', style: 'margin-top:20px;' }, [
      el('h3', {}, ["What we'll learn today ", el('span', { class: 'kr' }, '· 오늘 배울 내용')]),
      el('p', { class: 'learn-list-en' }, config.learnListEn),
      el('p', { class: 'learn-list-kr kr' }, config.learnListKr),
    ]));
    return section;
  }

  function buildCheckin(config) {
    const c = config.checkin;
    const section = el('section', { id: 'screen-checkin', class: 'screen' });
    sectionHeader(section, {
      kickerEn: 'WARM-UP', kickerKr: '워밍업', timeMin: c.timeMin || 2,
      headingNodes: headingWithKr(c.headingEn, c.headingKr),
      instrEn: c.instrEn, instrKr: c.instrKr,
    });
    const grid = el('div', { class: 'checkin-grid', id: 'checkinGrid' });
    section.appendChild(grid);
    return section;
  }

  function wireCheckin(config, points) {
    const grid = document.getElementById('checkinGrid');
    let awarded = false;
    config.checkin.options.forEach(opt => {
      const btn = el('button', { class: 'checkin-btn', type: 'button' }, [
        Activities.iconNode(opt),
        el('span', { class: 'label-en' }, opt.en),
        el('span', { class: 'label kr' }, opt.kr),
      ]);
      btn.addEventListener('click', () => {
        [...grid.children].forEach(b => b.classList.remove('picked'));
        btn.classList.add('picked');
        EnglishVoice.speak(config.checkin.speakTemplate ? config.checkin.speakTemplate(opt.en) : opt.en);
        if (!awarded) { awarded = true; points.add(5); }
      });
      grid.appendChild(btn);
    });
  }

  function buildFinish(config) {
    const section = el('section', { id: 'screen-finish', class: 'screen' });
    const hero = el('div', { class: 'score-hero card' });
    const bubbles = el('div', { class: 'bubble-field' });
    [[8, 22, 0.4], [22, 14, 1.6], [36, 30, 2.8], [52, 18, 0.9], [66, 26, 2.1], [80, 16, 3.4], [90, 22, 1.1]].forEach(([left, size, delay]) => {
      bubbles.appendChild(el('span', { class: 'bubble', style: `left:${left}%;width:${size}px;height:${size}px;animation-delay:${delay}s;` }));
    });
    hero.appendChild(bubbles);

    const content = el('div', { class: 'hero-content' }, [
      el('span', { class: 'big-emoji' }, '🏆'),
      el('h2', { id: 'finishHeading' }, 'Great Job, English Star!'),
      el('p', {}, [el('span', { class: 'subtitle-en' }, 'Awesome work today!'), el('span', { class: 'subtitle-kr kr' }, '오늘 정말 잘했어요!')]),
      el('div', { class: 'score-num', id: 'finalScoreText' }, '-'),
      el('div', { class: 'stars', id: 'finalStars' }, '⭐⭐⭐⭐⭐'),
      el('div', { class: 'compare-line', id: 'compareLine' }),
      config.sections.some(s => s.type === 'capstone')
        ? el('div', { class: 'intro-card complete', style: 'text-align:left;' }, [
            el('div', { class: 'intro-card-kicker center' }, '✨ YOUR CREATION TO TAKE HOME ✨'),
            el('div', { class: 'intro-sentence center', id: 'recapSentence' }, '-'),
            el('div', { class: 'intro-sentence-kr center', id: 'recapSentenceKr' }, '-'),
          ])
        : el('p', {}, [
            el('strong', {}, config.finishTagline.en),
            el('br'),
            `"${config.finishTagline.example}"`,
            el('br'),
            el('span', { class: 'kr', style: 'font-size:0.85rem;' }, config.finishTagline.kr),
          ]),
      el('div', { class: 'row', style: 'justify-content:center; margin-top:16px;' }, [
        el('button', { class: 'btn ghost', id: 'replayBtn', type: 'button' }, ['↺ Replay ', el('span', { class: 'kr', style: 'font-size:0.8em;' }, '다시 하기')]),
        el('a', { class: 'btn', href: '../../index.html' }, ['🏠 Home ', el('span', { class: 'kr', style: 'font-size:0.8em;' }, '홈으로')]),
      ]),
      el('h3', { style: 'margin-top:28px;' }, ['🏅 Leaderboard ', el('span', { class: 'kr', style: 'font-size:0.8rem;' }, '이 기기의 랭킹')]),
      el('div', { id: 'leaderboardWrap' }),
    ]);
    hero.appendChild(content);
    section.appendChild(hero);
    return section;
  }

  /* ---------------- topic sections ---------------- */

  function buildVocabSection(sec) {
    const section = el('section', { id: sec.id, class: 'screen' });
    sectionHeader(section, {
      kickerEn: 'VOCABULARY', kickerKr: '어휘', timeMin: sec.timeMin || 3,
      headingNodes: headingWithKr(sec.headingEn, sec.headingKr),
      instrEn: sec.instrEn, instrKr: sec.instrKr,
    });
    section.appendChild(el('div', { id: `${sec.id}Body` }));
    return section;
  }

  function buildGameSection(sec) {
    const section = el('section', { id: sec.id, class: 'screen' });
    sectionHeader(section, {
      kickerEn: 'GAME', kickerKr: '게임', timeMin: sec.timeMin || 2,
      headingNodes: headingWithKr('Listen & Click!', '듣고 클릭하기'),
      instrEn: 'Listen, then click the matching picture. Correct = points!',
      instrKr: '듣고 맞는 그림을 클릭해요. 정답마다 포인트!',
    });
    section.appendChild(el('div', { id: `${sec.id}Body` }));
    return section;
  }

  function buildGrammarSection(sec) {
    const section = el('section', { id: sec.id, class: 'screen' });
    sectionHeader(section, {
      kickerEn: 'GRAMMAR', kickerKr: '문법', timeMin: sec.timeMin || 3,
      headingNodes: headingWithKr(sec.headingEn, sec.headingKr),
      instrEn: sec.instrEn, instrKr: sec.instrKr,
    });
    (sec.patterns || []).forEach(p => {
      section.appendChild(el('div', { class: 'pattern-box' }, [
        el('div', { class: 'pattern-en' }, p.en),
        el('div', { class: 'pattern-kr' }, p.kr),
      ]));
    });
    if (sec.examples && sec.examples.length) {
      const wrap = el('div', {});
      sec.examples.forEach(x => wrap.appendChild(exampleRow(x.en, x.kr)));
      section.appendChild(wrap);
    }
    if (sec.qaPairs && sec.qaPairs.length) {
      if (sec.qaLabelEn) {
        section.appendChild(el('p', { class: 'phase-label' }, [sec.qaLabelEn, ' ', el('span', { class: 'kr' }, sec.qaLabelKr)]));
      }
      if (sec.qaInstrEn) {
        section.appendChild(el('p', { class: 'instruction' }, [
          el('span', { class: 'instr-en' }, sec.qaInstrEn),
          el('span', { class: 'instr-kr kr' }, sec.qaInstrKr),
        ]));
      }
      const qaBody = el('div', {});
      Activities.renderQAPairs(qaBody, sec.qaPairs);
      section.appendChild(qaBody);
    }
    return section;
  }

  function buildPracticeSection(sec) {
    const section = el('section', { id: sec.id, class: 'screen' });
    sectionHeader(section, {
      kickerEn: 'PRACTICE', kickerKr: '연습', timeMin: sec.timeMin || 3,
      headingNodes: [el('span', { id: `${sec.id}Title` }, headingWithKr('Build the Sentence!', '문장 만들기'))],
    });
    section.appendChild(el('p', { class: 'instruction' }, [
      el('span', { class: 'instr-en', id: `${sec.id}InstrEn` }, sec.instrEn || 'Tap the word tiles in order to build the sentence.'),
      el('span', { class: 'instr-kr kr', id: `${sec.id}InstrKr` }, sec.instrKr || '단어 카드를 순서대로 눌러요.'),
    ]));
    section.appendChild(el('div', { id: `${sec.id}Body` }));
    return section;
  }

  function buildCapstoneSection(sec) {
    const section = el('section', { id: sec.id, class: 'screen' });
    sectionHeader(section, {
      kickerEn: sec.kickerEn || 'MY CREATION', kickerKr: sec.kickerKr || '나만의 결과물', timeMin: sec.timeMin || 3,
      headingNodes: headingWithKr(sec.headingEn, sec.headingKr),
      instrEn: sec.instrEn, instrKr: sec.instrKr,
    });

    sec.groups.forEach(g => {
      section.appendChild(el('div', { class: 'intro-picker-group' }, [
        el('div', { class: 'intro-picker-label' }, [g.labelEn, el('span', { class: 'kr' }, g.labelKr)]),
        el('div', { class: 'intro-chip-grid', id: `${sec.id}-${g.key}` }),
      ]));
    });

    section.appendChild(el('div', { class: 'intro-card', id: `${sec.id}Card` }, [
      el('div', { class: 'intro-card-kicker' }, `✨ ${sec.cardTitleEn || 'MY CREATION'} · ${sec.cardTitleKr || '나만의 결과물'} ✨`),
      el('div', { class: 'intro-sentence', id: `${sec.id}Sentence` }, sec.placeholderEn),
      el('div', { class: 'intro-sentence-kr', id: `${sec.id}SentenceKr` }, sec.placeholderKr),
      el('div', { style: 'margin-top:16px;' }, el('button', { class: 'btn secondary small', id: `${sec.id}HearBtn`, type: 'button' }, '🔊 Hear It! 들어보기')),
    ]));

    section.appendChild(el('p', { class: 'instruction' }, [
      el('span', { class: 'instr-en' }, sec.confirmInstrEn || '🎤 Now say it out loud to your teacher!'),
      el('span', { class: 'instr-kr kr' }, sec.confirmInstrKr || '이제 선생님께 큰 소리로 말해봐요!'),
    ]));
    section.appendChild(el('div', { class: 'center' }, el('button', { class: 'btn success', id: `${sec.id}DoneBtn`, type: 'button', disabled: true }, '✔ I said it! 말했어요!')));
    return section;
  }

  function buildMysterySection(sec) {
    const section = el('section', { id: sec.id, class: 'screen' });
    sectionHeader(section, {
      kickerEn: 'SPEAKING', kickerKr: '말하기 활동', timeMin: sec.timeMin || 4,
      headingNodes: headingWithKr(sec.headingEn || 'Mystery Box! 🎁', sec.headingKr || ''),
      instrEn: sec.instrEn, instrKr: sec.instrKr,
    });
    section.appendChild(el('div', { id: `${sec.id}Body` }));
    return section;
  }

  function buildInterviewSection(sec) {
    const section = el('section', { id: sec.id, class: 'screen' });
    sectionHeader(section, {
      kickerEn: 'SPEAKING', kickerKr: '말하기 활동', timeMin: sec.timeMin || 3,
      headingNodes: headingWithKr(sec.headingEn || 'Interview 🎤', sec.headingKr || ''),
      instrEn: sec.instrEn || 'Read the question, then answer your teacher in English. Use the hint below the card!',
      instrKr: sec.instrKr || '질문을 읽고 영어로 대답해요. 카드 아래 힌트를 참고해요.',
    });
    section.appendChild(el('div', { id: `${sec.id}Body` }));
    return section;
  }

  function buildQuizSection(sec) {
    const section = el('section', { id: sec.id, class: 'screen' });
    sectionHeader(section, {
      kickerEn: 'FINAL QUIZ', kickerKr: '마무리 퀴즈', timeMin: sec.timeMin || 3,
      headingNodes: headingWithKr('Show What You Know!', '⭐'),
      instrEn: 'Show what you learned! Earn points for each correct answer.',
      instrKr: '오늘 배운 내용을 확인해요. 정답마다 포인트!',
    });
    section.appendChild(el('div', { id: `${sec.id}Body` }));
    return section;
  }

  const SECTION_BUILDERS = {
    vocab: buildVocabSection,
    game: buildGameSection,
    grammar: buildGrammarSection,
    practice: buildPracticeSection,
    capstone: buildCapstoneSection,
    mystery: buildMysterySection,
    interview: buildInterviewSection,
    quiz: buildQuizSection,
  };

  /* ---------------- main render ---------------- */

  function render(config) {
    document.title = `${config.headingEn} | Interactive English Sessions`;
    const root = document.getElementById('lessonRoot');
    root.appendChild(buildWelcome(config));
    root.appendChild(buildCheckin(config));
    config.sections.forEach(sec => root.appendChild(SECTION_BUILDERS[sec.type](sec)));
    root.appendChild(buildFinish(config));

    const steps = [
      { id: 'screen-welcome', label: 'Welcome' },
      { id: 'screen-checkin', label: 'Warm-up' },
      ...config.sections.map(sec => ({ id: sec.id, label: sec.stepLabel || sec.headingEn || sec.type })),
      { id: 'screen-finish', label: 'Finish' },
    ];
    document.getElementById('stepLabel').textContent = `1 / ${steps.length}`;

    const engine = new LessonEngine(steps);
    const points = new PointsTracker(document.getElementById('pointsNum'), document.getElementById('pointsChip'));

    const nameInput = document.getElementById('studentNameInput');
    nameInput.value = Scoreboard.getSavedName();
    document.getElementById('startBtn').addEventListener('click', () => {
      const name = nameInput.value.trim() || 'Friend';
      Scoreboard.saveName(name);
      engine.next();
    });
    document.getElementById('replayBtn').addEventListener('click', () => window.location.reload());

    wireCheckin(config, points);

    // Static content (vocab flashcards) can render immediately.
    config.sections.filter(s => s.type === 'vocab').forEach(sec => {
      Activities.renderFlashcards(document.getElementById(`${sec.id}Body`), sec.items);
    });

    let capstoneRecap = null;
    const rendered = {};
    function once(id, fn) { if (!rendered[id]) { rendered[id] = true; fn(); } }

    document.addEventListener('lesson:screenchange', (e) => {
      const sec = config.sections.find(s => s.id === e.detail.id);
      if (!sec) {
        if (e.detail.id === 'screen-finish') renderFinish();
        return;
      }

      if (sec.type === 'game') {
        once(sec.id, () => {
          Activities.renderListenAndClick(document.getElementById(`${sec.id}Body`), sec.items, {
            rounds: sec.rounds || 5,
            onAnswer: (correct) => { if (correct) points.add(sec.pointsPerCorrect || 10); },
          });
        });
      }

      if (sec.type === 'practice') {
        once(sec.id, () => {
          const body = document.getElementById(`${sec.id}Body`);
          function phaseA() {
            Activities.renderSentenceBuilderSet(body, sec.sentenceItems, {
              onWordCorrect: () => points.add(sec.pointsWord || 2),
              onItemComplete: (i, perfect) => {
                points.add(perfect ? (sec.pointsPerfect || 15) : (sec.pointsOk || 8));
                if (perfect) fireConfetti(600);
              },
              onComplete: sec.phaseB ? phaseB : undefined,
            });
          }
          function phaseB() {
            document.getElementById(`${sec.id}Title`).innerHTML = 'Answer the Question! <span class="kr">질문에 대답하기</span>';
            document.getElementById(`${sec.id}InstrEn`).textContent = 'Now read the question and pick the right answer!';
            document.getElementById(`${sec.id}InstrKr`).textContent = '질문을 보고 알맞은 대답을 골라봐요!';
            Activities.renderMultipleChoiceQuiz(body, sec.phaseB.questions, {
              onAnswer: (correct) => { if (correct) points.add(sec.phaseB.pointsPerCorrect || 10); },
            });
          }
          phaseA();
        });
      }

      if (sec.type === 'capstone') {
        once(sec.id, () => {
          const name = Scoreboard.getSavedName() || 'Friend';
          const picks = {};
          let awarded = false;
          const card = document.getElementById(`${sec.id}Card`);
          const sentenceEl = document.getElementById(`${sec.id}Sentence`);
          const sentenceKrEl = document.getElementById(`${sec.id}SentenceKr`);
          const doneBtn = document.getElementById(`${sec.id}DoneBtn`);

          function refresh() {
            const complete = sec.groups.every(g => picks[g.key]);
            if (complete) {
              const result = sec.template(name, picks);
              sentenceEl.innerHTML = result.html || result.en;
              sentenceKrEl.textContent = result.kr;
            } else {
              sentenceEl.innerHTML = sec.placeholderEn;
              sentenceKrEl.textContent = sec.placeholderKr;
            }
            card.classList.toggle('complete', complete);
            doneBtn.disabled = !complete;
            if (complete && typeof sparkleAt === 'function') sparkleAt(card, 18);
          }

          sec.groups.forEach(g => {
            const grid = document.getElementById(`${sec.id}-${g.key}`);
            g.options.forEach(opt => {
              const chip = el('button', { class: 'intro-chip', type: 'button' }, [Activities.iconNode(opt), el('span', { class: 'chip-label' }, opt.en)]);
              chip.addEventListener('click', () => {
                [...grid.children].forEach(c => c.classList.remove('picked'));
                chip.classList.add('picked');
                picks[g.key] = opt;
                EnglishVoice.speak(g.speakTemplate ? g.speakTemplate(opt.en) : opt.en);
                refresh();
              });
              grid.appendChild(chip);
            });
          });

          document.getElementById(`${sec.id}HearBtn`).addEventListener('click', () => {
            if (!sec.groups.every(g => picks[g.key])) return;
            EnglishVoice.speak(sec.template(name, picks).en);
          });

          doneBtn.addEventListener('click', () => {
            if (!sec.groups.every(g => picks[g.key])) return;
            const result = sec.template(name, picks);
            capstoneRecap = { en: result.en, kr: result.kr };
            if (!awarded) { awarded = true; points.add(sec.points || 25); fireConfetti(1400); }
          });

          refresh();
        });
      }

      if (sec.type === 'mystery') {
        once(sec.id, () => {
          Activities.renderMysteryBoxes(document.getElementById(`${sec.id}Body`), sec.items, {
            onBoxDone: () => points.add(sec.pointsPerBox || 10),
            onAllDone: () => fireConfetti(),
          });
        });
      }

      if (sec.type === 'interview') {
        once(sec.id, () => {
          let clicks = 0;
          Activities.renderPromptDeck(document.getElementById(`${sec.id}Body`), sec.prompts, {
            onNext: () => { clicks++; if (clicks <= 5) points.add(sec.pointsPerClick || 5); },
          });
        });
      }

      if (sec.type === 'quiz') {
        once(sec.id, () => {
          Activities.renderMultipleChoiceQuiz(document.getElementById(`${sec.id}Body`), sec.questions, {
            onAnswer: (correct) => { if (correct) points.add(sec.pointsPerCorrect || 20); },
            onComplete: (score, total) => {
              const starCount = Math.max(1, Math.round((score / total) * 5));
              document.getElementById('finalStars').textContent = '⭐'.repeat(starCount) + '☆'.repeat(5 - starCount);
              fireConfetti(2000);
              setTimeout(() => engine.next(), 900);
            },
          });
        });
      }

    });

    function renderFinish() {
      once('screen-finish', () => {
        const name = Scoreboard.getSavedName() || 'Friend';
        document.getElementById('finishHeading').textContent = `Great Job, ${name}!`;
        document.getElementById('finalScoreText').textContent = `${points.total} pt`;

        if (config.sections.some(s => s.type === 'capstone')) {
          const fallback = config.finishTagline || { example: '' };
          document.getElementById('recapSentence').textContent = capstoneRecap ? capstoneRecap.en : fallback.example;
          document.getElementById('recapSentenceKr').textContent = capstoneRecap ? capstoneRecap.kr : '';
        }

        const stats = Scoreboard.getStats(config.unitId);
        const entry = Scoreboard.addEntry(config.unitId, { name, points: points.total });
        renderCompareLine(document.getElementById('compareLine'), points.total, stats);
        renderLeaderboard(document.getElementById('leaderboardWrap'), config.unitId, entry.id);
      });
    }
  }

  return { render };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (window.UNIT_CONFIG) UnitBuilder.render(window.UNIT_CONFIG);
});
