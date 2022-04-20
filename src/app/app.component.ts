import { Component } from '@angular/core';
import { TokenService } from './services/token.service';
import { AuthStateService } from './services/auth-state.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionErrorComponent } from './shared/connection-error/connection-error.component';
import { LoadingDialogComponent } from './shared/loading-dialog/loading-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestron';
  sesionStatus = false;

  constructor(private dialog: MatDialog, private authService: AuthService, private token: TokenService, private authState: AuthStateService, private router: Router, private snackBar: MatSnackBar) {
    let dialogLoading = this.dialog.open(LoadingDialogComponent, {
      disableClose: true,
    });

    this.authState.userAuthState.subscribe(r => {
      if (r) {
        this.sesionStatus = true;
        this.authService.profile().subscribe(res => {
          dialogLoading.close();
          console.log("ok");
        }, error => {
          dialogLoading.close();
          console.log("Ha ocurrido un error");
          console.log(error);
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

  sesionIniciada() {
    return this.sesionStatus;
  }

  logout() {
    console.log('Login out');
    this.authService.logout().subscribe(r => {
      if (r.message) {
        if (r.message == "logout") {
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
