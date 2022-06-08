import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestronbackendService } from '../../services/gestronbackend.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiagReceived } from '../../admin/components/edit-centro/edit-centro.component';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DiagReceived>,
    @Inject(MAT_DIALOG_DATA) public data: DiagReceived,) {

  }

  usuarioNuevo: User = {} as User;
  registroUsuario: FormGroup = this.fb.group({
    id: [this.usuarioNuevo.id],
    email: [this.usuarioNuevo.email, [Validators.required, Validators.email]],
    name: [this.usuarioNuevo.name, [Validators.required, Validators.minLength(2)]],
    telefono: [this.usuarioNuevo.telefono, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    ipRegistro: [this.usuarioNuevo.ipRegistro],
    ipUltLogin: [this.usuarioNuevo.ipUltLogin],
    updated_at: [this.usuarioNuevo.updated_at],
    created_at: [this.usuarioNuevo.created_at]
  })

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
  ngOnInit(): void {
  }

}
