import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, shareReplay } from 'rxjs';
import { EstablecimientoService } from 'src/app/services/establecimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-establecimientos',
  templateUrl: './ver-establecimientos.component.html',
  styleUrls: ['./ver-establecimientos.component.scss'],
})
export class VerEstablecimientosComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  loading = true;

  establecimientos: any[] = [];
  dataSourceEstablecimientos = new MatTableDataSource<any>();
  displayedColumnsEstablecimientos: string[] = [
    'cue',
    'nombre',
    'matricula',
    'mail',
    'horario',
    'acciones'
  ];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _establecimientoService: EstablecimientoService
  ) {}

  ngOnInit(): void {
    this.loadEstablecimientos();
  }

  private async loadEstablecimientos() {
    this.establecimientos = [];
    this.loading = true;
    try {
      this.establecimientos = await this._establecimientoService.index();
      this.dataSourceEstablecimientos.data = this.establecimientos;
      this.loading = false;
    } catch(error: any){
      Swal.fire({
        icon: 'error',
        title: 'Error :(',
        text: error.message
      }).then(() => {
        this.loadEstablecimientos();
      });
    }
  }
}
