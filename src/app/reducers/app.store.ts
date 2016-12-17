import {Recipe} from "../models/Recipe";
import {StepsState} from "./steps.reducer";

export interface AppStore {
  recipes: Recipe[],
  selectedRecipe: Recipe,
  steps: StepsState
}
