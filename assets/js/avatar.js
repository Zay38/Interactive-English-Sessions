/* ============================================================
   Avatar — a stylized character the student builds and grows
   through their English learning journey.

   Rendered with pure CSS 3D (transform-style: preserve-3d), not a
   WebGL engine: the character is a few dozen boxes, so CSS draws it
   natively with zero dependencies and runs well on school
   Chromebooks.

   PROPORTIONS are Fortnite-ish rather than Minecraft-ish: a small
   head (~1/5 of height instead of 1/4), broad shoulders tapering to
   a narrower waist, and limbs that TAPER from upper to lower
   segment. Nothing is a plain cube.

   The rig is JOINTED. Each limb is built as
       anchor (static translate to the joint)
         └── pivot (rotation only — this is what animates)
              ├── segment box
              └── anchor (next joint down)
   so a shoulder can swing the whole arm while the elbow bends
   independently. Keeping the translate on the anchor and the
   rotation on the pivot means keyframes only ever touch rotation,
   which is what makes real cycles (a walk, a wave) possible —
   an earlier version put both on one element, so every pose could
   only be a single frozen transform.

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

  /* ---------------- box + joint builders ---------------- */

  const FACES = ['front', 'back', 'right', 'left', 'top', 'bottom'];

  /* A box centred on (x, y, z) in voxel units. `round` softens the
     silhouette so limbs don't read as hard cubes. */
  function makeBox({ w, h, d, x = 0, y = 0, z = 0, cls = '', round = 0.28 }) {
    const box = document.createElement('div');
    box.className = `vox ${cls}`;
    box.style.width = `calc(var(--vox) * ${w})`;
    box.style.height = `calc(var(--vox) * ${h})`;
    /* The div's top-left sits at the translate point while its faces are
       centred inside it, so shift back by half the box to make (x, y, z)
       mean the box's CENTRE. Without this every part is displaced by half
       its own size and the body comes apart at the joints. */
    box.style.transform = `translate3d(calc(var(--vox) * ${x - w / 2}), calc(var(--vox) * ${y - h / 2}), calc(var(--vox) * ${z}))`;

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
      if (round) el.style.borderRadius = `calc(var(--vox) * ${round})`;
      box.appendChild(el);
    });
    return box;
  }

  /* Static positioning node: moves the origin to a joint. */
  function anchor(x, y, z, cls = '') {
    const a = document.createElement('div');
    a.className = `joint-anchor ${cls}`;
    a.style.transform = `translate3d(calc(var(--vox) * ${x}), calc(var(--vox) * ${y}), calc(var(--vox) * ${z}))`;
    return a;
  }

  /* Rotating node: the ONLY thing animations touch. */
  function pivot(cls) {
    const p = document.createElement('div');
    p.className = `joint-pivot ${cls}`;
    return p;
  }

  /* ---------------- the rig ----------------
     Voxel units, origin at the hip line. Negative y is up.
     Head is ~6.4 tall against a ~33 tall figure. */

  const P = {
    head:     { w: 5.9, h: 6.0, d: 5.7 },
    neck:     { w: 3.1, h: 1.2, d: 3.0 },
    chest:    { w: 8.2, h: 7.0, d: 4.3 },
    waist:    { w: 6.4, h: 4.2, d: 3.9 },
    hips:     { w: 7.0, h: 2.6, d: 4.0 },
    upperArm: { w: 2.7, h: 6.0, d: 2.9 },
    foreArm:  { w: 2.3, h: 5.4, d: 2.5 },
    hand:     { w: 2.6, h: 2.5, d: 2.6 },
    thigh:    { w: 3.5, h: 7.4, d: 3.7 },
    shin:     { w: 3.0, h: 7.0, d: 3.2 },
    foot:     { w: 3.3, h: 2.0, d: 5.0 },
  };

  const SHOULDER_Y = -10.4;
  const SHOULDER_X = 4.3;
  const HIP_X = 1.95;

  function buildArm(side) {
    const sign = side === 'l' ? -1 : 1;
    const shoulder = anchor(sign * SHOULDER_X, SHOULDER_Y, 0, `anchor-shoulder-${side}`);
    const shoulderPivot = pivot(`pivot-shoulder pivot-shoulder-${side}`);

    const upper = makeBox({ ...P.upperArm, y: P.upperArm.h / 2, cls: `part-upperarm arm-${side}` });
    shoulderPivot.appendChild(upper);

    const elbow = anchor(0, P.upperArm.h, 0, `anchor-elbow-${side}`);
    const elbowPivot = pivot(`pivot-elbow pivot-elbow-${side}`);
    const fore = makeBox({ ...P.foreArm, y: P.foreArm.h / 2, cls: `part-forearm arm-${side}` });
    const hand = makeBox({ ...P.hand, y: P.foreArm.h + P.hand.h / 2 - 0.3, cls: `part-hand hand-${side}`, round: 0.5 });
    elbowPivot.appendChild(fore);
    elbowPivot.appendChild(hand);
    elbow.appendChild(elbowPivot);
    shoulderPivot.appendChild(elbow);

    shoulder.appendChild(shoulderPivot);
    return { shoulder, upper, fore, hand };
  }

  function buildLeg(side) {
    const sign = side === 'l' ? -1 : 1;
    const hip = anchor(sign * HIP_X, 1.0, 0, `anchor-hip-${side}`);
    const hipPivot = pivot(`pivot-hip pivot-hip-${side}`);

    const thigh = makeBox({ ...P.thigh, y: P.thigh.h / 2, cls: `part-thigh leg-${side}` });
    hipPivot.appendChild(thigh);

    const knee = anchor(0, P.thigh.h, 0, `anchor-knee-${side}`);
    const kneePivot = pivot(`pivot-knee pivot-knee-${side}`);
    const shin = makeBox({ ...P.shin, y: P.shin.h / 2, cls: `part-shin leg-${side}` });
    const foot = makeBox({ ...P.foot, y: P.shin.h + P.foot.h / 2 - 0.2, z: 0.9, cls: `part-foot foot-${side}`, round: 0.5 });
    kneePivot.appendChild(shin);
    kneePivot.appendChild(foot);
    knee.appendChild(kneePivot);
    hipPivot.appendChild(knee);

    hip.appendChild(hipPivot);
    return { hip, thigh, shin, foot };
  }

  function buildRig(container) {
    container.innerHTML = '';
    const rig = document.createElement('div');
    rig.className = 'avatar-rig';

    /* Root pivot lets the whole body bob/lean without disturbing the
       stage's rotation, which lives on .avatar-rig itself. */
    const root = pivot('pivot-root');
    rig.appendChild(root);

    const torso = pivot('pivot-torso');
    root.appendChild(torso);

    const hips = makeBox({ ...P.hips, y: 0.6, cls: 'part-hips' });
    const waist = makeBox({ ...P.waist, y: -2.3, cls: 'part-waist' });
    const chest = makeBox({ ...P.chest, y: -7.6, cls: 'part-chest' });
    torso.appendChild(hips);
    torso.appendChild(waist);
    torso.appendChild(chest);

    // head, on its own pivot so it can turn and nod
    const neckAnchor = anchor(0, -11.3, 0, 'anchor-neck');
    const neckPivot = pivot('pivot-neck');
    /* Derive the hair/hat/ear placement from where the head actually is,
       rather than hand-tuned constants — otherwise any tweak to head size
       leaves the hair floating off the skull. */
    const headCY = -(P.neck.h + P.head.h / 2) + 0.4;
    const headTop = headCY - P.head.h / 2;

    const neck = makeBox({ ...P.neck, y: -P.neck.h / 2, cls: 'part-neck' });
    const head = makeBox({ ...P.head, y: headCY, cls: 'part-head', round: 0.7 });

    const face = head.querySelector('.vox-front');
    face.classList.add('has-face');
    ['eye-l', 'eye-r', 'mouth'].forEach(k => {
      const d = document.createElement('span');
      d.className = `face-bit ${k}`;
      face.appendChild(d);
    });

    /* Hair overlaps the top of the skull (so no skin seam shows) and
       rises a little above it. */
    const hairH = 3.6;
    const hair = makeBox({
      w: P.head.w + 0.45, h: hairH, d: P.head.d + 0.45,
      y: headTop + 0.8, cls: 'part-hair', round: 0.9,
    });
    const hat = makeBox({
      w: P.head.w + 1.0, h: 2.4, d: P.head.d + 1.0,
      y: headTop - 0.7, cls: 'part-hat', round: 0.5,
    });
    const earL = makeBox({ w: 1.6, h: 2.1, d: 1.2, x: -2.0, y: headTop - 0.9, cls: 'part-ear', round: 0.3 });
    const earR = makeBox({ w: 1.6, h: 2.1, d: 1.2, x: 2.0, y: headTop - 0.9, cls: 'part-ear', round: 0.3 });

    [neck, head, hair, hat, earL, earR].forEach(p => neckPivot.appendChild(p));
    neckAnchor.appendChild(neckPivot);
    torso.appendChild(neckAnchor);

    const armL = buildArm('l');
    const armR = buildArm('r');
    torso.appendChild(armL.shoulder);
    torso.appendChild(armR.shoulder);

    const legL = buildLeg('l');
    const legR = buildLeg('r');
    root.appendChild(legL.hip);
    root.appendChild(legR.hip);

    container.appendChild(rig);

    return {
      rig,
      parts: {
        head, hair, hat, earL, earR, neck,
        hips, waist, chest,
        upperArmL: armL.upper, foreArmL: armL.fore, handL: armL.hand,
        upperArmR: armR.upper, foreArmR: armR.fore, handR: armR.hand,
        thighL: legL.thigh, shinL: legL.shin, footL: legL.foot,
        thighR: legR.thigh, shinR: legR.shin, footR: legR.foot,
      },
    };
  }

  /* ---------------- painting ---------------- */

  function paint(box, color) {
    box.querySelectorAll('.vox-face').forEach(f => { f.style.background = color; });
    // Shade the sides so the character reads as solid rather than flat.
    const q = (sel, filter) => { const n = box.querySelector(sel); if (n) n.style.filter = filter; };
    q('.vox-left', 'brightness(0.82)');
    q('.vox-right', 'brightness(0.9)');
    q('.vox-top', 'brightness(1.12)');
    q('.vox-bottom', 'brightness(0.7)');
  }

  function applyConfig(built, config) {
    const { parts } = built;
    const skin = findOption('skin', config.skin).color;
    const hairOpt = findOption('hair', config.hair);
    const shirt = findOption('shirt', config.shirt).color;
    const pants = findOption('pants', config.pants).color;
    const hatOpt = findOption('hat', config.hat);

    // skin
    [parts.head, parts.neck, parts.handL, parts.handR, parts.foreArmL, parts.foreArmR].forEach(p => paint(p, skin));
    // shirt covers torso + upper arms
    [parts.chest, parts.waist, parts.upperArmL, parts.upperArmR].forEach(p => paint(p, shirt));
    // pants cover hips + legs; shoes stay dark
    [parts.hips, parts.thighL, parts.thighR, parts.shinL, parts.shinR].forEach(p => paint(p, pants));
    [parts.footL, parts.footR].forEach(p => paint(p, '#2f3340'));

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

  /* ---------------- interaction ---------------- */

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
