/* =========================================================
   ADVIENTO ÁLVARO · lógica principal
   ========================================================= */
(function () {
  'use strict';

  const CFG = window.ADVIENTO;
  const { art, pattern, burst, THEMES, starPts } = window.ADV_ART;
  const $ = (s, r = document) => r.querySelector(s);
  const pad = (n) => String(n).padStart(2, '0');
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const params = new URLSearchParams(location.search);
  const PREVIEW = params.has('preview');

  /* ---------- almacenamiento seguro ---------- */
  const KEY = 'adviento-alvaro-' + CFG.year;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(KEY + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(KEY + k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } },
  };
  let opened = new Set(store.get(':opened', []));
  const saveOpened = () => store.set(':opened', [...opened]);

  /* ---------- calendario: qué días de diciembre hay sobre ----------
     mode 'pares'   → 2, 4, 6 … 24
     mode 'impares' → 1, 3, 5 … 23
     mode 'todos'   → 12 días seguidos desde startDay
     Prioridad: enlace (?dias=…&inicio=…) > panel de admin (este navegador) > gifts.js */
  const MODES = { pares: 'Pares', impares: 'Impares', todos: 'Todos seguidos' };
  function baseSchedule() {
    const s = { mode: 'todos', month: 12, startDay: 13 };
    if (CFG.schedule) Object.assign(s, CFG.schedule);
    else if (CFG.startDate) { const p = CFG.startDate.split('-').map(Number); s.month = p[1]; s.startDay = p[2]; }
    return s;
  }
  function cleanSchedule(s) {
    const out = { mode: MODES[s.mode] ? s.mode : 'todos', month: clamp(Number(s.month) || 12, 1, 12), startDay: clamp(Math.round(Number(s.startDay) || 13), 1, 20) };
    return out;
  }
  function readSchedule() {
    const s = baseSchedule();
    const saved = store.get(':schedule', null);
    if (saved) Object.assign(s, saved);
    const q = params.get('dias');
    if (q && MODES[q]) s.mode = q;
    if (params.get('inicio')) s.startDay = Number(params.get('inicio'));
    return cleanSchedule(s);
  }
  function scheduleDays(s) {
    if (s.mode === 'pares') return Array.from({ length: 12 }, (_, i) => 2 + i * 2);
    if (s.mode === 'impares') return Array.from({ length: 12 }, (_, i) => 1 + i * 2);
    return Array.from({ length: 12 }, (_, i) => s.startDay + i);
  }
  let SCHED = readSchedule();
  let DAYS = scheduleDays(SCHED);
  const dayDate = (n) => new Date(CFG.year, SCHED.month - 1, DAYS[n - 1]);
  const calDay = (n) => DAYS[n - 1];
  const fmtDate = (d) => `${d.getDate()} ${MONTHS[d.getMonth()]}`;
  const isUnlocked = (day) => PREVIEW || Date.now() >= dayDate(day).getTime();
  const isToday = (day) => { const d = dayDate(day), n = new Date(); return d.toDateString() === n.toDateString(); };

  const gifts = CFG.gifts.slice().sort((a, b) => a.day - b.day);
  const giftByDay = (d) => gifts.find((g) => g.day === d);

  /* ---------- utilidades visuales ---------- */
  function rng(seed) { let s = seed * 9301 + 49297; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); }
  function bars(seed, n = 34) {
    const r = rng(seed); let h = '';
    for (let i = 0; i < n; i++) { const w = 1 + Math.floor(r() * 3); h += `<i style="width:${w * 0.35}cqw;opacity:${r() > .12 ? 1 : 0}"></i>`; }
    return h;
  }
  function sparkles(seed, n = 7) {
    const r = rng(seed + 3); let h = '';
    for (let i = 0; i < n; i++) h += `<i style="--x:${(8 + r() * 84).toFixed(0)}%;--y:${(8 + r() * 80).toFixed(0)}%;--d:${(r() * 2.4).toFixed(2)}s"></i>`;
    return `<div class="sparkles">${h}</div>`;
  }
  const themeVars = (t) => `--c1:${t.c1};--c2:${t.c2};--c3:${t.c3};`;
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const RAR_STARS = { comun: '●', rara: '★', holo: '★★', secreta: '★★★' };
  const RAR_GLOW = { comun: '#9fd3ff', rara: '#ffd23f', holo: '#ff6be6', secreta: '#ffffff' };
  const RAR_NAME = { comun: 'Común', rara: 'Rara', holo: 'Holo Rara', secreta: 'Secreta' };

  const logoHTML = () => `<span class="logo"><span class="logo__pre">Calendario de</span><span class="logo__main" data-text="ADVIENTO">ADVIENTO</span><span class="logo__pill">${esc(CFG.owner)}</span></span>`;

  /* ---------- SOBRE ---------- */
  function packHTML(day) {
    const t = THEMES[day] || THEMES[1];
    return `
    <div class="pack ${t.rainbow ? 'pack--rainbow' : ''}" style="${themeVars(t)}">
      <div class="pack__body">
        <div class="pack__layer pack__pattern">${pattern(t.pattern, t.c3)}</div>
        <div class="pack__burst">${burst(t.c3, t.c1)}</div>
        <div class="pack__mascot">${art(t.mascot)}</div>
        <div class="pack__logo">${logoHTML()}</div>
        <div class="pack__badge">${pad(calDay(day))}</div>
        <div class="pack__name">${esc(t.name)}</div>
        <div class="pack__band"><i>1</i>Regalo especial</div>
        <div class="pack__layer pack__pillow"></div>
        <div class="pack__crimp pack__crimp--top"></div>
        <div class="pack__crimp pack__crimp--bottom"></div>
        <div class="pack__layer pack__foil"></div>
        <div class="pack__layer pack__rainbow"></div>
        <div class="pack__layer pack__shine"></div>
        <div class="pack__layer pack__glare"></div>
      </div>
    </div>`;
  }

  /* ---------- CARTA ---------- */
  const holoLayers = `<div class="tcard__holo"></div><div class="tcard__sparkle"></div><div class="tcard__glare"></div>`;
  const objHTML = (g) => g.image ? `<img src="${esc(g.image)}" alt="${esc(g.name)}" draggable="false">` : art(g.art);
  const artScene = (g, t) => `
    <div class="pack__layer pack__pattern">${pattern(t.pattern, t.c3)}</div>
    <div class="pack__burst">${burst(t.c3, t.c1)}</div>
    <div class="tcard__shadow"></div>
    <div class="tcard__obj">${objHTML(g)}</div>
    ${sparkles(g.day)}`;

  // reduce la letra del nombre para que quepa entero en la cabecera
  const nameSize = (n) => Math.max(3.6, Math.min(6.3, 6.3 * 12 / Math.max(12, String(n).length))).toFixed(2);

  function cardHTML(g) {
    if (g.type === 'ticket') return ticketHTML(g);
    const t = THEMES[g.day] || THEMES[1];
    const rar = g.rarity || 'comun';
    const full = rar === 'holo' || rar === 'secreta';
    const head = `
      <div class="tcard__head">
        <span class="tcard__stage">Regalo</span>
        <h3 class="tcard__name" style="font-size:${nameSize(g.name)}cqw">${esc(g.name)}</h3>
        <span class="tcard__hp"><small>DÍA</small><b>${pad(calDay(g.day))}</b></span>
        <span class="tcard__type">${art('spark')}</span>
      </div>`;
    const ability = `
      <div class="tcard__ability">
        <div class="tcard__ability-head">
          <span class="tcard__energy"><span></span><span></span></span>
          <span class="tcard__ability-name">${esc(g.effect || 'Sorpresa')}</span>
          <span class="tcard__power">${esc(g.power || '')}</span>
        </div>
        <p class="tcard__desc">${esc(g.description)}</p>
      </div>`;
    const stats = `<div class="tcard__stats"><span>ilusión <b>×2</b></span><span>sorpresa <b>100%</b></span><span>abre <b>${fmtDate(dayDate(g.day))}</b></span></div>`;
    const foot = `<div class="tcard__foot"><span>Ilus. Adviento ${esc(CFG.owner)}</span><span class="tcard__rar">${RAR_STARS[rar]}</span><span>${pad(g.day)}/12</span></div>`;

    if (full) {
      return `
      <div class="tcard tcard--full tcard--${rar}" style="${themeVars(t)}">
        <div class="tcard__in"><div class="tcard__frame">
          <div class="tcard__fullart">${artScene(g, t)}</div>
          <div class="tcard__bigtitle">${esc(g.effect || g.name)}</div>
          ${head}
          <div class="tcard__panel">${ability}${stats}${foot}</div>
        </div></div>
        ${holoLayers}
      </div>`;
    }
    return `
    <div class="tcard tcard--${rar}" style="${themeVars(t)}">
      <div class="tcard__in"><div class="tcard__frame">
        ${head}
        <div class="tcard__art">${artScene(g, t)}</div>
        <div class="tcard__strip">Regalo de Adviento · Nº ${pad(g.day)}/12 · ${esc(t.name)}</div>
        ${ability}
        ${g.flavor ? `<p class="tcard__flavor">“${esc(g.flavor)}”</p>` : ''}
        ${stats}
        ${foot}
      </div></div>
      ${holoLayers}
    </div>`;
  }

  /* ---------- ENTRADA ---------- */
  function ticketHTML(g) {
    const t = THEMES[g.day] || THEMES[1];
    const k = g.ticket || {};
    const rar = g.rarity || 'holo';
    const code = `AA-${CFG.year}-${pad(g.day)}-${(g.day * 7919 % 10000).toString().padStart(4, '0')}`;
    return `
    <div class="tcard ticket tcard--${rar}" style="${themeVars(t)}">
      <div class="tcard__in">
        <div class="ticket__main">
          <div class="ticket__top"><span>Adviento ${esc(CFG.owner)} presenta</span><span class="ticket__vip">VIP</span></div>
          <div class="ticket__art">${artScene(g, t)}</div>
          <h3 class="ticket__title">${esc(g.name)}</h3>
          <p class="ticket__sub">${esc(g.description)}</p>
          <dl class="ticket__grid">
            <div><dt>Fecha</dt><dd>${esc(k.date || '—')}</dd></div>
            <div><dt>Hora</dt><dd>${esc(k.time || '—')}</dd></div>
            <div><dt>Lugar</dt><dd>${esc(k.place || '—')}</dd></div>
            <div><dt>Asiento</dt><dd>${esc(k.seat || '—')}</dd></div>
          </dl>
        </div>
        <div class="ticket__foil"></div>
        <div class="ticket__perf"></div>
        <div class="ticket__stub">
          <div class="ticket__admit">Entrada<small>Admite 1 · ${esc(g.effect || 'Pase')}</small></div>
          <div class="ticket__day">DÍA<b>${pad(calDay(g.day))}</b>${fmtDate(dayDate(g.day)).toUpperCase()}</div>
          <div class="ticket__barcode">${bars(g.day * 13, 46)}</div>
          <div class="ticket__code">${code}</div>
        </div>
      </div>
      ${holoLayers}
    </div>`;
  }

  /* ---------- DORSO ---------- */
  function backHTML() {
    return `
    <div class="tcard cardback">
      <div class="tcard__in"><div class="cardback__face">
        <div class="pack__pattern">${pattern('rays', '#9fb8ff')}</div>
        <div class="cardback__star"><svg viewBox="0 0 200 200"><polygon points="${starPts(100, 100, 98, 70, 16)}" fill="#ffd23f" opacity=".25"/><polygon points="${starPts(100, 100, 80, 40, 8, -90)}" fill="#ffd23f" opacity=".35"/></svg></div>
        <div class="cardback__ring"></div>
        <div class="cardback__logo">${logoHTML()}</div>
        <div class="cardback__foot">COLECCIÓN ${CFG.year}</div>
      </div></div>
      <div class="tcard__glare"></div>
    </div>`;
  }

  /* ---------- FUNDA GRADEADA ---------- */
  function slabHTML(g) {
    const serial = String(90000000 + g.day * 1234567).slice(0, 8);
    return `
    <div class="slab">
      <div class="slab__body">
        <div class="slab__label">
          <div class="l">
            <span>${CFG.year} Adviento ${esc(CFG.owner)}</span>
            <span>${esc(g.name)}</span>
            <span>Día ${pad(calDay(g.day))} · ${g.type === 'ticket' ? 'Entrada' : RAR_NAME[g.rarity] || 'Regalo'}</span>
            <div class="slab__bar">${bars(g.day * 31, 30)}</div>
          </div>
          <div class="r">
            <span>#${pad(g.day)}/12</span>
            <span>Gem MT</span>
            <span class="slab__grade">10</span>
            <span>${serial}</span>
          </div>
          <span class="slab__mark">AAG</span>
        </div>
        <div class="slab__window">${cardHTML(g)}</div>
        <div class="slab__gloss"></div>
      </div>
    </div>`;
  }

  /* ---------- inclinación 3D ---------- */
  function setTiltVars(el, px, py, max) {
    el.style.setProperty('--mx', px.toFixed(3));
    el.style.setProperty('--my', py.toFixed(3));
    el.style.setProperty('--rx', ((0.5 - py) * max).toFixed(2) + 'deg');
    el.style.setProperty('--ry', ((px - 0.5) * max).toFixed(2) + 'deg');
  }
  function resetTilt(el) {
    el.classList.remove('is-tilting');
    ['--mx', '--my', '--rx', '--ry'].forEach((p) => el.style.removeProperty(p));
  }
  function bindTilt(el, max = 16) {
    el.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const r = el.getBoundingClientRect();
      el.classList.add('is-tilting');
      setTiltVars(el, clamp((e.clientX - r.left) / r.width, 0, 1), clamp((e.clientY - r.top) / r.height, 0, 1), max);
    });
    el.addEventListener('pointerleave', () => resetTilt(el));
  }

  /* =========================================================
     SONIDO (sintetizado con Web Audio, sin archivos)
     ========================================================= */
  const sfx = {
    ctx: null,
    on: store.get(':sound', true),
    ensure() {
      if (!this.on) return null;
      try {
        if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (this.ctx.state === 'suspended') this.ctx.resume();
      } catch (e) { return null; }
      return this.ctx;
    },
    noise(dur, type, f1, f2, gain = 0.4, q = 1) {
      const c = this.ensure(); if (!c) return;
      const len = Math.floor(c.sampleRate * dur);
      const buf = c.createBuffer(1, len, c.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (Math.random() > .97 ? 1 : .5);
      const src = c.createBufferSource(); src.buffer = buf;
      const f = c.createBiquadFilter(); f.type = type; f.Q.value = q;
      f.frequency.setValueAtTime(f1, c.currentTime);
      f.frequency.exponentialRampToValueAtTime(f2, c.currentTime + dur);
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, c.currentTime);
      g.gain.exponentialRampToValueAtTime(gain, c.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
      src.connect(f).connect(g).connect(c.destination);
      src.start();
    },
    tone(freq, at, dur, type = 'triangle', gain = 0.18) {
      const c = this.ensure(); if (!c) return;
      const t = c.currentTime + at;
      const o = c.createOscillator(); o.type = type; o.frequency.value = freq;
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(gain, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.05);
    },
    crinkle() { this.noise(0.08, 'highpass', 3000, 6000, 0.08, 0.7); },
    tear() { this.noise(0.45, 'bandpass', 1400, 5200, 0.55, 0.8); this.noise(0.25, 'highpass', 4000, 8000, 0.2); },
    whoosh() { this.noise(0.8, 'lowpass', 300, 2600, 0.35, 1.2); },
    charge(dur = 1.3) {
      const c = this.ensure(); if (!c) return;
      const t = c.currentTime;
      const o = c.createOscillator(); o.type = 'sawtooth';
      o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(980, t + dur);
      const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(400, t); f.frequency.exponentialRampToValueAtTime(3200, t + dur);
      const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.09, t + dur * 0.9); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(f).connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.05);
    },
    reveal(big) {
      const notes = big ? [784, 988, 1175, 1568, 1976, 2349] : [1047, 1319, 1568, 2093];
      notes.forEach((n, i) => this.tone(n, i * 0.075, 0.9, 'triangle', 0.16));
      notes.forEach((n, i) => this.tone(n * 2, 0.3 + i * 0.05, 0.6, 'sine', 0.05));
      this.noise(1.2, 'highpass', 6000, 9000, 0.06);
    },
    freeze() {
      this.noise(0.12, 'highpass', 5000, 9000, 0.25, 0.8);
      [2637, 3520, 3136].forEach((f, i) => this.tone(f, 0.02 + i * 0.05, 0.35, 'sine', 0.07));
      this.tone(880, 0, 0.18, 'triangle', 0.06);
    },
    deny() { this.tone(220, 0, 0.12, 'square', 0.05); this.tone(180, 0.1, 0.16, 'square', 0.05); },
    click() { this.tone(1400, 0, 0.05, 'sine', 0.06); },
  };
  const soundBtn = $('#soundBtn');
  const syncSound = () => soundBtn.setAttribute('aria-pressed', String(sfx.on));
  soundBtn.addEventListener('click', () => { sfx.on = !sfx.on; store.set(':sound', sfx.on); syncSound(); if (sfx.on) sfx.click(); });
  syncSound();

  /* =========================================================
     PARTÍCULAS (confeti, chispas, convergencia)
     ========================================================= */
  const fx = (() => {
    const cv = $('#fx'), ctx = cv.getContext('2d');
    let parts = [], raf = 0, dpr = 1, W = 0, H = 0;
    function resize() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function loop() {
      ctx.clearRect(0, 0, W, H);
      parts = parts.filter((p) => p.life > 0);
      for (const p of parts) {
        p.life -= 1;
        if (p.kind === 'conv') {
          p.x += (p.tx - p.x) * p.k; p.y += (p.ty - p.y) * p.k; p.k *= 1.035;
          if (Math.hypot(p.tx - p.x, p.ty - p.y) < 6) p.life = 0;
        } else {
          p.vx *= p.drag; p.vy = p.vy * p.drag + p.g;
          p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        }
        const a = Math.min(1, p.life / 30);
        ctx.save(); ctx.globalAlpha = a; ctx.translate(p.x, p.y);
        if (p.kind === 'confetti') {
          ctx.rotate(p.rot); ctx.scale(1, Math.cos(p.rot * 2));
          ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        } else if (p.kind === 'star') {
          ctx.rotate(p.rot); ctx.fillStyle = p.c; ctx.shadowColor = p.c; ctx.shadowBlur = 12;
          ctx.beginPath();
          for (let i = 0; i < 8; i++) { const r = i % 2 ? p.s * .3 : p.s; const an = i * Math.PI / 4; ctx.lineTo(Math.cos(an) * r, Math.sin(an) * r); }
          ctx.closePath(); ctx.fill();
        } else {
          ctx.globalCompositeOperation = 'lighter';
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.s);
          g.addColorStop(0, '#fff'); g.addColorStop(.35, p.c); g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, p.s, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      }
      raf = parts.length ? requestAnimationFrame(loop) : 0;
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const rnd = (a, b) => a + Math.random() * (b - a);
    return {
      resize,
      clear() { parts = []; },
      burst(x, y, colors, n = 50, power = 9) {
        if (reduceMotion) return;
        for (let i = 0; i < n; i++) {
          const an = Math.random() * Math.PI * 2, sp = rnd(power * .3, power);
          parts.push({ kind: Math.random() > .5 ? 'spark' : 'star', x, y, vx: Math.cos(an) * sp, vy: Math.sin(an) * sp, g: .12, drag: .95, rot: 0, vr: rnd(-.2, .2), s: rnd(3, 9), c: colors[i % colors.length], life: rnd(40, 80) });
        }
        kick();
      },
      confetti(colors, n = 170) {
        if (reduceMotion) return;
        for (let i = 0; i < n; i++) {
          const fromLeft = i % 2 === 0;
          parts.push({ kind: 'confetti', x: fromLeft ? -10 : W + 10, y: H * rnd(.35, .8), vx: (fromLeft ? 1 : -1) * rnd(6, 16), vy: rnd(-16, -6), g: .32, drag: .985, rot: rnd(0, 6), vr: rnd(-.3, .3), s: rnd(8, 14), c: colors[i % colors.length], life: rnd(110, 180) });
        }
        kick();
      },
      converge(cx, cy, colors, frames = 70) {
        if (reduceMotion) return;
        let f = 0;
        const add = () => {
          for (let i = 0; i < 4; i++) {
            const an = Math.random() * Math.PI * 2, d = rnd(Math.max(W, H) * .35, Math.max(W, H) * .6);
            parts.push({ kind: 'conv', x: cx + Math.cos(an) * d, y: cy + Math.sin(an) * d, tx: cx, ty: cy, k: .02, s: rnd(3, 7), c: colors[i % colors.length], life: 120, rot: 0 });
          }
          kick();
          if (++f < frames) requestAnimationFrame(add);
        };
        add();
      },
    };
  })();

  /* =========================================================
     NIEVE DE FONDO
     ========================================================= */
  (function snow() {
    const cv = $('.snow'), ctx = cv.getContext('2d');
    let W, H, flakes = [];
    function resize() {
      const dpr = Math.min(2, devicePixelRatio || 1);
      W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(110, W * H / 14000));
      flakes = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: .6 + Math.random() * 2.2, s: .25 + Math.random() * .8, w: Math.random() * Math.PI * 2 }));
    }
    function tick() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(255,255,255,.75)';
      for (const f of flakes) {
        f.y += f.s; f.w += .01; f.x += Math.sin(f.w) * .3;
        if (f.y > H + 5) { f.y = -5; f.x = Math.random() * W; }
        ctx.globalAlpha = .25 + f.r / 3.5;
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    addEventListener('resize', resize); resize();
    if (!reduceMotion) tick();
  })();

  /* =========================================================
     TABLERO
     ========================================================= */
  const board = $('#board');
  const toastEl = $('#toast');
  let toastT;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add('is-on');
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('is-on'), 2800);
  }

  /* ---------- bloque de hielo para los días bloqueados ---------- */
  function daysLeft(day) {
    const ms = dayDate(day) - Date.now();
    return Math.max(1, Math.ceil(ms / 86400000));
  }
  function iceHTML(day, date) {
    const r = rng(day * 17);
    let icicles = '', x = 2;
    while (x < 98) {
      const w = 3 + r() * 5, h = 5 + r() * 13;
      icicles += `<path d="M${x.toFixed(1)} 0 L${(x + w / 2).toFixed(1)} ${h.toFixed(1)} L${(x + w).toFixed(1)} 0Z"/>`;
      x += w + r() * 2.5;
    }
    const flakes = Array.from({ length: 6 }, (_, i) => `<i style="--x:${(8 + r() * 84).toFixed(0)}%;--y:${(10 + r() * 80).toFixed(0)}%;--d:${(r() * 3).toFixed(2)}s;--s:${(.6 + r() * .8).toFixed(2)}">❄</i>`).join('');
    const shards = Array.from({ length: 10 }, (_, i) => `<i style="--a:${i * 36 + r() * 20}deg;--dist:${(40 + r() * 50).toFixed(0)}cqw"></i>`).join('');
    const n = daysLeft(day);
    return `
      <div class="ice" aria-hidden="true">
        <div class="ice__block"></div>
        <div class="ice__frost"></div>
        <svg class="ice__cracks" viewBox="0 0 100 168" preserveAspectRatio="none">
          <path d="M0 ${20 + r() * 20} L18 ${44 + r() * 10} L12 ${70 + r() * 10} L30 ${86 + r() * 10}"/>
          <path d="M100 ${110 + r() * 20} L82 ${120 + r() * 10} L88 ${140 + r() * 8} L70 ${160 + r() * 6}"/>
          <path d="M18 ${48 + r() * 6} L34 ${40 + r() * 6}" />
          <path d="M${60 + r() * 20} 0 L${70 + r() * 10} 14 L${64 + r() * 10} 26"/>
        </svg>
        <div class="ice__shine"></div>
        <div class="ice__flakes">${flakes}</div>
        <svg class="ice__icicles" viewBox="0 0 100 20">${icicles}</svg>
        <div class="ice__shards">${shards}</div>
        <div class="ice__seal">
          <svg class="ice__padlock" viewBox="0 0 64 80">
            <defs>
              <linearGradient id="pl${day}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4fbff"/><stop offset=".45" stop-color="#a9d8f5"/><stop offset="1" stop-color="#4d8fc9"/></linearGradient>
              <linearGradient id="ps${day}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7fb6e0"/><stop offset=".5" stop-color="#eaf7ff"/><stop offset="1" stop-color="#6aa3d4"/></linearGradient>
            </defs>
            <path d="M16 36 V24 a16 16 0 0 1 32 0 V36" fill="none" stroke="#123a6b" stroke-width="11" stroke-linecap="round"/>
            <path d="M16 36 V24 a16 16 0 0 1 32 0 V36" fill="none" stroke="url(#ps${day})" stroke-width="6" stroke-linecap="round"/>
            <rect x="6" y="34" width="52" height="40" rx="8" fill="url(#pl${day})" stroke="#123a6b" stroke-width="3.5"/>
            <path d="M8 40 Q14 33 22 37 Q28 31 34 36 Q42 31 48 36 Q54 33 56 40 L56 44 Q50 42 46 45 Q40 41 34 45 Q28 41 22 45 Q14 42 8 45Z" fill="#fff"/>
            <circle cx="32" cy="54" r="5" fill="#123a6b"/><path d="M30 56 h4 l1.5 9 h-7z" fill="#123a6b"/>
            <path d="M14 74 l2.5 6 l2.5 -6z M38 74 l2 5 l2 -5z M48 74 l2.5 7 l2.5 -7z" fill="#dff3ff" stroke="#123a6b" stroke-width="1.2" stroke-linejoin="round"/>
            <path d="M12 48 v18" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>
          </svg>
          <span class="ice__freeze">Freeze</span>
          <span class="ice__msg">Congelado hasta el <b>${date}</b></span>
          <span class="ice__left">❄ ${n === 1 ? 'Falta 1 día' : `Faltan ${n} días`}</span>
        </div>
      </div>`;
  }

  function render(newDay) {
    board.innerHTML = gifts.map((g, i) => {
      const t = THEMES[g.day] || THEMES[1];
      const unlocked = isUnlocked(g.day);
      const isOpen = opened.has(g.day);
      const today = isToday(g.day);
      const date = fmtDate(dayDate(g.day));
      const tag = isOpen ? `<span class="slot__tag">Gem MT 10</span>`
        : !unlocked ? `<span class="slot__tag slot__tag--lock">❄ ${date}</span>`
        : today ? `<span class="slot__tag">¡Hoy!</span>` : `<span class="slot__tag">Listo</span>`;
      const lock = !unlocked ? iceHTML(g.day, date) : '';
      return `
      <div class="slot ${unlocked ? '' : 'is-locked'} ${today && !isOpen ? 'is-today' : ''} ${isOpen ? 'is-open' : ''}" style="--i:${i};${themeVars(t)}" data-day="${g.day}">
        <button class="slot__btn" data-day="${g.day}" aria-label="Día ${calDay(g.day)}${isOpen ? ', ver regalo' : unlocked ? ', abrir sobre' : ', bloqueado hasta el ' + date}">
          ${isOpen ? slabHTML(g) : packHTML(g.day)}
          ${lock}
        </button>
        <div class="slot__label"><b>DÍA ${pad(calDay(g.day))}</b>${tag}</div>
      </div>`;
    }).join('');

    board.querySelectorAll('.slot:not(.is-locked) .pack, .slot .slab').forEach((el) => bindTilt(el, 14));
    $('#progressCount').textContent = opened.size;

    if (newDay) {
      const slab = board.querySelector(`.slot[data-day="${newDay}"] .slab`);
      if (slab && !reduceMotion) {
        slab.animate([
          { transform: 'translateY(-40px) scale(1.15) rotate(-4deg)', opacity: 0 },
          { transform: 'translateY(6px) scale(.98) rotate(1deg)', opacity: 1, offset: .6 },
          { transform: 'none', opacity: 1 },
        ], { duration: 800, easing: 'cubic-bezier(.2,.8,.2,1)', delay: 250, fill: 'backwards' });
        slab.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
    updateCountdown();
  }

  board.addEventListener('click', (e) => {
    const btn = e.target.closest('.slot__btn'); if (!btn) return;
    const day = Number(btn.dataset.day);
    const slot = btn.closest('.slot');
    if (!isUnlocked(day)) {
      sfx.freeze();
      slot.classList.remove('shake', 'is-hit'); void slot.offsetWidth; slot.classList.add('shake', 'is-hit');
      if (navigator.vibrate) try { navigator.vibrate([15, 40, 15]); } catch (_) { /* noop */ }
      toast(`❄️ ¡Sigue congelado! El sobre del día ${calDay(day)} se descongela el ${fmtDate(dayDate(day))}.`);
      return;
    }
    openStage(day, btn.querySelector('.pack, .slab'), opened.has(day));
  });

  /* ---------- cuenta atrás ---------- */
  const cdEl = $('#countdown'), cdTime = $('#countdownTime');
  function updateCountdown() {
    if (PREVIEW) { cdEl.hidden = false; cdEl.querySelector('.countdown__label').textContent = 'Modo'; cdTime.textContent = 'Vista previa'; return; }
    const next = gifts.find((g) => !isUnlocked(g.day));
    if (!next) { cdEl.hidden = opened.size < 12; cdEl.querySelector('.countdown__label').textContent = '¡Colección'; cdTime.textContent = 'completa!'; return; }
    cdEl.hidden = false;
    let s = Math.max(0, Math.floor((dayDate(next.day) - Date.now()) / 1000));
    if (s === 0) { render(); return; }
    const d = Math.floor(s / 86400); s %= 86400;
    const h = Math.floor(s / 3600); s %= 3600;
    const m = Math.floor(s / 60); s %= 60;
    cdEl.querySelector('.countdown__label').textContent = `Día ${pad(calDay(next.day))} en`;
    cdTime.textContent = (d ? d + 'd ' : '') + `${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  setInterval(updateCountdown, 1000);

  $('#resetBtn').addEventListener('click', () => {
    if (!confirm('¿Volver a cerrar todos los sobres?')) return;
    opened = new Set(); saveOpened(); render();
  });

  /* =========================================================
     ESCENARIO DE APERTURA
     ========================================================= */
  const stage = $('#stage'), opener = $('#opener'), cardWrap = $('#openerCard');
  const pieceMain = $('#pieceMain'), pieceTop = $('#pieceTop'), seam = $('#seam'), guide = $('#guide');
  const titleEl = $('#stageTitle'), hintEl = $('#stageHint'), actionsEl = $('#stageActions'), flash = $('.stage__flash');
  const TEAR_Y = 9; // % de altura donde se rasga el sobre
  let run = 0;            // token para cancelar secuencias
  let state = 'closed';
  let current = null;
  let lastPointer = 0;

  function jaggedClips() {
    const r = rng(Date.now() % 1000), N = 26, pts = [];
    for (let i = 0; i <= N; i++) pts.push([(i / N) * 100, TEAR_Y + (i % 2 ? 0.9 : -0.9) + (r() - 0.5) * 1.2]);
    const line = pts.map(([x, y]) => `${x.toFixed(2)}% ${y.toFixed(2)}%`);
    pieceTop.style.clipPath = `polygon(0% 0%, 100% 0%, ${line.slice().reverse().join(', ')})`;
    pieceMain.style.clipPath = `polygon(${line.join(', ')}, 100% 100%, 0% 100%)`;
  }

  function setTitle(kicker, name) {
    titleEl.innerHTML = kicker ? `<span class="kicker">${kicker}</span><h2>${esc(name)}</h2>` : '';
  }
  function setActions(list) {
    actionsEl.innerHTML = '';
    list.forEach(([label, fn, ghost], i) => {
      const b = document.createElement('button');
      b.className = 'btn' + (ghost ? ' btn--ghost' : '');
      b.style.animationDelay = (i * 80) + 'ms';
      b.innerHTML = label; b.addEventListener('click', fn);
      actionsEl.appendChild(b);
    });
  }

  function openStage(day, fromEl, viewOnly) {
    const g = giftByDay(day), t = THEMES[day] || THEMES[1];
    current = { day, g, t };
    const myRun = ++run;
    state = viewOnly ? 'done' : 'idle';

    stage.hidden = false; stage.classList.remove('is-closing', 'is-revealed', 'is-charging', 'is-done', 'is-rainbow');
    document.body.classList.add('is-locked-scroll');
    stage.style.cssText = themeVars(t) + `--glow:${RAR_GLOW[g.rarity] || '#fff'}`;
    if (t.rainbow || g.rarity === 'secreta') stage.classList.add('is-rainbow');
    fx.resize(); fx.clear();

    // piezas del sobre
    pieceMain.innerHTML = packHTML(day); pieceTop.innerHTML = packHTML(day);
    [pieceMain, pieceTop, cardWrap, seam].forEach((el) => { el.getAnimations().forEach((a) => a.cancel()); el.style.transform = ''; el.style.opacity = ''; });
    pieceMain.hidden = pieceTop.hidden = !!viewOnly;
    jaggedClips();
    seam.style.setProperty('--p', 0);

    cardWrap.className = 'opener__card';
    cardWrap.innerHTML = `<div class="tilt"><div class="flip"><div class="face face--front">${cardHTML(g)}</div><div class="face face--back">${backHTML()}</div></div></div>`;
    opener.className = 'opener';

    if (viewOnly) {
      cardWrap.classList.add('is-front');
      cardWrap.style.transform = 'scale(1.08)';
      cardWrap.querySelector('.flip').classList.add('is-front');
      stage.classList.add('is-done', 'is-revealed');
      setTitle(`Día ${pad(calDay(day))} · ${g.type === 'ticket' ? 'Entrada' : RAR_NAME[g.rarity]}`, g.name);
      hintEl.textContent = 'Mueve la carta para ver el brillo · tócala para darle la vuelta';
      setActions([
        ['Volver a la colección', closeStage],
        [DL_LABEL, (e) => downloadCard(g, e.currentTarget), true],
        ['↻ Repetir apertura', () => openStage(day, null, false), true],
      ]);
      if (!reduceMotion) cardWrap.animate([{ transform: 'scale(.6) rotateY(-40deg)', opacity: 0 }, { transform: 'scale(1.08)', opacity: 1 }], { duration: 600, easing: 'cubic-bezier(.34,1.4,.64,1)' });
      startIdleWobble(myRun);
      return;
    }

    opener.classList.add('is-idle');
    setTitle(`Día ${pad(calDay(day))} · ${fmtDate(dayDate(day))}`, t.name);
    hintEl.textContent = 'Desliza el dedo por la parte de arriba para rasgar el sobre ✂';
    setActions([['Abrir con un toque', () => completeTear(1), true]]);
    guide.style.setProperty('--gw', opener.clientWidth * 0.92 + 'px');

    // vuelo desde el tablero (FLIP)
    if (fromEl && !reduceMotion) {
      const a = fromEl.getBoundingClientRect(), b = opener.getBoundingClientRect();
      opener.animate([
        { transform: `translate(${a.left + a.width / 2 - (b.left + b.width / 2)}px, ${a.top + a.height / 2 - (b.top + b.height / 2)}px) scale(${a.width / b.width})` },
        { transform: 'translate(0,0) scale(1.04)', offset: .8 },
        { transform: 'none' },
      ], { duration: 650, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }
    sfx.crinkle();
  }

  function closeStage() {
    run++;
    const day = current && current.day;
    const isNew = state === 'done' && current && current.fresh;
    state = 'closed';
    stage.classList.add('is-closing');
    setTimeout(() => {
      stage.hidden = true; stage.classList.remove('is-closing');
      document.body.classList.remove('is-locked-scroll');
      fx.clear();
      render(isNew ? day : null);
    }, 280);
  }
  $('#stageClose').addEventListener('click', closeStage);
  addEventListener('keydown', (e) => {
    if (stage.hidden) return;
    if (e.key === 'Escape') closeStage();
    if ((e.key === 'Enter' || e.key === ' ') && state === 'idle' && document.activeElement === document.body) { e.preventDefault(); completeTear(1); }
  });

  /* ---------- rasgar con el dedo ---------- */
  let drag = null;
  opener.addEventListener('pointerdown', (e) => {
    if (state !== 'idle') return;
    const r = opener.getBoundingClientRect();
    drag = { x0: e.clientX, y0: e.clientY, w: r.width, dir: 0, p: 0, moved: false, lastSound: 0 };
    opener.setPointerCapture(e.pointerId);
    opener.classList.add('is-dragging');
    sfx.ensure();
  });
  opener.addEventListener('pointermove', (e) => {
    if (!drag || state !== 'idle') return;
    const dx = e.clientX - drag.x0;
    if (!drag.dir && Math.abs(dx) > 6) { drag.dir = dx > 0 ? 1 : -1; opener.classList.remove('is-idle'); }
    if (!drag.dir) return;
    drag.moved = true;
    const p = clamp((dx * drag.dir) / (drag.w * 0.75), 0, 1);
    drag.p = p;
    const origin = drag.dir > 0 ? `100% ${TEAR_Y}%` : `0% ${TEAR_Y}%`;
    pieceTop.style.transformOrigin = origin;
    pieceTop.style.transform = `translateY(${-p * 4}%) rotate(${-drag.dir * p * 9}deg)`;
    pieceMain.style.transform = `rotate(${drag.dir * p * 0.8}deg)`;
    seam.style.setProperty('--origin', drag.dir > 0 ? 'left' : 'right');
    seam.style.setProperty('--p', p.toFixed(3));
    const now = performance.now();
    if (now - drag.lastSound > 70) { sfx.crinkle(); drag.lastSound = now; }
    if (p >= 1) { const dir = drag.dir; endDrag(e); completeTear(dir); }
  });
  function endDrag(e) {
    if (!drag) return;
    try { opener.releasePointerCapture(e.pointerId); } catch (_) { /* noop */ }
    opener.classList.remove('is-dragging');
    const d = drag; drag = null;
    return d;
  }
  const onUp = (e) => {
    if (!drag || state !== 'idle') { drag = null; return; }
    const d = endDrag(e);
    if (d.p > 0.55) return completeTear(d.dir);
    // volver a su sitio
    [pieceTop, pieceMain].forEach((el) => {
      el.animate([{ transform: el.style.transform || 'none' }, { transform: 'none' }], { duration: 350, easing: 'cubic-bezier(.34,1.56,.64,1)' });
      el.style.transform = '';
    });
    seam.style.setProperty('--p', 0);
    opener.classList.add('is-idle');
    if (!d.moved) {
      opener.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(-3deg)' }, { transform: 'rotate(3deg)' }, { transform: 'rotate(0)' }], { duration: 400 });
      toast('Desliza de lado a lado por la parte de arriba ✂');
    }
  };
  opener.addEventListener('pointerup', onUp);
  opener.addEventListener('pointercancel', onUp);

  /* ---------- secuencia de apertura ---------- */
  async function completeTear(dir = 1) {
    if (state !== 'idle') return;
    state = 'opening';
    const myRun = run;
    const alive = () => myRun === run;
    const { g, t, day } = current;
    const colors = [t.c1, t.c3, '#ffffff', RAR_GLOW[g.rarity] || '#fff', '#ffd23f'];
    opener.classList.remove('is-idle');
    setActions([]);
    hintEl.textContent = '';
    if (navigator.vibrate) try { navigator.vibrate(25); } catch (_) { /* noop */ }

    // 1) la tira superior sale volando
    sfx.tear();
    const from = pieceTop.style.transform || 'none';
    pieceTop.style.transformOrigin = dir > 0 ? `100% ${TEAR_Y}%` : `0% ${TEAR_Y}%`;
    pieceTop.animate([
      { transform: from, opacity: 1 },
      { transform: `translate(${dir * 55}%, -45%) rotate(${-dir * 38}deg)`, opacity: 0 },
    ], { duration: 850, easing: 'cubic-bezier(.2,.6,.3,1)', fill: 'forwards' });
    pieceMain.animate([{ transform: pieceMain.style.transform || 'none' }, { transform: 'none' }], { duration: 300, fill: 'forwards' });
    seam.style.setProperty('--p', 1);
    seam.animate([
      { transform: 'translateY(-50%) scale(1, 1)', opacity: 1 },
      { transform: 'translateY(-50%) scale(1.25, 7)', opacity: .9, offset: .4 },
      { transform: 'translateY(-50%) scale(1.4, 2)', opacity: 0 },
    ], { duration: 900, easing: 'ease-out', fill: 'forwards' });
    const ob = opener.getBoundingClientRect();
    fx.burst(ob.left + ob.width / 2, ob.top + ob.height * TEAR_Y / 100, colors, 46, 8);
    await wait(reduceMotion ? 50 : 420); if (!alive()) return;

    // 2) la carta sube desde dentro del sobre
    sfx.whoosh();
    await cardWrap.animate([
      { transform: 'translateY(0)' },
      { transform: 'translateY(-56%)' },
    ], { duration: reduceMotion ? 10 : 950, easing: 'cubic-bezier(.16,.84,.3,1)', fill: 'forwards' }).finished;
    if (!alive()) return;

    // 3) el sobre cae y la carta pasa al frente
    pieceMain.animate([
      { transform: 'none', opacity: 1 },
      { transform: 'translateY(90%) rotate(6deg)', opacity: 0 },
    ], { duration: reduceMotion ? 10 : 650, easing: 'cubic-bezier(.5,0,.75,0)', fill: 'forwards' });
    await wait(reduceMotion ? 20 : 280); if (!alive()) return;
    cardWrap.classList.add('is-front');
    await cardWrap.animate([
      { transform: 'translateY(-56%)' },
      { transform: 'translateY(0) scale(1.08)' },
    ], { duration: reduceMotion ? 10 : 800, easing: 'cubic-bezier(.34,1.35,.64,1)', fill: 'forwards' }).finished;
    if (!alive()) return;

    // 4) carga de energía (temblor + partículas)
    const flip = cardWrap.querySelector('.flip');
    stage.classList.add('is-charging');
    hintEl.textContent = '…';
    const cb = cardWrap.getBoundingClientRect();
    const cx = cb.left + cb.width / 2, cy = cb.top + cb.height / 2;
    const chargeDur = g.rarity === 'secreta' ? 1900 : g.rarity === 'holo' ? 1600 : 1250;
    sfx.charge(chargeDur / 1000);
    fx.converge(cx, cy, colors, Math.round(chargeDur / 18));
    if (!reduceMotion) {
      const frames = [];
      for (let i = 0; i <= 24; i++) {
        const a = (i / 24) * 7;
        frames.push({ transform: `rotateY(180deg) translate(${(Math.random() - .5) * a}px, ${(Math.random() - .5) * a}px) rotate(${(Math.random() - .5) * a * .4}deg) scale(${1 + i / 24 * .04})` });
      }
      await flip.animate(frames, { duration: chargeDur, easing: 'linear' }).finished;
    }
    if (!alive()) return;

    // 5) ¡REVELACIÓN!
    flash.animate([{ opacity: 0 }, { opacity: .95, offset: .15 }, { opacity: 0 }], { duration: 750, easing: 'ease-out' });
    stage.classList.remove('is-charging');
    stage.classList.add('is-revealed');
    flip.classList.add('is-front');
    flip.animate([
      { transform: 'rotateY(180deg) scale(.92)' },
      { transform: 'rotateY(-18deg) scale(1.06)', offset: .65 },
      { transform: 'rotateY(0deg) scale(1)' },
    ], { duration: reduceMotion ? 10 : 1000, easing: 'cubic-bezier(.2,.8,.2,1)' });
    sfx.reveal(g.rarity === 'holo' || g.rarity === 'secreta');
    fx.burst(cx, cy, colors, 90, 14);
    fx.confetti(colors.concat(['#e3262f', '#26b763']), g.rarity === 'comun' ? 120 : 200);

    opened.add(day); saveOpened();
    current.fresh = true;
    state = 'done';
    stage.classList.add('is-done');
    setTitle(`¡Regalo del día ${pad(calDay(day))}!${g.type === 'ticket' ? ' · Entrada' : ' · ' + RAR_NAME[g.rarity]}`, g.name);
    await wait(700); if (!alive()) return;
    hintEl.textContent = 'Mueve la carta para ver el brillo · tócala para darle la vuelta';
    setActions([
      ['Guardar en la colección', closeStage],
      [DL_LABEL, (e) => downloadCard(g, e.currentTarget), true],
    ]);
    startIdleWobble(myRun);
  }

  /* ---------- descargar la carta como imagen PNG ---------- */
  const DL_ICON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>';
  const DL_LABEL = `${DL_ICON} Descargar carta`;
  const slug = (s) => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  async function downloadCard(g, btn) {
    if (!window.htmlToImage) { toast('No se ha podido cargar el generador de imágenes.'); return; }
    if (btn) { btn.disabled = true; btn.innerHTML = `${DL_ICON} Preparando…`; }
    const host = document.createElement('div');
    host.className = 'export-host';
    host.innerHTML = cardHTML(g);
    document.body.appendChild(host);
    const card = host.firstElementChild;
    try {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      await wait(80);
      const opts = { pixelRatio: 2, cacheBust: true };
      let blob;
      try { blob = await window.htmlToImage.toBlob(card, opts); }
      catch (err) { blob = await window.htmlToImage.toBlob(card, { ...opts, skipFonts: true }); }
      if (!blob) throw new Error('vacío');
      const name = `adviento-${slug(CFG.owner)}-dia-${pad(calDay(g.day))}-${slug(g.name)}.png`;
      const file = typeof File === 'function' ? new File([blob], name, { type: 'image/png' }) : null;
      const touch = matchMedia('(pointer: coarse)').matches;
      if (touch && file && navigator.canShare && navigator.canShare({ files: [file] })) {
        try { await navigator.share({ files: [file], title: g.name }); }
        catch (err) { if (err && err.name !== 'AbortError') saveBlob(blob, name); }
      } else {
        saveBlob(blob, name);
      }
      sfx.click();
      toast(`✨ ¡Carta del día ${calDay(g.day)} descargada!`);
    } catch (err) {
      console.error(err);
      toast('No se ha podido generar la imagen. Inténtalo de nuevo.');
    } finally {
      host.remove();
      if (btn) { btn.disabled = false; btn.innerHTML = DL_LABEL; }
    }
  }
  function saveBlob(blob, name) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  /* ---------- interacción con la carta revelada ---------- */
  function tiltCard(px, py) {
    const tilt = cardWrap.querySelector('.tilt'); if (!tilt) return;
    tilt.classList.add('is-tilting');
    setTiltVars(tilt, px, py, 26);
  }
  stage.addEventListener('pointermove', (e) => {
    if (state !== 'done') return;
    lastPointer = performance.now();
    const r = cardWrap.getBoundingClientRect();
    const px = clamp((e.clientX - r.left) / r.width, -0.2, 1.2);
    const py = clamp((e.clientY - r.top) / r.height, -0.2, 1.2);
    tiltCard(clamp(px, 0, 1), clamp(py, 0, 1));
  });
  cardWrap.addEventListener('click', () => {
    if (state !== 'done') return;
    const flip = cardWrap.querySelector('.flip');
    flip.classList.toggle('is-front');
    sfx.whoosh();
  });
  function startIdleWobble(myRun) {
    const t0 = performance.now();
    lastPointer = 0;
    const step = (now) => {
      if (myRun !== run || state !== 'done') return;
      if (now - lastPointer > 2200) {
        const t = (now - t0) / 1000;
        tiltCard(0.5 + Math.sin(t * 0.9) * 0.32, 0.5 + Math.cos(t * 0.7) * 0.25);
      }
      requestAnimationFrame(step);
    };
    if (!reduceMotion) requestAnimationFrame(step);
  }

  addEventListener('resize', () => { if (!stage.hidden) fx.resize(); });

  /* =========================================================
     PANEL DE ADMIN · reparto de días (pares / impares / seguidos)
     ========================================================= */
  const admin = $('#admin'), admBody = $('#adminBody'), admLock = $('#adminLock');
  const WEEK = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const WEEKDAY = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
  let draft = null;

  const adminUnlocked = () => {
    if (!CFG.adminPin) return true;
    try { return sessionStorage.getItem(KEY + ':admin') === '1'; } catch (e) { return false; }
  };
  function openAdmin() {
    draft = { ...SCHED };
    admin.hidden = false;
    document.body.classList.add('is-locked-scroll');
    const ok = adminUnlocked();
    admLock.hidden = ok; admBody.hidden = !ok;
    $('#adminErr').textContent = '';
    if (ok) paintAdmin(); else setTimeout(() => $('#adminPin').focus(), 60);
  }
  function closeAdmin() {
    admin.hidden = true;
    if (stage.hidden) document.body.classList.remove('is-locked-scroll');
  }
  function stripScheduleParams() {
    if (!params.has('dias') && !params.has('inicio')) return;
    params.delete('dias'); params.delete('inicio');
    const q = params.toString();
    try { history.replaceState(null, '', location.pathname + (q ? '?' + q : '') + location.hash); } catch (e) { /* noop */ }
  }
  function applySchedule() {
    SCHED = readSchedule();
    DAYS = scheduleDays(SCHED);
    render();
  }

  function paintAdmin() {
    const d0 = cleanSchedule(draft);
    const days = scheduleDays(d0);
    admin.querySelectorAll('input[name="admMode"]').forEach((r) => { r.checked = r.value === d0.mode; });
    $('#admStartRow').hidden = d0.mode !== 'todos';
    const sel = $('#admStart');
    if (!sel.options.length) for (let d = 1; d <= 20; d++) sel.add(new Option(`${d} de diciembre`, d));
    sel.value = d0.startDay;
    $('#admEnd').textContent = `→ termina el ${d0.startDay + 11} dic`;
    $('#admYear').textContent = CFG.year;

    // mini calendario del mes
    const first = new Date(CFG.year, d0.month - 1, 1);
    const offset = (first.getDay() + 6) % 7;
    const nDays = new Date(CFG.year, d0.month, 0).getDate();
    const now = new Date();
    let h = WEEK.map((w) => `<span class="cal__wd">${w}</span>`).join('');
    for (let i = 0; i < offset; i++) h += '<span class="cal__pad"></span>';
    for (let d = 1; d <= nDays; d++) {
      const idx = days.indexOf(d);
      const today = now.getFullYear() === CFG.year && now.getMonth() === d0.month - 1 && now.getDate() === d ? ' is-today' : '';
      if (idx >= 0) {
        const t = THEMES[idx + 1] || THEMES[1];
        h += `<span class="cal__d is-gift${today}" style="${themeVars(t)}" title="Sobre ${idx + 1}">${d}<i>${idx + 1}</i></span>`;
      } else {
        h += `<span class="cal__d${d === 24 ? ' is-eve' : ''}${d === 25 ? ' is-xmas' : ''}${today}">${d}</span>`;
      }
    }
    $('#admCal').innerHTML = h;

    // lista de sobres con su fecha
    $('#admList').innerHTML = gifts.map((g) => {
      const dt = new Date(CFG.year, d0.month - 1, days[g.day - 1]);
      const t = THEMES[g.day] || THEMES[1];
      const st = opened.has(g.day) ? '<em class="st st--open">Abierto</em>'
        : Date.now() >= dt.getTime() ? '<em class="st st--ready">Disponible</em>'
        : '<em class="st st--ice">❄ Congelado</em>';
      const kind = g.type === 'ticket' ? 'Entrada' : 'Carta ' + (RAR_NAME[g.rarity] || '').toLowerCase();
      return `<li style="${themeVars(t)}">
        <span class="admin__num">${pad(g.day)}</span>
        <span class="admin__date"><b>${dt.getDate()}</b>${WEEKDAY[dt.getDay()]}</span>
        <span class="admin__gift">${esc(g.name)}<small>${kind}</small></span>
        ${st}
      </li>`;
    }).join('');

    const changed = JSON.stringify(d0) !== JSON.stringify(SCHED);
    const save = $('#admSave');
    save.disabled = !changed;
    save.textContent = changed ? 'Guardar y aplicar' : '✓ Aplicado';
  }

  function copyText(text, okMsg) {
    const fallback = () => { window.prompt('Copia este texto:', text); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => toast(okMsg)).catch(fallback);
    } else fallback();
  }

  admin.addEventListener('change', (e) => {
    if (e.target.name === 'admMode') { draft.mode = e.target.value; paintAdmin(); }
    if (e.target.id === 'admStart') { draft.startDay = Number(e.target.value); paintAdmin(); }
  });
  admin.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeAdmin(); });
  admLock.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('#adminPin');
    if (String(input.value).trim() === String(CFG.adminPin)) {
      try { sessionStorage.setItem(KEY + ':admin', '1'); } catch (err) { /* noop */ }
      input.value = '';
      admLock.hidden = true; admBody.hidden = false; paintAdmin();
    } else {
      $('#adminErr').textContent = 'PIN incorrecto';
      sfx.deny();
      admLock.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(0)' }], { duration: 300 });
      input.select();
    }
  });
  $('#admSave').addEventListener('click', () => {
    store.set(':schedule', cleanSchedule(draft));
    stripScheduleParams();
    applySchedule();
    draft = { ...SCHED };
    paintAdmin();
    toast(`✅ Sobres repartidos: ${MODES[SCHED.mode].toLowerCase()} (${DAYS[0]}–${DAYS[11]} dic)`);
  });
  $('#admReset').addEventListener('click', () => {
    store.set(':schedule', null);
    stripScheduleParams();
    applySchedule();
    draft = { ...SCHED };
    paintAdmin();
    toast('Configuración de gifts.js restaurada');
  });
  $('#admLink').addEventListener('click', () => {
    const d0 = cleanSchedule(draft);
    const url = location.origin + location.pathname + `?dias=${d0.mode}` + (d0.mode === 'todos' ? `&inicio=${d0.startDay}` : '');
    copyText(url, '🔗 Enlace copiado: envíaselo a quien abre el calendario');
  });
  $('#admCode').addEventListener('click', () => {
    const d0 = cleanSchedule(draft);
    copyText(`schedule: { mode: '${d0.mode}', month: ${d0.month}, startDay: ${d0.startDay} },`, '{ } Código copiado: pégalo en assets/js/gifts.js');
  });
  $('#adminBtn').addEventListener('click', openAdmin);
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !admin.hidden) closeAdmin(); });

  /* ---------- inicio ---------- */
  $('#yearLabel').textContent = CFG.year;
  $('#yearLabel2').textContent = CFG.year;
  $('#ownerLabel').textContent = CFG.owner;
  render();
  if (params.has('admin')) openAdmin();
})();
