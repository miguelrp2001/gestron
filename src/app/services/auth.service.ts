import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { GestronRequest, User, Centro, FormRegistro } from '../interfaces/user';
import { SecureStorageService } from './secure-storage.service';
import { BACKEND } from './gestronbackend.service';

// const APIURL = "http://127.0.0.1:8000/api/auth/";
export const AUTHURL = BACKEND + "auth/";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario: User = { admin: true } as User;
  private centros: Centro[] = [];
  private centroSeleccionado: Centro = {} as Centro;

  public getUsuario(): User {
    return this.usuario;
  }

  public setUsuario(usuario: User) {
    this.usuario = usuario;
  }
  public getCentros(): Centro[] {
    return this.centros;
  }

  public setCentros(centros: Centro[]) {
    this.centros = centros;
    let chg = true;

    this.centros.forEach(centro => {
      if (centro.id == this.centroSeleccionado.id) {
        chg = false;
      }
    });

    if (chg) {
      this.setCentroSeleccionado(centros[0]);
    }
  }

  public getCentroSeleccionado(): Centro {
    return this.centroSeleccionado;
  }

  public setCentroSeleccionado(centro: Centro) {
    this.centroSeleccionado = centro;
    this.LocalEncryptedStorage.set('centroSelecccionado', this.centroSeleccionado)
  }

  constructor(private http: HttpClient, private token: TokenService, private LocalEncryptedStorage: SecureStorageService) {

    if (this.LocalEncryptedStorage.get('centroSelecccionado')) {
      this.centroSeleccionado = this.LocalEncryptedStorage.get('centroSelecccionado');
    }

  }

  login(user: User): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(AUTHURL + 'login', user);
  }

  register(formularioRegistro: FormRegistro): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(AUTHURL + 'register', formularioRegistro);
  }

  profile(): Observable<GestronRequest> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token.getToken
    })
    return this.http.get<GestronRequest>(AUTHURL + 'user-profile');
  }

  isAdmin(): boolean {
    if (this.usuario) {
      return this.usuario.admin;
    } else { return true }

  }

  logout(): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(AUTHURL + 'logout', {});
  }

  verify(codigo: string): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(AUTHURL + 'verify', { vercode: codigo });
  }

  resendVerification(): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(AUTHURL + 'resendverificationcode', {});
  }
}
