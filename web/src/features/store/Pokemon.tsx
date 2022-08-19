import React from "react";
import {
  Stack,
  Heading,
  Badge,
  Wrap,
  WrapItem,
  Button,
  Image,
  Box,
} from "@chakra-ui/react";
import useBuyPokemon from "./useBuyPokemon";
import { PokemonStoreQuery } from "@/generated";
import useColors from "@/hooks/useColors";

type Props = {
  pokemon: PokemonStoreQuery["pokemonStore"][number];
};

const PokemonStoreItem = ({
  pokemon: { pokemon, price, isOwned: _isOwned },
}: Props) => {
  const { fg } = useColors();
  const [isOwned, setIsOwned] = React.useState(_isOwned);
  const [buy, isBuying] = useBuyPokemon();

  const handleBuy = () => {
    buy(
      { id: pokemon.id },
      {
        onSuccess: () => setIsOwned(true),
      }
    );
  };

  return (
    <Box borderColor={fg} borderWidth={1} rounded="sm" p={4}>
      <Stack align="center" spacing={4}>
        <Heading size="sm">{pokemon.name}</Heading>
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          boxSize="125px"
          objectFit="cover"
        />
        <Badge colorScheme="yellow">PRECIO: {price} PC</Badge>
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
        <Button
          size="sm"
          colorScheme={!isOwned ? "yellow" : "teal"}
          isDisabled={isOwned}
          isLoading={isBuying}
          onClick={handleBuy}
        >
          {!isOwned ? "Comprar" : "En Pokédex"}
        </Button>
      </Stack>
    </Box>
  );
};

export default PokemonStoreItem;
