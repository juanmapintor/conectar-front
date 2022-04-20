import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, shareReplay } from 'rxjs';
import { OfertaService } from 'src/app/services/oferta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-ofertas',
  templateUrl: './ver-ofertas.component.html',
  styleUrls: ['./ver-ofertas.component.scss'],
})
export class VerOfertasComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  loading = true;

  ofertas: any[] = [];
  dataSourceOfertas = new MatTableDataSource<any>();
  displayedColumnsOfertas: string[] = [
    'oferta',
    'acciones'
  ];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _ofertaService: OfertaService
  ) {}

  ngOnInit(): void {
    this.loadOfertas();
  }

  private async loadOfertas() {
    this.ofertas = [];
    this.loading = true;
    try {
      this.ofertas = await this._ofertaService.index();
      this.dataSourceOfertas.data = this.ofertas;
      this.loading = false;
    } catch(error: any){
      Swal.fire({
        icon: 'error',
        title: 'Error :(',
        text: error.message
      }).then(() => {
        this.loadOfertas();
      });
    }
  }
}