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

// Reglas para cada campo del formulario
const REGLAS = [
  {
    campo: "titulo",
    validar: textoMinimo("El título", LONGITUD_MINIMA.nombre),
  },
  {
    campo: "descripcion",
    validar: textoMinimo("La descripción", LONGITUD_MINIMA.descripcion),
  },
  {
    campo: "asignadoA",
    validar: textoMinimo("El responsable", LONGITUD_MINIMA.asignadoA),
  },
  {
    campo: "fecha",
    validar: (valor) =>
      valor.trim() ? "" : "Debes elegir una fecha límite de entrega.",
  },
  {
    campo: "estado",
    validar: (valor) =>
      ESTADOS.includes(valor) ? "" : "Debes seleccionar un estado.",
  },
];

// Muestra u oculta el mensaje de error usando la clase de Bootstrap
function marcarCampo(campo, mensaje) {
  const feedback = campo.parentElement.querySelector(".invalid-feedback");

  if (mensaje) {
    campo.classList.add("is-invalid");
    campo.setAttribute("aria-invalid", "true");
    if (feedback) feedback.textContent = mensaje;
  } else {
    limpiarErrorCampo(campo);
  }
}
