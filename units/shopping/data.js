/* ============================================================
   Unit 12: Let's Go Shopping — Intermediate roleplay.

   New ground: asking for a price and handling the answer. Almost
   all the nouns come from Unit 5 (food) and Unit 7 (clothes), and
   the numbers from Unit 2, so the only genuinely new load is the
   transaction itself — "How much is it?", "I'll take it", "Here you
   are" — plus holding a three-way exchange with a stranger.
   ============================================================ */

window.ROLEPLAY_CONFIG = {
  unitId: 'shopping',
  headingEn: "Unit 12: Let's Go Shopping",
  emojiRow: '🛒 ➜ 💵 ➜ 🎁',
  subtitleEn: 'Buy food, clothes and a gift — all in English! (~20-25 min)',
  subtitleKr: '음식, 옷, 선물을 영어로 사봐요!',
  learnListEn: '💬 3 Conversations · 🍎 Market · 👕 Clothes Shop · 🎁 Gift Shop · 🎤 Say Every Line · ⭐ Points',
  learnListKr: '3개의 대화 · 시장 · 옷가게 · 선물 가게 · 모든 문장 말하기 · 포인트 모으기',

  /* Numbers from Unit 2, food from Unit 5, clothes from Unit 7. */
  warmupVocab: [
    { emoji: '🍎', en: 'apple', kr: '사과', exampleEn: 'I want three apples.', exampleKr: '사과 세 개 주세요.' },
    { emoji: '🥛', en: 'milk', kr: '우유', exampleEn: 'I need some milk.', exampleKr: '우유가 필요해요.' },
    { emoji: '👕', en: 'shirt', kr: '셔츠', exampleEn: 'This shirt is nice.', exampleKr: '이 셔츠 예뻐요.' },
    { emoji: '👟', en: 'shoes', kr: '신발', exampleEn: 'I like these shoes.', exampleKr: '이 신발이 좋아요.' },
    { emoji: '💵', en: 'money', kr: '돈', exampleEn: 'Here is my money.', exampleKr: '여기 돈이요.' },
    { emoji: '5️⃣', en: 'five', kr: '다섯', exampleEn: 'It is five dollars.', exampleKr: '5달러예요.' },
    { emoji: '🔟', en: 'ten', kr: '열', exampleEn: 'It is ten dollars.', exampleKr: '10달러예요.' },
    { emoji: '🎁', en: 'gift', kr: '선물', exampleEn: 'I want a gift for my mom.', exampleKr: '엄마 선물을 사고 싶어요.' },
  ],

  scenes: [
    {
      id: 'scene-market',
      titleEn: 'At the Market', titleKr: '시장에서',
      timeMin: 6,
      setting: '🍎',
      settingEn: 'You are at the fruit market with your shopping basket.',
      settingKr: '장바구니를 들고 과일 시장에 왔어요.',
      npc: { nameEn: 'Shopkeeper 가게 주인', emoji: '👨‍🌾' },
      pointsPerReply: 10, pointsPerSpoken: 15,
      turns: [
        {
          npcEn: 'Hello! Welcome. What would you like today?',
          npcKr: '안녕하세요! 어서 오세요. 오늘 뭐 드릴까요?',
          replies: [
            { en: 'Hello! I want three apples, please.', kr: '안녕하세요! 사과 세 개 주세요.', best: true },
            { en: 'Apples.', kr: '사과요.', best: false },
          ],
        },
        {
          npcEn: 'Three apples. Anything else?',
          npcKr: '사과 세 개요. 더 필요한 거 있어요?',
          replies: [
            { en: 'Yes, I need some milk too, please.', kr: '네, 우유도 좀 주세요.', best: true },
            { en: 'Milk too.', kr: '우유도요.', best: false },
          ],
        },
        {
          npcEn: 'Here you are. That is five dollars.',
          npcKr: '여기 있어요. 5달러입니다.',
          replies: [
            { en: 'Five dollars. Here you are. Thank you!', kr: '5달러요. 여기 있어요. 고맙습니다!', best: true },
            { en: 'Okay. Here.', kr: '네. 여기요.', best: false },
          ],
        },
        {
          npcEn: 'Thank you! Have a nice day!',
          npcKr: '감사합니다! 좋은 하루 보내세요!',
          replies: [
            { en: 'Thank you! You too. Goodbye!', kr: '감사합니다! 좋은 하루 보내세요. 안녕히 계세요!', best: true },
            { en: 'Bye.', kr: '안녕히 계세요.', best: false },
          ],
        },
      ],
      wrapUpEn: 'You bought food at a market — completely in English!',
      wrapUpKr: '시장에서 영어로 음식을 샀어요!',
    },

    {
      id: 'scene-clothes',
      titleEn: 'At the Clothes Shop', titleKr: '옷가게에서',
      timeMin: 6,
      setting: '👕',
      settingEn: 'You see a shirt you really like in the window.',
      settingKr: '진열장에서 마음에 드는 셔츠를 봤어요.',
      npc: { nameEn: 'Shop Clerk 점원', emoji: '👩‍💼' },
      pointsPerReply: 10, pointsPerSpoken: 15,
      turns: [
        {
          npcEn: 'Hi there! Can I help you?',
          npcKr: '안녕하세요! 도와드릴까요?',
          replies: [
            { en: 'Yes, please. I like this blue shirt.', kr: '네, 이 파란 셔츠가 마음에 들어요.', best: true },
            { en: 'This shirt.', kr: '이 셔츠요.', best: false },
          ],
        },
        {
          npcEn: 'Good choice! Would you like to try it on?',
          npcKr: '좋은 선택이에요! 입어보시겠어요?',
          replies: [
            { en: 'Yes, please. Where can I try it on?', kr: '네, 어디서 입어볼 수 있어요?', best: true },
            { en: 'Yes.', kr: '네.', best: false },
          ],
        },
        {
          npcEn: 'Over there. … It looks great on you!',
          npcKr: '저쪽이에요. … 정말 잘 어울리네요!',
          replies: [
            { en: 'Thank you! How much is it?', kr: '감사합니다! 얼마예요?', best: true },
            { en: 'How much?', kr: '얼마예요?', best: false },
          ],
        },
        {
          npcEn: 'It is ten dollars.',
          npcKr: '10달러예요.',
          replies: [
            { en: 'Ten dollars? Okay, I will take it!', kr: '10달러요? 좋아요, 이걸로 할게요!', best: true },
            { en: 'Okay.', kr: '알겠어요.', best: false },
          ],
        },
      ],
      wrapUpEn: 'You asked the price and bought clothes by yourself!',
      wrapUpKr: '직접 가격을 묻고 옷을 샀어요!',
    },

    {
      id: 'scene-gift',
      titleEn: 'Finding a Gift', titleKr: '선물 고르기',
      timeMin: 6,
      setting: '🎁',
      settingEn: "It's your mom's birthday. You want to find her a gift.",
      settingKr: '엄마 생신이에요. 선물을 고르고 싶어요.',
      npc: { nameEn: 'Gift Shop Owner 선물가게 주인', emoji: '🧑‍🦱' },
      pointsPerReply: 10, pointsPerSpoken: 15,
      turns: [
        {
          npcEn: 'Hello! Are you looking for something special?',
          npcKr: '안녕하세요! 특별한 걸 찾고 계세요?',
          replies: [
            { en: 'Yes! I want a gift for my mom.', kr: '네! 엄마 선물을 사고 싶어요.', best: true },
            { en: 'A gift.', kr: '선물이요.', best: false },
          ],
        },
        {
          npcEn: 'How nice! What does your mom like?',
          npcKr: '정말 좋네요! 어머니는 뭘 좋아하세요?',
          replies: [
            { en: 'She likes flowers and books.', kr: '엄마는 꽃이랑 책을 좋아해요.', best: true },
            { en: 'Flowers.', kr: '꽃이요.', best: false },
          ],
        },
        {
          npcEn: 'Then how about this beautiful red flower?',
          npcKr: '그럼 이 예쁜 빨간 꽃은 어때요?',
          replies: [
            { en: 'It is beautiful! How much is it?', kr: '정말 예뻐요! 얼마예요?', best: true },
            { en: 'Okay, how much?', kr: '네, 얼마예요?', best: false },
          ],
        },
        {
          npcEn: 'Only five dollars. Shall I wrap it for you?',
          npcKr: '5달러밖에 안 해요. 포장해 드릴까요?',
          replies: [
            { en: 'Yes, please! Thank you so much.', kr: '네, 부탁드려요! 정말 감사합니다.', best: true },
            { en: 'Yes, thanks.', kr: '네, 고마워요.', best: false },
          ],
        },
      ],
      wrapUpEn: 'You chose a gift and talked about what someone likes!',
      wrapUpKr: '선물을 고르고, 다른 사람이 좋아하는 것을 이야기했어요!',
    },
  ],
};
