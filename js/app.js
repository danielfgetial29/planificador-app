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

  // Elimina la tarea del array, redibuja el tablero y guarda.
  function eliminarTarea(taskId) {
    if (taskManager.deleteTask(taskId)) {
      renderBoard(taskManager);
      taskManager.save();
    }
  }

  // Un único listener para todos los botones de las tarjetas
  tablero.addEventListener("click", (event) => {
    const botonCompletar = event.target.closest(`.${CLASE_BTN_COMPLETAR}`);
    const botonEliminar = event.target.closest(`.${CLASE_BTN_ELIMINAR}`);
    const boton = botonCompletar ?? botonEliminar;

    if (!boton) return; // Se hizo clic en otra cosa

    const tarjeta = boton.closest("[data-task-id]");
    // El atributo de datos es un String: se convierte a Number.
    const taskId = Number(tarjeta.dataset.taskId);

    if (botonCompletar) {
      completarTarea(taskId);
    } else {
      eliminarTarea(taskId);
    }
  });

  // ----- Formulario -----

  // Contador de caracteres de la descripción.
  descripcion.addEventListener("input", () => {
    contador.textContent = `${descripcion.value.length} / ${LIMITE_DESCRIPCION}`;
  });

  // Quita el error de un campo en cuanto el usuario lo corrige.
  form.addEventListener("input", (e) => limpiarErrorCampo(e.target));

  // Formulario limpio al abrir y selecciona el estado de la columna
  modalEl.addEventListener("show.bs.modal", (e) => {
    form.reset();
    limpiarValidacion(form);
    contador.textContent = `0 / ${LIMITE_DESCRIPCION}`;
    form.elements.estado.value = e.relatedTarget?.dataset.estado || "pendiente";
  });

  modalEl.addEventListener("shown.bs.modal", () =>
    form.elements.titulo.focus(),
  );

  // Guardar: validar -> agregar al manager -> redibujar -> guardar.
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateTaskForm(form)) return; // No se agrega si hay errores

    taskManager.addTask(leerFormulario(form));
    renderBoard(taskManager);
    taskManager.save();
    modal.hide();
  });

  renderBoard(taskManager);
}
