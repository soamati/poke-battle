import React from "react";
import {
  Stack,
  Flex,
  Center,
  Button,
  Spinner,
  HStack,
  Badge,
  Text,
  Image,
} from "@chakra-ui/react";
import useColors from "@/hooks/useColors";
import client from "@/client";
import { Pokemon, usePokedexQuery } from "@/generated";
import { useBattle } from "./BattleProvider";

type Props = {
  rival: Pokemon;
};

const Lobby = ({ rival }: Props) => {
  const { fg } = useColors();
  const { data, isLoading } = usePokedexQuery(client);
  const { selected, setSelected, startBattle } = useBattle();

  return (
    <>
      <Center>
        <Button
          size="sm"
          colorScheme="red"
          isDisabled={!selected}
          onClick={startBattle}
        >
          Empezar!
        </Button>
      </Center>

      {isLoading && (
        <Center>
          <Spinner />
        </Center>
      )}

      {data && (
        <Stack borderWidth={1} borderColor={fg} p={4}>
          <Text>Mi Pokédex</Text>
          {data.pokedex.map(({ pokemon: owned }) => (
            <Flex
              key={owned.id}
              justify="space-between"
              align="center"
              flexDirection={["column", "row"]}
            >
              <HStack>
                <Image
                  src={owned.image}
                  alt={owned.name}
                  boxSize="16"
                  objectFit="cover"
                />
                <Text>{owned.name}</Text>
              </HStack>

              <Flex gap={2} flexDir={["column", "row"]}>
                <HStack>
                  <Badge colorScheme="green">HP: {owned.health}</Badge>
                  <Badge colorScheme="red">ATK: {owned.attack}</Badge>
                  <Badge colorScheme="blue">DEF: {owned.defense}</Badge>
                </HStack>

                <Button
                  size="xs"
                  colorScheme="yellow"
                  onClick={() => setSelected(owned)}
                >
                  Elegir
                </Button>
              </Flex>
            </Flex>
          ))}
        </Stack>
      )}
    </>
  );
};

export default Lobby;
