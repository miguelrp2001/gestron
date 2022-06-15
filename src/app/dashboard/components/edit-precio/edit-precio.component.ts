import { Component, Inject, OnInit } from '@angular/core';
import { Precio, Impuesto } from '../../../interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DiagReceived { precio: Precio; create: boolean; errors?: { [key: string]: Errors }; impuestos?: Impuesto[] };
export interface Errors { precio?: string[]; impuesto?: string[]; };

@Component({
  selector: 'app-edit-precio',
  templateUrl: './edit-precio.component.html',
  styleUrls: ['./edit-precio.component.css']
})
export class EditPrecioComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DiagReceived>,
    @Inject(MAT_DIALOG_DATA) public data: DiagReceived,) {
  }

  editarPrecio: FormGroup = this.fb.group({
    id: [this.data.precio.id],
    precio: [this.data.precio.precio, [Validators.required, Validators.min(0), Validators.max(999999)]],
    impuesto_id: [this.data.precio.impuesto.id, [Validators.required, Validators.min(0)]],
    updated_at: [this.data.precio.updated_at],
    created_at: [this.data.precio.created_at]
  })

  errorMessage(inputName: string, inputShow: string) {
    let input = this.editarPrecio.get(inputName) || null;

    if (input && input?.touched) {

      if (input.hasError('required') || false) {
        return 'Debe introducir un valor.';
      }
      return input.invalid ? inputShow + '.' : '';
    }
    return "";
  }

  guardar() {
    if (this.editarPrecio.valid) {
      this.dialogRef.close(this.editarPrecio.value);
    } else {
      this.editarPrecio.markAllAsTouched();
    }
  }


  ngOnInit(): void {
  }

}
