class Licitacion {
  constructor(
    nombre, //Nombre de la licitación
    codigo, //Código de la licitación
    entidad, //Entidad que realiza la licitación
    fecha_cierre, // Fecha de cierre
    link, //Link a la licitación
    duracion, //Tiempo de duración del contrato
    plazas, //Plazas disponibles - La API no entrega esta información
    monto_minimo //Monto mínimo de la licitación en UTM
  ) {
    this.nombre = nombre;
    this.codigo = codigo;
    this.entidad = entidad;
    this.fechaCierre = fecha_cierre;
    this.link = link;
    this.duracion = duracion;
    this.plazas = plazas;
    this.montoMinimo = monto_minimo;
  }
}
export default Licitacion;
