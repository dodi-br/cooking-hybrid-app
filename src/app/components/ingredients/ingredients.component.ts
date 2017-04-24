import {Component, Input} from "@angular/core";
import {Recipe} from "../../models/Recipe";

@Component({
  selector: 'ingredients',
  templateUrl: 'ingredients.component.html'
})
export class IngredientsComponent {
  @Input() persons: number;
  @Input() recipe: Recipe
}
