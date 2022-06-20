import { Injectable } from '@angular/core';
import { EncryptStorage } from 'storage-encryption';
import { SECRET_KEY } from './config.constants';


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
