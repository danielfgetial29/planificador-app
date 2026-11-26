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

export function iniciarApp() {
  const modalEl = document.getElementById("modalTarea");
  const form = document.getElementById("formTarea");
  const descripcion = document.getElementById("descripcion");
  const contador = document.getElementById("contadorDescripcion");
  const tablero = document.querySelector(".tablero"); // contiene las 3 listas
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  const taskManager = new TaskManager();

  // Carga las tareas guardadas
  taskManager.load();

  // ----- Acciones sobre las tareas -----

  // Marcar una tarea como completada, redibuja el tablero y guarda
  function completarTarea(taskId) {
    const tarea = taskManager.findTaskById(taskId);
    if (!tarea) return;

    taskManager.updateTask(tarea.id, ESTADO_COMPLETADA);
    renderBoard(taskManager);
    taskManager.save();
  }
}
