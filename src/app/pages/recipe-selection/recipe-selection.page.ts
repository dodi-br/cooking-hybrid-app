import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RecipeDetailPage} from "../recipe-detail/recipe-detail.page";
import {Recipe} from "../../models/Recipe";
import {RecipeService} from "../../services/recipe-service";
import {Observable} from "rxjs";

@Component({
  templateUrl: 'recipe-selection.html'
})
export class RecipeSelectionPage {

  dailyRecipes: Observable<Recipe[]>;

  constructor(private $nav: NavController, private recipeService: RecipeService) {
    this.dailyRecipes = recipeService.recipes;
  }

  navigateToRecipeDetail(recipe) {
    this.recipeService.selectRecipe(recipe);
    this.$nav.push(RecipeDetailPage);
  }

  refreshRecipes(refresher) {
    this.recipeService.loadRecipes();
    this.dailyRecipes.subscribe(recipes => refresher.complete());
  }
}
