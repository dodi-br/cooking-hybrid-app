import {Injectable} from '@angular/core';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Observable, BehaviorSubject} from 'rxjs';
import {StepsActions} from '../actions/steps.actions';
import {RecipeService} from '../services/recipe-service';
import {Recipe} from '../models/Recipe';
import {RemoteEventsService} from "../services/remote-events.service";

@Injectable()
export class TimingEffects {

  private lastRecipe: BehaviorSubject<Recipe> = new BehaviorSubject<Recipe>(null);

  constructor(
    private actions: Actions,
    private eventsService: RemoteEventsService,
    private recipesService: RecipeService)
  {
    recipesService.selectedRecipe.subscribe(this.lastRecipe);
  }

  /**
   * For every recipe that has been completed, store the result of the timing of the recipe
   */
  @Effect({dispatch: false}) eventComplete: Observable<any> = this.actions
      .ofType(StepsActions.COMPLETE)
      .map(toPayload)
      .switchMap(() => this.eventsService.completeRecipe(this.lastRecipe.getValue()));

  /**
   * For every recipe that has been completed, store the result of the timing of the recipe
   */
  @Effect({dispatch: false}) eventStart: Observable<any> = this.actions
    .ofType(StepsActions.START)
    .map(toPayload)
    .switchMap(() => this.eventsService.startRecipe(this.lastRecipe.getValue()));
}
