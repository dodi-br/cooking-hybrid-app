import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";
import {Step} from "../models/Step";

@Injectable()
export class StepsActions {

  static LOAD = 'Steps:Load';
  loadSteps(steps: Step[]): Action {
    return {
      type: StepsActions.LOAD,
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

  static CLEAR = 'Steps:Clear';
  clear(): Action {
    return {
      type: StepsActions.CLEAR
    }
  }
}
