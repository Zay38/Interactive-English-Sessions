/* ============================================================
   Unit 6: Colors & Shapes — content data for UnitBuilder
   Level: Beg (1-2학년 눈높이) · Main topic: colors & shapes,
   "What color is it?"/"What shape is it?" -> "It is ___."
   Capstone: Build MY Favorite Thing!
   ============================================================ */

const colorShapeVocab = [
  { emoji: '🔴', en: 'red', kr: '빨간색', exampleEn: 'It is red.', exampleKr: '빨간색이에요.' },
  { emoji: '🔵', en: 'blue', kr: '파란색', exampleEn: 'It is blue.', exampleKr: '파란색이에요.' },
  { emoji: '🟢', en: 'green', kr: '초록색', exampleEn: 'It is green.', exampleKr: '초록색이에요.' },
  { emoji: '🟡', en: 'yellow', kr: '노란색', exampleEn: 'It is yellow.', exampleKr: '노란색이에요.' },
  { emoji: '⭕', en: 'circle', kr: '동그라미', exampleEn: 'It is a circle.', exampleKr: '동그라미예요.' },
  { emoji: '◼️', en: 'square', kr: '네모', exampleEn: 'It is a square.', exampleKr: '네모예요.' },
  { emoji: '🔺', en: 'triangle', kr: '세모', exampleEn: 'It is a triangle.', exampleKr: '세모예요.' },
  { emoji: '⭐', en: 'star', kr: '별', exampleEn: 'It is a star.', exampleKr: '별이에요.' },
];

window.UNIT_CONFIG = {
  unitId: 'colors-shapes',
  headingEn: 'Unit 6: Colors & Shapes',
  emojiRow: '🔴🔵🟢 ➜ ⭕◼️🔺 ➜ 🎨',
  subtitleEn: 'Learn colors and shapes and build YOUR favorite thing! (~20-25 min)',
  subtitleKr: '색깔과 모양을 배우고 가장 좋아하는 것을 만들어봐요!',
  learnListEn: "🎨 Colors & Shapes · ❓ What color/shape is it? · 🌟 MY Favorite Thing · 🎤 Speaking · ⭐ Points",
  learnListKr: '색깔과 모양 · 색깔/모양 묻고 답하기 · 나만의 최애 아이템 · 말하기 활동 · 포인트 모으기',
  finishTagline: { en: 'You can talk about colors and shapes now!', example: 'It is a red circle!', kr: '이제 색깔과 모양을 영어로 말할 수 있어요!' },

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
      type: 'vocab', id: 'screen-vocab-colors', timeMin: 3,
      headingEn: 'Colors & Shapes', headingKr: '색깔과 모양',
      instrEn: 'Tap a card to hear the word. Tap 🔊 to hear it again.',
      instrKr: '카드를 눌러 단어를 들어봐요.',
      items: colorShapeVocab,
    },
    { type: 'game', id: 'screen-game-colors', timeMin: 2, items: colorShapeVocab, rounds: 6, pointsPerCorrect: 10 },
    {
      type: 'grammar', id: 'screen-grammar-colors', timeMin: 3,
      headingEn: 'What Color Is It?', headingKr: '무슨 색이에요?',
      instrEn: 'Ask about color and shape the same way.',
      instrKr: '색깔과 모양을 같은 방식으로 물어봐요.',
      patterns: [
        { en: 'What color is it? — It is ___.', kr: '무슨 색이에요? — ___이에요.' },
        { en: 'What shape is it? — It is a ___.', kr: '무슨 모양이에요? — ___예요.' },
      ],
      qaLabelEn: '🔑 Question vs. Answer', qaLabelKr: '질문은 이렇게, 대답은 이렇게!',
      qaInstrEn: 'Questions and answers use different words. Match them up!',
      qaInstrKr: '질문 단어와 대답 단어가 서로 달라요. 짝지어 기억해요.',
      qaPairs: [
        { qEn: 'What color is it?', qKr: '무슨 색이에요?', aEn: 'It is red.', aKr: '빨간색이에요.' },
        { qEn: 'What shape is it?', qKr: '무슨 모양이에요?', aEn: 'It is a circle.', aKr: '동그라미예요.' },
      ],
    },
    {
      type: 'practice', id: 'screen-practice-colors', timeMin: 3,
      sentenceItems: [
        { emoji: '🔴', kr: '빨간색이에요.', words: ['It', 'is', 'red', '.'] },
        { emoji: '⭕', kr: '동그라미예요.', words: ['It', 'is', 'a', 'circle', '.'] },
        { emoji: '🟢', kr: '초록색이에요.', words: ['It', 'is', 'green', '.'] },
      ],
      phaseB: {
        pointsPerCorrect: 10,
        questions: [
          { emoji: '🔵', stemEn: 'Question: "What color is it?"', stemKr: '색깔을 물어봤어요. 어떻게 대답할까요?', options: [{ label: 'It is blue.', correct: true }, { label: 'It is a square.', correct: false }, { label: 'It is a star.', correct: false }] },
          { emoji: '🔺', stemEn: 'Question: "What shape is it?"', stemKr: '모양을 물어봤어요. 어떻게 대답할까요?', options: [{ label: 'It is yellow.', correct: false }, { label: 'It is a triangle.', correct: true }, { label: 'It is red.', correct: false }] },
          { emoji: '⭐', stemEn: 'Question: "What shape is it?"', stemKr: '모양을 물어봤어요. 어떻게 대답할까요?', options: [{ label: 'It is a star.', correct: true }, { label: 'It is green.', correct: false }, { label: 'It is a circle.', correct: false }] },
        ],
      },
    },
    {
      type: 'capstone', id: 'screen-build-favorite', timeMin: 3,
      kickerEn: 'MY FAVORITE THING', kickerKr: '나만의 최애 아이템',
      headingEn: 'Build MY Favorite Thing! 🌟', headingKr: '가장 좋아하는 것 만들기',
      instrEn: 'Pick a shape and a color to build YOUR favorite thing!',
      instrKr: '모양과 색깔을 골라서 가장 좋아하는 것을 만들어요!',
      cardTitleEn: 'MY FAVORITE THING', cardTitleKr: '나만의 최애 아이템',
      placeholderEn: 'My favorite thing is a ___ ___!',
      placeholderKr: '내가 가장 좋아하는 것은 ___ ___예요!',
      points: 25,
      groups: [
        {
          key: 'color', labelEn: 'Pick a color', labelKr: '색깔을 골라요',
          options: [
            { emoji: '🔴', en: 'red', kr: '빨간' },
            { emoji: '🔵', en: 'blue', kr: '파란' },
            { emoji: '🟢', en: 'green', kr: '초록' },
            { emoji: '🟡', en: 'yellow', kr: '노란' },
            { emoji: '🟣', en: 'purple', kr: '보라' },
            { emoji: '🟠', en: 'orange', kr: '주황' },
          ],
        },
        {
          key: 'shape', labelEn: 'Pick a shape', labelKr: '모양을 골라요',
          speakTemplate: (en) => `a ${en}`,
          options: [
            { emoji: '⭕', en: 'circle', kr: '동그라미' },
            { emoji: '◼️', en: 'square', kr: '네모' },
            { emoji: '🔺', en: 'triangle', kr: '세모' },
            { emoji: '⭐', en: 'star', kr: '별' },
          ],
        },
      ],
      template: (name, picks) => ({
        en: `Hi! My favorite thing is a ${picks.color.en} ${picks.shape.en}!`,
        kr: `안녕! ${name}가 가장 좋아하는 것은 ${picks.color.kr} ${picks.shape.kr}예요!`,
      }),
    },
    {
      type: 'mystery', id: 'screen-speak-mystery', timeMin: 4,
      headingEn: 'Mystery Shape Box! 🎁',
      instrEn: 'Tap a box to find a shape. Say the FULL sentence out loud! Tap ✔ when done.',
      instrKr: '상자를 눌러 모양을 찾고, 문장을 크게 말해봐요.',
      items: [
        { emoji: '🔴', sentenceEn: "It's a red circle. It is a ball!", sentenceKr: '빨간 동그라미예요. 공이에요!' },
        { emoji: '🟦', sentenceEn: "It's a blue square. It is a box!", sentenceKr: '파란 네모예요. 상자예요!' },
        { emoji: '🟢', sentenceEn: "It's a green triangle. It is a hat!", sentenceKr: '초록 세모예요. 모자예요!' },
        { emoji: '⭐', sentenceEn: "It's a yellow star. It is in the sky!", sentenceKr: '노란 별이에요. 하늘에 있어요!' },
        { emoji: '🟣', sentenceEn: "It's a purple circle. It is a grape!", sentenceKr: '보라 동그라미예요. 포도예요!' },
        { emoji: '🟠', sentenceEn: "It's an orange square. It is a book!", sentenceKr: '주황 네모예요. 책이에요!' },
      ],
    },
    {
      type: 'interview', id: 'screen-speak-interview', timeMin: 3,
      headingEn: 'Colors & Shapes Interview 🎤',
      prompts: [
        { en: "What's your favorite color?", kr: '가장 좋아하는 색깔이 뭐예요?', hintEn: 'Answer with: My favorite color is ___.', hintKr: '가장 좋아하는 색깔은 ___예요' },
        { en: "What's your favorite shape?", kr: '가장 좋아하는 모양이 뭐예요?', hintEn: 'Answer with: My favorite shape is a ___.', hintKr: '가장 좋아하는 모양은 ___예요' },
        { en: 'Is the sun a circle or a square?', kr: '해는 동그라미예요, 네모예요?', hintEn: 'Answer with: The sun is a circle.', hintKr: '해는 동그라미예요' },
        { en: 'What color is grass?', kr: '풀은 무슨 색이에요?', hintEn: 'Answer with: Grass is green.', hintKr: '풀은 초록색이에요' },
        { en: 'What color is the sky?', kr: '하늘은 무슨 색이에요?', hintEn: 'Answer with: The sky is blue.', hintKr: '하늘은 파란색이에요' },
        { en: 'What shape is a book?', kr: '책은 무슨 모양이에요?', hintEn: 'Answer with: A book is a square.', hintKr: '책은 네모예요' },
      ],
    },
    {
      type: 'quiz', id: 'screen-quiz-final', timeMin: 3,
      questions: [
        { emoji: '🔵', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'blue', correct: true }, { label: 'red', correct: false }, { label: 'green', correct: false }] },
        { emoji: '⭐', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'circle', correct: false }, { label: 'star', correct: true }, { label: 'square', correct: false }] },
        { emoji: '🟡', stemEn: 'Question: "What color is it?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.', options: [{ label: 'It is yellow.', correct: true }, { label: 'It is a square.', correct: false }, { label: 'It is a star.', correct: false }] },
        { emoji: '🔺', stemEn: 'Question: "What shape is it?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.', options: [{ label: 'It is blue.', correct: false }, { label: 'It is a triangle.', correct: true }, { label: 'It is a circle.', correct: false }] },
        { emoji: '⭕', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'circle', correct: true }, { label: 'square', correct: false }, { label: 'triangle', correct: false }] },
      ],
    },
  ],
};
