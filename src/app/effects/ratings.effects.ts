import {Injectable} from "@angular/core";
import {Effect, Actions} from "@ngrx/effects";
import {Observable} from "rxjs";
import {StepsActions} from "../actions/steps.actions";
import {LocalNotifications} from "@ionic-native/local-notifications";

const NOTIFICATION_DELAY = 1000 * 60 * 45;

@Injectable()
export class RatingssEffects {

  constructor(private actions: Actions, private localNotifications: LocalNotifications) {}

  /**
   * Will listen for StepsActions.COMPLETE.
   * Will schedule a local notification
   */
  @Effect({dispatch: false}) effectScheduleRatingNotification: Observable<any> = this.actions
    .ofType(StepsActions.COMPLETE)
    .do(() => {
      this.localNotifications.schedule({
        text: 'How was your meal?',
        at: new Date(new Date().getTime() + NOTIFICATION_DELAY),
        led: 'FF0000',
        sound: null
      });
    })
}
