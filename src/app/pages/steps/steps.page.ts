import {Component} from "@angular/core";
import {NavController, ModalController} from "ionic-angular";
import {Observable} from "rxjs";
import {Step} from "../../models/Step";
import {StepsService} from "./steps.service";
import {ScreenService} from "../../services/screen-service";
import {RecipeCompletedPage} from "../recipe-completed/recipe-completed.page";
import {Timer} from "../../models/Timer";
import {TimersService} from "./timers.service";
import {TimerCompletedComponent} from "./timer-completed/timer-completed.component";

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
  completedTimers: Observable<Timer[]>;

  constructor(private $nav: NavController, private $modalController: ModalController, private screenService: ScreenService, private stepsService: StepsService, private timersService: TimersService) {
    this.assignFields();
    this.openModalOnFinishedTimer();
    this.screenService.keepAwake();
  }

  private assignFields() {
    this.currentStep = this.stepsService.currentStep;
    this.nextStep = this.stepsService.nextStep;
    this.previousStep = this.stepsService.previousStep;

    this.hasNext = this.nextStep.map(next => next != null);
    this.hasPrevious = this.previousStep.map(previous => previous != null);

    this.runningTimers = this.timersService.runningTimers;
    this.completedTimers = this.timersService.completedTimers;

    this.canComplete = Observable.combineLatest(
      this.hasNext,
      this.runningTimers
    ).map(([hasNext, runningTimers]) => !hasNext && runningTimers.length === 0);
  }

  private openModalOnFinishedTimer() {
    this.completedTimers
      .pairwise()
      .map(([oldTimers, newTimers]) => newTimers.filter(x => oldTimers.indexOf(x) < 0 ))
      .switchMap(arr => Observable.from(arr))
      .subscribe(timer => {
        let modal = this.$modalController.create(TimerCompletedComponent, {});
        modal.present();
      })
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
