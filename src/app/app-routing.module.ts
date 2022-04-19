import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { HomeEstablecimientosComponent } from './components/establecimientos/home-establecimientos/home-establecimientos.component';
import { NuevoEstablecimientoComponent } from './components/establecimientos/nuevo-establecimiento/nuevo-establecimiento.component';


import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'establecimientos', component: HomeEstablecimientosComponent },
  { path: 'establecimientos/nuevo', component: NuevoEstablecimientoComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
