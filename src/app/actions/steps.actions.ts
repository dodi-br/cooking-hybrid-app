import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";
import {Step} from "../models/Step";

@Injectable()
export class StepsActions {

  static START = 'Steps:Start';
  start(steps: Step[]): Action {
    return {
      type: StepsActions.START,
      payload: steps
    }
  }

  static NEXT = 'Steps:Next';
  nextStep(): Action {
    return {
      type: StepsActions.NEXT
    }
  }

  static PREVIOUS = 'Steps:Previous';
  previousStep(): Action {
    return {
      type: StepsActions.PREVIOUS
    }
  }

  static RESET = 'Steps:Reset';
  reset(): Action {
    return {
      type: StepsActions.RESET
    }
  }

  static COMPLETE = 'Steps:Complete';
  complete(): Action {
    return {
      type: StepsActions.COMPLETE
    }
  };

  static CLEAR = 'Steps:Clear';
  clear(): Action {
    return {
      type: StepsActions.CLEAR
    }
  }
}
