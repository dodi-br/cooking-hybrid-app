import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Recipe} from "../../models/Recipe";

@Component({
  selector: 'recipe-selection',
  templateUrl: 'recipe-selection.component.html'
})
export class RecipeSelectionComponent {
  @Input() recipes: Recipe[];
  @Output() onSelect = new EventEmitter();

  select(recipe: Recipe) {
    this.onSelect.emit(recipe);
  }
}
