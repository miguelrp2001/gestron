import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackwimageComponent } from './backwimage/backwimage.component';
import { ConnectionErrorComponent } from './connection-error/connection-error.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    BackwimageComponent,
    ConnectionErrorComponent,
    LoadingDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MaterialModule
  ],
  exports: [
    BackwimageComponent
  ]
})
export class SharedModule { }
