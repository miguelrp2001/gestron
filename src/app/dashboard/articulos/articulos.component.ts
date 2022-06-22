import { Component, OnInit } from '@angular/core';
import { GestronbackendService } from '../../services/gestronbackend.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Articulo, GestronRequest, Familia } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { FormArticuloComponent } from '../components/form-articulo/form-articulo.component';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  articulos: Articulo[] = [];
  familias: Familia[] = [];
  actualizandoArticulosBool: Boolean = true;

  articuloNuevo: Articulo = {
    nombre: "",
    nombre_corto: "",
    color: "#FFFFFF",
    codbarras: "",
    familia_id: 0,
    estado: "a",
    id: 0,
  };


  actualizandoArticulos(): Boolean {
    return this.actualizandoArticulosBool;
  }

  constructor(private apibackend: GestronbackendService, public dialog: MatDialog, private snackBar: MatSnackBar, private authService: AuthService) {
  }



  createArticulo(errors?: string[]) {
    const dialogoCrearArticulo = this.dialog.open(FormArticuloComponent, {
      width: '100%',
      data: { articulo: this.articuloNuevo, create: true, familias: this.familias, errors: errors },
    });

    dialogoCrearArticulo.afterClosed().subscribe(res => {
      if (res) {
        this.articuloNuevo = res as Articulo;
        this.apibackend.crearArticulo(res as Articulo).subscribe((res: GestronRequest) => {
          this.actualizarArticulos();
          this.snackBar.open('Se ha creado el artículo ' + res.data.articulo?.nombre || '', '', { duration: 5000 })
          this.articuloNuevo = {
            nombre: "",
            nombre_corto: "",
            color: res.data.articulo?.color || "#FFFFFF",
            familia_id: res.data.articulo?.familia_id || 0,
            estado: "a",
            id: 0
          };
        }, (error) => {
          this.snackBar.open(error.error.message || '', '', { duration: 5000 })
          this.createArticulo(error.error.errors);
        })
      } else {
        this.snackBar.open('Operación cancelada.', '', { duration: 5000 })
        this.articuloNuevo = {
          nombre: "",
          nombre_corto: "",
          color: this.articuloNuevo.color,
          familia_id: this.articuloNuevo.familia_id || this.articuloNuevo.familia,
          estado: "a",
          id: 0
        };
      }
    })
  }

  ngOnInit(): void {
    this.actualizarArticulos();
  }


  actualizarArticulos(): void {
    this.actualizandoArticulosBool = true;
    this.apibackend.obtenerFamilias().subscribe((res: GestronRequest) => {
      this.familias = res.data.familias || [];
      this.apibackend.obtenerArticulos().subscribe((res: GestronRequest) => {
        this.articulos = res.data.articulos || [];
        this.actualizandoArticulosBool = false;
      });
    })
  }

}
