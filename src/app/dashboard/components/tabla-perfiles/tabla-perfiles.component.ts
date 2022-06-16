import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Perfil, GestronRequest } from '../../../interfaces/user';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { GestronbackendService } from '../../../services/gestronbackend.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, shareReplay } from 'rxjs';
import { FormPerfilComponent } from '../form-perfil/form-perfil.component';

@Component({
  selector: 'app-tabla-perfiles',
  templateUrl: './tabla-perfiles.component.html',
  styleUrls: ['./tabla-perfiles.component.css']
})
export class TablaPerfilesComponent implements OnInit {


  @Input() perfiles: Perfil[] = [];

  @Output() actualizarPerfiles = new EventEmitter<string>();

  constructor(private breakpointObserver: BreakpointObserver, private apibackend: GestronbackendService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  updateStatus(slider: any) {
    slider = slider.source;
    slider.disabled = true;
    this.apibackend.chngStatusPerfil(Number.parseInt(slider.id), slider.checked).subscribe((res: GestronRequest) => {
      slider.checked = (res.data.mensaje as unknown) as boolean
      slider.disabled = false;
      let snackBarRef = this.snackBar.open("El perfil ahora está " + (slider.checked ? "activado." : "desactivado."), '', { duration: 5000 });
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

  editarPerfil(perfil: Perfil, errors?: string[]) {
    const dialogoEditar = this.dialog.open(FormPerfilComponent, {
      data: { perfil: perfil, errors: errors }
    })
    dialogoEditar.afterClosed().subscribe(result => {
      if (result) {
        this.apibackend.updatePerfil(result).subscribe((res: GestronRequest) => {
          this.actualizarPerfiles.emit('upd');
          let snackBarRef = this.snackBar.open("Perfil actualizado con éxito.", '', { duration: 1500 });
        }, (error) => {
          console.log(error.error.errors);
          this.snackBar.open(error.error.message || '', '', { duration: 5000 })
          this.editarPerfil(result, error.error.errors);
        });

      } else {
        this.snackBar.open('Operación cancelada.', '', { duration: 5000 })

      }
    })
  }

}
