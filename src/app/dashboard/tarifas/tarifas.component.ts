import { Component, OnInit } from '@angular/core';
import { GestronbackendService } from '../../services/gestronbackend.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GestronRequest, Tarifa, Precio, Articulo, Impuesto } from '../../interfaces/user';
import { AddArticulosTarifaComponent } from '../components/add-articulos-tarifa/add-articulos-tarifa.component';
import { MatListOption } from '@angular/material/list';
import { EditPrecioComponent } from '../components/edit-precio/edit-precio.component';
import { EditTarifaComponent } from '../components/edit-tarifa/edit-tarifa.component';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.css']
})
export class TarifasComponent implements OnInit {
  public tarifas: Tarifa[] = [];
  public impuestos: Impuesto[] = [];
  cargandoTarifas: boolean = true;
  cargandoPrecios: boolean = false;
  precios: Precio[] = [];

  tarifaNueva: Tarifa = { id: 0, nombre: "" };

  constructor(private gestronapi: GestronbackendService, private dialog: MatDialog, private snackbar: MatSnackBar) {
    this.updateTarifas();
  }

  ngOnInit(): void {
  }

  updateTarifas() {
    this.cargandoTarifas = true;
    this.tarifas = [];
    this.gestronapi.obtenerTarifas().subscribe((res: GestronRequest) => {
      if (res.data.tarifas) {
        this.tarifas = res.data.tarifas as Tarifa[];
        this.gestronapi.obtenerImpuestos().subscribe((res: GestronRequest) => {
          if (res.data.impuestos) {
            this.impuestos = res.data.impuestos as Impuesto[];
          }
        });
      }
      this.cargandoTarifas = false;
    });
  }

  getPrecios(tarifa: Tarifa) {
    this.cargandoPrecios = true;
    this.precios = [];
    this.gestronapi.obtenerTarifa(tarifa.id).subscribe((res: GestronRequest) => {
      if (res.data.precios) {
        this.precios = res.data.precios as Precio[];
        this.cargandoPrecios = false;
      }
    });
  }

  addArticuloTarifa(tarifa: Tarifa) {
    let btnAddArticles = document.getElementById("btnAddArticles") as HTMLButtonElement;
    btnAddArticles.disabled = true;
    this.gestronapi.getArticulosNoTarifa(tarifa).subscribe((resu: GestronRequest) => {
      if (resu.data.articulos) {
        const dialogRef = this.dialog.open(AddArticulosTarifaComponent, {
          width: '500px',
          data: {
            articulos: resu.data.articulos as Articulo[],
            tarifa: tarifa as Tarifa
          }
        });
        dialogRef.afterClosed().subscribe((res: MatListOption[]) => {
          btnAddArticles.disabled = true;
          if (res) {
            let articulosParaAnadir: number[] = [];
            res.forEach(elegido => {
              articulosParaAnadir.push((elegido.value as Articulo).id || 0)
            });
            this.cargandoPrecios = true;
            this.gestronapi.addArticulosTarifa(tarifa, articulosParaAnadir).subscribe((res: GestronRequest) => {
              this.getPrecios(tarifa);
              this.snackbar.open("Se han añadido articulos", '', { duration: 3000 })
            }, (error) => {
              this.snackbar.open('Ha ocurrido un error.', '', { duration: 5000 })
            })
          }
        });
      }
    });
  }
  deletePrecioTarifa(precio: Precio, tarifa: Tarifa) {
    (document.getElementById(precio.id + "_DEL") as HTMLButtonElement).disabled = true;
    let deletingSnack = this.snackbar.open("Eliminando...", '', { duration: 999999 })
    this.gestronapi.deletePrecioTarifa(precio).subscribe((res: GestronRequest) => {
      this.getPrecios(tarifa);
      deletingSnack.dismiss();
      this.snackbar.open("Se ha eliminado el precio", '', { duration: 3000 })
    }, (error: any) => {
      deletingSnack.dismiss();
      this.snackbar.open('Ha ocurrido un error.', '', { duration: 5000 })
    })
  }
  editPrecioTarifa(precio: Precio, tarifa: Tarifa, errores?: Error[]) {
    (document.getElementById(precio.id + "_EDIT") as HTMLButtonElement).disabled = true;

    let dialogRef = this.dialog.open(EditPrecioComponent, {
      width: '500px',
      data: {
        precio: precio,
        create: false,
        errors: errores,
        impuestos: this.impuestos
      }
    });

    dialogRef.afterClosed().subscribe((res: Precio) => {
      if (res) {
        this.gestronapi.updatePrecioTarifa(res).subscribe((ress: GestronRequest) => {
          this.getPrecios(tarifa as Tarifa);
          (document.getElementById(precio.id + "_EDIT") as HTMLButtonElement).disabled = false;
          this.snackbar.open("Se ha editado el precio", '', { duration: 3000 })
        }, (error: any) => {
          this.snackbar.open('Ha ocurrido un error.', '', { duration: 5000 });
          (document.getElementById(precio.id + "_EDIT") as HTMLButtonElement).disabled = false;
          this.editPrecioTarifa({ id: precio.id, precio: res.precio, articulo: precio.articulo, impuesto: precio.impuesto }, tarifa, error.error.errors);
        });
      }
    });
  }
  createTarifa(errors?: Error[]) {
    let dialogRef = this.dialog.open(EditTarifaComponent, {
      width: '500px',
      data: {
        tarifa: this.tarifaNueva,
        create: true,
        errors: errors,
      }
    });

    dialogRef.afterClosed().subscribe((res: Tarifa) => {
      if (res) {
        this.gestronapi.crearTarifa(res).subscribe((ress: GestronRequest) => {
          this.updateTarifas();
          this.snackbar.open("Se ha creado la tarifa " + ((ress.data.tarifa || res).nombre || ""), '', { duration: 3000 })
        }, (error: any) => {
          this.snackbar.open('Ha ocurrido un error.', '', { duration: 5000 });
          this.createTarifa(error.error.errors);
        });
      }
    });
  }

  editarTarifa(tarifa: Tarifa, errors?: Error[]) {
    let dialogRef = this.dialog.open(EditTarifaComponent, {
      width: '500px',
      data: {
        tarifa: tarifa,
        create: false,
        errors: errors,
      }
    });

    dialogRef.afterClosed().subscribe((res: Tarifa) => {
      if (res) {
        this.gestronapi.updateTarifa(res).subscribe((ress: GestronRequest) => {
          this.updateTarifas();
          this.snackbar.open("Se ha editado la tarifa " + ((ress.data.tarifa || res).nombre || ""), '', { duration: 3000 })
        }
          , (error: any) => {
            this.snackbar.open('Ha ocurrido un error.', '', { duration: 5000 });
            this.editarTarifa(tarifa, error.error.errors);
          });
      }
    });
  }
}
