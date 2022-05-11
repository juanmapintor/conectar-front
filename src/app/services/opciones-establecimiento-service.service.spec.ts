import { TestBed } from '@angular/core/testing';

import { OpcionesEstablecimientoServiceService } from './opciones-establecimiento-service.service';

describe('OpcionesEstablecimientoServiceService', () => {
  let service: OpcionesEstablecimientoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpcionesEstablecimientoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
