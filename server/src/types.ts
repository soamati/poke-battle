import { PrismaClient, User, Wallet } from "@prisma/client";
import { Request, Response } from "express";
import { ItemService } from "./modules/item/item.service";
import { PokemonService } from "./modules/pokemon/pokemon.service";
import { StatService } from "./modules/stat/stat.service";

export type Context = {
  req: Request;
  res: Response;
  user: CurrentUserType | null;
  prisma: PrismaClient;
  stats: StatService;
  items: ItemService;
  pokemons: PokemonService;
};

export type TokenPayload = Pick<User, "id" | "username">;

export type CurrentUserType = User & { wallet: Wallet };
