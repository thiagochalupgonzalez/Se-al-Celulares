# Señal - Tienda de celulares

Proyecto integrador "Mi Sitio Web Dinámico". Es una tienda de celulares pensada para **Mirta, 62 años**, que necesita un teléfono con urgencia. La página muestra los celulares en tres grupos: **en oferta**, **buenos y baratos** y **los más premium**.

Apenas empieza, la página explica que está pensada para Mirta, qué necesita y que lo que busca está en **Ofertas**. Ahí, el celular recomendado para ella aparece primero y con un cartel azul. También hay una **guía fácil de 5 pasos** y un botón **"Letra grande"**.

La tienda es ficticia: los precios, el stock y los datos son de ejemplo, y la compra es una simulación.

## Cómo verlo

1. Abrir `index.html` con el navegador (doble clic). Necesita internet para cargar Bootstrap, los íconos y la fuente.
2. Para volver a crear la base de datos y los datos de la página:
   ```
   python base-de-datos/construir_base.py
   ```
3. Para ver las mismas consultas hechas con Pandas:
   ```
   pip install pandas
   python base-de-datos/analisis_pandas.py
   ```
4. Para revisar errores antes de entregar:
   ```
   pip install beautifulsoup4
   python herramientas/verificar_sitio.py
   ```

## Cumplimiento de la consigna

| Consigna | Dónde está |
| --- | --- |
| **A. Tema** | Tienda de celulares para alguien que necesita uno urgente (`diseno.html`, sección 1). |
| **A. User Persona** | Mirta, 62 años (`diseno.html`, sección 2). En la página principal, la sección "Para Mirta" detalla lo que necesita y cómo la ayuda el sitio. |
| **A. Wireframe** | `img/wireframe-escritorio.svg` y `img/wireframe-celular.svg`. El buscador está marcado con un recuadro punteado debajo del título. La consigna pide dibujarlo **en papel**: estos sirven de modelo para copiarlo a mano. |
| **B. `<header>` con menú** | `index.html`: `<header>` con `<nav>`, el menú y el botón de idioma. |
| **B. `<main>` con "Quiénes somos"** | `index.html`, `<section id="quienes-somos">`. |
| **B. `<footer>` con redes y términos** | `index.html`: Instagram, Facebook y WhatsApp, y el enlace a `terminos.html`. |
| **Soporte** | `soporte.html`: solo contactos (teléfono, WhatsApp y correo). Se llega desde el botón "Pedir ayuda", la guía fácil y el pie de todas las páginas. |
| **C. Flexbox o Grid** | Grid en la portada y en "Comprá en 3 pasos". Flexbox en los botones de categorías, las redes y los wireframes. La grilla de Bootstrap usa flexbox en las tarjetas. Las media queries pasan todo a una columna en el celular. |
| **C. Jerarquía visual y tipográfica** | Un solo `<h1>` por página, después `<h2>` y `<h3>`. Una sola fuente (Outfit) y letra base de 18 px. |
| **D. Modelo entidad-relación** | 5 tablas relacionadas (`base-de-datos/esquema.sql`). El diagrama está en `img/modelo-er.svg` y en `diseno.html`, sección 5. |
| **D. Lógica booleana en SQL** | `base-de-datos/consultas.sql` usa `AND`, `OR`, `NOT`, `BETWEEN` y `NOT EXISTS`. Explicación en `diseno.html`, sección 6. |
| **Contenido (Prácticas del Lenguaje)** | Textos cortos y claros en botones, mensajes y "Quiénes somos", con ortografía y tildes revisadas. |
| **Código (Informática)** | Indentado y con comentarios en cada archivo. El esqueleto completo está en `ESQUELETO-DEL-CODIGO.md`. |
| **Internacionalización (Inglés)** | Glosario técnico en una sola tabla (término y significado) en `index.html`. El botón **EN / ES** traduce la tabla y toda la página, y se acuerda de la elección. |
| **Ética (Ciencias Sociales)** | `terminos.html`: honestidad con los usados, privacidad, garantía y derecho de arrepentimiento. |
| **Sostenibilidad (Ciencias Naturales)** | `sostenibilidad.html`: peso medido del sitio y simulador de emisiones de CO₂. |
| **Repositorio** | Falta subirlo a GitHub (ver abajo). |
| **Debugging** | `herramientas/verificar_sitio.py` revisa el sitio. Más abajo están los errores que se encontraron y cómo se corrigieron. |

## Qué se usó, cuándo y para qué

### 1. Diseño (UX/UI): lo primero
Antes de programar se definió **para quién** es el sitio (Mirta) y **dónde va cada cosa** (wireframe). De ahí salieron las decisiones de diseño:
- letra grande;
- solo tres grupos de celulares;
- el buscador arriba;
- un glosario para las palabras técnicas;
- el stock por sucursal, para que pueda retirar el celular hoy.

### 2. HTML5 semántico: la estructura
Cada etiqueta dice qué es su contenido:
- `header`, `nav`, `main`, `section`, `article`, `aside` y `footer` ordenan la página;
- los lectores de pantalla y los buscadores entienden mejor así la página (**accesibilidad**).

Además se agregaron:
- un enlace oculto "Saltar al contenido" para quien navega con teclado;
- `alt` en todas las imágenes;
- `label` en todos los campos;
- `aria-label` en los botones que solo tienen un ícono.

### 3. CSS: la apariencia y el diseño adaptable
- **Variables** (`--marino`, `--acento`) para la paleta: se cambia en un solo lugar.
- **Grid** para las grillas, **Flexbox** para alinear elementos en una fila.
- **Media queries** para que en el celular todo quede en una columna.
- **Bootstrap** aporta el menú de hamburguesa, las tarjetas, las ventanas y el acordeón. El CSS propio se carga después para poder modificarlo.

### 4. Base de datos (SQL): la información
Los celulares ya no están escritos a mano en el HTML: viven en una **base de datos SQLite** con 5 tablas.

| Tabla | Qué guarda |
| --- | --- |
| `productos` | Los celulares, con sus precios y características. |
| `sucursales` | Los lugares de retiro. |
| `stock` | Cuántas unidades hay de cada celular en cada sucursal. Es la tabla intermedia que resuelve una relación de muchos a muchos. |
| `clientes` | Nombre, apellido y email. Por privacidad, no se guarda el DNI ni la tarjeta. |
| `pedidos` | Une un cliente con un celular y, si paga en efectivo, con una sucursal. |

### 5. Lógica booleana: el filtro
Cada sección de la página es el resultado de una consulta SQL:

| Sección | Operadores | Qué hace |
| --- | --- | --- |
| Ofertas | `OR` | Entra si tiene descuento **o** es usado. |
| Buenos y baratos | `NOT` y `AND` | Muestra los nuevos sin descuento **y** baratos **y** con buena batería. El `NOT` evita que se repitan con las ofertas. |
| Premium | `OR` con un `AND` adentro | Entra si es caro **o** tiene cámara y carga de primer nivel. |
| Recomendado para Mirta | `AND` y `EXISTS` | Es nuevo **y** tiene descuento **y** batería grande **y** hay unidades para retirar hoy. |

### 6. Python: el puente entre la base y la página
`construir_base.py` hace tres cosas:
1. crea la base;
2. ejecuta las consultas;
3. guarda el resultado en `datos/celulares.js`.

Se usa `.js` y no `.json` para que la página funcione abriéndola con doble clic, sin servidor.

`analisis_pandas.py` repite las mismas consultas con Pandas, usando lo que enseña el curso de Base de datos:
- `read_csv`, `head`, `shape` e `info`;
- indexación booleana con `&`, `|` y `~`;
- `filter`, `loc` e `iloc`;
- `merge`.

### 7. JavaScript: el comportamiento
`js/app.js` se encarga de:
- **dibujar las tarjetas** con los datos;
- el **buscador**, que encuentra "linea" aunque el nombre diga "Línea";
- la **ventana de detalle** con las características;
- la **compra simulada**: las sucursales solo aparecen si hay stock;
- el **comparador de canje**;
- el **cambio de idioma**;
- el botón **"Letra grande"**, que agranda el texto de 18 a 21 píxeles y se acuerda de la elección.

`js/huella.js` calcula las emisiones de CO₂.

## Correcciones al material de Base de datos

El curso es de Pandas (Python), mientras que la consigna pide SQL. Por eso se hicieron las dos cosas y se relacionaron. También hay contenidos del curso que quedaron desactualizados:

1. **Lección 5.2, `.append()`:** se eliminó en Pandas 2.0, la versión actual. Si se usa, aparece un error. Hay que usar `pd.concat([df1, df2], ignore_index=True)`.
2. **Lección 1.2, "Paneles":** las estructuras de tres dimensiones (Panel) se eliminaron en Pandas 1.0. La pregunta 5 del verdadero o falso hoy sería **falsa**. Pandas trabaja con Series y DataFrame.
3. **Lección 5.4, tabla de operadores:** el símbolo del operador OR (`|`) no se ve; quedó un error de formato en su lugar. Es la barra vertical: `(condición 1) | (condición 2)`.
4. **Consigna, ejemplo de tablas:** se pidieron "Usuarios y Publicaciones" como ejemplo. Para una tienda tienen más sentido **clientes, productos y pedidos**, que es la misma idea aplicada al tema.

## Debugging realizado

| Problema encontrado | Solución |
| --- | --- |
| Los botones de categoría llevaban todos al mismo lugar (versión 4). | Cada botón apunta al `id` de su sección. |
| Un celular podía quedar en dos secciones o en ninguna. | Se usa `NOT` en "Buenos y baratos". `construir_base.py` frena con un error si pasa. |
| Pagar en efectivo sin elegir sucursal. | El formulario lo exige y la base lo rechaza con un `CHECK`. |
| La sucursal ofrecida no tenía stock. | Solo se listan las sucursales con `unidades > 0`. |
| El buscador no encontraba "linea" por la tilde. | Se normalizan las tildes y las mayúsculas antes de comparar. |
| Etiquetas superpuestas en el diagrama entidad-relación. | Se reubicaron y se agrandó el dibujo. |
| Reglas de CSS que ya no se usaban. | Se borraron. |
| Si Bootstrap no cargaba, la página quedaba sin celulares. | Primero se dibuja el catálogo y después se inician las ventanas, solo si Bootstrap cargó. |
| En el celular, el glosario obligaba a desplazar la pantalla de costado. | Pasó a ser una sola tabla de 2 columnas que entra en la pantalla y se traduce con el botón EN/ES. |
| El botón de ayuda llamaba directo y no mostraba los contactos. | Ahora lleva a la página de soporte. |

La página se probó en un navegador automatizado, sin cargar Bootstrap porque no había internet. Funcionaron:
- las tres secciones;
- el buscador;
- el detalle en español y en inglés;
- la compra con descuento y cuotas;
- el pago en efectivo con sucursal;
- el canje con "Señal Pro X2s";
- el cambio de idioma;
- el simulador de huella.

No hubo errores de JavaScript. **Falta verlo con internet**: el aspecto final, el menú del celular y las ventanas.

## Limitaciones conocidas
- El botón de idioma traduce la página principal, soporte, términos y condiciones y huella de carbono. En `diseno.html` (el documento del proyecto para la profesora) traduce el menú y el pie, y el texto queda en español.
- Las redes sociales del pie apuntan a las páginas generales de Instagram, Facebook y WhatsApp. Hay que reemplazarlas por perfiles reales.
- Los valores de energía e intensidad del simulador de huella son supuestos aproximados. Conviene reemplazarlos por los de una fuente citada.

## Subirlo a GitHub
1. Crear una cuenta en github.com y un repositorio nuevo, por ejemplo `senal-celulares`.
2. Elegir **Add file → Upload files** y arrastrar **el contenido** de esta carpeta, no la carpeta entera.
3. Para que también funcione como página, ir a **Settings → Pages** y elegir la rama `main`. GitHub te da un link `https://tu-usuario.github.io/senal-celulares/`.
