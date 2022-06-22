import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Articulo, Familia } from '../../../interfaces/user';


export interface DiagReceived { articulo: Articulo; familias: Familia[]; create: boolean; errors?: { [key: string]: Errors }; };
export interface Errors { nombre?: string[], nombre_corto?: string[], codBarras?: string[], familia_id?: string[], color?: string[], estado?: string[] };

@Component({
  selector: 'app-form-articulo',
  templateUrl: './form-articulo.component.html',
  styleUrls: ['./form-articulo.component.css']
})
export class FormArticuloComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DiagReceived>,
    @Inject(MAT_DIALOG_DATA) public data: DiagReceived,) {
  }

  editarArticulo: FormGroup = this.fb.group({
    id: [this.data.articulo.id],
    nombre: [this.data.articulo.nombre, [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
    nombre_corto: [this.data.articulo.nombre_corto, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
    codbarras: [this.data.articulo.codbarras, [Validators.minLength(1), Validators.maxLength(50)]],
    color: [this.data.articulo.color, [Validators.required, Validators.pattern("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$")]],
    familia: [this.data.articulo.familia_id || this.data.articulo.familia, [Validators.required]],
    updated_at: [this.data.articulo.updated_at],
    created_at: [this.data.articulo.created_at]
  })

  errorMessage(inputName: string, inputShow: string) {
    let input = this.editarArticulo.get(inputName) || null;

    if (input && input?.touched) {

      if (input.hasError('required') || false) {
        return 'Debe introducir un valor.';
      }
      return input.invalid ? inputShow + '.' : '';
    }
    return "";

  }

  guardar() {
    if (this.editarArticulo.valid) {
      this.dialogRef.close(this.editarArticulo.value);
    } else {
      this.editarArticulo.markAllAsTouched();
    }
  }

  ngOnInit(): void {
  }

}
