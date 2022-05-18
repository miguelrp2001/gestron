import { Component, Inject, OnInit } from '@angular/core';
import { Centro, User } from '../../../interfaces/user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface datosRecibidos {
  centro: Centro;
  usuarios: User[];
}

@Component({
  selector: 'app-add-user-centro',
  templateUrl: './add-user-centro.component.html',
  styleUrls: ['./add-user-centro.component.css']
})

export class AddUserCentroComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddUserCentroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: datosRecibidos,) { }

  ngOnInit(): void {
  }

}
