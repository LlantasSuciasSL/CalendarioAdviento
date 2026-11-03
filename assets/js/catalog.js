/* =====================================================================
   📦 CATÁLOGO DE OBJETOS
   ---------------------------------------------------------------------
   Plantillas listas para asignar a cualquier sobre desde
   ⚙ Panel de admin → 🎁 Premios → "Elegir del catálogo".
   Puedes añadir las tuyas copiando cualquier bloque.
   (Usan los mismos campos que los regalos de gifts.js, sin "day".)
   ===================================================================== */
window.ADV_CATALOG = [
  /* ───────── Dulces ───────── */
  { cat: 'Dulces', type: 'card', rarity: 'rara', name: 'Calendario de Chocolate', art: 'chococal', effect: 'Ventanita Dulce', power: '24',
    description: 'Abre una ventanita cada día y roba un bombón. Si abres dos de golpe, nadie lo sabrá.', flavor: 'Un calendario dentro de otro calendario.' },
  { cat: 'Dulces', type: 'card', rarity: 'comun', name: 'Taza Mágica', art: 'mug', effect: 'Chocolate Infinito', power: '30',
    description: 'Mientras esta carta esté en juego, las tardes de invierno son un 50% más calentitas.', flavor: 'Dicen que nunca se enfría del todo.' },
  { cat: 'Dulces', type: 'card', rarity: 'comun', name: 'Galletas de Jengibre', art: 'gingerbread', effect: 'Crujido Dulce', power: '20',
    description: 'Lanza una moneda. Si sale cara, te comes una galleta. Si sale cruz, también.', flavor: 'Nadie ha conseguido atraparlas.' },
  { cat: 'Dulces', type: 'card', rarity: 'comun', name: 'Bastón de Caramelo', art: 'candy', effect: 'Golpe de Azúcar', power: '30',
    description: 'Hace 30 de daño a la rutina y deja un sabor a menta.', flavor: 'Rayas rojas, energía blanca.' },

  /* ───────── Hogar ───────── */
  { cat: 'Hogar', type: 'card', rarity: 'comun', name: 'Velas Navideñas', art: 'candles', effect: 'Luz de Hogar', power: '30',
    description: 'Enciende las tres a la vez y el salón se vuelve 100% acogedor. Huele a Navidad.', flavor: 'Tres llamas, una misma noche.' },
  { cat: 'Hogar', type: 'card', rarity: 'rara', name: 'Vela Aromática', art: 'candle', effect: 'Llama Serena', power: '40',
    description: 'Cura todo el estrés de un día. Aroma a canela incluido.', flavor: 'Ilumina las noches más largas.' },
  { cat: 'Hogar', type: 'card', rarity: 'rara', name: 'DIY Pintura Navideña', art: 'paint', effect: 'Pincelada Creativa', power: '50',
    description: 'Pinta tus propios adornos de Navidad. Lo que se mancha, se queda como recuerdo.', flavor: 'Hecho a mano, hecho con cariño.' },
  { cat: 'Hogar', type: 'card', rarity: 'rara', name: 'Bola de Cristal', art: 'ornament', effect: 'Reflejo Festivo', power: '40',
    description: 'Roba una sonrisa del mazo de tu oponente. Si es diciembre, roba dos.', flavor: 'Dentro brilla un pequeño universo.' },
  { cat: 'Hogar', type: 'card', rarity: 'comun', name: 'Mini Árbol', art: 'tree', effect: 'Raíces Navideñas', power: '30',
    description: 'Decora al instante cualquier rincón. No necesita riego.', flavor: 'Pequeño, pero con mucho espíritu.' },

  /* ───────── Ropa ───────── */
  { cat: 'Ropa', type: 'card', rarity: 'holo', name: 'Jersey Feo de Navidad', art: 'sweater', effect: '¡Jersey Feo!', power: '120',
    description: 'Cuanto más feo, más poder. El reno brilla en la oscuridad. Obligatorio en cenas familiares.' },
  { cat: 'Ropa', type: 'card', rarity: 'rara', name: 'Pijama de Navidad', art: 'pajama', effect: 'Modo Sofá', power: '60',
    description: 'Activa el modo manta + peli. Inmune a planes que impliquen salir de casa.', flavor: 'Cuadros rojos, sueños dulces.' },
  { cat: 'Ropa', type: 'card', rarity: 'comun', name: 'Calcetines Navideños', art: 'socks', effect: 'Pies Calentitos', power: '20',
    description: 'Equipa estos calcetines y ningún suelo frío podrá contigo.', flavor: 'Nunca se pierde uno… o casi.' },

  /* ───────── Música y ocio ───────── */
  { cat: 'Música y ocio', type: 'card', rarity: 'holo', name: 'Kylie Christmas', art: 'vinyl', effect: 'Christmas Diva', power: '100',
    description: 'El disco navideño de Kylie Minogue. Dale al play y la casa se convierte en una pista de baile.' },
  { cat: 'Música y ocio', type: 'card', rarity: 'rara', name: 'Libro Especial', art: 'book', effect: 'Página Mágica', power: '50',
    description: 'Abre una aventura nueva cada noche. Efecto secundario: “un capítulo más”.', flavor: 'Las mejores historias empiezan en invierno.' },
  { cat: 'Música y ocio', type: 'card', rarity: 'holo', name: 'Videojuego', art: 'gamepad', effect: 'Partida Épica', power: '110',
    description: 'Desbloquea horas de diversión. Pulsa START cuando quieras.' },
  { cat: 'Música y ocio', type: 'card', rarity: 'rara', name: 'Auriculares', art: 'headphones', effect: 'Modo Concierto', power: '70',
    description: 'Tu música favorita, sin interrupciones. Aísla de villancicos no deseados.', flavor: 'Volumen recomendado: alto.' },

  /* ───────── Experiencias (entradas) ───────── */
  { cat: 'Experiencias', type: 'ticket', rarity: 'holo', name: 'Mercado Navideño', art: 'market', effect: 'Paseo Mágico',
    description: 'Una tarde entre luces, puestos, chocolate caliente y castañas.',
    ticket: { date: 'Diciembre', time: '18:00', place: 'Mercado navideño', seat: 'Paseo libre · 2 pers.' } },
  { cat: 'Experiencias', type: 'ticket', rarity: 'holo', name: 'Concierto Sorpresa', art: 'music', effect: 'Pase VIP',
    description: 'Una noche de música en directo. ¡Prepara la voz!',
    ticket: { date: 'Por desvelar', time: '21:00', place: 'Sorpresa', seat: 'Pista' } },
  { cat: 'Experiencias', type: 'ticket', rarity: 'holo', name: 'Noche de Cine', art: 'film', effect: 'Butaca VIP',
    description: 'Película, palomitas gigantes y cero spoilers.',
    ticket: { date: 'Por elegir', time: '20:30', place: 'Cine', seat: 'Fila central' } },
  { cat: 'Experiencias', type: 'ticket', rarity: 'holo', name: 'Cena Especial', art: 'dinner', effect: 'Menú Sorpresa',
    description: 'Una cena para dos en un sitio especial. Postre obligatorio.',
    ticket: { date: 'Por reservar', time: '21:30', place: 'Restaurante sorpresa', seat: 'Mesa para 2' } },
  { cat: 'Experiencias', type: 'ticket', rarity: 'secreta', name: 'Escapada Sorpresa', art: 'plane', effect: 'Destino Secreto',
    description: 'Haz la maleta: nos vamos de viaje. El destino se revela al embarcar.',
    ticket: { date: 'Por desvelar', time: '—', place: 'Destino secreto', seat: 'Ventanilla' } },
  { cat: 'Experiencias', type: 'ticket', rarity: 'secreta', name: 'Gran Final', art: 'crown', effect: 'Gran Final',
    description: 'La experiencia final del calendario. Por desvelar…',
    ticket: { date: '24 DIC', time: '—', place: 'Sorpresa', seat: 'VIP · 12' } },

  /* ───────── Clásicos navideños ───────── */
  { cat: 'Clásicos', type: 'card', rarity: 'holo', name: 'Estrella Fugaz', art: 'star', effect: 'Deseo Concedido', power: '90',
    description: 'Pide un deseo. Si es razonable, se cumple antes de fin de año.' },
  { cat: 'Clásicos', type: 'card', rarity: 'comun', name: 'Regalo Sorpresa', art: 'gift', effect: 'Caja Misteriosa', power: '??',
    description: 'Nadie sabe qué hay dentro… todavía. Este espacio está reservado para algo muy especial.', flavor: 'Lo mejor llega envuelto.' },
  { cat: 'Clásicos', type: 'card', rarity: 'rara', name: 'Campana de la Suerte', art: 'bell', effect: 'Tintineo Dorado', power: '60',
    description: 'Cada vez que suene, busca en tu mazo un buen momento y ponlo en tu mano.', flavor: 'Se escucha a kilómetros.' },
  { cat: 'Clásicos', type: 'card', rarity: 'rara', name: 'Amigo de Nieve', art: 'snowman', effect: 'Abrazo Helado', power: '50',
    description: 'Protege a tus otros regalos de cualquier ataque de aburrimiento.', flavor: 'Nunca se derrite si le das cariño.' },
  { cat: 'Clásicos', type: 'card', rarity: 'rara', name: 'Copo Eterno', art: 'snowflake', effect: 'Ventisca Única', power: '50',
    description: 'No hay dos iguales. Este es solo tuyo y congela el tiempo un instante.', flavor: 'Cayó del cielo justo para ti.' },
];
