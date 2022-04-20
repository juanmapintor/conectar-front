import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService {
  constructor(private _http: HttpClient) {}

  public async index(): Promise<any> {
    try {
      let response: any = await firstValueFrom(
        this._http.get(GLOBAL.API_URL + 'establecimientos', GLOBAL.JSON_HEADERS)
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  
  public async show(establecimientoID: number): Promise<any> {
    try {
      let establecimiento: any = await firstValueFrom(
        this._http.get(GLOBAL.API_URL + `establecimientos/${establecimientoID}`, GLOBAL.JSON_HEADERS)
      );
      return establecimiento;
    } catch (error) {
      throw error;
    }
  }

  public async store(nuevaEstablecimientoCompleto: any): Promise<any> {
    try {
      nuevaEstablecimientoCompleto.establecimientoID = null;
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
      establecimientoActualizada.establecimientoID = null;
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
