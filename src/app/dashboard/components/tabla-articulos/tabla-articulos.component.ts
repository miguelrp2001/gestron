import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { GestronbackendService } from '../../../services/gestronbackend.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GestronRequest, Articulo, Familia } from '../../../interfaces/user';
import { Observable, map, shareReplay } from 'rxjs';
import { FormArticuloComponent } from '../form-articulo/form-articulo.component';

@Component({
  selector: 'app-tabla-articulos',
  templateUrl: './tabla-articulos.component.html',
  styleUrls: ['./tabla-articulos.component.css']
})
export class TablaArticulosComponent implements OnInit {

  @Input() articulos: Articulo[] = [];
  @Input() familias: Familia[] = [];

  @Output() actualizarArticulos = new EventEmitter<string>();

  constructor(private breakpointObserver: BreakpointObserver, private apibackend: GestronbackendService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  updateStatus(slider: any) {
    slider = slider.source;
    slider.disabled = true;
    this.apibackend.chgStatusArticulo(Number.parseInt(slider.id), slider.checked).subscribe((res: GestronRequest) => {
      slider.checked = (res.data.mensaje as unknown) as boolean
      slider.disabled = false;
      let snackBarRef = this.snackBar.open("El artículo ahora está " + (slider.checked ? "activado." : "desactivado."), '', { duration: 5000 });
    }, (err) => {
      let snackBarRef = this.snackBar.open("No se ha podido cambiar el estado.", '', { duration: 5000 });
      slider.checked = !slider.checked;
      slider.disabled = false;
    })
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  activo(estado: string): boolean {
    if (estado.match("a")) {
      return true;
    }
    return false;
  }

  mensaje(estado: string): string {
    return (this.activo(estado) ? 'Desactivar artículo' : 'Activar artículo')
  }

  nombreFamilia(idFamilia: Articulo): string {
    let nombre = "?";
    this.familias.forEach(familia => {
      if (familia.id === idFamilia.familia_id) {
        nombre = familia.nombre;
      }
    });

    return nombre;
  }

  editarArticulo(articulo: Articulo, errors?: string[]) {
    const dialogoEditar = this.dialog.open(FormArticuloComponent, {
      width: '100%',
      data: { articulo: articulo, errors: errors, familias: this.familias }
    })
    dialogoEditar.afterClosed().subscribe(result => {
      if (result) {
        this.apibackend.updateArticulo(result).subscribe((res: GestronRequest) => {
          this.actualizarArticulos.emit('upd');
          let snackBarRef = this.snackBar.open("Artículo actualizado con éxito.", '', { duration: 1500 });
        }, (error) => {
          this.snackBar.open(error.error.message || '', '', { duration: 5000 })
          this.editarArticulo(result, error.error.errors);
        });

      } else {
        this.snackBar.open('Operación cancelada.', '', { duration: 5000 })

      }
    })
  }


}
