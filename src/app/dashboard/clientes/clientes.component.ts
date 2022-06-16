import { Component, OnInit } from '@angular/core';
import { Cliente, GestronRequest } from '../../interfaces/user';
import { GestronbackendService } from '../../services/gestronbackend.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { FormClientesComponent } from '../components/form-clientes/form-clientes.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  public clientes: Cliente[] = [];
  cargandoClientes: boolean = true;
  cargandoDatosCliente: boolean = false;
  datosCliente: string[] = [];

  clienteNuevo: Cliente = { id: 0, nombre: "", direccion: "", telefono: "", correo: "", nif: "", nombre_fiscal: "", centro_id: this.authService.getCentroSeleccionado().id };

  constructor(private gestronapi: GestronbackendService, private dialog: MatDialog, private snackbar: MatSnackBar, private authService: AuthService) {
    this.updateClientes();
  }

  ngOnInit(): void {
  }

  updateClientes() {
    this.cargandoClientes = true;
    this.clientes = [];
    this.gestronapi.obtenerClientes().subscribe((res: GestronRequest) => {
      this.clientes = res.data.clientes as Cliente[];
      this.cargandoClientes = false;
    });
  }

  updateStatus(slider: any) {
    slider = slider.source;
    slider.disabled = true;
    this.gestronapi.updateStatusClienteMail(slider.id, slider.checked).subscribe((res: GestronRequest) => {
      slider.disabled = false;
      slider.checked = res.data.mensaje as unknown as boolean;
      this.snackbar.open("Ahora el cliente " + ((slider.checked) ? "" : "no ") + "recibirá correos", "", { duration: 3000 });
    }, (err) => {
      slider.disabled = false;
      slider.checked = !slider.checked;
      this.snackbar.open("No se ha podido actualizar", "", { duration: 3000 });

    });
  }

  getDatos(cliente: Cliente) {
    this.cargandoDatosCliente = true;
    this.datosCliente = [];
  }


  createCliente(cliente?: Cliente, errors?: Error[]) {
    let dialogRef = this.dialog.open(FormClientesComponent, {
      width: '500px',
      data: {
        cliente: cliente || this.clienteNuevo,
        create: true,
        errors: errors,
      }
    });

    dialogRef.afterClosed().subscribe((res: Cliente) => {
      if (res) {
        this.gestronapi.addCliente(res).subscribe((ress: GestronRequest) => {
          if (ress.data.cliente) {
            this.updateClientes();
            this.snackbar.open("Cliente creado correctamente", "", { duration: 3000 });
            this.clienteNuevo = { id: 0, nombre: "", direccion: "", telefono: "", correo: "", nif: "", nombre_fiscal: "", centro_id: this.authService.getCentroSeleccionado().id };
          }
        }, (err) => {
          this.snackbar.open("No se ha podido crear el cliente", "", { duration: 3000 });
          this.createCliente(res, err.error.errors);
        });
      }
    });
  }

  editarCliente(cliente: Cliente, errors?: Error[]) {
    let dialogRef = this.dialog.open(FormClientesComponent, {
      width: '500px',
      data: {
        cliente: cliente,
        create: false,
        errors: errors,
      }
    });

    dialogRef.afterClosed().subscribe((res: Cliente) => {
      if (res) {
        this.gestronapi.updateCliente(res).subscribe((ress: GestronRequest) => {
          this.updateClientes();
          this.snackbar.open("Se ha editado el cliente " + ((ress.data.cliente || res).nombre || ""), '', { duration: 3000 })
        }
          , (error: any) => {
            this.snackbar.open('Ha ocurrido un error.', '', { duration: 5000 });
            this.editarCliente(res, error.error.errors);
          });
      }
    });
  }

}
