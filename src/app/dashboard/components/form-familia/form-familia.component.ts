import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Familia } from '../../../interfaces/user';

export interface DiagReceived { familia: Familia; create: boolean; errors?: { [key: string]: Errors }; };
export interface Errors { nombre?: string[] };

@Component({
  selector: 'app-form-familia',
  templateUrl: './form-familia.component.html',
  styleUrls: ['./form-familia.component.css']
})
export class FormFamiliaComponent implements OnInit {
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DiagReceived>,
    @Inject(MAT_DIALOG_DATA) public data: DiagReceived,) {
    console.log(this.data);


  }

  editarFamilia: FormGroup = this.fb.group({
    id: [this.data.familia.id],
    nombre: [this.data.familia.nombre, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
    updated_at: [this.data.familia.updated_at],
    created_at: [this.data.familia.created_at]
  })

  errorMessage(inputName: string, inputShow: string) {
    let input = this.editarFamilia.get(inputName) || null;

    if (input && input?.touched) {

      if (input.hasError('required') || false) {
        return 'Debe introducir un valor.';
      }
      return input.invalid ? inputShow + '.' : '';
    }
    return "";

  }

  guardar() {
    if (this.editarFamilia.valid) {
      this.dialogRef.close(this.editarFamilia.value);
    } else {
      this.editarFamilia.markAllAsTouched();
    }
  }

  ngOnInit(): void {
  }

}
