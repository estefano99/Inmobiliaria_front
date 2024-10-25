import { z } from "zod";

export type LocatarioType = {
  id?: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
}

export type LocadorType = {
  id?: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
}

export type UserType = {
  id?: number;
  nombre: string;
  password: string;
}