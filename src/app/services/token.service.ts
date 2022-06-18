import { Injectable } from '@angular/core';
import { AUTHURL } from './auth.service';
import { SecureStorageService } from './secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private secureStorage: SecureStorageService) { }

  handleData(token: any) {
    localStorage.setItem('auth_token', token);
  }
  getToken() {
    return localStorage.getItem('auth_token');
  }
  // Verify the token
  isValidToken() {
    const token = this.getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  payload(token: any) {
    return JSON.parse(token);
  }
  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }
  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
    localStorage.clear();
  }
}
