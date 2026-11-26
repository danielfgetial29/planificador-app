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
