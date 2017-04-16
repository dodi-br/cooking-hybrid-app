import {ActionReducer} from "@ngrx/store";
import {SessionActions} from "../actions/session.actions";

const initialState: string = null;

export const sessionReducer: ActionReducer<string> = (state: string = initialState, {type, payload}) => {
  switch (type) {
    case SessionActions.SET_SESSION_ID:
      return payload;

    default:
      return state;
  }
};

