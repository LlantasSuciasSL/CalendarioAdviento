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

    /* ---------- Regalos 2026 ---------- */
    market(u) {
      let stripes = '', scallops = '', lights = '';
      const lc = ['#ffd23f', '#4cc9f0', '#ff5ce1', '#26b763'];
      for (let i = 0; i < 8; i++) {
        const f = i % 2 ? '#fff6ee' : '#e63946';
        stripes += `<rect x="${20 + i * 20}" y="74" width="20" height="22" fill="${f}"/>`;
        scallops += `<circle cx="${30 + i * 20}" cy="96" r="10" fill="${f}"/>`;
        lights += `<g class="twinkle${i % 2 ? ' d2' : ''}"><circle cx="${30 + i * 20}" cy="114" r="4.5" fill="${lc[i % 4]}" stroke="#3d220c" stroke-width="1.5"/></g>`;
      }
      return `
      <defs><linearGradient id="${u}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c98a4b"/><stop offset="1" stop-color="#8b5a2b"/></linearGradient></defs>
      <rect x="32" y="92" width="10" height="56" fill="#8b5a2b" stroke="#3d220c" stroke-width="4"/>
      <rect x="158" y="92" width="10" height="56" fill="#8b5a2b" stroke="#3d220c" stroke-width="4"/>
      <path d="M18 76 L100 26 L182 76Z" fill="#c1121f" stroke="#4a0710" stroke-width="6" stroke-linejoin="round"/>
      <path d="M100 26 L182 76 H150Z" fill="#000" opacity=".15"/>
      <path d="M66 48 L100 26 L134 48 Q122 42 112 50 Q100 40 88 50 Q78 42 66 48Z" fill="#fff"/>
      ${stripes}${scallops}
      <path d="M20 74 H180 V96 M20 74 V96" fill="none" stroke="#4a0710" stroke-width="4"/>
      <path d="M22 104 Q40 116 60 108 T100 108 T140 108 T178 104" fill="none" stroke="#3d220c" stroke-width="2"/>
      ${lights}
      <rect x="48" y="118" width="26" height="24" rx="2" fill="#e63946" stroke="#5b0d1a" stroke-width="3.5"/>
      <rect x="58" y="118" width="6" height="24" fill="#ffd23f"/>
      <circle cx="100" cy="128" r="13" fill="#4cc9f0" stroke="#123a7a" stroke-width="3.5"/>
      <ellipse cx="95" cy="123" rx="4" ry="3" fill="#fff" opacity=".7"/>
      <path d="M140 110 L154 142 H126Z" fill="#26b763" stroke="#0b3d1f" stroke-width="3.5" stroke-linejoin="round"/>
      <rect x="24" y="140" width="152" height="42" rx="4" fill="url(#${u}w)" stroke="#3d220c" stroke-width="6"/>
      <path d="M28 154 H172 M28 168 H172" stroke="#3d220c" stroke-width="2" opacity=".5"/>
      <rect x="70" y="150" width="60" height="20" rx="4" fill="#fff6ee" stroke="#3d220c" stroke-width="3"/>
      <text x="100" y="165" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="13" fill="#c1121f">MERCADO</text>`;
    },

    paint(u) {
      return `
      <defs><linearGradient id="${u}p" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe7c2"/><stop offset="1" stop-color="#e0b47a"/></linearGradient></defs>
      <path d="M100 40 C50 40 22 74 22 108 C22 140 50 164 84 164 C102 164 102 148 96 138 C90 126 102 116 116 120 C150 128 178 112 178 88 C178 60 146 40 100 40Z" fill="url(#${u}p)" stroke="#6b3a1e" stroke-width="6" stroke-linejoin="round"/>
      <ellipse cx="72" cy="132" rx="12" ry="10" fill="#6b3a1e" opacity=".55"/>
      <g stroke-width="3.5">
        <circle cx="60" cy="84" r="13" fill="#e63946" stroke="#7a0f1d"/>
        <circle cx="96" cy="64" r="13" fill="#26b763" stroke="#0b3d1f"/>
        <circle cx="134" cy="66" r="13" fill="#ffd23f" stroke="#8a5a00"/>
        <circle cx="158" cy="94" r="12" fill="#4cc9f0" stroke="#123a7a"/>
        <circle cx="46" cy="114" r="11" fill="#fff" stroke="#9aa3b5"/>
      </g>
      <g fill="#fff" opacity=".7"><circle cx="56" cy="80" r="3"/><circle cx="92" cy="60" r="3"/><circle cx="130" cy="62" r="3"/></g>
      <g class="tilt-sway" style="transform-origin:150px 180px">
        <g transform="rotate(32 140 120)">
          <rect x="134" y="92" width="13" height="92" rx="6.5" fill="#e63946" stroke="#5b0d1a" stroke-width="4"/>
          <rect x="132" y="74" width="17" height="22" rx="2" fill="#d6dbe6" stroke="#4a5266" stroke-width="4"/>
          <path d="M133 76 C130 56 136 42 140.5 30 C145 42 151 56 148 76Z" fill="#26b763" stroke="#0b3d1f" stroke-width="4" stroke-linejoin="round"/>
        </g>
      </g>
      <g class="twinkle"><polygon points="${starPts(40, 40, 12, 5)}" fill="#ffd23f" stroke="#8a5a00" stroke-width="2"/></g>
      <g class="twinkle d2"><polygon points="${starPts(170, 150, 9, 3, 4)}" fill="#fff"/></g>`;
    },

    sweater(u) {
      const body = 'M62 40 L84 32 Q100 46 116 32 L138 40 L178 72 L162 104 L146 92 L146 176 L54 176 L54 92 L38 104 L22 72Z';
      let zig = 'M54 74';
      for (let x = 54; x <= 146; x += 8) zig += ` L${x + 4} ${(x / 8) % 2 ? 68 : 80}`;
      let dots = '';
      for (let y = 132; y < 164; y += 14) for (let x = 64; x < 146; x += 14) dots += `<rect x="${x + ((y / 14) % 2 ? 7 : 0)}" y="${y}" width="5" height="5" fill="#fff"/>`;
      return `
      <defs>
        <linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2ec56b"/><stop offset="1" stop-color="#11793d"/></linearGradient>
        <clipPath id="${u}c"><path d="${body}"/></clipPath>
      </defs>
      <g class="wiggle">
        <path d="${body}" fill="url(#${u}s)"/>
        <g clip-path="url(#${u}c)">
          <rect x="0" y="62" width="200" height="24" fill="#e63946"/>
          <path d="${zig}" fill="none" stroke="#fff" stroke-width="4" stroke-linejoin="miter"/>
          ${dots}
          <rect x="0" y="164" width="200" height="14" fill="#e63946"/>
          <path d="M22 72 L38 104 L50 98 L34 66Z M178 72 L162 104 L150 98 L166 66Z" fill="#e63946"/>
          <path d="M58 164 V178 M68 164 V178 M78 164 V178 M88 164 V178 M98 164 V178 M108 164 V178 M118 164 V178 M128 164 V178 M138 164 V178" stroke="#a3101a" stroke-width="2.5"/>
        </g>
        <path d="${body}" fill="none" stroke="#0b3d1f" stroke-width="6" stroke-linejoin="round"/>
        <path d="M84 32 Q100 50 116 32" fill="none" stroke="#e63946" stroke-width="7" stroke-linecap="round"/>
        <!-- reno de punto con nariz pompón -->
        <path d="M84 102 C76 92 72 86 74 78 M78 90 L70 88 M116 102 C124 92 128 86 126 78 M122 90 L130 88" fill="none" stroke="#6b3a1e" stroke-width="5" stroke-linecap="round"/>
        <ellipse cx="100" cy="116" rx="19" ry="21" fill="#a0612b" stroke="#3d1e08" stroke-width="4"/>
        <circle cx="93" cy="110" r="3.5" fill="#1b1b2f"/><circle cx="107" cy="110" r="3.5" fill="#1b1b2f"/>
        <g class="glow-pulse"><circle cx="100" cy="126" r="9" fill="#ff2b3a" stroke="#7a0f1d" stroke-width="3"/></g>
        <circle cx="97" cy="123" r="3" fill="#fff" opacity=".8"/>
      </g>`;
    },

    pajama(u) {
      const body = 'M62 40 L84 32 L100 52 L116 32 L138 40 L178 72 L162 104 L146 92 L146 176 L54 176 L54 92 L38 104 L22 72Z';
      let plaid = '';
      for (let x = 0; x < 200; x += 26) plaid += `<rect x="${x}" y="0" width="11" height="200" fill="#7a0f1d" opacity=".45"/><rect x="${x + 16}" y="0" width="2" height="200" fill="#fff" opacity=".55"/>`;
      for (let y = 20; y < 200; y += 26) plaid += `<rect x="0" y="${y}" width="200" height="11" fill="#7a0f1d" opacity=".45"/><rect x="0" y="${y + 16}" width="200" height="2" fill="#fff" opacity=".55"/>`;
      return `
      <defs><clipPath id="${u}c"><path d="${body}"/></clipPath></defs>
      <g class="wiggle">
        <path d="${body}" fill="#e63946"/>
        <g clip-path="url(#${u}c)">${plaid}</g>
        <path d="${body}" fill="none" stroke="#4a0710" stroke-width="6" stroke-linejoin="round"/>
        <path d="M84 32 L100 52 L90 66 L74 40Z M116 32 L100 52 L110 66 L126 40Z" fill="#fff6ee" stroke="#4a0710" stroke-width="4" stroke-linejoin="round"/>
        <path d="M100 52 V176" stroke="#4a0710" stroke-width="4"/>
        <g fill="#fff6ee" stroke="#4a0710" stroke-width="2.5">
          <circle cx="106" cy="80" r="4.5"/><circle cx="106" cy="104" r="4.5"/><circle cx="106" cy="128" r="4.5"/><circle cx="106" cy="152" r="4.5"/>
        </g>
        <rect x="118" y="80" width="20" height="18" rx="2" fill="#fff6ee" stroke="#4a0710" stroke-width="3.5"/>
      </g>
      <path d="M152 18 a16 16 0 1 0 18 22 a13 13 0 1 1 -18 -22Z" fill="#ffd23f" stroke="#8a5a00" stroke-width="3"/>
      <g class="twinkle" font-family="Luckiest Guy, Impact, sans-serif" fill="#fff" stroke="#1d3557" stroke-width="3" paint-order="stroke">
        <text x="20" y="40" font-size="18">Z</text><text x="34" y="26" font-size="13">z</text>
      </g>`;
    },

    chococal(u) {
      let wins = '';
      for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
        const n = r * 4 + c + 1, x = 36 + c * 33, y = 74 + r * 32;
        if (n === 6) {
          wins += `<rect x="${x}" y="${y}" width="28" height="26" rx="3" fill="#3d1e08" stroke="#8a4b00" stroke-width="3"/>
          <polygon points="${starPts(x + 14, y + 13, 10, 4.5)}" fill="#7b3f1a" stroke="#2b1406" stroke-width="2"/>
          <path d="M${x} ${y} L${x - 12} ${y + 4} L${x - 12} ${y + 30} L${x} ${y + 26}Z" fill="#fff6e0" stroke="#8a4b00" stroke-width="3" stroke-linejoin="round"/>`;
        } else {
          wins += `<rect x="${x}" y="${y}" width="28" height="26" rx="3" fill="#fff6e0" stroke="#8a4b00" stroke-width="3"/>
          <text x="${x + 14}" y="${y + 19}" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="14" fill="#c1121f">${n}</text>`;
        }
      }
      return `
      <defs><linearGradient id="${u}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff4d5a"/><stop offset="1" stop-color="#9e0f24"/></linearGradient></defs>
      <rect x="24" y="34" width="152" height="146" rx="10" fill="url(#${u}b)" stroke="#4a0710" stroke-width="6"/>
      <rect x="24" y="34" width="152" height="30" rx="10" fill="#ffd23f" stroke="#4a0710" stroke-width="6"/>
      <text x="100" y="57" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="18" fill="#4a0710" letter-spacing="1">ADVIENTO</text>
      ${wins}
      <g fill="#fff" opacity=".8"><circle cx="34" cy="172" r="2.5"/><circle cx="166" cy="172" r="2.5"/></g>
      <g class="bounce" style="transform-origin:168px 40px">
        <polygon points="${starPts(168, 30, 20, 9)}" fill="#7b3f1a" stroke="#2b1406" stroke-width="4" stroke-linejoin="round"/>
        <path d="M162 18 L168 10 L171 22Z" fill="#a8622f" opacity=".8"/>
      </g>`;
    },

    candles(u) {
      const c = [[58, 88, '#e63946'], [100, 116, '#fff6ee'], [142, 70, '#26b763']];
      let out = `<defs><radialGradient id="${u}f" cx=".5" cy=".7" r=".7"><stop offset="0" stop-color="#fffbe0"/><stop offset=".45" stop-color="#ffc300"/><stop offset="1" stop-color="#fb5607"/></radialGradient>
        <radialGradient id="${u}h" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd166" stop-opacity=".7"/><stop offset="1" stop-color="#ffd166" stop-opacity="0"/></radialGradient></defs>`;
      c.forEach(([x, h, col], i) => {
        const top = 176 - h;
        out += `
        <circle class="glow-pulse" cx="${x}" cy="${top - 20}" r="28" fill="url(#${u}h)"/>
        <rect x="${x - 17}" y="${top}" width="34" height="${h}" rx="6" fill="${col}" stroke="#3d1e08" stroke-width="5"/>
        <path d="M${x - 17} ${top + 10} Q${x - 17} ${top} ${x - 7} ${top} H${x + 7} Q${x + 17} ${top} ${x + 17} ${top + 10} V${top + 14} Q${x + 12} ${top + 22} ${x + 8} ${top + 14} Q${x + 2} ${top + 30} ${x - 4} ${top + 14} Q${x - 10} ${top + 20} ${x - 17} ${top + 14}Z" fill="#fffaf0" opacity=".85"/>
        <rect x="${x - 11}" y="${top + 20}" width="5" height="${h - 30}" rx="2.5" fill="#fff" opacity=".35"/>
        <path d="M${x} ${top} V${top - 10}" stroke="#2b1406" stroke-width="4" stroke-linecap="round"/>
        <path class="flame" style="animation-delay:${i * .07}s" d="M${x} ${top - 44} C${x + 15} ${top - 26} ${x + 12} ${top - 12} ${x} ${top - 9} C${x - 12} ${top - 12} ${x - 15} ${top - 26} ${x} ${top - 44}Z" fill="url(#${u}f)" stroke="#e85d04" stroke-width="2.5"/>`;
      });
      return out + `<rect x="24" y="172" width="152" height="12" rx="6" fill="#ffd23f" stroke="#7a4300" stroke-width="4"/>${holly(36, 172, .7)}${holly(164, 172, .7)}`;
    },

    vinyl(u) {
      let grooves = '';
      for (let r = 26; r < 60; r += 6) grooves += `<circle cx="136" cy="100" r="${r}" fill="none" stroke="#3a3a4a" stroke-width="1.4"/>`;
      return `
      <defs>
        <linearGradient id="${u}v" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7eb6"/><stop offset=".55" stop-color="#e0245e"/><stop offset="1" stop-color="#8a0f3c"/></linearGradient>
        <linearGradient id="${u}l" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff2a8"/><stop offset="1" stop-color="#f0a500"/></linearGradient>
      </defs>
      <g class="spin-slow">
        <circle cx="136" cy="100" r="62" fill="#14141f" stroke="#05050a" stroke-width="5"/>
        ${grooves}
        <path d="M96 64 A56 56 0 0 1 150 46" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".35"/>
        <circle cx="136" cy="100" r="21" fill="url(#${u}l)" stroke="#8a5a00" stroke-width="2"/>
        <text x="136" y="98" text-anchor="middle" font-family="Rubik, sans-serif" font-weight="900" font-size="7" fill="#8a0f3c">SIDE A</text>
        <text x="136" y="108" text-anchor="middle" font-family="Rubik, sans-serif" font-weight="800" font-size="5.5" fill="#8a0f3c">XMAS</text>
        <circle cx="136" cy="100" r="3" fill="#05050a"/>
      </g>
      <g transform="rotate(-6 70 100)">
        <rect x="16" y="38" width="112" height="124" rx="4" fill="url(#${u}v)" stroke="#4a0720" stroke-width="5"/>
        <rect x="16" y="38" width="112" height="124" rx="4" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2" transform="translate(5 5) scale(.92)"/>
        <polygon points="${starPts(40, 64, 12, 5)}" fill="#fff6c2"/>
        <polygon points="${starPts(108, 140, 8, 3, 4)}" fill="#fff"/>
        <text x="72" y="104" text-anchor="middle" font-family="Luckiest Guy, Impact, sans-serif" font-size="30" fill="#fff" stroke="#4a0720" stroke-width="5" paint-order="stroke">KYLIE</text>
        <text x="72" y="124" text-anchor="middle" font-family="Rubik, sans-serif" font-weight="900" font-size="12" letter-spacing="2" fill="#fff6c2">CHRISTMAS</text>
      </g>
      <g class="twinkle"><polygon points="${starPts(178, 30, 12, 4, 4)}" fill="#fff"/></g>
      <g class="twinkle d2"><polygon points="${starPts(184, 168, 9, 3, 4)}" fill="#ff9ec4"/></g>`;
    },

    /* ---------- Catálogo extra ---------- */
    socks(u) {
      const sock = 'M70 28 H122 V108 Q122 118 130 126 L152 148 Q166 164 150 176 Q136 188 120 174 L82 138 Q70 126 70 110Z';
      return `
      <defs><clipPath id="${u}c"><path d="${sock}"/></clipPath></defs>
      <g class="swing" style="transform-origin:96px 20px">
        <path d="M60 22 Q96 8 132 22" fill="none" stroke="#8b5a2b" stroke-width="4"/>
        <path d="${sock}" fill="#e63946"/>
        <g clip-path="url(#${u}c)">
          <rect x="60" y="62" width="80" height="12" fill="#26b763"/><rect x="60" y="86" width="80" height="12" fill="#26b763"/>
          <path d="M112 160 Q130 150 160 156 L160 200 L100 200Z" fill="#fff6ee"/>
          <path d="M60 116 Q80 118 92 140 L60 150Z" fill="#fff6ee"/>
          <polygon points="${starPts(98, 80, 7, 3, 6)}" fill="#fff"/>
        </g>
        <path d="${sock}" fill="none" stroke="#5b0d1a" stroke-width="6" stroke-linejoin="round"/>
        <rect x="64" y="22" width="64" height="24" rx="7" fill="#fff6ee" stroke="#5b0d1a" stroke-width="5"/>
        <path d="M72 34 h48" stroke="#e3d6c8" stroke-width="3" stroke-dasharray="4 4"/>
      </g>
      <g class="twinkle"><polygon points="${starPts(160, 50, 11, 4, 4)}" fill="#fff"/></g>`;
    },

    book(u) {
      return `
      <defs><linearGradient id="${u}p" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#efe3cc"/></linearGradient></defs>
      <g class="bounce">
        <path d="M100 62 C76 48 44 46 18 54 V170 C44 162 76 164 100 178 C124 164 156 162 182 170 V54 C156 46 124 48 100 62Z" fill="#c1121f" stroke="#4a0710" stroke-width="6" stroke-linejoin="round"/>
        <path d="M100 58 C80 46 52 44 28 50 V158 C52 152 80 154 100 166Z" fill="url(#${u}p)" stroke="#6b3a1e" stroke-width="4" stroke-linejoin="round"/>
        <path d="M100 58 C120 46 148 44 172 50 V158 C148 152 120 154 100 166Z" fill="url(#${u}p)" stroke="#6b3a1e" stroke-width="4" stroke-linejoin="round"/>
        <g stroke="#b9a88c" stroke-width="3" stroke-linecap="round">
          <path d="M40 74 Q64 70 88 76 M40 90 Q64 86 88 92 M40 106 Q64 102 88 108 M40 122 Q60 118 76 122"/>
          <path d="M112 76 Q136 70 160 74 M112 92 Q136 86 160 90 M112 108 Q136 102 160 106 M124 122 Q140 118 160 122"/>
        </g>
        <path d="M140 46 V100 L132 92 L124 100 V48" fill="#ffd23f" stroke="#8a5a00" stroke-width="3" stroke-linejoin="round"/>
      </g>
      <g class="twinkle"><polygon points="${starPts(30, 30, 11, 4, 4)}" fill="#fff"/></g>
      <g class="twinkle d2"><polygon points="${starPts(176, 26, 9, 3, 4)}" fill="#ffd23f"/></g>`;
    },

    gamepad(u) {
      return `
      <defs><linearGradient id="${u}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8f6bff"/><stop offset="1" stop-color="#3b1d9e"/></linearGradient></defs>
      <g class="wiggle">
        <path d="M60 64 H140 C172 64 188 98 188 128 C188 158 170 172 154 162 L132 140 H68 L46 162 C30 172 12 158 12 128 C12 98 28 64 60 64Z" fill="url(#${u}g)" stroke="#170a4a" stroke-width="6" stroke-linejoin="round"/>
        <path d="M40 84 Q60 74 80 76" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".45"/>
        <g fill="#1b1040"><rect x="48" y="90" width="14" height="40" rx="4"/><rect x="35" y="103" width="40" height="14" rx="4"/></g>
        <g stroke="#170a4a" stroke-width="3">
          <circle cx="142" cy="92" r="9" fill="#ffd23f"/><circle cx="160" cy="110" r="9" fill="#e63946"/>
          <circle cx="124" cy="110" r="9" fill="#26b763"/><circle cx="142" cy="128" r="9" fill="#4cc9f0"/>
        </g>
        <rect x="84" y="96" width="12" height="6" rx="3" fill="#c9b8ff"/><rect x="104" y="96" width="12" height="6" rx="3" fill="#c9b8ff"/>
        <circle cx="100" cy="124" r="8" fill="#ff5ce1" stroke="#170a4a" stroke-width="3"/>
      </g>
      <g class="twinkle"><polygon points="${starPts(170, 40, 11, 4, 4)}" fill="#fff"/></g>`;
    },

    headphones(u) {
      return `
      <defs><linearGradient id="${u}h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7eb6"/><stop offset="1" stop-color="#c2185b"/></linearGradient></defs>
      <g class="bounce">
        <path d="M40 124 V104 A60 60 0 0 1 160 104 V124" fill="none" stroke="#3a0a24" stroke-width="20" stroke-linecap="round"/>
        <path d="M40 124 V104 A60 60 0 0 1 160 104 V124" fill="none" stroke="url(#${u}h)" stroke-width="11" stroke-linecap="round"/>
        <rect x="22" y="108" width="40" height="62" rx="16" fill="url(#${u}h)" stroke="#3a0a24" stroke-width="6"/>
        <rect x="138" y="108" width="40" height="62" rx="16" fill="url(#${u}h)" stroke="#3a0a24" stroke-width="6"/>
        <rect x="50" y="116" width="14" height="46" rx="7" fill="#2b2b3a"/><rect x="136" y="116" width="14" height="46" rx="7" fill="#2b2b3a"/>
        <path d="M32 120 v34" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".5"/>
      </g>
      <g class="twinkle" fill="#fff" stroke="#3a0a24" stroke-width="2.5">
        <path d="M92 70 v-26 l18 -5 v24"/><ellipse cx="88" cy="72" rx="7" ry="5"/><ellipse cx="106" cy="66" rx="7" ry="5"/>
      </g>`;
    },

    dinner(u) {
      return `
      <defs><linearGradient id="${u}d" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#cfd8e6"/><stop offset="1" stop-color="#7f8ca3"/></linearGradient></defs>
      <g fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".85">
        <path class="steam" d="M80 46 C72 36 88 28 80 16"/><path class="steam d2" d="M100 42 C92 32 108 24 100 10"/><path class="steam d3" d="M120 46 C112 36 128 28 120 16"/>
      </g>
      <ellipse cx="100" cy="156" rx="84" ry="16" fill="#e9eef5" stroke="#3b4660" stroke-width="5"/>
      <path d="M28 150 A72 72 0 0 1 172 150Z" fill="url(#${u}d)" stroke="#3b4660" stroke-width="6" stroke-linejoin="round"/>
      <path d="M50 128 A52 52 0 0 1 84 88" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".8"/>
      <rect x="92" y="66" width="16" height="12" rx="4" fill="#cfd8e6" stroke="#3b4660" stroke-width="4"/>
      <circle cx="100" cy="62" r="8" fill="#ffd23f" stroke="#8a5a00" stroke-width="4"/>
      <path d="M22 182 h156" stroke="#e63946" stroke-width="6" stroke-linecap="round"/>
      <g class="twinkle"><polygon points="${starPts(160, 40, 11, 4, 4)}" fill="#ffd23f"/></g>`;
    },

    plane() {
      return `
      <g fill="#fff" stroke="#1d3557" stroke-width="4">
        <g class="twinkle d2"><circle cx="40" cy="160" r="14"/><circle cx="58" cy="152" r="18"/><circle cx="78" cy="162" r="13"/></g>
        <rect x="30" y="160" width="56" height="14" rx="7" stroke="none"/>
      </g>
      <path d="M20 132 Q60 120 84 104" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="6 8" stroke-linecap="round" opacity=".8"/>
      <g class="bounce"><g transform="rotate(-20 110 96)">
        <path d="M100 96 L72 148 H94 L134 96Z" fill="#4cc9f0" stroke="#1d3557" stroke-width="5" stroke-linejoin="round"/>
        <path d="M100 96 L76 50 H96 L134 96Z" fill="#3aa6d0" stroke="#1d3557" stroke-width="5" stroke-linejoin="round"/>
        <path d="M54 88 L44 60 H58 L76 88Z" fill="#e63946" stroke="#1d3557" stroke-width="5" stroke-linejoin="round"/>
        <path d="M44 96 Q44 84 60 84 H158 Q184 84 192 96 Q184 108 158 108 H60 Q44 108 44 96Z" fill="#ffffff" stroke="#1d3557" stroke-width="5"/>
        <path d="M168 86 Q184 88 190 96 H168Z" fill="#1d3557"/>
        <g fill="#4cc9f0" stroke="#1d3557" stroke-width="2"><circle cx="80" cy="95" r="4.5"/><circle cx="98" cy="95" r="4.5"/><circle cx="116" cy="95" r="4.5"/><circle cx="134" cy="95" r="4.5"/><circle cx="152" cy="95" r="4.5"/></g>
        <path d="M60 104 H160" stroke="#e63946" stroke-width="3"/>
      </g></g>
      <g class="twinkle"><polygon points="${starPts(170, 30, 11, 4, 4)}" fill="#fff"/></g>`;
    },

    /* Cena para dos: dos personas brindando en una mesa navideña */
    dinner2(u) {
      return `
      <defs>
        <linearGradient id="${u}t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e63946"/><stop offset="1" stop-color="#a3101a"/></linearGradient>
        <radialGradient id="${u}f" cx=".5" cy=".7" r=".7"><stop offset="0" stop-color="#fffbe0"/><stop offset=".45" stop-color="#ffc300"/><stop offset="1" stop-color="#fb5607"/></radialGradient>
        <radialGradient id="${u}h" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd166" stop-opacity=".55"/><stop offset="1" stop-color="#ffd166" stop-opacity="0"/></radialGradient>
      </defs>
      <circle class="glow-pulse" cx="100" cy="112" r="46" fill="url(#${u}h)"/>

      <!-- corazón -->
      <g class="bounce" style="transform-origin:100px 40px">
        <path d="M100 46 C92 38 78 38 78 26 C78 18 86 14 92 16 C96 17 99 20 100 23 C101 20 104 17 108 16 C114 14 122 18 122 26 C122 38 108 38 100 46Z" fill="#ff4d7e" stroke="#7a0f2c" stroke-width="3.5" stroke-linejoin="round"/>
        <ellipse cx="88" cy="24" rx="4" ry="2.6" fill="#fff" opacity=".7" transform="rotate(-30 88 24)"/>
      </g>

      <!-- persona izquierda (gorro navideño) -->
      <g class="wiggle" style="transform-origin:48px 150px">
        <path d="M16 150 Q16 106 48 102 Q80 106 80 150Z" fill="#26b763" stroke="#0b3d1f" stroke-width="4.5" stroke-linejoin="round"/>
        <path d="M30 120 h36 M26 132 h44" stroke="#fff" stroke-width="3.5" stroke-dasharray="4 4" opacity=".85"/>
        <rect x="42" y="92" width="12" height="12" rx="3" fill="#f2b98f"/>
        <circle cx="48" cy="78" r="19" fill="#f6c9a2" stroke="#7a4a2a" stroke-width="4"/>
        <path d="M30 74 Q32 58 48 58 Q64 58 66 72 Q56 66 48 68 Q38 66 30 74Z" fill="#5a3418"/>
        <path d="M28 66 Q40 36 74 42 L66 64 Q48 56 28 66Z" fill="#e63946" stroke="#5b0d1a" stroke-width="3.5" stroke-linejoin="round"/>
        <circle cx="76" cy="40" r="6" fill="#fff" stroke="#c9d3e0" stroke-width="2"/>
        <path d="M26 66 Q48 56 68 64" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
        <circle cx="42" cy="79" r="2.6" fill="#2b1406"/><circle cx="55" cy="79" r="2.6" fill="#2b1406"/>
        <path d="M43 87 Q48.5 91 54 87" fill="none" stroke="#2b1406" stroke-width="2.4" stroke-linecap="round"/>
        <circle cx="38" cy="85" r="3" fill="#ff8fa3" opacity=".7"/><circle cx="59" cy="85" r="3" fill="#ff8fa3" opacity=".7"/>
        <path d="M70 116 Q82 104 90 86" fill="none" stroke="#0b3d1f" stroke-width="11" stroke-linecap="round"/>
        <path d="M70 116 Q82 104 90 86" fill="none" stroke="#26b763" stroke-width="6" stroke-linecap="round"/>
        <circle cx="90" cy="86" r="5" fill="#f6c9a2" stroke="#7a4a2a" stroke-width="2.5"/>
      </g>

      <!-- persona derecha (pelo largo con acebo) -->
      <g class="wiggle" style="transform-origin:152px 150px;animation-delay:-1.7s">
        <path d="M120 150 Q120 106 152 102 Q184 106 184 150Z" fill="#7b2cbf" stroke="#2d0a52" stroke-width="4.5" stroke-linejoin="round"/>
        <path d="M134 118 l6 6 l6 -6 l6 6 l6 -6 l6 6" fill="none" stroke="#ffd23f" stroke-width="3" stroke-linejoin="round"/>
        <path d="M131 64 Q128 98 134 112 L170 112 Q176 98 173 64Z" fill="#a0521d"/>
        <rect x="146" y="92" width="12" height="12" rx="3" fill="#e0a77a"/>
        <circle cx="152" cy="78" r="19" fill="#eab98e" stroke="#7a4a2a" stroke-width="4"/>
        <path d="M132 78 Q130 56 152 56 Q174 56 172 78 Q166 66 154 64 Q146 70 132 78Z" fill="#b5651d" stroke="#6b3410" stroke-width="2.5" stroke-linejoin="round"/>
        ${holly(166, 60, 0.42)}
        <circle cx="146" cy="79" r="2.6" fill="#2b1406"/><circle cx="159" cy="79" r="2.6" fill="#2b1406"/>
        <path d="M147 87 Q152.5 91 158 87" fill="none" stroke="#2b1406" stroke-width="2.4" stroke-linecap="round"/>
        <circle cx="142" cy="85" r="3" fill="#ff8fa3" opacity=".7"/><circle cx="163" cy="85" r="3" fill="#ff8fa3" opacity=".7"/>
        <path d="M130 116 Q118 104 110 86" fill="none" stroke="#2d0a52" stroke-width="11" stroke-linecap="round"/>
        <path d="M130 116 Q118 104 110 86" fill="none" stroke="#7b2cbf" stroke-width="6" stroke-linecap="round"/>
        <circle cx="110" cy="86" r="5" fill="#eab98e" stroke="#7a4a2a" stroke-width="2.5"/>
      </g>

      <!-- copas brindando -->
      <g stroke="#5b2a4a" stroke-width="2.5" stroke-linejoin="round">
        <g transform="rotate(14 92 76)">
          <path d="M84 62 H100 Q100 78 92 80 Q84 78 84 62Z" fill="#fff" fill-opacity=".55"/>
          <path d="M85.5 68 H98.5 Q97 78 92 79 Q87 78 85.5 68Z" fill="#c1123f" stroke="none"/>
          <path d="M92 80 V90 M87 90 H97" fill="none"/>
        </g>
        <g transform="rotate(-14 108 76)">
          <path d="M100 62 H116 Q116 78 108 80 Q100 78 100 62Z" fill="#fff" fill-opacity=".55"/>
          <path d="M101.5 68 H114.5 Q113 78 108 79 Q103 78 101.5 68Z" fill="#c1123f" stroke="none"/>
          <path d="M108 80 V90 M103 90 H113" fill="none"/>
        </g>
      </g>
      <g class="twinkle"><polygon points="${starPts(100, 56, 9, 3, 4)}" fill="#fff"/></g>

      <!-- mesa -->
      <rect x="12" y="134" width="176" height="12" rx="4" fill="#fff6ee" stroke="#5b0d1a" stroke-width="4"/>
      <path d="M18 146 H182 L174 190 H26Z" fill="url(#${u}t)" stroke="#5b0d1a" stroke-width="4" stroke-linejoin="round"/>
      <path d="M18 146 Q30 156 42 146 Q54 156 66 146 Q78 156 90 146 Q102 156 114 146 Q126 156 138 146 Q150 156 162 146 Q174 156 182 146" fill="#fff6ee" stroke="#5b0d1a" stroke-width="2.5"/>
      <ellipse cx="54" cy="134" rx="20" ry="5" fill="#fff" stroke="#9aa3b5" stroke-width="2.5"/>
      <ellipse cx="146" cy="134" rx="20" ry="5" fill="#fff" stroke="#9aa3b5" stroke-width="2.5"/>
      <path d="M48 131 q6 -6 12 0" fill="#c98a4b"/><path d="M140 131 q6 -6 12 0" fill="#26b763"/>
      <rect x="94" y="112" width="12" height="22" rx="3" fill="#fff6ee" stroke="#5b0d1a" stroke-width="3"/>
      <path class="flame" d="M100 96 C107 104 106 110 100 112 C94 110 93 104 100 96Z" fill="url(#${u}f)" stroke="#e85d04" stroke-width="1.8"/>
      ${holly(100, 136, 0.55)}`;
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
