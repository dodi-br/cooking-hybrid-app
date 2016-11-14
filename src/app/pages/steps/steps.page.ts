import { Component } from '@angular/core';
import {NavParams, NavController, ViewController} from "ionic-angular/index";
import {Step} from "../../models/Step";
import {Timer} from "../../models/Timer";
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import {RecipeCompletedPage} from "../recipe-completed/recipe-completed.page";
import {ScreenService} from "../../services/screen-service";
import { ModalController } from 'ionic-angular';

export abstract class StepsPage {
  steps: Array<Step>;
  stepNum: number;
  step: Step;

  constructor(protected $navParams: NavParams) {
    this.steps = $navParams.get('steps');
    this.stepNum = $navParams.get('stepNum') || 0;
    this.step = this.steps[this.stepNum];
  }

  hasNext() {
    return  !this.isLastStep() && !this.canBeCompleted();
  }

  canBeCompleted() {
    return this.isLastStep();
  }

  next() {
    if (!this.hasNext()) {
      throw "No next";
    }

    this.stepNum++;
    this.step = this.steps[this.stepNum];
  }

  abstract complete();

  private isLastStep() {
    return this.stepNum == this.steps.length - 1
  }
}

@Component({
  templateUrl: 'steps-with-timers.html'
})
export class RootStepsPage extends StepsPage {
  timers: Array<Timer> = [];

  constructor($navParams: NavParams, private $navController: NavController, private $modalController: ModalController, private screenService: ScreenService) {
    super($navParams);

    this.steps = $navParams.get('steps');
    this.stepNum = $navParams.get('stepNum') || 0;
    this.step = this.steps[this.stepNum];

    this.screenService.keepAwake();
  }

  hasNext() {
    let nextStep = this.steps[this.stepNum + 1];

    let result = super.hasNext() && !this.hasActiveDependingTimers(nextStep);
    if (result && RootStepsPage.isWaitStep(nextStep)) {
      result = this.hasActiveTimers();
    }
    return result;
  }

  private hasActiveDependingTimers(step: Step): boolean {
    let dependsOn = step.dependsOn || [];
    return dependsOn.some(num => this.timers.filter(timer => timer.stepNum == num).length > 0);
  }

  next() {
    if (!this.hasNext()) {
      throw "No next";
    }

    if (RootStepsPage.isTimedStep(this.step)) {
      let timer = new Timer(this.step.duration, new Date(), this.step, this.stepNum);
      this.timers.push(timer);

      this.startTimer(timer)
        .subscribe(() => void 0, () => void 0, () => this.timerFinished(timer));
    }

    super.next();
  }

  canComplete() {
    let isSecondLast = (array, index) => index == array.length - 2;
    let nextStep = this.steps[this.stepNum + 1];

    return (super.canBeCompleted() && !this.hasActiveTimers()) ||
      (isSecondLast(this.steps, this.stepNum) && RootStepsPage.isWaitStep(nextStep) && !this.hasActiveTimers());
  }

  complete()  {
    this.screenService.allowSleepAgain();
    this.$navController.setRoot(RecipeCompletedPage, {
      recipe: this.$navParams.get('recipe')
    });
  }

  private startTimer(timer: Timer): Observable<any> {
    return Observable.timer(1000, 1000)
      .take(timer.duration)
      .do(() => timer.timePassed(1));
  }

  private timerFinished(timer: Timer) {

    // Remove timer from timers array
    this.timers = this.timers.filter(t => t != timer);

    // Show popover
    if (timer.step.timerFinishedSteps && timer.step.timerFinishedSteps.length > 0) {
      let modal = this.$modalController.create(TimerStepsPage, {
        steps: timer.step.timerFinishedSteps
      });
      modal.present();
    }

    // Make some noice!
    // TODO
  }

  private hasActiveTimers() {
    return this.timers.length > 0;
  }

  private static isTimedStep(step: Step) {
    return step.type === 'timed';
  }

  private static isWaitStep(step: Step) {
    return step.type === 'wait';
  }
}

@Component({
  templateUrl: 'steps.html'
})
export class TimerStepsPage extends StepsPage {

  constructor($navParams: NavParams, private viewController: ViewController) {
    super($navParams);
  }

  complete() {
    this.viewController.dismiss();
  }
}
