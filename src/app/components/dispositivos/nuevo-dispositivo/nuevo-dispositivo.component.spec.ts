import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDispositivoComponent } from './nuevo-dispositivo.component';

describe('NuevoDispositivoComponent', () => {
  let component: NuevoDispositivoComponent;
  let fixture: ComponentFixture<NuevoDispositivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoDispositivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoDispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
