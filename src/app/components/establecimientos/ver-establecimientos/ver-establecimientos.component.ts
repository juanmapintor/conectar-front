import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { Domicilio } from 'src/app/models/domicilio';
import { EstablecimientoDetalles, EstablecimientoLista } from 'src/app/models/establecimiento';
import { Page } from 'src/app/models/page';
import { EstablecimientoService } from 'src/app/services/establecimiento.service';
import { GLOBAL } from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-establecimientos',
  templateUrl: './ver-establecimientos.component.html',
  styleUrls: ['./ver-establecimientos.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*', minHeight: '200px' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VerEstablecimientosComponent implements AfterViewInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

 

  loading = true;
  loadingEstablecimientos: boolean[] = [];

  establecimientosDefault = [
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
  establecimientos: EstablecimientoLista[] = [];
  establecimientosPage!: Page<EstablecimientoLista>;
  establecimientoDetalles!: EstablecimientoDetalles;

  indiceExpandido = -1;

  dataSourceEstablecimientos = new MatTableDataSource<any>(this.establecimientosDefault);
  displayedColumnsEstablecimientosFull: string[] = [
    'cue',
    'nombre',
    'mail',
    'acciones'
  ];
  displayedColumnsEstablecimientosHandset: string[] = [
    'nombre',
    'acciones'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _establecimientoService: EstablecimientoService
  ) {
    
  }

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
  private configTabla() {
    this.indiceExpandido = -1;
    this.loadingEstablecimientos = new Array(this.establecimientos.length).fill(false);
  }
  public async expandirRow(index: number, establecimiento: any) {
    this.loadingEstablecimientos[index] = true;
    this.indiceExpandido = this.indiceExpandido == index ? -1 : index;
    try {
      this.establecimientoDetalles = await this._establecimientoService.show(establecimiento.establecimientoID);
      this.loadingEstablecimientos[index] = false;
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error :(',
        html: 'No se pudo cargar el establecimiento seleccionado <br>' + error.message
      }).then(() => {
        this.indiceExpandido = -1;
      });
    }
  }
  private async loadEstablecimientos(page: number) {
    this.establecimientos = [];
    this.loading = true;
    try {
      this.establecimientosPage = await this._establecimientoService.index(page);
      this.configEstablecimiento();
      this.configPaginator();
      this.configTabla();
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
