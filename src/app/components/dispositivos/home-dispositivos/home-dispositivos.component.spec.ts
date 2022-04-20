import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDispositivosComponent } from './home-dispositivos.component';

describe('HomeDispositivosComponent', () => {
  let component: HomeDispositivosComponent;
  let fixture: ComponentFixture<HomeDispositivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDispositivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDispositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
