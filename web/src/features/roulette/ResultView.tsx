import React from "react";
import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { PossibleResult } from "./types";
import { useBattle } from "../battle/BattleProvider";
import ItemImage from "@/components/ItemImage";
import ItemDescription from "@/components/ItemDescription";

type Props = {
  result: PossibleResult;
  onContinue: () => void;
};

const ResultView = ({ result, onContinue }: Props) => {
  const [{ itemSlots, rivalSlots }] = useBattle();

  const item = React.useMemo(() => {
    if (result.winner === "user") {
      return itemSlots[result.slot];
    }
    return rivalSlots[result.slot];
  }, [result, itemSlots, rivalSlots]);

  return (
    <Stack
      align="center"
      p="2"
      spacing="4"
      borderColor={result.winner === "rival" ? "red.400" : "green.400"}
      borderWidth={1}
      rounded="sm"
    >
      <Heading size="sm">Resultado</Heading>

      <Text textAlign="center">
        Se aplica la bonificación a tu{" "}
        {result.winner === "user" ? "pokemón" : "rival"}
      </Text>

      {/* Item */}
      {item ? (
        <Stack align="center" p="2">
          <Heading size="xs">{item.name}</Heading>
          <ItemImage item={item} />
          <ItemDescription item={item} />
        </Stack>
      ) : (
        <Text>
          No hay bonificaciones en el slot {result.slot.toUpperCase()}
        </Text>
      )}

      <Button
        colorScheme={result.winner === "user" ? "green" : "red"}
        onClick={onContinue}
      >
        Continuar
      </Button>
    </Stack>
  );
};

export default ResultView;
