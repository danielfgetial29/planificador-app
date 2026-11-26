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
  #task = [];
  #nexId = 1;
  #storage;

  constructor(storage = obtenerLocalStorage()) {
    this.#storage = storage;
  }
}
