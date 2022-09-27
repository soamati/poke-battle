import type { NextPage } from "next";
import React from "react";
import withAuthGSSP from "@/lib/withAuthGSSP";
import dynamic from "next/dynamic";
import { WhoamiQuery } from "@/generated";
import { Is } from "@/types";
import Page from "@/layout/Page";
import { Heading, Stack } from "@chakra-ui/react";

const PokemonList = dynamic(() => import("@/features/pokemon/PokemonList"), {
  ssr: false,
});

export const getServerSideProps = withAuthGSSP();

type Props = {
  user: Is<WhoamiQuery["whoami"]>;
};

const Home: NextPage<Props> = (_props) => {
  return (
    <Page>
      <Stack spacing={6} pt={2}>
        <Heading size="md" textAlign="center">
          Batalla
        </Heading>

        <Heading size="sm" textAlign="center">
          Elige tu rival
        </Heading>

        <PokemonList />
      </Stack>
    </Page>
  );
};

export default Home;
