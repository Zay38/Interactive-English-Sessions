/* ============================================================
   Unit 2: All About Me! — content + screen wiring
   Level: Beg (1-2학년 눈높이) · ~20-25분 세션 기준으로 구성
   Main topic: Self-introduction. Capstone: a personalized
   "My Introduction" card the student builds and can take home.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const UNIT_ID = 'hello-friend';

  /* ---------------- Content data ---------------- */

  const numberVocab = [
    { emoji: '1️⃣', en: 'one', kr: '하나', exampleEn: 'I am one year old.', exampleKr: '저는 한 살이에요.' },
    { emoji: '2️⃣', en: 'two', kr: '둘', exampleEn: 'I am two years old.', exampleKr: '저는 두 살이에요.' },
    { emoji: '3️⃣', en: 'three', kr: '셋', exampleEn: 'I am three years old.', exampleKr: '저는 세 살이에요.' },
    { emoji: '4️⃣', en: 'four', kr: '넷', exampleEn: 'I am four years old.', exampleKr: '저는 네 살이에요.' },
    { emoji: '5️⃣', en: 'five', kr: '다섯', exampleEn: 'I am five years old.', exampleKr: '저는 다섯 살이에요.' },
    { emoji: '6️⃣', en: 'six', kr: '여섯', exampleEn: 'I am six years old.', exampleKr: '저는 여섯 살이에요.' },
    { emoji: '7️⃣', en: 'seven', kr: '일곱', exampleEn: 'I am seven years old.', exampleKr: '저는 일곱 살이에요.' },
    { emoji: '8️⃣', en: 'eight', kr: '여덟', exampleEn: 'I am eight years old.', exampleKr: '저는 여덟 살이에요.' },
    { emoji: '9️⃣', en: 'nine', kr: '아홉', exampleEn: 'I am nine years old.', exampleKr: '저는 아홉 살이에요.' },
    { emoji: '🔟', en: 'ten', kr: '열', exampleEn: 'I am ten years old.', exampleKr: '저는 열 살이에요.' },
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

  const sentenceBuilderAboutMe = [
    { emoji: '🙋', kr: '내 이름은 민준이야.', words: ['My', 'name', 'is', 'Minjun', '.'] },
    { emoji: '7️⃣', kr: '저는 일곱 살이에요.', words: ['I', 'am', 'seven', 'years', 'old', '.'] },
  ];

  const sentenceBuilderLikes = [
    { emoji: '🍕', kr: '나는 피자를 좋아해.', words: ['I', 'like', 'pizza', '.'] },
    { emoji: '🐶', kr: '나는 강아지를 좋아해.', words: ['I', 'like', 'dogs', '.'] },
  ];

  const aboutMeQAPairs = [
    { qEn: "What's your name?", qKr: '이름이 뭐예요?', aEn: 'My name is Minjun.', aKr: '내 이름은 민준이에요.' },
    { qEn: 'How old are you?', qKr: '몇 살이에요?', aEn: 'I am eight years old.', aKr: '저는 여덟 살이에요.' },
  ];

  const likesQAPairs = [
    { qEn: 'What do you like?', qKr: '무엇을 좋아해요?', aEn: 'I like pizza.', aKr: '나는 피자를 좋아해요.' },
  ];

  const qaMatchQuestions = [
    {
      emoji: '📛', stemEn: 'Question: "What\'s your name?"', stemKr: '이름을 물어봤어요. 어떻게 대답할까요?',
      options: [
        { label: 'My name is Minjun.', correct: true },
        { label: 'I am eight years old.', correct: false },
        { label: 'I like pizza.', correct: false },
      ],
    },
    {
      emoji: '🔢', stemEn: 'Question: "How old are you?"', stemKr: '나이를 물어봤어요. 어떻게 대답할까요?',
      options: [
        { label: 'I like pizza.', correct: false },
        { label: 'My name is Minjun.', correct: false },
        { label: 'I am eight years old.', correct: true },
      ],
    },
    {
      emoji: '🍕', stemEn: 'Question: "What do you like?"', stemKr: '좋아하는 것을 물어봤어요. 어떻게 대답할까요?',
      options: [
        { label: 'I am eight years old.', correct: false },
        { label: 'I like pizza.', correct: true },
        { label: 'My name is Minjun.', correct: false },
      ],
    },
  ];

  const mysteryItems = [
    { emoji: '🙋‍♀️', sentenceEn: 'Hi! My name is Sujin. I am eight years old. I like cats.', sentenceKr: '안녕! 내 이름은 수진이야. 나는 여덟 살이야. 나는 고양이를 좋아해.' },
    { emoji: '🙋‍♂️', sentenceEn: 'Hello! My name is Jiho. I am nine years old. I like soccer.', sentenceKr: '안녕하세요! 내 이름은 지호예요. 저는 아홉 살이에요. 저는 축구를 좋아해요.' },
    { emoji: '🧑', sentenceEn: 'Hi! My name is Alex. I am seven years old. I like books.', sentenceKr: '안녕! 내 이름은 알렉스야. 나는 일곱 살이야. 나는 책을 좋아해.' },
    { emoji: '👧', sentenceEn: 'Hello! My name is Yuna. I am ten years old. I like ice cream.', sentenceKr: '안녕하세요! 내 이름은 유나예요. 저는 열 살이에요. 저는 아이스크림을 좋아해요.' },
    { emoji: '👦', sentenceEn: 'Hi! My name is Minho. I am six years old. I like dogs.', sentenceKr: '안녕! 내 이름은 민호야. 나는 여섯 살이야. 나는 강아지를 좋아해.' },
    { emoji: '🙋', sentenceEn: 'Hello! My name is Emma. I am eight years old. I like music.', sentenceKr: '안녕하세요! 내 이름은 엠마예요. 저는 여덟 살이에요. 저는 음악을 좋아해요.' },
  ];

  const interviewPrompts = [
    { en: "What's your name?", kr: '이름이 뭐예요?', hintEn: 'Answer with: My name is ___.', hintKr: '내 이름은 ___예요' },
    { en: 'How old are you?', kr: '몇 살이에요?', hintEn: 'Answer with: I am ___ years old.', hintKr: '저는 ___살이에요' },
    { en: 'What do you like?', kr: '무엇을 좋아해요?', hintEn: 'Answer with: I like ___.', hintKr: '나는 ___를 좋아해요' },
    { en: 'Do you like dogs or cats?', kr: '강아지가 좋아요, 고양이가 좋아요?', hintEn: 'Answer with: I like ___.', hintKr: '나는 ___를 좋아해요' },
    { en: 'How are you today?', kr: '오늘 기분이 어때요?', hintEn: 'Answer with: I am ___.', hintKr: '나는 ___해요' },
    { en: 'Can you introduce yourself?', kr: '자기소개를 해볼까요?', hintEn: 'Say: Hi! My name is ___. I am ___ years old. I like ___.', hintKr: '안녕! 내 이름은 ___야. 나는 ___살이야. 나는 ___를 좋아해.' },
  ];

  const finalQuizQuestions = [
    {
      emoji: '7️⃣', stemEn: 'What number is this?', stemKr: '이건 몇일까요?',
      options: [{ label: 'six', correct: false }, { label: 'seven', correct: true }, { label: 'eight', correct: false }],
    },
    {
      emoji: '🍕', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?',
      options: [{ label: 'dogs', correct: false }, { label: 'pizza', correct: true }, { label: 'books', correct: false }],
    },
    {
      emoji: '📛', stemEn: 'Question: "What\'s your name?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.',
      options: [{ label: 'I am eight years old.', correct: false }, { label: 'My name is Minjun.', correct: true }, { label: 'I like soccer.', correct: false }],
    },
    {
      emoji: '🔢', stemEn: 'Question: "How old are you?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.',
      options: [{ label: 'I like books.', correct: false }, { label: 'I am nine years old.', correct: true }, { label: 'My name is Minjun.', correct: false }],
    },
    {
      emoji: '🍦', stemEn: 'Question: "What do you like?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.',
      options: [{ label: 'I like ice cream.', correct: true }, { label: 'My name is Minjun.', correct: false }, { label: 'I am ten years old.', correct: false }],
    },
  ];

  /* ---------------- Screen steps ---------------- */

  const steps = [
    { id: 'screen-welcome', label: 'Welcome' },
    { id: 'screen-checkin', label: 'Warm-up' },
    { id: 'screen-vocab-numbers', label: 'Vocab: Numbers' },
    { id: 'screen-game-numbers', label: 'Game: Numbers' },
    { id: 'screen-grammar-about-me', label: 'Grammar: Name & Age' },
    { id: 'screen-practice-about-me', label: 'Practice: Name & Age' },
    { id: 'screen-vocab-likes', label: 'Vocab: Likes' },
    { id: 'screen-grammar-likes', label: 'Grammar: Likes' },
    { id: 'screen-practice-likes', label: 'Practice: Likes' },
    { id: 'screen-build-intro', label: 'My Introduction' },
    { id: 'screen-speak-mystery', label: 'Speaking: Mystery Box' },
    { id: 'screen-speak-interview', label: 'Speaking: Interview' },
    { id: 'screen-quiz-final', label: 'Final Quiz' },
    { id: 'screen-finish', label: 'Finish' },
  ];

  const engine = new LessonEngine(steps);
  const points = new PointsTracker(document.getElementById('pointsNum'), document.getElementById('pointsChip'));
  let myIntro = null;

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

  Activities.renderFlashcards(document.getElementById('numberFlashcards'), numberVocab);
  Activities.renderFlashcards(document.getElementById('likesFlashcards'), likesVocab);
  Activities.renderQAPairs(document.getElementById('aboutMeQAPairs'), aboutMeQAPairs);
  Activities.renderQAPairs(document.getElementById('likesQAPairs'), likesQAPairs);

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

    if (id === 'screen-game-numbers') {
      renderOnce(id, () => {
        Activities.renderListenAndClick(document.getElementById('numberGame'), numberVocab, {
          rounds: 6,
          onAnswer: (correct) => { if (correct) points.add(10); },
        });
      });
    }

    if (id === 'screen-practice-about-me') {
      renderOnce(id, () => {
        Activities.renderSentenceBuilderSet(document.getElementById('sentenceBuilderAboutMe'), sentenceBuilderAboutMe, {
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

    if (id === 'screen-build-intro') {
      renderOnce(id, () => {
        const name = Scoreboard.getSavedName() || 'Friend';
        let selectedAge = null;
        let selectedLike = null;
        let awarded = false;

        const ageGrid = document.getElementById('ageChipGrid');
        const likeGrid = document.getElementById('likeChipGrid');
        const card = document.getElementById('introCard');
        const sentenceEl = document.getElementById('introSentence');
        const sentenceKrEl = document.getElementById('introSentenceKr');
        const doneBtn = document.getElementById('introDoneBtn');

        function refreshCard() {
          const ageText = selectedAge ? selectedAge.en : '<span class="blank">___</span>';
          const likeText = selectedLike ? selectedLike.en : '<span class="blank">___</span>';
          sentenceEl.innerHTML = `Hi! My name is <strong>${name}</strong>. I am ${selectedAge ? `<strong>${ageText}</strong>` : ageText} years old. I like ${selectedLike ? `<strong>${likeText}</strong>` : likeText}. Nice to meet you!`;

          const ageKr = selectedAge ? selectedAge.kr : '___';
          const likeKr = selectedLike ? selectedLike.kr : '___';
          sentenceKrEl.textContent = `안녕! 내 이름은 ${name}예요. 나는 ${ageKr}살이에요. 나는 ${likeKr}를 좋아해요. 만나서 반가워요!`;

          if (selectedAge && selectedLike) {
            card.classList.add('complete');
            doneBtn.disabled = false;
            if (typeof sparkleAt === 'function') sparkleAt(card, 18);
          } else {
            card.classList.remove('complete');
            doneBtn.disabled = true;
          }
        }

        numberVocab.forEach(num => {
          const chip = Activities.el('button', { class: 'intro-chip', type: 'button' }, [
            num.emoji,
            Activities.el('span', { class: 'chip-label' }, num.en),
          ]);
          chip.addEventListener('click', () => {
            [...ageGrid.children].forEach(c => c.classList.remove('picked'));
            chip.classList.add('picked');
            selectedAge = num;
            EnglishVoice.speak(`${num.en} years old`);
            refreshCard();
          });
          ageGrid.appendChild(chip);
        });

        likesVocab.forEach(item => {
          const chip = Activities.el('button', { class: 'intro-chip', type: 'button' }, [
            item.emoji,
            Activities.el('span', { class: 'chip-label' }, item.en),
          ]);
          chip.addEventListener('click', () => {
            [...likeGrid.children].forEach(c => c.classList.remove('picked'));
            chip.classList.add('picked');
            selectedLike = item;
            EnglishVoice.speak(item.en);
            refreshCard();
          });
          likeGrid.appendChild(chip);
        });

        document.getElementById('hearIntroBtn').addEventListener('click', () => {
          if (!selectedAge || !selectedLike) return;
          EnglishVoice.speak(`Hi! My name is ${name}. I am ${selectedAge.en} years old. I like ${selectedLike.en}. Nice to meet you!`);
        });

        doneBtn.addEventListener('click', () => {
          if (!selectedAge || !selectedLike) return;
          myIntro = {
            en: `Hi! My name is ${name}. I am ${selectedAge.en} years old. I like ${selectedLike.en}. Nice to meet you!`,
            kr: `안녕! 내 이름은 ${name}예요. 나는 ${selectedAge.kr}살이에요. 나는 ${selectedLike.kr}를 좋아해요. 만나서 반가워요!`,
          };
          if (!awarded) {
            awarded = true;
            points.add(25);
            fireConfetti(1400);
          }
        });

        refreshCard();
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

        document.getElementById('recapSentence').textContent =
          myIntro ? myIntro.en : `Hi! My name is ${name}. Nice to meet you!`;
        document.getElementById('recapSentenceKr').textContent =
          myIntro ? myIntro.kr : `안녕! 내 이름은 ${name}예요. 만나서 반가워요!`;

        const stats = Scoreboard.getStats(UNIT_ID);
        const entry = Scoreboard.addEntry(UNIT_ID, { name, points: points.total });

        renderCompareLine(document.getElementById('compareLine'), points.total, stats);
        renderLeaderboard(document.getElementById('leaderboardWrap'), UNIT_ID, entry.id);
      });
    }
  });
});
