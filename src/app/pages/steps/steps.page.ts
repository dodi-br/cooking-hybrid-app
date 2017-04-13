import {Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {Observable, Subject} from 'rxjs';
import {Step} from '../../models/Step';
import {StepsService} from './steps.service';
import {ScreenService} from '../../services/screen-service';
import {RecipeCompletedPage} from '../recipe-completed/recipe-completed.page';
import {Timer} from '../../models/Timer';
import {TimersService} from './timers.service';
import {TimerCompletedComponent} from './timer-completed/timer-completed.component';
import {RecipeService} from '../../services/recipe-service';
import {Ingredient} from '../../models/Ingredient';
import {PersonsService} from '../../services/persons-service';
import {Amount} from '../../models/Amount';

@Component({
  templateUrl: 'steps.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepsPage implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  // Recipe
  currentIngredient: Observable<Ingredient>;
  currentIngredientAmount: Observable<Amount>;

  // Steps
  currentStep: Observable<Step>;
  hasNext: Observable<boolean>;
  hasPrevious: Observable<boolean>;
  canComplete: Observable<boolean>;

  // Timers
  runningTimers: Observable<Timer<Step>[]>;

  // Persons
  numberOfPersons: Observable<number>;

  constructor(
    private $nav: NavController,
    private $modalController: ModalController,
    private screenService: ScreenService,
    private stepsService: StepsService,
    private timersService: TimersService,
    private recipeService: RecipeService,
    private personsService: PersonsService) {
  }

  ngOnInit() {
    this.assignFields();
    this.openModalOnFinishedTimer();

    this.screenService.keepAwake();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private assignFields() {
    this.currentStep = this.stepsService.currentStep;

    this.hasNext = this.stepsService.hasNext;
    this.hasPrevious = this.stepsService.hasPrevious;
    this.canComplete = this.stepsService.canComplete;

    this.runningTimers = this.timersService.runningTimers;

    this.numberOfPersons = this.personsService.numberOfPersons;

    // Calculated
    this.currentIngredient = Observable.combineLatest(
      this.recipeService.selectedRecipe,
      this.currentStep,
    )
      .filter(([recipe, step]) => step != null && step.ingredientId != null && recipe.ingredients[step.ingredientId] != null)
      .map(([recipe, step]) => recipe.ingredients[step.ingredientId]);

    this.currentIngredientAmount = this.currentStep
      .map(step => step.amount);
  }

  private openModalOnFinishedTimer() {
    this.timersService.completedTimer
      .takeUntil(this.ngUnsubscribe)
      .subscribe(timer => {
        const modal = this.$modalController.create(TimerCompletedComponent, {
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
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        this.screenService.allowSleepAgain();
    });
    this.$nav.setRoot(RecipeCompletedPage);
  }
}
