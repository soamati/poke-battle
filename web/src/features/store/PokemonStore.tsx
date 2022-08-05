import React from "react";
import client from "src/client";
import useObserver from "src/hooks/useObserver";
import PokemonPreview from "src/features/pokemon/PokemonPreview";
import { Box, Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useInfinitePokemonStoreQuery } from "src/generated";

const PokemonStore = () => {
  const { data, fetchNextPage, isFetching } = useInfinitePokemonStoreQuery(
    "skip",
    client,
    { skip: 0 },
    {
      getNextPageParam: (last, all) => {
        if (last.pokemonStore.length < 1) return undefined;

        let nextSkip = 0;
        all.forEach((page) => (nextSkip += page.pokemonStore.length));

        return { skip: nextSkip };
      },
    }
  );

  const { ref } = useObserver<HTMLDivElement>(
    function ([entry]) {
      if (!entry.isIntersecting) return;
      fetchNextPage();
    },
    { rootMargin: "200px" },
    [data]
  );

  if (!data) {
    return (
      <Center p={4}>
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      <SimpleGrid minChildWidth="250px" spacing={4}>
        {data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.pokemonStore.map((pokemon) => (
              <PokemonPreview pokemon={pokemon} key={pokemon.pokemon.id} />
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>

      <Box ref={ref} w="full" h="1px"></Box>

      {isFetching && (
        <Center mt={4} p={4}>
          <Spinner />
        </Center>
      )}
    </>
  );
};

export default PokemonStore;
