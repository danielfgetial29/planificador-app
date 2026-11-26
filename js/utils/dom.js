// Crea un elemento con clases y texto
export function crearElemento(etiqueta, clases = "", texto = "") {
  const elemento = document.createElement(etiqueta);
  if (clases) elemento.className = clases;
  if (texto) elemento.textContent = texto;
  return elemento;
}

// Formatear fecha a dia mes
export function formatearFecha(fecha) {
  return new Date(`${fecha}T00:00`).toLocaleDateString("es", {
    day: "numeric",
    month: "short",
  });
}
