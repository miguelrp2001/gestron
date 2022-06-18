import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, GestronRequest, Centro, Articulo, Familia, Tarifa, Precio, Perfil, Cliente, PuntoVenta } from '../interfaces/user';
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
    return this.http.post<GestronRequest>(BACKEND + 'tarifas/create', { nombre: tarifa.nombre, centro_id: this.authService.getCentroSeleccionado().id });
  }

  public obtenerTarifa(id: number): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'tarifas/' + id);
  }

  public destroyTarifa(tarifa: Tarifa): Observable<GestronRequest> {
    return this.http.delete<GestronRequest>(BACKEND + 'tarifas/' + tarifa.id);
  }

  public addArticulosTarifa(tarifa: Tarifa, articulos: number[]): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'tarifas/' + tarifa.id + '/articulos', { articulos: articulos });
  }

  public getArticulosTarifa(tarifa: Tarifa): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'tarifas/' + tarifa.id + '/articulos');
  }

  public getArticulosNoTarifa(tarifa: Tarifa): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'tarifas/' + tarifa.id + '/notArticulos');
  }

  // Gestión de precios

  public deletePrecioTarifa(precio: Precio): Observable<GestronRequest> {
    return this.http.delete<GestronRequest>(BACKEND + 'precios/' + precio.id);
  }

  public updatePrecioTarifa(precio: Precio): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'precios/' + precio.id + '/edit', precio);
  }


  // Gestión de impuestos

  public obtenerImpuestos(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'impuestos/list');
  }


  // Gestión de perfiles

  public obtenerPerfiles(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'perfiles/' + this.authService.getCentroSeleccionado().id + '/list');
  }

  public addPerfil(perfil: Perfil): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'perfiles/create', { centro_id: this.authService.getCentroSeleccionado().id, nombre: perfil.nombre, clave: perfil.clave || null });
  }

  public updatePerfil(perfil: Perfil): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'perfiles/' + perfil.id + '/edit', { nombre: perfil.nombre, clave: perfil.clave || null, centro_id: this.authService.getCentroSeleccionado().id });
  }

  public deletePerfil(perfil: Perfil): Observable<GestronRequest> {
    return this.http.delete<GestronRequest>(BACKEND + 'perfiles/' + perfil.id);
  }

  public chngStatusPerfil(id: number, estado?: boolean): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'perfiles/' + id + '/status', { estado: estado });
  }

  // Gestión de clientes

  public obtenerClientes(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'clientes/' + this.authService.getCentroSeleccionado().id + '/list');
  }

  public addCliente(cliente: Cliente): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'clientes/create', cliente);
  }

  public updateCliente(cliente: Cliente): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'clientes/' + cliente.id + '/edit', cliente);
  }

  public deleteCliente(cliente: Cliente): Observable<GestronRequest> {
    return this.http.delete<GestronRequest>(BACKEND + 'clientes/' + cliente.id);
  }

  public updateStatusClienteMail(id: number, estado?: boolean): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'clientes/' + id + '/mailstatus', { estado: estado });
  }

  // Gestión de puntos de venta

  public obtenerPuntosVenta(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'puntosVenta/' + this.authService.getCentroSeleccionado().id + '/list');
  }

  public addPuntoVenta(puntoVenta: PuntoVenta): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'puntosVenta/create', puntoVenta);
  }

  public updatePuntoVenta(puntoVenta: PuntoVenta): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'puntosVenta/' + puntoVenta.id + '/edit', puntoVenta);
  }

  public chgPuntoVentaEstado(id: number, estado?: boolean): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'puntosVenta/' + id + '/status', { estado: estado });
  }

  public regenerarToken(puntoVenta: PuntoVenta): Observable<GestronRequest> {
    return this.http.put<GestronRequest>(BACKEND + 'puntosVenta/' + puntoVenta.id + '/regenerarToken', {});
  }

}
