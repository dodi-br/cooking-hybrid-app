import {Component} from "@angular/core";
import {StepsPage} from "./steps.page";
import {NavParams, ViewController} from "ionic-angular";

@Component({
  templateUrl: 'timer-steps.html'
})
export class TimerStepsPage extends StepsPage {

  constructor($navParams: NavParams, private viewController: ViewController) {
    super($navParams);
  }

  complete() {
    this.viewController.dismiss();
  }
}
