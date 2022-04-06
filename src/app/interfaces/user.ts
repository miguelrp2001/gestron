// To parse this data:
//
//   import { Convert, User } from "./file";
//
//   const user = Convert.toUser(json);

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: null;
  created_at: Date;
  updated_at: Date;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toUser(json: string): User {
    return JSON.parse(json);
  }

  public static userToJson(value: User): string {
    return JSON.stringify(value);
  }
}
