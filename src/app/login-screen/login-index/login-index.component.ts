import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginwallapiService } from 'src/app/services/loginwallapi.service';
import { Wallpaper } from '../../interfaces/wallpaper';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { GestronbackendService } from 'src/app/services/gestronbackend.service';
import { Token } from '../../interfaces/token';
import { mergeMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { AuthStateService } from '../../services/auth-state.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Input } from '@angular/compiler/src/core';
import { GestronRequest } from '../../interfaces/user';

@Component({
  selector: 'app-login-index',
  templateUrl: './login-index.component.html',
  styleUrls: ['./login-index.component.css']
})
export class LoginIndexComponent implements OnInit {


  posfondo = Math.floor(Math.random() * (6));
  constructor(private fb: FormBuilder, private wallService: LoginwallapiService, private dialog: MatDialog, private authService: AuthService, private token: TokenService, private authState: AuthStateService, private router: Router, private snackBar: MatSnackBar) {
    wallService.getWallpaper().subscribe((resp: Wallpaper[]) => {
      this.fondo = resp[this.posfondo];
      this.loading = false;
    }, (error) => {
      this.loading = false;
    })

    this.authState.userAuthState.subscribe(r => {
      if (r) {
        this.router.navigate(['/']);
      }
    })
  }
  formularioLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  loading = true;
  iniciandoSesion = false;

  fondo: Wallpaper = {} as Wallpaper;

  errores: any = null;

  mailErrorMessage(inputName: string, inputShow: string) {
    let input = this.formularioLogin.get(inputName) || null;

    if (input && input?.touched) {

      if (input.hasError('required') || false) {
        return 'Debe introducir un valor.';
      }
      return input.invalid ? inputShow + '.' : '';
    }
    return "";

  }

  registro(data?: any, errors?: string[]) {
    let dialogRef = this.dialog.open(RegisterFormComponent, {
      data: {
        data: data || {},
        errors: errors
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.iniciandoSesion = true;
        this.authService.register(result).subscribe((res: GestronRequest) => {
          this.procesarRespuesta(res.data);
          this.iniciandoSesion = false;
        }, (error) => {
          this.iniciandoSesion = false;
          this.registro(result, error.error.errors);
        },
          () => {
            this.authState.setAuthState(true);
            this.formularioLogin.reset();
            this.iniciandoSesion = false;
          });
      }
    });
  }

  login() {
    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
    } else {
      this.iniciandoSesion = true;
      this.authService.login(this.formularioLogin.value).subscribe((res: GestronRequest) => {
        this.procesarRespuesta(res.data);
        this.iniciandoSesion = false;
      },
        (error) => {
          this.iniciandoSesion = false;
          this.errores = error.error;
          if (error.error.data && error.error.data.mensaje == "no me sirve") {
            let snackBarRef = this.snackBar.open("Credenciales inv??lidos.", '', { duration: 5000 });
            this.formularioLogin.get('password')?.setValue("");
            this.formularioLogin.get('password')?.markAsPending;
          } else {
            let snackBarRef = this.snackBar.open("Error al conectar con el servidor.", '', { duration: 5000 });
          }
        },
        () => {
          this.authState.setAuthState(true);
          this.formularioLogin.reset();
          this.iniciandoSesion = false;
        })
    }
  }

  ngOnInit(): void {

    this.posfondo = Math.floor(Math.random() * (6));

  }

  procesarRespuesta(datos: any) {
    this.token.handleData(datos.token);
    let snackBarRef = this.snackBar.open("Bienvenido de nuevo, " + datos.user.name, '', { duration: 5000 });
  }


}
