/* ============================================================
   Unit 7: My Clothes — content data for UnitBuilder
   Level: Beg (1-2학년 눈높이) · Main topic: clothes,
   "What are you wearing?" -> "I am wearing ___."
   Capstone: Build MY Outfit!
   ============================================================ */

const clothesVocab = [
  { emoji: '👕', en: 'shirt', kr: '셔츠', exampleEn: 'I am wearing a shirt.', exampleKr: '나는 셔츠를 입고 있어요.' },
  { emoji: '👖', en: 'pants', kr: '바지', exampleEn: 'I am wearing pants.', exampleKr: '나는 바지를 입고 있어요.' },
  { emoji: '👟', en: 'shoes', kr: '신발', exampleEn: 'I am wearing shoes.', exampleKr: '나는 신발을 신고 있어요.' },
  { emoji: '🧢', en: 'hat', kr: '모자', exampleEn: 'I am wearing a hat.', exampleKr: '나는 모자를 쓰고 있어요.' },
  { emoji: '👗', en: 'dress', kr: '원피스', exampleEn: 'I am wearing a dress.', exampleKr: '나는 원피스를 입고 있어요.' },
  { emoji: '🧦', en: 'socks', kr: '양말', exampleEn: 'I am wearing socks.', exampleKr: '나는 양말을 신고 있어요.' },
  { emoji: '🧥', en: 'jacket', kr: '재킷', exampleEn: 'I am wearing a jacket.', exampleKr: '나는 재킷을 입고 있어요.' },
  { emoji: '🕶️', en: 'glasses', kr: '안경', exampleEn: 'I am wearing glasses.', exampleKr: '나는 안경을 쓰고 있어요.' },
];

window.UNIT_CONFIG = {
  unitId: 'my-clothes',
  headingEn: 'Unit 7: My Clothes',
  emojiRow: '👕👖👟 ➜ 🧢👗🧥 ➜ 👗',
  subtitleEn: "Learn clothing words and build YOUR OWN outfit! (~20-25 min)",
  subtitleKr: '옷 단어를 배우고 나만의 코디를 만들어봐요!',
  learnListEn: "👕 Clothes · ❓ What are you wearing? · 🙋 I am wearing ___. · 👗 MY Outfit · 🎤 Speaking · ⭐ Points",
  learnListKr: '옷 단어 · 무엇을 입었는지 묻고 답하기 · 나만의 코디 · 말하기 활동 · 포인트 모으기',
  finishTagline: { en: 'You can talk about clothes now!', example: 'I am wearing a red shirt!', kr: '이제 옷을 영어로 말할 수 있어요!' },

  checkin: {
    headingEn: 'Say Hello!', headingKr: '인사해봐요!', timeMin: 2,
    instrEn: 'Tap a card, then say the greeting out loud!',
    instrKr: '카드를 누르고 큰 소리로 따라 말해봐요.',
    options: [
      { emoji: '👋', en: 'Hello!', kr: '안녕하세요!' },
      { emoji: '🙋', en: 'Hi!', kr: '안녕!' },
      { emoji: '🌅', en: 'Good morning!', kr: '좋은 아침!' },
      { emoji: '🙏', en: 'Thank you!', kr: '고마워요!' },
      { emoji: '🚶', en: 'Bye!', kr: '안녕! (헤어질 때)' },
    ],
  },

  sections: [
    {
      type: 'vocab', id: 'screen-vocab-clothes', timeMin: 3,
      headingEn: 'My Clothes', headingKr: '나의 옷',
      instrEn: 'Tap a card to hear the word. Tap 🔊 to hear it again.',
      instrKr: '카드를 눌러 단어를 들어봐요.',
      items: clothesVocab,
    },
    { type: 'game', id: 'screen-game-clothes', timeMin: 2, items: clothesVocab, rounds: 6, pointsPerCorrect: 10 },
    {
      type: 'grammar', id: 'screen-grammar-clothes', timeMin: 3,
      headingEn: 'What Are You Wearing?', headingKr: '무엇을 입고 있어요?',
      instrEn: 'Say what you are wearing today.',
      instrKr: '오늘 무엇을 입고 있는지 말해요.',
      patterns: [
        { en: 'What are you wearing?', kr: '무엇을 입고 있어요?' },
        { en: 'I am wearing ___.', kr: '나는 ___를 입고(신고/쓰고) 있어요.' },
      ],
      qaLabelEn: '🔑 Question vs. Answer', qaLabelKr: '질문은 이렇게, 대답은 이렇게!',
      qaInstrEn: 'Questions and answers use different words. Match them up!',
      qaInstrKr: '질문 단어와 대답 단어가 서로 달라요. 짝지어 기억해요.',
      qaPairs: [
        { qEn: 'What are you wearing?', qKr: '무엇을 입고 있어요?', aEn: 'I am wearing a shirt.', aKr: '나는 셔츠를 입고 있어요.' },
        { qEn: 'Are you wearing shoes?', qKr: '신발을 신고 있어요?', aEn: 'Yes, I am.', aKr: '네, 신고 있어요.' },
      ],
    },
    {
      type: 'practice', id: 'screen-practice-clothes', timeMin: 3,
      sentenceItems: [
        { emoji: '👕', kr: '나는 셔츠를 입고 있어요.', words: ['I', 'am', 'wearing', 'a', 'shirt', '.'] },
        { emoji: '🧢', kr: '나는 모자를 쓰고 있어요.', words: ['I', 'am', 'wearing', 'a', 'hat', '.'] },
        { emoji: '👟', kr: '네, 신고 있어요.', words: ['Yes,', 'I', 'am', '.'] },
      ],
      phaseB: {
        pointsPerCorrect: 10,
        questions: [
          { emoji: '👖', stemEn: 'Question: "What are you wearing?"', stemKr: '무엇을 입고 있는지 물어봤어요. 어떻게 대답할까요?', options: [{ label: 'I am wearing pants.', correct: true }, { label: 'Yes, I am.', correct: false }, { label: 'It is pants.', correct: false }] },
          { emoji: '👟', stemEn: 'Question: "Are you wearing shoes?"', stemKr: '신발을 신고 있는지 물어봤어요. 어떻게 대답할까요?', options: [{ label: 'I am wearing shoes.', correct: false }, { label: 'Yes, I am.', correct: true }, { label: 'It is shoes.', correct: false }] },
          { emoji: '🧥', stemEn: 'Question: "What are you wearing?"', stemKr: '무엇을 입고 있는지 물어봤어요. 어떻게 대답할까요?', options: [{ label: 'I am wearing a jacket.', correct: true }, { label: "No, I'm not.", correct: false }, { label: 'It is a jacket.', correct: false }] },
        ],
      },
    },
    {
      type: 'capstone', id: 'screen-build-outfit', timeMin: 3,
      kickerEn: 'MY OUTFIT', kickerKr: '나만의 코디',
      headingEn: 'Build MY Outfit! 👗', headingKr: '나만의 코디 만들기',
      instrEn: 'Pick a color and a clothing item to build YOUR OWN outfit!',
      instrKr: '색깔과 옷을 골라서 나만의 코디를 만들어요!',
      cardTitleEn: 'MY OUTFIT', cardTitleKr: '나만의 코디',
      placeholderEn: 'Today, I am wearing a ___ ___!',
      placeholderKr: '오늘 저는 ___ ___를 입고 있어요!',
      points: 25,
      groups: [
        {
          key: 'color', labelEn: 'Pick a color', labelKr: '색깔을 골라요',
          options: [
            { emoji: '🔴', en: 'red', kr: '빨간' },
            { emoji: '🔵', en: 'blue', kr: '파란' },
            { emoji: '🟢', en: 'green', kr: '초록' },
            { emoji: '🟡', en: 'yellow', kr: '노란' },
            { emoji: '⚫', en: 'black', kr: '검은' },
            { emoji: '⚪', en: 'white', kr: '하얀' },
          ],
        },
        {
          key: 'item', labelEn: 'Pick clothing', labelKr: '옷을 골라요',
          speakTemplate: (en) => `a ${en}`,
          options: [
            { emoji: '👕', en: 'shirt', kr: '셔츠' },
            { emoji: '👗', en: 'dress', kr: '원피스' },
            { emoji: '🧥', en: 'jacket', kr: '재킷' },
            { emoji: '🧢', en: 'hat', kr: '모자' },
          ],
        },
      ],
      template: (name, picks) => ({
        en: `Today, ${name} is wearing a ${picks.color.en} ${picks.item.en}!`,
        kr: `오늘 ${name}는 ${picks.color.kr} ${picks.item.kr}를 입고 있어요!`,
      }),
    },
    {
      type: 'mystery', id: 'screen-speak-mystery', timeMin: 4,
      headingEn: 'Mystery Outfit Box! 🎁',
      instrEn: 'Tap a box to see an outfit. Say the FULL sentence out loud! Tap ✔ when done.',
      instrKr: '상자를 눌러 코디를 보고, 문장을 크게 말해봐요.',
      items: [
        { emoji: '👕', sentenceEn: 'I am wearing a red shirt and blue pants.', sentenceKr: '나는 빨간 셔츠와 파란 바지를 입고 있어요.' },
        { emoji: '👗', sentenceEn: 'I am wearing a yellow dress.', sentenceKr: '나는 노란 원피스를 입고 있어요.' },
        { emoji: '🧥', sentenceEn: 'I am wearing a green jacket and black shoes.', sentenceKr: '나는 초록 재킷과 검은 신발을 신고 있어요.' },
        { emoji: '🧢', sentenceEn: "I'm wearing a purple hat. I love it!", sentenceKr: '나는 보라색 모자를 쓰고 있어요. 정말 좋아해요!' },
        { emoji: '🕶️', sentenceEn: "I'm wearing cool glasses today.", sentenceKr: '나는 오늘 멋진 안경을 쓰고 있어요.' },
        { emoji: '🧦', sentenceEn: 'I am wearing white socks.', sentenceKr: '나는 하얀 양말을 신고 있어요.' },
      ],
    },
    {
      type: 'interview', id: 'screen-speak-interview', timeMin: 3,
      headingEn: 'Clothes Interview 🎤',
      prompts: [
        { en: 'What are you wearing today?', kr: '오늘 무엇을 입고 있어요?', hintEn: 'Answer with: I am wearing ___.', hintKr: '나는 ___를 입고 있어요' },
        { en: 'Are you wearing shoes?', kr: '신발을 신고 있어요?', hintEn: "Answer with: Yes, I am. / No, I'm not.", hintKr: '네, 신고 있어요 / 아니요, 안 신고 있어요' },
        { en: 'What color is your shirt?', kr: '셔츠가 무슨 색이에요?', hintEn: 'Answer with: My shirt is ___.', hintKr: '내 셔츠는 ___색이에요' },
        { en: 'Do you like hats?', kr: '모자를 좋아해요?', hintEn: "Answer with: Yes, I do. / No, I don't.", hintKr: '네, 좋아해요 / 아니요, 안 좋아해요' },
        { en: "What's your favorite color to wear?", kr: '입기 좋아하는 색깔이 뭐예요?', hintEn: 'Answer with: My favorite color is ___.', hintKr: '가장 좋아하는 색깔은 ___예요' },
        { en: 'Is your jacket red or blue?', kr: '재킷이 빨간색이에요, 파란색이에요?', hintEn: 'Answer with: My jacket is ___.', hintKr: '내 재킷은 ___색이에요' },
      ],
    },
    {
      type: 'quiz', id: 'screen-quiz-final', timeMin: 3,
      questions: [
        { emoji: '👖', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'pants', correct: true }, { label: 'shirt', correct: false }, { label: 'shoes', correct: false }] },
        { emoji: '🧢', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'dress', correct: false }, { label: 'hat', correct: true }, { label: 'jacket', correct: false }] },
        { emoji: '👟', stemEn: 'Question: "Are you wearing shoes?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.', options: [{ label: 'I am wearing shoes.', correct: false }, { label: 'Yes, I am.', correct: true }, { label: 'It is shoes.', correct: false }] },
        { emoji: '👗', stemEn: 'Question: "What are you wearing?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.', options: [{ label: 'I am wearing a dress.', correct: true }, { label: 'Yes, I am.', correct: false }, { label: 'It is a dress.', correct: false }] },
        { emoji: '🧦', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'socks', correct: true }, { label: 'glasses', correct: false }, { label: 'pants', correct: false }] },
      ],
    },
  ],
};
