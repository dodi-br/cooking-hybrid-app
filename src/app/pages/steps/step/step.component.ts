import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Step} from "../../../models/Step";
import {Ingredient} from "../../../models/Ingredient";

@Component({
  selector: 'step',
  templateUrl: 'step.html'
})
export class StepComponent {
  @Input() amount: Number;
  @Input() persons: Number;
  @Input() ingredient: Ingredient;
  @Input() step: Step;
  
  @Input() hasPrevious: boolean;
  @Input() hasNext: boolean;
  @Input() canComplete: boolean;

  @Output() onPrevious = new EventEmitter();
  @Output() onNext = new EventEmitter();
  @Output() onComplete = new EventEmitter();

  previous() {
    this.onPrevious.emit();
  }
  
  next() {
    this.onNext.emit();
  }

  complete() {
    this.onComplete.emit();
  }
}
