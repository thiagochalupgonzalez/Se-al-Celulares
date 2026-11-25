"""verificar_sitio.py - Revisión automática del proyecto (parte del debugging).

Qué comprueba:
  - HTML: ids repetidos, enlaces internos (#ancla y páginas), imágenes que faltan,
    imágenes sin alt, un solo <h1> por página, atributo lang, labels sin campo.
  - Bootstrap: que cada data-bs-target apunte a un id que existe.
  - JavaScript: que los ids usados en app.js existan en index.html.
  - Base de datos: que cada celular quede en una sola sección y que las consultas funcionen.
Uso (desde la carpeta del proyecto):  python herramientas/verificar_sitio.py
Necesita:  pip install beautifulsoup4
"""
import re
import sqlite3
import sys
from pathlib import Path

from bs4 import BeautifulSoup

RAIZ = Path(__file__).resolve().parent.parent
errores = []


def revisar(condicion, mensaje):
    """Registra un error si la condición no se cumple."""
    if not condicion:
        errores.append(mensaje)


paginas = sorted(RAIZ.glob("*.html"))
ids_por_pagina = {}
for pagina in paginas:
    sopa = BeautifulSoup(pagina.read_text(encoding="utf-8"), "html.parser")
    ids = [t["id"] for t in sopa.find_all(id=True)]
    ids_por_pagina[pagina.name] = set(ids)
    repetidos = {i for i in ids if ids.count(i) > 1}
    revisar(not repetidos, f"{pagina.name}: ids repetidos {repetidos}")
    revisar(len(sopa.find_all("h1")) == 1, f"{pagina.name}: debe haber exactamente un <h1>")
    revisar(sopa.html.get("lang"), f"{pagina.name}: falta el atributo lang en <html>")
    for img in sopa.find_all("img"):
        revisar(img.get("alt") is not None, f"{pagina.name}: imagen sin alt: {img.get('src')}")
        revisar((RAIZ / img["src"]).exists(), f"{pagina.name}: no existe la imagen {img['src']}")
    for etiqueta in sopa.find_all("label", attrs={"for": True}):
        revisar(etiqueta["for"] in ids, f"{pagina.name}: label for='{etiqueta['for']}' sin campo")
    for t in sopa.find_all(attrs={"data-bs-target": True}):
        revisar(t["data-bs-target"].lstrip("#") in ids, f"{pagina.name}: data-bs-target roto {t['data-bs-target']}")
    for a in sopa.find_all("a", href=True):
        destino = a["href"]
        if destino.startswith(("http", "mailto:", "tel:")):
            continue
        archivo, _, ancla = destino.partition("#")
        archivo = archivo or pagina.name
        revisar((RAIZ / archivo).exists(), f"{pagina.name}: enlace a página inexistente {destino}")
        if ancla and archivo in ids_por_pagina:
            revisar(ancla in ids_por_pagina[archivo], f"{pagina.name}: ancla inexistente {destino}")

# Los ids que usa app.js con $('...') tienen que existir en index.html
js = (RAIZ / "js" / "app.js").read_text(encoding="utf-8")
# (las secciones ofertas, baratos y premium se buscan con $(s) dentro de un bucle, por eso se agregan a mano)
usados = set(re.findall(r"\$\('([\w-]+)'\)", js)) | {"ofertas", "baratos", "premium"}
for i in usados:
    revisar(i in ids_por_pagina["index.html"], f"app.js usa el id '{i}', que no existe en index.html")

# Base de datos: cada celular en una sola sección
con = sqlite3.connect(RAIZ / "base-de-datos" / "senal.db")
total = con.execute("SELECT COUNT(*) FROM productos").fetchone()[0]
partes = re.split(r"^-- @(\w+)\s*$", (RAIZ / "base-de-datos" / "consultas.sql").read_text(encoding="utf-8"), flags=re.M)
consultas = {partes[i]: partes[i + 1] for i in range(1, len(partes), 2)}
cubiertos = []
for nombre in ("ofertas", "baratos", "premium"):
    cubiertos += [f[0] for f in con.execute(consultas[nombre])]
revisar(len(cubiertos) == len(set(cubiertos)) == total, "cada celular debe estar en exactamente una sección")
for nombre, sql in consultas.items():
    try:
        con.execute(sql).fetchall()
    except sqlite3.Error as e:
        errores.append(f"consulta @{nombre} falló: {e}")

print(f"Páginas revisadas: {len(paginas)} | celulares: {total} | consultas: {len(consultas)}")
if errores:
    print("PROBLEMAS ENCONTRADOS:")
    for e in errores:
        print(" -", e)
    sys.exit(1)
print("Todo en orden: no se encontraron problemas.")
