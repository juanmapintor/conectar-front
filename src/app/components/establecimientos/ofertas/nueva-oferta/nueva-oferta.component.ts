import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  ofertaID: number = -1;

  loading = false;
  isEdit = false;
  constructor(
    private dialogRef: MatDialogRef<NuevaOfertaComponent>,
    private _ofertaService: OfertaService,
    @Inject(MAT_DIALOG_DATA) public data: {oferta: Oferta},
  ) {
    if(data && data.oferta){
      this.isEdit = true;
      this.ofertaID = data.oferta.ofertaID;
      this.nuevaOfertaControl = new FormControl(data.oferta.oferta, [Validators.required]);
    } else {
      this.nuevaOfertaControl = new FormControl('', [Validators.required]);
    }
   }

  ngOnInit(): void {
  }

  public async agregarOferta() {
    let rawDatos = this.nuevaOfertaControl.value;
    let nuevaOferta = new Oferta(
      -1,
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
  public editarOferta() {
    Swal.fire({
      title: '¿Estás seguro que deseas guardar los cambios en la oferta?',
      text: 'Los cambios efectuados en este formulario se veran reflejados en todos los establecimientos que dependan de la oferta.',
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
    let rawDatos = this.nuevaOfertaControl.value;
    let nuevaOferta = new Oferta(
      this.ofertaID,
      rawDatos
    );
    this.loading = true;
    this.nuevaOfertaControl.disable();
    try { 
      let ofertaResponse = await this._ofertaService.update(nuevaOferta);
      if(ofertaResponse) Swal.fire({
        icon: 'success',
        title: 'La nueva oferta se editó exitosamente.',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.dialogRef.close();
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'No se pudo editar la oferta. Intentelo nuevamente.'
      });
      this.loading = false;
      this.nuevaOfertaControl.enable();
    }
  }

  public cancelarEdicion() {
    Swal.fire({
      title: '¿Estás seguro que deseas cancelar la edicion de la oferta?',
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
