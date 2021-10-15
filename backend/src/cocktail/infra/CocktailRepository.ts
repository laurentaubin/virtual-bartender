import { Injectable } from "@nestjs/common";
import {
  CypherStatement,
  InjectCypher,
  InjectPersistenceManager,
  PersistenceManager,
  QuerySpecification,
} from "@liberation-data/drivine";
//import { Cocktail } from "./entities/Cocktail";

@Injectable()
export class CocktailRepository {
  constructor(
    @InjectPersistenceManager() readonly persistenceManager: PersistenceManager,
    @InjectCypher(`${__dirname}/queries`, "cocktailsWithIngredients")
    readonly moviesForActor: CypherStatement,
  ) {}

  findPossibleCocktails(ingredients: string[]): Promise<any[]> {
    const spec = new QuerySpecification()
      .withStatement(this.moviesForActor)
      .bind({ ingredients: ingredients });
    return this.persistenceManager.query(spec);
  }
}
