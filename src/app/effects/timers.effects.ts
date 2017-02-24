import {Injectable} from "@angular/core";
import {Effect, Actions, toPayload} from "@ngrx/effects";
import {Observable} from "rxjs";
import {TimersActions} from "../actions/timers.actions";
import {Action} from "@ngrx/store";

@Injectable()
export class TimersEffects {

  constructor(private actions: Actions, private timersActions: TimersActions) {}

  /**
   * Start a timer for the step that has passed.
   * The reducer will be called first, hence we have to look back in the state, we cannot use current step.
   */
  @Effect() effectCompleteTimer: Observable<Action> = this.actions
    .ofType(TimersActions.ADD)
    .map(toPayload)
    .flatMap(timer =>
      Observable.timer(timer.duration * 1000)
        .switchMap(() => Observable.of(this.timersActions.completeTimer(timer)))
    );
}
