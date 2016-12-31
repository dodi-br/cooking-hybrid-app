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

  constructor(private store: Store<AppStore>, private stepsActions: StepsActions, private timersService: TimersService) {
    this.steps = store.select(state => state.steps.all);
    this.currentStep = store.select(state => state.steps.currentStep);
    this.nextStep = store.select(state => state.steps.nextStep);
    this.previousStep = store.select(state => state.steps.previousStep);

    this.hasNext = Observable.combineLatest(
      this.currentStep,
      this.nextStep,
      timersService.runningTimers
    )
      .map(([currentStep, nextStep, runningTimers]) => [currentStep.dependsOn, nextStep, runningTimers.map(timer => timer.model.id)])
      .map(([currentDependsOn, nextStep, runningStepIds]) => nextStep != null && (currentDependsOn || []).every(depends => !runningStepIds.includes(depends)));

    this.hasPrevious = this.previousStep.map(previous => previous != null);

    this.canComplete = Observable.combineLatest(
      this.nextStep.map(step => step != null),
      timersService.runningTimers
    ).map(([hasNext, runningTimers]) => !hasNext && runningTimers.length === 0);
  }

  load(steps: Step[]) {
    this.store.dispatch(this.stepsActions.loadSteps(steps));
  }

  previous() {
    let obs =  this.previousStep.take(1)
      .filter(step => step != null);

    obs.subscribe(step => this.store.dispatch(this.stepsActions.previousStep()));
    return obs;
  }

  next() {
    let obs =  this.nextStep.take(1)
      .filter(step => step != null);

    obs.subscribe(step => this.store.dispatch(this.stepsActions.nextStep()));
    return obs;
  }

  complete() {
    let obs =  this.nextStep.take(1)
      .filter(step => step == null);

    //obs.subscribe(step => this.store.dispatch(this.stepsActions.previousStep()));
    return obs;
  }

  isTimedStep(step: Step) {
    return step.type === 'timed';
  }
}
