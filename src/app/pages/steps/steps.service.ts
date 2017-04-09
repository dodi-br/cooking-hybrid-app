import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Step} from "../../models/Step";
import {Store} from "@ngrx/store";
import {AppStore} from "../../reducers/app.store";
import {StepsActions} from "../../actions/steps.actions";

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import {TimersService} from "./timers.service";

@Injectable()
export class StepsService {
  steps: Observable<Step[]>;
  currentStep: Observable<Step>;
  nextStep: Observable<Step>;
  previousStep: Observable<Step>;

  hasNext: Observable<boolean>;
  hasPrevious: Observable<boolean>;
  canComplete: Observable<boolean>;

  startTime: Observable<Date>;

  constructor(private store: Store<AppStore>, private stepsActions: StepsActions, private timersService: TimersService) {
    this.steps = store.select(state => state.steps.all);
    this.currentStep = store.select(state => state.steps.currentStep)
      .filter(step => step != null);
    this.nextStep = store.select(state => state.steps.nextStep);
    this.previousStep = store.select(state => state.steps.previousStep);

    this.startTime = store.select(state => state.steps.startTime);

    this.hasNext = Observable.combineLatest(
      this.currentStep,
      this.nextStep,
      timersService.runningTimers
    )
      .map(([currentStep, nextStep, runningTimers]) =>
        nextStep != null && this.depends(currentStep.dependsOn, runningTimers.map(timer => timer.model.id))
      );

    this.hasPrevious = this.previousStep.map(previous => previous != null);

    this.canComplete = Observable.combineLatest(
      this.nextStep.map(step => step != null),
      timersService.runningTimers
    ).map(([hasNext, runningTimers]) => !hasNext && runningTimers.length === 0);
  }

  private depends(currentDependsOn: Array<number> = [], runningStepIds: Array<number>): boolean {
    return currentDependsOn.every(depends => !runningStepIds.includes(depends));
  }

  start(steps: Step[]) {
    this.store.dispatch(this.stepsActions.start(steps));
  }

  previous() {
    const obs =  this.previousStep.take(1)
      .flatMap(step => step != null ? Observable.of(step) : Observable.throw('Unable to previous, no previous tasks'));

    obs.subscribe(step => this.store.dispatch(this.stepsActions.previousStep()));
    return obs;
  }

  next() {
    const obs =  this.nextStep.take(1)
      .flatMap(step => step != null ? Observable.of(step) : Observable.throw('Unable to next, no tasks left'));

    obs.subscribe(step => this.store.dispatch(this.stepsActions.nextStep()));
    return obs;
  }

  complete() {
    const obs =  this.nextStep.take(1)
      .flatMap(step => step == null ? Observable.of(step) : Observable.throw('Unable to complete, there are still steps left'));

    obs.subscribe(step => this.store.dispatch(this.stepsActions.complete()));
    return obs;
  }

  isTimedStep(step: Step) {
    return step.type === 'timed';
  }
}
