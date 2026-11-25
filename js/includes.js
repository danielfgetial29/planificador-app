import { iniciarApp } from "./app.js";

async function cargarComponente(id, ruta) {
  const contenedor = document.querySelector(id);

  try {
    const respuesta = await fetch(ruta);

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status}`);
    }

    contenedor.innerHTML = await respuesta.text();
    return true;
  } catch (error) {
    console.error(`No se pudo cargar ${ruta}:`, error);
    return false;
  }
}

async function cargarAplicacion() {
  const resultados = await Promise.all([
    cargarComponente("#navbar", "components/navbar.html"),
    cargarComponente("#footer", "components/footer.html"),
    cargarComponente("#modal-tarea", "components/task-modal.html"),
  ]);

  // Iniciar la app solo si todos los componentes se cargaron.
  if (resultados.every(Boolean)) {
    iniciarApp();
  } else {
    console.error("La aplicación no pudo iniciarse porque faltan componentes.");
  }
}

cargarAplicacion();
