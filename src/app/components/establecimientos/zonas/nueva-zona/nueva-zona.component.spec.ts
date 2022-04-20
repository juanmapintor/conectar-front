import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaZonaComponent } from './nueva-zona.component';

describe('NuevaZonaComponent', () => {
  let component: NuevaZonaComponent;
  let fixture: ComponentFixture<NuevaZonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaZonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
