import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs";
import {Action} from "@ngrx/store";
import {Recipe} from "../models/Recipe";
import {JsonHttp} from "../services/json-http.service";
import {IndividualRecipeActions} from "../actions/individual-recipe.actions";

@Injectable()
export class IndividualRecipeEffects {

  constructor(private actions: Actions, private jsonHttp: JsonHttp, private individualRecipeActions: IndividualRecipeActions) {}

  /**
   * Will listen for IndividualRecipeActions.LOAD.
   * Will first fetch the recipe, and then emit IndividualRecipeActions.LOAD_SUCCESS
   */
  @Effect() effectLoadRecipe: Observable<Action> = this.actions
    .ofType(IndividualRecipeActions.LOAD_RECIPE)
    .switchMap(() => this.jsonHttp.get<Recipe>('recipe/1.json'))
    .switchMap(recipe => Observable.of(this.individualRecipeActions.loadRecipeSuccess(recipe)));
}
