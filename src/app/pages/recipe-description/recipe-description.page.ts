import {ChangeDetectionStrategy, Component} from "@angular/core";
import {Recipe} from "../../models/Recipe";
import {NavController, NavParams} from "ionic-angular";
import {Observable} from "rxjs";
import {RecipeService} from "../../services/recipe-service";
import {RecipeIngredientsPage} from "../recipe-ingredients/recipe-ingredients.page";

@Component({
  templateUrl: 'recipe-description.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDescriptionPage {

  recipe: Observable<Recipe>;

  constructor(private $nav: NavController, params: NavParams, recipeService: RecipeService) {
    recipeService.loadRecipe(params.get('recipeId'));
    this.recipe = recipeService.selectedRecipe;
  }

  next() {
    this.$nav.push(RecipeIngredientsPage);
  }

  getMessageToShare(recipe: Recipe) {
    return 'What do you think of: ' + recipe.name + '?';
  }

  getImageToShare(recipe: Recipe) {
  }

  getUrlToShare(recipe: Recipe) {
    return 'cooking://test-me';
  }
}
