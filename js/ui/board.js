import { ESTADOS } from "../config/constants.js";
import { crearElemento } from "../utils/dom.js";
import { createTaskCard } from "./taskCard.js";

const obtenerLista = (estado) =>
  document.querySelector(`[data-lista="${estado}"]`);

//
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
      tareas.forEach((tarea) => lista.append(createTaskCard(tarea))); // 2-4
    }

    document.querySelector(`[data-contador="${estado}"]`).textContent =
      tareas.length;
  });

  const total = taskManager.getAllTasks().length;
  document.getElementById("contador-tareas").textContent =
    `${total} ${total === 1 ? "tarea" : "tareas"}`;
}
