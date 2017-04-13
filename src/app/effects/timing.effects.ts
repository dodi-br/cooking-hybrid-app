import {Injectable} from '@angular/core';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Observable, BehaviorSubject} from 'rxjs';
import {StepsActions} from '../actions/steps.actions';
import {StepsService} from '../pages/steps/steps.service';
import {RecipeService} from '../services/recipe-service';
import {JsonHttp} from '../services/json-http.service';
import {Recipe} from '../models/Recipe';

@Injectable()
export class TimingEffects {

  private lastRecipe: BehaviorSubject<Recipe> = new BehaviorSubject<Recipe>(null);
  private startTime: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);

  constructor(
    private jsonHttp: JsonHttp,
    private actions: Actions,
    private stepsService: StepsService,
    private recipesService: RecipeService)
  {
    recipesService.selectedRecipe.subscribe(this.lastRecipe);
    stepsService.startTime.subscribe(this.startTime);
  }

  /**
   * For every recipe that has been completed, store the result of the timing of the recipe
   */
  @Effect({dispatch: false}) storeTiming: Observable<any> = this.actions
      .ofType(StepsActions.COMPLETE)
      .map(toPayload)
      .switchMap(() =>
        this.jsonHttp.post('/timings', {
          startTime: this.startTime.getValue(),
          endTime: new Date().getTime(),
          recipe: this.lastRecipe.getValue()
        })
      )
      .onErrorResumeNext();
}
