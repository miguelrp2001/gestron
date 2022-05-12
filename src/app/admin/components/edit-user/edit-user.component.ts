import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';

export interface DiagReceived { user: User; };
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})


export class EditUserComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DiagReceived>,
    @Inject(MAT_DIALOG_DATA) public data: DiagReceived,) {

  }

  editarUsuario: FormGroup = this.fb.group({
    id: [this.data.user.id],
    email: [this.data.user.email, [Validators.required, Validators.email]],
    name: [this.data.user.name, [Validators.required, Validators.minLength(2)]],
    telefono: [this.data.user.telefono, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    ipRegistro: [this.data.user.ipRegistro],
    ipUltLogin: [this.data.user.ipUltLogin],
    updated_at: [this.data.user.updated_at],
    created_at: [this.data.user.created_at]
  })

  mailErrorMessage(inputName: string, inputShow: string) {
    let input = this.editarUsuario.get(inputName) || null;

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
