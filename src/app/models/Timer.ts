import {Step} from "./Step";

export class Timer {
  public passed: number = 0;

  constructor(public duration: number, public started: Date, public step: Step, public stepNum: Number) {
  }

  timePassed(time: number) {
    this.passed += time;
  }
}
