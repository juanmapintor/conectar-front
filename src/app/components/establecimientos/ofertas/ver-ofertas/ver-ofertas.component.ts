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

  currentPage = 1;

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
  ) { }

  ngAfterViewInit(): void {
    this.loadOfertas(this.currentPage);
    this.paginator.page.subscribe({
      next: (nextPage: any) => {
        this.currentPage = nextPage.pageIndex + 1;
        this.loadOfertas(this.currentPage);
      }
    });
  }

  private configOferta() {
    if (this.ofertasPage) this.ofertas = this.ofertasPage.data;
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
      this.currentPage = page;
      this.ofertasPage = await this._ofertaService.index(this.currentPage);
      this.configOferta();
      if (!this.ofertasPage) this.emptyTable = true;
      if (this.ofertasPage) this.configPaginator();
      this.loading = false;
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error :(',
        text: error.message
      }).then(() => {
        this.currentPage = page;
        this.loadOfertas(this.currentPage);
      });
    }
  }

  public eliminarOferta(idOferta: number) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar la oferta?',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Cancelar',
      denyButtonText: 'Eliminar'
    }).then(async (result) => {
      if (result.isDenied) {
        Swal.fire({
          title: 'Eliminando oferta...'
        });
        Swal.showLoading();
        try {
          let eliminado = await this._ofertaService.destroy(idOferta);
          Swal.hideLoading();
          if (!eliminado) {
            Swal.fire({
              icon: 'error',
              title: 'Error :(',
              text: 'No se pudo eliminar la oferta seleccionada porque ya no existe'
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'La oferta se elimino exitosamente.',
              showConfirmButton: false,
              timer: 1500
            });
            if (this.dataSourceOfertas.data.length == 1) {
              this.loadOfertas(this.currentPage - 1);
            } else {
              this.loadOfertas(this.currentPage);
            }
          }
        } catch (response: any) {
          if (response.error.code == "23000") {
            Swal.fire({
              icon: 'error',
              title: 'Error :(',
              html: 'No se pudo eliminar la oferta seleccionada porque hay establecimientos relacionados. <br> Elimine todos los establecimientos que utilicen la oferta e intente nuevamente.'
            });
          }
        }
      }
    });
  }
}