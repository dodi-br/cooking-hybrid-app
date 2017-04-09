import {Injectable} from "@angular/core";
import {Effect, Actions} from "@ngrx/effects";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {RecipesActions} from "../actions/recipes.actions";
import {Recipe} from "../models/Recipe";
import {JsonHttp} from "../services/json-http.service";

@Injectable()
export class RecipesEffects {

  constructor(private actions: Actions, private jsonHttp: JsonHttp, private recipesActions: RecipesActions) {}

  /**
   * Will listen for RecipesActions.LOAD.
   * Will first fetch recipes, and then emit RecipesActions.LOAD_SUCCESS
   */
  @Effect() effectStartTimer: Observable<Action> = this.actions
    .ofType(RecipesActions.LOAD)
    .switchMap(() => this.jsonHttp.get<Recipe[]>('recipe/daily-recipes.json'))
    .switchMap(recipes => Observable.of(this.recipesActions.loadRecipesSuccess(recipes)));
}
