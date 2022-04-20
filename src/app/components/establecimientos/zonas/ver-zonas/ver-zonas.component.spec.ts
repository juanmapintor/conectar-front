import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerZonasComponent } from './ver-zonas.component';

describe('VerZonasComponent', () => {
  let component: VerZonasComponent;
  let fixture: ComponentFixture<VerZonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerZonasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerZonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
