import clienteAxios from "@/config/axios";
import { dashboardRouteEstadosContratos, dashboardRouteTotalDatos } from "@/lib/routes";
import { isAxiosError } from "axios";

const dashboardObtenerTotalDatos = async () => {
  try {
    const { data } = await clienteAxios.get(`${dashboardRouteTotalDatos}`);
    return data;
  } catch (error) {
    console.log("[ERROR] obtener Total datos dashboard: ", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const estadosContratosPorMes = async () => {
  try {
    const { data } = await clienteAxios.get(`${dashboardRouteEstadosContratos}`);
    return data;
  } catch (error) {
    console.log("[ERROR] obtener Total datos dashboard estados: ", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export {
  dashboardObtenerTotalDatos,
  estadosContratosPorMes
}