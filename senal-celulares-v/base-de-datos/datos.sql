-- datos.sql - Datos de ejemplo (inventados) para probar la base de datos de "Señal".
PRAGMA foreign_keys = ON;

INSERT INTO productos (id_producto, nombre, estado, precio, precio_lista, pantalla_pulg, panel, hz, ram_gb, almacenamiento_gb, camara_mp, bateria_mah, carga_w, red, colores, garantia_meses, bateria_salud, observaciones_es, observaciones_en, descripcion_es, descripcion_en, imagen) VALUES
  (1, 'Línea E 4G', 'nuevo', 249999, 249999, 6.5, 'LCD', 90, 4, 64, 13, 5000, 10, '4G', 'azul marino,gris', 12, NULL, NULL, NULL, 'Lo esencial: pantalla grande y batería para todo el día.', 'The essentials: a big screen and all-day battery.', 'linea-e.svg'),
  (2, 'Línea G 5G', 'nuevo', 331499, 389999, 6.6, 'LCD', 120, 4, 128, 50, 5000, 15, '5G', 'azul marino,gris', 12, NULL, NULL, NULL, 'Pantalla fluida de 120 Hz y 128 GB de espacio.', 'Smooth 120 Hz display and 128 GB of storage.', 'linea-g.svg'),
  (3, 'Línea G Power', 'nuevo', 459999, 459999, 6.7, 'LCD', 120, 6, 256, 50, 5000, 30, '5G', 'fucsia,negro', 12, NULL, NULL, NULL, 'Batería de 5000 mAh y carga rápida de 30 W.', '5000 mAh battery and 30 W fast charging.', 'linea-power.svg'),
  (4, 'Línea G Plus', 'nuevo', 529999, 529999, 6.7, 'AMOLED', 120, 8, 256, 50, 5000, 33, '5G', 'azul,fucsia', 12, NULL, NULL, NULL, 'Pantalla AMOLED y 256 GB para ir sobrado de espacio.', 'AMOLED display and 256 GB for plenty of room.', 'linea-plus.svg'),
  (5, 'Edge Pro', 'nuevo', 639999, 799999, 6.7, 'pOLED', 144, 8, 256, 50, 4500, 68, '5G', 'grafito,azul marino', 12, NULL, NULL, NULL, 'Cámara triple de 50 MP y pantalla curva.', 'Triple 50 MP camera and a curved display.', 'edge.svg'),
  (6, 'Edge Ultra', 'nuevo', 1499999, 1499999, 6.8, 'pOLED', 165, 12, 512, 200, 5000, 90, '5G', 'fucsia,azul marino', 12, NULL, NULL, NULL, 'Cámara de 200 MP y carga de 90 W.', '200 MP camera and 90 W charging.', 'edge-ultra.svg'),
  (7, 'Edge Max', 'nuevo', 1299999, 1299999, 6.7, 'pOLED', 144, 12, 256, 50, 4800, 80, '5G', 'azul marino,grafito', 12, NULL, NULL, NULL, 'Potencia de sobra y carga de 80 W.', 'Plenty of power and 80 W charging.', 'edge-max.svg'),
  (8, 'Razr Flip', 'nuevo', 1199999, 1199999, 6.9, 'pOLED plegable', 120, 8, 256, 50, 4200, 30, '5G', 'rosa,azul marino', 12, NULL, NULL, NULL, 'Plegable de bolsillo con pantalla externa.', 'Pocket-size foldable with an outer screen.', 'flip.svg'),
  (9, 'Línea G Power (usado)', 'usado', 289999, 459999, 6.7, 'LCD', 120, 6, 256, 50, 5000, 30, '5G', 'fucsia,negro', 3, 88, 'Rayón leve en el marco, pantalla sin marcas', 'Light scratch on the frame, screen without marks', 'Batería al 88%. Rayón leve en el marco.', 'Battery at 88%. Light scratch on the frame.', 'linea-power.svg'),
  (10, 'Edge Pro (usado)', 'usado', 499999, 799999, 6.7, 'pOLED', 144, 8, 256, 50, 4500, 68, '5G', 'grafito,azul marino', 3, 85, 'Golpe leve en una esquina, funciona perfecto', 'Minor bump on one corner, works perfectly', 'Batería al 85%. Golpe leve en una esquina.', 'Battery at 85%. Minor bump on one corner.', 'edge.svg');

INSERT INTO sucursales (id_sucursal, nombre, zona, abre_sabados) VALUES
  (1, 'Sucursal Centro', 'Centro', 1),
  (2, 'Sucursal Norte', 'Norte', 1),
  (3, 'Sucursal Sur', 'Sur', 0);

-- Unidades por producto y sucursal: (id_producto, id_sucursal, unidades)
INSERT INTO stock (id_producto, id_sucursal, unidades) VALUES
  (1, 1, 5),
  (1, 2, 3),
  (1, 3, 2),
  (2, 1, 4),
  (2, 2, 0),
  (2, 3, 6),
  (3, 1, 2),
  (3, 2, 2),
  (3, 3, 0),
  (4, 1, 3),
  (4, 2, 1),
  (4, 3, 1),
  (5, 1, 1),
  (5, 2, 2),
  (5, 3, 0),
  (6, 1, 1),
  (6, 2, 0),
  (6, 3, 0),
  (7, 1, 0),
  (7, 2, 1),
  (7, 3, 0),
  (8, 1, 2),
  (8, 2, 0),
  (8, 3, 1),
  (9, 1, 1),
  (9, 2, 0),
  (9, 3, 0),
  (10, 1, 0),
  (10, 2, 1),
  (10, 3, 0);

INSERT INTO clientes (id_cliente, nombre, apellido, email) VALUES
  (1, 'Rosa', 'Pérez', 'rosa@correo.example'),
  (2, 'Julián', 'Ríos', 'julian@correo.example');

INSERT INTO pedidos (id_pedido, id_cliente, id_producto, id_sucursal, fecha, metodo_pago, cuotas, total) VALUES
  (1, 1, 2, NULL, '2026-10-20', 'tarjeta', 12, 331499),
  (2, 2, 3, 1, '2026-10-21', 'efectivo', 1, 459999);
