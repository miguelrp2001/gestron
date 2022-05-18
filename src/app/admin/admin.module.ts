import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmindashComponent } from './admindash/admindash.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TablaUsuariosComponent } from './components/tabla-usuarios/tabla-usuarios.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CentrosComponent } from './centros/centros.component';
import { TablaCentrosComponent } from './components/tabla-centros/tabla-centros.component';
import { EditCentroComponent } from './components/edit-centro/edit-centro.component';
import { AddUserCentroComponent } from './components/add-user-centro/add-user-centro.component';



@NgModule({
  declarations: [
    AdmindashComponent,
    TablaUsuariosComponent,
    EditUserComponent,
    DashboardComponent,
    CentrosComponent,
    TablaCentrosComponent,
    EditCentroComponent,
    AddUserCentroComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
