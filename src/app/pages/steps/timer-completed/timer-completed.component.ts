import {Component} from "@angular/core";
import {ViewController, NavParams} from "ionic-angular";
import {Step} from "../../../models/Step";

@Component({
  selector: 'timer-completed',
  templateUrl: 'timer-completed.html'
})
export class TimerCompletedComponent {

  private currentStepId;

  completedStep: Step;
  currentStep: Step;

  hasNext: boolean;
  hasPrevious: boolean;
  canComplete: boolean;

  constructor(private viewController: ViewController, private navParams: NavParams) {
    this.completedStep = navParams.get('completedStep');
    this.currentStepId = 0;
    this.updateState();
  }

  previous() {
    this.currentStepId = Math.max(0, this.currentStepId - 1);
    this.updateState();
  }

  next() {
    this.currentStepId = Math.min(this.completedStep.timerFinishedSteps.length - 1, this.currentStepId + 1);
    this.updateState();
  }

  complete() {
    this.viewController.dismiss();
  }

  private updateState() {
    this.currentStep = this.completedStep.timerFinishedSteps[this.currentStepId];
    this.hasNext = this.currentStepId < this.completedStep.timerFinishedSteps.length - 1;
    this.hasPrevious = this.currentStepId > 0;
    this.canComplete = this.currentStepId === this.completedStep.timerFinishedSteps.length - 1;
  }
}
