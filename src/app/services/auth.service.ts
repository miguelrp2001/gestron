import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { GestronRequest, User, Centro } from '../interfaces/user';
import { SecureStorageService } from './secure-storage.service';

// const APIURL = "http://127.0.0.1:8000/api/auth/";
const APIURL = "http://192.168.1.251:8000/api/auth/";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario: User = {} as User;
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
    return this.http.post<GestronRequest>(APIURL + 'login', user);
  }

  profile(): Observable<GestronRequest> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.token.getToken
    })
    return this.http.get<GestronRequest>(APIURL + 'user-profile');
  }

  isAdmin(): boolean {
    return this.usuario.admin || true;
  }

  logout(): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(APIURL + 'logout', {});
  }
}
