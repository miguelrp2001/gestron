import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GestronRequest, Centro, User } from '../../../interfaces/user';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { GestronbackendService } from '../../../services/gestronbackend.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-tabla-centros',
  templateUrl: './tabla-centros.component.html',
  styleUrls: ['./tabla-centros.component.css']
})
export class TablaCentrosComponent implements OnInit {

  @Input() centros: Centro[] = [];

  @Output() updateUsuarios = new EventEmitter<string>();

  constructor(private breakpointObserver: BreakpointObserver, private apibackend: GestronbackendService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  updateStatus(slider: any) {
    slider = slider.source;
    slider.disabled = true;
    this.apibackend.estadoCentro(Number.parseInt(slider.id), slider.checked).subscribe((res: GestronRequest) => {
      slider.checked = (res.data.mensaje as unknown) as boolean
      slider.disabled = false;
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




  // editCentro(usered: User) {
  //   const dialogoEditar = this.dialog.open(EditUserComponent, {
  //     width: '100%',
  //     data: { user: usered }
  //   })
  //   dialogoEditar.afterClosed().subscribe(result => {
  //     this.apibackend.updateUser(result).subscribe((res: GestronRequest) => {
  //       this.updateUsuarios.emit('upd');
  //       let snackBarRef = this.snackBar.open("Usuario actualizado con éxito.", '', { duration: 5000 });
  //     });

  //   })
  // }

}
