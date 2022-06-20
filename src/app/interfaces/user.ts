export interface GestronRequest {
  status: string;
  data: Data;
}

export interface Data {
  mensaje?: string;
  user?: User;
  users?: User[];
  centro?: Centro;
  centros?: Centro[];
  precio?: Precio;
  precios?: Precio[];
  tarifa?: Tarifa;
  tarifas?: Tarifa[];
  perfil?: Perfil;
  perfiles?: Perfil[];
  cliente?: Cliente;
  clientes?: Cliente[];
  familia?: Familia;
  familias?: Familia[];
  articulo?: Articulo;
  articulos?: Articulo[];
  impuesto?: Impuesto;
  impuestos?: Impuesto[];
  puntoVenta?: PuntoVenta;
  puntosVenta?: PuntoVenta[];
}

export interface User {
  id?: number;
  activo?: boolean;
  name: string;
  admin: boolean;
  email: string;
  telefono: string;
  ipRegistro?: string;
  ipUltLogin?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Articulo {
  id: number;
  estado: string;
  nombre: string;
  nombre_corto: string;
  color: string;
  codBarras?: string;
  familia_id?: number;
  familia?: number;
  created_at?: null;
  updated_at?: null;
}

export interface Centro {
  id?: number;
  nombre: string;
  nombre_legal: string;
  nif: string;
  telefono: string;
  direccion: string;
  administradores?: User[];
  tarifaSeleccionada?: number;
  updated_at?: Date;
  created_at?: Date;
}

export interface Tarifa {
  id: number;
  nombre?: string;
  precios?: Precio[];
  updated_at?: Date;
  created_at?: Date;
}

export interface Precio {
  id: number;
  precio: number;
  impuesto: Impuesto;
  articulo_id?: number;
  articulo: Articulo;
  created_at?: Date;
  updated_at?: Date;
}

export interface Impuesto {
  id?: number;
  nombre: string;
  nombre_corto: string;
  porcentaje: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Familia {
  id: number;
  nombre: string;
  centro?: number | Centro;
  centro_id?: number | Centro;
  articulos?: Articulo[];
  created_at?: null;
  updated_at?: null;
}

export interface Perfil {
  id: number;
  nombre: string;
  clave?: number;
  activo?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface Cliente {
  id: number;
  nombre: string;
  direccion: string;
  nif: string;
  telefono: string;
  correo: string;
  centro_id?: number;
  nombre_fiscal: string;
  ticketCorreo?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface PuntoVenta {
  id: number;
  nombre: string;
  token?: string;
  centro_id?: number;
  creadoPor?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface FormRegistro {
  nombre: string;
  email: string;
  password: string;
  password_confirmation: string;
  telefono: string;
  nombre_empresa: string;
  nombre_legal: string;
  nif: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toGestronRequest(json: string): GestronRequest {
    return JSON.parse(json);
  }

  public static gestronRequestToJson(value: GestronRequest): string {
    return JSON.stringify(value);
  }
}
