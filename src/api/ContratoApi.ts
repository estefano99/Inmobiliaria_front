import clienteAxios from "@/config/axios";
import { contratosRoute } from "@/lib/routes";
import { contrato, contratoJoin, contratoResponsePostPut, Estado} from "@/types/types";
import { isAxiosError } from "axios";

const obtenerContratos = async (estadoSwitch: boolean) => {
  try {
    const { data } = await clienteAxios.get(`${contratosRoute}?finalizados=${estadoSwitch}`);
    return data;
  } catch (error) {
    console.log("[ERROR] obtenerContratos: ", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const crearContrato = async (contrato: contrato) => {
  try {
    const { data } = await clienteAxios.post(contratosRoute, contrato);
    console.log(data)
    return data;
  } catch (error) {
    console.log("[ERROR] crearContrato: ", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const editarContrato = async (contrato: contrato): Promise<contratoResponsePostPut> => {
  const { id } = contrato;
  try {
    const { data } = await clienteAxios.put(`${contratosRoute}/${id}`, contrato);
    console.log(data)
    return data;
  } catch (error) {
    console.log("[ERROR] editarContrato: ", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const eliminarContrato = async (contrato: contratoJoin) => {
  const {id} = contrato
  try{
    const {data} = await clienteAxios.delete(`${contratosRoute}/${id}`)
    console.log(data)
    return data;
  } catch (error) {
    console.log("[ERROR] eliminarContrato: ", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const actualizarEstadoContrato = async (id: number, estado: Estado): Promise<void> => {
  try {
    const {data} = await clienteAxios.patch(`${contratosRoute}/${id}`, {estado});
    console.log("API - Actualizar estado: ", data)
  } catch (error) {
    console.log("[ERROR] actualizarEstadoContratos: ", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export {
  obtenerContratos,
  crearContrato,
  editarContrato,
  eliminarContrato,
  actualizarEstadoContrato,
}