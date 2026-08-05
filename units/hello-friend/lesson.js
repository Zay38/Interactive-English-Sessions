/* ============================================================
   Unit 2: Hello, Friend! — content + screen wiring
   Level: Beg (1-2학년 눈높이) · ~20-25분 세션 기준으로 구성
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const UNIT_ID = 'hello-friend';

  /* ---------------- Content data ---------------- */

  const greetingVocab = [
    { emoji: '👋', en: 'hello', kr: '안녕하세요', exampleEn: 'Hello! Nice to meet you!', exampleKr: '안녕하세요! 만나서 반가워요!' },
    { emoji: '🙋', en: 'hi', kr: '안녕', exampleEn: 'Hi! How are you?', exampleKr: '안녕! 잘 지내?' },
    { emoji: '🚶', en: 'bye', kr: '안녕 (헤어질 때)', exampleEn: 'Bye! See you later!', exampleKr: '안녕! 또 만나요!' },
    { emoji: '🧑‍🤝‍🧑', en: 'friend', kr: '친구', exampleEn: 'This is my friend.', exampleKr: '이 사람은 내 친구예요.' },
    { emoji: '📛', en: 'name', kr: '이름', exampleEn: "What's your name?", exampleKr: '이름이 뭐예요?' },
    { emoji: '👍', en: 'nice', kr: '좋은/멋진', exampleEn: 'Nice to meet you!', exampleKr: '만나서 반가워요!' },
    { emoji: '🌅', en: 'morning', kr: '아침', exampleEn: 'Good morning!', exampleKr: '좋은 아침이에요!' },
    { emoji: '🙏', en: 'thanks', kr: '고마워', exampleEn: 'Thank you!', exampleKr: '고마워요!' },
  ];

  const likesVocab = [
    { emoji: '🍕', en: 'pizza', kr: '피자', exampleEn: 'I like pizza.', exampleKr: '나는 피자를 좋아해요.' },
    { emoji: '🐶', en: 'dogs', kr: '강아지', exampleEn: 'I like dogs.', exampleKr: '나는 강아지를 좋아해요.' },
    { emoji: '🐱', en: 'cats', kr: '고양이', exampleEn: 'I like cats.', exampleKr: '나는 고양이를 좋아해요.' },
    { emoji: '⚽', en: 'soccer', kr: '축구', exampleEn: 'I like soccer.', exampleKr: '나는 축구를 좋아해요.' },
    { emoji: '📚', en: 'books', kr: '책', exampleEn: 'I like books.', exampleKr: '나는 책을 좋아해요.' },
    { emoji: '🍦', en: 'ice cream', kr: '아이스크림', exampleEn: 'I like ice cream.', exampleKr: '나는 아이스크림을 좋아해요.' },
    { emoji: '🎵', en: 'music', kr: '음악', exampleEn: 'I like music.', exampleKr: '나는 음악을 좋아해요.' },
    { emoji: '🏫', en: 'school', kr: '학교', exampleEn: 'I like school.', exampleKr: '나는 학교를 좋아해요.' },
  ];

  const checkinOptions = [
    { emoji: '👋', en: 'Hello!', kr: '안녕하세요!' },
    { emoji: '🙋', en: 'Hi!', kr: '안녕!' },
    { emoji: '🌅', en: 'Good morning!', kr: '좋은 아침!' },
    { emoji: '🙏', en: 'Thank you!', kr: '고마워요!' },
    { emoji: '🚶', en: 'Bye!', kr: '안녕! (헤어질 때)' },
  ];

  const sentenceBuilderGreetings = [
    { emoji: '🙋', kr: '내 이름은 민준이야.', words: ['My', 'name', 'is', 'Minjun', '.'] },
    { emoji: '👋', kr: '만나서 반가워!', words: ['Nice', 'to', 'meet', 'you', '!'] },
    { emoji: '🌅', kr: '좋은 아침이에요!', words: ['Good', 'morning', '!'] },
  ];

  const sentenceBuilderLikes = [
    { emoji: '🍕', kr: '나는 피자를 좋아해.', words: ['I', 'like', 'pizza', '.'] },
    { emoji: '🐶', kr: '나는 강아지를 좋아해.', words: ['I', 'like', 'dogs', '.'] },
  ];

  const greetingQAPairs = [
    { qEn: "What's your name?", qKr: '이름이 뭐예요?', aEn: 'My name is Minjun.', aKr: '내 이름은 민준이에요.' },
    { qEn: 'How are you?', qKr: '잘 지내요?', aEn: "I'm happy!", aKr: '나는 행복해요!' },
  ];

  const likesQAPairs = [
    { qEn: 'What do you like?', qKr: '무엇을 좋아해요?', aEn: 'I like pizza.', aKr: '나는 피자를 좋아해요.' },
    { qEn: "What's your name?", qKr: '이름이 뭐예요?', aEn: 'My name is Minjun.', aKr: '내 이름은 민준이에요.' },
  ];

  const qaMatchQuestions = [
    {
      emoji: '🙋', stemEn: 'Question: "What\'s your name?"', stemKr: '이름을 물어봤어요. 어떻게 대답할까요?',
      options: [
        { label: 'My name is Minjun.', correct: true },
        { label: 'I like pizza.', correct: false },
        { label: 'Good morning.', correct: false },
      ],
    },
    {
      emoji: '🍕', stemEn: 'Question: "What do you like?"', stemKr: '무엇을 좋아하는지 물어봤어요. 어떻게 대답할까요?',
      options: [
        { label: 'My name is Minjun.', correct: false },
        { label: 'I like pizza.', correct: true },
        { label: 'Nice to meet you.', correct: false },
      ],
    },
    {
      emoji: '👋', stemEn: 'Question: "How are you?"', stemKr: '잘 지내는지 물어봤어요. 어떻게 대답할까요?',
      options: [
        { label: 'I like dogs.', correct: false },
        { label: 'My name is Minjun.', correct: false },
        { label: "I'm happy.", correct: true },
      ],
    },
  ];

  const mysteryItems = [
    { emoji: '🙋‍♀️', sentenceEn: 'Hi! My name is Sujin. I like cats.', sentenceKr: '안녕! 내 이름은 수진이야. 나는 고양이를 좋아해.' },
    { emoji: '🙋‍♂️', sentenceEn: 'Hello! My name is Jiho. I like soccer.', sentenceKr: '안녕하세요! 내 이름은 지호예요. 나는 축구를 좋아해요.' },
    { emoji: '🧑', sentenceEn: 'Hi! My name is Alex. I like books.', sentenceKr: '안녕! 내 이름은 알렉스야. 나는 책을 좋아해.' },
    { emoji: '👧', sentenceEn: 'Hello! My name is Yuna. I like ice cream.', sentenceKr: '안녕하세요! 내 이름은 유나예요. 나는 아이스크림을 좋아해요.' },
    { emoji: '👦', sentenceEn: 'Hi! My name is Minho. I like dogs.', sentenceKr: '안녕! 내 이름은 민호야. 나는 강아지를 좋아해.' },
    { emoji: '🙋', sentenceEn: 'Hello! My name is Emma. I like music.', sentenceKr: '안녕하세요! 내 이름은 엠마예요. 나는 음악을 좋아해요.' },
  ];

  const interviewPrompts = [
    { en: "What's your name?", kr: '이름이 뭐예요?', hintEn: 'Answer with: My name is ___.', hintKr: '내 이름은 ___예요' },
    { en: 'What do you like?', kr: '무엇을 좋아해요?', hintEn: 'Answer with: I like ___.', hintKr: '나는 ___를 좋아해요' },
    { en: 'Do you like dogs or cats?', kr: '강아지가 좋아요, 고양이가 좋아요?', hintEn: 'Answer with: I like ___.', hintKr: '나는 ___를 좋아해요' },
    { en: 'How are you today?', kr: '오늘 기분이 어때요?', hintEn: 'Answer with: I am ___.', hintKr: '나는 ___해요' },
    { en: 'What do you like at school?', kr: '학교에서 뭘 좋아해요?', hintEn: 'Answer with: I like ___.', hintKr: '나는 ___를 좋아해요' },
    { en: "What's your friend's name?", kr: '친구 이름이 뭐예요?', hintEn: "Answer with: My friend's name is ___.", hintKr: '내 친구 이름은 ___예요' },
  ];

  const finalQuizQuestions = [
    {
      emoji: '👋', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?',
      options: [{ label: 'hello', correct: true }, { label: 'bye', correct: false }, { label: 'thanks', correct: false }],
    },
    {
      emoji: '🍕', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?',
      options: [{ label: 'dogs', correct: false }, { label: 'pizza', correct: true }, { label: 'books', correct: false }],
    },
    {
      emoji: '🙋', stemEn: 'Choose the correct greeting.', stemKr: '알맞은 인사말을 고르세요.',
      options: [{ label: 'Good night.', correct: false }, { label: 'Hello! Nice to meet you!', correct: true }, { label: 'I like pizza.', correct: false }],
    },
    {
      emoji: '📛', stemEn: 'Question: "What\'s your name?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.',
      options: [{ label: 'I like soccer.', correct: false }, { label: 'My name is Minjun.', correct: true }, { label: 'Good morning.', correct: false }],
    },
    {
      emoji: '🍦', stemEn: 'Question: "What do you like?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.',
      options: [{ label: 'I like books.', correct: true }, { label: 'My name is Minjun.', correct: false }, { label: 'Nice to meet you.', correct: false }],
    },
  ];

  /* ---------------- Screen steps ---------------- */

  const steps = [
    { id: 'screen-welcome', label: 'Welcome' },
    { id: 'screen-checkin', label: 'Warm-up' },
    { id: 'screen-vocab-greetings', label: 'Vocab: Greetings' },
    { id: 'screen-game-greetings', label: 'Game: Greetings' },
    { id: 'screen-grammar-greetings', label: 'Grammar: Name' },
    { id: 'screen-practice-greetings', label: 'Practice: Greetings' },
    { id: 'screen-vocab-likes', label: 'Vocab: Likes' },
    { id: 'screen-grammar-likes', label: 'Grammar: Likes' },
    { id: 'screen-practice-likes', label: 'Practice: Likes' },
    { id: 'screen-speak-mystery', label: 'Speaking: Mystery Box' },
    { id: 'screen-speak-interview', label: 'Speaking: Interview' },
    { id: 'screen-quiz-final', label: 'Final Quiz' },
    { id: 'screen-finish', label: 'Finish' },
  ];

  const engine = new LessonEngine(steps);
  const points = new PointsTracker(document.getElementById('pointsNum'), document.getElementById('pointsChip'));

  /* ---------------- Name capture ---------------- */

  const nameInput = document.getElementById('studentNameInput');
  nameInput.value = Scoreboard.getSavedName();

  document.getElementById('startBtn').addEventListener('click', () => {
    const name = nameInput.value.trim() || 'Friend';
    Scoreboard.saveName(name);
    engine.next();
  });
  document.getElementById('replayBtn').addEventListener('click', () => window.location.reload());

  /* ---------------- Static content (rendered once) ---------------- */

  Activities.renderFlashcards(document.getElementById('greetingFlashcards'), greetingVocab);
  Activities.renderFlashcards(document.getElementById('likesFlashcards'), likesVocab);
  Activities.renderQAPairs(document.getElementById('greetingQAPairs'), greetingQAPairs);
  Activities.renderQAPairs(document.getElementById('likesQAPairs'), likesQAPairs);

  function exampleRow(container, en, kr) {
    const row = Activities.el('div', { class: 'example-row' }, [
      Activities.speakBtn(en),
      Activities.el('div', { class: 'example-text' }, [
        Activities.el('div', { class: 'en' }, en),
        Activities.el('div', { class: 'kr' }, kr),
      ]),
    ]);
    container.appendChild(row);
  }

  const greetingExamplesEl = document.getElementById('greetingExamples');
  exampleRow(greetingExamplesEl, 'Hello! Nice to meet you!', '안녕하세요! 만나서 반가워요!');
  exampleRow(greetingExamplesEl, "What's your name?", '이름이 뭐예요?');
  exampleRow(greetingExamplesEl, 'My name is Minjun.', '내 이름은 민준이에요.');

  const likesExamplesEl = document.getElementById('likesExamples');
  exampleRow(likesExamplesEl, 'I like pizza.', '나는 피자를 좋아해요.');
  exampleRow(likesExamplesEl, 'I like dogs.', '나는 강아지를 좋아해요.');
  exampleRow(likesExamplesEl, 'I like books.', '나는 책을 좋아해요.');

  // Check-in warm-up buttons
  const checkinGrid = document.getElementById('checkinGrid');
  let checkinAwarded = false;
  checkinOptions.forEach(opt => {
    const btn = Activities.el('button', { class: 'checkin-btn', type: 'button' }, [
      opt.emoji,
      Activities.el('span', { class: 'label-en' }, opt.en),
      Activities.el('span', { class: 'label kr' }, opt.kr),
    ]);
    btn.addEventListener('click', () => {
      [...checkinGrid.children].forEach(b => b.classList.remove('picked'));
      btn.classList.add('picked');
      EnglishVoice.speak(opt.en);
      if (!checkinAwarded) { checkinAwarded = true; points.add(5); }
    });
    checkinGrid.appendChild(btn);
  });

  /* ---------------- Lazy-rendered / randomized activities ---------------- */

  const renderedFlags = {};

  function renderOnce(screenId, fn) {
    if (renderedFlags[screenId]) return;
    renderedFlags[screenId] = true;
    fn();
  }

  document.addEventListener('lesson:screenchange', (e) => {
    const { id } = e.detail;

    if (id === 'screen-game-greetings') {
      renderOnce(id, () => {
        Activities.renderListenAndClick(document.getElementById('greetingGame'), greetingVocab, {
          rounds: 5,
          onAnswer: (correct) => { if (correct) points.add(10); },
        });
      });
    }

    if (id === 'screen-practice-greetings') {
      renderOnce(id, () => {
        Activities.renderSentenceBuilderSet(document.getElementById('sentenceBuilderGreetings'), sentenceBuilderGreetings, {
          onWordCorrect: () => points.add(2),
          onItemComplete: (i, perfect) => { points.add(perfect ? 15 : 8); if (perfect) fireConfetti(600); },
        });
      });
    }

    if (id === 'screen-practice-likes') {
      renderOnce(id, () => {
        const title = document.getElementById('practiceLikesTitle');
        const instrEn = document.getElementById('practiceLikesInstrEn');
        const instrKr = document.getElementById('practiceLikesInstrKr');
        const body = document.getElementById('practiceLikesBody');

        function startPhaseB() {
          title.innerHTML = 'Answer the Question! <span class="kr">질문에 대답하기</span>';
          instrEn.textContent = 'Now read the question and pick the right answer!';
          instrKr.textContent = '질문을 보고 알맞은 대답을 골라봐요!';
          Activities.renderMultipleChoiceQuiz(body, qaMatchQuestions, {
            onAnswer: (correct) => { if (correct) points.add(10); },
          });
        }

        Activities.renderSentenceBuilderSet(body, sentenceBuilderLikes, {
          onWordCorrect: () => points.add(2),
          onItemComplete: (i, perfect) => { points.add(perfect ? 15 : 8); if (perfect) fireConfetti(600); },
          onComplete: startPhaseB,
        });
      });
    }

    if (id === 'screen-speak-mystery') {
      renderOnce(id, () => {
        Activities.renderMysteryBoxes(document.getElementById('mysteryBoxes'), mysteryItems, {
          onBoxDone: () => points.add(10),
          onAllDone: () => fireConfetti(),
        });
      });
    }

    if (id === 'screen-speak-interview') {
      renderOnce(id, () => {
        let clicks = 0;
        Activities.renderPromptDeck(document.getElementById('interviewDeck'), interviewPrompts, {
          onNext: () => { clicks++; if (clicks <= 5) points.add(5); },
        });
      });
    }

    if (id === 'screen-quiz-final') {
      renderOnce(id, () => {
        Activities.renderMultipleChoiceQuiz(document.getElementById('finalQuiz'), finalQuizQuestions, {
          onAnswer: (correct) => { if (correct) points.add(20); },
          onComplete: (score, total) => {
            const starCount = Math.max(1, Math.round((score / total) * 5));
            document.getElementById('finalStars').textContent = '⭐'.repeat(starCount) + '☆'.repeat(5 - starCount);
            fireConfetti(2000);
            setTimeout(() => engine.next(), 900);
          },
        });
      });
    }

    if (id === 'screen-finish') {
      renderOnce(id, () => {
        const name = Scoreboard.getSavedName() || 'Friend';
        document.getElementById('finishHeading').textContent = `Great Job, ${name}!`;
        document.getElementById('finalScoreText').textContent = `${points.total} pt`;

        const stats = Scoreboard.getStats(UNIT_ID);
        const entry = Scoreboard.addEntry(UNIT_ID, { name, points: points.total });

        renderCompareLine(document.getElementById('compareLine'), points.total, stats);
        renderLeaderboard(document.getElementById('leaderboardWrap'), UNIT_ID, entry.id);
      });
    }
  });
});
