-- =====================================================================
-- esquema.sql - Estructura de la base de datos de "Señal"
-- Motor: SQLite (con pocos cambios sirve también en MySQL o PostgreSQL).
--
-- Modelo entidad-relación (5 tablas):
--   productos  1 --- N  stock    N --- 1  sucursales   (relación N:M resuelta con la tabla "stock")
--   clientes   1 --- N  pedidos  N --- 1  productos
--   sucursales 1 --- N  pedidos                         (retiro en sucursal, opcional)
-- =====================================================================
PRAGMA foreign_keys = ON;

-- Se borra en orden inverso a las dependencias para poder volver a crear todo.
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS stock;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS sucursales;
DROP TABLE IF EXISTS productos;

-- Catálogo de celulares (nuevos y usados). Cada dato técnico es una columna
-- corta o numérica: la página arma los textos a partir de ellas.
CREATE TABLE productos (
  id_producto        INTEGER PRIMARY KEY,
  nombre             TEXT    NOT NULL,
  estado             TEXT    NOT NULL CHECK (estado IN ('nuevo', 'usado')),
  precio             INTEGER NOT NULL CHECK (precio > 0),             -- lo que paga el cliente
  precio_lista       INTEGER NOT NULL CHECK (precio_lista >= precio), -- precio sin descuento
  pantalla_pulg      REAL    NOT NULL,
  panel              TEXT    NOT NULL,                                -- LCD, AMOLED, pOLED
  hz                 INTEGER NOT NULL,
  ram_gb             INTEGER NOT NULL,
  almacenamiento_gb  INTEGER NOT NULL,
  camara_mp          INTEGER NOT NULL,
  bateria_mah        INTEGER NOT NULL,
  carga_w            INTEGER NOT NULL,
  red                TEXT    NOT NULL,                                -- 4G o 5G
  colores            TEXT    NOT NULL,                                -- lista separada por comas
  garantia_meses     INTEGER NOT NULL DEFAULT 12,
  bateria_salud      INTEGER,                                         -- solo usados (porcentaje)
  observaciones_es   TEXT,                                            -- solo usados: detalle honesto
  observaciones_en   TEXT,
  descripcion_es     TEXT    NOT NULL,
  descripcion_en     TEXT    NOT NULL,
  imagen             TEXT    NOT NULL
);

CREATE TABLE sucursales (
  id_sucursal   INTEGER PRIMARY KEY,
  nombre        TEXT    NOT NULL,
  zona          TEXT    NOT NULL,
  abre_sabados  INTEGER NOT NULL CHECK (abre_sabados IN (0, 1))       -- booleano: 0 = no, 1 = sí
);

-- Tabla intermedia: cuántas unidades de cada producto hay en cada sucursal.
CREATE TABLE stock (
  id_producto  INTEGER NOT NULL REFERENCES productos (id_producto),
  id_sucursal  INTEGER NOT NULL REFERENCES sucursales (id_sucursal),
  unidades     INTEGER NOT NULL CHECK (unidades >= 0),
  PRIMARY KEY (id_producto, id_sucursal)
);

-- Por privacidad NO se guardan DNI ni datos de tarjeta.
CREATE TABLE clientes (
  id_cliente  INTEGER PRIMARY KEY,
  nombre      TEXT NOT NULL,
  apellido    TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE
);

CREATE TABLE pedidos (
  id_pedido    INTEGER PRIMARY KEY,
  id_cliente   INTEGER NOT NULL REFERENCES clientes (id_cliente),
  id_producto  INTEGER NOT NULL REFERENCES productos (id_producto),
  id_sucursal  INTEGER REFERENCES sucursales (id_sucursal),           -- sucursal de retiro (puede ser NULL)
  fecha        TEXT    NOT NULL,
  metodo_pago  TEXT    NOT NULL CHECK (metodo_pago IN ('tarjeta', 'efectivo')),
  cuotas       INTEGER NOT NULL DEFAULT 1,
  total        INTEGER NOT NULL,
  -- Lógica booleana dentro de la tabla: si paga en efectivo, tiene que haber sucursal de retiro.
  CHECK (metodo_pago = 'tarjeta' OR id_sucursal IS NOT NULL)
);
