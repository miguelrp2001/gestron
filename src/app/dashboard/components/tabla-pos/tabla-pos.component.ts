import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { PuntoVenta } from '../../../interfaces/user';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { GestronbackendService } from '../../../services/gestronbackend.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tabla-pos',
  templateUrl: './tabla-pos.component.html',
  styleUrls: ['./tabla-pos.component.css']
})
export class TablaPosComponent implements OnInit {


  @Input() puntosventa: PuntoVenta[] = [];

  @Output() actualizarPOS = new EventEmitter<string>();

  constructor(private breakpointObserver: BreakpointObserver, private apibackend: GestronbackendService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log(this.puntosventa);
  }

  updateStatus(slider: any) {
    // slider = slider.source;
    // slider.disabled = true;
    // this.apibackend.chngStatusPerfil(Number.parseInt(slider.id), slider.checked).subscribe((res: GestronRequest) => {
    //   slider.checked = (res.data.mensaje as unknown) as boolean
    //   slider.disabled = false;
    //   let snackBarRef = this.snackBar.open("El perfil ahora está " + (slider.checked ? "activado." : "desactivado."), '', { duration: 5000 });
    // }, (err) => {
    //   let snackBarRef = this.snackBar.open("No se ha podido cambiar el estado.", '', { duration: 5000 });
    //   slider.checked = !slider.checked;
    //   slider.disabled = false;
    // })
  }

  editarPos(pos: PuntoVenta, errors?: string[]) {

  }

  copiado() {
    this.snackBar.open("Token copiado al portapapeles", '', { duration: 3000 });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}
