import { NgModule } from '@angular/core'; import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { GoogleMapsModule } from '@angular/google-maps';

import { AppComponent } from './app.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { BarraNavegacionComponent } from './components/barra-navegacion/barra-navegacion.component';
import { LoginComponent } from './components/login/login.component';

import { authInterceptorProviders } from './services/helpers/auth.interceptor';
import { HomeEstablecimientosComponent } from './components/establecimientos/home-establecimientos/home-establecimientos.component';
import { NuevoEstablecimientoComponent } from './components/establecimientos/nuevo-establecimiento/nuevo-establecimiento.component';
import { NuevaZonaComponent } from './components/establecimientos/zonas/nueva-zona/nueva-zona.component';
import { VerZonasComponent } from './components/establecimientos/zonas/ver-zonas/ver-zonas.component';
import { NuevaOfertaComponent } from './components/establecimientos/ofertas/nueva-oferta/nueva-oferta.component';
import { VerOfertasComponent } from './components/establecimientos/ofertas/ver-ofertas/ver-ofertas.component';
import { VerEstablecimientosComponent } from './components/establecimientos/ver-establecimientos/ver-establecimientos.component';
import { HomeDispositivosComponent } from './components/dispositivos/home-dispositivos/home-dispositivos.component';
import { NuevoDispositivoComponent } from './components/dispositivos/nuevo-dispositivo/nuevo-dispositivo.component';
import { VerDispositivosComponent } from './components/dispositivos/ver-dispositivos/ver-dispositivos.component';
import { HomePersonasComponent } from './components/personas/home-personas/home-personas.component';
import { SvgImgComponent } from './components/helpers/svg-img/svg-img.component';
import { NuevoResponsableComponent } from './components/personas/responsables/nuevo-responsable/nuevo-responsable.component';
import { MasInfoEstablecimientoComponent } from './components/establecimientos/ver-establecimientos/mas-info-establecimiento/mas-info-establecimiento.component';
import { MasInfoZonaComponent } from './components/establecimientos/zonas/ver-zonas/mas-info-zona/mas-info-zona.component';
import { EditarEstablecimientoComponent } from './components/establecimientos/editar-establecimiento/editar-establecimientos.component';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    BarraNavegacionComponent,
    LoginComponent,
    HomeEstablecimientosComponent,
    NuevoEstablecimientoComponent,
    NuevaZonaComponent,
    VerZonasComponent,
    NuevaOfertaComponent,
    VerOfertasComponent,
    VerEstablecimientosComponent,
    HomeDispositivosComponent,
    NuevoDispositivoComponent,
    VerDispositivosComponent,
    HomePersonasComponent,
    SvgImgComponent,
    NuevoResponsableComponent,
    MasInfoEstablecimientoComponent,
    MasInfoZonaComponent,
    EditarEstablecimientoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTooltipModule,
    GoogleMapsModule
  ],
  providers: [authInterceptorProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
