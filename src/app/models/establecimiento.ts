import { Telefono } from './telefono';
import { Oferta } from './oferta';
import { Zona } from './zona';
import { Ambito } from './ambito';
import { Domicilio } from './domicilio';
import { Nivel } from './nivel';
import { Sector } from './sector';
import { Modalidad } from './modalidad';
import { Turno } from './turno';

export class Establecimiento {
  constructor(
    establecimientoID: number | null,
    cue: number,
    nombre: string,
    matricula: number,
    mail: string,
    horario: string,
    sectorID: number,
    modalidadID: number,
    ambitoID: number,
    nivelID: number,
    zonaID: number,
    domicilioID: number,
    ambito: Ambito | null,
    domicilio: Domicilio | null,
    nivel: Nivel | null,
    sector: Sector | null,
    modalidad: Modalidad | null,
    zona: Zona | null,
    ofertas: Oferta[] | null,
    turnos: Turno[] | null,
    telefonoestablecimientos: Telefono[] | null
  ) {}
}
