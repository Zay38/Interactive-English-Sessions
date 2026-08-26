/* ============================================================
   UNITS — one source of truth for the whole course.

   The map, the unit list and the progress badges all read from
   this file, so adding a unit means editing one array rather than
   hand-editing the home page in three places.

   mapX / mapY are percentages inside the world-map SVG viewBox.
   Units are laid out as a journey: the Beginner tier sits over the
   Americas, Intermediate crosses the Atlantic to Europe/Africa,
   and Advanced continues into Asia and Australia — so finishing
   the course reads as travelling around the world.
   ============================================================ */

const UNITS = [
  /* ---------------- Beginner: the Americas ---------------- */
  { n: 1,  id: 'family-feelings', tier: 'beg', emoji: '👨‍👩‍👧‍👦',
    titleEn: 'My Family & My Feelings', titleKr: '가족과 감정',
    href: 'units/family-feelings/index.html', game: 'units/family-feelings/jeopardy.html',
    mapX: 12, mapY: 19 },
  { n: 2,  id: 'hello-friend', tier: 'beg', emoji: '✨',
    titleEn: 'All About Me!', titleKr: '나에 대해 소개하기',
    href: 'units/hello-friend/index.html', game: 'units/hello-friend/jeopardy.html',
    mapX: 17.5, mapY: 14.5 },
  { n: 3,  id: 'my-body', tier: 'beg', emoji: '👹',
    titleEn: 'My Body', titleKr: '나의 몸',
    href: 'units/my-body/index.html', game: 'units/my-body/jeopardy.html',
    mapX: 23, mapY: 19 },
  { n: 4,  id: 'animals', tier: 'beg', emoji: '🐶',
    titleEn: 'Animals', titleKr: '동물',
    href: 'units/animals/index.html', game: 'units/animals/jeopardy.html',
    mapX: 20, mapY: 27 },
  { n: 5,  id: 'food-i-like', tier: 'beg', emoji: '🍕',
    titleEn: 'Food I Like', titleKr: '좋아하는 음식',
    href: 'units/food-i-like/index.html', game: 'units/food-i-like/jeopardy.html',
    mapX: 20.5, mapY: 36 },
  { n: 6,  id: 'colors-shapes', tier: 'beg', emoji: '🎨',
    titleEn: 'Colors & Shapes', titleKr: '색깔과 모양',
    href: 'units/colors-shapes/index.html', game: 'units/colors-shapes/jeopardy.html',
    mapX: 26, mapY: 51 },
  { n: 7,  id: 'my-clothes', tier: 'beg', emoji: '👗',
    titleEn: 'My Clothes', titleKr: '나의 옷',
    href: 'units/my-clothes/index.html', game: 'units/my-clothes/jeopardy.html',
    mapX: 28.5, mapY: 59 },
  { n: 8,  id: 'weather', tier: 'beg', emoji: '☀️',
    titleEn: 'Weather', titleKr: '날씨',
    href: 'units/weather/index.html', game: 'units/weather/jeopardy.html',
    mapX: 26.5, mapY: 67 },
  { n: 9,  id: 'my-house', tier: 'beg', emoji: '🏠',
    titleEn: 'My House', titleKr: '나의 집',
    href: 'units/my-house/index.html', game: 'units/my-house/jeopardy.html',
    mapX: 24.6, mapY: 74.5 },
  { n: 10, id: 'my-classroom', tier: 'beg', emoji: '🎒',
    titleEn: 'In My Classroom', titleKr: '교실에서',
    href: 'units/my-classroom/index.html', game: 'units/my-classroom/jeopardy.html',
    mapX: 24.3, mapY: 82 },

  /* ---------------- Intermediate: across the Atlantic ---------------- */
  { n: 11, id: 'daily-routine', tier: 'int', emoji: '⏰',
    titleEn: 'My Daily Routine', titleKr: '나의 하루 일과',
    href: 'units/daily-routine/index.html', game: null,
    mapX: 48, mapY: 22 },
  { n: 12, id: 'shopping', tier: 'int', emoji: '🛒',
    titleEn: "Let's Go Shopping", titleKr: '쇼핑하기',
    href: 'units/shopping/index.html', game: null,
    mapX: 52, mapY: 45 },

  /* ---------------- Advanced: on to Asia and Australia ---------------- */
  { n: 13, id: 'seasons-plans', tier: 'adv', emoji: '🌸',
    titleEn: 'Seasons & Plans', titleKr: '계절과 계획',
    href: 'units/seasons-plans/index.html', game: null,
    mapX: 62, mapY: 22 },
  { n: 14, id: 'my-hobbies', tier: 'adv', emoji: '⚽',
    titleEn: 'My Hobbies', titleKr: '나의 취미',
    href: 'units/my-hobbies/index.html', game: null,
    mapX: 68, mapY: 30 },
  { n: 15, id: 'yesterday', tier: 'adv', emoji: '🕰️',
    titleEn: "Yesterday's Adventure", titleKr: '어제의 모험',
    href: 'units/yesterday/index.html', game: null,
    mapX: 76, mapY: 25 },
  { n: 16, id: 'lets-go-there', tier: 'adv', emoji: '🧭',
    titleEn: "Let's Go There!", titleKr: '길 찾기',
    href: 'units/lets-go-there/index.html', game: null,
    mapX: 86, mapY: 74 },
];

const TIERS = {
  beg: { labelEn: 'Beginner',     labelKr: '초급', sub: '1-2학년 눈높이' },
  int: { labelEn: 'Intermediate', labelKr: '중급', sub: '3-4학년 눈높이 · 대화 중심' },
  adv: { labelEn: 'Advanced',     labelKr: '고급', sub: '5-6학년 눈높이 · 대화 중심' },
};

function unitByN(n) { return UNITS.find(u => u.n === n); }
function unitById(id) { return UNITS.find(u => u.id === id); }
