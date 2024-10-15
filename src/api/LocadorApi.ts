import clienteAxios from "@/config/axios"
import { LocadorType } from "@/types/types"
import { isAxiosError } from "axios";
import { locadorRoute} from "@/lib/routes";

const obtenerLocadores = async () => {
  try {
    const { data } = await clienteAxios.get(locadorRoute);
    console.log(data)
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const crearLocador = async (locador: LocadorType) => {
  try {
    const { data } = await clienteAxios.post(locadorRoute, locador);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const editarLocador = async (locatario: LocadorType) => {
  const {id, nombre, apellido, dni, telefono} = locatario;
  try {
    const { data } = await clienteAxios.put(`${locadorRoute}/${id}`, {nombre, apellido, dni, telefono});
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const eliminarLocador = async (locador: LocadorType) => {
  const {id} = locador;
  try {
    const { data } = await clienteAxios.delete(`${locadorRoute}/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}


export {
  obtenerLocadores,
  crearLocador,
  editarLocador,
  eliminarLocador
}