import { BattleState } from "../battle/BattleProvider";

export type PossibleResult = BattleState["lastRouletteResult"] & {
  rotation: 45 | -45 | 135 | -135;
};
