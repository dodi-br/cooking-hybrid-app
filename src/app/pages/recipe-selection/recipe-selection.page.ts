import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RecipeDetailPage} from "../recipe-detail/recipe-detail.page";
import {Recipe} from "../../models/Recipe";
import {RecipeService} from "../../services/recipe-service";

@Component({
  templateUrl: 'recipe-selection.html'
})
export class RecipeSelectionPage {

  dailyRecipes: Recipe[];

  constructor(private $nav: NavController, private recipeService: RecipeService) {
    this.recipeService.getDailyRecipes().subscribe(recipes => this.dailyRecipes = recipes);
  }

  navigateToRecipeDetail(recipe) {
    this.$nav.push(RecipeDetailPage, {
      recipe: recipe
    });
  }

  refreshRecipes() {

  }
}
