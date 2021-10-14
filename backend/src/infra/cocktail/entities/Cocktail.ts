import { Ingredient } from "./Ingredient";

export interface Cocktail {
  id: string;
  name: string;
  instructions: string;
  glass: string;
  thumbnailUrl: string;
  ingredients: Ingredient[];
}
