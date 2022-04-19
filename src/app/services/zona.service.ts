import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Zona } from '../models/zona';

@Injectable({
  providedIn: 'root',
})
export class ZonaService {
  constructor(private _http: HttpClient) {}

  public async index(): Promise<Zona[]> {
    try {
      let response: any = await firstValueFrom(
        this._http.get(GLOBAL.API_URL + 'zonas', GLOBAL.JSON_HEADERS)
      );
      let zonas: Zona[] = [];
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
      nuevaZona.zonaID = null;
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

  public async update(zonaID: number, zonaActualizada: Zona): Promise<Zona> {
    try {
      zonaActualizada.zonaID = null;
      let zona: any = await firstValueFrom(
        this._http.put(
          GLOBAL.API_URL + `zonas/${zonaID}`,
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
