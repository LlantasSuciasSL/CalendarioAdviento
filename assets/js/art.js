/* =========================================================
   Ilustraciones SVG + temas de los sobres
   Todas las ilustraciones son vectoriales y originales.
   ========================================================= */
(function () {
  let counter = 0;
  const uid = () => 'u' + (++counter).toString(36) + Math.random().toString(36).slice(2, 5);

  const starPts = (cx, cy, R, r, k = 5, rot = -90) => {
    const p = [];
    for (let i = 0; i < k * 2; i++) {
      const a = ((rot + (i * 180) / k) * Math.PI) / 180;
      const rr = i % 2 ? r : R;
      p.push((cx + rr * Math.cos(a)).toFixed(1) + ',' + (cy + rr * Math.sin(a)).toFixed(1));
    }
    return p.join(' ');
  };

  const holly = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <path d="M0 0 C-10 -14 -30 -12 -38 -4 C-30 -2 -28 6 -20 8 C-14 4 -6 4 0 0Z" fill="#1f9d55" stroke="#0b3d1f" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M0 0 C10 -14 30 -12 38 -4 C30 -2 28 6 20 8 C14 4 6 4 0 0Z" fill="#26b763" stroke="#0b3d1f" stroke-width="3.5" stroke-linejoin="round"/>
      <circle cx="-5" cy="-4" r="6" fill="#e63946" stroke="#5b0d1a" stroke-width="3"/>
      <circle cx="6" cy="-6" r="6" fill="#ff4d5a" stroke="#5b0d1a" stroke-width="3"/>
      <circle cx="0" cy="4" r="6" fill="#e63946" stroke="#5b0d1a" stroke-width="3"/>
    </g>`;

  const ART = {
    star(u) {
      return `
      <defs>
        <linearGradient id="${u}g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fffbd0"/><stop offset=".45" stop-color="#ffd23f"/><stop offset="1" stop-color="#f08a00"/>
        </linearGradient>
      </defs>
      <polygon points="${starPts(100, 106, 86, 38)}" fill="url(#${u}g)" stroke="#7a3d00" stroke-width="6" stroke-linejoin="round"/>
      <path d="M100 20 L122 75 L100 106Z M100 106 L183 79 L140 118Z" fill="#fff" opacity=".35"/>
      <polygon points="${starPts(100, 106, 58, 25)}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linejoin="round"/>
      <g class="twinkle"><polygon points="${starPts(160, 34, 14, 4, 4)}" fill="#fff"/></g>
      <g class="twinkle d2"><polygon points="${starPts(36, 160, 10, 3, 4)}" fill="#fff"/></g>`;
    },

    gift(u) {
      return `
      <defs>
        <linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a6a"/><stop offset="1" stop-color="#b3122a"/></linearGradient>
        <linearGradient id="${u}r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f5a300"/><stop offset=".5" stop-color="#fff0a0"/><stop offset="1" stop-color="#f5a300"/></linearGradient>
      </defs>
      <rect x="40" y="92" width="120" height="86" rx="8" fill="url(#${u}b)" stroke="#5b0d1a" stroke-width="6"/>
      <rect x="40" y="92" width="120" height="14" fill="#000" opacity=".18"/>
      <rect x="30" y="70" width="140" height="30" rx="7" fill="url(#${u}b)" stroke="#5b0d1a" stroke-width="6"/>
      <rect x="89" y="70" width="22" height="108" fill="url(#${u}r)" stroke="#8a4b00" stroke-width="4"/>
      <path d="M100 70 C78 26 44 38 58 62 C66 74 88 72 100 70Z" fill="url(#${u}r)" stroke="#8a4b00" stroke-width="5" stroke-linejoin="round"/>
      <path d="M100 70 C122 26 156 38 142 62 C134 74 112 72 100 70Z" fill="url(#${u}r)" stroke="#8a4b00" stroke-width="5" stroke-linejoin="round"/>
      <circle cx="100" cy="68" r="10" fill="#ffd23f" stroke="#8a4b00" stroke-width="5"/>
      <rect x="48" y="112" width="8" height="54" rx="4" fill="#fff" opacity=".35"/>`;
    },

    tree(u) {
      return `
      <defs><linearGradient id="${u}t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4be38a"/><stop offset="1" stop-color="#0f7a3e"/></linearGradient></defs>
      <rect x="86" y="160" width="28" height="26" rx="4" fill="#8b5a2b" stroke="#3d220c" stroke-width="5"/>
      <path d="M100 26 L148 92 L126 92 L162 138 L138 138 L176 168 L24 168 L62 138 L38 138 L74 92 L52 92Z" fill="url(#${u}t)" stroke="#0b3d1f" stroke-width="6" stroke-linejoin="round"/>
      <path d="M66 100 Q100 116 132 96 M52 148 Q100 166 150 144" fill="none" stroke="#ffd23f" stroke-width="5" stroke-linecap="round"/>
      <g stroke="#0b3d1f" stroke-width="3">
        <circle cx="82" cy="118" r="8" fill="#e63946"/><circle cx="122" cy="124" r="8" fill="#ffd23f"/>
        <circle cx="98" cy="150" r="8" fill="#4cc9f0"/><circle cx="140" cy="158" r="7" fill="#f72585"/>
        <circle cx="62" cy="158" r="7" fill="#ffd23f"/><circle cx="106" cy="82" r="7" fill="#f72585"/>
      </g>
      <g class="twinkle"><polygon points="${starPts(100, 24, 20, 9)}" fill="#ffd23f" stroke="#7a3d00" stroke-width="4" stroke-linejoin="round"/></g>`;
    },

    snowflake() {
      const arm = 'M100 100 V22 M100 46 L80 30 M100 46 L120 30 M100 72 L84 58 M100 72 L116 58';
      let arms = '';
      for (let i = 0; i < 6; i++) arms += `<path transform="rotate(${i * 60} 100 100)" d="${arm}"/>`;
      return `
      <g class="spin-slow">
        <g stroke="#143c86" stroke-width="17" stroke-linecap="round" stroke-linejoin="round" fill="none">${arms}</g>
        <g stroke="#e9f8ff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none">${arms}</g>
        <polygon points="${starPts(100, 100, 20, 20, 3, -90)}" fill="#bfe9ff" stroke="#143c86" stroke-width="5" stroke-linejoin="round"/>
        <circle cx="100" cy="100" r="6" fill="#fff"/>
      </g>`;
    },

    bell(u) {
      return `
      <defs><linearGradient id="${u}g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f29900"/><stop offset=".35" stop-color="#ffe58a"/><stop offset="1" stop-color="#d97a00"/></linearGradient></defs>
      <g class="swing">
        <circle cx="100" cy="30" r="10" fill="none" stroke="#7a4300" stroke-width="6"/>
        <circle cx="100" cy="170" r="15" fill="#ffcf4a" stroke="#7a4300" stroke-width="5"/>
        <path d="M100 38 C62 38 54 74 54 106 C54 130 42 140 34 152 L166 152 C158 140 146 130 146 106 C146 74 138 38 100 38Z" fill="url(#${u}g)" stroke="#7a4300" stroke-width="6" stroke-linejoin="round"/>
        <rect x="28" y="148" width="144" height="18" rx="9" fill="#e89a10" stroke="#7a4300" stroke-width="6"/>
        <path d="M74 66 C66 86 66 108 68 128" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".55"/>
      </g>
      ${holly(100, 46, 0.9)}`;
    },

    candy() {
      const d = 'M78 184 V84 A36 36 0 0 1 150 84 V100';
      return `
      <g class="tilt-sway">
        <path d="${d}" fill="none" stroke="#5b0d1a" stroke-width="36" stroke-linecap="round"/>
        <path d="${d}" fill="none" stroke="#fff" stroke-width="25" stroke-linecap="round"/>
        <path d="${d}" fill="none" stroke="#e63946" stroke-width="25" stroke-dasharray="13 13"/>
        <path d="M71 176 V86 A42 42 0 0 1 98 50" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/>
      </g>
      <path d="M78 150 l-28 -14 v28z M78 150 l28 -14 v28z" fill="#26b763" stroke="#0b3d1f" stroke-width="4" stroke-linejoin="round"/>
      <circle cx="78" cy="150" r="7" fill="#1f9d55" stroke="#0b3d1f" stroke-width="4"/>`;
    },

    ornament(u) {
      return `
      <defs>
        <radialGradient id="${u}o" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ff9ec4"/><stop offset=".45" stop-color="#d6246e"/><stop offset="1" stop-color="#5a0b2c"/></radialGradient>
        <clipPath id="${u}c"><circle cx="100" cy="114" r="64"/></clipPath>
      </defs>
      <g class="swing">
        <circle cx="100" cy="26" r="9" fill="none" stroke="#b07800" stroke-width="5"/>
        <rect x="84" y="32" width="32" height="22" rx="4" fill="#ffd23f" stroke="#7a4300" stroke-width="5"/>
        <circle cx="100" cy="114" r="64" fill="url(#${u}o)"/>
        <g clip-path="url(#${u}c)">
          <path d="M30 104 L44 94 L58 104 L72 94 L86 104 L100 94 L114 104 L128 94 L142 104 L156 94 L170 104 L170 126 L156 116 L142 126 L128 116 L114 126 L100 116 L86 126 L72 116 L58 126 L44 116 L30 126Z" fill="#ffd23f" stroke="#7a4300" stroke-width="3"/>
          <circle cx="70" cy="150" r="5" fill="#fff" opacity=".8"/><circle cx="100" cy="160" r="5" fill="#fff" opacity=".8"/><circle cx="130" cy="150" r="5" fill="#fff" opacity=".8"/>
          <circle cx="76" cy="74" r="4" fill="#fff" opacity=".6"/><circle cx="124" cy="74" r="4" fill="#fff" opacity=".6"/>
        </g>
        <circle cx="100" cy="114" r="64" fill="none" stroke="#3d0620" stroke-width="6"/>
        <ellipse cx="76" cy="84" rx="18" ry="11" fill="#fff" opacity=".6" transform="rotate(-38 76 84)"/>
      </g>`;
    },

    mug(u) {
      return `
      <defs><linearGradient id="${u}m" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b3122a"/><stop offset=".4" stop-color="#ff4d5a"/><stop offset="1" stop-color="#9e0f24"/></linearGradient></defs>
      <g fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".85">
        <path class="steam" d="M74 56 C64 44 84 34 74 18"/>
        <path class="steam d2" d="M98 56 C88 42 108 32 98 14"/>
        <path class="steam d3" d="M122 56 C112 44 132 34 122 18"/>
      </g>
      <path d="M140 92 C178 92 178 144 140 144" fill="none" stroke="#5b0d1a" stroke-width="22"/>
      <path d="M140 92 C178 92 178 144 140 144" fill="none" stroke="#e8394a" stroke-width="11"/>
      <path d="M44 70 H140 V150 Q140 180 110 180 H74 Q44 180 44 150Z" fill="url(#${u}m)" stroke="#5b0d1a" stroke-width="6" stroke-linejoin="round"/>
      <ellipse cx="92" cy="72" rx="46" ry="9" fill="#6b3a1e" stroke="#5b0d1a" stroke-width="5"/>
      <rect x="70" y="60" width="18" height="14" rx="4" fill="#fff" stroke="#c9b8a8" stroke-width="2" transform="rotate(-12 79 67)"/>
      <rect x="98" y="58" width="18" height="14" rx="4" fill="#fff6ee" stroke="#c9b8a8" stroke-width="2" transform="rotate(10 107 65)"/>
      <g fill="#fff" opacity=".9">
        <polygon points="${starPts(72, 116, 9, 3.5, 6)}"/><polygon points="${starPts(112, 138, 7, 3, 6)}"/><polygon points="${starPts(96, 104, 5, 2, 6)}"/>
      </g>
      <rect x="54" y="88" width="8" height="66" rx="4" fill="#fff" opacity=".3"/>`;
    },

    gingerbread() {
      const shapes = `
        <circle cx="100" cy="50" r="30"/>
        <rect x="70" y="74" width="60" height="62" rx="22"/>
        <rect x="34" y="84" width="132" height="28" rx="14"/>
        <rect x="70" y="118" width="28" height="60" rx="14" transform="rotate(14 84 128)"/>
        <rect x="102" y="118" width="28" height="60" rx="14" transform="rotate(-14 116 128)"/>`;
      return `
      <g class="wiggle">
        <g fill="#6b3610" stroke="#3d1e08" stroke-width="12" stroke-linejoin="round">${shapes}</g>
        <g fill="#d2843e">${shapes}</g>
        <g fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round">
          <path d="M44 90 q4 8 0 16 M156 90 q-4 8 0 16"/>
          <path d="M70 168 q8 4 16 0 M114 168 q8 4 16 0"/>
          <path d="M86 60 q14 10 28 0"/>
        </g>
        <circle cx="89" cy="44" r="5" fill="#2b1406"/><circle cx="111" cy="44" r="5" fill="#2b1406"/>
        <circle cx="100" cy="92" r="6" fill="#e63946" stroke="#fff" stroke-width="2.5"/>
        <circle cx="100" cy="112" r="6" fill="#26b763" stroke="#fff" stroke-width="2.5"/>
        <path d="M84 76 L100 84 L116 76 L116 70 L100 78 L84 70Z" fill="#e63946"/>
      </g>`;
    },

    candle(u) {
      return `
      <defs>
        <radialGradient id="${u}f" cx=".5" cy=".7" r=".7"><stop offset="0" stop-color="#fffbe0"/><stop offset=".45" stop-color="#ffc300"/><stop offset="1" stop-color="#fb5607"/></radialGradient>
        <radialGradient id="${u}h" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd166" stop-opacity=".75"/><stop offset="1" stop-color="#ffd166" stop-opacity="0"/></radialGradient>
        <linearGradient id="${u}c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c1121f"/><stop offset=".4" stop-color="#ff4d5a"/><stop offset="1" stop-color="#a00d1a"/></linearGradient>
      </defs>
      <circle class="glow-pulse" cx="100" cy="56" r="52" fill="url(#${u}h)"/>
      <rect x="74" y="84" width="52" height="94" rx="7" fill="url(#${u}c)" stroke="#5b0d1a" stroke-width="6"/>
      <path d="M74 96 Q74 84 86 84 H114 Q126 84 126 96 V104 Q120 112 116 104 Q112 120 106 104 Q100 112 94 104 Q88 126 84 104 Q78 110 74 104Z" fill="#fff4e6" stroke="#5b0d1a" stroke-width="5" stroke-linejoin="round"/>
      <path d="M100 84 V70" stroke="#2b1406" stroke-width="5" stroke-linecap="round"/>
      <path class="flame" d="M100 22 C122 50 118 70 100 74 C82 70 78 50 100 22Z" fill="url(#${u}f)" stroke="#e85d04" stroke-width="3"/>
      <rect x="82" y="118" width="7" height="50" rx="3.5" fill="#fff" opacity=".3"/>
      ${holly(100, 182, 1)}`;
    },

    snowman() {
      return `
      <g class="wiggle">
        <g fill="#f4fbff" stroke="#1d3557" stroke-width="6">
          <circle cx="100" cy="146" r="40"/><circle cx="100" cy="94" r="29"/><circle cx="100" cy="54" r="22"/>
        </g>
        <path d="M70 158 a40 40 0 0 0 60 0" fill="none" stroke="#a9d6f5" stroke-width="7" stroke-linecap="round"/>
        <path d="M72 76 Q100 92 128 76 L130 88 Q100 104 70 88Z" fill="#e63946" stroke="#5b0d1a" stroke-width="4" stroke-linejoin="round"/>
        <path d="M112 88 L124 120 L110 122 L104 92Z" fill="#e63946" stroke="#5b0d1a" stroke-width="4" stroke-linejoin="round"/>
        <rect x="74" y="28" width="52" height="10" rx="3" fill="#1b1b2f" stroke="#000" stroke-width="3"/>
        <rect x="83" y="2" width="34" height="30" rx="3" fill="#1b1b2f" stroke="#000" stroke-width="3"/>
        <rect x="83" y="22" width="34" height="6" fill="#e63946"/>
        <circle cx="92" cy="50" r="3.5" fill="#1b1b2f"/><circle cx="108" cy="50" r="3.5" fill="#1b1b2f"/>
        <path d="M100 56 L124 60 L100 62Z" fill="#ff8c1a" stroke="#b34700" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="100" cy="100" r="4" fill="#1b1b2f"/><circle cx="100" cy="114" r="4" fill="#1b1b2f"/>
        <circle cx="100" cy="136" r="4.5" fill="#1b1b2f"/><circle cx="100" cy="152" r="4.5" fill="#1b1b2f"/>
        <path d="M72 96 L40 74 M48 80 L42 66 M128 96 L162 78 M154 82 L162 68" stroke="#6b3a1e" stroke-width="5" stroke-linecap="round"/>
      </g>`;
    },

    music(u) {
      return `
      <defs><linearGradient id="${u}n" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7df9ff"/><stop offset=".5" stop-color="#b388ff"/><stop offset="1" stop-color="#ff5ce1"/></linearGradient></defs>
      <g class="bounce">
        <path d="M66 150 V62 L150 40 V128" fill="none" stroke="#1a1040" stroke-width="16" stroke-linejoin="round"/>
        <path d="M66 150 V62 L150 40 V128" fill="none" stroke="url(#${u}n)" stroke-width="8" stroke-linejoin="round"/>
        <path d="M60 60 L156 34 V62 L60 88Z" fill="url(#${u}n)" stroke="#1a1040" stroke-width="6" stroke-linejoin="round"/>
        <ellipse cx="50" cy="152" rx="24" ry="17" transform="rotate(-22 50 152)" fill="url(#${u}n)" stroke="#1a1040" stroke-width="6"/>
        <ellipse cx="134" cy="130" rx="24" ry="17" transform="rotate(-22 134 130)" fill="url(#${u}n)" stroke="#1a1040" stroke-width="6"/>
        <ellipse cx="44" cy="146" rx="7" ry="4" transform="rotate(-22 44 146)" fill="#fff" opacity=".7"/>
        <ellipse cx="128" cy="124" rx="7" ry="4" transform="rotate(-22 128 124)" fill="#fff" opacity=".7"/>
      </g>
      <g class="twinkle"><polygon points="${starPts(168, 160, 12, 4, 4)}" fill="#fff"/></g>
      <g class="twinkle d2"><polygon points="${starPts(30, 46, 10, 3, 4)}" fill="#fff"/></g>`;
    },

    film(u) {
      return `
      <defs><linearGradient id="${u}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3f5c"/><stop offset="1" stop-color="#14162a"/></linearGradient></defs>
      <g class="bounce">
        <rect x="30" y="80" width="140" height="96" rx="8" fill="url(#${u}k)" stroke="#05060f" stroke-width="6"/>
        <g class="clap">
          <rect x="28" y="50" width="144" height="28" rx="5" fill="#1b1d33" stroke="#05060f" stroke-width="6" transform="rotate(-14 30 78)"/>
          <path d="M44 68 L62 46 M76 60 L94 38 M108 52 L126 30 M140 44 L158 22" stroke="#fff" stroke-width="10" transform="rotate(-14 30 78) translate(0 8)"/>
        </g>
        <rect x="30" y="80" width="140" height="22" fill="#fff"/>
        <path d="M46 80 L60 102 M78 80 L92 102 M110 80 L124 102 M142 80 L156 102" stroke="#1b1d33" stroke-width="10"/>
        <rect x="30" y="80" width="140" height="96" rx="8" fill="none" stroke="#05060f" stroke-width="6"/>
        <text x="100" y="146" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="26" fill="#ffd23f">VIP</text>
        <text x="100" y="166" text-anchor="middle" font-family="Rubik, sans-serif" font-weight="800" font-size="11" fill="#9aa3d9" letter-spacing="2">TOMA 12</text>
      </g>
      <g class="twinkle"><polygon points="${starPts(170, 36, 12, 4, 4)}" fill="#fff"/></g>`;
    },

    crown(u) {
      return `
      <defs>
        <linearGradient id="${u}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff5b8"/><stop offset=".5" stop-color="#ffcc33"/><stop offset="1" stop-color="#e08600"/></linearGradient>
      </defs>
      <g class="bounce">
        <path d="M30 150 L22 64 L66 104 L100 40 L134 104 L178 64 L170 150Z" fill="url(#${u}c)" stroke="#7a3d00" stroke-width="7" stroke-linejoin="round"/>
        <rect x="26" y="146" width="148" height="28" rx="8" fill="#ffcc33" stroke="#7a3d00" stroke-width="7"/>
        <circle cx="22" cy="62" r="10" fill="#ff5ce1" stroke="#7a3d00" stroke-width="5"/>
        <circle cx="100" cy="36" r="11" fill="#4cc9f0" stroke="#7a3d00" stroke-width="5"/>
        <circle cx="178" cy="62" r="10" fill="#26b763" stroke="#7a3d00" stroke-width="5"/>
        <path d="M100 112 l12 14 l-12 14 l-12 -14z" fill="#e63946" stroke="#7a3d00" stroke-width="4"/>
        <circle cx="60" cy="160" r="6" fill="#4cc9f0" stroke="#7a3d00" stroke-width="3"/>
        <circle cx="140" cy="160" r="6" fill="#ff5ce1" stroke="#7a3d00" stroke-width="3"/>
        <path d="M44 132 L40 84" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".55"/>
      </g>
      <g class="twinkle"><polygon points="${starPts(160, 24, 12, 4, 4)}" fill="#fff"/></g>
      <g class="twinkle d2"><polygon points="${starPts(34, 30, 9, 3, 4)}" fill="#fff"/></g>`;
    },

    /* Icono pequeño para la "energía" de la carta */
    spark() {
      return `<polygon points="${starPts(100, 100, 80, 22, 4)}" fill="#fff"/>`;
    },
  };

  function art(key) {
    const fn = ART[key] || ART.gift;
    return `<svg class="art-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${fn(uid())}</svg>`;
  }

  /* ---------- Patrones de fondo ---------- */
  function pattern(kind, c3) {
    const col = c3 || '#fff';
    let body = '';
    if (kind === 'rays') {
      for (let i = 0; i < 24; i += 2) {
        const a1 = (i * 15 * Math.PI) / 180, a2 = ((i + 1) * 15 * Math.PI) / 180;
        body += `<polygon points="50,80 ${50 + 300 * Math.cos(a1)},${80 + 300 * Math.sin(a1)} ${50 + 300 * Math.cos(a2)},${80 + 300 * Math.sin(a2)}"/>`;
      }
      body = `<g fill="${col}" opacity=".16">${body}</g>`;
    } else if (kind === 'zigzag') {
      for (let y = -10; y < 180; y += 18) {
        let d = `M-10 ${y}`;
        for (let x = -10; x <= 110; x += 10) d += ` L${x + 5} ${y + ((x / 10) % 2 ? 8 : -8)}`;
        body += `<path d="${d}"/>`;
      }
      body = `<g fill="none" stroke="${col}" stroke-width="3.2" opacity=".2" stroke-linejoin="miter">${body}</g>`;
    } else if (kind === 'diamonds') {
      for (let y = 0; y < 180; y += 16)
        for (let x = (y / 16) % 2 ? 8 : 0; x < 110; x += 16)
          body += `<path d="M${x} ${y - 6} L${x + 5} ${y} L${x} ${y + 6} L${x - 5} ${y}Z"/>`;
      body = `<g fill="${col}" opacity=".18">${body}</g>`;
    } else if (kind === 'swirl') {
      for (let r = 8; r < 200; r += 11) body += `<circle cx="50" cy="80" r="${r}"/>`;
      body = `<g fill="none" stroke="${col}" stroke-width="3.5" opacity=".16">${body}</g>`;
    } else if (kind === 'snow') {
      let s = 7;
      for (let i = 0; i < 46; i++) {
        s = (s * 9301 + 49297) % 233280;
        const x = (s / 233280) * 100;
        s = (s * 9301 + 49297) % 233280;
        const y = (s / 233280) * 160;
        s = (s * 9301 + 49297) % 233280;
        const r = 0.8 + (s / 233280) * 2.6;
        body += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}"/>`;
      }
      body = `<g fill="${col}" opacity=".35">${body}</g>`;
    }
    return `<svg class="pattern-svg" viewBox="0 0 100 160" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;
  }

  /* Estallido de pinchos (estilo rayo) detrás de la ilustración */
  function burst(c3, c1) {
    return `<svg class="burst-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="${starPts(100, 100, 98, 62, 18)}" fill="${c3}" opacity=".45"/>
      <polygon points="${starPts(100, 100, 82, 52, 14, -80)}" fill="#fff" opacity=".55"/>
      <polygon points="${starPts(100, 100, 66, 46, 12)}" fill="${c1}" opacity=".9"/>
      <circle cx="100" cy="100" r="44" fill="#fff" opacity=".25"/>
    </svg>`;
  }

  /* ---------- 12 diseños de sobre (uno por día) ---------- */
  const THEMES = {
    1: { name: 'Estrella Polar', mascot: 'star', pattern: 'rays', c1: '#14c3d6', c2: '#0a4f8f', c3: '#8ff7ff' },
    2: { name: 'Fuego de Regalo', mascot: 'gift', pattern: 'zigzag', c1: '#ff8a1f', c2: '#c4123f', c3: '#ffd166' },
    3: { name: 'Bosque Nevado', mascot: 'tree', pattern: 'diamonds', c1: '#23c45e', c2: '#0b5139', c3: '#c3ff8f' },
    4: { name: 'Cristal de Hielo', mascot: 'snowflake', pattern: 'snow', c1: '#8fd3ff', c2: '#2f5fe0', c3: '#ffffff' },
    5: { name: 'Campana Dorada', mascot: 'bell', pattern: 'rays', c1: '#ff6a2b', c2: '#8d0a1f', c3: '#ffe066' },
    6: { name: 'Dulce Tormenta', mascot: 'candy', pattern: 'zigzag', c1: '#ff5d82', c2: '#8a1538', c3: '#ffe0ea' },
    7: { name: 'Aurora Violeta', mascot: 'ornament', pattern: 'swirl', c1: '#a46bff', c2: '#33096b', c3: '#f3c6ff' },
    8: { name: 'Chocolate Rubí', mascot: 'mug', pattern: 'diamonds', c1: '#e8333f', c2: '#55091a', c3: '#ffb8a8' },
    9: { name: 'Horno Mágico', mascot: 'gingerbread', pattern: 'zigzag', c1: '#f08a3a', c2: '#6b2f0c', c3: '#ffe2b8' },
    10: { name: 'Noche de Velas', mascot: 'candle', pattern: 'rays', c1: '#4a2bd1', c2: '#0f0533', c3: '#ffc94d' },
    11: { name: 'Ventisca Plata', mascot: 'snowman', pattern: 'snow', c1: '#c9d6e8', c2: '#4c6185', c3: '#ffffff' },
    12: { name: 'Gran Final', mascot: 'crown', pattern: 'swirl', c1: '#ff3cac', c2: '#2b4fd1', c3: '#fdd819', rainbow: true },
  };

  window.ADV_ART = { art, pattern, burst, THEMES, starPts };
})();
