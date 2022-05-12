// To parse this data:
//
//   import { Convert, GestronRequest } from "./file";
//
//   const gestronRequest = Convert.toGestronRequest(json);

export interface GestronRequest {
  status: string;
  data: Data;
}

export interface Data {
  user?: User;
  mensaje?: string;
  users: User[];
}

export interface User {
  name: string;
  email: string;
  telefono: string;
  admin?: boolean;
  activo?: boolean;
  created_at?: Date;
  updated_at?: Date;
  id?: number;
  ipRegistro?: string;
  ipUltLogin?: string;
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
