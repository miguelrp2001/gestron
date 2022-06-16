import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Perfil } from '../../../interfaces/user';

export interface DiagReceived { perfil: Perfil; create: boolean; errors?: { [key: string]: Errors }; };
export interface Errors { nombre?: string[] };

@Component({
  selector: 'app-form-perfil',
  templateUrl: './form-perfil.component.html',
  styleUrls: ['./form-perfil.component.css']
})
export class FormPerfilComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DiagReceived>,
    @Inject(MAT_DIALOG_DATA) public data: DiagReceived,) { }

  editarPerfil: FormGroup = this.fb.group({
    id: [this.data.perfil.id],
    nombre: [this.data.perfil.nombre, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
    clave: [this.data.perfil.clave, [Validators.min(1000), Validators.min(4), Validators.maxLength(16)]],
    updated_at: [this.data.perfil.updated_at],
    created_at: [this.data.perfil.created_at]
  })

  errorMessage(inputName: string, inputShow: string) {
    let input = this.editarPerfil.get(inputName) || null;

    if (input && input?.touched) {

      if (input.hasError('required') || false) {
        return 'Debe introducir un valor.';
      }
      return input.invalid ? inputShow + '.' : '';
    }
    return "";

  }

  guardar() {
    if (this.editarPerfil.valid) {
      this.dialogRef.close(this.editarPerfil.value);
    } else {
      this.editarPerfil.markAllAsTouched();
    }
  }

  ngOnInit(): void {
  }

}
