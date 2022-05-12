import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { GestronRequest, User } from '../interfaces/user';

const APIURL = "http://127.0.0.1:8000/api/auth/";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario: User = {} as User;

  public getUsuario(): User {
    return this.usuario;
  }

  public setUsuario(usuario: User) {
    this.usuario = usuario;
  }

  constructor(private http: HttpClient, private token: TokenService) { }

  login(user: User): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(APIURL + 'login', user);
  }

  profile(): Observable<GestronRequest> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token.getToken
    })
    return this.http.get<GestronRequest>(APIURL + 'user-profile');
  }

  isAdmin(): boolean {
    return this.usuario.admin || false;
  }

  logout(): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(APIURL + 'logout', {});
  }
}
