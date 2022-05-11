export class Domicilio {
  constructor(
    public domicilioID: number,
    public provincia: string,//
    public departamento: string,//
    public cod_postal: number,
    public localidad: string,//
    public barrio: string,
    public calle: string,//
    public numero: number,//
    public cardinalidad: string,//
    public observacion: string,
    public lat: number,
    public lng: number
  ) { }
}
