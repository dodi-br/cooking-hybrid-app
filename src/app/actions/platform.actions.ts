import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";

@Injectable()
export class PlatformActions {

  static READY = 'Platform:Ready';
  ready(): Action {
    return {
      type: PlatformActions.READY
    }
  }
}
