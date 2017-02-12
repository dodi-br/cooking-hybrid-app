import {Amount} from "./Amount";

export class Step {
  id: number;
  action: string;
  type: string;
  description: string;
  image: string;
  duration: number;
  timerFinishedSteps: Step[];
  dependsOn: number[];
  ingredientId: string;
  amount: Amount;
}
