import { Component } from '@angular/core';
import {Recipe} from "../../models/Recipe";
import {NavParams, NavController} from "ionic-angular/index";
import {Platform} from 'ionic-angular';
import {RecipeSelectionPage} from "../recipe-selection/recipe-selection.page";

@Component({
  templateUrl: 'recipe-completed.html'
})
export class RecipeCompletedPage {
  recipe: Recipe;

  constructor(private $platform: Platform, private $navParams: NavParams, private $navController: NavController) {
    this.$platform = $platform;
    this.recipe = $navParams.get('recipe');
  }

  exitApp() {
    this.$platform.exitApp();
  }
  
  home() {
    this.$navController.setRoot(RecipeSelectionPage);
  }
}
