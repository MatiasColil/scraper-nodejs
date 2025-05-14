import "dotenv/config";
import moment from "moment";
import { callAPI, sleep } from "./scrap.js";
import * as fs from "fs";
import * as XLSX from "xlsx";
XLSX.set_fs(fs);

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

  fs.writeFile("dataLicitaciones.json", JSON.stringify(licitaciones), (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      if (fs.existsSync("dataLicitaciones.xlsx")) {
        console.log("Excel file already exists");
        const workbook = XLSX.readFile("dataLicitaciones.xlsx");
        const worksheet = workbook.Sheets["Licitaciones"];
        const data = XLSX.utils.sheet_to_json(worksheet);

        const idUnico = new Set();
        data.forEach((item) => {
          if (item.codigo) {
            idUnico.add(item.codigo);
          }
        });

        const newUniqueItems = licitaciones.filter(
          (item) => !idUnico.has(item.codigo)
        );

        const dataCombinada = [...data, ...newUniqueItems];
        const newWorksheet = XLSX.utils.json_to_sheet(dataCombinada);
        workbook.Sheets["Licitaciones"] = newWorksheet;
        XLSX.writeFile(workbook, "dataLicitaciones.xlsx");
        console.log("Excel file has been updated");
      } else {
        console.log("File has been written");
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(licitaciones);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Licitaciones");
        XLSX.writeFileXLSX(workbook, "dataLicitaciones.xlsx");
        console.log("Excel file has been created");
      }
    }
  });

  return licitaciones;
}

export default main;
