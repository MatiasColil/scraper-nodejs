/**
 * Función que realiza una pausa en la ejecución del código.
 * @param {number} ms - Tiempo en milisegundos para pausar la ejecución
 * @returns {Promise<void>} - Promesa que se resuelve después de la pausa
 */

export default async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
