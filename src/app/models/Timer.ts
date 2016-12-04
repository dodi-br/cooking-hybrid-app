import {Step} from "./Step";

export class Timer {
  passed: number = 0;
  done: boolean = false;

  constructor(public duration: number, public started: Date, public step: Step, public stepNum: Number) {
  }

  timePassed(time: number) {
    this.passed += time;
  }
}
