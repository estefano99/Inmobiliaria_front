import clienteAxios from "@/config/axios";
import { tipoContratoRoute } from "@/lib/routes";
import { InmuebleType } from "@/types/types";
import { isAxiosError } from "axios";

const crearInmueble = async (contrato: InmuebleType) => {
  try {
    const { data } = await clienteAxios.post(tipoContratoRoute, inmueble);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export {
  crearInmueble
}