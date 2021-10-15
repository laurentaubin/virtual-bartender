import { Module } from "@nestjs/common";
import { CocktailController } from "./api/CocktailController";
import { CocktailRepository } from "./infra/CocktailRepository";
import { CocktailAssembler } from "./api/CocktailAssembler";

@Module({
  imports: [],
  controllers: [CocktailController],
  providers: [CocktailRepository, CocktailAssembler],
})
export class CocktailModule {}
