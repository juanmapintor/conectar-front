import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Ambito } from '../models/ambito';
import { Modalidad } from '../models/modalidad';
import { Nivel } from '../models/nivel';
import { Sector } from '../models/sector';
import { Turno } from '../models/turno';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})

export class OpcionesEstablecimientoServiceService {

  constructor(private _http: HttpClient) { }

  public async indexTurno() : Promise<Turno[]> {
    try {
      let response: any = await firstValueFrom(
        this._http.get(GLOBAL.API_URL + 'turno', GLOBAL.JSON_HEADERS)
      );
      let turnos: Turno[] = [];
      if (response) {
        for (let turno of response) {
          turnos.push(
            new Turno(
              turno.turnoID,
              turno.turno
            )
          );
        }
      }
      return turnos;
    } catch (error) {
      throw error;
    }
  }
  public async indexSector() : Promise<Sector[]> {
    try {
      let response: any = await firstValueFrom(
        this._http.get(GLOBAL.API_URL + 'sector', GLOBAL.JSON_HEADERS)
      );
      let sectors: Sector[] = [];
      if (response) {
        for (let sector of response) {
          sectors.push(
            new Sector(
              sector.sectorID,
              sector.sector
            )
          );
        }
      }
      return sectors;
    } catch (error) {
      throw error;
    }
  }
  public async indexNivel() : Promise<Nivel[]> {
    try {
      let response: any = await firstValueFrom(
        this._http.get(GLOBAL.API_URL + 'nivel', GLOBAL.JSON_HEADERS)
      );
      let nivels: Nivel[] = [];
      if (response) {
        for (let nivel of response) {
          nivels.push(
            new Nivel(
              nivel.nivelID,
              nivel.nivel
            )
          );
        }
      }
      return nivels;
    } catch (error) {
      throw error;
    }
  }
  public async indexModalidad() : Promise<Modalidad[]> {
    try {
      let response: any = await firstValueFrom(
        this._http.get(GLOBAL.API_URL + 'modalidad', GLOBAL.JSON_HEADERS)
      );
      let modalidads: Modalidad[] = [];
      if (response) {
        for (let modalidad of response) {
          modalidads.push(
            new Modalidad(
              modalidad.modalidadID,
              modalidad.modalidad
            )
          );
        }
      }
      return modalidads;
    } catch (error) {
      throw error;
    }
  }
  public async indexAmbito() : Promise<Ambito[]> {
    try {
      let response: any = await firstValueFrom(
        this._http.get(GLOBAL.API_URL + 'ambito', GLOBAL.JSON_HEADERS)
      );
      let ambitos: Ambito[] = [];
      if (response) {
        for (let ambito of response) {
          ambitos.push(
            new Ambito(
              ambito.ambitoID,
              ambito.ambito
            )
          );
        }
      }
      return ambitos;
    } catch (error) {
      throw error;
    }
  }
  
}
