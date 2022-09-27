import React from "react";
import { Pokemon } from "@/generated";
import {
  Box,
  Stack,
  Heading,
  Image,
  Wrap,
  WrapItem,
  Badge,
} from "@chakra-ui/react";

type Props = {
  pokemon: Pokemon;
};

const PokemonPreview = ({ pokemon }: Props) => {
  return (
    <Stack align="center" spacing={4}>
      <Heading size="sm">{pokemon.name}</Heading>
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        boxSize="125px"
        objectFit="cover"
      />
      <Wrap>
        <WrapItem>
          <Badge colorScheme="green">HP: {pokemon.health}</Badge>
        </WrapItem>
        <WrapItem>
          <Badge colorScheme="red">ATK: {pokemon.attack}</Badge>
        </WrapItem>
        <WrapItem>
          <Badge colorScheme="blue">DEF: {pokemon.defense}</Badge>
        </WrapItem>
      </Wrap>
    </Stack>
  );
};

export default PokemonPreview;
