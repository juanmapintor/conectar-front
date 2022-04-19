import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { BarraNavegacionComponent } from './components/barra-navegacion/barra-navegacion.component';
import { LoginComponent } from './components/login/login.component';

import { authInterceptorProviders } from './services/helpers/auth.interceptor';
import { HomeEstablecimientosComponent } from './components/establecimientos/home-establecimientos/home-establecimientos.component';
import { NuevoEstablecimientoComponent } from './components/establecimientos/nuevo-establecimiento/nuevo-establecimiento.component';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    BarraNavegacionComponent,
    LoginComponent,
    HomeEstablecimientosComponent,
    NuevoEstablecimientoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    MatTableModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
