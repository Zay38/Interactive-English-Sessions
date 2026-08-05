/* ============================================================
   Unit 1: My Family & My Feelings — content + screen wiring
   Level: Beg (1-2학년 눈높이) · ~20-25분 세션 기준으로 구성
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const UNIT_ID = 'family-feelings';

  /* ---------------- Content data ---------------- */

  const familyVocab = [
    { emoji: '👩', en: 'mom', kr: '엄마', exampleEn: 'This is my mom.', exampleKr: '이 사람은 우리 엄마예요.' },
    { emoji: '👨', en: 'dad', kr: '아빠', exampleEn: 'This is my dad.', exampleKr: '이 사람은 우리 아빠예요.' },
    { emoji: '👵', en: 'grandma', kr: '할머니', exampleEn: 'This is my grandma.', exampleKr: '이 사람은 우리 할머니예요.' },
    { emoji: '👴', en: 'grandpa', kr: '할아버지', exampleEn: 'This is my grandpa.', exampleKr: '이 사람은 우리 할아버지예요.' },
    { emoji: '👦', en: 'brother', kr: '형/오빠/남동생', exampleEn: 'He is my brother.', exampleKr: '그는 우리 형(오빠/남동생)이에요.' },
    { emoji: '👧', en: 'sister', kr: '언니/누나/여동생', exampleEn: 'She is my sister.', exampleKr: '그녀는 우리 언니(누나/여동생)예요.' },
    { emoji: '👶', en: 'baby', kr: '아기', exampleEn: 'This is my baby.', exampleKr: '이 아이는 우리 아기예요.' },
    { emoji: '👨‍👩‍👧‍👦', en: 'family', kr: '가족', exampleEn: 'I love my family.', exampleKr: '나는 우리 가족을 사랑해요.' },
  ];

  const feelingsVocab = [
    { emoji: '😊', en: 'happy', kr: '행복한/기쁜', exampleEn: 'I am happy.', exampleKr: '나는 행복해요.' },
    { emoji: '😢', en: 'sad', kr: '슬픈', exampleEn: 'I am sad.', exampleKr: '나는 슬퍼요.' },
    { emoji: '😠', en: 'angry', kr: '화난', exampleEn: 'He is angry.', exampleKr: '그는 화가 났어요.' },
    { emoji: '😴', en: 'tired', kr: '피곤한', exampleEn: 'She is tired.', exampleKr: '그녀는 피곤해요.' },
    { emoji: '🤩', en: 'excited', kr: '신난', exampleEn: 'I am excited!', exampleKr: '나는 신나요!' },
    { emoji: '😱', en: 'scared', kr: '무서운', exampleEn: 'He is scared.', exampleKr: '그는 무서워해요.' },
    { emoji: '🤤', en: 'hungry', kr: '배고픈', exampleEn: 'I am hungry.', exampleKr: '나는 배고파요.' },
    { emoji: '😲', en: 'surprised', kr: '놀란', exampleEn: 'She is surprised.', exampleKr: '그녀는 놀랐어요.' },
  ];

  const checkinOptions = [
    { emoji: '😊', en: 'happy', kr: '행복해요' },
    { emoji: '😴', en: 'tired', kr: '피곤해요' },
    { emoji: '🤩', en: 'excited', kr: '신나요' },
    { emoji: '🤤', en: 'hungry', kr: '배고파요' },
    { emoji: '😢', en: 'sad', kr: '슬퍼요' },
  ];

  const sentenceBuilderFamily = [
    { emoji: '👩', kr: '이 사람은 우리 엄마예요.', words: ['This', 'is', 'my', 'mom', '.'] },
    { emoji: '👦', kr: '그는 우리 형(오빠)이에요.', words: ['He', 'is', 'my', 'brother', '.'] },
    { emoji: '👧', kr: '그녀는 우리 언니(누나)예요.', words: ['She', 'is', 'my', 'sister', '.'] },
  ];

  const sentenceBuilderFeelings = [
    { emoji: '😊', kr: '나는 행복해요.', words: ['I', 'am', 'happy', '.'] },
    { emoji: '👴😴', kr: '그는(할아버지는) 피곤해요.', words: ['He', 'is', 'tired', '.'] },
  ];

  const feelingsQAPairs = [
    { qEn: 'How do you feel?', qKr: '너는 기분이 어때?', aEn: 'I am happy.', aKr: '나는 행복해요.' },
    { qEn: 'How does he feel?', qKr: '그는 기분이 어때?', aEn: 'He is tired.', aKr: '그는 피곤해요.' },
    { qEn: 'How does she feel?', qKr: '그녀는 기분이 어때?', aEn: 'She is sad.', aKr: '그녀는 슬퍼요.' },
  ];

  const qaMatchQuestions = [
    {
      emoji: '😊', stemEn: 'Question: "How do you feel?"', stemKr: '(행복해요) 이렇게 물어보면, 뭐라고 대답할까요?',
      options: [
        { label: 'I am happy.', correct: true },
        { label: 'He is happy.', correct: false },
        { label: 'She is happy.', correct: false },
      ],
    },
    {
      emoji: '👦😠', stemEn: 'Question: "How does he feel?"', stemKr: '형(오빠)에게 물어봤어요. 어떻게 대답할까요?',
      options: [
        { label: 'I am angry.', correct: false },
        { label: 'He is angry.', correct: true },
        { label: 'She is angry.', correct: false },
      ],
    },
    {
      emoji: '👵😴', stemEn: 'Question: "How does she feel?"', stemKr: '할머니에게 물어봤어요. 어떻게 대답할까요?',
      options: [
        { label: 'She is tired.', correct: true },
        { label: 'He is tired.', correct: false },
        { label: 'I am tired.', correct: false },
      ],
    },
  ];

  const mysteryItems = [
    { emoji: '👩😊', sentenceEn: 'This is my mom. She is happy.', sentenceKr: '이 사람은 우리 엄마예요. 그녀는 행복해요.' },
    { emoji: '👨😴', sentenceEn: 'This is my dad. He is tired.', sentenceKr: '이 사람은 우리 아빠예요. 그는 피곤해요.' },
    { emoji: '👵🤩', sentenceEn: 'This is my grandma. She is excited.', sentenceKr: '이 사람은 우리 할머니예요. 그녀는 신나요.' },
    { emoji: '👴😢', sentenceEn: 'This is my grandpa. He is sad.', sentenceKr: '이 사람은 우리 할아버지예요. 그는 슬퍼요.' },
    { emoji: '👦😠', sentenceEn: 'This is my brother. He is angry.', sentenceKr: '이 사람은 우리 형(오빠)이에요. 그는 화가 났어요.' },
    { emoji: '👧😱', sentenceEn: 'This is my sister. She is scared.', sentenceKr: '이 사람은 우리 언니(누나)예요. 그녀는 무서워해요.' },
  ];

  const interviewPrompts = [
    { en: 'How do you feel today?', kr: '오늘 기분이 어때요?', hintEn: 'Answer with: I am ___.', hintKr: '나는 ___해요' },
    { en: 'How does your mom feel when you help her?', kr: '엄마를 도와줄 때, 엄마는 기분이 어떨까요?', hintEn: 'Answer with: She is ___.', hintKr: '그녀는(엄마는) ___해요' },
    { en: 'How do you feel before a test?', kr: '시험 보기 전에 기분이 어때요?', hintEn: 'Answer with: I am ___.', hintKr: '나는 ___해요' },
    { en: "How does your dad feel on his birthday?", kr: '아빠 생일에 아빠는 기분이 어떨까요?', hintEn: 'Answer with: He is ___.', hintKr: '그는(아빠는) ___해요' },
    { en: 'How do you feel when you play with your family?', kr: '가족과 함께 놀 때 기분이 어때요?', hintEn: 'Answer with: I am ___.', hintKr: '나는 ___해요' },
    { en: 'How do you feel when you see your grandma or grandpa?', kr: '할머니나 할아버지를 만나면 기분이 어때요?', hintEn: 'Answer with: I am ___.', hintKr: '나는 ___해요' },
  ];

  const finalQuizQuestions = [
    {
      emoji: '👵', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?',
      options: [{ label: 'grandma', correct: true }, { label: 'grandpa', correct: false }, { label: 'sister', correct: false }],
    },
    {
      emoji: '😢', stemEn: 'What feeling is this?', stemKr: '이건 어떤 기분일까요?',
      options: [{ label: 'happy', correct: false }, { label: 'sad', correct: true }, { label: 'angry', correct: false }],
    },
    {
      emoji: '👨', stemEn: 'Choose the correct sentence for this picture.', stemKr: '그림에 맞는 문장을 고르세요.',
      options: [{ label: 'This is my dad.', correct: true }, { label: 'This is my mom.', correct: false }, { label: 'He is my sister.', correct: false }],
    },
    {
      emoji: '👵😴', stemEn: 'Question: "How does she feel?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.',
      options: [{ label: 'She is tired.', correct: true }, { label: 'He is tired.', correct: false }, { label: 'I am tired.', correct: false }],
    },
    {
      emoji: '🤤', stemEn: 'What feeling is this?', stemKr: '이건 어떤 기분일까요?',
      options: [{ label: 'scared', correct: false }, { label: 'hungry', correct: true }, { label: 'surprised', correct: false }],
    },
  ];

  /* ---------------- Screen steps ---------------- */

  const steps = [
    { id: 'screen-welcome', label: 'Welcome' },
    { id: 'screen-checkin', label: 'Warm-up' },
    { id: 'screen-vocab-family', label: 'Vocab: Family' },
    { id: 'screen-game-family', label: 'Game: Family' },
    { id: 'screen-grammar-family', label: 'Grammar: Family' },
    { id: 'screen-practice-family', label: 'Practice: Family' },
    { id: 'screen-vocab-feelings', label: 'Vocab: Feelings' },
    { id: 'screen-grammar-feelings', label: 'Grammar: Q&A' },
    { id: 'screen-practice-feelings', label: 'Practice: Feelings' },
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

  Activities.renderFlashcards(document.getElementById('familyFlashcards'), familyVocab);
  Activities.renderFlashcards(document.getElementById('feelingsFlashcards'), feelingsVocab);
  Activities.renderQAPairs(document.getElementById('feelingsQAPairs'), feelingsQAPairs);

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

  const familyExamplesEl = document.getElementById('familyExamples');
  exampleRow(familyExamplesEl, 'This is my mom.', '이 사람은 우리 엄마예요.');
  exampleRow(familyExamplesEl, 'This is my dad.', '이 사람은 우리 아빠예요.');
  exampleRow(familyExamplesEl, 'This is my grandma.', '이 사람은 우리 할머니예요.');

  const familyExamples2El = document.getElementById('familyExamples2');
  exampleRow(familyExamples2El, 'He is my brother.', '그는 우리 형(오빠/남동생)이에요.');
  exampleRow(familyExamples2El, 'She is my sister.', '그녀는 우리 언니(누나/여동생)예요.');

  const feelingsExamplesEl = document.getElementById('feelingsExamples');
  exampleRow(feelingsExamplesEl, 'I am happy.', '나는 행복해요.');
  exampleRow(feelingsExamplesEl, 'He is tired.', '그는 피곤해요.');
  exampleRow(feelingsExamplesEl, 'She is scared.', '그녀는 무서워해요.');

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
      EnglishVoice.speak(`I am ${opt.en}.`);
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

    if (id === 'screen-game-family') {
      renderOnce(id, () => {
        Activities.renderListenAndClick(document.getElementById('familyGame'), familyVocab, {
          rounds: 5,
          onAnswer: (correct) => { if (correct) points.add(10); },
        });
      });
    }

    if (id === 'screen-practice-family') {
      renderOnce(id, () => {
        Activities.renderSentenceBuilderSet(document.getElementById('sentenceBuilderFamily'), sentenceBuilderFamily, {
          onWordCorrect: () => points.add(2),
          onItemComplete: (i, perfect) => { points.add(perfect ? 15 : 8); if (perfect) fireConfetti(600); },
        });
      });
    }

    if (id === 'screen-practice-feelings') {
      renderOnce(id, () => {
        const title = document.getElementById('practiceFeelingsTitle');
        const instrEn = document.getElementById('practiceFeelingsInstrEn');
        const instrKr = document.getElementById('practiceFeelingsInstrKr');
        const body = document.getElementById('practiceFeelingsBody');

        function startPhaseB() {
          title.innerHTML = 'Answer the Question! <span class="kr">질문에 대답하기</span>';
          instrEn.textContent = 'Now read the question and pick the right answer!';
          instrKr.textContent = '질문을 보고 알맞은 대답을 골라봐요!';
          Activities.renderMultipleChoiceQuiz(body, qaMatchQuestions, {
            onAnswer: (correct) => { if (correct) points.add(10); },
          });
        }

        Activities.renderSentenceBuilderSet(body, sentenceBuilderFeelings, {
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
