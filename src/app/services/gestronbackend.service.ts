import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { User } from '../interfaces/user';
import { mergeMap, Observable, tap } from 'rxjs';
import { Token } from '../interfaces/token';

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

    this.wsanctum()

    console.log('Checking token');

    if (false && localStorage.getItem('ges_tok')) {
      this.relogin(localStorage.getItem('ges_tok') || "").subscribe((resp: User) => {
        this.loggedUser = resp;
        this.loggedToken = localStorage.getItem('ges_tok') || "";
        console.log(resp);
      },
        error => {
          console.error(error);
        });
    }
  }

  private wsanctum(): Observable<HttpResponse<Object>> {
    return this.http.get<HttpResponse<Object>>(BACKENDNOAPI + "sanctum/csrf-cookie");
  }

  public login(email: string, password: string): Observable<Token> {
    const params = new HttpParams().set('email', email).set('password', password);
    return this.http.post<Token>(BACKEND + 'login', { params });

  }

  public setUser(user: User) {
    this.loggedUser = user;
  }

  protected relogin(token: string): Observable<User> {
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token
    })

    return this.http.get<User>(BACKEND + 'user', { 'headers': headers });

  }
}
