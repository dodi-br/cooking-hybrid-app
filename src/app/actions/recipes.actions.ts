import {Recipe} from "../models/Recipe";
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

@Injectable()
export class RecipesActions {

  static LOAD = 'Recipes:Load';
  loadRecipes(recipes: Recipe[]): Action {
    return {
      type: RecipesActions.LOAD,
      payload: recipes
    }
  }
}
