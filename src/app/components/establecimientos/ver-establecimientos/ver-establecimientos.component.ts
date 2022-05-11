import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { EstablecimientoService } from 'src/app/services/establecimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-establecimientos',
  templateUrl: './ver-establecimientos.component.html',
  styleUrls: ['./ver-establecimientos.component.scss'],
})
export class VerEstablecimientosComponent implements AfterViewInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  loading = true;

  establecimientosDefault: any[] = [
    {
      cue: 'XXXXXXXXX',
      nombre: 'Nombre...',
      mail: 'mail@mail...'
    },
    {
      cue: 'XXXXXXXXX',
      nombre: 'Nombre...',
      mail: 'mail@mail...'
    },
    {
      cue: 'XXXXXXXXX',
      nombre: 'Nombre...',
      mail: 'mail@mail...'
    },
    {
      cue: 'XXXXXXXXX',
      nombre: 'Nombre...',
      mail: 'mail@mail...'
    },
    {
      cue: 'XXXXXXXXX',
      nombre: 'Nombre...',
      mail: 'mail@mail...'
    }
  ];
  establecimientos: any[] = [];
  establecimientosPage: any;
  dataSourceEstablecimientos = new MatTableDataSource<any>(this.establecimientosDefault);
  displayedColumnsEstablecimientos: string[] = [
    'cue',
    'nombre',
    'mail',
    'acciones'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _establecimientoService: EstablecimientoService
  ) { }

  ngAfterViewInit(): void {
    this.loadEstablecimientos(1);
    this.paginator.page.subscribe({
      next: (nextPage: any) => {
        this.loadEstablecimientos(nextPage.pageIndex + 1);
      }
    });
  }

  private configEstablecimiento() {
    this.establecimientos = this.establecimientosPage.data;
    this.dataSourceEstablecimientos.data = this.establecimientos;
  }
  private configPaginator() {
    this.paginator.length = this.establecimientosPage.total;
    this.paginator.pageSize = this.establecimientosPage.per_page;
    this.paginator.pageIndex = this.establecimientosPage.current_page - 1;
  }

  private async loadEstablecimientos(page: number) {
    this.establecimientos = [];
    this.loading = true;
    try {
      this.establecimientosPage = await this._establecimientoService.index(page);
      this.configEstablecimiento();
      this.configPaginator();
      this.loading = false;
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error :(',
        text: error.message
      }).then(() => {
        this.loadEstablecimientos(page);
      });
    }
  }
}
