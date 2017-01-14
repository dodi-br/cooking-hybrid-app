import {Recipe} from "../models/Recipe";
import {StepsState} from "./steps.reducer";
import {TimersState} from "./timers.reducer";

export interface AppStore {
  recipes: Recipe[],
  selectedRecipe: Recipe,
  steps: StepsState,
  timers: TimersState,
  numberOfPersons: number
}
