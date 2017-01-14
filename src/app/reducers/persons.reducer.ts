import {ActionReducer} from "@ngrx/store";
import {PersonsActions} from "../actions/persons.actions";

const initialState = 2;

export const personsReducer: ActionReducer<number> = (state: number = initialState, {type, payload}) => {
  switch (type) {
    case PersonsActions.SELECT:
      return payload;

    default:
      return state;
  }
};
