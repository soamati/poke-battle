import React, { useMemo } from "react";
import useColors from "@/hooks/useColors";
import { Pokemon } from "@/generated";
import { Box, Stack, Heading, Badge, Image, HStack } from "@chakra-ui/react";
import { useBattle } from "./BattleProvider";

type Props = {
  pokemon: Pokemon;
  isRival?: boolean;
};

const Contender = ({ pokemon, isRival = false }: Props) => {
  const { fg } = useColors();
  const [{ phase }] = useBattle();

  const color = useMemo(() => {
    if (isRival) {
      return "red.400";
    }
    return phase === "battle" ? "green.400" : fg;
  }, [isRival, phase, fg]);

  return (
    <Box borderColor={color} borderWidth={1} rounded="sm" p={2} flex={1}>
      <Stack align="center" spacing={4}>
        <Heading size="sm">{pokemon.name}</Heading>
        <HStack>
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
