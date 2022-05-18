import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User, GestronRequest } from '../../../interfaces/user';
import { GestronbackendService } from '../../../services/gestronbackend.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent, Errors } from '../edit-user/edit-user.component';
import { Observable, map, shareReplay } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {

  @Input() usuarios: User[] = [];

  @Output() updateUsuarios = new EventEmitter<string>();

  constructor(private breakpointObserver: BreakpointObserver, private apibackend: GestronbackendService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  updateStatus(slider: any) {
    slider = slider.source;
    slider.disabled = true;
    this.apibackend.alternateUser(Number.parseInt(slider.id), slider.checked).subscribe((res: GestronRequest) => {
      slider.checked = (res.data.mensaje as unknown) as boolean
      slider.disabled = false;
      let snackBarRef = this.snackBar.open("El usuario ahora está " + (slider.checked ? "activado." : "desactivado."), '', { duration: 5000 });
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


  editUser(usered: User, errors?: string[]) {
    const dialogoEditar = this.dialog.open(EditUserComponent, {
      width: '100%',
      data: { user: usered, errors: errors }
    })
    dialogoEditar.afterClosed().subscribe(result => {
      if (result) {
        this.apibackend.updateUser(result).subscribe((res: GestronRequest) => {
          this.updateUsuarios.emit('upd');
          let snackBarRef = this.snackBar.open("Usuario actualizado con éxito.", '', { duration: 5000 });
        }, (error) => {
          console.log(error.error.errors);
          this.snackBar.open(error.error.message || '', '', { duration: 5000 })
          this.editUser({ id: usered.id, name: result.name, email: result.email, telefono: result.telefono, ipRegistro: usered.ipRegistro, ipUltLogin: usered.ipUltLogin } as User, error.error.errors);
        });

      } else {
        this.snackBar.open('Operación cancelada.', '', { duration: 5000 })

      }
    })
  }


  logAllOut(usered: User) {
    this.apibackend.logAllOut(usered.id as number).subscribe((res: GestronRequest) => {
      let snackBarRef = this.snackBar.open(res.data.mensaje || 'Listo', '', { duration: 3000 });
    })
  }


}
