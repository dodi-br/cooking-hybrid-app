import {Recipe} from "../models/Recipe";
import {SelectedRecipeActions} from "../actions/selectedRecipe.actions";

const initialState: Recipe = null;

export function selectedRecipeReducer(state: Recipe = initialState, {type, payload}) {
  switch (type) {
    case SelectedRecipeActions.SELECT:
      return payload;

    case SelectedRecipeActions.DESELECT:
      return initialState;

    default:
      return state;
  }
}
