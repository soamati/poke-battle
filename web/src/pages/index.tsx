import React from "react";
import type { NextPage } from "next";
import NextLink from "next/link";
import {
  Button,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import client from "@/client";
import Page from "@/components/Page";
import {
  WhoamiQuery,
  useWhoamiQuery,
  useInfinitePokemonsQuery,
} from "@/generated";
import withAuthGSSP from "@/lib/withAuthGSSP";
import { Is } from "@/types";
import PokemonInfo from "@/components/PokemonInfo";

export const getServerSideProps = withAuthGSSP();

type Props = {
  user: Is<WhoamiQuery["whoami"]>;
};

const Home: NextPage<Props> = ({ user }) => {
  const pageCountRef = React.useRef<number | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data: currentUser, isLoading: isLoadingUser } = useWhoamiQuery(
    client,
    undefined,
    { initialData: { whoami: user } }
  );

  const {
    data,
    isLoading: isLoadingPokemons,
    fetchNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfinitePokemonsQuery(
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
      onSuccess({ pages }) {
        if (pageCountRef.current !== null || !pages.length) return;
        pageCountRef.current = pages[0].pokemons.info.pages;
      },
    }
  );

  const handleNext = () => {
    const pageCount = pageCountRef.current;
    if (!pageCount || currentPage >= pageCount) return;
    if (hasNextPage) {
      fetchNextPage();
    }
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage <= 1) return;
    if (hasPreviousPage) {
      fetchPreviousPage();
    }
    setCurrentPage((prev) => prev - 1);
  };

  if (isLoadingUser || isLoadingPokemons) {
    return <div>cargando...</div>;
  }

  if (!currentUser || !data) {
    return <div>algo salió mal</div>;
  }

  return (
    <Page>
      <Stack>
        <HStack spacing={4}>
          <NextLink href="/store/pokemon">
            <Link>Tienda Pokémon</Link>
          </NextLink>
          <NextLink href="/store/item">
            <Link>Tienda Items</Link>
          </NextLink>
        </HStack>
        <Text>{JSON.stringify(currentUser, null, 2)}</Text>
        <Stack>
          <HStack>
            <Button
              size="sm"
              onClick={handlePrev}
              isLoading={isFetchingPreviousPage}
            >
              Prev
            </Button>
            <Button
              size="sm"
              onClick={handleNext}
              isLoading={isFetchingNextPage}
            >
              Next
            </Button>
          </HStack>
          {data.pages.map((page, index) => {
            if (currentPage !== index + 1) {
              return null;
            }
            return (
              <SimpleGrid key={index} minChildWidth="250px" spacing={2}>
                {page.pokemons.results.map((pokemon) => (
                  <PokemonInfo key={pokemon.id} pokemon={pokemon} />
                ))}
              </SimpleGrid>
            );
          })}
        </Stack>
      </Stack>
    </Page>
  );
};

export default Home;
