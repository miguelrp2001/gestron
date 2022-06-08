import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashIndexComponent } from './dash-index/dash-index.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { MaterialModule } from '../material/material.module';
import { TablaArticulosComponent } from './components/tabla-articulos/tabla-articulos.component';
import { FormArticuloComponent } from './components/form-articulo/form-articulo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FamiliasComponent } from './familias/familias.component';
import { TablaFamiliasComponent } from './components/tabla-familias/tabla-familias.component';
import { FormFamiliaComponent } from './components/form-familia/form-familia.component';



@NgModule({
  declarations: [
    DashIndexComponent,
    ArticulosComponent,
    TablaArticulosComponent,
    FormArticuloComponent,
    FamiliasComponent,
    TablaFamiliasComponent,
    FormFamiliaComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
