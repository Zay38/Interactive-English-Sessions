/* ============================================================
   Unit 16: Let's Go There! — the final unit.

   The capstone conversation of the whole course: asking a stranger
   for directions, understanding the answer, and helping someone
   else in return. It pulls in place words from Unit 9, politeness
   from Unit 12, and the past tense from Unit 15, and it ends the
   course with the student giving help rather than receiving it.
   ============================================================ */

window.ROLEPLAY_CONFIG = {
  unitId: 'lets-go-there',
  headingEn: "Unit 16: Let's Go There!",
  emojiRow: '🧭 ➜ 🚏 ➜ 🏛️',
  subtitleEn: 'Ask for directions, and help someone find their way! (~20-25 min)',
  subtitleKr: '길을 묻고, 다른 사람에게 길을 알려줘요!',
  learnListEn: '💬 3 Conversations · 🧭 Directions · 🚏 Excuse me… · 🏛️ Places in town · 🎤 Say Every Line · ⭐ Points',
  learnListKr: '3개의 대화 · 길 찾기 · 정중하게 묻기 · 동네 장소 · 모든 문장 말하기 · 포인트 모으기',

  warmupVocab: [
    { emoji: '➡️', en: 'turn right', kr: '오른쪽으로 돌다', exampleEn: 'Turn right at the bank.', exampleKr: '은행에서 오른쪽으로 도세요.' },
    { emoji: '⬅️', en: 'turn left', kr: '왼쪽으로 돌다', exampleEn: 'Turn left at the school.', exampleKr: '학교에서 왼쪽으로 도세요.' },
    { emoji: '⬆️', en: 'go straight', kr: '직진하다', exampleEn: 'Go straight for two blocks.', exampleKr: '두 블록 직진하세요.' },
    { emoji: '🏥', en: 'hospital', kr: '병원', exampleEn: 'The hospital is near here.', exampleKr: '병원은 여기서 가까워요.' },
    { emoji: '🏦', en: 'bank', kr: '은행', exampleEn: 'The bank is next to the shop.', exampleKr: '은행은 가게 옆에 있어요.' },
    { emoji: '🚏', en: 'bus stop', kr: '버스 정류장', exampleEn: 'Where is the bus stop?', exampleKr: '버스 정류장이 어디예요?' },
    { emoji: '🏛️', en: 'museum', kr: '박물관', exampleEn: 'I want to go to the museum.', exampleKr: '박물관에 가고 싶어요.' },
    { emoji: '🙋', en: 'Excuse me', kr: '실례합니다', exampleEn: 'Excuse me, can you help me?', exampleKr: '실례합니다, 도와주실 수 있나요?' },
  ],

  scenes: [
    {
      id: 'scene-lost',
      titleEn: 'Lost in Town', titleKr: '길을 잃었어요',
      timeMin: 6,
      setting: '🧭',
      settingEn: 'You are looking for the museum but you cannot find it.',
      settingKr: '박물관을 찾고 있는데 못 찾겠어요.',
      npc: { nameEn: 'Friendly Stranger 친절한 행인', emoji: '🧑' },
      pointsPerReply: 10, pointsPerSpoken: 15,
      turns: [
        {
          npcEn: 'You look a little lost. Are you okay?',
          npcKr: '길을 잃으신 것 같네요. 괜찮으세요?',
          replies: [
            { en: 'Excuse me, can you help me? I am looking for the museum.', kr: '실례합니다, 도와주실 수 있나요? 박물관을 찾고 있어요.', best: true },
            { en: 'Where is the museum?', kr: '박물관이 어디예요?', best: false },
          ],
        },
        {
          npcEn: 'Of course! Go straight for two blocks.',
          npcKr: '물론이죠! 두 블록 직진하세요.',
          replies: [
            { en: 'Go straight for two blocks. And then?', kr: '두 블록 직진이요. 그다음에는요?', best: true },
            { en: 'Okay.', kr: '알겠어요.', best: false },
          ],
        },
        {
          npcEn: 'Then turn left at the bank. It is next to the park.',
          npcKr: '그다음 은행에서 왼쪽으로 도세요. 공원 옆에 있어요.',
          replies: [
            { en: 'Turn left at the bank, next to the park. Got it!', kr: '은행에서 왼쪽, 공원 옆이요. 알겠어요!', best: true },
            { en: 'Left at the bank.', kr: '은행에서 왼쪽이요.', best: false },
          ],
        },
        {
          npcEn: 'That is right. It is about ten minutes on foot.',
          npcKr: '맞아요. 걸어서 10분쯤 걸려요.',
          replies: [
            { en: 'Thank you so much for your help!', kr: '도와주셔서 정말 감사합니다!', best: true },
            { en: 'Thanks.', kr: '고마워요.', best: false },
          ],
        },
      ],
      wrapUpEn: 'You asked politely AND repeated the directions to check — that is what good speakers do!',
      wrapUpKr: '정중하게 묻고, 들은 길을 다시 확인했어요 — 훌륭한 화자의 습관이에요!',
    },

    {
      id: 'scene-bus',
      titleEn: 'At the Bus Stop', titleKr: '버스 정류장에서',
      timeMin: 6,
      setting: '🚏',
      settingEn: 'You need the bus to the hospital to visit your grandma.',
      settingKr: '할머니를 뵈러 병원에 가는 버스를 타야 해요.',
      npc: { nameEn: 'Bus Driver 버스 기사님', emoji: '🧑‍✈️' },
      pointsPerReply: 10, pointsPerSpoken: 15,
      turns: [
        {
          npcEn: 'Hello! Where are you going today?',
          npcKr: '안녕하세요! 오늘 어디 가세요?',
          replies: [
            { en: 'Hello! Does this bus go to the hospital?', kr: '안녕하세요! 이 버스 병원에 가나요?', best: true },
            { en: 'The hospital.', kr: '병원이요.', best: false },
          ],
        },
        {
          npcEn: 'Yes, it does. It is four stops from here.',
          npcKr: '네, 가요. 여기서 네 정거장이에요.',
          replies: [
            { en: 'Four stops. How much is the ticket?', kr: '네 정거장이요. 표는 얼마예요?', best: true },
            { en: 'Okay. How much?', kr: '네. 얼마예요?', best: false },
          ],
        },
        {
          npcEn: 'It is two dollars for students.',
          npcKr: '학생은 2달러예요.',
          replies: [
            { en: 'Here you are. Thank you very much!', kr: '여기 있어요. 정말 감사합니다!', best: true },
            { en: 'Here.', kr: '여기요.', best: false },
          ],
        },
        {
          npcEn: 'I will tell you when we arrive. Please sit down.',
          npcKr: '도착하면 알려드릴게요. 앉으세요.',
          replies: [
            { en: 'Thank you! That is very kind of you.', kr: '감사합니다! 정말 친절하시네요.', best: true },
            { en: 'Okay, thanks.', kr: '네, 고마워요.', best: false },
          ],
        },
      ],
      wrapUpEn: 'You handled a whole bus journey in English by yourself!',
      wrapUpKr: '버스 타는 일을 처음부터 끝까지 혼자 영어로 해냈어요!',
    },

    {
      id: 'scene-helping',
      titleEn: 'Now You Help!', titleKr: '이제 내가 도와줄 차례!',
      timeMin: 7,
      setting: '🗺️',
      settingEn: 'A visitor is lost near your school. Now YOU give directions.',
      settingKr: '학교 근처에서 길을 잃은 사람이 있어요. 이번엔 내가 알려줄 차례예요.',
      npc: { nameEn: 'Visitor 방문객', emoji: '🧓' },
      pointsPerReply: 10, pointsPerSpoken: 20,
      turns: [
        {
          npcEn: 'Excuse me! Do you speak English?',
          npcKr: '실례합니다! 영어 하실 줄 아세요?',
          replies: [
            { en: 'Yes, I do! How can I help you?', kr: '네, 할 줄 알아요! 어떻게 도와드릴까요?', best: true },
            { en: 'A little.', kr: '조금이요.', best: false },
          ],
        },
        {
          npcEn: 'Thank goodness. Where is the bus stop?',
          npcKr: '다행이네요. 버스 정류장이 어디예요?',
          replies: [
            { en: 'Go straight and turn right at the school.', kr: '직진하시다가 학교에서 오른쪽으로 도세요.', best: true },
            { en: 'That way.', kr: '저쪽이요.', best: false },
          ],
        },
        {
          npcEn: 'Turn right at the school. Is it far?',
          npcKr: '학교에서 오른쪽이요. 먼가요?',
          replies: [
            { en: 'No, it is not far. It is about five minutes.', kr: '아니요, 멀지 않아요. 5분쯤 걸려요.', best: true },
            { en: 'Not far.', kr: '안 멀어요.', best: false },
          ],
        },
        {
          npcEn: 'Your English is excellent. Thank you so much!',
          npcKr: '영어를 정말 잘하시네요. 정말 감사합니다!',
          replies: [
            { en: 'Thank you! Have a nice day and good luck!', kr: '감사합니다! 좋은 하루 보내세요!', best: true },
            { en: 'You are welcome.', kr: '천만에요.', best: false },
          ],
        },
      ],
      wrapUpEn: 'You GAVE directions to a stranger in English. That is the whole course, finished. 🎉',
      wrapUpKr: '처음 만난 사람에게 영어로 길을 알려줬어요. 전체 과정을 끝냈어요! 🎉',
    },
  ],
};
