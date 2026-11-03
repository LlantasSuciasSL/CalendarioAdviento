# 🎁 Adviento Álvaro · Calendario de Adviento coleccionable

Calendario de Adviento de **12 días** con estética de *trading cards*: cada día es un sobre metalizado que se rasga con el dedo; de dentro sale una carta (o una entrada) con animación de revelado, holo y confeti. Las cartas abiertas se guardan en tu colección dentro de una **funda gradeada**.

Hecho con HTML, CSS y JavaScript sin dependencias ni build: basta con abrir `index.html`.

## Probarlo

```bash
python3 -m http.server 8000
```

Abre `http://localhost:8000/?preview`. El parámetro `?preview` desbloquea todos los sobres para probar las animaciones; sin él cada sobre se abre en su fecha.

## Personalizar los regalos

Todo se edita en **`assets/js/gifts.js`**:

| Campo | Qué hace |
|---|---|
| `startDate` | Fecha del día 1 (`AAAA-MM-DD`). Los demás días se desbloquean consecutivamente a las 00:00. |
| `type` | `'card'` (carta) o `'ticket'` (entrada: concierto, cine, viaje…). |
| `name`, `effect`, `power`, `description`, `flavor` | Textos de la carta. |
| `rarity` | `comun` · `rara` · `holo` · `secreta`. **holo** y **secreta** usan diseño *full‑art* holográfico con título gigante. |
| `art` | Ilustración incluida: `star, gift, tree, snowflake, bell, candy, ornament, mug, gingerbread, candle, snowman, music, film, crown`. |
| `image` | (Opcional) tu propia imagen, p. ej. `'assets/img/dia3.png'`. Un PNG sin fondo queda genial: flota animado dentro de la carta. |
| `ticket` | Solo entradas: `{ date, time, place, seat }`. |

Los 12 diseños de sobre (colores, patrón y mascota de cada día) están en `THEMES` dentro de `assets/js/art.js`.

## Qué incluye

- **Sobres de foil** con textura de aluminio arrugado generada por SVG, bordes dentados termosellados, brillo que sigue al ratón e inclinación 3D.
- **Apertura**: desliza por la parte de arriba para rasgar (o pulsa "Abrir con un toque") → la tira sale volando → la carta sube desde dentro → carga de energía → destello, giro, rayos y confeti.
- **Cartas** en dos estilos (marco clásico y *full‑art*), con capa holográfica, purpurina y reflejo que reaccionan al movimiento. Toca la carta para verle el dorso.
- **Entradas** con troquel, perforado, código de barras, sello del día y banda de seguridad holográfica.
- **Colección** con funda gradeada estilo slab ("AAG · Gem MT 10").
- Sonidos sintetizados (sin archivos), botón de silencio, cuenta atrás al siguiente sobre, progreso guardado en el navegador y soporte de `prefers-reduced-motion`.

## Publicarlo en GitHub Pages

En *Settings → Pages*, elige la rama y la carpeta raíz `/`. La web quedará en `https://<usuario>.github.io/<repo>/`.
