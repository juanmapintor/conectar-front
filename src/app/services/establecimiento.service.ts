import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Page } from '../models/page';
import { EstablecimientoDetalles, EstablecimientoLista } from '../models/establecimiento';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService {
  constructor(private _http: HttpClient) { }

  public async index(page: number): Promise<Page<EstablecimientoLista>> {
    try {
      let options = {
        headers: GLOBAL.JSON_HEADERS.headers,
        params: new HttpParams().set('page', page)
      }
      let response: any = await firstValueFrom(
        this._http.get(GLOBAL.API_URL + 'page/establecimientos', options)
      );
      return <Page<EstablecimientoLista>>response;
    } catch (error) {
      throw error;
    }
  }


  public async show(establecimientoID: number): Promise<EstablecimientoDetalles> {
    try {
      let establecimiento: any = await firstValueFrom(
        this._http.get(GLOBAL.API_URL + `establecimientos/${establecimientoID}`, GLOBAL.JSON_HEADERS)
      );
      return <EstablecimientoDetalles>establecimiento;
    } catch (error) {
      throw error;
    }
  }

  public async store(nuevaEstablecimientoCompleto: any): Promise<any> {
    console.log(nuevaEstablecimientoCompleto);
    try {
      nuevaEstablecimientoCompleto.establecimientoID = -1;
      let establecimiento: any = await firstValueFrom(
        this._http.post(
          GLOBAL.API_URL + 'establecimientos',
          JSON.stringify(nuevaEstablecimientoCompleto),
          GLOBAL.JSON_HEADERS
        )
      );
      return establecimiento;
    } catch (error) {
      throw error;
    }
  }
  /*
    public async update(establecimientoID: number, establecimientoActualizada: any): Promise {
      try {
        establecimientoActualizada.establecimientoID = -1;
        let establecimiento: any = await firstValueFrom(
          this._http.put(
            GLOBAL.API_URL + `establecimientos/${establecimientoID}`,
            JSON.stringify(establecimientoActualizada),
            GLOBAL.JSON_HEADERS
          )
        );
        return new any(
          establecimiento.establecimientoID,
          establecimiento.establecimiento
        );
      } catch (error) {
        throw error;
      }
    }
  
    public async destroy(establecimientoID: number): Promise<boolean> {
      try {
        let response: any = await firstValueFrom(
          this._http.delete(
            GLOBAL.API_URL + `establecimientos/${establecimientoID}`,
            GLOBAL.JSON_HEADERS
          )
        );
        if (response.deleted) return response.deleted;
        return false;
      } catch (error) {
        throw error;
      }
    }
    */
}
