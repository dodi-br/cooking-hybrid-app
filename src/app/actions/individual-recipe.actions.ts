import {Recipe} from "../models/Recipe";
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

@Injectable()
export class IndividualRecipeActions {

  static LOAD_RECIPE = 'IndividualRecipe:Load';

  loadRecipe(recipeId: number): Action {
    return {
      type: IndividualRecipeActions.LOAD_RECIPE,
      payload: recipeId
    }
  }

  static LOAD_RECIPE_SUCCESS = 'IndiviualRecipe:LoadSuccess'
  loadRecipeSuccess(recipe: Recipe): Action {
    return {
      type: IndividualRecipeActions.LOAD_RECIPE_SUCCESS,
      payload: recipe
    }
  }
}
