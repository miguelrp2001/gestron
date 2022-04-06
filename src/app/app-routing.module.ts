import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashIndexComponent } from './dashboard/dash-index/dash-index.component';
import { LoginIndexComponent } from './login-screen/login-index/login-index.component';

const routes: Routes = [
  { path: "", component: DashIndexComponent },
  { path: "login", component: LoginIndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
