/* Tiny DOM-based sparkle burst for delight on correct answers. */
function sparkleBurst(x, y, count = 12) {
  const colors = ['#ffd166', '#ff8a5c', '#4fc3f7', '#b294f7', '#6bcf9c', '#ff8fb1'];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const dist = 26 + Math.random() * 44;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const p = document.createElement('div');
    p.className = 'sparkle-particle';
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.setProperty('--dx', `${dx}px`);
    p.style.setProperty('--dy', `${dy}px`);
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  }
}

function sparkleAt(el, count) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  sparkleBurst(r.left + r.width / 2, r.top + r.height / 2, count);
}
