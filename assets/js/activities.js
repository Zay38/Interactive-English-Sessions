/* ============================================================
   Reusable interactive-activity engine.
   Every unit (family-feelings, and future units) builds its
   screens by feeding data into these render functions, so new
   lessons can be assembled quickly without re-inventing the UI.
   ============================================================ */

const Activities = (() => {
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
      else if (v !== undefined && v !== null) node.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c === null || c === undefined) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  function speakBtn(text) {
    return el('button', {
      class: 'speaker-btn', type: 'button', 'aria-label': `Listen: ${text}`,
      onclick: (e) => { e.stopPropagation(); EnglishVoice.speak(text); },
    }, '🔊');
  }

  /* Most vocab items use a plain emoji character. A few concepts have no
     good emoji (e.g. "kitchen", "bedroom" — there's no room emoji), so
     those items carry an `icon: 'mdi-name'` field instead and render as
     a small inline SVG from icons.js. */
  function iconNode(item) {
    if (item.icon && typeof MdiIcons !== 'undefined' && MdiIcons[item.icon]) {
      const span = el('span', { class: 'mdi-icon-badge' });
      span.innerHTML = `<svg viewBox="0 0 24 24" width="1em" height="1em">${MdiIcons[item.icon]}</svg>`;
      return span;
    }
    return item.emoji;
  }

  /* ---------------- Flashcards (both languages shown together) ---------------- */
  function renderFlashcards(container, items) {
    container.innerHTML = '';
    const grid = el('div', { class: 'flash-grid' });
    items.forEach(item => {
      const card = el('div', { class: 'flashcard' });
      const inner = el('div', { class: 'flashcard-inner' });
      const front = el('div', { class: 'flash-face flash-front' }, [
        el('div', { class: 'emoji' }, iconNode(item)),
        el('div', { class: 'word-en' }, item.en),
        el('div', { class: 'word-kr' }, item.kr),
        speakBtn(item.en),
      ]);
      const back = el('div', { class: 'flash-face flash-back' }, [
        el('div', { class: 'example-en' }, item.exampleEn || item.en),
        el('div', { class: 'example-kr' }, item.exampleKr || item.kr),
        el('div', { class: 'hint' }, '👆 Tap to flip back 다시 눌러서 돌아가기'),
      ]);
      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        EnglishVoice.speak(item.en);
      });
      grid.appendChild(card);
    });
    container.appendChild(grid);
  }

  /* ---------------- Listen & Click game ---------------- */
  function renderListenAndClick(container, items, { rounds = 6, onComplete, onAnswer } = {}) {
    let score = 0;
    let roundIndex = 0;
    const order = shuffle(items).slice(0, Math.min(rounds, items.length));

    container.innerHTML = '';
    const head = el('div', { class: 'row between' }, [
      el('div', { class: 'step-label' }, `Round ${roundIndex + 1} / ${order.length}`),
      el('button', { class: 'btn secondary small', type: 'button', onclick: () => replay() }, ['🔊 ', el('span', {}, 'Listen again 다시 듣기')]),
    ]);
    const grid = el('div', { class: 'choice-grid' });
    const feedback = el('div', { class: 'feedback-banner' });
    container.appendChild(head);
    container.appendChild(grid);
    container.appendChild(feedback);

    function replay() {
      EnglishVoice.speak(order[roundIndex].en);
    }

    function renderRound() {
      feedback.className = 'feedback-banner';
      head.firstChild.textContent = `Round ${roundIndex + 1} / ${order.length}`;
      grid.innerHTML = '';
      const target = order[roundIndex];
      const distractors = shuffle(items.filter(i => i.en !== target.en)).slice(0, 3);
      const choices = shuffle([target, ...distractors]);
      choices.forEach(choice => {
        const btn = el('button', { class: 'choice-btn', type: 'button' }, [
          iconNode(choice),
          el('span', { class: 'choice-label' }, choice.en),
        ]);
        btn.addEventListener('click', () => handleAnswer(choice, target, btn, grid));
        grid.appendChild(btn);
      });
      setTimeout(replay, 250);
    }

    function handleAnswer(choice, target, btn, grid) {
      [...grid.children].forEach(b => (b.disabled = true));
      const correct = choice.en === target.en;
      btn.classList.add(correct ? 'correct' : 'wrong');
      if (correct) {
        score++;
        feedback.textContent = '✅ Great job! 정답이에요!';
        feedback.className = 'feedback-banner show good';
        if (typeof sparkleAt === 'function') sparkleAt(btn);
      } else {
        [...grid.children].find(b => b.textContent.includes(target.en))?.classList.add('correct');
        feedback.textContent = `❌ Not quite! Answer: ${target.en} 다시 들어볼까요?`;
        feedback.className = 'feedback-banner show bad';
      }
      if (onAnswer) onAnswer(correct);
      setTimeout(() => {
        roundIndex++;
        if (roundIndex < order.length) {
          renderRound();
        } else {
          container.innerHTML = '';
          container.appendChild(el('div', { class: 'feedback-banner show good' }, `🎉 ${score} / ${order.length} done! 완료!`));
          if (onComplete) onComplete(score, order.length);
        }
      }, 1200);
    }

    renderRound();
  }

  /* ---------------- Multiple choice quiz ---------------- */
  function renderMultipleChoiceQuiz(container, questions, { onComplete, onAnswer } = {}) {
    let index = 0;
    let score = 0;

    function renderQuestion() {
      container.innerHTML = '';
      const q = questions[index];
      container.appendChild(el('div', { class: 'step-label' }, `Question ${index + 1} / ${questions.length}`));
      if (q.emoji) container.appendChild(el('div', { class: 'center', style: 'font-size:3rem;margin:10px 0;' }, q.emoji));
      container.appendChild(el('h3', {}, q.stemEn));
      container.appendChild(el('p', { class: 'muted kr' }, q.stemKr));

      const grid = el('div', { class: 'choice-grid' });
      const feedback = el('div', { class: 'feedback-banner' });
      const nextWrap = el('div', { class: 'center', style: 'margin-top:18px;' });

      q.options.forEach(opt => {
        const btn = el('button', { class: 'choice-btn', type: 'button' }, el('span', { class: 'choice-label' }, opt.label));
        btn.addEventListener('click', () => {
          [...grid.children].forEach(b => (b.disabled = true));
          if (opt.correct) {
            btn.classList.add('correct');
            score++;
            feedback.textContent = '✅ Correct! 맞았어요!';
            feedback.className = 'feedback-banner show good';
            if (typeof sparkleAt === 'function') sparkleAt(btn);
          } else {
            btn.classList.add('wrong');
            [...grid.children].find((b, i) => q.options[i].correct)?.classList.add('correct');
            feedback.textContent = '❌ Try again! 다시 확인해봐요!';
            feedback.className = 'feedback-banner show bad';
          }
          if (onAnswer) onAnswer(!!opt.correct);
          const nextBtn = el('button', {
            class: 'btn', type: 'button',
            onclick: () => {
              index++;
              if (index < questions.length) renderQuestion();
              else if (onComplete) onComplete(score, questions.length);
            },
          }, index < questions.length - 1 ? 'Next ➜ 다음' : 'See Results 🎉 결과보기');
          nextWrap.appendChild(nextBtn);
        });
        grid.appendChild(btn);
      });

      container.appendChild(grid);
      container.appendChild(feedback);
      container.appendChild(nextWrap);
    }

    renderQuestion();
  }

  /* ---------------- Question <-> Answer pairing (explicit Q&A scaffolding) ---------------- */
  function renderQAPairs(container, pairs) {
    container.innerHTML = '';
    pairs.forEach(pair => {
      const row = el('div', { class: 'qa-pair' }, [
        el('div', { class: 'qa-block question' }, [
          el('span', { class: 'qa-tag' }, 'Q 질문'),
          el('div', {}, [
            el('div', { class: 'qa-en' }, [pair.qEn, ' ', speakBtn(pair.qEn)]),
            el('div', { class: 'qa-kr' }, pair.qKr),
          ]),
        ]),
        el('div', { class: 'qa-arrow' }, '➜'),
        el('div', { class: 'qa-block answer' }, [
          el('span', { class: 'qa-tag' }, 'A 대답'),
          el('div', {}, [
            el('div', { class: 'qa-en' }, [pair.aEn, ' ', speakBtn(pair.aEn)]),
            el('div', { class: 'qa-kr' }, pair.aKr),
          ]),
        ]),
      ]);
      container.appendChild(row);
    });
  }

  /* ---------------- Sentence builder (arcade-style: instant per-word feedback,
     numbered slots, streaks, hints) ---------------- */
  function renderSentenceBuilderSet(container, items, { onComplete, onItemComplete, onWordCorrect } = {}) {
    let index = 0;
    let streak = 0;

    function renderItem() {
      container.innerHTML = '';
      const item = items[index];
      let nextIdx = 0;
      let mistakeMade = false;

      const header = el('div', { class: 'row between' }, [
        el('div', { class: 'step-label' }, `Sentence ${index + 1} / ${items.length}`),
        el('div', { class: 'streak-badge' }, streak > 1 ? `🔥 ${streak} in a row! ${streak}연속!` : ''),
      ]);
      container.appendChild(header);
      container.appendChild(el('div', { class: 'center', style: 'font-size:3.2rem;margin:6px 0;' }, item.emoji));
      if (item.kr) container.appendChild(el('p', { class: 'muted kr center' }, item.kr));

      const slots = el('div', { class: 'sentence-slots' });
      item.words.forEach((_, i) => slots.appendChild(el('div', { class: 'slot' }, '')));

      const bank = el('div', { class: 'sentence-bank' });
      const feedback = el('div', { class: 'feedback-banner' });
      const controls = el('div', { class: 'center', style: 'margin-top:14px;' });

      const tiles = shuffle(item.words.map((w, i) => ({ word: w, id: i }))).map(({ word, id }) => {
        const tile = el('button', { class: 'word-tile', type: 'button' }, word);
        tile.dataset.id = id;
        tile.addEventListener('click', () => handleTileClick(tile, word));
        return tile;
      });
      tiles.forEach(t => bank.appendChild(t));

      const hintBtn = el('button', {
        class: 'btn ghost small', type: 'button',
        onclick: () => {
          if (nextIdx >= item.words.length) return;
          const target = tiles.find(t => !t.classList.contains('used') && t.textContent === item.words[nextIdx]);
          if (target) {
            target.classList.add('hint-pulse');
            setTimeout(() => target.classList.remove('hint-pulse'), 900);
          }
          mistakeMade = true;
        },
      }, '💡 Hint 힌트');
      controls.appendChild(hintBtn);

      function handleTileClick(tile, word) {
        if (tile.classList.contains('used') || nextIdx >= item.words.length) return;
        const expected = item.words[nextIdx];
        if (word === expected) {
          tile.classList.add('used');
          const slotEl = slots.children[nextIdx];
          slotEl.textContent = word;
          slotEl.classList.add('filled');
          if (typeof sparkleAt === 'function') sparkleAt(slotEl, 7);
          if (onWordCorrect) onWordCorrect();
          setTimeout(() => tile.remove(), 220);
          nextIdx++;
          if (nextIdx === item.words.length) finishSentence();
        } else {
          tile.classList.remove('wrong-shake');
          void tile.offsetWidth;
          tile.classList.add('wrong-shake');
          setTimeout(() => tile.classList.remove('wrong-shake'), 420);
          mistakeMade = true;
        }
      }

      function finishSentence() {
        const answer = item.words.join(' ');
        EnglishVoice.speak(answer);
        const perfect = !mistakeMade;
        if (perfect) {
          streak++;
          feedback.textContent = `🌟 Perfect! 완벽해요! ${streak > 1 ? `🔥 ${streak} in a row!` : ''}`;
        } else {
          streak = 0;
          feedback.textContent = '✅ Nice job! 잘했어요!';
        }
        feedback.className = 'feedback-banner show good';
        if (onItemComplete) onItemComplete(index, perfect);

        const nextBtn = el('button', {
          class: 'btn success', type: 'button',
          onclick: () => {
            index++;
            if (index < items.length) renderItem();
            else if (onComplete) onComplete();
          },
        }, index < items.length - 1 ? 'Next ➜ 다음' : 'Next Activity 🎉 다음 활동');
        controls.innerHTML = '';
        controls.appendChild(nextBtn);
      }

      container.appendChild(slots);
      container.appendChild(bank);
      container.appendChild(feedback);
      container.appendChild(controls);
    }

    renderItem();
  }

  /* ---------------- Speak-check widget (real voice verification) ----------------
     Uses SpeechCheck (Web Speech API) so a student can confirm they actually
     said the target sentence, without a teacher listening live. Falls back
     to a manual self-report button when the browser doesn't support speech
     recognition (Firefox/Safari) or when the mic genuinely isn't working. */
  function speakCheckWidget(expectedEn, {
    onPass,
    checkLabel = '🎤 Check My Speaking! 말하기 확인하기',
    passLabel = '✔ Done! 말했어요',
    // Escape hatch shown alongside the mic. Deliberately does NOT assume a
    // teacher is present: from Unit 11 on, students work through these
    // on their own, so "my teacher heard me" would be the wrong prompt.
    fallbackLabel = '✔ I said it 말했어요',
  } = {}) {
    const wrap = el('div', { class: 'speak-check' });
    const statusEl = el('div', { class: 'speak-check-status' });
    const btnRow = el('div', { class: 'row', style: 'justify-content:center;' });
    let passed = false;

    function markPassed(auto) {
      if (passed) return;
      passed = true;
      wrap.classList.add('passed');
      statusEl.innerHTML = '';
      statusEl.appendChild(el('span', { class: 'speak-check-pass' }, auto ? '✅ Great job! You said it! 완벽해요!' : '✔ Marked done 완료 표시'));
      btnRow.innerHTML = '';
      if (typeof sparkleAt === 'function') sparkleAt(wrap, 12);
      if (onPass) onPass();
    }

    if (typeof SpeechCheck !== 'undefined' && SpeechCheck.isSupported()) {
      const micBtn = el('button', { class: 'btn secondary small', type: 'button' }, checkLabel);
      micBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        micBtn.disabled = true;
        statusEl.textContent = '🎧 Listening... say it now! 듣고 있어요, 지금 말해보세요!';
        SpeechCheck.checkAgainst(expectedEn, {
          onPass: () => markPassed(true),
          onFail: (transcript) => {
            micBtn.disabled = false;
            statusEl.innerHTML = '';
            statusEl.appendChild(el('div', { class: 'speak-check-fail' }, `🔁 Almost! I heard: "${transcript || '...'}" — try again! 다시 말해볼까요?`));
          },
          onError: (err) => {
            micBtn.disabled = false;
            statusEl.textContent = err === 'not-allowed'
              ? '🎙️ Please allow the microphone, then tap again. 마이크를 허용해주세요.'
              : "🔇 Didn't catch that — tap and try again. 다시 눌러서 말해보세요.";
          },
        });
      });
      btnRow.appendChild(micBtn);
      wrap.appendChild(btnRow);
      wrap.appendChild(statusEl);
      const fallback = el('button', { class: 'btn ghost small', type: 'button' }, fallbackLabel);
      fallback.addEventListener('click', (e) => { e.stopPropagation(); markPassed(false); });
      wrap.appendChild(el('div', { class: 'center', style: 'margin-top:6px;' }, fallback));
    } else {
      const manualBtn = el('button', { class: 'btn success small', type: 'button' }, passLabel);
      manualBtn.addEventListener('click', (e) => { e.stopPropagation(); markPassed(false); });
      btnRow.appendChild(manualBtn);
      wrap.appendChild(btnRow);
      wrap.appendChild(statusEl);
    }

    return wrap;
  }

  /* ---------------- Mystery box speaking activity ---------------- */
  function renderMysteryBoxes(container, items, { onAllDone, onBoxDone } = {}) {
    container.innerHTML = '';
    const grid = el('div', { class: 'mystery-grid' });
    let doneCount = 0;
    const status = el('p', { class: 'muted center' }, `0 / ${items.length} done 완료`);

    items.forEach((item, idx) => {
      const box = el('div', { class: 'mystery-box' }, '❓');
      box.addEventListener('click', () => {
        if (box.classList.contains('opened')) return;
        box.classList.add('opened');
        box.innerHTML = '';
        box.appendChild(el('div', {}, item.emoji));
        box.appendChild(el('div', { class: 'mystery-sentence' }, item.sentenceKr));
        const sayBtn = el('button', { class: 'btn secondary small', type: 'button' }, '🔊 Listen');
        sayBtn.addEventListener('click', (e) => { e.stopPropagation(); EnglishVoice.speak(item.sentenceEn); });
        box.appendChild(sayBtn);
        box.appendChild(speakCheckWidget(item.sentenceEn, {
          onPass: () => {
            if (!box.classList.contains('done')) {
              box.classList.add('done');
              doneCount++;
              status.textContent = `${doneCount} / ${items.length} done 완료`;
              if (typeof sparkleAt === 'function') sparkleAt(box);
              if (onBoxDone) onBoxDone(idx);
              if (doneCount === items.length && onAllDone) onAllDone();
            }
          },
        }));
        EnglishVoice.speak(item.sentenceEn);
      });
      grid.appendChild(box);
    });

    container.appendChild(grid);
    container.appendChild(status);
  }

  /* ---------------- Speaking prompt deck (interview style) ---------------- */
  function renderPromptDeck(container, items, { onNext } = {}) {
    const order = shuffle(items);
    let index = 0;
    container.innerHTML = '';
    const counter = el('p', { class: 'step-label center' }, '');
    const cardWrap = el('div', {});
    const controls = el('div', { class: 'center', style: 'margin-top:10px;' });

    function renderCard() {
      counter.textContent = `Card ${index + 1} / ${order.length}`;
      cardWrap.innerHTML = '';
      const item = order[index];
      const card = el('div', { class: 'prompt-card' }, [
        el('div', { class: 'prompt-en' }, item.en),
        el('div', { class: 'prompt-kr' }, item.kr),
        el('div', { style: 'margin-top:14px;' }, speakBtn(item.en)),
        item.hintEn ? el('div', { class: 'answer-hint' }, `👉 ${item.hintEn} (${item.hintKr})`) : null,
      ]);
      cardWrap.appendChild(card);
    }

    const nextBtn = el('button', {
      class: 'btn', type: 'button',
      onclick: () => { index = (index + 1) % order.length; renderCard(); if (onNext) onNext(index); },
    }, 'New Question ➜ 다음 질문');

    controls.appendChild(nextBtn);
    container.appendChild(counter);
    container.appendChild(cardWrap);
    container.appendChild(controls);
    renderCard();
  }

  return {
    shuffle, el, speakBtn, iconNode, speakCheckWidget,
    renderFlashcards,
    renderListenAndClick,
    renderMultipleChoiceQuiz,
    renderQAPairs,
    renderSentenceBuilderSet,
    renderMysteryBoxes,
    renderPromptDeck,
  };
})();
