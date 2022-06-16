import { Component, Inject, OnInit } from '@angular/core';
import { PuntoVenta } from '../../../interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DiagReceived { puntoventa: PuntoVenta; create: boolean; errors?: { [key: string]: Errors }; };
export interface Errors { nombre?: string[] };

@Component({
  selector: 'app-form-pos',
  templateUrl: './form-pos.component.html',
  styleUrls: ['./form-pos.component.css']
})
export class FormPosComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DiagReceived>,
    @Inject(MAT_DIALOG_DATA) public data: DiagReceived,) { }

  editarPuntoVenta: FormGroup = this.fb.group({
    id: [this.data.puntoventa.id],
    nombre: [this.data.puntoventa.nombre, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
    centro_id: [this.data.puntoventa.centro_id, [Validators.required]],
    updated_at: [this.data.puntoventa.updated_at],
    created_at: [this.data.puntoventa.created_at]
  })

  errorMessage(inputName: string, inputShow: string) {
    let input = this.editarPuntoVenta.get(inputName) || null;

    if (input && input?.touched) {

      if (input.hasError('required') || false) {
        return 'Debe introducir un valor.';
      }
      return input.invalid ? inputShow + '.' : '';
    }
    return "";

  }

  guardar() {
    if (this.editarPuntoVenta.valid) {
      this.dialogRef.close(this.editarPuntoVenta.value);
    } else {
      this.editarPuntoVenta.markAllAsTouched();
    }
  }

  ngOnInit(): void {
  }

}
