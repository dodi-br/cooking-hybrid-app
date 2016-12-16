import { ActionReducer } from '@ngrx/store';
import {Recipe} from "../models/Recipe";
import {RecipesActions} from "../actions/recipes.actions";

const initialState: Recipe[] = [];

export const recipesReducer: ActionReducer<Recipe[]> = (state: Recipe[] = initialState, {type, payload}) => {
  switch (type) {
    case RecipesActions.LOAD:
      return payload;

    default:
      return state;
  }
};
