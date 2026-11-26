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
