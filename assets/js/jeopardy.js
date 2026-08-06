/* ============================================================
   Jeopardy — a per-unit review-game board. Reads window.JEOPARDY_CONFIG
   (categories x point-value clues) and renders a clickable board.
   Click a cell -> clue appears -> "Show Answer" -> teacher marks
   Correct/Skip -> points update -> board keeps going until every
   cell is used, then a finish panel shows (with the same
   Scoreboard/leaderboard pattern used across the site).

   Standalone page, linked from a unit's finish screen and from the
   home page — does NOT extend the main 20-25min lesson flow.
   ============================================================ */

const JeopardyBoard = (() => {
  const { el } = Activities;

  function render(config) {
    document.title = `Review Game: ${config.unitNameEn} | Interactive English Sessions`;
    document.getElementById('boardTitleEn').textContent = `Review Game: ${config.unitNameEn}`;
    document.getElementById('boardTitleKr').textContent = config.unitNameKr;
    if (config.backHref) document.getElementById('backToUnitLink').href = config.backHref;

    const points = new PointsTracker(document.getElementById('pointsNum'), document.getElementById('pointsChip'));
    const grid = document.getElementById('jeopardyGrid');
    grid.style.setProperty('--jp-cols', config.categories.length);

    let remaining = 0;
    config.categories.forEach(cat => remaining += cat.clues.length);
    let answered = 0;

    // Category header row
    config.categories.forEach(cat => {
      grid.appendChild(el('div', { class: 'jp-cat' }, [
        el('div', { class: 'jp-cat-en' }, cat.titleEn),
        el('div', { class: 'jp-cat-kr kr' }, cat.titleKr),
      ]));
    });

    const rowCount = Math.max(...config.categories.map(c => c.clues.length));
    for (let row = 0; row < rowCount; row++) {
      config.categories.forEach(cat => {
        const clue = cat.clues[row];
        if (!clue) { grid.appendChild(el('div', { class: 'jp-cell empty' })); return; }
        const cell = el('button', { class: 'jp-cell', type: 'button' }, `${clue.points}`);
        cell.addEventListener('click', () => openClue(clue, cell));
        grid.appendChild(cell);
      });
    }

    const overlay = document.getElementById('jeopardyOverlay');
    const clueEmoji = document.getElementById('clueEmoji');
    const clueEnEl = document.getElementById('clueEn');
    const clueKrEl = document.getElementById('clueKr');
    const answerWrap = document.getElementById('answerWrap');
    const answerEnEl = document.getElementById('answerEn');
    const answerKrEl = document.getElementById('answerKr');
    const showAnswerBtn = document.getElementById('showAnswerBtn');
    const speakClueBtn = document.getElementById('speakClueBtn');
    const judgeButtons = document.getElementById('judgeButtons');
    const correctBtn = document.getElementById('correctBtn');
    const skipBtn = document.getElementById('skipBtn');
    const closeBtn = document.getElementById('closeClueBtn');

    function openClue(clue, cell) {
      overlay.classList.add('show');
      clueEmoji.textContent = clue.emoji || '❓';
      clueEmoji.style.display = clue.emoji ? '' : 'none';
      clueEnEl.textContent = clue.clueEn;
      clueKrEl.textContent = clue.clueKr || '';
      answerEnEl.textContent = clue.answerEn;
      answerKrEl.textContent = clue.answerKr || '';
      answerWrap.classList.remove('show');
      showAnswerBtn.style.display = '';
      judgeButtons.style.display = 'none';
      correctBtn.textContent = `✅ Correct! +${clue.points}pt`;

      showAnswerBtn.onclick = () => {
        answerWrap.classList.add('show');
        showAnswerBtn.style.display = 'none';
        judgeButtons.style.display = '';
      };
      speakClueBtn.onclick = () => EnglishVoice.speak(clue.clueEn);

      function finishCell(gotIt) {
        overlay.classList.remove('show');
        cell.classList.add('used');
        cell.disabled = true;
        cell.textContent = gotIt ? '✅' : '➡️';
        if (gotIt) { points.add(clue.points); fireConfetti(400); }
        answered++;
        if (answered >= remaining) setTimeout(showFinish, 300);
      }
      correctBtn.onclick = () => finishCell(true);
      skipBtn.onclick = () => finishCell(false);
      closeBtn.onclick = () => overlay.classList.remove('show');
    }

    function showFinish() {
      const finishOverlay = document.getElementById('jeopardyFinish');
      finishOverlay.classList.add('show');
      document.getElementById('jpFinalScore').textContent = `${points.total} pt`;
      fireConfetti(1400);

      const boardId = `${config.unitId}-jeopardy`;
      const name = Scoreboard.getSavedName() || 'Friend';
      const stats = Scoreboard.getStats(boardId);
      const entry = Scoreboard.addEntry(boardId, { name, points: points.total });
      renderCompareLine(document.getElementById('jpCompareLine'), points.total, stats);
      renderLeaderboard(document.getElementById('jpLeaderboardWrap'), boardId, entry.id);
    }

    document.getElementById('jpReplayBtn').addEventListener('click', () => window.location.reload());
  }

  return { render };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (window.JEOPARDY_CONFIG) JeopardyBoard.render(window.JEOPARDY_CONFIG);
});
