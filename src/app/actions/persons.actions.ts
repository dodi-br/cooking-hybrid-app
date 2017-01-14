import {Injectable} from "@angular/core";
import {Action} from "@ngrx/store";

@Injectable()
export class PersonsActions {

  static SELECT = 'Persons:Select';
  selectAmount(amount: number): Action {
    return {
      type: PersonsActions.SELECT,
      payload: amount
    }
  }
}
