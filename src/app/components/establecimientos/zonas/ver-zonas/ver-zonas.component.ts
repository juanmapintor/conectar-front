import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, shareReplay } from 'rxjs';
import { Page } from 'src/app/models/page';
import { Zona } from 'src/app/models/zona';
import { ZonaService } from 'src/app/services/zona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-zonas',
  templateUrl: './ver-zonas.component.html',
  styleUrls: ['./ver-zonas.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*', minHeight: '200px' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VerZonasComponent implements AfterViewInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  loading = true;
  emptyTable = false;

  zonasDefault: Zona[] = [
    new Zona(0, "Zona...", "Apellido...", "Nombre...", "mail@mail...", "+549..."),
    new Zona(0, "Zona...", "Apellido...", "Nombre...", "mail@mail...", "+549..."),
    new Zona(0, "Zona...", "Apellido...", "Nombre...", "mail@mail...", "+549..."),
    new Zona(0, "Zona...", "Apellido...", "Nombre...", "mail@mail...", "+549..."),
    new Zona(0, "Zona...", "Apellido...", "Nombre...", "mail@mail...", "+549...")
  ];
  zonas: Zona[] = [];
  zonasPage!: Page<Zona>;
  zonaDetalles!: Zona;

  indiceExpandido = -1;

  dataSourceZonas = new MatTableDataSource<any>(this.zonasDefault);
  displayedColumnsZonasFull: string[] = [
    'zona',
    'supervisor',
    'mail',
    'telefono',
    'acciones'
  ];
  displayedColumnsZonasHandset: string[] = [
    'zona',
    'acciones'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _zonaService: ZonaService
  ) {}

  ngAfterViewInit(): void {
    this.loadZonas(1);
    this.paginator.page.subscribe({
      next: (nextPage: any) => {
        this.loadZonas(nextPage.pageIndex + 1);
      }
    });
  }

  private configZona() {
    if(this.zonasPage) this.zonas = this.zonasPage.data;
    this.dataSourceZonas.data = this.zonas;
  }
  private configPaginator() {
    this.paginator.length = this.zonasPage.total;
    this.paginator.pageSize = this.zonasPage.per_page;
    this.paginator.pageIndex = this.zonasPage.current_page - 1;
  }
  private configTabla() {
    this.indiceExpandido = -1;
  }
  public async expandirRow(index: number, element: Zona) {
    this.indiceExpandido = this.indiceExpandido == index ? -1 : index;
    this.zonaDetalles = element;
    console.log("En ver", this.zonaDetalles);
  }

  private async loadZonas(page: number) {
    this.zonas = [];
    this.loading = true;
    try {
      this.zonasPage = await this._zonaService.index(page);
      this.configZona();
      if(!this.zonasPage) this.emptyTable = true;
      if(this.zonasPage) this.configPaginator();
      this.configTabla();
      this.loading = false;
    } catch(error: any){
      Swal.fire({
        icon: 'error',
        title: 'Error :(',
        text: error.message
      }).then(() => {
        this.loadZonas(page);
      });
    }
  }
}