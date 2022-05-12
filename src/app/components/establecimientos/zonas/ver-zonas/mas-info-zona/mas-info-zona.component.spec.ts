import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasInfoZonaComponent } from './mas-info-zona.component';

describe('MasInfoZonaComponent', () => {
  let component: MasInfoZonaComponent;
  let fixture: ComponentFixture<MasInfoZonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasInfoZonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasInfoZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
