import {Ingredient} from "./Ingredient";
import {Step} from "./Step";

export enum RecipeCategory {
  FISH,
  MEAT,
  VEGETARIAN
}

export class Recipe {
  id: number;
  name: string;
  category: RecipeCategory;
  version: string;
  subtitle: string;
  image: string;
  description: string;
  allowedPersons: [number, number];
  defaultNumberOfPersons: number;
  averageDuration: string;
  type: string;
  steps: Array<Step>;
  ingredients: { [s: string]: Ingredient; };
}
