import clienteAxios from "@/config/axios"
import { LocatarioType } from "@/types/types"
import { isAxiosError } from "axios";
import { locatarioRoute} from "@/lib/routes";

const obtenerLocatarios = async () => {
  try {
    const { data } = await clienteAxios.get(locatarioRoute);
    return data;
  } catch (error) {
    console.log("[ERROR] obtenerLocatarios: ", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const crearLocatario = async (locatario: LocatarioType) => {
  try {
    const { data } = await clienteAxios.post(locatarioRoute, locatario);
    return data;
  } catch (error) {
    console.log("[ERROR] crearLocatario: ", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const editarLocatario = async (locatario: LocatarioType) => {
  const {id, nombre, apellido, dni, telefono} = locatario;
  try {
    const { data } = await clienteAxios.put(`${locatarioRoute}/${id}`, {nombre, apellido, dni, telefono});
    return data;
  } catch (error) {
    console.log("[ERROR] editarLocatario: ", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const eliminarLocatario = async (locatario: LocatarioType) => {
  const {id} = locatario;
  console.log(id)
  try {
    const { data } = await clienteAxios.delete(`${locatarioRoute}/${id}`);
    return data;
  } catch (error) {
    console.log("[ERROR] eliminarLocatario: ", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export {
  crearLocatario,
  obtenerLocatarios,
  editarLocatario,
  eliminarLocatario
}