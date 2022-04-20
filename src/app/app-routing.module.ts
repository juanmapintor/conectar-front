import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { HomeDispositivosComponent } from './components/dispositivos/home-dispositivos/home-dispositivos.component';
import { HomeEstablecimientosComponent } from './components/establecimientos/home-establecimientos/home-establecimientos.component';
import { NuevoEstablecimientoComponent } from './components/establecimientos/nuevo-establecimiento/nuevo-establecimiento.component';
import { VerEstablecimientosComponent } from './components/establecimientos/ver-establecimientos/ver-establecimientos.component';


import { LoginComponent } from './components/login/login.component';
import { HomePersonasComponent } from './components/personas/home-personas/home-personas.component';

const routes: Routes = [
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'login', component: LoginComponent },

  { path: 'establecimientos', component: HomeEstablecimientosComponent },
  { path: 'establecimientos/nuevo', component: NuevoEstablecimientoComponent },
  { path: 'establecimientos/ver', component: VerEstablecimientosComponent },

  { path: 'dispositivos', component: HomeDispositivosComponent },

  { path: 'personas', component: HomePersonasComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
