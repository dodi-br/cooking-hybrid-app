import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import {TestBed, inject, async} from '@angular/core/testing';
import {StepsEffects} from './steps.effects';
import {StepsActions} from '../actions/steps.actions';
import {StepsService} from '../pages/steps/steps.service';
import {TimersActions} from '../actions/timers.actions';
import {Observable} from 'rxjs';
import {Step} from '../models/Step';
import {} from 'jasmine';

class MockStepsService {
  previousStep: Observable<Step>;

  constructor() {
    let step = new Step();
    step.duration = 2;

    this.previousStep = Observable.of(step);
  }

  isTimedStep() {
    return true;
  }
}

describe('Effects: StepsEffects', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      StepsEffects,
      {provide: StepsService, useClass: MockStepsService},
      TimersActions
    ]
  }));

  let runner: EffectsRunner;
  let stepsEffects: StepsEffects;

  beforeEach(inject([
      EffectsRunner, StepsEffects
    ],
    (_runner, _stepsEffects_) => {
      runner = _runner;
      stepsEffects = _stepsEffects_;
    }
  ));

  describe('startTimer effect', () => {
    it('should add timer', async(() => {
      runner.queue({ type: StepsActions.NEXT });

      stepsEffects.effectStartTimer.subscribe(result => {
        expect(result).toEqual(jasmine.objectContaining({
          type: TimersActions.ADD,
          payload: jasmine.objectContaining({
            duration: 2
          })
        }));
      });
    }));
  });
});
