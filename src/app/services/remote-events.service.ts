import {Injectable} from "@angular/core";
import {JsonHttp} from "./json-http.service";
import {Recipe} from "../models/Recipe";
import {UniqueDeviceID} from '@ionic-native/unique-device-id';
import {Observable} from "rxjs/Observable";
import {SessionService} from "./session.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Device} from '@ionic-native/device';

import moment from 'moment';

const EVENT_TYPE_START_RECIPE = 'StartRecipe';
const EVENT_TYPE_COMPLETE_RECIPE = 'CompleteRecipe';

@Injectable()
export class RemoteEventsService {

  private sessionId: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private jsonHttp: JsonHttp, private device: Device, private sessionService: SessionService) {
    sessionService.sessionId.subscribe(this.sessionId);
  }

  startRecipe(recipe: Recipe) {
    return this.postEvent(EVENT_TYPE_START_RECIPE, {
      recipe: recipe.id
    });
  }

  completeRecipe(recipe: Recipe) {
    return this.postEvent(EVENT_TYPE_COMPLETE_RECIPE, {
      recipe: recipe.id
    });
  }

  private deviceId() {
    return Observable.of(this.device.uuid);
  }

  private postEvent(eventType: String, params: Object) {
    return this.deviceId()
      .map(deviceId => Object.assign({}, params, {
        type: eventType,
        time: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
        deviceId: deviceId,
        sessionId: this.sessionId.getValue()
      }))
      .switchMap(event => this.jsonHttp.post('/events', event))
      .onErrorResumeNext();
  }
}
