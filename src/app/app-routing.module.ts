import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashIndexComponent } from './dashboard/dash-index/dash-index.component';
import { LoginIndexComponent } from './login-screen/login-index/login-index.component';
import { AdmindashComponent } from './admin/admindash/admindash.component';
import { CanActivateLogin } from './interfaces/canactivatelogin';
import { CanActivateAdmin } from './interfaces/canactivateadmin';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CentrosComponent } from './admin/centros/centros.component';
import { ArticulosComponent } from './dashboard/articulos/articulos.component';
import { FamiliasComponent } from './dashboard/familias/familias.component';
import { TarifasComponent } from './dashboard/tarifas/tarifas.component';
import { PerfilesComponent } from './dashboard/perfiles/perfiles.component';
import { PosComponent } from './dashboard/pos/pos.component';
import { ClientesComponent } from './dashboard/clientes/clientes.component';

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashIndexComponent, canActivate: [CanActivateLogin] },
  { path: "articulos", component: ArticulosComponent, canActivate: [CanActivateLogin] },
  { path: "familias", component: FamiliasComponent, canActivate: [CanActivateLogin] },
  { path: "tarifas", component: TarifasComponent, canActivate: [CanActivateLogin] },
  { path: "perfiles", component: PerfilesComponent, canActivate: [CanActivateLogin] },
  { path: "pos", component: PosComponent, canActivate: [CanActivateLogin] },
  { path: "clientes", component: ClientesComponent, canActivate: [CanActivateLogin] },
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
