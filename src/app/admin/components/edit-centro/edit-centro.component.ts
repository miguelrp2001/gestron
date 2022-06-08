import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Centro } from '../../../interfaces/user';

export interface DiagReceived { centro: Centro; create: boolean, errors?: { [key: string]: Errors }; };
export interface Errors { nombre?: string[], nombre_legal?: string[], nif?: string[], direccion?: string[], telefono?: string[], };


@Component({
  selector: 'app-edit-centro',
  templateUrl: './edit-centro.component.html',
  styleUrls: ['./edit-centro.component.css']
})
export class EditCentroComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DiagReceived>,
    @Inject(MAT_DIALOG_DATA) public data: DiagReceived,) {

    console.log(this.data.errors);

  }

  editarCentro: FormGroup = this.fb.group({
    id: [this.data.centro.id],
    nombre: [this.data.centro.nombre, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    nombre_legal: [this.data.centro.nombre_legal, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    telefono: [this.data.centro.telefono, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    nif: [this.data.centro.nif, [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
    direccion: [this.data.centro.direccion, [Validators.required, Validators.minLength(10), Validators.maxLength(160)]],
  })

  errorMessage(inputName: string, inputShow: string) {
    let input = this.editarCentro.get(inputName) || null;

    if (input && input?.touched) {

      if (input.hasError('required') || false) {
        return 'Debe introducir un valor.';
      }
      return input.invalid ? inputShow + '.' : '';
    }

    if (this.data.errors && this.data.errors[inputName]) {
      input?.setErrors({ serverReject: true })
      return (this.data.errors[inputName] as string[])[0];
    }

    return "";

  }

  guardar() {
    if (this.editarCentro.valid) {
      this.dialogRef.close(this.editarCentro.value);
    } else {
      this.editarCentro.markAllAsTouched();
    }
  }

  ngOnInit(): void {

  }





}
