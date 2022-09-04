import React from "react";
import ResultView from "./ResultView";
import SpinView from "./SpinView";
import { useBattle } from "@/features/battle/BattleProvider";
import { PossibleResult } from "./types";

const Roulette = () => {
  const [view, setView] = React.useState<"spin" | "result">("spin");
  const [result, setResult] = React.useState<PossibleResult | null>(null);

  const [_, dispatch] = useBattle();

  const handleContinue = React.useCallback(() => {
    setView("spin");
    setResult(null);
    dispatch({ type: "emptySlots" });
  }, [dispatch]);

  if (view === "result" && result !== null) {
    return <ResultView result={result} onContinue={handleContinue} />;
  }

  return <SpinView setResult={setResult} setView={setView} />;
};

export default Roulette;
