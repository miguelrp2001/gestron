import { Component, OnInit } from '@angular/core';
import { Familia, GestronRequest } from '../../interfaces/user';
import { GestronbackendService } from '../../services/gestronbackend.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { FormFamiliaComponent } from '../components/form-familia/form-familia.component';

@Component({
  selector: 'app-familias',
  templateUrl: './familias.component.html',
  styleUrls: ['./familias.component.css']
})
export class FamiliasComponent implements OnInit {


  familias: Familia[] = [];
  cabecerasFamilia: number[] = [];
  actualizandoFamiliasBool: Boolean = true;

  familiaNueva: Familia = {
    id: 0,
    nombre: ""
  };


  actualizandoFamilias(): Boolean {
    return this.actualizandoFamiliasBool;
  }

  constructor(private apibackend: GestronbackendService, public dialog: MatDialog, private snackBar: MatSnackBar, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.actualizarFamilias();
  }

  crearFamilia(errors?: string[]) {
    const dialogoCrearFamilia = this.dialog.open(FormFamiliaComponent, {
      width: '30em',
      data: { familia: this.familiaNueva, create: true, errors: errors },
    });

    dialogoCrearFamilia.afterClosed().subscribe(res => {
      if (res) {
        this.familiaNueva = res as Familia;
        this.apibackend.crearFamilia(res as Familia).subscribe((res: GestronRequest) => {
          this.actualizarFamilias();
          this.snackBar.open('Se ha creado la familia ' + res.data.familia?.nombre || '', '', { duration: 5000 })
          this.familiaNueva = {
            id: 0,
            nombre: ""
          };
        }, (error) => {
          this.snackBar.open(error.error.message || '', '', { duration: 5000 })
          this.crearFamilia(error.error.errors);
        })
      } else {
        this.snackBar.open('Operación cancelada.', '', { duration: 5000 })
        this.familiaNueva = {
          id: 0,
          nombre: ""
        };
      }
    })
  }

  actualizarFamilias(): void {
    this.actualizandoFamiliasBool = true;
    this.apibackend.obtenerFamiliasCompletas().subscribe((res: GestronRequest) => {
      this.familias = res.data.familias || [];
      this.cabecerasFamilia = [];
      this.familias.forEach(familia => {
        this.cabecerasFamilia.push(familia.id);
      });
      this.actualizandoFamiliasBool = false;
    });
  }

}
