import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { join } from "path";
import { PokemonType } from "./pokemon.schema";

export class PokemonService {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  parseFromJson() {
    const path = join(__dirname, "../../..", "pokemons.json");
    const file = readFileSync(path);

    const pokemons = JSON.parse(file.toString());

    return pokemons as PokemonType[];
  }

  async createDefaults() {
    let pokemons = await this.prisma.pokemon.findMany();
    if (pokemons.length > 0) return;

    pokemons = this.parseFromJson();

    const create = pokemons.map((pokemon) => {
      const { attack, defense, health } = pokemon;

      const statsAvg = Math.floor((attack + defense + health) / 3);
      const price = statsAvg > 85 ? 2000 : statsAvg > 65 ? 1000 : 500;

      return this.prisma.pokemon.create({
        data: { ...pokemon, stock: { create: { price } } },
      });
    });

    await this.prisma.$transaction(create);
  }

  find() {
    return this.prisma.pokemon.findMany();
  }

  findById(id: number) {
    return this.prisma.pokemon.findFirst({
      where: { id },
      include: { stock: true },
    });
  }

  async findPokedex(id: number) {
    const pokedex = await this.prisma.userPokemon.findMany({
      where: { userId: id },
      select: { pokemon: true, luck: true },
    });

    return pokedex;
  }

  store(skip: number) {
    return this.prisma.pokemonStore.findMany({
      include: { pokemon: true },
      orderBy: [{ price: "asc" }, { pokemon: { id: "asc" } }],
      skip,
      take: 20,
    });
  }
}
