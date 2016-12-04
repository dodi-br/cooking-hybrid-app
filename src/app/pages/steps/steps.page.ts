import {NavParams} from "ionic-angular";
import {Step} from "../../models/Step";
import {Recipe} from "../../models/Recipe";

export abstract class StepsPage {
  recipe: Recipe;
  persons: Number;
  steps: Array<Step>;
  stepNum: number;
  step: Step;

  constructor(protected $navParams: NavParams) {
    this.recipe = $navParams.get('recipe');
    this.steps = $navParams.get('steps');
    this.stepNum = $navParams.get('stepNum') || 0;
    this.persons = $navParams.get('persons');
    this.step = this.steps[this.stepNum];
  }

  hasNext() {
    return  !this.isLastStep() && !this.canComplete();
  }

  hasPrevious() {
    return !this.isFirstStep();
  }

  canComplete() {
    return this.isLastStep();
  }

  previous() {
    if (!this.hasPrevious()) {
      throw "No previous"
    }

    this.stepNum--;
    this.step = this.steps[this.stepNum];
  }

  next() {
    if (!this.hasNext()) {
      throw "No next";
    }

    this.stepNum++;
    this.step = this.steps[this.stepNum];
  }

  abstract complete();

  private isLastStep() {
    return this.stepNum == this.steps.length - 1
  }

  private isFirstStep() {
    return this.stepNum === 0;
  }
}
