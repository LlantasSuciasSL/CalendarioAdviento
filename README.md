# 🎁 Adviento Álvaro

**Calendario de Adviento coleccionable estilo *trading cards*.** Son 12 días y 12 sobres metalizados. Cada día rasgas un sobre con el dedo y sale una carta (o una entrada) con animación de revelado, holográfico y confeti. Lo que vas abriendo se guarda en tu colección dentro de una funda gradeada.

> Hecho con HTML, CSS y JavaScript, sin dependencias ni instalación.

---

## 📑 Índice

1. [Arrancar el proyecto](#-arrancar-el-proyecto)
2. [✏️ Zona de regalos: cambiar los objetos](#️-zona-de-regalos-cambiar-los-objetos)
3. [Regalos actuales](#-regalos-actuales)
4. [Usar tus propias imágenes](#-usar-tus-propias-imágenes)
5. [Ilustraciones disponibles](#-ilustraciones-disponibles)
6. [Fechas y desbloqueo](#-fechas-y-desbloqueo)
7. [Personalizar los sobres](#-personalizar-los-sobres)
8. [Estructura del proyecto](#-estructura-del-proyecto)
9. [Publicar en GitHub Pages](#-publicar-en-github-pages)
10. [Preguntas frecuentes](#-preguntas-frecuentes)

---

## 🚀 Arrancar el proyecto

```bash
python3 -m http.server 8000
```

Abre **http://localhost:8000/?preview**.

- `?preview` desbloquea **todos** los sobres para probar las animaciones.
- Sin `?preview`, cada sobre se abre en su fecha real.
- También puedes abrir `index.html` directamente con doble clic. (Para descargar cartas con su tipografía, mejor con el servidor.)

---

## ✏️ Zona de regalos: cambiar los objetos

> **Solo hay que tocar un archivo: [`assets/js/gifts.js`](assets/js/gifts.js)**

Cada día es un bloque como este:

```js
{
  day: 3, type: 'card', rarity: 'holo',
  name: 'Jersey Feo de Navidad', art: 'sweater',
  effect: '¡Jersey Feo!', power: '120',
  description: 'Cuanto más feo, más poder…',
},
```

### Campos

| Campo | Obligatorio | Qué hace |
|---|:-:|---|
| `day` | ✅ | Día del 1 al 12. Cámbialo para mover un regalo de día. |
| `type` | ✅ | `'card'` → carta coleccionable · `'ticket'` → entrada (plan, evento, experiencia). |
| `name` | ✅ | Nombre del regalo (título de la carta o de la entrada). |
| `art` | ✅* | Ilustración incluida ([lista](#-ilustraciones-disponibles)). *No hace falta si usas `image`. |
| `image` | — | Ruta a tu propia imagen. Sustituye a `art`. |
| `rarity` | ✅ | `comun` o `rara` → **marco clásico** · `holo` o `secreta` → **full‑art holográfica** con el `effect` en letras gigantes. |
| `effect` | ✅ | Nombre del "ataque" de la carta. |
| `power` | — | Número junto al ataque (decorativo). |
| `description` | ✅ | Texto principal. |
| `flavor` | — | Frase en cursiva (solo en cartas clásicas). |
| `ticket` | — | Solo entradas: `{ date, time, place, seat }`. |

### Plantillas para copiar

**Carta**

```js
{
  day: 5, type: 'card', rarity: 'rara',
  name: 'Mi Regalo', art: 'gift',          // o image: 'assets/img/dia5.png'
  effect: 'Nombre del Ataque', power: '50',
  description: 'Qué es y por qué mola.',
  flavor: 'Frase corta en cursiva.',
},
```

**Entrada**

```js
{
  day: 8, type: 'ticket', rarity: 'holo',
  name: 'Concierto X', art: 'music',
  effect: 'Pase VIP',
  description: 'Una noche de música en directo.',
  ticket: { date: '20 DIC', time: '21:00', place: 'Sala Y', seat: 'Pista' },
},
```

### ¿Carta o entrada?

| Si el regalo es… | Usa |
|---|---|
| Un objeto (ropa, disco, velas, comida…) | `type: 'card'` |
| Un plan o experiencia (mercado, concierto, cena, viaje…) | `type: 'ticket'` |

---

## 📋 Regalos actuales

| Día | Regalo | Tipo | Rareza | Ilustración | Estado |
|:-:|---|:-:|:-:|:-:|:-:|
| 1 | Calendario de Adviento de chocolate | Carta | Rara | `chococal` | ✅ |
| 2 | Velas navideñas | Carta | Común | `candles` | ✅ |
| 3 | Jersey feo de Navidad | Carta | Holo | `sweater` | ✅ |
| 4 | DIY de pintura navideña | Carta | Rara | `paint` | ✅ |
| 5 | — | Carta | Común | `candy` | ⏳ Pendiente |
| 6 | Mercado navideño | Entrada | Holo | `market` | ✅ |
| 7 | Pijama de Navidad | Carta | Rara | `pajama` | ✅ |
| 8 | — | Carta | Común | `bell` | ⏳ Pendiente |
| 9 | — | Carta | Común | `tree` | ⏳ Pendiente |
| 10 | Disco *Kylie Christmas* (Kylie Minogue) | Carta | Holo | `vinyl` | ✅ |
| 11 | — | Carta | Rara | `star` | ⏳ Pendiente |
| 12 | — (gran final) | Entrada | Secreta | `crown` | ⏳ Pendiente |

> En `gifts.js` los días pendientes están marcados con `⏳ PENDIENTE`.

---

## 🖼 Usar tus propias imágenes

1. Guarda la imagen en `assets/img/` (por ejemplo `assets/img/dia3.png`).
2. En el regalo, añade `image: 'assets/img/dia3.png'`.

Consejos:
- **PNG con fondo transparente** de unos 600×600 px: flota animado sobre el fondo de la carta.
- Una foto con fondo también funciona, pero se ve como un recorte cuadrado.

---

## 🎨 Ilustraciones disponibles

Todas son vectoriales, originales y animadas.

| Clave | Dibujo | Clave | Dibujo |
|---|---|---|---|
| `chococal` | Calendario de chocolate | `bell` | Campana |
| `candles` | Trío de velas | `candy` | Bastón de caramelo |
| `sweater` | Jersey feo con reno | `ornament` | Bola de Navidad |
| `paint` | Paleta y pincel | `mug` | Taza de chocolate |
| `pajama` | Pijama de cuadros | `gingerbread` | Galleta de jengibre |
| `market` | Puesto de mercado | `candle` | Vela |
| `vinyl` | Vinilo navideño | `snowman` | Muñeco de nieve |
| `star` | Estrella | `music` | Notas musicales |
| `gift` | Regalo | `film` | Claqueta de cine |
| `tree` | Árbol | `crown` | Corona |
| `snowflake` | Copo de nieve | | |

---

## 📅 Fechas y desbloqueo

Los 12 sobres se reparten en diciembre de tres formas:

| Modo | Días con sobre |
|---|---|
| `pares` | 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24 |
| `impares` | 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23 |
| `todos` | 12 días seguidos desde `startDay` (con `13`: del 13 al 24) |

El sobre Nº 1 cae en el primer día del reparto, el Nº 2 en el segundo, y así hasta el 12. En la web, en las cartas y en las fundas aparece el **día real del mes** (por ejemplo, "DÍA 06" si va en pares). El número de colección (`03/12`) no cambia. Cada sobre se desbloquea a las 00:00 de su día.

### ⚙ Panel de admin

Ábrelo desde **"⚙ Panel de admin"** en el pie de página, o añadiendo `?admin` a la URL. Pide el PIN definido en `adminPin` (por defecto `2412`). Si lo dejas en `''`, se entra sin PIN.

En el panel:
- Eliges **Pares**, **Impares** o **Todos seguidos** (y en este último, el día de inicio).
- Ves el **mini calendario de diciembre** con cada sobre en su día y la **lista** con la fecha, el regalo y su estado (❄ congelado, disponible o abierto).
- **Guardar y aplicar** cambia el reparto al instante, pero **solo en ese navegador**.
- **🔗 Copiar enlace** genera una URL como `…/?dias=pares` o `…/?dias=todos&inicio=13`. Envíasela a quien abre el calendario y lo verá así en su móvil.
- **{ } Copiar código** da la línea para pegar en `gifts.js` y que quede fijo para todo el mundo al publicar:

```js
schedule: { mode: 'pares', month: 12, startDay: 13 },
```

Prioridad cuando hay varias configuraciones: **enlace** > **guardado en el panel** > **`gifts.js`**. "Volver a lo que diga gifts.js" borra lo guardado en el panel.

> El PIN solo evita miradas curiosas: la web es estática y `gifts.js` es público.

**Días aún no disponibles → ❄ congelados.** El sobre aparece encerrado en un bloque de hielo, con escarcha, carámbanos y grietas, y lleva un candado helado con el mensaje **FREEZE**, la fecha en que se descongela y los días que faltan. Si lo pulsas antes de tiempo, el hielo tiembla, se agrieta, saltan esquirlas y suena un golpe helado. A medianoche se descongela solo, sin recargar la página.

El progreso se guarda en el navegador (`localStorage`). El enlace **"Reiniciar sobres"** del pie de página vuelve a cerrarlos todos.

---

## 🧧 Personalizar los sobres

Los 12 diseños de sobre están en `THEMES`, dentro de [`assets/js/art.js`](assets/js/art.js):

```js
1: { name: 'Estrella Polar', mascot: 'star', pattern: 'rays', c1: '#14c3d6', c2: '#0a4f8f', c3: '#8ff7ff' },
```

- `mascot`: ilustración del sobre (no revela el regalo).
- `pattern`: `rays`, `zigzag`, `diamonds`, `swirl` o `snow`.
- `c1` / `c2`: degradado principal. `c3`: color de los brillos.
- `rainbow: true`: acabado arcoíris (el del gran final).

El nombre del logo sale de `owner` en `gifts.js`.

---

## 🗂 Estructura del proyecto

```
index.html            Página
assets/
  css/styles.css      Estilos: sobres, cartas, entradas, fundas, animaciones
  js/gifts.js         ✏️ ZONA DE REGALOS (lo único que hay que editar)
  js/art.js           Ilustraciones SVG y diseños de sobre
  js/app.js           Lógica: tablero, apertura, efectos, sonido y descarga
  img/                Tus imágenes
  fonts/              Tipografías locales (Luckiest Guy y Rubik, licencia OFL)
  vendor/             html-to-image (MIT), para exportar la carta a PNG
```

---

## 🌐 Publicar en GitHub Pages

En **Settings → Pages**, elige la rama y la carpeta `/ (root)`. La web quedará en `https://<usuario>.github.io/<repo>/`.

---

## ❓ Preguntas frecuentes

**¿Cómo abro un sobre?** Desliza el dedo de lado a lado por la parte superior, o pulsa "Abrir con un toque".

**¿Cómo veo el dorso de la carta?** Tócala una vez revelada.

**¿Cómo descargo la carta del día?** Al revelarla (o al abrirla desde la colección) pulsa **⬇ Descargar carta**. Se genera un PNG en alta resolución (1260×1760) con fondo transparente, el brillo holográfico y, en las entradas, los troqueles recortados. Nombre del archivo: `adviento-alvaro-dia-03-jersey-feo-de-navidad.png`. En el móvil se abre el menú de compartir para guardarla en Fotos o enviarla por WhatsApp.

**¿Se puede quitar el sonido?** Sí, con el botón del altavoz arriba a la derecha.

**El texto no cabe en la carta.** Usa descripciones de 1–2 frases (unos 110 caracteres) y nombres de 2–3 palabras.
