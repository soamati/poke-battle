import React from "react";
import client from "@/client";
import { useSaveBattleMutation } from "@/generated";
import { useBattle } from "./BattleProvider";
import { useQueryClient } from "@tanstack/react-query";
import { Player } from "./types";

function useSaveBattleEffect(winner: Player) {
  const queryClient = useQueryClient();

  const [{ selected, rival }] = useBattle();
  const { mutate, isLoading, isSuccess } = useSaveBattleMutation(client);

  React.useEffect(() => {
    if (isSuccess || !selected || !rival) {
      return;
    }
    mutate(
      { data: { winner, selectedId: selected.id, rivalId: rival.id } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["Pokedex"]);
          queryClient.invalidateQueries(["Wallet"]);
          queryClient.invalidateQueries(["Battles"]);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  }, [selected, rival, mutate, winner, isSuccess, queryClient]);

  return { isSavingBattle: isLoading };
}

export default useSaveBattleEffect;
