import { ActionReducer } from '@ngrx/store';
import {Recipe} from "../models/Recipe";

export const LOAD = 'LOAD';

export const recipesReducer: ActionReducer<Recipe[]> = (state: Recipe[], {type, payload}) => {
  switch (type) {
    case LOAD:
      return payload;

    default:
      return state;
  }
};
