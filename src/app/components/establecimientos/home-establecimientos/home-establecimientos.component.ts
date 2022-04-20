import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, shareReplay } from 'rxjs';
import { NuevaOfertaComponent } from '../ofertas/nueva-oferta/nueva-oferta.component';
import { VerOfertasComponent } from '../ofertas/ver-ofertas/ver-ofertas.component';
import { NuevaZonaComponent } from '../zonas/nueva-zona/nueva-zona.component';
import { VerZonasComponent } from '../zonas/ver-zonas/ver-zonas.component';
import { fadeInAnimation } from 'src/app/animations/animations';
@Component({
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
  selector: 'app-home-establecimientos',
  templateUrl: './home-establecimientos.component.html',
  styleUrls: ['./home-establecimientos.component.scss'],
})
export class HomeEstablecimientosComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  nuevaZona() {
    const dialogRef = this.dialog.open(NuevaZonaComponent);
  }
  verZonas() {
    const dialogRef = this.dialog.open(VerZonasComponent, {
      minWidth: '50%',
      minHeight: '50%',
    });
  }
  nuevaOferta() {
    const dialogRef = this.dialog.open(NuevaOfertaComponent);
  }
  verOfertas() {
    const dialogRef = this.dialog.open(VerOfertasComponent, {
      minWidth: '50%',
      minHeight: '50%',
    });
  }
}
