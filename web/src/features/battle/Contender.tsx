import React from "react";
import useColors from "@/hooks/useColors";
import { Pokemon } from "@/generated";
import { Box, Stack, Heading, Badge, Image, HStack } from "@chakra-ui/react";

type Props = {
  pokemon: Pokemon;
  isRival?: boolean;
};

const Contender = ({ pokemon, isRival = false }: Props) => {
  const { fg } = useColors();

  return (
    <Box
      borderColor={isRival ? "red.400" : fg}
      borderWidth={1}
      rounded="sm"
      p={2}
      flex={1}
    >
      <Stack align="center" spacing={4}>
        <Heading size="sm" color={isRival ? "red.400" : undefined}>
          {pokemon.name}
        </Heading>
        <HStack flexDirection={isRival ? "row-reverse" : "row"}>
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            boxSize="28"
            objectFit="cover"
          />
          <Stack>
            <Badge colorScheme="green">HP: {pokemon.health}</Badge>
            <Badge colorScheme="red">ATK: {pokemon.attack}</Badge>
            <Badge colorScheme="blue">DEF: {pokemon.defense}</Badge>
          </Stack>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Contender;
