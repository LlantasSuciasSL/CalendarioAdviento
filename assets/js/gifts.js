/* =========================================================
   CONFIGURACIÓN DEL CALENDARIO  ✏️  (edita aquí tus regalos)
   ---------------------------------------------------------
   startDate : fecha del DÍA 1 (AAAA-MM-DD). Cada día siguiente
               se desbloquea a las 00:00 del día correspondiente.
   Para cada regalo:
     type     : 'card'  -> carta coleccionable
                'ticket'-> entrada (concierto, cine, viaje...)
     name     : nombre del regalo
     art      : ilustración incluida (star, gift, tree, snowflake, bell,
                candy, ornament, mug, gingerbread, candle, snowman,
                music, film, crown)
     image    : (opcional) ruta a tu propia imagen, p. ej.
                'assets/img/dia1.png'  (PNG sin fondo queda genial)
     rarity   : 'comun' | 'rara' | 'holo' | 'secreta'
                (holo y secreta usan diseño full-art holográfico)
     effect   : título del "ataque/efecto" de la carta
     description, flavor : textos de la carta
     ticket   : solo para type 'ticket' -> { date, time, place, seat }

   Truco: abre la web con  ?preview  al final de la URL para
   desbloquear todos los sobres y probar las animaciones.
   ========================================================= */
window.ADVIENTO = {
  owner: 'Álvaro',
  year: 2026,
  startDate: '2026-12-13',

  gifts: [
    {
      day: 1, type: 'card', name: 'Taza Mágica', art: 'mug', rarity: 'comun',
      effect: 'Chocolate Infinito', power: '30',
      description: 'Mientras esta carta esté en juego, las tardes de invierno son un 50% más calentitas.',
      flavor: 'Dicen que nunca se enfría del todo.',
    },
    {
      day: 2, type: 'card', name: 'Bola de Cristal', art: 'ornament', rarity: 'rara',
      effect: 'Reflejo Festivo', power: '40',
      description: 'Roba una sonrisa del mazo de tu oponente. Si es diciembre, roba dos.',
      flavor: 'En su interior brilla un pequeño universo.',
    },
    {
      day: 3, type: 'card', name: 'Galleta Legendaria', art: 'gingerbread', rarity: 'comun',
      effect: 'Crujido Dulce', power: '20',
      description: 'Lanza una moneda. Si sale cara, te comes la galleta. Si sale cruz, también.',
      flavor: 'Nadie ha conseguido atraparla.',
    },
    {
      day: 4, type: 'card', name: 'Vela Aromática', art: 'candle', rarity: 'rara',
      effect: 'Llama Serena', power: '40',
      description: 'Cura todo el estrés de uno de tus días. Aroma a canela incluido.',
      flavor: 'Ilumina incluso las noches más largas.',
    },
    {
      day: 5, type: 'card', name: 'Bastón Dulce', art: 'candy', rarity: 'comun',
      effect: 'Golpe de Azúcar', power: '30',
      description: 'Este regalo hace 30 de daño a la rutina y deja un sabor a menta.',
      flavor: 'Rayas rojas, energía blanca.',
    },
    {
      day: 6, type: 'ticket', name: 'Concierto Sorpresa', art: 'music', rarity: 'holo',
      effect: 'Pase VIP', description: 'Una noche de música en directo. ¡Prepara la voz!',
      ticket: { date: 'Por desvelar', time: '21:00', place: 'Sorpresa', seat: 'Fila VIP · 06' },
    },
    {
      day: 7, type: 'card', name: 'Amigo de Nieve', art: 'snowman', rarity: 'rara',
      effect: 'Abrazo Helado', power: '50',
      description: 'Protege a tus otros regalos de cualquier ataque de aburrimiento.',
      flavor: 'Nunca se derrite si le das cariño.',
    },
    {
      day: 8, type: 'card', name: 'Campana de la Suerte', art: 'bell', rarity: 'holo',
      effect: 'Tintineo Dorado', power: '60',
      description: 'Cada vez que suene, busca en tu mazo un buen momento y ponlo en tu mano.',
      flavor: 'Su sonido se escucha a kilómetros.',
    },
    {
      day: 9, type: 'card', name: 'Mini Árbol', art: 'tree', rarity: 'comun',
      effect: 'Raíces Navideñas', power: '30',
      description: 'Decora instantáneamente cualquier espacio. No requiere riego.',
      flavor: 'Pequeño, pero con mucho espíritu.',
    },
    {
      day: 10, type: 'card', name: 'Copo Eterno', art: 'snowflake', rarity: 'rara',
      effect: 'Ventisca Única', power: '50',
      description: 'No hay dos iguales. Este es solo tuyo y congela el tiempo un instante.',
      flavor: 'Cayó del cielo justo para ti.',
    },
    {
      day: 11, type: 'card', name: 'Estrella Fugaz', art: 'star', rarity: 'holo',
      effect: 'Deseo Concedido', power: '90',
      description: 'Pide un deseo. Si es razonable, se cumple antes de fin de año.',
      flavor: 'Brilla una vez cada mil inviernos.',
    },
    {
      day: 12, type: 'ticket', name: 'Gran Estreno VIP', art: 'film', rarity: 'secreta',
      effect: 'Gran Final', description: 'La experiencia final del calendario. Palomitas incluidas.',
      ticket: { date: '24 DIC', time: '20:30', place: 'Sala Secreta', seat: 'Butaca 12 · Fila A' },
    },
  ],
};
