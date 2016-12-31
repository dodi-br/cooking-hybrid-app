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
  hasNext: Observable<boolean>;
  hasPrevious: Observable<boolean>;
  canComplete: Observable<boolean>;

  // Timers
  runningTimers: Observable<Timer<Step>[]>;
  completedTimers: Observable<Timer<Step>[]>;
  completedTimer: Observable<Timer<Step>>;

  constructor(private $nav: NavController, private $modalController: ModalController, private screenService: ScreenService, private stepsService: StepsService, private timersService: TimersService) {
    this.assignFields();
    this.openModalOnFinishedTimer();
    this.screenService.keepAwake();
  }

  private assignFields() {
    this.currentStep = this.stepsService.currentStep;

    this.hasNext = this.stepsService.hasNext;
    this.hasPrevious = this.stepsService.hasPrevious;

    this.runningTimers = this.timersService.runningTimers;
    this.completedTimers = this.timersService.completedTimers;
    this.completedTimer = this.timersService.completedTimer;

    this.canComplete = this.stepsService.canComplete;
  }

  private openModalOnFinishedTimer() {
    this.completedTimer
      .subscribe(timer => {
        let modal = this.$modalController.create(TimerCompletedComponent, {
          completedStep: timer.model
        }, {
          enableBackdropDismiss: false
        });
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
