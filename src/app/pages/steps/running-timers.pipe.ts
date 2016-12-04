import { Pipe, PipeTransform } from '@angular/core';
import {Timer} from "../../models/Timer";

/**
 * Only allow timers that are not yet finished
 */
@Pipe({name: 'runningTimers'})
export class RunningTimersPipe implements PipeTransform {
  transform(timers: Timer[]): Timer[] {
    console.log(timers);
    return timers.filter(t => !t.done);
  }
}
