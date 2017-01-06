import {ActionReducer} from "@ngrx/store";
import {Timer} from "../models/Timer";
import {TimersActions} from "../actions/timers.actions";

export interface TimersState {
  running: Timer<any>[],
  completed: Timer<any>[]
}

const initialState: TimersState = {
  running: [],
  completed: []
};

export const timersReducer: ActionReducer<TimersState> = (state: TimersState = initialState, {type, payload}) => {
  switch (type) {
    case TimersActions.ADD:
      const alreadyStarted = state.running
        .concat(state.completed)
        .map(t => t.model)
        .some(m => m === payload.model);

      if (alreadyStarted) {
        return state;
      }

      return Object.assign({}, state, {
        running: state.running.concat(payload)
      });

    case TimersActions.COMPLETED:
      return {
        running: state.running.filter(timer => timer != payload),
        completed: state.completed.concat(payload)
      };

    case TimersActions.CLEAR:
      return initialState;

    default:
      return state;
  }
};
