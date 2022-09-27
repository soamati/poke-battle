import React from "react";
import NextLink from "next/link";
import client from "@/client";
import { usePokedexQuery } from "@/generated";
import {
  Stack,
  Text,
  Box,
  SimpleGrid,
  Link,
  Center,
  Spinner,
} from "@chakra-ui/react";
import PokemonPreview from "@/components/PokemonPreview";
import useColors from "@/hooks/useColors";

type Props = {
  isPreview?: boolean;
};

const UserPokedex = ({ isPreview }: Props) => {
  const { fg } = useColors();
  const { data } = usePokedexQuery(client);

  if (!data) {
    return (
      <Center p={2}>
        <Spinner />
      </Center>
    );
  }

  if (!data.pokedex.length) {
    return (
      <Stack align="center">
        <Text textAlign="center">Aún no tienes ningún Pokémon</Text>
        <Text textAlign="center">Adquiere tu primer Pokémon en la tienda</Text>
        <NextLink href="/store/pokemon" passHref>
          <Link fontWeight="semibold">Ir a tienda Pokémon</Link>
        </NextLink>
      </Stack>
    );
  }

  return (
    <SimpleGrid minChildWidth="150px" spacing={2}>
      {data.pokedex.slice(0, isPreview ? 5 : undefined).map(({ pokemon }) => (
        <Box
          key={pokemon.id}
          borderWidth={1}
          borderColor={fg}
          p={2}
          rounded="sm"
        >
          <PokemonPreview pokemon={pokemon} imageBoxSize="72px" />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default UserPokedex;
