import React, { useState } from "react";
import withAuthGSSP from "@/lib/withAuthGSSP";
import client from "@/client";
import Page from "@/layout/Page";
import Contender from "@/features/battle/Contender";
import {
  Button,
  Center,
  HStack,
  Spinner,
  Stack,
  Text,
  Image,
  Badge,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { Pokemon, PokemonDocument, usePokedexQuery } from "@/generated";
import useColors from "@/hooks/useColors";
import SelectPlaceholder from "@/features/battle/SelectPlaceholder";
import { RiSwordFill } from "react-icons/ri";

export const getServerSideProps = withAuthGSSP(async ({ query: { pid } }) => {
  try {
    let id = typeof pid === "string" ? +pid : -1;
    if (isNaN(id) || id === -1) {
      throw new Error("error parsing id");
    }

    const { pokemon } = await client.request(PokemonDocument, { id });
    if (!pokemon) {
      throw new Error("pokémon not found");
    }

    return { props: { pokemon } };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
});

type Props = {
  pokemon: Pokemon;
};

const BattlePage = ({ pokemon }: Props) => {
  const { fg } = useColors();
  const { data, isLoading } = usePokedexQuery(client);
  const [selected, setSelected] = useState<Pokemon | null>(null);

  return (
    <Page full>
      <Stack spacing={4} pt={2}>
        <Text>Elige un Pokémon para enfrentar a tu rival</Text>

        <Flex gap={2}>
          {selected ? <Contender pokemon={selected} /> : <SelectPlaceholder />}
          <Center>
            <Icon as={RiSwordFill} />
          </Center>
          <Contender pokemon={pokemon} isRival />
        </Flex>

        <Center>
          <Button size="sm" colorScheme="red" isDisabled={!selected}>
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
      </Stack>
    </Page>
  );
};

export default BattlePage;
