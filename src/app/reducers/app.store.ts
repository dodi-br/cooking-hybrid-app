import {Recipe} from "../models/Recipe";

export interface AppStore {
  recipes: Recipe[],
  selectedRecipe: Recipe
}
