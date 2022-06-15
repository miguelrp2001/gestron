import { Component, Inject, OnInit } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { Tarifa, Articulo } from '../../../interfaces/user';

export interface datosRecibidos {
  tarifa: Tarifa;
  articulos: Articulo[];
}

@Component({
  selector: 'app-add-articulos-tarifa',
  templateUrl: './add-articulos-tarifa.component.html',
  styleUrls: ['./add-articulos-tarifa.component.css']
})
export class AddArticulosTarifaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddArticulosTarifaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: datosRecibidos,) { }

  ngOnInit(): void {
  }

  cambiar(matcheckbox: MatCheckbox, matList: MatSelectionList) {
    if (matcheckbox.checked) {
      matList.selectAll();
    } else {
      matList.deselectAll();
    }
  }

}
