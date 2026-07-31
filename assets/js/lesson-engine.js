/* ============================================================
   LessonEngine — handles screen navigation, progress bar, and
   the dot-step indicator shared by every lesson page.
   ============================================================ */

class LessonEngine {
  /**
   * @param {Array<{id: string, label: string}>} steps - screen ids in order
   */
  constructor(steps) {
    this.steps = steps;
    this.current = 0;
    this.completed = new Set();

    this.fillEl = document.getElementById('progressFill');
    this.stepLabelEl = document.getElementById('stepLabel');
    this.dotTrackEl = document.getElementById('dotTrack');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');

    this._buildDots();
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());

    this.goTo(0);
  }

  _buildDots() {
    if (!this.dotTrackEl) return;
    this.dotTrackEl.innerHTML = '';
    this.dots = this.steps.map((step, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.type = 'button';
      dot.title = step.label;
      dot.addEventListener('click', () => this.goTo(i));
      this.dotTrackEl.appendChild(dot);
      return dot;
    });
  }

  markComplete(index = this.current) {
    this.completed.add(index);
    this._refreshDots();
  }

  _refreshDots() {
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('done', this.completed.has(i) && i !== this.current);
      dot.classList.toggle('current', i === this.current);
    });
  }

  goTo(index) {
    if (index < 0 || index >= this.steps.length) return;
    const prevScreen = document.getElementById(this.steps[this.current]?.id);
    if (prevScreen) prevScreen.classList.remove('active');

    this.current = index;
    const screen = document.getElementById(this.steps[index].id);
    if (screen) screen.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (this.fillEl) {
      const pct = (index / (this.steps.length - 1)) * 100;
      this.fillEl.style.width = `${pct}%`;
    }
    if (this.stepLabelEl) {
      this.stepLabelEl.textContent = `${index + 1} / ${this.steps.length} · ${this.steps[index].label}`;
    }
    if (this.prevBtn) this.prevBtn.disabled = index === 0;
    if (this.nextBtn) this.nextBtn.textContent = index === this.steps.length - 1 ? '완료 🎉' : '다음 ➜';

    this._refreshDots();
    document.dispatchEvent(new CustomEvent('lesson:screenchange', { detail: { index, id: this.steps[index].id } }));
  }

  next() {
    this.markComplete(this.current);
    if (this.current < this.steps.length - 1) this.goTo(this.current + 1);
  }

  prev() {
    if (this.current > 0) this.goTo(this.current - 1);
  }
}
