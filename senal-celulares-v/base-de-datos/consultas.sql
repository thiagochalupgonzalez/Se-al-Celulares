-- =====================================================================
-- consultas.sql - Consultas con LÓGICA BOOLEANA (AND, OR, NOT, BETWEEN, EXISTS)
-- Cada consulta empieza con una marca "-- @nombre". El script construir_base.py
-- usa las tres primeras para decidir en qué sección de la página va cada celular.
-- Álgebra de Boole: AND = "y" (las dos condiciones a la vez), OR = "o" (alcanza
-- con una) y NOT = "no" (invierte el resultado).
-- =====================================================================

-- @ofertas
-- Sección "Celulares en oferta": tiene descuento O es usado (OR).
SELECT id_producto
FROM productos
WHERE precio < precio_lista OR estado = 'usado'
ORDER BY precio;

-- @baratos
-- Sección "Buenos y baratos": nuevo y sin descuento (se expresa con NOT para no
-- repetirlo en ofertas), barato (<= $550.000) y con buena RAM y batería (AND).
-- NOT (A OR B) equivale a (NOT A) AND (NOT B): leyes de De Morgan.
SELECT id_producto
FROM productos
WHERE NOT (precio < precio_lista OR estado = 'usado')
  AND precio <= 550000
  AND ram_gb >= 4
  AND bateria_mah >= 5000
ORDER BY precio;

-- @premium
-- Sección "Los más premium": cuesta $1.000.000 o más, O combina cámara de 100 MP
-- o más con carga de 60 W o más (OR entre una condición simple y una compuesta con AND).
SELECT id_producto
FROM productos
WHERE precio >= 1000000
   OR (camara_mp >= 100 AND carga_w >= 60)
ORDER BY precio;

-- @urgente
-- Para quien necesita un celular HOY: hay unidades en alguna sucursal (AND),
-- el precio está en un rango (BETWEEN) y es nuevo O tiene al menos 3 meses de garantía.
SELECT p.nombre, s.nombre AS sucursal, st.unidades, p.precio
FROM productos AS p
JOIN stock AS st ON st.id_producto = p.id_producto
JOIN sucursales AS s ON s.id_sucursal = st.id_sucursal
WHERE st.unidades > 0
  AND p.precio BETWEEN 200000 AND 560000
  AND (p.estado = 'nuevo' OR p.garantia_meses >= 3)
ORDER BY p.precio, s.nombre;

-- @sin_stock
-- Productos agotados en TODAS las sucursales: NOT EXISTS (no existe ninguna fila con unidades).
SELECT p.nombre
FROM productos AS p
WHERE NOT EXISTS (
  SELECT 1 FROM stock AS st
  WHERE st.id_producto = p.id_producto AND st.unidades > 0
);

-- @sabados
-- Celulares que se pueden retirar un sábado: la sucursal abre los sábados Y hay unidades.
SELECT DISTINCT p.nombre
FROM productos AS p
JOIN stock AS st ON st.id_producto = p.id_producto
JOIN sucursales AS s ON s.id_sucursal = st.id_sucursal
WHERE s.abre_sabados = 1 AND st.unidades > 0
ORDER BY p.nombre;

-- @pedidos_por_cliente
-- Relación clientes - pedidos - productos (JOIN de tres tablas).
SELECT c.nombre || ' ' || c.apellido AS cliente, p.nombre AS producto, pe.metodo_pago, pe.total
FROM pedidos AS pe
JOIN clientes AS c ON c.id_cliente = pe.id_cliente
JOIN productos AS p ON p.id_producto = pe.id_producto
ORDER BY pe.fecha;

-- @para_mirta
-- El celular que se le recomienda a Mirta: nuevo Y con descuento Y batería grande
-- Y con unidades para retirar hoy en alguna sucursal (EXISTS). El resultado marca la tarjeta en la página.
SELECT p.id_producto
FROM productos AS p
WHERE p.estado = 'nuevo'
  AND p.precio < p.precio_lista
  AND p.bateria_mah >= 5000
  AND EXISTS (SELECT 1 FROM stock AS st WHERE st.id_producto = p.id_producto AND st.unidades > 0)
ORDER BY p.precio
LIMIT 1;
