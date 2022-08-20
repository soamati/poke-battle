import { Pokemon } from "@/generated";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

type Battle = {
  selected: Pokemon | null;
  setSelected: (selection: Pokemon) => void;
  phase: "selection" | "battle";
  startBattle: () => void;
  resetBattle: () => void;
};

const BattleContext = createContext<Battle | null>(null);

const BattleProvider = ({ children }: PropsWithChildren) => {
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [phase, setPhase] = useState<Battle["phase"]>("selection");

  const startBattle = useCallback(() => {
    setPhase("battle");
  }, []);

  const resetBattle = useCallback(() => {
    setSelected(null);
    setPhase("selection");
  }, []);

  return (
    <BattleContext.Provider
      value={{ selected, setSelected, phase, startBattle, resetBattle }}
    >
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
