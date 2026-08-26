/* ============================================================
   Unit 13: Seasons & Plans — first Advanced roleplay.

   The Advanced tier's step up is TENSE. Everything before this unit
   lives in the present; here the student starts talking about what
   has not happened yet, with "I'm going to ___" and "I want to ___".
   Weather vocabulary from Unit 8 carries the seasons so the new
   load is grammatical rather than lexical.
   ============================================================ */

window.ROLEPLAY_CONFIG = {
  unitId: 'seasons-plans',
  headingEn: 'Unit 13: Seasons & Plans',
  emojiRow: '🌸 ➜ ☀️ ➜ 🍂 ➜ ❄️',
  subtitleEn: "Talk about seasons and what you're going to do! (~20-25 min)",
  subtitleKr: '계절과 앞으로의 계획을 영어로 이야기해요!',
  learnListEn: "💬 3 Conversations · 🌸 Seasons · 🗓️ I'm going to ___ · 🎒 Making Plans · 🎤 Say Every Line · ⭐ Points",
  learnListKr: '3개의 대화 · 계절 · 미래 표현 · 계획 세우기 · 모든 문장 말하기 · 포인트 모으기',

  warmupVocab: [
    { emoji: '🌸', en: 'spring', kr: '봄', exampleEn: 'Spring is warm and pretty.', exampleKr: '봄은 따뜻하고 예뻐요.' },
    { emoji: '☀️', en: 'summer', kr: '여름', exampleEn: 'Summer is hot.', exampleKr: '여름은 더워요.' },
    { emoji: '🍂', en: 'fall', kr: '가을', exampleEn: 'Fall is cool and windy.', exampleKr: '가을은 시원하고 바람이 불어요.' },
    { emoji: '❄️', en: 'winter', kr: '겨울', exampleEn: 'Winter is cold and snowy.', exampleKr: '겨울은 춥고 눈이 와요.' },
    { emoji: '🏖️', en: 'beach', kr: '해변', exampleEn: 'I am going to the beach.', exampleKr: '해변에 갈 거예요.' },
    { emoji: '⛄', en: 'snowman', kr: '눈사람', exampleEn: 'I want to make a snowman.', exampleKr: '눈사람을 만들고 싶어요.' },
    { emoji: '🗓️', en: 'weekend', kr: '주말', exampleEn: 'What are you doing this weekend?', exampleKr: '이번 주말에 뭐 해요?' },
    { emoji: '✈️', en: 'trip', kr: '여행', exampleEn: 'We are going on a trip.', exampleKr: '우리는 여행을 갈 거예요.' },
  ],

  scenes: [
    {
      id: 'scene-favorite-season',
      titleEn: 'Favorite Season', titleKr: '좋아하는 계절',
      timeMin: 6,
      setting: '🌸',
      settingEn: 'Your teacher is asking the class about seasons.',
      settingKr: '선생님이 계절에 대해 물어보고 있어요.',
      npc: { nameEn: 'Teacher 선생님', emoji: '👩‍🏫' },
      pointsPerReply: 10, pointsPerSpoken: 15,
      turns: [
        {
          npcEn: "Good morning! What's your favorite season?",
          npcKr: '좋은 아침이에요! 어떤 계절을 가장 좋아해요?',
          replies: [
            { en: 'My favorite season is summer!', kr: '제가 가장 좋아하는 계절은 여름이에요!', best: true },
            { en: 'Summer.', kr: '여름이요.', best: false },
          ],
        },
        {
          npcEn: 'Summer! Why do you like summer?',
          npcKr: '여름이요! 왜 여름을 좋아해요?',
          replies: [
            { en: 'Because it is hot and I can swim.', kr: '더워서 수영을 할 수 있으니까요.', best: true },
            { en: 'It is hot.', kr: '더워서요.', best: false },
          ],
        },
        {
          npcEn: 'That sounds fun. What is the weather like in winter?',
          npcKr: '재밌겠네요. 겨울 날씨는 어때요?',
          replies: [
            { en: 'In winter it is cold and snowy.', kr: '겨울에는 춥고 눈이 와요.', best: true },
            { en: 'Cold.', kr: '추워요.', best: false },
          ],
        },
        {
          npcEn: 'Right! Do you like winter too?',
          npcKr: '맞아요! 겨울도 좋아해요?',
          replies: [
            { en: 'Yes, I do! I want to make a snowman.', kr: '네, 좋아해요! 눈사람을 만들고 싶어요.', best: true },
            { en: 'A little.', kr: '조금이요.', best: false },
          ],
        },
      ],
      wrapUpEn: 'You gave reasons in English — "because" is a big step!',
      wrapUpKr: '이유를 영어로 말했어요 — "because"는 큰 발전이에요!',
    },

    {
      id: 'scene-weekend',
      titleEn: 'Weekend Plans', titleKr: '주말 계획',
      timeMin: 6,
      setting: '🗓️',
      settingEn: "It's Friday. Your friend asks about your weekend.",
      settingKr: '금요일이에요. 친구가 주말 계획을 물어봐요.',
      npc: { nameEn: 'Sora 소라', emoji: '👧' },
      pointsPerReply: 10, pointsPerSpoken: 15,
      turns: [
        {
          npcEn: 'It is Friday! What are you going to do this weekend?',
          npcKr: '금요일이다! 이번 주말에 뭐 할 거야?',
          replies: [
            { en: 'I am going to visit my grandma.', kr: '할머니를 만나러 갈 거야.', best: true },
            { en: 'Visit grandma.', kr: '할머니 만나러.', best: false },
          ],
        },
        {
          npcEn: 'Nice! What are you going to do there?',
          npcKr: '좋겠다! 거기서 뭐 할 거야?',
          replies: [
            { en: 'We are going to cook and watch a movie.', kr: '요리하고 영화를 볼 거야.', best: true },
            { en: 'Cook.', kr: '요리해.', best: false },
          ],
        },
        {
          npcEn: 'That sounds great. I am going to the beach!',
          npcKr: '재밌겠다. 나는 해변에 갈 거야!',
          replies: [
            { en: 'The beach? That sounds fun! Have a good time.', kr: '해변? 재밌겠다! 잘 놀다 와.', best: true },
            { en: 'Nice.', kr: '좋겠다.', best: false },
          ],
        },
        {
          npcEn: 'Thanks! See you on Monday!',
          npcKr: '고마워! 월요일에 보자!',
          replies: [
            { en: 'See you on Monday! Have a great weekend!', kr: '월요일에 봐! 주말 잘 보내!', best: true },
            { en: 'See you.', kr: '또 봐.', best: false },
          ],
        },
      ],
      wrapUpEn: 'You made plans in English using "going to"!',
      wrapUpKr: '"going to"로 계획을 영어로 말했어요!',
    },

    {
      id: 'scene-trip',
      titleEn: 'Planning a Trip', titleKr: '여행 계획하기',
      timeMin: 6,
      setting: '✈️',
      settingEn: 'Your family is planning a trip. Dad wants your ideas.',
      settingKr: '가족 여행을 계획하고 있어요. 아빠가 의견을 물어봐요.',
      npc: { nameEn: 'Dad 아빠', emoji: '👨' },
      pointsPerReply: 10, pointsPerSpoken: 15,
      turns: [
        {
          npcEn: 'We are going on a trip next month. Where do you want to go?',
          npcKr: '다음 달에 여행을 갈 거야. 어디에 가고 싶니?',
          replies: [
            { en: 'I want to go to the beach!', kr: '해변에 가고 싶어요!', best: true },
            { en: 'The beach.', kr: '해변이요.', best: false },
          ],
        },
        {
          npcEn: 'The beach is a good idea. What are you going to bring?',
          npcKr: '해변 좋은 생각이야. 뭘 가져갈 거니?',
          replies: [
            { en: 'I am going to bring my hat and my shoes.', kr: '모자랑 신발을 가져갈 거예요.', best: true },
            { en: 'A hat.', kr: '모자요.', best: false },
          ],
        },
        {
          npcEn: 'Good thinking. What are we going to do at the beach?',
          npcKr: '잘 생각했어. 해변에서 뭘 할까?',
          replies: [
            { en: 'We are going to swim and eat ice cream!', kr: '수영하고 아이스크림을 먹을 거예요!', best: true },
            { en: 'Swim.', kr: '수영이요.', best: false },
          ],
        },
        {
          npcEn: 'Perfect plan! I am excited.',
          npcKr: '완벽한 계획이야! 기대된다.',
          replies: [
            { en: 'Me too! I am so excited, Dad!', kr: '저도요! 정말 기대돼요, 아빠!', best: true },
            { en: 'Me too.', kr: '저도요.', best: false },
          ],
        },
      ],
      wrapUpEn: 'You planned a whole trip in English — start to finish!',
      wrapUpKr: '여행 계획을 처음부터 끝까지 영어로 세웠어요!',
    },
  ],
};
