import { HealthCheck } from "../dto/HealthCheck";
import { Query, Resolver } from "type-graphql";

@Resolver((_of) => HealthCheck)
export class HealthCheckResolver {
  @Query(() => HealthCheck)
  healthcheck(): HealthCheck {
    const healtCheck = new HealthCheck();
    healtCheck.status = "Healthy";
    return healtCheck;
  }
}
