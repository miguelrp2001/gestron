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
import { TarifasComponent } from './tarifas/tarifas.component';
import { TablaTarifasComponent } from './components/tabla-tarifas/tabla-tarifas.component';
import { FormTarifaComponent } from './components/form-tarifa/form-tarifa.component';
import { FormPerfilComponent } from './components/form-perfil/form-perfil.component';
import { TablaPerfilesComponent } from './components/tabla-perfiles/tabla-perfiles.component';
import { PerfilesComponent } from './perfiles/perfiles.component';



@NgModule({
  declarations: [
    DashIndexComponent,
    ArticulosComponent,
    TablaArticulosComponent,
    FormArticuloComponent,
    FamiliasComponent,
    TablaFamiliasComponent,
    FormFamiliaComponent,
    TarifasComponent,
    TablaTarifasComponent,
    FormTarifaComponent,
    FormPerfilComponent,
    TablaPerfilesComponent,
    PerfilesComponent,
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
