const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Función para guardar
const guardar = () => localStorage.setItem("tareas", JSON.stringify(tareas));

function iniciarApp() {}
