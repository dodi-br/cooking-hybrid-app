import { Component, Input } from '@angular/core';
import {Timer} from "../../../models/Timer";
import {Observable} from "rxjs";

@Component({
  selector: 'timer',
  templateUrl: 'timer.html'
})
export class TimerComponent {
  @Input() timer: Timer;

  timeLeft: number;

  constructor() {
    Observable.timer(0, 1000)
      .map(t => this.timer.duration - (new Date().getTime()- this.timer.started.getTime()) / 1000)
      .subscribe(timeLeft => this.timeLeft = Math.round(timeLeft));
  }
}
