import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, GestronRequest, Centro } from '../interfaces/user';
import { Observable } from 'rxjs';

const BACKENDNOAPI = "http://127.0.0.1:8000/";
const BACKEND = BACKENDNOAPI + "api/";

@Injectable({
  providedIn: 'root'
})
export class GestronbackendService {


  loggedUser: User = {} as User;
  loggedToken: string = "";
  cookie: string = "";

  constructor(private http: HttpClient) {

  }

  // Administración de usuarios

  public allUsers(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'users/list', {});
  }

  public alternateUser(id: number, estado?: boolean): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'users/' + id + '/alternate', { estado: estado });
  }

  public updateUser(user: User): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'users/' + user.id + '/edit', user);
  }

  public logAllOut(id: number): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'users/' + id + '/logout', {});
  }

  // Administración de centros

  public allCentros(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'centros/' + 'list', {});
  }

  public estadoCentro(id: number, estado: boolean): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'centros/' + id + 'estado', { estado: estado });
  }

  public createCentro(centro: Centro): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'centros/' + 'create', centro);
  }

  public obtenerAdminCentro(centro: Centro): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'centros/' + centro.id + '/admins');
  }

  public obtenerNotAdminCentro(centro: Centro): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'centros/' + centro.id + '/notadmins');
  }

  public addAdminCentro(centro: Centro, usersIds: number[]): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'centros/' + centro.id + '/admins', { usuarios: usersIds });
  }

  public delAdminCentro(centro: Centro, user: User): Observable<GestronRequest> {
    return this.http.delete<GestronRequest>(BACKEND + 'centros/' + centro.id + '/admins/' + user.id, {});
  }


}
