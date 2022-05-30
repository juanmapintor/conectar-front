import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Zona } from '../models/zona';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class ZonaService {
  constructor(private _http: HttpClient) { }
  
  public async index(page: number): Promise<Page<Zona>> {
    try {
      let options = {
        headers: GLOBAL.JSON_HEADERS.headers,
        params: new HttpParams().set('page', page)
      }
      let response: any = await firstValueFrom(
        this._http.get(GLOBAL.API_URL + 'page/zonas', options)
      );
      return <Page<Zona>>response;
    } catch (error) {
      throw error;
    }
  }

  public async indexAll(): Promise<Zona[]> {
    try {
      let response: any = await firstValueFrom(
        this._http.get(GLOBAL.API_URL + 'zonas', GLOBAL.JSON_HEADERS)
      );
      let zonas: Zona[] = [];
      if (response) {
        for (let zona of response) {
          zonas.push(
            new Zona(
              zona.zonaID,
              zona.nombre_zona,
              zona.apellido_supervisor,
              zona.nombre_supervisor,
              zona.mail_supervisor,
              zona.telefono_supervisor
            )
          );
        }
      }
      return zonas;
    } catch (error) {
      throw error;
    }
  }

  public async show(zonaID: number): Promise<Zona> {
    try {
      let zona: any = await firstValueFrom(
        this._http.get(GLOBAL.API_URL + `zonas/${zonaID}`, GLOBAL.JSON_HEADERS)
      );
      return new Zona(
        zona.zonaID,
        zona.nombre_zona,
        zona.apellido_supervisor,
        zona.nombre_supervisor,
        zona.mail_supervisor,
        zona.telefono_supervisor
      );
    } catch (error) {
      throw error;
    }
  }

  public async store(nuevaZona: Zona): Promise<Zona> {
    try {
      nuevaZona.zonaID = -1;
      let zona: any = await firstValueFrom(
        this._http.post(
          GLOBAL.API_URL + 'zonas',
          JSON.stringify(nuevaZona),
          GLOBAL.JSON_HEADERS
        )
      );
      return new Zona(
        zona.zonaID,
        zona.nombre_zona,
        zona.apellido_supervisor,
        zona.nombre_supervisor,
        zona.mail_supervisor,
        zona.telefono_supervisor
      );
    } catch (error) {
      throw error;
    }
  }

  public async update(zonaActualizada: Zona): Promise<Zona> {
    try {
      let zona: any = await firstValueFrom(
        this._http.put(
          GLOBAL.API_URL + `zonas/${zonaActualizada.zonaID}`,
          JSON.stringify(zonaActualizada),
          GLOBAL.JSON_HEADERS
        )
      );
      return new Zona(
        zona.zonaID,
        zona.nombre_zona,
        zona.apellido_supervisor,
        zona.nombre_supervisor,
        zona.mail_supervisor,
        zona.telefono_supervisor
      );
    } catch (error) {
      throw error;
    }
  }

  public async destroy(zonaID: number): Promise<boolean> {
    try {
      let response: any = await firstValueFrom(
        this._http.delete(
          GLOBAL.API_URL + `zonas/${zonaID}`,
          GLOBAL.JSON_HEADERS
        )
      );
      if (response.deleted) return response.deleted;
      return false;
    } catch (error) {
      throw error;
    }
  }
}
