import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { CurrentUser } from "../../decorators/CurrentUser";
import { IsAdmin } from "../../middlewares/IsAdmin";
import { IsAuth } from "../../middlewares/IsAuth";
import { Context, CurrentUserType } from "../../types";
import { BattleType } from "./battle.schema";

const CONTEMPLATED_ERRORS = {
  MUST_HAVE_WINNER: "La batalla debe tener un ganador",
  POKEMON_NOT_FOUND: "No se encontraron los Pokémon",
};

const WIN_REWARD = 500;

@InputType()
class BattleInput {
  @Field()
  selectedId: number;

  @Field()
  rivalId: number;

  @Field()
  winner: string;
}

@Resolver()
export class BattleResolver {
  @UseMiddleware(IsAuth)
  @Mutation(() => BattleType)
  async saveBattle(
    @Arg("data") { selectedId, rivalId, winner }: BattleInput,
    @CurrentUser() user: CurrentUserType,
    @Ctx() { prisma }: Context
  ): Promise<BattleType> {
    try {
      const [selected, rival] = await Promise.all([
        prisma.pokemon.findFirst({ where: { id: selectedId } }),
        prisma.pokemon.findFirst({ where: { id: rivalId } }),
      ]);

      if (!selected || !rival) {
        throw new Error(CONTEMPLATED_ERRORS.POKEMON_NOT_FOUND);
      }

      if (winner === "rival") {
        const deletePokemon = prisma.userPokemon.delete({
          where: {
            userId_pokemonId: {
              userId: user.id,
              pokemonId: selected.id,
            },
          },
        });
        const saveBattle = prisma.battle.create({
          data: {
            winner: "RIVAL",
            userId: user.id,
            selectedId,
            rivalId,
          },
          include: {
            user: true,
            selected: true,
            rival: true,
          },
        });
        const [_, battle] = await prisma.$transaction([
          deletePokemon,
          saveBattle,
        ]);

        return battle;
      }

      if (winner === "user") {
        const addPokemon = prisma.userPokemon.upsert({
          where: {
            userId_pokemonId: {
              userId: user.id,
              pokemonId: rival.id,
            },
          },
          create: {
            userId: user.id,
            pokemonId: rival.id,
          },
          update: {},
        });
        const addWallet = prisma.wallet.upsert({
          where: {
            userId: user.id,
          },
          create: { userId: user.id, amount: WIN_REWARD },
          update: { amount: { increment: WIN_REWARD } },
        });
        const saveBattle = prisma.battle.create({
          data: {
            winner: "USER",
            userId: user.id,
            selectedId,
            rivalId,
          },
          include: {
            user: true,
            selected: true,
            rival: true,
          },
        });
        const [_, __, battle] = await prisma.$transaction([
          addPokemon,
          addWallet,
          saveBattle,
        ]);

        return battle;
      }

      throw new Error(CONTEMPLATED_ERRORS.MUST_HAVE_WINNER);
    } catch (error: any) {
      if (!Object.values(CONTEMPLATED_ERRORS).includes(error.message)) {
        error.message = "No se pudo guardar la batalla";
      }
      throw error;
    }
  }

  @UseMiddleware(IsAuth)
  @Query(() => [BattleType])
  async battles(
    @CurrentUser() user: CurrentUserType,
    @Ctx() { prisma }: Context
  ) {
    try {
      const battles = await prisma.battle.findMany({
        where: { userId: user.id },
        include: { user: true, rival: true, selected: true },
        orderBy: { createdAt: "desc" },
      });
      return battles;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  @UseMiddleware(IsAdmin)
  @Query(() => [BattleType])
  allBattles(@Ctx() { prisma }: Context) {
    return prisma.battle.findMany({
      include: { user: true, selected: true, rival: true },
    });
  }
}
