import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, shareReplay } from 'rxjs';
import { Oferta } from 'src/app/models/oferta';
import { Page } from 'src/app/models/page';
import { OfertaService } from 'src/app/services/oferta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-ofertas',
  templateUrl: './ver-ofertas.component.html',
  styleUrls: ['./ver-ofertas.component.scss'],
})
export class VerOfertasComponent implements AfterViewInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  loading = true;
  emptyTable = false;

  ofertasDefault: Oferta[] = [
    new Oferta(0, "Oferta..."),
    new Oferta(0, "Oferta..."),
    new Oferta(0, "Oferta..."),
    new Oferta(0, "Oferta..."),
    new Oferta(0, "Oferta..."),
  ]
  ofertas: any[] = [];
  ofertasPage!: Page<Oferta>;
  ofertaDetalles!: Oferta;

  dataSourceOfertas = new MatTableDataSource<any>(this.ofertasDefault);
  displayedColumnsOfertas: string[] = [
    'oferta',
    'acciones'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _ofertaService: OfertaService
  ) {}

  ngAfterViewInit(): void {
    this.loadOfertas(1);
    this.paginator.page.subscribe({
      next: (nextPage: any) => {
        this.loadOfertas(nextPage.pageIndex + 1);
      }
    });
  }

  private configOferta() {
    if(this.ofertasPage) this.ofertas = this.ofertasPage.data;
    this.dataSourceOfertas.data = this.ofertas;
  }
  private configPaginator() {
    this.paginator.length = this.ofertasPage.total;
    this.paginator.pageSize = this.ofertasPage.per_page;
    this.paginator.pageIndex = this.ofertasPage.current_page - 1;
  }

  private async loadOfertas(page: number) {
    this.ofertas = [];
    this.loading = true;
    try {
      this.ofertasPage = await this._ofertaService.index(page);
      this.configOferta();
      if(!this.ofertasPage) this.emptyTable = true;
      if(this.ofertasPage) this.configPaginator();
      this.loading = false;
    } catch(error: any){
      Swal.fire({
        icon: 'error',
        title: 'Error :(',
        text: error.message
      }).then(() => {
        this.loadOfertas(page);
      });
    }
  }
}