import React from "react";
import { Badge, Button, Center, Flex, Stack, Text } from "@chakra-ui/react";
import { useBattle } from "./BattleProvider";
import { Player } from "./types";
import PokemonPreview from "@/components/PokemonPreview";
import useColors from "@/hooks/useColors";
import { useRouter } from "next/router";
import useSaveBattleEffect from "./useSaveBattleEffect";

type Props = {
  winner: Player;
};

const WinnerView = ({ winner }: Props) => {
  const router = useRouter();

  const { fg } = useColors();
  const [{ selected, rival }] = useBattle();

  const { isSavingBattle } = useSaveBattleEffect(winner);

  const handleContinue = () => {
    router.push("/");
  };

  if (!selected || !rival) {
    return null;
  }

  return (
    <Stack spacing="6" py={4}>
      {winner === "user" ? (
        <Stack>
          <Text textAlign="center" fontSize="lg">
            ¡Bien hecho! Ganaste la batalla
          </Text>
          <Text textAlign="center" fontWeight="semibold">
            Ahora cuentas con {rival.name} en tu Pokédex
          </Text>
          <Text textAlign="center" fontWeight="semibold">
            Ganas 500 Pokécoins
          </Text>
        </Stack>
      ) : (
        <Stack>
          <Text textAlign="center" fontSize="lg">
            ¡Oh no! Tu rival gana la batalla
          </Text>
          <Text textAlign="center" fontWeight="semibold">
            Ya no cuentas con {selected.name} en tu Pokédex
          </Text>
        </Stack>
      )}
      <Flex gap="4" flexWrap="wrap">
        <Stack
          flex={1}
          borderColor={winner === "user" ? "yellow.300" : fg}
          borderWidth={1}
          rounded="sm"
          p={4}
          spacing={4}
          minW="265px"
        >
          <PokemonPreview pokemon={selected} />
          {winner === "user" ? (
            <Badge textAlign="center" colorScheme="yellow">
              GANA
            </Badge>
          ) : (
            <Badge textAlign="center" colorScheme="gray">
              PIERDE
            </Badge>
          )}
        </Stack>
        <Stack
          flex={1}
          borderColor={winner === "rival" ? "yellow.300" : fg}
          borderWidth={1}
          rounded="sm"
          p={4}
          spacing={4}
          minW="265px"
        >
          <PokemonPreview pokemon={rival} />
          {winner === "rival" ? (
            <Badge textAlign="center" colorScheme="yellow">
              GANA
            </Badge>
          ) : (
            <Badge textAlign="center" colorScheme="gray">
              PIERDE
            </Badge>
          )}
        </Stack>
      </Flex>

      <Center>
        <Button
          colorScheme="yellow"
          onClick={handleContinue}
          isDisabled={isSavingBattle}
        >
          Continuar
        </Button>
      </Center>
    </Stack>
  );
};

export default WinnerView;
