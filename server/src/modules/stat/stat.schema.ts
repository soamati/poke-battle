import { Stat } from "@prisma/client";
import { Field, ObjectType } from "type-graphql";

@ObjectType("Stat")
export class StatType implements Stat {
  @Field()
  id: number;

  @Field()
  name: string;
}
