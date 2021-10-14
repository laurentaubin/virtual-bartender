import { Controller, Get, Query } from "@nestjs/common";
import { CocktailRepository } from "src/infra/cocktail/CocktailRepository";
import { CocktailAssembler } from "./cocktail/CocktailAssembler";
import { CocktailPreviewDto } from "./cocktail/CocktailPreviewDto";

@Controller("cocktails")
export class CocktailController {
  constructor(
    private readonly cocktailRepository: CocktailRepository,
    private readonly cocktailAssembler: CocktailAssembler,
  ) {}

  @Get()
  getPossibleCocktails(@Query() ingredients: string[]): CocktailPreviewDto[] {
    const cocktails =
      this.cocktailRepository.findPossibleCocktails(ingredients);
    return cocktails.map((cocktail) =>
      this.cocktailAssembler.assemble(cocktail),
    );
  }
}
