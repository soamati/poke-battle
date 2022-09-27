import { Battle, Winner } from "@prisma/client";
import { Field, ObjectType } from "type-graphql";
import { PokemonType } from "../pokemon/pokemon.schema";
import { UserType } from "../user/user.schema";

@ObjectType("Battle")
export class BattleType implements Partial<Battle> {
  @Field()
  id: number;

  @Field(() => UserType)
  user: UserType;

  @Field(() => PokemonType)
  selected: PokemonType;

  @Field(() => PokemonType)
  rival: PokemonType;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  winner: Winner;
}
