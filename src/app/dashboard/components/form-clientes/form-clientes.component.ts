import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from '../../../interfaces/user';

export interface DiagReceived { cliente: Cliente; create: boolean; errors?: { [key: string]: Errors }; };
export interface Errors { nombre?: string[], correo?: string[], telefono?: string[], direccion?: string[], nif?: string[], nombre_fiscal?: string[] };


@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent implements OnInit {
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DiagReceived>,
    @Inject(MAT_DIALOG_DATA) public data: DiagReceived,) {
  }

  editarCliente: FormGroup = this.fb.group({
    id: [this.data.cliente.id],
    nombre: [this.data.cliente.nombre, [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
    nombre_fiscal: [this.data.cliente.nombre_fiscal, [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
    direccion: [this.data.cliente.direccion, [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
    nif: [this.data.cliente.nif, [Validators.required, Validators.minLength(1), Validators.maxLength(9)]],
    telefono: [this.data.cliente.telefono, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
    correo: [this.data.cliente.correo, [Validators.required, Validators.minLength(1), Validators.maxLength(120)]],
    centro_id: [this.data.cliente.centro_id, [Validators.required]],
    updated_at: [this.data.cliente.updated_at],
    created_at: [this.data.cliente.created_at]
  })

  errorMessage(inputName: string, inputShow: string) {
    let input = this.editarCliente.get(inputName) || null;

    if (input && input?.touched) {

      if (input.hasError('required') || false) {
        return 'Debe introducir un valor.';
      }
      return input.invalid ? inputShow + '.' : '';
    }
    return "";

  }

  guardar() {
    if (this.editarCliente.valid) {
      this.dialogRef.close(this.editarCliente.value);
    } else {
      this.editarCliente.markAllAsTouched();
    }
  }

  ngOnInit(): void {
  }

}
