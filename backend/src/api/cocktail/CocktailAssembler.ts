import { Injectable } from "@nestjs/common";
import { Cocktail } from "src/infra/cocktail/entities/Cocktail";
import { CocktailPreviewDto } from "./CocktailPreviewDto";

@Injectable()
export class CocktailAssembler {
  assemble(cocktail: Cocktail): CocktailPreviewDto {
    return {
      name: cocktail.name,
      thumbnailUrl: cocktail.thumbnailUrl,
    };
  }
}
