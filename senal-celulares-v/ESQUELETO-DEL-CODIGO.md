# Esqueleto del código - Señal

Estructura del proyecto sin el contenido: qué etiquetas, selectores, funciones y tablas hay y en qué orden.
Sirve para analizar el código por partes. Generado automáticamente a partir de los archivos reales.

## 1. Carpetas y archivos

```
README.md
base-de-datos/
  analisis_pandas.py
  construir_base.py
  consultas.sql
  csv/
    celulares.csv
    stock.csv
    sucursales.csv
  datos.sql
  esquema.sql
  senal.db
css/
  index.css
datos/
  celulares.js
diseno.html
herramientas/
  verificar_sitio.py
img/
  edge-max.svg
  edge-ultra.svg
  edge.svg
  favicon.svg
  flip.svg
  hero.svg
  linea-e.svg
  linea-g.svg
  linea-plus.svg
  linea-power.svg
  modelo-er.svg
  wireframe-celular.svg
  wireframe-escritorio.svg
index.html
js/
  app.js
  huella.js
soporte.html
sostenibilidad.html
terminos.html
```

## 2. HTML

### index.html

Página principal. Las tarjetas no están escritas en el HTML: `app.js` las crea dentro de cada `[data-lista]` con los datos de la base.

```html
<a.salto [href=#contenido]>
<header.encabezado>
  <nav.navbar.navbar-expand-xl.limite>
    <a.navbar-brand.marca [href=index.html]>
    <button.navbar-toggler [data-bs-target=#menu] [type=button]>
    <div#menu.collapse.navbar-collapse>
      <ul.navbar-nav>
<main#contenido>
  <section#inicio.hero.limite>
    <div.hero-texto>
      <h1#hero-t>
      <p.hero-bajada>
      <form.buscador [role=search]>
        <label.form-label>
        <input#buscador.form-control.form-control-lg [type=search]>
      <ul.categorias>
    <div.hero-imagen>
      <img [src=img/hero.svg]>
  <p#sin-resultados.vacio.limite [role=status]>
  <section#para-mirta.limite.seccion>
    <div.mirta>
      <h2#mirta-t>
      <p.mirta-lead>
      <p.mirta-respuesta>
      <h3>
      <ul.necesidades>
      <div.mirta-botones>
        <a.btn.btn-acento.btn-lg [href=#ofertas]>
        <a.btn.btn-outline-dark.btn-lg.rounded-pill [href=soporte.html]>
  <section#guia.fondo-humo.seccion>
    <div.limite>
      <h2#guia-t>
      <p.guia-ayuda>
  <section#ofertas.limite.seccion>
    <h2#ofertas-t>
    <p.intro>
    <div.row.row-cols-1.row-cols-sm-2.row-cols-lg-4 [data-lista=ofertas]>
  <section#baratos.fondo-humo.seccion>
    <div.limite>
      <h2#baratos-t>
      <p.intro>
      <div.row.row-cols-1.row-cols-sm-2.row-cols-lg-3 [data-lista=baratos]>
  <section#premium.limite.seccion>
    <h2#premium-t>
    <p.intro>
    <div.row.row-cols-1.row-cols-sm-2.row-cols-lg-3 [data-lista=premium]>
  <aside.limite.seccion>
    <div.promo>
      <h2>
      <p>
      <button.btn.btn-light.btn-lg.rounded-pill [data-bs-target=#canje] [type=button]>
  <section#quienes-somos.fondo-humo.seccion>
    <div.limite>
      <h2#q-t>
      <p.lead>
      <p.lead>
  <section#glosario.limite.seccion>
    <h2#g-t>
    <p.intro>
    <div.table-responsive>
      <table.table.tabla-glosario>
        <thead>
        <tbody>
<div#detalle.modal.fade>
  <div.modal-dialog.modal-dialog-centered.modal-lg.modal-dialog-scrollable>
    <div.modal-content.detalle>
      <div.modal-header>
        <h2#detalle-titulo.modal-title>
        <button.btn-close [type=button]>
      <div.modal-body>
        <div.row>
          <div.col-md-5>
            <div.detalle-imagen>
              <img#detalle-img [src=img/hero.svg]>
          <div.col-md-7>
            <p#detalle-precio.detalle-precio>
            <table.table.detalle-tabla>
              <tbody#detalle-specs>
      <div.modal-footer>
        <button.btn.btn-outline-dark.rounded-pill [type=button]>
        <button#ir-comprar.btn.btn-acento [type=button]>
<div#compra.modal.fade>
  <div.modal-dialog.modal-dialog-centered.modal-lg.modal-dialog-scrollable>
    <div.modal-content.detalle>
      <div.modal-header>
        <h2#compra-titulo.modal-title>
        <button.btn-close [type=button]>
      <div.modal-body>
        <div.alert.alert-warning.small>
        <div.resumen>
          <div>
          … (2 más iguales)
          <div>
        <form#form-compra>
          <div.row>
            <div.col-sm-6>
              <label.form-label>
              <input#c-nombre.form-control>
            … (3 más iguales)
            <div.col-12>
              <div.form-check.form-check-inline>
                <input#tarjeta.form-check-input [type=radio]>
                <label.form-check-label>
              … (1 más iguales)
            <fieldset#grupo-tarjeta.row>
              <div.col-12>
                <label.form-label>
                <input#c-numero.form-control>
              <div.col-sm-4>
                <label.form-label>
                <input#c-venc.form-control>
              … (2 más iguales)
            <fieldset#grupo-retiro.row>
              <div.col-12>
                <label.form-label>
                <select#sucursal.form-select>
        <div#compra-ok.alert.alert-success [role=status]>
        <div#seguridad.accordion>
          <div.accordion-item>
            <h3.accordion-header>
            <div#seg1.accordion-collapse.collapse>
              <div.accordion-body>
                <ul>
          … (1 más iguales)
      <div.modal-footer>
        <button.btn.btn-outline-dark.rounded-pill [type=button]>
        <button.btn.btn-acento [type=submit]>
<div#canje.modal.fade>
  <div.modal-dialog.modal-dialog-centered.modal-lg.modal-dialog-scrollable>
    <div.modal-content.detalle>
      <div.modal-header>
        <h2#canje-titulo.modal-title>
        <button.btn-close [type=button]>
      <div.modal-body>
        <div.row>
          <div.col-md-7>
            <label.form-label>
            <input#canje-modelo.form-control>
            <datalist#lista-canje>
          <div.col-md-5>
            <label.form-label>
            <select#canje-estado.form-select>
        <p#canje-msg [role=status]>
        <div.table-responsive>
          <table.table.detalle-tabla>
            <thead>
            <tbody#canje-resultado>
        <p.nota>
<footer#contacto.pie>
  <div.limite.row>
    <div.col-md-4>
      <h2>
      <p>
      <p>
    … (2 más iguales)
    <p.col-12.copy>
<script [src=https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js]>
<script [src=datos/celulares.js]>
<script [src=js/app.js]>
```

### terminos.html

Términos y condiciones (Ciencias Sociales). Usa el mismo `<header>` y `<footer>` que `index.html`. Dentro de `<main class="limite pagina">`:

```
h1: Términos y condiciones
  h2: 1. Quién ofrece este sitio
  h2: 2. Uso del sitio y datos que se guardan
  h2: 3. Precios y stock
  h2: 4. Honestidad en las ofertas y en los usados
  h2: 5. Compra y pago
  h2: 6. Retiro en sucursal
  h2: 7. Garantía
  h2: 8. Derecho de arrepentimiento
  h2: 9. Protección de datos personales
  h2: 10. Accesibilidad e inclusión
  h2: 11. Cambios en estos términos
```

### diseno.html

Tema, user persona, wireframe, modelo entidad-relación y lógica booleana. Usa el mismo `<header>` y `<footer>` que `index.html`. Dentro de `<main class="limite pagina">`:

```
h1: Diseño del proyecto (UX/UI)
  h2: 1. Tema elegido
  h2: 2. User Persona
  h2: 3. Cómo responde el sitio a la persona
  h2: 4. Wireframe (el "esqueleto" de la página)
  h2: 5. Modelo entidad-relación (base de datos)
  h2: 6. Lógica booleana en las consultas SQL
```

### sostenibilidad.html

Informe y simulador de huella de carbono (Ciencias Naturales). Usa el mismo `<header>` y `<footer>` que `index.html`. Dentro de `<main class="limite pagina">`:

```
h1: Huella de carbono del sitio
  h2: 1. Qué pesa nuestro sitio
  h2: 2. Decisiones que reducen el peso
  h2: 3. Simulación
```

## 3. CSS (`css/index.css`)

Solo los selectores, agrupados bajo los comentarios del archivo. Las propiedades se ven en el archivo real.

```css

/* UNIDAD 3.3 - Paleta de colores (variables reutilizables) */
:root { … }

/* UNIDAD 6.2 - box-sizing: el padding y el borde no agrandan las cajas */
*, *::before, *::after { … }
html { … }

/* UNIDAD 4.1 / 4.2 - Tipografía (Outfit, desde Google Fonts) */
body { … }
h1, h2, h3, h4 { … }
h1 { … }
h2 { … }
h3, h4 { … }

/* UNIDAD 6.3 - Contenedor límite: el sitio no se estira en pantallas grandes */
.limite { … }

/* UNIDAD 6.1 - margin y padding de las secciones */
.seccion { … }
.fondo-humo { … }

/* UNIDAD 3.4 - Clases propias que sobrescriben a Bootstrap (se cargan después) */
.btn-acento { … }
.btn-acento:hover { … }
a:focus-visible, .btn:focus-visible, .form-control:focus-visible { … }

/* ---------- Encabezado ---------- */
.encabezado { … }
.marca { … }
.punto { … }
.nav-link { … }
.nav-link:hover { … }

/* ---------- Hero: UNIDAD 7 grilla de 2 columnas ---------- */
.hero { … }
.hero-bajada { … }

/* UNIDAD 6.4 - position: relative en el padre, absolute en los hijos */
.hero-imagen { … }
.hero-imagen::before { … }
.hero-imagen img { … }
.hero-sello { … }

/* ---------- Categorías: UNIDAD 5 flexbox ---------- */
.categorias { … }
.categorias a { … }

/* UNIDAD 8.1 :hover + 8.2 transform */
.categorias a:hover { … }

/* ---------- Tarjetas: UNIDAD 9.3 (Bootstrap) + 8.1 / 8.2 / 8.3 ---------- */
.tarjeta { … }
.tarjeta:hover { … }
.tarjeta-imagen { … }
.tarjeta-imagen img { … }
.tarjeta:hover .tarjeta-imagen img { … }
.card-text { … }
.precio { … }
.precio small { … }
.nota { … }

/* ---------- Promo: UNIDAD 6.4 position absolute ---------- */
.promo { … }
.promo::after { … }
.promo > * { … }
.promo p { … }

/* ---------- Pie de página ---------- */
.pie { … }
.pie i { … }
.pie a { … }
.form-control:focus { … }
.copy { … }

/* ---------- UNIDAD 5.3 / 7.4 - Media queries (diseño responsivo) ---------- */
@media (max-width: 768px) { … }
  .hero { … }
  .hero-bajada { … }
  .hero-imagen { … }
  .hero-imagen img { … }
  .hero-sello { … }
  .promo { … }
@media (prefers-reduced-motion: reduce) { … }
  * { … }

/* ---------- Botón secundario y ventanas (modales) ---------- */
.btn-outline-dark { … }
.detalle { … }
.detalle .modal-title { … }
.detalle-imagen { … }
.detalle-imagen img { … }
.detalle-precio { … }
.detalle-tabla th { … }
#detalle-specs th { … }
.detalle .modal-footer { … }

/* ---------- Etiquetas, resumen de compra y acordeón ---------- */
.etiqueta { … }
.etiqueta-usado { … }
.precio s { … }
.intro { … }
.resumen { … }
.form-check-input:checked { … }
.accordion-button:not(.collapsed) { … }
.accordion-button:focus { … }

/* ---------- Accesibilidad: enlace para saltar al contenido ---------- */
.salto { … }
.salto:focus { … }

/* ---------- Idioma y buscador ---------- */
#idioma { … }
.buscador { … }
.buscador .form-control { … }
.hero .categorias { … }
.vacio { … }

/* ---------- Páginas de texto (términos, diseño, huella) ---------- */
.pagina { … }
.pagina h2 { … }
.pagina h3 { … }
.persona { … }
.wireframes { … }
.wireframes img { … }
.simulador { … }
.resultado-huella { … }

/* ---------- Glosario ---------- */
.tabla-glosario thead th { … }
.tabla-glosario td, .tabla-glosario th { … }
.tabla-glosario tbody th { … }

/* ---------- Pie de página: redes ---------- */
.redes { … }
.redes a { … }
.redes a:hover { … }
.pie ul.enlaces { … }
.pie ul.enlaces li { … }

/* ---------- Para Mirta: explicación simple y grande ---------- */
html.letra-grande { … }
.btn { … }
.mirta { … }
.mirta-lead { … }
.mirta-respuesta { … }
.mirta-respuesta i { … }
.mirta h3 { … }
.necesidades, .guia { … }
.necesidades { … }
.necesidades li, .guia li { … }
.necesidades i { … }
.necesidades p, .guia p { … }
.mirta-botones { … }
.guia { … }
.guia li { … }
.guia li::before { … }
.guia i { … }
.guia-ayuda { … }
.tarjeta.recomendada { … }
.etiqueta-recomendado { … }
.motivo { … }
@media (max-width: 768px) { … }
  .necesidades { … }
  .mirta { … }
  .mirta-botones .btn { … }

/* ---------- Soporte: tres contactos grandes en grilla (1 columna en el celular) ---------- */
.contactos { … }
.contactos li { … }
.contactos i { … }
.contactos h2 { … }
.contactos .dato { … }
.contactos p { … }
.contactos .btn { … }
.guia-ayuda a { … }
@media (max-width: 991px) { … }
```

## 4. JavaScript

### js/app.js

Se carga en todas las páginas. Los bloques 3 a 6 solo trabajan si hay catálogo (`index.html`).

```js

/* ---------- 1. Utilidades y textos ---------- */
  const money = function (n) { … }
  const num = function (texto) { … }
  const normalizar = function (s) { … }
  let lang = 'es';
  const L = { … }
  const COLORES_EN = { … }
  const EN = { … }

/* ---------- 2. Idioma ---------- */
  function aplicarIdioma() { … }

/* ---------- 3. Catálogo ---------- */
  const nombreDe = function (p) { … }
  function tarjeta(p) { … }
  function renderCatalogo() { … }

/* ---------- 4. Ventana de detalle ---------- */
  let actual = null;   // celular elegido
  function filas(p) { … }
  const n = function (x) { … }
  function llenarDetalle() { … }
  function iniciarDetalle() { … }
  $('detalle').addEventListener('show.bs.modal', function (e) { … }

/* ---------- 5. Ventana de compra (simulada: no se envía ni se guarda nada) ---------- */
  function actualizarCompra() { … }
  function llenarSucursales() { … }
  function iniciarCompra() { … }
  $('ir-comprar').addEventListener('click', function () { … }
  $('detalle').addEventListener('hidden.bs.modal', function () { … }
  $('form-compra').addEventListener('submit', function (e) { … }

/* ---------- 6. Ventana de canje ---------- */
  const VALORES = { … }
  function comparar() { … }
  function iniciarCanje() { … }
  $('canje-modelo').addEventListener('input', comparar);
  $('canje-estado').addEventListener('change', comparar);
  $('canje').addEventListener('show.bs.modal', comparar);

/* ---------- 7. Letra grande (para leer más cómodo) ---------- */
  function aplicarLetra(grande) { … }

/* ---------- Arranque ---------- */
  document.addEventListener('DOMContentLoaded', function () { … }
  $('idioma').addEventListener('click', function () { … }
  let grande = false;
  $('letra').addEventListener('click', function () { … }
  $('buscador').addEventListener('input', renderCatalogo);
```

### js/huella.js

Solo en `sostenibilidad.html`.

```js
  const valor = function (id) { … }
  const gramos = function (mb, visitas) { … }
  const formato = function (n) { … }
  const texto = function (g) { … }
  function calcular() { … }
  document.addEventListener('DOMContentLoaded', function () { … }
  document.addEventListener('idioma-cambiado', calcular);
```

## 5. Base de datos

### base-de-datos/esquema.sql (tablas y relaciones)

```sql
CREATE TABLE productos (
  id_producto        INTEGER PRIMARY KEY,
  nombre TEXT
  estado TEXT
  precio INTEGER
  precio_lista INTEGER
  pantalla_pulg REAL
  panel TEXT
  hz INTEGER
  ram_gb INTEGER
  almacenamiento_gb INTEGER
  camara_mp INTEGER
  bateria_mah INTEGER
  carga_w INTEGER
  red TEXT
  colores TEXT
  garantia_meses INTEGER
  bateria_salud INTEGER
  observaciones_es TEXT
  observaciones_en TEXT
  descripcion_es TEXT
  descripcion_en TEXT
  imagen TEXT
);
CREATE TABLE sucursales (
  id_sucursal   INTEGER PRIMARY KEY,
  nombre TEXT
  zona TEXT
  abre_sabados INTEGER
);
CREATE TABLE stock (
  id_producto  INTEGER NOT NULL REFERENCES productos (id_producto),
  id_sucursal  INTEGER NOT NULL REFERENCES sucursales (id_sucursal),
  unidades INTEGER
  PRIMARY KEY (id_producto, id_sucursal)
);
CREATE TABLE clientes (
  id_cliente  INTEGER PRIMARY KEY,
  nombre TEXT
  apellido TEXT
  email TEXT
);
CREATE TABLE pedidos (
  id_pedido    INTEGER PRIMARY KEY,
  id_cliente   INTEGER NOT NULL REFERENCES clientes (id_cliente),
  id_producto  INTEGER NOT NULL REFERENCES productos (id_producto),
  id_sucursal  INTEGER REFERENCES sucursales (id_sucursal),
  fecha TEXT
  metodo_pago TEXT
  cuotas INTEGER
  total INTEGER
  CHECK (metodo_pago = 'tarjeta' OR id_sucursal IS NOT NULL)
);
```

### base-de-datos/consultas.sql (lógica booleana)

```sql
-- @ofertas: WHERE precio < precio_lista OR estado = 'usado'
-- @baratos: WHERE NOT (precio < precio_lista OR estado = 'usado') AND precio <= 550000 AND ram_gb >= 4 AND bateria_mah >= 5000
-- @premium: WHERE precio >= 1000000 OR (camara_mp >= 100 AND carga_w >= 60)
-- @urgente: WHERE st.unidades > 0 AND p.precio BETWEEN 200000 AND 560000 AND (p.estado = 'nuevo' OR p.garantia_meses >= 3)
-- @sin_stock: WHERE NOT EXISTS ( SELECT 1 FROM stock AS st WHERE st.id_producto = p.id_producto AND st.unidades > 0 )
-- @sabados: WHERE s.abre_sabados = 1 AND st.unidades > 0
-- @pedidos_por_cliente: WHERE (sin WHERE, solo JOIN)
-- @para_mirta: WHERE p.estado = 'nuevo' AND p.precio < p.precio_lista AND p.bateria_mah >= 5000 AND EXISTS (SELECT 1 FROM stock AS st WHERE st.id_producto = p.id_producto AND st.unidades > 0)
```

### base-de-datos/construir_base.py

Crea la base y exporta los datos para la página.

```python
import csv
import json
import re
import sqlite3
from pathlib import Path
AQUI = Path(__file__).parent
RAIZ = AQUI.parent
SECCIONES = ("ofertas", "baratos", "premium")
def leer(nombre):
def cargar_consultas():
def crear_base():
def asignar_secciones(con, consultas):
def tabla(con, nombre):
def exportar(con, seccion, recomendados):
def mostrar_resultados(con, consultas):
if __name__ == "__main__":
```

### base-de-datos/analisis_pandas.py

Las mismas consultas con Pandas (curso de Base de datos).

```python
from pathlib import Path
import pandas as pd
CSV = Path(__file__).parent / "csv"
# --- Lectura de datos (lección 2.1) y vistazo básico (lección 3.1) ---
celulares = pd.read_csv(CSV / "celulares.csv", sep=",", encoding="utf-8")
# --- Indexación booleana (lección 4.2): cada condición va entre paréntesis ---
ofertas = celulares[tiene_descuento | es_usado]
baratos = …  (sigue en varias líneas)
premium = …  (sigue en varias líneas)
# --- .filter() (lección 5.4): elegir columnas por nombre, y sort_values (lección 3.3) ---
# --- Columna calculada: porcentaje de descuento ---
ofertas = ofertas.assign(descuento_pct=((1 - ofertas["precio"] / ofertas["precio_lista"]) * 100).round())
# --- loc / iloc (lección 4.1): el celular más barato y el más caro ---
# --- merge (lección 5.3): equivale a los JOIN de la consulta @urgente ---
completo = …  (sigue en varias líneas)
urgente = …  (sigue en varias líneas)
```

### herramientas/verificar_sitio.py

Revisa ids repetidos, enlaces e imágenes rotas, labels sin campo, `alt`, un solo `h1`, los ids que usa `app.js` y que cada celular quede en una sola sección.
