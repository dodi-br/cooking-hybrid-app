import {Component} from "@angular/core";
import {Recipe} from "../../models/Recipe";
import {NavController} from "ionic-angular";
import {Observable} from "rxjs";
import {RecipeService} from "../../services/recipe-service";
import {StepsPage} from "../steps/steps.page";
import {StepsService} from "../steps/steps.service";
import "rxjs/add/operator/take";
import {PersonsService} from "../../services/persons-service";

@Component({
  templateUrl: 'recipe-detail.html'
})
export class RecipeDetailPage {
  recipe: Observable<Recipe>;
  numberOfPersons: String;

  constructor(private $nav: NavController, private recipeService: RecipeService,
              private stepsService: StepsService, private personsService: PersonsService) {
    this.recipe = recipeService.selectedRecipe;
    this.recipe.subscribe(recipe => this.numberOfPersons = String(recipe.defaultNumberOfPersons));
  }

  start() {
    this.recipe.take(1)
      .do(recipe => this.stepsService.load(recipe.steps))
      .do(() => this.personsService.selectNumberOfPersons(Number(this.numberOfPersons)))
      .subscribe(() => this.$nav.setRoot(StepsPage));
  }
}
