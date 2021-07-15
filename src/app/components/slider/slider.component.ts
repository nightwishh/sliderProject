import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor() { }
  styles:Object = {};
  thumbStyles:Object = {};
  @Input() max = 100;
  @Input() min = 0;
  @Input() value = 50;
  @Input() width = 300;
  @Output() valueChange:EventEmitter<number> = new EventEmitter<number>();

  @Input() color = "hsl(44deg 53% 59%);";
  @Input() backgroundColor = "black";

  @Input() label:string = "Label";
  @Input() labelStyle:Object = {};
  @Input() innerStyle:Object = {};
  ngOnInit(): void {
    if (this.value > this.max || this.value < this.min)
    this.setValue(this.min);
    this.slideByValue(this.value);
    document.addEventListener("mousemove", (ev) => {
      this.moveSlider(ev);
    })
    document.addEventListener("mouseup", (ev) => {
      this.mouseDown = false;
    })
  }
  @ViewChild("tr", {static:true}) element:ElementRef;

  private getPercentOfElementWidth(widthVal:number) {
    return widthVal / this.element.nativeElement.offsetWidth * 100;
  }
  private getElementWidthFromPercent(percent:number) {
    return this.element.nativeElement.offsetWidth * percent / 100;
  }

  sliderClick(e:MouseEvent) {
    var x = e.pageX - this.element.nativeElement.parentElement.offsetLeft;
    var perc = this.getPercentOfElementWidth(x);
    this.slide(this.GetValueFromElemPercent(perc),perc);
  }
  moveSlider(e:MouseEvent) {
    if (!this.mouseDown) return;
    this.sliderClick(e);
  }
  private GetValueFromElemPercent(percentageOfElement:number) {
    var p = this.min + ((this.max - this.min) * percentageOfElement / 100);
    // if (percentageOfElement > 50)
    // p = this.max * percentageOfElement / 100;
    return p;
  }
  slide(value:number, elemPerc:number) {
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
    this.setValue(value);
    this.slideElement(elemPerc);
  }
  setValue(value:number) {
    this.value = value;
    this.valueChange.emit(this.value);
  }
  private slideElement(amountPercent:number) {
    var rightW = this.getElementWidthFromPercent(amountPercent);
    var topW = Math.round(rightW * 16.75 / 100);
    if (rightW < 0) return;
    this.styles = {
      "border-right-width":rightW + "px",
      "border-top-width":topW + "px"
    }
    this.thumbStyles = {
      "left":rightW + "px"
    }
  }
  mouseDown:boolean = false;

  round(num:number) {
    return Math.round(num);
  }

  slideByValue(value:number) {
    this.setValue(value);
    var p = (value - this.min) / (this.max - this.min) * 100;
    this.slide(value,p);
  }

}
