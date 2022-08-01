import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { CurrentUser } from "../../decorators/CurrentUser";
import { IsAuth } from "../../middlewares/IsAuth";
import { Context, CurrentUserType } from "../../types";
import { PokedexItem, PokemonType } from "./pokemon.schema";

@Resolver()
export class PokemonResolver {
  @Query(() => [PokemonType])
  pokemons(@Ctx() { pokemons }: Context) {
    return pokemons.find();
  }

  @UseMiddleware(IsAuth)
  @Query(() => [PokedexItem])
  pokedex(
    @Ctx() { pokemons }: Context,
    @CurrentUser() user: CurrentUserType,
    @Arg("id", { nullable: true }) id: number
  ) {
    return pokemons.findPokedex(id ?? user.id);
  }

  @UseMiddleware(IsAuth)
  @Mutation(() => PokemonType)
  async buyPokemon(
    @Arg("id") id: number,
    @Ctx() { pokemons, prisma }: Context,
    @CurrentUser() user: CurrentUserType
  ) {
    try {
      const pokemon = await pokemons.findById(id);

      if (!pokemon || !pokemon.stock) {
        throw new Error("No está a la venta");
      }

      if (pokemon.stock.price > user.wallet.amount) {
        throw new Error("No tenés suficientes Pokécoins");
      }

      const {
        wallet: { amount },
      } = user;
      const {
        stock: { price },
      } = pokemon;

      const updateWallet = prisma.wallet.update({
        data: { amount: amount - price },
        where: { userId: user.id },
      });

      const updatePokedex = prisma.userPokemon.create({
        data: { userId: user.id, pokemonId: pokemon.id },
      });

      await prisma.$transaction([updateWallet, updatePokedex]);

      return pokemon;
    } catch (error: any) {
      if (error.code === "P2002") {
        error.message = "Ya está en tu Pokédex";
      }
      throw error;
    }
  }
}
