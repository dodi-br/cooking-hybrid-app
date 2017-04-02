import {Injectable} from "@angular/core";
import {Effect, Actions} from "@ngrx/effects";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {RecipesActions} from "../actions/recipes.actions";
import {Http, Response, Headers} from "@angular/http";
import {Recipe} from "../models/Recipe";
import {Configuration} from "../app.configuration";

@Injectable()
export class RecipesEffects {
  private headers: Headers;

  constructor(private actions: Actions, private $http: Http, private recipesActions: RecipesActions, private configuration: Configuration) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  /**
   * Will listen for RecipesActions.LOAD.
   * Will first fetch recipes, and then emit RecipesActions.LOAD_SUCCESS
   */
  @Effect() effectStartTimer: Observable<Action> = this.actions
    .ofType(RecipesActions.LOAD)
    .switchMap(() => this.$http.get(this.configuration.serverUrl + 'recipe/daily-recipes.json', {'headers': this.headers}))
    .map((r: Response) => <Recipe[]>r.json())
    .switchMap(recipes => Observable.of(this.recipesActions.loadRecipesSuccess(recipes)));
}
