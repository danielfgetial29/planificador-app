import {
  COLOR_PRIORIDAD,
  ESTADO_COMPLETADA,
  ETIQUETAS_ESTADO,
} from "../config/constants.js";
import { crearElemento, formatearFecha } from "../utils/dom.js";

// Identificador de clases css para los botones de completar y eliminar
export const CLASE_BTN_COMPLETAR = "btn-completar";
export const CLASE_BTN_ELIMINAR = "btn-eliminar";

// Crea la tarjeta HTML de una tarea y la devuelve
export function createTaskCard(task) {
  const tarjeta = crearElemento("article", "card shadow-sm rounded-3");

  tarjeta.dataset.taskId = task.id;
  const cuerpo = crearElemento("div", "card-body p-3");

  const nombre = crearElemento(
    "h3",
    "h6 fw-semibold mb-1 text-break",
    task.nombre,
  );
  const descripcion = crearElemento(
    "p",
    "small text-secondary mb-2 text-break",
    task.descripcion,
  );
  const asignadoA = crearElemento(
    "p",
    "small text-secondary mb-1 text-break",
    `Asignado a: ${task.asignadoA}`,
  );
  const estado = crearElemento(
    "p",
    "small text-secondary mb-2",
    `Estado: ${ETIQUETAS_ESTADO[task.estado]}`,
  );

  // Pie: prioridad a la izquierda, fecha de entrega a la derecha.
  const pie = crearElemento(
    "div",
    "d-flex justify-content-between align-items-center",
  );
  const prioridad = crearElemento(
    "span",
    `badge text-bg-${COLOR_PRIORIDAD[task.prioridad]} text-capitalize`,
    task.prioridad,
  );
  const fecha = crearElemento(
    "small",
    "text-secondary",
    formatearFecha(task.fechaDeEntrega),
  );
  pie.append(prioridad, fecha);

  // Botones de acción.
  const acciones = crearElemento(
    "div",
    "d-flex justify-content-end gap-2 mt-3",
  );

  // Boton condicional que solo aparee si al tarea no esta completada
  if (task.estado !== ESTADO_COMPLETADA) {
    const botonCompletar = crearElemento(
      "button",
      `btn btn-sm btn-success ${CLASE_BTN_COMPLETAR}`,
      "Completar",
    );
    botonCompletar.type = "button";
    botonCompletar.setAttribute(
      "aria-label",
      `Marcar como completada la tarea ${task.nombre}`,
    );
    acciones.append(botonCompletar);
  }
}
