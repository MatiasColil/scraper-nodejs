import "dotenv/config";
import moment from "moment";
import callAPI from "./scrap.js";
import sleep from "./helper.js";
import write from "./writeFile.js";
import * as fs from "fs";
import * as XLSX from "xlsx";
XLSX.set_fs(fs);

/**
 * Obtiene licitaciones relacionadas con estacionamientos de Mercado Público
 * para un periodo específico de días.
 *
 * Esta función ejecuta el siguiente proceso:
 * 1. Recorre un rango de días hacia atrás desde la fecha actual
 * 2. Para cada día, consulta licitaciones en estado "publicada" y "adjudicada"
 * 3. Filtra aquellas relacionadas con estacionamientos mediante callAPI
 * 4. Acumula todos los resultados en un único array
 * 5. Guarda los resultados en archivos JSON y Excel mediante la función write
 *
 * @param {number} cantidadDias - Número de días hacia atrás para consultar licitaciones
 * @returns {Promise<Array<Object>>} - Array de objetos Licitacion con la información procesada
 * @throws {Error} - Si ocurre un error en la conexión con la API o en el procesamiento de datos
 */
async function main(cantidadDias) {
  const licitaciones = [];
  for (let i = 0; i < cantidadDias; i++) {
    const fecha = moment().subtract(i, "days").format("DDMMYYYY");
    const urlPublicadas =
      `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=${fecha}&estado=publicada&ticket=` +
      process.env.TICKET;

    const urlAdjudicadas =
      `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=${fecha}&estado=adjudicada&ticket=` +
      process.env.TICKET;

    const temporalPublicadas = await callAPI(urlPublicadas);

    licitaciones.push(...temporalPublicadas);

    await sleep(2000);

    const temporalAdjudicadas = await callAPI(urlAdjudicadas);

    licitaciones.push(...temporalAdjudicadas);

    console.log(
      "Licitaciones publicadas del día: ",
      moment().subtract(i, "days").format("DD/MM/YYYY"),
      "\nCantidad: ",
      temporalPublicadas.length
    );

    console.log(
      "Licitaciones adjudicadas del día: ",
      moment().subtract(i, "days").format("DD/MM/YYYY"),
      "\nCantidad: ",
      temporalAdjudicadas.length
    );
    await sleep(2000);
  }

  console.log(licitaciones);
  console.log("Total de licitaciones: ", licitaciones.length);

  await write(licitaciones);

  return licitaciones;
}

export default main;
