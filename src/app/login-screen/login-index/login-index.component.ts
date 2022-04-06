import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginwallapiService } from 'src/app/services/loginwallapi.service';
import { Wallpaper } from '../../interfaces/wallpaper';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { GestronbackendService } from 'src/app/services/gestronbackend.service';
import { Token } from '../../interfaces/token';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-login-index',
  templateUrl: './login-index.component.html',
  styleUrls: ['./login-index.component.css']
})
export class LoginIndexComponent implements OnInit {

  constructor(private fb: FormBuilder, private wallService: LoginwallapiService, private dialog: MatDialog, public backend: GestronbackendService) {
    wallService.getWallpaper().subscribe((resp: Wallpaper[]) => {
      this.fondo = resp[6];
      this.loading = false;
    })
  }
  formularioLogin: FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    passwd: ['', [Validators.required, Validators.minLength(8)]]
  })

  loading = true;

  fondo: Wallpaper = {} as Wallpaper;

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

      this.backend.login(this.formularioLogin.get('correo')?.value, this.formularioLogin.get('passwd')?.value).subscribe((resp: Token) => console.log(resp))

    }
  }

  ngOnInit(): void {

  }



}
