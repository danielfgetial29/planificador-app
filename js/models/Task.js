// Clase tarea para manejar su esctructura
export class Task {
  constructor({
    id,
    nombre,
    descripcion,
    asignadoA,
    fechaDeEntrega,
    estado,
    prioridad = "media",
  }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.asignadoA = asignadoA;
    this.fechaDeEntrega = fechaDeEntrega;
    this.estado = estado;
    this.prioridad = prioridad;
  }

  // Objeto plano para convertir a JSON
  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      asignadoA: this.asignadoA,
      fechaDeEntrega: this.fechaDeEntrega,
      estado: this.estado,
      prioridad: this.prioridad,
    };
  }
}
