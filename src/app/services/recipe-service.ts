import {Injectable} from "@angular/core";
import {Http, Headers, Response} from '@angular/http';
import {Recipe} from "../models/Recipe";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Configuration} from "../app.configuration";
import {Store} from "@ngrx/store";
import {RecipesActions} from "../actions/recipes.actions";
import {SelectedRecipeActions} from "../actions/selectedRecipe.actions";

@Injectable()
export class RecipeService {
  private headers: Headers;
  recipes: Observable<Recipe[]>;
  selectedRecipe: Observable<Recipe>;

  constructor(private $http: Http, private configuration: Configuration, private store: Store<any>, private recipesActions: RecipesActions, private selectedRecipeActions: SelectedRecipeActions) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

    this.recipes = store.select(state => state.recipes);
    this.selectedRecipe = store.select(state => state.selectedRecipe);

    this.loadRecipes().subscribe();
  }

  public loadRecipes(): Observable<Recipe[]> {
    return this.$http.get(this.configuration.serverUrl + "recipe/daily-recipes.json", {'headers': this.headers})
      .map((r: Response) => <Recipe[]>r.json())
      .do(payload => this.store.dispatch(this.recipesActions.loadRecipes(payload)));
  }

  public selectRecipe(recipe: Recipe) {
    this.store.dispatch(this.selectedRecipeActions.selectRecipe(recipe));
  }
}
