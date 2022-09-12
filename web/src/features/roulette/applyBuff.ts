import { Item } from "@/generated";
import { Contender } from "@/types";

const abbr = {
  ATK: "attack",
  DEF: "defense",
  HP: "health",
} as const;

function applyBuff(contender: Contender, item: Item) {
  let stat = abbr[item.stat.name as keyof typeof abbr];
  if (!stat) {
    return contender;
  }
  if (item.mode === "ABSOLUTE") {
    contender[stat] += item.value;
    return contender;
  }
  if (item.mode === "PERCENTAGE") {
    contender[stat] += contender[stat] * (item.value / 100);
    contender[stat] = Math.round(contender[stat]);
    return contender;
  }
  return contender;
}

export default applyBuff;
