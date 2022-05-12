import { Component, ElementRef, ViewChild } from '@angular/core';
import { TokenService } from './services/token.service';
import { AuthStateService } from './services/auth-state.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionErrorComponent } from './shared/connection-error/connection-error.component';
import { LoadingDialogComponent } from './shared/loading-dialog/loading-dialog.component';
import { GestronRequest, User } from './interfaces/user';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestron';
  sesionStatus = false;

  @ViewChild('menuLateral') menuLateral: MatSidenav | undefined;

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, private authService: AuthService, private token: TokenService, private authState: AuthStateService, private router: Router, private snackBar: MatSnackBar) {
    let dialogLoading = this.dialog.open(LoadingDialogComponent, {
      disableClose: true,
    });

    this.authState.userAuthState.subscribe(r => {
      if (r) {
        this.sesionStatus = true;
        this.authService.profile().subscribe((res: GestronRequest) => {
          dialogLoading.close();
          this.authService.setUsuario(res.data.user as User);
        }, error => {
          dialogLoading.close();
          if (error.ok == false && error.status == 0) {
            console.error("Error conectando al backend.");
            let dialogRef = this.dialog.open(ConnectionErrorComponent, {
              disableClose: true,
            });
          }
          if (error.status == 401) {
            this.authState.setAuthState(false);
            this.token.removeToken();
            let snackBarRef = this.snackBar.open('La sesión ha expirado.', '', { duration: 5000 });
            this.router.navigate(['login'])
          }

        })
      } else {
        dialogLoading.close();
        this.sesionStatus = false;
      }
    })
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  sesionIniciada() {
    return this.sesionStatus;
  }

  public user(): User {
    return this.authService.getUsuario();
  }

  hideSideBar() {
    this.isHandset$.subscribe(res => {
      if (res) {
        this.menuLateral?.toggle()
      }
    })


  }

  logout() {
    console.log('Login out');
    this.authService.logout().subscribe(r => {
      if (r.data.mensaje) {
        if (r.data.mensaje == "logout") {
          this.authState.setAuthState(false);
          this.token.removeToken();
          let snackBarRef = this.snackBar.open('Se ha cerrado la sesión.', '', { duration: 5000 });
          this.router.navigate(['login'])
        }
      }
    }, error => {
      if (error.status == 401) {
        this.authState.setAuthState(false);
        this.token.removeToken();
        let snackBarRef = this.snackBar.open('La sesión ha expirado.', '', { duration: 5000 });
        this.router.navigate(['login'])
      } else {
        console.error(error);
      }
    })
  }
}
