import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {WindowRef} from "./window-ref";

@Injectable()
export class ScreenService {
  private window: any;

  constructor(private windowRef: WindowRef) {
    this.window = windowRef.nativeWindow;
  }

  allowSleepAgain() {
    if (this.window.plugins && this.window.plugins.insomnia) {
      this.window.plugins.insomnia.allowSleepAgain();
    }
  }

  keepAwake() {
    if (this.window.plugins && this.window.plugins.insomnia) {
      this.window.plugins.insomnia.keepAwake();
    }
  }
}
