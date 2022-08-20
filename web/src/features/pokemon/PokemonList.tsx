import React from "react";
import PokemonInfo from "@/components/PokemonInfo";
import { Stack, SimpleGrid, Box, useDisclosure } from "@chakra-ui/react";
import useObserver from "@/hooks/useObserver";
import usePokemons from "./usePokemons";
import useChallenge from "./useChallenge";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Pokemon } from "@/generated";

const PokemonList = () => {
  const { data, fetchNextPage, hasNextPage } = usePokemons();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { challenge, rival, setRival } = useChallenge();

  const { ref } = useObserver<HTMLDivElement>(
    ([entry]) => {
      if (!entry.isIntersecting) {
        return;
      }
      if (hasNextPage) {
        fetchNextPage();
      }
    },
    { rootMargin: "200px" },
    [data]
  );

  const onPick = React.useCallback(
    (pokemon: Pokemon) => {
      setRival(pokemon);
      onOpen();
    },
    [setRival, onOpen]
  );

  if (!data) {
    return null;
  }

  return (
    <>
      <Stack>
        {data.pages.map((page, index) => {
          return (
            <SimpleGrid key={index} minChildWidth="250px" spacing={2}>
              {page.pokemons.results.map((pokemon) => (
                <PokemonInfo
                  key={pokemon.id}
                  pokemon={pokemon}
                  onPick={onPick}
                />
              ))}
            </SimpleGrid>
          );
        })}
        <Box ref={ref} w="full" h="1px" />
      </Stack>

      <ConfirmDialog
        title="Desafiar"
        description={`¿Seguro quieres desafiar a ${
          rival ? rival.name : "este Pokémon"
        }?`}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={challenge}
      />
    </>
  );
};

export default PokemonList;
