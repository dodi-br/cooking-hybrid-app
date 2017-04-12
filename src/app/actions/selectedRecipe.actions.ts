import {Recipe} from "../models/Recipe";
import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

@Injectable()
export class SelectedRecipeActions {

  static SELECT = 'Recipes:Select';
  selectRecipe(recipe: Recipe): Action {
    return {
      type: SelectedRecipeActions.SELECT,
      payload: recipe
    }
  }

  static DESELECT = 'Recipes:Deselect';
  deselectRecipe(): Action {
    return {
      type: SelectedRecipeActions.DESELECT
    }
  }
}
