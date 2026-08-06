/* ============================================================
   Unit 8: Weather — content data for UnitBuilder
   Level: Beg (1-2학년 눈높이) · Main topic: weather,
   "How's the weather?" -> "It is ___." + "Do you like ___ days?"
   Capstone: Build MY Weather Report!
   ============================================================ */

const weatherVocab = [
  { emoji: '☀️', en: 'sunny', kr: '화창한', exampleEn: 'It is sunny.', exampleKr: '화창해요.' },
  { emoji: '🌧️', en: 'rainy', kr: '비 오는', exampleEn: 'It is rainy.', exampleKr: '비가 와요.' },
  { emoji: '☁️', en: 'cloudy', kr: '흐린', exampleEn: 'It is cloudy.', exampleKr: '흐려요.' },
  { emoji: '❄️', en: 'snowy', kr: '눈 오는', exampleEn: 'It is snowy.', exampleKr: '눈이 와요.' },
  { emoji: '💨', en: 'windy', kr: '바람 부는', exampleEn: 'It is windy.', exampleKr: '바람이 불어요.' },
  { emoji: '🥵', en: 'hot', kr: '더운', exampleEn: 'It is hot.', exampleKr: '더워요.' },
  { emoji: '🥶', en: 'cold', kr: '추운', exampleEn: 'It is cold.', exampleKr: '추워요.' },
  { emoji: '⛈️', en: 'stormy', kr: '폭풍우 치는', exampleEn: 'It is stormy.', exampleKr: '폭풍우가 쳐요.' },
];

window.UNIT_CONFIG = {
  unitId: 'weather',
  previousUnit: { id: 'my-clothes', nameEn: 'Unit 7: My Clothes' },
  headingEn: 'Unit 8: Weather',
  emojiRow: '☀️🌧️☁️ ➜ ❄️💨 ➜ 📺',
  subtitleEn: "Learn weather words and build YOUR OWN weather report! (~20-25 min)",
  subtitleKr: '날씨 단어를 배우고 나만의 날씨 리포트를 만들어봐요!',
  learnListEn: "☀️ Weather Words · ❓ How's the weather? · 👍 Do you like ___ days? · 📺 MY Weather Report · 🎤 Speaking · ⭐ Points",
  learnListKr: '날씨 단어 · 날씨 묻고 답하기 · 좋아하는지 묻고 답하기 · 나만의 날씨 리포트 · 말하기 활동 · 포인트 모으기',
  finishTagline: { en: 'You can talk about the weather now!', example: "How's the weather? It is sunny!", kr: '이제 날씨를 영어로 말할 수 있어요!' },

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
      type: 'vocab', id: 'screen-vocab-weather', timeMin: 3,
      headingEn: "How's the Weather?", headingKr: '오늘 날씨 어때요?',
      instrEn: 'Tap a card to hear the word. Tap 🔊 to hear it again.',
      instrKr: '카드를 눌러 단어를 들어봐요.',
      items: weatherVocab,
    },
    { type: 'game', id: 'screen-game-weather', timeMin: 2, items: weatherVocab, rounds: 6, pointsPerCorrect: 10 },
    {
      type: 'grammar', id: 'screen-grammar-weather', timeMin: 3,
      headingEn: "How's the Weather Today?", headingKr: '오늘 날씨가 어때요?',
      instrEn: "Ask about the weather, and say if you like it.",
      instrKr: '날씨를 물어보고, 좋아하는지 말해요.',
      patterns: [
        { en: "How's the weather? — It is ___.", kr: '날씨가 어때요? — ___요.' },
        { en: 'Do you like ___ days? — Yes, I do. / No, I don\'t.', kr: '___ 날을 좋아해요? — 네, 좋아해요. / 아니요, 안 좋아해요.' },
      ],
      qaLabelEn: '🔑 Question vs. Answer', qaLabelKr: '질문은 이렇게, 대답은 이렇게!',
      qaInstrEn: 'Questions and answers use different words. Match them up!',
      qaInstrKr: '질문 단어와 대답 단어가 서로 달라요. 짝지어 기억해요.',
      qaPairs: [
        { qEn: "How's the weather?", qKr: '날씨가 어때요?', aEn: 'It is sunny.', aKr: '화창해요.' },
        { qEn: 'Do you like rainy days?', qKr: '비 오는 날을 좋아해요?', aEn: "No, I don't.", aKr: '아니요, 안 좋아해요.' },
      ],
    },
    {
      type: 'practice', id: 'screen-practice-weather', timeMin: 3,
      sentenceItems: [
        { emoji: '☀️', kr: '화창해요.', words: ['It', 'is', 'sunny', '.'] },
        { emoji: '🌧️', kr: '비가 와요.', words: ['It', 'is', 'rainy', '.'] },
        { emoji: '❄️', kr: '아니요, 안 좋아해요.', words: ['No,', 'I', "don't", '.'] },
      ],
      phaseB: {
        pointsPerCorrect: 10,
        questions: [
          { emoji: '☁️', stemEn: 'Question: "How\'s the weather?"', stemKr: '날씨를 물어봤어요. 어떻게 대답할까요?', options: [{ label: 'It is cloudy.', correct: true }, { label: 'Yes, I do.', correct: false }, { label: 'I like cloudy.', correct: false }] },
          { emoji: '🌧️', stemEn: 'Question: "Do you like rainy days?"', stemKr: '비 오는 날을 좋아하는지 물어봤어요. 어떻게 대답할까요?', options: [{ label: 'It is rainy.', correct: false }, { label: "No, I don't.", correct: true }, { label: 'Yes, it is.', correct: false }] },
          { emoji: '💨', stemEn: 'Question: "How\'s the weather?"', stemKr: '날씨를 물어봤어요. 어떻게 대답할까요?', options: [{ label: 'It is windy.', correct: true }, { label: 'Yes, I do.', correct: false }, { label: 'It is hot.', correct: false }] },
        ],
      },
    },
    {
      type: 'capstone', id: 'screen-build-report', timeMin: 3,
      kickerEn: 'MY WEATHER REPORT', kickerKr: '나만의 날씨 리포트',
      headingEn: 'Build MY Weather Report! 📺', headingKr: '나만의 날씨 리포트 만들기',
      instrEn: 'Pick the weather and how you feel to build YOUR OWN weather report!',
      instrKr: '날씨와 기분을 골라서 나만의 날씨 리포트를 만들어요!',
      cardTitleEn: 'MY WEATHER REPORT', cardTitleKr: '나만의 날씨 리포트',
      placeholderEn: 'Today the weather is ___. I feel ___!',
      placeholderKr: '오늘 날씨는 ___예요. 저는 ___!',
      points: 25,
      groups: [
        {
          key: 'weather', labelEn: 'Pick the weather', labelKr: '날씨를 골라요',
          options: weatherVocab.map(w => ({ emoji: w.emoji, en: w.en, kr: w.kr })),
        },
        {
          key: 'feeling', labelEn: 'Pick how you feel', labelKr: '기분을 골라요',
          options: [
            { emoji: '😊', en: 'happy', kr: '행복해요' },
            { emoji: '🤩', en: 'excited', kr: '신나요' },
            { emoji: '🥶', en: 'cold', kr: '추워요' },
            { emoji: '😴', en: 'sleepy', kr: '졸려요' },
            { emoji: '🥰', en: 'cozy', kr: '포근해요' },
          ],
        },
      ],
      template: (name, picks) => ({
        en: `Good morning! Today the weather is ${picks.weather.en}. ${name} feels ${picks.feeling.en}!`,
        kr: `안녕하세요! 오늘 날씨는 ${picks.weather.kr}예요. ${name}는 ${picks.feeling.kr}!`,
      }),
    },
    {
      type: 'mystery', id: 'screen-speak-mystery', timeMin: 4,
      headingEn: 'Mystery Weather Box! 🎁',
      instrEn: 'Tap a box to be a weather reporter. Say the FULL report out loud! Tap ✔ when done.',
      instrKr: '상자를 눌러 날씨 리포터가 되어 크게 말해봐요.',
      items: [
        { emoji: '☀️', sentenceEn: 'Good morning! It is sunny today. Wear a hat!', sentenceKr: '안녕하세요! 오늘은 화창해요. 모자를 쓰세요!' },
        { emoji: '🌧️', sentenceEn: "It's rainy today. Bring an umbrella!", sentenceKr: '오늘은 비가 와요. 우산을 챙기세요!' },
        { emoji: '❄️', sentenceEn: "It's snowy today. Wear a warm jacket!", sentenceKr: '오늘은 눈이 와요. 따뜻한 재킷을 입으세요!' },
        { emoji: '💨', sentenceEn: "It's windy today. Hold your hat!", sentenceKr: '오늘은 바람이 불어요. 모자를 꼭 잡으세요!' },
        { emoji: '🥵', sentenceEn: "It's hot today. Drink lots of water!", sentenceKr: '오늘은 더워요. 물을 많이 마시세요!' },
        { emoji: '⛈️', sentenceEn: "It's stormy today. Stay inside!", sentenceKr: '오늘은 폭풍우가 쳐요. 집에 있으세요!' },
      ],
    },
    {
      type: 'interview', id: 'screen-speak-interview', timeMin: 3,
      headingEn: 'Weather Interview 🎤',
      prompts: [
        { en: "How's the weather today?", kr: '오늘 날씨가 어때요?', hintEn: 'Answer with: It is ___.', hintKr: '___요' },
        { en: 'Do you like snowy days?', kr: '눈 오는 날을 좋아해요?', hintEn: "Answer with: Yes, I do. / No, I don't.", hintKr: '네, 좋아해요 / 아니요, 안 좋아해요' },
        { en: 'What do you wear when it is cold?', kr: '추울 때 무엇을 입어요?', hintEn: 'Answer with: I wear a jacket.', hintKr: '나는 재킷을 입어요' },
        { en: 'Do you like rainy days?', kr: '비 오는 날을 좋아해요?', hintEn: "Answer with: Yes, I do. / No, I don't.", hintKr: '네, 좋아해요 / 아니요, 안 좋아해요' },
        { en: "What's your favorite weather?", kr: '가장 좋아하는 날씨가 뭐예요?', hintEn: 'Answer with: My favorite weather is ___.', hintKr: '가장 좋아하는 날씨는 ___예요' },
        { en: 'Is it hot or cold today?', kr: '오늘은 더워요, 추워요?', hintEn: 'Answer with: It is ___.', hintKr: '___요' },
      ],
    },
    {
      type: 'quiz', id: 'screen-quiz-final', timeMin: 3,
      questions: [
        { emoji: '☀️', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'sunny', correct: true }, { label: 'rainy', correct: false }, { label: 'cloudy', correct: false }] },
        { emoji: '❄️', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'windy', correct: false }, { label: 'snowy', correct: true }, { label: 'hot', correct: false }] },
        { emoji: '🌧️', stemEn: 'Question: "How\'s the weather?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.', options: [{ label: 'It is rainy.', correct: true }, { label: 'Yes, I do.', correct: false }, { label: 'I like rainy.', correct: false }] },
        { emoji: '☁️', stemEn: 'Question: "Do you like cloudy days?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.', options: [{ label: 'It is cloudy.', correct: false }, { label: 'Yes, I do.', correct: true }, { label: "How's the weather?", correct: false }] },
        { emoji: '🥶', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'cold', correct: true }, { label: 'hot', correct: false }, { label: 'windy', correct: false }] },
      ],
    },
  ],
};
