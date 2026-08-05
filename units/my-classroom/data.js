/* ============================================================
   Unit 10: In My Classroom — content data for UnitBuilder
   Level: Beg (1-2학년 눈높이) · Main topic: classroom objects,
   "What's in your bag?" -> "There is a ___." + "Do you have a ___?"
   Capstone: Build MY Pencil Case!
   ============================================================ */

const classroomVocab = [
  { emoji: '✏️', en: 'pencil', kr: '연필', exampleEn: 'This is my pencil.', exampleKr: '이건 내 연필이에요.' },
  { emoji: '📖', en: 'book', kr: '책', exampleEn: 'This is my book.', exampleKr: '이건 내 책이에요.' },
  { emoji: '🎒', en: 'bag', kr: '가방', exampleEn: 'This is my bag.', exampleKr: '이건 내 가방이에요.' },
  { emoji: '📏', en: 'ruler', kr: '자', exampleEn: 'This is my ruler.', exampleKr: '이건 내 자예요.' },
  { emoji: '✂️', en: 'scissors', kr: '가위', exampleEn: 'This is my scissors.', exampleKr: '이건 내 가위예요.' },
  { emoji: '🖍️', en: 'crayon', kr: '크레용', exampleEn: 'This is my crayon.', exampleKr: '이건 내 크레용이에요.' },
  { emoji: '📓', en: 'notebook', kr: '공책', exampleEn: 'This is my notebook.', exampleKr: '이건 내 공책이에요.' },
  { emoji: '📄', en: 'paper', kr: '종이', exampleEn: 'This is my paper.', exampleKr: '이건 내 종이예요.' },
];

window.UNIT_CONFIG = {
  unitId: 'my-classroom',
  headingEn: 'Unit 10: In My Classroom',
  emojiRow: '🎒 ➜ ✏️📖📏 ➜ 🖍️',
  subtitleEn: "Learn classroom words and build YOUR OWN pencil case! (~20-25 min)",
  subtitleKr: '교실 물건을 배우고 나만의 필통을 만들어봐요!',
  learnListEn: "🎒 Classroom Objects · ❓ What's in your bag? · 🙋 Do you have a ___? · ✏️ MY Pencil Case · 🎤 Speaking · ⭐ Points",
  learnListKr: '교실 물건 · 가방 속 물건 말하기 · 가지고 있는지 묻고 답하기 · 나만의 필통 · 말하기 활동 · 포인트 모으기',
  finishTagline: { en: 'You can talk about your classroom now!', example: 'There is a pencil in my bag!', kr: '이제 교실 물건을 영어로 말할 수 있어요!' },

  checkin: {
    headingEn: 'Say Hello!', headingKr: '인사해봐요!', timeMin: 2,
    instrEn: 'Tap a card, then say the greeting out loud!',
    instrKr: '카드를 누르고 큰 소리로 따라 말해봐요.',
    options: [
      { emoji: '😊', en: 'Hello!', kr: '안녕하세요!' },
      { emoji: '🙋', en: 'Hi!', kr: '안녕!' },
      { emoji: '🌅', en: 'Good morning!', kr: '좋은 아침!' },
      { emoji: '🙏', en: 'Thank you!', kr: '고마워요!' },
      { emoji: '👋', en: 'Bye!', kr: '안녕! (헤어질 때)' },
    ],
  },

  sections: [
    {
      type: 'vocab', id: 'screen-vocab-classroom', timeMin: 3,
      headingEn: 'In My Classroom', headingKr: '나의 교실',
      instrEn: 'Tap a card to hear the word. Tap 🔊 to hear it again.',
      instrKr: '카드를 눌러 단어를 들어봐요.',
      items: classroomVocab,
    },
    { type: 'game', id: 'screen-game-classroom', timeMin: 2, items: classroomVocab, rounds: 6, pointsPerCorrect: 10 },
    {
      type: 'grammar', id: 'screen-grammar-classroom', timeMin: 3,
      headingEn: "What's in Your Bag?", headingKr: '가방에 무엇이 있어요?',
      instrEn: 'Say what is in your bag, and if you have something.',
      instrKr: '가방에 무엇이 있는지, 무엇을 가지고 있는지 말해요.',
      patterns: [
        { en: "What's in your bag? — There is a ___ in my bag.", kr: '가방에 무엇이 있어요? — 내 가방에 ___가 있어요.' },
        { en: 'Do you have a ___? — Yes, I do. / No, I don\'t.', kr: '___가 있어요? — 네, 있어요. / 아니요, 없어요.' },
      ],
      qaLabelEn: '🔑 Question vs. Answer', qaLabelKr: '질문은 이렇게, 대답은 이렇게!',
      qaInstrEn: 'Questions and answers use different words. Match them up!',
      qaInstrKr: '질문 단어와 대답 단어가 서로 달라요. 짝지어 기억해요.',
      qaPairs: [
        { qEn: "What's in your bag?", qKr: '가방에 무엇이 있어요?', aEn: 'There is a pencil in my bag.', aKr: '내 가방에 연필이 있어요.' },
        { qEn: 'Do you have a ruler?', qKr: '자가 있어요?', aEn: 'Yes, I do.', aKr: '네, 있어요.' },
      ],
    },
    {
      type: 'practice', id: 'screen-practice-classroom', timeMin: 3,
      sentenceItems: [
        { emoji: '✏️', kr: '내 가방에 연필이 있어요.', words: ['There', 'is', 'a', 'pencil', 'in', 'my', 'bag', '.'] },
        { emoji: '📏', kr: '네, 있어요.', words: ['Yes,', 'I', 'do', '.'] },
        { emoji: '📖', kr: '내 가방에 책이 있어요.', words: ['There', 'is', 'a', 'book', 'in', 'my', 'bag', '.'] },
      ],
      phaseB: {
        pointsPerCorrect: 10,
        questions: [
          { emoji: '🎒', stemEn: 'Question: "What\'s in your bag?"', stemKr: '가방에 무엇이 있는지 물어봤어요. 어떻게 대답할까요?', options: [{ label: 'There is a pencil in my bag.', correct: true }, { label: 'Yes, I do.', correct: false }, { label: 'It is a pencil.', correct: false }] },
          { emoji: '📏', stemEn: 'Question: "Do you have a ruler?"', stemKr: '자가 있는지 물어봤어요. 어떻게 대답할까요?', options: [{ label: 'There is a ruler.', correct: false }, { label: 'Yes, I do.', correct: true }, { label: 'It is a ruler.', correct: false }] },
          { emoji: '✂️', stemEn: 'Question: "What\'s in your bag?"', stemKr: '가방에 무엇이 있는지 물어봤어요. 어떻게 대답할까요?', options: [{ label: 'There is scissors in my bag.', correct: true }, { label: "No, I don't.", correct: false }, { label: 'It is scissors.', correct: false }] },
        ],
      },
    },
    {
      type: 'capstone', id: 'screen-build-pencilcase', timeMin: 3,
      kickerEn: 'MY PENCIL CASE', kickerKr: '나만의 필통',
      headingEn: 'Build MY Pencil Case! ✏️', headingKr: '나만의 필통 만들기',
      instrEn: 'Pick two things to build YOUR OWN pencil case!',
      instrKr: '두 가지 물건을 골라서 나만의 필통을 만들어요!',
      cardTitleEn: 'MY PENCIL CASE', cardTitleKr: '나만의 필통',
      placeholderEn: 'In my pencil case, I have a ___ and a ___!',
      placeholderKr: '내 필통에는 ___와 ___가 있어요!',
      points: 25,
      groups: [
        {
          key: 'itemA', labelEn: 'Pick something', labelKr: '물건을 골라요',
          speakTemplate: (en) => `a ${en}`,
          options: classroomVocab.slice(0, 4).map(i => ({ emoji: i.emoji, en: i.en, kr: i.kr })),
        },
        {
          key: 'itemB', labelEn: 'Pick another thing', labelKr: '또 다른 물건을 골라요',
          speakTemplate: (en) => `a ${en}`,
          options: classroomVocab.slice(4, 8).map(i => ({ emoji: i.emoji, en: i.en, kr: i.kr })),
        },
      ],
      template: (name, picks) => ({
        en: `In ${name}'s pencil case, there is a ${picks.itemA.en} and a ${picks.itemB.en}!`,
        kr: `${name}의 필통에는 ${picks.itemA.kr}와 ${picks.itemB.kr}가 있어요!`,
      }),
    },
    {
      type: 'mystery', id: 'screen-speak-mystery', timeMin: 4,
      headingEn: 'Mystery Bag Box! 🎁',
      instrEn: "Tap a box to look inside a bag. Say the FULL sentence out loud! Tap ✔ when done.",
      instrKr: '상자를 눌러 가방 속을 보고, 문장을 크게 말해봐요.',
      items: [
        { emoji: '✏️', sentenceEn: 'There is a pencil in my bag.', sentenceKr: '내 가방에 연필이 있어요.' },
        { emoji: '📖', sentenceEn: 'There is a book in my bag.', sentenceKr: '내 가방에 책이 있어요.' },
        { emoji: '📏', sentenceEn: "I have a ruler. It is long.", sentenceKr: '나는 자가 있어요. 길어요.' },
        { emoji: '✂️', sentenceEn: 'I have scissors. Be careful!', sentenceKr: '나는 가위가 있어요. 조심하세요!' },
        { emoji: '🖍️', sentenceEn: 'I have five crayons.', sentenceKr: '나는 크레용이 다섯 개 있어요.' },
        { emoji: '📓', sentenceEn: 'There is a notebook in my bag.', sentenceKr: '내 가방에 공책이 있어요.' },
      ],
    },
    {
      type: 'interview', id: 'screen-speak-interview', timeMin: 3,
      headingEn: 'Classroom Interview 🎤',
      prompts: [
        { en: "What's in your bag?", kr: '가방에 무엇이 있어요?', hintEn: 'Answer with: There is a ___ in my bag.', hintKr: '내 가방에 ___가 있어요' },
        { en: 'Do you have a pencil?', kr: '연필이 있어요?', hintEn: "Answer with: Yes, I do. / No, I don't.", hintKr: '네, 있어요 / 아니요, 없어요' },
        { en: 'Do you have scissors?', kr: '가위가 있어요?', hintEn: "Answer with: Yes, I do. / No, I don't.", hintKr: '네, 있어요 / 아니요, 없어요' },
        { en: 'What color is your bag?', kr: '가방이 무슨 색이에요?', hintEn: 'Answer with: My bag is ___.', hintKr: '내 가방은 ___색이에요' },
        { en: 'Do you like your notebook?', kr: '공책이 마음에 들어요?', hintEn: "Answer with: Yes, I do. / No, I don't.", hintKr: '네, 좋아요 / 아니요, 안 좋아요' },
        { en: "What's your favorite school item?", kr: '가장 좋아하는 학용품이 뭐예요?', hintEn: 'Answer with: My favorite is ___.', hintKr: '가장 좋아하는 것은 ___예요' },
      ],
    },
    {
      type: 'quiz', id: 'screen-quiz-final', timeMin: 3,
      questions: [
        { emoji: '✏️', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'pencil', correct: true }, { label: 'book', correct: false }, { label: 'ruler', correct: false }] },
        { emoji: '🎒', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'bag', correct: true }, { label: 'crayon', correct: false }, { label: 'paper', correct: false }] },
        { emoji: '📖', stemEn: 'Question: "What\'s in your bag?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.', options: [{ label: 'There is a book in my bag.', correct: true }, { label: 'Yes, I do.', correct: false }, { label: 'It is a book.', correct: false }] },
        { emoji: '📏', stemEn: 'Question: "Do you have a ruler?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.', options: [{ label: 'There is a ruler.', correct: false }, { label: 'Yes, I do.', correct: true }, { label: 'It is a ruler.', correct: false }] },
        { emoji: '✂️', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'scissors', correct: true }, { label: 'crayon', correct: false }, { label: 'notebook', correct: false }] },
      ],
    },
  ],
};
