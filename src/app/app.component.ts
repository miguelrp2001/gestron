import { Component, ViewChild } from '@angular/core';
import { TokenService } from './services/token.service';
import { AuthStateService } from './services/auth-state.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionErrorComponent } from './shared/connection-error/connection-error.component';
import { LoadingDialogComponent } from './shared/loading-dialog/loading-dialog.component';
import { GestronRequest, User, Centro } from './interfaces/user';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { SinCentrosComponent } from './shared/sin-centros/sin-centros.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestron';
  sesionStatus = false;
  allLoaded = false;

  @ViewChild('menuLateral') menuLateral: MatSidenav | undefined;

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, private authService: AuthService, private token: TokenService, private authState: AuthStateService, private router: Router, private snackBar: MatSnackBar) {
    this.loadApp();
  }

  loadApp() {
    let dialogLoading = this.dialog.open(LoadingDialogComponent, {
      disableClose: true,
    });

    this.authState.userAuthState.subscribe(r => {
      if (r) {
        this.sesionStatus = true;
        this.authService.profile().subscribe((res: GestronRequest) => {
          this.authService.setUsuario(res.data.user as User);
          if ((res.data.centros || []).length > 0) {
            this.authService.setCentros(res.data.centros as Centro[] || []);
          } else {
            let dialogoNoCentros = this.dialog.open(SinCentrosComponent, {
              disableClose: true,
            });

            dialogoNoCentros.afterClosed().subscribe(r => {
              this.logout();
            });
          }
          dialogLoading.close();
          this.allLoaded = true;
          let snackBarRef = this.snackBar.open('Bienvenido de nuevo ' + this.authService.getUsuario().name + '.', '', { duration: 5000 });
        }, error => {
          dialogLoading.close();
          if (error.ok == false && error.status == 0) {
            console.error("Error conectando al backend.");
            let dialogRef = this.dialog.open(ConnectionErrorComponent, {
              disableClose: true,
            });
            dialogRef.afterClosed().subscribe(r => {
              this.loadApp();
            })
          }
          if (error.status == 401) {
            this.authState.setAuthState(false);
            this.token.removeToken();
            let snackBarRef = this.snackBar.open('La sesión ha expirado.', '', { duration: 5000 });
            this.allLoaded = true;
            this.router.navigate(['login'])
          }

        })
      } else {
        dialogLoading.close();
        this.allLoaded = true;
        this.sesionStatus = false;
      }
    })
  }


  updCentro() {
    this.authService.profile().subscribe((res: GestronRequest) => {
      this.authService.setUsuario(res.data.user as User);
      this.authService.setCentros(res.data.centros as Centro[]);
    })
  }

  getCentroSeleccionado(): Centro {
    return this.authService.getCentroSeleccionado();
  }

  setCentro(centro: Centro) {
    this.authService.setCentroSeleccionado(centro);
    if (!this.router.url.includes('admin')) {
      this.allLoaded = false;
      let snackBarRef = this.snackBar.open('Se ha cambiado el centro a ' + centro.nombre + '.', '', { duration: 5000 });
      setTimeout(() => {
        this.allLoaded = true;
      }, 10);
    }
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
  public centros(): Centro[] {
    return this.authService.getCentros();
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
