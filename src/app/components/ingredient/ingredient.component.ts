import {Component, Input, OnChanges} from '@angular/core';
import {Ingredient} from "../../models/Ingredient";

@Component({
  selector: 'ingredient',
  templateUrl: 'ingredient.component.html'
})
export class IngredientComponent implements OnChanges {

  @Input() persons: number;
  @Input() ingredient: Ingredient;
  amount: number;

  ngOnChanges() {
    if (this.ingredient && !this.isUnitless()) {
      this.amount = this.ingredient.n * this.persons;
    }
  }

  useSingularPlural() {
    return this.isMultiple() || this.isNumberCategory();
  }

  showName() {
    return this.isUnit() || this.isNumberCategory();
  }

  isUnit() {
    return this.ingredient.type === 'unit';
  }

  isUnitless() {
    return this.ingredient.type === 'unitless';
  }

  isMultiple() {
    return this.ingredient.type === 'multiple';
  }

  isNumberCategory() {
    return this.ingredient.type === 'number-category';
  }
}
