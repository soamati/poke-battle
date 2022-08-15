import React from "react";
import PokemonInfo from "@/components/PokemonInfo";
import { Stack, SimpleGrid, Box } from "@chakra-ui/react";
import useObserver from "@/hooks/useObserver";
import usePokemons from "./usePokemons";

const PokemonList = () => {
  const { data, fetchNextPage, hasNextPage } = usePokemons();

  const { ref } = useObserver<HTMLDivElement>(
    ([entry]) => {
      if (!entry.isIntersecting) {
        return;
      }
      console.log("Fetching more?");
      console.log({ hasNextPage });
      if (hasNextPage) {
        fetchNextPage();
      }
    },
    { rootMargin: "200px" },
    [data]
  );

  if (!data) {
    return null;
  }

  return (
    <Stack>
      {data.pages.map((page, index) => {
        return (
          <SimpleGrid key={index} minChildWidth="250px" spacing={2}>
            {page.pokemons.results.map((pokemon) => (
              <PokemonInfo key={pokemon.id} pokemon={pokemon} />
            ))}
          </SimpleGrid>
        );
      })}
      <Box ref={ref} w="full" h="1px" />
    </Stack>
  );
};

export default PokemonList;
