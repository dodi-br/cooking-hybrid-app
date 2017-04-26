import {Recipe} from "../models/Recipe";
import {RecipesActions} from "../actions/recipes.actions";

const initialState: Recipe[] = [];

export function recipesReducer(state: Recipe[] = initialState, {type, payload}) {
  switch (type) {
    case RecipesActions.LOAD_SUCCESS:
      return payload;

    default:
      return state;
  }
}
