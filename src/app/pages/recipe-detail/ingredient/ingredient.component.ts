import { Component, Input } from '@angular/core';
import {Ingredient} from "../../../models/Ingredient";

@Component({
  selector: 'ingredient',
  templateUrl: 'ingredient.html'
})
export class IngredientComponent {

  @Input() persons: Number;
  @Input() ingredient: Ingredient;

  constructor() {
  }

  isUnit(ingredient: Ingredient) {
    return ingredient.type === 'unit';
  }

  isUnitless(ingredient: Ingredient) {
    return ingredient.type === 'unitless';
  }

  isMultiple(ingredient: Ingredient) {
    return ingredient.type === 'multiple';
  }
}
