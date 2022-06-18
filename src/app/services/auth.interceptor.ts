import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { TokenService } from "./token.service";
import { catchError, Observable } from 'rxjs';
import { AuthStateService } from './auth-state.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIIP } from './config.constants';
import { MatDialog } from '@angular/material/dialog';
import { VerificarCuentaComponent } from '../shared/verificar-cuenta/verificar-cuenta.component';

const BACKENDIP = APIIP;
@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService, private token: TokenService, private authState: AuthStateService, private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.tokenService.getToken();
    if (req.url.includes(BACKENDIP) && req.url.includes('api') && !req.url.includes('login')) {
      req = req.clone({
        withCredentials: true,
        setHeaders: {
          Authorization: "Bearer " + accessToken
        }
      });
    }
    return next.handle(req).pipe(catchError((requestError: HttpErrorResponse) => {
      if (req.url.includes('api') && !req.url.includes('login') && requestError && requestError.status === 401) {
        this.authState.setAuthState(false);
        this.token.removeToken();
        let snackBarRef = this.snackBar.open('La sesión ha expirado.', '', { duration: 5000 });
        this.router.navigate(['login'])
      } else if ((req.url.includes('api') && !req.url.includes('login') && requestError && requestError.status === 403)) {
        let snackBarRef = this.snackBar.open('No está autorizado para realizar esta acción.', '', { duration: 5000 });
        this.router.navigate(['/'])
      } else if ((req.url.includes('api') && !req.url.includes('login') && requestError && requestError.status === 423)) {
        let snackBarRef = this.snackBar.open('Debe verificar su cuenta.', '', { duration: 5000 });
        this.verificarCuenta();
      }
      return next.handle(req);
    }));
  }

  verificarCuenta(errors?: string[]): void {
    let dialogRef = this.dialog.open(VerificarCuentaComponent, {
      disableClose: true,
      data: { errors: errors }
    });
  }
}
