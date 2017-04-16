import {Injectable} from '@angular/core';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {PlatformActions} from "../actions/platform.actions";
import {SessionActions} from "../actions/session.actions";

@Injectable()
export class SessionEffects {

  constructor(private actions: Actions, private sessionActions: SessionActions) {}

  private static guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  /**
   * For every recipe that has been completed, store the result of the timing of the recipe
   */
  @Effect() generateSessionId: Observable<any> = this.actions
      .ofType(PlatformActions.READY)
      .map(toPayload)
      .map(() => SessionEffects.guid())
      .switchMap(sessionId => Observable.of(this.sessionActions.setSessionId(sessionId)));
}
