import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";

@Component({
  selector: 'timer-completed',
  templateUrl: 'timer-completed.html'
})
export class TimerCompletedComponent {

  constructor(private viewController: ViewController) {}

  complete() {
    this.viewController.dismiss();
  }
}
