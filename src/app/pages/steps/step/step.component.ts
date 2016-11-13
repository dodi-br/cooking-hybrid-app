import { Component, Input } from '@angular/core';
import {Step} from "../../../models/Step";

@Component({
  selector: 'step',
  templateUrl: 'step.html'
})
export class StepComponent {
  @Input() step: Step;
}
