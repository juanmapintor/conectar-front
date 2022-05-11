import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  loading = false;
  constructor(
    private dialogRef: MatDialogRef<NuevaZonaComponent>,
    private _formBuilder: FormBuilder,
    private _zonaService: ZonaService
  ) {
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
}
