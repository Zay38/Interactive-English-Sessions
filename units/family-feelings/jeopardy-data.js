/* ============================================================
   Unit 1: My Family & My Feelings — Jeopardy review-game content.
   Hand-authored (Unit 1 predates the UNIT_CONFIG/UnitBuilder
   pattern, so there's no data.js to auto-derive this from).
   ============================================================ */

window.JEOPARDY_CONFIG = {
  unitId: 'family-feelings',
  unitNameEn: 'Unit 1: My Family & My Feelings',
  unitNameKr: '나의 가족과 감정',
  backHref: 'index.html',
  categories: [
    {
      titleEn: 'Vocabulary', titleKr: '단어',
      clues: [
        { points: 100, emoji: '👨', clueEn: 'What is this in English?', clueKr: '이건 영어로 무엇일까요?', answerEn: 'dad', answerKr: '아빠' },
        { points: 200, emoji: '👧', clueEn: 'What is this in English?', clueKr: '이건 영어로 무엇일까요?', answerEn: 'sister', answerKr: '언니/누나/여동생' },
        { points: 300, emoji: '😊', clueEn: 'What is this in English?', clueKr: '이건 영어로 무엇일까요?', answerEn: 'happy', answerKr: '행복한' },
        { points: 400, emoji: '😱', clueEn: 'What is this in English?', clueKr: '이건 영어로 무엇일까요?', answerEn: 'scared', answerKr: '무서운' },
      ],
    },
    {
      titleEn: 'Ask & Answer', titleKr: '질문과 대답',
      clues: [
        { points: 100, emoji: '😊', clueEn: 'How do you feel?', clueKr: '너는 기분이 어때?', answerEn: 'I am happy.', answerKr: '나는 행복해요.' },
        { points: 200, emoji: '👦😴', clueEn: 'How does he feel?', clueKr: '그는 기분이 어때?', answerEn: 'He is tired.', answerKr: '그는 피곤해요.' },
        { points: 300, emoji: '👵😢', clueEn: 'How does she feel?', clueKr: '그녀는 기분이 어때?', answerEn: 'She is sad.', answerKr: '그녀는 슬퍼요.' },
        { points: 400, emoji: '👵🤩', clueEn: 'How does your grandma feel?', clueKr: '할머니는 기분이 어때요?', answerEn: 'She is excited.', answerKr: '그녀는 신나요.' },
      ],
    },
    {
      titleEn: 'Say It Right', titleKr: '문장 말하기',
      clues: [
        { points: 100, emoji: '👩', clueEn: 'How do you say this?', clueKr: '이 사람은 우리 엄마예요.', answerEn: 'This is my mom.', answerKr: '' },
        { points: 200, emoji: '👦', clueEn: 'How do you say this?', clueKr: '그는 우리 형(오빠)이에요.', answerEn: 'He is my brother.', answerKr: '' },
        { points: 300, emoji: '👧', clueEn: 'How do you say this?', clueKr: '그녀는 우리 언니(누나)예요.', answerEn: 'She is my sister.', answerKr: '' },
        { points: 400, emoji: '😊', clueEn: 'How do you say this?', clueKr: '나는 행복해요.', answerEn: 'I am happy.', answerKr: '' },
      ],
    },
    {
      titleEn: 'Quick Review', titleKr: '빠른 복습',
      clues: [
        { points: 100, emoji: '👵', clueEn: 'What is this in English?', clueKr: '이건 영어로 무엇일까요?', answerEn: 'grandma', answerKr: '할머니' },
        { points: 200, emoji: '😢', clueEn: 'What feeling is this?', clueKr: '이건 어떤 기분일까요?', answerEn: 'sad', answerKr: '슬픈' },
        { points: 300, emoji: '👨', clueEn: 'Choose the correct sentence for this picture.', clueKr: '그림에 맞는 문장을 고르세요.', answerEn: 'This is my dad.', answerKr: '' },
        { points: 400, emoji: '🤤', clueEn: 'What feeling is this?', clueKr: '이건 어떤 기분일까요?', answerEn: 'hungry', answerKr: '배고픈' },
      ],
    },
  ],
};
