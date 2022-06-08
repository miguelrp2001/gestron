import { Injectable } from '@angular/core';
import { EncryptStorage } from 'storage-encryption';

const SECRET_KEY = "*&0M9ysI@hwNj0X#q#QG3c&rJyJIec2e!j01mJ*t4O$$*$KLEo&b79UPxOnvFSGwQ9BUTjdb4pz24WKAM#$TwNT@3kl1j%S$q1$8dSyZ47pL74f0x9XWA!3$8i67bD15";

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {

  encStorage = new EncryptStorage(SECRET_KEY, 'localStorage');

  constructor() { }

  public set(key: string, value: any) {
    this.encStorage.encrypt(key, value);
  }

  public get(key: string): any {
    return this.encStorage.decrypt(key);
  }

  public clear(key: string) {
    this.encStorage.remove(key);
  }

}
