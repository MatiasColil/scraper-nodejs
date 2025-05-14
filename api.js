import axios from "axios";
import "dotenv/config";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export async function fetchData(url) {
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Error al llamar a la API:", error);
    throw error;
  }
}

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
