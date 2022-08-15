import client from "@/client";
import { useInfinitePokemonsQuery } from "@/generated";

function usePokemons() {
  return useInfinitePokemonsQuery(
    "page",
    client,
    { page: 1 },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        const { next } = lastPage.pokemons.info;
        return next !== null ? { page: next } : undefined;
      },
      getPreviousPageParam: (firstPage) => {
        const { prev } = firstPage.pokemons.info;
        return prev !== null ? { page: prev } : undefined;
      },
    }
  );
}

export default usePokemons;
