import { ESTADOS } from "../config/constants.js";
import { crearElemento } from "../utils/dom.js";
import { createTaskCard } from "./taskCard.js";

const obtenerLista = (estado) =>
  document.querySelector(`[data-lista="${estado}"]`);
