import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackwimageComponent } from './backwimage/backwimage.component';
import { ConnectionErrorComponent } from './connection-error/connection-error.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialModule } from '../material/material.module';
import { VerificarCuentaComponent } from './verificar-cuenta/verificar-cuenta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SinCentrosComponent } from './sin-centros/sin-centros.component';



@NgModule({
  declarations: [
    BackwimageComponent,
    ConnectionErrorComponent,
    LoadingDialogComponent,
    VerificarCuentaComponent,
    SinCentrosComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BackwimageComponent
  ]
})
export class SharedModule { }
