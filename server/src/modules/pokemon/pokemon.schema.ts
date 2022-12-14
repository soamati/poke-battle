import { Pokemon } from "@prisma/client";
import { Field, ObjectType } from "type-graphql";
import { Paginated } from "../../types";

@ObjectType("Pokemon")
export class PokemonType implements Partial<Pokemon> {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  attack: number;

  @Field()
  defense: number;

  @Field()
  health: number;

  @Field()
  image: string;
}

@ObjectType()
export class PokedexItem {
  @Field(() => PokemonType)
  pokemon: PokemonType;

  @Field()
  luck: number;
}

@ObjectType("PaginatedPokemon")
export class PaginatedPokemon extends Paginated {
  @Field(() => [PokemonType])
  results: PokemonType[];
}
