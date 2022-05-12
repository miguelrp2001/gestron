import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashIndexComponent } from './dashboard/dash-index/dash-index.component';
import { LoginIndexComponent } from './login-screen/login-index/login-index.component';
import { AdmindashComponent } from './admin/admindash/admindash.component';
import { CanActivateLogin } from './interfaces/canactivatelogin';
import { CanActivateAdmin } from './interfaces/canactivateadmin';

const routes: Routes = [
  { path: "", component: DashIndexComponent, canActivate: [CanActivateLogin] },
  { path: "admin", component: AdmindashComponent, canActivate: [CanActivateLogin, CanActivateAdmin] },
  { path: "login", component: LoginIndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateLogin, CanActivateAdmin]
})
export class AppRoutingModule { }
