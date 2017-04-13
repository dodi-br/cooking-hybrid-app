import {Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {Timer} from '../../../models/Timer';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'timer',
  templateUrl: 'timer.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  @Input() timer: Timer<any>;

  timeLeft: number;

  ngOnInit() {
    Observable.timer(0, 1000)
      .map(t => this.timer.duration - (new Date().getTime()- this.timer.started.getTime()) / 1000)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(timeLeft => this.timeLeft = Math.round(timeLeft));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
