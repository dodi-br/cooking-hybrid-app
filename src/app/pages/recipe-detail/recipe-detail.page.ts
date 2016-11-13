import { Component } from '@angular/core';
import {Recipe} from "../../models/Recipe";
import {NavParams, NavController} from "ionic-angular/index";
import {RootStepsPage} from "../steps/steps.page";

@Component({
  templateUrl: 'recipe-detail.html'
})
export class RecipeDetailPage {
  recipe: Recipe;
  numberOfPersons: String;

  constructor(private $nav: NavController, private $navParams: NavParams) {
    this.recipe = $navParams.get('recipe');
    this.numberOfPersons = String(this.recipe.defaultNumberOfPersons); // Required for ion-segment to work with default value
  }

  start() {
    this.$nav.setRoot(RootStepsPage, {
      recipe: this.recipe,
      steps: this.recipe.steps
    });
  }
}
