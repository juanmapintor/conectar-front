import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEstablecimientosComponent } from './ver-establecimientos.component';

describe('VerEstablecimientosComponent', () => {
  let component: VerEstablecimientosComponent;
  let fixture: ComponentFixture<VerEstablecimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerEstablecimientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEstablecimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
