async function cargarComponente(id, ruta) {
  const contenedor = document.querySelector(id);
  try {
    const respuesta = await fetch(ruta);

    if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`);
    contenedor.innerHTML = await respuesta.text();
  } catch (error) {
    console.error(`No se pudo cargar ${ruta}:`, error);
  }
}

Promise.all([
  cargarComponente("#navbar", "components/navbar.html"),
  cargarComponente("#footer", "components/footer.html"),
  cargarComponente("#modal-tarea", "components/task-modal.html"),
]).then(() => iniciarApp());
