import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsliderComponent } from './stepslider.component';

describe('StepsliderComponent', () => {
  let component: StepsliderComponent;
  let fixture: ComponentFixture<StepsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
