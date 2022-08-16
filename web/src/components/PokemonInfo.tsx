import React from "react";
import {
  Box,
  Stack,
  Image,
  Heading,
  Badge,
  Wrap,
  WrapItem,
  Button,
} from "@chakra-ui/react";
import { Pokemon } from "@/generated";
import useColors from "@/hooks/useColors";

type Props = {
  pokemon: Pokemon;
  onPick: (pokemon: Pokemon) => void;
};

const PokemonInfo = ({ pokemon, onPick }: Props) => {
  const { fg } = useColors();

  return (
    <Box borderColor={fg} borderWidth={1} rounded="md" p={4}>
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
        <Button onClick={() => onPick(pokemon)}>Desafiar</Button>
      </Stack>
    </Box>
  );
};

export default PokemonInfo;
