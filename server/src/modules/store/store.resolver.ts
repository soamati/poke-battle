import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../../types";
import { ItemStore, PokemonStore } from "./store.schema";

@Resolver()
export class StoreResolver {
  @Query(() => [PokemonStore])
  async pokemonStore(
    @Ctx() { pokemons }: Context,
    @Arg("skip", { defaultValue: 0 }) skip: number
  ): Promise<PokemonStore[]> {
    return pokemons.store(skip);
  }

  @Query(() => [ItemStore])
  async itemStore(
    @Ctx() { items }: Context,
    @Arg("skip", { defaultValue: 0 }) skip: number
  ): Promise<ItemStore[]> {
    return items.store(skip);
  }
}
