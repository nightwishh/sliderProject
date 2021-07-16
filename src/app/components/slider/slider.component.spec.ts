import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should slide anywhere', () => {
    fixture.componentInstance.min = 0;
    fixture.componentInstance.max = 100;
    fixture.componentInstance.value = 90;
    fixture.componentInstance.width = 300;
    fixture.componentInstance.slideByValue(90);
    fixture.detectChanges();
    var elem = fixture.debugElement.query(
      By.css('.triangle-scroll')
    ).nativeElement;
    var bdw = elem.style['border-right-width'];
    expect(bdw).toBe(270 + 'px');
  });
});
