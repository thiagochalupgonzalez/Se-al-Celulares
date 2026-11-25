/* huella.js - Simulador de huella de carbono (solo sostenibilidad.html)
   Fórmula: gramos de CO2 = peso (GB) x energía (kWh/GB) x intensidad (g CO2/kWh) */
(function () {
  'use strict';
  const valor = function (id) { return Number(document.getElementById(id).value) || 0; };
  const gramos = function (mb, visitas) {
    return (mb / 1024) * valor('h-kwh') * valor('h-g') * visitas;      // MB -> GB
  };
  // Formato de números según el idioma de la página: 0,19 en español y 0.19 en inglés.
  const formato = function (n) { return n.toLocaleString(document.documentElement.lang === 'en' ? 'en-US' : 'es-AR', { maximumFractionDigits: 2 }); };
  const texto = function (g) { return formato(g) + (g >= 1000 ? ' g (' + formato(g / 1000) + ' kg)' : ' g'); };

  function calcular() {
    const mb = valor('h-propio') + valor('h-externo');
    const visitas = valor('h-visitas');
    document.getElementById('r-visita').textContent = texto(gramos(mb, 1));
    document.getElementById('r-mes').textContent = texto(gramos(mb, visitas));
    document.getElementById('r-fotos').textContent = texto(gramos(mb + valor('h-fotos'), visitas));
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.simulador input').forEach(function (i) { i.addEventListener('input', calcular); });
    document.addEventListener('idioma-cambiado', calcular);
    calcular();
  });
})();
