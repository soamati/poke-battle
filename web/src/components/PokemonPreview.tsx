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
  ImgProps,
} from "@chakra-ui/react";

type Props = {
  pokemon: Pokemon;
  imageBoxSize?: ImgProps["boxSize"];
};

const PokemonPreview = ({ pokemon, imageBoxSize }: Props) => {
  return (
    <Stack align="center" spacing={4}>
      <Heading size="sm">{pokemon.name}</Heading>
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        boxSize={imageBoxSize ?? "125px"}
        objectFit="cover"
      />
      <Wrap justify="center">
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
