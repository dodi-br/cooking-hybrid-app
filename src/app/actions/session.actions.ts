import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";

@Injectable()
export class SessionActions {

  static SET_SESSION_ID = 'Session:SetId';
  setSessionId(sessionId: String): Action {
    return {
      type: SessionActions.SET_SESSION_ID,
      payload: sessionId
    }
  }
}
