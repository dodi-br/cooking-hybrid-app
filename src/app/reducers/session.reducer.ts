import {SessionActions} from "../actions/session.actions";

const initialState: string = null;

export function sessionReducer(state: string = initialState, {type, payload}) {
  switch (type) {
    case SessionActions.SET_SESSION_ID:
      return payload;

    default:
      return state;
  }
}

