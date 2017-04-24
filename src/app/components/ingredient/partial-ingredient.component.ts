import {Component, Input} from "@angular/core";
import {IngredientComponent} from "./ingredient.component";
import {Amount} from "../../models/Amount";

@Component({
  selector: 'partial-ingredient',
  templateUrl: 'ingredient.component.html'
})
export class PartialIngredientComponent extends IngredientComponent {

  @Input() amountMultiplicity: Amount;

  ngOnChanges() {
    super.ngOnChanges();

    if (this.amount && this.amountMultiplicity) {
      if (this.amountMultiplicity.type === 'absolute') {
        if (this.amountMultiplicity.value > 0) {
          this.amount = this.amountMultiplicity.value;
        } else {
          this.amount = this.amount + this.amountMultiplicity.value;
        }
      }
    }
  }
}
