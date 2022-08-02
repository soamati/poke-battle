import "dotenv/config";
import "reflect-metadata";
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { getApolloConfig } from "./config/apollo";
import { cors } from "./lib/cors";
import { PrismaClient } from "@prisma/client";
import { StatService } from "./modules/stat/stat.service";
import { ItemService } from "./modules/item/item.service";
import { PokemonService } from "./modules/pokemon/pokemon.service";
import { createContext } from "./lib/createContext";
import { buildSchema } from "./lib/buildSchema";

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

  const schema = await buildSchema();

  const server = new ApolloServer({
    schema,
    context: createContext(prisma, { stats, pokemons, items }),
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
