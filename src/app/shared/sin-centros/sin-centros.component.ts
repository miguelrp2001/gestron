import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DiagReceived } from '../../login-screen/register-form/register-form.component';

@Component({
  selector: 'app-sin-centros',
  templateUrl: './sin-centros.component.html',
  styleUrls: ['./sin-centros.component.css']
})
export class SinCentrosComponent implements OnInit {

  constructor(public dialog: MatDialogRef<DiagReceived>) { }


  reintentar() {
    this.dialog.close();
  }
  ngOnInit(): void {
  }

}
