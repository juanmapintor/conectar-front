import { Telefono } from "./telefono"
import { Oferta } from "./oferta"
import { Zona } from "./zona"

export interface EstablecimientoMinimo {
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
    domicilioID: number
};

export interface EstablecimientoCompleto {
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
    ambito: {
        ambitoID: number,
        ambito: string
    },
    domicilio: {
        domicilioID: number,
        provincia: string,
        departamento: string,
        cod_postal: number,
        localidad: string,
        barrio: string,
        calle: string,
        numero: number,
        cardinalidad: string,
        observacion: string
    },
    nivel: {
        nivelID: number,
        nivel: string
    },
    sector: {
        sectorID: number,
        sector: string
    },
    modalidad: {
        modalidadID: number,
        modalidad: string
    },
    zona: Zona,
    ofertas: Oferta[],
    turnos:{
        turnoID: number,
        turno: string
    }[],
    telefonoestablecimientos: Telefono[]
}

