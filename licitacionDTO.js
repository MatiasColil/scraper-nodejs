/**
 * Clase que representa una licitación
 * @class
 * @param {string} nombre - Nombre de la licitación
 * @param {string} estado - Estado de la licitación
 * @param {string} codigo - Código de la licitación
 * @param {string} entidad - Entidad que realiza la licitación
 * @param {string} fecha_cierre - Fecha de cierre
 * @param {string} link - Link a la licitación
 * @param {string} duracion_contrato - Tiempo de duración del contrato
 * @param {string} plazas - Plazas disponibles - La API no entrega esta información
 * @param {string} monto_minimo - Monto mínimo de la licitación en UTM
 */

class Licitacion {
  constructor(
    nombre,
    estado,
    codigo,
    entidad,
    fecha_cierre,
    link,
    duracion_contrato,
    plazas,
    monto_minimo
  ) {
    this.nombre = nombre;
    this.estado = estado;
    this.codigo = codigo;
    this.entidadLicitante = entidad;
    this.fechaCierre = fecha_cierre;
    this.link = link;
    this.duracionContrato = duracion_contrato;
    this.plazas = plazas;
    this.montoMinimo = monto_minimo;
  }
}
export default Licitacion;
