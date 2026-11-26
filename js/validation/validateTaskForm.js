import { ESTADOS, LONGITUD_MINIMA } from "../config/constants.js";

// Crea una regla para campos de texto: no vacío y con longitud mínima.
const textoMinimo = (sujeto, minimo) => (valor) => {
  const texto = valor.trim();

  if (texto.length === 0) {
    return `${sujeto} no puede estar en blanco.`;
  }
  if (texto.length < minimo) {
    return `${sujeto} debe tener al menos ${minimo} caracteres (ahora tiene ${texto.length}).`;
  }
  return "";
};
