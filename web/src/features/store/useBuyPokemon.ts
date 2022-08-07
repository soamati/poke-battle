import client from "src/client";
import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useBuyPokemonMutation } from "@/generated";
import useErrorParser from "@/hooks/useErrorParser";

export default function useBuyPokemon() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { parser } = useErrorParser([], { withToast: true });

  const { mutate, isLoading } = useBuyPokemonMutation(client, {
    onError: (error: any) => parser(error),
    onSuccess: ({ buyPokemon }) => {
      toast({
        title: "Pokémon adquirido!",
        description: `Ahora contás con ${buyPokemon.name}`,
      });
      queryClient.invalidateQueries(["Wallet"]);
    },
  });

  return [mutate, isLoading] as const;
}
