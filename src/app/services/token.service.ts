import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private issuer = {
    login: 'http://127.0.0.1:8000/api/auth/login',
    // register: 'http://127.0.0.1:8000/api/auth/register',
  };

  constructor() { }

  handleData(token: any) {
    localStorage.setItem('auth_token', token);
    console.log(token);
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
  }
}
