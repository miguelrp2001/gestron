export interface GestronRequest {
  status: string;
  data: Data;
}

export interface Data {
  user?: User;
  mensaje?: string;
  users?: User[];
  centro?: Centro;
  centros?: Centro[];
}

export interface User {
  id?: number;
  activo?: boolean;
  name: string;
  admin?: boolean;
  email: string;
  telefono: string;
  ipRegistro?: string;
  ipUltLogin?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Centro {
  id?: number;
  nombre: string;
  nombre_legal: string;
  nif: string;
  telefono: string;
  direccion: string;
  administradores?: User[];
  updated_at?: Date;
  created_at?: Date;
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
