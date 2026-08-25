/* ============================================================
   RoleplayBuilder — the Intermediate/Advanced unit engine.

   Beginner units (UnitBuilder) teach isolated words and single
   sentence patterns. From Unit 11 on, the goal shifts to holding a
   real conversation, so a unit is no longer a series of drills but
   a set of SCENES: multi-turn dialogues with a character, built out
   of vocabulary the student already met in the Beginner tier.

   Each turn is: the character says something -> the student picks
   how to reply -> the student must actually SAY that reply out loud,
   verified by SpeechCheck. That last step is what makes the tier
   self-paced: no teacher has to be listening for the student to
   know whether they got it right.

   Reuses the shared chrome (LessonEngine, PointsTracker, Scoreboard,
   Activities.speakCheckWidget) so these units feel continuous with
   the Beginner ones, and renders the student's own Avatar as their
   chat portrait so the character they built shows up in the story.
   ============================================================ */

const RoleplayBuilder = (() => {
  const { el } = Activities;

  /* ---------------- welcome ---------------- */

  function buildWelcome(config) {
    const section = el('section', { id: 'screen-welcome', class: 'screen active' });
    const hero = el('div', { class: 'welcome-hero' });
    const bubbles = el('div', { class: 'bubble-field' });
    [[6, 26, 0], [18, 16, 1.2], [30, 34, 2.4], [45, 20, 0.6], [58, 28, 3.2], [70, 18, 1.8], [82, 24, 2.9], [92, 14, 0.3]].forEach(([left, size, delay]) => {
      bubbles.appendChild(el('span', { class: 'bubble', style: `left:${left}%;width:${size}px;height:${size}px;animation-delay:${delay}s;` }));
    });
    hero.appendChild(bubbles);

    hero.appendChild(el('div', { class: 'hero-content' }, [
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
      el('button', { class: 'btn', id: 'startBtn', type: 'button' }, ["Let's Talk! 💬 ", el('span', { class: 'kr', style: 'font-size:0.8em;font-weight:600;' }, '대화 시작하기')]),
    ]));
    section.appendChild(hero);

    section.appendChild(el('div', { class: 'card', style: 'margin-top:20px;' }, [
      el('h3', {}, ["Today's conversation ", el('span', { class: 'kr' }, '· 오늘의 대화')]),
      el('p', { class: 'learn-list-en' }, config.learnListEn),
      el('p', { class: 'learn-list-kr kr' }, config.learnListKr),
    ]));

    // Speech recognition is what makes this tier self-checking, so say
    // up front when it won't be available rather than letting a student
    // hit a dead mic button mid-conversation.
    if (typeof SpeechCheck !== 'undefined' && !SpeechCheck.isSupported()) {
      section.appendChild(el('div', { class: 'card notice-card', style: 'margin-top:14px;' }, [
        el('p', {}, [
          el('strong', {}, '🎙️ Speaking check is off in this browser.'),
          el('br'),
          'You can still do the whole lesson — just say each line out loud and tap the ✔ button yourself.',
          el('br'),
          el('span', { class: 'kr', style: 'font-size:0.85rem;' }, '이 브라우저는 음성 인식을 지원하지 않아요. Chrome을 쓰면 자동으로 확인해줘요!'),
        ]),
      ]));
    }
    return section;
  }

  /* ---------------- warm-up: words you already know ----------------
     Intermediate deliberately introduces very little new vocabulary.
     This screen surfaces the Beginner words the coming scenes reuse,
     so the student starts from recognition rather than cold recall. */

  function buildWarmup(config) {
    const section = el('section', { id: 'screen-warmup', class: 'screen' });
    section.appendChild(el('span', { class: 'screen-kicker' }, 'WARM-UP · 워밍업'));
    section.appendChild(el('span', { class: 'time-badge' }, '⏱ 3min'));
    section.appendChild(el('h2', {}, ['Words You Already Know ', el('span', { class: 'kr' }, '이미 아는 단어들')]));
    section.appendChild(el('p', { class: 'instruction' }, [
      el('span', { class: 'instr-en' }, 'You learned these in earlier units. Tap each one to hear it — we will use them in today\'s conversation!'),
      el('span', { class: 'instr-kr kr' }, '이전 유닛에서 배운 단어예요. 눌러서 들어보고, 오늘 대화에서 사용해요!'),
    ]));
    section.appendChild(el('div', { id: 'warmupBody' }));
    return section;
  }

  /* ---------------- a scene ---------------- */

  function buildScene(scene, index) {
    const section = el('section', { id: scene.id, class: 'screen' });
    section.appendChild(el('span', { class: 'screen-kicker' }, `SCENE ${index + 1} · 장면 ${index + 1}`));
    section.appendChild(el('span', { class: 'time-badge' }, `⏱ ${scene.timeMin || 5}min`));
    section.appendChild(el('h2', {}, [scene.titleEn, ' ', el('span', { class: 'kr' }, scene.titleKr)]));

    section.appendChild(el('div', { class: 'scene-setting' }, [
      el('span', { class: 'scene-setting-emoji' }, scene.setting || '💬'),
      el('div', {}, [
        el('div', { class: 'scene-setting-en' }, scene.settingEn),
        el('div', { class: 'scene-setting-kr kr' }, scene.settingKr),
      ]),
    ]));

    section.appendChild(el('div', { class: 'chat-log', id: `${scene.id}Log` }));
    section.appendChild(el('div', { class: 'chat-actions', id: `${scene.id}Actions` }));
    return section;
  }

  /* ---------------- finish ---------------- */

  function buildFinish(config) {
    const section = el('section', { id: 'screen-finish', class: 'screen' });
    const hero = el('div', { class: 'score-hero card' });
    const bubbles = el('div', { class: 'bubble-field' });
    [[8, 22, 0.4], [22, 14, 1.6], [36, 30, 2.8], [52, 18, 0.9], [66, 26, 2.1], [80, 16, 3.4], [90, 22, 1.1]].forEach(([left, size, delay]) => {
      bubbles.appendChild(el('span', { class: 'bubble', style: `left:${left}%;width:${size}px;height:${size}px;animation-delay:${delay}s;` }));
    });
    hero.appendChild(bubbles);

    hero.appendChild(el('div', { class: 'hero-content' }, [
      el('span', { class: 'big-emoji' }, '🎙️'),
      el('h2', { id: 'finishHeading' }, 'Great Talking!'),
      el('p', {}, [
        el('span', { class: 'subtitle-en' }, 'You held a whole conversation in English!'),
        el('span', { class: 'subtitle-kr kr' }, '영어로 대화를 끝까지 해냈어요!'),
      ]),
      el('div', { class: 'score-num', id: 'finalScoreText' }, '-'),
      el('div', { class: 'compare-line', id: 'compareLine' }),
      el('div', { class: 'intro-card complete', style: 'text-align:left;' }, [
        el('div', { class: 'intro-card-kicker center' }, '💬 LINES YOU SAID TODAY · 오늘 말한 문장'),
        el('div', { id: 'saidLines' }),
      ]),
      el('div', { class: 'row', style: 'justify-content:center; margin-top:16px;' }, [
        el('button', { class: 'btn ghost', id: 'replayBtn', type: 'button' }, ['↺ Replay ', el('span', { class: 'kr', style: 'font-size:0.8em;' }, '다시 하기')]),
        el('a', { class: 'btn secondary', href: '../../character.html' }, ['🎮 My Character ', el('span', { class: 'kr', style: 'font-size:0.8em;' }, '내 캐릭터')]),
        el('a', { class: 'btn', href: '../../index.html' }, ['🏠 Home ', el('span', { class: 'kr', style: 'font-size:0.8em;' }, '홈으로')]),
      ]),
      el('h3', { style: 'margin-top:28px;' }, ['🏅 Leaderboard ', el('span', { class: 'kr', style: 'font-size:0.8rem;' }, '이 기기의 랭킹')]),
      el('div', { id: 'leaderboardWrap' }),
    ]));
    section.appendChild(hero);
    return section;
  }

  /* ---------------- render ---------------- */

  function render(config) {
    document.title = `${config.headingEn} | Interactive English Sessions`;
    const root = document.getElementById('lessonRoot');
    root.appendChild(buildWelcome(config));
    root.appendChild(buildWarmup(config));
    config.scenes.forEach((scene, i) => root.appendChild(buildScene(scene, i)));
    root.appendChild(buildFinish(config));

    const steps = [
      { id: 'screen-welcome', label: 'Welcome' },
      { id: 'screen-warmup', label: 'Warm-up' },
      ...config.scenes.map((s, i) => ({ id: s.id, label: s.titleEn || `Scene ${i + 1}` })),
      { id: 'screen-finish', label: 'Finish' },
    ];
    document.getElementById('stepLabel').textContent = `1 / ${steps.length}`;

    const engine = new LessonEngine(steps);
    const points = new PointsTracker(document.getElementById('pointsNum'), document.getElementById('pointsChip'));

    const nameInput = document.getElementById('studentNameInput');
    nameInput.value = Scoreboard.getSavedName();
    document.getElementById('startBtn').addEventListener('click', () => {
      Scoreboard.saveName(nameInput.value.trim() || 'Friend');
      engine.next();
    });
    document.getElementById('replayBtn').addEventListener('click', () => window.location.reload());

    // Every line the student successfully said, for the finish recap.
    const saidLines = [];

    const rendered = {};
    function once(id, fn) { if (!rendered[id]) { rendered[id] = true; fn(); } }

    document.addEventListener('lesson:screenchange', (e) => {
      if (e.detail.id === 'screen-warmup') {
        once('screen-warmup', () => {
          Activities.renderFlashcards(document.getElementById('warmupBody'), config.warmupVocab);
        });
        return;
      }
      if (e.detail.id === 'screen-finish') { renderFinish(); return; }

      const scene = config.scenes.find(s => s.id === e.detail.id);
      if (scene) once(scene.id, () => runScene(scene));
    });

    /* ---- the conversation loop ---- */
    function runScene(scene) {
      const log = document.getElementById(`${scene.id}Log`);
      const actions = document.getElementById(`${scene.id}Actions`);
      const studentName = Scoreboard.getSavedName() || 'Friend';
      let turnIndex = 0;

      function npcBubble(turn) {
        const row = el('div', { class: 'chat-row npc' }, [
          el('div', { class: 'chat-avatar' }, scene.npc.emoji),
          el('div', { class: 'chat-bubble' }, [
            el('div', { class: 'chat-name' }, scene.npc.nameEn),
            el('div', { class: 'chat-en' }, turn.npcEn),
            el('div', { class: 'chat-kr kr' }, turn.npcKr),
            el('div', { class: 'chat-replay' }, Activities.speakBtn(turn.npcEn)),
          ]),
        ]);
        log.appendChild(row);
        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        EnglishVoice.speak(turn.npcEn);
      }

      function studentBubble(reply) {
        const portrait = el('div', { class: 'chat-avatar student' });
        // Show the student's own voxel avatar as their portrait when the
        // engine is loaded; fall back to a plain emoji if it isn't.
        if (typeof Avatar !== 'undefined') {
          const mini = el('div', { class: 'chat-avatar-rig' });
          const built = Avatar.buildRig(mini);
          Avatar.applyConfig(built, Avatar.load());
          portrait.appendChild(mini);
        } else {
          portrait.textContent = '🙂';
        }
        const row = el('div', { class: 'chat-row student' }, [
          el('div', { class: 'chat-bubble' }, [
            el('div', { class: 'chat-name' }, studentName),
            el('div', { class: 'chat-en' }, reply.en),
            el('div', { class: 'chat-kr kr' }, reply.kr),
          ]),
          portrait,
        ]);
        log.appendChild(row);
        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return row;
      }

      function askForReply(turn) {
        actions.innerHTML = '';
        actions.appendChild(el('p', { class: 'chat-prompt' }, [
          el('span', { class: 'instr-en' }, 'How do you reply?'),
          el('span', { class: 'instr-kr kr' }, '어떻게 대답할까요?'),
        ]));
        const grid = el('div', { class: 'reply-grid' });
        turn.replies.forEach(reply => {
          const btn = el('button', { class: 'reply-btn', type: 'button' }, [
            el('span', { class: 'reply-en' }, reply.en),
            el('span', { class: 'reply-kr kr' }, reply.kr),
          ]);
          btn.addEventListener('click', () => {
            [...grid.children].forEach(b => (b.disabled = true));
            EnglishVoice.speak(reply.en);
            if (reply.best) points.add(scene.pointsPerReply || 10);
            studentBubble(reply);
            askToSayIt(turn, reply);
          });
          grid.appendChild(btn);
        });
        actions.appendChild(grid);
      }

      function askToSayIt(turn, reply) {
        actions.innerHTML = '';
        actions.appendChild(el('p', { class: 'chat-prompt' }, [
          el('span', { class: 'instr-en' }, '🎤 Now SAY your line out loud!'),
          el('span', { class: 'instr-kr kr' }, '이제 그 문장을 큰 소리로 말해보세요!'),
        ]));
        actions.appendChild(Activities.speakCheckWidget(reply.en, {
          checkLabel: '🎤 Say My Line 내 대사 말하기',
          onPass: () => {
            points.add(scene.pointsPerSpoken || 15);
            saidLines.push(reply);
            if (typeof sparkleAt === 'function') sparkleAt(actions, 10);
            turnIndex++;
            setTimeout(nextTurn, 500);
          },
        }));
      }

      function nextTurn() {
        if (turnIndex >= scene.turns.length) return endScene();
        const turn = scene.turns[turnIndex];
        npcBubble(turn);
        setTimeout(() => askForReply(turn), 600);
      }

      function endScene() {
        actions.innerHTML = '';
        fireConfetti(900);
        actions.appendChild(el('div', { class: 'feedback-banner show good' },
          `🎉 Scene complete! Tap "Next ➜" below to continue. 장면 완료! 아래 "Next"를 눌러 계속해요.`));
        if (scene.wrapUpEn) {
          actions.appendChild(el('div', { class: 'scene-wrapup' }, [
            el('div', { class: 'scene-wrapup-en' }, scene.wrapUpEn),
            el('div', { class: 'scene-wrapup-kr kr' }, scene.wrapUpKr),
          ]));
        }
      }

      nextTurn();
    }

    function renderFinish() {
      once('screen-finish', () => {
        const name = Scoreboard.getSavedName() || 'Friend';
        document.getElementById('finishHeading').textContent = `Great Talking, ${name}!`;
        document.getElementById('finalScoreText').textContent = `${points.total} pt`;

        const wrap = document.getElementById('saidLines');
        wrap.innerHTML = '';
        if (saidLines.length) {
          saidLines.forEach(line => {
            wrap.appendChild(el('div', { class: 'said-line' }, [
              el('div', { class: 'said-line-en' }, `“${line.en}”`),
              el('div', { class: 'said-line-kr kr' }, line.kr),
            ]));
          });
        } else {
          wrap.appendChild(el('p', { class: 'muted' }, 'Replay the scenes to practice your lines! 장면을 다시 해보며 연습해요!'));
        }

        const stats = Scoreboard.getStats(config.unitId);
        const entry = Scoreboard.addEntry(config.unitId, { name, points: points.total });
        Scoreboard.markComplete(config.unitId, points.total);
        renderCompareLine(document.getElementById('compareLine'), points.total, stats);
        renderLeaderboard(document.getElementById('leaderboardWrap'), config.unitId, entry.id);
      });
    }
  }

  return { render };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (window.ROLEPLAY_CONFIG) RoleplayBuilder.render(window.ROLEPLAY_CONFIG);
});
