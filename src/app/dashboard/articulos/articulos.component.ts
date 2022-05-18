import { Component, OnInit } from '@angular/core';
import { GestronbackendService } from '../../services/gestronbackend.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Articulo, GestronRequest } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  articulos: Articulo[] = [];

  constructor(private apibackend: GestronbackendService, public dialog: MatDialog, private snackBar: MatSnackBar, private authService: AuthService) {

  }



  ngOnInit(): void {
    this.apibackend.obtenerArticulos(this.authService.getCentroSeleccionado()).subscribe((res: GestronRequest) => {
      this.articulos = res.data.articulos || [];
    })
  }



}
