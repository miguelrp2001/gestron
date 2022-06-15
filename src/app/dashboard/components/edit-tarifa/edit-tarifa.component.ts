import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tarifa } from '../../../interfaces/user';

export interface DiagReceived { tarifa: Tarifa; create: boolean; errors?: { [key: string]: Errors }; };
export interface Errors { nombre?: string[] };

@Component({
  selector: 'app-edit-tarifa',
  templateUrl: './edit-tarifa.component.html',
  styleUrls: ['./edit-tarifa.component.css']
})
export class EditTarifaComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DiagReceived>,
    @Inject(MAT_DIALOG_DATA) public data: DiagReceived,) { }

  editarTarifa: FormGroup = this.fb.group({
    id: [this.data.tarifa.id],
    nombre: [this.data.tarifa.nombre, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
    updated_at: [this.data.tarifa.updated_at],
    created_at: [this.data.tarifa.created_at]
  })

  errorMessage(inputName: string, inputShow: string) {
    let input = this.editarTarifa.get(inputName) || null;

    if (input && input?.touched) {

      if (input.hasError('required') || false) {
        return 'Debe introducir un valor.';
      }
      return input.invalid ? inputShow + '.' : '';
    }
    return "";

  }

  guardar() {
    if (this.editarTarifa.valid) {
      this.dialogRef.close(this.editarTarifa.value);
    } else {
      this.editarTarifa.markAllAsTouched();
    }
  }

  ngOnInit(): void {
  }

}
