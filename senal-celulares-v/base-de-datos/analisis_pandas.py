"""analisis_pandas.py - Las mismas consultas de consultas.sql, pero con Pandas.

Relaciona el curso "Programación de Base de datos" con el proyecto:
  SQL  WHERE a AND b   <->  Pandas  df[(a) & (b)]      (indexación booleana, lección 4.2)
  SQL  WHERE a OR b    <->  Pandas  df[(a) | (b)]
  SQL  WHERE NOT a     <->  Pandas  df[~(a)]
  SQL  JOIN            <->  Pandas  df.merge(...)       (lección 5.3)
Antes hay que correr construir_base.py para generar los CSV.
Uso:  python base-de-datos/analisis_pandas.py
"""
from pathlib import Path

import pandas as pd

CSV = Path(__file__).parent / "csv"

# --- Lectura de datos (lección 2.1) y vistazo básico (lección 3.1) ---
celulares = pd.read_csv(CSV / "celulares.csv", sep=",", encoding="utf-8")
sucursales = pd.read_csv(CSV / "sucursales.csv")
stock = pd.read_csv(CSV / "stock.csv")

print("Forma de la tabla (filas, columnas):", celulares.shape)
print(celulares.head(3)[["id_producto", "nombre", "precio"]])
celulares.info()

# --- Indexación booleana (lección 4.2): cada condición va entre paréntesis ---
tiene_descuento = celulares["precio"] < celulares["precio_lista"]
es_usado = celulares["estado"] == "usado"

ofertas = celulares[tiene_descuento | es_usado]                     # OR
baratos = celulares[~(tiene_descuento | es_usado)                   # NOT (A OR B)
                    & (celulares["precio"] <= 550000)               # AND
                    & (celulares["ram_gb"] >= 4)
                    & (celulares["bateria_mah"] >= 5000)]
premium = celulares[(celulares["precio"] >= 1000000)
                    | ((celulares["camara_mp"] >= 100) & (celulares["carga_w"] >= 60))]

# --- .filter() (lección 5.4): elegir columnas por nombre, y sort_values (lección 3.3) ---
for titulo, tabla in (("OFERTAS", ofertas), ("BUENOS Y BARATOS", baratos), ("PREMIUM", premium)):
    print(f"\n{titulo}: {len(tabla)} celulares")
    print(tabla.filter(["nombre", "precio", "precio_lista"]).sort_values("precio"))

# --- Columna calculada: porcentaje de descuento ---
ofertas = ofertas.assign(descuento_pct=((1 - ofertas["precio"] / ofertas["precio_lista"]) * 100).round())
print("\nDescuento en ofertas (%):")
print(ofertas[["nombre", "descuento_pct"]].to_string(index=False))

# --- loc / iloc (lección 4.1): el celular más barato y el más caro ---
ordenados = celulares.sort_values("precio").reset_index(drop=True)
print("\nMás barato:", ordenados.loc[0, "nombre"], "| Más caro:", ordenados.iloc[-1]["nombre"])

# --- merge (lección 5.3): equivale a los JOIN de la consulta @urgente ---
completo = (stock
            .merge(celulares[["id_producto", "nombre", "precio", "estado", "garantia_meses"]], on="id_producto", how="inner")
            .merge(sucursales[["id_sucursal", "nombre"]].rename(columns={"nombre": "sucursal"}), on="id_sucursal", how="inner"))
urgente = completo[(completo["unidades"] > 0)
                   & completo["precio"].between(200000, 560000)
                   & ((completo["estado"] == "nuevo") | (completo["garantia_meses"] >= 3))]
print(f"\nURGENTE (hay stock, precio entre $200.000 y $560.000): {len(urgente)} filas")
