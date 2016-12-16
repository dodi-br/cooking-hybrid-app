import { ActionReducer } from '@ngrx/store';
import {Recipe} from "../models/Recipe";
import {SelectedRecipeActions} from "../actions/selectedRecipe.actions";

const initialState: Recipe = null;

export const selectedRecipeReducer: ActionReducer<Recipe> = (state: Recipe = initialState, {type, payload}) => {
  switch (type) {
    case SelectedRecipeActions.SELECT:
      return payload;

    default:
      return state;
  }
};
