import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmindashComponent } from './admindash/admindash.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TablaUsuariosComponent } from './components/tabla-usuarios/tabla-usuarios.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';



@NgModule({
  declarations: [
    AdmindashComponent,
    TablaUsuariosComponent,
    EditUserComponent
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
