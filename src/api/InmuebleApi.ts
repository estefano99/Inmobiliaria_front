import clienteAxios from "@/config/axios";
import { inmueblesRoute } from "@/lib/routes";
import { InmuebleJoin, InmuebleType } from "@/types/types";
import { isAxiosError } from "axios";

const obtenerInmuebles = async () => {
  try {
    const { data } = await clienteAxios.get(inmueblesRoute);
    return data;
  } catch (error) {
    console.log("[ERROR] obtenerInmuebles: ", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const crearInmueble = async (inmueble: InmuebleType) => {
  try {
    const { data } = await clienteAxios.post(inmueblesRoute, inmueble);
    return data;
  } catch (error) {
    console.log("[ERROR] crearInmueble: ", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const editarInmueble = async (inmueble: InmuebleType): Promise<InmuebleType> => {
  const {id} = inmueble;
  try {
    const { data } = await clienteAxios.put(`${inmueblesRoute}/${id}`, inmueble);
    return data;
  } catch (error) {
    console.log("[ERROR] editarInmueble: ", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const eliminarInmueble = async (inmueble: InmuebleJoin) => {
  const {id} = inmueble;
  try {
    const {data} = await clienteAxios.delete(`${inmueblesRoute}/${id}`)
    return data;
  } catch (error) {
    console.log("[ERROR] eliminarInmueble: ", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export {obtenerInmuebles, crearInmueble, editarInmueble, eliminarInmueble};