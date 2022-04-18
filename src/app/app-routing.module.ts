import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';

import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'bienvenida', component: BienvenidaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'establecimientos', component: LoginComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
