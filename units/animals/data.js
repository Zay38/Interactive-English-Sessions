/* ============================================================
   Unit 4: Animals — content data for UnitBuilder
   Level: Beg (1-2학년 눈높이) · Main topic: animals,
   "What's this?"/"It is a ___." + "I have a pet ___."
   Capstone: Build MY Pet Card!
   ============================================================ */

const animalVocab = [
  { emoji: '🐶', en: 'dog', kr: '강아지', exampleEn: "Look! It's a dog.", exampleKr: '봐! 강아지야!' },
  { emoji: '🐱', en: 'cat', kr: '고양이', exampleEn: "Look! It's a cat.", exampleKr: '봐! 고양이야!' },
  { emoji: '🦁', en: 'lion', kr: '사자', exampleEn: "Look! It's a lion.", exampleKr: '봐! 사자야!' },
  { emoji: '🐘', en: 'elephant', kr: '코끼리', exampleEn: "Look! It's an elephant.", exampleKr: '봐! 코끼리야!' },
  { emoji: '🐵', en: 'monkey', kr: '원숭이', exampleEn: "Look! It's a monkey.", exampleKr: '봐! 원숭이야!' },
  { emoji: '🐦', en: 'bird', kr: '새', exampleEn: "Look! It's a bird.", exampleKr: '봐! 새야!' },
  { emoji: '🐟', en: 'fish', kr: '물고기', exampleEn: "Look! It's a fish.", exampleKr: '봐! 물고기야!' },
  { emoji: '🐰', en: 'rabbit', kr: '토끼', exampleEn: "Look! It's a rabbit.", exampleKr: '봐! 토끼야!' },
];

window.UNIT_CONFIG = {
  unitId: 'animals',
  previousUnit: { id: 'my-body', nameEn: 'Unit 3: My Body' },
  headingEn: 'Unit 4: Animals',
  emojiRow: '🐶 ➜ 🦁🐘🐵 ➜ 🐾',
  subtitleEn: 'Explore the animal safari and build YOUR OWN pet card! (~20-25 min)',
  subtitleKr: '동물 사파리를 탐험하고 나만의 반려동물 카드를 만들어봐요!',
  learnListEn: "🐶 Animals · ❓ What's this? · 🐾 I have a pet ___. · 🐾 MY Pet Card · 🎤 Speaking · ⭐ Points",
  learnListKr: '동물 · 이게 뭐예요? · 반려동물 말하기 · 나만의 반려동물 카드 · 말하기 활동 · 포인트 모으기',
  finishTagline: { en: 'You can talk about animals now!', example: "What's this? It's a dog!", kr: '이제 동물을 영어로 말할 수 있어요!' },

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
      type: 'vocab', id: 'screen-vocab-animals', timeMin: 3,
      headingEn: 'Animal Safari', headingKr: '동물 사파리',
      instrEn: 'Tap a card to hear the word. Tap 🔊 to hear it again.',
      instrKr: '카드를 눌러 단어를 들어봐요.',
      items: animalVocab,
    },
    { type: 'game', id: 'screen-game-animals', timeMin: 2, items: animalVocab, rounds: 6, pointsPerCorrect: 10 },
    {
      type: 'grammar', id: 'screen-grammar-animals', timeMin: 3,
      headingEn: "What's This?", headingKr: '이게 뭐예요?',
      instrEn: 'Ask what something is, and say if you have one as a pet.',
      instrKr: '무엇인지 물어보고, 반려동물로 키우는지 말해요.',
      patterns: [
        { en: "What's this? — It's a ___.", kr: '이게 뭐예요? — 이건 ___예요.' },
        { en: 'I have a pet ___.', kr: '나는 반려동물 ___가 있어요.' },
      ],
      qaLabelEn: '🔑 Question vs. Answer', qaLabelKr: '질문은 이렇게, 대답은 이렇게!',
      qaInstrEn: 'Questions and answers use different words. Match them up!',
      qaInstrKr: '질문 단어와 대답 단어가 서로 달라요. 짝지어 기억해요.',
      qaPairs: [
        { qEn: "What's this?", qKr: '이게 뭐예요?', aEn: "It's a dog.", aKr: '이건 강아지예요.' },
        { qEn: 'Do you have a pet?', qKr: '반려동물이 있어요?', aEn: 'Yes, I have a pet cat.', aKr: '네, 저는 반려동물 고양이가 있어요.' },
      ],
    },
    {
      type: 'practice', id: 'screen-practice-animals', timeMin: 3,
      sentenceItems: [
        { emoji: '🐶', kr: '이건 강아지예요.', words: ['It', 'is', 'a', 'dog', '.'] },
        { emoji: '🐱', kr: '나는 반려동물 고양이가 있어요.', words: ['I', 'have', 'a', 'pet', 'cat', '.'] },
        { emoji: '🦁', kr: '이건 사자예요.', words: ['It', 'is', 'a', 'lion', '.'] },
      ],
      phaseB: {
        pointsPerCorrect: 10,
        questions: [
          {
            emoji: '🐘', stemEn: 'Question: "What\'s this?"', stemKr: '무엇인지 물어봤어요. 어떻게 대답할까요?',
            options: [{ label: 'It is an elephant.', correct: true }, { label: 'I have a pet elephant.', correct: false }, { label: 'It is a monkey.', correct: false }],
          },
          {
            emoji: '🐰', stemEn: 'Question: "Do you have a pet?"', stemKr: '반려동물이 있는지 물어봤어요. 어떻게 대답할까요?',
            options: [{ label: 'It is a rabbit.', correct: false }, { label: 'Yes, I have a pet rabbit.', correct: true }, { label: "What's this?", correct: false }],
          },
          {
            emoji: '🐦', stemEn: 'Question: "What\'s this?"', stemKr: '무엇인지 물어봤어요. 어떻게 대답할까요?',
            options: [{ label: 'It is a bird.', correct: true }, { label: 'I have a pet bird.', correct: false }, { label: 'It is a fish.', correct: false }],
          },
        ],
      },
    },
    {
      type: 'capstone', id: 'screen-build-pet', timeMin: 3,
      kickerEn: 'MY PET', kickerKr: '나만의 반려동물',
      headingEn: 'Build MY Pet Card! 🐾', headingKr: '나만의 반려동물 카드 만들기',
      instrEn: 'Pick an animal and a personality to build YOUR OWN pet card!',
      instrKr: '동물과 성격을 골라서 나만의 반려동물 카드를 만들어요!',
      cardTitleEn: 'MY PET', cardTitleKr: '나만의 반려동물',
      placeholderEn: 'My pet is a ___. It is ___!',
      placeholderKr: '내 반려동물은 ___예요. ___!',
      points: 25,
      groups: [
        {
          key: 'animal', labelEn: 'Pick an animal', labelKr: '동물을 골라요',
          speakTemplate: (en) => `a ${en}`,
          options: animalVocab.map(a => ({ emoji: a.emoji, en: a.en, kr: a.kr })),
        },
        {
          key: 'trait', labelEn: 'Pick a personality', labelKr: '성격을 골라요',
          options: [
            { emoji: '😊', en: 'happy', kr: '행복해요' },
            { emoji: '😂', en: 'funny', kr: '웃겨요' },
            { emoji: '🥰', en: 'cute', kr: '귀여워요' },
            { emoji: '💪', en: 'brave', kr: '용감해요' },
            { emoji: '😴', en: 'sleepy', kr: '졸려요' },
          ],
        },
      ],
      template: (name, picks) => ({
        en: `Hi! My pet is a ${picks.animal.en}. It is ${picks.trait.en}!`,
        kr: `안녕! ${name}의 반려동물은 ${picks.animal.kr}예요. ${picks.trait.kr}!`,
      }),
    },
    {
      type: 'mystery', id: 'screen-speak-mystery', timeMin: 4,
      headingEn: 'Mystery Animal Box! 🎁',
      instrEn: 'Tap a box to meet an animal. Say its FULL description out loud! Tap ✔ when done.',
      instrKr: '상자를 눌러 동물을 만나고, 설명을 크게 말해봐요.',
      items: [
        { emoji: '🐘', sentenceEn: "It's a big elephant. It is gray.", sentenceKr: '큰 코끼리예요. 회색이에요.' },
        { emoji: '🦁', sentenceEn: "It's a strong lion. It is brave.", sentenceKr: '힘센 사자예요. 용감해요.' },
        { emoji: '🐰', sentenceEn: "It's a small rabbit. It is cute.", sentenceKr: '작은 토끼예요. 귀여워요.' },
        { emoji: '🐵', sentenceEn: "It's a funny monkey. It is fast.", sentenceKr: '웃긴 원숭이예요. 빨라요.' },
        { emoji: '🐟', sentenceEn: "It's a small fish. It is quiet.", sentenceKr: '작은 물고기예요. 조용해요.' },
        { emoji: '🐦', sentenceEn: "It's a little bird. It can fly.", sentenceKr: '작은 새예요. 날 수 있어요.' },
      ],
    },
    {
      type: 'interview', id: 'screen-speak-interview', timeMin: 3,
      headingEn: 'Animal Interview 🎤',
      prompts: [
        { en: "What's your favorite animal?", kr: '가장 좋아하는 동물이 뭐예요?', hintEn: 'Answer with: My favorite animal is ___.', hintKr: '가장 좋아하는 동물은 ___예요' },
        { en: 'Do you have a pet?', kr: '반려동물이 있어요?', hintEn: 'Answer with: Yes, I have a pet ___. / No, I don\'t.', hintKr: '네, 저는 반려동물 ___가 있어요' },
        { en: 'Is a lion big or small?', kr: '사자는 커요, 작아요?', hintEn: 'Answer with: A lion is big.', hintKr: '사자는 커요' },
        { en: 'Can a bird fly?', kr: '새는 날 수 있어요?', hintEn: 'Answer with: Yes, a bird can fly.', hintKr: '네, 새는 날 수 있어요' },
        { en: "What's this?", kr: '이게 뭐예요?', hintEn: "Answer with: It's a ___.", hintKr: '이건 ___예요' },
        { en: 'What sound does a dog make?', kr: '강아지는 어떤 소리를 내요?', hintEn: 'Answer with: Woof woof!', hintKr: '멍멍!' },
      ],
    },
    {
      type: 'quiz', id: 'screen-quiz-final', timeMin: 3,
      questions: [
        { emoji: '🐘', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'elephant', correct: true }, { label: 'monkey', correct: false }, { label: 'lion', correct: false }] },
        { emoji: '🐟', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'bird', correct: false }, { label: 'fish', correct: true }, { label: 'rabbit', correct: false }] },
        { emoji: '🐶', stemEn: 'Question: "What\'s this?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.', options: [{ label: 'I have a pet dog.', correct: false }, { label: "It's a dog.", correct: true }, { label: "It's a cat.", correct: false }] },
        { emoji: '🐱', stemEn: 'Question: "Do you have a pet?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.', options: [{ label: "It's a cat.", correct: false }, { label: 'Yes, I have a pet cat.', correct: true }, { label: "What's this?", correct: false }] },
        { emoji: '🦁', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?', options: [{ label: 'lion', correct: true }, { label: 'dog', correct: false }, { label: 'bird', correct: false }] },
      ],
    },
  ],
};
