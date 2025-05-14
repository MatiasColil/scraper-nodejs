import { licitacionDeatails, fetchData } from "./api.js";
import { montoMinimo, duracionContrato } from "./constants.js";
import Licitacion from "./licitacionDTO.js";

export async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function callAPI(url) {
  try {
    const data = await fetchData(url);

    const filteredData = data?.Listado.filter((item) => {
      return (
        item.Nombre.toLowerCase().includes("estacionami") ||
        item.Nombre.toLowerCase().includes("parquímetro") ||
        item.Nombre.toLowerCase().includes("parquimetro")
      );
    });

    const temporal = [];

    for (const item of filteredData || []) {
      await sleep(2000);

      const dataById = await licitacionDeatails(item.CodigoExterno);

      const licitacionData = dataById?.Listado?.[0];
      const estado = dataById?.Listado?.[0]?.Estado;
      const nombre = licitacionData?.Nombre ?? "No especifica";
      const codigoExterno = licitacionData?.CodigoExterno ?? "No especifica";
      const nombreOrganismo =
        licitacionData?.Comprador?.NombreOrganismo ?? "No especifica";
      const fechaCierre =
        licitacionData?.Fechas?.FechaCierre ?? "No especifica";
      const urlPublica = `http://www.mercadopublico.cl/Procurement/Modules/RFB/DetailsAcquisition.aspx?idlicitacion=${item.CodigoExterno}`;

      let tiempoDuracion = "No especifica";
      if (
        licitacionData?.TiempoDuracionContrato &&
        licitacionData?.UnidadTiempoDuracionContrato
      ) {
        tiempoDuracion = `${licitacionData.TiempoDuracionContrato} ${
          duracionContrato[licitacionData.UnidadTiempoDuracionContrato]
        }`;
      }

      const monto = montoMinimo[licitacionData?.Tipo] ?? "No especifica";

      const licitacion = new Licitacion(
        nombre,
        estado,
        codigoExterno,
        nombreOrganismo,
        fechaCierre,
        urlPublica,
        tiempoDuracion,
        "No especifica. Ver documentos adjuntos de la licitación.", // No se puede obtener la cantidad de estacionamientos dado la información de recibidad de la API. Ver archivos adjuntos
        monto
      );

      temporal.push(licitacion);
    }
    return temporal;
  } catch (error) {
    console.error("Error al llamar a la API:", error);
  }
}
