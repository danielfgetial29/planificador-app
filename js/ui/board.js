import { ESTADOS } from "../config/constants.js";
import { crearElemento } from "../utils/dom.js";
import { createTaskCard } from "./taskCard.js";

const obtenerLista = (estado) =>
  document.querySelector(`[data-lista="${estado}"]`);

// Redibuja todo el tablero apartir de las tareas TaskManager
export function renderBoard(taskManager) {
  ESTADOS.forEach((estado) => {
    const lista = obtenerLista(estado);
    const tareas = taskManager.getTasksWithStatus(estado);

    lista.replaceChildren(); // 1. limpiar

    if (tareas.length === 0) {
      lista.append(
        crearElemento("p", "text-center text-secondary my-4", "Sin tareas"),
      );
    } else {
      tareas.forEach((tarea) => lista.append(createTaskCard(tarea))); // se crean la tarjetas y se agregan a su columna
    }

    document.querySelector(`[data-contador="${estado}"]`).textContent =
      tareas.length;
  });

  // Actualizacion del contador
  const total = taskManager.getAllTasks().length;
  document.getElementById("contador-tareas").textContent =
    `${total} ${total === 1 ? "tarea" : "tareas"}`;
}
