import React, { useEffect } from "react";
import withAuthGSSP from "@/lib/withAuthGSSP";
import client from "@/client";
import Page from "@/layout/Page";
import Lobby from "@/features/battle/Lobby";
import { Pokemon, PokemonDocument } from "@/generated";
import { useBattle } from "@/features/battle/BattleProvider";
import { Stack, Text } from "@chakra-ui/react";
import Versus from "@/features/battle/Versus";

type Props = {
  pokemon: Pokemon;
};

const BattlePage = ({ pokemon }: Props) => {
  const { phase, resetBattle } = useBattle();

  useEffect(() => {
    return () => {
      resetBattle();
    };
  }, [resetBattle]);

  return (
    <Page full>
      <Stack spacing={4} pt={2}>
        {phase === "selection" ? (
          <Text>Elige un Pokémon para enfrentar a tu rival</Text>
        ) : (
          <Text>PokéBattle!</Text>
        )}

        <Versus rival={pokemon} />

        {phase === "selection" ? <Lobby rival={pokemon} /> : <div>battle!</div>}
      </Stack>
    </Page>
  );
};

export const getServerSideProps = withAuthGSSP(async ({ query: { pid } }) => {
  try {
    let id = typeof pid === "string" ? +pid : -1;

    if (isNaN(id) || id === -1) {
      throw new Error("error parsing id");
    }

    const { pokemon } = await client.request(PokemonDocument, { id });

    if (!pokemon) {
      throw new Error("pokémon not found");
    }

    return { props: { pokemon } };
  } catch (error) {
    return { notFound: true };
  }
});

export default BattlePage;
