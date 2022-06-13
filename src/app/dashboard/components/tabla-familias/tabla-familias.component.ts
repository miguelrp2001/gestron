import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Familia, Articulo, GestronRequest } from '../../../interfaces/user';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GestronbackendService } from '../../../services/gestronbackend.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormFamiliaComponent } from '../form-familia/form-familia.component';


@Component({
  selector: 'app-tabla-familias',
  templateUrl: './tabla-familias.component.html',
  styleUrls: ['./tabla-familias.component.css']
})
export class TablaFamiliasComponent implements OnInit {

  @Input() familias: Familia[] = [];
  @Input() cabecerasFamilia: number[] = [];
  @Output() actualizarFamilias = new EventEmitter<string>();

  constructor(private dialog: MatDialog, private gestronapi: GestronbackendService, private snackBar: MatSnackBar) { }

  drop(event: CdkDragDrop<Articulo[]> | CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.articulos, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data.articulos,
        event.container.data.articulos,
        event.previousIndex,
        event.currentIndex,
      );
      let snackBarRef = this.snackBar.open("Moviendo " + (event.item.element.nativeElement.getAttribute("title")) + " desde " + event.previousContainer.data.nombre + " a " + event.container.data.nombre, '', { duration: 1500 });
      this.changeFamilyOfArticle(event.item.element.nativeElement.id, event.container.data.id)
    }
  }


  edit(familia: Familia, errors?: string[]) {
    const dialogoCrearFamilia = this.dialog.open(FormFamiliaComponent, {
      width: '30em',
      data: { familia: familia, create: false, errors: errors },
    });

    dialogoCrearFamilia.afterClosed().subscribe(res => {
      if (res) {
        this.gestronapi.updateFamilia(res as Familia).subscribe((res: GestronRequest) => {
          this.actualizarFamilias.emit("update");
          this.snackBar.open('Se ha modificado la familia ' + res.data.familia?.nombre || '', '', { duration: 3000 })
        }, (error) => {
          this.snackBar.open(error.error.message || '', '', { duration: 5000 })
          this.edit(familia, error.error.errors);
        })
      } else {
        this.snackBar.open('Operación cancelada.', '', { duration: 5000 })
      }
    })
  }

  destroy(familia: Familia) {
    this.gestronapi.destroyFamilia(familia).subscribe((res: GestronRequest) => {
      this.actualizarFamilias.emit("update");
      this.snackBar.open('Se ha eliminado la familia ' + familia?.nombre || '', '', { duration: 3000 })
    }, (error) => {
      this.snackBar.open(error.error.data.mensaje || '', '', { duration: 5000 })
    })
  }

  changeFamilyOfArticle(articleId: string, newFamilyId: number) {
    this.gestronapi.updateFamiliaArticulo(articleId, newFamilyId).subscribe((res: GestronRequest) => {
    }, (err) => {
      this.snackBar.open(err.error.data.mensaje || '', '', { duration: 5000 });
      this.actualizarFamilias;
    })
  }

  ngOnInit(): void {
  }

}
