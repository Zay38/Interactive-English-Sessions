/* ============================================================
   Unit 3: My Body — content data for UnitBuilder
   Level: Beg (1-2학년 눈높이) · Main topic: body parts,
   "Touch your ___!" / "I have two ___." · Capstone: Build MY Monster!
   ============================================================ */

const bodyVocab = [
  { emoji: '😀', en: 'face', kr: '얼굴', exampleEn: 'Touch your face!', exampleKr: '얼굴을 만져보세요!' },
  { emoji: '👀', en: 'eyes', kr: '눈', exampleEn: 'Touch your eyes!', exampleKr: '눈을 만져보세요!' },
  { emoji: '👃', en: 'nose', kr: '코', exampleEn: 'Touch your nose!', exampleKr: '코를 만져보세요!' },
  { emoji: '👄', en: 'mouth', kr: '입', exampleEn: 'Touch your mouth!', exampleKr: '입을 만져보세요!' },
  { emoji: '👂', en: 'ears', kr: '귀', exampleEn: 'Touch your ears!', exampleKr: '귀를 만져보세요!' },
  { emoji: '✋', en: 'hands', kr: '손', exampleEn: 'Touch your hands!', exampleKr: '손을 만져보세요!' },
  { emoji: '💪', en: 'arms', kr: '팔', exampleEn: 'Touch your arms!', exampleKr: '팔을 만져보세요!' },
  { emoji: '🦵', en: 'legs', kr: '다리', exampleEn: 'Touch your legs!', exampleKr: '다리를 만져보세요!' },
];

window.UNIT_CONFIG = {
  unitId: 'my-body',
  headingEn: 'Unit 3: My Body',
  emojiRow: '😀 ➜ 👀👃👄 ➜ 👹',
  subtitleEn: "Learn your body parts and build YOUR OWN silly monster! (~20-25 min)",
  subtitleKr: '신체 부위를 배우고 나만의 몬스터를 만들어봐요!',
  learnListEn: '😀 Body Parts · 👉 Touch your ___! · 🔢 I have two ___. · 👹 MY Monster Card · 🎤 Speaking · ⭐ Points',
  learnListKr: '신체 부위 · 명령하기 · 개수 말하기 · 나만의 몬스터 카드 · 말하기 활동 · 포인트 모으기',
  finishTagline: { en: 'You can talk about your body now!', example: 'I have two eyes. Touch your nose!', kr: '이제 몸을 영어로 말할 수 있어요!' },

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
      type: 'vocab', id: 'screen-vocab-body', timeMin: 3,
      headingEn: 'My Body', headingKr: '나의 몸',
      instrEn: 'Tap a card to hear the word. Tap 🔊 to hear it again.',
      instrKr: '카드를 눌러 단어를 들어봐요.',
      items: bodyVocab,
    },
    {
      type: 'game', id: 'screen-game-body', timeMin: 2, items: bodyVocab, rounds: 6, pointsPerCorrect: 10,
    },
    {
      type: 'grammar', id: 'screen-grammar-body', timeMin: 3,
      headingEn: 'Touch Your Nose!', headingKr: '코를 만져보세요!',
      instrEn: 'Give commands with "Touch your ___!" and count with "I have two ___."',
      instrKr: '"Touch your ___!"로 명령하고, "I have two ___."로 개수를 말해요.',
      patterns: [
        { en: 'Touch your ___!', kr: '___를 만져보세요!' },
        { en: 'I have two ___.', kr: '나는 ___이(가) 두 개 있어요.' },
      ],
      qaLabelEn: '🔑 Question vs. Answer', qaLabelKr: '질문은 이렇게, 대답은 이렇게!',
      qaInstrEn: 'Questions and answers use different words. Match them up!',
      qaInstrKr: '질문 단어와 대답 단어가 서로 달라요. 짝지어 기억해요.',
      qaPairs: [
        { qEn: 'How many eyes do you have?', qKr: '눈이 몇 개 있어요?', aEn: 'I have two eyes.', aKr: '나는 눈이 두 개 있어요.' },
        { qEn: 'How many hands do you have?', qKr: '손이 몇 개 있어요?', aEn: 'I have two hands.', aKr: '나는 손이 두 개 있어요.' },
      ],
    },
    {
      type: 'practice', id: 'screen-practice-body', timeMin: 3,
      instrEn: 'Tap the word tiles in order to build the sentence.',
      instrKr: '단어 카드를 순서대로 눌러요.',
      sentenceItems: [
        { emoji: '👀', kr: '나는 눈이 두 개 있어요.', words: ['I', 'have', 'two', 'eyes', '.'] },
        { emoji: '✋', kr: '손을 만져보세요!', words: ['Touch', 'your', 'hands', '!'] },
        { emoji: '🦵', kr: '나는 다리가 두 개 있어요.', words: ['I', 'have', 'two', 'legs', '.'] },
      ],
      phaseB: {
        pointsPerCorrect: 10,
        questions: [
          {
            emoji: '👀', stemEn: 'Question: "How many eyes do you have?"', stemKr: '눈에 대해 물어봤어요. 어떻게 대답할까요?',
            options: [{ label: 'I have two eyes.', correct: true }, { label: 'Touch your eyes!', correct: false }, { label: 'I have two hands.', correct: false }],
          },
          {
            emoji: '🦵', stemEn: 'Question: "How many legs do you have?"', stemKr: '다리에 대해 물어봤어요. 어떻게 대답할까요?',
            options: [{ label: 'I have two arms.', correct: false }, { label: 'I have two legs.', correct: true }, { label: 'Touch your legs!', correct: false }],
          },
          {
            emoji: '👂', stemEn: 'Question: "How many ears do you have?"', stemKr: '귀에 대해 물어봤어요. 어떻게 대답할까요?',
            options: [{ label: 'I have two hands.', correct: false }, { label: 'Touch your ears!', correct: false }, { label: 'I have two ears.', correct: true }],
          },
        ],
      },
    },
    {
      type: 'capstone', id: 'screen-build-monster', timeMin: 3,
      kickerEn: 'MY MONSTER', kickerKr: '나만의 몬스터',
      headingEn: 'Build MY Monster! 👹', headingKr: '나만의 몬스터 만들기',
      instrEn: 'Pick how many eyes and what color to build YOUR OWN silly monster!',
      instrKr: '눈의 개수와 색깔을 골라서 나만의 몬스터를 만들어요!',
      cardTitleEn: 'MY MONSTER', cardTitleKr: '나만의 몬스터',
      placeholderEn: "I'm a monster! I have ___ ___ eyes!",
      placeholderKr: '나는 몬스터야! 나는 ___ ___ 눈이 있어!',
      points: 25,
      groups: [
        {
          key: 'count', labelEn: 'How many eyes?', labelKr: '눈이 몇 개예요?',
          speakTemplate: (en) => `${en} eyes`,
          options: [
            { emoji: '1️⃣', en: 'one', kr: '한' },
            { emoji: '2️⃣', en: 'two', kr: '두' },
            { emoji: '3️⃣', en: 'three', kr: '세' },
            { emoji: '4️⃣', en: 'four', kr: '네' },
          ],
        },
        {
          key: 'color', labelEn: 'What color?', labelKr: '무슨 색이에요?',
          options: [
            { emoji: '🔴', en: 'red', kr: '빨간' },
            { emoji: '🔵', en: 'blue', kr: '파란' },
            { emoji: '🟢', en: 'green', kr: '초록' },
            { emoji: '🟣', en: 'purple', kr: '보라' },
            { emoji: '🟡', en: 'yellow', kr: '노란' },
          ],
        },
      ],
      template: (name, picks) => ({
        en: `Hi! I'm ${name}'s monster! I have ${picks.count.en} ${picks.color.en} eyes!`,
        kr: `안녕! 나는 ${name}의 몬스터야! 나는 ${picks.color.kr} 눈이 ${picks.count.kr} 개 있어!`,
      }),
    },
    {
      type: 'mystery', id: 'screen-speak-mystery', timeMin: 4,
      headingEn: 'Mystery Creature Box! 🎁',
      instrEn: 'Tap a box to meet a creature. Say its FULL description out loud! Tap ✔ when done.',
      instrKr: '상자를 눌러 생물을 만나고, 설명을 크게 말해봐요.',
      items: [
        { emoji: '👽', sentenceEn: "I'm an alien! I have three green eyes.", sentenceKr: '나는 외계인이야! 나는 초록색 눈이 세 개 있어.' },
        { emoji: '🤖', sentenceEn: "I'm a robot! I have two blue arms.", sentenceKr: '나는 로봇이야! 나는 파란색 팔이 두 개 있어.' },
        { emoji: '👹', sentenceEn: "I'm a monster! I have one big nose.", sentenceKr: '나는 몬스터야! 나는 큰 코가 하나 있어.' },
        { emoji: '🐙', sentenceEn: "I'm an octopus! I have eight legs.", sentenceKr: '나는 문어야! 나는 다리가 여덟 개 있어.' },
        { emoji: '🐰', sentenceEn: "I'm a rabbit! I have two long ears.", sentenceKr: '나는 토끼야! 나는 긴 귀가 두 개 있어.' },
        { emoji: '🦄', sentenceEn: "I'm a unicorn! I have two pink eyes.", sentenceKr: '나는 유니콘이야! 나는 분홍색 눈이 두 개 있어.' },
      ],
    },
    {
      type: 'interview', id: 'screen-speak-interview', timeMin: 3,
      headingEn: 'Body Interview 🎤',
      prompts: [
        { en: 'How many eyes do you have?', kr: '눈이 몇 개 있어요?', hintEn: 'Answer with: I have ___ eyes.', hintKr: '나는 눈이 ___개 있어요' },
        { en: 'How many hands do you have?', kr: '손이 몇 개 있어요?', hintEn: 'Answer with: I have ___ hands.', hintKr: '나는 손이 ___개 있어요' },
        { en: 'Touch your nose!', kr: '코를 만져보세요!', hintEn: 'Just touch it!', hintKr: '그냥 만져봐요!' },
        { en: 'Touch your ears!', kr: '귀를 만져보세요!', hintEn: 'Just touch it!', hintKr: '그냥 만져봐요!' },
        { en: 'How many legs do you have?', kr: '다리가 몇 개 있어요?', hintEn: 'Answer with: I have ___ legs.', hintKr: '나는 다리가 ___개 있어요' },
        { en: 'What color are your eyes?', kr: '눈이 무슨 색이에요?', hintEn: 'Answer with: My eyes are ___.', hintKr: '내 눈은 ___색이에요' },
      ],
    },
    {
      type: 'quiz', id: 'screen-quiz-final', timeMin: 3,
      questions: [
        {
          emoji: '👃', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?',
          options: [{ label: 'nose', correct: true }, { label: 'mouth', correct: false }, { label: 'ear', correct: false }],
        },
        {
          emoji: '👀', stemEn: 'Question: "How many eyes do you have?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.',
          options: [{ label: 'Touch your eyes!', correct: false }, { label: 'I have two eyes.', correct: true }, { label: 'I have two hands.', correct: false }],
        },
        {
          emoji: '✋', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?',
          options: [{ label: 'hands', correct: true }, { label: 'arms', correct: false }, { label: 'legs', correct: false }],
        },
        {
          emoji: '🦵', stemEn: 'What is this in English?', stemKr: '이건 영어로 무엇일까요?',
          options: [{ label: 'arms', correct: false }, { label: 'legs', correct: true }, { label: 'hands', correct: false }],
        },
        {
          emoji: '🦵', stemEn: 'Question: "How many legs do you have?" — choose the answer.', stemKr: '질문에 맞는 대답을 고르세요.',
          options: [{ label: 'I have two legs.', correct: true }, { label: 'I have two eyes.', correct: false }, { label: 'Touch your legs!', correct: false }],
        },
      ],
    },
  ],
};
