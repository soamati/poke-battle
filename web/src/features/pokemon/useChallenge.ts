import React from "react";
import { Pokemon } from "@/generated";

function useChallenge() {
  const [rival, setRival] = React.useState<Pokemon | null>(null);

  const challenge = React.useCallback(() => {
    if (!rival) return;
    console.log(`Desafiando a ${rival.name} 🎉`);
  }, [rival]);

  return { rival, setRival, challenge };
}

export default useChallenge;
