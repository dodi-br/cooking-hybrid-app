import {Injectable} from "@angular/core";
import {Recipe} from "../models/Recipe";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {RecipesActions} from "../actions/recipes.actions";
import {SelectedRecipeActions} from "../actions/selectedRecipe.actions";

@Injectable()
export class RecipeService {
  recipes: Observable<Recipe[]>;
  selectedRecipe: Observable<Recipe>;

  constructor(private store: Store<any>, private recipesActions: RecipesActions, private selectedRecipeActions: SelectedRecipeActions) {
    this.recipes = store.select(state => state.recipes);
    this.selectedRecipe = store.select(state => state.selectedRecipe);

    this.loadRecipes();
  }

  public loadRecipes(): void {
    this.store.dispatch(this.recipesActions.loadRecipes());
  }

  public selectRecipe(recipe: Recipe) {
    this.store.dispatch(this.selectedRecipeActions.selectRecipe(recipe));
  }

  public deselectRecipe() {
    this.store.dispatch(this.selectedRecipeActions.deselectRecipe());
  }
}
