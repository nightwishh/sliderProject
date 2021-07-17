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
    fixture.componentInstance.steps = [0, 20, 30, 90, 100];
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
    fixture.componentInstance.steps = [0, 20, 30, 90, 100];
    fixture.componentInstance.value = 90;
    fixture.componentInstance.width = 300;
    var e = new MouseEvent('move');
    fixture.componentInstance.moveSlider(e);
    fixture.detectChanges();
    var elem = fixture.debugElement.query(
      By.css('.triangle-scroll')
    ).nativeElement;
    var bdw = elem.style['border-right-width'];
    expect(bdw).toBe(100 + 'px');
  });
  it('should slide ', () => {
    fixture.componentInstance.steps = [0, 20, 30, 90, 100];
    fixture.componentInstance.value = 90;
    fixture.componentInstance.width = 300;
    var e = new MouseEvent('move');
    fixture.componentInstance.slide(90, 90);
    fixture.detectChanges();
    var elem = fixture.debugElement.query(
      By.css('.triangle-scroll')
    ).nativeElement;
    var bdw = elem.style['border-right-width'];
    expect(bdw).toBe(300 + 'px');
  });
  it('should slide max', () => {
    fixture.componentInstance.steps = [20, 30, 90, 100];
    fixture.componentInstance.value = 90;
    fixture.componentInstance.width = 300;
    fixture.componentInstance.slide(150, 90);
    fixture.detectChanges();
    var elem = fixture.debugElement.query(
      By.css('.triangle-scroll')
    ).nativeElement;
    var bdw = elem.style['border-right-width'];
    expect(bdw).toBe(300 + 'px');
  });
  it('should slide min', () => {
    fixture.componentInstance.steps = [20, 30, 90, 100];
    fixture.componentInstance.value = 90;
    fixture.componentInstance.width = 300;
    fixture.componentInstance.slide(0, 90);
    fixture.detectChanges();
    var elem = fixture.debugElement.query(
      By.css('.triangle-scroll')
    ).nativeElement;
    var bdw = elem.style['border-right-width'];
    expect(bdw).toBe(300 + 'px');
  });
  it('should set value ', () => {
    fixture.componentInstance.setValue(25);
    expect(fixture.componentInstance.value).toBe(25);
  });
  it('should set value ', () => {
    fixture.componentInstance.width = 250;
    fixture.detectChanges();
    var elem = fixture.debugElement.query(
      By.css('.triangle-track')
    ).nativeElement;
    var bdw = elem.style['border-right-width'];
    expect(bdw).toBe(250 + 'px');
  });
  it('should init ', () => {
    fixture.componentInstance.steps = [0, 10, 20, 30];
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.stepsLocations.length).toBe(4);
  });
  it('should init steps ', () => {
    fixture.componentInstance.steps = [0, 10, 20, 30];
    fixture.componentInstance.initSteps();
    expect(fixture.componentInstance.stepsLocations.length).toBe(4);
  });
  it('should get closest ', () => {
    fixture.componentInstance.steps = [0, 10, 20, 30];
    var x = fixture.componentInstance.getClosest(
      5,
      fixture.componentInstance.steps
    );
    expect(x).toBe(0);
  });
});
