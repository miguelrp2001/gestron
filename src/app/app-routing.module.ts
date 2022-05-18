import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashIndexComponent } from './dashboard/dash-index/dash-index.component';
import { LoginIndexComponent } from './login-screen/login-index/login-index.component';
import { AdmindashComponent } from './admin/admindash/admindash.component';
import { CanActivateLogin } from './interfaces/canactivatelogin';
import { CanActivateAdmin } from './interfaces/canactivateadmin';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CentrosComponent } from './admin/centros/centros.component';

const routes: Routes = [
  { path: "", component: DashIndexComponent, canActivate: [CanActivateLogin] },
  {
    path: "admin", component: DashboardComponent, canActivate: [CanActivateLogin, CanActivateAdmin], children: [
      { path: "", component: AdmindashComponent },
      { path: "users", component: AdmindashComponent },
      { path: "centros", component: CentrosComponent }
    ]
  },
  { path: "login", component: LoginIndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateLogin, CanActivateAdmin]
})
export class AppRoutingModule { }
