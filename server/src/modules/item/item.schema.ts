import { Item, ItemMode } from "@prisma/client";
import { Field, Int, ObjectType } from "type-graphql";
import { StatType } from "../stat/stat.schema";

@ObjectType("Item")
export class ItemType implements Partial<Item> {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field(() => String)
  mode: ItemMode;

  @Field()
  value: number;

  @Field(() => StatType)
  stat: StatType;
}

@ObjectType()
export class InventoryItem {
  @Field(() => ItemType)
  item: ItemType;

  @Field(() => Int)
  units: number;
}
