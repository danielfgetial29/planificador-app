const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Función para guardar
const guardar = () => localStorage.setItem("tareas", JSON.stringify(tareas));

const COLOR_PRIORIDAD = { baja: "success", media: "warning", alta: "danger" };
const ESTADOS = ["pendiente", "progreso", "completada"];

// Fecha local
const formatearFecha = (fecha) =>
  new Date(`${fecha}T00:00`).toLocaleDateString("es", {
    day: "numeric",
    month: "short",
  });

function iniciarApp() {}
