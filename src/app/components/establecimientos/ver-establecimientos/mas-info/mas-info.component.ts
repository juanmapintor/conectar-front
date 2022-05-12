import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { map, Observable, of, shareReplay } from 'rxjs';
import { Domicilio } from 'src/app/models/domicilio';
import { EstablecimientoDetalles } from 'src/app/models/establecimiento';

@Component({
  selector: 'app-mas-info',
  templateUrl: './mas-info.component.html',
  styleUrls: ['./mas-info.component.scss']
})
export class MasInfoComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @Input('establecimientoDetalles') establecimientoDetalles!: EstablecimientoDetalles;
  center: google.maps.LatLngLiteral = {
    lat: -34.6989,
    lng: -64.7597
  }
  marker = {
    position: {
      lat: -34.6989,
      lng: -64.7597,
    },
    label: {
      color: 'red',
      text: 'Establecimiento',
    },
    title: 'Nombre...',
    options: { animation: google.maps.Animation.BOUNCE },
  }
  
  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
   
  }
  ngOnInit(): void { 
    this.center = {
      lat: this.establecimientoDetalles?.domicilio.lat || -34.6989,
      lng: this.establecimientoDetalles?.domicilio.lng || -64.7597
    };

    this.marker.position = {
      lat: this.establecimientoDetalles?.domicilio.lat || -34.6989,
      lng: this.establecimientoDetalles?.domicilio.lng || -64.7597
    };

    this.marker.title = this.establecimientoDetalles?.nombre || 'Vacio...';
    this.marker.label.text = this.establecimientoDetalles?.nombre || 'Vacio...';
  }


  getDomicilioString(domicilio: Domicilio) {
    return `${domicilio.calle} ${domicilio.cardinalidad ? `(${domicilio.cardinalidad})` : ''} ${domicilio.numero || 'S/N'}; ${domicilio.provincia}, ${domicilio.departamento}, ${domicilio.localidad}; ${domicilio.barrio ? `Barrio: ${domicilio.barrio}` : ''}; Cod. Postal: ${domicilio.cod_postal}; ${domicilio.observacion || 'Sin Observaciones.'}`;
  }

}
