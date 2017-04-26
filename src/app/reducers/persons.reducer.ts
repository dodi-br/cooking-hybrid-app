import {PersonsActions} from "../actions/persons.actions";

const initialState = 2;

export function personsReducer(state: number = initialState, {type, payload}) {
  switch (type) {
    case PersonsActions.SELECT:
      return payload;

    default:
      return state;
  }
}
