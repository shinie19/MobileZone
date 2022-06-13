import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderAdminComponent } from './slider-admin.component';

describe('SliderAdminComponent', () => {
  let component: SliderAdminComponent;
  let fixture: ComponentFixture<SliderAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
