import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class HealthCheck {
  @Field()
  status!: string;
}