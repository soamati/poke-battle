import type { NextPage } from "next";
import React from "react";
import Page from "@/components/Page";
import withAuthGSSP from "@/lib/withAuthGSSP";
import dynamic from "next/dynamic";
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
      <PokemonList />
    </Page>
  );
};

export default Home;
