/* ============================================================
   Unit 9: My House — content data for UnitBuilder
   Level: Beg (1-2학년 눈높이) · Main topic: rooms & furniture,
   "Where is the ___?" -> "It is in the ___." + "There is a ___."
   Capstone: Build MY Dream House!
   ============================================================ */

const houseVocab = [
  { icon: 'stove', emoji: '🍳', en: 'kitchen', kr: '부엌', exampleEn: 'This is the kitchen.', exampleKr: '이곳은 부엌이에요.' },
  { icon: 'bunk-bed', emoji: '🛌', en: 'bedroom', kr: '침실', exampleEn: 'This is the bedroom.', exampleKr: '이곳은 침실이에요.' },
  { emoji: '🚿', en: 'bathroom', kr: '욕실', exampleEn: 'This is the bathroom.', exampleKr: '이곳은 욕실이에요.' },
  { emoji: '🛋️', en: 'living room', kr: '거실', exampleEn: 'This is the living room.', exampleKr: '이곳은 거실이에요.' },
  { emoji: '🚪', en: 'door', kr: '문', exampleEn: 'Open the door!', exampleKr: '문을 열어보세요!' },
  { emoji: '🪟', en: 'window', kr: '창문', exampleEn: 'Look at the window!', exampleKr: '창문을 보세요!' },
  { emoji: '🪑', en: 'chair', kr: '의자', exampleEn: 'Sit on the chair!', exampleKr: '의자에 앉아보세요!' },
  { emoji: '🛏️', en: 'bed', kr: '침대', exampleEn: 'This is my bed.', exampleKr: '이건 내 침대예요.' },
];

window.UNIT_CONFIG = {
  unitId: 'my-house',
  previousUnit: { id: 'weather', nameEn: 'Unit 8: Weather' },
  headingEn: 'Unit 9: My House',
  emojiRow: '🏠 ➜ 🍳🛌🚿🛋️ ➜ ✨',
  subtitleEn: 'Explore the rooms of a house and build YOUR dream house! (~20-25 min)',
  subtitleKr: '집의 방을 탐험하고 나만의 꿈의 집을 만들어봐요!',
  learnListEn: "🏠 Rooms & Furniture · ❓ Where is the ___? · 🪑 There is a ___. · ✨ MY Dream House · 🎤 Speaking · ⭐ Points",
  learnListKr: '방과 가구 · 위치 묻고 답하기 · 있어요 말하기 · 나만의 꿈의 집 · 말하기 활동 · 포인트 모으기',
  finishTagline: { en: 'You can talk about your house now!', example: 'The bed is in the bedroom!', kr: '이제 집을 영어로 말할 수 있어요!' },

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
      type: 'vocab', id: 'screen-vocab-house', timeMin: 3,
      headingEn: 'My House', headingKr: '나의 집',
      instrEn: 'Tap a card to hear the word. Tap 🔊 to hear it again.',
      instrKr: '카드를 눌러 단어를 들어봐요.',
      items: houseVocab,
    },
    { type: 'game', id: 'screen-game-house', timeMin: 2, items: houseVocab, rounds: 6, pointsPerCorrect: 10 },
    {
      type: 'grammar', id: 'screen-grammar-house', timeMin: 3,
      headingEn: 'Where Is It?', headingKr: '어디에 있어요?',
      instrEn: 'Ask where something is, and say what there is in a room.',
      instrKr: '어디에 있는지 물어보고, 방에 무엇이 있는지 말해요.',
      patterns: [
        { en: 'Where is the ___? — It is in the ___.', kr: '___은 어디에 있어요? — ___에 있어요.' },
        { en: 'There is a ___ in the ___.', kr: '___에 ___가 있어요.' },
      ],
      qaLabelEn: '🔑 Question vs. Answer', qaLabelKr: '질문은 이렇게, 대답은 이렇게!',
      qaInstrEn: 'Questions and answers use different words. Match them up!',
      qaInstrKr: '질문 단어와 대답 단어가 서로 달라요. 짝지어 기억해요.',
      qaPairs: [
        { qEn: 'Where is the bed?', qKr: '침대는 어디에 있어요?', aEn: 'It is in the bedroom.', aKr: '침실에 있어요.' },
        { qEn: 'Is there a chair in the kitchen?', qKr: '부엌에 의자가 있어요?', aEn: 'Yes, there is.', aKr: '네, 있어요.' },
      ],
    },
    {
      type: 'practice', id: 'screen-practice-house', timeMin: 3,
      sentenceItems: [
        { emoji: '🛏️', kr: '그것은 침실에 있어요.', words: ['It', 'is', 'in', 'the', 'bedroom', '.'] },
        { emoji: '🪑', kr: '부엌에 의자가 있어요.', words: ['There', 'is', 'a', 'chair', 'in', 'the', 'kitchen', '.'] },
        { emoji: '🛋️', kr: '네, 있어요.', words: ['Yes,', 'there', 'is', '.'] },
      ],
      phaseB: {
        pointsPerCorrect: 10,
        questions: [
          { emoji: '🛏️', stemEn: 'Question: "Where is the bed?"', stemKr: '침대가 어디에 있는지 물어봤어요. 어떻게 대답할까요?', options: [{ label: 'It is in the bedroom.', correct: true }, { label: 'There is a bed.', correct: false }, { label: 'Yes, there is.', correct: false }] },
          { emoji: '🪑', stemEn: 'Question: "Is there a chair in the kitchen?"', stemKr: '부엌에 의자가 있는지 물어봤어요. 어떻게 대답할까요?', options: [{ label: 'It is in the kitchen.', correct: false }, { label: 'Yes, there is.', correct: true }, { label: 'There is a chair.', correct: false }] },
          { emoji: '🪟', stemEn: 'Question: "Where is the window?"', stemKr: '창문이 어디에 있는지 물어봤어요. 어떻게 대답할까요?', options: [{ label: 'It is in the living room.', correct: true }, { label: 'There is a window.', correct: false }, { label: 'Yes, there is.', correct: false }] },
        ],
      },
    },
    {
      type: 'capstone', id: 'screen-build-house', timeMin: 3,
      kickerEn: 'MY DREAM HOUSE', kickerKr: '나만의 꿈의 집',
      headingEn: 'Build MY Dream House! ✨', headingKr: '나만의 꿈의 집 만들기',
      instrEn: 'Pick a room and a special feature to build YOUR dream house!',
      instrKr: '방과 특별한 특징을 골라서 나만의 꿈의 집을 만들어요!',
      cardTitleEn: 'MY DREAM HOUSE', cardTitleKr: '나만의 꿈의 집',
      placeholderEn: 'My dream house has a ___ ___!',
      placeholderKr: '내 꿈의 집에는 ___ ___이 있어요!',
      points: 25,
      groups: [
        {
          key: 'feature', labelEn: 'Pick a feature', labelKr: '특징을 골라요',
          options: [
            { emoji: '🌈', en: 'colorful', kr: '알록달록한' },
            { emoji: '🎪', en: 'big', kr: '커다란' },
            { emoji: '✨', en: 'magical', kr: '마법 같은' },
            { emoji: '🥰', en: 'cozy', kr: '아늑한' },
            { emoji: '🎉', en: 'super fun', kr: '엄청 재미있는' },
          ],
        },
        {
          key: 'room', labelEn: 'Pick a room', labelKr: '방을 골라요',
          options: houseVocab.slice(0, 4).map(r => ({ icon: r.icon, emoji: r.emoji, en: r.en, kr: r.kr })),
        },
      ],
      template: (name, picks) => ({
        en: `${name}'s dream house has a ${picks.feature.en} ${picks.room.en}!`,
        kr: `${name}의 꿈의 집에는 ${picks.feature.kr} ${picks.room.kr}이 있어요!`,
      }),
    },
    {
      type: 'mystery', id: 'screen-speak-mystery', timeMin: 4,
      headingEn: 'Mystery House Box! 🎁',
      instrEn: 'Tap a box for a house tour. Say the FULL sentence out loud! Tap ✔ when done.',
      instrKr: '상자를 눌러 집을 구경하고, 문장을 크게 말해봐요.',
      items: [
        { emoji: '🛏️', sentenceEn: 'There is a bed in the bedroom.', sentenceKr: '침실에 침대가 있어요.' },
        { emoji: '🍳', sentenceEn: 'There is a table in the kitchen.', sentenceKr: '부엌에 식탁이 있어요.' },
        { emoji: '🛋️', sentenceEn: 'There is a chair in the living room.', sentenceKr: '거실에 의자가 있어요.' },
        { emoji: '🪟', sentenceEn: 'There is a window in the bathroom.', sentenceKr: '욕실에 창문이 있어요.' },
        { emoji: '🚪', sentenceEn: 'The door is big and blue.', sentenceKr: '문은 크고 파란색이에요.' },
        { emoji: '🏠', sentenceEn: 'My house has four rooms.', sentenceKr: '우리 집에는 방이 네 개 있어요.' },
      ],
    },
    {
      type: 'interview', id: 'screen-speak-interview', timeMin: 3,
      headingEn: 'House Interview 🎤',
      prompts: [
        { en: 'Where is your bed?', kr: '침대는 어디에 있어요?', hintEn: 'Answer with: It is in the bedroom.', hintKr: '침실에 있어요' },
        { en: 'Is there a table in your kitchen?', kr: '부엌에 식탁이 있어요?', hintEn: 'Answer with: Yes, there is.', hintKr: '네, 있어요' },
        { en: 'What room do you like best?', kr: '어떤 방을 가장 좋아해요?', hintEn: 'Answer with: I like the ___.', hintKr: '나는 ___을 좋아해요' },
        { en: 'Where do you sleep?', kr: '어디에서 자요?', hintEn: 'Answer with: I sleep in the bedroom.', hintKr: '나는 침실에서 자요' },
        { en: 'Is there a window in your bedroom?', kr: '침실에 창문이 있어요?', hintEn: 'Answer with: Yes, there is.', hintKr: '네, 있어요' },
        { en: "What's in your living room?", kr: '거실에 무엇이 있어요?', hintEn: 'Answer with: There is a ___.', hintKr: '___가 있어요' },
      ],
    },
    {
      type: 'quiz', id: 'screen-quiz-final', timeMin: 3,
      questions: [
        { emoji: '🍳', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'kitchen', correct: true }, { label: 'bedroom', correct: false }, { label: 'bathroom', correct: false }] },
        { emoji: '🛋️', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'chair', correct: false }, { label: 'living room', correct: true }, { label: 'window', correct: false }] },
        { emoji: '🛏️', stemEn: 'Question: "Where is the bed?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.', options: [{ label: 'It is in the bedroom.', correct: true }, { label: 'There is a bed.', correct: false }, { label: 'Yes, there is.', correct: false }] },
        { emoji: '🪑', stemEn: 'Question: "Is there a chair in the kitchen?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.', options: [{ label: 'It is in the kitchen.', correct: false }, { label: 'Yes, there is.', correct: true }, { label: 'There is a chair.', correct: false }] },
        { emoji: '🪟', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'window', correct: true }, { label: 'door', correct: false }, { label: 'bed', correct: false }] },
      ],
    },
  ],
};
