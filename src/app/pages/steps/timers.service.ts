import {Injectable} from "@angular/core";
import "rxjs/add/operator/take";
import "rxjs/add/operator/publish";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/do";
import "rxjs/add/operator/share";
import {Timer} from "../../models/Timer";
import {Store} from "@ngrx/store";
import {AppStore} from "../../reducers/app.store";
import {Observable} from "rxjs";
import {Step} from "../../models/Step";

@Injectable()
export class TimersService {
  /**
   * Timers that are still running, will emit if the array of running timers has changed
   */
  runningTimers: Observable<Timer<Step>[]>;

  /**
   * Timers that have been completed, will emit if the array of completed timers has changed
   */
  completedTimers: Observable<Timer<Step>[]>;

  /**
   * Will emit for every timer that completes
   */
  completedTimer: Observable<Timer<Step>>;

  constructor(private store: Store<AppStore>) {
    this.runningTimers = store.select(state => state.timers.running);
    this.completedTimers = store.select(state => state.timers.completed);

    this.completedTimer = this.completedTimers
      .pairwise()
      .map(([oldTimers, newTimers]) => newTimers.filter(x => oldTimers.indexOf(x) < 0))
      .switchMap(arr => Observable.from(arr));
  }
}
