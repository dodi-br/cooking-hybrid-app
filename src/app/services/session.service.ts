import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SessionService {

  sessionId: Observable<string>;

  constructor(private store: Store<any>) {
    this.sessionId = store.select(state => state.sessionId);
  }
}
