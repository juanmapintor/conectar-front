import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Oferta } from 'src/app/models/oferta';
import { OfertaService } from 'src/app/services/oferta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-oferta',
  templateUrl: './nueva-oferta.component.html',
  styleUrls: ['./nueva-oferta.component.scss']
})
export class NuevaOfertaComponent implements OnInit {
  nuevaOfertaControl: FormControl;

  loading = false;
  constructor(
    private dialogRef: MatDialogRef<NuevaOfertaComponent>,
    private _ofertaService: OfertaService
  ) {
    this.nuevaOfertaControl = new FormControl('', [Validators.required]);
   }

  ngOnInit(): void {
  }

  public async agregarOferta() {
    let rawDatos = this.nuevaOfertaControl.value;
    let nuevaOferta = new Oferta(
      null,
      rawDatos
    );
    this.loading = true;
    this.nuevaOfertaControl.disable();
    try { 
      let ofertaResponse = await this._ofertaService.store(nuevaOferta);
      if(ofertaResponse) Swal.fire({
        icon: 'success',
        title: 'La nueva oferta se creó exitosamente.',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.dialogRef.close();
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'No se pudo guardar la oferta. Intentelo nuevamente.'
      });
      this.loading = false;
      this.nuevaOfertaControl.enable();
    }
  }

}
