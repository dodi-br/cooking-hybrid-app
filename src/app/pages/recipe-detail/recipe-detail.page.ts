import {Component} from "@angular/core";
import {Recipe} from "../../models/Recipe";
import {NavController} from "ionic-angular";
import {Observable} from "rxjs";
import {RecipeService} from "../../services/recipe-service";
import {StepsPage} from "../steps/steps.page";
import {StepsService} from "../steps/steps.service";
import "rxjs/add/operator/take";
import {PersonsService} from "../../services/persons-service";
import {SocialSharingService} from "../../services/social-sharing-service";

@Component({
  templateUrl: 'recipe-detail.html'
})
export class RecipeDetailPage {
  recipe: Observable<Recipe>;
  numberOfPersons: string;
  whatsAppEnabled: Observable<boolean>;

  constructor(private $nav: NavController, private recipeService: RecipeService,
              private stepsService: StepsService, private personsService: PersonsService,
              private socialSharing: SocialSharingService) {
    this.recipe = recipeService.selectedRecipe;
    this.recipe.subscribe(recipe => this.numberOfPersons = String(recipe.defaultNumberOfPersons));

    this.whatsAppEnabled = socialSharing.whatsAppEnabled;
  }

  start() {
    this.recipe.take(1)
      .do(recipe => this.stepsService.start(recipe.steps))
      .do(() => this.personsService.selectNumberOfPersons(Number(this.numberOfPersons)))
      .subscribe(() => this.$nav.setRoot(StepsPage));
  }

  shareRecipe() {
    this.recipe.take(1)
      .subscribe(recipe => this.socialSharing.shareViaWhatsApp(recipe.name, recipe.image, null));
  }
}
