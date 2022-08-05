import { Arg, Ctx, Int, Query, Resolver, UseMiddleware } from "type-graphql";
import { CurrentUser } from "../../decorators/CurrentUser";
import { IsAuth } from "../../middlewares/IsAuth";
import { Context, CurrentUserType } from "../../types";
import { ItemStore, PokemonStore } from "./store.schema";

@Resolver()
export class StoreResolver {
  @UseMiddleware(IsAuth)
  @Query(() => [PokemonStore])
  async pokemonStore(
    @Ctx() { pokemons }: Context,
    @Arg("skip", () => Int, { defaultValue: 0 }) skip: number,
    @CurrentUser() user: CurrentUserType
  ): Promise<PokemonStore[]> {
    return pokemons.store(skip, user.id);
  }

  @Query(() => [ItemStore])
  async itemStore(
    @Ctx() { items }: Context,
    @Arg("skip", { defaultValue: 0 }) skip: number
  ): Promise<ItemStore[]> {
    return items.store(skip);
  }
}
