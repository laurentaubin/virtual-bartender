import { Injectable } from "@nestjs/common";
import { Cocktail } from "./entities/Cocktail";

@Injectable()
export class CocktailRepository {
  findPossibleCocktails(ingredients: string[]): Cocktail[] {
    console.log(ingredients);
    return [
      {
        id: "manhattan",
        name: "Manhattan",
        thumbnailUrl:
          "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
        instructions: "Yeeeeet lol",
        glass: "Shot glass",
        ingredients: [
          {
            name: "Vodka",
            quantity: "1 oz",
          },
          {
            name: "Orange Juice",
            quantity: "1 fuckton",
          },
        ],
      },
    ];
  }
}
