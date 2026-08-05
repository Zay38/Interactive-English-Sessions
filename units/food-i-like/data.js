/* ============================================================
   Unit 5: Food I Like — content data for UnitBuilder
   Level: Beg (1-2학년 눈높이) · Main topic: food,
   "I want ___." + "Do you like ___?" -> "Yes, I do./No, I don't."
   Capstone: Build MY Lunch Menu!
   ============================================================ */

const foodVocab = [
  { emoji: '🍎', en: 'apple', kr: '사과', exampleEn: 'I want an apple.', exampleKr: '나는 사과를 원해요.' },
  { emoji: '🍌', en: 'banana', kr: '바나나', exampleEn: 'I want a banana.', exampleKr: '나는 바나나를 원해요.' },
  { emoji: '🍚', en: 'rice', kr: '밥', exampleEn: 'I want rice.', exampleKr: '나는 밥을 원해요.' },
  { emoji: '🍞', en: 'bread', kr: '빵', exampleEn: 'I want bread.', exampleKr: '나는 빵을 원해요.' },
  { emoji: '🥛', en: 'milk', kr: '우유', exampleEn: 'I want milk.', exampleKr: '나는 우유를 원해요.' },
  { emoji: '🥚', en: 'egg', kr: '계란', exampleEn: 'I want an egg.', exampleKr: '나는 계란을 원해요.' },
  { emoji: '💧', en: 'water', kr: '물', exampleEn: 'I want water.', exampleKr: '나는 물을 원해요.' },
  { emoji: '🍪', en: 'cookie', kr: '쿠키', exampleEn: 'I want a cookie.', exampleKr: '나는 쿠키를 원해요.' },
];

window.UNIT_CONFIG = {
  unitId: 'food-i-like',
  headingEn: 'Unit 5: Food I Like',
  emojiRow: '🍎 ➜ 🍞🥛🍪 ➜ 🍽️',
  subtitleEn: 'Learn yummy food words and build YOUR OWN lunch menu! (~20-25 min)',
  subtitleKr: '맛있는 음식 단어를 배우고 나만의 점심 메뉴를 만들어봐요!',
  learnListEn: "🍎 Food Words · 🙋 I want ___. · 👍 Do you like ___? · 🍽️ MY Lunch Menu · 🎤 Speaking · ⭐ Points",
  learnListKr: '음식 단어 · 원하는 것 말하기 · 좋아하는지 묻고 답하기 · 나만의 점심 메뉴 · 말하기 활동 · 포인트 모으기',
  finishTagline: { en: 'You can talk about food now!', example: 'I want an apple. Do you like milk?', kr: '이제 음식을 영어로 말할 수 있어요!' },

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
      type: 'vocab', id: 'screen-vocab-food', timeMin: 3,
      headingEn: 'Yummy Food', headingKr: '맛있는 음식',
      instrEn: 'Tap a card to hear the word. Which ones do you want?',
      instrKr: '카드를 눌러 단어를 들어봐요.',
      items: foodVocab,
    },
    { type: 'game', id: 'screen-game-food', timeMin: 2, items: foodVocab, rounds: 6, pointsPerCorrect: 10 },
    {
      type: 'grammar', id: 'screen-grammar-food', timeMin: 3,
      headingEn: 'What Do You Want?', headingKr: '무엇을 원해요?',
      instrEn: 'Say what you want, and answer yes/no about what you like.',
      instrKr: '원하는 것을 말하고, 좋아하는지 예/아니오로 대답해요.',
      patterns: [
        { en: 'I want ___.', kr: '나는 ___를 원해요.' },
        { en: 'Do you like ___? — Yes, I do. / No, I don\'t.', kr: '___ 좋아해요? — 네, 좋아해요. / 아니요, 안 좋아해요.' },
      ],
      qaLabelEn: '🔑 Question vs. Answer', qaLabelKr: '질문은 이렇게, 대답은 이렇게!',
      qaInstrEn: 'Questions and answers use different words. Match them up!',
      qaInstrKr: '질문 단어와 대답 단어가 서로 달라요. 짝지어 기억해요.',
      qaPairs: [
        { qEn: 'What do you want?', qKr: '무엇을 원해요?', aEn: 'I want an apple.', aKr: '나는 사과를 원해요.' },
        { qEn: 'Do you like milk?', qKr: '우유 좋아해요?', aEn: 'Yes, I do.', aKr: '네, 좋아해요.' },
      ],
    },
    {
      type: 'practice', id: 'screen-practice-food', timeMin: 3,
      sentenceItems: [
        { emoji: '🍎', kr: '나는 사과를 원해요.', words: ['I', 'want', 'an', 'apple', '.'] },
        { emoji: '🍞', kr: '나는 빵을 원해요.', words: ['I', 'want', 'bread', '.'] },
        { emoji: '🥛', kr: '네, 좋아해요.', words: ['Yes,', 'I', 'do', '.'] },
      ],
      phaseB: {
        pointsPerCorrect: 10,
        questions: [
          { emoji: '🍎', stemEn: 'Question: "What do you want?"', stemKr: '무엇을 원하는지 물어봤어요. 어떻게 대답할까요?', options: [{ label: 'I want an apple.', correct: true }, { label: 'Yes, I do.', correct: false }, { label: "It's an apple.", correct: false }] },
          { emoji: '🥛', stemEn: 'Question: "Do you like milk?"', stemKr: '우유를 좋아하는지 물어봤어요. 어떻게 대답할까요?', options: [{ label: 'I want milk.', correct: false }, { label: 'Yes, I do.', correct: true }, { label: "It's milk.", correct: false }] },
          { emoji: '🍪', stemEn: 'Question: "What do you want?"', stemKr: '무엇을 원하는지 물어봤어요. 어떻게 대답할까요?', options: [{ label: 'I want a cookie.', correct: true }, { label: "No, I don't.", correct: false }, { label: "It's a cookie.", correct: false }] },
        ],
      },
    },
    {
      type: 'capstone', id: 'screen-build-menu', timeMin: 3,
      kickerEn: 'MY LUNCH MENU', kickerKr: '나만의 점심 메뉴',
      headingEn: 'Build MY Lunch Menu! 🍽️', headingKr: '나만의 점심 메뉴 만들기',
      instrEn: 'Pick a food and a drink to build YOUR OWN lunch menu!',
      instrKr: '음식과 음료를 골라서 나만의 점심 메뉴를 만들어요!',
      cardTitleEn: 'MY LUNCH MENU', cardTitleKr: '나만의 점심 메뉴',
      placeholderEn: 'For lunch, I want ___ and ___.',
      placeholderKr: '점심으로 저는 ___와 ___를 원해요.',
      points: 25,
      groups: [
        {
          key: 'main', labelEn: 'Pick a food', labelKr: '음식을 골라요',
          speakTemplate: (en) => en,
          options: [
            { emoji: '🍎', en: 'an apple', kr: '사과' },
            { emoji: '🍌', en: 'a banana', kr: '바나나' },
            { emoji: '🍚', en: 'rice', kr: '밥' },
            { emoji: '🍞', en: 'bread', kr: '빵' },
            { emoji: '🥚', en: 'an egg', kr: '계란' },
            { emoji: '🍪', en: 'a cookie', kr: '쿠키' },
          ],
        },
        {
          key: 'drink', labelEn: 'Pick a drink', labelKr: '음료를 골라요',
          options: [
            { emoji: '🥛', en: 'milk', kr: '우유' },
            { emoji: '💧', en: 'water', kr: '물' },
          ],
        },
      ],
      template: (name, picks) => ({
        en: `For lunch, ${name} wants ${picks.main.en} and ${picks.drink.en}.`,
        kr: `점심으로 ${name}는 ${picks.main.kr}와 ${picks.drink.kr}를 원해요.`,
      }),
    },
    {
      type: 'mystery', id: 'screen-speak-mystery', timeMin: 4,
      headingEn: 'Mystery Snack Box! 🎁',
      instrEn: 'Tap a box to find a snack. Say the FULL sentence out loud! Tap ✔ when done.',
      instrKr: '상자를 눌러 간식을 찾고, 문장을 크게 말해봐요.',
      items: [
        { emoji: '🍎', sentenceEn: 'I want an apple. It is sweet.', sentenceKr: '나는 사과를 원해요. 달콤해요.' },
        { emoji: '🍞', sentenceEn: 'I want bread. It is yummy.', sentenceKr: '나는 빵을 원해요. 맛있어요.' },
        { emoji: '🥚', sentenceEn: "I don't want an egg. I want rice.", sentenceKr: '나는 계란을 원하지 않아요. 밥을 원해요.' },
        { emoji: '🍌', sentenceEn: 'Do you like bananas? Yes, I do!', sentenceKr: '바나나 좋아해요? 네, 좋아해요!' },
        { emoji: '🍪', sentenceEn: 'I want a cookie. It is sweet.', sentenceKr: '나는 쿠키를 원해요. 달콤해요.' },
        { emoji: '🥛', sentenceEn: "Do you like milk? No, I don't.", sentenceKr: '우유 좋아해요? 아니요, 안 좋아해요.' },
      ],
    },
    {
      type: 'interview', id: 'screen-speak-interview', timeMin: 3,
      headingEn: 'Food Interview 🎤',
      prompts: [
        { en: 'What do you want for lunch?', kr: '점심으로 무엇을 원해요?', hintEn: 'Answer with: I want ___.', hintKr: '나는 ___를 원해요' },
        { en: 'Do you like pizza?', kr: '피자 좋아해요?', hintEn: "Answer with: Yes, I do. / No, I don't.", hintKr: '네, 좋아해요 / 아니요, 안 좋아해요' },
        { en: 'Do you like milk?', kr: '우유 좋아해요?', hintEn: "Answer with: Yes, I do. / No, I don't.", hintKr: '네, 좋아해요 / 아니요, 안 좋아해요' },
        { en: "What's your favorite food?", kr: '가장 좋아하는 음식이 뭐예요?', hintEn: 'Answer with: My favorite food is ___.', hintKr: '가장 좋아하는 음식은 ___예요' },
        { en: 'Are you hungry?', kr: '배고파요?', hintEn: 'Answer with: Yes, I am. / No, I\'m not.', hintKr: '네, 배고파요 / 아니요, 안 배고파요' },
        { en: 'What do you want to drink?', kr: '무엇을 마시고 싶어요?', hintEn: 'Answer with: I want ___.', hintKr: '나는 ___를 원해요' },
      ],
    },
    {
      type: 'quiz', id: 'screen-quiz-final', timeMin: 3,
      questions: [
        { emoji: '🍌', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'banana', correct: true }, { label: 'apple', correct: false }, { label: 'bread', correct: false }] },
        { emoji: '🍪', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'egg', correct: false }, { label: 'cookie', correct: true }, { label: 'rice', correct: false }] },
        { emoji: '🍎', stemEn: 'Question: "What do you want?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.', options: [{ label: 'I want an apple.', correct: true }, { label: 'Yes, I do.', correct: false }, { label: "It's an apple.", correct: false }] },
        { emoji: '🥛', stemEn: 'Question: "Do you like milk?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.', options: [{ label: 'I want milk.', correct: false }, { label: "No, I don't.", correct: true }, { label: "It's milk.", correct: false }] },
        { emoji: '💧', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'water', correct: true }, { label: 'milk', correct: false }, { label: 'rice', correct: false }] },
      ],
    },
  ],
};
