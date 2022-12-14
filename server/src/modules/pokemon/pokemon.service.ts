import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { join } from "path";
import { PAGE_SIZE } from "../../constants";
import { PaginatedPokemon, PokemonType } from "./pokemon.schema";

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

  find(skip: number) {
    return this.prisma.pokemon.findMany({
      include: { _count: true },
      skip,
      take: 20,
    });
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

  async store(skip: number, ownerId?: number) {
    const pokemons = await this.prisma.pokemonStore.findMany({
      include: { pokemon: { include: { ownedBy: true } } },
      orderBy: [{ price: "asc" }, { pokemon: { id: "asc" } }],
      skip,
      take: 20,
    });

    const store = pokemons.map(({ pokemon, price }) => {
      const { ownedBy, ...rest } = pokemon;
      return {
        pokemon: rest,
        price,
        isOwned: ownedBy.findIndex(({ userId }) => userId === ownerId) !== -1,
      };
    });

    return store;
  }

  async findPaginated(page: number): Promise<PaginatedPokemon> {
    const findPokemons = this.prisma.pokemon.findMany({
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });

    const countPokemons = this.prisma.pokemon.count();

    const [results, count] = await this.prisma.$transaction([
      findPokemons,
      countPokemons,
    ]);

    const pages = Math.ceil(count / PAGE_SIZE);

    if (results.length < 1) {
      return {
        info: { count, pages, next: null, prev: null },
        results: [],
      };
    }

    const info: PaginatedPokemon["info"] = {
      count,
      pages,
      next: page < pages ? page + 1 : null,
      prev: page > 1 ? page - 1 : null,
    };

    return { results, info };
  }
}
