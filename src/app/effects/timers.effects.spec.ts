import {EffectsTestingModule, EffectsRunner} from '@ngrx/effects/testing';
import {TestBed, inject} from '@angular/core/testing';
import {TimersActions} from '../actions/timers.actions';
import {TimersEffects} from './timers.effects';
import {Timer} from '../models/Timer';
import {} from 'jasmine';

describe('Effects: TimersEffects', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      TimersEffects,
      TimersActions
    ]
  }));

  let runner: EffectsRunner;
  let timersEffects: TimersEffects;
  let timersActions: TimersActions;

  beforeEach(inject([
      EffectsRunner, TimersEffects, TimersActions
    ],
    (_runner, _timersEffects_, _timersActions_) => {
      runner = _runner;
      timersEffects = _timersEffects_;
      timersActions = _timersActions_;
    }
  ));

  describe('complete timer effect', () => {
    it('should complete timer when finished', (done) => {
      runner.queue(timersActions.addTimer(new Timer(0, new Date())));

      timersEffects.effectCompleteTimer.subscribe(result => {
        expect(result).toEqual(jasmine.objectContaining({
          type: TimersActions.COMPLETED,
          payload: jasmine.objectContaining({
            duration: 0
          })
        }));
        done();
      });
    });

    it('should complete first timer when finished and next has started', (done) => {
      runner.queue(timersActions.addTimer(new Timer(1, new Date())));
      runner.queue(timersActions.addTimer(new Timer(2, new Date())));

      timersEffects.effectCompleteTimer.take(1).subscribe(result => {
        expect(result).toEqual(jasmine.objectContaining({
          type: TimersActions.COMPLETED,
          payload: jasmine.objectContaining({
            duration: 1
          })
        }));
        done();
      });
    });
  });
});
