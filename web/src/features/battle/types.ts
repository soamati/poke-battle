import { Item, Pokemon } from "@/generated";

type Action<Type extends string, Payload = null> = {
  type: Type;
  payload?: Payload;
};

type SelectAction = Required<Action<"select", Pokemon>>;

type SelectRivalAction = Required<Action<"selectRival", Pokemon>>;

type StartAction = Action<"start">;

type ResetAction = Action<"reset">;

type AddItemAction = Required<
  Action<
    "addItem",
    {
      item: Item;
      rivalItem: Item;
    }
  >
>;

type RemoveItemAction = Required<Action<"removeItem", "a" | "b">>;

type EmptySlotsAction = Action<"emptySlots">;

type NextTurnAction = Action<"nextTurn">;

type ApplyDamageAction = Required<
  Action<
    "applyDamage",
    {
      to: "user" | "rival" | null;
      amount: number;
    }
  >
>;

export type BattleAction =
  | SelectAction
  | SelectRivalAction
  | StartAction
  | ResetAction
  | AddItemAction
  | RemoveItemAction
  | EmptySlotsAction
  | NextTurnAction
  | ApplyDamageAction;
