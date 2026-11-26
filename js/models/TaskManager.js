import { ESTADOS, PRIORIDADES, STORAGE_KEYS } from "../config/constants.js";
import { Task } from "./Task.js";

// Obtener de manera el localStore
function obtenerLocalStorage() {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

// Comprobar que los datos leidos tengan forma de tarea
function tareaValida(dato) {
  return (
    dato !== null &&
    typeof dato === "object" &&
    Number.isInteger(dato.id) &&
    typeof dato.nombre === "string" &&
    typeof dato.descripcion === "string" &&
    typeof dato.asignadoA === "string" &&
    typeof dato.fechaDeEntrega === "string" &&
    ESTADOS.includes(dato.estado)
  );
}

export class TaskManager {
  #tasks = [];
  #nextId = 1;
  #storage;

  constructor(storage = obtenerLocalStorage()) {
    this.#storage = storage;
  }

  // buscar tarea por su id
  #findTask(taskId) {
    let tareaEncontrada = null;

    for (const task of this.#tasks) {
      if (task.id === taskId) {
        tareaEncontrada = task;
        break;
      }
    }

    return tareaEncontrada;
  }

  // Devuelve una copia palna de la tarea con ese id o null si no existe
  findByTaskById(taskId) {
    const task = this.#findTask(taskId);
    return task ? task.toJSON() : null;
  }

  // Devuelve todas las tareas
  getAllTasks() {
    return this.#tasks.map((task) => task.toJSON());
  }

  // Devuelve las tareas que tienen el estado indicado.
  getTasksWithStatus(status) {
    return this.#tasks
      .filter((task) => task.estado === status)
      .map((task) => task.toJSON());
  }

  // Agrega una tarea con su id unico
  addTask(task) {
    if (!ESTADOS.includes(task.estado)) {
      throw new Error(`Estado inválido: "${task.estado}"`);
    }

    const nuevaTarea = new Task({ ...task, id: this.#nextId++ });
    this.#tasks.push(nuevaTarea);

    return nuevaTarea.toJSON();
  }
}
