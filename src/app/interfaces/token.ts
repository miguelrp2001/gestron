// To parse this data:
//
//   import { Convert, Token } from "./file";
//
//   const token = Convert.toToken(json);

export interface Token {
  token: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toToken(json: string): Token {
    return JSON.parse(json);
  }

  public static tokenToJson(value: Token): string {
    return JSON.stringify(value);
  }
}
