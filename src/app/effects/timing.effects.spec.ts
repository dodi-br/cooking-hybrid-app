import {EffectsTestingModule, EffectsRunner} from "@ngrx/effects/testing";
import {TestBed, inject} from "@angular/core/testing";
import {TimingEffects} from "./timing.effects";
import {StepsActions} from "../actions/steps.actions";
import {StepsService} from "../pages/steps/steps.service";
import {JsonHttp} from "../services/json-http.service";
import {Observable} from "rxjs";
import {RecipeService} from "../services/recipe-service";
import {Recipe} from "../models/Recipe";

class MockStepsService {
  startTime: Observable<Date>;

  constructor() {
    const date = new Date('December 17, 1995 03:24:00');
    this.startTime = Observable.of(date);
  }
}

class MockRecipeService {
  selectedRecipe: Observable<Recipe>;

  constructor() {
    const recipe = new Recipe();
    recipe.id = 100;

    this.selectedRecipe  = Observable.of(recipe);
  }
}

class MockJsonHttp {
  post() {
  }
}

describe('Effects: TimingEffects', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      TimingEffects,
      StepsActions,
      {
        provide: StepsService,
        useClass: MockStepsService
      },
      {
        provide: JsonHttp,
        useClass: MockJsonHttp
      },
      {
        provide: RecipeService,
        useClass: MockRecipeService
      }
    ]
  }));

  let runner: EffectsRunner;
  let timingsEffects: TimingEffects;
  let stepsActions: StepsActions;
  let jsonHttpMock: JsonHttp;

  beforeEach(inject([
      EffectsRunner, TimingEffects, StepsActions, JsonHttp
    ],
    (_runner, _timingEffects_, _stepsActions_, _jsonHttp_) => {
      runner = _runner;
      timingsEffects = _timingEffects_;
      stepsActions = _stepsActions_;
      jsonHttpMock = _jsonHttp_;
    }
  ));

  describe('storeTiming effect', () => {
    it('should post to server', (done) => {
      spyOn(jsonHttpMock, 'post').and.returnValue(Observable.of(1));
      runner.queue(stepsActions.complete());

      timingsEffects.storeTiming.subscribe(result => {
        expect(jsonHttpMock.post).toHaveBeenCalledWith(jasmine.any(String), jasmine.objectContaining({
          startTime: 819167040000,
          endTime: jasmine.any(Number),
          recipe: 100
        }));
        done();
      });
    })
  })
});
