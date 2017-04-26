import {Recipe} from "../models/Recipe";
import {IndividualRecipeActions} from "../actions/individual-recipe.actions";

const initialState: Recipe = null;

export function individualRecipeReducer(state: Recipe = initialState, {type, payload}) {
  switch (type) {
    case IndividualRecipeActions.LOAD_RECIPE_SUCCESS:
      return payload;

    default:
      return state;
  }
}
