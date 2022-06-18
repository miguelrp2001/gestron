import { Component, OnInit } from '@angular/core';
import { GestronbackendService } from '../../services/gestronbackend.service';
import { GestronRequest, Centro, User } from '../../interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { EditCentroComponent } from '../components/edit-centro/edit-centro.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddUserCentroComponent } from '../components/add-user-centro/add-user-centro.component';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.css']
})
export class CentrosComponent implements OnInit {

  centros: Centro[] = [];

  cargandoCentros: boolean = true;
  cargandoAdmins: boolean = false;

  centroNuevo: Centro = {
    nombre: "",
    nombre_legal: "",
    direccion: "",
    nif: "",
    telefono: "",
  }

  constructor(private gestronapi: GestronbackendService, private dialog: MatDialog, private snackbar: MatSnackBar) {
    this.updateCentros();
  }

  updateCentros() {
    this.cargandoCentros = true;
    this.centros = [];
    this.gestronapi.allCentros().subscribe((res: GestronRequest) => {
      if (res.data.centros) {
        this.centros = res.data.centros as Centro[];
        this.cargandoCentros = false;
      }
    })

  }
  ngOnInit(): void {
  }

  deleteUserCentro(centro: Centro, admin: User) {
    this.cargandoAdmins = true;
    this.gestronapi.delAdminCentro(centro, admin).subscribe((res: GestronRequest) => {
      this.admins = res.data.users || [];
      this.cargandoAdmins = false;
      this.snackbar.open("Se ha eliminado el administrador " + admin.name + "de" + centro.nombre + ".", '', { duration: 3000 })
    }, (error) => {
      this.snackbar.open('Ha ocurrido un error.', '', { duration: 5000 })
    })
  }


  addUserCentro(centro: Centro) {
    this.gestronapi.obtenerNotAdminCentro(centro).subscribe((res: GestronRequest) => {
      if (res.data.users) {
        const dialogoAddUserCentro = this.dialog.open(AddUserCentroComponent, {
          data: {
            centro: centro, usuarios: res.data.users
          }
        })
        dialogoAddUserCentro.afterClosed().subscribe((res: MatListOption[]) => {
          if (res) {
            let usuariosParaAnadir: number[] = [];
            res.forEach(elegido => {
              usuariosParaAnadir.push((elegido.value as User).id || 0)
            });
            this.cargandoAdmins = true;
            this.gestronapi.addAdminCentro(centro, usuariosParaAnadir).subscribe((res: GestronRequest) => {
              this.admins = res.data.users || [];
              this.cargandoAdmins = false;
              this.snackbar.open("Se han añadido administradores a " + centro.nombre + ".", '', { duration: 3000 })
            }, (error) => {
              this.snackbar.open('Ha ocurrido un error.', '', { duration: 5000 })
            })
          }
        })
      }
    })
  }

  createCentro(errors?: string[]) {
    const dialogoCrearCentro = this.dialog.open(EditCentroComponent, {
      width: '100%',
      data: { centro: this.centroNuevo, create: true, errors: errors },
    });

    dialogoCrearCentro.afterClosed().subscribe(res => {
      if (res) {
        this.centroNuevo = res as Centro;
        this.gestronapi.createCentro(res as Centro).subscribe((res: GestronRequest) => {
          this.updateCentros();
          this.snackbar.open('Se ha creado el centro ' + res.data.centro?.nombre || '', '', { duration: 5000 })
          this.centroNuevo = {
            nombre: "",
            nombre_legal: "",
            direccion: "",
            nif: "",
            telefono: "",
          };
        }, (error) => {
          console.log(error);

          this.snackbar.open(error.error.message || '', '', { duration: 5000 })
          this.createCentro(error.error.errors);
        })
      } else {
        this.snackbar.open('Operación cancelada.', '', { duration: 5000 })
        this.centroNuevo = {
          nombre: "",
          nombre_legal: "",
          direccion: "",
          nif: "",
          telefono: "",
        };
      }
    })
  }

  editarCentro(centro: Centro, errors?: string[]) {
    const dialogoEditarCentro = this.dialog.open(EditCentroComponent, {
      data: { centro: centro, create: false, errors: errors },
    });

    dialogoEditarCentro.afterClosed().subscribe(res => {
      if (res) {
        this.gestronapi.editarCentro(res as Centro).subscribe((res: GestronRequest) => {
          this.updateCentros();
          this.snackbar.open('Se ha actualizado el centro ' + res.data.centro?.nombre || '', '', { duration: 5000 })
        }, (error) => {
          this.snackbar.open(error.error.message || '', '', { duration: 5000 })
          this.editarCentro(res as Centro, error.error.errors);
        });
      } else {
        this.snackbar.open('Operación cancelada.', '', { duration: 5000 })
      }
    });
  }

  admins: User[] = [];
  getAdmins(centro: Centro) {
    this.cargandoAdmins = true;
    this.admins = [];
    this.gestronapi.obtenerAdminCentro(centro).subscribe((res: GestronRequest) => {
      this.admins = res.data.users || [];
      this.cargandoAdmins = false;
    })
  }

}
