import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DiagReceived } from 'src/app/admin/components/edit-centro/edit-centro.component';

@Component({
  selector: 'app-connection-error',
  templateUrl: './connection-error.component.html',
  styleUrls: ['./connection-error.component.css']
})
export class ConnectionErrorComponent implements OnInit {

  constructor(public dialog: MatDialogRef<DiagReceived>) { }


  reintentar() {
    this.dialog.close();
  }

  ngOnInit(): void {
  }

}
