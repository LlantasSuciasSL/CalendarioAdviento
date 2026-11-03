/* =========================================================
   PANEL DE ADMIN · 🎁 Premios (editor + catálogo) y 🕘 Historial
   ========================================================= */
(function () {
  'use strict';
  const A = window.ADV_APP;
  if (!A) return;
  const { CFG, THEMES, art, esc, pad, toast, RAR_NAME } = A;
  const CATALOG = window.ADV_CATALOG || [];
  const $ = (s, r = document) => r.querySelector(s);
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

  const ARTS = [
    ['chococal', 'Calendario de chocolate'], ['candles', 'Trío de velas'], ['sweater', 'Jersey feo'],
    ['paint', 'Paleta y pincel'], ['pajama', 'Pijama'], ['socks', 'Calcetines'], ['market', 'Mercado navideño'],
    ['vinyl', 'Vinilo'], ['book', 'Libro'], ['gamepad', 'Mando de consola'], ['headphones', 'Auriculares'],
    ['dinner', 'Cena'], ['plane', 'Viaje en avión'], ['music', 'Notas musicales'], ['film', 'Claqueta de cine'],
    ['crown', 'Corona'], ['star', 'Estrella'], ['gift', 'Regalo'], ['tree', 'Árbol'], ['snowflake', 'Copo de nieve'],
    ['bell', 'Campana'], ['candy', 'Bastón de caramelo'], ['ornament', 'Bola de Navidad'], ['mug', 'Taza'],
    ['gingerbread', 'Galleta de jengibre'], ['candle', 'Vela'], ['snowman', 'Muñeco de nieve'],
  ];
  const RARITIES = [['comun', 'Común · marco clásico'], ['rara', 'Rara · marco dorado'], ['holo', 'Holo · full-art'], ['secreta', 'Secreta · full-art arcoíris']];

  let sel = 1;          // sobre seleccionado
  let draft = null;     // copia en edición
  let dirty = false;
  let catFilter = 'Todos';

  const giftOf = (d) => A.getGifts().find((g) => g.day === d);
  const thumb = (g) => g.image ? `<img src="${esc(g.image)}" alt="">` : art(g.art);
  const dateLabel = (d) => { const dt = A.dayDate(d); return `${dt.getDate()} ${MONTHS[dt.getMonth()]}`; };
  const themeVars = (d) => { const t = THEMES[d] || THEMES[1]; return `--c1:${t.c1};--c2:${t.c2};--c3:${t.c3};`; };

  /* ---------------- pestañas ---------------- */
  const tabs = document.querySelectorAll('.admin__tabs [data-tab]');
  function showTab(name) {
    if (name !== 'premios' && dirty && !confirm('Tienes cambios sin guardar en este premio. ¿Salir sin guardar?')) return;
    if (name !== 'premios' && dirty) discard(true);
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === name)));
    document.querySelectorAll('.admin__tab').forEach((s) => { s.hidden = s.dataset.tab !== name; });
    const panel = document.querySelector('.admin__panel'); if (panel) panel.scrollTop = 0;
    if (name === 'premios') paintPrizes();
    if (name === 'historial') paintHistory();
  }
  tabs.forEach((t) => t.addEventListener('click', () => showTab(t.dataset.tab)));
  A.onAdminOpen(() => {
    updateHistCount();
    const current = document.querySelector('.admin__tabs [aria-selected="true"]');
    if (current && current.dataset.tab === 'premios') paintPrizes();
    if (current && current.dataset.tab === 'historial') paintHistory();
  });

  /* ---------------- formulario ---------------- */
  const form = $('#pzForm');
  form.innerHTML = `
    <h3 class="admin__h3">Editar <span id="pzTitle"></span></h3>
    <div class="pz__type" role="radiogroup" aria-label="Tipo">
      <label><input type="radio" name="type" value="card"><span>🃏 Carta</span></label>
      <label><input type="radio" name="type" value="ticket"><span>🎟 Entrada</span></label>
    </div>
    <label class="fld"><span>Nombre del premio</span><input name="name" maxlength="40" required></label>
    <div class="fld-row">
      <label class="fld"><span>Ilustración</span><select name="art">${ARTS.map(([k, n]) => `<option value="${k}">${n}</option>`).join('')}</select></label>
      <label class="fld"><span>Rareza</span><select name="rarity">${RARITIES.map(([k, n]) => `<option value="${k}">${n}</option>`).join('')}</select></label>
    </div>
    <div class="fld">
      <span>Imagen propia <em>(opcional, sustituye a la ilustración)</em></span>
      <div class="pz__img">
        <label class="btn btn--ghost btn--sm">📷 Subir imagen<input type="file" id="pzFile" accept="image/*" hidden></label>
        <input name="image" placeholder="o ruta: assets/img/dia3.png">
        <button type="button" class="link-btn" id="pzImgClear">Quitar</button>
      </div>
    </div>
    <div class="fld-row">
      <label class="fld"><span>Efecto / ataque <em>(en full-art sale en grande)</em></span><input name="effect" maxlength="28"></label>
      <label class="fld fld--s" data-only="card"><span>Poder</span><input name="power" maxlength="4"></label>
    </div>
    <label class="fld"><span>Descripción <em id="pzCount"></em></span><textarea name="description" rows="3" maxlength="160"></textarea></label>
    <label class="fld" data-only="card"><span>Frase en cursiva <em>(solo cartas clásicas)</em></span><input name="flavor" maxlength="60"></label>
    <div class="fld-grid" data-only="ticket">
      <label class="fld"><span>Fecha</span><input name="ticket.date" maxlength="18"></label>
      <label class="fld"><span>Hora</span><input name="ticket.time" maxlength="10"></label>
      <label class="fld"><span>Lugar</span><input name="ticket.place" maxlength="24"></label>
      <label class="fld"><span>Asiento / detalle</span><input name="ticket.seat" maxlength="24"></label>
    </div>`;

  function fillForm() {
    $('#pzTitle').textContent = `sobre ${pad(sel)} · ${dateLabel(sel)}`;
    form.querySelectorAll('[name]').forEach((el) => {
      const n = el.name;
      if (el.type === 'radio') { el.checked = el.value === (draft.type || 'card'); return; }
      if (el.type === 'file') return;
      let v = n.startsWith('ticket.') ? ((draft.ticket || {})[n.slice(7)] || '') : (draft[n] ?? '');
      if (n === 'image' && String(v).startsWith('data:')) { el.value = ''; el.placeholder = '✓ Imagen subida desde tu dispositivo'; return; }
      if (n === 'image') el.placeholder = 'o ruta: assets/img/dia3.png';
      el.value = v;
    });
    toggleType();
    updateCount();
  }
  function toggleType() {
    const t = draft.type || 'card';
    form.querySelectorAll('[data-only]').forEach((el) => { el.hidden = el.dataset.only !== t; });
  }
  function updateCount() { $('#pzCount').textContent = `${(draft.description || '').length}/160`; }

  let previewT;
  function paintPreview() {
    clearTimeout(previewT);
    previewT = setTimeout(() => { $('#pzPreview').innerHTML = A.cardHTML(cleanGift(draft)); }, 60);
  }
  function setDirty(v) {
    dirty = v;
    $('#pzSave').disabled = !v; $('#pzDiscard').disabled = !v;
    $('#pzStatus').textContent = v ? '● Cambios sin guardar' : (A.hasLocalGifts() ? '✓ Guardado en este navegador' : 'Usando los premios de gifts.js');
    $('#pzStatus').classList.toggle('is-dirty', v);
  }

  form.addEventListener('input', (e) => {
    const el = e.target; if (!el.name || el.type === 'file') return;
    if (el.type === 'radio') { draft.type = el.value; toggleType(); }
    else if (el.name.startsWith('ticket.')) { draft.ticket = draft.ticket || {}; draft.ticket[el.name.slice(7)] = el.value; }
    else draft[el.name] = el.value;
    if (el.name === 'description') updateCount();
    setDirty(true); paintPreview();
  });
  form.addEventListener('submit', (e) => { e.preventDefault(); save(); });

  /* imagen subida → se reduce a 600 px y se guarda dentro del premio */
  $('#pzFile').addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0]; e.target.value = '';
    if (!f) return;
    const img = new Image();
    const url = URL.createObjectURL(f);
    img.onload = () => {
      const max = 600, k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      const keepAlpha = /png|webp|gif|svg/.test(f.type);
      draft.image = c.toDataURL(keepAlpha ? 'image/png' : 'image/jpeg', 0.86);
      URL.revokeObjectURL(url);
      fillForm(); setDirty(true); paintPreview();
      toast('📷 Imagen cargada. Pulsa «Guardar premio».');
    };
    img.onerror = () => { URL.revokeObjectURL(url); toast('No se ha podido leer esa imagen.'); };
    img.src = url;
  });
  $('#pzImgClear').addEventListener('click', () => { delete draft.image; fillForm(); setDirty(true); paintPreview(); });

  /* limpia campos vacíos o que no tocan según el tipo */
  function cleanGift(g) {
    const o = { day: g.day, type: g.type === 'ticket' ? 'ticket' : 'card' };
    ['rarity', 'name', 'art', 'image', 'effect', 'power', 'description', 'flavor'].forEach((k) => {
      const v = typeof g[k] === 'string' ? g[k].trim() : g[k];
      if (v) o[k] = v;
    });
    if (!o.name) o.name = 'Regalo sorpresa';
    if (!o.art) o.art = 'gift';
    if (!o.rarity) o.rarity = 'comun';
    if (o.type === 'ticket') {
      delete o.power; delete o.flavor;
      const t = g.ticket || {};
      o.ticket = { date: t.date || '', time: t.time || '', place: t.place || '', seat: t.seat || '' };
    }
    return o;
  }

  /* ---------------- lista de sobres ---------------- */
  function paintList() {
    $('#pzList').innerHTML = A.getGifts().map((g) => `
      <li><button type="button" class="pz__item${g.day === sel ? ' is-sel' : ''}" data-day="${g.day}" style="${themeVars(g.day)}">
        <span class="pz__thumb">${thumb(g)}</span>
        <span class="pz__meta"><small>Sobre ${pad(g.day)} · ${dateLabel(g.day)}${A.isOpened(g.day) ? ' · abierto' : ''}</small><b>${esc(g.name)}</b></span>
      </button></li>`).join('');
  }
  $('#pzList').addEventListener('click', (e) => {
    const b = e.target.closest('.pz__item'); if (!b) return;
    const d = Number(b.dataset.day);
    if (d === sel) return;
    if (dirty && !confirm('Tienes cambios sin guardar en este premio. ¿Descartarlos?')) return;
    select(d);
  });
  function select(d) {
    sel = d; draft = clone(giftOf(d)); setDirty(false);
    paintList(); fillForm(); paintPreview();
  }
  function paintPrizes() { if (!draft || !dirty) draft = clone(giftOf(sel)); paintList(); fillForm(); paintPreview(); setDirty(dirty); }

  /* ---------------- guardar / descartar ---------------- */
  function save() {
    const before = clone(A.getGifts());
    const old = giftOf(sel);
    const next = before.map((g) => (g.day === sel ? cleanGift(draft) : g));
    if (!A.setGifts(next)) { toast('⚠️ No cabe en el navegador: usa una imagen más pequeña.'); return; }
    const nu = next.find((g) => g.day === sel);
    const label = old.name !== nu.name ? `Sobre ${pad(sel)}: «${old.name}» → «${nu.name}»` : `Sobre ${pad(sel)}: editado «${nu.name}»`;
    logHistory(label, sel, before);
    draft = clone(nu); setDirty(false); paintList(); paintPreview();
    toast('✅ Premio guardado');
  }
  function discard(silent) { draft = clone(giftOf(sel)); setDirty(false); fillForm(); paintPreview(); if (!silent) toast('Cambios descartados'); }
  $('#pzSave').addEventListener('click', save);
  $('#pzDiscard').addEventListener('click', () => discard(false));

  $('#pzResetAll').addEventListener('click', () => {
    if (!confirm('¿Volver a los premios originales de gifts.js? (Quedará en el historial por si quieres deshacerlo.)')) return;
    const before = clone(A.getGifts());
    A.resetGifts();
    logHistory('Restablecidos todos los premios de gifts.js', 0, before);
    select(sel);
    toast('Premios de gifts.js restaurados');
  });

  /* ---------------- catálogo ---------------- */
  const catEl = $('#pzCatalog');
  document.body.appendChild(catEl); // fuera del panel para que se superponga bien
  const cats = ['Todos', ...new Set(CATALOG.map((c) => c.cat))];
  $('#catChips').innerHTML = cats.map((c) => `<button type="button" class="chip-btn" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
  function openCatalog() {
    $('#catFor').textContent = `sobre ${pad(sel)} (${dateLabel(sel)})`;
    catEl.hidden = false; $('#catSearch').value = ''; paintCatalog();
    setTimeout(() => $('#catSearch').focus(), 50);
  }
  function closeCatalog() { catEl.hidden = true; }
  function paintCatalog() {
    const q = $('#catSearch').value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    document.querySelectorAll('#catChips .chip-btn').forEach((b) => b.classList.toggle('is-on', b.dataset.cat === catFilter));
    const used = new Map(A.getGifts().map((g) => [g.name, g.day]));
    const list = CATALOG.map((c, i) => ({ c, i })).filter(({ c }) => {
      if (catFilter !== 'Todos' && c.cat !== catFilter) return false;
      if (!q) return true;
      return `${c.name} ${c.cat} ${c.description} ${c.effect}`.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(q);
    });
    $('#catGrid').innerHTML = list.length ? list.map(({ c, i }) => `
      <button type="button" class="cat__item" data-i="${i}">
        <span class="cat__art">${art(c.art)}</span>
        <b>${esc(c.name)}</b>
        <small>${c.type === 'ticket' ? '🎟 Entrada' : '🃏 ' + (RAR_NAME[c.rarity] || 'Carta')}</small>
        ${used.has(c.name) ? `<em>En sobre ${pad(used.get(c.name))}</em>` : ''}
      </button>`).join('') : '<p class="cat__empty">No hay nada con ese nombre. Prueba otra búsqueda o crea el premio a mano.</p>';
  }
  $('#pzOpenCat').addEventListener('click', openCatalog);
  $('#catClose').addEventListener('click', closeCatalog);
  $('#catSearch').addEventListener('input', paintCatalog);
  $('#catChips').addEventListener('click', (e) => { const b = e.target.closest('.chip-btn'); if (!b) return; catFilter = b.dataset.cat; paintCatalog(); });
  $('#catGrid').addEventListener('click', (e) => {
    const b = e.target.closest('.cat__item'); if (!b) return;
    const c = clone(CATALOG[Number(b.dataset.i)]);
    delete c.cat;
    draft = Object.assign({ day: sel }, c);
    closeCatalog(); fillForm(); setDirty(true); paintPreview();
    toast(`📦 «${c.name}» cargado en el sobre ${pad(sel)}. Revisa y pulsa «Guardar premio».`);
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !catEl.hidden) { e.stopImmediatePropagation(); closeCatalog(); }
  }, true);

  /* ---------------- historial ---------------- */
  const HKEY = ':history';
  const getHist = () => A.store.get(HKEY, []) || [];
  function logHistory(label, day, before) {
    let h = getHist();
    h.unshift({ ts: Date.now(), label, day, before });
    h = h.slice(0, 30);
    while (!A.store.set(HKEY, h)) {
      if (h.length <= 1) { toast('⚠️ El historial no cabe en el navegador.'); break; }
      h.pop(); // si no cabe (imágenes grandes), se descartan los cambios más antiguos
    }
    updateHistCount();
  }
  function updateHistCount() { const n = getHist().length; $('#histCount').textContent = n ? n : ''; }
  function fmtTs(ts) {
    const d = new Date(ts);
    return `${d.getDate()} ${MONTHS[d.getMonth()]} · ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }
  function paintHistory() {
    const h = getHist();
    $('#histList').innerHTML = h.length ? h.map((e, i) => {
      const g = e.day ? (e.before || []).find((x) => x.day === e.day) : null;
      return `<li class="hist__item" style="${e.day ? themeVars(e.day) : ''}">
        <span class="hist__dot"></span>
        <div class="hist__body">
          <small>${fmtTs(e.ts)}${i === 0 ? ' · último cambio' : ''}</small>
          <b>${esc(e.label)}</b>
          ${g ? `<span class="hist__prev">Antes: ${esc(g.name)} · ${g.type === 'ticket' ? 'entrada' : (RAR_NAME[g.rarity] || '').toLowerCase()}</span>` : ''}
        </div>
        <button type="button" class="btn btn--ghost btn--sm" data-restore="${i}">↩ Volver a antes</button>
      </li>`;
    }).join('') : '<li class="hist__empty">Aún no hay cambios. Edita un premio en <b>🎁 Premios</b> y aparecerá aquí.</li>';
    updateHistCount();
  }
  $('#histList').addEventListener('click', (e) => {
    const b = e.target.closest('[data-restore]'); if (!b) return;
    const entry = getHist()[Number(b.dataset.restore)];
    if (!entry || !confirm(`¿Volver al estado anterior a:\n«${entry.label}»?`)) return;
    const before = clone(A.getGifts());
    if (!A.setGifts(entry.before)) { toast('⚠️ No se ha podido restaurar (sin espacio).'); return; }
    logHistory(`↩ Restaurado: antes de «${entry.label}»`, entry.day, before);
    draft = null; dirty = false;
    paintHistory();
    toast('↩ Premios restaurados');
  });
  $('#histClear').addEventListener('click', () => {
    if (!confirm('¿Borrar todo el historial? Los premios actuales no cambian.')) return;
    A.store.set(HKEY, []); paintHistory();
  });

  /* ---------------- descargar gifts.js ---------------- */
  function giftsFile() {
    const S = A.getSchedule();
    const order = ['day', 'type', 'rarity', 'name', 'art', 'image', 'effect', 'power', 'description', 'flavor', 'ticket'];
    const val = (v) => (v && typeof v === 'object')
      ? '{ ' + Object.entries(v).map(([k, x]) => `${k}: ${JSON.stringify(x)}`).join(', ') + ' }'
      : JSON.stringify(v);
    const body = A.getGifts().map((g) => {
      const lines = order.filter((k) => g[k] !== undefined && g[k] !== null && g[k] !== '').map((k) => `      ${k}: ${val(g[k])},`);
      return `    // ───────────────────────── SOBRE ${g.day} ─────────────────────────\n    {\n${lines.join('\n')}\n    },`;
    }).join('\n\n');
    const now = new Date();
    return `/* =====================================================================
   🎁  ZONA DE REGALOS  ·  generado desde el ⚙ Panel de admin
   (${now.toLocaleString('es-ES')})
   =====================================================================
   Campos: day, type ('card'|'ticket'), rarity ('comun'|'rara'|'holo'|'secreta'),
   name, art, image, effect, power, description, flavor,
   ticket { date, time, place, seat }.
   Más detalles en el README. Truco: ?preview desbloquea todo.
   ===================================================================== */
window.ADVIENTO = {
  owner: ${JSON.stringify(CFG.owner)},
  year: ${CFG.year},

  /* 📅 mode: 'pares' | 'impares' | 'todos' (12 seguidos desde startDay) */
  schedule: { mode: '${S.mode}', month: ${S.month}, startDay: ${S.startDay} },

  // 🔐 PIN del panel de admin ('' = sin PIN)
  adminPin: ${JSON.stringify(String(CFG.adminPin || ''))},

  gifts: [
${body}
  ],
};
`;
  }
  $('#pzDownload').addEventListener('click', () => {
    if (dirty && !confirm('El premio que estás editando tiene cambios sin guardar y no se incluirán. ¿Descargar igualmente?')) return;
    const blob = new Blob([giftsFile()], { type: 'text/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'gifts.js';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    toast('⬇ gifts.js descargado: sustitúyelo en assets/js/ y publica');
  });

  updateHistCount();
})();
