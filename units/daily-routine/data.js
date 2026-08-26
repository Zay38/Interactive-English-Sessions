/* ============================================================
   Unit 11: My Daily Routine — the first Intermediate roleplay unit.

   Design notes for future units in this tier:
   Almost every word here already appeared in the Beginner tier
   (feelings from Unit 1, food from Unit 5, clothes from Unit 7,
   weather from Unit 8, rooms from Unit 9, school things from
   Unit 10). What is NEW is not vocabulary but LENGTH — the student
   has to keep a conversation going across several turns and choose
   between replies that are all grammatical but differ in meaning.

   Each turn offers a "best" reply (full sentence, answers what was
   actually asked) and a weaker but still-correct one, so a student
   is never punished with a wrong-answer buzzer for real speech —
   they simply earn fewer points for the thinner reply.
   ============================================================ */

window.ROLEPLAY_CONFIG = {
  unitId: 'daily-routine',
  headingEn: 'Unit 11: My Daily Routine',
  emojiRow: '🌅 ➜ 🏫 ➜ 🌙',
  subtitleEn: 'Have a real conversation about your whole day! (~20-25 min)',
  subtitleKr: '하루 일과에 대해 진짜 영어 대화를 해봐요!',
  learnListEn: '💬 3 Conversations · 🌅 Morning · 🏫 School · 🌙 Night · 🎤 Say Every Line · ⭐ Points',
  learnListKr: '3개의 대화 · 아침 · 학교 · 저녁 · 모든 문장 말하기 · 포인트 모으기',

  /* Pulled from Units 1, 5, 7, 8 — recognition, not new learning. */
  warmupVocab: [
    { emoji: '😊', en: 'happy', kr: '행복한', exampleEn: 'I feel happy today.', exampleKr: '오늘 기분이 좋아요.' },
    { emoji: '😴', en: 'tired', kr: '피곤한', exampleEn: 'I am tired in the morning.', exampleKr: '아침에는 피곤해요.' },
    { emoji: '🤤', en: 'hungry', kr: '배고픈', exampleEn: 'I am hungry after school.', exampleKr: '학교 끝나면 배고파요.' },
    { emoji: '🍞', en: 'breakfast', kr: '아침 식사', exampleEn: 'I eat breakfast at seven.', exampleKr: '일곱 시에 아침을 먹어요.' },
    { emoji: '🏫', en: 'school', kr: '학교', exampleEn: 'I go to school at eight.', exampleKr: '여덟 시에 학교에 가요.' },
    { emoji: '📚', en: 'homework', kr: '숙제', exampleEn: 'I do my homework after dinner.', exampleKr: '저녁 먹고 숙제를 해요.' },
    { emoji: '🛏️', en: 'bed', kr: '침대', exampleEn: 'I go to bed at nine.', exampleKr: '아홉 시에 자러 가요.' },
    { emoji: '☀️', en: 'sunny', kr: '맑은', exampleEn: 'It is sunny today.', exampleKr: '오늘은 맑아요.' },
  ],

  scenes: [
    {
      id: 'scene-morning',
      titleEn: 'Morning at Home', titleKr: '아침, 집에서',
      timeMin: 6,
      setting: '🍳',
      settingEn: "It's 7 o'clock in the morning. Mom is making breakfast.",
      settingKr: '아침 7시예요. 엄마가 아침을 만들고 있어요.',
      npc: { nameEn: 'Mom 엄마', emoji: '👩' },
      pointsPerReply: 10,
      pointsPerSpoken: 15,
      turns: [
        {
          npcEn: 'Good morning! Did you sleep well?',
          npcKr: '좋은 아침! 잘 잤니?',
          replies: [
            { en: 'Good morning! Yes, I slept well.', kr: '좋은 아침이에요! 네, 잘 잤어요.', best: true },
            { en: 'No. I am tired.', kr: '아니요. 피곤해요.', best: false },
          ],
        },
        {
          npcEn: 'Are you hungry? I made breakfast.',
          npcKr: '배고프니? 아침 만들었어.',
          replies: [
            { en: 'Yes, I am hungry! Thank you, Mom.', kr: '네, 배고파요! 고마워요, 엄마.', best: true },
            { en: 'No, thank you.', kr: '아니요, 괜찮아요.', best: false },
          ],
        },
        {
          npcEn: "How's the weather today? Do you need a jacket?",
          npcKr: '오늘 날씨 어때? 재킷 필요하니?',
          replies: [
            { en: 'It is sunny today. I do not need a jacket.', kr: '오늘은 맑아요. 재킷은 필요 없어요.', best: true },
            { en: 'It is sunny.', kr: '맑아요.', best: false },
          ],
        },
        {
          npcEn: 'Okay! Have a good day at school. I love you!',
          npcKr: '좋아! 학교에서 좋은 하루 보내. 사랑해!',
          replies: [
            { en: 'Thank you! I love you too. Bye!', kr: '고마워요! 저도 사랑해요. 안녕히 계세요!', best: true },
            { en: 'Bye!', kr: '안녕히 계세요!', best: false },
          ],
        },
      ],
      wrapUpEn: 'You finished a whole morning conversation in English!',
      wrapUpKr: '아침 대화를 영어로 끝까지 해냈어요!',
    },

    {
      id: 'scene-school',
      titleEn: 'At School', titleKr: '학교에서',
      timeMin: 6,
      setting: '🏫',
      settingEn: "You just arrived at school. Your friend Jun says hello.",
      settingKr: '학교에 막 도착했어요. 친구 준이 인사해요.',
      npc: { nameEn: 'Jun 준', emoji: '👦' },
      pointsPerReply: 10,
      pointsPerSpoken: 15,
      turns: [
        {
          npcEn: 'Hi! How are you today?',
          npcKr: '안녕! 오늘 기분 어때?',
          replies: [
            { en: 'Hi Jun! I am happy today. How are you?', kr: '안녕 준! 나는 오늘 행복해. 너는 어때?', best: true },
            { en: 'I am happy.', kr: '나는 행복해.', best: false },
          ],
        },
        {
          npcEn: 'I am good! What do you have in your bag?',
          npcKr: '나도 좋아! 가방에 뭐 있어?',
          replies: [
            { en: 'I have my books and my pencil case.', kr: '책이랑 필통이 있어.', best: true },
            { en: 'Books.', kr: '책.', best: false },
          ],
        },
        {
          npcEn: 'Do you like our English class?',
          npcKr: '우리 영어 수업 좋아해?',
          replies: [
            { en: 'Yes, I like English class! It is fun.', kr: '응, 영어 수업 좋아해! 재밌어.', best: true },
            { en: 'Yes, I do.', kr: '응, 좋아해.', best: false },
          ],
        },
        {
          npcEn: 'Me too! Let us go to class together.',
          npcKr: '나도! 같이 교실 가자.',
          replies: [
            { en: 'Okay! Let us go together.', kr: '좋아! 같이 가자.', best: true },
            { en: 'Okay.', kr: '알겠어.', best: false },
          ],
        },
      ],
      wrapUpEn: 'You made a friend and talked about school — all in English!',
      wrapUpKr: '친구와 학교에 대해 영어로 이야기했어요!',
    },

    {
      id: 'scene-night',
      titleEn: 'Evening at Home', titleKr: '저녁, 집에서',
      timeMin: 6,
      setting: '🌙',
      settingEn: "It's evening. Dad asks about your day.",
      settingKr: '저녁이에요. 아빠가 오늘 하루를 물어봐요.',
      npc: { nameEn: 'Dad 아빠', emoji: '👨' },
      pointsPerReply: 10,
      pointsPerSpoken: 15,
      turns: [
        {
          npcEn: 'Welcome home! How was school today?',
          npcKr: '어서 와! 오늘 학교 어땠어?',
          replies: [
            { en: 'School was good! I played with my friend Jun.', kr: '학교 좋았어요! 친구 준이랑 놀았어요.', best: true },
            { en: 'It was good.', kr: '좋았어요.', best: false },
          ],
        },
        {
          npcEn: 'That is great. Do you have homework tonight?',
          npcKr: '좋구나. 오늘 밤에 숙제 있니?',
          replies: [
            { en: 'Yes, I have English homework. I will do it now.', kr: '네, 영어 숙제가 있어요. 지금 할게요.', best: true },
            { en: 'Yes, I do.', kr: '네, 있어요.', best: false },
          ],
        },
        {
          npcEn: 'Good job. Are you hungry? Dinner is ready.',
          npcKr: '잘했어. 배고프니? 저녁 준비됐어.',
          replies: [
            { en: 'Yes! I am very hungry. Thank you, Dad.', kr: '네! 정말 배고파요. 고마워요, 아빠.', best: true },
            { en: 'Yes, I am hungry.', kr: '네, 배고파요.', best: false },
          ],
        },
        {
          npcEn: 'Time for bed. Good night!',
          npcKr: '잘 시간이야. 잘 자!',
          replies: [
            { en: 'Good night, Dad! See you tomorrow.', kr: '안녕히 주무세요, 아빠! 내일 봐요.', best: true },
            { en: 'Good night!', kr: '잘 자요!', best: false },
          ],
        },
      ],
      wrapUpEn: 'You talked about your whole day — morning to night — in English!',
      wrapUpKr: '아침부터 밤까지 하루 전체를 영어로 이야기했어요!',
    },
  ],
};
