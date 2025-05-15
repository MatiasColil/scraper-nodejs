import * as fs from "fs";
import * as XLSX from "xlsx";
XLSX.set_fs(fs);

/**
 * Almacena los datos de licitaciones en formato JSON y Excel para su posterior análisis.
 *
 * Esta función:
 * 1. Guarda todas las licitaciones en un archivo JSON
 * 2. Actualiza o crea un archivo Excel con los datos
 * 3. Preserva los registros históricos en el Excel, añadiendo solo nuevos registros
 *
 * @param {Array<object>} licitaciones - Colección de objetos Licitacion a guardar
 * @returns {Promise<void>} - Promesa que se resuelve cuando ambos archivos han sido escritos
 * @throws {Error} - Si ocurre un error durante la escritura de los archivos
 */
async function write(licitaciones) {
  fs.writeFile("dataLicitaciones.json", JSON.stringify(licitaciones), (err) => {
    if (err) {
      console.error("Error writing file:", err);
    }

    excelFile(licitaciones);
  });
}

/**
 * Crea o actualiza un archivo Excel con los datos de licitaciones.
 *
 * Esta función:
 * 1. Verifica si el archivo Excel ya existe
 * 2. Si existe, lee los datos actuales y añade solo los nuevos registros (evitando duplicados)
 * 3. Si no existe, crea un nuevo archivo con todos los registros
 * 4. Utiliza el campo 'codigo' como identificador único para evitar duplicados
 *
 * @param {Array<object>} licitaciones - Colección de objetos Licitacion a guardar en Excel
 */
function excelFile(licitaciones) {
  const excelFilePath = "dataLicitaciones.xlsx";
  if (fs.existsSync(excelFilePath)) {
    //verifica si existe el archivo, si existe lo actualiza
    const workbook = XLSX.readFile(excelFilePath);
    const worksheet = workbook.Sheets["Licitaciones"];
    const data = XLSX.utils.sheet_to_json(worksheet);

    //ids únicos de los elementos existentes
    const idUnico = new Set();
    data.forEach((item) => {
      if (item.codigo) {
        idUnico.add(item.codigo);
      }
    });
    //filtra los nuevos elementos que no están en el archivo
    const newUniqueItems = licitaciones.filter(
      (item) => !idUnico.has(item.codigo)
    );

    const dataCombinada = [...data, ...newUniqueItems];
    const newWorksheet = XLSX.utils.json_to_sheet(dataCombinada);
    workbook.Sheets["Licitaciones"] = newWorksheet;
    XLSX.writeFile(workbook, excelFilePath);
    console.log("Excel file has been updated");
  } else {
    //caso contrario crea el archivo
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(licitaciones);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Licitaciones");
    XLSX.writeFileXLSX(workbook, excelFilePath);
    console.log("Excel file has been created");
  }
}

export default write;
