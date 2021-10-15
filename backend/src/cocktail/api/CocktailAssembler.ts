import { Injectable } from "@nestjs/common";
import { Cocktail } from "src/cocktail/infra/entities/Cocktail";
import { CocktailPreviewDto } from "./dto/CocktailPreviewDto";

@Injectable()
export class CocktailAssembler {
  assemble(cocktail: Cocktail): CocktailPreviewDto {
    return {
      name: cocktail.name,
      thumbnailUrl: cocktail.thumbnailUrl,
    };
  }
}
