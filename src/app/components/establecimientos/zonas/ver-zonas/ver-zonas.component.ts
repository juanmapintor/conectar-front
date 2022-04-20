import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, shareReplay } from 'rxjs';
import { ZonaService } from 'src/app/services/zona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-zonas',
  templateUrl: './ver-zonas.component.html',
  styleUrls: ['./ver-zonas.component.scss'],
})
export class VerZonasComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  loading = true;

  zonas: any[] = [];
  dataSourceZonas = new MatTableDataSource<any>();
  displayedColumnsZonas: string[] = [
    'zona',
    'supervisor',
    'mail',
    'telefono',
    'acciones'
  ];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _zonaService: ZonaService
  ) {}

  ngOnInit(): void {
    this.loadZonas();
  }

  private async loadZonas() {
    this.zonas = [];
    this.loading = true;
    try {
      this.zonas = await this._zonaService.index();
      this.dataSourceZonas.data = this.zonas;
      this.loading = false;
    } catch(error: any){
      Swal.fire({
        icon: 'error',
        title: 'Error :(',
        text: error.message
      }).then(() => {
        this.loadZonas();
      });
    }
  }
}