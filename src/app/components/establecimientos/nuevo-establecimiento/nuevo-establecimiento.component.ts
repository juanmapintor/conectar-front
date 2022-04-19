import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Zona } from 'src/app/models/zona';
import { ZonaService } from 'src/app/services/zona.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Oferta } from 'src/app/models/oferta';
import { OfertaService } from 'src/app/services/oferta.service';
import { Telefono } from 'src/app/models/telefono';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';


@Component({
  selector: 'app-nuevo-establecimiento',
  templateUrl: './nuevo-establecimiento.component.html',
  styleUrls: ['./nuevo-establecimiento.component.scss'],
})
export class NuevoEstablecimientoComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  loading = true;

  zonas: Zona[] = [];
  ofertas: Oferta[] = [];

  provincias: any[] = [];
  provinciaSelected: any = null;

  departamentos: any[] = [];
  departamentoSelected: any = null;

  localidades: any[] = [];
  localidadSelected: any = null;

  telefonoInput = new FormControl('', [Validators.required]);
  tipoTelefonoSelect = 'fijo';
  telefonos: Telefono[] = [];
  dataSourceTelefonos = new MatTableDataSource<Telefono>();
  displayedColumnsTelefonos: string[] = [
    'orden',
    'telefono',
    'tipo',
    'acciones',
  ];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _zonaService: ZonaService,
    private _ofertaService: OfertaService,
    private _ubicacionesService: UbicacionesService,
    private _router: Router
  ) {
    this.provincias = this._ubicacionesService.provincias();
  }

  ngOnInit(): void {
    this.load();
  }

  private async load() {
    await this.loadZonas();
    await this.loadOfertas();
    this.loading = false;
  }

  private async loadZonas() {
    try {
      this.zonas = await this._zonaService.index();
    } catch (error: any) {
      if (error.status == 404)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html: 'No hay zonas para mostrar! <br> Agregue zonas y vuelva a intentarlo.',
          allowOutsideClick: false,
          allowEnterKey: false,
          allowEscapeKey: false,
          showCancelButton: true,
          cancelButtonText: 'Aceptar',
          showCloseButton: false,
          showConfirmButton: false,
        }).then(() => this._router.navigate(['establecimientos']));
    }
  }
  private async loadOfertas() {
    try {
      this.ofertas = await this._ofertaService.index();
    } catch (error: any) {
      if (error.status == 404)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html: 'No hay ofertas para mostrar! <br> Agregue ofertas y vuelva a intentarlo.',
          allowOutsideClick: false,
          allowEnterKey: false,
          allowEscapeKey: false,
          showCancelButton: true,
          cancelButtonText: 'Aceptar',
          showCloseButton: false,
          showConfirmButton: false,
        }).then(() => this._router.navigate(['establecimientos']));
    }
  }

  agregarTelefono() {
    let telefono = {
      telefono: this.telefonoInput.value,
      tipo: this.tipoTelefonoSelect,
    };
    this.telefonos.push(telefono);
    this.dataSourceTelefonos.data = this.telefonos;
    this.tipoTelefonoSelect = 'fijo';
    this.telefonoInput.reset();
  }

  eliminarTelefono(index: number) {
    this.telefonos.splice(index, 1);
    this.dataSourceTelefonos.data = this.telefonos;
  }

  setearDepartamentos(){
    this.departamentos = this._ubicacionesService.departamentos(this.provinciaSelected.id);
  }

  setearLocalidades(){
    this.localidades = this._ubicacionesService.localidades(this.departamentoSelected.id);
  }
}
