import {timersReducer} from "./timers.reducer";
import {TimersActions} from "../actions/timers.actions";
import {Timer} from "../models/Timer";

describe('Reducers: TimersReducer', () => {

  it('should return state on invalid action', () => {
    const state = { running: [], completed: [] };

    const actual = timersReducer(state, {type: 'INVALID_ACTION', payload: {}});

    expect(actual).toBe(state);
  });

  it('should add timer to running timers', () => {
    const state = { running: [], completed: [] };
    const timer = new Timer(1000, new Date());

    const actual = timersReducer(state, {type: TimersActions.ADD, payload: timer});

    expect(actual.running).toEqual([timer]);
    expect(actual.completed).toEqual([]);
  });

  it('should move timer when completed', () => {
    const timer = new Timer(1000, new Date());
    const timer2 = new Timer(500, new Date());
    const state = { running: [timer, timer2], completed: [] };

    const actual = timersReducer(state, {type: TimersActions.COMPLETED, payload: timer});

    expect(actual.running).toEqual([timer2]);
    expect(actual.completed).toEqual([timer]);
  });
});
