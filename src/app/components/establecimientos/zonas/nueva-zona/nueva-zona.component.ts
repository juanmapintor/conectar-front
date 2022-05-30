import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Zona } from 'src/app/models/zona';
import { ZonaService } from 'src/app/services/zona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-zona',
  templateUrl: './nueva-zona.component.html',
  styleUrls: ['./nueva-zona.component.scss'],
})
export class NuevaZonaComponent implements OnInit {
  nuevaZonaForm: FormGroup;
  zonaID: number = -1;

  loading = false;
  isEdit = false;
  constructor(
    private dialogRef: MatDialogRef<NuevaZonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {zona: Zona},
    private _formBuilder: FormBuilder,
    private _zonaService: ZonaService
  ) {
    if(data && data.zona){
      this.isEdit = true;
      this.zonaID = data.zona.zonaID;
      this.nuevaZonaForm = this._formBuilder.group({
        nombre: new FormControl(data.zona.nombre_zona, [Validators.required]),
        nombre_supervisor: new FormControl(data.zona.nombre_supervisor, [Validators.required]),
        apellido_supervisor: new FormControl(data.zona.apellido_supervisor, [Validators.required]),
        telefono_supervisor: new FormControl(data.zona.telefono_supervisor, [Validators.required]),
        email_supervisor: new FormControl(data.zona.mail_supervisor, [
          Validators.required,
          Validators.email,
        ]),
      });
    } else { 
      this.nuevaZonaForm = this._formBuilder.group({
        nombre: new FormControl('', [Validators.required]),
        nombre_supervisor: new FormControl('', [Validators.required]),
        apellido_supervisor: new FormControl('', [Validators.required]),
        telefono_supervisor: new FormControl('', [Validators.required]),
        email_supervisor: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
      });
    }
    
  }

  ngOnInit(): void {}

  public async agregarZona() {
    let rawDatos = this.nuevaZonaForm.getRawValue();
    let nuevaZona = new Zona(
      -1,
      rawDatos.nombre,
      rawDatos.apellido_supervisor,
      rawDatos.nombre_supervisor,
      rawDatos.email_supervisor,
      rawDatos.telefono_supervisor
    );
    this.loading = true;
    this.nuevaZonaForm.disable();
    try { 
      let zonaResponse = await this._zonaService.store(nuevaZona);
      if(zonaResponse) Swal.fire({
        icon: 'success',
        title: 'La nueva zona se creó exitosamente.',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.dialogRef.close();
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'No se pudo guardar la zona. Intentelo nuevamente.'
      });
      this.loading = false;
      this.nuevaZonaForm.enable();
    }
  }

  public editarZona() {
    Swal.fire({
      title: '¿Estás seguro que deseas guardar los cambios en la zona?',
      text: 'Los cambios efectuados en este formulario se veran reflejados en todos los establecimientos que dependan de la zona.',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No'
    }).then(result => {
      if(result.isConfirmed){
        this.editar();
      }
    });
  }
  private async editar() {
    let rawDatos = this.nuevaZonaForm.getRawValue();
    let nuevaZona = new Zona(
      this.zonaID,
      rawDatos.nombre,
      rawDatos.apellido_supervisor,
      rawDatos.nombre_supervisor,
      rawDatos.email_supervisor,
      rawDatos.telefono_supervisor
    );
    this.loading = true;
    this.nuevaZonaForm.disable();
    try { 
      let zonaResponse = await this._zonaService.update(nuevaZona);
      if(zonaResponse) Swal.fire({
        icon: 'success',
        title: 'La nueva zona se editó exitosamente.',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.dialogRef.close();
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'No se pudo editar la zona. Intentelo nuevamente.'
      });
      this.loading = false;
      this.nuevaZonaForm.enable();
    }
  }

  public cancelarEdicion() {
    Swal.fire({
      title: '¿Estás seguro que deseas cancelar la edicion de la zona?',
      text: 'Cualquier cambio efectuado no se guardará',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No'
    }).then(result => {
      if(result.isConfirmed){
        this.dialogRef.close();
      }
    });
  }
}
