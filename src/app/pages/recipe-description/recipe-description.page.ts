import {ChangeDetectionStrategy, Component} from "@angular/core";
import {Recipe} from "../../models/Recipe";
import {NavController} from "ionic-angular";
import {Observable} from "rxjs";
import {RecipeService} from "../../services/recipe-service";
import "rxjs/add/operator/take";
import {SocialSharingService} from "../../services/social-sharing-service";
import {RecipeIngredientsPage} from "../recipe-ingredients/recipe-ingredients.page";

@Component({
  templateUrl: 'recipe-description.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDescriptionPage {

  recipe: Observable<Recipe>;
  whatsAppEnabled: Observable<boolean>;

  constructor(private $nav: NavController, private recipeService: RecipeService,
              private socialSharing: SocialSharingService) {
    this.recipe = recipeService.selectedRecipe;
    this.whatsAppEnabled = socialSharing.whatsAppEnabled;
  }

  next() {
    this.$nav.push(RecipeIngredientsPage);
  }

  shareRecipe() {
    this.recipe.take(1)
      .subscribe(recipe => this.socialSharing.shareViaWhatsApp(recipe.name, null, null));
  }
}
