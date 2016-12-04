import {Amount} from "./Amount";

export class Step {
  id: Number;
  action: String;
  type: String;
  description: String;
  image: String;
  duration: number;
  timerFinishedSteps: Array<Step>;
  dependsOn: Array<any>;
  ingredientId: String;
  amount: Amount;
}
