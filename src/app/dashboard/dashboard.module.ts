import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashIndexComponent } from './dash-index/dash-index.component';
import { ArticulosComponent } from './articulos/articulos.component';



@NgModule({
  declarations: [
    DashIndexComponent,
    ArticulosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
