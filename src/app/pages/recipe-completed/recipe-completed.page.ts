import { Component } from '@angular/core';
import {Recipe} from "../../models/Recipe";
import {NavController} from "ionic-angular";
import {Platform} from 'ionic-angular';
import {RecipeSelectionPage} from "../recipe-selection/recipe-selection.page";
import {RecipeService} from "../../services/recipe-service";
import {Observable} from "rxjs";

@Component({
  templateUrl: 'recipe-completed.html'
})
export class RecipeCompletedPage {
  recipe: Observable<Recipe>;

  constructor(private $platform: Platform, private $navController: NavController, private recipesService: RecipeService) {
    this.$platform = $platform;
    this.recipe = recipesService.selectedRecipe;
  }

  exitApp() {
    this.$platform.exitApp();
  }

  home() {
    this.recipesService.deselectRecipe();
    this.$navController.setRoot(RecipeSelectionPage);
  }
}
