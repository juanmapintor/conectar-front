import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Oferta } from '../models/oferta';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class OfertaService {
  constructor(private _http: HttpClient) { }

  public async index(page: number): Promise<Page<Oferta>> {
    try {
      let options = {
        headers: GLOBAL.JSON_HEADERS.headers,
        params: new HttpParams().set('page', page)
      }
      let response: any = await firstValueFrom(
        this._http.get(GLOBAL.API_URL + 'page/ofertas', options)
      );
      return <Page<Oferta>>response;
    } catch (error) {
      throw error;
    }
  }

  public async indexAll(): Promise<Oferta[]> {
    try {
      let response: any = await firstValueFrom(
        this._http.get(GLOBAL.API_URL + 'ofertas', GLOBAL.JSON_HEADERS)
      );
      let ofertas: Oferta[] = [];
      if (response) {
        for (let oferta of response) {
          ofertas.push(
            new Oferta(
              oferta.ofertaID,
              oferta.oferta
            )
          );
        }
      }
      return ofertas;
    } catch (error) {
      throw error;
    }
  }

  public async show(ofertaID: number): Promise<Oferta> {
    try {
      let oferta: any = await firstValueFrom(
        this._http.get(GLOBAL.API_URL + `ofertas/${ofertaID}`, GLOBAL.JSON_HEADERS)
      );
      return new Oferta(
        oferta.ofertaID,
        oferta.oferta
      );
    } catch (error) {
      throw error;
    }
  }

  public async store(nuevaOferta: Oferta): Promise<Oferta> {
    try {
      nuevaOferta.ofertaID = -1;
      let oferta: any = await firstValueFrom(
        this._http.post(
          GLOBAL.API_URL + 'ofertas',
          JSON.stringify(nuevaOferta),
          GLOBAL.JSON_HEADERS
        )
      );
      return new Oferta(
        oferta.ofertaID,
        oferta.oferta
      );
    } catch (error) {
      throw error;
    }
  }

  public async update(ofertaActualizada: Oferta): Promise<Oferta> {
    try {
      let oferta: any = await firstValueFrom(
        this._http.put(
          GLOBAL.API_URL + `ofertas/${ofertaActualizada.ofertaID}`,
          JSON.stringify(ofertaActualizada),
          GLOBAL.JSON_HEADERS
        )
      );
      return new Oferta(
        oferta.ofertaID,
        oferta.oferta
      );
    } catch (error) {
      throw error;
    }
  }

  public async destroy(ofertaID: number): Promise<boolean> {
    try {
      let response: any = await firstValueFrom(
        this._http.delete(
          GLOBAL.API_URL + `ofertas/${ofertaID}`,
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