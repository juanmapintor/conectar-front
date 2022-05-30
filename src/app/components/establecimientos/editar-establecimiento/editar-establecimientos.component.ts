import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { Ambito } from 'src/app/models/ambito';
import { EstablecimientoDetalles } from 'src/app/models/establecimiento';
import { Modalidad } from 'src/app/models/modalidad';
import { Nivel } from 'src/app/models/nivel';
import { Oferta } from 'src/app/models/oferta';
import { Sector } from 'src/app/models/sector';
import { Telefono } from 'src/app/models/telefono';
import { Turno } from 'src/app/models/turno';
import { Zona } from 'src/app/models/zona';
import { EstablecimientoService } from 'src/app/services/establecimiento.service';
import { JSONHelper } from 'src/app/services/helpers/jsonhelper.service';
import { OfertaService } from 'src/app/services/oferta.service';
import { OpcionesEstablecimientoService } from 'src/app/services/opciones-establecimiento-service.service';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { ZonaService } from 'src/app/services/zona.service';
import Swal from 'sweetalert2';
import { NuevaOfertaComponent } from '../ofertas/nueva-oferta/nueva-oferta.component';
import { NuevaZonaComponent } from '../zonas/nueva-zona/nueva-zona.component';


@Component({
  selector: 'app-editar-establecimientos',
  templateUrl: './editar-establecimientos.component.html',
  styleUrls: ['./editar-establecimientos.component.scss']
})
export class EditarEstablecimientoComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  establecimientoID: number = -1;

  editarEstablecimientoForm: FormGroup = new FormGroup({});

  loadingZonas = true;
  loadingOfertas = true;
  loadingAmbitos = true;
  loadingModalidades = true;
  loadingNiveles = true;
  loadingSectores = true;
  loadingTurnos = true;


  turnos: Turno[] = [];
  sectores: Sector[] = [];
  niveles: Nivel[] = [];
  modalidades: Modalidad[] = [];
  ambitos: Ambito[] = [];
  zonas: Zona[] = [];
  ofertas: Oferta[] = [];


  telefonoInput = new FormControl('');
  tipoTelefonoSelect = 'fijo';
  telefonos: Telefono[] = [];
  dataSourceTelefonos = new MatTableDataSource<Telefono>();
  displayedColumnsTelefonos: string[] = [
    'telefono',
    'tipo',
    'acciones',
  ];

  provincias: any[] = [];
  provinciaSeleccionada: string = '';
  departamentos: any[] = [];
  departamentoSeleccionado: string = '';
  localidades: any[] = [];
  localidadSeleccionada: string = '';

  mapOptions: google.maps.MapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    clickableIcons: false,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };
  mapCenter: google.maps.LatLngLiteral = { lat: -34.6989, lng: -64.7597 };
  mapZoom = 4;

  center: google.maps.LatLngLiteral = { lat: -34.6989, lng: -64.7597 };

  uploading = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private _zonaService: ZonaService,
    private _ofertaService: OfertaService,
    private _opcionesEstablecimientoService: OpcionesEstablecimientoService,
    private _ubicacionesService: UbicacionesService,
    private _establecimientoService: EstablecimientoService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.editarEstablecimientoForm = this._formBuilder.group({
      //Datos correspondientes a Establecimiento
      cue: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      sectorID: new FormControl('', [Validators.required]),
      modalidadID: new FormControl('', [Validators.required]),
      ambitoID: new FormControl('', [Validators.required]),
      nivelID: new FormControl('', [Validators.required]),
      zonaID: new FormControl('', [Validators.required]),
      matricula: new FormControl('', [Validators.min(1)]),
      mail: new FormControl('', [Validators.email]),
      horario_desde: new FormControl(''),
      horario_hasta: new FormControl(''),
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
    this._route.queryParams.subscribe({
      next: async (params) => {
        this.establecimientoID = params['establecimientoID'];
        this._establecimientoService.show(this.establecimientoID).then(
          (establecimiento: EstablecimientoDetalles) => {
            let horarios_desde = establecimiento.horario.split('-')[0];
            let horarios_hasta = establecimiento.horario.split('-')[1];
            this.provinciaSeleccionada = establecimiento.domicilio.provincia;
            this.departamentoSeleccionado = establecimiento.domicilio.departamento;
            this.localidadSeleccionada = establecimiento.domicilio.localidad;
            this.editarEstablecimientoForm = this._formBuilder.group({
              //Datos correspondientes a Establecimiento
              cue: new FormControl(establecimiento.cue, [Validators.required]),
              nombre: new FormControl(establecimiento.nombre, [Validators.required]),
              sectorID: new FormControl(establecimiento.sectorID, [Validators.required]),
              modalidadID: new FormControl(establecimiento.modalidadID, [Validators.required]),
              ambitoID: new FormControl(establecimiento.ambitoID, [Validators.required]),
              nivelID: new FormControl(establecimiento.nivelID, [Validators.required]),
              zonaID: new FormControl(establecimiento.zonaID, [Validators.required]),
              matricula: new FormControl(establecimiento.matricula, [Validators.min(1)]),
              mail: new FormControl(establecimiento.mail, [Validators.email]),
              horario_desde: new FormControl(horarios_desde),
              horario_hasta: new FormControl(horarios_hasta),
              //Datos correspondientes a Domicilio
              provincia: new FormControl('', [Validators.required]), //
              departamento: new FormControl('', [Validators.required]),
              localidad: new FormControl('', [Validators.required]), //
              cod_postal: new FormControl(establecimiento.domicilio.cod_postal, [Validators.required]), //
              calle: new FormControl(establecimiento.domicilio.calle, [Validators.required]), //
              barrio: new FormControl(establecimiento.domicilio.barrio), //
              numero: new FormControl(establecimiento.domicilio.numero), //
              cardinalidad: new FormControl(establecimiento.domicilio.cardinalidad), //
              observacion: new FormControl(establecimiento.domicilio.observacion), //

              //Ofertas y Turnos
              ofertas: new FormControl('', [Validators.required]), //
              turnos: new FormControl('', [Validators.required]), //
            });
            this.center = { lat: establecimiento.domicilio.lat, lng: establecimiento.domicilio.lng };
            this.mapCenter = this.center;
            this.mapZoom = 15;
            this.telefonos = establecimiento.telefonoestablecimientos;
            this.dataSourceTelefonos = new MatTableDataSource(this.telefonos);
            this.loadUbicacion();
          }
        )
      }
    })
  }

  ngOnInit(): void {
    this.load();
  }

  private async load() {
    this.loadZonas();
    this.loadOfertas();
    this.loadOpciones();
  }

  private async loadZonas() {
    this.loadingZonas = true;
    this.editarEstablecimientoForm.disable();
    this.zonas = [];
    try {
      this.zonas = await this._zonaService.indexAll();
      this.loadingZonas = false;
      this.editarEstablecimientoForm.enable();

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
    this.loadingOfertas = true;
    this.editarEstablecimientoForm.disable();
    this.ofertas = [];
    try {
      this.ofertas = await this._ofertaService.indexAll();
      this.loadingOfertas = false;
      this.editarEstablecimientoForm.enable();

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
  private loadOpciones() {
    this.loadAmbitos();
    this.loadModalidades();
    this.loadNiveles();
    this.loadSectores();
    this.loadTurnos();
  }
  private async loadAmbitos() {
    this.loadingAmbitos = true;
    this.editarEstablecimientoForm.disable();
    this.ambitos = [];
    try {
      this.ambitos = await this._opcionesEstablecimientoService.indexAmbito();
      this.loadingAmbitos = false;
      this.editarEstablecimientoForm.enable();

    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: 'No se pudo listar los ambitos para cargar nuevos establecimientos.<br> Pongase en contacto con el administrador del sistema.',
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
  private async loadModalidades() {
    this.loadingModalidades = true;
    this.editarEstablecimientoForm.disable();
    this.modalidades = [];
    try {
      this.modalidades = await this._opcionesEstablecimientoService.indexModalidad();
      this.loadingModalidades = false;
      this.editarEstablecimientoForm.enable();

    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: 'No se pudo listar las modalidades para cargar nuevos establecimientos.<br> Pongase en contacto con el administrador del sistema.',
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
  private async loadNiveles() {
    this.loadingNiveles = true;
    this.editarEstablecimientoForm.disable();
    this.niveles = [];
    try {
      this.niveles = await this._opcionesEstablecimientoService.indexNivel();
      this.loadingNiveles = false;
      this.editarEstablecimientoForm.enable();

    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: 'No se pudo listar los niveles para cargar nuevos establecimientos.<br> Pongase en contacto con el administrador del sistema.',
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
  private async loadSectores() {
    this.loadingSectores = true;
    this.editarEstablecimientoForm.disable();
    this.sectores = [];
    try {
      this.sectores = await this._opcionesEstablecimientoService.indexSector();
      this.loadingSectores = false;
      this.editarEstablecimientoForm.enable();

    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: 'No se pudo listar los sectores para cargar nuevos establecimientos.<br> Pongase en contacto con el administrador del sistema.',
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
  private async loadTurnos() {
    this.loadingTurnos = true;
    this.editarEstablecimientoForm.disable();
    this.turnos = [];
    try {
      this.turnos = await this._opcionesEstablecimientoService.indexTurno();
      this.loadingTurnos = false;
      this.editarEstablecimientoForm.enable();

    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: 'No se pudo listar los turnos para cargar nuevos establecimientos.<br> Pongase en contacto con el administrador del sistema.',
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

  agregarZona() {
    const dialogRef = this.dialog.open(NuevaZonaComponent);
    dialogRef.afterClosed().subscribe({
      next: async () => {
        this.loadingZonas = true;
        this.editarEstablecimientoForm.disable();
        await this.loadZonas();
        this.loadingZonas = false;
        this.editarEstablecimientoForm.enable();

      }
    })
  }
  agregarOferta() {
    const dialogRef = this.dialog.open(NuevaOfertaComponent);
    dialogRef.afterClosed().subscribe({
      next: async () => {
        this.loadingOfertas = true;
        this.editarEstablecimientoForm.disable();
        await this.loadOfertas();
        this.loadingOfertas = false;
        this.editarEstablecimientoForm.enable();

      }
    })
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

  loadUbicacion() {
    this.provincias = this._ubicacionesService.provincias();
    let provSel = this.provincias.find(p => p.nombre == this.provinciaSeleccionada);
    this.editarEstablecimientoForm.get('provincia')?.setValue(provSel);

    this.departamentos = this._ubicacionesService.departamentos(
      this.editarEstablecimientoForm.get('provincia')?.value.id
    );
    let depSel = this.departamentos.find(d => d.nombre == this.departamentoSeleccionado);
    this.editarEstablecimientoForm.get('departamento')?.setValue(depSel);
    this.editarEstablecimientoForm.get('departamento')?.enable();


    this.localidades = this._ubicacionesService.localidades(
      this.editarEstablecimientoForm.get('departamento')?.value.id
    );
    let locSel = this.localidades.find(l => l.nombre == this.localidadSeleccionada);
    this.editarEstablecimientoForm.get('localidad')?.setValue(locSel);
    this.editarEstablecimientoForm.get('localidad')?.enable();
  }

  setearDepartamentos() {
    this.departamentos = this._ubicacionesService.departamentos(
      this.editarEstablecimientoForm.get('provincia')?.value.id
    );
    this.editarEstablecimientoForm.get('departamento')?.enable();
  }
  setearLocalidades() {
    this.localidades = this._ubicacionesService.localidades(
      this.editarEstablecimientoForm.get('departamento')?.value.id
    );
    this.editarEstablecimientoForm.get('localidad')?.enable();
  }
  setearCentroide() {
    this.center =
    {
      lat: this.editarEstablecimientoForm.controls['localidad'].value.centroide.lat,
      lng: this.editarEstablecimientoForm.controls['localidad'].value.centroide.lon
    };
    this.mapCenter =
    {
      lat: this.editarEstablecimientoForm.controls['localidad'].value.centroide.lat,
      lng: this.editarEstablecimientoForm.controls['localidad'].value.centroide.lon
    };
    this.mapZoom = 15;
  }

  public async editarEstablecimiento() {
    let editarValoresEstablecimiento = JSONHelper.removeEmpty(
      this.editarEstablecimientoForm.getRawValue()
    );

    editarValoresEstablecimiento.establecimientoID = this.establecimientoID;
      editarValoresEstablecimiento.provincia =
      editarValoresEstablecimiento.provincia.nombre;
    editarValoresEstablecimiento.departamento =
      editarValoresEstablecimiento.departamento.nombre;
    editarValoresEstablecimiento.localidad =
      editarValoresEstablecimiento.localidad.nombre;
    editarValoresEstablecimiento.horario =
      `${editarValoresEstablecimiento.horario_desde}-${editarValoresEstablecimiento.horario_hasta}`;
    editarValoresEstablecimiento.telefonos = this.telefonos;
    editarValoresEstablecimiento.lat = this.center.lat;
    editarValoresEstablecimiento.lng = this.center.lng;
    delete editarValoresEstablecimiento.horario_desde;
    delete editarValoresEstablecimiento.horario_hasta;

    this.editarEstablecimientoForm.disable();
    this.telefonoInput.disable();
    this.uploading = true;
    try {
      let response = await this._establecimientoService.update(
        editarValoresEstablecimiento
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
            text: 'Se editó el establecimiento correctamente',
            title: 'Agregado',
          });
        }
        this._router.navigate(['establecimientos/ver']);
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
      this._router.navigate(['establecimientos/ver']);
    }
  }

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event.latLng?.toJSON() || { lat: 0, lng: 0 });
  }

  public loading(): boolean {
    return this.loadingAmbitos || this.loadingModalidades || this.loadingNiveles || this.loadingOfertas || this.loadingSectores || this.loadingTurnos || this.loadingZonas;
  }
}
