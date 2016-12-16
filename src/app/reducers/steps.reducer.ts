import { ActionReducer } from '@ngrx/store';
import {Step} from "../models/Step";

export const LOAD = 'Steps:Load';
export const NEXT = 'Steps:Next';
export const PREVIOUS = 'Steps:Previous';
export const RESET = 'Steps:Reset';
export const CLEAR = 'Steps:Clear';

export interface StepState {
  steps: Step[];
  currentStepId: number;
  currentStep: Step;
  hasNext: boolean;
  hasPrevious: boolean;
}

const initialState: StepState = {
  steps: [],
  currentStepId: null,
  currentStep: null,
  hasNext: false,
  hasPrevious: false
};

export const stepsReducer: ActionReducer<StepState> = (state: StepState = initialState, {type, payload}) => {
  switch (type) {
    case LOAD:
      return {
        steps: payload,
        currentStepId: 0,
        currentStep: payload[0],
        hasNext: payload.length > 1,
        hasPrevious: false
      };

    case NEXT:
      return Object.assign({}, state, {
        currentStepId: state.currentStepId + 1,
        currentStep: state.steps[state.currentStepId + 1],
        hasNext: state.currentStepId + 1 < state.steps.length,
        hasPrevious: true
      });

    case PREVIOUS:
      return Object.assign({}, state, {
        currentStepId: state.currentStepId - 1,
        currentStep: state.steps[state.currentStepId - 1],
        hasNext: true,
        hasPrevious: state.currentStepId - 1 > 0
      });

    case RESET:
      return Object.assign({}, state, {
        currentStepId: 0,
        currentStep: state.steps[0],
        hasNext: state.steps.length > 1,
        hasPrevious: false
      });

    case CLEAR:
      return Object.assign({}, initialState);

    default:
      return state;
  }
};
