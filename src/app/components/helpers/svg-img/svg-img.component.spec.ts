import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgImgComponent } from './svg-img.component';

describe('SvgImgComponent', () => {
  let component: SvgImgComponent;
  let fixture: ComponentFixture<SvgImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
