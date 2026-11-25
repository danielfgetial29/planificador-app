import { TaskManager } from "./TaskManager.js ";

// const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// // Función para guardar
// const guardar = () => localStorage.setItem("tareas", JSON.stringify(tareas));

const COLOR_PRIORIDAD = { baja: "success", media: "warning", alta: "danger" };
const ESTADOS = ["pendiente", "progreso", "completada"];

// Fecha local
const formatearFecha = (fecha) =>
  new Date(`${fecha}T00:00`).toLocaleDateString("es", {
    day: "numeric",
    month: "short",
  });

// Validacion directa del formulario
function validateTaskForm(form) {
  const camposTexto = [
    { campo: form.titulo, minimo: 9 },
    { campo: form.descripcion, minimo: 16 },
    { campo: form.asignadoA, minimo: 9 },
  ];

  camposTexto.forEach(({ campo, minimo }) => {
    const valor = campo.value.trim();

    // limpia una posible validación anterior.
    campo.setCustomValidity("");

    // se comprueba que no esté vacío.
    if (valor.length === 0) {
      campo.setCustomValidity("Este campo es obligatorio.");
    }
    // Longitud minima
    else if (valor.length < minimo) {
      campo.setCustomValidity(`Debes ingresar al menos ${minimo} caracteres.`);
    }
  });

  return form.checkValidity();
}

// Crear la tarjeta de una tarea
function crearTarjeta(tarea) {
  const nombre = escaparHTML(tarea.nombre);
  const descripcion = escaparHTML(tarea.descripcion);
  const asignadoA = escaparHTML(tarea.asignadoA);
  const prioridad = escaparHTML(tarea.prioridad);
  const fecha = escaparHTML(tarea.fechaDeEntrega);

  return `
    <article class="card shadow-sm rounded-3" data-task-id="${tarea.id}">
      <div class="card-body p-3">
        <h3 class="h6 fw-semibold mb-1">${nombre}</h3>

        ${
          descripcion
            ? `<p class="small text-secondary mb-2">${descripcion}</p>`
            : ""
        }

        <p class="small text-secondary mb-2">
          Asignado a: ${asignadoA}
        </p>

        <div class="d-flex justify-content-between align-items-center">
          <span class="badge text-bg-${COLOR_PRIORIDAD[tarea.prioridad]} text-capitalize">
            ${prioridad}
          </span>

          <small class="text-secondary">
            ${formatearFecha(fecha)}
          </small>
        </div>

        <div class="text-end mt-3">
          <button
            type="button"
            class="btn btn-sm btn-outline-danger"
            data-action="delete"
            data-task-id="${tarea.id}"
            aria-label="Eliminar tarea ${nombre}"
          >
            <i class="bi bi-trash"></i>
            Eliminar
          </button>
        </div>
      </div>
    </article>
  `;
}

function render() {
  ESTADOS.forEach((estado) => {
    const lista = document.querySelector(`[data-lista="${estado}"]`);
    const delEstado = tareas.filter((t) => t.estado === estado);

    lista.innerHTML = delEstado.length
      ? delEstado.map(crearTarjeta).join("")
      : '<p class="text-center text-secondary my-4">Sin tareas</p>';

    document.querySelector(`[data-contador="${estado}"]`).textContent =
      delEstado.length;
  });

  document.getElementById("contador-tareas").textContent =
    `${tareas.length} ${tareas.length === 1 ? "tarea" : "tareas"}`;
}

export function iniciarApp() {
  const modalEl = document.getElementById("modalTarea");
  const form = document.getElementById("formTarea");
  const descripcion = document.getElementById("descripcion");
  const contador = document.getElementById("contadorDescripcion");
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  const taskManager = new TaskManager();

  // Contador de caracteres
  descripcion.addEventListener("input", () => {
    contador.textContent = `${descripcion.value.length} / 300`;
  });

  // Al abrir: limpiar formulario y preseleccionar el estado del botón pulsado
  modalEl.addEventListener("show.bs.modal", (e) => {
    form.reset();
    form.classList.remove("was-validated");
    contador.textContent = "0 / 300";
    form.estado.value = e.relatedTarget?.dataset.estado || "pendiente";
  });

  // Enfocar el título al terminar de abrir
  modalEl.addEventListener("shown.bs.modal", () => form.titulo.focus());

  // Guardar
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateTaskForm(form)) {
      form.classList.add("was-validated");
      return;
    }

    tareas.push({
      id: Date.now(),
      titulo: form.titulo.value.trim(),
      descripcion: form.descripcion.value.trim(),
      fecha: form.fecha.value,
      estado: form.estado.value,
      prioridad: form.prioridad.value,
    });

    guardar();
    render();
    modal.hide();
  });

  render();
}
