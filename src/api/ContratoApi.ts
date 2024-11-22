import clienteAxios from "@/config/axios";
import { contratosRoute } from "@/lib/routes";
import { contrato, contratoJoin, contratoResponsePostPut} from "@/types/types";
import { isAxiosError } from "axios";

const obtenerContratos = async () => {
  try {
    const { data } = await clienteAxios.get(contratosRoute);
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

export {
  obtenerContratos,
  crearContrato,
  editarContrato
}