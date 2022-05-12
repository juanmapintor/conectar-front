import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasInfoEstablecimientoComponent } from './mas-info-establecimiento.component';

describe('MasInfoEstablecimientoComponent', () => {
  let component: MasInfoEstablecimientoComponent;
  let fixture: ComponentFixture<MasInfoEstablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasInfoEstablecimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasInfoEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
