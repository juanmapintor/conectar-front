import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePersonasComponent } from './home-personas.component';

describe('HomePersonasComponent', () => {
  let component: HomePersonasComponent;
  let fixture: ComponentFixture<HomePersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePersonasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
