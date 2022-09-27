import React, { useEffect } from "react";
import withAuthGSSP from "@/lib/withAuthGSSP";
import client from "@/client";
import Page from "@/layout/Page";
import Lobby from "@/features/battle/Lobby";
import { Pokemon, PokemonDocument } from "@/generated";
import { useBattle } from "@/features/battle/BattleProvider";
import { Heading, Stack, Text } from "@chakra-ui/react";
import Versus from "@/features/battle/Versus";
import Inventory from "@/components/Inventory";
import Roulette from "@/features/roulette";
import WinnerView from "@/features/battle/WinnerView";

type Props = {
  pokemon: Pokemon;
};

const BattlePage = ({ pokemon }: Props) => {
  const [state, dispatch] = useBattle();

  useEffect(() => {
    dispatch({ type: "selectRival", payload: pokemon });
    return () => {
      dispatch({ type: "reset" });
    };
  }, [dispatch, pokemon]);

  if (state.selected && state.selected.currentHP <= 0) {
    return (
      <Page full>
        <WinnerView winner="rival" />
      </Page>
    );
  }

  if (state.rival && state.rival.currentHP <= 0) {
    return (
      <Page full>
        <WinnerView winner="user" />
      </Page>
    );
  }

  return (
    <Page full>
      <Stack spacing={8} pt={2}>
        {state.phase === "selection" ? (
          <Heading size="md" textAlign="center">
            Elige un Pokémon para enfrentar a tu rival
          </Heading>
        ) : (
          <Heading size="md" textAlign="center">
            ¡PokéBattle!
          </Heading>
        )}

        <Versus rival={pokemon} />

        {state.phase === "selection" ? (
          <Lobby rival={pokemon} />
        ) : (
          <>
            <Roulette />
            <Stack>
              <Text fontWeight="semibold" textAlign="center">
                Agrega items a la ruleta
              </Text>
              <Inventory />
            </Stack>
          </>
        )}
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
