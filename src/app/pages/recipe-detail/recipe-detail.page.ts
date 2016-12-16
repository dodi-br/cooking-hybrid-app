import { Component } from '@angular/core';
import {Recipe} from "../../models/Recipe";
import {NavController} from "ionic-angular";
import {RootStepsPage} from "../steps/root-steps.page";
import {Observable} from "rxjs";
import {RecipeService} from "../../services/recipe-service";

@Component({
  templateUrl: 'recipe-detail.html'
})
export class RecipeDetailPage {
  recipe: Observable<Recipe>;
  numberOfPersons: String;

  constructor(private $nav: NavController, private recipeService: RecipeService) {
    this.recipe = recipeService.selectedRecipe;
    this.recipe.subscribe(recipe => this.numberOfPersons = String(recipe.defaultNumberOfPersons));
  }

  start() {
    this.$nav.setRoot(RootStepsPage, {
      recipe: this.recipe,
      //steps: this.recipe.steps,
      persons: this.numberOfPersons
    });
  }
}
