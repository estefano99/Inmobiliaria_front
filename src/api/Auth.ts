import clienteAxios from "@/config/axios"
import { loginRoute, obtenerUsuarioRoute } from "@/lib/routes";
import { UserType } from "@/types/types"
import { isAxiosError } from "axios";

const login = async (usuario: UserType) => {
  try {
    const { data } = await clienteAxios.post(loginRoute, usuario);
    localStorage.setItem("AUTH_TOKEN", data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

const obtenerUsuario = async () => {
  try {
    const {data} = await clienteAxios<UserType>(obtenerUsuarioRoute);
    return data; 
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export {
  login,
  obtenerUsuario
}