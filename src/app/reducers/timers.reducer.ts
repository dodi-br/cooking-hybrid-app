import { ActionReducer } from '@ngrx/store';
import {Recipe} from "../models/Recipe";
import {RecipesActions} from "../actions/recipes.actions";
import {Timer} from "../models/Timer";
import {TimersActions} from "../actions/timers.actions";

export interface TimersState {
  running: Timer[],
  completed: Timer[]
}

const initialState: TimersState = {
  running: [],
  completed: []
};

export const timersReducer: ActionReducer<TimersState> = (state: TimersState = initialState, {type, payload}) => {
  switch (type) {
    case TimersActions.ADD:
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
