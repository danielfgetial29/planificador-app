export class TaskManager {
  #tasks = [];
  #nextId = 1;

  // Obtener todas las tareas
  getAllTasks() {
    return this.#tasks.map((task) => ({ ...task }));
  }

  // Obtener tareas según su estado
  getTasksWithStatus(status) {
    return this.#tasks
      .filter((task) => task.estado === status)
      .map((task) => ({ ...task }));
  }

  // Agregar una tarea
  addTask(task) {
    const nuevaTarea = {
      id: this.#nextId++,
      nombre: task.nombre,
      descripcion: task.descripcion,
      asignadoA: task.asignadoA,
      fechaDeEntrega: task.fechaDeEntrega,
      estado: task.estado,
    };

    this.#tasks.push(nuevaTarea);

    return { ...nuevaTarea };
  }

  // Eliminar una tarea
  deleteTask(taskId) {
    const cantidadInicial = this.#tasks.length;

    this.#tasks = this.#tasks.filter((task) => task.id !== taskId);

    return this.#tasks.length < cantidadInicial;
  }

  // Actualizar el estado de una tarea
  updateTask(taskId, status) {
    if (!ESTADOS.includes(status)) {
      return false;
    }

    const task = this.#tasks.find((task) => task.id === taskId);

    if (!task) {
      return false;
    }

    task.estado = status;
    return true;
  }

  // Asignar un responsable
  assignTask(taskId, assignee) {
    const responsable = assignee.trim();

    if (!responsable) {
      return false;
    }

    const task = this.#tasks.find((task) => task.id === taskId);

    if (!task) {
      return false;
    }

    task.asignadoA = responsable;
    return true;
  }
}
