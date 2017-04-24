import {Component, Input} from '@angular/core';
import {Recipe} from "../../models/Recipe";

@Component({
  selector: 'recipe-card',
  templateUrl: 'recipe-card.component.html'
})
export class RecipeCardComponent {
  @Input() recipe: Recipe;
}
