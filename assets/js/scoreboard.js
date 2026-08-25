/* ============================================================
   Scoreboard — name + points persistence (localStorage-based).

   No backend: this works great when every student takes a turn on
   the SAME browser (e.g. teacher shares her screen and gives mouse
   control to each student over Zoom), because history accumulates
   on that one device across all students/sessions. If students ever
   join from their own separate devices, this will only show their
   own personal history, not a real cross-device class average.
   ============================================================ */

const Scoreboard = (() => {
  const NAME_KEY = 'ies-student-name';

  function getSavedName() {
    return localStorage.getItem(NAME_KEY) || '';
  }
  function saveName(name) {
    localStorage.setItem(NAME_KEY, name);
  }

  function boardKey(unitId) {
    return `ies-scoreboard-${unitId}`;
  }

  function getBoard(unitId) {
    try {
      return JSON.parse(localStorage.getItem(boardKey(unitId))) || [];
    } catch {
      return [];
    }
  }

  function addEntry(unitId, { name, points }) {
    const board = getBoard(unitId);
    const entry = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, name, points, date: new Date().toISOString() };
    board.push(entry);
    localStorage.setItem(boardKey(unitId), JSON.stringify(board));
    return entry;
  }

  function getStats(unitId, excludeId) {
    const board = getBoard(unitId).filter(e => e.id !== excludeId);
    if (!board.length) return { count: 0, average: null };
    const total = board.reduce((s, e) => s + e.points, 0);
    return { count: board.length, average: Math.round(total / board.length) };
  }

  const PROGRESS_KEY = 'ies-progress';

  function getProgress() {
    try {
      return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
    } catch {
      return {};
    }
  }

  function markComplete(unitId, points) {
    const progress = getProgress();
    const prev = progress[unitId];
    progress[unitId] = {
      completedAt: new Date().toISOString(),
      bestPoints: Math.max(points || 0, prev ? prev.bestPoints : 0),
      times: (prev ? prev.times : 0) + 1,
    };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    return progress[unitId];
  }

  function isComplete(unitId) {
    return !!getProgress()[unitId];
  }

  return { getSavedName, saveName, getBoard, addEntry, getStats, getProgress, markComplete, isComplete };
})();

class PointsTracker {
  constructor(displayEl, chipEl) {
    this.total = 0;
    this.displayEl = displayEl;
    this.chipEl = chipEl || displayEl?.parentElement;
    this._render();
  }
  add(n) {
    this.total += n;
    this._render();
    if (this.chipEl) {
      this.chipEl.classList.remove('bump');
      void this.chipEl.offsetWidth; // restart animation
      this.chipEl.classList.add('bump');
    }
  }
  _render() {
    if (this.displayEl) this.displayEl.textContent = this.total;
  }
}

function renderCompareLine(container, myPoints, stats) {
  function set(en, kr) {
    container.innerHTML = `${en}<br><span class="kr" style="font-size:0.8rem;font-weight:600;">${kr}</span>`;
  }
  if (!stats || stats.count === 0) {
    set('🌟 You\'re the first player on this device!', '이 수업의 첫 번째 학생이에요!');
    return;
  }
  const diff = myPoints - stats.average;
  if (diff > 0) {
    set(`📈 Class average: ${stats.average}pt. You're ${diff}pt above average!`, `친구 ${stats.count}명 평균보다 ${diff}점 더 높아요!`);
  } else if (diff < 0) {
    set(`💪 Class average: ${stats.average}pt. Keep practicing to beat it!`, `친구 ${stats.count}명 평균보다 조금 낮아요. 연습해봐요!`);
  } else {
    set(`🎯 Right on the class average: ${stats.average}pt!`, `친구 ${stats.count}명 평균과 정확히 같아요!`);
  }
}

function renderLeaderboard(container, unitId, highlightId) {
  const board = Scoreboard.getBoard(unitId).slice().sort((a, b) => b.points - a.points);
  container.innerHTML = '';
  if (!board.length) return;
  const wrap = document.createElement('div');
  wrap.className = 'leaderboard';
  board.slice(0, 8).forEach((entry, i) => {
    const row = document.createElement('div');
    row.className = 'leaderboard-row' + (entry.id === highlightId ? ' me' : '');
    row.innerHTML = `
      <span class="rank">${i + 1}</span>
      <span class="lb-name kr">${entry.name}</span>
      <span class="lb-points">${entry.points}pt</span>
    `;
    wrap.appendChild(row);
  });
  container.appendChild(wrap);
}
