import { ActionReducer } from '@ngrx/store';
import {Step} from "../models/Step";
import {StepsActions} from "../actions/steps.actions";

export interface StepsState {
  all: Step[];
  currentStepId: number;
  currentStep: Step;
  nextStep: Step;
  previousStep: Step,
  startTime: Date
}

const initialState: StepsState = {
  all: [],
  currentStepId: null,
  currentStep: null,
  nextStep: null,
  previousStep: null,
  startTime: null
};

export const stepsReducer: ActionReducer<StepsState> = (state: StepsState = initialState, {type, payload}) => {
  switch (type) {
    case StepsActions.START:
      return {
        all: payload,
        currentStepId: 0,
        currentStep: payload[0],
        nextStep: payload[1],
        previousStep: null,
        startTime: new Date()
      };

    case StepsActions.NEXT:
      return Object.assign({}, state, {
        currentStepId: state.currentStepId + 1,
        currentStep: state.all[state.currentStepId + 1],
        nextStep: state.all[state.currentStepId + 2],
        previousStep: state.currentStep
      });

    case StepsActions.PREVIOUS:
      return Object.assign({}, state, {
        currentStepId: state.currentStepId - 1,
        currentStep: state.all[state.currentStepId - 1],
        nextStep: state.currentStep,
        previousStep: state.all[state.currentStepId - 2]
      });

    case StepsActions.RESET:
      return Object.assign({}, state, {
        currentStepId: 0,
        currentStep: state.all[0],
        nextStep: state.all[1] ,
        previousStep: null
      });

    case StepsActions.CLEAR:
      return Object.assign({}, initialState);

    default:
      return state;
  }
};
