import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoResponsableComponent } from './nuevo-responsable.component';

describe('NuevoResponsableComponent', () => {
  let component: NuevoResponsableComponent;
  let fixture: ComponentFixture<NuevoResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoResponsableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
