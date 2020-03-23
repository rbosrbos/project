import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void => *', animate(1000)),
    ]),
  ]
})
export class CarouselComponent implements OnInit {
  @Input() slides: string[];

  Actual = 0;

  left() {
    if (this.Actual === 0) {
      this.Actual = this.slides.length - 1;
    } else {
      this.Actual--;
    }
  }
  right() {
    if (this.Actual === this.slides.length - 1) {
      this.Actual = 0;
    } else {
      this.Actual++;
    }
  }
  constructor() {}

  ngOnInit(): void {}
}
