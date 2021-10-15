import { Module } from "@nestjs/common";
import {
  DrivineModule,
  DrivineModuleOptions,
} from "@liberation-data/drivine/DrivineModule";
import { DatabaseRegistry } from "@liberation-data/drivine/connection/DatabaseRegistry";
import { CocktailModule } from "./cocktail/CocktailModule";

@Module({
  imports: [
    DrivineModule.withOptions(<DrivineModuleOptions>{
      connectionProviders: [DatabaseRegistry.buildOrResolveFromEnv()],
    }),
    CocktailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
