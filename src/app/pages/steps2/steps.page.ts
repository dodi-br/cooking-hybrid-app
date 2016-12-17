import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {Observable} from "rxjs";
import {Step} from "../../models/Step";
import {StepsService} from "./steps.service";
import {ScreenService} from "../../services/screen-service";
import {RecipeCompletedPage} from "../recipe-completed/recipe-completed.page";
import {Timer} from "../../models/Timer";
import {TimersService} from "./timers.service";

@Component({
  templateUrl: 'steps.html'
})
export class StepsPage {
  // Steps
  currentStep: Observable<Step>;
  nextStep: Observable<Step>;
  previousStep: Observable<Step>;
  hasNext: Observable<boolean>;
  hasPrevious: Observable<boolean>;
  canComplete: Observable<boolean>;

  // Timers
  runningTimers: Observable<Timer[]>;

  constructor(private $nav: NavController, private screenService: ScreenService, private stepsService: StepsService, private timersService: TimersService) {
    this.currentStep = stepsService.currentStep;
    this.nextStep = stepsService.nextStep;
    this.previousStep = stepsService.previousStep;

    this.hasNext = this.nextStep.map(next => next != null);
    this.hasPrevious = this.previousStep.map(previous => previous != null);
    this.canComplete = this.hasNext.map(hasNext => !hasNext);

    this.runningTimers = timersService.runningTimers;

    this.screenService.keepAwake();
  }

  previous() {
    this.stepsService.previous();
  }

  next() {
    this.stepsService.next();
  }

  complete() {
    this.stepsService
      .complete()
      .subscribe(() => {
        this.screenService.allowSleepAgain();

        this.$nav.setRoot(RecipeCompletedPage);
    });
  }
}
