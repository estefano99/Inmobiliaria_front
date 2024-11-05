import clienteAxios from "@/config/axios";
import { tipoContratoRoute } from "@/lib/routes";
import { tipoContratoResponse, TipoContratoType } from "@/types/types";
import { isAxiosError } from "axios";

const obtenerTipoContratos = async () => {
  try {
    const { data } = await clienteAxios.get(tipoContratoRoute);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

const crearTipoContrato = async (
  tipoContrato: TipoContratoType
): Promise<tipoContratoResponse> => {
  try {
    const { data } = await clienteAxios.post<tipoContratoResponse>(
      tipoContratoRoute,
      tipoContrato
    );
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

const editarTipoContrato = async (
  tipoContrato: TipoContratoType
): Promise<tipoContratoResponse> => {
  const { id } = tipoContrato;
  try {
    const { data } = await clienteAxios.put<tipoContratoResponse>(
      `${tipoContratoRoute}/${id}`,
      tipoContrato
    );
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export { crearTipoContrato, obtenerTipoContratos, editarTipoContrato };
