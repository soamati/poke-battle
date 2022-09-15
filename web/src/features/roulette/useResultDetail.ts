import React from "react";
import { Item } from "@/generated";
import { Contender } from "@/types";
import { useBattle } from "../battle/BattleProvider";
import { PossibleResult } from "./types";
import applyBuff from "./applyBuff";

type Detail = {
  attacker: Contender;
  defender: Contender;
  winner: "attacker" | "defender" | null;
  diff: number;
  buffItem: Item | null;
};

function useResultDetail(result: PossibleResult) {
  const [_, dispatch] = useBattle();
  const [detail, setDetail] = React.useState<Detail | null>(null);
  const [{ itemSlots, rivalSlots, selected, rival, turn }] = useBattle();

  React.useEffect(() => {
    if (!selected || !rival || detail !== null) {
      return;
    }

    let applyTo: Detail["winner"] = null;
    let item: Item | null = null;

    if (result.winner === "user") {
      applyTo = turn === "user" ? "attacker" : "defender";
      item = itemSlots[result.slot];
    } else {
      applyTo = turn === "rival" ? "attacker" : "defender";
      item = rivalSlots[result.slot];
    }

    let winner: Detail["winner"] = null;
    let attacker = turn === "user" ? { ...selected } : { ...rival };
    let defender = turn === "user" ? { ...rival } : { ...selected };

    // Apply buff
    if (item) {
      if (applyTo === "attacker") {
        attacker = applyBuff(attacker, item);
      } else if (applyTo === "defender") {
        defender = applyBuff(defender, item);
      }
    }

    let diff = defender.defense - attacker.attack;
    if (diff < 0) {
      winner = "attacker";
    } else if (diff > 0) {
      winner = "defender";
    }
    diff = Math.abs(diff);

    setDetail({
      attacker,
      defender,
      diff,
      winner,
      buffItem: item,
    });
  }, [detail, itemSlots, rivalSlots, result, rival, selected, turn, dispatch]);

  return detail;
}

export default useResultDetail;
