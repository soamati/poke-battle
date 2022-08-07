import { Field, InputType, Int } from "type-graphql";

@InputType()
class ItemWithCount {
  @Field()
  itemId: number;

  @Field(() => Int)
  count: number;
}

@InputType()
export class BuyItemInput {
  @Field(() => [ItemWithCount])
  itemsWithCount: ItemWithCount[];
}
