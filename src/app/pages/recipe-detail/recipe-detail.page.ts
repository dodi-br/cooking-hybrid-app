import { Component } from '@angular/core';
import {Recipe} from "../../models/Recipe";
import {NavParams, NavController} from "ionic-angular";
import {RootStepsPage} from "../steps/root-steps.page";

@Component({
  templateUrl: 'recipe-detail.html'
})
export class RecipeDetailPage {
  recipe: Recipe;
  numberOfPersons: String;

  constructor(private $nav: NavController, private $navParams: NavParams) {
    this.recipe = $navParams.get('recipe');
    this.numberOfPersons = String(this.recipe.defaultNumberOfPersons); // String required for ion-segment to work with default value
  }

  start() {
    this.$nav.setRoot(RootStepsPage, {
      recipe: this.recipe,
      steps: this.recipe.steps,
      persons: this.numberOfPersons
    });
  }
}
