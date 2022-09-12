import React from "react";
import { Button, Heading, Stack, Tag, Text } from "@chakra-ui/react";
import { PossibleResult } from "./types";
import { useBattle } from "../battle/BattleProvider";
import ItemImage from "@/components/ItemImage";
import ItemDescription from "@/components/ItemDescription";
import Span from "@/components/Span";
import { useSpendItemMutation } from "@/generated";
import client from "@/client";
import { useQueryClient } from "@tanstack/react-query";
import useResultDetail from "./useResultDetail";

type Props = {
  result: PossibleResult;
  onContinue: () => void;
};

const ResultView = ({ result, onContinue }: Props) => {
  const detail = useResultDetail(result);

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useSpendItemMutation(client);

  const [{ turn }, dispatch] = useBattle();

  const handleApplyDamageAndContinue = React.useCallback(async () => {
    if (!detail) {
      return onContinue();
    }

    const { winner, diff, buffItem } = detail;

    let to: typeof turn | null = null;
    if (winner === "attacker") {
      to = turn === "user" ? "rival" : "user";
    } else if (winner === "defender") {
      to = turn === "user" ? "user" : "rival";
    }

    dispatch({
      type: "applyDamage",
      payload: { to, amount: diff },
    });

    // Only spend item if user has win the roulette
    if (buffItem && result.winner === "user") {
      return mutate(
        { itemId: buffItem.id },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries(["Inventory"]);
            onContinue();
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    }

    return onContinue();
  }, [detail, dispatch, mutate, queryClient, onContinue, result, turn]);

  if (!detail) {
    return null;
  }

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
      {detail.buffItem ? (
        <Stack align="center" p="2">
          <Text textAlign="center">
            Se aplica la bonificación a tu{" "}
            {result.winner === "user" ? "pokemón" : "rival"}
          </Text>

          <Heading size="xs">{detail.buffItem.name}</Heading>
          <ItemImage item={detail.buffItem} />
          <ItemDescription item={detail.buffItem} />
        </Stack>
      ) : (
        <Text>
          No hay bonificaciones en el slot ganador ({result.slot.toUpperCase()})
        </Text>
      )}

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
          HP {detail.diff}
        </Tag>
      </Text>

      <Button
        colorScheme="yellow"
        onClick={handleApplyDamageAndContinue}
        isLoading={isLoading}
      >
        Continuar
      </Button>
    </Stack>
  );
};

export default ResultView;
