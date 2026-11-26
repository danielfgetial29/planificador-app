import { ESTADO_COMPLETADA } from "./config/constants.js";
import { TaskManager } from "./models/TaskManager.js";
import {
  validateTaskForm,
  limpiarErrorCampo,
  limpiarValidacion,
} from "./validation/validateTaskForm.js";
import { CLASE_BTN_COMPLETAR, CLASE_BTN_ELIMINAR } from "./ui/taskCard.js";
import { renderBoard } from "./ui/board.js";

const LIMITE_DESCRIPCION = 300;

// Lee los valores del formulario y arma el objeto de la tarea (sin id:
// el id lo genera TaskManager).
function leerFormulario(form) {
  return {
    nombre: form.elements.titulo.value.trim(),
    descripcion: form.elements.descripcion.value.trim(),
    asignadoA: form.elements.asignadoA.value.trim(),
    fechaDeEntrega: form.elements.fecha.value,
    estado: form.elements.estado.value,
    prioridad: form.elements.prioridad.value,
  };
}
