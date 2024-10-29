import clienteAxios from "@/config/axios";
import { inmueblesRoute } from "@/lib/routes";
import { InmuebleType } from "@/types/types";
import { isAxiosError } from "axios";

const obtenerInmuebles = async () => {
  try {
    const { data } = await clienteAxios.get(inmueblesRoute);
    console.log(data)
    return data;
  } catch (error) {
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
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const editarInmueble = async (inmueble: InmuebleType) => {
  const {id} = inmueble;
  try {
    const { data } = await clienteAxios.put(`${inmueblesRoute}/${id}`, inmueble);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const eliminarInmueble = async (inmueble: InmuebleType) => {
  const {id} = inmueble;
  try {
    const {data} = await clienteAxios.delete(`${inmueblesRoute}/${id}`)
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export {obtenerInmuebles, crearInmueble, editarInmueble, eliminarInmueble};