import { PrismaClient, User } from "@prisma/client";
import { ContextFunction } from "apollo-server-core";
import { ExpressContext } from "apollo-server-express";
import { verify } from "jsonwebtoken";
import { ItemService } from "../modules/item/item.service";
import { PokemonService } from "../modules/pokemon/pokemon.service";
import { StatService } from "../modules/stat/stat.service";
import { TokenPayload } from "../types";

type Services = {
  stats: StatService;
  items: ItemService;
  pokemons: PokemonService;
};

export function createContext(
  prisma: PrismaClient,
  services: Services
): ContextFunction {
  return async (context: ExpressContext) => {
    const { req, res } = context;

    const token = req.cookies["poke-token"];
    let user: User | null = null;

    if (token) {
      try {
        const { id } = verify(
          token,
          process.env.SECRET as string
        ) as TokenPayload;

        user = await prisma.user.findFirst({
          where: { id },
          include: { wallet: true },
        });
      } catch (error) {
        console.log(error);
      }
    }

    return { req, res, prisma, user, ...services };
  };
}
