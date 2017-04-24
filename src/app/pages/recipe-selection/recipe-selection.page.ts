import {Component, ChangeDetectionStrategy} from '@angular/core';
import { NavController } from 'ionic-angular';
import {RecipeDescriptionPage} from "../recipe-description/recipe-description.page";
import {Recipe} from "../../models/Recipe";
import {RecipeService} from "../../services/recipe-service";
import {Observable} from "rxjs";

@Component({
  templateUrl: 'recipe-selection.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeSelectionPage {

  dailyRecipes: Observable<Recipe[]>;

  constructor(private $nav: NavController, private recipeService: RecipeService) {
    this.dailyRecipes = recipeService.recipes;
  }

  navigateToRecipeDetail(recipe) {
    this.recipeService.selectRecipe(recipe);
    this.$nav.push(RecipeDescriptionPage);
  }

  refreshRecipes(refresher) {
    this.recipeService.loadRecipes();
    this.dailyRecipes.subscribe(recipes => refresher.complete());
  }
}
