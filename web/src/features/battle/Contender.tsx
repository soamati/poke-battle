import React, { useMemo } from "react";
import useColors from "@/hooks/useColors";
import { Pokemon } from "@/generated";
import {
  Box,
  Stack,
  Heading,
  Badge,
  Image,
  HStack,
  Progress,
  Text,
  Center,
} from "@chakra-ui/react";
import { useBattle } from "./BattleProvider";

type Props = {
  pokemon: Pokemon;
  isRival?: boolean;
};

const Contender = ({ pokemon, isRival = false }: Props) => {
  const { fg } = useColors();
  const [{ phase, turn, selected, rival }] = useBattle();

  const { scheme, color } = useMemo(() => {
    if (isRival) {
      return { scheme: "red", color: "red.400" };
    }
    return phase === "battle"
      ? { scheme: "green", color: "green.400" }
      : { scheme: "gray", color: fg };
  }, [isRival, phase, fg]);

  const currentHP = useMemo(() => {
    if (selected && !isRival) {
      return selected.currentHP;
    }
    if (rival && isRival) {
      return rival.currentHP;
    }
    return pokemon.health;
  }, [pokemon, selected, rival, isRival]);

  return (
    <Box borderColor={color} borderWidth={1} rounded="sm" p={2} flex={1}>
      <Stack align="center" spacing={4}>
        {phase === "battle" && (
          <>
            {isRival ? (
              <Heading size="sm" color={color}>
                {turn === "rival" ? "ATACA" : "DEFIENDE"}
              </Heading>
            ) : (
              <Heading size="sm" color={color}>
                {turn === "user" ? "ATACA" : "DEFIENDE"}
              </Heading>
            )}
          </>
        )}

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

        {phase === "battle" && (
          <Stack w="full">
            <Center>
              <Text fontWeight="semibold" color={color}>
                {currentHP} HP
              </Text>
            </Center>

            <Progress
              value={currentHP}
              colorScheme={scheme}
              hasStripe
              size="lg"
              min={0}
              max={pokemon.health}
              isAnimated
              rounded="sm"
            />

            <HStack justify="space-between">
              <Text>0</Text>
              <Text>{pokemon.health}</Text>
            </HStack>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default Contender;
