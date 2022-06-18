import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GestronRequest } from 'src/app/interfaces/user';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { AuthStateService } from '../../services/auth-state.service';

export interface DiagReceived { errors?: { [key: string]: Errors }; };
export interface Errors { nombre?: string[] };

@Component({
  selector: 'app-verificar-cuenta',
  templateUrl: './verificar-cuenta.component.html',
  styleUrls: ['./verificar-cuenta.component.css']
})
export class VerificarCuentaComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DiagReceived>,
    @Inject(MAT_DIALOG_DATA) public data: DiagReceived, private authservice: AuthService, private snackbar: MatSnackBar, private router: Router, private token: TokenService, private authState: AuthStateService) { }

  info: string = "";
  errorMSG: string = "";

  verificarUsuario: FormGroup = this.fb.group({
    vercode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.min(0)]],
  })

  errorMessage(inputName: string, inputShow: string) {
    let input = this.verificarUsuario.get(inputName) || null;

    if (input && input?.touched) {

      if (input.hasError('required') || false) {
        return 'Debe introducir un valor.';
      }
      return input.invalid ? inputShow + '.' : '';
    }
    return "";

  }

  guardar() {
    if (this.verificarUsuario.valid) {
      this.authservice.verify(this.verificarUsuario.value.vercode).subscribe((res: GestronRequest) => {
        if (res.status) {
          this.snackbar.open("Su cuenta ha sido verificada correctamente, debe volver a iniciar sesión.", "", { duration: 3000 });
          this.authservice.logout().subscribe(r => {
            if (r.data.mensaje) {
              if (r.data.mensaje == "logout") {
                this.authState.setAuthState(false);
                this.token.removeToken();
                this.router.navigate(['login'])
                this.dialogRef.close();
              }
            }
          });
        }
      }, (err) => {
        if (err.error.errors) {
          this.data.errors = err.error.errors;
        } else {
          this.errorMSG = "El código no es correcto";
        }
      });
    } else {
      this.verificarUsuario.markAllAsTouched();
    }
  }

  enviarCodigoDeNuevo() {

    this.authservice.resendVerification().subscribe((res: GestronRequest) => {
      if (res.status == "ok") {
        this.info = "Se ha enviado un nuevo código de verificación a su correo electrónico.";
      }
    }, (err) => {
      this.info = "Error al enviar el código de verificación.";
    });
  }

  ngOnInit(): void {
  }

}
