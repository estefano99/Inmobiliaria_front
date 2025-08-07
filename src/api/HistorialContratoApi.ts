import clienteAxios from "@/config/axios";
import { historialContratoRoute, nuevoHistorialContratoRoute } from "@/lib/routes";
import { isAxiosError } from "axios";

const obtenerHistorialesContratos = async () => {
  try {
    const { data } = await clienteAxios.get(historialContratoRoute);
    return data;
  } catch (error) {
    console.log("[ERROR] obtener Historiales: ", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const obtenerHistorial = async (id: number) => {
  try {
    if (!id) {
      throw new Error("No se puede obtener el historial de un contrato sin id");
    }
    const { data } = await clienteAxios.get(`${historialContratoRoute}/${id}`);
    return data;
  } catch (error) {
    console.log("[ERROR] obtener Historiales: ", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const actualizarImporte = async (historial_actualizar: { id_historial: number | undefined, id_contrato: number | undefined, importe_actualizado: number | undefined, plazo_aumento: number | undefined }) => {
  try {
    const { data } = await clienteAxios.put(nuevoHistorialContratoRoute, historial_actualizar);
    return data;
  } catch (error) {
    console.log("[ERROR] obtener Historiales: ", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export {
  obtenerHistorialesContratos,
  actualizarImporte,
  obtenerHistorial
}