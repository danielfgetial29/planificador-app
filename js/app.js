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

function iniciarApp() {
  const modalEl = document.getElementById("modalTarea");
  const form = document.getElementById("formTarea");
  const descripcion = document.getElementById("descripcion");
  const contador = document.getElementById("contadorDescripcion");
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

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

    if (!form.checkValidity()) {
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
