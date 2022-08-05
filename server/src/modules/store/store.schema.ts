import { Field, ObjectType } from "type-graphql";
import { ItemType } from "../item/item.schema";
import { PokemonType } from "../pokemon/pokemon.schema";

@ObjectType()
export class PokemonStore {
  @Field(() => PokemonType)
  pokemon: PokemonType;

  @Field()
  price: number;

  @Field()
  isOwned: boolean;
}

@ObjectType()
export class ItemStore {
  @Field(() => ItemType)
  item: ItemType;

  @Field()
  price: number;
}
