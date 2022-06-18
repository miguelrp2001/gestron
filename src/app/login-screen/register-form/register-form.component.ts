import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User, FormRegistro } from '../../interfaces/user';

export interface DiagReceived { data: FormRegistro; create: boolean; errors?: Error; };
export interface Error { nombre?: string[]; email?: string[]; password?: string[]; password_confirmation?: string[]; nombre_empresa?: string[]; nombre_legal?: string[]; telefono?: string[]; nif?: string[]; };

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DiagReceived>,
    @Inject(MAT_DIALOG_DATA) public data: DiagReceived,) {
  }

  usuarioNuevo: FormRegistro = this.data.data || {} as FormRegistro;
  registroUsuario: FormGroup = this.fb.group({
    email: [this.usuarioNuevo.email, [Validators.required, Validators.email, Validators.maxLength(50)]],
    nombre: [this.usuarioNuevo.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    telefono: [this.usuarioNuevo.telefono, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    password: [this.usuarioNuevo.password, [Validators.required, Validators.minLength(6), Validators.maxLength(90)]],
    nif: [this.usuarioNuevo.nif, [Validators.required, Validators.minLength(9), Validators.maxLength(12)]],
    password_confirmation: [this.usuarioNuevo.password_confirmation, [Validators.required, Validators.minLength(6), Validators.maxLength(90), this.camposIguales]],
    nombre_empresa: [this.usuarioNuevo.nombre_empresa, [Validators.required, Validators.minLength(6)]],
    nombre_legal: [this.usuarioNuevo.nombre_legal, [Validators.required, Validators.minLength(6)]],
  })

  camposIguales(control: AbstractControl): ValidationErrors | null {

    if (control.parent?.get('password')?.value == control.value) {
      return null;
    }
    return { 'igual': true };
  }

  mailErrorMessage(inputName: string, inputShow: string) {
    let input = this.registroUsuario.get(inputName) || null;

    if (input && input?.touched) {

      if (input.hasError('required') || false) {
        return 'Debe introducir un valor.';
      }
      return input.invalid ? inputShow + '.' : '';
    }
    return "";

  }

  guardar() {
    if (this.registroUsuario.valid) {
      this.dialogRef.close(this.registroUsuario.value);
    } else {
      this.registroUsuario.markAllAsTouched();
    }
  }


  ngOnInit(): void {
  }

}
