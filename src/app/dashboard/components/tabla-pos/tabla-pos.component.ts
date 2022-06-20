import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { PuntoVenta, GestronRequest } from '../../../interfaces/user';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { GestronbackendService } from '../../../services/gestronbackend.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormPosComponent } from '../form-pos/form-pos.component';

@Component({
  selector: 'app-tabla-pos',
  templateUrl: './tabla-pos.component.html',
  styleUrls: ['./tabla-pos.component.css']
})
export class TablaPosComponent implements OnInit {


  @Input() puntosventa: PuntoVenta[] = [];

  @Output() actualizarPOS = new EventEmitter<string>();

  constructor(private breakpointObserver: BreakpointObserver, private apibackend: GestronbackendService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  updateStatus(slider: any) {
    slider = slider.source;
    slider.disabled = true;
    this.apibackend.chgPuntoVentaEstado(Number.parseInt(slider.id), slider.checked).subscribe((res: GestronRequest) => {
      slider.checked = (res.data.mensaje as unknown) as boolean
      slider.disabled = false;
      let snackBarRef = this.snackBar.open("El punto de venta ahora está " + (slider.checked ? "activado." : "desactivado."), '', { duration: 5000 });
    }, (err) => {
      let snackBarRef = this.snackBar.open("No se ha podido cambiar el estado.", '', { duration: 5000 });
      slider.checked = !slider.checked;
      slider.disabled = false;
    });
  }

  editarPos(pos: PuntoVenta, errors?: string[]) {
    const dialogoEditar = this.dialog.open(FormPosComponent, {
      data: { puntoventa: pos, errors: errors }
    })
    dialogoEditar.afterClosed().subscribe(result => {
      if (result) {
        this.apibackend.updatePuntoVenta(result).subscribe((res: GestronRequest) => {
          this.actualizarPOS.emit("actualizar");
          this.snackBar.open("El punto de venta se ha actualizado correctamente.", '', { duration: 5000 });
        }, (err) => {
          this.snackBar.open("No se ha podido actualizar el punto de venta.", '', { duration: 5000 });
        });
      }
    });
  }

  regenerarToken(pos: PuntoVenta) {
    this.apibackend.regenerarToken(pos).subscribe((res: GestronRequest) => {
      this.snackBar.open("El token se ha regenerado correctamente.", '', { duration: 5000 });
      this.actualizarPOS.emit('update');
    }, (err) => {
      this.snackBar.open("No se ha podido regenerar el token.", '', { duration: 5000 });
    });
  }
  copiado() {
    this.snackBar.open("Token copiado al portapapeles", '', { duration: 3000 });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}
