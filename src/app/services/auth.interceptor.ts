import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpClient } from '@angular/common/http';
import { TokenService } from "./token.service";
import { Observable } from 'rxjs';
const BACKENDNOAPI = "http://127.0.0.1:8000/";
@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  private wsanctum(): Observable<any> {
    return this.http.get(BACKENDNOAPI + "sanctum/csrf-cookie");
  }

  constructor(private tokenService: TokenService, private http: HttpClient) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.tokenService.getToken();
    if (req.url.includes('127.0.0.1') && req.url.includes('api') && !req.url.includes('login')) {
      console.log("AñadiendoToken")
      req = req.clone({
        withCredentials: true,
        setHeaders: {
          Authorization: "Bearer " + accessToken
        }
      });
    }
    return next.handle(req);
  }
}
