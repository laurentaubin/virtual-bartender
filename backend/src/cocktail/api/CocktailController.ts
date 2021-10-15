import { Controller, Get, Query } from "@nestjs/common";
import { CocktailRepository } from "src/cocktail/infra/CocktailRepository";
import { CocktailAssembler } from "./CocktailAssembler";
import { CocktailPreviewDto } from "./dto/CocktailPreviewDto";

@Controller("cocktails")
export class CocktailController {
  constructor(
    private readonly cocktailRepository: CocktailRepository,
    private readonly cocktailAssembler: CocktailAssembler,
  ) {}

  @Get()
  async getPossibleCocktails(
    @Query() ingredients: string[],
  ): Promise<CocktailPreviewDto[]> {
    const cocktails = await this.cocktailRepository.findPossibleCocktails(
      ingredients,
    );
    return cocktails.map((cocktail) =>
      this.cocktailAssembler.assemble(cocktail),
    );
  }
}
