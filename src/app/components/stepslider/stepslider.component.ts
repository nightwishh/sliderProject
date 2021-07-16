import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'stepslider',
  templateUrl: './stepslider.component.html',
  styleUrls: ['./stepslider.component.css'],
})
export class StepsliderComponent implements OnInit {
  constructor() {}
  styles: Object = {};
  thumbStyles: Object = {};
  // @Input() max = 100;
  // @Input() min = 0;
  @Input() value = 50;
  @Input() width = 300;
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  @Input() color = 'hsl(44deg 53% 59%);';
  // @Input() trackBackgroundColor = 'black';

  @Input() label: string = 'Label';
  @Input() labelStyle: Object = {};
  @Input() backgroundColor = 'black';
  @Input() innerStyle: Object = {};

  @Input() steps: number[] = [0, 50, 100];
  @Input() separatorStyle: Object = {};

  min: number = 0;
  max: number = 100;

  separators: Array<Object> = [];
  stepsLocations: Array<Object> = [];
  ngOnInit(): void {
    if (this.steps.length == 0) console.error('Please provide steps field');
    this.initSteps();
    this.min = this.steps[0];
    this.max = this.steps[this.steps.length - 1];

    if (this.value < this.min || this.value > this.max) {
      this.setValue(this.min);
    }

    this.slideByValue(this.value);
    document.addEventListener('mousemove', (ev) => {
      this.moveSlider(ev);
    });
    document.addEventListener('mouseup', (ev) => {
      this.mouseDown = false;
    });
  }

  initSteps() {
    this.steps = this.steps.sort(function (a, b) {
      return a - b;
    }); // sort low to high

    for (var i = 0; i < this.steps.length; i++) {
      var l = (this.element.nativeElement.offsetWidth / this.steps.length) * i;
      if (i == this.steps.length - 1) l = this.width;
      if (l != 0 && l != this.width)
        this.separators.push({ location: l, value: this.steps[i] });

      this.stepsLocations.push({
        location: l,
        percent: (l / this.width) * 100,
        value: this.steps[i],
      });
    }
  }
  @ViewChild('tr', { static: true }) element: ElementRef;

  private getPercentOfElementWidth(widthVal: number) {
    return (widthVal / this.width) * 100;
  }
  private getElementWidthFromPercent(percent: number) {
    return (this.element.nativeElement.offsetWidth * percent) / 100;
  }

  sliderClick(e: MouseEvent) {
    var x = e.pageX - this.element.nativeElement.parentElement.offsetLeft;
    var perc = this.getPercentOfElementWidth(x);
    this.slide(this.GetValueFromElemPercent(perc), perc);
  }
  moveSlider(e: MouseEvent) {
    if (!this.mouseDown) return;
    this.sliderClick(e);
  }
  private GetValueFromElemPercent(percentageOfElement: number) {
    var p = this.min + ((this.max - this.min) * percentageOfElement) / 100;
    // if (percentageOfElement > 50)
    // p = this.max * percentageOfElement / 100;
    return p;
  }
  slide(value: number, elemPerc: number, exactPx: number = null) {
    value = Math.round(value);
    if (value > this.max) {
      // console.warn("value is higher than max value: " + value + " > " + this.max);
      value = this.max;
      elemPerc = 100;
    }
    if (value < this.min) {
      // console.warn("value is lower than min value: " + value + " < " + this.min);
      value = this.min;
      elemPerc = 0;
    }

    // var findLocation = exactPx == null ? Math.floor(this.width * elemPerc / 100) : exactPx;
    // var foundSeparator = this.stepsLocations.find(x=>(x["location"] == findLocation));
    // if (foundSeparator == null) return;
    var arr = this.stepsLocations.map((x) => x['location']);
    var closestPosition: number = 0;
    closestPosition = this.getClosest(
      exactPx == null ? Math.floor((this.width * elemPerc) / 100) : exactPx,
      arr
    );
    var closestValue = this.stepsLocations.find(
      (x) => x['location'] == closestPosition
    )['value'];
    exactPx = closestPosition;
    this.setValue(closestValue);
    this.slideElement(elemPerc, exactPx);
  }
  getClosest(value, array): number {
    const closest = array.reduce((a, b) => {
      return Math.abs(b - value) < Math.abs(a - value) ? b : a;
    });
    return closest;
  }
  setValue(value: number) {
    this.value = value;
    this.valueChange.emit(this.value);
  }
  private slideElement(amountPercent: number, exactPx: number = null) {
    if (exactPx != null) var rightW = exactPx;
    else var rightW = this.getElementWidthFromPercent(amountPercent);

    var topW = Math.round((rightW * 16.75) / 100);
    if (rightW < 0) return;
    this.styles = {
      'border-right-width': rightW + 'px',
      'border-top-width': topW + 'px',
    };
    this.thumbStyles = {
      left: rightW + 'px',
    };
  }
  mouseDown: boolean = false;

  round(num: number) {
    return Math.round(num);
  }

  slideByValue(value: number) {
    this.setValue(value);
    var p = this.stepsLocations.find((x) => x['value'] == value);
    this.slide(value, p['location'], p['location']);
  }
}
