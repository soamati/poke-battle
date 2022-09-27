import { Item } from "@/generated";
import { Contender } from "@/types";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  Reducer,
  useContext,
  useReducer,
} from "react";
import { BattleAction, Player } from "./types";

export type BattleState = {
  selected: Contender | null;
  rival: Contender | null;
  phase: "selection" | "battle";
  itemSlots: {
    a: Item | null;
    b: Item | null;
  };
  rivalSlots: {
    a: Item | null;
    b: Item | null;
  };
  lastRouletteResult: {
    winner: Player;
    slot: "a" | "b";
  } | null;
  turn: Player;
};

const BattleContext = createContext<
  [BattleState, Dispatch<BattleAction>] | null
>(null);

const initialState: BattleState = {
  selected: null,
  rival: null,
  phase: "selection",
  itemSlots: {
    a: null,
    b: null,
  },
  rivalSlots: {
    a: null,
    b: null,
  },
  lastRouletteResult: null,
  turn: "user",
};

const battleReducer: Reducer<BattleState, BattleAction> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "select":
      return { ...state, selected: { ...payload, currentHP: payload.health } };

    case "selectRival":
      return { ...state, rival: { ...payload, currentHP: payload.health } };

    case "start":
      return { ...state, phase: "battle" };

    case "reset":
      return { ...initialState };

    case "addItem":
      if (state.itemSlots.a !== null && state.itemSlots.b !== null) {
        break;
      }
      let slot = state.itemSlots.a === null ? "a" : "b";
      return {
        ...state,
        itemSlots: { ...state.itemSlots, [slot]: payload.item },
        rivalSlots: { ...state.rivalSlots, [slot]: payload.rivalItem },
      };

    case "removeItem":
      return {
        ...state,
        itemSlots: { ...state.itemSlots, [payload]: null },
        rivalSlots: { ...state.rivalSlots, [payload]: null },
      };

    case "emptySlots":
      return {
        ...state,
        itemSlots: { ...initialState.itemSlots },
        rivalSlots: { ...initialState.rivalSlots },
      };

    case "nextTurn":
      return {
        ...state,
        turn: state.turn === "rival" ? "user" : "rival",
      };

    case "applyDamage":
      if (
        !state.selected ||
        !state.rival ||
        payload.to === null ||
        payload.amount === 0
      ) {
        return { ...state };
      }

      if (payload.to === "user") {
        return {
          ...state,
          selected: {
            ...state.selected,
            currentHP: state.selected.currentHP - payload.amount,
          },
        };
      }

      return {
        ...state,
        rival: {
          ...state.rival,
          currentHP: state.rival.currentHP - payload.amount,
        },
      };

    case "restoreHealth":
      if (!state.selected || !state.rival) {
        return { ...state };
      }

      let current = 0;
      let total = 0;
      if (payload.to === "user") {
        current = state.selected.currentHP;
        total = state.selected.health;
      } else {
        current = state.rival.currentHP;
        total = state.rival.health;
      }

      if (payload.mode === "ABSOLUTE") {
        current += payload.amount;
      } else if (payload.mode === "PERCENTAGE") {
        current += total * (payload.amount / 100);
        current = Math.round(current);
      }

      if (payload.to === "user") {
        return {
          ...state,
          selected: {
            ...state.selected,
            currentHP: Math.min(current, total),
          },
        };
      }

      return {
        ...state,
        rival: {
          ...state.rival,
          currentHP: Math.min(current, total),
        },
      };
  }
  return { ...state };
};

const BattleProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(battleReducer, initialState);

  return (
    <BattleContext.Provider value={[state, dispatch]}>
      {children}
    </BattleContext.Provider>
  );
};

export default BattleProvider;

export const useBattle = () => {
  const context = useContext(BattleContext);
  if (!context) {
    throw new Error("use inside a BattleProvider");
  }

  return context;
};
