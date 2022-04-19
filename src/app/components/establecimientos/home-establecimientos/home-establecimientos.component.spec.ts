import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEstablecimientosComponent } from './home-establecimientos.component';

describe('HomeEstablecimientosComponent', () => {
  let component: HomeEstablecimientosComponent;
  let fixture: ComponentFixture<HomeEstablecimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeEstablecimientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeEstablecimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
