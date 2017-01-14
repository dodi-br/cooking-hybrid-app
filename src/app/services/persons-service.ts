import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {PersonsActions} from "../actions/persons.actions";

@Injectable()
export class PersonsService {
  numberOfPersons: Observable<number>;

  constructor(private store: Store<any>, private personsActions: PersonsActions) {
    this.numberOfPersons = store.select(state => state.numberOfPersons);
  }

  public selectNumberOfPersons(amount: number) {
    this.store.dispatch(this.personsActions.selectAmount(amount));
  }
}
