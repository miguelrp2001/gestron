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

@Component({
  selector: 'app-login-index',
  templateUrl: './login-index.component.html',
  styleUrls: ['./login-index.component.css']
})
export class LoginIndexComponent implements OnInit {

  constructor(private fb: FormBuilder, private wallService: LoginwallapiService, private dialog: MatDialog, private authService: AuthService, private token: TokenService, private authState: AuthStateService) {
    wallService.getWallpaper().subscribe((resp: Wallpaper[]) => {
      this.fondo = resp[6];
      this.loading = false;
    })
  }
  formularioLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  loading = true;

  fondo: Wallpaper = {} as Wallpaper;

  errores: any = null;

  mailErrorMessage() {
    let input: any = this.formularioLogin.get('correo') || null;

    if (input) {

      if (input.hasError('required') || false) {
        return 'You must enter a value';
      }

      return input.hasError('email') ? 'Not a valid email' : '';
    }
    return "";

  }

  registro() {
    let dialogRef = this.dialog.open(RegisterFormComponent, {
      height: '400px',
      width: '600px',
    });
  }

  login() {
    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
    } else {
      this.authService.login(this.formularioLogin.value).subscribe((res) => {
        this.procesarRespuesta(res);
      },
        (error) => {
          this.errores = error.error;
        },
        () => {
          this.authState.setAuthState(true);
          this.formularioLogin.reset();
        })
    }
  }

  ngOnInit(): void {

  }

  procesarRespuesta(datos: any) {
    this.token.handleData(datos.access_token);
  }


}
