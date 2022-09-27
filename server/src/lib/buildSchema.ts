import { buildSchema as build } from "type-graphql";
import { BattleResolver } from "../modules/battle/battle.resolver";
import { ItemResolver } from "../modules/item/item.resolver";
import { PokemonResolver } from "../modules/pokemon/pokemon.resolver";
import { StoreResolver } from "../modules/store/store.resolver";
import { UserResolver } from "../modules/user/user.resolver";

export function buildSchema() {
  return build({
    resolvers: [
      UserResolver,
      PokemonResolver,
      StoreResolver,
      ItemResolver,
      BattleResolver,
    ],
  });
}
