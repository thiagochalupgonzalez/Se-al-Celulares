"""construir_base.py - Crea la base de datos de Señal y exporta los datos para la página.

Qué hace, en orden:
  1. Crea senal.db ejecutando esquema.sql y datos.sql.
  2. Ejecuta las consultas de consultas.sql y muestra sus resultados.
  3. Usa las consultas @ofertas, @baratos y @premium para asignar la sección de cada celular,
     y @para_mirta para marcar el celular recomendado.
  4. Exporta datos/celulares.js (lo lee la página) y csv/*.csv (los lee analisis_pandas.py).

Uso (desde la carpeta del proyecto):  python base-de-datos/construir_base.py
"""
import csv
import json
import re
import sqlite3
from pathlib import Path

AQUI = Path(__file__).parent          # carpeta base-de-datos/
RAIZ = AQUI.parent                    # carpeta del proyecto
SECCIONES = ("ofertas", "baratos", "premium")


def leer(nombre):
    """Lee un archivo de texto de la carpeta base-de-datos/."""
    return (AQUI / nombre).read_text(encoding="utf-8")


def cargar_consultas():
    """Separa consultas.sql en un diccionario {nombre: sql} usando las marcas '-- @nombre'."""
    partes = re.split(r"^-- @(\w+)\s*$", leer("consultas.sql"), flags=re.M)
    return {partes[i]: partes[i + 1].strip() for i in range(1, len(partes), 2)}


def crear_base():
    """Crea senal.db desde cero y devuelve la conexión."""
    ruta = AQUI / "senal.db"
    if ruta.exists():
        ruta.unlink()
    con = sqlite3.connect(ruta)
    con.row_factory = sqlite3.Row
    con.executescript(leer("esquema.sql"))
    con.executescript(leer("datos.sql"))
    return con


def asignar_secciones(con, consultas):
    """Ejecuta las tres consultas de sección y devuelve {id_producto: sección}."""
    seccion = {}
    for nombre in SECCIONES:
        for fila in con.execute(consultas[nombre]):
            assert fila["id_producto"] not in seccion, "un celular quedó en dos secciones"
            seccion[fila["id_producto"]] = nombre
    return seccion


def tabla(con, nombre):
    """Devuelve todas las filas de una tabla como lista de diccionarios."""
    return [dict(f) for f in con.execute(f"SELECT * FROM {nombre}")]


def exportar(con, seccion, recomendados):
    """Escribe datos/celulares.js y los CSV. 'recomendado' es 1 para el celular sugerido a Mirta."""
    productos = [dict(p, seccion=seccion.get(p["id_producto"]), recomendado=int(p["id_producto"] in recomendados))
                 for p in tabla(con, "productos")]
    sin_seccion = [p["nombre"] for p in productos if not p["seccion"]]
    assert not sin_seccion, f"productos sin sección: {sin_seccion}"
    datos = {"productos": productos, "sucursales": tabla(con, "sucursales"), "stock": tabla(con, "stock")}
    # Se exporta como .js (y no .json) para que la página funcione también abriendo index.html con doble clic.
    js = "/* Generado por base-de-datos/construir_base.py - no editar a mano */\nconst DATOS = "
    (RAIZ / "datos" / "celulares.js").write_text(js + json.dumps(datos, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
    for nombre, filas in (("celulares", productos), ("sucursales", datos["sucursales"]), ("stock", datos["stock"])):
        with open(AQUI / "csv" / f"{nombre}.csv", "w", newline="", encoding="utf-8") as f:
            escritor = csv.DictWriter(f, fieldnames=list(filas[0].keys()))
            escritor.writeheader()
            escritor.writerows(filas)


def mostrar_resultados(con, consultas):
    """Imprime el resultado de cada consulta (útil para probarlas y mostrarlas en clase)."""
    for nombre, sql in consultas.items():
        filas = [dict(f) for f in con.execute(sql)]
        print(f"\n== @{nombre} ({len(filas)} filas)")
        for fila in filas:
            print("  ", fila)


if __name__ == "__main__":
    conexion = crear_base()
    consultas = cargar_consultas()
    mostrar_resultados(conexion, consultas)
    para_mirta = {fila["id_producto"] for fila in conexion.execute(consultas["para_mirta"])}
    exportar(conexion, asignar_secciones(conexion, consultas), para_mirta)
    print("\nListo: senal.db, datos/celulares.js y csv/*.csv generados.")
