import {Injectable} from "@angular/core";
import {Recipe} from "../models/Recipe";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {RecipesActions} from "../actions/recipes.actions";
import {IndividualRecipeActions} from "../actions/individual-recipe.actions";

@Injectable()
export class RecipeService {
  recipes: Observable<Recipe[]>;
  selectedRecipe: Observable<Recipe>;

  constructor(private store: Store<any>, private recipesActions: RecipesActions, private individualRecipeActions: IndividualRecipeActions) {
    this.recipes = store.select(state => state.recipes);
    this.selectedRecipe = store.select(state => state.selectedRecipe);

    this.loadRecipes();
  }

  loadRecipes(): void {
    this.store.dispatch(this.recipesActions.loadRecipes());
  }

  loadRecipe(recipeId: number) {
    this.store.dispatch(this.individualRecipeActions.loadRecipe(recipeId));
  }
}
