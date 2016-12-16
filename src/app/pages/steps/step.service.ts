import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Step} from "../../models/Step";
import {Store} from '@ngrx/store';
import {AppStore} from "../../reducers/app.store";

@Injectable()
export class StepService {
  step: Observable<Step>;
  constructor(private store: Store<AppStore>) {
    this.step = store.select('step') as Observable<Step>;
  }
}
