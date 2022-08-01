import "dotenv/config";
import "reflect-metadata";
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { getApolloConfig } from "./config/apollo";
import { buildSchema } from "type-graphql";
import { TokenPayload } from "./types";
import { cors } from "./lib/cors";
import { UserResolver } from "./modules/user/user.resolver";
import { PokemonResolver } from "./modules/pokemon/pokemon.resolver";
import { PrismaClient, User } from "@prisma/client";
import { StatService } from "./modules/stat/stat.service";
import { ItemService } from "./modules/item/item.service";
import { PokemonService } from "./modules/pokemon/pokemon.service";
import { verify } from "jsonwebtoken";

export async function main() {
  const prisma = new PrismaClient();

  // init services
  const stats = new StatService(prisma);
  const items = new ItemService(prisma);
  const pokemons = new PokemonService(prisma);

  // default data
  await stats.createDefaults();
  await items.createDefaults();
  await pokemons.createDefaults();

  const app = express();
  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [UserResolver, PokemonResolver],
  });

  const server = new ApolloServer({
    schema,
    context: async (context) => {
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

      return { req, res, prisma, user, stats, items, pokemons };
    },
    ...getApolloConfig(httpServer),
  });

  await server.start();

  app.use(cors());
  app.use(cookieParser());

  server.applyMiddleware({ app, cors: false });

  httpServer.listen(4000, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
}
