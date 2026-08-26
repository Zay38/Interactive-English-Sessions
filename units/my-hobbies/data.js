/* ============================================================
   Unit 14: My Hobbies — Advanced roleplay.

   New ground: frequency ("always / usually / sometimes / never")
   and asking about ability with "Can you ___?". Both let a student
   qualify an answer instead of just affirming it, which is the
   difference between answering a question and holding a chat.
   ============================================================ */

window.ROLEPLAY_CONFIG = {
  unitId: 'my-hobbies',
  headingEn: 'Unit 14: My Hobbies',
  emojiRow: '⚽ ➜ 🎨 ➜ 🎹',
  subtitleEn: 'Talk about what you do, and how often you do it! (~20-25 min)',
  subtitleKr: '무엇을 얼마나 자주 하는지 영어로 이야기해요!',
  learnListEn: '💬 3 Conversations · ⚽ Hobbies · 🔁 always / usually / sometimes · 🙋 Can you ___? · 🎤 Say Every Line · ⭐ Points',
  learnListKr: '3개의 대화 · 취미 · 빈도 표현 · 할 수 있나요? · 모든 문장 말하기 · 포인트 모으기',

  warmupVocab: [
    { emoji: '⚽', en: 'soccer', kr: '축구', exampleEn: 'I play soccer on Saturdays.', exampleKr: '토요일에 축구를 해요.' },
    { emoji: '🎨', en: 'draw', kr: '그리다', exampleEn: 'I like to draw animals.', exampleKr: '동물 그리는 걸 좋아해요.' },
    { emoji: '🎹', en: 'piano', kr: '피아노', exampleEn: 'I play the piano.', exampleKr: '피아노를 쳐요.' },
    { emoji: '📚', en: 'read', kr: '읽다', exampleEn: 'I read books at night.', exampleKr: '밤에 책을 읽어요.' },
    { emoji: '🏊', en: 'swim', kr: '수영하다', exampleEn: 'I can swim very well.', exampleKr: '수영을 아주 잘해요.' },
    { emoji: '🚴', en: 'ride a bike', kr: '자전거를 타다', exampleEn: 'I ride a bike to the park.', exampleKr: '공원까지 자전거를 타요.' },
    { emoji: '🔁', en: 'usually', kr: '보통', exampleEn: 'I usually play after school.', exampleKr: '보통 방과 후에 놀아요.' },
    { emoji: '🎵', en: 'sing', kr: '노래하다', exampleEn: 'I sing with my sister.', exampleKr: '언니랑 노래해요.' },
  ],

  scenes: [
    {
      id: 'scene-after-school',
      titleEn: 'After School', titleKr: '방과 후',
      timeMin: 6,
      setting: '⚽',
      settingEn: 'A new classmate wants to know what you do for fun.',
      settingKr: '새로 온 친구가 취미를 물어봐요.',
      npc: { nameEn: 'Daniel 다니엘', emoji: '👦' },
      pointsPerReply: 10, pointsPerSpoken: 15,
      turns: [
        {
          npcEn: 'Hi! What do you usually do after school?',
          npcKr: '안녕! 방과 후에 보통 뭐 해?',
          replies: [
            { en: 'I usually play soccer with my friends.', kr: '보통 친구들이랑 축구를 해.', best: true },
            { en: 'Play soccer.', kr: '축구해.', best: false },
          ],
        },
        {
          npcEn: 'Cool! How often do you play?',
          npcKr: '멋지다! 얼마나 자주 해?',
          replies: [
            { en: 'I play soccer three times a week.', kr: '일주일에 세 번 축구를 해.', best: true },
            { en: 'A lot.', kr: '많이.', best: false },
          ],
        },
        {
          npcEn: 'Wow! Do you have other hobbies?',
          npcKr: '우와! 다른 취미도 있어?',
          replies: [
            { en: 'Yes! I sometimes draw and I love to read.', kr: '응! 가끔 그림도 그리고 책 읽는 것도 좋아해.', best: true },
            { en: 'I draw.', kr: '그림 그려.', best: false },
          ],
        },
        {
          npcEn: 'Me too! Let us play soccer together tomorrow.',
          npcKr: '나도! 내일 같이 축구하자.',
          replies: [
            { en: 'Great idea! Let us play tomorrow.', kr: '좋은 생각이야! 내일 같이 하자.', best: true },
            { en: 'Okay.', kr: '알겠어.', best: false },
          ],
        },
      ],
      wrapUpEn: 'You said HOW OFTEN you do things — not just what you do!',
      wrapUpKr: '무엇을 하는지뿐 아니라 얼마나 자주 하는지도 말했어요!',
    },

    {
      id: 'scene-club',
      titleEn: 'Joining a Club', titleKr: '동아리 가입하기',
      timeMin: 6,
      setting: '🎹',
      settingEn: 'You want to join the music club. The teacher asks about you.',
      settingKr: '음악 동아리에 들어가고 싶어요. 선생님이 물어봐요.',
      npc: { nameEn: 'Music Teacher 음악 선생님', emoji: '🧑‍🎤' },
      pointsPerReply: 10, pointsPerSpoken: 15,
      turns: [
        {
          npcEn: 'Welcome! Can you play an instrument?',
          npcKr: '어서 와요! 악기를 다룰 수 있나요?',
          replies: [
            { en: 'Yes, I can! I play the piano.', kr: '네, 할 수 있어요! 피아노를 쳐요.', best: true },
            { en: 'Piano.', kr: '피아노요.', best: false },
          ],
        },
        {
          npcEn: 'Wonderful. Can you sing too?',
          npcKr: '멋지네요. 노래도 할 수 있어요?',
          replies: [
            { en: 'A little. I sometimes sing with my sister.', kr: '조금요. 가끔 언니랑 노래해요.', best: true },
            { en: 'No.', kr: '아니요.', best: false },
          ],
        },
        {
          npcEn: 'That is fine! We practice every Tuesday. Is that okay?',
          npcKr: '괜찮아요! 매주 화요일에 연습해요. 괜찮나요?',
          replies: [
            { en: 'Yes, Tuesday is perfect for me. Thank you!', kr: '네, 화요일 좋아요. 감사합니다!', best: true },
            { en: 'Okay.', kr: '네.', best: false },
          ],
        },
        {
          npcEn: 'Great! Welcome to the music club!',
          npcKr: '좋아요! 음악 동아리에 온 걸 환영해요!',
          replies: [
            { en: 'Thank you so much! I am very excited!', kr: '정말 감사합니다! 너무 기대돼요!', best: true },
            { en: 'Thanks.', kr: '고마워요.', best: false },
          ],
        },
      ],
      wrapUpEn: 'You used "Can you ___?" and answered honestly — even "a little"!',
      wrapUpKr: '"Can you ___?"를 쓰고 "조금요"처럼 솔직하게 답했어요!',
    },

    {
      id: 'scene-teach',
      titleEn: 'Teaching a Friend', titleKr: '친구에게 가르쳐주기',
      timeMin: 6,
      setting: '🚴',
      settingEn: 'Your friend cannot ride a bike yet. You offer to help.',
      settingKr: '친구가 아직 자전거를 못 타요. 도와주기로 했어요.',
      npc: { nameEn: 'Mina 미나', emoji: '👧' },
      pointsPerReply: 10, pointsPerSpoken: 15,
      turns: [
        {
          npcEn: 'I cannot ride a bike. Can you ride a bike?',
          npcKr: '나 자전거 못 타. 너는 탈 수 있어?',
          replies: [
            { en: 'Yes, I can! I ride my bike every day.', kr: '응, 탈 수 있어! 나는 매일 자전거를 타.', best: true },
            { en: 'Yes.', kr: '응.', best: false },
          ],
        },
        {
          npcEn: 'Really? Is it difficult?',
          npcKr: '정말? 어려워?',
          replies: [
            { en: 'It is not difficult. You can do it!', kr: '어렵지 않아. 너도 할 수 있어!', best: true },
            { en: 'No.', kr: '아니.', best: false },
          ],
        },
        {
          npcEn: 'Can you teach me?',
          npcKr: '나 가르쳐 줄 수 있어?',
          replies: [
            { en: 'Of course! We can practice this weekend.', kr: '물론이지! 이번 주말에 연습하자.', best: true },
            { en: 'Okay.', kr: '알겠어.', best: false },
          ],
        },
        {
          npcEn: 'Thank you! You are a good friend.',
          npcKr: '고마워! 너는 좋은 친구야.',
          replies: [
            { en: 'You are welcome! See you this weekend.', kr: '천만에! 주말에 보자.', best: true },
            { en: 'No problem.', kr: '괜찮아.', best: false },
          ],
        },
      ],
      wrapUpEn: 'You encouraged a friend in English — that is real conversation!',
      wrapUpKr: '영어로 친구를 응원했어요 — 진짜 대화예요!',
    },
  ],
};
