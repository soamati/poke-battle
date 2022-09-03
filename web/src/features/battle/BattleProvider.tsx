import { Item, Pokemon } from "@/generated";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  Reducer,
  useContext,
  useReducer,
} from "react";

type BattleState = {
  selected: Pokemon | null;
  phase: "selection" | "battle";
  itemSlots: {
    a: Item | null;
    b: Item | null;
  };
  rivalSlots: {
    a: Item | null;
    b: Item | null;
  };
};

type BattleAction = {
  type: "select" | "start" | "reset" | "addItem" | "removeItem";
  payload?: any;
};

const BattleContext = createContext<
  [BattleState, Dispatch<BattleAction>] | null
>(null);

const battleReducer: Reducer<BattleState, BattleAction> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "select":
      return { ...state, selected: payload };

    case "start":
      return { ...state, phase: "battle" };

    case "reset":
      return { ...state, selected: null, phase: "selection" };

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
  }
  return { ...state };
};

const initialState: BattleState = {
  selected: null,
  phase: "selection",
  itemSlots: {
    a: null,
    b: null,
  },
  rivalSlots: {
    a: null,
    b: null,
  },
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
