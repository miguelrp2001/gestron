import { Component, OnInit } from '@angular/core';
import { PuntoVenta, GestronRequest } from '../../interfaces/user';
import { GestronbackendService } from '../../services/gestronbackend.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { FormPosComponent } from '../components/form-pos/form-pos.component';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  puntosventa: PuntoVenta[] = [];
  actualizandoPuntosBool: Boolean = true;

  actualizandoPOSs(): Boolean {
    return this.actualizandoPuntosBool;
  }

  constructor(private apibackend: GestronbackendService, public dialog: MatDialog, private snackBar: MatSnackBar, private authService: AuthService) {
    this.actualizarPOS();
  }

  ngOnInit(): void {
  }

  actualizarPOS() {
    this.actualizandoPuntosBool = true;
    this.apibackend.obtenerPuntosVenta().subscribe((res: GestronRequest) => {
      this.puntosventa = res.data.puntosVenta as PuntoVenta[];
      this.actualizandoPuntosBool = false;
    }, (err) => {
      this.actualizandoPuntosBool = false;
      this.snackBar.open("No se ha podido cargar los puntos de venta.", '', { duration: 5000 });
    });
  }

  crearPuntoVenta(puntoventa?: PuntoVenta, errors?: string[]) {
    let dialogRef = this.dialog.open(FormPosComponent, {
      width: '500px',
      data: {
        puntoventa: puntoventa || { id: 0, nombre: "", token: "", centro_id: this.authService.getCentroSeleccionado().id },
        errors: errors,
        create: true
      }
    });

    dialogRef.afterClosed().subscribe((result: PuntoVenta) => {
      if (result) {
        this.apibackend.addPuntoVenta(result).subscribe((res: GestronRequest) => {
          this.actualizarPOS();
          this.snackBar.open("Punto de venta creado correctamente", '', { duration: 3000 });
        }, (err) => {
          this.snackBar.open("No se ha podido crear el punto de venta", '', { duration: 5000 });
          this.crearPuntoVenta(result, err.error.errors);
        });
      } else {
        this.snackBar.open("Operación cancelada", '', { duration: 3000 });
      }
    });

  }


}
