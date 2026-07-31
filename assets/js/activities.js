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

  /* ---------------- Flashcards (both languages shown together) ---------------- */
  function renderFlashcards(container, items) {
    container.innerHTML = '';
    const grid = el('div', { class: 'flash-grid' });
    items.forEach(item => {
      const card = el('div', { class: 'flashcard' });
      const inner = el('div', { class: 'flashcard-inner' });
      const front = el('div', { class: 'flash-face flash-front' }, [
        el('div', { class: 'emoji' }, item.emoji),
        el('div', { class: 'word-en' }, item.en),
        el('div', { class: 'word-kr' }, item.kr),
        speakBtn(item.en),
      ]);
      const back = el('div', { class: 'flash-face flash-back' }, [
        el('div', { class: 'example-en' }, item.exampleEn || item.en),
        el('div', { class: 'example-kr' }, item.exampleKr || item.kr),
        el('div', { class: 'hint' }, '👆 다시 눌러서 돌아가기'),
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
      el('button', { class: 'btn secondary small', type: 'button', onclick: () => replay() }, ['🔊 ', el('span', {}, '다시 듣기')]),
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
          choice.emoji,
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
        feedback.textContent = '✅ 정답이에요! Great job!';
        feedback.className = 'feedback-banner show good';
      } else {
        [...grid.children].find(b => b.textContent.includes(target.en))?.classList.add('correct');
        feedback.textContent = `❌ 다시 들어볼까요? Answer: ${target.en}`;
        feedback.className = 'feedback-banner show bad';
      }
      if (onAnswer) onAnswer(correct);
      setTimeout(() => {
        roundIndex++;
        if (roundIndex < order.length) {
          renderRound();
        } else {
          container.innerHTML = '';
          container.appendChild(el('div', { class: 'feedback-banner show good' }, `🎉 ${score} / ${order.length} 완료!`));
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
            feedback.textContent = '✅ 맞았어요! Correct!';
            feedback.className = 'feedback-banner show good';
          } else {
            btn.classList.add('wrong');
            [...grid.children].find((b, i) => q.options[i].correct)?.classList.add('correct');
            feedback.textContent = '❌ 다시 확인해볼까요!';
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
          }, index < questions.length - 1 ? '다음 문제 ➜' : '결과 보기 🎉');
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

  /* ---------------- Sentence builder (click word tiles in order) ---------------- */
  function renderSentenceBuilderSet(container, items, { onComplete, onItemComplete } = {}) {
    let index = 0;

    function renderItem() {
      container.innerHTML = '';
      const item = items[index];
      container.appendChild(el('div', { class: 'step-label' }, `Sentence ${index + 1} / ${items.length}`));
      container.appendChild(el('div', { class: 'center', style: 'font-size:3.2rem;margin:6px 0;' }, item.emoji));
      if (item.kr) container.appendChild(el('p', { class: 'muted kr center' }, item.kr));

      const target = el('div', { class: 'sentence-target' });
      const bank = el('div', { class: 'sentence-bank' });
      const feedback = el('div', { class: 'feedback-banner' });
      const controls = el('div', { class: 'row', style: 'margin-top:16px;' });

      const placed = [];
      const tileEls = shuffle(item.words.map((w, i) => ({ word: w, id: i }))).map(({ word, id }) => {
        const tile = el('button', { class: 'word-tile', type: 'button' }, word);
        tile.addEventListener('click', () => {
          if (tile.classList.contains('used')) return;
          tile.classList.add('used');
          placed.push({ word, id, tile });
          target.appendChild(el('span', { class: 'word-tile placed' }, word));
        });
        tile.dataset.id = id;
        return tile;
      });
      tileEls.forEach(t => bank.appendChild(t));

      const resetBtn = el('button', { class: 'btn ghost small', type: 'button', onclick: () => renderItem() }, '↺ 다시하기');
      const checkBtn = el('button', {
        class: 'btn small', type: 'button',
        onclick: () => {
          const built = placed.map(p => p.word).join(' ');
          const answer = item.words.join(' ');
          if (built === answer) {
            feedback.textContent = '✅ 완벽해요! Perfect sentence!';
            feedback.className = 'feedback-banner show good';
            EnglishVoice.speak(answer);
            if (onItemComplete) onItemComplete(index);
            const nextBtn = el('button', {
              class: 'btn success', type: 'button',
              onclick: () => {
                index++;
                if (index < items.length) renderItem();
                else if (onComplete) onComplete();
              },
            }, index < items.length - 1 ? '다음 ➜' : '다음 활동으로 🎉');
            controls.appendChild(nextBtn);
          } else {
            feedback.textContent = '❌ 순서를 다시 확인해봐요!';
            feedback.className = 'feedback-banner show bad';
          }
        },
      }, '확인 Check');

      controls.appendChild(checkBtn);
      controls.appendChild(resetBtn);

      container.appendChild(target);
      container.appendChild(bank);
      container.appendChild(feedback);
      container.appendChild(controls);
    }

    renderItem();
  }

  /* ---------------- Mystery box speaking activity ---------------- */
  function renderMysteryBoxes(container, items, { onAllDone, onBoxDone } = {}) {
    container.innerHTML = '';
    const grid = el('div', { class: 'mystery-grid' });
    let doneCount = 0;
    const status = el('p', { class: 'muted center' }, `0 / ${items.length} 완료`);

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
        const doneBtn = el('button', { class: 'btn success small', type: 'button' }, '✔ 말했어요!');
        doneBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (!box.classList.contains('done')) {
            box.classList.add('done');
            doneCount++;
            status.textContent = `${doneCount} / ${items.length} 완료`;
            if (onBoxDone) onBoxDone(idx);
            if (doneCount === items.length && onAllDone) onAllDone();
          }
        });
        box.appendChild(sayBtn);
        box.appendChild(doneBtn);
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
    }, '다음 질문 New Question ➜');

    controls.appendChild(nextBtn);
    container.appendChild(counter);
    container.appendChild(cardWrap);
    container.appendChild(controls);
    renderCard();
  }

  return {
    shuffle, el, speakBtn,
    renderFlashcards,
    renderListenAndClick,
    renderMultipleChoiceQuiz,
    renderQAPairs,
    renderSentenceBuilderSet,
    renderMysteryBoxes,
    renderPromptDeck,
  };
})();
