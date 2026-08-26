/* ============================================================
   Unit 15: Yesterday's Adventure — Advanced roleplay.

   The hardest step in the course: the past tense. Rather than
   drilling conjugations, the scenes keep re-asking "What did you
   do?" so the student produces went / ate / saw / played over and
   over in context. The verbs are deliberately the common irregular
   ones, since those are the ones Korean learners meet first and
   get wrong longest.
   ============================================================ */

window.ROLEPLAY_CONFIG = {
  unitId: 'yesterday',
  headingEn: "Unit 15: Yesterday's Adventure",
  emojiRow: '🕰️ ➜ 🎡 ➜ 📸',
  subtitleEn: 'Tell the story of what you did yesterday! (~20-25 min)',
  subtitleKr: '어제 한 일을 영어로 이야기해요!',
  learnListEn: '💬 3 Conversations · 🕰️ Past tense · 🎡 went / ate / saw · 📸 Telling a story · 🎤 Say Every Line · ⭐ Points',
  learnListKr: '3개의 대화 · 과거형 · 불규칙 동사 · 이야기하기 · 모든 문장 말하기 · 포인트 모으기',

  warmupVocab: [
    { emoji: '🚶', en: 'went', kr: '갔다 (go의 과거)', exampleEn: 'I went to the park.', exampleKr: '공원에 갔어요.' },
    { emoji: '🍽️', en: 'ate', kr: '먹었다 (eat의 과거)', exampleEn: 'I ate pizza.', exampleKr: '피자를 먹었어요.' },
    { emoji: '👀', en: 'saw', kr: '봤다 (see의 과거)', exampleEn: 'I saw a big elephant.', exampleKr: '큰 코끼리를 봤어요.' },
    { emoji: '⚽', en: 'played', kr: '놀았다 (play의 과거)', exampleEn: 'I played soccer.', exampleKr: '축구를 했어요.' },
    { emoji: '🎡', en: 'zoo', kr: '동물원', exampleEn: 'We went to the zoo.', exampleKr: '동물원에 갔어요.' },
    { emoji: '😊', en: 'was', kr: '였다 (is의 과거)', exampleEn: 'It was so much fun.', exampleKr: '정말 재미있었어요.' },
    { emoji: '📸', en: 'took a photo', kr: '사진을 찍었다', exampleEn: 'I took a photo with my dad.', exampleKr: '아빠랑 사진을 찍었어요.' },
    { emoji: '🌙', en: 'yesterday', kr: '어제', exampleEn: 'Yesterday was a great day.', exampleKr: '어제는 정말 좋은 날이었어요.' },
  ],

  scenes: [
    {
      id: 'scene-monday',
      titleEn: 'Monday Morning', titleKr: '월요일 아침',
      timeMin: 6,
      setting: '🌙',
      settingEn: 'Your teacher asks the class about the weekend.',
      settingKr: '선생님이 주말에 뭐 했는지 물어봐요.',
      npc: { nameEn: 'Teacher 선생님', emoji: '👩‍🏫' },
      pointsPerReply: 10, pointsPerSpoken: 15,
      turns: [
        {
          npcEn: 'Good morning! What did you do yesterday?',
          npcKr: '좋은 아침! 어제 뭐 했어요?',
          replies: [
            { en: 'I went to the zoo with my family.', kr: '가족이랑 동물원에 갔어요.', best: true },
            { en: 'The zoo.', kr: '동물원이요.', best: false },
          ],
        },
        {
          npcEn: 'The zoo! What did you see there?',
          npcKr: '동물원이요! 거기서 뭘 봤어요?',
          replies: [
            { en: 'I saw a big elephant and two lions!', kr: '큰 코끼리랑 사자 두 마리를 봤어요!', best: true },
            { en: 'An elephant.', kr: '코끼리요.', best: false },
          ],
        },
        {
          npcEn: 'Wonderful! What did you eat?',
          npcKr: '멋지네요! 뭘 먹었어요?',
          replies: [
            { en: 'I ate a hot dog and ice cream.', kr: '핫도그랑 아이스크림을 먹었어요.', best: true },
            { en: 'Ice cream.', kr: '아이스크림이요.', best: false },
          ],
        },
        {
          npcEn: 'That sounds like a great day!',
          npcKr: '정말 좋은 하루였겠네요!',
          replies: [
            { en: 'It was! It was so much fun.', kr: '맞아요! 정말 재미있었어요.', best: true },
            { en: 'Yes.', kr: '네.', best: false },
          ],
        },
      ],
      wrapUpEn: 'You told a past-tense story — went, saw, ate, was!',
      wrapUpKr: '과거형으로 이야기했어요 — went, saw, ate, was!',
    },

    {
      id: 'scene-friend',
      titleEn: 'Telling a Friend', titleKr: '친구에게 이야기하기',
      timeMin: 6,
      setting: '📸',
      settingEn: 'Your friend missed the trip and wants to hear about it.',
      settingKr: '여행에 못 간 친구가 이야기를 듣고 싶어해요.',
      npc: { nameEn: 'Jaehee 재희', emoji: '👦' },
      pointsPerReply: 10, pointsPerSpoken: 15,
      turns: [
        {
          npcEn: 'I could not go yesterday. Was it fun?',
          npcKr: '나 어제 못 갔어. 재밌었어?',
          replies: [
            { en: 'Yes, it was really fun! I took a lot of photos.', kr: '응, 정말 재밌었어! 사진도 많이 찍었어.', best: true },
            { en: 'It was fun.', kr: '재밌었어.', best: false },
          ],
        },
        {
          npcEn: 'Who did you go with?',
          npcKr: '누구랑 갔어?',
          replies: [
            { en: 'I went with my mom, my dad and my sister.', kr: '엄마, 아빠, 언니랑 같이 갔어.', best: true },
            { en: 'My family.', kr: '가족이랑.', best: false },
          ],
        },
        {
          npcEn: 'What was your favorite animal?',
          npcKr: '어떤 동물이 제일 좋았어?',
          replies: [
            { en: 'My favorite was the elephant. It was huge!', kr: '코끼리가 제일 좋았어. 진짜 컸어!', best: true },
            { en: 'The elephant.', kr: '코끼리.', best: false },
          ],
        },
        {
          npcEn: 'I want to go too! Can we go next time?',
          npcKr: '나도 가고 싶다! 다음엔 같이 갈까?',
          replies: [
            { en: 'Of course! We can go together next month.', kr: '당연하지! 다음 달에 같이 가자.', best: true },
            { en: 'Sure.', kr: '그래.', best: false },
          ],
        },
      ],
      wrapUpEn: 'You mixed past and future in one conversation!',
      wrapUpKr: '한 대화 안에서 과거와 미래를 함께 썼어요!',
    },

    {
      id: 'scene-diary',
      titleEn: 'My Diary', titleKr: '나의 일기',
      timeMin: 6,
      setting: '📔',
      settingEn: 'Your mom reads your English diary and asks about it.',
      settingKr: '엄마가 영어 일기를 읽고 물어봐요.',
      npc: { nameEn: 'Mom 엄마', emoji: '👩' },
      pointsPerReply: 10, pointsPerSpoken: 15,
      turns: [
        {
          npcEn: 'I read your diary. What did you write about?',
          npcKr: '일기 읽어봤어. 무엇에 대해 썼니?',
          replies: [
            { en: 'I wrote about our trip to the zoo.', kr: '동물원에 간 이야기를 썼어요.', best: true },
            { en: 'The zoo.', kr: '동물원이요.', best: false },
          ],
        },
        {
          npcEn: 'How did you feel that day?',
          npcKr: '그날 기분이 어땠니?',
          replies: [
            { en: 'I was very happy and a little tired.', kr: '아주 행복했고 조금 피곤했어요.', best: true },
            { en: 'Happy.', kr: '행복했어요.', best: false },
          ],
        },
        {
          npcEn: 'What did you like the most?',
          npcKr: '뭐가 제일 좋았니?',
          replies: [
            { en: 'I liked the elephant the most. It was amazing!', kr: '코끼리가 제일 좋았어요. 정말 멋졌어요!', best: true },
            { en: 'The elephant.', kr: '코끼리요.', best: false },
          ],
        },
        {
          npcEn: 'Your English is getting so good!',
          npcKr: '영어 실력이 정말 늘었구나!',
          replies: [
            { en: 'Thank you, Mom! I practice every day.', kr: '고마워요, 엄마! 매일 연습해요.', best: true },
            { en: 'Thank you.', kr: '고마워요.', best: false },
          ],
        },
      ],
      wrapUpEn: 'You described feelings in the past — I was happy, it was amazing!',
      wrapUpKr: '과거의 감정을 표현했어요 — I was happy, it was amazing!',
    },
  ],
};
