/* ============================================================
   Unit 1: My Family & My Feelings — content + screen wiring
   Level: 초등 저학년 (3-4학년, 8-10세)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

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
    { emoji: '👨', kr: '이 사람은 우리 아빠예요.', words: ['This', 'is', 'my', 'dad', '.'] },
    { emoji: '👦', kr: '그는 우리 형(오빠)이에요.', words: ['He', 'is', 'my', 'brother', '.'] },
    { emoji: '👧', kr: '그녀는 우리 언니(누나)예요.', words: ['She', 'is', 'my', 'sister', '.'] },
  ];

  const sentenceBuilderFeelings = [
    { emoji: '😊', kr: '나는 행복해요.', words: ['I', 'am', 'happy', '.'] },
    { emoji: '👴😴', kr: '그는(할아버지는) 피곤해요.', words: ['He', 'is', 'tired', '.'] },
    { emoji: '👧😢', kr: '그녀는(언니는) 슬퍼요.', words: ['She', 'is', 'sad', '.'] },
    { emoji: '🤤', kr: '나는 배고파요.', words: ['I', 'am', 'hungry', '.'] },
  ];

  const feelingsQuizQuestions = [
    {
      emoji: '👩😊', stemEn: 'Look at mom. How does she feel?', stemKr: '엄마를 보세요. 엄마는 기분이 어떨까요?',
      options: [
        { label: 'I am happy.', correct: false },
        { label: 'He is happy.', correct: false },
        { label: 'She is happy.', correct: true },
      ],
    },
    {
      emoji: '👦😠', stemEn: 'Look at brother. How does he feel?', stemKr: '형(오빠)을 보세요. 기분이 어떨까요?',
      options: [
        { label: 'I am angry.', correct: false },
        { label: 'He is angry.', correct: true },
        { label: 'She is angry.', correct: false },
      ],
    },
    {
      emoji: '👵😴', stemEn: 'Look at grandma. How does she feel?', stemKr: '할머니를 보세요. 기분이 어떨까요?',
      options: [
        { label: 'She is tired.', correct: true },
        { label: 'He is tired.', correct: false },
        { label: 'I am tired.', correct: false },
      ],
    },
    {
      emoji: '🙋🤩', stemEn: 'That is you! How do YOU feel?', stemKr: '이건 바로 나예요! 나는 기분이 어떨까요?',
      options: [
        { label: 'I am excited.', correct: true },
        { label: 'He is excited.', correct: false },
        { label: 'She is excited.', correct: false },
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
    { emoji: '👶🤤', sentenceEn: 'This is my baby. The baby is hungry.', sentenceKr: '이 아이는 우리 아기예요. 아기는 배고파요.' },
    { emoji: '🙋😲', sentenceEn: 'This is me! I am surprised.', sentenceKr: '이건 나예요! 나는 놀랐어요.' },
  ];

  const interviewPrompts = [
    { en: 'How do you feel today?', kr: '오늘 기분이 어때요?' },
    { en: 'How does your mom feel when you help her?', kr: '엄마를 도와줄 때, 엄마는 기분이 어떨까요?' },
    { en: 'How do you feel before a test?', kr: '시험 보기 전에 기분이 어때요?' },
    { en: "How does your dad feel on his birthday?", kr: '아빠 생일에 아빠는 기분이 어떨까요?' },
    { en: 'How do you feel when you eat pizza?', kr: '피자를 먹을 때 기분이 어때요?' },
    { en: 'How do you feel when you play with your family?', kr: '가족과 함께 놀 때 기분이 어때요?' },
    { en: 'How do you feel at night before you sleep?', kr: '밤에 자기 전에 기분이 어때요?' },
    { en: 'How do you feel when you see your grandma or grandpa?', kr: '할머니나 할아버지를 만나면 기분이 어때요?' },
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
      emoji: '👵😴', stemEn: 'Choose the correct sentence.', stemKr: '알맞은 문장을 고르세요.',
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
    { id: 'screen-grammar-feelings', label: 'Grammar: Feelings' },
    { id: 'screen-practice-feelings', label: 'Practice: Feelings' },
    { id: 'screen-practice-feelings-quiz', label: 'Quiz: Feelings' },
    { id: 'screen-speak-mystery', label: 'Speaking: Mystery Box' },
    { id: 'screen-speak-interview', label: 'Speaking: Interview' },
    { id: 'screen-quiz-final', label: 'Final Quiz' },
    { id: 'screen-finish', label: 'Finish' },
  ];

  const engine = new LessonEngine(steps);

  document.getElementById('startBtn').addEventListener('click', () => engine.next());
  document.getElementById('replayBtn').addEventListener('click', () => window.location.reload());

  /* ---------------- Static content (rendered once) ---------------- */

  Activities.renderFlashcards(document.getElementById('familyFlashcards'), familyVocab);
  Activities.renderFlashcards(document.getElementById('feelingsFlashcards'), feelingsVocab);

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
  checkinOptions.forEach(opt => {
    const btn = Activities.el('button', { class: 'checkin-btn', type: 'button' }, [
      opt.emoji,
      Activities.el('span', { class: 'label kr' }, opt.kr),
    ]);
    btn.addEventListener('click', () => {
      [...checkinGrid.children].forEach(b => b.classList.remove('picked'));
      btn.classList.add('picked');
      EnglishVoice.speak(`I am ${opt.en}.`);
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
        Activities.renderListenAndClick(document.getElementById('familyGame'), familyVocab, { rounds: 6 });
      });
    }

    if (id === 'screen-practice-family') {
      renderOnce(id, () => {
        Activities.renderSentenceBuilderSet(document.getElementById('sentenceBuilderFamily'), sentenceBuilderFamily);
      });
    }

    if (id === 'screen-practice-feelings') {
      renderOnce(id, () => {
        Activities.renderSentenceBuilderSet(document.getElementById('sentenceBuilderFeelings'), sentenceBuilderFeelings);
      });
    }

    if (id === 'screen-practice-feelings-quiz') {
      renderOnce(id, () => {
        Activities.renderMultipleChoiceQuiz(document.getElementById('feelingsQuiz'), feelingsQuizQuestions);
      });
    }

    if (id === 'screen-speak-mystery') {
      renderOnce(id, () => {
        Activities.renderMysteryBoxes(document.getElementById('mysteryBoxes'), mysteryItems, {
          onAllDone: () => fireConfetti(),
        });
      });
    }

    if (id === 'screen-speak-interview') {
      renderOnce(id, () => {
        Activities.renderPromptDeck(document.getElementById('interviewDeck'), interviewPrompts);
      });
    }

    if (id === 'screen-quiz-final') {
      renderOnce(id, () => {
        Activities.renderMultipleChoiceQuiz(document.getElementById('finalQuiz'), finalQuizQuestions, {
          onComplete: (score, total) => {
            document.getElementById('finalScoreText').textContent = `${score} / ${total}`;
            const starCount = Math.max(1, Math.round((score / total) * 5));
            document.getElementById('finalStars').textContent = '⭐'.repeat(starCount) + '☆'.repeat(5 - starCount);
            fireConfetti(2000);
            setTimeout(() => engine.next(), 900);
          },
        });
      });
    }
  });
});
