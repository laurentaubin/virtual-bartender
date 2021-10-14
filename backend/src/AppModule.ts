import { Module } from "@nestjs/common";
import { CocktailAssembler } from "./api/cocktail/CocktailAssembler";
import { CocktailController } from "./api/CocktailController";
import { CocktailRepository } from "./infra/cocktail/CocktailRepository";

@Module({
  imports: [],
  controllers: [CocktailController],
  providers: [CocktailRepository, CocktailAssembler],
})
export class AppModule {}
