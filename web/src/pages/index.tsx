import type { NextPage } from "next";
import React from "react";
import NextLink from "next/link";
import Page from "@/components/Page";
import withAuthGSSP from "@/lib/withAuthGSSP";
import dynamic from "next/dynamic";
import { HStack, Link, Stack } from "@chakra-ui/react";
import { WhoamiQuery } from "@/generated";
import { Is } from "@/types";

const PokemonList = dynamic(() => import("@/features/pokemon/PokemonList"), {
  ssr: false,
});

export const getServerSideProps = withAuthGSSP();

type Props = {
  user: Is<WhoamiQuery["whoami"]>;
};

const Home: NextPage<Props> = ({ user }) => {
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

        <PokemonList />
      </Stack>
    </Page>
  );
};

export default Home;
