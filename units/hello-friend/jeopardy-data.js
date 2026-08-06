/* ============================================================
   Unit 2: All About Me! — Jeopardy review-game content.
   Hand-authored (Unit 2 predates the UNIT_CONFIG/UnitBuilder
   pattern, so there's no data.js to auto-derive this from).
   ============================================================ */

window.JEOPARDY_CONFIG = {
  unitId: 'hello-friend',
  unitNameEn: 'Unit 2: All About Me!',
  unitNameKr: '나에 대해 소개하기',
  backHref: 'index.html',
  categories: [
    {
      titleEn: 'Vocabulary', titleKr: '단어',
      clues: [
        { points: 100, emoji: '3️⃣', clueEn: 'What number is this?', clueKr: '이건 몇일까요?', answerEn: 'three', answerKr: '셋' },
        { points: 200, emoji: '7️⃣', clueEn: 'What number is this?', clueKr: '이건 몇일까요?', answerEn: 'seven', answerKr: '일곱' },
        { points: 300, emoji: '🍕', clueEn: 'What is this in English?', clueKr: '이건 영어로 무엇일까요?', answerEn: 'pizza', answerKr: '피자' },
        { points: 400, emoji: '⚽', clueEn: 'What is this in English?', clueKr: '이건 영어로 무엇일까요?', answerEn: 'soccer', answerKr: '축구' },
      ],
    },
    {
      titleEn: 'Ask & Answer', titleKr: '질문과 대답',
      clues: [
        { points: 100, emoji: '📛', clueEn: "What's your name?", clueKr: '이름이 뭐예요?', answerEn: 'My name is Minjun.', answerKr: '내 이름은 민준이에요.' },
        { points: 200, emoji: '🔢', clueEn: 'How old are you?', clueKr: '몇 살이에요?', answerEn: 'I am eight years old.', answerKr: '저는 여덟 살이에요.' },
        { points: 300, emoji: '🍕', clueEn: 'What do you like?', clueKr: '무엇을 좋아해요?', answerEn: 'I like pizza.', answerKr: '나는 피자를 좋아해요.' },
        { points: 400, emoji: '🐶', clueEn: 'Do you like dogs or cats?', clueKr: '강아지가 좋아요, 고양이가 좋아요?', answerEn: 'I like dogs.', answerKr: '나는 강아지를 좋아해요.' },
      ],
    },
    {
      titleEn: 'Say It Right', titleKr: '문장 말하기',
      clues: [
        { points: 100, emoji: '🙋', clueEn: 'How do you say this?', clueKr: '내 이름은 민준이야.', answerEn: 'My name is Minjun.', answerKr: '' },
        { points: 200, emoji: '7️⃣', clueEn: 'How do you say this?', clueKr: '저는 일곱 살이에요.', answerEn: 'I am seven years old.', answerKr: '' },
        { points: 300, emoji: '🍕', clueEn: 'How do you say this?', clueKr: '나는 피자를 좋아해.', answerEn: 'I like pizza.', answerKr: '' },
        { points: 400, emoji: '🐶', clueEn: 'How do you say this?', clueKr: '나는 강아지를 좋아해.', answerEn: 'I like dogs.', answerKr: '' },
      ],
    },
    {
      titleEn: 'Quick Review', titleKr: '빠른 복습',
      clues: [
        { points: 100, emoji: '5️⃣', clueEn: 'What number is this?', clueKr: '이건 몇일까요?', answerEn: 'five', answerKr: '다섯' },
        { points: 200, emoji: '📚', clueEn: 'What is this in English?', clueKr: '이건 영어로 무엇일까요?', answerEn: 'books', answerKr: '책' },
        { points: 300, emoji: '🐱', clueEn: 'What is this in English?', clueKr: '이건 영어로 무엇일까요?', answerEn: 'cats', answerKr: '고양이' },
        { points: 400, emoji: '🍦', clueEn: 'What is this in English?', clueKr: '이건 영어로 무엇일까요?', answerEn: 'ice cream', answerKr: '아이스크림' },
      ],
    },
  ],
};
