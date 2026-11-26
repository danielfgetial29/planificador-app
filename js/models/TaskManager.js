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
  findTaskById(taskId) {
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

  // Elimina una tarea por ID. Devuelve true si existía.
  deleteTask(taskId) {
    const cantidadInicial = this.#tasks.length;
    this.#tasks = this.#tasks.filter((task) => task.id !== taskId);
    return this.#tasks.length < cantidadInicial;
  }

  // Actualiza el estado de una tarea. Devuelve true si se actualizó.
  updateTask(taskId, status) {
    if (!ESTADOS.includes(status)) return false;

    const task = this.#findTask(taskId);
    if (!task) return false;

    task.estado = status;
    return true;
  }

  // Cambia la persona asignada a una tarea.
  assignTask(taskId, assignee) {
    const responsable = String(assignee ?? "").trim();
    if (!responsable) return false;

    const task = this.#findTask(taskId);
    if (!task) {
      return false;
    }

    task.asignadoA = responsable;
    return true;
  }

  // ----- Persistencia en localStorage -----

  // Guarda las tareas y el contador de IDs. Devuelve true si se guardó.
  save() {
    if (!this.#storage) return false;

    try {
      // localStorage solo guarda strings: el array se convierte a JSON.
      this.#storage.setItem(STORAGE_KEYS.tareas, JSON.stringify(this.#tasks));
      this.#storage.setItem(STORAGE_KEYS.siguienteId, String(this.#nextId));
      return true;
    } catch (error) {
      // Almacenamiento lleno o no disponible: la app sigue funcionando.
      console.error("No se pudieron guardar las tareas:", error);
      return false;
    }
  }
  // Carga las tareas y el contador de IDs guardados.
  // Devuelve true si se cargó algo; si no hay nada guardado, no hace nada.
  load() {
    if (!this.#storage) return false;

    try {
      const guardadas = this.#storage.getItem(STORAGE_KEYS.tareas);
      if (guardadas === null) return false; // No hay nada guardado

      const datos = JSON.parse(guardadas); // Puede lanzar error si no es JSON
      if (!Array.isArray(datos)) return false;

      this.#tasks = datos.filter(tareaValida).map(
        (dato) =>
          new Task({
            ...dato,
            prioridad: PRIORIDADES.includes(dato.prioridad)
              ? dato.prioridad
              : "media",
          }),
      );

      // Contador: se convierte de string a número. Además se garantiza que
      // sea mayor que cualquier ID existente para que nunca se repita.
      const idGuardado = Number(
        this.#storage.getItem(STORAGE_KEYS.siguienteId),
      );
      const idMaximo = this.#tasks.reduce((max, t) => Math.max(max, t.id), 0);
      this.#nextId =
        Number.isInteger(idGuardado) && idGuardado > idMaximo
          ? idGuardado
          : idMaximo + 1;

      return true;
    } catch (error) {
      console.error("No se pudieron cargar las tareas guardadas:", error);
      return false;
    }
  }
}
