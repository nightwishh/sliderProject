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

  it('should round ', () => {
    var x = fixture.componentInstance.round(10.5);
    expect(x).toBe(11);
  });
  it('should round ', () => {
    var x = fixture.componentInstance.round(10.7);
    expect(x).toBe(11);
  });
  it('should round ', () => {
    var x = fixture.componentInstance.round(10.4);
    expect(x).toBe(10);
  });
  it('should slidewithclick ', () => {
    fixture.componentInstance.min = 0;
    fixture.componentInstance.max = 100;
    fixture.componentInstance.value = 90;
    fixture.componentInstance.width = 300;
    var e = new MouseEvent('move');
    fixture.componentInstance.sliderClick(e);
    fixture.detectChanges();
    var elem = fixture.debugElement.query(
      By.css('.triangle-scroll')
    ).nativeElement;
    var bdw = elem.style['border-right-width'];
    expect(bdw).toBe(0 + 'px');
  });
  it('should slidewithmove ', () => {
    fixture.componentInstance.min = 0;
    fixture.componentInstance.max = 100;
    fixture.componentInstance.value = 90;
    fixture.componentInstance.width = 300;
    var e = new MouseEvent('move');
    fixture.componentInstance.moveSlider(e);
    fixture.detectChanges();
    var elem = fixture.debugElement.query(
      By.css('.triangle-scroll')
    ).nativeElement;
    var bdw = elem.style['border-right-width'];
    expect(bdw).toBe(150 + 'px');
  });
  it('should slide ', () => {
    fixture.componentInstance.min = 0;
    fixture.componentInstance.max = 100;
    fixture.componentInstance.value = 90;
    fixture.componentInstance.width = 300;
    var e = new MouseEvent('move');
    fixture.componentInstance.slide(90, 90);
    fixture.detectChanges();
    var elem = fixture.debugElement.query(
      By.css('.triangle-scroll')
    ).nativeElement;
    var bdw = elem.style['border-right-width'];
    expect(bdw).toBe(270 + 'px');
  });
  it('should slide more than max', () => {
    fixture.componentInstance.min = 0;
    fixture.componentInstance.max = 100;
    fixture.componentInstance.value = 90;
    fixture.componentInstance.width = 300;
    fixture.componentInstance.slide(101, 90);
    fixture.detectChanges();
    var elem = fixture.debugElement.query(
      By.css('.triangle-scroll')
    ).nativeElement;
    var bdw = elem.style['border-right-width'];
    expect(bdw).toBe(300 + 'px');
  });
  it('should slide lower than min', () => {
    fixture.componentInstance.min = 0;
    fixture.componentInstance.max = 100;
    fixture.componentInstance.value = 90;
    fixture.componentInstance.width = 300;
    fixture.componentInstance.slide(-1, 90);
    fixture.detectChanges();
    var elem = fixture.debugElement.query(
      By.css('.triangle-scroll')
    ).nativeElement;
    var bdw = elem.style['border-right-width'];
    expect(bdw).toBe(0 + 'px');
  });
  it('should set value ', () => {
    fixture.componentInstance.setValue(25);
    expect(fixture.componentInstance.value).toBe(25);
  });
  it('should set width ', () => {
    fixture.componentInstance.width = 250;
    fixture.detectChanges();
    var elem = fixture.debugElement.query(
      By.css('.triangle-track')
    ).nativeElement;
    var bdw = elem.style['border-right-width'];
    expect(bdw).toBe(250 + 'px');
  });
  it('should get value  ', () => {
    fixture.componentInstance.width = 250;
    fixture.detectChanges();
    var x = fixture.componentInstance['GetValueFromElemPercent'](90);
    expect(x).toBe(90);
  });
  it('should get value  ', () => {
    fixture.componentInstance.width = 250;
    fixture.detectChanges();
    var x = fixture.componentInstance['getElementWidthFromPercent'](100);
    expect(x).toBe(250);
  });
});
