import { z } from "zod";

export type LocatarioType = {
  id?: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
};

export type LocadorType = {
  id?: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
};

export type UserType = {
  id?: number;
  nombre: string;
  password: string;
};

// Este usarlo para el post, que contendria el id del locador solo
export type InmuebleType = {
  id?: number;
  calle: string;
  altura?: string;
  localidad: string;
  piso?: string;
  departamento?: string;
  locadorId: number;
};

//Este se usa para cuando hacemos el get(join) con locador, saca el campo id y agrega el objeto Locador
export type InmuebleJoin = Omit<InmuebleType, "locadorId"> & {
  locador: LocadorType;
};

export type TipoContratoType = {
  id?: number;
  duracion: number;
  plazo_aumento: number;
  alarma_aumento: number;
};

export interface tipoContratoResponse {
  message: string;
  tipoContrato: TipoContratoType
}

