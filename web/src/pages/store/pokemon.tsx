import dynamic from "next/dynamic";
import React from "react";
import Page from "src/components/Page";
import { WhoamiQuery } from "src/generated";
import withAuthGSSP from "src/lib/withAuthGSSP";
import { Is } from "src/types";

const Store = dynamic(() => import("src/features/store/PokemonStore"), {
  ssr: false,
});

type Props = {
  user: Is<WhoamiQuery["whoami"]>;
};

const PokemonStorePage = ({ user: _ }: Props) => {
  return (
    <Page>
      <Store />
    </Page>
  );
};

export default PokemonStorePage;

export const getServerSideProps = withAuthGSSP();
