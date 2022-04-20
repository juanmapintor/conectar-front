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
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { EstablecimientoService } from 'src/app/services/establecimiento.service';

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
  uploading = false;

  zonas: Zona[] = [];
  ofertas: Oferta[] = [];

  provincias: any[] = [];
  departamentos: any[] = [];
  localidades: any[] = [];

  telefonoInput = new FormControl('');
  tipoTelefonoSelect = 'fijo';
  telefonos: Telefono[] = [];
  dataSourceTelefonos = new MatTableDataSource<Telefono>();
  displayedColumnsTelefonos: string[] = [
    //'orden',
    'telefono',
    'tipo',
    'acciones',
  ];

  nuevoEstablecimientoForm: FormGroup;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _zonaService: ZonaService,
    private _ofertaService: OfertaService,
    private _ubicacionesService: UbicacionesService,
    private _establecimientoService: EstablecimientoService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.provincias = this._ubicacionesService.provincias();
    this.nuevoEstablecimientoForm = this._formBuilder.group({
      //Datos correspondientes a Establecimiento
      cue: new FormControl('', [Validators.required]), //
      nombre: new FormControl('', [Validators.required]), //
      sectorID: new FormControl('', [Validators.required]), //
      modalidadID: new FormControl('', [Validators.required]), //
      ambitoID: new FormControl('', [Validators.required]), //
      nivelID: new FormControl('', [Validators.required]), //
      zonaID: new FormControl('', [Validators.required]), //
      matricula: new FormControl('', [Validators.min(1)]), //
      mail: new FormControl('', [Validators.email]), //
      horario_desde: new FormControl(''), //
      horario_hasta: new FormControl(''), //

      //Datos correspondientes a Domicilio
      provincia: new FormControl('', [Validators.required]), //
      departamento: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]), //
      localidad: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]), //
      cod_postal: new FormControl('', [Validators.required]), //
      calle: new FormControl('', [Validators.required]), //
      barrio: new FormControl(''), //
      numero: new FormControl(''), //
      cardinalidad: new FormControl(''), //
      observacion: new FormControl(''), //

      //Ofertas y Turnos
      ofertas: new FormControl('', [Validators.required]), //
      turnos: new FormControl('', [Validators.required]), //
    });
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
    this.zonas = [];
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
    this.ofertas = [];
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

  setearDepartamentos() {
    this.departamentos = this._ubicacionesService.departamentos(
      this.nuevoEstablecimientoForm.get('provincia')?.value.id
    );
    this.nuevoEstablecimientoForm.get('departamento')?.enable();
  }

  setearLocalidades() {
    this.localidades = this._ubicacionesService.localidades(
      this.nuevoEstablecimientoForm.get('departamento')?.value.id
    );
    this.nuevoEstablecimientoForm.get('localidad')?.enable();
  }

  public async agregarEstablecimiento() {
    let nuevosValoresEstablecimiento = this.removeEmpty(
      this.nuevoEstablecimientoForm.getRawValue()
    );

    nuevosValoresEstablecimiento.provincia =
      nuevosValoresEstablecimiento.provincia.nombre;
    nuevosValoresEstablecimiento.departamento =
      nuevosValoresEstablecimiento.departamento.nombre;
    nuevosValoresEstablecimiento.localidad =
      nuevosValoresEstablecimiento.localidad.nombre;
    nuevosValoresEstablecimiento.horario = `${nuevosValoresEstablecimiento.horario_desde}-${nuevosValoresEstablecimiento.horario_hasta}`;
    nuevosValoresEstablecimiento.telefonos = this.telefonos;
    delete nuevosValoresEstablecimiento.horario_desde;
    delete nuevosValoresEstablecimiento.horario_hasta;

    this.nuevoEstablecimientoForm.disable();
    this.telefonoInput.disable();
    this.uploading = true;
    try {
      let response = await this._establecimientoService.store(
        nuevosValoresEstablecimiento
      );
      if (response) {
        if (response.errores) {
          let errorMessage = 'La carga se completó pero con errores:<br>';
          for (let error of response.errores) {
            errorMessage = `${errorMessage}<br>${error}`;
          }
          await Swal.fire({
            icon: 'warning',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Aceptar',
            title: 'Atención',
            html: errorMessage,
          });
        } else {
          await Swal.fire({
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            text: 'Se agregó el establecimiento correctamente',
            title: 'Agregado',
          });
        }
        this._router.navigate(['establecimientos']);
      }
    } catch (error: any) {
      await Swal.fire({
        icon: 'error',
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'Aceptar',
        title: 'Error',
        text:
          'Ocurrio un error y no se pudo cargar el nuevo establecimiento. Intenteló nuevamente.' +
          error.message
            ? error.message
            : '',
      });
      this._router.navigate(['establecimientos']);
    }
  }

  removeEmpty(obj: any) {
    Object.keys(obj).forEach(k =>
      (obj[k] && typeof obj[k] === 'object') && this.removeEmpty(obj[k]) ||
      (!obj[k] && obj[k] !== undefined) && delete obj[k]
    );
    return obj;
  };

}
