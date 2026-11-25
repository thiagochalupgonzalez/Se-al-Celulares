/* =====================================================================
   app.js - Lógica del sitio "Señal" (se carga en todas las páginas)
   Bloques:
     1. Utilidades y textos (español / inglés)
     2. Idioma (toggle ES / EN)
     3. Catálogo (tarjetas armadas con los datos de la base de datos)
     4. Ventana de detalle
     5. Ventana de compra (simulada)
     6. Ventana de canje (comparador)
     7. Letra grande
   Los datos vienen de datos/celulares.js (constante DATOS), generado
   por base-de-datos/construir_base.py. Los bloques 3 a 6 solo corren
   si la página tiene catálogo (index.html).
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- 1. Utilidades y textos ---------- */
  const $ = function (id) { return document.getElementById(id); };
  const money = function (n) { return '$ ' + Math.round(n).toLocaleString('es-AR'); };
  const num = function (texto) { return Number(String(texto).replace(/\D/g, '')); };
  // Para buscar sin importar mayúsculas ni tildes: "linea" encuentra "Línea".
  const normalizar = function (s) { return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); };

  let lang = 'es';
  try { lang = localStorage.getItem('idioma') === 'en' ? 'en' : 'es'; } catch (e) { /* sin almacenamiento: queda en español */ }

  // Textos que se arman desde JavaScript (los del HTML usan data-i18n).
  const L = {
    es: {
      quiero: 'Lo quiero', cuotas: 'o 12 cuotas sin interés', usado: 'Usado', recomendado: 'Recomendado para Mirta',
      porque: 'Por qué: es nuevo, tiene descuento, batería para todo el día y lo podés retirar hoy.', estado: 'Estado', salud: 'Salud de batería',
      pantalla: 'Pantalla', memoria: 'Memoria', camara: 'Cámara', bateria: 'Batería', red: 'Conectividad', colores: 'Colores',
      garantia: 'Garantía', pulg: 'pulg.', meses: 'meses', cargaDe: 'carga de', sinDesc: 'Sin descuento', elegi: 'Elegí una sucursal',
      cuotasDe: function (c, m) { return c + ' cuotas sin interés de ' + m; },
      ok: function (n) { return '¡Gracias, ' + n + '! Esto fue una simulación: no se guardó ni se envió ningún dato.'; },
      vale: function (m, v) { return 'Tu ' + m + ' vale ' + v + ' como parte de pago.'; },
      noCotiza: 'No tenemos cotización para ese modelo. Elegí uno de la lista.',
      escribi: 'Escribí o elegí el modelo de tu celular.'
    },
    en: {
      quiero: 'I want it', cuotas: 'or 12 interest-free installments', usado: 'Used', recomendado: 'Recommended for Mirta',
      porque: 'Why: it is new, discounted, has an all-day battery and you can pick it up today.', estado: 'Condition', salud: 'Battery health',
      pantalla: 'Display', memoria: 'Memory', camara: 'Camera', bateria: 'Battery', red: 'Connectivity', colores: 'Colors',
      garantia: 'Warranty', pulg: 'in', meses: 'months', cargaDe: 'charging at', sinDesc: 'No discount', elegi: 'Choose a branch',
      cuotasDe: function (c, m) { return c + ' interest-free installments of ' + m; },
      ok: function (n) { return 'Thank you, ' + n + '! This was a simulation: no data was saved or sent.'; },
      vale: function (m, v) { return 'Your ' + m + ' is worth ' + v + ' as part of the payment.'; },
      noCotiza: 'We have no valuation for that model. Choose one from the list.',
      escribi: 'Type or choose your phone model.'
    }
  };
  const COLORES_EN = { 'azul marino': 'navy blue', gris: 'gray', fucsia: 'fuchsia', negro: 'black', grafito: 'graphite', azul: 'blue', rosa: 'pink' };

  // Traducciones al inglés de los textos del HTML (el español original queda en el propio HTML).
  const EN = {
    salto: 'Skip to content', nav_ofertas: 'Deals', nav_baratos: 'Good and cheap', nav_premium: 'Premium',
    nav_quienes: 'About us', nav_glosario: 'Glossary', nav_mirta: 'For Mirta', nav_guia: 'Easy guide', letra: 'Large text',
    mi_t: 'This page is designed for Mirta',
    mi_p: 'Mirta is 62 and her phone broke. She needs one today that is easy to use and does not cost too much.',
    mi_r: 'What Mirta is looking for is in Deals: we recommend the Línea G 5G.',
    mi_n: 'What Mirta needs and how we help her',
    n1_t: 'Call her family and use WhatsApp', n1_d: 'All our phones can do it. The recommended one has an all-day battery.',
    n2_t: 'Get it today', n2_d: 'She picks it up at the branch the same day, showing her ID.',
    n3_t: 'Not overspend', n3_d: 'Discounted deals. She pays cash at pick-up or in interest-free installments.',
    n4_t: 'Understand everything without hard words', n4_d: 'Large text, simple explanations and a glossary. There is a button at the top to make the text even bigger.',
    mi_b1: 'See the recommended phone', mi_b2: 'Get help', gu_link: 'See contacts', f_soporte: 'Support',
    /* terminos.html y sostenibilidad.html */
    t_t: 'Terms and conditions',
    t_p: 'Last updated: October 2026. Sample text for a school project: it is not legal advice.',
    t1_t: '1. Who offers this site',
    t1_d: 'Señal is a fictional store created for a school project. It does not sell real products or charge money.',
    t2_t: '2. Use of the site and data that is stored',
    t2_d: 'You can browse without creating an account. The site only stores in your browser the language and text size you chose. Fonts and libraries load from external servers (Google Fonts and jsDelivr), which may log your IP address.',
    t3_t: '3. Prices and stock',
    t3_d: 'Prices are in Argentine pesos and are examples. When there is a discount, we show the list price crossed out and the price you pay. Stock is shown per branch and may change.',
    t4_t: '4. Honesty in deals and used phones',
    t4_d: 'For each used phone we state its flaws (for example, a scratch on the frame), its battery health and its warranty. We do not use fake countdowns or pressuring messages. Someone needing a phone urgently is no reason to rush them: we show available stock and quick pick-up, and let them decide calmly.',
    t5_t: '5. Purchase and payment',
    t5_d: 'Purchases on this site are a simulation: do not enter real card data, because nothing is sent or saved. In a real store, a certified provider would process the payment and the security code would never be stored.',
    t6_t: '6. Branch pick-up',
    t6_d: 'We hold the phone for 48 hours. It is picked up with the buyer\'s ID and paid in cash at pick-up.',
    t7_t: '7. Warranty',
    t7_d: 'New phones have a 12-month warranty and used ones, 3 months.',
    t8_t: '8. Right of withdrawal',
    t8_d: 'For distance purchases, consumers can change their mind within 10 calendar days, under article 34 of Argentina\'s Consumer Protection Law (Law 24,240).',
    t9_t: '9. Personal data protection',
    t9_d: 'We only ask for the data we need (first name, last name and email). We do not store ID numbers or card details. Under Argentina\'s Personal Data Protection Law (Law 25,326), you can request access to, correction of or deletion of your data.',
    t10_t: '10. Accessibility and inclusion',
    t10_d: 'We designed the site so anyone can use it: large text, good contrast, keyboard navigation, a simple menu and the option to view it in Spanish or English.',
    t11_t: '11. Changes to these terms',
    t11_d: 'We may update this text. The date at the top shows the last change.',
    h_t: 'The site\'s carbon footprint',
    h_p: 'Every page that is downloaded uses energy in servers, networks and devices. The lighter it is, the less energy it uses.',
    h1_t: '1. How much our site weighs',
    h1_d: 'Weight of the home page\'s own files, measured in the project folder (uncompressed):',
    h_datos: 'Data (celulares.js)',
    h_img: 'SVG images',
    h_total: 'Own total',
    h1_ext: 'External resources (Bootstrap, icons and fonts) are added to this. They must be measured with the <em>Network</em> tab (F12) once the site is published.',
    h2_t: '2. Decisions that reduce the weight',
    h2_a: 'The phones are SVG drawings (lightweight text) instead of photos.',
    h2_b: 'There are no videos or animation libraries.',
    h2_c: 'A single font family with three weights.',
    h2_d: 'Catalog images use <code>loading="lazy"</code>: they download only when needed.',
    h2_e: 'The data travels in a single file and our own JavaScript uses no extra libraries.',
    h3_t: '3. Simulation',
    h3_f: 'Formula: <strong>CO₂ (g) = weight (GB) × energy (kWh/GB) × intensity (g CO₂/kWh)</strong>. The energy and intensity values are approximate reference assumptions: replace them with those from the source you cite.',
    h_l1: 'Own weight (MB)',
    h_l2: 'External resources (MB, estimate)',
    h_l3: 'Visits per month',
    h_l4: 'Energy (kWh per GB)',
    h_l5: 'Intensity (g CO₂ per kWh)',
    h_l6: 'If we used real photos: extra MB per visit (e.g. 8 photos of 0.4 MB)',
    h_med: 'For an independent measurement once the site is published, you can use <a href="https://www.websitecarbon.com/" rel="noopener" target="_blank">Website Carbon Calculator</a> and check the methodology at <a href="https://sustainablewebdesign.org/" rel="noopener" target="_blank">Sustainable Web Design</a>.',
    h_rv: 'Per visit:',
    h_rm: 'Per month:',
    h_rf: 'With real photos, per month:',
    volver: 'Back to home',
    so_t: 'Support', so_p: 'Need help? Contact us the way that suits you best.',
    so_tel: 'Phone', so_tel_h: 'Monday to Friday, 9 am to 6 pm.', so_tel_b: 'Call',
    so_wa_h: 'Monday to Saturday, 9 am to 8 pm.', so_wa_b: 'Message on WhatsApp',
    so_mail: 'Email', so_mail_h: 'We reply within 24 hours.', so_mail_b: 'Send an email',
    so_nota: 'Example contact details, created for a school project.',
    gu_t: 'Easy guide: how to buy in 5 steps',
    gu1_t: 'Look at the deals', gu1_d: 'Scroll down to "Phones on sale". The recommended one has a blue label.',
    gu2_t: 'Tap "I want it"', gu2_d: 'A window opens with the price and everything the phone includes.',
    gu3_t: 'Tap "Buy this phone"', gu3_d: 'Type your first name, last name and ID number.',
    gu4_t: 'Choose "Pay cash and pick up"', gu4_d: 'Choose the branch closest to you. We hold the phone for 48 hours.',
    gu5_t: 'Pick it up with your ID', gu5_d: 'You pay there and take it home working.',
    gu_ayuda: 'Stuck on a step? Message or call us and we will help you.',
    hero_t: 'Do you need a phone today?',
    hero_p: 'We help you choose one that is simple, reliable and well priced. You can pick up many models today.',
    buscar_l: 'Search for your phone by name', buscar_ph: 'E.g.: Línea G', sello: 'Pick it up today at a branch',
    sin_res: 'We found no phones with that name.',
    of_t: 'Phones on sale', of_p: 'New phones with a discount and checked used ones, with details and warranty.',
    ba_t: 'Good and cheap', ba_p: 'All-day battery and good memory without overspending.',
    pr_t: 'The most premium', pr_p: 'The best display, camera and ultra-fast charging.',
    c_t: 'Do you have an old phone?', c_d: 'Hand it in as part of the payment and pay less.', c_b: 'Trade in my phone',
    q_t: 'About us',
    q_1: 'We are Señal, a phone store made for people who need to sort things out quickly and without hassle. We know that when your phone breaks everything gets harder: you cannot call your family, handle paperwork or ask for help.',
    q_2: 'That is why we show few models, well explained and with clear prices. We split them into three groups (deals, good and cheap, and premium) so you can choose without feeling overwhelmed. If a phone is used, we honestly tell you its flaws.',
    g_t: 'Technical glossary', g_p: 'Words you will find when choosing a phone.',
    g_h1: 'Term', g_h2: 'Meaning',
    gl1_t: 'RAM', gl1_d: 'The memory the phone uses to run several apps at once.',
    gl2_t: 'Storage', gl2_d: 'The space to keep photos, apps and files.',
    gl3_t: 'Refresh rate (Hz)', gl3_d: 'How many times per second the image refreshes: more Hz means smoother motion.',
    gl4_t: 'Battery capacity (mAh)', gl4_d: 'The energy the battery stores: more mAh means more hours of use.',
    gl5_t: 'Fast charging (W)', gl5_d: 'The charger power: more W means less time to charge.',
    gl6_t: 'Camera (MP)', gl6_d: 'Megapixels show how detailed the photos are.',
    gl7_t: 'Display panel', gl7_d: 'The type of screen. AMOLED and pOLED show deeper blacks than LCD.',
    gl8_t: '4G or 5G network', gl8_d: 'The mobile network generation. 5G is faster where coverage exists.',
    gl9_t: 'Warranty', gl9_d: 'The time during which the store repairs or replaces the phone if it fails.',
    f_contacto: 'Contact', f_tel: 'Call us: +54 11 0000-0000', f_redes: 'Follow us', f_info: 'More information',
    f_terminos: 'Terms and conditions', f_huella: 'Carbon footprint', f_diseno: 'Project design',
    f_fict: 'Fictional store made for a school project. Example prices and data.',
    d_comprar: 'Buy this phone', d_seguir: 'Keep browsing', cerrar: 'Close',
    cm_t: 'Buy this phone', cm_aviso: 'Example purchase for a school project: do not enter real card data. Nothing is sent or saved.',
    r_equipo: 'Phone', r_precio: 'Price', r_desc: 'Discount', r_total: 'Total',
    f_nombre: 'First name', f_apellido: 'Last name', f_dni: 'ID number (DNI)', f_banco: 'Bank or wallet discount',
    f_sinpromo: 'No promotion', f_tarjeta: 'Pay by card', f_efectivo: 'Pay cash and pick up',
    f_numero: 'Card number', f_venc: 'Expiry', f_codigo: 'Security code', f_cuotas: 'Installments',
    f_sucursal: 'Pick-up branch', f_reserva: 'We hold your phone for 48 hours. You pay cash when you pick it up, with your ID.',
    cm_cancelar: 'Cancel', cm_confirmar: 'Confirm purchase',
    s1_t: 'How do we protect your data?',
    s1a: 'Encrypted connection: the address starts with https and shows a padlock.',
    s1b: 'We never store your card\'s security code.',
    s1c: 'We never ask for passwords or codes sent to you by message.',
    s2_t: 'What are the benefits of buying safely?',
    s2a: 'Invoice in your name and a phone warranty.',
    s2b: 'Branch pick-up with your ID: nobody else can take your phone.',
    s2c: 'You can change your mind: you have 10 calendar days for distance purchases.',
    ca_t: 'Trade in your phone', ca_modelo: 'Your phone model', ca_ph: 'E.g.: Señal Pro X2s', ca_estado: 'Condition',
    est1: 'Excellent', est2: 'Good', est3: 'With wear',
    th_equipo: 'Phone', th_precio: 'Price', th_desc: 'We deduct', th_pagas: 'You pay',
    ca_nota: 'Example values. The discount never exceeds the new phone\'s price.'
  };

  /* ---------- 2. Idioma ---------- */
  // Cada elemento con data-i18n guarda su texto en español la primera vez y lo cambia según el idioma.
  function aplicarIdioma() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (el.dataset.es === undefined) { el.dataset.es = el.textContent; }
      el.textContent = (lang === 'en' && EN[el.dataset.i18n]) ? EN[el.dataset.i18n] : el.dataset.es;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      if (el.dataset.esHtml === undefined) { el.dataset.esHtml = el.innerHTML; }
      el.innerHTML = (lang === 'en' && EN[el.dataset.i18nHtml]) ? EN[el.dataset.i18nHtml] : el.dataset.esHtml;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      if (el.dataset.esPh === undefined) { el.dataset.esPh = el.placeholder; }
      el.placeholder = (lang === 'en' && EN[el.dataset.i18nPh]) ? EN[el.dataset.i18nPh] : el.dataset.esPh;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      if (el.dataset.esAria === undefined) { el.dataset.esAria = el.getAttribute('aria-label'); }
      el.setAttribute('aria-label', (lang === 'en' && EN[el.dataset.i18nAria]) ? EN[el.dataset.i18nAria] : el.dataset.esAria);
    });
    if ($('idioma')) { $('idioma').textContent = lang === 'es' ? 'EN' : 'ES'; }
    if (typeof DATOS !== 'undefined') { renderCatalogo(); actualizarCompra(); comparar(); }
    document.dispatchEvent(new Event('idioma-cambiado'));   // avisa a huella.js para reescribir los números
  }

  /* ---------- 3. Catálogo ---------- */
  const nombreDe = function (p) { return lang === 'en' ? p.nombre.replace('(usado)', '(used)') : p.nombre; };

  // Devuelve el HTML de una tarjeta de celular.
  function tarjeta(p) {
    const t = L[lang];
    const dto = p.precio < p.precio_lista ? Math.round((1 - p.precio / p.precio_lista) * 100) : 0;
    const etiqueta = p.recomendado ? '<span class="etiqueta etiqueta-recomendado"><i class="bi bi-star-fill" aria-hidden="true"></i> ' + t.recomendado + ' (-' + dto + '%)</span>'
                   : p.estado === 'usado' ? '<span class="etiqueta etiqueta-usado">' + t.usado + '</span>'
                   : dto ? '<span class="etiqueta">-' + dto + '%</span>' : '';
    const motivo = p.recomendado ? '<p class="motivo">' + t.porque + '</p>' : '';
    const antes = dto ? '<s>' + money(p.precio_lista) + '</s> ' : '';
    return '<div class="col"><article class="card tarjeta h-100' + (p.recomendado ? ' recomendada' : '') + '">' + etiqueta +
      '<div class="tarjeta-imagen"><img src="img/' + p.imagen + '" alt="' + nombreDe(p) + '" width="200" height="400" loading="lazy"></div>' +
      '<div class="card-body d-flex flex-column"><h3 class="card-title">' + nombreDe(p) + '</h3>' +
      '<p class="card-text">' + p['descripcion_' + lang] + '</p>' + motivo +
      '<div class="precio mt-auto">' + antes + money(p.precio) + ' <small>' + t.cuotas + '</small></div>' +
      '<button class="btn btn-acento mt-3" type="button" data-bs-toggle="modal" data-bs-target="#detalle" data-id="' + p.id_producto + '">' + t.quiero + '</button>' +
      '</div></article></div>';
  }

  // Dibuja las tres secciones. La sección de cada celular la decidió la base de datos (campo "seccion").
  function renderCatalogo() {
    const q = normalizar($('buscador') ? $('buscador').value : '').trim();
    const visibles = DATOS.productos.filter(function (p) { return normalizar(nombreDe(p)).includes(q); });
    ['ofertas', 'baratos', 'premium'].forEach(function (s) {
      const lista = document.querySelector('[data-lista="' + s + '"]');
      const items = visibles.filter(function (p) { return p.seccion === s; })
                            .sort(function (a, b) { return b.recomendado - a.recomendado; });   // el recomendado, primero
      lista.innerHTML = items.map(tarjeta).join('');
      $(s).hidden = q !== '' && items.length === 0;      // con búsqueda, se ocultan las secciones sin resultados
    });
    $('sin-resultados').hidden = !(q !== '' && visibles.length === 0);
  }

  /* ---------- 4. Ventana de detalle ---------- */
  let actual = null;   // celular elegido

  // Filas de la tabla de características, armadas con los datos numéricos de la base.
  function filas(p) {
    const t = L[lang];
    const n = function (x) { return x.toLocaleString(lang === 'es' ? 'es-AR' : 'en-US'); };
    const f = [];
    if (p.estado === 'usado') {
      f.push([t.estado, t.usado + ': ' + p['observaciones_' + lang]], [t.salud, p.bateria_salud + '%']);
    }
    f.push([t.pantalla, n(p.pantalla_pulg) + ' ' + t.pulg + ' ' + p.panel + ', ' + p.hz + ' Hz']);
    f.push([t.memoria, p.ram_gb + ' GB RAM + ' + p.almacenamiento_gb + ' GB']);
    f.push([t.camara, p.camara_mp + ' MP']);
    f.push([t.bateria, n(p.bateria_mah) + ' mAh, ' + t.cargaDe + ' ' + p.carga_w + ' W']);
    f.push([t.red, p.red]);
    f.push([t.colores, p.colores.split(',').map(function (c) { return lang === 'en' ? (COLORES_EN[c] || c) : c; }).join(', ')]);
    f.push([t.garantia, p.garantia_meses + ' ' + t.meses]);
    return f;
  }

  function llenarDetalle() {
    $('detalle-titulo').textContent = nombreDe(actual);
    $('detalle-img').src = 'img/' + actual.imagen;
    $('detalle-img').alt = nombreDe(actual);
    $('detalle-precio').textContent = money(actual.precio);
    $('detalle-specs').innerHTML = filas(actual).map(function (f) { return '<tr><th scope="row">' + f[0] + '</th><td>' + f[1] + '</td></tr>'; }).join('');
  }

  function iniciarDetalle() {
    $('detalle').addEventListener('show.bs.modal', function (e) {
      actual = DATOS.productos.find(function (p) { return p.id_producto === Number(e.relatedTarget.dataset.id); });
      llenarDetalle();
    });
  }

  /* ---------- 5. Ventana de compra (simulada: no se envía ni se guarda nada) ---------- */
  function actualizarCompra() {
    if (!actual) { return; }
    const d = Number($('banco').selectedOptions[0].dataset.desc);
    const total = actual.precio * (1 - d / 100);
    const c = Number($('cuotas').value);
    const efectivo = $('efectivo').checked;
    $('c-equipo').textContent = nombreDe(actual);
    $('c-precio').textContent = money(actual.precio);
    $('c-desc').textContent = d ? '-' + money(actual.precio - total) + ' (' + d + '%)' : L[lang].sinDesc;
    $('c-total').textContent = money(total);
    $('c-cuotas').textContent = !efectivo && c > 1 ? L[lang].cuotasDe(c, money(total / c)) : '';
    // fieldset desactivado = sus campos no se validan ni se exigen
    $('grupo-tarjeta').disabled = efectivo;  $('grupo-tarjeta').hidden = efectivo;
    $('grupo-retiro').disabled = !efectivo;  $('grupo-retiro').hidden = !efectivo;
  }

  // Solo se ofrecen las sucursales donde hay unidades del celular elegido (unidades > 0).
  function llenarSucursales() {
    const con = DATOS.stock.filter(function (s) { return s.id_producto === actual.id_producto && s.unidades > 0; })
                           .map(function (s) { return s.id_sucursal; });
    $('sucursal').innerHTML = '<option value="">' + L[lang].elegi + '</option>' +
      DATOS.sucursales.filter(function (s) { return con.includes(s.id_sucursal); })
                      .map(function (s) { return '<option value="' + s.id_sucursal + '">' + s.nombre + '</option>'; }).join('');
  }

  function iniciarCompra() {
    const compra = new bootstrap.Modal($('compra'));
    // Bootstrap no apila dos ventanas: se cierra la de detalle y, al terminar, se abre la de compra.
    $('ir-comprar').addEventListener('click', function () {
      $('detalle').addEventListener('hidden.bs.modal', function () {
        $('form-compra').reset(); llenarSucursales(); actualizarCompra(); $('compra-ok').hidden = true; compra.show();
      }, { once: true });
      bootstrap.Modal.getInstance($('detalle')).hide();
    });
    ['banco', 'cuotas', 'tarjeta', 'efectivo'].forEach(function (id) { $(id).addEventListener('change', actualizarCompra); });
    $('form-compra').addEventListener('submit', function (e) {
      e.preventDefault();                                   // no se envía nada a ningún servidor
      $('compra-ok').textContent = L[lang].ok($('c-nombre').value);
      $('compra-ok').hidden = false;
      e.target.reset(); llenarSucursales(); actualizarCompra();
    });
  }

  /* ---------- 6. Ventana de canje ---------- */
  // Valor de ejemplo de cada modelo usado en buen estado (inventado para el trabajo).
  const VALORES = { 'Señal Pro X2s': 180000, 'Señal Lite X1': 90000, 'Línea G Play': 70000, 'Edge Plus 2023': 250000, 'Razr 2022': 200000 };

  function comparar() {
    const txt = $('canje-modelo').value.trim().toLowerCase();
    const modelo = Object.keys(VALORES).find(function (k) { return k.toLowerCase() === txt; });
    if (!modelo) {
      $('canje-resultado').innerHTML = '';
      $('canje-msg').textContent = txt ? L[lang].noCotiza : L[lang].escribi;
      return;
    }
    const valor = VALORES[modelo] * Number($('canje-estado').value);
    $('canje-msg').textContent = L[lang].vale(modelo, money(valor));
    $('canje-resultado').innerHTML = DATOS.productos.map(function (p) {
      const dto = Math.min(valor, p.precio);                 // el descuento nunca supera el precio
      return '<tr><th scope="row">' + nombreDe(p) + '</th><td>' + money(p.precio) + '</td>' +
             '<td class="text-success fw-semibold">-' + money(dto) + '</td><td class="fw-bold">' + money(p.precio - dto) + '</td></tr>';
    }).join('');
  }

  function iniciarCanje() {
    $('lista-canje').innerHTML = Object.keys(VALORES).map(function (k) { return '<option value="' + k + '">'; }).join('');
    $('canje-modelo').addEventListener('input', comparar);
    $('canje-estado').addEventListener('change', comparar);
    $('canje').addEventListener('show.bs.modal', comparar);
  }

  /* ---------- 7. Letra grande (para leer más cómodo) ---------- */
  function aplicarLetra(grande) {
    document.documentElement.classList.toggle('letra-grande', grande);
    if ($('letra')) { $('letra').setAttribute('aria-pressed', String(grande)); }
  }

  /* ---------- Arranque ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    if ($('idioma')) {
      $('idioma').addEventListener('click', function () {
        lang = lang === 'es' ? 'en' : 'es';
        try { localStorage.setItem('idioma', lang); } catch (e) { /* se ignora */ }
        aplicarIdioma();
      });
    }
    let grande = false;
    try { grande = localStorage.getItem('letra') === 'grande'; } catch (e) { /* se ignora */ }
    aplicarLetra(grande);
    if ($('letra')) {
      $('letra').addEventListener('click', function () {
        grande = !grande;
        try { localStorage.setItem('letra', grande ? 'grande' : 'normal'); } catch (e) { /* se ignora */ }
        aplicarLetra(grande);
      });
    }
    if (typeof DATOS !== 'undefined' && $('detalle')) {
      $('buscador').addEventListener('input', renderCatalogo);
      $('buscador').form.addEventListener('submit', function (e) { e.preventDefault(); });
    }
    aplicarIdioma();                                          // dibuja el catálogo y aplica el idioma guardado
    // Las ventanas necesitan Bootstrap. Se inician al final y solo si cargó, así un fallo de internet
    // no deja la página sin catálogo.
    if (typeof DATOS !== 'undefined' && $('detalle') && typeof bootstrap !== 'undefined') {
      iniciarDetalle(); iniciarCompra(); iniciarCanje();
    }
  });
})();
