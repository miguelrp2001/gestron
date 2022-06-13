import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, GestronRequest, Centro, Articulo, Familia, Tarifa } from '../interfaces/user';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { APIURL } from './config.constants';

export const BACKEND = APIURL + "/api/";

@Injectable({
  providedIn: 'root'
})
export class GestronbackendService {


  loggedUser: User = {} as User;
  loggedToken: string = "";
  cookie: string = "";

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  // Administración de usuarios

  public allUsers(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'users/list', {});
  }

  public alternateUser(id: number, estado?: boolean): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'users/' + id + '/alternate', { estado: estado });
  }

  public updateUser(user: User): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'users/' + user.id + '/edit', user);
  }

  public logAllOut(id: number): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'users/' + id + '/logout', {});
  }

  // Administración de centros

  public allCentros(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'centros/' + 'list', {});
  }

  public estadoCentro(id: number, estado: boolean): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'centros/' + id + 'estado', { estado: estado });
  }

  public createCentro(centro: Centro): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'centros/' + 'create', centro);
  }

  public editarCentro(centro: Centro): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'centros/' + centro.id + 'edit', centro);
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


  // Gestión de articulos

  public obtenerArticulos(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'articulos/' + this.authService.getCentroSeleccionado().id + '/list');
  }

  public chgStatusArticulo(id: number, estado?: boolean): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'articulos/' + id + '/status', { estado: estado });
  }

  public updateArticulo(articulo: Articulo): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'articulos/' + articulo.id + '/edit', articulo);
  }

  public updateFamiliaArticulo(articulo: string, familia: number): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'articulos/' + articulo + '/editFamilia', { familia: familia });
  }

  public crearArticulo(articulo: Articulo): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'articulos/create', articulo);
  }


  // Gestión de familias

  public obtenerFamilias(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'familias/' + this.authService.getCentroSeleccionado().id + '/list');
  }

  public obtenerFamiliasCompletas(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'familias/' + this.authService.getCentroSeleccionado().id + '/listAll');
  }

  public chgStatusFamilia(id: number, estado?: boolean): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'familias/' + id + '/status', { estado: estado });
  }

  public updateFamilia(familia: Familia): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'familias/' + familia.id + '/edit', familia);
  }

  public destroyFamilia(familia: Familia): Observable<GestronRequest> {
    return this.http.delete<GestronRequest>(BACKEND + 'familias/' + familia.id);
  }

  public crearFamilia(familia: Familia): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'familias/create', { nombre: familia.nombre, centro: this.authService.getCentroSeleccionado().id });
  }


  // Gestión de tarifas

  public obtenerTarifas(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'tarifas/' + this.authService.getCentroSeleccionado().id + '/list');
  }

  public chgStatusTarifa(id: number, estado?: boolean): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'tarifas/' + id + '/status', { estado: estado });
  }

  public updateTarifa(tarifa: Tarifa): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'tarifas/' + tarifa.id + '/edit', tarifa);
  }

  public crearTarifa(tarifa: Tarifa): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'tarifas/create', tarifa);
  }

  public obtenerTarifa(id: number): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'tarifas/' + id);
  }

  public destroyTarifa(tarifa: Tarifa): Observable<GestronRequest> {
    return this.http.delete<GestronRequest>(BACKEND + 'tarifas/' + tarifa.id);
  }

}
