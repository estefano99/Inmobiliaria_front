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

export type InmuebleType = {
  id?: number;
  calle: string;
  altura?: string;
  localidad: string;
  piso?: string;
  departamento?: string;
  locadorId: number;
}