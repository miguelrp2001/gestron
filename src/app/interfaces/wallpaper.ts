// To parse this data:
//
//   import { Convert } from "./file";
//
//   const wallpaper = Convert.toWallpaper(json);

export interface Wallpaper {
  title: string;
  copyright: string;
  fullUrl: string;
  thumbUrl: string;
  imageUrl: string;
  date: Date;
  pageUrl: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toWallpaper(json: string): Wallpaper[] {
    return JSON.parse(json);
  }

  public static wallpaperToJson(value: Wallpaper[]): string {
    return JSON.stringify(value);
  }
}
