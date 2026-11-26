// Cosntantes para toda la app

export const ESTADO_COMPLETADA = "completada";

// Estados del tablero
export const ESTADOS = ["pendiente", "progreso", ESTADO_COMPLETADA];

// Estado para las tarjetas
export const ETIQUETAS_ESTADO = {
  pendiente: "Pendiente",
  progreso: "En progreso",
  completada: "Completada",
};

export const PRIORIDADES = ["baja", "media", "alta"];

// Colores para distinguir las prioridades
export const COLOR_PRIORIDAD = {
  baja: "success",
  media: "warning",
  alta: "danger",
};

// Longitud minima para los textos
export const LONGITUD_MINIMA = {
  nombre: 9,
  descripcion: 16,
  asignadoA: 9,
};

// Claves de localStorage
export const STORAGE_KEYS = {
  tareas: "tareas",
  siguienteId: "siguienteId", // para el contador
};
