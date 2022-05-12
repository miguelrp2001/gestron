import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, GestronRequest } from '../interfaces/user';
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

  protected relogin(token: string): Observable<User> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token
    })

    return this.http.get<User>(BACKEND + 'user', { 'headers': headers });

  }


  public allUsers(): Observable<GestronRequest> {
    return this.http.get<GestronRequest>(BACKEND + 'users/list', {});
  }

  public alternateUser(id: number, estado?: boolean): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'users/' + id + '/alternate', { estado: estado });
  }

  public updateUser(user: User): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'users/' + user.id + '/edit', { email: user.email, telefono: user.telefono, name: user.name });
  }


  public logAllOut(id: number): Observable<GestronRequest> {
    return this.http.post<GestronRequest>(BACKEND + 'users/' + id + '/logout', {});
  }

}
