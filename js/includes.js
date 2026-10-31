async function cargarComponente(selector, ruta) {
  const contenedor = document.querySelector(selector);
  try {
    const respuesta = await fetch(ruta);
    if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`);
    contenedor.innerHTML = await respuesta.text();
  } catch (error) {
    console.error(`No se pudo cargar ${ruta}:`, error);
  }
}

cargarComponente("#navbar", "components/navbar.html");
cargarComponente("#footer", "components/footer.html");
