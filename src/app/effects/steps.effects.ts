import {Injectable} from "@angular/core";
import {StepsService} from "../pages/steps/steps.service";
import {Effect, Actions, toPayload} from "@ngrx/effects";
import {StepsActions} from "../actions/steps.actions";
import {Observable, BehaviorSubject} from "rxjs";
import {TimersActions} from "../actions/timers.actions";
import {Timer} from "../models/Timer";
import {Action} from "@ngrx/store";
import {Step} from "../models/Step";

@Injectable()
export class StepsEffects {

  private previousStep: BehaviorSubject<Step> = new BehaviorSubject(null);

  constructor(private actions: Actions, private stepsService: StepsService, private timersActions: TimersActions, private stepsActions: StepsActions) {
    stepsService.previousStep.subscribe(this.previousStep);
  }

  /**
   * Start a timer for the step that has passed.
   * The reducer will be called first, hence we have to look back in the state, we cannot use current step.
   */
  @Effect() effectStartTimer: Observable<Action> = this.actions
    .ofType(StepsActions.NEXT)
    .map(toPayload)
    .map(() => this.previousStep.getValue())
    .filter(currentStep => this.stepsService.isTimedStep(currentStep))
    .switchMap(currentStep => {
      const timer = new Timer(currentStep.duration, new Date(), currentStep);
      return Observable.of(this.timersActions.addTimer(timer));
    });

  /**
   * Clear the steps if all steps have been completed
   */
  @Effect() clearAfterComplete: Observable<Action> = this.actions
    .ofType(StepsActions.COMPLETE)
    .map(toPayload)
    .switchMap(() => Observable.of(this.stepsActions.clear()));
}
