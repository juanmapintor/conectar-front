import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, shareReplay } from 'rxjs';
import { NuevaOfertaComponent } from '../ofertas/nueva-oferta/nueva-oferta.component';
import { NuevaZonaComponent } from '../zonas/nueva-zona/nueva-zona.component';

@Component({
  selector: 'app-home-establecimientos',
  templateUrl: './home-establecimientos.component.html',
  styleUrls: ['./home-establecimientos.component.scss']
})
export class HomeEstablecimientosComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(
    map((result) => result.matches),
    shareReplay()
  );
  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  nuevaZona(){
    const dialogRef = this.dialog.open(NuevaZonaComponent);
  }
  nuevaOferta(){
    const dialogRef = this.dialog.open(NuevaOfertaComponent);
  }
}
