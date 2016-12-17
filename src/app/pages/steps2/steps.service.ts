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

@Injectable()
export class StepsService {
  steps: Observable<Step[]>;
  currentStep: Observable<Step>;
  nextStep: Observable<Step>;
  previousStep: Observable<Step>;

  constructor(private store: Store<AppStore>, private stepsActions: StepsActions) {
    this.steps = store.select(state => state.steps.all);
    this.currentStep = store.select(state => state.steps.currentStep);
    this.nextStep = store.select(state => state.steps.nextStep);
    this.previousStep = store.select(state => state.steps.previousStep);
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
}
