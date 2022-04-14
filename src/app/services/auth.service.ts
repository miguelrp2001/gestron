import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const APIURL = "http://127.0.0.1:8000/api/auth/";

export class User {
  name!: String;
  email!: String;
  password!: String;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post(APIURL + 'login', user);
  }

  profile(): Observable<any> {
    return this.http.get(APIURL + 'user-profile');
  }

  logout(): Observable<any> {
    return this.http.post(APIURL + 'logout', {});
  }
}
