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
  torre?: string;
  localidad: string;
  piso?: string;
  departamento?: string;
  locadorId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

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

export enum Estado {
  VIGENTE = "vigente",
  FINALIZADO = "finalizado",
  RESCINDIDO = "rescindido",
  PROXIMO_A_VENCER = "proximo_a_vencer",
}

export type contrato = {
  id?: number;
  id_locatario: number;
  id_inmueble: number;
  id_tipo_contrato: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  estado: Estado;
  alerta_vencimiento: number;
  importe: number;
}

export type contratoJoin = Omit<contrato, "id_locatario" & "id_inmueble" & "id_tipo_contrato"> & Pick<contrato, "id"> &{
  locatario: LocatarioType;
  inmueble: InmuebleJoin;
  tipo_contrato: TipoContratoType;
};

export interface contratoResponseGet {
  contratos: contratoJoin[];
}

export interface contratoResponsePostPut {
  contrato: contratoJoin;
  message: string;
}

export type estadosContratosGrafico = {
  month: string;
  vigentes: number;
  finalizados: number;
  proximo_a_vencer: number;
  rescindidos: number;
}

export type dataGraficos = {
  mes: string;
  estado: Estado;
  cantidad: number;
}

export type historialContratos = {
  id: number;
  importe_actualizado: Date;
  fecha_actualizacion: Date;
  estado: string;
  id_contrato: number;
}

export type historialFiltrados = {
  id?: number;
  id_locatario: number;
  id_inmueble: number;
  id_tipo_contrato: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  estado: Estado;
  alerta_vencimiento: number;
  importe: number;
  historial: historialContratos;
  inmueble: InmuebleJoin;
  locatario: LocatarioType;
  tipo_contrato: TipoContratoType;
}