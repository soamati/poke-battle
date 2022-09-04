import React from "react";
import { Button, Heading, Stack, Tag, Text } from "@chakra-ui/react";
import { PossibleResult } from "./types";
import { useBattle } from "../battle/BattleProvider";
import ItemImage from "@/components/ItemImage";
import ItemDescription from "@/components/ItemDescription";
import { Contender } from "@/types";
import Span from "@/components/Span";

type Result = {
  attacker: Contender;
  defender: Contender;
  winner: "attacker" | "defender" | null;
};

type Props = {
  result: PossibleResult;
  onContinue: () => void;
};

const ResultView = ({ result, onContinue }: Props) => {
  const [{ itemSlots, rivalSlots, selected, rival, turn }, dispatch] =
    useBattle();

  const item = React.useMemo(() => {
    if (result.winner === "user") {
      return itemSlots[result.slot];
    }
    return rivalSlots[result.slot];
  }, [result, itemSlots, rivalSlots]);

  const detail = React.useMemo(() => {
    if (!selected || !rival) {
      return null;
    }

    let winner: Result["winner"] = null;
    const attacker = turn === "user" ? selected : rival;
    const defender = turn === "user" ? rival : selected;

    const diff = defender.defense - attacker.attack;
    if (diff < 0) {
      winner = "attacker";
    } else if (diff > 0) {
      winner = "defender";
    }

    return {
      attacker,
      defender,
      winner,
      diff,
    };
  }, [turn, selected, rival]);

  const handleApplyDamageAndContinue = React.useCallback(() => {
    if (!detail) {
      onContinue();
      return;
    }

    const { winner, diff } = detail;

    let to: typeof turn | null = null;
    if (winner === "attacker") {
      to = turn === "user" ? "rival" : "user";
    } else if (winner === "defender") {
      to = turn === "user" ? "user" : "rival";
    }

    dispatch({ type: "applyDamage", payload: { to, amount: Math.abs(diff) } });
    onContinue();
  }, [onContinue, detail, turn, dispatch]);

  React.useEffect(() => {}, [dispatch, detail, turn]);

  return (
    <Stack
      align="center"
      p="2"
      spacing="4"
      borderColor="yellow.400"
      borderWidth={1}
      rounded="sm"
    >
      <Heading size="sm">
        {result.winner === "user"
          ? "¡Ganas la ruleta!"
          : "Tu rival gana la ruleta"}
      </Heading>

      {/* Item */}
      {item ? (
        <Stack align="center" p="2">
          <Text textAlign="center">
            Se aplica la bonificación a tu{" "}
            {result.winner === "user" ? "pokemón" : "rival"}
          </Text>

          <Heading size="xs">{item.name}</Heading>
          <ItemImage item={item} />
          <ItemDescription item={item} />
        </Stack>
      ) : (
        <Text>
          No hay bonificaciones en el slot ganador ({result.slot.toUpperCase()})
        </Text>
      )}

      {detail && (
        <Text textAlign="center">
          <Span>{detail.attacker.name}</Span>{" "}
          <Tag size="sm" colorScheme="yellow">
            ATK {detail.attacker.attack}
          </Tag>{" "}
          ataca a <Span>{detail.defender.name}</Span>{" "}
          <Tag size="sm" colorScheme="yellow">
            DEF {detail.defender.defense}
          </Tag>
          {" y "}
          {detail.winner === "attacker" ? "le quita " : "pierde "}
          <Tag size="sm" colorScheme="yellow">
            HP {Math.abs(detail.diff)}
          </Tag>
        </Text>
      )}

      <Button colorScheme="yellow" onClick={handleApplyDamageAndContinue}>
        Continuar
      </Button>
    </Stack>
  );
};

export default ResultView;
