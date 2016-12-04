import {Ingredient} from "./Ingredient";
import {Step} from "./Step";

export enum RecipeCategory {
  FISH,
  MEAT,
  VEGETARIAN
}

export class Recipe {
  id: Number;
  name: String;
  category: RecipeCategory;
  version: String;
  subtitle: String;
  image: String;
  description: String;
  allowedPersons: [number, number];
  defaultNumberOfPersons: number;
  averageDuration: String;
  type: String;
  steps: Array<Step>;
  ingredients: { [s: string]: Ingredient; };
}
