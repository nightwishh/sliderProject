import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StepsliderComponent } from './stepslider.component';

describe('StepsliderComponent', () => {
  let component: StepsliderComponent;
  let fixture: ComponentFixture<StepsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepsliderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should slide anywhere', () => {
    fixture.componentInstance.steps = [0, 50, 20, 100];
    fixture.componentInstance.value = 20;
    fixture.componentInstance.width = 300;
    fixture.componentInstance.ngOnInit();
    fixture.componentInstance.slideByValue(20);
    fixture.detectChanges();
    var elem = fixture.debugElement.query(
      By.css('.triangle-scroll')
    ).nativeElement;
    var bdw = elem.style['border-right-width'];
    expect(bdw).toBe(75 + 'px');
  });
});
