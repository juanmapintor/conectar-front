import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEstablecimientoComponent } from './nuevo-establecimiento.component';

describe('NuevoEstablecimientoComponent', () => {
  let component: NuevoEstablecimientoComponent;
  let fixture: ComponentFixture<NuevoEstablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoEstablecimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
