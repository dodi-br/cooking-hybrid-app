import {Injectable} from "@angular/core";
import "rxjs/add/operator/take";
import "rxjs/add/operator/publish";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/do";
import "rxjs/add/operator/share";
import {Timer} from "../../models/Timer";
import {Store} from "@ngrx/store";
import {AppStore} from "../../reducers/app.store";
import {TimersActions} from "../../actions/timers.actions";
import {Observable} from "rxjs";

@Injectable()
export class TimersService {
  runningTimers: Observable<Timer[]>;

  constructor(private store: Store<AppStore>, private timersAction: TimersActions) {
    this.runningTimers = store.select(state => state.timers.running)
  }

  startTimer(duration: number) {
    const timer = new Timer(duration, new Date());
    this.store.dispatch(this.timersAction.addTimer(timer));

    Observable.timer(duration * 1000)
      .subscribe(() => this.timersAction.completeTimer(timer));
  }
}
