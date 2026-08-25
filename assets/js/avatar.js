/* ============================================================
   Avatar — a Minecraft-style voxel character the student builds
   and grows through their English learning journey.

   Rendered with pure CSS 3D (transform-style: preserve-3d), not a
   WebGL engine: the character is only a handful of boxes, so CSS
   draws it natively with zero dependencies and gives us smooth
   PowerPoint-Morph-style interpolation for free — every color and
   pose change is just a CSS transition. Runs well on school
   Chromebooks.

   Items unlock as units are completed, and each unlock is tied to
   what that unit actually taught (Unit 4 Animals -> animal ears,
   Unit 7 Clothes -> outfits), so the reward reinforces vocabulary.
   ============================================================ */

const Avatar = (() => {
  const STORAGE_KEY = 'ies-avatar';

  /* ---------------- item catalog ----------------
     unlockUnit: null = available from the start.
     Otherwise the unitId whose completion grants it. */
  const CATALOG = {
    skin: {
      labelEn: 'Skin', labelKr: '피부', unlockUnit: null,
      options: [
        { id: 'light',  labelEn: 'Light',  labelKr: '밝은',   color: '#f2c9a0' },
        { id: 'tan',    labelEn: 'Tan',    labelKr: '중간',   color: '#d9a066' },
        { id: 'brown',  labelEn: 'Brown',  labelKr: '갈색',   color: '#a3673c' },
        { id: 'deep',   labelEn: 'Deep',   labelKr: '진한',   color: '#6b432a' },
        { id: 'mint',   labelEn: 'Alien',  labelKr: '외계인', color: '#8fe3b0', unlockUnit: 'my-body' },
      ],
    },
    hair: {
      labelEn: 'Hair', labelKr: '머리', unlockUnit: null,
      options: [
        { id: 'none',   labelEn: 'None',    labelKr: '없음',   color: null },
        { id: 'black',  labelEn: 'Black',   labelKr: '검정',   color: '#2b2b33' },
        { id: 'brown',  labelEn: 'Brown',   labelKr: '갈색',   color: '#6b4327' },
        { id: 'blonde', labelEn: 'Blonde',  labelKr: '금발',   color: '#e5c46b' },
        { id: 'red',    labelEn: 'Red',     labelKr: '빨강',   color: '#c1502e', unlockUnit: 'family-feelings' },
        { id: 'blue',   labelEn: 'Blue',    labelKr: '파랑',   color: '#3f7fd4', unlockUnit: 'colors-shapes' },
        { id: 'pink',   labelEn: 'Pink',    labelKr: '분홍',   color: '#e87ab0', unlockUnit: 'colors-shapes' },
      ],
    },
    shirt: {
      labelEn: 'Shirt', labelKr: '윗옷', unlockUnit: null,
      options: [
        { id: 'red',     labelEn: 'Red',     labelKr: '빨강',   color: '#e2574c' },
        { id: 'blue',    labelEn: 'Blue',    labelKr: '파랑',   color: '#3f8fd4' },
        { id: 'green',   labelEn: 'Green',   labelKr: '초록',   color: '#5cb87a' },
        { id: 'yellow',  labelEn: 'Yellow',  labelKr: '노랑',   color: '#f0c04a', unlockUnit: 'hello-friend' },
        { id: 'purple',  labelEn: 'Purple',  labelKr: '보라',   color: '#9269d4', unlockUnit: 'my-clothes' },
        { id: 'rainbow', labelEn: 'Rainbow', labelKr: '무지개', color: '#ff8fb1', unlockUnit: 'my-clothes' },
        { id: 'raincoat',labelEn: 'Raincoat',labelKr: '비옷',   color: '#f2b134', unlockUnit: 'weather' },
      ],
    },
    pants: {
      labelEn: 'Pants', labelKr: '바지', unlockUnit: null,
      options: [
        { id: 'denim',  labelEn: 'Denim',  labelKr: '청바지', color: '#3d5a80' },
        { id: 'grey',   labelEn: 'Grey',   labelKr: '회색',   color: '#6d6d78' },
        { id: 'black',  labelEn: 'Black',  labelKr: '검정',   color: '#33333d' },
        { id: 'khaki',  labelEn: 'Khaki',  labelKr: '카키',   color: '#b5a06b', unlockUnit: 'my-clothes' },
        { id: 'teal',   labelEn: 'Teal',   labelKr: '청록',   color: '#3fa9a0', unlockUnit: 'my-house' },
      ],
    },
    hat: {
      labelEn: 'Head Gear', labelKr: '머리 장식', unlockUnit: null,
      options: [
        { id: 'none',    labelEn: 'None',      labelKr: '없음',       color: null },
        { id: 'cap',     labelEn: 'Cap',       labelKr: '모자',       color: '#e2574c', unlockUnit: 'hello-friend' },
        { id: 'ears',    labelEn: 'Cat Ears',  labelKr: '고양이 귀',  color: '#8a6a4a', unlockUnit: 'animals', shape: 'ears' },
        { id: 'chef',    labelEn: 'Chef Hat',  labelKr: '요리사 모자', color: '#ffffff', unlockUnit: 'food-i-like', shape: 'tall' },
        { id: 'grad',    labelEn: 'Grad Cap',  labelKr: '학사모',     color: '#2b2b33', unlockUnit: 'my-classroom', shape: 'flat' },
      ],
    },
  };

  const DEFAULTS = { skin: 'light', hair: 'black', shirt: 'blue', pants: 'denim', hat: 'none' };

  /* ---------------- persistence ---------------- */

  function load() {
    try {
      return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(STORAGE_KEY)) || {});
    } catch {
      return Object.assign({}, DEFAULTS);
    }
  }

  function save(config) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }

  function optionUnlockUnit(category, option) {
    return option.unlockUnit || CATALOG[category].unlockUnit || null;
  }

  function isUnlocked(category, option, progress) {
    const unit = optionUnlockUnit(category, option);
    return !unit || !!progress[unit];
  }

  function unlockStats(progress) {
    let total = 0, unlocked = 0;
    Object.keys(CATALOG).forEach(cat => {
      CATALOG[cat].options.forEach(opt => {
        total++;
        if (isUnlocked(cat, opt, progress)) unlocked++;
      });
    });
    return { total, unlocked };
  }

  function findOption(category, id) {
    return CATALOG[category].options.find(o => o.id === id) || CATALOG[category].options[0];
  }

  /* ---------------- CSS-3D box builder ----------------
     One <div class="vox"> per box, with six absolutely-positioned
     faces rotated into place. Sizes are in "voxel units" scaled by
     --vox-scale so the whole rig resizes from one variable. */

  const FACES = ['front', 'back', 'right', 'left', 'top', 'bottom'];

  function makeBox({ w, h, d, x = 0, y = 0, z = 0, cls = '', name = '' }) {
    const box = document.createElement('div');
    box.className = `vox ${cls}`;
    if (name) box.dataset.part = name;
    box.style.width = `calc(var(--vox) * ${w})`;
    box.style.height = `calc(var(--vox) * ${h})`;
    /* Rest position goes into custom properties rather than an inline
       `transform`, because an inline transform would outrank the pose
       rules in the stylesheet and poses would silently never apply. */
    box.style.setProperty('--px', `calc(var(--vox) * ${x})`);
    box.style.setProperty('--py', `calc(var(--vox) * ${y})`);
    box.style.setProperty('--pz', `calc(var(--vox) * ${z})`);

    FACES.forEach(face => {
      const el = document.createElement('div');
      el.className = `vox-face vox-${face}`;
      let fw = w, fh = h, tf = '';
      if (face === 'front')  { tf = `translateZ(calc(var(--vox) * ${d / 2}))`; }
      if (face === 'back')   { tf = `translateZ(calc(var(--vox) * ${-d / 2})) rotateY(180deg)`; }
      if (face === 'right')  { fw = d; tf = `translateX(calc(var(--vox) * ${w / 2})) rotateY(90deg)`; }
      if (face === 'left')   { fw = d; tf = `translateX(calc(var(--vox) * ${-w / 2})) rotateY(-90deg)`; }
      if (face === 'top')    { fh = d; tf = `translateY(calc(var(--vox) * ${-h / 2})) rotateX(90deg)`; }
      if (face === 'bottom') { fh = d; tf = `translateY(calc(var(--vox) * ${h / 2})) rotateX(-90deg)`; }
      el.style.width = `calc(var(--vox) * ${fw})`;
      el.style.height = `calc(var(--vox) * ${fh})`;
      el.style.transform = `translate(-50%, -50%) ${tf}`;
      box.appendChild(el);
    });
    return box;
  }

  function paint(box, color) {
    box.querySelectorAll('.vox-face').forEach(f => { f.style.background = color; });
    // Shade the sides so the character reads as solid rather than flat.
    const side = box.querySelector('.vox-left');
    const right = box.querySelector('.vox-right');
    const top = box.querySelector('.vox-top');
    const bottom = box.querySelector('.vox-bottom');
    if (side) side.style.filter = 'brightness(0.82)';
    if (right) right.style.filter = 'brightness(0.9)';
    if (top) top.style.filter = 'brightness(1.12)';
    if (bottom) bottom.style.filter = 'brightness(0.7)';
  }

  /* ---------------- the rig ----------------
     Minecraft proportions in voxel units:
     head 8x8x8, body 8x12x4, arm 4x12x4, leg 4x12x4. */

  function buildRig(container) {
    container.innerHTML = '';
    const rig = document.createElement('div');
    rig.className = 'avatar-rig';

    const head = makeBox({ w: 8, h: 8, d: 8, y: -16, cls: 'part-head', name: 'head' });
    // Face details live on the head's front face.
    const face = head.querySelector('.vox-front');
    face.classList.add('has-face');
    ['eye-l', 'eye-r', 'mouth'].forEach(k => {
      const d = document.createElement('span');
      d.className = `face-bit ${k}`;
      face.appendChild(d);
    });

    // Hair sits as a cap over the top of the head so the face stays visible.
    const hair = makeBox({ w: 8.5, h: 3.6, d: 8.5, y: -18.2, cls: 'part-hair', name: 'hair' });
    const hat = makeBox({ w: 9, h: 3, d: 9, y: -21, cls: 'part-hat', name: 'hat' });
    const earL = makeBox({ w: 2, h: 2.4, d: 1.4, x: -2.4, y: -21.5, cls: 'part-ear', name: 'earL' });
    const earR = makeBox({ w: 2, h: 2.4, d: 1.4, x: 2.4, y: -21.5, cls: 'part-ear', name: 'earR' });

    const body = makeBox({ w: 8, h: 12, d: 4, y: -6, cls: 'part-body', name: 'body' });

    const armL = makeBox({ w: 4, h: 12, d: 4, x: -6, y: -6, cls: 'part-arm arm-l', name: 'armL' });
    const armR = makeBox({ w: 4, h: 12, d: 4, x: 6, y: -6, cls: 'part-arm arm-r', name: 'armR' });
    // Hands: lower slice of each arm stays skin-colored.
    const handL = makeBox({ w: 4.1, h: 3.6, d: 4.1, x: -6, y: -0.2, cls: 'part-hand hand-l', name: 'handL' });
    const handR = makeBox({ w: 4.1, h: 3.6, d: 4.1, x: 6, y: -0.2, cls: 'part-hand hand-r', name: 'handR' });

    // Slight gap between the legs so they read as two limbs, not one block.
    const legL = makeBox({ w: 3.8, h: 12, d: 4, x: -2.05, y: 6, cls: 'part-leg leg-l', name: 'legL' });
    const legR = makeBox({ w: 3.8, h: 12, d: 4, x: 2.05, y: 6, cls: 'part-leg leg-r', name: 'legR' });

    [body, armL, armR, handL, handR, legL, legR, head, hair, hat, earL, earR].forEach(p => rig.appendChild(p));
    container.appendChild(rig);

    return {
      rig,
      parts: { head, hair, hat, earL, earR, body, armL, armR, handL, handR, legL, legR },
    };
  }

  /* ---------------- applying a look ---------------- */

  function applyConfig(built, config) {
    const { parts } = built;
    const skin = findOption('skin', config.skin).color;
    const hairOpt = findOption('hair', config.hair);
    const shirt = findOption('shirt', config.shirt).color;
    const pants = findOption('pants', config.pants).color;
    const hatOpt = findOption('hat', config.hat);

    paint(parts.head, skin);
    paint(parts.handL, skin);
    paint(parts.handR, skin);
    paint(parts.body, shirt);
    paint(parts.armL, shirt);
    paint(parts.armR, shirt);
    paint(parts.legL, pants);
    paint(parts.legR, pants);

    if (hairOpt.color) {
      paint(parts.hair, hairOpt.color);
      parts.hair.classList.remove('hidden');
    } else {
      parts.hair.classList.add('hidden');
    }

    const showHat = !!hatOpt.color;
    const isEars = hatOpt.shape === 'ears';
    parts.hat.classList.toggle('hidden', !showHat || isEars);
    parts.earL.classList.toggle('hidden', !isEars);
    parts.earR.classList.toggle('hidden', !isEars);
    if (showHat) {
      paint(parts.hat, hatOpt.color);
      paint(parts.earL, hatOpt.color);
      paint(parts.earR, hatOpt.color);
      parts.hat.classList.toggle('hat-tall', hatOpt.shape === 'tall');
      parts.hat.classList.toggle('hat-flat', hatOpt.shape === 'flat');
    }
  }

  /* ---------------- interaction: drag to rotate ---------------- */

  function enableDragRotate(stage, rig) {
    let dragging = false, startX = 0, startRot = -25, rot = -25;
    function setRot(v) { rot = v; rig.style.setProperty('--spin', `${v}deg`); }
    setRot(rot);

    function down(clientX) { dragging = true; startX = clientX; startRot = rot; stage.classList.add('dragging'); }
    function move(clientX) { if (dragging) setRot(startRot + (clientX - startX) * 0.6); }
    function up() { dragging = false; stage.classList.remove('dragging'); }

    stage.addEventListener('pointerdown', e => down(e.clientX));
    window.addEventListener('pointermove', e => move(e.clientX));
    window.addEventListener('pointerup', up);
    return { setRot: v => setRot(v), get rotation() { return rot; } };
  }

  function setPose(built, pose) {
    built.rig.dataset.pose = pose;
  }

  return {
    CATALOG, DEFAULTS,
    load, save, findOption, isUnlocked, optionUnlockUnit, unlockStats,
    buildRig, applyConfig, enableDragRotate, setPose,
  };
})();
