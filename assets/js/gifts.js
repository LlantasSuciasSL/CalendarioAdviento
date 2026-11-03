/* =====================================================================
   🎁  ZONA DE REGALOS  ·  edita solo este archivo
   =====================================================================
   Cada bloque { ... } es un día. Para cambiar un regalo, cambia sus
   textos. Para moverlo de día, cambia el número de "day".
   Los días marcados con  ⏳ PENDIENTE  son de relleno: sustitúyelos.

   CAMPOS
     day         nº de sobre 1-12 (su fecha la decide "schedule")
     type        'card'   → carta coleccionable
                 'ticket' → entrada (plan, evento, experiencia)
     name        nombre del regalo (título de la carta)
     art         ilustración incluida (ver lista abajo)
     image       (opcional) tu foto/imagen: 'assets/img/dia1.png'
                 si la pones, sustituye a "art". Mejor PNG sin fondo.
     rarity      'comun' | 'rara'      → carta de marco clásico
                 'holo'  | 'secreta'   → carta full-art holográfica
     effect      nombre del "ataque" (en full-art sale en grande)
     power       número a la derecha del ataque (decorativo)
     description texto principal
     flavor      frase en cursiva (solo cartas clásicas)
     ticket      solo entradas: { date, time, place, seat }

   ILUSTRACIONES DISPONIBLES (art)
     chococal  candles  sweater  paint  pajama  market  vinyl
     star  gift  tree  snowflake  bell  candy  ornament  mug
     gingerbread  candle  snowman  music  film  crown

   Truco: añade ?preview a la URL para desbloquear todo y probar.
   ===================================================================== */
window.ADVIENTO = {
  owner: 'Álvaro',
  year: 2026,

  /* 📅 REPARTO DE LOS 12 SOBRES EN DICIEMBRE
     mode: 'pares'   → días 2, 4, 6 … 24
           'impares' → días 1, 3, 5 … 23
           'todos'   → 12 días seguidos empezando en startDay (13 → del 13 al 24)
     También se cambia desde el ⚙ Panel de admin (pie de página o ?admin). */
  schedule: { mode: 'todos', month: 12, startDay: 13 },

  // 🔐 PIN del panel de admin (déjalo en '' para entrar sin PIN)
  adminPin: '2412',

  gifts: [
    // ───────────────────────── DÍA 1 ─────────────────────────
    {
      day: 1, type: 'card', rarity: 'rara',
      name: 'Calendario de Chocolate', art: 'chococal',
      effect: 'Ventanita Dulce', power: '24',
      description: 'Abre una ventanita cada día y roba un bombón. Si abres dos de golpe, nadie lo sabrá.',
      flavor: 'Un calendario dentro de otro calendario.',
    },

    // ───────────────────────── DÍA 2 ─────────────────────────
    {
      day: 2, type: 'card', rarity: 'comun',
      name: 'Velas Navideñas', art: 'candles',
      effect: 'Luz de Hogar', power: '30',
      description: 'Enciende las tres a la vez y el salón se vuelve 100% acogedor. Huele a Navidad.',
      flavor: 'Tres llamas, una misma noche.',
    },

    // ───────────────────────── DÍA 3 ─────────────────────────
    {
      day: 3, type: 'card', rarity: 'holo',
      name: 'Jersey Feo de Navidad', art: 'sweater',
      effect: '¡Jersey Feo!', power: '120',
      description: 'Cuanto más feo, más poder. El reno brilla en la oscuridad. Uso obligatorio en cenas familiares.',
    },

    // ───────────────────────── DÍA 4 ─────────────────────────
    {
      day: 4, type: 'card', rarity: 'rara',
      name: 'DIY Pintura Navideña', art: 'paint',
      effect: 'Pincelada Creativa', power: '50',
      description: 'Pinta tus propios adornos de Navidad. Lo que se mancha, se queda como recuerdo.',
      flavor: 'Hecho a mano, hecho con cariño.',
    },

    // ───────────────────────── DÍA 5 ─────────────────────────  ⏳ PENDIENTE
    {
      day: 5, type: 'card', rarity: 'comun',
      name: 'Bastón Dulce', art: 'candy',
      effect: 'Golpe de Azúcar', power: '30',
      description: 'Regalo sorpresa por desvelar. Este espacio está reservado para algo muy especial.',
      flavor: 'Rayas rojas, energía blanca.',
    },

    // ───────────────────────── DÍA 6 ─────────────────────────
    {
      day: 6, type: 'ticket', rarity: 'holo',
      name: 'Mercado Navideño', art: 'market',
      effect: 'Paseo Mágico',
      description: 'Una tarde entre luces, puestos, chocolate caliente y castañas.',
      ticket: { date: 'Diciembre', time: '18:00', place: 'Mercado navideño', seat: 'Paseo libre · 2 pers.' },
    },

    // ───────────────────────── DÍA 7 ─────────────────────────
    {
      day: 7, type: 'card', rarity: 'rara',
      name: 'Pijama de Navidad', art: 'pajama',
      effect: 'Modo Sofá', power: '60',
      description: 'Activa el modo manta + peli. Inmune a planes que impliquen salir de casa.',
      flavor: 'Cuadros rojos, sueños dulces.',
    },

    // ───────────────────────── DÍA 8 ─────────────────────────  ⏳ PENDIENTE
    {
      day: 8, type: 'card', rarity: 'comun',
      name: 'Campana de la Suerte', art: 'bell',
      effect: 'Tintineo Dorado', power: '40',
      description: 'Regalo sorpresa por desvelar. Este espacio está reservado para algo muy especial.',
      flavor: 'Su sonido se escucha a kilómetros.',
    },

    // ───────────────────────── DÍA 9 ─────────────────────────  ⏳ PENDIENTE
    {
      day: 9, type: 'card', rarity: 'comun',
      name: 'Mini Árbol', art: 'tree',
      effect: 'Raíces Navideñas', power: '30',
      description: 'Regalo sorpresa por desvelar. Este espacio está reservado para algo muy especial.',
      flavor: 'Pequeño, pero con mucho espíritu.',
    },

    // ───────────────────────── DÍA 10 ────────────────────────
    {
      day: 10, type: 'card', rarity: 'holo',
      name: 'Kylie Christmas', art: 'vinyl',
      effect: 'Christmas Diva', power: '100',
      description: 'El disco navideño de Kylie Minogue. Dale al play y la casa se convierte en una pista de baile.',
    },

    // ───────────────────────── DÍA 11 ────────────────────────  ⏳ PENDIENTE
    {
      day: 11, type: 'card', rarity: 'rara',
      name: 'Estrella Fugaz', art: 'star',
      effect: 'Deseo Concedido', power: '90',
      description: 'Regalo sorpresa por desvelar. Este espacio está reservado para algo muy especial.',
      flavor: 'Brilla una vez cada mil inviernos.',
    },

    // ───────────────────────── DÍA 12 ────────────────────────  ⏳ PENDIENTE
    {
      day: 12, type: 'ticket', rarity: 'secreta',
      name: 'Gran Final', art: 'crown',
      effect: 'Gran Final',
      description: 'La experiencia final del calendario. Por desvelar…',
      ticket: { date: '24 DIC', time: '—', place: 'Sorpresa', seat: 'VIP · 12' },
    },
  ],
};
