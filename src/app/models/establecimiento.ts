import { Telefono } from './telefono';
import { Oferta } from './oferta';
import { Zona } from './zona';
import { Ambito } from './ambito';
import { Domicilio } from './domicilio';
import { Nivel } from './nivel';
import { Sector } from './sector';
import { Modalidad } from './modalidad';
import { Turno } from './turno';

export class EstablecimientoLista {
  constructor(
      public establecimientoID: number,
      public cue: string,
      public nombre: string,
      public matricula: number,
      public mail: string,
      public horario: string,
      public sectorID: number,
      public modalidadID: number,
      public ambitoID: number,
      public nivelID: number,
      public zonaID: number,
      public domicilioID: number
  ){}
}

export class EstablecimientoDetalles {
  constructor(
    public establecimientoID: number,
    public cue: number,
    public nombre: string,
    public matricula: number,
    public mail: string,
    public horario: string,
    public sectorID: number,
    public modalidadID: number,
    public ambitoID: number,
    public nivelID: number,
    public zonaID: number,
    public domicilioID: number,
    public ambito: Ambito,
    public domicilio: Domicilio,
    public nivel: Nivel,
    public sector: Sector,
    public modalidad: Modalidad,
    public zona: Zona,
    public ofertas: Oferta[],
    public turnos: Turno[],
    public telefonoestablecimientos: Telefono[]
  ) {}
}
