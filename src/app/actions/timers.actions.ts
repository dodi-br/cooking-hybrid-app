import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";
import {Timer} from "../models/Timer";

@Injectable()
export class TimersActions {

  static ADD = 'Timers:Add';
  addTimer(timer: Timer<any>): Action {
    return {
      type: TimersActions.ADD,
      payload: timer
    }
  }

  static COMPLETED = 'Timers:Completed';
  completeTimer(timer: Timer<any>): Action {
    return {
      type: TimersActions.COMPLETED,
      payload: timer
    }
  }

  static CLEAR = 'Timers:Reset';
  clear(): Action {
    return {
      type: TimersActions.CLEAR
    }
  }

}
