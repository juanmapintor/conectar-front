export class Zona {
  constructor(
    public zonaID: number | null = 0,
    public nombre_zona: string = '',
    public apellido_supervisor: string = '',
    public nombre_supervisor: string = '',
    public mail_supervisor: string = '',
    public telefono_supervisor: string = ''
  ) {}
}
