import {Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {Recipe} from '../../models/Recipe';
import {NavController} from 'ionic-angular';
import {Observable, Subject} from 'rxjs';
import {RecipeService} from '../../services/recipe-service';
import {StepsPage} from '../steps/steps.page';
import {StepsService} from '../steps/steps.service';
import 'rxjs/add/operator/take';
import {PersonsService} from '../../services/persons-service';

@Component({
  templateUrl: 'recipe-ingredients.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeIngredientsPage implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  recipe: Observable<Recipe>;
  numberOfPersons: string;

  constructor(private $nav: NavController, private recipeService: RecipeService,
              private stepsService: StepsService, private personsService: PersonsService) {
    this.recipe = recipeService.selectedRecipe;
  }

  ngOnInit() {
    this.recipe
      .takeUntil(this.ngUnsubscribe)
      .subscribe(recipe => this.numberOfPersons = String(recipe.defaultNumberOfPersons));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  start() {
    this.recipe.take(1)
      .do(recipe => this.stepsService.start(recipe.steps))
      .do(() => this.personsService.selectNumberOfPersons(Number(this.numberOfPersons)))
      .subscribe(() => this.$nav.setRoot(StepsPage));
  }
}
