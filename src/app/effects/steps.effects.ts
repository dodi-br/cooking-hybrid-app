import {Injectable} from "@angular/core";
import {StepsService} from "../pages/steps2/steps.service";
import {TimersService} from "../pages/steps2/timers.service";

@Injectable()
export class StepsEffects {

  constructor(private stepsService: StepsService, private timersService: TimersService) {
    this.stepsService.currentStep
      .filter(step => step != null)
      .filter(step => stepsService.isTimedStep(step))
      .subscribe(step => timersService.startTimer(step.duration));
  }
}
