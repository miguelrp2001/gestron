import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginIndexComponent } from './login-index/login-index.component';
import { MaterialModule } from '../material/material.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';



@NgModule({
  declarations: [
    LoginIndexComponent,
    RegisterFormComponent
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
export class LoginScreenModule { }
