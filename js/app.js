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

//Crear la tarjeta de las tareas
function crearTarjeta(tarea) {
  return `
    <article class="card shadow-sm rounded-3">
      <div class="card-body p-3">
        <h3 class="h6 fw-semibold mb-1">${tarea.titulo}</h3>
        ${tarea.descripcion ? `<p class="small text-secondary mb-2">${tarea.descripcion}</p>` : ""}
        <div class="d-flex justify-content-between align-items-center">
          <span class="badge text-bg-${COLOR_PRIORIDAD[tarea.prioridad]} text-capitalize">${tarea.prioridad}</span>
          <small class="text-secondary">${formatearFecha(tarea.fecha)}</small>
        </div>
      </div>
    </article>`;
}

function iniciarApp() {}
