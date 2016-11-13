import { Component, Input } from '@angular/core';
import {Timer} from "../../../models/Timer";

@Component({
  selector: 'timer',
  templateUrl: 'timer.html'
})
export class TimerComponent {
  @Input() timer: Timer;
}
