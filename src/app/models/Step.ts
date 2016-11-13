
export enum StepType {
  SIMPLE,
  TIMED
}

export class Step {
  id: Number;
  action: String;
  type: String;
  description: String;
  image: String;
  duration: number;
  timerFinishedSteps: Array<Step>;
  dependsOn: Array<any>;
}
