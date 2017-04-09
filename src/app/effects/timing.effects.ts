import {Injectable} from "@angular/core";
import {Effect, Actions, toPayload} from "@ngrx/effects";
import {Observable} from "rxjs";
import {StepsActions} from "../actions/steps.actions";
import {StepsService} from "../pages/steps/steps.service";
import {RecipeService} from "../services/recipe-service";
import {JsonHttp} from "../services/json-http.service";
import {Recipe} from "../models/Recipe";

@Injectable()
export class TimingEffects {

  private lastRecipe: Recipe;
  private startTime: Date;

  constructor(
    private jsonHttp: JsonHttp,
    private actions: Actions,
    private stepsActions: StepsActions,
    private stepsService: StepsService,
    private recipesService: RecipeService)
  {
    recipesService.selectedRecipe.subscribe(recipe => this.lastRecipe = recipe);
    stepsService.startTime.subscribe(startTime => this.startTime = startTime);
  }

  /**
   * For every recipe that has been completed, store the result of the timing of the recipe
   */
  @Effect({dispatch: false}) storeTiming: Observable<any> = this.actions
      .ofType(StepsActions.COMPLETE)
      .map(toPayload)
      .switchMap(() =>
        this.jsonHttp.post('/timings', {
          startTime: this.startTime.getTime(),
          endTime: new Date().getTime(),
          recipe: this.lastRecipe.id
        })
      )
}
