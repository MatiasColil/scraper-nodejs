import axios from "axios";
import "dotenv/config";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Obtiene datos generales de licitaciones desde la API de Mercado Público.
 *
 * Esta función realiza una solicitud HTTPS GET al endpoint proporcionado
 * y retorna la respuesta de la API.
 *
 * @param {string} url - URL completa del endpoint de la API de Mercado Público
 * @returns {Promise<Object>} Datos obtenidos desde la API en formato JSON
 * @throws {Error} Si falla la conexión o la API retorna un error
 */
export async function fetchData(url) {
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    throw error;
  }
}

/**
 * Obtiene los detalles completos de una licitación específica.
 *
 * Esta función consulta la API de Mercado Público utilizando el código
 * externo de una licitación para obtener información detallada sobre la misma.
 * Requiere un ticket de acceso a la API que se obtiene desde variables de entorno.
 *
 * @param {string} codigo - Código externo único de la licitación a consultar
 * @returns {Promise<Object>} Objeto con todos los detalles de la licitación
 * @throws {Error} Si falla la conexión o la API retorna un error
 */
export async function licitacionDeatails(codigo) {
  try {
    const url = `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?codigo=${codigo}&ticket=${process.env.TICKET}`;
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    throw error;
  }
}
