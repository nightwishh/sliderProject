import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sliderProject';
  sliderValue: number = 500;
  stepsliderValue: number = 100;
}
