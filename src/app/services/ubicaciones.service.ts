import { Injectable } from '@angular/core';
import provinciasLista from 'src/app/models/source/provincias.json';
import departamentosLista from 'src/app/models/source/departamentos.json';
import localidadesLista from 'src/app/models/source/localidades.json';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

  constructor() { }

  public provincias() {
    let provincias: any = [];
    for(let provincia of provinciasLista.provincias){
      provincias.push({id: provincia.id, nombre: provincia.nombre});
    }
    return provincias;
  }

  public departamentos(idProvincia: string){
    let departamentos: any = [];
    for(let departamento of departamentosLista.departamentos){
      if(departamento.provincia.id == idProvincia) departamentos.push({id: departamento.id, nombre: departamento.nombre});
    }
    return departamentos;
  }

  public localidades(idDepartamento: string){
    let localidades: any = [];
    for(let localidad of localidadesLista.localidades){
      if(localidad.departamento.id == idDepartamento) localidades.push({id: localidad.id, nombre: localidad.nombre, centroide: localidad.centroide});
    }
    return localidades;
  }
}
