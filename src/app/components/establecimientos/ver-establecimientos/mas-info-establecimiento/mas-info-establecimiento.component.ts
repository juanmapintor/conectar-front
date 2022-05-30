import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, of, shareReplay } from 'rxjs';
import { Domicilio } from 'src/app/models/domicilio';
import { EstablecimientoDetalles } from 'src/app/models/establecimiento';
import { Zona } from 'src/app/models/zona';
import { MasInfoZonaComponent } from '../../zonas/ver-zonas/mas-info-zona/mas-info-zona.component';

@Component({
  selector: 'app-mas-info-establecimiento',
  templateUrl: './mas-info-establecimiento.component.html',
  styleUrls: ['./mas-info-establecimiento.component.scss']
})
export class MasInfoEstablecimientoComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @Input('establecimientoDetalles') establecimientoDetalles!: EstablecimientoDetalles;
  markerOptions: google.maps.MarkerOptions = {
    label: '',
    animation: google.maps.Animation.DROP
  }
  mapOptions: google.maps.MapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    clickableIcons: false,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  mapCenter: google.maps.LatLngLiteral = { lat: -34.6989, lng: -64.7597 };
  center: google.maps.LatLngLiteral = { lat: -34.6989, lng: -64.7597 };

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog
  ) {

  }
  ngOnInit(): void {
    this.center = {
      lat: this.establecimientoDetalles?.domicilio.lat || -34.6989,
      lng: this.establecimientoDetalles?.domicilio.lng || -64.7597
    };

    this.mapCenter = {
      lat: this.establecimientoDetalles?.domicilio.lat || -34.6989,
      lng: this.establecimientoDetalles?.domicilio.lng || -64.7597
    };

    this.markerOptions.label = this.establecimientoDetalles?.nombre || 'Vacio...';
  }

  public mostrarMasInfoZona(zona: Zona) {
    let dialogInfo = this.dialog.open(MasInfoZonaComponent,{
      data: {
        isDialog: true
      }
    });
    dialogInfo.componentInstance.zonaDetalles = zona;
  }


  getDomicilioString(domicilio: Domicilio) {
    return `${domicilio.calle} ${domicilio.cardinalidad ? `(${domicilio.cardinalidad})` : ''} ${domicilio.numero || 'S/N'}; ${domicilio.provincia}, ${domicilio.departamento}, ${domicilio.localidad}; ${domicilio.barrio ? `Barrio: ${domicilio.barrio}` : ''}; Cod. Postal: ${domicilio.cod_postal}; ${domicilio.observacion || 'Sin Observaciones.'}`;
  }

}
