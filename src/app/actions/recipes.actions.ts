import {Recipe} from "../models/Recipe";
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

@Injectable()
export class RecipesActions {

  static LOAD = 'Recipes:Load';
  loadRecipes(): Action {
    return {
      type: RecipesActions.LOAD
    }
  }

  static LOAD_SUCCESS = 'Recipes:LoadSuccess';
  loadRecipesSuccess(recipes: Recipe[]): Action {
    return {
      type: RecipesActions.LOAD_SUCCESS,
      payload: recipes
    }
  }
}
