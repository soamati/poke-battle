import React from "react";
import { Pokemon } from "@/generated";
import { useRouter } from "next/router";

function useChallenge() {
  const router = useRouter();
  const [rival, setRival] = React.useState<Pokemon | null>(null);

  const challenge = React.useCallback(() => {
    if (!rival) return;
    router.push(`/battle/${rival.id}`);
  }, [rival, router]);

  return { rival, setRival, challenge };
}

export default useChallenge;
