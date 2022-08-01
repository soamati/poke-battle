import { Item, ItemMode } from "@prisma/client";
import { Field, ObjectType } from "type-graphql";
import { StatType } from "../stat/stat.schema";

@ObjectType("Item")
export class ItemType implements Partial<Item> {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field(() => ItemMode)
  mode: ItemMode;

  @Field()
  value: number;

  @Field(() => StatType)
  stat: StatType;
}
