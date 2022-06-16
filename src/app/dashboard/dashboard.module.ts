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
import { FormPerfilComponent } from './components/form-perfil/form-perfil.component';
import { TablaPerfilesComponent } from './components/tabla-perfiles/tabla-perfiles.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { AddArticulosTarifaComponent } from './components/add-articulos-tarifa/add-articulos-tarifa.component';
import { EditPrecioComponent } from './components/edit-precio/edit-precio.component';
import { EditTarifaComponent } from './components/edit-tarifa/edit-tarifa.component';
import { PosComponent } from './pos/pos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';
import { TablaPosComponent } from './components/tabla-pos/tabla-pos.component';
import { FormPosComponent } from './components/form-pos/form-pos.component';



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
    FormPerfilComponent,
    TablaPerfilesComponent,
    PerfilesComponent,
    AddArticulosTarifaComponent,
    EditPrecioComponent,
    EditTarifaComponent,
    PosComponent,
    ClientesComponent,
    FormClientesComponent,
    TablaPosComponent,
    FormPosComponent,
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
