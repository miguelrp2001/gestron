import { Component, OnInit } from '@angular/core';
import { GestronbackendService } from '../../services/gestronbackend.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tarifa, GestronRequest, Perfil } from '../../interfaces/user';
import { FormPerfilComponent } from '../components/form-perfil/form-perfil.component';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

  actuPerfiles: boolean = false;
  perfiles: Perfil[] = [];

  constructor(private gestronapi: GestronbackendService, private dialog: MatDialog, private snackbar: MatSnackBar) {

    this.updatePerfiles();

  }

  ngOnInit(): void {
  }

  actualizandoPerfiles(): boolean {
    return this.actuPerfiles;
  }

  updatePerfiles() {
    this.actuPerfiles = true;
    this.gestronapi.obtenerPerfiles().subscribe((res: GestronRequest) => {
      if (res.data.perfiles) {
        this.perfiles = res.data.perfiles as Perfil[];
      }
      this.actuPerfiles = false;
    });
  }

  createPerfil(perfil?: Perfil, errors?: string[]) {
    let dialogRef = this.dialog.open(FormPerfilComponent, {
      data: {
        perfil: perfil || { id: 0, nombre: "" },
        errors: errors,
        create: true,
      }
    });

    dialogRef.afterClosed().subscribe((result: Perfil) => {
      if (result) {
        this.gestronapi.addPerfil(result).subscribe((res: GestronRequest) => {
          if (res.data.perfil) {
            this.updatePerfiles();
            this.snackbar.open("Perfil creado correctamente", "", { duration: 3000 });
          }
        }, (err) => {
          this.snackbar.open("Error al crear el perfil", "", { duration: 3000 });
          this.createPerfil(result, err.error.errors);
        });
      }
    });
  }

}
